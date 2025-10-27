import { FlashcardsProvider } from "@/Lessons/Flashcards/context/FlashcardsProvider";
import FlashcardsLayout from "@/Lessons/Flashcards/components/FlashcardsLayout";
import ReviewModeControls from "@/Lessons/Flashcards/FlashcardsReview/ReviewModeControls";
const FlashcardsReview = () => {
  return (
    <FlashcardsProvider>
      <FlashcardsLayout>
        <ReviewModeControls />
      </FlashcardsLayout>
    </FlashcardsProvider>
  );
};

export default FlashcardsReview;
