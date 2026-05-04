import { useEffect, useRef } from 'react'

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseOver = (e) => {
      const hovering = !!(
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('[data-cursor="hover"]')
      )
      if (dotRef.current) {
        dotRef.current.style.scale = hovering ? '2.5' : '1'
      }
      if (ringRef.current) {
        ringRef.current.style.scale = hovering ? '1.5' : '1'
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.08
      ringY += (mouseY - ringY) * 0.08

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#8FC49F',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'scale 0.15s ease',
        }}
      />
      {/* Ring — lerp trails behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(143, 196, 159, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'scale 0.15s ease',
        }}
      />
    </>
  )
}

export default function CursorWrapper() {
  if (isTouch) return null
  return <Cursor />
}
