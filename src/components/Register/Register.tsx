import { useForm } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createAuthUserWithEmailAndPassword } from "@utils/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { StyledFormWrapper, LoginButton } from "@components/Login/Login.styled";
import {
  StyledRegisterImage,
  RegisterForm,
  RegisterFormTitle,
  RegisterFormSubtitle,
  LogInLink,
  FormRow,
  FormInputLabel,
  RegisterFormButtons,
  FormInput,
} from "@components/Register/Register.styled";
import RegisterImage from "@assets/images/register-page-image.png";
import Logo from "@assets/images/logo.svg";
import { ROUTE } from "@config/route.config";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required(" Password is required")
    .min(6, "Password  should have at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .min(6, "Password  should have at least 6 characters")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSumbit = async (data: FormData) => {
    const userData = {
      email: data.email,
      password: data.password,
      displayName: `${data.firstName} ${data.lastName}`,
    };

    try {
      await createAuthUserWithEmailAndPassword(userData);
      dispatch(
        showNotification({
          message: " Your account has been created successfully.",
          severity: "success",
        })
      );
      navigate(ROUTE.LOGIN);
    } catch (error) {
      dispatch(
        showNotification({
          message: "Account creation failed",
          severity: "error",
        })
      );
    }
  };

  return (
    <StyledFormWrapper>
      <RegisterForm onSubmit={handleSubmit(handleSumbit)}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={7}>
            <img src={Logo} alt="Logo" />
            <RegisterFormTitle variant="h4">
              Create an account
            </RegisterFormTitle>
            <RegisterFormSubtitle>
              Already have an account?{" "}
              <LogInLink to={ROUTE.LOGIN}>Log in</LogInLink>
            </RegisterFormSubtitle>
            <Grid container direction="column">
              <FormRow>
                <Grid item xs={6}>
                  <FormInputLabel shrink={false} htmlFor={"firstName"}>
                    <Typography>First name</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                    {...register("firstName", { required: true })}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputLabel shrink={false} htmlFor={"firstName"}>
                    <Typography>Last name</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                    {...register("lastName", { required: true })}
                  />
                </Grid>
              </FormRow>
              <FormRow>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"firstName"}>
                    <Typography>Email address</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register("email", { required: true })}
                  />
                </Grid>
              </FormRow>
              <FormRow>
                <Grid item xs={6} spacing={2}>
                  <FormInputLabel shrink={false} htmlFor={"firstName"}>
                    <Typography>Password</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register("password", { required: true })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputLabel shrink={false} htmlFor={"firstName"}>
                    <Typography>Confirm your password</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    type="password"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword", { required: true })}
                  />
                </Grid>
              </FormRow>
            </Grid>
            <RegisterFormButtons>
              <LogInLink to={ROUTE.LOGIN}>log in instead</LogInLink>
              <LoginButton
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              >
                Create an account
              </LoginButton>
            </RegisterFormButtons>
          </Grid>
          <Grid item xs={5}>
            <StyledRegisterImage src={RegisterImage} alt="Register" />
          </Grid>
        </Grid>
      </RegisterForm>
    </StyledFormWrapper>
  );
};

export default SignUpForm;
