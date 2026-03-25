import { Typography, Button } from "@mui/material";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import ProgressRing from "../../SharedComponentes/ProgressRing";
import { useNavigate } from "react-router-dom";
import SummaryCard from "@/Lessons/SharedComponentes/SummaryCard";
import ButtonsContainer from "@/Lessons/SharedComponentes/ButtonsContainer";

const FlashcardsReviewSummary = () => {
  const { correctCount, wrongCount, resetReview, keepReviewingWrongPhrases } =
    useFlashcardsContext();

  const navigate = useNavigate();

  return (
    <SummaryCard>
      <Typography variant="h4" textAlign="center">
        Brilliant work!
      </Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        sx={{ lineHeight: 1.6 }}
      >
        All flashcards have been reviewed, <br />
        here's how you did:
      </Typography>

      <ProgressRing correct={correctCount} wrong={wrongCount} />

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
            Keep reviewing {wrongCount} {wrongCount === 1 ? "term" : "terms"}
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
