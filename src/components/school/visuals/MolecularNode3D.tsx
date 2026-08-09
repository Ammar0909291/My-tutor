'use client'
/**
 * MolecularNode3D — Chemistry 3D Foundation Sprint, Task 2.
 * Universal, subject-independent 3D atom/node primitive: a labeled sphere at
 * a position with a radius and color. No chemistry-curriculum logic (no
 * element data, no bonding rules) — mirrors Vector3D's role as a generic
 * geometric building block, reusable for atoms, particles, or any labeled node.
 */
import { SceneLabel } from './SceneLabel'
import type { Theme } from '@/components/Providers'

export interface MolecularNode3DProps {
  /** Center position of the node. */
  position: [number, number, number]
  /** Sphere radius. */
  radius?: number
  /** Optional text label rendered above the node. */
  label?: string
  /** Sphere color (CSS color string). */
  color?: string
  /** Active theme, for the label's halo. Prop, not hook — see SceneLabel. */
  theme?: Theme
  /** Typographic tier for the label. */
  labelTier?: number
}

export function MolecularNode3D({ position, radius = 0.3, label, color = '#5B8DEF', theme = 'dark', labelTier }: MolecularNode3DProps) {
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {label && (
        <SceneLabel
          text={label}
          position={[position[0], position[1] + radius + 0.22, position[2]]}
          color={color}
          theme={theme}
          tier={labelTier}
        />
      )}
    </group>
  )
}
