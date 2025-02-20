import { Grid, Typography, Container, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const Testimonials = () => {
  return (
    <TestimonialsContainer>
      <Container maxWidth="xl">
        <TestimonialsHeader variant="h4">What others think:</TestimonialsHeader>

        <Grid container justifyContent="space-between" spacing={6}>
          <Grid item xs={12} sm={4}>
            <TestimonialsItem>
              <TestimonialsItemHeader>
                <TestimonialImage
                  src="boy-testimonial.jpg"
                  alt="Boy-testimonial-image"
                />
                <TestimonialsItemHeaderText>
                  <UserName>Michael Wong</UserName>
                  <Profession>Footballer</Profession>
                  <Rating>
                    <StarIcon />
                    <RatingText>4.9</RatingText>
                  </Rating>
                </TestimonialsItemHeaderText>
              </TestimonialsItemHeader>
              <FooterText variant="body1">
                Learning a new language has never been easier! The app's
                interactive lessons fit perfectly into my busy schedule, helping
                me connect with teammates from around the world.
              </FooterText>
            </TestimonialsItem>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TestimonialsItem>
              <TestimonialsItemHeader>
                <TestimonialImage
                  src="girl-testimonial.jpg"
                  alt="Girl-testimonial-image"
                />
                <TestimonialsItemHeaderText>
                  <UserName>Avril Song</UserName>
                  <Profession>Project manager</Profession>
                  <Rating>
                    <StarIcon />
                    <RatingText>4.8</RatingText>
                  </Rating>
                </TestimonialsItemHeaderText>
              </TestimonialsItemHeader>
              <FooterText variant="body1">
                The personalized approach to learning is fantastic. I was able
                to focus on the specific skills I needed for my job, and now I
                can communicate confidently with international clients.
              </FooterText>
            </TestimonialsItem>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TestimonialsItem>
              <TestimonialsItemHeader>
                <TestimonialImage
                  src="girl2-testimonial.jpg"
                  alt="Girl2-testimonial-image"
                />
                <TestimonialsItemHeaderText>
                  <UserName>Jeane Wood</UserName>
                  <Profession>Philosophy student</Profession>
                  <Rating>
                    <StarIcon />
                    <RatingText>5.0</RatingText>
                  </Rating>
                </TestimonialsItemHeaderText>
              </TestimonialsItemHeader>
              <FooterText variant="body1">
                This app is a game-changer! The lessons are engaging and really
                helped me grasp complex language concepts quickly. I’m now
                exploring philosophical texts in their original language.
              </FooterText>
            </TestimonialsItem>
          </Grid>
        </Grid>
      </Container>
    </TestimonialsContainer>
  );
};

const TestimonialsContainer = styled(Box)({
  padding: "60px 0",
});

const TestimonialsHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: "40px",
  textAlign: "center",
  width: "100%",
  fontWeight: "bold",
}));

const TestimonialsItem = styled(Box)(({ theme }) => ({
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: theme.palette.text.primary,
}));

const TestimonialsItemHeader = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
});

const TestimonialsItemHeaderText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

const UserName = styled(Typography)({
  fontWeight: "bold",
  marginTop: "10px",
});

const Profession = styled(Typography)({
  marginTop: "5px",
  fontStyle: "italic",
  fontSize: "14px",
});

const Rating = styled(Box)(({theme}) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  fontSize: "14px",
  color: theme.palette.secondary.light,
}));

const RatingText = styled(Typography)({
  marginLeft: "10px",
});

const FooterText = styled(Typography)({
  marginTop: "20px",
});

const TestimonialImage = styled("img")({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
});

export default Testimonials;
