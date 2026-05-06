import { Box, styled } from "@mui/material";

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  marginTop: theme.spacing(2),
}));

export default ButtonsContainer;
