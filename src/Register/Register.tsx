import { Grid, Typography, InputLabel, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import RegisterImage from "@/assets/images/register-page-image.png";
import { useDispatch } from "react-redux";
import deviceSizes from "@/cssConsts";
import FormButton from "@/components/Buttons/FormButton";
import { showNotification } from "@/redux/notification/notificationSlice";
import { useRegisterUserMutation } from "@/redux/auth/authApiSlice";
import { ROUTE } from "@/config/route.config";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PASSWORD_MIN_LENGTH = 6;

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    ),
  passwordConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const SignUpForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromQuery,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  const handleSumbit = async (data: FormData) => {
    try {
      await registerUser(data).unwrap();
      dispatch(
        showNotification({
          message: "Your account has been created successfully.",
          severity: "success",
        })
      );
      navigate(ROUTE.LOGIN);
    } catch (err) {
      const error = err as { data?: Record<string, string[]> };
      const errorData = error.data ?? {};
      const firstErrorKey = Object.keys(errorData)[0];
      const firstMessage =
        errorData[firstErrorKey]?.[0] ?? "Something went wrong";
      const formattedMessage =
        firstMessage.charAt(0).toUpperCase() + firstMessage.slice(1);

      dispatch(
        showNotification({
          message: formattedMessage,
          severity: "error",
        })
      );
    }
  };

  return (
    <RegisterFormContainer>
      <RegisterForm onSubmit={handleSubmit(handleSumbit)}>
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={7}>
            <RegisterFormTitle variant="h4">
              Create an account
            </RegisterFormTitle>
            <RegisterFormSubtitle>
              <>Already have an account?</>
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
                    {...register("username")}
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
                    type="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register("email")}
                  />
                </Grid>
              </FormRow>
              <FormRow>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"password"}>
                    <Typography>Password</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register("password")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"passwordConfirm"}>
                    <Typography>Confirm your password</Typography>
                  </FormInputLabel>
                  <FormInput
                    fullWidth
                    type="password"
                    error={Boolean(errors.passwordConfirm)}
                    helperText={errors.passwordConfirm?.message}
                    {...register("passwordConfirm")}
                  />
                </Grid>
              </FormRow>
            </Grid>
            <RegisterFormButtons>
              <FormButton
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                aria-label="Create an account"
              >
                Create an account
              </FormButton>
            </RegisterFormButtons>
          </Grid>
          <Grid item xs={5}>
            <StyledRegisterImage src={RegisterImage} alt="Register" />
          </Grid>
        </Grid>
      </RegisterForm>
    </RegisterFormContainer>
  );
};

export default SignUpForm;

const RegisterFormContainer = styled("div")(() => ({
  maxWidth: "100%",
  display: "flex",
  boxSizing: "border-box",
  flexDirection: "column",
  justifyContent: "center",
}));

const RegisterForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "24px",
  border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
  padding: "40px 56px",
  maxWidth: 1017,
  width: "100%",
  [theme.breakpoints.down(deviceSizes.md)]: {
    border: "none",
    padding: 16,
  },
}));

const StyledRegisterImage = styled("img")(() => ({
  width: "100%",
}));

const RegisterFormTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "32px",
  fontWeight: 500,
  marginTop: theme.spacing(2),
}));

const RegisterFormSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: "16px",
  fontWeight: 400,
  marginTop: theme.spacing(1),
  marginBottom: 36,
  [theme.breakpoints.down(deviceSizes.sm)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0.5,
    marginBottom: 4,
  },
}));

const LogInLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.light,
  textDecoration: "underline",
  cursor: "pointer",
}));

const FormRow = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "12px 0",
  gap: theme.spacing(2),
  [theme.breakpoints.down(deviceSizes.sm)]: {
    flexDirection: "column",
  },
}));

const FormInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: "16px",
  fontWeight: 400,
  paddingBottom: theme.spacing(1),
}));

const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
    borderRadius: "12px",
    border: `1px solid ${alpha(theme.palette.primary.light, 0.35)}`,
  },
  "& .MuiOutlinedInput-root ": {
    borderRadius: "12px",
    border: "none",
  },
}));

const RegisterFormButtons = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 16,
  alignItems: "center",
}));
