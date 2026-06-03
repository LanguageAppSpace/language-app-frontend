import { CircularProgress, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import MatchingPairsSession from "@/Lessons/MatchingPairs/MatchingPairsSession";
import { useGetLessonByIdQuery } from "@/redux/lessons/lessonsApiSlice";
import { useTranslation } from "react-i18next";

const MatchingPairs = () => {
  const { lessonId } = useParams();
  const { t } = useTranslation("flashcards");

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonByIdQuery(lessonId ?? skipToken);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !lesson) {
    return (
      <Typography color="error">{t("states.somethingWentWrong")}</Typography>
    );
  }

  if (!lesson.phrasePairs.length) {
    return (
      <Typography color="text.secondary">{t("states.noPhrases")}</Typography>
    );
  }

  return <MatchingPairsSession lesson={lesson} />;
};

export default MatchingPairs;
