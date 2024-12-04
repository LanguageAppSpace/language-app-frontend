import {
  StyledContainer,
  StyledHeaderBox,
  StyledHeaderTypography,
  StyledTestimonialBox,
  StyledImageContainer,
  StyledTextContainer,
  StyledNameText,
  StyledProfessionText,
  StyledIconContainer,
  StyledIconText,
  StyledFooterText,
} from "@components/ComponentsOfLandingPage/Testimonials/Testimonials.styled";
import { Grid, Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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
