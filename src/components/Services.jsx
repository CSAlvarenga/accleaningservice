import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

function scrollToContact(e) {
  e.preventDefault()
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const JanitorialIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M8 22V12l-4-5h16l-4 5v10" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5 12h14" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M12 7V3M10 3h4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const DeepCleanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const WindowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M2 12h20M12 3v18" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M5 7.5l2-2M5 16.5l2-2" stroke="#17A8A8" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const PlumbingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2-2a1 1 0 000-1.4L18.1 4.3a1 1 0 00-1.4 0l-2 2z" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M13 8L5 16a2 2 0 000 2.8l.2.2a2 2 0 002.8 0l8-8" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 15L19 19.5" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const FacilityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 7V5a6 6 0 0112 0v2" stroke="#17A8A8" strokeWidth="1.5" />
    <circle cx="12" cy="14" r="2.5" stroke="#17A8A8" strokeWidth="1.5" />
  </svg>
)
const ConstructionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="13" width="20" height="9" rx="1" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 13V9M12 13V7M18 13V10" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 9h4M8 7h8M16 10h6" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const FloorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="18" width="20" height="3" rx="1" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M6 18V14M10 18V12M14 18V14M18 18V10" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 14l4-4 4 2 4-4 4-2" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PressureIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 12h10M14 12l4 4M14 12l4-4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4" cy="12" r="2" stroke="#17A8A8" strokeWidth="1.5" />
    <path d="M19 8v8M21 10v4" stroke="#17A8A8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    Icon: JanitorialIcon,
    title: 'Commercial Janitorial Contracts',
    description: 'Recurring daily, weekly, or custom-frequency cleaning for any facility. Dedicated crews, consistent results.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80',
    duties: [
      'Daily sweeping, mopping & vacuuming of all floor surfaces',
      'Restroom sanitization, disinfection & supply restocking',
      'Trash removal, liner replacement & recycling management',
      'Surface dusting, wipe-downs & high-touch point cleaning',
      'Break room, kitchen & appliance cleaning',
      'Entrance, lobby & elevator maintenance',
      'Scheduled deep-clean rotations included in contract',
      'Dedicated crew assigned to your facility every visit',
    ],
  },
  {
    Icon: DeepCleanIcon,
    title: 'Deep Cleaning & Disinfection',
    description: 'Intensive floor-to-ceiling cleaning with EPA-registered disinfectants. Documented applications available.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80',
    duties: [
      'Hospital-grade EPA-registered disinfectants applied throughout',
      'High-touch surface decontamination (handles, switches, keypads)',
      'Ceiling, wall & vent cleaning top-to-bottom',
      'Grout, tile & hard-to-reach area scrubbing',
      'HIPAA-conscious protocols for medical environments',
      'Documented disinfection logs provided upon request',
      'Electrostatic sprayer application available',
      'Ideal for post-illness, seasonal, or move-in/out scenarios',
    ],
  },
  {
    Icon: WindowIcon,
    title: 'Window Cleaning',
    description: 'Interior and exterior window cleaning for commercial properties of all sizes. Streak-free professional finish.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94ebb8301?w=900&q=80',
    duties: [
      'Interior & exterior glass cleaning',
      'Screen removal, cleaning & reinstallation',
      'Frame, track & sill wiping and detailing',
      'Water-fed pole system for multi-story access',
      'Streak-free squeegee professional finish',
      'Storefront glass & display window cleaning',
      'Skylights & hard-to-reach glass surfaces',
      'Scheduled monthly or quarterly maintenance programs',
    ],
  },
  {
    Icon: PlumbingIcon,
    title: 'Plumbing Services',
    description: 'Commercial plumbing maintenance and repairs to keep your facility running smoothly and code-compliant.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80',
    duties: [
      'Drain clearing, descaling & routine maintenance',
      'Fixture repair & replacement (toilets, faucets, sinks)',
      'Leak detection, pipe repair & water damage prevention',
      'Water heater maintenance & servicing',
      'Commercial restroom plumbing upkeep',
      'Backflow prevention inspection & certification',
      'Emergency plumbing response',
      'Code compliance inspections & documentation',
    ],
  },
  {
    Icon: FacilityIcon,
    title: 'Facility Maintenance',
    description: 'General upkeep and facilities management so your property stays in top condition year-round.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    duties: [
      'Lighting repair, lamp replacement & electrical upkeep',
      'HVAC filter changes & vent maintenance',
      'Door, hardware & lock maintenance',
      'Parking lot, exterior & landscaping upkeep',
      'Minor carpentry, patching & painting touch-ups',
      'Preventive maintenance scheduling & tracking',
      'Multi-trade vendor coordination',
      'Routine walkthroughs & facility condition reporting',
    ],
  },
  {
    Icon: ConstructionIcon,
    title: 'Post-Construction Cleanup',
    description: 'Rough and final clean after construction or renovation. Remove debris, dust, and residue — ready for occupancy.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    duties: [
      'Large debris, scrap & waste hauling and removal',
      'Construction dust deep elimination from all surfaces',
      'Window & glass cleaning of all construction residue',
      'Floor scrubbing, polishing & protective coating',
      'Paint overspray, sticker & adhesive removal',
      'Duct & vent cleaning after construction dust',
      'Rough clean phase + final detail clean phase',
      'Inspection-ready turnover guaranteed',
    ],
  },
  {
    Icon: FloorIcon,
    title: 'Floor Care & Restoration',
    description: 'Strip, wax, buff & polish hard floors. Deep carpet extraction. Restore your floors to like-new condition.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&q=80',
    duties: [
      'Stripping old wax & applying fresh commercial-grade coats',
      'High-speed buffing & burnishing for showroom shine',
      'Carpet hot-water extraction & deep cleaning',
      'Grout line scrubbing & sealing',
      'Marble, terrazzo & natural stone polishing',
      'Anti-slip coating application for safety compliance',
      'Stain treatment & spot removal',
      'Ongoing floor maintenance programs available',
    ],
  },
  {
    Icon: PressureIcon,
    title: 'Pressure Washing',
    description: 'Exterior cleaning for building facades, parking lots, sidewalks, and loading docks. Remove grime, mold, and staining.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    duties: [
      'Building facades, siding & exterior wall washing',
      'Parking lots, driveways & garage floor cleaning',
      'Sidewalks, walkways & public entrance areas',
      'Loading docks & dumpster enclosure sanitizing',
      'Graffiti removal & anti-graffiti coating application',
      'Gutter flush-out & downspout clearing',
      'Pre-treatment for heavy oil, mold & algae staining',
      'Hot & cold water systems for all surface types',
    ],
  },
]

