import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Grid, Typography, Button, Divider, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import {
  StyledFormWrapper,
  FormRow,
  FormInputLabel,
  FormInput,
  StyledContainer,
} from "@components/UserSettings/UserSettings.styled";
import {
  useChangePasswordMutation,
  useDeactivateAccountMutation,
  useUpdateProfileMutation,
} from "@/redux/userSettings/userSettingsApiSlice";
import { selectCurrentUserId } from "@/redux/auth/authSlice";
import { PasswordData, ProfileData } from "@/interface";

const profileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  photo: Yup.string().url("Invalid URL format").notRequired(),
  birthday: Yup.date().required("Birthday is required"),
});

const passwordSchema = Yup.object().shape({
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string()
    .min(6, "New password should have at least 6 characters")
    .required("New password is required"),
  new_password_confirm: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords do not match")
    .required("Confirm new password is required"),
});

const UserSettings: React.FC = () => {
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();
  const [deactivateAccount] = useDeactivateAccountMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileData>({ resolver: yupResolver(profileSchema) });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordData>({ resolver: yupResolver(passwordSchema) });

  const userId = useSelector(selectCurrentUserId);

  const handleProfileSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      await updateProfile({ data });
      dispatch(
        showNotification({
          message: "Profile updated successfully",
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to update profile",
          severity: "error",
        })
      );
    }
  };

  const handlePasswordSubmit: SubmitHandler<PasswordData> = async (data) => {
    try {
      await changePassword({ userId, data });
      dispatch(
        showNotification({
          message: "Password changed successfully",
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to change password",
          severity: "error",
        })
      );
    }
  };

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
        <form onSubmit={handleSubmitPassword(handlePasswordSubmit)}>
          <Typography variant="h6">Change Password</Typography>
          <Grid container direction="column">
            <FormRow>
              <Grid item xs={12}>
                <FormInputLabel shrink={false} htmlFor={"old_password"}>
                  <Typography>Old Password</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  type="password"
                  error={Boolean(passwordErrors.old_password)}
                  helperText={passwordErrors.old_password?.message}
                  {...registerPassword("old_password")}
                />
              </Grid>
            </FormRow>
            <FormRow>
              <Grid item xs={6}>
                <FormInputLabel shrink={false} htmlFor={"new_password"}>
                  <Typography>New Password</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  type="password"
                  error={Boolean(passwordErrors.new_password)}
                  helperText={passwordErrors.new_password?.message}
                  {...registerPassword("new_password")}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputLabel shrink={false} htmlFor={"new_password_confirm"}>
                  <Typography>Confirm New Password</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  type="password"
                  error={Boolean(passwordErrors.new_password_confirm)}
                  helperText={passwordErrors.new_password_confirm?.message}
                  {...registerPassword("new_password_confirm")}
                />
              </Grid>
            </FormRow>
            <Button type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </form>

        <Divider sx={{ my: 4 }} />

        <form onSubmit={handleSubmitProfile(handleProfileSubmit)}>
          <Typography variant="h6">Update Profile</Typography>
          <Grid container direction="column">
            <FormRow>
              <Grid item xs={6}>
                <FormInputLabel shrink={false} htmlFor={"first_name"}>
                  <Typography>First Name</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  error={Boolean(profileErrors.first_name)}
                  helperText={profileErrors.first_name?.message}
                  {...registerProfile("first_name")}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputLabel shrink={false} htmlFor={"last_name"}>
                  <Typography>Last Name</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  error={Boolean(profileErrors.last_name)}
                  helperText={profileErrors.last_name?.message}
                  {...registerProfile("last_name")}
                />
              </Grid>
            </FormRow>
            <FormRow>
              <Grid item xs={12}>
                <FormInputLabel shrink={false} htmlFor={"photo"}>
                  <Typography>Profile Photo URL</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  error={Boolean(profileErrors.photo)}
                  helperText={profileErrors.photo?.message}
                  {...registerProfile("photo")}
                />
              </Grid>
            </FormRow>
            <FormRow>
              <Grid item xs={12}>
                <FormInputLabel shrink={false} htmlFor={"birthday"}>
                  <Typography>Birthday</Typography>
                </FormInputLabel>
                <FormInput
                  fullWidth
                  type="date"
                  error={Boolean(profileErrors.birthday)}
                  helperText={profileErrors.birthday?.message}
                  {...registerProfile("birthday", { valueAsDate: true })}
                />
              </Grid>
            </FormRow>
            <Button type="submit" variant="contained" color="primary">
              Save Profile
            </Button>
          </Grid>
        </form>
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
