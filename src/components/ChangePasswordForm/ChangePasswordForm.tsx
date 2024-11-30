import React from "react";
import { useChangePasswordMutation } from "@/redux/userSettings/userSettingsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { PasswordData } from "@/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectCurrentUserId } from "@/redux/auth/authSlice";
import { showNotification } from "@/redux/notification/notificationSlice";
import { Grid, Typography } from "@mui/material";
import {
  FormRow,
  FormInputLabel,
  FormInput,
  StyledButton,
} from "./ChangePasswordForm.styled.ts"; // Importuj stylizowane komponenty

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
      .min(6, "New password should have at least 6 characters")
      .required("New password is required"),
  newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm new password is required"),
});

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const [changePassword] = useChangePasswordMutation();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordData>({ resolver: yupResolver(passwordSchema) });

  const handlePasswordSubmit: SubmitHandler<PasswordData> = async (data) => {
    try {
      await changePassword({ userId, data });
      dispatch(
          showNotification({
            message: "Password changed successfully",
            severity: "success",
          })
      );
      resetPassword();
    } catch (error) {
      dispatch(
          showNotification({
            message: "Failed to change password",
            severity: "error",
          })
      );
    }
  };

  return (
      <form onSubmit={handleSubmitPassword(handlePasswordSubmit)}>
        <Typography variant="h6">Change Password</Typography>
        <Grid container direction="column">
          <FormRow>
            <Grid item xs={12}>
              <FormInputLabel as="label" htmlFor={"oldPassword"}>
                Old Password
              </FormInputLabel>
              <FormInput
                  id="oldPassword"
                  type="password"
                  error={Boolean(passwordErrors.oldPassword)}
                  {...registerPassword("oldPassword")}
              />
              <Typography color="error">
                {passwordErrors.oldPassword?.message}
              </Typography>
            </Grid>
          </FormRow>
          <FormRow>
            <Grid item xs={6}>
              <FormInputLabel as="label" htmlFor={"newPassword"}>
                New Password
              </FormInputLabel>
              <FormInput
                  id="newPassword"
                  type="password"
                  error={Boolean(passwordErrors.newPassword)}
                  {...registerPassword("newPassword")}
              />
              <Typography color="error">
                {passwordErrors.newPassword?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormInputLabel as="label" htmlFor={"newPasswordConfirm"}>
                Confirm New Password
              </FormInputLabel>
              <FormInput
                  id="newPasswordConfirm"
                  type="password"
                  error={Boolean(passwordErrors.newPasswordConfirm)}
                  {...registerPassword("newPasswordConfirm")}
              />
              <Typography color="error">
                {passwordErrors.newPasswordConfirm?.message}
              </Typography>
            </Grid>
          </FormRow>
          <StyledButton type="submit" variant="contained" color="primary">
            Change Password
          </StyledButton>
        </Grid>
      </form>
  );
};

export default ChangePasswordForm;
