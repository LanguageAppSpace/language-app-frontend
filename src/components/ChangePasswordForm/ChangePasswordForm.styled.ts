import { styled } from "@mui/material/styles";
import { Grid, Button, Typography } from "@mui/material";

export const FormRow = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
}));

export const FormInputLabel = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
}));

export const FormInput = styled("input")(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    "&:focus": {
        borderColor: theme.palette.primary.main,
        outline: "none",
    },
    "&[type='password']": {
        fontFamily: "monospace",
    },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    fontWeight: "bold",
}));
