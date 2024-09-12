import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import image from "/boy.jpeg";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { Container } from "@mui/system";

const Hero = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  const heroContainerStyles = {
    backgroundColor: "rgb(245, 252, 255)",
    paddingTop: "50px",
  };

  const textContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const bodyTypographyStyles = {
    color: "rgb(0,0,0)",
  };

  const imageContainerStyles = {
    display: "flex",
    alignItems: "center",
  };

  const imageStyles = {
    width: "450px",
  };

  const buttonStyles = {
    margin: "20px 20px 20px 0",
    padding: "10px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(30, 42, 50)",
    },
    width: "624px",
  };

  return (
    <Box sx={heroContainerStyles}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between">
          <Grid item sx={textContainerStyles} sm={6}>
            <Typography variant="h4" sx={headerTypographyStyles}>
              Learn a Language, Unlock a World
            </Typography>
            <Typography variant="body1" sx={bodyTypographyStyles}>
              Expand your horizons with interactive lessons designed to make
              language learning easy, effective, and fun.
            </Typography>
            <Button
              sx={buttonStyles}
              variant="contained"
              size="large"
              onClick={handleLoginClick}
              endIcon={<ArrowForwardIcon />}
            >
              LEARN MORE
            </Button>
          </Grid>

          <Grid item sx={imageContainerStyles}>
            <img src={image} alt="boy with flags" style={imageStyles} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
