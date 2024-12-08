import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Page404Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const TextContainer = styled.div`
  color: black;
  font-size: 3rem;
  text-align: center;
`;

const Page404 = () => {
  return (
    <Page404Container>
      <TextContainer>Error 404</TextContainer>
    </Page404Container>
  );
};

export default Page404;
