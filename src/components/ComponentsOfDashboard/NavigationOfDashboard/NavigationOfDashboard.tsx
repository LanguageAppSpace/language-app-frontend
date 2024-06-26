import {
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
  AppBar,
} from "@mui/material";

const drawerWidth = 240;

const NavigationOfDashboard = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgb(236, 177, 89)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: 64,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Avatar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default NavigationOfDashboard;
