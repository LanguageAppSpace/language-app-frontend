import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsername } from "@/redux/auth/authSlice";
import Sections from "@/UserDashboard/Sections/Sections";
import { styled } from "@mui/system";
import heroImg from "@/assets/images/dashboard-hero-image.png";
import { Trans, useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Main = () => {
  const username = useSelector(selectUsername);
  const { t } = useTranslation("dashboard");
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const today = new Date();
    const lastActiveRaw = localStorage.getItem("lastActiveDate");
    const lastActive = new Date(lastActiveRaw ?? today);
    const savedStreak = Number(localStorage.getItem("streak") ?? 0);

    const diffDays = Math.floor(
      (today.setHours(0, 0, 0, 0) - lastActive.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    let newStreak;
    if (diffDays === 0) {
      newStreak = savedStreak;
    } else if (diffDays === 1) {
      newStreak = savedStreak + 1;
    } else {
      newStreak = 1;
    }

    setStreak(newStreak);
    localStorage.setItem("streak", String(newStreak));
    localStorage.setItem("lastActiveDate", today.toISOString());
  }, []);

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
