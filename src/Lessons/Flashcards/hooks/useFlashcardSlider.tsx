import { useState } from "react";
import { SlideDirection } from "@/Lessons/Flashcards/context/FlashcardsContext";

const useFlashcardSlider = (phrasesLength: number) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);

  const handleTransitionEnd = (
    currentIndex: number,
    setCurrentIndex: (i: number) => void
  ) => {
    if (!isSliding || !phrasesLength) return;

    setCurrentIndex(
      slideDirection === "next"
        ? (currentIndex + 1) % phrasesLength
        : (currentIndex - 1 + phrasesLength) % phrasesLength
    );
    setIsSliding(false);
    setSlideDirection(null);
  };

  return {
    isSliding,
    setIsSliding,
    slideDirection,
    handleTransitionEnd,
    setSlideDirection,
  };
};

export default useFlashcardSlider;
