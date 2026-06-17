import { Lesson } from "@/interface";
import { LessonSessionProgressBar } from "@/Lessons/Flashcards/components/LessonSessionProgressBar";
import {
  FlashcardContainer,
  FlashcardPageWrapper,
} from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { ArrowForward, Check } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  alpha,
} from "@mui/material";
import useWrittenAnswer from "@/Lessons/WrittenAnswer/hooks/useWrittenAnswer";
import WrittenAnswerSummary from "@/Lessons/WrittenAnswer/WrittenAnswerReview/WrittenAnswerSummary";
import { useTranslation } from "react-i18next";

const WrittenAnswerSession = ({ lesson }: { lesson: Lesson }) => {
  const { t } = useTranslation("lessons");
  const {
    phrasesToReview,
    currentPhrase,
    currentIndex,
    userAnswer,
    isAnswered,
    isFinished,
    correctCount,
    wrongCount,
    failedResults,
    setUserAnswer,
    checkAnswer,
    handleNext,
    restartAll,
    reviewFailedOnly,
  } = useWrittenAnswer(lesson);

  if (isFinished) {
    return (
      <FlashcardPageWrapper>
        <WrittenAnswerSummary
          correct={correctCount}
          wrong={wrongCount}
          failedResults={failedResults}
          onRestart={restartAll}
          onReviewFailed={reviewFailedOnly}
        />
      </FlashcardPageWrapper>
    );
  }

  const normalizedUserAnswer = userAnswer.trim().toLowerCase();
  const normalizedCorrectAnswer = currentPhrase.phraseTwo.trim().toLowerCase();
  const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <WrittenAnswerHeader>
          <Typography
            variant="h4"
            color="primary"
            textAlign="center"
            sx={{ fontWeight: 400 }}
          >
            {lesson.title}
          </Typography>

          <ProgressInfo>
            <LessonSessionProgressBar
              activeIndex={currentIndex}
              totalPhrases={phrasesToReview.length}
            />
          </ProgressInfo>
        </WrittenAnswerHeader>

        <WrittenAnswerCard>
          <PhraseText>{currentPhrase.phraseOne}</PhraseText>

          <AnswerTextField
            value={userAnswer}
            onChange={(event) => setUserAnswer(event.target.value)}
            disabled={isAnswered}
            placeholder={t("placeholders.typeYourAnswer")}
            fullWidth
            autoFocus
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;

              if (!isAnswered) {
                checkAnswer();
                return;
              }

              handleNext();
            }}
          />

          {isAnswered && (
            <FeedbackBox $isCorrect={isCorrect}>
              <Typography fontWeight={700}>
                {isCorrect
                  ? t("notifications.correct")
                  : t("notifications.incorrect")}
              </Typography>

              {!isCorrect && (
                <>
                  <Typography>
                    {t("titles.yourAnswer")} <strong>{userAnswer}</strong>
                  </Typography>

                  <Typography>
                    {t("titles.correctAnswer")}{" "}
                    <strong>{currentPhrase.phraseTwo}</strong>
                  </Typography>
                </>
              )}
            </FeedbackBox>
          )}
        </WrittenAnswerCard>

        <WrittenAnswerControls>
          {!isAnswered ? (
            <Button
              variant="contained"
              color="primary"
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              size="large"
              sx={{
                minWidth: 72,
                height: 48,
                borderRadius: 999,
              }}
            >
              <Check />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              size="large"
              sx={{
                minWidth: 72,
                height: 48,
                borderRadius: 999,
              }}
            >
              <ArrowForward />
            </Button>
          )}
        </WrittenAnswerControls>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default WrittenAnswerSession;

const WrittenAnswerHeader = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
  justifyItems: "center",
  textAlign: "center",
  width: "100%",
  marginBottom: theme.spacing(4),
}));

const ProgressInfo = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  width: "100%",
  maxWidth: 620,
  marginTop: theme.spacing(1.5),
}));

const WrittenAnswerCard = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.5),
  width: "100%",
  maxWidth: 620,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
  textAlign: "center",
}));

const PhraseText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 1.25,
  wordBreak: "break-word",
}));

const AnswerTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    minHeight: 58,
    borderRadius: theme.spacing(2),
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition:
      "box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease",

    "& fieldset": {
      borderColor: alpha(theme.palette.primary.main, 0.28),
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-focused": {
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },

    "&.Mui-disabled": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.4),
    },
  },

  "& .MuiOutlinedInput-input": {
    color: "#111111",
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
    padding: theme.spacing(1.8, 2),
  },

  "& .MuiOutlinedInput-input::placeholder": {
    color: "#777777",
    opacity: 1,
    fontWeight: 500,
  },

  "& .MuiOutlinedInput-input.Mui-disabled": {
    WebkitTextFillColor: "#111111",
  },
}));

interface FeedbackBoxProps {
  $isCorrect: boolean;
}

const FeedbackBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$isCorrect",
})<FeedbackBoxProps>(({ theme, $isCorrect }) => ({
  display: "grid",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: $isCorrect
    ? alpha(theme.palette.success.main, 0.16)
    : alpha(theme.palette.error.main, 0.16),
  border: `1px solid ${
    $isCorrect ? theme.palette.success.main : theme.palette.error.main
  }`,
}));

const WrittenAnswerControls = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginTop: theme.spacing(1),
}));
