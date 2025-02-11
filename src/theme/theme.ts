import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";
import deviceSizes from "@/cssConsts";

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
  },
  breakpoints: {
    values: deviceSizes,
  },
});

export default theme;
