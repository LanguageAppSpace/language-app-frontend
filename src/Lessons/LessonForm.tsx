import React from "react";
import { Grid, IconButton, InputLabel, FormControl } from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  VocabularyRowStyled,
  InputField,
  ButtonAddVocabulary,
  ButtonCreateLesson,
} from "@/Lessons/CreateEditLesson.tsx";
import {
  FormInput,
  FormMenuItem,
  FormSelect,
} from "@/components/Form/Form.tsx";
import LessonFooter from "@/Lessons/LessonFooter.tsx";
import { NewLesson } from "@/interface";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { useDeleteFlashcardMutation } from "@/redux/lessons/lessonsApiSlice";
import { useGetSectionsQuery } from "@/redux/sections/sectionsApiSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
interface LessonFormProps {
  initialValues: NewLesson;
  onSubmit: (data: NewLesson) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ initialValues, onSubmit }) => {
  const [deleteFlashcard] = useDeleteFlashcardMutation();
  const { t } = useTranslation("lessons");

  const { data: sections } = useGetSectionsQuery();
  const { lessonId, sectionId: sectionIdFromUrl } = useParams<{
    lessonId: string;
    sectionId: string;
  }>();

  const dispatch = useDispatch();

  const { control, register, handleSubmit } = useForm<NewLesson>({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray<
    NewLesson,
    "phrasePairs",
    "uid"
  >({
    control,
    name: "phrasePairs",
    keyName: "uid",
  });

  const onDeleteFlashcard = async (
    pairId: number | undefined,
    index: number
  ) => {
    if (lessonId && pairId !== undefined) {
      try {
        await deleteFlashcard({ lessonId, pairId }).unwrap();
      } catch (error: unknown) {
        dispatch(
          showNotification({
            message: t("notifications.flashcardDeleteFailed"),
            severity: "error",
          })
        );
      }
    }
    remove(index);
  };

  const hasSection = sections && sections?.results.length > 0;
  const sectionsList = sections ? sections.results : [];
  const isEditMode = Boolean(lessonId);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction="column" xs={6}>
        <Grid item>
          <FormInput
            fullWidth
            variant="outlined"
            required
            label={t("fields.title")}
            {...register("title")}
          />
        </Grid>
        <Grid item>
          <FormInput
            label={t("fields.description")}
            fullWidth
            required
            variant="outlined"
            {...register("description")}
          />
        </Grid>
        {(!sectionIdFromUrl || isEditMode) && hasSection ? (
          <Grid item>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="sections">{t("fields.section")}</InputLabel>
                  <FormSelect
                    labelId="sections"
                    id="sections"
                    label={t("fields.section")}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    endAdornment={
                      field.value && (
                        <IconButton
                          sx={{
                            mr: 2,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(null);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )
                    }
                  >
                    {sectionsList?.map(({ id, title }) => (
                      <FormMenuItem key={id} value={id}>
                        {title}
                      </FormMenuItem>
                    ))}
                  </FormSelect>
                </FormControl>
              )}
            />
          </Grid>
        ) : null}
      </Grid>
      {fields.map((item, index) => (
        <VocabularyRowStyled key={item.id} container columns={14} spacing={0}>
          <Grid item xs>
            <Controller
              name={`phrasePairs.${index}.phraseOne`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel htmlFor="phraseOne">
                    {t("fields.phrase")}
                  </InputLabel>
                  <InputField
                    id="phraseOne"
                    {...field}
                    placeholder={index === 0 ? t("placeholders.phrase") : ""}
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
                  <InputLabel htmlFor="phraseTwo">
                    {t("fields.translation")}
                  </InputLabel>
                  <InputField
                    id="phraseTwo"
                    {...field}
                    placeholder={
                      index === 0 ? t("placeholders.translation") : ""
                    }
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
          {t("actions.addVocabulary")}
        </ButtonAddVocabulary>
      </Grid>
      <LessonFooter>
        <ButtonCreateLesson
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {lessonId ? t("actions.update") : t("actions.create")}
        </ButtonCreateLesson>
      </LessonFooter>
    </form>
  );
};

export default LessonForm;
