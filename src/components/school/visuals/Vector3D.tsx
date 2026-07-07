'use client'
/**
 * Vector3D — Classical Mechanics 3D Foundation Sprint, Task 2.
 * Universal, subject-independent 3D arrow primitive: shaft + cone head between
 * `start` and `end`, optional color/label, scalable via `lengthScale`. No
 * mechanics-specific logic — reusable by any future subject needing a labeled
 * 3D vector (force vectors, velocity vectors, electric/magnetic field vectors).
 */
import { useMemo } from 'react'
import { Quaternion, Vector3 } from 'three'
import { Html } from '@react-three/drei'

export interface Vector3DProps {
  /** Tail position of the vector. */
  start: [number, number, number]
  /** Head position of the vector (before lengthScale is applied). */
  end: [number, number, number]
  /** Arrow + label color (CSS color string). */
  color?: string
  /** Optional text label rendered at the arrow head. */
  label?: string
  /** Scales the start→end displacement without changing `start`/`end` semantics. */
  lengthScale?: number
  /** Shaft radius — lets callers emphasize magnitude visually. */
  thickness?: number
}

export function Vector3D({
  start,
  end,
  color = '#5B8DEF',
  label,
  lengthScale = 1,
  thickness = 0.05,
}: Vector3DProps) {
  const { shaftPosition, shaftLength, headPosition, quaternion, tip } = useMemo(() => {
    const startV = new Vector3(...start)
    const endV = new Vector3(...end)
    const displacement = endV.clone().sub(startV).multiplyScalar(lengthScale)
    const length = displacement.length()
    const headLength = Math.min(0.3, length * 0.3)
    const shaftLen = Math.max(length - headLength, 0.001)

    const direction = displacement.clone().normalize()
    const quat = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction)

    const shaftMid = startV.clone().add(direction.clone().multiplyScalar(shaftLen / 2))
    const headPos = startV.clone().add(direction.clone().multiplyScalar(shaftLen + headLength / 2))
    const tipPos = startV.clone().add(displacement)

    return {
      shaftPosition: shaftMid.toArray() as [number, number, number],
      shaftLength: shaftLen,
      headPosition: headPos.toArray() as [number, number, number],
      quaternion: quat,
      tip: tipPos.toArray() as [number, number, number],
    }
  }, [start, end, lengthScale])

  return (
    <group>
      <mesh position={shaftPosition} quaternion={quaternion}>
        <cylinderGeometry args={[thickness, thickness, shaftLength, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={headPosition} quaternion={quaternion}>
        <coneGeometry args={[thickness * 2.4, 0.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {label && (
        <Html position={tip} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            {label}
          </span>
        </Html>
      )}
    </group>
  )
}
