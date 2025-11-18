import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sectionTitle?: string;
}

const DeleteSectionDialog = ({
  open,
  onClose,
  onConfirm,
  sectionTitle,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography color="primary" variant="h6">
          Delete section
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="primary">
          Are you sure you want to delete <b>{sectionTitle}</b>? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSectionDialog;
