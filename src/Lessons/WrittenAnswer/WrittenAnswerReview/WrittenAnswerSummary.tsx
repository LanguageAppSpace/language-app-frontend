import ButtonsContainer from "@/Lessons/SharedComponentes/ButtonsContainer";
import ProgressRing from "@/Lessons/SharedComponentes/ProgressRing";
import SummaryCard from "@/Lessons/SharedComponentes/SummaryCard";
import { Button, Typography, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WrittenAnswerResult } from "@/Lessons/WrittenAnswer/hooks/useWrittenAnswer";

interface Props {
  correct: number;
  wrong: number;
  failedResults: WrittenAnswerResult[];
  onRestart: () => void;
  onReviewFailed: () => void;
}

const WrittenAnswerSummary = ({
  correct,
  wrong,
  failedResults,
  onRestart,
  onReviewFailed,
}: Props) => {
  const navigate = useNavigate();

  return (
    <SummaryCard>
      <Typography variant="h4">Practice finished!</Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        sx={{ lineHeight: 1.6 }}
      >
        All answers have been checked, <br />
        here's how you did:
      </Typography>

      <ProgressRing correct={correct} wrong={wrong} />

      {!!failedResults.length && (
        <FailedAnswersList>
          <Typography fontWeight={600}>Answers to review:</Typography>

          {failedResults.map((result) => (
            <FailedAnswerItem key={result.pair.id}>
              <Typography fontWeight={600}>{result.pair.phraseOne}</Typography>

              <Typography color="error">
                Your answer: {result.userAnswer}
              </Typography>

              <Typography color="success.main">
                Correct answer: {result.pair.phraseTwo}
              </Typography>
            </FailedAnswerItem>
          ))}
        </FailedAnswersList>
      )}

      <ButtonsContainer>
        {!!failedResults.length && (
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onReviewFailed}
          >
            Practice failed answers
          </Button>
        )}

        <Button variant="outlined" size="large" fullWidth onClick={onRestart}>
          Restart all
        </Button>

        <Button
          variant="text"
          size="large"
          fullWidth
          onClick={() => navigate(-1)}
        >
          Back to section
        </Button>
      </ButtonsContainer>
    </SummaryCard>
  );
};

export default WrittenAnswerSummary;

const FailedAnswersList = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  width: "100%",
  maxHeight: 240,
  overflowY: "auto",
}));

const FailedAnswerItem = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));
