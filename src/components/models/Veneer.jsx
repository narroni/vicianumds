import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Veneer({ isActive, isDragging, dragDelta }) {
  const group = useRef()
  const speed = isActive ? 0.003 : 0.008

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.9, 1.3, 20, 20)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = Math.sin(x * 1.8) * 0.18 + Math.sin(y * 0.8) * 0.06
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

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
      {/* Main veneer shell */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#F0EDE8"
          roughness={0.05}
          metalness={0.01}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.15}
          thickness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Veneer thickness edge */}
      <mesh geometry={geometry} position={[0, 0, -0.06]}>
        <meshPhysicalMaterial
          color="#E8E4DE"
          roughness={0.1}
          metalness={0.01}
          clearcoat={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Top edge highlight */}
      <mesh position={[0, 0.65, 0.05]}>
        <boxGeometry args={[0.9, 0.04, 0.06]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.02} clearcoat={1} />
      </mesh>
    </group>
  )
}
