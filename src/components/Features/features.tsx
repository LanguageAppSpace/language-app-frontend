import { Grid, Typography, Box } from '@mui/material'

const Features = () => {

  const iconStyles = {
    height: '80px',
    width: '80px',
  }

  const textStyles = {
    color: 'rgb(0,0,0)'
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgb(255,255,255)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100vw',
          height: '800px',
        }}
      >
        <Typography 
          variant="h4"
          style={textStyles}
        >
          Best learning experience
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <img 
              src="/human.svg" 
              style={iconStyles}
            />
            <Typography 
              variant="body1"
              style={textStyles}
            >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
            Enim obcaecati optio facere in, officia sed exercitationem veniam incidunt cum! Ullam? 
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <img 
              src="/remote.svg"
              style={iconStyles}
            />
            <Typography 
            variant="body1"
            style={textStyles}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
            Enim obcaecati optio facere in, officia sed exercitationem veniam incidunt cum! Ullam? 
          </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <img 
              src="/padlock.svg"
              style={iconStyles}
            />
            <Typography 
            variant="body1"
            style={textStyles}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
            Enim obcaecati optio facere in, officia sed exercitationem veniam incidunt cum! Ullam? 
          </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <img 
              src="/certificate.svg"
              style={iconStyles}
            />
            <Typography 
            variant="body1"
            style={textStyles}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione sint sapiente asperiores omnis in, qui libero incidunt officia! 
            Enim obcaecati optio facere in, officia sed exercitationem veniam incidunt cum! Ullam?
          </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Features;
