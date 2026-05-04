import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function SingleCrown({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.7, 64]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} metalness={0.02} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.28, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} metalness={0.02} clearcoat={1} />
      </mesh>
      {[[-0.1, 0.54, -0.1], [0.1, 0.54, -0.1], [-0.1, 0.54, 0.1], [0.1, 0.54, 0.1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 32, 32]} />
          <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} clearcoat={1} />
        </mesh>
      ))}
    </group>
  )
}

export default function Bridge({ isActive, isDragging, dragDelta }) {
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
    <group ref={group} scale={0.85}>
      <SingleCrown position={[-0.72, 0, 0]} />
      <SingleCrown position={[0.72, 0, 0]} />
      {/* Pontic (middle fake tooth) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 0.65, 64]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} metalness={0.02} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.26, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#EDE9E2" roughness={0.08} clearcoat={1} />
      </mesh>
      {/* Connector bars */}
      <mesh position={[-0.36, 0.08, 0]}>
        <boxGeometry args={[0.36, 0.18, 0.22]} />
        <meshPhysicalMaterial color="#E8E4DE" roughness={0.1} metalness={0.02} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.36, 0.08, 0]}>
        <boxGeometry args={[0.36, 0.18, 0.22]} />
        <meshPhysicalMaterial color="#E8E4DE" roughness={0.1} metalness={0.02} clearcoat={0.8} />
      </mesh>
      {/* Base bar */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.55, 0.08, 0.3]} />
        <meshPhysicalMaterial color="#D4CFC8" roughness={0.12} metalness={0.05} clearcoat={0.6} />
      </mesh>
    </group>
  )
}
