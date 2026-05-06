import { useParams } from "react-router-dom";
import { useGetLessonByIdQuery } from "@/redux/lessons/lessonsApiSlice";
import { Typography, CircularProgress } from "@mui/material";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
import QuizSession from "@/Lessons/Quiz/QuizSession";
import { useTranslation } from "react-i18next";

const Quiz = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useTranslation("flashcards");

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonByIdQuery(lessonId!, {
    skip: !lessonId,
  });

  if (isLoading) {
    return (
      <FlashcardPageWrapper>
        <CircularProgress />
      </FlashcardPageWrapper>
    );
  }

  if (isError || !lesson) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">
          {t("states.somethingWentWrong")}
        </Typography>
      </FlashcardPageWrapper>
    );
  }

  if (!lesson.phrasePairs.length) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">{t("states.noPhrases")}</Typography>
      </FlashcardPageWrapper>
    );
  }

  return <QuizSession key={lesson.id} lesson={lesson} />;
};

export default Quiz;
