import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { t } = useTranslation("notFound");
  return (
    <Page404Container>
      <Container maxWidth="xl">
        <TextContainer>{t("title")}</TextContainer>
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

const TextContainer = styled(Typography)({
  color: "black",
  fontSize: "3rem",
  textAlign: "center",
});

export default Page404;
