import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  selectNotification,
} from "@/redux/notification/notificationSlice";
import Alert from "@mui/material/Alert";

const SnackbarNotification = () => {
  const { isOpen, severity, message } = useSelector(selectNotification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
