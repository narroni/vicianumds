import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Crown({ isDragging, dragDelta }) {
  const group = useRef()

  useFrame(() => {
    if (!group.current) return
    if (isDragging) {
      group.current.rotation.y += dragDelta.x * 0.01
      group.current.rotation.x += dragDelta.y * 0.01
    } else {
      group.current.rotation.y += 0.006
    }
  })

  const mat = {
    color: '#EDE9E2',
    roughness: 0.12,
    metalness: 0.0,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Wide occlusal top */}
      <mesh position={[0, 0.7, 0]} scale={[1, 0.35, 1]}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Crown body — tapered cylinder */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.58, 0.44, 0.85, 64, 1, false]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* 4 cusps on top */}
      {[[-0.22, 0.88, -0.22],[0.22, 0.88, -0.22],[-0.22, 0.88, 0.22],[0.22, 0.88, 0.22]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {/* Cervical margin — thin ring at base */}
      <mesh position={[0, -0.32, 0]}>
        <torusGeometry args={[0.45, 0.03, 16, 64]} />
        <meshPhysicalMaterial color="#D8D4CC" roughness={0.15} metalness={0} clearcoat={0.6} />
      </mesh>
    </group>
  )
}
