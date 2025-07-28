import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";
import NaviPanel from "@/components/NaviPanel/NaviPanel";

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLoginClick = () => {
    navigate(ROUTE.LOGIN);
  };

  return (
    <NavigationContainer>
      <StyledAppBar>
        <Toolbar>
          <StyledMenuIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </StyledMenuIcon>
          <Logo />
          <LogInButton
            variant="contained"
            size="large"
            color="primary"
            onClick={handleLoginClick}
          >
            LOG IN
          </LogInButton>
        </Toolbar>
      </StyledAppBar>
      <NaviPanel open={drawerOpen} onClose={toggleDrawer(false)} />
    </NavigationContainer>
  );
};

const NavigationContainer = styled(Box)({
  flexGrow: 1,
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const StyledMenuIcon = styled(IconButton)({
  marginRight: 2,
});

const LogInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button.main,
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: theme.palette.button.loginHover,
  },
}));

export default Navigation;
