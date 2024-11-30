import { SidebarContainer, ContentWrapper, CustomDrawer, DrawerToolbar, DrawerList, CustomListItemButton, CustomListItemText} from '@components/ComponentsOfDashboard/Dashboard/Dashboard.styled.ts'
import { To, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/config/data";
import NavigationDashboard from "@components/ComponentsOfDashboard/NavigationOfDashboard/NavigationOfDashboard";
import Main from "@components/ComponentsOfDashboard/Main/Main";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const drawerWidth = 240;

  const drawer = (
    <>
      <DrawerToolbar/>
        <DrawerList>
            {sidebarLinks.map((item) => (
                <ListItemButton key={item.text} disablePadding>
                    <CustomListItemButton onClick={() => handleNavigation(item.path)}>
                        <CustomListItemText primary={item.text} />
                    </CustomListItemButton>
                </ListItemButton>
            ))}
        </DrawerList>
        </>
  );
  return (
      <SidebarContainer>
          <CssBaseline />
          <NavigationDashboard />
          <ContentWrapper>
              <CustomDrawer variant="permanent" open>
                  {drawer}
              </CustomDrawer>
              <Box
                  component="main"
                  sx={{
                      flexGrow: 1,
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                  }}
              >
                  <Main />
              </Box>
          </ContentWrapper>
      </SidebarContainer>
  );
};

export default Sidebar;
