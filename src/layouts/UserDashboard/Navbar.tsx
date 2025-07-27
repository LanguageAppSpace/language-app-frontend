import Logo from "@/components/Logo/Logo";
import { Box, Toolbar, Container, Avatar, AppBar } from "@mui/material";

const drawerWidth = 240;
const Navbar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgb(236, 177, 89)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: 64,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Logo />
            <Box sx={{ flexGrow: 0 }}>
              <Avatar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
