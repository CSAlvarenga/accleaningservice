import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const MedicalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="15" rx="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M12 10v7M9 13.5h6" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6V4.5a4 4 0 018 0V6" stroke="#17A8A8" strokeWidth="1.5" />
  </svg>
)
const SchoolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 12L12 5l9 7" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="5" y="12" width="14" height="10" stroke="#17A8A8" strokeWidth="1.5" />
    <rect x="9" y="17" width="6" height="5" stroke="#17A8A8" strokeWidth="1.5" />
  </svg>
)
const OfficeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="13" height="20" stroke="#17A8A8" strokeWidth="1.5" />
    <rect x="15" y="9" width="7" height="14" stroke="#17A8A8" strokeWidth="1.5" />
    <rect x="5" y="7" width="3" height="3" stroke="#17A8A8" strokeWidth="1" />
    <rect x="10" y="7" width="3" height="3" stroke="#17A8A8" strokeWidth="1" />
    <rect x="5" y="13" width="3" height="3" stroke="#17A8A8" strokeWidth="1" />
    <rect x="10" y="13" width="3" height="3" stroke="#17A8A8" strokeWidth="1" />
    <rect x="17" y="13" width="2" height="3" stroke="#17A8A8" strokeWidth="1" />
  </svg>
)
const RetailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="11" width="20" height="11" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M2 11l3-8h14l3 8" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="9" y="16" width="6" height="6" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 11c0 1.66-1.34 3-3 3M12 11c0 1.66-1.34 3-3 3M12 11c0 1.66 1.34 3 3 3M18 11c0 1.66-1.34 3-3 3" stroke="#17A8A8" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

const industries = [
  {
    Icon: MedicalIcon,
    title: 'Medical Offices & Clinics',
    description: 'HIPAA-conscious protocols for exam rooms, waiting areas, and high-touch surfaces. Infection control is our baseline.',
  },
  {
    Icon: SchoolIcon,
    title: 'Daycares & Schools',
    description: 'Child-safe products and sanitization practices that meet state facility standards for educational environments.',
  },
  {
    Icon: OfficeIcon,
    title: 'Office Buildings',
    description: 'Professional janitorial services for lobbies, conference rooms, restrooms, and common areas on your schedule.',
  },
  {
    Icon: RetailIcon,
    title: 'Retail & Commercial',
    description: 'Maintain a clean, welcoming environment for customers with daily, weekly, or nightly cleaning contracts.',
  },
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="industries" className="py-16 md:py-24" style={{ backgroundColor: '#F4F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#17A8A8' }}>
            Who We Serve
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 tracking-tight" style={{ color: '#0B2545' }}>
            Built for your environment
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light" style={{ color: '#64748B' }}>
            Every facility has unique requirements. We specialize in environments where cleanliness
            is non-negotiable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {industries.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.97 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-white p-5 sm:p-7 rounded-2xl"
              style={{ border: '1px solid rgba(11,37,69,0.08)', transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease' }}
              whileHover={{
                borderColor: '#17A8A8',
                y: -4,
                boxShadow: '0 8px 32px rgba(23,168,168,0.1)',
                transition: { duration: 0.2 },
              }}
            >
              <div className="mb-4 p-2.5 rounded-xl w-fit" style={{ backgroundColor: 'rgba(23,168,168,0.08)' }}>
                <Icon />
              </div>
              <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#0B2545' }}>
                {title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: '#64748B' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
