import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const MAT = {
  color: '#EDE9E2',
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
}

export default function Inlay({ hovered, dragRotation }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    if (dragRotation) {
      ref.current.rotation.y = dragRotation.current.y
      ref.current.rotation.x = dragRotation.current.x
    } else {
      ref.current.rotation.y += hovered ? 0.025 : 0.008
    }
  })

  return (
    // tilt on X so both the top face and front edge are visible
    <mesh ref={ref} rotation={[-0.4, 0, 0]}>
      <boxGeometry args={[1.2, 0.3, 1]} />
      <meshPhysicalMaterial {...MAT} />
    </mesh>
  )
}
