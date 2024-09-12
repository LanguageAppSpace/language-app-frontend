import { styled } from "@mui/system";

export const FooterStyled = styled("footer")(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}`,
  padding: "20px",
  position: "fixed",
  bottom: "0",
  right: "0",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  boxSizing: "border-box",
}));
