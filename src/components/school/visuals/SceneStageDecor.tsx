'use client'
/**
 * SceneStageDecor — the ground plane and the axis triad.
 *
 * WHAT IT FIXES. A teaching figure was drawn against nothing: three-dimensional
 * geometry floating in an empty box, with no ground to judge height against and
 * no stated orientation. That costs a learner twice — a vector's direction is
 * ambiguous without axes, and depth is unreadable without a receding plane, so
 * a 3D scene read as a flat one.
 *
 * It is decoration in the strict sense: it adds no claim. The grid states a
 * scale, the triad states which way is up, and neither depends on the subject —
 * which is why it can default on for every spatial figure without a single
 * per-concept decision.
 *
 * Drawn with the same primitives as everything else, in the same semantic
 * palette, so it recedes behind the figure instead of competing with it.
 */
import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { SceneLabel } from './SceneLabel'
import type { Theme } from '@/components/Providers'
import { dimColor, ROLE, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'

interface SceneStageDecorProps {
  /** Half-extent of the ground plane, in scene units. */
  extent: number
  grid?: boolean
  axes?: boolean
  axisLabels?: { x?: string; y?: string; z?: string }
  theme: Theme
}

/** Axis colours follow the universal convention: x red, y green, z blue. */
const AXIS = { x: ROLE.input, y: ROLE.result, z: ROLE.output } as const

export function SceneStageDecor({ extent, grid = true, axes = true, axisLabels, theme }: SceneStageDecorProps) {
  const half = Math.max(2, extent)
  // Whole-unit divisions keep the grid a readable ruler rather than a texture:
  // roughly ten cells across, snapped so a line always falls on a round value.
  const cell = Math.max(1, Math.round(half / 5))
  const lines = useMemo(() => {
    const out: { points: [number, number, number][] }[] = []
    if (!grid) return out
    for (let v = -half; v <= half; v += cell) {
      out.push({ points: [[-half, -half, v], [half, -half, v]] })
      out.push({ points: [[v, -half, -half], [v, -half, half]] })
    }
    return out
  }, [grid, half, cell])

  const gridColor = dimColor(ROLE.reference, theme) ?? '#334155'
  const axisLen = half * 0.42

  return (
    <group>
      {lines.map((l, i) => (
        <Line key={i} points={l.points} color={gridColor} lineWidth={1} transparent opacity={0.55} />
      ))}

      {axes && (
        <group position={[-half * 0.86, -half * 0.86, 0]}>
          {(['x', 'y', 'z'] as const).map((k) => {
            const to: [number, number, number] =
              k === 'x' ? [axisLen, 0, 0] : k === 'y' ? [0, axisLen, 0] : [0, 0, axisLen]
            const color = themeColor(AXIS[k], theme) ?? AXIS[k]
            return (
              <group key={k}>
                <Line points={[[0, 0, 0], to]} color={color} lineWidth={2} />
                <SceneLabel
                  text={axisLabels?.[k] ?? k}
                  position={[to[0] * 1.22, to[1] * 1.22, to[2] * 1.22]}
                  color={color}
                  theme={theme}
                />
              </group>
            )
          })}
        </group>
      )}
    </group>
  )
}
