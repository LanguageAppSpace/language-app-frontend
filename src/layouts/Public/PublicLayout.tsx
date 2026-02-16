import { Outlet } from "react-router-dom";
import Footer from "@/layouts/Public/Footer";
import Navigation from "@/components/Navigation/Navigation";
import Container from "@mui/material/Container";

const PublicLayout = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default PublicLayout;
