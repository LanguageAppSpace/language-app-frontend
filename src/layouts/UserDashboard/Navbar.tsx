import Logo from "@/components/Logo/Logo";
import { Box, Toolbar, Container, Avatar, AppBar } from "@mui/material";
import Hamburger from "@/components/Buttons/Hamburger";
import { useGetProfileQuery } from "@/redux/userSettings/userSettingsApiSlice";
import { useEffect } from "react";

const drawerWidth = 240;
const getPhotoUrl = (photo?: string) => {
  if (!photo) return undefined;

  if (/^https?:\/\//i.test(photo)) {
    return photo;
  }

  const apiUrl = import.meta.env.VITE_API;

  try {
    const apiOrigin = new URL(apiUrl).origin;
    return new URL(photo, `${apiOrigin}/`).toString();
  } catch {
    return `${apiUrl.replace(/\/$/, "")}/${photo.replace(/^\//, "")}`;
  }
};

const Navbar = () => {
  const { data: profile, refetch, fulfilledTimeStamp } = useGetProfileQuery();

  useEffect(() => {
    const handleProfileUpdate = () => void refetch();
    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [refetch]);

  const basePhotoSrc = getPhotoUrl(profile?.photo);
  const photoSrc = basePhotoSrc
    ? `${basePhotoSrc}${basePhotoSrc.includes("?") ? "&" : "?"}v=${
        fulfilledTimeStamp ?? 0
      }`
    : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgb(236, 177, 89)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: 64,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Hamburger />
            <Logo />
            <Box sx={{ flexGrow: 0, ml: "auto" }}>
              <Avatar
                key={photoSrc}
                src={photoSrc}
                alt={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
