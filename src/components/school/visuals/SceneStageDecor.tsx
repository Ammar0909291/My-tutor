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
import { useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { SceneLabel } from './SceneLabel'
import type { Theme } from '@/components/Providers'
import { dimColor, ROLE, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'

type Bounds = { minX: number; maxX: number; minY: number; maxY: number; span: number }

interface SceneStageDecorProps {
  /** The box the figure's own geometry occupies, in scene units. */
  bounds: Bounds
  grid?: boolean
  axes?: boolean
  axisLabels?: { x?: string; y?: string; z?: string }
  theme: Theme
  /**
   * Draw the axis letters here. SceneSpecRenderer turns this off and hands the
   * same letters (`stageAxisLabels`) to the label layer instead, so they are
   * placed by the SAME solver as every other label — inside the canvas and clear
   * of the figure's own text. Drawn here they were invisible to that solver: at
   * 390px "y" sat on the τ label of the torque figure (93 % overlap) and "x" was
   * cut in half by the canvas edge.
   */
  drawLabels?: boolean
  /** The camera's distance, so the decor can be kept inside the frame (see `stageDecorLayout`). */
  cameraDistance?: number
}

/** Half the camera's vertical field of view (the scene camera is a 50° perspective). */
const HALF_FOV_TAN = Math.tan((50 * Math.PI) / 360)
/** The decor may use at most this much of the frame's half-height; the rest is margin. */
const DECOR_FRAME_FILL = 0.94

/** How far toward the camera (z) a point `extent` units below the centre can sit and still project inside the frame. */
function nearestZInFrame(extent: number, cameraDistance: number): number {
  const limit = HALF_FOV_TAN * cameraDistance * DECOR_FRAME_FILL
  return extent >= limit ? 0 : cameraDistance * (1 - extent / limit)
}

/**
 * The ground plane / triad geometry, shared by the decor and the label layer.
 *
 * `cameraDistance`, when given, keeps the decor INSIDE the frame. The ground's
 * near edge and the triad sit toward the camera (positive z) and perspective
 * magnifies them; measured with the fitted scenes of the 8 figures that draw a
 * triad, the near edge projected 1.3x-2.2x past the bottom of the canvas and the
 * triad 1.4x-2.0x, so the ground was cut off and most of the triad was out of
 * frame (the electric dipole and torque figures at their slider extremes
 * worst). The depth is pulled back only as far as the frame needs, and the
 * triad is stood a little clear of the figure's own corner so it does not sit
 * on the origin the figure is drawn from. Without a camera distance the layout
 * is the original one.
 */
export function stageDecorLayout(bounds: Bounds, cameraDistance?: number, aspect = 1) {
  const pad = bounds.span * 0.08
  const floor = bounds.minY - pad
  const x0 = bounds.minX - pad
  const x1 = bounds.maxX + pad
  const depth = (x1 - x0) / 2
  const axisLen = bounds.span * 0.13
  let originZ = depth * 0.72
  let nearEdge = depth
  let originX = x0
  let originY = floor
  if (cameraDistance && cameraDistance > 0) {
    const frameHalf = HALF_FOV_TAN * cameraDistance
    nearEdge = Math.min(depth, nearestZInFrame(Math.abs(floor), cameraDistance))
    // Stood clear of the figure's corner, but never below the frame.
    originX = x0 - axisLen * 0.6
    originY = -Math.min(Math.abs(floor) + axisLen * 0.6, frameHalf * DECOR_FRAME_FILL)
    // The z axis reaches axisLen further toward the camera than the origin.
    originZ = Math.min(originZ, Math.max(0, nearestZInFrame(Math.abs(originY), cameraDistance) - axisLen))
    // At z = 0 the z axis' tip (axisLen nearer the camera) is still magnified; if the
    // origin sits so low that the tip would leave the frame, lift the origin.
    originY = -Math.min(Math.abs(originY), (frameHalf * DECOR_FRAME_FILL * (cameraDistance - originZ - axisLen)) / cameraDistance)
    // ...and inside the frame's width too: on a wide canvas the figure's corner is
    // far out, and a triad stood beside it ran along (and past) the left edge.
    const scale = cameraDistance / Math.max(1e-6, cameraDistance - originZ)
    originX = Math.max(originX, -(frameHalf * Math.max(aspect, 0.5) * DECOR_FRAME_FILL) / scale)
  }
  const origin: [number, number, number] = [originX, originY, originZ]
  return { pad, floor, x0, x1, depth, nearEdge, axisLen, origin }
}

/** The axis letters as world-space labels, for the label layer. */
export function stageAxisLabels(
  bounds: Bounds, theme: Theme, axisLabels?: { x?: string; y?: string; z?: string }, cameraDistance?: number, aspect = 1,
): { text: string; position: [number, number, number]; color: string }[] {
  const { axisLen, origin } = stageDecorLayout(bounds, cameraDistance, aspect)
  return (['x', 'y', 'z'] as const).map((k) => {
    const to: [number, number, number] = k === 'x' ? [axisLen, 0, 0] : k === 'y' ? [0, axisLen, 0] : [0, 0, axisLen]
    return {
      text: axisLabels?.[k] ?? k,
      position: [origin[0] + to[0] * 1.22, origin[1] + to[1] * 1.22, origin[2] + to[2] * 1.22] as [number, number, number],
      color: themeColor(AXIS[k], theme) ?? AXIS[k],
    }
  })
}

/** Axis colours follow the universal convention: x red, y green, z blue. */
const AXIS = { x: ROLE.input, y: ROLE.result, z: ROLE.output } as const

export function SceneStageDecor({ bounds, grid = true, axes = true, axisLabels, theme, drawLabels = true, cameraDistance }: SceneStageDecorProps) {
  // The ground sits just under the figure's lowest point, and spans the
  // figure's own width — so it reads as the surface the figure stands on
  // rather than as a plane floating somewhere near it.
  const size = useThree((st) => st.size)
  const aspect = size.width / Math.max(1, size.height)
  const { floor, x0, x1, depth, nearEdge } = stageDecorLayout(bounds, cameraDistance, aspect)

  // Whole-unit divisions keep the grid a readable ruler rather than a texture:
  // roughly ten cells across, snapped so a line falls on a round value.
  const cell = Math.max(0.5, Math.round((x1 - x0) / 8 * 2) / 2)
  const lines = useMemo(() => {
    const out: { points: [number, number, number][] }[] = []
    if (!grid) return out
    for (let z = -depth; z <= nearEdge + 1e-6; z += cell) {
      out.push({ points: [[x0, floor, z], [x1, floor, z]] })
    }
    for (let x = x0; x <= x1 + 1e-6; x += cell) {
      out.push({ points: [[x, floor, -depth], [x, floor, nearEdge]] })
    }
    return out
  }, [grid, x0, x1, floor, depth, nearEdge, cell])

  const gridColor = dimColor(ROLE.reference, theme) ?? '#334155'
  // The triad is a CORNER marker: it sits at the near-left corner of the ground
  // plane, which is inside the camera's frame but outside the box the figure's
  // own geometry and labels occupy. Placing it inside that box (the first
  // attempt) put it straight through the result label — the decor is added at
  // render time and so is invisible to the label placement solver, which can
  // only avoid what the SCENE declares.
  const { axisLen, origin } = stageDecorLayout(bounds, cameraDistance, aspect)

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
                {drawLabels && (
                  <SceneLabel
                    text={axisLabels?.[k] ?? k}
                    position={[to[0] * 1.22, to[1] * 1.22, to[2] * 1.22]}
                    color={color}
                    theme={theme}
                  />
                )}
              </group>
            )
          })}
        </group>
      )}
    </group>
  )
}
