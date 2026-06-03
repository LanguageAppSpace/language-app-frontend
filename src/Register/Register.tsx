import { Grid, Typography } from "@mui/material";
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
import { FormInput, FormInputLabel } from "@/components/Form/Form";
import { useTranslation } from "react-i18next";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PASSWORD_MIN_LENGTH = 6;

const SignUpForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";
  const { t } = useTranslation("auth");

  const schema = Yup.object().shape({
    username: Yup.string().required(t("register.validation.usernameRequired")),
    email: Yup.string()
      .email(t("register.validation.emailInvalid"))
      .required(t("register.validation.emailRequired")),
    password: Yup.string()
      .required(t("register.validation.passwordRequired"))
      .min(
        PASSWORD_MIN_LENGTH,
        t("register.validation.passwordMin", {
          count: PASSWORD_MIN_LENGTH,
        })
      ),
    passwordConfirm: Yup.string()
      .required(t("register.validation.passwordConfirmRequired"))
      .oneOf(
        [Yup.ref("password")],
        t("register.validation.passwordConfirmMatch")
      ),
  });

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
          message: t("register.notifications.success"),
          severity: "success",
        })
      );
      navigate(ROUTE.LOGIN);
    } catch (err) {
      const error = err as { data?: Record<string, string[]> };
      const errorData = error.data ?? {};
      const firstErrorKey = Object.keys(errorData)[0];
      const firstMessage =
        errorData[firstErrorKey]?.[0] ??
        t("register.notifications.errorFallback");
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
              {t("register.title")}
            </RegisterFormTitle>
            <RegisterFormSubtitle>
              {t("register.subtitle")}
              <LogInLink to={ROUTE.LOGIN}>
                {t("register.links.login")}
              </LogInLink>
            </RegisterFormSubtitle>
            <Grid container direction="column">
              <FormRow>
                <Grid item xs={12}>
                  <FormInputLabel shrink={false} htmlFor={"username"}>
                    <Typography>{t("register.fields.username")}</Typography>
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
                    <Typography>{t("register.fields.email")}</Typography>
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
                    <Typography>{t("register.fields.password")}</Typography>
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
                    <Typography>
                      {t("register.fields.passwordConfirm")}
                    </Typography>
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
                {t("register.buttons.submit")}
              </FormButton>
            </RegisterFormButtons>
          </Grid>
          <Grid item xs={5}>
            <StyledRegisterImage
              src={RegisterImage}
              alt={t("register.imageAlt")}
            />
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

const RegisterFormButtons = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 16,
  alignItems: "center",
}));
