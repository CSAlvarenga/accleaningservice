import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useCountUp } from '../hooks/useCountUp'

const EXPO = [0.16, 1, 0.3, 1]

const HEADLINE_WORDS = ['Your', 'facility', 'deserves', 'a']
const HEADLINE_ACCENT = ['higher', 'standard.']

const PARTICLES = [
  { x: '8%',  y: '18%', s: 5, dur: 9,  d: 0,   dx: 12,  dy: 8  },
  { x: '15%', y: '72%', s: 4, dur: 11, d: 1.2, dx: -8,  dy: 14 },
  { x: '22%', y: '38%', s: 6, dur: 8,  d: 0.5, dx: 10,  dy: -6 },
  { x: '32%', y: '85%', s: 3, dur: 13, d: 2,   dx: -6,  dy: 10 },
  { x: '5%',  y: '55%', s: 7, dur: 10, d: 1.7, dx: 8,   dy: 12 },
  { x: '45%', y: '12%', s: 4, dur: 12, d: 0.8, dx: 14,  dy: 6  },
  { x: '48%', y: '78%', s: 5, dur: 9,  d: 3,   dx: -10, dy: 8  },
  { x: '60%', y: '25%', s: 3, dur: 14, d: 1.3, dx: 6,   dy: -8 },
  { x: '72%', y: '68%', s: 6, dur: 8,  d: 0.4, dx: -8,  dy: 12 },
  { x: '82%', y: '15%', s: 4, dur: 11, d: 2.2, dx: 10,  dy: 8  },
  { x: '88%', y: '52%', s: 5, dur: 10, d: 1,   dx: -6,  dy: -10},
  { x: '78%', y: '88%', s: 3, dur: 13, d: 0.7, dx: 8,   dy: 6  },
  { x: '38%', y: '48%', s: 8, dur: 15, d: 1.5, dx: -12, dy: 10 },
  { x: '55%', y: '62%', s: 4, dur: 9,  d: 2.8, dx: 10,  dy: -8 },
  { x: '25%', y: '10%', s: 5, dur: 12, d: 0.3, dx: -8,  dy: 6  },
]

