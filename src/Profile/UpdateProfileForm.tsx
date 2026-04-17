import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice.ts";
import { Grid, Typography, Button } from "@mui/material";
import { FormRow, FormInputLabel, FormInput } from "@/components/Form/Form.tsx";
import { useUpdateProfileMutation } from "@/redux/userSettings/userSettingsApiSlice.ts";
import { ProfileData } from "@/interface";
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
    photo: Yup.string()
      .url()
      .required(t("updateProfile.validation.photoRequired")),
    birthday: Yup.date().required(
      t("updateProfile.validation.birthdayRequired")
    ),
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileData>({ resolver: yupResolver(profileSchema) });

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
              error={Boolean(profileErrors.photo)}
              helperText={profileErrors.photo?.message}
              {...registerProfile("photo")}
            />
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
