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

type FormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required(" Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // TODO: Finish login functionality
    console.log(data);
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
