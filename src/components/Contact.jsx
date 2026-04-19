import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'

const facilityTypes = [
  'Medical Office / Clinic',
  'Daycare / School',
  'Office Building',
  'Retail / Commercial',
  'Other',
]

const sqFtRanges = [
  'Under 2,000 sq ft',
  '2,000 - 5,000 sq ft',
  '5,000 - 15,000 sq ft',
  '15,000+ sq ft',
]

const inputStyle = {
  backgroundColor: '#F4F7FB',
  border: '1px solid rgba(11,37,69,0.12)',
  color: '#0B2545',
}
const inputErrStyle = {
  backgroundColor: '#FEF2F2',
  border: '1px solid #FCA5A5',
  color: '#0B2545',
}
const inputCls =
  'w-full px-4 py-3 rounded-xl text-sm font-light focus:outline-none focus:ring-2 transition-all duration-200'

function Label({ children, error }) {
  return (
    <label
      className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
      style={{ color: error ? '#EF4444' : '#64748B' }}
    >
      {children}
    </label>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', phone: '',
    email: '', facilityType: '', sqFt: '', message: '',
  })

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.company.trim()) e.company = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.facilityType) e.facilityType = 'Please select one'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  const si = (field) => (errors[field] ? inputErrStyle : inputStyle)

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left: info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: '#17A8A8' }}>
              Get a Quote
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tight" style={{ color: '#0B2545' }}>
              Request a free quote
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 sm:mb-8" style={{ color: '#64748B' }}>
              Tell us about your facility and what you need. We review every submission and respond
              within 1 business day.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#17A8A8" strokeWidth="1.4" />
                      <path d="M1.5 7.5l7.5 4.5 7.5-4.5" stroke="#17A8A8" strokeWidth="1.4" />
                    </svg>
                  ),
                  label: 'sales@acleanbuildingsolutions.com',
                  sub: 'Direct to our team',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.5 2.25h3l1.5 3.75-1.875 1.125a9.75 9.75 0 004.5 4.5L11.75 9.75l3.75 1.5v3a1.5 1.5 0 01-1.5 1.5C6.545 15.75 2.25 11.455 2.25 6.75A4.5 4.5 0 013.5 2.25z" stroke="#17A8A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  label: '+1 (732) 430-5494',
                  sub: 'Call or text us directly',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 16.5S2.25 10.63 2.25 7.5a6.75 6.75 0 0113.5 0c0 3.13-6.75 9-6.75 9z" stroke="#17A8A8" strokeWidth="1.4" />
                      <circle cx="9" cy="7.5" r="2.25" stroke="#17A8A8" strokeWidth="1.4" />
                    </svg>
                  ),
                  label: 'South River, NJ',
                  sub: 'Serving NJ · NY · PA',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1.5l2.16 5.76h5.34L12 10.44l1.8 5.56L9 12.66 4.2 16l1.8-5.56-4.5-3.18h5.34L9 1.5z" stroke="#17A8A8" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  ),
                  label: 'Response within 1 business day',
                  sub: 'Commercial facilities only',
                },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white"
                  style={{ border: '1px solid rgba(11,37,69,0.08)' }}
                >
                  <div className="flex-shrink-0 p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(23,168,168,0.08)' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold break-all" style={{ color: '#0B2545' }}>{label}</div>
                    <div className="text-xs mt-0.5 font-light" style={{ color: '#94A3B8' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl p-5 sm:p-8"
            style={{ border: '1px solid rgba(11,37,69,0.08)', backgroundColor: '#FAFBFD' }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(23,168,168,0.1)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6L23 8" stroke="#17A8A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ color: '#0B2545' }}>Message received!</h3>
                <p className="font-light" style={{ color: '#64748B' }}>We'll be in touch within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Name row — 1 col on mobile, 2 col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label error={errors.firstName}>First Name *</Label>
                    <input
                      type="text" name="firstName" value={form.firstName}
                      onChange={handleChange} placeholder="Jane"
                      className={inputCls} style={si('firstName')}
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label error={errors.lastName}>Last Name *</Label>
                    <input
                      type="text" name="lastName" value={form.lastName}
                      onChange={handleChange} placeholder="Smith"
                      className={inputCls} style={si('lastName')}
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label error={errors.company}>Company / Facility *</Label>
                  <input
                    type="text" name="company" value={form.company}
                    onChange={handleChange} placeholder="Acme Medical Group"
                    className={inputCls} style={si('company')}
                  />
                  {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                </div>

                {/* Phone + email — 1 col on mobile, 2 col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label error={errors.phone}>Phone *</Label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} placeholder="(732) 555-0100"
                      className={inputCls} style={si('phone')}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label error={errors.email}>Business Email *</Label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="jane@company.com"
                      className={inputCls} style={si('email')}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label error={errors.facilityType}>Facility Type *</Label>
                  <select
                    name="facilityType" value={form.facilityType}
                    onChange={handleChange} className={inputCls} style={si('facilityType')}
                  >
                    <option value="" disabled>Select facility type...</option>
                    {facilityTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.facilityType && <p className="text-xs text-red-500 mt-1">{errors.facilityType}</p>}
                </div>

                <div>
                  <Label>Approximate Square Footage</Label>
                  <select
                    name="sqFt" value={form.sqFt}
                    onChange={handleChange} className={inputCls} style={inputStyle}
                  >
                    <option value="" disabled>Select range...</option>
                    {sqFtRanges.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Notes / Needs</Label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your cleaning needs or frequency requirements..."
                    rows={4} className={inputCls}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60"
                  style={{ backgroundColor: '#17A8A8', minHeight: 52 }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Quote Request'}
                </button>

                <p className="text-center text-xs" style={{ color: '#94A3B8' }}>
                  We respond within 1 business day · Commercial facilities only
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
