/**
 * Core mathematics figures — batch 45 of the mathematics visual campaign (2026-10-20): Green's theorem.
 *
 * `math.calc.greens-theorem` was served NO figure (the tutor told a learner "I don't have a picture for this one", twice). Same
 * rules as batches 1-44: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are
 * free), three cumulative steps, coordinates inside +-5, at most 50 objects per step, and every number drawn comes from the
 * constants and pure helpers exported here, which the test file re-derives independently from the DRAWN coordinates.
 *
 * The worked example is the unit square D = [0, 1] x [0, 1] with F = (P, Q) = (−y, x), traversed counter-clockwise:
 *   bottom edge (y = 0, left to right): F = (0, x) is perpendicular to the path, contribution 0
 *   right edge  (x = 1, upward):        F = (−y, 1), F·dr = 1 dy, contribution 1
 *   top edge    (y = 1, right to left): F = (−1, x), F·dr = −1 dx over x: 1 → 0, contribution 1
 *   left edge   (x = 0, downward):      F = (−y, 0) is perpendicular to the path, contribution 0
 * so ∮_C P dx + Q dy = 0 + 1 + 1 + 0 = 2, and ∬_D (∂Q/∂x − ∂P/∂y) dA = ∬ (1 − (−1)) dA = 2 × area 1 = 2.
 *
 * Colour roles keep their meaning: blue is the boundary curve C (the path), red the field F, green the result (the curl integrand
 * and the equal totals), violet a construction aid, slate the axes.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, label, dot } from './visualDesign'
import { P, NO_STAGE, framed, axes2, shadeConvex, type XY } from './mathSceneKit'

/** Screen position of the math origin and the length of one math unit. */
export const GR = { cx: -1.9, cy: -1.7, u: 3.3 } as const
export const fieldF = (x: number, y: number): [number, number] => [-y, x]   // F = (P, Q) = (−y, x)
export const dQdx = 1                                                       // ∂Q/∂x for Q = x
export const dPdy = -1                                                      // ∂P/∂y for P = −y
export const curlIntegrand = () => dQdx - dPdy                              // 2
/** The counter-clockwise path as four corners (math units), starting at the origin. */
export const CORNERS: ReadonlyArray<readonly [number, number]> = [[0, 0], [1, 0], [1, 1], [0, 1]]
/** Screen scale of the red field arrows (a field vector of length 1 is drawn this long). */
export const FIELD_SCALE = 0.85

const sx = (x: number) => GR.cx + GR.u * x
const sy = (y: number) => GR.cy + GR.u * y

/** Contribution of one edge: ∫ F·dr along the straight segment a → b (exact, F is linear so the midpoint rule is exact). */
export function edgeIntegral(a: readonly [number, number], b: readonly [number, number]): number {
  const m: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const f = fieldF(m[0], m[1])
  return f[0] * (b[0] - a[0]) + f[1] * (b[1] - a[1])
}
export const edges = () => CORNERS.map((a, i) => [a, CORNERS[(i + 1) % CORNERS.length]] as const)
export const circulation = () => edges().reduce((t, [a, b]) => t + edgeIntegral(a, b), 0)   // 2
export const regionArea = () => 1                                                             // the unit square
export const fluxOfCurl = () => curlIntegrand() * regionArea()                                // 2

