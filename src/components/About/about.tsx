import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { Container } from "@mui/system";

const About = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  const aboutContainerStyles = {
    backgroundColor: "rgb(245, 252, 255)",
    padding: "30px 0",
  };

  const imageGridItemStyles = {
    display: "flex",
    alignItems: "center",
  };

  const textGridItemStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "start",
    gap: "20px",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
    fontWeight: "bold",
  };

  const bodyTypographyStyles = {
    color: "rgb(0,0,0)",
  };

  const buttonStyles = {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(30, 42, 50)",
    },
    width: "307px",
  };

  return (
    <Box sx={aboutContainerStyles}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={imageGridItemStyles}>
            <img
              src="/children.png"
              alt="Children"
              style={{ maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={textGridItemStyles}>
            <Typography variant="h4" sx={headerTypographyStyles}>
              E-Learning Platform for Learning Language
            </Typography>
            <Typography variant="body1" sx={bodyTypographyStyles}>
              Unlock a world of opportunities with our interactive and engaging
              language courses. Whether you're a beginner or looking to perfect
              your skills, our platform offers a personalized learning
              experience to help you achieve fluency at your own pace.
            </Typography>
            <Button
              sx={buttonStyles}
              variant="contained"
              size="large"
              onClick={handleLoginClick}
              endIcon={<ArrowForwardIcon />}
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
