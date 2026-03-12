import { Box, Typography, Button, styled } from "@mui/material";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import ReviewProgressRing from "./FlashcardsProgressRing";
import { useNavigate } from "react-router-dom";

const FlashcardsReviewSummary = () => {
  const {
    correctCount,
    wrongCount,
    resetReview,
    keepReviewingWrongPhrases,
  } = useFlashcardsContext();

  const navigate = useNavigate();

  return (
    <SummaryCard>
      <Typography variant="h4" textAlign="center">
        Brilliant work!
      </Typography>

      <Typography color="text.secondary" textAlign="center">
        All flashcards have been reviewed
      </Typography>

      <ReviewProgressRing
        correct={correctCount}
        wrong={wrongCount}
      />

      <ButtonsContainer>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={resetReview}
        >
          Restart Flashcards
        </Button>

        {wrongCount > 0 && (
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={keepReviewingWrongPhrases}
          >
            Keep reviewing {wrongCount} terms
          </Button>
        )}

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

export default FlashcardsReviewSummary;

const SummaryCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: 420,
  width: "100%",
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
}));
