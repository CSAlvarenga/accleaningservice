import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Industries from './components/Industries'
import Services from './components/Services'
import WhyAClean from './components/WhyAClean'
import ServiceArea from './components/ServiceArea'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <TrustBar />
        <Industries />
        <Services />
        <WhyAClean />
        <ServiceArea />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
