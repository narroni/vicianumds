import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = ['Services', 'Process', 'Work', 'About', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        animate={{
          paddingTop: scrolled ? '12px' : '20px',
          paddingBottom: scrolled ? '12px' : '20px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 bg-bg/80 border-b border-border transition-[backdrop-filter] duration-300 ${
          scrolled ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-[22px] text-heading leading-none min-h-0"
            data-cursor="hover"
          >
            Vicianum<span className="text-accent">DS</span>
          </a>

          {/* Center nav — desktop only */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative uppercase text-xs tracking-widest min-h-0"
                initial="rest"
                whileHover="hover"
                animate="rest"
                data-cursor="hover"
              >
                <motion.span
                  variants={{
                    rest: { color: '#A8B5A0' },
                    hover: { color: '#8FC49F' },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.span>
                <motion.span
                  className="absolute bottom-[-3px] left-0 h-px w-full bg-accent"
                  style={{ transformOrigin: 'left' }}
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              className="hidden md:inline-flex border border-accent text-accent text-xs uppercase tracking-widest px-5 py-2.5 min-h-0"
              whileHover={{ backgroundColor: '#8FC49F', color: '#0F1712' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              data-cursor="hover"
            >
              Request a Quote
            </motion.a>

            <button
              className="md:hidden text-muted w-11 h-11 flex items-center justify-center"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu — slides down from top */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[49] bg-bg md:hidden flex flex-col items-center justify-center gap-8"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-muted"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            {/* Nav links — 24px Cormorant Garamond */}
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-display text-2xl text-heading hover:text-accent transition-colors min-h-0"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              >
                {link}
              </motion.a>
            ))}

            {/* CTA */}
            <motion.a
              href="#contact"
              className="mt-4 border border-accent text-accent text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent hover:text-bg transition-colors"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              Request a Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
