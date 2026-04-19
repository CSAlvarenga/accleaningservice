import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 1.5L2.25 4.5v4.5C2.25 13.05 5.13 17.1 9 18c3.87-.9 6.75-4.95 6.75-9V4.5L9 1.5z"
      stroke="#17A8A8"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M6 9l2 2 4-4"
      stroke="#17A8A8"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const credentials = [
  { label: 'Licensed', detail: 'State of New Jersey' },
  { label: 'Insured', detail: '$1M Liability Coverage' },
  { label: 'Workers Comp Active', detail: 'PWC1170635 · ARI Insurance' },
  { label: 'Woman-Owned', detail: 'WBE Certified' },
]

export default function CredentialsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#071A33',
        borderTop: '1px solid rgba(23,168,168,0.12)',
        borderBottom: '1px solid rgba(23,168,168,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.p
          className="text-center text-xs font-semibold tracking-[0.22em] uppercase mb-7"
          style={{ color: '#17A8A8' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Verified Credentials
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.12 + i * 0.08 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full"
              style={{
                backgroundColor: 'rgba(23,168,168,0.08)',
                border: '1px solid rgba(23,168,168,0.2)',
              }}
            >
              <ShieldIcon />
              <div>
                <div className="text-white text-sm font-semibold leading-tight">{cred.label}</div>
                <div className="text-white/45 text-xs leading-tight mt-0.5">{cred.detail}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
