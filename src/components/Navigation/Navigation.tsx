import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Logo from "@/components/Logo/Logo";
import Hamburger from "@/components/Buttons/Hamburger";
import { selectIsAuthenticated } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetProfileQuery } from "@/redux/userSettings/userSettingsApiSlice";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { data: profile, fulfilledTimeStamp } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handleLoginClick = () => {
    navigate(ROUTE.LOGIN);
  };

  const photoUrl = profile?.photo
    ? `${
        profile.photo.startsWith("http")
          ? profile.photo
          : `${new URL(import.meta.env.VITE_API).origin}${profile.photo}`
      }${profile.photo.includes("?") ? "&" : "?"}v=${fulfilledTimeStamp ?? 0}`
    : undefined;

  return (
    <Box>
      <StyledAppBar>
        <Toolbar>
          <Hamburger />
          <Logo />
          {isAuthenticated ? (
            <Avatar
              src={photoUrl}
              alt={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`}
              sx={{ ml: "auto", width: 40, height: 40 }}
            />
          ) : (
            <LogInButton
              variant="contained"
              size="large"
              color="primary"
              onClick={handleLoginClick}
            >
              {t("actions.logIn")}
            </LogInButton>
          )}
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const LogInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button.main,
  borderRadius: "16px",
  textTransform: "uppercase",
  marginLeft: "auto",
  "&:hover": {
    backgroundColor: theme.palette.button.loginHover,
  },
}));

export default Navigation;
