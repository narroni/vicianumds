import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const mat = { color: '#EDE9E2', roughness: 0.12, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.1 }

function MiniCrown({ x }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 0.7, 48]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0.48, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.26, 48, 48]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[[-0.1, 0.56, -0.1],[0.1, 0.56, -0.1],[-0.1, 0.56, 0.1],[0.1, 0.56, 0.1]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      <mesh position={[0, -0.26, 0]}>
        <torusGeometry args={[0.2, 0.025, 12, 48]} />
        <meshPhysicalMaterial color="#D4D0C8" roughness={0.15} clearcoat={0.5} />
      </mesh>
    </group>
  )
}

export default function Bridge({ isDragging, dragDelta }) {
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

  return (
    <group ref={group} scale={0.9}>
      <MiniCrown x={-0.75} />
      <MiniCrown x={0} />
      <MiniCrown x={0.75} />
      {/* Connector bars between crowns */}
      <mesh position={[-0.375, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.22, 0.18]} />
        <meshPhysicalMaterial color="#E0DCD4" roughness={0.15} clearcoat={0.7} />
      </mesh>
      <mesh position={[0.375, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.22, 0.18]} />
        <meshPhysicalMaterial color="#E0DCD4" roughness={0.15} clearcoat={0.7} />
      </mesh>
    </group>
  )
}
