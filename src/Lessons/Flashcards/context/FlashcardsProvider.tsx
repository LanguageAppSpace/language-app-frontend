import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import useFlashcards from "@/Lessons/Flashcards/hooks/useFlashcards";
import useFlashcardSlider from "@/Lessons/Flashcards/hooks/useFlashcardSlider";
import React, { useState, useEffect } from "react";
import FlashcardsContext from "@/Lessons/Flashcards/context/FlashcardsContext";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { PhrasePair } from "@/interface";
export const FlashcardsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();

  const {
    lesson,
    isLoading,
    phrases,
    currentIndex,
    flipped,
    handleFlip,
    setCurrentIndex,
  } = useFlashcards(lessonId ?? "");

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isReviewFinished, setIsReviewFinished] = useState(false);
  const [reviewPhrases, setReviewPhrases] = useState<PhrasePair[]>([]);
  const [wrongPhrases, setWrongPhrases] = useState<PhrasePair[]>([]);

  const activePhrases = reviewPhrases.length ? reviewPhrases : phrases;

  const markCorrect = () => {
    setCorrectCount((c) => c + 1);
  };

  const markWrong = () => {
    setWrongCount((c) => c + 1);
    setWrongPhrases((prev) => [...prev, activePhrases[currentIndex]]);
  };

  const keepReviewingWrongPhrases = () => {
    if (!wrongPhrases.length) return;

    setReviewPhrases(wrongPhrases);
    setWrongPhrases([]);
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsReviewFinished(false);
    setReviewFeedback(null);
  };

  const resetReview = () => {
    setReviewPhrases([]);
    setWrongPhrases([]);
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsReviewFinished(false);
    setReviewFeedback(null);
  };

  const finishReview = () => {
    setIsReviewFinished(true);
  };

  const {
    setSlideDirection,
    setIsSliding,
    isSliding,
    slideDirection,
    handleTransitionEnd,
    reviewFeedback,
    setReviewFeedback,
    calcNextIndex,
    mode,
    setMode,
  } = useFlashcardSlider(activePhrases.length);

  useEffect(() => {
    const currentMode = location.pathname.endsWith("/review")
      ? "review"
      : "browse";
    setMode(currentMode);
  }, [location.pathname, setMode]);

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
        phrases: activePhrases,
        currentIndex,
        flipped,
        isSliding,
        slideDirection,
        handleFlip,
        handleNext,
        handlePrevious,
        setCurrentIndex,
        handleTransitionEnd,
        isReviewFinished,
        finishReview,
        correctCount,
        wrongCount,
        markCorrect,
        markWrong,
        resetReview,
        wrongPhrases,
        keepReviewingWrongPhrases,
        reviewFeedback,
        setReviewFeedback,
        calcNextIndex,
        mode,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export default FlashcardsProvider;
