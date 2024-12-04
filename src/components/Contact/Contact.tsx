import {
  StyledContactContainer,
  StyledTextContainer,
  StyledFormContainer,
  StyledInputBox,
  StyledTextField,
  StyledButton,
} from "@components/Contact/Contact.styled.ts";
import { Typography, Grid, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";

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
