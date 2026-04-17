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
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("contact");

  return (
    <Section>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              {t("title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {t("text")}
            </Typography>

            <Stack spacing={2} mt={3}>
              <ContactRow>
                <EmailIcon color="secondary" />
                {t("email")}
              </ContactRow>
              <ContactRow>
                <PhoneIcon color="secondary" />
                {t("phone")}
              </ContactRow>
              <ContactRow>
                <LocationOnIcon color="secondary" />
                {t("address")}
              </ContactRow>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 3 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
                color="text.secondary"
              >
                {t("formText")}
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
                  {t("buttonText")}
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
