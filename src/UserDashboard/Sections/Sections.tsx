import { useState } from "react";
import { Button, Grid, Skeleton } from "@mui/material";
import EmptyState from "@/UserDashboard/Sections/EmptyState";
import SectionCard from "@/UserDashboard/Sections/SectionCard";
import {
  useDeleteSectionMutation,
  useGetSectionsQuery,
} from "@/redux/sections/sectionsApiSlice";
import SectionModal from "@/UserDashboard/Sections/SectionModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { Section } from "@/interface";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config";
const Sections = () => {
  const { data: sections, isLoading } = useGetSectionsQuery();
  const [deleteSection] = useDeleteSectionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const sortedSections = hasUserSections
    ? [...sections.results].sort((a, b) => {
        if (a.title.toLowerCase() === "other") return 1;
        if (b.title.toLowerCase() === "other") return -1;

        return b.id - a.id;
      })
    : [];

  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
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
      <Grid item xs={12} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {hasUserSections && (
          <Button
            size="large"
            variant="contained"
            onClick={() => openModal("create")}
            startIcon={<AddCircleIcon />}
          >
            Create section
          </Button>
        )}
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(ROUTE.CREATE_LESSON)}
          startIcon={<AddCircleIcon />}
        >
          Create lesson
        </Button>
      </Grid>
      {hasUserSections ? (
        sortedSections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.id}>
            <SectionCard
              section={section}
              onEdit={() => openModal("edit", section)}
              onDelete={() => openModal("delete", section)}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <EmptyState onAction={() => openModal("create")} type="section" />
        </Grid>
      )}
      <SectionModal
        open={modalState.modal === "create" || modalState.modal === "edit"}
        onClose={closeModal}
        editingSection={modalState.modal === "edit" ? modalState.section : null}
      />
      <DeleteConfirmationModal
        open={modalState.modal === "delete"}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{modalState.section?.title}</strong> section? <br />
            This cannot be undone.
          </>
        }
      />
    </>
  );
};

export default Sections;
