import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@redux/store";
import Notification from "@components/Notification/Notification";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <Notification />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
