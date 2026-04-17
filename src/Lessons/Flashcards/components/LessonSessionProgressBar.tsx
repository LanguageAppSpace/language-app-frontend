import { Box, LinearProgress, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LessonSessionProgressProps {
  activeIndex: number;
  totalPhrases: number;
}

export const LessonSessionProgressBar = ({
  activeIndex,
  totalPhrases,
}: LessonSessionProgressProps) => {
  const { t } = useTranslation("flashcards");
  const total = Math.max(totalPhrases, 1);
  const current = Math.min(activeIndex + 1, total);
  const progressValue = (current / total) * 100;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <ProgressBarCounter variant="body2">
        {t("progress.counter", { current, total })}
      </ProgressBarCounter>
      <LinearProgressBar variant="determinate" value={progressValue} />
    </Box>
  );
};

const LinearProgressBar = styled(LinearProgress)(() => ({
  height: 6,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
  },
}));

const ProgressBarCounter = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontWeight: 500,
  color: theme.palette.primary.light,
}));
