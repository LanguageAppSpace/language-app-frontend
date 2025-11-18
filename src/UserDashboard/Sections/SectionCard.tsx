import { Section } from "@/interface";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface SectionCard {
  section: Section;
  onEdit?: (section: Section) => void;
  onDelete?: (section: Section) => void;
}

const SectionCard: React.FC<SectionCard> = ({ section, onEdit, onDelete }) => {
  const { title, description } = section;

  return (
    <SectionCardWrapper $bg={section.color}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
        <IconsRow>
          <IconButton size="small" onClick={() => onEdit?.(section)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete?.(section)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </IconsRow>
      </Box>
      <Typography variant="body2" color="primary.light">
        {description}
      </Typography>
    </SectionCardWrapper>
  );
};

export default SectionCard;

const SectionCardWrapper = styled(Box)<{ $bg: string }>`
  background: ${(props) => props.$bg};
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.25s ease;
  &:hover {
    box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.12);
    filter: brightness(1.03);
  }
`;

const IconsRow = styled(Box)`
  display: flex;
  gap: 6px;
  button svg {
    font-size: 20px;
  }
`;
