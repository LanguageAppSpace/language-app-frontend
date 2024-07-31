import { apiSlice } from "@redux/apiSlice";
import { PasswordData, ProfileData } from "@/interface";
import { AuthState } from "@redux/auth/authSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({
        userId,
        data,
      }: {
        userId: AuthState["userId"];
        data: PasswordData;
      }) => ({
        url: `/user/change_password/${userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ data }: { data: ProfileData }) => ({
        url: `user/profile/`,
        method: "PATCH",
        body: data,
      }),
    }),
    deactivateAccount: builder.mutation<void, void>({
      query: () => ({
        url: `user/deactivate-account/`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeactivateAccountMutation,
  useUpdateProfileMutation,
} = userApiSlice;
