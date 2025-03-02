import { useForm } from "react-hook-form";
import { Grid, Typography, InputLabel, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { StyledFormWrapper, LoginButton } from "@components/Login/Login";
import RegisterImage from "@assets/images/register-page-image.png";
import Logo from "@assets/images/logo.svg";
import { ROUTE } from "@config/route.config";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "@/redux/auth/authApiSlice";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
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
  const [registerUser] = useRegisterUserMutation();
  const handleSumbit = async (data: FormData) => {
    const userData = {
      email: data.email,
      password: data.password,
      username: data.username,
      password_confirm: data.confirmPassword,
    };
    try {
      await registerUser(userData).unwrap();
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
              Already have an account?
              <LogInLink to={ROUTE.LOGIN}>Log in</LogInLink>
            </RegisterFormSubtitle>
            <Grid container direction="column">
              <FormRow>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"username"}>
                    <Typography>Username</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    {...register("username", { required: true })}
                    variant="outlined"
                  />
                </Grid>
              </FormRow>
              <FormRow>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"email"}>
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
                  <FormInputLabel shrink={false} htmlFor={"password"}>
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
                  <FormInputLabel shrink={false} htmlFor={"confirmPassword"}>
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

export const RegisterForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  borderRadius: "24px",
  border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
  padding: "56px",
  maxWidth: "1017px",
  boxSizing: "border-box",
}));

export const StyledRegisterImage = styled("img")(() => ({
  width: "100%",
}));

export const RegisterFormTitle = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.primary.light}`,
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 500,
  marginTop: theme.spacing(2),
}));

export const RegisterFormSubtitle = styled(Typography)(({ theme }) => ({
  color: `${theme.palette.primary.light}`,
  fontSize: "16px",
  fontWeight: 400,
  marginTop: theme.spacing(1),
  marginBottom: "40px",
}));

export const LogInLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.light}`,
  textDecoration: "underline",
  cursor: "pointer",
}));

export const FormRow = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "12px 0",
  gap: theme.spacing(2),
}));

export const FormInputLabel = styled(InputLabel)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  paddingBottom: "7px",
}));

export const RegisterFormButtons = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
  alignItems: "flex-end",
}));

export const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: `${theme.palette.text.secondary}`,
    borderRadius: "12px",
    border: `1px solid ${alpha(theme.palette.primary.light, 0.35)}`,
  },
  "& .MuiOutlinedInput-root ": {
    borderRadius: "12px",
    border: "none",
  },
}));

