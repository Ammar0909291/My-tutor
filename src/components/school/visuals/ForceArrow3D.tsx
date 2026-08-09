'use client'
/**
 * ForceArrow3D — Classical Mechanics 3D Foundation Sprint, Task 3.
 * Generic, subject-independent force-vector convenience wrapper over Vector3D:
 * takes an origin, a direction, and a magnitude instead of raw start/end
 * points. No mechanics formulas live here — reusable for gravity, normal,
 * friction, tension (mechanics) or electric force (future subjects).
 */
import { Vector3D } from './Vector3D'

/**
 * The end point this arrow will reach — the same arithmetic the component
 * uses. Exported so a figure can anchor a label there and let the placement
 * layer solve it with the rest.
 */
export function forceArrowTip(
  origin: [number, number, number],
  direction: [number, number, number],
  magnitude: number,
  scale = 0.4,
): [number, number, number] {
  const len = Math.hypot(...direction) || 1
  const arm = magnitude * scale
  return [
    origin[0] + (direction[0] / len) * arm,
    origin[1] + (direction[1] / len) * arm,
    origin[2] + (direction[2] / len) * arm,
  ]
}

export interface ForceArrow3DProps {
  /** Point the force acts from. */
  origin: [number, number, number]
  /** Unit (or non-unit) direction the force points along — normalized internally by magnitude scaling. */
  direction: [number, number, number]
  /** Force magnitude — scales the rendered arrow length. */
  magnitude: number
  color?: string
  label?: string
  /** Converts magnitude units to scene-space length (default keeps arrows readable across a wide magnitude range). */
  scale?: number
}

export function ForceArrow3D({
  origin,
  direction,
  magnitude,
  color = '#FF6B6B',
  label,
  scale = 0.4,
}: ForceArrow3DProps) {
  const len = Math.hypot(...direction) || 1
  const unit: [number, number, number] = [direction[0] / len, direction[1] / len, direction[2] / len]
  const armLength = magnitude * scale
  const end: [number, number, number] = [
    origin[0] + unit[0] * armLength,
    origin[1] + unit[1] * armLength,
    origin[2] + unit[2] * armLength,
  ]

  return <Vector3D start={origin} end={end} color={color} label={label} thickness={0.05} />
}
