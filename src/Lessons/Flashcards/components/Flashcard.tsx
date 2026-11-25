import { alpha, Box, IconButton, styled } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect } from "react";

interface FlashcardProps {
  phraseOne: string;
  phraseTwo: string;
  phraseLanguage: string;
  translationLanguage: string;
  flipped: boolean;
  onFlip: () => void;
  disableFlipAnimation?: boolean;
}

const Flashcard = ({
  phraseOne,
  phraseTwo,
  phraseLanguage,
  translationLanguage,
  flipped,
  onFlip,
  disableFlipAnimation,
}: FlashcardProps) => {
  const speechSupported =
    "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [flipped, phraseOne, phraseTwo]);

  const speak = (text: string, language: string) => {
    if (!speechSupported || !text.trim() || !language) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <FlashcardContainer
      flipped={flipped}
      onClick={onFlip}
      disableFlipAnimation={disableFlipAnimation}
    >
      <FlashcardSide sx={{ pointerEvents: flipped ? "none" : "auto" }}>
        {phraseOne}
        <Box
          sx={{
            position: "absolute",
            bottom: 3,
            right: 3,
          }}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onPointerCancel={(event) => event.stopPropagation()}
        >
          <IconButton
            color="inherit"
            disabled={
              flipped ||
              !speechSupported ||
              !phraseLanguage ||
              !phraseOne.trim()
            }
            tabIndex={flipped ? -1 : 0}
            onClick={() => speak(phraseOne, phraseLanguage)}
          >
            <VolumeUpIcon />
          </IconButton>
        </Box>
      </FlashcardSide>
      <FlashcardSideBack
        aria-hidden={!flipped}
        sx={{ pointerEvents: flipped ? "auto" : "none" }}
      >
        {phraseTwo}
        <Box
          sx={{
            position: "absolute",
            bottom: 3,
            right: 3,
          }}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onPointerCancel={(event) => event.stopPropagation()}
        >
          <IconButton
            color="inherit"
            disabled={
              !flipped ||
              !speechSupported ||
              !translationLanguage ||
              !phraseTwo.trim()
            }
            tabIndex={!flipped ? -1 : 0}
            onClick={() => speak(phraseTwo, translationLanguage)}
          >
            <VolumeUpIcon />
          </IconButton>
        </Box>
      </FlashcardSideBack>
    </FlashcardContainer>
  );
};

export default Flashcard;

const FlashcardContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "flipped" && prop !== "disableFlipAnimation",
})<{ flipped: boolean; disableFlipAnimation?: boolean }>(
  ({ theme, flipped, disableFlipAnimation }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: disableFlipAnimation ? "none" : "transform 0.6s",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  })
);

const FlashcardSide = styled(Box)(({ theme }) => ({
  position: "absolute",
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  "& .MuiIconButton-root": {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: "50%",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.short,
    }),
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: alpha(theme.palette.common.white, 0.18),
    },
  },
}));

const FlashcardSideBack = styled(FlashcardSide)({
  transform: "rotateY(180deg)",
});
