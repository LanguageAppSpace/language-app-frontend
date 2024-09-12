import { Grid, Typography, IconButton, InputLabel } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  VocabularyRowStyled,
  InputField,
  StyledCreateLessonContainer,
  ButtonAddVocabulary,
  ButtonCreateLesson,
} from "@components/CreateLesson/CreateLesson.styled";
import { FormInput, FormInputLabel } from "../Register/Register.styled";
import Footer from "../Footer/Footer";
import { useCreateNewLessonMutation } from "@/redux/lessons/lessonsApiSlice";
import { Lesson } from "@/interface";

const CreateLesson = () => {
  const [createNewLesson] = useCreateNewLessonMutation();

  const { control, register, handleSubmit } = useForm<Lesson>({
    defaultValues: {
      title: "",
      description: "",
      phrasePairs: [{ phraseOne: "", phraseTwo: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phrasePairs",
  });

  const onSubmit = async (data: Lesson) => {
    const lessonData = {
      ...data,
      phrasePairs: data.phrasePairs.filter(
        (pair) => pair.phraseOne.trim() !== "" || pair.phraseTwo.trim() !== ""
      ),
    };

    try {
      await createNewLesson(lessonData).unwrap();
    } catch (error) {
      console.error("Failed to create new lesson: ", error);
    }
  };

  return (
    <StyledCreateLessonContainer>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Create new lesson
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column" xs={6}>
          <Grid item>
            <FormInputLabel htmlFor={"title"}>
              <Typography>Title</Typography>
            </FormInputLabel>
            <FormInput fullWidth variant="outlined" {...register("title")} />
          </Grid>
          <Grid item>
            <FormInputLabel htmlFor={"description"}>
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
              <IconButton aria-label="delete" onClick={() => remove(index)}>
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
            Create lesson
          </ButtonCreateLesson>
        </Footer>
      </form>
    </StyledCreateLessonContainer>
  );
};

export default CreateLesson;
