import { Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import emptyLessonImg from "@/assets/images/empty-lesson.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface EmptyStateProps {
  type: "section" | "lesson";
  onAction: () => void;
}
const emptyStateContent = {
  section: {
    title: "You don't have any sections yet",
    description: "Create your first section to start organizing your lessons.",
    image: emptyFolderImg,
    buttonText: "Create new section",
    buttonIcon: <AddCircleIcon />,
  },
  lesson: {
    title: "You don't have any lessons yet",
    description: "Create your first lesson to start learning.",
    image: emptyLessonImg,
    buttonText: "Create new lesson",
    buttonIcon: <AddCircleIcon />,
  },
};

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const { title, description, image, buttonText } = emptyStateContent[type];

  return (
    <EmptyStateCard>
      <img
        src={image}
        alt={`${type} empty state image`}
        style={{ maxHeight: "100px" }}
      />
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
