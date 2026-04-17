import { Grid, Typography, Container, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
interface TestimonialItem {
  image: "boy" | "girl" | "girl2";
  name: string;
  profession: string;
  rating: string;
  text: string;
}
const testimonialImages: Record<TestimonialItem["image"], string> = {
  boy: "boy-testimonial.jpg",
  girl: "girl-testimonial.jpg",
  girl2: "girl2-testimonial.jpg",
};

const Testimonials = () => {
  const { t } = useTranslation("landing");
  const testimonials = t("testimonials.items", {
    returnObjects: true,
  }) as TestimonialItem[];

  return (
    <TestimonialsContainer>
      <Container maxWidth="xl">
        <TestimonialsHeader variant="h4">
          {t("testimonials.title")}
        </TestimonialsHeader>
        <Grid container justifyContent="space-between" spacing={6}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={4} key={testimonial.name}>
              <TestimonialsItem>
                <TestimonialsItemHeader>
                  <TestimonialImage
                    src={testimonialImages[testimonial.image]}
                    alt={testimonial.name}
                  />
                  <TestimonialsItemHeaderText>
                    <UserName>{testimonial.name}</UserName>
                    <Profession>{testimonial.profession}</Profession>
                    <Rating>
                      <StarIcon />
                      <RatingText>{testimonial.rating}</RatingText>
                    </Rating>
                  </TestimonialsItemHeaderText>
                </TestimonialsItemHeader>
                <FooterText variant="body1">{testimonial.text}</FooterText>
              </TestimonialsItem>
            </Grid>
          ))}
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

const Rating = styled(Box)(({ theme }) => ({
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
