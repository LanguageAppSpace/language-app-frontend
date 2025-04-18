import { ROUTE } from "@config/route.config.ts";
import { useLogOutUserMutation } from "@redux/auth/authApiSlice.ts";
import { logOut } from "@redux/auth/authSlice.ts";
import { showNotification } from "@redux/notification/notificationSlice.ts";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOutUser] = useLogOutUserMutation();

  const onLogOut = async () => {
    try {
      await logOutUser();
      dispatch(logOut());
      navigate(ROUTE.LOGIN);
    } catch {
      dispatch(
        showNotification({
          message:
            "An error occurred while trying to log out. Please try again.",
          severity: "error",
        }),
      );
    }
  };

  return (
    <Button onClick={onLogOut} variant="contained">
      Log out
    </Button>
  );
};

export default LogOutButton;
