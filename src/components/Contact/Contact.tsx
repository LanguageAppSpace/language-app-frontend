import {
  Typography,
  Grid,
  InputAdornment,
  Box,
  TextField,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";

const Contact = () => {
  return (
    <StyledContactContainer>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <StyledTextContainer>
              <Typography variant="h4" component="div">
                Join us to learn languages
              </Typography>
            </StyledTextContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledFormContainer>
              <StyledInputBox>
                <StyledTextField
                  variant="outlined"
                  placeholder="name@email.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledButton variant="contained">Join now</StyledButton>
              </StyledInputBox>
            </StyledFormContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledContactContainer>
  );
};

export default Contact;

const StyledContactContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.secondary.main,
  padding: "80px 0",
}));

const StyledTextContainer = styled(Box)({
  textAlign: "left",
  borderRadius: "16px",
});

const StyledFormContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const StyledInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.input.light,
  padding: "8px",
  borderRadius: "24px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.input.medium,
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
    color: theme.palette.primary.dark,
    "&::placeholder": {
      color: theme.palette.primary.dark,
      opacity: 1,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button.dark,
  color: theme.palette.text.primary,
  padding: "8px 24px",
  borderRadius: "16px",
  marginLeft: "8px",
  width: "127px",
  height: "50px",
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
  },
}));
