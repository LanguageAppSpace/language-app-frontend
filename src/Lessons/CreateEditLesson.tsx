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
import { Lesson, NewLesson, PhrasePair, Section } from "@/interface";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import LessonForm from "@/Lessons/LessonForm.tsx";
import { ROUTE } from "@/config/route.config";
import { useGetSectionByIdQuery } from "@/redux/sections/sectionsApiSlice";
import FolderImg from "@/assets/images/folder.png";
import { useTranslation } from "react-i18next";

const CreateEditLesson = () => {
  const [createNewLesson] = useCreateNewLessonMutation();
  const [editLesson] = useEditLessonMutation();
  const [editPhraisePair] = useEditPhrasePairMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const lessonId = params.lessonId;
  const sectionIdString = params.sectionId;
  const { t } = useTranslation("lessons");

  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId ?? "", {
    skip: !lessonId,
  });

  const sectionId = sectionIdString ? Number(sectionIdString) : null;
  const { data: section } = useGetSectionByIdQuery(sectionId!, {
    skip: !sectionId,
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
      section: data.section ?? null,
    }).unwrap();
  };

  const getFinalSectionId = (
    sectionIdFromUrl: number | null,
    formSection: number | null
  ) => {
    if (sectionIdFromUrl) return sectionIdFromUrl;
    return formSection ?? null;
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
        const isSectionChanged = lesson?.section !== data.section;

        if (
          newPairs.length > 0 ||
          isTitleChanged ||
          isDescriptionChanged ||
          isSectionChanged
        ) {
          await submitEditLesson(lessonId, data, newPairs);
        }
        dispatch(
          showNotification({
            message: t("notifications.updated"),
            severity: "success",
          })
        );
      } else {
        const finalSectionId = getFinalSectionId(sectionId, data.section);

        await createNewLesson({
          ...data,
          section: finalSectionId,
          phrasePairs: trimmedPhrasePairs(data.phrasePairs),
        }).unwrap();

        dispatch(
          showNotification({
            message: t("notifications.created"),
            severity: "success",
          })
        );
      }
      navigate(ROUTE.DASHBOARD);
    } catch (error) {
      dispatch(
        showNotification({
          message: lessonId
            ? t("notifications.updateFailed")
            : t("notifications.createFailed"),
          severity: "error",
        })
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const getLessonTitle = ({
    lessonId,
    sectionId,
    section,
  }: {
    section: Section | undefined;
    sectionId: Section["id"] | null;
    lessonId: Lesson["id"] | undefined;
  }) => {
    if (lessonId) return t("titles.edit");
    if (sectionId && section) return t("titles.createInSection");
    return t("titles.create");
  };

  const titleText = getLessonTitle({
    lessonId,
    sectionId,
    section,
  });

  return (
    <StyledCreateLessonContainer>
      <Box sx={{ mb: 2 }}>
        <Heading variant="h5"> {titleText}</Heading>
        {sectionId && section && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={FolderImg}
              alt="folder icon"
              style={{ width: 25, height: 25 }}
            />
            <Heading variant="h5">{section.title}</Heading>
          </Box>
        )}
      </Box>
      <LessonForm
        initialValues={{
          title: lesson?.title ?? "",
          description: lesson?.description ?? "",
          phrasePairs: lesson?.phrasePairs ?? [
            { phraseOne: "", phraseTwo: "" },
          ],
          section: lesson?.section ?? sectionId ?? null,
        }}
        onSubmit={onSubmit}
      />
    </StyledCreateLessonContainer>
  );
};
const StyledCreateLessonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
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
