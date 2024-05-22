import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  
  const boxStyles = {
    flexGrow: 1,
  };

  const appBarStyles = {
    backgroundColor: "rgb(236, 177, 89)",
  };

  const iconButtonStyles = {
    mr: 2,
  };

  const typographyStyles = {
    flexGrow: 1,
  };

  const buttonStyles = {
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(25, 42, 50)",
    },
  };

  return (
    <Box sx={boxStyles}>
      <AppBar sx={appBarStyles}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={iconButtonStyles}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={typographyStyles}>
            LOGO
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={buttonStyles}
          >
            LOG IN
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
