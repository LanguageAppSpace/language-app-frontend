import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Logo from "@/components/Logo/Logo";
import Hamburger from "@/components/Buttons/Hamburger";
import { selectIsAuthenticated } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.LOGIN);
  };
  return (
    <Box>
      <StyledAppBar>
        <Toolbar>
          <Hamburger />
          <Logo />
          {isAuthenticated ? (
            <AccountCircle fontSize="large" />
          ) : (
            <LogInButton
              variant="contained"
              size="large"
              color="primary"
              onClick={handleLoginClick}
            >
              LOG IN
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
  "&:hover": {
    backgroundColor: theme.palette.button.loginHover,
  },
}));

export default Navigation;
