import { Grid, Typography, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import deviceSizes from "@/cssConsts";
import { FormInput, FormInputLabel } from "@/Profile/UserSettings";
import FormButton from "@/components/Buttons/FormButton";
import { ROUTE } from "@/config/route.config";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useLoginUserMutation } from "@/redux/auth/authApiSlice";
import { setCredentials } from "@/redux/auth/authSlice";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormTitle,
} from "@/components/AuthForm/AuthForm";

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const userData = (await loginUser(data).unwrap()) as LoginResponse;
      dispatch(
        setCredentials({
          username: data.username,
          accessToken: userData.access,
        })
      );
      dispatch(
        showNotification({
          message: "You've successfully logged in",
          severity: "success",
        })
      );
      navigate(ROUTE.DASHBOARD);
    } catch {
      dispatch(
        showNotification({ message: "Login failed", severity: "error" })
      );
    }
  };

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthFormTitle align="center">Sign in</AuthFormTitle>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"username"}>
              <Typography>Username</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              {...register("username", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"password"}>
              <Typography>Your password</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormButton type="submit" variant="contained" fullWidth>
              Log in
            </FormButton>
          </Grid>
        </Grid>
        <ForgotPassword to="/forgot-password">
          Forgot your password?
        </ForgotPassword>
      </AuthForm>
      <SignUpSection>
        <LoginDivider>New to our community?</LoginDivider>
        <StyledLink to={ROUTE.REGISTER}>
          <CreateAccountButton variant="outlined" fullWidth>
            Create an account
          </CreateAccountButton>
        </StyledLink>
      </SignUpSection>
    </AuthFormContainer>
  );
};
export default Login;

const ForgotPassword = styled(Link)(({ theme }) => ({
  textDecoration: "underline",
  fontSize: "16px",
  cursor: "pointer",
  color: theme.palette.primary.light,
  marginTop: "10px",
}));

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LoginDivider = styled(Divider)(({ theme }) => ({
  margin: "18px 0",
  color: theme.palette.primary.light,
  fontSize: "16px",
  fontWeight: 400,
}));

const SignUpSection = styled("div")(() => ({
  width: "100%",
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: 600,
  width: "100%",
  borderRadius: "12px",
  [theme.breakpoints.down(deviceSizes.sm)]: {
    padding: "10px 16px",
    fontSize: "14px",
  },
}));
