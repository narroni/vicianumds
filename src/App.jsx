import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToSection } from './utils/scrollTo'
import Cursor from './Cursor'
import Navbar from './Navbar'
import Hero from './Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Process from './components/Process'
import About from './About'
import Contact from './Contact'
import Footer from './components/Footer'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 1000)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main className="relative bg-bg text-muted font-sans selection:bg-accent/30 selection:text-white">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Process />
        <Contact />
        <Cursor />

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => scrollToSection('top')}
              className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[100] bg-accent text-bg p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
              aria-label="Back to top"
              data-cursor="hover"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
