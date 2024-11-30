import { styled } from "@mui/material/styles";
import { Box, Toolbar, Drawer, List, ListItemButton, ListItemText } from "@mui/material";


export const SidebarContainer = styled(Box)(()=> ({
    display: flex,
    flexDirection: column,
}));

export const ContentWrapper = styled(Box)(() => ({
    display: "flex",
    flexGrow: 1,
    height: "100%",
}));

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: 240,
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const DrawerToolbar = styled(Toolbar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
}));

export const DrawerList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    width: 240,
    height: "100%",
}));

export const CustomListItemButton = styled(ListItemButton)(() => ({
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}));

export const CustomListItemText = styled(ListItemText)(() => ({
    color: "white",
    fontWeight: "bold",
}));
