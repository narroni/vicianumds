import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS, BULLETS } from './content'
import ResponsiveImage from './components/ResponsiveImage'

function CountUp({ target, suffix, triggered }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!triggered) return
    const duration = 2000
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [triggered, target])

  return <span>{display}{suffix}</span>
}

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ── Image — first on mobile (order-first), right column on desktop ── */}
        <motion.div
          className="relative order-first md:order-last"
          initial={{ opacity: 0, x: 48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-bg"
               style={{ height: '320px' }}>
            <ResponsiveImage
              name="portrait"
              alt="Vicianum DS lab technician"
              loading="lazy"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute bottom-6 left-[-12px] md:left-[-20px] bg-bg border border-border px-4 py-3 md:px-5 md:py-4"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-display text-xl md:text-2xl text-heading leading-none">Est. 2014</p>
            <p className="text-muted text-[10px] uppercase tracking-widest mt-1">Vicianum DS</p>
          </motion.div>
        </motion.div>

        {/* ── Text — second on mobile, left column on desktop ── */}
        <motion.div
          className="order-last md:order-first"
          initial={{ opacity: 0, x: -48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs uppercase tracking-widest">About Us</span>
          </div>

          <h2 className="sr-only">About Vicianum DS</h2>

          {/* Quote — 2xl mobile → 4xl desktop */}
          <blockquote className="font-display italic text-3xl md:text-5xl font-bold text-heading leading-[1.2] mb-6 md:mb-8">
            "Every restoration we craft is a commitment to your patient's smile."
          </blockquote>

          <div className="w-12 h-0.5 bg-accent mb-8 md:mb-10" />

          {/* Stats row */}
          <div className="flex gap-6 md:gap-10 mb-8 md:mb-10">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label}>
                <p className="font-display text-3xl md:text-4xl text-accent leading-none mb-1">
                  <CountUp target={value} suffix={suffix} triggered={inView} />
                </p>
                <p className="text-muted text-[10px] uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-muted text-sm">
                <span className="text-accent text-base leading-none">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
