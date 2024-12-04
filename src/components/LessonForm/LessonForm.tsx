import React from "react";
import { Grid, Typography, IconButton, InputLabel } from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  VocabularyRowStyled,
  InputField,
  ButtonAddVocabulary,
  ButtonCreateLesson,
} from "@components/CreateEditLesson/CreateEditLesson.styled";
import {
  FormInput,
  FormInputLabel,
} from "@components/Register/Register.styled";
import { useDeleteFlashcardMutation } from "@/redux/lessons/lessonsApiSlice";
import Footer from "@components/Footer/Footer";
import { NewLesson } from "@/interface";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";

interface LessonFormProps {
  initialValues: NewLesson;
  onSubmit: (data: NewLesson) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ initialValues, onSubmit }) => {
  const [deleteFlashcard] = useDeleteFlashcardMutation();
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const { control, register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phrasePairs",
    keyName: "uid",
  });

  const onDeleteFlashcard = async (
    pairId: number | undefined,
    index: number
  ) => {
    if (lessonId && pairId) {
      try {
        await deleteFlashcard({
          lessonId: lessonId,
          pairId,
        }).unwrap();
      } catch (error) {
        dispatch(
          showNotification({
            message: "Error deleting flashcard",
            severity: "error",
          })
        );
      }
    }
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction="column" xs={6}>
        <Grid item>
          <FormInputLabel htmlFor="title">
            <Typography>Title</Typography>
          </FormInputLabel>
          <FormInput fullWidth variant="outlined" {...register("title")} />
        </Grid>
        <Grid item>
          <FormInputLabel htmlFor="description">
            <Typography>Description</Typography>
          </FormInputLabel>
          <FormInput
            fullWidth
            variant="outlined"
            {...register("description")}
          />
        </Grid>
      </Grid>
      {fields.map((item, index) => (
        <VocabularyRowStyled key={item.id} container columns={14} spacing={0}>
          <Grid item xs>
            <Controller
              name={`phrasePairs.${index}.phraseOne`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel htmlFor="phraseOne">Phrase</InputLabel>
                  <InputField
                    id="phraseOne"
                    {...field}
                    placeholder={index === 0 ? "Cześć, co słychać?" : ""}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs>
            <Controller
              name={`phrasePairs.${index}.phraseTwo`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel htmlFor="phraseTwo">Translation</InputLabel>
                  <InputField
                    id="phraseTwo"
                    {...field}
                    placeholder={index === 0 ? "Hello, how are you?" : ""}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs="auto">
            <IconButton
              aria-label="delete"
              onClick={() => onDeleteFlashcard(item.id, index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </VocabularyRowStyled>
      ))}
      <Grid container justifyContent="center">
        <ButtonAddVocabulary
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => append({ phraseOne: "", phraseTwo: "" })}
        >
          Add new vocabulary
        </ButtonAddVocabulary>
      </Grid>
      <Footer>
        <ButtonCreateLesson
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {lessonId ? "Update Lesson" : "Create Lesson"}
        </ButtonCreateLesson>
      </Footer>
    </form>
  );
};

export default LessonForm;
