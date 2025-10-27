import { FlashcardsProvider } from "@/Lessons/Flashcards/context/FlashcardsProvider";
import FlashcardsLayout from "@/Lessons/Flashcards/components/FlashcardsLayout";
import BrowseModeControls from "@/Lessons/Flashcards/FlashcardsBrowse/BrowseModeControls";

const FlashcardsBrowse = () => (
  <FlashcardsProvider>
    <FlashcardsLayout>
      <BrowseModeControls />
    </FlashcardsLayout>
  </FlashcardsProvider>
);

export default FlashcardsBrowse;
