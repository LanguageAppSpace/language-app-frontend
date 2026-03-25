import { Box, CircularProgress, Typography, styled } from "@mui/material";

interface ProgressRingProps {
  correct: number;
  wrong: number;
}

const ProgressRing = ({ correct, wrong }: ProgressRingProps) => {
  const total = correct + wrong;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <Container>
      <RingWrapper>
        <RedRing variant="determinate" value={100} size={160} thickness={7} />
        <GreenRing
          variant="determinate"
          value={percentage}
          size={160}
          thickness={7}
        />
        <CenterText>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            {percentage}%
          </Typography>
        </CenterText>
      </RingWrapper>

      <Stats>
        <Typography sx={{ color: "#16A34A", fontWeight: 600, fontSize: 16 }}>
          Known: {correct}
        </Typography>
        <Typography sx={{ color: "#DC2626", fontWeight: 600, fontSize: 16 }}>
          Still learning: {wrong}
        </Typography>
      </Stats>
    </Container>
  );
};

export default ProgressRing;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const RingWrapper = styled(Box)({
  position: "relative",
  display: "inline-flex",
});

const RedRing = styled(CircularProgress)(() => ({
  color: "#EF4444",
  width: 140,
  height: 140,
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
}));

const GreenRing = styled(CircularProgress)(() => ({
  color: "#22C55E",
  position: "absolute",
  left: 0,
  width: 140,
  height: 140,
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
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
