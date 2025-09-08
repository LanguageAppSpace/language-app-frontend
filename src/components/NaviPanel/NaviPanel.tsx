import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  styled,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/config/route.config.ts";
import CloseIcon from "@mui/icons-material/Close";

interface NaviPanelProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const NaviPanel = ({ open, onClose }: NaviPanelProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          padding: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton onClick={onClose} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        <StyledListItemButton onClick={() => handleNavigate(ROUTE.DASHBOARD)}>
          <ListItemText primary="Dashboard" />
        </StyledListItemButton>

        <StyledListItemButton onClick={() => handleNavigate(ROUTE.LOGIN)}>
          <ListItemText primary="Log in" />
        </StyledListItemButton>

        <StyledListItemButton onClick={() => handleNavigate(ROUTE.REGISTER)}>
          <ListItemText primary="Register" />
        </StyledListItemButton>

        <StyledListItemButton
          onClick={() => handleNavigate(ROUTE.USER_SETTINGS)}
        >
          <ListItemText primary="User settings" />
        </StyledListItemButton>
      </List>
    </Drawer>
  );
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.background.dark,
  },
}));

export default NaviPanel;
