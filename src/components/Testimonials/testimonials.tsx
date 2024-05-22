import { Box, Typography } from "@mui/material";

const Testimonials = () => {

  const containerStyles = {
    backgroundColor: "rgb(255,255,255)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "800px",
    paddingTop: "20px",
  };

  const headerBoxStyles = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
  };

  const testimonialsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  };

  const testimonialBoxStyles = {
    backgroundColor: "rgb(240,240,240)",
    padding: "20px",
    textAlign: "center",
  };

  const imageContainerStyles = {
    display: "flex",
    alignItems: "center",
  };

  const testimonialTextStyles = {
    marginTop: "10px",
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={headerBoxStyles}>
        <Typography variant="h4" sx={headerTypographyStyles}>
          What others think:
        </Typography>
      </Box>

      <Box sx={testimonialsContainerStyles}>
        <Box sx={testimonialBoxStyles}>
          <Box sx={imageContainerStyles}>
            <img
              src="boy-testimonial.jpg"
              alt="Boy-testimonial-image"
              style={{ width: "100px", height: "100px" }}
            />
          </Box>
          <Typography variant="body1" sx={testimonialTextStyles}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>

        <Box sx={testimonialBoxStyles}>
          <Box sx={imageContainerStyles}>
            <img
              src="girl-testimonial.jpg"
              alt="Girl-testimonial-image"
              style={{ width: "100px", height: "100px" }}
            />
          </Box>
          <Typography variant="body1" sx={testimonialTextStyles}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>

        <Box sx={testimonialBoxStyles}>
          <Box sx={imageContainerStyles}>
            <img
              src="girl2-testimonial.jpg"
              alt="Girl2-testimonial-image"
              style={{ width: "100px", height: "100px" }}
            />
          </Box>
          <Typography variant="body1" sx={testimonialTextStyles}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
