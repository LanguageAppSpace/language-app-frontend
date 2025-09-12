import { Box, styled } from "@mui/material";

interface FlashcardProps {
  phraseOne: string;
  phraseTwo: string;
  flipped: boolean;
  onFlip: () => void;
  currentIndex: number;
}

const Flashcard = ({
  phraseOne,
  phraseTwo,
  flipped,
  onFlip,
  currentIndex,
}: FlashcardProps) => {
  return (
    <FlashcardContainer flipped={flipped} key={currentIndex} onClick={onFlip}>
      <FlashcardSide>{phraseOne}</FlashcardSide>
      <FlashcardSideBack>{phraseTwo}</FlashcardSideBack>
    </FlashcardContainer>
  );
};

export default Flashcard;

const FlashcardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flipped",
})<{ flipped: boolean }>(({ theme, flipped }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
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
}));

const FlashcardSide = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const FlashcardSideBack = styled(FlashcardSide)({
  transform: "rotateY(180deg)",
});
