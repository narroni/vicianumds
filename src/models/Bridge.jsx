import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const MAT = {
  color: '#EDE9E2',
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
}

export default function Bridge({ hovered, dragRotation }) {
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
    // scale down so 3 crowns fit the same camera frame
    <group ref={groupRef} scale={0.42}>
      <mesh position={[-1.2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.45, 1, 32]} />
        <meshPhysicalMaterial {...MAT} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.45, 1, 32]} />
        <meshPhysicalMaterial {...MAT} />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.45, 1, 32]} />
        <meshPhysicalMaterial {...MAT} />
      </mesh>
      {/* connecting bar sits just below the crown bases */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[2.55, 0.22, 0.55]} />
        <meshPhysicalMaterial {...MAT} />
      </mesh>
    </group>
  )
}
