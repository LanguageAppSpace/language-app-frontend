import { Box, Grid, Typography, Button } from '@mui/material';

const About = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgb(245, 252, 255)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100vw',
          height: '800px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} container alignItems="center">
            <img src="/children.png" alt="Children" />
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                color: 'rgb(0,0,0)'
              }}
            >
              E-Learning Platform for Learning Language
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                color: 'rgb(0,0,0)'
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sint sapiente
              asperiores omnis in, qui libero incidunt officia! Enim obcaecati optio facere in,
              officia sed exercitationem veniam incidunt cum! Ullam?
            </Typography>
            <Button>

            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
