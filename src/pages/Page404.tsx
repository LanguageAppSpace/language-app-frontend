import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Page404 = () => {
  return (
    <Page404Container>
      <Container maxWidth="xl">
        <TextContainer>Error 404</TextContainer>
      </Container>
    </Page404Container>
  );
};

const Page404Container = styled(Box)({
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  inset: 0,
});

const TextContainer = styled(Typography)(({ theme }) => ({
  color: "black",
  fontSize: theme.typography.h1.fontSize,
  textAlign: "center",
}));

export default Page404;
