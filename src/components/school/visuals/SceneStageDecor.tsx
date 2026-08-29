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
  /** The box the figure's own geometry occupies, in scene units. */
  bounds: { minX: number; maxX: number; minY: number; maxY: number; span: number }
  grid?: boolean
  axes?: boolean
  axisLabels?: { x?: string; y?: string; z?: string }
  theme: Theme
}

/** Axis colours follow the universal convention: x red, y green, z blue. */
const AXIS = { x: ROLE.input, y: ROLE.result, z: ROLE.output } as const

export function SceneStageDecor({ bounds, grid = true, axes = true, axisLabels, theme }: SceneStageDecorProps) {
  // The ground sits just under the figure's lowest point, and spans the
  // figure's own width — so it reads as the surface the figure stands on
  // rather than as a plane floating somewhere near it.
  const pad = bounds.span * 0.08
  const floor = bounds.minY - pad
  const x0 = bounds.minX - pad
  const x1 = bounds.maxX + pad
  const depth = (x1 - x0) / 2

  // Whole-unit divisions keep the grid a readable ruler rather than a texture:
  // roughly ten cells across, snapped so a line falls on a round value.
  const cell = Math.max(0.5, Math.round((x1 - x0) / 8 * 2) / 2)
  const lines = useMemo(() => {
    const out: { points: [number, number, number][] }[] = []
    if (!grid) return out
    for (let z = -depth; z <= depth + 1e-6; z += cell) {
      out.push({ points: [[x0, floor, z], [x1, floor, z]] })
    }
    for (let x = x0; x <= x1 + 1e-6; x += cell) {
      out.push({ points: [[x, floor, -depth], [x, floor, depth]] })
    }
    return out
  }, [grid, x0, x1, floor, depth, cell])

  const gridColor = dimColor(ROLE.reference, theme) ?? '#334155'
  // The triad is a CORNER marker: it sits at the near-left corner of the ground
  // plane, which is inside the camera's frame but outside the box the figure's
  // own geometry and labels occupy. Placing it inside that box (the first
  // attempt) put it straight through the result label — the decor is added at
  // render time and so is invisible to the label placement solver, which can
  // only avoid what the SCENE declares.
  const axisLen = bounds.span * 0.13
  const origin: [number, number, number] = [x0, floor, depth * 0.72]

  return (
    <group>
      {lines.map((l, i) => (
        <Line key={i} points={l.points} color={gridColor} lineWidth={1} transparent opacity={0.55} />
      ))}

      {axes && (
        <group position={origin}>
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
