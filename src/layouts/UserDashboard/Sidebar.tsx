import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { To, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@config/data.ts";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  return (
    <>
      <Toolbar sx={{ backgroundColor: "rgb(5, 20, 50)" }} />
      <List
        sx={{
          backgroundColor: "rgb(5, 20, 50)",
          width: drawerWidth,
          height: "100%",
        }}
      >
        {sidebarLinks.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
