import { styled } from "@mui/material/styles";
import { AppBar, Box, Typography, Button, IconButton } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  flexGrow: 1,
}));

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "rgb(236, 177, 89)",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)(() => ({
  flexGrow: 1,
}));

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "rgb(22, 36, 52)",
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: "rgb(25, 42, 50)",
  },
}));
