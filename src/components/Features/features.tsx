import { Grid, Typography, Box, Button } from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Features = () => {


  const featuresContainerStyles = {
    backgroundColor: "rgb(255,255,255)",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    height: "660px",
    padding: "80px",
    gap: "80px",
  };

  const headerTypographyStyles = {
    color: "rgb(0,0,0)",
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    gap: "16px"
  };

  const iconStyles = {
    height: "80px",
    width: "80px",
    marginBottom: "10px",
  };

  const textTypographyStyles = {
    color: "#1A2434",
    textAlign: "start",
    fontFamily: 'Plus Jakarta Sans',
  };

  const gridItemStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "center",
  };

  const buttonStyles = {
    backgroundColor: "rgb(255,255,255)",
    "&:hover": {
      backgroundColor: "rgb(250, 250, 255)",
    },
    color: "black",
    justifyContent: "start"
  }

  return (
    <Box sx={featuresContainerStyles}>
      <Typography variant="h4" sx={headerTypographyStyles}>
        Best learning experience
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3} sx={gridItemStyles}>
          <img src="/human.svg" alt="Human Icon" style={iconStyles} />
          <Typography variant="h6" sx={textTypographyStyles}>Free. Fun. Effective.</Typography>
          <Typography variant="body1" sx={textTypographyStyles}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
          </Typography>
          <Button sx={buttonStyles} variant="text" endIcon={<ArrowForwardIcon />}>Learn more</Button>
        </Grid>
        <Grid item xs={6} sm={3} sx={gridItemStyles}>
          <img src="/remote.svg" alt="Remote Icon" style={iconStyles} />
          <Typography variant="h6" sx={textTypographyStyles}>Interactive learning</Typography>
          <Typography variant="body1" sx={textTypographyStyles}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
          </Typography>
          <Button sx={buttonStyles} variant="text" endIcon={<ArrowForwardIcon />}>Learn more</Button>
        </Grid>
        <Grid item xs={6} sm={3} sx={gridItemStyles}>
          <img src="/padlock.svg" alt="Padlock Icon" style={iconStyles} />
          <Typography variant="h6" sx={textTypographyStyles}>Learn anytime, anywhere</Typography>
          <Typography variant="body1" sx={textTypographyStyles}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
          </Typography>
          <Button sx={buttonStyles} variant="text" endIcon={<ArrowForwardIcon />}>Learn more</Button>
        </Grid>
        <Grid item xs={6} sm={3} sx={gridItemStyles}>
          <img src="/certificate.svg" alt="Certificate Icon" style={iconStyles} />
          <Typography variant="h6" sx={textTypographyStyles}>Personalized learning</Typography>
          <Typography variant="body1" sx={textTypographyStyles}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
          </Typography>
          <Button sx={buttonStyles} variant="text" endIcon={<ArrowForwardIcon />}>Learn more</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
