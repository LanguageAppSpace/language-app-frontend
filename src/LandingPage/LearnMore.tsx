import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { useTranslation } from "react-i18next";

interface LearnMoreFeature {
  title: string;
  description: string;
  button: string;
}
const LearnMore = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  const features = t("learnMore.features", {
    returnObjects: true,
  }) as LearnMoreFeature[];
  const handleRegisterClick = () => {
    navigate(ROUTE.REGISTER);
  };

  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      <HeroBox>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {t("learnMore.hero.title")}
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            {t("learnMore.hero.subtitle")}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ borderRadius: "20px", px: 4, py: 1.5 }}
          >
            {t("learnMore.hero.button")}
          </Button>
        </Container>
      </HeroBox>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          {t("learnMore.whyUs.title")}
        </Typography>
        <Grid container spacing={4}>
          {features.map(({ title, description, button }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <FeatureCard>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" endIcon={<ArrowForwardIcon />}>
                    {button}
                  </Button>
                </CardActions>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 8,
          textAlign: "center",
          borderRadius: "20px",
          mx: { xs: 2, md: 4 },
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {t("learnMore.cta.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {t("learnMore.cta.subtitle")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegisterClick}
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: "25px", px: 5, py: 1.8, fontSize: "1.1rem" }}
          >
            {t("learnMore.cta.button")}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s ease-in-out",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

export default LearnMore;
