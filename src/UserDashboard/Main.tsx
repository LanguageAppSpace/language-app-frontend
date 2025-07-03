import { ROUTE } from "@/config/route.config.ts";
import { useGetLessonsQuery } from "@/redux/lessons/lessonsApiSlice";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const { data } = useGetLessonsQuery();

  const handleCreateNewLesson = () => {
    navigate(ROUTE.CREATE_LESSON);
  };

  const handleLessonClick = (id: string) => {
    navigate(`/edit-lesson/${id}`);
  };

  const lessons = data?.results ?? [];

  return (
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
              Keep up the great work and don't let your <b>9</b>-day streak slip
              away!
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
            <Card
              sx={{
                height: "150px",
                backgroundColor: "rgb(5, 20, 50)",
                color: "white",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <CardContent>
                <Typography variant="h6">{lesson.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
                  {lesson.phrasePairs.length}{" "}
                  {lesson.phrasePairs.length === 1 ? "phrase" : "phrases"}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={lesson.progress}
                    sx={{ color: "red" }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="white"
                    >{`${Math.round(lesson.progress ?? 0)}%`}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
