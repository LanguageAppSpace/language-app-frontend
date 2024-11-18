import { styled } from "@mui/material/styles";
import { Button, Grid, Input } from "@mui/material";
import { alpha, Box } from "@mui/system";

export const VocabularyRowStyled = styled(Grid)(({ theme }) => ({
  margin: "12px 0",
  backgroundColor: `${theme.palette.background.default}`,
  padding: "16px",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const InputField = styled(Input)(({ theme }) => ({
  width: "100%",
  color: `${theme.palette.primary.main}`,
}));

export const StyledCreateLessonContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "90px",
}));

export const ButtonAddVocabulary = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: `${theme.palette.primary.main}`,
  padding: "12px 18px",
  color: `${theme.palette.text.primary}`,
  fontSize: "13px",
}));

export const ButtonCreateLesson = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: `${theme.palette.secondary.main}`,
  padding: "12px 18px",
  color: `${theme.palette.text.primary}`,
  fontSize: "13px",
  width: "auto",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 1),
  },
}));
