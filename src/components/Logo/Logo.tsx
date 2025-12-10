import { ROUTE } from "@/config/route.config";
import { selectIsAuthenticated } from "@/redux/auth/authSlice";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleClick = () => {
    if (isAuthenticated) {
      navigate(ROUTE.DASHBOARD);
    } else {
      navigate(ROUTE.LANDING_PAGE);
    }
  };
  return (
    <LogoContainer onClick={handleClick}>
      <LogoText variant="h6">LanguageApp</LogoText>
    </LogoContainer>
  );
};

const LogoContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  letterSpacing: "1px",
  color: theme.palette.common.white,
}));

export default Logo;
