import { useChangePasswordMutation } from "@/redux/userSettings/userSettingsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { PasswordData } from "@/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectCurrentUserId } from "@/redux/auth/authSlice";
import { showNotification } from "@/redux/notification/notificationSlice";
import { Grid, Typography, Button } from "@mui/material";
import {
  FormRow,
  FormInputLabel,
  FormInput,
} from "@components/UserSettings/UserSettings";

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
            <FormInputLabel shrink={false} htmlFor={"oldPassword"}>
              <Typography>Old Password</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              type="password"
              error={Boolean(passwordErrors.oldPassword)}
              helperText={passwordErrors.oldPassword?.message}
              {...registerPassword("oldPassword")}
            />
          </Grid>
        </FormRow>
        <FormRow>
          <Grid item xs={6}>
            <FormInputLabel shrink={false} htmlFor={"newPassword"}>
              <Typography>New Password</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              type="password"
              error={Boolean(passwordErrors.newPassword)}
              helperText={passwordErrors.newPassword?.message}
              {...registerPassword("newPassword")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputLabel shrink={false} htmlFor={"newPasswordConfirm"}>
              <Typography>Confirm New Password</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              type="password"
              error={Boolean(passwordErrors.newPasswordConfirm)}
              helperText={passwordErrors.newPasswordConfirm?.message}
              {...registerPassword("newPasswordConfirm")}
            />
          </Grid>
        </FormRow>
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