/** KG: Green's theorem: ∮_C P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dA for a positively oriented simple closed curve C bounding D. */
export function buildGreensTheoremScene(): SceneSpec {
  return framed(raw_buildGreensTheoremScene())
}
function raw_buildGreensTheoremScene(): SceneSpec {
  const sq: XY[] = CORNERS.map(([x, y]) => [sx(x), sy(y)] as XY)
  const ax = axes2(sx(0), sy(0), sx(0) - 0.6, sx(1) + 1.1, sy(0) - 0.6, sy(1) + 1.1)
  const path = edges().map(([a, b]) => arrow(P(sx(a[0]), sy(a[1])), P(sx(b[0]), sy(b[1])), ROLE.output))
  const mids = edges().map(([a, b]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as const)
  const field = mids.map(([x, y]) => {
    const [fx, fy] = fieldF(x, y)
    return arrow(P(sx(x), sy(y)), P(sx(x) + FIELD_SCALE * fx, sy(y) + FIELD_SCALE * fy), ROLE.input)
  })
  const fmt = (v: number) => String(Math.round(v * 100) / 100)
  const parts = edges().map(([a, b]) => edgeIntegral(a, b))
  // value marks sit just outside each edge: below, right, above, left
  const marks: SceneObject[] = [
    label(fmt(parts[0]), P(sx(0.5) + 0.35, sy(0) - 0.42), ROLE.output, 'detail'),
    label(fmt(parts[1]), P(sx(1) + 0.4, sy(0.5) - 0.2), ROLE.output, 'detail'),
    label(fmt(parts[2]), P(sx(0.5) + 0.3, sy(1) + 0.4), ROLE.output, 'detail'),
    label(fmt(parts[3]), P(sx(0) - 0.4, sy(0.5) - 0.2), ROLE.output, 'detail'),
  ]
  const interior = [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]] as const
  return {
    id: 'math-greens-theorem',
    title: "Green's theorem: circulation around the edge = total curl inside",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show Green's theorem ∮_C P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dA for F = (−y, x) on the unit square traversed counter-clockwise: the four edges contribute 0 + 1 + 1 + 0 = 2, and the integrand ∂Q/∂x − ∂P/∂y = 1 − (−1) = 2 over area 1 gives 2 × 1 = 2.",
    ariaLabel:
      "A unit square on x and y axes, its edge drawn as four blue arrows going counter-clockwise: right along the bottom, up the right side, left along the top, down the left side. At the middle of each edge a red arrow shows the field F equals (minus y, x). The edge values 0, 1, 1 and 0 are written beside the edges and add to 2. Four green dots inside the square carry the value 2 of the curl integrand; the square has area 1, so the double integral is also 2.",
    stage: NO_STAGE,
    steps: [
      {
        narration: "The region D is the unit square (shaded) and its boundary C is the blue path, walked counter-clockwise so that D stays on your left: right along the bottom, up the right side, left along the top, down the left side. Green's theorem needs this positive orientation.",
        objects: [...ax, ...shadeConvex(sq, 0.55, ROLE.reference), ...path, label('D', P(sx(0.5), sy(0.5))), label('C', P(sx(1) + 0.45, sy(0) - 0.45)), label('1', P(sx(1), sy(0) - 0.4), ROLE.reference), label('1', P(sx(0) - 0.35, sy(1)), ROLE.reference), label('counter-clockwise', P(sx(0.5) - 0.2, sy(1) + 1.15), ROLE.output, 'detail')],
        intent: 'establish',
      },
      {
        narration: 'Take F = (−y, x) (red). Walk each edge and add up F·dr. Bottom: F points straight up, perpendicular to the path, so 0. Right side: F·dr = 1 dy, so 1. Top: F = (−1, x) and the path goes left, so 1. Left side: F is perpendicular again, so 0. The circulation is ∮_C P dx + Q dy = 0 + 1 + 1 + 0 = 2.',
        objects: [...field, ...marks, label('circulation = 0 + 1 + 1 + 0 = 2', P(sx(0.5) + 0.3, sy(0) - 1.25), ROLE.output, 'detail')],
        intent: 'relate',
      },
      {
        narration: 'Now ignore the edge and look inside. The integrand is ∂Q/∂x − ∂P/∂y = ∂x/∂x − ∂(−y)/∂y = 1 − (−1) = 2 at every point (green). Add it up over D: 2 × area 1 = 2. Both sides equal 2: the circulation around the edge equals the total curl inside.',
        objects: [...interior.map(([x, y]) => dot(P(sx(x), sy(y)), ROLE.result, 0.13)), label('2', P(sx(0.5) + 0.45, sy(0.5) + 0.38), ROLE.result, 'primary'), label('∂Q/∂x − ∂P/∂y = 2', P(sx(1) + 2.15, sy(0.5) + 0.9), ROLE.result, 'detail'), label('2 × area 1 = 2', P(sx(1) + 2.0, sy(0.5) - 0.6), ROLE.result, 'detail')],
        intent: 'resolve',
      },
    ],
  }
}
