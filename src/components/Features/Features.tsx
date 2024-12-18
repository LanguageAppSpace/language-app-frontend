import { FeaturesContainer, HeaderTypography, StyledBodyTypography, StyledButton, StyledTypography, StyledGridItem} from "@components/Features/Features.styled.ts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container, Grid } from "@mui/material";

const Features = () => {
  return (
    <FeaturesContainer>
      <Container maxWidth="xl">
        <HeaderTypography variant="h4">
          Best learning experience
        </HeaderTypography>
        <Grid container spacing={6}>
          <StyledGridItem item xs={6} sm={3}>
            <img src="/human.svg" alt="Human Icon" />
            <StyledTypography variant="h6">
              Free. Fun. Effective.
            </StyledTypography>
            <StyledBodyTypography variant="body1">
              Enjoy learning at no cost with our engaging and proven methods.
              Discover a fun way to enhance your language skills effectively!
            </StyledBodyTypography>
            <StyledButton
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </StyledButton>
          </StyledGridItem>
          <StyledGridItem item xs={6} sm={3}>
            <img src="/remote.svg" alt="Remote Icon"/>
            <StyledTypography variant="h6" >
              Interactive learning
            </StyledTypography>
            <StyledBodyTypography variant="body1">
              Dive into interactive lessons designed to keep you engaged and
              motivated. Practice in real-time and get immediate feedback to
              improve faster
            </StyledBodyTypography>
            <StyledButton
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </StyledButton>
          </StyledGridItem>
          <StyledGridItem item xs={6} sm={3}>
            <img src="/padlock.svg" alt="Padlock Icon"/>
            <StyledTypography variant="h6">
              Learn anytime, anywhere
            </StyledTypography>
            <StyledBodyTypography variant="body1">
              Access your courses anytime, anywhere. Whether you're on the go or
              at home, your learning experience is always within reach.
            </StyledBodyTypography>
            <StyledButton
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </StyledButton>
          </StyledGridItem>
          <StyledGridItem item xs={6} sm={3}>
            <img
              src="/certificate.svg"
              alt="Certificate Icon"
            />
            <StyledTypography variant="h6">
              Personalized learning
            </StyledTypography>
            <StyledBodyTypography variant="body1">
              Tailor your learning journey to fit your needs. Our app adapts to
              your level and pace, ensuring you achieve your language goals.
            </StyledBodyTypography>
            <StyledButton
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </StyledButton>
          </StyledGridItem>
        </Grid>
      </Container>
    </FeaturesContainer>
  );
};

export default Features;
