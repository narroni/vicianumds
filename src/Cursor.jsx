import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animFrame

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top = mouseY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px'
        ringRef.current.style.top = ringY + 'px'
      }
      animFrame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    animFrame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  if ('ontouchstart' in window) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: '#8FC49F',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          border: '1.5px solid #8FC49F',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          willChange: 'left, top',
        }}
      />
    </>
  )
}
