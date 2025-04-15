import About from "@components/Pages/About.tsx";
import Contact from "@components/Pages/Contact.tsx";
import Features from "@components/Pages/Features.tsx";
import DashboardFooter from "@components/Layouts/Dashboard/DashboardFooter.tsx";
import Hero from "@components/Pages/Hero.tsx";
import Navigation from "@components/Navigation/Navigation.tsx";
import Testimonials from "@components/Pages/Testimonials.tsx";

const PageLandingPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Contact />
      <DashboardFooter />
    </>
  );
};

export default PageLandingPage;
