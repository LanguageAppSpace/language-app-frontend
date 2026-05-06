import { Lesson, PhrasePair } from "@/interface";
import { createContext } from "react";

export type SlideDirection = "next" | "prev" | null;
export type ReviewFeedback = "correct" | "incorrect" | null;
export type FlashcardsMode = "browse" | "review";

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
  reviewFeedback: ReviewFeedback;
  setReviewFeedback: (feedback: ReviewFeedback) => void;
  calcNextIndex: (currentIndex: number, dir: SlideDirection) => number;
  mode: FlashcardsMode;
  handleReviewAnswer: (learned: boolean) => void;
}

const FlashcardsContext = createContext<FlashcardsContextType | null>(null);

export default FlashcardsContext;
