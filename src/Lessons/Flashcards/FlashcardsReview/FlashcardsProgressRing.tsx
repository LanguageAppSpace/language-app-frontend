import { Box, CircularProgress, Typography, styled } from "@mui/material";

interface ReviewProgressRingProps {
  correct: number;
  wrong: number;
}

const ReviewProgressRing = ({ correct, wrong }: ReviewProgressRingProps) => {
  const total = correct + wrong;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <Container>
      <RingWrapper>
        <RedRing
          variant="determinate"
          value={100}
          size={160}
          thickness={7}
        />
        <GreenRing
          variant="determinate"
          value={percentage}
          size={160}
          thickness={7}
        />
        <CenterText>
          <Typography variant="h6">
            {percentage}%
          </Typography>
        </CenterText>
      </RingWrapper>

      <Stats>
        <Typography sx={{ color: "#16A34A", fontWeight: 500 }}>
          Known: {correct}
        </Typography>
        <Typography sx={{ color: "#DC2626", fontWeight: 500 }}>
          Still learning: {wrong}
        </Typography>
      </Stats>
    </Container>
  );
};

export default ReviewProgressRing;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const RingWrapper = styled(Box)({
  position: "relative",
  display: "inline-flex",
});

const RedRing = styled(CircularProgress)(({}) => ({
  color: "#F87171",
  width: 140,
  height: 140,
}));

const GreenRing = styled(CircularProgress)(({}) => ({
  color: "#22C55E",
  position: "absolute",
  left: 0,
  width: 140,
  height: 140,
}));

const CenterText = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Stats = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
