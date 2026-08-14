import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { CONTACT_INFO, CONTACT_FIELDS } from './content'

// Set VITE_FORMSPREE_ENDPOINT in your .env — see .env.example
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

const baseInput =
  'w-full bg-surface border border-border text-heading rounded-lg px-4 py-3 text-sm outline-none focus:border-accent placeholder:text-muted/80'

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', clinic: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      setErrorMessage('This form is not configured yet. Please email us directly instead.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage('Something went wrong, please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong, please try again.')
    }
  }

  return (
    <section id="contact" className="bg-bg py-24 md:py-32">
      <div className="max-w-[680px] mx-auto px-5">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs uppercase tracking-widest">Contact</span>
          </div>
          <h2 className="font-display italic text-5xl md:text-6xl font-bold text-heading leading-[1.1] mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Send us your case details and we'll respond within 24 hours.
          </p>
        </div>

        {/* Form / success / error states */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              className="flex flex-col items-center gap-5 py-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Check size={28} className="text-accent" />
              </motion.div>
              <p className="font-display text-3xl md:text-4xl text-heading">Message Received!</p>
              <p className="text-muted text-sm">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_FIELDS.map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label htmlFor={`contact-${name}`} className="sr-only">{label}</label>
                    <motion.input
                      id={`contact-${name}`}
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={label}
                      required={required}
                      disabled={status === 'sending'}
                      className={`${baseInput} disabled:opacity-50`}
                      whileFocus={{ scale: 1.005 }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                ))}
              </div>

              <label htmlFor="contact-message" className="sr-only">Message / Case Details</label>
              <motion.textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message / Case Details"
                required
                rows={5}
                disabled={status === 'sending'}
                className={`${baseInput} resize-none disabled:opacity-50`}
                whileFocus={{ scale: 1.005 }}
                transition={{ duration: 0.15 }}
              />

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center">
                  {errorMessage}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-accent text-bg font-medium text-sm uppercase tracking-widest py-4 rounded-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                transition={{ duration: 0.15 }}
                data-cursor="hover"
              >
                {status === 'sending' ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-5 sm:gap-8 mt-12 pt-10 border-t border-border">
          {CONTACT_INFO.map(({ Icon, label, href, ariaLabel, external }) => {
            const Wrapper = href ? 'a' : 'div'
            const linkProps = href
              ? {
                  href,
                  ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                  ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
                }
              : {}
            return (
              <Wrapper
                key={label}
                className="flex items-center gap-2.5 group"
                {...linkProps}
              >
                <Icon size={15} className="text-accent flex-shrink-0" />
                <span className={`text-muted text-sm ${href ? 'group-hover:text-accent transition-colors duration-300' : ''}`}>
                  {label}
                </span>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
