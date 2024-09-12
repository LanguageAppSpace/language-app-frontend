import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
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
      <Footer />
    </>
  );
};

export default PageLandingPage;
