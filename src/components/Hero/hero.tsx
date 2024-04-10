import { Box, Typography } from "@mui/material";
import image from '/boy.jpeg'; 

const Hero = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '800px',
        backgroundColor: 'rgb(245, 252, 255)', 
        display: 'flex',
        alignItems: 'center',
        padding: '0 30px', 
        flexWrap: 'wrap'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          marginRight: 'auto',
          textAlign: 'center', 
        }}>
        <Typography 
          variant="h4"
          color={"rgb(0,0,0)"}
          marginBottom="10px" 
        >
          Tekst Tekst Tekst
        </Typography>
        <Typography 
          variant="body1"
          color={"rgb(0,0,0)"}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={image}
          alt="boy with flags"
          style={{ 
            width: '475px', 
            height: '572px', 
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
