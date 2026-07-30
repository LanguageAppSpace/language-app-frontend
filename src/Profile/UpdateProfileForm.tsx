import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { Grid, Typography, Button, Avatar, Box } from "@mui/material";
import { FormRow, FormInputLabel, FormInput } from "@/components/Form/Form.tsx";
import { useUpdateProfileMutation } from "@/redux/userSettings/userSettingsApiSlice.ts";
import { ProfileData } from "@/interface";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const { t } = useTranslation("profile");
  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t("updateProfile.validation.firstNameRequired")
    ),
    lastName: Yup.string().required(
      t("updateProfile.validation.lastNameRequired")
    ),
    photoUrl: Yup.string().url().optional(),
    photoFile: Yup.mixed<File>().optional(),
    birthday: Yup.date().required(
      t("updateProfile.validation.birthdayRequired")
    ),
  });
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
    watch,
    setValue,
  } = useForm<ProfileData>({
    resolver: yupResolver(profileSchema),
  });

  const photoUrl = watch("photoUrl");
  const photoFile = watch("photoFile");

  const preview = photoFile ? URL.createObjectURL(photoFile) : photoUrl;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("photoFile", file);
    }
  };

  const handleProfileSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      await updateProfile({ data });
      dispatch(
        showNotification({
          message: t("updateProfile.notifications.success"),
          severity: "success",
        })
      );
      resetProfile();
    } catch (error) {
      dispatch(
        showNotification({
          message: t("updateProfile.notifications.error"),
          severity: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmitProfile(handleProfileSubmit)}>
      <Typography variant="h6">{t("updateProfile.title")}</Typography>
      <Grid container direction="column">
        <FormRow>
          <Grid item xs={6}>
            <FormInputLabel shrink={false} htmlFor={"firstName"}>
              <Typography>{t("updateProfile.fields.firstName")}</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              error={Boolean(profileErrors.firstName)}
              helperText={profileErrors.firstName?.message}
              {...registerProfile("firstName")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputLabel shrink={false} htmlFor={"lastName"}>
              <Typography>{t("updateProfile.fields.lastName")}</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              error={Boolean(profileErrors.lastName)}
              helperText={profileErrors.lastName?.message}
              {...registerProfile("lastName")}
            />
          </Grid>
        </FormRow>
        <FormRow>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"photo"}>
              <Typography>{t("updateProfile.fields.photo")}</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              error={Boolean(profileErrors.photoUrl)}
              helperText={profileErrors.photoUrl?.message}
              {...registerProfile("photoUrl")}
            />

            <Box
              sx={{
                border: "2px dashed gray",
                borderRadius: 2,
                p: 3,
                mt: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input
                id="photoUploadInput"
                type="file"
                accept="image/jpeg,image/png"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="photoUploadInput">
                <Typography sx={{ cursor: "pointer", m: 0 }}>
                  {t("updateProfile.validation.selectFile")}
                </Typography>
              </label>
            </Box>

            {preview && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Avatar
                  src={preview}
                  sx={{
                    width: 120,
                    height: 120,
                  }}
                />
              </Box>
            )}
          </Grid>
        </FormRow>
        <FormRow>
          <Grid item xs={12}>
            <FormInputLabel shrink={false} htmlFor={"birthday"}>
              <Typography>{t("updateProfile.fields.birthday")}</Typography>
            </FormInputLabel>
            <FormInput
              fullWidth
              type="date"
              error={Boolean(profileErrors.birthday)}
              helperText={profileErrors.birthday?.message}
              {...registerProfile("birthday", { valueAsDate: true })}
            />
          </Grid>
        </FormRow>
        <Button type="submit" variant="contained" color="primary">
          {t("updateProfile.button")}
        </Button>
      </Grid>
    </form>
  );
};

export default UpdateProfileForm;
