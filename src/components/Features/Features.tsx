import { Grid, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container } from "@mui/system";
import styled from "@emotion/styled";

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
              improve faster
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

const FeaturesContainer = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 80px 0;
`;

const FeatureIcon = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 10px;
`;

const FeaturesHeader = styled(Typography)`
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 34px;
`;

const BodyText = styled.p`
  margin-top: 20px;
  font-family: Poppins;
`;

const FeatureHeader = styled(Typography)`
  color: #1a2434;
  text-align: start;
  font-weight: 700;
`;

const LearnMoreButton = styled(Button)`
  background-color: rgb(255, 255, 255);
  color: black;
  justify-content: start;
  padding: 0;

  &:hover {
    background-color: rgb(250, 250, 255);
  }
`;

const FeatureItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Features;
