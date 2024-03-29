import { ROUTE } from "@/config/route.config";
import { clearUser, clearAccessToken } from "@/redux/auth/authSlice";
import { showNotification } from "@/redux/notification/notificationSlice";
import { auth } from "@/utils/firebase/firebase";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
      dispatch(clearAccessToken());
      navigate(ROUTE.LOGIN);
    } catch {
      dispatch(
        showNotification({
          message:
            "An error occurred while trying to log out. Please try again.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Button onClick={logOut} variant="contained">
      Log out
    </Button>
  );
};

export default Dashboard;
