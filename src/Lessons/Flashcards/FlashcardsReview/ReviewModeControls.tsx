import { Box, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import theme from "@/theme/theme";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";

const ReviewModeControls = () => {
  const { handleReviewAnswer } = useFlashcardsContext();

  return (
    <ReviewControlsContainer>
      <FlashcardIconButton
        onClick={() => handleReviewAnswer(false)}
        bgColor={theme.palette.error.main}
        textColor={theme.palette.error.contrastText}
        disableRipple
      >
        <CloseIcon fontSize="medium" />
      </FlashcardIconButton>
      <FlashcardIconButton
        onClick={() => handleReviewAnswer(true)}
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
