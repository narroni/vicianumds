import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const MAT = {
  color: '#EDE9E2',
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
}

export default function Crown({ hovered, dragRotation }) {
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
    // scale Y flattens the crown slightly
    <mesh ref={ref} scale={[1, 0.78, 1]}>
      <cylinderGeometry args={[0.6, 0.45, 1, 32]} />
      <meshPhysicalMaterial {...MAT} />
    </mesh>
  )
}
