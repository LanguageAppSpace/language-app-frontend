import React from "react";
import { ROUTE } from "@/config/route.config.ts";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useNavigate, generatePath } from "react-router-dom";
import { Lesson } from "@/interface";
import { styled } from "@mui/material/styles";

interface LessonCardProps {
  lesson: Lesson;
  onCardClick: () => void;
  onDeleteClick: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onCardClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();

  const phrasesCount = lesson.phrasePairs.length;
  const progressValue = lesson.progress ?? 0;

  return (
    <LessonBox onClick={onCardClick}>
      <LessonInfo>
        <LessonTitle>
          <Typography variant="h6" color="primary">
            {lesson.title}
          </Typography>
          <Typography variant="body2" color="primary.light">
            {lesson.description}
          </Typography>
        </LessonTitle>
        <StyledChip
          label={`${phrasesCount} ${phrasesCount === 1 ? "phrase" : "phrases"}`}
          color="default"
          size="small"
          variant="outlined"
        />
      </LessonInfo>
      <LessonActions>
        <LessonProgress>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </LessonProgress>
        <ActionButtons>
          <IconButton
            onClick={() =>
              navigate(
                generatePath(ROUTE.EDIT_LESSON, {
                  lessonId: lesson.id,
                  sectionId: String(lesson.section),
                })
              )
            }
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.(lesson);
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </ActionButtons>
      </LessonActions>
    </LessonBox>
  );
};

export default LessonCard;

const LessonBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.background.dark}`,
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  transition: "box-shadow 0.3s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow: theme.shadows[1],
    transform: "translateY(-2px)",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(0),
  },
}));

const LessonInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  alignItems: "flex-start",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 600,
  padding: theme.spacing(0.5, 1),
}));

const LessonTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: theme.spacing(1),
  },
}));

const LessonActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(6),
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const LessonProgress = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "150px",
  },
}));
