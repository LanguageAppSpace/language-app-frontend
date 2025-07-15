import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.main,
  padding: "12px 20px",
  color: theme.palette.text.primary,
  fontSize: "16px",
  letterSpacing: "0.3px",
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default FormButton;
