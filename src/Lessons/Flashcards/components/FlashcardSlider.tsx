import React from "react";
import { styled, Box } from "@mui/material";
import { SlideDirection } from "@/Lessons/Flashcards/context/FlashcardsContext";

interface FlashcardWrapperProps {
  isSliding: boolean;
  slideDirection: SlideDirection;
  onTransitionEnd: () => void;
  children: React.ReactNode;
}

const FlashcardSlider: React.FC<FlashcardWrapperProps> = ({
  children,
  isSliding,
  slideDirection,
  onTransitionEnd,
}) => {
  return (
    <StyledFlashcardSlider
      isSliding={isSliding}
      slideDirection={slideDirection}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </StyledFlashcardSlider>
  );
};

export default FlashcardSlider;

export const StyledFlashcardSlider = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isSliding" && prop !== "slideDirection",
})<{ isSliding: boolean; slideDirection: SlideDirection }>(
  ({ isSliding, slideDirection }) => ({
    width: "100%",
    height: "clamp(200px, 40vh, 400px)",
    perspective: 1000,
    transition: "transform 0.3s, opacity 0.3s",
    transform: isSliding
      ? slideDirection === "next"
        ? "translateX(20%)"
        : "translateX(-20%)"
      : "translateX(0)",
    opacity: isSliding ? 0 : 1,
  })
);
