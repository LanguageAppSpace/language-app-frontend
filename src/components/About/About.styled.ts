import { styled } from "@mui/material/styles";
import { Box, Grid, Button, Typography } from "@mui/material";

export const AboutContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgb(245, 252, 255)",
    padding: "30px 0",
}));

export const ImageGridItem = styled(Grid)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
}));

export const TextGridItem = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "start",
    gap: "20px",
}));

export const HeaderTypography = styled(Typography)(({ theme }) => ({
    color: "rgb(0,0,0)",
    fontWeight: "bold",
}));

export const BodyTypography = styled(Typography)(({ theme }) => ({
    color: "rgb(0,0,0)",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    width: "307px",
    "&:hover": {
        backgroundColor: "rgb(30, 42, 50)",
    },
}));