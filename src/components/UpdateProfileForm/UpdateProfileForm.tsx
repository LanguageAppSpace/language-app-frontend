import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import { Grid, Typography, Button } from "@mui/material";
import {
  FormRow,
  FormInputLabel,
  FormInput,
} from "@components/UserSettings/UserSettings";
import { useUpdateProfileMutation } from "@/redux/userSettings/userSettingsApiSlice";
import { ProfileData } from "@/interface";

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  photo: Yup.string().url("Invalid URL format").required(),
  birthday: Yup.date().required("Birthday is required"),
});

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();

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
          message: "Profile updated successfully",
          severity: "success",
        })
      );
      resetProfile();
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to update profile",
          severity: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmitProfile(handleProfileSubmit)}>
      <Typography variant="h6">Update Profile</Typography>
      <Grid container direction="column">
        <FormRow>
          <Grid item xs={6}>
            <FormInputLabel shrink={false} htmlFor={"firstName"}>
              <Typography>First Name</Typography>
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
              <Typography>Last Name</Typography>
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
              <Typography>Profile Photo URL</Typography>
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
              <Typography>Birthday</Typography>
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
          Save Profile
        </Button>
      </Grid>
    </form>
  );
};

export default UpdateProfileForm;
