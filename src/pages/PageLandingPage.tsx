import Navigation from '../components/ComponentsOfLandingPage/About/Navigation/navigation'
import Hero from '../components/ComponentsOfLandingPage/About/Hero/hero'
import Features from '../components/ComponentsOfLandingPage/About/Features/features'
import About from '../components/ComponentsOfLandingPage/About/about'
import Testimonials from '../components/ComponentsOfLandingPage/About/Testimonials/testimonials'
import Contact from '../components/ComponentsOfLandingPage/About/Contact/contact'
import Footer from '../components/ComponentsOfLandingPage/About/Footer/footer'

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
  )
} 

export default PageLandingPage
