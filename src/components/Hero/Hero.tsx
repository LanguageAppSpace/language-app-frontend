import { Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import image from "/boy.jpeg";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import { Container } from "@mui/system";

const HeroContainer = styled.div`
  background-color: rgb(245, 252, 255);
  padding-top: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 600px) {
    flex: 0 0 50%;
  }
`;

const HeaderTypography = styled(Typography)`
  color: rgb(0, 0, 0);
  margin-bottom: 10px;
  font-weight: bold;
`;

const BodyTypography = styled(Typography)`
  color: rgb(0, 0, 0);
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 450px;
`;

const Hero = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  const buttonStyles = {
    margin: "20px 20px 20px 0",
    padding: "10px",
    backgroundColor: "rgb(22, 36, 52)",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "rgb(30, 42, 50)",
    },
    width: "624px",
  };

  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between">
          <TextContainer>
            <HeaderTypography variant="h4">
              Learn a Language, Unlock a World
            </HeaderTypography>
            <BodyTypography variant="body1">
              Expand your horizons with interactive lessons designed to make
              language learning easy, effective, and fun.
            </BodyTypography>
            <Button
              sx={buttonStyles}
              variant="contained"
              size="large"
              onClick={handleLoginClick}
              endIcon={<ArrowForwardIcon />}
            >
              LEARN MORE
            </Button>
          </TextContainer>

          <ImageContainer>
            <Image src={image} alt="boy with flags" />
          </ImageContainer>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
