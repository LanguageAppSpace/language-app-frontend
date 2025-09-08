import { useState, useEffect } from "react";
import {
  useEditPhrasePairMutation,
  useGetLessonByIdQuery,
} from "@/redux/lessons/lessonsApiSlice";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import Flashcard from "@/Lessons/Flashcards/Flashcard";
import theme from "@/theme/theme";
const FlashcardLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId ?? "");
  const [editPhrasePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setFlipped(false);
  }, [currentIndex]);

  if (isLoading)
    return (
      <FlashcardPageWrapper>
        <CircularProgress />
      </FlashcardPageWrapper>
    );

  if (!lesson || lesson.phrasePairs.length === 0)
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">
          No phrases found in this lesson.
        </Typography>
      </FlashcardPageWrapper>
    );

  const phrases = lesson.phrasePairs;
  const currentPhrase = phrases[currentIndex];

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    setSlideDirection("next");
    setIsSliding(true);
  };

  const handlePrevious = () => {
    setSlideDirection("prev");
    setIsSliding(true);
  };

  const handleEditFlashcard = async (learned: boolean) => {
    if (isSliding) return;

    const pair = phrases[currentIndex];
    if (pair.isLearned === learned) return;

    try {
      await editPhrasePair({
        lessonId: lesson.id,
        pairId: pair.id!,
        data: {
          ...pair,
          isLearned: learned,
        },
      });

      handleNext();
    } catch (err) {
      dispatch(
        showNotification({
          message: "Failed to update flashcard",
          severity: "error",
        })
      );
      console.error(err);
    }
  };

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <Typography variant="h4" color="primary">
          {lesson.title}
        </Typography>
        <Typography color="primary">
          {currentIndex + 1}/{phrases.length} phrases
        </Typography>
        <FlashcardWrapper
          isSliding={isSliding}
          slideDirection={slideDirection}
          onTransitionEnd={() => {
            if (isSliding) {
              setCurrentIndex(
                slideDirection === "next"
                  ? (currentIndex + 1) % phrases.length
                  : (currentIndex - 1 + phrases.length) % phrases.length
              );
              setIsSliding(false);
              setSlideDirection(null);
            }
          }}
        >
          <Flashcard
            phraseOne={currentPhrase.phraseOne}
            phraseTwo={currentPhrase.phraseTwo}
            flipped={flipped}
            onFlip={handleFlip}
            currentIndex={currentIndex}
          />
        </FlashcardWrapper>
        <FlashcardControls>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevious}
            >
              <ArrowBackIcon />
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
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
          </Box>
          <Box>
            <Button variant="contained" color="secondary" onClick={handleNext}>
              <ArrowForwardIcon />
            </Button>
          </Box>
        </FlashcardControls>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default FlashcardLearning;

export const FlashcardPageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

export const FlashcardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
}));

export const FlashcardWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isSliding" && prop !== "slideDirection",
})<{ isSliding: boolean; slideDirection: "next" | "prev" | null }>(
  ({ isSliding, slideDirection }) => ({
    width: "100%",
    height: 280,
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

export const FlashcardControls = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "space-between",
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
