import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Logo from "@/components/Logo/Logo";
import Hamburger from "@/components/Buttons/Hamburger";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.LOGIN);
  };

  return (
    <NavigationContainer>
      <StyledAppBar>
        <Toolbar>
          <Hamburger />
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
    </NavigationContainer>
  );
};

const NavigationContainer = styled(Box)({
  flexGrow: 1,
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const LogInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button.main,
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: theme.palette.button.loginHover,
  },
}));

export default Navigation;
