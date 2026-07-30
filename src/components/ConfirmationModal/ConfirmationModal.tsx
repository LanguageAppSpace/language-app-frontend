import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  title: ReactNode;
  message: ReactNode;
  confirmText: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  open,
  title,
  message,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
}: Props) => {
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography color="primary" variant="h6" component="span">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="primary">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {confirmText}
        </Button>
        <Button onClick={onClose} variant="outlined">
          {cancelText ?? t("actions.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
