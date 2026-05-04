import { useState, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import Crown from './models/Crown'
import Veneer from './models/Veneer'
import Bridge from './models/Bridge'
import Implant from './models/Implant'

const models = [
  {
    id: 'crown',
    label: 'Dental Crown',
    description: 'Full coverage porcelain restoration that caps a damaged tooth, restoring its shape, strength and appearance.',
    component: Crown,
  },
  {
    id: 'veneer',
    label: 'Veneer',
    description: 'Ultra-thin porcelain shell bonded to the front surface of a tooth for aesthetic correction.',
    component: Veneer,
  },
  {
    id: 'bridge',
    label: 'Dental Bridge',
    description: 'Fixed prosthetic that bridges the gap of one or more missing teeth using adjacent crowns as anchors.',
    component: Bridge,
  },
  {
    id: 'implant',
    label: 'Implant Crown',
    description: 'A titanium screw fixture topped with a ceramic crown — the gold standard for tooth replacement.',
    component: Implant,
  },
]

function ModelScene({ ModelComponent, isDragging, dragDelta }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, 3, -3]} intensity={1.0} color="#8FC49F" />
      <pointLight position={[4, -2, 4]} intensity={0.4} color="#ffffff" />
      <ModelComponent isActive={false} isDragging={isDragging} dragDelta={dragDelta} />
    </>
  )
}

export default function TeethShowcase() {
  const [active, setActive] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 })
  const lastPointer = useRef({ x: 0, y: 0 })

  const onPointerDown = useCallback((e) => {
    setIsDragging(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setDragDelta({ x: dx, y: dy })
  }, [isDragging])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })
  }, [])

  const ActiveModel = models[active].component

  return (
    <section id="showcase" className="bg-bg py-32 px-5 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-accent text-xs uppercase tracking-widest mb-3">Interactive 3D</p>
          <h2 className="font-display text-5xl md:text-6xl text-heading mb-4">Our Craft in 3D</h2>
          <p className="text-muted text-sm max-w-lg mx-auto">Drag to rotate each model. Built to show the precision behind every restoration.</p>
        </motion.div>

        {/* Switcher buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {models.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === i
                  ? 'bg-accent text-bg border-accent'
                  : 'bg-transparent text-muted border-border hover:border-accent hover:text-accent'
              }`}
            >
              {m.label}
            </motion.button>
          ))}
        </div>

        {/* 3D Canvas */}
        <motion.div
          className="relative rounded-2xl border border-border overflow-hidden bg-surface"
          style={{ height: '480px', cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            >
              <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
                <ModelScene
                  ModelComponent={ActiveModel}
                  isDragging={isDragging}
                  dragDelta={dragDelta}
                />
              </Canvas>
            </motion.div>
          </AnimatePresence>

          {/* Drag hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted text-xs pointer-events-none select-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
            </svg>
            Drag to rotate
          </div>
        </motion.div>

        {/* Model info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-center"
          >
            <h3 className="font-display text-3xl text-heading mb-2">{models[active].label}</h3>
            <p className="text-muted text-sm max-w-md mx-auto">{models[active].description}</p>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
