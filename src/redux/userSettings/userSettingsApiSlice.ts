import { apiSlice } from "@/redux/apiSlice";
import { PasswordData, ProfileData } from "@/interface";
import { AuthState } from "@/redux/auth/authSlice";
import i18n from "@/i18n";

const t = i18n.getFixedT(null, "profile");

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
      queryFn: async (
        { data }: { data: ProfileData },
        _api,
        _extraOptions,
        baseQuery
      ) => {
        const formData = new FormData();

        formData.append("first_name", data.firstName);
        formData.append("last_name", data.lastName);
        formData.append("birthdate", data.birthday.toISOString().split("T")[0]);

        if (data.photoFile) {
          formData.append("photo", data.photoFile);
        } else if (data.photoUrl) {
          try {
            const response = await fetch(data.photoUrl);

            if (!response.ok) {
              throw new Error();
            }

            const blob = await response.blob();

            if (!blob.type.startsWith("image/")) {
              return {
                error: {
                  status: "CUSTOM_ERROR",
                  error: t("updateProfile.notifications.invalidPhotoUrl"),
                },
              };
            }

            const extension =
              blob.type === "image/png"
                ? "png"
                : blob.type === "image/webp"
                  ? "webp"
                  : "jpg";

            const photoFile = new File([blob], `profile-photo.${extension}`, {
              type: blob.type,
            });

            formData.append("photo", photoFile);
          } catch {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: t("updateProfile.notifications.photoDownloadError"),
              },
            };
          }
        }

        return baseQuery({
          url: "user/profile/",
          method: "PATCH",
          body: formData,
        });
      },
      invalidatesTags: ["Profile"],
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
