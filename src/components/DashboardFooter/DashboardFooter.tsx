import { Box, Grid, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Container } from "@mui/system";

const DashboardFooter = () => {
  const footerContainerStyles = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(5, 20, 50)",
    padding: "80px 0",
    justifyContent: "space-between",
  };

  const columnHeaderStyles = {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
  };

  const textStyles = {
    marginBottom: "10px",
    color: "rgb(179, 179, 179)",
  };

  const columnStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const iconStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "rgb(179, 179, 179)",
  };

  return (
    <Box sx={footerContainerStyles}>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6" sx={columnHeaderStyles}>
              a'la Duolingo
            </Typography>
            <Typography variant="body2" sx={textStyles}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Typography variant="h6" sx={columnHeaderStyles}>
              Quick links
            </Typography>
            <Box sx={columnStyles}>
              <Link
                href="/about-us"
                color="inherit"
                underline="none"
                sx={textStyles}
              >
                About us
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="none"
                sx={textStyles}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Typography variant="h6" sx={columnHeaderStyles}>
              Resources
            </Typography>
            <Box sx={columnStyles}>
              <Link
                href="/support"
                color="inherit"
                underline="none"
                sx={textStyles}
              >
                Support
              </Link>
              <Link
                href="/privacy-policy"
                color="inherit"
                underline="none"
                sx={textStyles}
              >
                Privacy policy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6" sx={columnHeaderStyles}>
              Social Media
            </Typography>
            <Box sx={iconStyles}>
              <Link
                href="https://facebook.com"
                color="inherit"
                underline="none"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://instagram.com"
                color="inherit"
                underline="none"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://linkedin.com"
                color="inherit"
                underline="none"
              >
                <LinkedInIcon />
              </Link>
              <Link href="https://twitter.com" color="inherit" underline="none">
                <TwitterIcon />
              </Link>
              <Link href="https://youtube.com" color="inherit" underline="none">
                <YouTubeIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardFooter;
