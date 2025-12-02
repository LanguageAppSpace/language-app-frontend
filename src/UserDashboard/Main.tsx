import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsername } from "@/redux/auth/authSlice";
import Sections from "@/UserDashboard/Sections/Sections";
import { styled } from "@mui/system";

const Main = () => {
  const username = useSelector(selectUsername);

  return (
    <Box sx={{ width: "100%", p: 3, mt: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <HeroText>
            <Typography variant="h6" color="primary">
              👋 Hello, <strong>{username}</strong>!
            </Typography>
            <Typography variant="h6" component="span" sx={{ color: "black" }}>
              Keep up the great work and don't let your <b>9</b>-day streak slip
              away!
            </Typography>
          </HeroText>
        </Grid>
        <HeroImage item xs={12} md={6} />
        <Sections />
      </Grid>
    </Box>
  );
};

export default Main;

const HeroImage = styled(Grid)(({ theme }) => ({
  backgroundImage: 'url("/people.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "right center",
  minHeight: "250px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeroText = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  gap: 2,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));
