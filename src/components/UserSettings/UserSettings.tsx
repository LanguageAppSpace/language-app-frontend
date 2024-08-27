import React from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import {
  StyledFormWrapper,
  StyledContainer,
} from "@components/UserSettings/UserSettings.styled";
import { useDeactivateAccountMutation } from "@/redux/userSettings/userSettingsApiSlice";
import ChangePasswordForm from "@components/ChangePasswordForm/ChangePasswordForm.tsx";
import UpdateProfileForm from "@components/UpdateProfileForm/UpdateProfileForm";

const UserSettings: React.FC = () => {
  const dispatch = useDispatch();

  const [deactivateAccount] = useDeactivateAccountMutation();

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount().unwrap();
      dispatch(
        showNotification({
          message: "Account deactivated",
          severity: "warning",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to deactivate account",
          severity: "error",
        })
      );
    }
  };

  return (
    <StyledFormWrapper>
      <StyledContainer>
        <Box mb={4}>
          <Typography variant="h4">User Settings</Typography>
        </Box>
        <ChangePasswordForm />
        <Divider sx={{ my: 4 }} />
        <UpdateProfileForm />
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6">Deactivate Account</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeactivateAccount}
        >
          Deactivate Account
        </Button>
      </StyledContainer>
    </StyledFormWrapper>
  );
};

export default UserSettings;
