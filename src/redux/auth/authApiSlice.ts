import { LoginUser, RegisterUser } from "@/interface";
import { apiSlice } from "@/redux/apiSlice";
import { jwtDecode } from "jwt-decode";

interface LoginResponse {
  access: string;
  refresh: string;
  csrf_token: string;
}

interface DecodedToken {
  user_id: string;
  username: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterUser>({
      query: (user) => ({
        url: "/user/register/",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginUser>({
      query: (user) => ({
        url: "/user/token/",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: LoginResponse) => {
        const { refresh, access } = response;
        const { user_id, username } = jwtDecode<DecodedToken>(access);

        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("username", username);
        return response;
      },
    }),
    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: "user/logout/",
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: "user/password_reset/",
        method: "POST",
        body: { email },
      }),
    }),
    validatePasswordResetToken: builder.query<void, string>({
      query: (token) => ({
        url: "user/password_reset/validate_token/",
        method: "POST",
        body: { token },
      }),
    }),
    confirmPasswordReset: builder.mutation<
      void,
      { token: string; newPassword: string; confirmNewPassword: string }
    >({
      query: ({ token, newPassword, confirmNewPassword }) => ({
        url: "user/password_reset/confirm/",
        method: "POST",
        body: { token, newPassword, confirmNewPassword },
      }),
    }),
    refreshToken: builder.mutation<LoginResponse, { refresh: string }>({
      query: (body) => ({
        url: "user/token/refresh/",
        method: "POST",
        body,
      }),
    }),
    getStreak: builder.query<{ streak: number; last_active: string }, void>({
      query: () => ({
        url: "/user/streak/",
        method: "GET",
      }),
      providesTags: ["Streak"],
    }),
    updateStreak: builder.mutation<
      { streak: number; last_active: string },
      void
    >({
      query: () => ({
        url: "/user/streak/update/",
        method: "POST",
      }),
      invalidatesTags: ["Streak"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useResetPasswordMutation,
  useValidatePasswordResetTokenQuery,
  useConfirmPasswordResetMutation,
  useRefreshTokenMutation,
  useGetStreakQuery,
  useUpdateStreakMutation,
} = authApiSlice;
