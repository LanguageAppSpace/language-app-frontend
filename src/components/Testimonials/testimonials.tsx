import { Box, Grid, Typography } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import { Container } from "@mui/system";

const Testimonials = () => {
  const containerStyles = {
    backgroundColor: "rgb(255,255,255)",
    padding: "60px 0",
  };

  const headerBoxStyles = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
    fontWeight: "bold",
    paddingBottom: "20px",
  };

  const testimonialBoxStyles = {
    backgroundColor: "rgb(250,250,250)",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const imageContainerStyles = {
    display: "flex",
    alignItems: "flex-start",
  };

  const testimonialTextContainerStyles = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  };

  const nameTextStyles = {
    fontWeight: "bold",
    marginTop: "10px",
  };

  const professionTextStyles = {
    marginTop: "5px",
    fontStyle: "italic",
  };

  const iconContainerStyles = {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    color: "rgb(255,179,31)",
  };

  const iconTextStyles = {
    marginLeft: "10px",
  };

  const footerTextStyles = {
    marginTop: "20px",
  };

  return (
    <Box sx={containerStyles}>
      <Container maxWidth="xl">
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={headerTypographyStyles}>
            What others think:
          </Typography>
        </Box>

        <Grid container justifyContent="space-between" spacing={6}>
          <Grid item xs={12} sm={4}>
            <Box sx={testimonialBoxStyles}>
              <Box sx={imageContainerStyles}>
                <img
                  src="boy-testimonial.jpg"
                  alt="Boy-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <Box sx={testimonialTextContainerStyles}>
                  <Typography variant="body1" sx={nameTextStyles}>
                    Michael Wong
                  </Typography>
                  <Typography variant="body2" sx={professionTextStyles}>
                    Footballer
                  </Typography>
                  <Box sx={iconContainerStyles}>
                    <StarIcon />
                    <Typography variant="body2" sx={iconTextStyles}>
                      4.9
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1" sx={footerTextStyles}>
                Learning a new language has never been easier! The app's
                interactive lessons fit perfectly into my busy schedule, helping
                me connect with teammates from around the world.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={testimonialBoxStyles}>
              <Box sx={imageContainerStyles}>
                <img
                  src="girl-testimonial.jpg"
                  alt="Girl-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <Box sx={testimonialTextContainerStyles}>
                  <Typography variant="body1" sx={nameTextStyles}>
                    Avril Song
                  </Typography>
                  <Typography variant="body2" sx={professionTextStyles}>
                    Project manager
                  </Typography>
                  <Box sx={iconContainerStyles}>
                    <StarIcon />
                    <Typography variant="body2" sx={iconTextStyles}>
                      4.8
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1" sx={footerTextStyles}>
                The personalized approach to learning is fantastic. I was able
                to focus on the specific skills I needed for my job, and now I
                can communicate confidently with international clients.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={testimonialBoxStyles}>
              <Box sx={imageContainerStyles}>
                <img
                  src="girl2-testimonial.jpg"
                  alt="Girl2-testimonial-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <Box sx={testimonialTextContainerStyles}>
                  <Typography variant="body1" sx={nameTextStyles}>
                    Jeane Wood
                  </Typography>
                  <Typography variant="body2" sx={professionTextStyles}>
                    Philosophy student
                  </Typography>
                  <Box sx={iconContainerStyles}>
                    <StarIcon />
                    <Typography variant="body2" sx={iconTextStyles}>
                      5.0
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1" sx={footerTextStyles}>
                This app is a game-changer! The lessons are engaging and really
                helped me grasp complex language concepts quickly. I’m now
                exploring philosophical texts in their original language.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
