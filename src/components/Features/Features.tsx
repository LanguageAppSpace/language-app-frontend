import { Grid, Typography, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container } from "@mui/system";

const Features = () => {
  const featuresContainerStyles = {
    backgroundColor: "rgb(255,255,255)",
    padding: "80px 0",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    gap: "16px",
  };

  const iconStyles = {
    height: "80px",
    width: "80px",
    marginBottom: "10px",
  };

  const textTypographyStyles = {
    color: "#1A2434",
    textAlign: "start",
    fontWeight: "bold",
  };

  const bodyTextTypographyStyles = {
    marginTop: "20px",
    lineHeight: 1.5,
  };

  const gridItemStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const buttonStyles = {
    backgroundColor: "rgb(255,255,255)",
    "&:hover": {
      backgroundColor: "rgb(250, 250, 255)",
    },
    color: "black",
    justifyContent: "start",
    padding: 0,
    marginTop: "10px",
  };

  return (
    <Box sx={featuresContainerStyles}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={headerTypographyStyles}>
          Best learning experience
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={3} sx={gridItemStyles}>
            <img src="/human.svg" alt="Human Icon" style={iconStyles} />
            <Typography variant="h6" sx={textTypographyStyles}>
              Free. Fun. Effective.
            </Typography>
            <Typography variant="body1" sx={bodyTextTypographyStyles}>
              Enjoy learning at no cost with our engaging and proven methods.
              Discover a fun way to enhance your language skills effectively!
            </Typography>
            <Button
              sx={buttonStyles}
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} sx={gridItemStyles}>
            <img src="/remote.svg" alt="Remote Icon" style={iconStyles} />
            <Typography variant="h6" sx={textTypographyStyles}>
              Interactive learning
            </Typography>
            <Typography variant="body1" sx={bodyTextTypographyStyles}>
              Dive into interactive lessons designed to keep you engaged and
              motivated. Practice in real-time and get immediate feedback to
              improve faster
            </Typography>
            <Button
              sx={buttonStyles}
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} sx={gridItemStyles}>
            <img src="/padlock.svg" alt="Padlock Icon" style={iconStyles} />
            <Typography variant="h6" sx={textTypographyStyles}>
              Learn anytime, anywhere
            </Typography>
            <Typography variant="body1" sx={bodyTextTypographyStyles}>
              Access your courses anytime, anywhere. Whether you're on the go or
              at home, your learning experience is always within reach.
            </Typography>
            <Button
              sx={buttonStyles}
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} sx={gridItemStyles}>
            <img
              src="/certificate.svg"
              alt="Certificate Icon"
              style={iconStyles}
            />
            <Typography variant="h6" sx={textTypographyStyles}>
              Personalized learning
            </Typography>
            <Typography variant="body1" sx={bodyTextTypographyStyles}>
              Tailor your learning journey to fit your needs. Our app adapts to
              your level and pace, ensuring you achieve your language goals.
            </Typography>
            <Button
              sx={buttonStyles}
              variant="text"
              endIcon={<ArrowForwardIcon />}
            >
              Learn more
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
