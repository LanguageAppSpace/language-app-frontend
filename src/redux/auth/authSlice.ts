import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface AuthState {
  username: string;
  accessToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  username: localStorage.getItem("username") ?? "",
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
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken ?? localStorage.getItem("refreshToken"));
export const selectUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
