import React from "react";
import { Typography, Button, Divider, Box, InputLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDeactivateAccountMutation } from "@/redux/userSettings/userSettingsApiSlice";
import ChangePasswordForm from "@components/ChangePasswordForm/ChangePasswordForm.tsx";
import UpdateProfileForm from "@components/UpdateProfileForm/UpdateProfileForm";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";

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

export const StyledFormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

export const StyledContainer = styled("div")(() => ({
  width: "600px",
}));

export const FormRow = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "12px 0",
  gap: theme.spacing(2),
}));

export const FormInputLabel = styled(InputLabel)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  paddingBottom: "7px",
}));

export const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
    borderRadius: "12px",
    border: `1px solid ${alpha(theme.palette.primary.light, 0.35)}`,
  },
  "& .MuiOutlinedInput-root ": {
    borderRadius: "12px",
    border: "none",
  },
}));
