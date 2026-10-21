import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { ButtonBase, styled, Typography } from "@mui/material";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface ReviewBannerProps {
  count: number;
  onReview: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StyledReviewBanner = styled(ButtonBase)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
  width: "100%",
  minWidth: 0,
  minHeight: 40,
  padding: theme.spacing(0.75, 1.25),
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.input.light,
  color: theme.palette.primary.main,
  textAlign: "left",
  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

const ReviewBanner = ({ count, onReview }: ReviewBannerProps) => {
  const { t } = useTranslation("lessons");
  if (count <= 0) return null;
  const message = t("reviewBanner.message", { count });

  return (
    <StyledReviewBanner type="button" onClick={onReview}>
      <ReplayRoundedIcon
        sx={{ color: "secondary.main", flexShrink: 0, fontSize: 18 }}
      />
      <Typography
        variant="body2"
        sx={{
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {message}
      </Typography>
      <ArrowForwardRoundedIcon
        sx={{ ml: "auto", color: "button.main", flexShrink: 0, fontSize: 16 }}
      />
    </StyledReviewBanner>
  );
};

export default ReviewBanner;
