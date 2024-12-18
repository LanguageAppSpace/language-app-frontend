import { styled } from "@mui/material/styles";
import { Grid, Typography, Box, Button } from "@mui/material";

export const FeaturesContainer = styled(Box)({
    backgroundColor: "rgb(255,255,255)",
    padding: "80px 0",
});

export const HeaderTypography = styled(Typography)({
    color: "rgb(0,0,0)",
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    gap: "16px",
});

export const StyledIcon = styled(Box)({
    height: "80px",
    width: "80px",
    marginBottom: "10px",
});

export const StyledTypography = styled(Typography)({
    color: "#1A2434",
    textAlign: "start",
    fontWeight: "bold",
});

export const StyledBodyTypography = styled(Typography)({
    marginTop: "20px",
    lineHeight: 1.5,
});

export const StyledGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

export const StyledButton = styled(Button)({
    backgroundColor: "rgb(255,255,255)",
    "&:hover": {
        backgroundColor: "rgb(250, 250, 255)",
    },
    color: "black",
    justifyContent: "start",
    padding: 0,
    marginTop: "10px",
});