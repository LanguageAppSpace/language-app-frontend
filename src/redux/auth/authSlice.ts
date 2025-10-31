import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface AuthState {
  username: string;
  accessToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  username: "",
  accessToken: null,
  userId: localStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; accessToken: string }>
    ) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.username = "";
      state.accessToken = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUserId = (state: RootState) => state.auth.userId;

export default authSlice.reducer;
