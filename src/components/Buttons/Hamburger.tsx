import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import NaviPanel from "@/components/NaviPanel/NaviPanel";

const Hamburger = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <StyledMenuIcon
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </StyledMenuIcon>

      <NaviPanel open={drawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
};

export default Hamburger;

const StyledMenuIcon = styled(IconButton)({
  marginRight: 2,
});
