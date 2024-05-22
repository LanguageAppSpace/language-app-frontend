import { Box, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
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
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "0 10px",
  };

  const textFieldStyles = {
    marginRight: "10px",
    width: "250px",
    backgroundColor: "white",
    borderRadius: "16px"
  };

  const buttonStyles = {
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
            <Button variant="contained" sx={buttonStyles} size='large'>
              Join now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
