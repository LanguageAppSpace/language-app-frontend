import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";

const LearnMore = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(ROUTE.REGISTER);
  };

  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      <HeroBox>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Unlock Your Language Potential
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Dive into the world of new languages with our intuitive and
            effective app. Learn at your own pace, track your progress, and
            achieve your goals!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ borderRadius: "20px", px: 4, py: 1.5 }}
          >
            Start learning for free
          </Button>
        </Container>
      </HeroBox>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Personalized Lessons
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our app adapts to your learning style and level, offering
                  personalized learning paths tailored just for you.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  Learn More
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Interactive Exercises
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Learn through engaging games, challenging quizzes, and
                  real-life conversations that make learning fun and effective.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  Discover Exercises
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Progress Tracking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track your achievements, earn badges, and stay motivated to
                  learn more with detailed statistics and insights.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  View Progress
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Offline Access
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Learn wherever you are, even without internet access. Download
                  lessons and exercises directly to your device.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  More Info
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Learner Community
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join a global community of language learners. Exchange
                  experiences, find study partners, and motivate each other.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  Join Now
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Professional Teachers
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Take advantage of optional lessons with certified teachers to
                  accelerate your language development and get personalized
                  feedback.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>
                  Meet Teachers
                </Button>
              </CardActions>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 8,
          textAlign: "center",
          borderRadius: "20px",
          mx: { xs: 2, md: 4 },
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Ready to start your language adventure?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join the thousands of satisfied users who are already learning with
            us!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegisterClick}
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: "25px", px: 5, py: 1.8, fontSize: "1.1rem" }}
          >
            Register Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s ease-in-out",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

export default LearnMore;
