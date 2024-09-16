import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Features from "@/components/Features/Features";
import DashboardFooter from "@/components/DashboardFooter/DashboardFooter";
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import Testimonials from "@/components/Testimonials/Testimonials";

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