// ─── Tech tools data ──────────────────────────────────────────────────────────
const techTools = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="#17A8A8" strokeWidth="1.4" />
        <path d="M12 6v6l4 2" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI Scheduling & Dispatch',
    description: 'Smart algorithms assign the right crew to the right job at the right time — minimizing travel, maximizing efficiency.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="#17A8A8" strokeWidth="1.4" />
        <path d="M9 7h6M9 11h6M9 15h4" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Digital Inspection Checklists',
    description: 'QR code-based checklists with photo documentation. Every task verified, timestamped, and logged after each visit.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#17A8A8" strokeWidth="1.4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Real-Time GPS Tracking',
    description: 'Live crew location, time-on-site verification, and route optimization. Full visibility into every job in progress.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16v12H4z" stroke="#17A8A8" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 20h8M12 16v4" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 8l2 2 4-4" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Automated Service Reports',
    description: 'Post-service summaries sent automatically after every visit — what was done, who did it, when it was completed.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#17A8A8" strokeWidth="1.4" />
        <path d="M16 3v4M8 3v4M12 11v4M10 13h4" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Smart Supply Management',
    description: 'AI-tracked product usage, EPA compliance logging, and automatic supply reorder alerts keep jobs fully stocked.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#17A8A8" strokeWidth="1.4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Client Portal Access',
    description: 'Online portal for schedules, inspection reports, invoices, and service requests — available 24/7 from any device.',
  },
]

