import { Outlet } from "react-router-dom";
import Footer from "@/layouts/Public/Footer";
import Navigation from "@/layouts/Public/Navigation";

const PublicLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
