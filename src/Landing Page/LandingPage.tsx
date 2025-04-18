import About from "@/Landing Page/About.tsx";
import Contact from "@/Landing Page/Contact.tsx";
import Features from "@/Landing Page/Features.tsx";
import DashboardFooter from "@/Landing Page/DashboardFooter.tsx";
import Hero from "@/Landing Page/Hero.tsx";
import Navigation from "@/Landing Page/Navigation.tsx";
import Testimonials from "@/Landing Page/Testimonials.tsx";

const LandingPage = () => {
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

export default LandingPage;
