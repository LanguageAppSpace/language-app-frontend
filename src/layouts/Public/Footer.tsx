import { Grid, Container, Box, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("landing");

  return (
    <StyledFooterContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StyledColumnHeader variant="h6">
              {t("footer.brand")}
            </StyledColumnHeader>
            <StyledText variant="body2">{t("footer.description")}</StyledText>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <StyledColumnHeader variant="h6">
              {t("footer.quickLinks.title")}
            </StyledColumnHeader>
            <StyledColumn>
              <StyledLink href="/about-us">
                {t("footer.quickLinks.about")}
              </StyledLink>
              <StyledLink href="/contact">
                {t("footer.quickLinks.contact")}
              </StyledLink>
            </StyledColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <StyledColumnHeader variant="h6">
              {t("footer.resources.title")}
            </StyledColumnHeader>
            <StyledColumn>
              <StyledLink href="/support">
                {t("footer.resources.support")}
              </StyledLink>
              <StyledLink href="/privacy-policy">
                {t("footer.resources.privacy")}
              </StyledLink>
            </StyledColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StyledColumnHeader variant="h6">
              {t("footer.social.title")}
            </StyledColumnHeader>
            <StyledIconsContainer>
              <StyledLink href="https://facebook.com">
                <FacebookIcon />
              </StyledLink>
              <StyledLink href="https://instagram.com">
                <InstagramIcon />
              </StyledLink>
              <StyledLink href="https://linkedin.com">
                <LinkedInIcon />
              </StyledLink>
              <StyledLink href="https://twitter.com">
                <TwitterIcon />
              </StyledLink>
              <StyledLink href="https://youtube.com">
                <YouTubeIcon />
              </StyledLink>
            </StyledIconsContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledFooterContainer>
  );
};

export default Footer;

const StyledFooterContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "rgb(5, 20, 50)",
  padding: "80px 0",
  justifyContent: "space-between",
});

const StyledColumnHeader = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

const StyledText = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
  color: theme.palette.background.dark,
}));

const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const StyledIconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: theme.palette.background.dark,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  marginBottom: "10px",
  color: theme.palette.text.primary,
}));
