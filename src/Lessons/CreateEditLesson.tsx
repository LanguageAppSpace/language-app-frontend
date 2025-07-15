import {
  Typography,
  Button,
  Grid,
  Input,
  styled,
  Box,
  alpha,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useCreateNewLessonMutation,
  useEditLessonMutation,
  useEditPhrasePairMutation,
  useGetLessonByIdQuery,
} from "@/redux/lessons/lessonsApiSlice.ts";
import { NewLesson, PhrasePair } from "@/interface";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import LessonForm from "@/Lessons/LessonForm.tsx";
import { ROUTE } from "@/config/route.config";

const CreateEditLesson = () => {
  const { lessonId } = useParams();
  const [createNewLesson] = useCreateNewLessonMutation();
  const [editLesson] = useEditLessonMutation();
  const [editPhraisePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId ?? "", {
    skip: !lessonId,
  });

  const trimmedPhrasePairs = (phrasePairs: PhrasePair[]) =>
    phrasePairs.filter(
      (pair) => pair.phraseOne.trim() !== "" || pair.phraseTwo.trim() !== ""
    );

  const splitNewAndUpdatedPairs = (
    original: PhrasePair[],
    updated: PhrasePair[]
  ) => {
    const newPairs = updated.filter((pair) => !pair.id);

    const updatedPairs = updated.filter((pair) => {
      const orig = original.find((p) => p.id === pair.id);
      return (
        orig &&
        (orig.phraseOne !== pair.phraseOne || orig.phraseTwo !== pair.phraseTwo)
      );
    });

    return { newPairs, updatedPairs };
  };

  const updateModifiedPairs = async (
    updatedPairs: PhrasePair[],
    lessonId: string
  ) => {
    return Promise.all(
      updatedPairs.map((pair) =>
        editPhraisePair({
          lessonId,
          pairId: pair.id!,
          data: pair,
        })
      )
    );
  };

  const submitEditLesson = async (
    lessonId: string,
    data: NewLesson,
    newPairs: PhrasePair[]
  ) => {
    await editLesson({
      id: lessonId,
      title: data.title,
      description: data.description,
      phrasePairs: newPairs,
    }).unwrap();
  };

  const onSubmit = async (data: NewLesson) => {
    const { newPairs, updatedPairs } = splitNewAndUpdatedPairs(
      lesson?.phrasePairs ?? [],
      trimmedPhrasePairs(data.phrasePairs)
    );

    try {
      if (lessonId) {
        await updateModifiedPairs(updatedPairs, lessonId);

        const isTitleChanged = lesson?.title !== data.title;
        const isDescriptionChanged = lesson?.description !== data.description;

        if (newPairs.length > 0 || isTitleChanged || isDescriptionChanged) {
          await submitEditLesson(lessonId, data, newPairs);
        }

        dispatch(
          showNotification({
            message: "Lesson updated successfully",
            severity: "success",
          })
        );
      } else {
        await createNewLesson({
          ...data,
          phrasePairs: trimmedPhrasePairs(data.phrasePairs),
        }).unwrap();

        dispatch(
          showNotification({
            message: "Lesson created successfully",
            severity: "success",
          })
        );
      }
      navigate(ROUTE.DASHBOARD);
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
      <Heading variant="h5" sx={{ marginBottom: 2 }}>
        {lessonId ? "Edit Lesson" : "Create New Lesson"}
      </Heading>
      <LessonForm
        initialValues={{
          title: lesson?.title ?? "",
          description: lesson?.description ?? "",
          phrasePairs: lesson?.phrasePairs ?? [
            { phraseOne: "", phraseTwo: "" },
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

export const VocabularyRowStyled = styled(Grid)(({ theme }) => ({
  margin: "12px 0",
  backgroundColor: theme.palette.background.default,
  padding: "16px",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const InputField = styled(Input)(({ theme }) => ({
  width: "100%",
  color: theme.palette.primary.main,
}));

export const ButtonAddVocabulary = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.primary.main,
  padding: "12px 18px",
  color: theme.palette.text.primary,
  fontSize: "13px",
}));

export const ButtonCreateLesson = styled(Button)(({ theme }) => ({
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

const Heading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default CreateEditLesson;
