import { styled } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";

export const StyledContactContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgb(236, 177, 89)",
  padding: "80px 0",
});

export const StyledTextContainer = styled(Box)({
  textAlign: "left",
  borderRadius: "16px",
});

export const StyledFormContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const StyledInputBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fdeac1",
  padding: "8px",
  borderRadius: "24px",
});

export const StyledTextField = styled(TextField)({
  backgroundColor: "#fae7cc",
  borderRadius: "30px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    padding: "0 12px",
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 0",
    color: "#333",
    "&::placeholder": {
      color: "#333",
      opacity: 1,
    },
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: "#111827",
  color: "#fff",
  padding: "8px 24px",
  borderRadius: "16px",
  marginLeft: "8px",
  width: "127px",
  height: "50px",
  "&:hover": {
    backgroundColor: "#333d47",
  },
});
