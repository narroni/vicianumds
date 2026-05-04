import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Crown({ isActive, isDragging, dragDelta }) {
  const group = useRef()
  const speed = isActive ? 0.003 : 0.008

  useFrame(() => {
    if (!isDragging && group.current) {
      group.current.rotation.y += speed
    }
    if (isDragging && group.current) {
      group.current.rotation.y += dragDelta.x * 0.01
      group.current.rotation.x += dragDelta.y * 0.01
    }
  })

  return (
    <group ref={group}>
      {/* Main crown body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.9, 64, 1]} />
        <meshPhysicalMaterial
          color="#EDE9E2"
          roughness={0.08}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>
      {/* Crown top dome */}
      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.55, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshPhysicalMaterial
          color="#EDE9E2"
          roughness={0.08}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>
      {/* Crown cusps (4 bumps on top) */}
      {[[-0.2, 0.72, -0.2], [0.2, 0.72, -0.2], [-0.2, 0.72, 0.2], [0.2, 0.72, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshPhysicalMaterial
            color="#EDE9E2"
            roughness={0.08}
            metalness={0.02}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      ))}
      {/* Base margin ring */}
      <mesh position={[0, -0.36, 0]}>
        <torusGeometry args={[0.42, 0.04, 16, 64]} />
        <meshPhysicalMaterial
          color="#D4CFC8"
          roughness={0.1}
          metalness={0.05}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  )
}
