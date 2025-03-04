import { Grid, Container, Box, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";

const DashboardFooter = () => {
  return (
    <StyledFooterContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StyledColumnHeader variant="h6">a'la Duolingo</StyledColumnHeader>
            <StyledText variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
            </StyledText>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <StyledColumnHeader variant="h6">Quick links</StyledColumnHeader>
            <StyledColumn>
              <StyledLink href="/about-us">About us</StyledLink>
              <StyledLink href="/contact">Contact</StyledLink>
            </StyledColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <StyledColumnHeader variant="h6">Resources</StyledColumnHeader>
            <StyledColumn>
              <StyledLink href="/support">Support</StyledLink>
              <StyledLink href="/privacy-policy">Privacy policy</StyledLink>
            </StyledColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StyledColumnHeader variant="h6">Social Media</StyledColumnHeader>
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

export default DashboardFooter;

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

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  marginBottom: "10px",
});
