import { Box, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@config/route.config';

const About = () => {

  //handleLoginClick
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  //style
  const aboutContainerStyles = {
    backgroundColor: "rgb(245, 252, 255)",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    height: "800px",
    padding: "60px",
    gap: "80px"
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={imageGridItemStyles}>
          <img src="/children.png" alt="Children" style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={6} sx={textGridItemStyles}>
          <Typography variant="h4" sx={headerTypographyStyles}>
            E-Learning Platform for Learning Language
          </Typography>
          <Typography variant="body1" sx={bodyTypographyStyles}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sint sapiente
            asperiores omnis in, qui libero incidunt officia! Enim obcaecati optio facere in,
            officia sed exercitationem veniam incidunt cum! Ullam?
          </Typography>
          <Button sx={buttonStyles} variant="contained" size="large" onClick={handleLoginClick} endIcon={<ArrowForwardIcon />}>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
