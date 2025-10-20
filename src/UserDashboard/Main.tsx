import { ROUTE } from "@/config/route.config.ts";
import { useGetLessonsQuery } from "@/redux/lessons/lessonsApiSlice";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LessonCard from "./LessonCard/LessonCard";
import { LessonModeDialog } from "./LessonModeDialog/LessonModeDialog";
import { Lesson } from "@/interface";
import { useState } from "react";

const Main = () => {
  const navigate = useNavigate();
  const { data } = useGetLessonsQuery();
  const [open, setOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleOpenDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpen(true);
  };

  const handleCreateNewLesson = () => {
    navigate(ROUTE.CREATE_LESSON);
  };

  const lessons = data?.results ?? [];

  return (
    <>
      <Box sx={{ width: "100%", p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "black", marginBottom: "15px" }}
              >
                👋 Hello,{" "}
                <Typography variant="h5" component="span" fontWeight="bold">
                  Anna!
                </Typography>
              </Typography>
              <Typography variant="h6" component="span" sx={{ color: "black" }}>
                Keep up the great work and don't let your <b>9</b>-day streak
                slip away!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <img src="/people.jpg" alt="Hello" style={{ maxHeight: "300px" }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            {lessons.length > 0 && (
              <Typography variant="h6" component="span" sx={{ color: "black" }}>
                Review your lessons
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Button
              size="large"
              variant="contained"
              onClick={handleCreateNewLesson}
              sx={{
                mt: 2,
                backgroundColor: "rgb(236, 177, 89)",
                borderRadius: "16px",
              }}
            >
              Create new lesson
            </Button>
          </Grid>
          {lessons.map((lesson) => (
            <Grid item xs={12} md={4} key={lesson.id}>
              <LessonCard
                lesson={lesson}
                onCardClick={() => handleOpenDialog(lesson)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <LessonModeDialog
        open={open}
        onClose={() => setOpen(false)}
        lesson={selectedLesson}
      />
    </>
  );
};

export default Main;
