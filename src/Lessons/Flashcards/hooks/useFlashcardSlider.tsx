import { useState } from "react";
import { SlideDirection } from "@/Lessons/Flashcards/context/FlashcardsContext";

const useFlashcardSlider = (
  phrasesLength: number,
  onLastCard?: () => void
) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);

  const handleTransitionEnd = (
    currentIndex: number,
    setCurrentIndex: (i: number) => void
  ) => {

    if (!isSliding || !phrasesLength) return;

    if (slideDirection === "next"){

      const isLastCard = currentIndex === phrasesLength - 1;

      if (isLastCard) {
        onLastCard?.();
        setIsSliding(false);
        setSlideDirection(null);
        return;
      }

      setCurrentIndex(currentIndex + 1)
    }
    
    if (slideDirection === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

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
