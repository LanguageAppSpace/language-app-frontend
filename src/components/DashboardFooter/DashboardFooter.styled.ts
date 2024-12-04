import { styled } from "@mui/material/styles";
import { Box, Typography, Link } from "@mui/material";

export const StyledFooterContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "rgb(5, 20, 50)",
  padding: "80px 0",
  justifyContent: "space-between",
});

export const StyledColumnHeader = styled(Typography)({
  marginBottom: "10px",
  fontWeight: "bold",
  color: "rgb(255, 255, 255)",
});

export const StyledText = styled(Typography)({
  marginBottom: "10px",
  color: "rgb(179, 179, 179)",
});

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const StyledIconsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "rgb(179, 179, 179)",
});

export const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  marginBottom: "10px",
});
