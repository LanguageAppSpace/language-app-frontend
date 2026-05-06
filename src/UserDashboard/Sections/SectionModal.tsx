import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import {
  useCreateSectionMutation,
  useUpdateSectionMutation,
} from "@/redux/sections/sectionsApiSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/redux/notification/notificationSlice";
import { Section } from "@/interface";
import { SECTION_COLORS } from "@/constants/sectionColors";
import { FormInput } from "@/components/Form/Form";
import { useTranslation } from "react-i18next";

interface SectionModal {
  open: boolean;
  onClose: () => void;
  editingSection?: Section | null;
}

interface FormData {
  title: string;
  description?: string;
  color: string;
}

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  color: Yup.string().required("Color is required"),
});

const SectionModal: React.FC<SectionModal> = ({
  open,
  onClose,
  editingSection,
}) => {
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();

  const dispatch = useDispatch();

  const { t } = useTranslation("sections");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(
      editingSection
        ? { ...editingSection }
        : { title: "", description: "", color: "" }
    );
  }, [editingSection, open, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (editingSection) {
        await updateSection({ id: editingSection.id, ...data }).unwrap();
        dispatch(
          showNotification({
            message: t("notifications.updated"),
            severity: "success",
          })
        );
      } else {
        await createSection(data).unwrap();
        dispatch(
          showNotification({
            message: t("notifications.created"),
            severity: "success",
          })
        );
      }
      onClose();
    } catch (error) {
      dispatch(
        showNotification({
          message: editingSection
            ? t("notifications.updateError")
            : t("notifications.createError"),
          severity: "error",
        })
      );
    }
  };

  const selectedColor = watch("color");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: 2,
        },
      }}
    >
      <DialogTitle color="primary">
        {editingSection ? t("form.title.edit") : t("form.title.create")}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormInput
            id="title"
            label={t("form.fields.title")}
            variant="outlined"
            {...register("title")}
            required
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <FormInput
            id="description"
            label={t("form.fields.description")}
            variant="outlined"
            {...register("description")}
            helperText={errors.description?.message}
            error={!!errors.description}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Typography color="primary">{t("form.fields.color")}</Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {SECTION_COLORS.map((color) => (
                <ColorCircle
                  key={color}
                  onClick={() =>
                    setValue("color", color, { shouldValidate: true })
                  }
                  $color={color}
                  $selected={selectedColor === color}
                />
              ))}
              {errors.color && (
                <Typography color="error" variant="caption">
                  {errors.color.message}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" color="primary">
            {t("actions.save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SectionModal;

const ColorCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$color" && prop !== "$selected",
})<{ $color: string; $selected: boolean }>(({ $color, $selected, theme }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: $color,
  border: "2px solid",
  borderColor: $selected
    ? theme.palette.primary.light
    : theme.palette.background.dark,
  cursor: "pointer",
  transition: "0.2s",

  "&:hover": {
    transform: "scale(1.08)",
  },
}));
