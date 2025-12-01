import { Typography, Button, Grid } from "@mui/material";
import folderImg from "@/assets/images/folder.png";
import { styled } from "@mui/material/styles";

interface EmptyStateSectionProps {
  onOpenModal: () => void;
}

const EmptyStateSection: React.FC<EmptyStateSectionProps> = ({
  onOpenModal,
}) => {
  return (
    <EmptyStateCard>
      <img src={folderImg} alt="folder" style={{ maxHeight: "100px" }} />
      <Typography variant="h6">You don't have any sections yet</Typography>
      <Typography variant="body1">
        Create your first section to start organizing your lessons.
      </Typography>
      <Button
        size="large"
        variant="contained"
        onClick={onOpenModal}
        color="primary"
      >
        Create new section
      </Button>
    </EmptyStateCard>
  );
};

export default EmptyStateSection;

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
