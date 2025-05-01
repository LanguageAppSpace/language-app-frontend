import { Box, CssBaseline, Drawer } from "@mui/material";
import Navbar from "@/layouts/UserDashboard/Navbar";
import Sidebar from "@/layouts/UserDashboard/Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
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
          <Sidebar />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
