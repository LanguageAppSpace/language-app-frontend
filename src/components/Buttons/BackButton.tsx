import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <BackButtonDiv>
      <StyledIconButton onClick={() => navigate(-1)} aria-label="back">
        <ArrowBack />
      </StyledIconButton>
    </BackButtonDiv>
  );
};

export default BackButton;

export const BackButtonDiv = styled(Box)({
  width: "100%",
  height: "auto",
  margin: "8px 0",
  justifyContent: "flex-start",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  marginLeft: 16,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.action.hover,
  },
  transition: theme.transitions.create(["box-shadow", "transform"], {
    duration: theme.transitions.duration.short,
  }),
}));
