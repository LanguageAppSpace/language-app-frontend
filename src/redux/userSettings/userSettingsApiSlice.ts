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
      }) => {
        const { oldPassword, newPassword, newPasswordConfirm } = data;
        return {
          url: `/user/change_password/${userId}/`,
          method: "PUT",
          body: {
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirm: newPasswordConfirm,
          },
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ data }: { data: ProfileData }) => {
        const { firstName, lastName, photo, birthday } = data;
        return {
          url: `user/profile/`,
          method: "PATCH",
          body: {
            first_name: firstName,
            last_name: lastName,
            photo,
            birthday,
          },
        };
      },
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
  useUpdateProfileMutation,
  useDeactivateAccountMutation,
} = userApiSlice;
