import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@config/route.config";
import image from "@/boy.jpeg";
import { Container } from "@mui/system";
import {
  HeroContainer,
  TextContainer,
  HeaderTypography,
  StyledButton,
  ImageContainer,
  BodyTypography,
  StyledImage,
} from "@/components/ComponentsOfLandingPage/Hero/Hero.styled";

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