function Particle({ x, y, s, dur, d, dx, dy, reduced }) {
  if (reduced) return null
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: x, top: y, width: s, height: s, backgroundColor: '#17A8A8', opacity: 0.12 }}
      animate={{ x: [0, dx, 0], y: [0, dy, 0] }}
      transition={{ duration: dur, delay: d, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function StatItem({ value, prefix = '', suffix = '', label }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center px-3 py-5 sm:px-4 sm:py-6 min-w-0">
      <div className="text-[26px] sm:text-[28px] md:text-4xl font-black tabular-nums" style={{ color: '#0B2545' }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs font-semibold tracking-[0.06em] sm:tracking-[0.15em] mt-1.5 uppercase leading-tight" style={{ color: '#17A8A8' }}>
        {label}
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ isLoaded }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const rawImageY = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden bg-white"
      style={{ minHeight: 'max(100vh, 100svh)' }}
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-15%', left: '-8%',
          width: '55%', height: '65%',
          background: 'radial-gradient(ellipse at center, rgba(23,168,168,0.07) 0%, transparent 70%)',
          filter: 'blur(52px)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: '50%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(11,37,69,0.05) 0%, transparent 70%)',
          filter: 'blur(64px)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '28%',
          width: '28%', height: '38%',
          background: 'radial-gradient(ellipse at center, rgba(23,168,168,0.04) 0%, transparent 70%)',
          filter: 'blur(44px)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => <Particle key={i} {...p} reduced={reduced} />)}
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* Left: copy */}
          <motion.div variants={containerVariants} initial="hidden" animate={isLoaded ? "visible" : "hidden"} className="min-w-0">
            <motion.div variants={itemVariants} className="mb-4">
              <div
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.08em] sm:tracking-[0.18em] uppercase"
                style={{ color: '#17A8A8' }}
              >
                <span className="w-5 h-px flex-shrink-0" style={{ backgroundColor: '#17A8A8' }} />
                <span>Commercial Cleaning &amp; Maintenance</span>
                <span className="opacity-60 hidden xs:inline">·</span>
                <span>NJ · NY · PA</span>
              </div>
            </motion.div>

            {/* Per-word headline reveal — motion.h1 with transparent variant holds stagger position */}
            <motion.h1
              variants={{ hidden: {}, visible: {} }}
              className="font-black leading-[1.08] mb-5 tracking-tight text-[1.85rem] sm:text-[2.6rem] lg:text-[3.5rem]"
              style={{ color: '#0B2545' }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={reduced
                    ? { duration: 0 }
                    : { duration: 0.55, ease: EXPO, delay: 0.15 + i * 0.07 }
                  }
                  style={{ display: 'inline-block', marginRight: '0.28em' }}
                >
                  {word}
                </motion.span>
              ))}
              <span style={{ color: '#17A8A8' }}>
                {HEADLINE_ACCENT.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={reduced
                      ? { duration: 0 }
                      : { duration: 0.55, ease: EXPO, delay: 0.15 + (HEADLINE_WORDS.length + i) * 0.07 }
                    }
                    style={{
                      display: 'inline-block',
                      marginRight: i < HEADLINE_ACCENT.length - 1 ? '0.28em' : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-light"
              style={{ color: '#64748B' }}
            >
              AClean Building Solutions delivers professional commercial cleaning and building
              maintenance for medical offices, daycares, office buildings, and retail spaces
              across the tri-state area.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center justify-center px-7 py-4 sm:py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white w-full sm:w-auto"
                style={{ backgroundColor: '#17A8A8', minHeight: 52 }}
                animate={reduced ? {} : {
                  boxShadow: ['0 0 0 0 rgba(23,168,168,0.4)', '0 0 0 12px rgba(23,168,168,0)', '0 0 0 0 rgba(23,168,168,0)'],
                }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 2.5 }}
                whileHover={{ scale: 1.03, filter: 'brightness(1.08)', boxShadow: '0 4px 20px rgba(23,168,168,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Request a Quote
              </motion.a>

              <motion.a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center justify-center px-7 py-4 sm:py-3.5 rounded-xl font-semibold text-sm tracking-wide w-full sm:w-auto transition-all duration-200"
                style={{ color: '#0B2545', border: '1.5px solid rgba(11,37,69,0.2)', backgroundColor: 'transparent', minHeight: 52 }}
                whileHover={{ borderColor: '#17A8A8', color: '#17A8A8', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: image (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: '1px solid rgba(23,168,168,0.2)',
                boxShadow: '0 24px 80px rgba(11,37,69,0.12), 0 4px 24px rgba(23,168,168,0.08)',
              }}
            >
              {/* Parallax image — scaled 1.2× so edges never show during Y movement */}
              <motion.img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
                alt="Professional commercial office building maintained by AClean Building Solutions"
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                width="1200"
                height="900"
                style={{
                  y: reduced ? 0 : rawImageY,
                  scale: 1.2,
                  transformOrigin: 'top center',
                }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(140deg, rgba(11,37,69,0.08) 0%, transparent 60%)' }} />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-5 left-5 px-4 py-3 rounded-xl bg-white"
                style={{ boxShadow: '0 4px 20px rgba(11,37,69,0.12)', border: '1px solid rgba(23,168,168,0.15)' }}
                animate={reduced ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              >
                <div className="font-bold text-sm" style={{ color: '#0B2545' }}>Fully Insured</div>
                <div className="text-xs mt-0.5" style={{ color: '#17A8A8' }}>Licensed · WBE Certified</div>
              </motion.div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl" style={{ backgroundColor: 'rgba(23,168,168,0.1)' }} />
            <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl" style={{ backgroundColor: 'rgba(26,95,168,0.08)' }} />
          </motion.div>

          {/* Mobile image — below text, no parallax */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="block lg:hidden w-full"
          >
            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{
                aspectRatio: '16/9',
                maxHeight: 240,
                border: '1px solid rgba(23,168,168,0.18)',
                boxShadow: '0 8px 32px rgba(11,37,69,0.1)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75"
                alt="Professional commercial office building maintained by AClean Building Solutions"
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                width="800"
                height="450"
              />
              <div
                className="absolute bottom-3 left-3 px-3 py-2 rounded-lg bg-white text-xs font-bold"
                style={{ color: '#0B2545', boxShadow: '0 2px 10px rgba(11,37,69,0.1)', border: '1px solid rgba(23,168,168,0.15)' }}
              >
                Fully Insured · Licensed · WBE Certified
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar — 2×2 on mobile, 4-across on md+ */}
      <div
        className="w-full"
        style={{
          backgroundColor: '#F4F7FB',
          borderTop: '1px solid rgba(11,37,69,0.07)',
          borderBottom: '1px solid rgba(11,37,69,0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderColor: 'rgba(11,37,69,0.08)' }}
          >
            {[
              { value: 7,   suffix: '+', label: 'Years Experience' },
              { value: 200, suffix: '+', label: 'Clients Served'   },
              { value: 3,   suffix: '',  label: 'States Covered'   },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  borderRight: i === 1 ? undefined : '1px solid rgba(11,37,69,0.08)',
                  borderBottom: i < 2 ? '1px solid rgba(11,37,69,0.08)' : undefined,
                }}
                className="md:border-r md:border-b-0"
              >
                <StatItem {...s} />
              </div>
            ))}
            <div
              className="text-center px-3 py-5 sm:px-4 sm:py-6"
              style={{ borderLeft: '1px solid rgba(11,37,69,0.08)' }}
            >
              <div className="text-[26px] sm:text-[28px] md:text-4xl font-black" style={{ color: '#0B2545' }}>100%</div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-[0.06em] sm:tracking-[0.15em] mt-1.5 uppercase leading-tight" style={{ color: '#17A8A8' }}>
                Fully Insured
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
