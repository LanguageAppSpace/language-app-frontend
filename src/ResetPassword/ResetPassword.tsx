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

interface FormData {
  newPassword: string;
  confirmNewPassword: string;
}

const schema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "New password should have at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm new password is required"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: isValidating, isError } =
    useValidatePasswordResetTokenQuery(token!, { skip: !token });

  const [confirmPasswordReset, { isLoading }] =
    useConfirmPasswordResetMutation();

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
          message: "Your password has been successfully changed.",
          severity: "success",
        })
      );
      navigate(ROUTE.LOGIN);
    } catch {
      dispatch(
        showNotification({
          message: "Something went wrong. Please try again.",
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
          Validating password reset link...
        </Typography>
      </CenteredContainer>
    );
  }

  if (isError) {
    return (
      <CenteredContainer>
        <Typography variant="h6" color="error" align="center">
          The password reset link is invalid or has expired.
        </Typography>
      </CenteredContainer>
    );
  }

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthFormTitle align="center">Reset your password</AuthFormTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"username"}>
              <Typography>New password</Typography>
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
              <Typography>Confirm new password</Typography>
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
              {isLoading ? "Submitting..." : "Change Password"}
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
