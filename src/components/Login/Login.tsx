import { Grid, Typography, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import * as Yup from "yup";
import {
  FormInput,
  FormInputLabel,
} from "@components/Register/Register";
import Logo from "@/assets/images/logo.svg";
import { ROUTE } from "@/config/route.config";
import { useNavigate, Link } from "react-router-dom";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { setLoadingUser, setCredentials } from "@/redux/auth/authSlice";
import { useLoginUserMutation } from "@/redux/auth/authApiSlice";

interface FormData {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required(" Password is required"),
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
      const userData = await loginUser(data).unwrap();
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
    <StyledFormWrapper>
      <SignInFormContainer>
        <img src={Logo} alt="Logo" />
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
                helperText={errors.username && "Username is required"}
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
                helperText={errors.password && "Password is required"}
                {...register("password", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <LoginButton type="submit" variant="contained" fullWidth>
                Log in
              </LoginButton>
            </Grid>
          </Grid>
          <ForgetPassword>Forget your password</ForgetPassword>
        </LoginForm>
        <SignUpSection>
          <LoginDivider>New to our community</LoginDivider>
          <StyledLink to={ROUTE.REGISTER}>
            <CreateAccountButton variant="outlined" fullWidth>
              Create an account
            </CreateAccountButton>
          </StyledLink>
        </SignUpSection>
      </SignInFormContainer>
    </StyledFormWrapper>
  );
};

export default Login;

export const StyledFormWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "85px 0 48px 0",
}));

export const SignInFormContainer = styled("div")(() => ({
  maxWidth: "640px",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
  padding: "40px 56px",
  boxSizing: "border-box",
  width: "100%",
  margin: "32px 0 14px 0",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  display: "flex",
  backgroundColor: `${theme.palette.primary.main}`,
  padding: "17px 26px",
  justifyContent: "center",
  alignItems: "center",
  color: `${theme.palette.text.primary}`,
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  letterSpacing: "0.4px",
}));

export const LoginFormTitle = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  textAlign: "center",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: "48px",
}));

export const CreateAccountButton = styled(Button)(() => ({
  display: "flex",
  padding: "16px 0",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  letterSpacing: "0.4px",
  width: "100%",
  borderRadius: "40px",
}));

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const LoginDivider = styled(Divider)(({ theme }) => ({
  margin: "18px 0",
  color: `${theme.palette.primary.light}`,
  fontSize: "22px",
  fontWeight: 400,
}));

export const SignUpSection = styled("div")(() => ({
  width: "100%",
}));

export const ForgetPassword = styled(Typography)(() => ({
  textDecoration: "underline",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "8px",
}));

export const LoginWithGoogleButton = styled(Button)(() => ({
  display: "flex",
  padding: "17px 26px",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  fontStyle: "normal",
  letterSpacing: "0.4px",
  width: "100%",
  borderRadius: "40px",
  textTransform: "none",
}));

export const GoogleImg = styled("img")(() => ({
  width: "34px",
  height: "34px",
  marginRight: "10px",
}));
