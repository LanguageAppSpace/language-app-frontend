import { ArrowForward } from "@mui/icons-material";
import { alpha, Box, Button, styled, Typography } from "@mui/material";
import { Lesson } from "@/interface";
import {
  FlashcardContainer,
  FlashcardPageWrapper,
} from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { LessonSessionProgressBar } from "@/Lessons/Flashcards/components/LessonSessionProgressBar";
import useMatchingPairs from "@/Lessons/MatchingPairs/hooks/useMatchingPairs";
import MatchingPairsSummary from "@/Lessons/MatchingPairs/MatchingPairsSummary";
import { useTranslation } from "react-i18next";

const MatchingPairsSession = ({ lesson }: { lesson: Lesson }) => {
  const { t } = useTranslation("flashcards");
  const {
    rounds,
    currentRound,
    currentRoundIndex,
    selectedLeft,
    selectedRight,
    matchedPairIds,
    wrongPairId,
    isCurrentRoundCompleted,
    isFinished,
    handleSelectLeft,
    handleSelectRight,
    handleNextRound,
    handleRestart,
    correctAnswers,
    wrongAnswers,
  } = useMatchingPairs(lesson);

  if (isFinished) {
    return (
      <FlashcardPageWrapper>
        <MatchingPairsSummary
          correct={correctAnswers}
          wrong={wrongAnswers}
          onRestart={handleRestart}
        />
      </FlashcardPageWrapper>
    );
  }

  if (!currentRound) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">{t("states.noPhrases")}</Typography>
      </FlashcardPageWrapper>
    );
  }

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <Typography variant="h4" color="primary">
          {lesson.title}
        </Typography>
        <LessonSessionProgressBar
          activeIndex={currentRoundIndex}
          totalPhrases={rounds.length}
          label={t("matchingPairs.progress", {
            current: currentRoundIndex + 1,
            total: rounds.length,
          })}
        />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t("matchingPairs.description")}
        </Typography>
        <MatchingPairsContainer>
          <MatchingPairsColumn>
            {currentRound.leftOptions.map((option) => {
              const isMatched = matchedPairIds.includes(option.pairId);
              return (
                <MatchingPairButton
                  key={`left-${option.pairId}`}
                  onClick={() => handleSelectLeft(option)}
                  disabled={isMatched}
                  $isSelected={selectedLeft?.pairId === option.pairId}
                  $isMatched={isMatched}
                  $isWrong={false}
                >
                  {option.text}
                </MatchingPairButton>
              );
            })}
          </MatchingPairsColumn>
          <MatchingPairsColumn>
            {currentRound.rightOptions.map((option) => {
              const isMatched = matchedPairIds.includes(option.pairId);
              return (
                <MatchingPairButton
                  key={`right-${option.pairId}`}
                  onClick={() => handleSelectRight(option)}
                  disabled={isMatched}
                  $isSelected={selectedRight?.pairId === option.pairId}
                  $isMatched={isMatched}
                  $isWrong={wrongPairId === option.pairId}
                >
                  {option.text}
                </MatchingPairButton>
              );
            })}
          </MatchingPairsColumn>
        </MatchingPairsContainer>
        <MatchingPairsSessionControls>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextRound}
            disabled={!isCurrentRoundCompleted}
          >
            <ArrowForward />
          </Button>
        </MatchingPairsSessionControls>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default MatchingPairsSession;

interface MatchingPairButtonProps {
  $isSelected: boolean;
  $isMatched: boolean;
  $isWrong: boolean;
}

const MatchingPairButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "$isSelected" && prop !== "$isMatched" && prop !== "$isWrong",
})<MatchingPairButtonProps>(({ theme, $isSelected, $isMatched, $isWrong }) => {
  const color = theme.palette.primary.light;
  let backgroundColor = theme.palette.text.primary;
  let borderColor = theme.palette.background.dark;

  if ($isSelected) {
    backgroundColor = alpha(theme.palette.primary.main, 0.25);
    borderColor = theme.palette.primary.main;
  }

  if ($isMatched) {
    backgroundColor = alpha(theme.palette.success.main, 0.25);
    borderColor = theme.palette.success.main;
  }

  if ($isWrong) {
    backgroundColor = alpha(theme.palette.error.main, 0.25);
    borderColor = theme.palette.error.main;
  }

  return {
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${borderColor}`,
    textTransform: "none",
    backgroundColor,
    color,
    minHeight: 64,
    whiteSpace: "normal",
    textAlign: "left",
    cursor: $isMatched ? "default" : "pointer",
    transition:
      "box-shadow 0.15s ease, transform 0.1s ease, background-color 0.15s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",

    ...(!$isMatched && {
      "&:hover": {
        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        transform: "translateY(-1px)",
        backgroundColor,
      },
      "&:active": {
        transform: "translateY(0px)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      },
    }),

    "&.Mui-disabled": {
      opacity: 1,
      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      transform: "none",
      color,
      backgroundColor,
      border: `1px solid ${borderColor}`,
    },
  };
});

const MatchingPairsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const MatchingPairsColumn = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
}));

const MatchingPairsSessionControls = styled(Box)(() => ({
  alignSelf: "flex-end",
}));
