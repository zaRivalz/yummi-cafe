import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Menu from '@/components/sections/Menu'
import Gallery from '@/components/sections/Gallery'
import Instagram from '@/components/sections/Instagram'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Instagram />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
