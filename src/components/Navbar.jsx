import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#industries', label: 'Industries' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function scrollTo(href) {
  if (href === '#hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
          borderBottom: scrolled ? '1px solid rgba(11,37,69,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(11,37,69,0.06)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center flex-shrink-0"
            >
              <img
                src="/logos/AClean_Logo.svg"
                alt="AClean Building Solutions"
                style={{ height: 46, width: 'auto' }}
                className="md:hidden"
              />
              <img
                src="/logos/AClean_Logo.svg"
                alt="AClean Building Solutions"
                style={{ height: 62, width: 'auto' }}
                className="hidden md:block"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="relative text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{ color: '#0B2545' }}
                  onMouseEnter={(e) => (e.target.style.color = '#17A8A8')}
                  onMouseLeave={(e) => (e.target.style.color = '#0B2545')}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-white transition-all duration-200"
              style={{ backgroundColor: '#17A8A8' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0E9090')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#17A8A8')}
            >
              Get a Quote
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 p-2.5 rounded-lg"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ backgroundColor: mobileOpen ? 'rgba(11,37,69,0.06)' : 'transparent' }}
            >
              <motion.span
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: '#0B2545' }}
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: '#0B2545' }}
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: '#0B2545' }}
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[60] flex flex-col"
            style={{ backgroundColor: '#0B2545' }}
          >
            {/* Overlay header */}
            <div className="flex items-center justify-between px-5 h-16 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <img
                src="/logos/AClean_Logo dark background.svg"
                alt="AClean Building Solutions"
                style={{ height: 34, width: 'auto' }}
              />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto">
              <nav className="flex flex-col mb-10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                    className="flex items-center font-bold text-white text-2xl py-4"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      minHeight: 64,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.07 + 0.05 }}
                className="flex items-center justify-center w-full rounded-xl font-semibold text-base text-white"
                style={{ backgroundColor: '#17A8A8', minHeight: 56 }}
              >
                Get a Quote
              </motion.a>

              {/* Bottom info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center text-xs font-light"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Commercial Cleaning &amp; Building Maintenance · NJ · NY · PA
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
