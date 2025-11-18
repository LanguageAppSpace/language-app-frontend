import { useState } from "react";
import { Button, Grid, Skeleton } from "@mui/material";
import EmptyStateSection from "@/UserDashboard/Sections/EmptyStateSection";
import SectionCard from "@/UserDashboard/Sections/SectionCard";
import {
  useDeleteSectionMutation,
  useGetSectionsQuery,
} from "@/redux/sections/sectionsApiSlice";
import SectionModal from "@/UserDashboard/Sections/SectionModal";
import DeleteSectionDialog from "@/UserDashboard/Sections/DeleteSectionModal";
import { Section } from "@/interface";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";

const Sections = () => {
  const { data: sections, isLoading } = useGetSectionsQuery();
  const [deleteSection] = useDeleteSectionMutation();
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState<{
    modal: "create" | "edit" | "delete" | null;
    section: Section | null;
  }>({
    modal: null,
    section: null,
  });

  const openModal = (
    type: "create" | "edit" | "delete",
    section: Section | null = null
  ) => setModalState({ modal: type, section });

  const closeModal = () => setModalState({ modal: null, section: null });

  const handleDeleteConfirm = async () => {
    if (!modalState.section) return;

    try {
      await deleteSection(modalState.section.id).unwrap();
      dispatch(
        showNotification({ message: "Section deleted", severity: "success" })
      );
    } catch {
      dispatch(
        showNotification({ message: "Failed to delete", severity: "error" })
      );
    }

    closeModal();
  };

  const hasUserSections = sections && sections.results.length > 0;

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton
              variant="rectangular"
              height={280}
              sx={{ borderRadius: 3, bgcolor: "grey.300" }}
            />
          </Grid>
        ))}
      </>
    );
  }

  return (
    <>
      {hasUserSections ? (
        <>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              onClick={() => openModal("create")}
            >
              Create new section
            </Button>
          </Grid>

          {sections?.results.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.id}>
              <SectionCard
                section={section}
                onEdit={() => openModal("edit", section)}
                onDelete={() => openModal("delete", section)}
              />
            </Grid>
          ))}
        </>
      ) : (
        <Grid item xs={12}>
          <EmptyStateSection onOpenModal={() => openModal("create")} />
        </Grid>
      )}
      <SectionModal
        open={modalState.modal === "create" || modalState.modal === "edit"}
        onClose={closeModal}
        editingSection={modalState.modal === "edit" ? modalState.section : null}
      />
      <DeleteSectionDialog
        open={modalState.modal === "delete"}
        onClose={closeModal}
        sectionTitle={modalState.section?.title}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Sections;
