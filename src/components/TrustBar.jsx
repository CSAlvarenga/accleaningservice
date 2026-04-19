import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const badges = [
  'Licensed & Registered',
  'Woman-Owned Business (WBE)',
  'Serving NJ · NY · PA',
  'Fully Insured',
  'Commercial Focused',
]

export default function TrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-white" style={{ borderBottom: '1px solid rgba(11,37,69,0.07)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{
                color: '#0B2545',
                border: '1px solid rgba(23,168,168,0.35)',
                backgroundColor: 'rgba(23,168,168,0.04)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#17A8A8' }} />
              {badge}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
