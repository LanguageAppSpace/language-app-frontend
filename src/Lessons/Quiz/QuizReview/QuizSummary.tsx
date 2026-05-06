import ButtonsContainer from "@/Lessons/SharedComponentes/ButtonsContainer";
import ProgressRing from "@/Lessons/SharedComponentes/ProgressRing";
import SummaryCard from "@/Lessons/SharedComponentes/SummaryCard";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  correct: number;
  wrong: number;
  onRestart: () => void;
}

const QuizSummary = ({ correct, wrong, onRestart }: Props) => {
  const navigate = useNavigate();
  return (
    <SummaryCard>
      <Typography variant="h4">Quiz finished!</Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        sx={{ lineHeight: 1.6 }}
      >
        All translations have been answered, <br />
        here's how you did:
      </Typography>

      <ProgressRing correct={correct} wrong={wrong} />

      <ButtonsContainer>
        <Button variant="contained" size="large" fullWidth onClick={onRestart}>
          Restart quiz
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

export default QuizSummary;
