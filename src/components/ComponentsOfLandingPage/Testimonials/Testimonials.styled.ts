import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const StyledContainer = styled(Box)({
  backgroundColor: "rgb(255,255,255)",
  padding: "60px 0",
});

export const StyledHeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
});

export const StyledHeaderTypography = styled(Typography)({
  color: "rgb(0,0,0)",
  fontWeight: "bold",
  paddingBottom: "20px",
});

export const StyledTestimonialBox = styled(Box)({
  backgroundColor: "rgb(250,250,250)",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

export const StyledImageContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
});

export const StyledTextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

export const StyledNameText = styled(Typography)({
  fontWeight: "bold",
  marginTop: "10px",
});

export const StyledProfessionText = styled(Typography)({
  marginTop: "5px",
  fontStyle: "italic",
});

export const StyledIconContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  color: "rgb(255,179,31)",
});

export const StyledIconText = styled(Typography)({
  marginLeft: "10px",
});

export const StyledFooterText = styled(Typography)({
  marginTop: "20px",
});
