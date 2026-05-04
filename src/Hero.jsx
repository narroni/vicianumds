import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const HEADING_WORDS = [
  { text: 'Crafted', em: false },
  { text: 'for', em: false },
  { text: 'Dentists.', em: true },
  { text: 'Built', em: false },
  { text: 'for', em: false },
  { text: 'Perfection.', em: true },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* ── Left: text ── */}
        <div className="order-2 md:order-1 text-center md:text-left">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-4 mb-8"
            {...fadeUp}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            <div className="w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs uppercase tracking-widest">
              Precision Dental Lab
            </span>
          </motion.div>

          {/* Heading — fluid size via CSS */}
          <h1 className="font-display text-heading mb-8">
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.25em] ${
                  word.em ? 'italic text-accent' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* Body + buttons */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <p className="text-muted text-base leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
              Vicianum DS is a precision dental laboratory delivering
              handcrafted restorations built to the exact tolerances your patients deserve.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-bg text-xs uppercase tracking-widest px-7 py-3.5 font-medium"
                whileHover={{ backgroundColor: '#7ab58e' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                data-cursor="hover"
              >
                Start a Case
                <ArrowRight size={14} />
              </motion.a>

              <motion.a
                href="#services"
                className="inline-flex items-center gap-2 text-muted text-xs uppercase tracking-widest hover:text-accent transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                data-cursor="hover"
              >
                Our Services
                <ArrowRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Right: circular image ── */}
        <motion.div
          className="order-1 md:order-2 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative w-[280px] sm:w-[320px] md:w-[400px] aspect-square">
            {/* Rotating dashed outer ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full border border-dashed border-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image Container with Glow */}
            <div className="absolute inset-4 rounded-full overflow-hidden bg-surface shadow-[0_0_60px_rgba(143,196,159,0.15)]">
              <img
                src="/images/hero.jpg"
                alt="Lab technician at work"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Stats Card - Hidden on Mobile, replaced by Bottom Centered Card */}
            <div className="hidden md:block absolute bottom-6 right-[-28px] bg-surface border border-border px-5 py-4">
              <p className="font-display text-2xl text-heading leading-none">500+</p>
              <p className="text-muted text-[10px] uppercase tracking-widest mt-1">Cases Delivered</p>
            </div>
          </div>

          {/* Stats Card Mobile - Visible only on small screens */}
          <div className="md:hidden mt-12 bg-surface border border-border px-8 py-6 w-full text-center">
            <p className="font-display text-3xl text-heading leading-none">500+</p>
            <p className="text-muted text-xs uppercase tracking-widest mt-2">Precision Cases Delivered Globally</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-muted/40 text-[10px] uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={14} className="text-accent/40" />
      </motion.div>
    </section>
  )
}
