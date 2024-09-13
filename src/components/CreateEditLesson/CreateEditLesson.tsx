import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StyledCreateLessonContainer } from "@components/CreateEditLesson/CreateEditLesson.styled";
import {
  useCreateNewLessonMutation,
  useEditLessonMutation,
  useGetLessonByIdQuery,
} from "@/redux/lessons/lessonsApiSlice";
import { NewLesson, PhrasePairs } from "@/interface";
import { showNotification } from "@/redux/notification/notificationSlice";
import LessonForm from "@components/LessonForm/LessonForm";

const CreateEditLesson = () => {
  const { lessonId } = useParams();
  const [createNewLesson] = useCreateNewLessonMutation();
  const [editLesson] = useEditLessonMutation();
  const dispatch = useDispatch();

  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId || "", {
    skip: !lessonId,
  });

  const trimmedPhrasePairs = (phrasePairs: PhrasePairs[]) =>
    phrasePairs.filter(
      (pair) => pair.phraseOne.trim() !== "" || pair.phraseTwo.trim() !== ""
    );

  const onSubmit = async (data: NewLesson) => {
    try {
      await (lessonId
        ? editLesson({
            ...data,
            id: lessonId,
            phrasePairs: trimmedPhrasePairs(data.phrasePairs),
          })
        : createNewLesson({
            ...data,
            phrasePairs: trimmedPhrasePairs(data.phrasePairs),
          })
      ).unwrap();
    } catch (error) {
      dispatch(
        showNotification({
          message: lessonId ? "Failed to edit lesson" : "Failed to save lesson",
          severity: "error",
        })
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledCreateLessonContainer>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {lessonId ? "Edit Lesson" : "Create New Lesson"}
      </Typography>
      <LessonForm
        initialValues={{
          title: lesson?.title || "",
          description: lesson?.description || "",
          phrasePairs: lesson?.phrasePairs || [
            { phraseOne: "", phraseTwo: "" },
          ],
        }}
        onSubmit={onSubmit}
      />
    </StyledCreateLessonContainer>
  );
};

export default CreateEditLesson;
