import { apiSlice } from "@/redux/apiSlice";
import { PasswordData, ProfileData } from "@/interface";
import { AuthState } from "@/redux/auth/authSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: `user/profile/`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
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
      query: ({ data }: { data: ProfileData }) => ({
        url: `user/profile/`,
        method: "PATCH",
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          photo_url: data.photoUrl,
          birthday: data.birthday,
        },
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
  useGetProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useDeactivateAccountMutation,
} = userApiSlice;
