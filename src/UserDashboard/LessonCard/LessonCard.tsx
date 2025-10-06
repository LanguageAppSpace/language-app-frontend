import React from "react";
import { ROUTE } from "@/config/route.config.ts";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete, ArrowForward } from "@mui/icons-material";
import { useNavigate, generatePath } from "react-router-dom";
import { Lesson } from "@/interface";

interface LessonCardProps {
  lesson: Lesson;
  onCardClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onCardClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "150px",
        backgroundColor: "rgb(5, 20, 50)",
        color: "white",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{lesson.title}</Typography>
          <Box>
            <IconButton
              color="inherit"
              onClick={() =>
                navigate(
                  generatePath(ROUTE.EDIT_LESSON, {
                    lessonId: lesson.id,
                  })
                )
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
          {lesson.phrasePairs.length}{" "}
          {lesson.phrasePairs.length === 1 ? "phrase" : "phrases"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mt: 2,
              position: "relative",
              width: 40,
              height: 40,
            }}
          >
            {(lesson.progress ?? 0) > 0 && (
              <>
                <CircularProgress
                  variant="determinate"
                  value={lesson.progress ?? 0}
                  sx={{ color: "red" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="white"
                  >{`${Math.round(lesson.progress ?? 0)}%`}</Typography>
                </Box>
              </>
            )}
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              endIcon={<ArrowForward />}
              onClick={onCardClick}
            >
              Learn now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