// ─── Modal ────────────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  if (!service) return null
  const { Icon, title, image, duties } = service
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backgroundColor: 'rgba(11,37,69,0.55)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          key="modal"
          className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full" style={{ height: 200 }}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,37,69,0.2) 0%, rgba(11,37,69,0.5) 100%)' }} />
            <div className="absolute bottom-4 left-5 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(23,168,168,0.9)' }}>
                <Icon />
              </div>
              <h3 className="text-white font-black text-lg leading-tight drop-shadow">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="#0B2545" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Duties */}
          <div className="p-5 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: '#17A8A8' }}>
              What's included
            </p>
            <ul className="space-y-2.5 mb-6">
              {duties.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(23,168,168,0.12)' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="#17A8A8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-light leading-relaxed" style={{ color: '#374151' }}>{d}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => { onClose(); setTimeout(() => scrollToContact(e), 150) }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white"
              style={{ backgroundColor: '#17A8A8' }}
            >
              Request a Quote for This Service
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index, isInView, onClick }) {
  const { Icon, title, description, image } = service
  return (
    <motion.button
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
      transition={{ duration: 0.5, delay: 0.05 + (index % 4) * 0.08 + Math.floor(index / 4) * 0.12 }}
      whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(23,168,168,0.13)', transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group bg-white rounded-2xl flex flex-col text-left w-full overflow-hidden cursor-pointer"
      style={{ border: '1px solid rgba(11,37,69,0.08)' }}
    >
      {/* Card image */}
      <div className="relative w-full overflow-hidden" style={{ height: 140 }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(11,37,69,0.45) 100%)' }} />
        <div className="absolute bottom-2.5 left-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(23,168,168,0.9)' }}>
          <Icon />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-sm leading-snug" style={{ color: '#0B2545' }}>{title}</h3>
        <p className="text-xs leading-relaxed font-light flex-1" style={{ color: '#64748B' }}>{description}</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold mt-1 transition-colors duration-200" style={{ color: '#17A8A8' }}>
          View details
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Services() {
  const ref = useRef(null)
  const headingRef = useRef(null)
  const techRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 })
  const techInView = useInView(techRef, { once: true, amount: 0.1 })
  const [activeService, setActiveService] = useState(null)

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
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
            End-to-end cleaning and facility services — tap any card to see exactly what's included.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              isInView={isInView}
              onClick={() => setActiveService(s)}
            />
          ))}
        </div>

        {/* ── Tech / AI Section ── */}
        <motion.div
          ref={techRef}
          initial={{ opacity: 0, y: 32 }}
          animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#0B2545' }}
        >
          <div className="px-6 sm:px-10 pt-10 pb-6 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: '#17A8A8' }}>
              Built for Your Environment
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 text-white tracking-tight">
              AClean runs on modern technology
            </h3>
            <p className="text-sm sm:text-base font-light max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              We don't just clean — we operate with the same tools and systems used by enterprise facility management companies. AI scheduling, digital verification, and real-time reporting come standard.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            {techTools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                className="p-5 sm:p-6 flex flex-col gap-3"
                style={{ backgroundColor: '#0B2545' }}
              >
                <div className="p-2.5 rounded-xl w-fit" style={{ backgroundColor: 'rgba(23,168,168,0.12)' }}>
                  {tool.icon}
                </div>
                <div>
                  <div className="font-bold text-sm mb-1 text-white">{tool.title}</div>
                  <p className="text-xs leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-6 sm:px-10 py-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Powered by industry-leading platforms including AI dispatch, IoT facility sensors, EPA compliance tracking & digital client portals
            </p>
          </div>
        </motion.div>

        {/* CTA */}
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

      {/* Modal */}
      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </section>
  )
}
