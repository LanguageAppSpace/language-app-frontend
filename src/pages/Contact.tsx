import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Contact() {
  return (
    <Section>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Contact us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Have a question, suggestion, or just want to say hi? Fill out the
              form or reach out to us directly.
            </Typography>

            <Stack spacing={2} mt={3}>
              <ContactRow>
                <EmailIcon color="secondary" /> contact@languageapp.com
              </ContactRow>
              <ContactRow>
                <PhoneIcon color="secondary" /> +48 123 456 789
              </ContactRow>
              <ContactRow>
                <LocationOnIcon color="secondary" /> Warsaw, Poland
              </ContactRow>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Send us a message
              </Typography>
              <Stack spacing={2} mt={2}>
                <TextField label="Name" fullWidth required />
                <TextField label="Email" type="email" fullWidth required />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
                <Button variant="contained" color="secondary">
                  Send
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled("section")(({ theme }) => ({
  padding: theme.spacing(20, 0),
}));

const ContactRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  fontSize: 16,
  color: theme.palette.text.secondary,
}));
