import { Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Container } from "@mui/system";
import styled from "@emotion/styled";

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

const TestimonialsContainer = styled.div`
  padding: 60px 0;
`;

const TestimonialsHeader = styled(Typography)`
  color: rgb(0, 0, 0);
  margin-bottom: 40px;
  text-align: center;
  width: 100%;
  font-weight: bold;
`;

const TestimonialsItem = styled.div`
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const TestimonialsItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const TestimonialsItemHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserName = styled(Typography)`
  font-weight: bold;
  margin-top: 10px;
`;

const Profession = styled(Typography)`
  margin-top: 5px;
  font-style: italic;
  font-size: 14px;
`;

const Rating = styled(Typography)`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  color: rgb(255, 179, 31);
`;

const RatingText = styled(Typography)`
  margin-left: 10px;
`;

const FooterText = styled(Typography)`
  margin-top: 20px;
`;

const TestimonialImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default Testimonials;
