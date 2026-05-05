import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsername } from "@/redux/auth/authSlice";
import Sections from "@/UserDashboard/Sections/Sections";
import { styled } from "@mui/system";
import heroImg from "@/assets/images/dashboard-hero-image.png";
import { Trans, useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  useGetStreakQuery,
  useUpdateStreakMutation,
} from "@/redux/auth/authApiSlice";

const Main = () => {
  const username = useSelector(selectUsername);
  const { t } = useTranslation("dashboard");
  const { data } = useGetStreakQuery();
  const [updateStreak] = useUpdateStreakMutation();

  useEffect(() => {
    updateStreak()
      .unwrap()
      .catch((err) => {
        console.error("Failed to update streak", err);
      });
  }, []);

  const streak = data?.streak ?? 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <HeroText>
          <Typography variant="h6" color="primary">
            <Trans
              t={t}
              i18nKey="hero.greeting"
              values={{ name: username }}
              components={{ strong: <strong /> }}
            />
          </Typography>
          <Typography variant="h6" component="span" sx={{ color: "black" }}>
            <Trans
              t={t}
              i18nKey="hero.streak"
              values={{ count: streak }}
              components={{ strong: <strong /> }}
            />
          </Typography>
        </HeroText>
      </Grid>
      <HeroImage item xs={12} md={6} />
      <Sections />
    </Grid>
  );
};

export default Main;

const HeroImage = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${heroImg})`,
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
