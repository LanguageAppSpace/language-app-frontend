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
} from "@components/Login/Login.styled";
import {
  FormInput,
  FormInputLabel,
} from "@components/Register/Register.styled";
import Logo from "@/assets/images/logo.svg";
import { ROUTE } from "@/config/route.config";
import { useNavigate } from "react-router-dom";
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
