import { useParams, useNavigate, generatePath, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Skeleton,
  Box,
  Divider,
  Button,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { useGetSectionByIdQuery } from "@/redux/sections/sectionsApiSlice";
import folderImg from "@/assets/images/folder.png";
import LessonCard from "@/UserDashboard/Sections/SectionView/LessonCard";
import EmptyState from "@/UserDashboard/Sections/EmptyState";
import { ROUTE } from "@/config/route.config";
import { LessonModeDialog } from "@/UserDashboard/LessonModeDialog/LessonModeDialog";
import { useState, useEffect, useMemo } from "react";
import { Lesson } from "@/interface";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useResetLessonProgressMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDeleteLessonMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Trans, useTranslation } from "react-i18next";
import { SortRounded } from "@mui/icons-material";

const SectionView = () => {
  const { sectionId: sectionIdString } = useParams();
  const navigate = useNavigate();
  const sectionId = sectionIdString ? Number(sectionIdString) : null;
  const [resetLessonProgress] = useResetLessonProgressMutation();
  const [deleteLesson] = useDeleteLessonMutation();
  const dispatch = useDispatch();
  const { t: tSections } = useTranslation("sections");
  const { t: tLessons } = useTranslation("lessons");

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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    data: section,
    isLoading,
    isFetching,
  } = useGetSectionByIdQuery(sectionId!, {
    skip: !sectionId,
  });

  const lessons = useMemo(() => {
    return section?.lessons ?? [];
  }, [section?.lessons]);

  const hasUserLessons = lessons.length > 0;
  const [sortedLessons, setSortedLessons] = useState<Lesson[]>(lessons);

  useEffect(() => {
    setSortedLessons(lessons);
  }, [lessons]);

  const handleSortOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortLessonsDesc = () => {
    const sorted = [...lessons].sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );
    setSortedLessons(sorted);
  };

  const handleSortLessonsAsc = () => {
    const sorted = [...lessons].sort(
      (a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime()
    );
    setSortedLessons(sorted);
  };

  const handleResetLessonProgress = async (lessonId: string) => {
    try {
      await resetLessonProgress(lessonId).unwrap();
      dispatch(
        showNotification({
          message: tLessons("notifications.progressReset"),
          severity: "success",
        })
      );
    } catch {
      dispatch(
        showNotification({
          message: tLessons("notifications.progressResetFailed"),
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
        showNotification({
          message: tLessons("notifications.deleted"),
          severity: "success",
        })
      );
    } catch {
      dispatch(
        showNotification({
          message: tLessons("notifications.deleteFailed"),
          severity: "error",
        })
      );
    }

    closeModal();
  };

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
    return <Typography>{tSections("details.notFound")}</Typography>;
  }

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
                  {tSections("actions.addLesson")}
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
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="body1" color="primary">
                {lessons.length} {lessons.length > 1 ? "lessons" : "lesson"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<SortRounded />}
                  onClick={handleSortOpen}
                >
                  {tSections("actions.sortLessons")}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleSortClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        bgcolor: "primary.main",
                        mt: 0.5,
                        textTransform: "uppercase",
                      },
                    },
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: "0.875rem",
                    }}
                    onClick={handleSortLessonsAsc}
                  >
                    {tSections("actions.sortLessonsAsc")}
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "0.875rem",
                    }}
                    onClick={handleSortLessonsDesc}
                  >
                    {tSections("actions.sortLessonsDesc")}
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>

            <Grid item xs={12} mt={2}>
              {sortedLessons.map((lesson) => (
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
          <Trans
            ns="lessons"
            i18nKey="deleteConfirmation.message"
            values={{ name: modalState.lesson?.title }}
            components={{
              strong: <strong />,
              br: <br />,
            }}
          />
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
