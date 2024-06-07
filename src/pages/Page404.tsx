import { Box, Typography } from "@mui/material";

const Page404 = () => {

  const page404ContainerStyles = {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", 
    width: "100vw", 
  };

  const textContainerStyles = {
    textAlign: "center",
    fontSize: "3rem",
    color: "black" 
  };

  return (
    <Box sx={page404ContainerStyles}>
      <Typography sx={textContainerStyles}>
        Error 404
      </Typography>
    </Box>
  );
};

export default Page404