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
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectIsAuthenticated } from "@/redux/auth/authSlice";
import { sidebarLinks, SidebarLink } from "@/config/data";

interface NaviPanelProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const NaviPanel = ({ open, onClose }: NaviPanelProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const visibleLinks = sidebarLinks.filter((link) => {
    if (link.auth === "auth") return isAuthenticated;
    if (link.auth === "public") return !isAuthenticated;
    return false;
  });

  const handleNavigate = ({ action, path }: SidebarLink) => {
    if (action === "logout") {
      dispatch(logOut());
    }
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
        {visibleLinks.map((link) => (
          <StyledListItemButton
            key={link.text}
            onClick={() => handleNavigate(link)}
          >
            <ListItemText primary={link.text} />
          </StyledListItemButton>
        ))}
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
