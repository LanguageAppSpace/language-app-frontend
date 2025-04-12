import About from "@/Features/Landing/About.tsx";
import Contact from "@/Features/Landing/Contact.tsx";
import Features from "@/Features/Landing/Features.tsx";
import DashboardFooter from "@/Layouts/Dashboard/DashboardFooter.tsx";
import Hero from "@/Features/Landing/Hero.tsx";
import Navigation from "@/Layouts/Navigation/Navigation.tsx";
import Testimonials from "@/Features/Landing/Testimonials.tsx";

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
