import { useParams } from "react-router-dom";
import { useGetLessonByIdQuery } from "@/redux/lessons/lessonsApiSlice";
import { Typography, CircularProgress } from "@mui/material";
import { FlashcardPageWrapper } from "@/Lessons/Flashcards/components/FlashcardsLayout";
import WrittenAnswerSession from "@/Lessons/WrittenAnswer/WrittenAnswerSession";

const WrittenAnswer = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

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
        <Typography color="primary">Something went wrong.</Typography>
      </FlashcardPageWrapper>
    );
  }

  if (!lesson.phrasePairs.length) {
    return (
      <FlashcardPageWrapper>
        <Typography color="primary">
          No phrases found in this lesson.
        </Typography>
      </FlashcardPageWrapper>
    );
  }

  return <WrittenAnswerSession key={lesson.id} lesson={lesson} />;
};

export default WrittenAnswer;
