import { Grid, Typography, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import deviceSizes from "@/cssConsts";
import { FormInput, FormInputLabel } from "@/Profile/UserSettings";
import FormButton from "@/components/Buttons/FormButton";
import { ROUTE } from "@/config/route.config";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useLoginUserMutation } from "@/redux/auth/authApiSlice";
import { setCredentials, setLoadingUser } from "@/redux/auth/authSlice";

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
    dispatch(setLoadingUser(true));
    try {
      const userData = (await loginUser(data).unwrap()) as LoginResponse;
      dispatch(
        setCredentials({
          username: data.username,
          accessToken: userData.access,
          refreshToken: userData.refresh,
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
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginFormTitle align="center">Sign in</LoginFormTitle>
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
        <ForgetPassword>Forgot your password?</ForgetPassword>
      </LoginForm>
      <SignUpSection>
        <LoginDivider>New to our community?</LoginDivider>
        <StyledLink to={ROUTE.REGISTER}>
          <CreateAccountButton variant="outlined" fullWidth>
            Create an account
          </CreateAccountButton>
        </StyledLink>
      </SignUpSection>
    </LoginFormContainer>
  );
};

export default Login;

const LoginFormContainer = styled("div")(() => ({
  maxWidth: "640px",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}));

const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "16px",
  border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
  padding: "40px 56px",
  boxSizing: "border-box",
  width: "100%",
  [theme.breakpoints.down(deviceSizes.sm)]: {
    padding: "16px 36px",
    border: "none",
  },
}));

const LoginFormTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  textAlign: "center",
  fontSize: 32,
  fontWeight: 500,
  marginBottom: 24,
  [theme.breakpoints.down(deviceSizes.sm)]: {
    marginBottom: 16,
    fontSize: 24,
  },
}));

const ForgetPassword = styled(Typography)(() => ({
  textDecoration: "underline",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: 6,
}));

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LoginDivider = styled(Divider)(({ theme }) => ({
  margin: "18px 0",
  color: theme.palette.primary.light,
  fontSize: "22px",
  fontWeight: 400,
  [theme.breakpoints.down(deviceSizes.sm)]: {
    fontSize: "16px",
  },
}));

const SignUpSection = styled("div")(() => ({
  width: "100%",
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  padding: "16px 0",
  fontSize: "20px",
  fontWeight: "700",
  width: "100%",
  borderRadius: "40px",
  [theme.breakpoints.down(deviceSizes.sm)]: {
    padding: "10px 16px",
    fontSize: "16px",
  },
}));
