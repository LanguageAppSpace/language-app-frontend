import { Lesson, PhrasePair } from "@/interface";
import { createContext } from "react";

export type SlideDirection = "next" | "prev" | null;

interface FlashcardsContextType {
  lesson: Lesson;
  phrases: PhrasePair[];
  currentIndex: number;
  flipped: boolean;
  isSliding: boolean;
  slideDirection: SlideDirection;
  handleFlip: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  setCurrentIndex: (index: number) => void;
  handleTransitionEnd: (
    currentIndex: number,
    setCurrentIndex: (index: number) => void
  ) => void;
  isReviewFinished: boolean;
  finishReview: () => void;
  correctCount: number;
  wrongCount: number;
  markCorrect: () => void;
  markWrong: () => void;
  resetReview: () => void;
  wrongPhrases: PhrasePair[];
  keepReviewingWrongPhrases: () => void;
}

const FlashcardsContext = createContext<FlashcardsContextType | null>(null);

export default FlashcardsContext;
