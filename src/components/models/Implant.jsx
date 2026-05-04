import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Implant({ isDragging, dragDelta }) {
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

  const ceramicMat = { color: '#EDE9E2', roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08 }
  const titaniumMat = { color: '#B0B4B8', roughness: 0.25, metalness: 0.92, clearcoat: 0.3 }
  const threadMat = { color: '#9A9EA2', roughness: 0.35, metalness: 0.9 }

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      {/* Ceramic crown */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.36, 0.28, 0.55, 56]} />
        <meshPhysicalMaterial {...ceramicMat} />
      </mesh>
      <mesh position={[0, 1.34, 0]} scale={[1, 0.38, 1]}>
        <sphereGeometry args={[0.36, 56, 56]} />
        <meshPhysicalMaterial {...ceramicMat} />
      </mesh>
      {[[-0.13, 1.42, -0.13],[0.13, 1.42, -0.13],[-0.13, 1.42, 0.13],[0.13, 1.42, 0.13]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshPhysicalMaterial {...ceramicMat} />
        </mesh>
      ))}
      {/* Abutment */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6, 32]} />
        <meshPhysicalMaterial {...titaniumMat} />
      </mesh>
      {/* Implant body */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.7, 32]} />
        <meshPhysicalMaterial {...titaniumMat} />
      </mesh>
      {/* Screw threads */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[0, -0.08 - i * 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.022, 10, 32]} />
          <meshPhysicalMaterial {...threadMat} />
        </mesh>
      ))}
      {/* Tapered tip */}
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.16, 0.04, 0.2, 32]} />
        <meshPhysicalMaterial {...titaniumMat} />
      </mesh>
    </group>
  )
}
