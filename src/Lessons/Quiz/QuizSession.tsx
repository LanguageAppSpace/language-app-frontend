import { Lesson } from "@/interface";
import { LessonSessionProgressBar } from "@/Lessons/Flashcards/components/LessonSessionProgressBar";
import { Button, styled, alpha, Typography, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import {
  FlashcardContainer,
  FlashcardPageWrapper,
} from "@/Lessons/Flashcards/components/FlashcardsLayout";
import useQuiz from "@/Lessons/Quiz/hooks/useQuiz";

const QuizSession = ({ lesson }: { lesson: Lesson }) => {
  const {
    quizQuestions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    isAnswered,
    isFinished,
    handleSelectAnswer,
    handleNextQuestion,
  } = useQuiz(lesson);

  if (isFinished) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">You have completed this lesson.</Typography>
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
          activeIndex={currentIndex}
          totalPhrases={quizQuestions.length}
        />
        <QuizSessionContainer>
          <Typography variant="body1">{currentQuestion.phraseOne}</Typography>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            return (
              <QuizOptionButton
                key={`${currentQuestion.pairId}-${option}`}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                $isCorrect={isCorrect}
                $isSelected={isSelected}
                $isAnswered={isAnswered}
              >
                {option}
              </QuizOptionButton>
            );
          })}
        </QuizSessionContainer>
        <QuizzSessionControls>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={!isAnswered}
          >
            <ArrowForward />
          </Button>
        </QuizzSessionControls>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default QuizSession;

interface QuizOptionButtonProps {
  $isCorrect: boolean;
  $isSelected: boolean;
  $isAnswered: boolean;
}

const QuizOptionButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "$isCorrect" && prop !== "$isSelected" && prop !== "$isAnswered",
})<QuizOptionButtonProps>(({ theme, $isCorrect, $isSelected, $isAnswered }) => {
  const color = theme.palette.primary.light;
  let backgroundColor = theme.palette.text.primary;
  let borderColor = theme.palette.background.dark;

  if ($isAnswered && $isCorrect) {
    backgroundColor = alpha(theme.palette.success.main, 0.25);
    borderColor = theme.palette.success.main;
  }

  if ($isAnswered && $isSelected && !$isCorrect) {
    backgroundColor = alpha(theme.palette.error.main, 0.25);
    borderColor = theme.palette.error.main;
  }

  return {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${borderColor}`,
    textTransform: "none",
    backgroundColor,
    color,
    cursor: $isAnswered ? "default" : "pointer",
    transition:
      "box-shadow 0.15s ease, transform 0.1s ease, background-color 0.15s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",

    ...(!$isAnswered && {
      "&:hover": {
        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        transform: "translateY(-1px)",
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

const QuizSessionContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  width: "100%",
  textAlign: "center",
}));

const QuizzSessionControls = styled(Box)(() => ({
  alignSelf: "flex-end",
}));
