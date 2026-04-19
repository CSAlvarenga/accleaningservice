import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const states = [
  {
    abbr: 'NJ',
    name: 'New Jersey',
    note: 'Our home base — serving all of NJ from South River',
    primary: true,
  },
  {
    abbr: 'NY',
    name: 'New York',
    note: 'Commercial facilities throughout the greater NY metro area',
    primary: false,
  },
  {
    abbr: 'PA',
    name: 'Pennsylvania',
    note: 'Eastern Pennsylvania commercial and industrial facilities',
    primary: false,
  },
]

export default function ServiceArea() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="service-area" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#17A8A8' }}>
            Where We Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 tracking-tight" style={{ color: '#0B2545' }}>
            Serving the Tri-State Area
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light" style={{ color: '#64748B' }}>
            We serve commercial facilities across NJ, NY, and PA — from single-location contracts
            to multi-site portfolios.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {states.map(({ abbr, name, note, primary }, i) => (
            <motion.div
              key={abbr}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
              className="group relative rounded-2xl p-6 sm:p-8 text-center overflow-hidden"
              style={{
                backgroundColor: primary ? '#0B2545' : 'white',
                border: primary ? 'none' : '1px solid rgba(11,37,69,0.08)',
                transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
              }}
              whileHover={{
                y: -4,
                boxShadow: primary
                  ? '0 12px 40px rgba(11,37,69,0.3)'
                  : '0 8px 32px rgba(23,168,168,0.1)',
                borderColor: primary ? undefined : '#17A8A8',
                transition: { duration: 0.2 },
              }}
            >
              {primary && (
                <div
                  className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-bl-full"
                  style={{ backgroundColor: 'rgba(23,168,168,0.12)' }}
                />
              )}

              <div
                className="text-5xl sm:text-6xl font-black mb-2 sm:mb-3 tracking-tight"
                style={{ color: primary ? '#17A8A8' : '#0B2545' }}
              >
                {abbr}
              </div>
              <div
                className="text-base sm:text-lg font-bold mb-2 sm:mb-3"
                style={{ color: primary ? 'white' : '#0B2545' }}
              >
                {name}
              </div>
              <p
                className="text-xs sm:text-sm font-light leading-relaxed"
                style={{ color: primary ? 'rgba(255,255,255,0.6)' : '#64748B' }}
              >
                {note}
              </p>

              {primary && (
                <div
                  className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(23,168,168,0.15)', color: '#17A8A8' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#17A8A8' }} />
                  Home Base
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl p-6 sm:p-10 text-center"
          style={{ backgroundColor: '#F4F7FB', border: '1px solid rgba(23,168,168,0.12)' }}
        >
          <div className="text-xl sm:text-2xl font-black mb-2 tracking-tight" style={{ color: '#0B2545' }}>
            Multi-site contracts welcome
          </div>
          <p className="text-sm sm:text-base font-light mb-6 max-w-md mx-auto" style={{ color: '#64748B' }}>
            Manage multiple locations with one point of contact. Consistent standards, consolidated
            billing, dedicated account management.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white w-full sm:w-auto"
            style={{ backgroundColor: '#17A8A8' }}
          >
            Discuss Your Needs
          </a>
        </motion.div>
      </div>
    </section>
  )
}
