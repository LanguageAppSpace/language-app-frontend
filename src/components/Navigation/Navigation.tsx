import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Navigation = () => {
  const navigate = useNavigate();

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
          >
            <MenuIcon />
          </StyledMenuIcon>
          <LogoText variant="h6">LOGO</LogoText>
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
    </NavigationContainer>
  );
};

const NavigationContainer = styled(Box)({
  flexGrow: 1,
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "rgb(236, 177, 89)",
});

const StyledMenuIcon = styled(IconButton)({
  marginRight: 2,
});

const LogoText = styled(Typography)({
  flexGrow: 1,
});

const LogInButton = styled(Button)({
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: "rgb(25, 42, 50)",
  },
});

export default Navigation;
