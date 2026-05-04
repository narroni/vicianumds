import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const MAT = {
  color: '#EDE9E2',
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
}

// Screw uses slightly higher metalness to distinguish it visually
const SCREW_MAT = { ...MAT, metalness: 0.55, roughness: 0.12 }

export default function Implant({ hovered, dragRotation }) {
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    if (dragRotation) {
      groupRef.current.rotation.y = dragRotation.current.y
      groupRef.current.rotation.x = dragRotation.current.x
    } else {
      groupRef.current.rotation.y += hovered ? 0.025 : 0.008
    }
  })

  return (
    // offset group so the assembly is vertically centred
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* titanium screw */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
        <meshPhysicalMaterial {...SCREW_MAT} />
      </mesh>
      {/* ceramic crown */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 0.7, 32]} />
        <meshPhysicalMaterial {...MAT} />
      </mesh>
    </group>
  )
}
