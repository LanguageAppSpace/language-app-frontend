import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsername } from "@/redux/auth/authSlice";
import Sections from "@/UserDashboard/Sections/Sections";

const Main = () => {
  const username = useSelector(selectUsername);

  return (
    <Box sx={{ width: "100%", p: 3, mt: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "black", marginBottom: "15px" }}
            >
              👋 Hello,{" "}
              <Typography variant="h5" component="span" fontWeight="bold">
                {username}!
              </Typography>
            </Typography>
            <Typography variant="h6" component="span" sx={{ color: "black" }}>
              Keep up the great work and don't let your <b>9</b>-day streak slip
              away!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
          <img src="/people.jpg" alt="Hello" style={{ maxHeight: "300px" }} />
        </Grid>
        <Sections />
      </Grid>
    </Box>
  );
};

export default Main;
