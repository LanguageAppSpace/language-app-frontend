import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import deviceSizes from "@/cssConsts";
import Typography from "@mui/material/Typography";

export const AuthFormContainer = styled("div")(() => ({
  maxWidth: "640px",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}));

export const AuthForm = styled("form")(({ theme }) => ({
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

export const AuthFormTitle = styled(Typography)(({ theme }) => ({
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
