import { Grid, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface FeatureItemTranslation {
  iconAlt: string;
  title: string;
  description: string;
}

const featureIcons = [
  { icon: "/human.svg" },
  { icon: "/remote.svg" },
  { icon: "/padlock.svg" },
  { icon: "/certificate.svg" },
];

const Features = () => {
  const { t } = useTranslation("landing");

  const items = t("features.items", {
    returnObjects: true,
  }) as FeatureItemTranslation[];

  return (
    <FeaturesContainer>
      <Container maxWidth="xl">
        <FeaturesHeader>{t("features.title")}</FeaturesHeader>
        <Grid container spacing={6}>
          {items.map((feature, index) => (
            <FeatureItem item xs={6} sm={3} key={feature.title}>
              <FeatureIcon
                src={featureIcons[index]?.icon}
                alt={feature.iconAlt}
              />
              <FeatureHeader variant="h6">{feature.title}</FeatureHeader>
              <BodyText>{feature.description}</BodyText>
              <LearnMoreButton variant="text" endIcon={<ArrowForwardIcon />}>
                {t("features.learnMore")}
              </LearnMoreButton>
            </FeatureItem>
          ))}
        </Grid>
      </Container>
    </FeaturesContainer>
  );
};

const FeaturesContainer = styled(Box)({
  padding: "80px 0",
});

const FeatureIcon = styled("img")({
  height: "80px",
  width: "80px",
  marginBottom: "10px",
});

const FeaturesHeader = styled(Typography)({
  marginBottom: "20px",
  textAlign: "center",
  width: "100%",
  fontWeight: "bold",
  fontSize: "34px",
});

const BodyText = styled(Typography)({
  marginTop: "20px",
  fontFamily: "Poppins",
});

const FeatureHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: "start",
  fontWeight: 700,
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: "start",
  paddingLeft: 0,
  "&:hover": {
    backgroundColor: theme.palette.text.primary,
  },
}));

const FeatureItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export default Features;
