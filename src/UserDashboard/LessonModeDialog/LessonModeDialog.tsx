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
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, generatePath } from "react-router-dom";
import { ROUTE } from "@/config/route.config";
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

  if (!lesson) return null;

  const modes = [
    {
      title: "Browse",
      desc: "Go through all flashcards quickly",
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
      title: "Review",
      desc: "Practice by testing what you remember",
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
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle color="primary">
        Select a mode for: {lesson.title}
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
