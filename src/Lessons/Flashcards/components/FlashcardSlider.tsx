import React from "react";
import { styled, Box } from "@mui/material";
import {
  FlashcardsMode,
  SlideDirection,
} from "@/Lessons/Flashcards/context/FlashcardsContext";

interface FlashcardWrapperProps {
  isSliding: boolean;
  slideDirection: SlideDirection;
  onTransitionEnd: () => void;
  children: React.ReactNode;
  mode: FlashcardsMode;
}

const FlashcardSlider: React.FC<FlashcardWrapperProps> = ({
  children,
  ...props
}) => {
  return <StyledFlashcardSlider {...props}>{children}</StyledFlashcardSlider>;
};

export default FlashcardSlider;

export const StyledFlashcardSlider = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isSliding" && prop !== "slideDirection" && prop !== "mode",
})<{
  isSliding: boolean;
  slideDirection: SlideDirection;
  mode: FlashcardsMode;
}>(({ isSliding, slideDirection, mode }) => ({
  width: "100%",
  height: "clamp(200px, 40vh, 400px)",
  perspective: 1000,
  ...(mode === "browse"
    ? {
        transition: "transform 0.3s, opacity 0.3s",
        transform: isSliding
          ? slideDirection === "next"
            ? "translateX(20%)"
            : "translateX(-20%)"
          : "translateX(0)",
        opacity: isSliding ? 0 : 1,
      }
    : {
        transition: "none",
        transform: "translateX(0)",
        opacity: 1,
      }),
}));
