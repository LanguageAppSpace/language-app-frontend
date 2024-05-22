import { Box, Typography } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const Testimonials = () => {
  const containerStyles = {
    backgroundColor: "rgb(255,255,255)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "600px",
    paddingTop: "20px",
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
    paddingBottom: "80px",
  };

  const testimonialsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "90px",
    color: "black",
  };

  const testimonialBoxStyles = {
    backgroundColor: "rgb(250,250,250)",
    padding: "20px",
    textAlign: "left",
    width: "300px",
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nisi
            esse unde fugit dicta, saepe earum ipsa a quisquam deserunt, fugiat
            blanditiis. Magni architecto minus earum culpa commodi mollitia
            eaque.{" "}
          </Typography>
        </Box>

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            molestias nobis, quia alias, minus sunt repellat quo iure architecto
            voluptate ut earum assumenda esse ex dolor velit voluptas voluptatem
            facere!{" "}
          </Typography>
        </Box>

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            provident nobis atque iusto architecto sapiente, perspiciatis illum
            quae commodi delectus accusamus impedit debitis velit voluptatum
            dicta nulla hic harum voluptatibus!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
