import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const pillars = [
  {
    title: 'Commercial Cleaning & Building Maintenance',
    description: 'We go beyond cleaning. AClean handles day-to-day janitorial services and ongoing building maintenance so you deal with one trusted partner for your entire facility.',
  },
  {
    title: 'Licensed, Insured & Bonded',
    description: "Full liability coverage, workers' compensation insurance, and bonded. Every job is documented — you always have a paper trail.",
  },
  {
    title: 'Woman-Owned (WBE Certified)',
    description: 'WBE certified and supplier diversity eligible. Partnering with AClean can count toward your diversity procurement goals.',
  },
  {
    title: 'Consistent Crews & Custom Schedules',
    description: 'Same team every visit, after-hours or weekends, single or multi-site — we work around your operations, not the other way around.',
  },
]

export default function WhyAClean() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="about" className="py-16 md:py-24" style={{ backgroundColor: '#F4F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#17A8A8' }}>
              Why AClean
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tight" style={{ color: '#0B2545' }}>
              Cleaning and maintenance, under one roof.
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8" style={{ color: '#64748B' }}>
              AClean Building Solutions is more than a cleaning company. We provide integrated commercial
              cleaning and building maintenance services so your facility stays clean, safe, and fully
              operational — without juggling multiple vendors.
            </p>

            {/* Logo display block */}
            <div
              className="mb-8 rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 px-6 sm:px-8"
              style={{
                backgroundColor: '#ECEFF4',
                border: '1px solid rgba(23,168,168,0.18)',
                boxShadow: '0 4px 24px rgba(11,37,69,0.06)',
              }}
            >
              <img
                src="/logos/AClean_Logo.svg"
                alt="AClean Building Solutions logo"
                style={{ height: 70, width: 'auto', maxWidth: '100%' }}
                loading="lazy"
                width="200"
                height="70"
              />
              <p
                className="mt-4 text-[10px] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-center"
                style={{ color: '#17A8A8' }}
              >
                Cleaning · Maintenance · One Partner
              </p>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center justify-center sm:inline-flex gap-2 w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: '#17A8A8' }}
            >
              Start a Conversation
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 7.5h11M8.5 3.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Right: pillars */}
          <div className="space-y-3 sm:space-y-4">
            {pillars.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 28 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.1 }}
                className="bg-white p-5 sm:p-6 rounded-2xl"
                style={{
                  borderTop: '1px solid rgba(11,37,69,0.07)',
                  borderRight: '1px solid rgba(11,37,69,0.07)',
                  borderBottom: '1px solid rgba(11,37,69,0.07)',
                  borderLeft: `3px solid ${i === 0 ? '#17A8A8' : 'rgba(23,168,168,0.4)'}`,
                }}
              >
                <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: '#0B2545' }}>{title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: '#64748B' }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
