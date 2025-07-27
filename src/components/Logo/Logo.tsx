import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <LogoContainer onClick={() => navigate("/")}>
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
