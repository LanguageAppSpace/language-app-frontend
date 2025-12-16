import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navigation />
      <Box sx={{ display: "flex", flexGrow: 1, pt: 6 }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
