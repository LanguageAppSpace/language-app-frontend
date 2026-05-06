import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import { Box, Grid, Button, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const About = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  const handleLoginClick = () => {
    navigate(ROUTE.LEARN_MORE);
  };

  return (
    <AboutContainer>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <ImageGridItem item xs={12} sm={6}>
            <img
              src="/children.png"
              alt={`${t("about.imageAlt")}`}
              style={{ maxWidth: "100%" }}
            />
          </ImageGridItem>
          <TextGridItem item xs={12} sm={6}>
            <HeaderTypography variant="h4">{t("about.title")}</HeaderTypography>
            <BodyTypography variant="body1">
              {t("about.description")}
            </BodyTypography>
            <StyledButton
              variant="contained"
              size="large"
              onClick={handleLoginClick}
              endIcon={<ArrowForwardIcon />}
            >
              {t("about.buttonText")}
            </StyledButton>
          </TextGridItem>
        </Grid>
      </Container>
    </AboutContainer>
  );
};

const AboutContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  padding: "30px 0",
}));

const ImageGridItem = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const TextGridItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  textAlign: "start",
  gap: "20px",
});

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: "bold",
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)({
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  width: "307px",
  "&:hover": {
    backgroundColor: "rgb(30, 42, 50)",
  },
});

export default About;
