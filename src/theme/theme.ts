import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2434",
      light: "#666666",
      dark: "#333333",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

export default theme;
