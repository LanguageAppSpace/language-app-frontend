import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container } from "@mui/system";
import { styled } from "@mui/material/styles";

const Features = () => {
  return (
    <FeaturesContainer>
      <Container maxWidth="xl">
        <FeaturesHeader>Best learning experience</FeaturesHeader>
        <Grid container spacing={6}>
          <FeatureItem item xs={6} sm={3}>
            <FeatureIcon src="/human.svg" alt="Human Icon" />
            <FeatureHeader variant="h6">Free. Fun. Effective.</FeatureHeader>
            <BodyText>
              Enjoy learning at no cost with our engaging and proven methods.
              Discover a fun way to enhance your language skills effectively!
            </BodyText>
            <LearnMoreButton variant="text" endIcon={<ArrowForwardIcon />}>
              Learn more
            </LearnMoreButton>
          </FeatureItem>
          <FeatureItem item xs={6} sm={3}>
            <FeatureIcon src="/remote.svg" alt="Remote Icon" />
            <FeatureHeader variant="h6">Interactive learning</FeatureHeader>
            <BodyText>
              Dive into interactive lessons designed to keep you engaged and
              motivated. Practice in real-time and get immediate feedback to
              improve faster.
            </BodyText>
            <LearnMoreButton variant="text" endIcon={<ArrowForwardIcon />}>
              Learn more
            </LearnMoreButton>
          </FeatureItem>
          <FeatureItem item xs={6} sm={3}>
            <FeatureIcon src="/padlock.svg" alt="Padlock Icon" />
            <FeatureHeader variant="h6">Learn anytime, anywhere</FeatureHeader>
            <BodyText>
              Access your courses anytime, anywhere. Whether you're on the go or
              at home, your learning experience is always within reach.
            </BodyText>
            <LearnMoreButton variant="text" endIcon={<ArrowForwardIcon />}>
              Learn more
            </LearnMoreButton>
          </FeatureItem>
          <FeatureItem item xs={6} sm={3}>
            <FeatureIcon src="/certificate.svg" alt="Certificate Icon" />
            <FeatureHeader variant="h6">Personalized learning</FeatureHeader>
            <BodyText>
              Tailor your learning journey to fit your needs. Our app adapts to
              your level and pace, ensuring you achieve your language goals.
            </BodyText>
            <LearnMoreButton variant="text" endIcon={<ArrowForwardIcon />}>
              Learn more
            </LearnMoreButton>
          </FeatureItem>
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

const FeaturesHeader = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  textAlign: "center",
  width: "100%",
  fontWeight: "bold",
  fontSize: theme.typography.h1.fontSize,
}));

const BodyText = styled(Typography)({
  marginTop: "20px",
  fontFamily: "Poppins",
});

const FeatureHeader = styled(Typography)({
  color: "#1a2434",
  textAlign: "start",
  fontWeight: 700,
});

const LearnMoreButton = styled(Button)({
  color: "black",
  justifyContent: "start",
  paddingLeft: 0,

  "&:hover": {
    backgroundColor: "rgb(255, 255, 255)",
  },
});

const FeatureItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export default Features;
