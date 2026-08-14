import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from './utils/scrollTo'
import { NAV_LINKS } from './content'
import { COLOR_MUTED, COLOR_ACCENT, COLOR_BG } from './utils/colors'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (id) => {
    setMobileOpen(false)
    scrollToSection(id)
  }

  // Anchors keep a real href for no-JS/middle-click/right-click; when JS is
  // available we intercept the click and use the smooth scrollToSection
  // animation instead of the browser's instant jump.
  const handleNavClick = (id) => (e) => {
    e.preventDefault()
    handleNav(id)
  }

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

          {/* Logo → scroll to top */}
          <a
            href="#hero"
            onClick={handleNavClick('top')}
            aria-label="Vicianum Dental Studio — scroll to top"
            className="flex items-center gap-2 font-display text-2xl font-bold text-heading leading-none cursor-pointer border-none bg-transparent p-0"
            data-cursor="hover"
          >
            <img src="/images/logo-nav.png" alt="" className="h-[17px] w-[17px] flex-shrink-0" />
            Vicianum<span className="text-accent">DS</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={`#${link.id}`}
                onClick={handleNavClick(link.id)}
                className="relative uppercase text-xs tracking-widest cursor-pointer border-none bg-transparent p-0"
                initial="rest"
                whileHover="hover"
                animate="rest"
                data-cursor="hover"
              >
                <motion.span
                  variants={{
                    rest:  { color: COLOR_MUTED },
                    hover: { color: COLOR_ACCENT },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
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

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => handleNav('contact')}
              className="hidden md:inline-flex border border-accent text-accent text-xs uppercase tracking-widest px-5 py-2.5 cursor-pointer bg-transparent"
              animate={{ scale: [1, 1.03, 1] }}
              whileHover={{ backgroundColor: COLOR_ACCENT, color: COLOR_BG, scale: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
              data-cursor="hover"
            >
              Request a Quote
            </motion.button>

            <button
              className="md:hidden text-muted w-11 h-11 flex items-center justify-center border-none bg-transparent"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[49] bg-bg md:hidden flex flex-col items-center justify-center gap-8"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={`#${link.id}`}
                onClick={handleNavClick(link.id)}
                className="font-display text-3xl font-bold text-heading hover:text-accent transition-colors cursor-pointer border-none bg-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              >
                {link.name}
              </motion.a>
            ))}

            <motion.button
              onClick={() => handleNav('contact')}
              className="mt-4 border border-accent text-accent text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent hover:text-bg transition-colors cursor-pointer bg-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              Request a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
