import { Button, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import image from "@/assets/images/boy.jpeg";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  const handleLoginClick = () => {
    navigate(ROUTE.LEARN_MORE);
  };

  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between">
          <TextContainer>
            <HeaderTypography variant="h4">{t("hero.title")}</HeaderTypography>
            <BodyTypography variant="body1">
              {t("hero.description")}
            </BodyTypography>
            <StyledButton onClick={handleLoginClick}>
              {t("hero.buttonText").toUpperCase()}
              <ArrowForwardIcon style={{ marginLeft: "8px" }} />
            </StyledButton>
          </TextContainer>
          <ImageContainer>
            <StyledImage src={image} alt="boy with flags" />
          </ImageContainer>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  paddingTop: "120px",
}));

const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 50%",
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: "10px",
  fontWeight: "bold",
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ImageContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const StyledImage = styled("img")(() => ({
  width: "450px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "20px 20px 20px 0",
  padding: "10px",
  backgroundColor: theme.palette.button.main,
  borderRadius: "16px",
  color: theme.palette.text.primary,
  fontSize: "16px",
  display: "flex",
  textAlign: "center",
  "&:hover": {
    backgroundColor: theme.palette.button.mainHover,
  },
}));
