import {
  StyledFooterContainer,
  StyledColumnHeader,
  StyledText,
  StyledColumn,
  StyledIconsContainer,
  StyledLink,
} from "@components/DashboardFooter/DashboardFooter.styled";
import { Grid, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
