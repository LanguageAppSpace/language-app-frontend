import { styled } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";

export const Tile = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  textAlign: "center",
  padding: theme.spacing(3, 0),
  backgroundColor: theme.palette.background.paper,
  border: "1px solid transparent",
  cursor: "pointer",
  transition:
    "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default,
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}));

export const TileIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 40,
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(1),
}));

export const TileName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 800,
}));

export const TileDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
