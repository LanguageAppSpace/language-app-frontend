import {
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
  AppBar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface NavbarProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}
const Navbar = ({ isMobile, handleDrawerToggle }: NavbarProps) => {
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
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>
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
