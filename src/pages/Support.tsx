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
import { faqData } from "@/constants/faqData";

const Support = () => {
  return (
    <Wrapper>
      <Container>
        <PageTitle variant="h4">Frequently Asked Questions</PageTitle>
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
