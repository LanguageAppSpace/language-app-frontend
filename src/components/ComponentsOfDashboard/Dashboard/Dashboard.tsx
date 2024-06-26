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

import NavigationDashboard from "../NavigationOfDashboard/NavigationOfDashboard";
import Main from "../Main/Main";

const drawerWidth = 240;

const Sidebar = () => {
  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ backgroundColor: "rgb(5, 20, 50)", width: drawerWidth }}>
        {["Dashboard", "New lesson", "Your lessons", "Logout"].map((text) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemText primary={text} />
              <Box component="main"></Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <NavigationDashboard />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
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
