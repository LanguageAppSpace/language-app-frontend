import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormButton from "@/components/Buttons/FormButton";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import {
  useValidatePasswordResetTokenQuery,
  useConfirmPasswordResetMutation,
} from "@/redux/auth/authApiSlice";
import { ROUTE } from "@/config/route.config";
import { FormInput, FormInputLabel } from "@/components/Form/Form";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormTitle,
} from "@/components/AuthForm/AuthForm";
import { useTranslation } from "react-i18next";

interface FormData {
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("auth");

  const { isLoading: isValidating, isError } =
    useValidatePasswordResetTokenQuery(token!, { skip: !token });

  const [confirmPasswordReset, { isLoading }] =
    useConfirmPasswordResetMutation();

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, t("resetPassword.validation.newPasswordMin"))
      .required(t("resetPassword.validation.newPasswordRequired")),
    confirmNewPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        t("resetPassword.validation.confirmNewPasswordMatch")
      )
      .required(t("resetPassword.validation.confirmNewPasswordRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    try {
      await confirmPasswordReset({ ...data, token }).unwrap();
      dispatch(
        showNotification({
          message: t("resetPassword.notifications.success"),
          severity: "success",
        })
      );
      navigate(ROUTE.LOGIN);
    } catch {
      dispatch(
        showNotification({
          message: t("resetPassword.notifications.error"),
          severity: "error",
        })
      );
    }
  };

  if (!token) {
    navigate(ROUTE.LOGIN);
    return null;
  }

  if (isValidating) {
    return (
      <CenteredContainer>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          {t("resetPassword.states.validatingLink")}
        </Typography>
      </CenteredContainer>
    );
  }

  if (isError) {
    return (
      <CenteredContainer>
        <Typography variant="h6" color="error" align="center">
          {t("resetPassword.states.invalidLink")}
        </Typography>
      </CenteredContainer>
    );
  }

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthFormTitle align="center">{t("resetPassword.title")}</AuthFormTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"username"}>
              <Typography>{t("resetPassword.fields.newPassword")}</Typography>
            </FormInputLabel>
            <FormInput
              type="password"
              fullWidth
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"username"}>
              <Typography>
                {t("resetPassword.fields.confirmNewPassword")}
              </Typography>
            </FormInputLabel>
            <FormInput
              type="password"
              fullWidth
              {...register("confirmNewPassword")}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading
                ? t("resetPassword.buttons.submitting")
                : t("resetPassword.buttons.submit")}
            </FormButton>
          </Grid>
        </Grid>
      </AuthForm>
    </AuthFormContainer>
  );
};

export default ResetPassword;

const CenteredContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  padding: "20px",
}));
