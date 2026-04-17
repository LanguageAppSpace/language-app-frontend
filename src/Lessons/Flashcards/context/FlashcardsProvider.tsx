import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import useFlashcards from "@/Lessons/Flashcards/hooks/useFlashcards";
import useFlashcardSlider from "@/Lessons/Flashcards/hooks/useFlashcardSlider";
import React, { useEffect } from "react";
import FlashcardsContext from "@/Lessons/Flashcards/context/FlashcardsContext";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { useTranslation } from "react-i18next";
export const FlashcardsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const { t } = useTranslation("flashcards");

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
    reviewFeedback,
    setReviewFeedback,
    calcNextIndex,
    mode,
    setMode,
  } = useFlashcardSlider(lesson?.phrasePairs.length ?? 0);

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
        <Typography color="primary">{t("states.noPhrases")}</Typography>
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
