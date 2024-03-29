import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null, isLoading: true },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
    setLoadingUser(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  setAccessToken,
  setUser,
  setLoadingUser,
  clearUser,
  clearAccessToken,
} = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoadingUser = (state: RootState) => state.auth.isLoading;
