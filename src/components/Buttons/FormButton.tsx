import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.primary.main,
  padding: "17px 26px",
  color: theme.palette.text.primary,
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0.4px",
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default FormButton;
