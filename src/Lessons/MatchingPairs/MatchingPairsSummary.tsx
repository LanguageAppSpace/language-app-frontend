import ButtonsContainer from "@/Lessons/SharedComponentes/ButtonsContainer";
import ProgressRing from "@/Lessons/SharedComponentes/ProgressRing";
import SummaryCard from "@/Lessons/SharedComponentes/SummaryCard";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  correct: number;
  wrong: number;
  onRestart: () => void;
}

const MatchingPairsSummary = ({ correct, wrong, onRestart }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation("flashcards");

  return (
    <SummaryCard>
      <Typography variant="h4">{t("matchingPairs.summaryTitle")}</Typography>
      <Typography
        color="text.secondary"
        textAlign="center"
        sx={{ lineHeight: 1.6 }}
      >
        {t("matchingPairs.summaryDescription")}
      </Typography>
      <ProgressRing correct={correct} wrong={wrong} />
      <ButtonsContainer>
        <Button variant="contained" size="large" fullWidth onClick={onRestart}>
          {t("matchingPairs.restart")}
        </Button>
        <Button
          variant="text"
          size="large"
          fullWidth
          onClick={() => navigate(-1)}
        >
          {t("matchingPairs.backToSection")}
        </Button>
      </ButtonsContainer>
    </SummaryCard>
  );
};

export default MatchingPairsSummary;
