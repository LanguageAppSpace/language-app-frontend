import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import useFlashcards from "@/Lessons/Flashcards/hooks/useFlashcards";
import useFlashcardSlider from "@/Lessons/Flashcards/hooks/useFlashcardSlider";
import React from "react";
import FlashcardsContext from "@/Lessons/Flashcards/context/FlashcardsContext";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
export const FlashcardsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const {
    lesson,
    isLoading,
    phrases,
    currentIndex,
    flipped,
    handleFlip,
    setCurrentIndex,
  } = useFlashcards(lessonId ?? "");

  const {
    setSlideDirection,
    setIsSliding,
    isSliding,
    slideDirection,
    handleTransitionEnd,
  } = useFlashcardSlider(lesson?.phrasePairs.length ?? 0);

  if (isLoading)
    return (
      <FlashcardPageWrapper>
        <CircularProgress />
      </FlashcardPageWrapper>
    );

  if (!lesson || lesson.phrasePairs.length === 0)
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">
          No phrases found in this lesson.
        </Typography>
      </FlashcardPageWrapper>
    );

  const handleNext = () => {
    setSlideDirection("next");
    setIsSliding(true);
  };

  const handlePrevious = () => {
    setSlideDirection("prev");
    setIsSliding(true);
  };

  return (
    <FlashcardsContext.Provider
      value={{
        lesson,
        phrases,
        currentIndex,
        flipped,
        isSliding,
        slideDirection,
        handleFlip,
        handleNext,
        handlePrevious,
        setCurrentIndex,
        handleTransitionEnd,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export default FlashcardsProvider;
