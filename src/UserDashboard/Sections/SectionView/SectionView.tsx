import { useParams, useNavigate, generatePath, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Skeleton,
  Box,
  Divider,
  Button,
  styled,
} from "@mui/material";
import { useGetSectionByIdQuery } from "@/redux/sections/sectionsApiSlice";
import folderImg from "@/assets/images/folder.png";
import LessonCard from "@/UserDashboard/Sections/SectionView/LessonCard";
import EmptyState from "@/UserDashboard/Sections/EmptyState";
import { ROUTE } from "@/config/route.config";
import { LessonModeDialog } from "@/UserDashboard/LessonModeDialog/LessonModeDialog";
import { useState } from "react";
import { Lesson } from "@/interface";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useResetLessonProgressMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDeleteLessonMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SectionView = () => {
  const { sectionId: sectionIdString } = useParams();
  const navigate = useNavigate();
  const sectionId = sectionIdString ? Number(sectionIdString) : null;
  const [resetLessonProgress] = useResetLessonProgressMutation();
  const [deleteLesson] = useDeleteLessonMutation();
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState<{
    modal: "lessonMode" | "delete" | null;
    lesson: Lesson | null;
  }>({
    modal: null,
    lesson: null,
  });

  const openModal = (
    type: "lessonMode" | "delete",
    lesson: Lesson | null = null
  ) => setModalState({ modal: type, lesson });

  const closeModal = () => setModalState({ modal: null, lesson: null });

  const handleResetLessonProgress = async (lessonId: string) => {
    try {
      await resetLessonProgress(lessonId).unwrap();
      dispatch(
        showNotification({ message: "Progress reset", severity: "success" })
      );
    } catch {
      dispatch(
        showNotification({
          message: "Failed to reset progress",
          severity: "error",
        })
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modalState.lesson) return;

    try {
      await deleteLesson(modalState.lesson.id).unwrap();
      dispatch(
        showNotification({ message: "Lesson deleted", severity: "success" })
      );
    } catch {
      dispatch(
        showNotification({ message: "Failed to delete", severity: "error" })
      );
    }

    closeModal();
  };

  const {
    data: section,
    isLoading,
    isFetching,
  } = useGetSectionByIdQuery(sectionId!, {
    skip: !sectionId,
  });

  if (isLoading || isFetching) {
    return (
      <>
        <Skeleton
          variant="text"
          height={100}
          width={300}
          sx={{ mb: 2, bgcolor: "grey.300" }}
        />
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i} sx={{ mb: 2 }}>
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 3, bgcolor: "grey.300" }}
            />
          </Grid>
        ))}
      </>
    );
  }

  if (!section) {
    return <Typography>Section not found.</Typography>;
  }

  const { lessons } = section;
  const hasUserLessons = lessons.length > 0;

  return (
    <>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <HeaderWrapper>
            <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <img
                  src={folderImg}
                  alt="folder"
                  style={{ maxHeight: "25px" }}
                />
                <Typography variant="h6" color="primary">
                  {section.title}
                </Typography>
              </Box>
              <Typography variant="body1" color="primary">
                {section.description}
              </Typography>
            </Box>
            {hasUserLessons && (
              <Link
                to={generatePath(ROUTE.CREATE_LESSON_IN_SECTION, {
                  sectionId: sectionIdString!,
                })}
              >
                <Button variant="contained" startIcon={<AddCircleIcon />}>
                  Add Lesson
                </Button>
              </Link>
            )}
          </HeaderWrapper>
        </Grid>
        <Divider
          sx={{
            my: 2,
            width: "100%",
            backgroundColor: section.color,
            borderWidth: 2,
          }}
        />
        {hasUserLessons ? (
          <>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography variant="body1" color="primary">
                {lessons.length} {lessons.length > 1 ? "lessons" : "lesson"}
              </Typography>
            </Grid>

            <Grid item xs={12} mt={2}>
              {lessons.map((lesson) => (
                <LessonCard
                  lesson={lesson}
                  onCardClick={() => openModal("lessonMode", lesson)}
                  onResetProgressClick={async () => {
                    await handleResetLessonProgress(lesson.id);
                  }}
                  onDeleteClick={() => openModal("delete", lesson)}
                  key={lesson.id}
                />
              ))}
            </Grid>
          </>
        ) : (
          <Grid item xs={12} mt={2}>
            <EmptyState
              type="lesson"
              onAction={() =>
                navigate(
                  generatePath(ROUTE.CREATE_LESSON_IN_SECTION, {
                    sectionId: String(section.id),
                  })
                )
              }
            />
          </Grid>
        )}
      </Grid>
      <LessonModeDialog
        open={modalState.modal === "lessonMode"}
        onClose={closeModal}
        lesson={modalState.lesson}
      />
      <DeleteConfirmationModal
        open={modalState.modal === "delete"}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        message={
          <>
            Are you sure you want to delete the lesson{" "}
            <strong>{modalState.lesson?.title}</strong> ? <br />
            This cannot be undone.
          </>
        }
      />
    </>
  );
};

export default SectionView;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
  flexDirection: "column",
  alignItems: "flex-start",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));
