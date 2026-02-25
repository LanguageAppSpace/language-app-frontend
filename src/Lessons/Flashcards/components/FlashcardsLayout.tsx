import { Box, Typography, styled, keyframes } from "@mui/material";
import Flashcard from "@/Lessons/Flashcards/components/Flashcard";
import FlashcardSlider from "@/Lessons/Flashcards/components/FlashcardSlider";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import React from "react";
import { ReviewFeedback } from "@/Lessons/Flashcards/context/FlashcardsContext";
import { LessonSessionProgressBar } from "@/Lessons/Flashcards/components/LessonSessionProgressBar";

interface FlashcardsLayout {
  children: React.ReactNode;
}

const FlashcardsLayout: React.FC<FlashcardsLayout> = ({ children }) => {
  const {
    lesson,
    phrases,
    currentIndex,
    flipped,
    handleFlip,
    setCurrentIndex,
    isSliding,
    slideDirection,
    handleTransitionEnd,
    reviewFeedback,
    mode,
    setReviewFeedback,
  } = useFlashcardsContext();

  const currentPhrase = phrases[currentIndex];

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <Typography variant="h4" color="primary">
          {lesson.title}
        </Typography>
        <LessonSessionProgressBar
          activeIndex={currentIndex}
          totalPhrases={phrases.length}
        />
        <FlashcardStage>
          <FlashcardSlider
            isSliding={isSliding}
            slideDirection={slideDirection}
            onTransitionEnd={() =>
              handleTransitionEnd(currentIndex, setCurrentIndex)
            }
            mode={mode}
          >
            <Flashcard
              phraseOne={currentPhrase.phraseOne}
              phraseTwo={currentPhrase.phraseTwo}
              flipped={flipped}
              onFlip={handleFlip}
              key={currentPhrase.id ?? currentIndex}
              disableFlipAnimation={
                mode === "review" && Boolean(reviewFeedback)
              }
            />
          </FlashcardSlider>
          {reviewFeedback && (
            <FlashcardOverlayCard
              reviewFeedback={reviewFeedback}
              onAnimationEnd={() => setReviewFeedback(null)}
            >
              {reviewFeedback === "correct" ? "I know" : "Still learning"}
            </FlashcardOverlayCard>
          )}
        </FlashcardStage>
        <FlashcardControls>{children}</FlashcardControls>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default FlashcardsLayout;

export const FlashcardPageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

export const FlashcardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
}));

export const FlashcardControls = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const FlashcardStage = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "clamp(200px, 40vh, 400px)",
  isolation: "isolate",
}));

const overlayCorrect = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0) scale(.98) rotateZ(0deg);
  }

  18% {
    opacity: 1;
    transform: translateX(0) scale(1.02) rotateZ(0deg);
  }

  60% {
    opacity: 1;
    transform: translateX(18px) scale(1) rotateZ(2deg);
  }

  100% {
    opacity: 0;
    transform: translateX(26px) scale(1) rotateZ(4deg);
  }
`;

const overlayIncorrect = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0) scale(.98) rotateZ(0deg);
  }

  18% {
    opacity: 1;
    transform: translateX(0) scale(1.02) rotateZ(0deg);
  }

  60% {
    opacity: 1;
    transform: translateX(-18px) scale(1) rotateZ(-2deg);
  }

  100% {
    opacity: 0;
    transform: translateX(-26px) scale(1) rotateZ(-4deg);
  }
`;

const FlashcardOverlayCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "reviewFeedback",
})<{ reviewFeedback: ReviewFeedback }>(({ theme, reviewFeedback }) => ({
  position: "absolute",
  inset: 0,
  zIndex: 10,
  display: "grid",
  placeItems: "center",
  pointerEvents: "none",
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[6],
  border: `4px solid ${
    reviewFeedback === "correct"
      ? theme.palette.success.main
      : theme.palette.error.main
  }`,
  color:
    reviewFeedback === "correct"
      ? theme.palette.success.light
      : theme.palette.error.light,

  fontWeight: 800,
  fontSize: "36px",
  animation: `${
    reviewFeedback === "correct" ? overlayCorrect : overlayIncorrect
  } 500ms ease-out both`,
}));
