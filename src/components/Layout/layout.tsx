import Navigation from '../Navigation/navigation'
import Hero from '../Hero/hero'
import Features from '../Features/features'
import About from '../About/about'
import Testimonials from '../Testimonials/testimonials'
import Contact from '../Contact/contact'
import Footer from '../Footer/footer'

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default Layout