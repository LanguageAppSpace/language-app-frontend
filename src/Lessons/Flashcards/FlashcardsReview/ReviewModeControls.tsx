import { Box, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import theme from "@/theme/theme";
import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";

const ReviewModeControls = () => {
  const {
    isSliding,
    currentIndex,
    phrases,
    lesson,
    markCorrect,
    markWrong,
    setReviewFeedback,
    setCurrentIndex,
    finishReview,
  } = useFlashcardsContext();

  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

  const handleReviewAnswer = async (learned: boolean) => {
    if (isSliding) return;

    const pair = phrases[currentIndex];
    const isStatusChanged = pair.isLearned !== learned;

    if (learned) {
      markCorrect();
    } else {
      markWrong();
    }
    const isLastCard = currentIndex === phrases.length - 1;
    setReviewFeedback(learned ? "correct" : "incorrect");
    if (isLastCard) {
      setTimeout(() => finishReview(), 400);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    if (isStatusChanged) {
      try {
        await editPhrasePair({
          lessonId: lesson.id,
          pairId: pair.id!,
          data: { ...pair, isLearned: learned },
          sectionId: lesson.section,
        });
      } catch (err) {
        dispatch(
          showNotification({
            message: "Failed to update flashcard",
            severity: "error",
          })
        );
        console.error(err);
      }
    }
  };

  return (
    <ReviewControlsContainer>
      <FlashcardIconButton
        onClick={() => handleReviewAnswer(false)}
        bgColor={theme.palette.review.incorrect}
        textColor={theme.palette.text.primary}
        disableRipple
      >
        <CloseIcon fontSize="medium" />
      </FlashcardIconButton>
      <FlashcardIconButton
        onClick={() => handleReviewAnswer(true)}
        bgColor={theme.palette.review.correct}
        textColor={theme.palette.text.primary}
        disableRipple
      >
        <CheckIcon fontSize="medium" />
      </FlashcardIconButton>
    </ReviewControlsContainer>
  );
};

export default ReviewModeControls;

const ReviewControlsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: theme.spacing(1),
}));

export const FlashcardIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "textColor",
})<{ bgColor: string; textColor: string }>(({ bgColor, textColor }) => ({
  backgroundColor: bgColor,
  color: textColor,
  width: 64,
  height: 64,
  borderRadius: "50%",
  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",

  "&:hover": {
    backgroundColor: bgColor,
    transform: "scale(1.1)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
  },
}));
