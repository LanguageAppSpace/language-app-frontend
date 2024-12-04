import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const HeroContainer = styled("div")(() => ({
  backgroundColor: "rgb(245, 252, 255)",
  paddingTop: "50px",
}));

export const TextContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const HeaderTypography = styled(Typography)(() => ({
  color: "rgb(0,0,0)",
  marginBottom: "10px",
  fontWeight: "bold",
}));

export const BodyTypography = styled(Typography)(() => ({
  color: "rgb(0,0,0)",
}));

export const ImageContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

export const StyledImage = styled("img")(() => ({
  width: "450px",
}));

export const StyledButton = styled("button")(({ theme }) => ({
  margin: "20px 20px 20px 0",
  padding: "10px",
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  color: theme.palette.text.primary,
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "624px",
  "&:hover": {
    backgroundColor: "rgb(30, 42, 50)",
  },
}));
