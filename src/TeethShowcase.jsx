import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Crown from './models/Crown'
import Veneer from './models/Veneer'
import Bridge from './models/Bridge'
import Implant from './models/Implant'
import Inlay from './models/Inlay'

const MODELS = [
  { id: 'crown',   Component: Crown,   name: 'Crown',   desc: 'Full-coverage ceramic restoration' },
  { id: 'veneer',  Component: Veneer,  name: 'Veneer',  desc: 'Ultra-thin porcelain surface laminate' },
  { id: 'bridge',  Component: Bridge,  name: 'Bridge',  desc: 'Multi-unit fixed prosthesis' },
  { id: 'implant', Component: Implant, name: 'Implant', desc: 'Titanium-anchored permanent solution' },
  { id: 'inlay',   Component: Inlay,   name: 'Inlay',   desc: 'Precision-fit molar restoration' },
]

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 2]} intensity={1} />
      <pointLight position={[-3, 2, -2]} color="#8FC49F" intensity={0.8} />
    </>
  )
}

function ModelCard({ model, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const { Component, name, desc } = model

  return (
    <motion.div
      className="bg-surface border border-border rounded-xl overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      data-cursor="hover"
    >
      {/* 160px on mobile, 220px on md+ */}
      <div className="h-40 md:h-[220px]">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <Lights />
          <Component hovered={hovered} />
        </Canvas>
      </div>
      <div className="px-4 py-3 md:px-5 md:py-4 border-t border-border">
        <h3 className="font-display text-lg md:text-xl text-heading mb-0.5 md:mb-1">{name}</h3>
        <p className="text-muted text-[11px] md:text-xs leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

function ModelOverlay({ model, onClose }) {
  const { Component, name, desc } = model
  const dragRotation = useRef({ x: 0.35, y: 0.5 })
  const isDragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  // Shared handler — works for both mouse and touch
  const startDrag = (x, y, e) => {
    isDragging.current = true
    lastPointer.current = { x, y }
    if (e?.currentTarget?.setPointerCapture && e.pointerId !== undefined) {
      e.currentTarget.setPointerCapture(e.pointerId)
    }
  }

  const moveDrag = (x, y) => {
    if (!isDragging.current) return
    dragRotation.current.y += (x - lastPointer.current.x) * 0.01
    dragRotation.current.x += (y - lastPointer.current.y) * 0.01
    lastPointer.current = { x, y }
  }

  const endDrag = () => { isDragging.current = false }

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-muted hover:text-accent transition-colors"
        onClick={onClose}
        data-cursor="hover"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Pointer events (covers both mouse and touch) */}
      <div
        className="w-full max-w-2xl h-[55vh] touch-none"
        style={{ cursor: 'grab' }}
        onPointerDown={(e) => startDrag(e.clientX, e.clientY, e)}
        onPointerMove={(e) => moveDrag(e.clientX, e.clientY)}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <Lights />
          <Component dragRotation={dragRotation} />
        </Canvas>
      </div>

      <div className="absolute bottom-8 md:bottom-10 left-0 right-0 text-center pointer-events-none px-5">
        <h3 className="font-display text-3xl md:text-4xl text-heading mb-2">{name}</h3>
        <p className="text-muted text-sm mb-3">{desc}</p>
        <p className="text-muted/40 text-[10px] uppercase tracking-widest">
          Drag to rotate
        </p>
      </div>
    </motion.div>
  )
}

export default function TeethShowcase() {
  const [active, setActive] = useState(null)

  return (
    <section id="teeth-showcase" className="bg-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs uppercase tracking-widest">Restorations</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-heading">
            Our Craft in 3D
          </h2>
        </div>

        {/* 2 cols on mobile, 3 on tablet, horizontal scroll row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-4 md:gap-5 lg:gap-6 lg:overflow-x-auto lg:pb-4 scrollbar-hide">
          {MODELS.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onOpen={() => setActive(model)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ModelOverlay model={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
