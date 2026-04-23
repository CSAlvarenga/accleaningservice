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

function WaveDivider() {
  return (
    <div
      style={{ backgroundColor: '#ffffff', lineHeight: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        overflow="visible"
        style={{ display: 'block', width: '100%', height: 80 }}
      >
        {/* Back wave — 40% opacity, drifts right */}
        <path
          className="wave-back"
          d="M-150,46 C120,18 360,70 600,46 C840,18 1080,68 1320,46 C1400,30 1530,56 1590,46 L1590,80 L-150,80 Z"
          fill="#0B2545"
          fillOpacity="0.4"
        />
        {/* Front wave — full opacity, drifts left */}
        <path
          className="wave-front"
          d="M-150,62 C200,40 420,80 660,62 C900,42 1120,80 1360,62 C1440,54 1530,68 1590,62 L1590,80 L-150,80 Z"
          fill="#0B2545"
        />
      </svg>
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/17324305494"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: '#25D366' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.76.48 3.44 1.32 4.88L2 22l5.28-1.36A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.92 13.8c-.2.56-1.16 1.08-1.6 1.12-.44.04-.84.2-2.84-.6-2.4-.96-3.96-3.4-4.08-3.56-.12-.16-1-1.33-1-2.56s.64-1.8.88-2.04c.24-.24.52-.28.68-.28h.48c.16 0 .36-.04.56.44.2.48.68 1.68.76 1.8.08.12.12.28.04.44-.08.16-.12.24-.24.4-.12.16-.24.28-.36.44-.12.12-.24.28-.12.52.12.24.56.92 1.2 1.48.84.72 1.52.96 1.76 1.08.24.12.36.08.52-.08.16-.16.64-.76.8-1 .16-.24.32-.2.52-.12.2.08 1.36.64 1.6.76.24.12.4.16.44.24.08.24.08.8-.12 1.36z" fill="white"/>
      </svg>
      <span className="text-white font-semibold text-sm whitespace-nowrap">Chat on WhatsApp</span>
    </a>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <WhatsAppButton />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <TrustBar />
        <Industries />
        <Services />
        <WhyAClean />
        <ServiceArea />
        <Contact />
        <WaveDivider />
        <Footer />
      </div>
    </>
  )
}
