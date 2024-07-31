import { apiSlice } from "@redux/apiSlice";
import { jwtDecode } from "jwt-decode";

interface LoginResponse {
  access: string;
  refresh: string;
  csrf_token: string;
}

interface DecodedToken {
  user_id: string;
  username: string;
  [key: string]: string | number;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/user/register/",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/user/token/",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: LoginResponse) => {
        const { access, refresh } = response;
        const { user_id, username } = jwtDecode<DecodedToken>(access);

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("username", username);
        return response;
      },
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "user/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
} = authApiSlice;
