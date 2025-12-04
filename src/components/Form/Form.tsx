import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root ": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
}));

export const FormInputLabel = styled(InputLabel)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  paddingBottom: "7px",
}));

export const FormRow = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "12px 0",
  gap: theme.spacing(2),
}));

export const FormSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "& .MuiSelect-select": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
}));

export const FormMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: `${theme.palette.background.dark}`,
  },
}));
