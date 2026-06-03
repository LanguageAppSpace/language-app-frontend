import { Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import emptyLessonImg from "@/assets/images/empty-lesson.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  type: "section" | "lesson";
  onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const { t: tSections } = useTranslation("sections");
  const { t: tLessons } = useTranslation("lessons");

  const emptyStateContent = {
    section: {
      title: tSections("emptyState.title"),
      description: tSections("emptyState.description"),
      image: emptyFolderImg,
      buttonText: tSections("emptyState.button"),
      buttonIcon: <AddCircleIcon />,
      imageAlt: tSections("emptyState.imageAlt"),
    },
    lesson: {
      title: tLessons("emptyState.title"),
      description: tLessons("emptyState.description"),
      image: emptyLessonImg,
      buttonText: tLessons("emptyState.button"),
      buttonIcon: <AddCircleIcon />,
      imageAlt: tLessons("emptyState.imageAlt"),
    },
  };

  const { title, description, image, buttonText, imageAlt } =
    emptyStateContent[type];

  return (
    <EmptyStateCard>
      <img src={image} alt={imageAlt} style={{ maxHeight: "100px" }} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Button
        size="large"
        variant="contained"
        onClick={onAction}
        color="primary"
        startIcon={<AddCircleIcon />}
      >
        {buttonText}
      </Button>
    </EmptyStateCard>
  );
};

export default EmptyState;

export const EmptyStateCard = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  borderRadius: "16px",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: "20px",
  width: "100%",
}));
