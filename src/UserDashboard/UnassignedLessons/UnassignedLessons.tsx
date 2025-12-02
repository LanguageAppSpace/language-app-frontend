import { Typography, Box, Button, Grid } from "@mui/material";
import { Lesson } from "@/interface";
import { styled } from "@mui/material/styles";

interface UnassignedLessonsProps {
  lessons: Lesson[];
}

const UnassignedLessons = ({ lessons }: UnassignedLessonsProps) => {
  if (!lessons.length) return null;

  return (
    <Grid item xs={12} mt={4}>
      <Typography variant="h6" sx={{ marginBottom: 2 }} color="primary">
        Unassigned Lessons
      </Typography>
      {lessons.map(({ id, title, description }) => (
        <UnassignedLessonBox key={id}>
          <Box>
            <Typography variant="body1" fontWeight={600} color="primary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Button variant="contained" size="small">
            Assign
          </Button>
        </UnassignedLessonBox>
      ))}
    </Grid>
  );
};

export default UnassignedLessons;

export const UnassignedLessonBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.background.dark}`,
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
