import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: React.ReactNode;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  message,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography color="primary" variant="h6" component="span">
          Confirm action
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="primary">{message}</Typography>
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

export default DeleteConfirmationModal;
