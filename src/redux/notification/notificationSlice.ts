import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

interface NotificationState {
  isOpen: boolean;
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

interface ShowNotificationPayload {
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

const initialState: NotificationState = {
  isOpen: false,
  severity: "success",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationPayload>
    ) => {
      state.isOpen = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    hideNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
