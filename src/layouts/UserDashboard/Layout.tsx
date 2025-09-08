import { Box, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
import Navbar from "@/layouts/UserDashboard/Navbar";
import Sidebar from "@/layouts/UserDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import deviceSizes from "@/cssConsts";
import { useState } from "react";

const drawerWidth = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isMobile = useMediaQuery(`(max-width:${deviceSizes.sm - 1}px)`);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
