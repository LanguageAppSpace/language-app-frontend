import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation("support");

  const faqData = t("items", {
    returnObjects: true,
  }) as { question: string; answer: string }[];

  return (
    <Wrapper>
      <Container>
        <PageTitle variant="h4">{t("title")}</PageTitle>
        {faqData.map(({ question, answer }) => (
          <Accordion key={question}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Question>{question}</Question>
            </AccordionSummary>
            <AccordionDetails>
              <Answer>{answer}</Answer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(16, 0),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const Question = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const Answer = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default Support;
