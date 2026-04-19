import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

function scrollToContact(e) {
  e.preventDefault()
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const JanitorialIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 22V12l-4-5h16l-4 5v10" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5 12h14" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M12 7V3M10 3h4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const DeepCleanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const WindowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M2 12h20M12 3v18" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M5 7.5l2-2M5 16.5l2-2" stroke="#17A8A8" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const PlumbingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2-2a1 1 0 000-1.4L18.1 4.3a1 1 0 00-1.4 0l-2 2z" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M13 8L5 16a2 2 0 000 2.8l.2.2a2 2 0 002.8 0l8-8" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 15L19 19.5" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const FacilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 7V5a6 6 0 0112 0v2" stroke="#17A8A8" strokeWidth="1.5" />
    <circle cx="12" cy="14" r="2.5" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M12 11.5V10M12 18v-1.5M9.5 14H8M16 14h-1.5" stroke="#17A8A8" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const ConstructionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="13" width="20" height="9" rx="1" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 13V9M12 13V7M18 13V10" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 9h4M8 7h8M16 10h6" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const FloorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="18" width="20" height="3" rx="1" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 18V14M10 18V12M14 18V14M18 18V10" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 14l4-4 4 2 4-4 4-2" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PressureIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 12h10M14 12l4 4M14 12l4-4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4" cy="12" r="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M19 8v8M21 10v4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const services = [
  {
    Icon: JanitorialIcon,
    title: 'Commercial Janitorial Contracts',
    description: 'Recurring daily, weekly, or custom-frequency cleaning for commercial facilities. Dedicated crews, consistent results.',
  },
  {
    Icon: DeepCleanIcon,
    title: 'Deep Cleaning & Disinfection',
    description: 'Intensive floor-to-ceiling cleaning with EPA-registered disinfectants. Documented applications available.',
  },
  {
    Icon: WindowIcon,
    title: 'Window Cleaning',
    description: 'Interior and exterior window cleaning for commercial properties of all sizes. Streak-free, professional finish.',
  },
  {
    Icon: PlumbingIcon,
    title: 'Plumbing Services',
    description: 'Commercial plumbing maintenance and repairs to keep your facility running smoothly and code-compliant.',
  },
  {
    Icon: FacilityIcon,
    title: 'Facility Maintenance',
    description: 'General upkeep and facilities management so your property stays in top condition year-round.',
  },
  {
    Icon: ConstructionIcon,
    title: 'Post-Construction Cleanup',
    description: 'Rough and final clean after construction or renovation. Remove debris, dust, and residue — ready for occupancy.',
  },
  {
    Icon: FloorIcon,
    title: 'Floor Care & Restoration',
    description: 'Stripping, waxing, buffing, and polishing for hard floors. Deep extraction for carpets. Restore your floors to like-new.',
  },
  {
    Icon: PressureIcon,
    title: 'Pressure Washing',
    description: 'Exterior cleaning for building facades, parking lots, sidewalks, and loading docks. Remove grime, mold, and staining.',
  },
]

function ServiceCard({ Icon, title, description, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
      transition={{ duration: 0.5, delay: 0.05 + (index % 4) * 0.08 + Math.floor(index / 4) * 0.12 }}
      className="group bg-white p-5 sm:p-7 rounded-2xl flex flex-col gap-3 sm:gap-4"
      style={{ border: '1px solid rgba(11,37,69,0.08)', transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease' }}
      whileHover={{
        borderColor: '#17A8A8',
        y: -4,
        boxShadow: '0 8px 32px rgba(23,168,168,0.1)',
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="p-3 rounded-xl w-fit"
        style={{ backgroundColor: 'rgba(23,168,168,0.08)' }}
      >
        <Icon />
      </div>
      <div>
        <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#0B2545' }}>
          {title}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: '#64748B' }}>
          {description}
        </p>
      </div>
      <a
        href="#contact"
        onClick={scrollToContact}
        className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200"
        style={{ color: '#17A8A8' }}
      >
        Get a Quote
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 })

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: '#17A8A8' }}>
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 tracking-tight" style={{ color: '#0B2545' }}>
            What we deliver
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light" style={{ color: '#64748B' }}>
            End-to-end commercial cleaning and facility services — from recurring janitorial contracts
            to specialty one-time cleans.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 hover:brightness-105"
            style={{ backgroundColor: '#17A8A8', boxShadow: '0 4px 20px rgba(23,168,168,0.25)' }}
          >
            Request a Custom Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-3 text-xs" style={{ color: '#94A3B8' }}>We respond within 1 business day</p>
        </motion.div>
      </div>
    </section>
  )
}
