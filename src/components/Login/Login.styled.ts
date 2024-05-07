import { styled } from "@mui/material/styles";
import { Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/system";

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
