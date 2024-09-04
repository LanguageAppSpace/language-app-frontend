import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";

const Contact = () => {
  const contactContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(236, 177, 89)",
    padding: "80px 0",
  };

  const textContainerStyles = {
    textAlign: "left",
    borderRadius: "16px",
  };

  const formContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const inputBoxStyles = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fdeac1",
    padding: "8px",
    borderRadius: "24px",
  };

  const textFieldStyles = {
    backgroundColor: "#fae7cc",
    borderRadius: "30px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      padding: "0 12px",
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiInputBase-input": {
      padding: "10px 0",
      color: "#333",
      "&::placeholder": {
        color: "#333",
        opacity: 1,
      },
    },
  };

  const buttonStyles = {
    backgroundColor: "#111827",
    color: "#fff",
    padding: "8px 24px",
    borderRadius: "16px",
    marginLeft: "8px",
    width: "127px",
    height: "50px",
    "&:hover": {
      backgroundColor: "#333d47",
    },
  };

  return (
    <Box sx={contactContainerStyles}>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} sx={textContainerStyles}>
            <Typography variant="h4" component="div">
              Join us to learn languages
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={formContainerStyles}>
            <Box sx={inputBoxStyles}>
              <TextField
                variant="outlined"
                placeholder="name@email.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <Button variant="contained" sx={buttonStyles}>
                Join now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
