import { Typography, Button, Grid, Input, styled } from "@mui/material";
import { Box, alpha } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useCreateNewLessonMutation,
  useEditLessonMutation,
  useGetLessonByIdQuery,
} from "@/redux/lessons/lessonsApiSlice";
import { NewLesson, PhrasePair } from "@/interface";
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

  const trimmedPhrasePairs = (phrasePairs: PhrasePair[]) =>
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
    <Typography variant="h5" sx={{marginBottom: 2}}>
      {lessonId ? "Edit Lesson" : "Create New Lesson"}
    </Typography>
    <LessonForm
    initialValues={{
      title: lesson?.title || "",
      description: lesson?.description || "",
      phrasePairs: lesson?.phrasePairs || [
        {phraseOne: "", phraseTwo: ""},
      ],
    }}
    onSubmit={onSubmit}
    />
  </StyledCreateLessonContainer>
  );
};
const StyledCreateLessonContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "90px",
}));

export const VocabularyRowStyled = styled(Grid)(({theme}) => ({
  margin: "12px 0",
  backgroundColor: theme.palette.background.default,
  padding: "16px",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const InputField = styled(Input)(({theme}) => ({
  width: "100%",
  color: theme.palette.primary.main,
}));

export const ButtonAddVocabulary = styled(Button)(({theme}) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.primary.main,
  padding: "12px 18px",
  color: theme.palette.text.primary,
  fontSize: "13px",
}));

export const ButtonCreateLesson = styled(Button)(({theme}) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.secondary.main,
  padding: "12px 18px",
  color: theme.palette.text.primary,
  fontSize: "13px",
  width: "auto",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 1),
  },
}));

export default CreateEditLesson;