import { Box, Button, Typography } from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import image from "/boy.jpeg";

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@config/route.config';

const Hero = () => {

  //handleLoginClick
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };
 
  //style
  const heroContainerStyles = {
    height: "800px",
    backgroundColor: "rgb(245, 252, 255)",
    display: "flex",
    alignItems: "center",
    padding: "30px",
    flexWrap: "wrap",
  };

  const textContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    textAlign: "center",
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
    width: "475px",
    height: "572px"
  };

  const buttonStyles = {
    margin: "20px",
    padding: "10px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(30, 42, 50)",
    },
    width: "624px"
  };

  return (
    <Box sx={heroContainerStyles}>
      <Box sx={textContainerStyles}>
        <Typography variant="h4" sx={headerTypographyStyles}>
          Almost before we know it, we left te ground
        </Typography>
        <Typography variant="body1" sx={bodyTypographyStyles}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </Typography>
        <Button sx={buttonStyles} variant="contained" size="large" onClick={handleLoginClick} endIcon={<ArrowForwardIcon />}>
          LEARN MORE
        </Button>
      </Box>

      <Box sx={imageContainerStyles}>
        <img src={image} alt="boy with flags" style={imageStyles} />
      </Box>
    </Box>
  );
};

export default Hero;
