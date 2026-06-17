import React from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { useDeactivateAccountMutation } from "@/redux/userSettings/userSettingsApiSlice.ts";
import ChangePasswordForm from "@/Profile/ChangePasswordForm.tsx";
import UpdateProfileForm from "@/Profile/UpdateProfileForm.tsx";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { logOut } from "@/redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config";

const UserSettings: React.FC = () => {
  const dispatch = useDispatch();
  const [deactivateAccount] = useDeactivateAccountMutation();
  const navigate = useNavigate();
  const { t } = useTranslation("profile");

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount().unwrap();
      dispatch(
        showNotification({
          message: t("deactivateAccount.notifications.success"),
          severity: "success",
        })
      );
      dispatch(logOut());
      navigate(ROUTE.LANDING_PAGE, { replace: true });
    } catch (error) {
      dispatch(
        showNotification({
          message: t("deactivateAccount.notifications.error"),
          severity: "error",
        })
      );
    }
  };

  return (
    <StyledFormWrapper>
      <StyledContainer>
        <Box mb={4}>
          <Typography variant="h4">{t("title")}</Typography>
        </Box>
        <ChangePasswordForm />
        <Divider sx={{ my: 4 }} />
        <UpdateProfileForm />
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6">{t("deactivateAccount.title")}</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeactivateAccount}
        >
          {t("deactivateAccount.button")}
        </Button>
      </StyledContainer>
    </StyledFormWrapper>
  );
};

export default UserSettings;

export const StyledFormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

export const StyledContainer = styled("div")(({ theme }) => ({
  width: "600px",
  color: theme.palette.text.secondary,
}));
