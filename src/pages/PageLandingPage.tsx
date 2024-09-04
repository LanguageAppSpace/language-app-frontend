import Navigation from "@components/ComponentsOfLandingPage/Navigation/navigation";
import Hero from "@components//ComponentsOfLandingPage/Hero/hero";
import Features from "@components//ComponentsOfLandingPage/Features/features";
import About from "@components//ComponentsOfLandingPage/About/about";
import Testimonials from "@components//ComponentsOfLandingPage/Testimonials/testimonials";
import Contact from "@components//ComponentsOfLandingPage/Contact/contact";
import Footer from "@components//ComponentsOfLandingPage/Footer/footer";

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
