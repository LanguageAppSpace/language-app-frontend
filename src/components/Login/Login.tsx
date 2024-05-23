import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  LoginButton,
  StyledFormWrapper,
  LoginForm,
  LoginFormTitle,
  SignInFormContainer,
  CreateAccountButton,
  StyledLink,
  LoginDivider,
  SignUpSection,
  ForgetPassword,
  LoginWithGoogleButton,
  GoogleImg,
} from "@components/Login/Login.styled";
import {
  FormInput,
  FormInputLabel,
} from "@components/Register/Register.styled";
import Logo from "@/assets/images/logo.svg";
import GoogleIcon from "@/assets/images/google-icon.png";
import { ROUTE } from "@/config/route.config";
import {
  loginUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "@/utils/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { setLoadingUser } from "@/redux/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required(" Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    dispatch(setLoadingUser(true));
    try {
      await loginUserWithEmailAndPassword(email, password);
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

  const logInWithGoogle = async () => {
    dispatch(setLoadingUser(true));
    await signInWithGooglePopup();
    dispatch(
      showNotification({
        message: "You've successfully logged in",
        severity: "success",
      })
    );
    navigate(ROUTE.DASHBOARD);
  };

  return (
    <StyledFormWrapper>
      <SignInFormContainer>
        <img src={Logo} alt="Logo" />
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginFormTitle align="center">Sign in</LoginFormTitle>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormInputLabel shrink={false} htmlFor={"Email"}>
                <Typography>Email</Typography>
              </FormInputLabel>
              <FormInput
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email && "Email is required"}
                {...register("email", { required: true })}
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
          <LoginDivider>Or log in with</LoginDivider>
          <LoginWithGoogleButton
            onClick={logInWithGoogle}
            variant="outlined"
            fullWidth
          >
            <GoogleImg src={GoogleIcon} alt="google icon" /> Google
          </LoginWithGoogleButton>
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
