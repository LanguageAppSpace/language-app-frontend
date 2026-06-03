import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Tile,
  TileDescription,
  TileIcon,
  TileName,
} from "@/components/Tile/Tile";
import { Lesson } from "@/interface";
import { styled } from "@mui/material/styles";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import QuizIcon from "@mui/icons-material/Quiz";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useNavigate, generatePath } from "react-router-dom";
import { ROUTE } from "@/config/route.config";
import { useTranslation } from "react-i18next";
interface LessonModeDialogProps {
  open: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

export const LessonModeDialog = ({
  open,
  onClose,
  lesson,
}: LessonModeDialogProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("lessons");

  if (!lesson) return null;

  const modes = [
    {
      title: t("modes.browse.title"),
      desc: t("modes.browse.description"),
      icon: <MenuBookIcon />,
      action: () => {
        onClose();
        navigate(
          generatePath(ROUTE.FLASHCARDS_BROWSE, {
            lessonId: lesson.id,
          })
        );
      },
    },
    {
      title: t("modes.review.title"),
      desc: t("modes.review.description"),
      icon: <FlipToFrontIcon />,
      action: () => {
        onClose();
        navigate(
          generatePath(ROUTE.FLASHCARDS_REVIEW, {
            lessonId: lesson.id,
          })
        );
      },
    },
    {
      title: t("modes.quiz.title"),
      desc: t("modes.quiz.description"),
      icon: <QuizIcon />,
      action: () => {
        onClose();
        navigate(
          generatePath(ROUTE.FLASHCARDS_QUIZ, {
            lessonId: lesson.id,
          })
        );
      },
    },
    {
      title: "Matching",
      desc: "Select the related phrase and translation",
      icon: <CompareArrowsIcon />,
      action: () => {
        onClose();
        navigate(
          generatePath(ROUTE.FLASHCARDS_MATCHING, {
            lessonId: lesson.id,
          })
        );
      },
    },
    {
      title: t("modes.writtenAnswer.title"),
      desc: t("modes.writtenAnswer.description"),
      icon: <KeyboardIcon />,
      action: () => {
        onClose();
        navigate(
          generatePath(ROUTE.FLASHCARDS_WRITTEN_ANSWER, {
            lessonId: lesson.id,
          })
        );
      },
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle color="primary">
        {t("titles.selectMode", { lesson: lesson.title })}
      </StyledDialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <StyledDialogContent>
        <Grid container spacing={4}>
          {modes.map((mode) => (
            <Grid item xs={12} sm={6} key={mode.title} sx={{ mt: 1 }}>
              <Tile onClick={mode.action}>
                <TileIcon>{mode.icon}</TileIcon>
                <TileName>{mode.title}</TileName>
                <TileDescription>{mode.desc}</TileDescription>
              </Tile>
            </Grid>
          ))}
        </Grid>
      </StyledDialogContent>
    </Dialog>
  );
};

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: 0,
}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  textAlign: "center",
}));
