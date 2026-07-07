'use client'
/**
 * Bond3D — Chemistry 3D Foundation Sprint, Task 2.
 * Universal, subject-independent 3D bond primitive: one or more parallel
 * cylinders between two atom positions, with bond order (single/double/
 * triple) controlling cylinder count, and an optional label. No
 * chemistry-curriculum logic (no valence/electronegativity rules) — purely
 * geometric, reusable wherever two 3D points need a labeled connecting bar.
 */
import { useMemo } from 'react'
import { Quaternion, Vector3 } from 'three'
import { Html } from '@react-three/drei'

export interface Bond3DProps {
  /** Position of the first atom (bond endpoint A). */
  atomA: [number, number, number]
  /** Position of the second atom (bond endpoint B). */
  atomB: [number, number, number]
  /** 1 = single bond, 2 = double bond, 3 = triple bond — controls strand count. */
  bondOrder?: 1 | 2 | 3
  /** Optional text label rendered at the bond midpoint. */
  label?: string
  /** Bond color (CSS color string). */
  color?: string
}

export function Bond3D({ atomA, atomB, bondOrder = 1, label, color = '#9AA5B8' }: Bond3DProps) {
  const { strands, quaternion, length, mid } = useMemo(() => {
    const a = new Vector3(...atomA)
    const b = new Vector3(...atomB)
    const displacement = b.clone().sub(a)
    const len = displacement.length()
    const direction = displacement.clone().normalize()
    const quat = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction)
    const midpoint = a.clone().add(b).multiplyScalar(0.5)

    // Perpendicular offset axis for multi-strand bonds (double/triple).
    const up = Math.abs(direction.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
    const perp = new Vector3().crossVectors(direction, up).normalize()
    const gap = 0.1
    const offsets =
      bondOrder === 1 ? [0] : bondOrder === 2 ? [-gap / 2, gap / 2] : [-gap, 0, gap]

    return {
      strands: offsets.map((o) => a.clone().add(perp.clone().multiplyScalar(o)).add(b.clone().add(perp.clone().multiplyScalar(o))).multiplyScalar(0.5)),
      quaternion: quat,
      length: len,
      mid: midpoint.toArray() as [number, number, number],
    }
  }, [atomA, atomB, bondOrder])

  return (
    <group>
      {strands.map((strandMid, i) => (
        <mesh key={i} position={strandMid.toArray() as [number, number, number]} quaternion={quaternion}>
          <cylinderGeometry args={[0.04, 0.04, length, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      {label && (
        <Html position={mid} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 600, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            {label}
          </span>
        </Html>
      )}
    </group>
  )
}
