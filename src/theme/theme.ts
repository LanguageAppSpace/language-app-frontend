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
      light: "#FFB31F"
    },
    background: {
      default: "#f5f5f5",
      light: "#f5fcff",
      dark: "#b3b3b3"
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000"
    },
    input: {
      light: "#fdeac1",
      medium: "#fae7cc",
    },
    button: {
      main: "#162434",
      mainHover: "#1e2a32",
      dark: "#111827",
      hover: "#333d47",
      loginHover: "#192a32"
    }
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

export default theme;
