import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import useFlashcards from "@/Lessons/Flashcards/hooks/useFlashcards";
import useFlashcardSlider from "@/Lessons/Flashcards/hooks/useFlashcardSlider";
import React, { useEffect } from "react";
import FlashcardsContext from "@/Lessons/Flashcards/context/FlashcardsContext";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
export const FlashcardsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

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

  const handleReviewAnswer = async (learned: boolean) => {
    const pair = phrases[currentIndex];
    if (!pair || !lesson) return;

    const isStatusChanged = pair.isLearned !== learned;

    setReviewFeedback(learned ? "correct" : "incorrect");
    setCurrentIndex((prevIndex) => calcNextIndex(prevIndex, "next"));

    if (isStatusChanged) {
      try {
        await editPhrasePair({
          lessonId: lesson.id,
          pairId: pair.id!,
          data: { ...pair, isLearned: learned },
          sectionId: lesson.section,
        });
      } catch (err) {
        dispatch(
          showNotification({
            message: "Failed to update flashcard",
            severity: "error",
          })
        );
      }
    }
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
        handleReviewAnswer,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export default FlashcardsProvider;
