import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Implant({ isActive, isDragging, dragDelta }) {
  const group = useRef()
  const speed = isActive ? 0.003 : 0.008

  useFrame(() => {
    if (!isDragging && group.current) group.current.rotation.y += speed
    if (isDragging && group.current) {
      group.current.rotation.y += dragDelta.x * 0.01
      group.current.rotation.x += dragDelta.y * 0.01
    }
  })

  return (
    <group ref={group}>
      {/* Crown on top */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.38, 0.3, 0.6, 64]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} metalness={0.02} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.38, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} metalness={0.02} clearcoat={1} />
      </mesh>
      {[[-0.14, 1.12, -0.14], [0.14, 1.12, -0.14], [-0.14, 1.12, 0.14], [0.14, 1.12, 0.14]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} clearcoat={1} />
        </mesh>
      ))}
      {/* Abutment */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.55, 32]} />
        <meshPhysicalMaterial color="#C8C8C8" roughness={0.2} metalness={0.9} clearcoat={0.5} />
      </mesh>
      {/* Implant fixture (screw) */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.14, 0.1, 1.0, 32]} />
        <meshPhysicalMaterial color="#A8A8A8" roughness={0.3} metalness={0.95} />
      </mesh>
      {/* Screw threads */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -0.0 - i * 0.11, 0]}>
          <torusGeometry args={[0.14, 0.025, 8, 32]} />
          <meshPhysicalMaterial color="#909090" roughness={0.4} metalness={0.95} />
        </mesh>
      ))}
      {/* Screw tip */}
      <mesh position={[0, -0.9, 0]}>
        <coneGeometry args={[0.1, 0.2, 32]} />
        <meshPhysicalMaterial color="#A8A8A8" roughness={0.3} metalness={0.95} />
      </mesh>
    </group>
  )
}
