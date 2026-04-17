import { useChangePasswordMutation } from "@/redux/userSettings/userSettingsApiSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { PasswordData } from "@/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectCurrentUserId } from "@/redux/auth/authSlice.ts";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { Grid, Typography, Button } from "@mui/material";
import { FormRow, FormInputLabel, FormInput } from "@/components/Form/Form.tsx";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const [changePassword] = useChangePasswordMutation();
  const { t } = useTranslation("profile");

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(
      t("changePassword.validation.oldPasswordRequired")
    ),
    newPassword: Yup.string()
      .min(6, t("changePassword.validation.newPasswordMin"))
      .required(t("changePassword.validation.newPasswordRequired")),
    newPasswordConfirm: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        t("changePassword.validation.newPasswordConfirmMatch")
      )
      .required(t("changePassword.validation.newPasswordConfirmRequired")),
  });

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
          message: t("changePassword.notifications.success"),
          severity: "success",
        })
      );
      resetPassword();
    } catch (error) {
      dispatch(
        showNotification({
          message: t("changePassword.notifications.error"),
          severity: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmitPassword(handlePasswordSubmit)}>
      <Typography variant="h6">{t("changePassword.title")}</Typography>
      <Grid container direction="column">
        <FormRow>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"oldPassword"}>
              <Typography>{t("changePassword.fields.oldPassword")}</Typography>
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
              <Typography>{t("changePassword.fields.newPassword")}</Typography>
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
              <Typography>
                {t("changePassword.fields.newPasswordConfirm")}
              </Typography>
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
          {t("changePassword.button")}
        </Button>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
