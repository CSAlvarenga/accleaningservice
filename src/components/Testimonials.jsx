import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import reviewsData from '../data/reviews.json'

const EXPO = [0.16, 1, 0.3, 1]
const INTERVAL = 5000

// ─── Micro components ─────────────────────────────────────────────────────────

function StarIcon({ filled, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#FBBF24' : 'none'}
        stroke="#FBBF24"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(n => (
        <StarIcon key={n} filled={n <= Math.round(rating)} size={size} />
      ))}
    </div>
  )
}

function GoogleLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const AVATAR_PALETTE = ['#17A8A8', '#0B2545', '#2D6A4F', '#E76F51', '#457B9D', '#6A4C93', '#1A936F']

function avatarColor(name) {
  let h = 0
  for (const c of name) h = ((h << 5) - h) + c.charCodeAt(0)
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length]
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase()
}

// ─── Review card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }) {
  const [imgErr, setImgErr] = useState(false)
  const bg = avatarColor(review.author_name)

  return (
    <div
      className="flex flex-col bg-white rounded-2xl p-5 sm:p-6 h-full overflow-hidden"
      style={{ border: '1px solid rgba(11,37,69,0.08)', boxShadow: '0 2px 16px rgba(11,37,69,0.06)' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0">
          {review.profile_photo_url && !imgErr ? (
            <img src={review.profile_photo_url} alt={review.author_name}
              onError={() => setImgErr(true)} referrerPolicy="no-referrer"
              width="40" height="40" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: bg }}>
              {initials(review.author_name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm truncate" style={{ color: '#0B2545' }}>{review.author_name}</div>
          <div className="text-xs mt-0.5 font-light" style={{ color: '#94A3B8' }}>{review.relative_time_description}</div>
        </div>
        <div className="flex-shrink-0 mt-0.5"><GoogleLogo size={18} /></div>
      </div>

      <StarRating rating={review.rating} size={14} />

      {review.text ? (
        <p className="text-sm leading-relaxed mt-3 flex-1 line-clamp-3 overflow-hidden" style={{ color: '#475569' }}>
          {review.text}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      {review.author_url && (
        <a href={review.author_url} target="_blank" rel="noopener noreferrer"
          className="mt-4 text-xs font-medium transition-colors duration-200 w-fit"
          style={{ color: '#17A8A8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0E9090')}
          onMouseLeave={e => (e.currentTarget.style.color = '#17A8A8')}>
          View on Google →
        </a>
      )}
    </div>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

function ChevronIcon({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReviewsCarousel({ reviews }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const n = reviews.length

  const advance = useCallback((d) => {
    setDirection(d)
    setCurrent(c => (c + d + n) % n)
  }, [n])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => advance(1), INTERVAL)
    return () => clearInterval(t)
  }, [paused, advance])

  const r = (offset) => reviews[(current + offset + n) % n]

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:  (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <div
      className="mb-10 md:mb-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

        {/* Card 1 — always visible */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div key={`a-${current}`} custom={direction}
            variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: EXPO }}
            className="h-full"
          >
            <ReviewCard review={r(0)} />
          </motion.div>
        </AnimatePresence>

        {/* Card 2 — md+ */}
        <div className="hidden md:block h-full">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div key={`b-${current}`} custom={direction}
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: EXPO, delay: 0.05 }}
              className="h-full"
            >
              <ReviewCard review={r(1)} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card 3 — lg+ */}
        <div className="hidden lg:block h-full">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div key={`c-${current}`} custom={direction}
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: EXPO, delay: 0.1 }}
              className="h-full"
            >
              <ReviewCard review={r(2)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Prev */}
        <button
          onClick={() => advance(-1)}
          aria-label="Previous review"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer"
          style={{ border: '1.5px solid rgba(11,37,69,0.15)', color: '#0B2545' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#17A8A8'; e.currentTarget.style.color = '#17A8A8' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(11,37,69,0.15)'; e.currentTarget.style.color = '#0B2545' }}
        >
          <ChevronIcon dir="left" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              aria-label={`Go to review ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                backgroundColor: i === current ? '#17A8A8' : 'rgba(11,37,69,0.18)',
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => advance(1)}
          aria-label="Next review"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer"
          style={{ border: '1.5px solid rgba(11,37,69,0.15)', color: '#0B2545' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#17A8A8'; e.currentTarget.style.color = '#17A8A8' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(11,37,69,0.15)'; e.currentTarget.style.color = '#0B2545' }}
        >
          <ChevronIcon dir="right" />
        </button>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Testimonials() {
  const {
    reviews = [],
    rating,
    total_reviews,
    maps_url,
    reviews_url,
    write_review_url,
    place_name,
    address,
  } = reviewsData

  const displayRating = rating ?? 5.0
  const writeUrl = write_review_url || reviews_url

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#17A8A8' }}>
            Google Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight" style={{ color: '#0B2545' }}>
            What our clients say
          </h2>
          <p className="text-sm sm:text-base leading-relaxed font-light max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Real feedback from businesses across New Jersey, New York &amp; Pennsylvania.
          </p>

          {total_reviews > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <span className="text-3xl font-black" style={{ color: '#0B2545' }}>{displayRating.toFixed(1)}</span>
              <StarRating rating={Math.round(displayRating)} size={22} />
              <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                Based on{' '}
                <a href={reviews_url} target="_blank" rel="noopener noreferrer"
                  className="font-bold transition-colors duration-200"
                  style={{ color: '#0B2545' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#17A8A8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#0B2545')}>
                  {total_reviews} reviews
                </a>
              </span>
              <GoogleLogo size={22} />
            </div>
          )}
        </div>

        {/* Carousel */}
        {reviews.length > 0 && <ReviewsCarousel reviews={reviews} />}

        {/* Find us on Google CTA */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0B2545 0%, #163660 100%)', border: '1px solid rgba(23,168,168,0.18)', boxShadow: '0 8px 40px rgba(11,37,69,0.18)' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 md:p-10">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'rgba(23,168,168,0.15)', border: '1px solid rgba(23,168,168,0.25)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#17A8A8" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" stroke="#17A8A8" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <div className="text-base font-bold text-white leading-snug mb-0.5">{place_name || 'AClean Building Solutions'}</div>
                <div className="text-sm font-light mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{address || 'NJ · NY · PA'}</div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={Math.round(displayRating)} size={14} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {total_reviews > 0 ? `${displayRating.toFixed(1)} · ${total_reviews} reviews on Google` : 'Find us on Google'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <GoogleLogo size={13} />
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17L4 12" stroke="#34A853" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Google Verified Business
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <a href={maps_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: '#17A8A8', minHeight: 48, minWidth: 152 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />
                  <circle cx="12" cy="9" r="2.5" fill="#17A8A8" />
                </svg>
                View on Google
              </a>
              <a href={writeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                style={{ border: '1.5px solid rgba(255,255,255,0.22)', backgroundColor: 'transparent', minHeight: 48, minWidth: 152 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#17A8A8')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Write a Review
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
