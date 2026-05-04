import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MAT = {
  color: '#EDE9E2',
  roughness: 0.1,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  side: THREE.DoubleSide,
}

export default function Veneer({ hovered, dragRotation }) {
  const meshRef = useRef()
  const geomRef = useRef()

  useEffect(() => {
    const geom = geomRef.current
    if (!geom) return
    const pos = geom.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      // parabolic Z displacement — edges curve back
      pos.setZ(i, -0.38 * x * x)
    }
    pos.needsUpdate = true
    geom.computeVertexNormals()
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    if (dragRotation) {
      meshRef.current.rotation.y = dragRotation.current.y
      meshRef.current.rotation.x = dragRotation.current.x
    } else {
      meshRef.current.rotation.y += hovered ? 0.025 : 0.008
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry ref={geomRef} args={[1, 1.4, 8, 8]} />
      <meshPhysicalMaterial {...MAT} />
    </mesh>
  )
}
