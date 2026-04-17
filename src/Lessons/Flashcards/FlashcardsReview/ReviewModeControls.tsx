import { useEditPhrasePairMutation } from "@/redux/lessons/lessonsApiSlice";
import { Box, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import theme from "@/theme/theme";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";
import { useTranslation } from "react-i18next";
const ReviewModeControls = () => {
  const {
    isSliding,
    currentIndex,
    phrases,
    lesson,
    setReviewFeedback,
    setCurrentIndex,
    calcNextIndex,
  } = useFlashcardsContext();
  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation("flashcards");

  const handleEditFlashcard = async (learned: boolean) => {
    if (isSliding) return;

    const pair = phrases[currentIndex];
    const isStatusChanged = pair.isLearned !== learned;

    setReviewFeedback(learned ? "correct" : "incorrect");
    setCurrentIndex(calcNextIndex(currentIndex, "next"));

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
            message: t("notifications.updateFailed"),
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
        onClick={() => handleEditFlashcard(false)}
        bgColor={theme.palette.error.main}
        textColor={theme.palette.error.contrastText}
        disableRipple
      >
        <CloseIcon fontSize="medium" />
      </FlashcardIconButton>
      <FlashcardIconButton
        onClick={() => handleEditFlashcard(true)}
        bgColor={theme.palette.success.main}
        textColor={theme.palette.success.contrastText}
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
  gap: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const FlashcardIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "textColor",
})<{ bgColor: string; textColor: string }>(({ bgColor, textColor }) => ({
  backgroundColor: bgColor,
  color: textColor,
  "&:hover": {
    backgroundColor: bgColor,
  },
}));
