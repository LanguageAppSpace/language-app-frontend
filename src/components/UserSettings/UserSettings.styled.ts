import { styled } from "@mui/material/styles";
import { InputLabel, TextField } from "@mui/material";
import { alpha } from "@mui/system";

export const StyledFormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

export const StyledContainer = styled("div")(() => ({
  width: "600px",
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

export const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "black",
    borderRadius: "12px",
    border: `1px solid ${alpha(theme.palette.primary.light, 0.35)}`,
  },
  "& .MuiOutlinedInput-root ": {
    borderRadius: "12px",
    border: "none",
  },
}));
