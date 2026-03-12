import { Box, Typography, styled } from "@mui/material";
import Flashcard from "@/Lessons/Flashcards/components/Flashcard";
import FlashcardSlider from "@/Lessons/Flashcards/components/FlashcardSlider";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import FlashcardsReviewSummary from "@/Lessons/Flashcards/FlashcardsReview/FlashcardsReviewSummary";
import React from "react";

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
    isReviewFinished
  } = useFlashcardsContext();

  if(isReviewFinished){
    return(
    <FlashcardPageWrapper>
      <FlashcardsReviewSummary />
    </FlashcardPageWrapper>
    );
  }
  
  const currentPhrase = phrases[currentIndex];

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <Typography variant="h4" color="primary">
          {lesson.title}
        </Typography>
        <Typography color="primary">
          Card {currentIndex + 1} of {phrases.length}
        </Typography>

        <FlashcardSlider
          isSliding={isSliding}
          slideDirection={slideDirection}
          onTransitionEnd={() =>
            handleTransitionEnd(currentIndex, setCurrentIndex)
          }
        >
          <Flashcard
            phraseOne={currentPhrase.phraseOne}
            phraseTwo={currentPhrase.phraseTwo}
            flipped={flipped}
            onFlip={handleFlip}
            currentIndex={currentIndex}
          />
        </FlashcardSlider>

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
