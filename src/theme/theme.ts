import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2434",
      light: "#666666",
      dark: "#333333",
    },
    secondary: {
      main: "#ECB159",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
    fontSize: 16,
    h1: {
      fontSize: 34,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 16,
    },
    body1: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
  },
});

export default theme;
