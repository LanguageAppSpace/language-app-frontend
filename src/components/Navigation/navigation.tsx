import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  const styleButton = {
    Button: {
      "&:hover": {
        backgroundColor: "rgb(22, 36, 52)",
      }
    },
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        sx={{
          backgroundColor: 'rgb(236, 177, 89)'
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ 
              mr: 2
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Button 
            variant="contained"
            size='large'
            color='primary'
            sx={styleButton.Button}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation