import { useState } from "react";
import { Box, CircularProgress, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import theme from "@/theme/theme";
import {
  FlashcardIconButton,
  ReviewControlsContainer,
} from "@/Lessons/Flashcards/FlashcardsReview/ReviewModeControls";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PhrasePair } from "@/interface";
import { useGetReviewsBySectionIdQuery } from "@/redux/sections/sectionsApiSlice";
import Flashcard from "@/Lessons/Flashcards/components/Flashcard";
import {
  FlashcardContainer,
  FlashcardPageWrapper,
  FlashcardStage,
} from "@/Lessons/Flashcards/components/FlashcardsLayout";
import { LessonSessionProgressBar } from "@/Lessons/Flashcards/components/LessonSessionProgressBar";

const SectionFlashcardsReview = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const {
    currentData: phrasePairs,
    isFetching,
    isError,
  } = useGetReviewsBySectionIdQuery(Number(sectionId), {
    refetchOnMountOrArgChange: true,
  });
  const { t } = useTranslation("flashcards");

  if (isFetching)
    return (
      <FlashcardPageWrapper>
        <CircularProgress />
      </FlashcardPageWrapper>
    );

  if (isError || !phrasePairs) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">
          {t("states.somethingWentWrong")}
        </Typography>
      </FlashcardPageWrapper>
    );
  }

  if (!phrasePairs.length) {
    return (
      <FlashcardPageWrapper>
        <ReviewStateContainer>
          <Typography color="primary">{t("sectionReview.empty")}</Typography>
        </ReviewStateContainer>
      </FlashcardPageWrapper>
    );
  }

  return <SectionReviewCards key={sectionId} phrasePairs={phrasePairs} />;
};

const SectionReviewCards = ({ phrasePairs }: { phrasePairs: PhrasePair[] }) => {
  const [{ index, flipped }, setCard] = useState({ index: 0, flipped: false });
  const [isFinished, setIsFinished] = useState(false);
  const { t } = useTranslation("flashcards");
  const pair = phrasePairs[index];
  const flipCard = () => setCard({ index, flipped: !flipped });
  const isLastCard = index === phrasePairs.length - 1;
  const handleReviewAnswer = () => {
    if (isLastCard) {
      setIsFinished(true);
    } else {
      setCard({ index: index + 1, flipped: false });
    }
  };

  if (isFinished) {
    return (
      <FlashcardPageWrapper>
        <Typography role="status" color="primary">
          {t("sectionReview.endOfSet")}
        </Typography>
      </FlashcardPageWrapper>
    );
  }

  return (
    <FlashcardPageWrapper>
      <FlashcardContainer>
        <Typography variant="h4" color="primary">
          {t("sectionReview.title")}
        </Typography>
        <LessonSessionProgressBar
          activeIndex={index}
          totalPhrases={phrasePairs.length}
        />
        <ReviewCardStage>
          <Flashcard
            phraseOne={pair.phraseOne}
            phraseTwo={pair.phraseTwo}
            flipped={flipped}
            onFlip={flipCard}
          />
        </ReviewCardStage>
        <ReviewControlsContainer>
          <FlashcardIconButton
            bgColor={theme.palette.review.incorrect}
            textColor={theme.palette.text.primary}
            onClick={handleReviewAnswer}
            disableRipple
          >
            <CloseIcon fontSize="medium" />
          </FlashcardIconButton>
          <FlashcardIconButton
            bgColor={theme.palette.review.correct}
            textColor={theme.palette.text.primary}
            onClick={handleReviewAnswer}
            disableRipple
          >
            <CheckIcon fontSize="medium" />
          </FlashcardIconButton>
        </ReviewControlsContainer>
      </FlashcardContainer>
    </FlashcardPageWrapper>
  );
};

export default SectionFlashcardsReview;

const ReviewStateContainer = styled(Box)({
  textAlign: "center",
});

const ReviewCardStage = styled(FlashcardStage)(() => ({
  perspective: 1000,
}));
