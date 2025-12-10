import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormButton from "@/components/Buttons/FormButton";
import { ROUTE } from "@/config/route.config";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { FormInput, FormInputLabel } from "@/components/Form/Form";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormTitle,
} from "@/components/AuthForm/AuthForm";
import { useResetPasswordMutation } from "@/redux/auth/authApiSlice";

interface FormData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async ({ email }: FormData) => {
    try {
      await forgotPassword(email).unwrap();
      dispatch(
        showNotification({
          message: "If this email is registered, a reset link has been sent.",
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

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthFormTitle align="center">Reset your password</AuthFormTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"username"}>
              <Typography>Email address</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </FormButton>
          </Grid>
        </Grid>
      </AuthForm>
    </AuthFormContainer>
  );
};

export default ForgotPassword;
