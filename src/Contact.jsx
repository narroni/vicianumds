import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Check } from 'lucide-react'

const CONTACT_INFO = [
  { Icon: Mail,    label: 'info@vicianumds.com' },
  { Icon: Phone,   label: '+1 (555) 012-3456' },
  { Icon: MapPin,  label: 'Chicago, IL' },
]

const FIELDS = [
  { name: 'name',    label: 'Full Name',             type: 'text',  required: true },
  { name: 'clinic',  label: 'Clinic / Practice Name', type: 'text',  required: true },
  { name: 'email',   label: 'Email',                  type: 'email', required: true },
  { name: 'phone',   label: 'Phone (optional)',        type: 'tel',   required: false },
]

const baseInput =
  'w-full bg-surface border border-border text-heading rounded-lg px-4 py-3 text-sm outline-none focus:border-accent placeholder:text-muted/40'

export default function Contact() {
  const [form, setForm] = useState({ name: '', clinic: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
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
          <h2 className="font-display italic text-4xl md:text-5xl text-heading leading-[1.1] mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Send us your case details and we'll respond within 24 hours.
          </p>
        </div>

        {/* Form */}
        {sent ? (
          <motion.div
            className="flex flex-col items-center gap-4 py-16 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent flex items-center justify-center">
              <Check size={24} className="text-accent" />
            </div>
            <p className="font-display text-3xl text-heading">Message Sent!</p>
            <p className="text-muted text-sm">We'll be in touch within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELDS.map(({ name, label, type, required }) => (
                <motion.input
                  key={name}
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={label}
                  required={required}
                  className={baseInput}
                  whileFocus={{ scale: 1.005 }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>

            <motion.textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message / Case Details"
              required
              rows={5}
              className={`${baseInput} resize-none`}
              whileFocus={{ scale: 1.005 }}
              transition={{ duration: 0.15 }}
            />

            <motion.button
              type="submit"
              className="w-full bg-accent text-bg font-medium text-sm uppercase tracking-widest py-4 rounded-lg mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              data-cursor="hover"
            >
              Send Message
            </motion.button>
          </motion.form>
        )}

        {/* Contact info — stacks vertically on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-5 sm:gap-8 mt-12 pt-10 border-t border-border">
          {CONTACT_INFO.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={15} className="text-accent flex-shrink-0" />
              <span className="text-muted text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
