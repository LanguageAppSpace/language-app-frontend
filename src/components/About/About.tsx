import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { Grid, Container } from "@mui/material";
import { AboutContainer, ImageGridItem, TextGridItem, HeaderTypography, BodyTypography, StyledButton } from "@components/About/About.styled.ts";

const About = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  return (
      <AboutContainer>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <ImageGridItem item xs={12} sm={6}>
              <img
                  src="/children.png"
                  alt="Children"
                  style={{ maxWidth: "100%" }}
              />
            </ImageGridItem>
            <TextGridItem item xs={12} sm={6}>
              <HeaderTypography variant="h4" >
                E-Learning Platform for Learning Language
              </HeaderTypography>
              <BodyTypography variant="body1">
                Unlock a world of opportunities with our interactive and engaging
                language courses. Whether you're a beginner or looking to perfect
                your skills, our platform offers a personalized learning
                experience to help you achieve fluency at your own pace.
              </BodyTypography>
              <StyledButton
                  variant="contained"
                  size="large"
                  onClick={handleLoginClick}
                  endIcon={<ArrowForwardIcon />}
              >
                Learn More
              </StyledButton>
            </TextGridItem>
          </Grid>
        </Container>
      </AboutContainer>
  );
};

export default About;