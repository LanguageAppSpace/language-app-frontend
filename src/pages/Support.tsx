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

const faqData = [
  {
    question: "Is the app free to use?",
    answer:
      "Yes! The app is free to use with optional premium features coming soon.",
  },
  {
    question: "How can I reset my password?",
    answer:
      'You can reset your password by clicking "Forgot Password" on the login screen and following the instructions sent to your email.',
  },
  {
    question: "How do I deactivate my account?",
    answer:
      "After logging in, go to the User Settings page where you will find an option to deactivate your account.",
  },
  {
    question: "How can I change my personal data or password?",
    answer:
      "You can update your personal data or password in the User Settings section after logging into your account.",
  },
];

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
