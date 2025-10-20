import { useContext } from "react";
import FlashcardsContext from "@/Lessons/Flashcards/context/FlashcardsContext";

export const useFlashcardsContext = () => {
  const context = useContext(FlashcardsContext);
  if (!context)
    throw new Error(
      "useFlashcardsContext must be used inside FlashcardsProvider"
    );
  return context;
};
