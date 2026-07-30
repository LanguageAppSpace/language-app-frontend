import Logo from "@/components/Logo/Logo";
import { Box, Toolbar, Container, Avatar, AppBar } from "@mui/material";
import Hamburger from "@/components/Buttons/Hamburger";
import { useGetProfileQuery } from "@/redux/userSettings/userSettingsApiSlice";

const drawerWidth = 240;
const Navbar = () => {
  const { data: profile } = useGetProfileQuery();
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
            <Hamburger />
            <Logo />
            <Box sx={{ flexGrow: 0 }}>
              <Avatar
                src={profile?.photoUrl}
                alt={`${profile?.firstName} ${profile?.lastName}`}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
