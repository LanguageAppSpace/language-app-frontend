import { styled } from "@mui/material/styles";
import { Typography, InputLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/system";

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
