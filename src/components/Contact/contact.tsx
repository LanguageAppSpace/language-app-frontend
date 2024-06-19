import { Box, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@config/route.config';

const Contact = () => {

  //handleLoginClick
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.REGISTER);
  };
  
  //style
  const contactContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(236, 177, 89)",
    height: "250px",
    padding: "0 20px",
  };

  const textContainerStyles = {
    textAlign: "left",
    borderRadius: "16px"
  };

  const formContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const inputBoxStyles = {
    display: "flex",
    alignItems: "center",
    borderRadius: "24px",
    padding: "8px 8px 8px 40px",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.7)",
  };

  const textFieldStyles = {
    display: "flex",
    displayDirection: "row",
    alignItem: "center",
    padding: "8px 8px 8px 8px",
    marginRight: "10px",
    width: "80px",
    gap: "8px",
    background: "#1A2434",  
  };

  const buttonStyles = {
    width: "127px",
    height: "50px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(25, 42, 50)",
    },
  };

  return (
    <Box sx={contactContainerStyles}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} sx={textContainerStyles}>
          <Typography variant="h4" component="div">
            Join us to learn languages
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={formContainerStyles}>
          <Box sx={inputBoxStyles}>
            <TextField
              placeholder="name@email.com"
              sx={{ textFieldStyles}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: {alignItems: "center" },
              }}
              variant="filled"
            />
            <Button variant="contained" sx={buttonStyles} size='large' onClick={handleLoginClick}>
              Join now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
