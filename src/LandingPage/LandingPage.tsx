import About from "@/LandingPage/About.tsx";
import Contact from "@/LandingPage/Contact.tsx";
import Features from "@/LandingPage/Features.tsx";
import Footer from "@/LandingPage/Footer";
import Hero from "@/LandingPage/Hero.tsx";
import Navigation from "@/LandingPage/Navigation.tsx";
import Testimonials from "@/LandingPage/Testimonials.tsx";

const LandingPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
