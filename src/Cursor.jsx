import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.10
      ringY += (mouseY - ringY) * 0.10
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top = mouseY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px'
        ringRef.current.style.top = ringY + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: '8px', height: '8px',
        background: '#8FC49F', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top', top: 0, left: 0
      }}/>
      <div ref={ringRef} style={{
        position: 'fixed', width: '28px', height: '28px',
        border: '1.5px solid #8FC49F', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        opacity: 0.45, willChange: 'left, top', top: 0, left: 0
      }}/>
    </>
  )
}
