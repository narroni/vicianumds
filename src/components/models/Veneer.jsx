import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Veneer({ isDragging, dragDelta }) {
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

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.38, -0.6)
    s.bezierCurveTo(-0.42, -0.6, -0.45, -0.4, -0.45, 0)
    s.bezierCurveTo(-0.45, 0.45, -0.3, 0.65, 0, 0.68)
    s.bezierCurveTo(0.3, 0.65, 0.45, 0.45, 0.45, 0)
    s.bezierCurveTo(0.45, -0.4, 0.42, -0.6, 0.38, -0.6)
    s.bezierCurveTo(0.2, -0.62, -0.2, -0.62, -0.38, -0.6)
    return s
  }, [])

  const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 8 }

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#F2EEE8"
          roughness={0.06}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          transmission={0.08}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
