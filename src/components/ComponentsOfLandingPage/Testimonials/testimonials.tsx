import { Grid, Container, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const Testimonials = () => {
  return (
    <StyledContainer>
      <Container maxWidth="xl">
        <StyledHeaderBox>
          <StyledHeaderTypography variant="h4">
            What others think:
          </StyledHeaderTypography>
        </StyledHeaderBox>

        <Grid container justifyContent="space-between" spacing={6}>
          <Grid item xs={12} sm={4}>
            <StyledTestimonialBox>
              <StyledImageContainer>
                <img
                  src="boy-testimonial.jpg"
                  alt="Boy-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <StyledTextContainer>
                  <StyledNameText variant="body1">Michael Wong</StyledNameText>
                  <StyledProfessionText variant="body2">
                    Footballer
                  </StyledProfessionText>
                  <StyledIconContainer>
                    <StarIcon />
                    <StyledIconText variant="body2">4.9</StyledIconText>
                  </StyledIconContainer>
                </StyledTextContainer>
              </StyledImageContainer>
              <StyledFooterText variant="body1">
                Learning a new language has never been easier! The app's
                interactive lessons fit perfectly into my busy schedule, helping
                me connect with teammates from around the world.
              </StyledFooterText>
            </StyledTestimonialBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledTestimonialBox>
              <StyledImageContainer>
                <img
                  src="girl-testimonial.jpg"
                  alt="Girl-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <StyledTextContainer>
                  <StyledNameText variant="body1">Avril Song</StyledNameText>
                  <StyledProfessionText variant="body2">
                    Project manager
                  </StyledProfessionText>
                  <StyledIconContainer>
                    <StarIcon />
                    <StyledIconText variant="body2">4.8</StyledIconText>
                  </StyledIconContainer>
                </StyledTextContainer>
              </StyledImageContainer>
              <StyledFooterText variant="body1">
                The personalized approach to learning is fantastic. I was able
                to focus on the specific skills I needed for my job, and now I
                can communicate confidently with international clients.
              </StyledFooterText>
            </StyledTestimonialBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledTestimonialBox>
              <StyledImageContainer>
                <img
                  src="girl2-testimonial.jpg"
                  alt="Girl2-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <StyledTextContainer>
                  <StyledNameText variant="body1">Jeane Wood</StyledNameText>
                  <StyledProfessionText variant="body2">
                    Philosophy student
                  </StyledProfessionText>
                  <StyledIconContainer>
                    <StarIcon />
                    <StyledIconText variant="body2">5.0</StyledIconText>
                  </StyledIconContainer>
                </StyledTextContainer>
              </StyledImageContainer>
              <StyledFooterText variant="body1">
                This app is a game-changer! The lessons are engaging and really
                helped me grasp complex language concepts quickly. I’m now
                exploring philosophical texts in their original language.
              </StyledFooterText>
            </StyledTestimonialBox>
          </Grid>
        </Grid>
      </Container>
    </StyledContainer>
  );
};

export default Testimonials;

const StyledContainer = styled(Box)({
  backgroundColor: "rgb(255,255,255)",
  padding: "60px 0",
});

const StyledHeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
});

const StyledHeaderTypography = styled(Typography)({
  color: "rgb(0,0,0)",
  fontWeight: "bold",
  paddingBottom: "20px",
});

const StyledTestimonialBox = styled(Box)({
  backgroundColor: "rgb(250,250,250)",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

const StyledImageContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
});

const StyledTextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

const StyledNameText = styled(Typography)({
  fontWeight: "bold",
  marginTop: "10px",
});

const StyledProfessionText = styled(Typography)({
  marginTop: "5px",
  fontStyle: "italic",
});

const StyledIconContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  color: "rgb(255,179,31)",
});

const StyledIconText = styled(Typography)({
  marginLeft: "10px",
});

const StyledFooterText = styled(Typography)({
  marginTop: "20px",
});
