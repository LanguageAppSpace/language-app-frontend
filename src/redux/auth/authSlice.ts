import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

export interface AuthState {
  username: string;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  userId: string | null;
}
const initialState: AuthState = {
  username: "",
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: null,
  isLoading: true,
  userId: localStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { username, accessToken, refreshToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.username = "";
      state.accessToken = null;
      localStorage.clear();
    },
    setLoadingUser(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut, setLoadingUser } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.username;
export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoadingUser = (state: RootState) => state.auth.isLoading;
