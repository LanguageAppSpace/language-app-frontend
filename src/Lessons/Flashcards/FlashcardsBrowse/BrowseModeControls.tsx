import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFlashcardsContext } from "@/Lessons/Flashcards/hooks/useFlashcardsContext";

const BrowseModeControls = () => {
  const { handleNext, handlePrevious } = useFlashcardsContext();
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handlePrevious}>
        <ArrowBackIcon />
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNext}>
        <ArrowForwardIcon />
      </Button>
    </>
  );
};

export default BrowseModeControls;
