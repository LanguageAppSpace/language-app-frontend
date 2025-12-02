import { Section } from "@/interface";
import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import folderImg from "@/assets/images/folder.png";
import { Link } from "react-router-dom";
interface SectionCard {
  section: Section;
  onEdit?: (section: Section) => void;
  onDelete?: (section: Section) => void;
}

const SectionCard: React.FC<SectionCard> = ({ section, onEdit, onDelete }) => {
  const { title, description, lessons } = section;

  return (
    <SectionCardWrapper $border={section.color}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={folderImg} alt="folder" style={{ maxHeight: "25px" }} />
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
        </Box>
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
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="primary">
          {lessons.length} {lessons.length > 1 ? "lessons" : "lesson"}
        </Typography>
        <Link to={`/section/${section.id}/create-lesson`}>
          <Button variant="contained">+ Add Lesson</Button>
        </Link>
      </Box>
    </SectionCardWrapper>
  );
};

export default SectionCard;

const SectionCardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$border",
})<{ $border: string }>`
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.25s ease;
  border-color: ${(props) => props.$border};
  border-width: 2px;
  border-style: solid;
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
