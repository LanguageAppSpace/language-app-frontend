import { Box, styled } from "@mui/material";

const SummaryCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: 420,
  width: "100%",
}));

export default SummaryCard;
