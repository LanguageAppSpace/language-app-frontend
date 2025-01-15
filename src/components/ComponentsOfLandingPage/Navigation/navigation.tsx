import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
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

const StyledBox = styled(Box)(() => ({
  flexGrow: 1,
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "rgb(236, 177, 89)",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(() => ({
  flexGrow: 1,
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: "rgb(25, 42, 50)",
  },
}));
