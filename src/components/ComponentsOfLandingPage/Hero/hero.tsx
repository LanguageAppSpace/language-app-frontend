import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import image from "@/boy.jpeg";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Hero = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTE.PAGE404);
  };

  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextContainer>
            <HeaderTypography variant="h4">
              Learn a Language, Unlock a World
            </HeaderTypography>
            <BodyTypography variant="body1">
              Expand your horizons with interactive lessons designed to make
              language learning easy, effective, and fun.
            </BodyTypography>
            <StyledButton onClick={handleLoginClick}>
              LEARN MORE
              <ArrowForwardIcon style={{ marginLeft: "8px" }} />
            </StyledButton>
          </TextContainer>
          <ImageContainer>
            <StyledImage src={image} alt="boy with flags" />
          </ImageContainer>
        </div>
      </Container>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled("div")(() => ({
  backgroundColor: "rgb(245, 252, 255)",
  paddingTop: "50px",
}));

const TextContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const HeaderTypography = styled(Typography)(() => ({
  color: "rgb(0,0,0)",
  marginBottom: "10px",
  fontWeight: "bold",
}));

const BodyTypography = styled(Typography)(() => ({
  color: "rgb(0,0,0)",
}));

const ImageContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const StyledImage = styled("img")(() => ({
  width: "450px",
}));

const StyledButton = styled("button")(({ theme }) => ({
  margin: "20px 20px 20px 0",
  padding: "10px",
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  color: theme.palette.text.primary,
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "624px",
  "&:hover": {
    backgroundColor: "rgb(30, 42, 50)",
  },
}));
