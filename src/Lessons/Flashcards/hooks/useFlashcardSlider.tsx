import { useState } from "react";
import {
  ReviewFeedback,
  SlideDirection,
  FlashcardsMode,
} from "@/Lessons/Flashcards/context/FlashcardsContext";

const useFlashcardSlider = (phrasesLength: number) => {
  const [mode, setMode] = useState<FlashcardsMode>("browse");
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);
  const [reviewFeedback, setReviewFeedback] = useState<ReviewFeedback>(null);

  const calcNextIndex = (currentIndex: number, dir: SlideDirection) => {
    if (!phrasesLength) return currentIndex;
    return dir === "next"
      ? (currentIndex + 1) % phrasesLength
      : (currentIndex - 1 + phrasesLength) % phrasesLength;
  };

  const handleTransitionEnd = (
    currentIndex: number,
    setCurrentIndex: (i: number) => void
  ) => {
    if (mode !== "browse") return;
    if (!isSliding || !phrasesLength || !slideDirection) return;

    setCurrentIndex(calcNextIndex(currentIndex, slideDirection));
    setIsSliding(false);
    setSlideDirection(null);
  };

  return {
    isSliding,
    setIsSliding,
    slideDirection,
    handleTransitionEnd,
    setSlideDirection,
    reviewFeedback,
    setReviewFeedback,
    mode,
    setMode,
    calcNextIndex,
  };
};

export default useFlashcardSlider;
