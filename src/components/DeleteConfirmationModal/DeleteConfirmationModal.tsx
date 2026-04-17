import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography color="primary" variant="h6" component="span">
          {t("modal.confirmAction")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="primary">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {t("actions.delete")}
        </Button>
        <Button onClick={onClose} variant="outlined">
          {t("actions.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
