import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { To, useNavigate } from "react-router-dom";

import NavigationDashboard from "@components/ComponentsOfDashboard/NavigationOfDashboard/NavigationOfDashboard";
import Main from "@components/ComponentsOfDashboard/Main/Main";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const drawerWidth = 240;

  const drawer = (
    <>
      <Toolbar sx={{ backgroundColor: "rgb(5, 20, 50)" }} />
      <List
        sx={{
          backgroundColor: "rgb(5, 20, 50)",
          width: drawerWidth,
          height: "100%",
        }}
      >
        {[
          { text: "Dashboard", path: "/dashboard" },
          { text: "New lesson", path: "/error" },
          { text: "Your lessons", path: "/error" },
          { text: "Logout", path: "/login" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <NavigationDashboard />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Main />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
