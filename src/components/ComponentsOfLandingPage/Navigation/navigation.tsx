import {
  StyledBox,
  StyledAppBar,
  StyledIconButton,
  StyledTypography,
  StyledButton,
} from "@components/ComponentsOfLandingPage/Navigation/Navigation.styled";
import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.LOGIN);
  };

  return (
    <StyledBox>
      <StyledAppBar>
        <Toolbar>
          <StyledIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          ></StyledIconButton>
          <StyledTypography variant="h6">LOGO</StyledTypography>
          <StyledButton
            variant="contained"
            size="large"
            color="primary"
            onClick={handleLoginClick}
          >
            LOG IN
          </StyledButton>
        </Toolbar>
      </StyledAppBar>
    </StyledBox>
  );
};

export default Navigation;
