/**
 * Core mathematics figures — batch 46 of the mathematics visual campaign (2026-11-03): Angle Measure and Right-Triangle Trigonometry.
 *
 * Both concepts were served the shared "Geometry Shapes" card (a triangle labelled "3 sides", a rectangle with "∠A + ∠B + ∠C = 180°" printed under it,
 * a circle): nothing about radians, nothing about sine, cosine or tangent, and the tutor then described the rectangle's "adjacent and opposite sides"
 * (learner run on Test6, 2026-11-03). Same rules as batches 1-45: one visual language from visualDesign.ts, labels are names (marks of 1-2 characters are
 * free), three cumulative steps, coordinates inside ±5, and every number drawn comes from the constants and pure helpers exported here, which the test
 * file re-derives from the DRAWN coordinates.
 *
 * Angle measure: a radian is the angle whose arc is as long as the radius, so s = rθ and one full turn is 2π radians = 360°, a half turn π = 180°.
 * Right-triangle trigonometry: the 3-4-5 right triangle, θ at the lower-left corner: sin θ = opposite ÷ hypotenuse = 3/5, cos θ = adjacent ÷ hypotenuse =
 * 4/5, tan θ = opposite ÷ adjacent = 3/4.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, label, line, curve, dot } from './visualDesign'
import { P, NO_STAGE, framed, axes2, arcPts, rightAngleMark } from './mathSceneKit'

// ── Angle measure ────────────────────────────────────────────────────────────

export const AM = { cx: -1.0, cy: 0.4, R: 2.5 } as const
/** The angle of the figure: exactly one radian, in degrees (57.2958…). */
export const ONE_RADIAN_DEG = 180 / Math.PI
const circlePts = (n = 64) => arcPts(AM.cx, AM.cy, AM.R, 0, 360, n)
/** The straight segment laid beside the circle to show the radius is the length of the arc (y below the circle). */
export const RULER_Y = AM.cy - AM.R - 0.75

export function buildAngleMeasureScene(): SceneSpec { return framed(raw_buildAngleMeasureScene()) }
function raw_buildAngleMeasureScene(): SceneSpec {
  const { cx, cy, R } = AM
  const tip = (deg: number): [number, number] => [cx + R * Math.cos((deg * Math.PI) / 180), cy + R * Math.sin((deg * Math.PI) / 180)]
  const [tx, ty] = tip(ONE_RADIAN_DEG)
  return {
    id: 'math-angle-measure',
    title: 'Angle measure: one radian is the angle whose arc is as long as the radius',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a radian is the angle at the centre whose arc equals the radius (s = rθ), so a half turn is π radians = 180° and a full turn is 2π radians = 360°.',
    ariaLabel: 'A circle of radius r with its centre on the horizontal axis. A radius lies along the positive x-axis and a second radius, an angle θ above it, ends on the circle. The arc between the two radii is drawn thick, and a straight segment of length r is laid below the circle to show that the arc is exactly as long as the radius: that angle is one radian, about 57 degrees. The point on the far left of the circle is half a turn, π radians or 180 degrees, and a full turn back to the start is 2π radians or 360 degrees.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'An angle measures a rotation. Put the centre of a circle of radius r at the vertex and start from the positive x-axis: the second ray turns counter-clockwise through the angle θ. You can say how far it turned in degrees (a full turn is 360) or in radians.',
        objects: [
          ...axes2(cx, cy, cx - R - 0.7, cx + R + 0.9, cy - R - 0.5, cy + R + 0.5),
          curve(circlePts(), ROLE.ink),
          line(P(cx, cy), P(cx + R, cy), ROLE.ink, 0.05),
          line(P(cx, cy), P(tx, ty), ROLE.ink, 0.05),
          curve(arcPts(cx, cy, 0.8, 0, ONE_RADIAN_DEG, 20), ROLE.aid),
          label('r', P(cx + R / 2, cy - 0.4), ROLE.ink, 'detail'),
          label('θ', P(cx + 1.15, cy + 0.55), ROLE.aid, 'detail'),
        ],
        intent: 'establish',
      },
      {
        narration: 'A radian is defined by the circle itself: it is the angle whose arc is exactly as long as the radius. The thick arc has length r, and the straight segment below, laid out flat, has length r too. That angle is 1 radian, about 57.3°. Arc length and angle are tied together by s = rθ, with θ in radians.',
        objects: [
          curve(arcPts(cx, cy, R, 0, ONE_RADIAN_DEG, 28), ROLE.output),
          dot(P(tx, ty), ROLE.output, 0.14),
          line(P(cx, RULER_Y), P(cx + R, RULER_Y), ROLE.output, 0.07),
          label('arc = r', P(tx + 1.0, ty + 0.35), ROLE.output, 'detail'),
          label('θ = 1 radian', P(cx + R + 2.9, cy - 0.9), ROLE.aid, 'detail'),
          label('r', P(cx + R / 2, RULER_Y - 0.45), ROLE.output, 'detail'),
        ],
        intent: 'relate',
      },
      {
        narration: 'Going all the way round, the arc is the whole circumference 2πr, so the angle is 2πr ÷ r = 2π radians, which is 360°. Half the way round is π radians, which is 180°. That is the conversion to remember: π radians = 180°.',
        objects: [
          curve(arcPts(cx, cy, R + 0.35, 0, 180, 40), ROLE.result),
          curve(arcPts(cx, cy, R + 0.35, 180, 360, 40), ROLE.aid),
          dot(P(cx - R, cy), ROLE.result, 0.15),
          label('π = 180°', P(cx - R - 1.15, cy + 0.65), ROLE.result, 'detail'),
          label('2π = 360°', P(cx + R + 1.5, cy + 0.65), ROLE.result, 'detail'),
        ],
        intent: 'resolve',
      },
    ],
  }
}

// ── Right-triangle trigonometry ──────────────────────────────────────────────

/** The 3-4-5 triangle: A lower-left (the angle θ), B lower-right (the right angle), C above B. One side unit is U scene units. */
export const RT = { ax: -3.6, ay: -1.6, adjacent: 4, opposite: 3, U: 1 } as const
export const rtPoints = () => ({
  A: [RT.ax, RT.ay] as const,
  B: [RT.ax + RT.adjacent * RT.U, RT.ay] as const,
  C: [RT.ax + RT.adjacent * RT.U, RT.ay + RT.opposite * RT.U] as const,
})
export const rtHypotenuse = () => Math.hypot(RT.adjacent, RT.opposite)       // 5
export const rtThetaDeg = () => (Math.atan2(RT.opposite, RT.adjacent) * 180) / Math.PI

export function buildRightTriangleTrigScene(): SceneSpec { return framed(raw_buildRightTriangleTrigScene()) }
function raw_buildRightTriangleTrigScene(): SceneSpec {
  const { A, B, C } = rtPoints()
  return {
    id: 'math-right-triangle-trig',
    title: 'Right-triangle trigonometry: sine, cosine and tangent are ratios of sides',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Name the three sides of a right triangle from the angle θ (opposite, adjacent, hypotenuse) and show sin θ = opposite ÷ hypotenuse, cos θ = adjacent ÷ hypotenuse and tan θ = opposite ÷ adjacent for the 3-4-5 triangle.',
    ariaLabel: 'A right triangle with the right angle at the lower right and the angle θ at the lower left. The longest side, facing the right angle, is the hypotenuse, 5. The vertical side facing θ is the opposite side, 3. The horizontal side touching θ is the adjacent side, 4. The sine of θ is opposite over hypotenuse, 3 over 5; the cosine is adjacent over hypotenuse, 4 over 5; the tangent is opposite over adjacent, 3 over 4.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'A right triangle has one 90° angle. Pick one of the other two angles, θ. The side across from θ is the OPPOSITE side, the side that touches θ (other than the longest one) is the ADJACENT side, and the side across from the right angle, the longest, is the HYPOTENUSE. Here they are 3, 4 and 5.',
        objects: [
          line(P(A[0], A[1]), P(B[0], B[1]), ROLE.input, 0.07),
          line(P(B[0], B[1]), P(C[0], C[1]), ROLE.output, 0.07),
          line(P(A[0], A[1]), P(C[0], C[1]), ROLE.ink, 0.07),
          ...rightAngleMark(B[0], B[1], [-1, 0], [0, 1], 0.4, ROLE.reference),
          curve(arcPts(A[0], A[1], 0.9, 0, rtThetaDeg(), 20), ROLE.aid),
          label('θ', P(A[0] + 1.3, A[1] + 0.3), ROLE.aid, 'detail'),
          label('adjacent', P((A[0] + B[0]) / 2, A[1] - 0.5), ROLE.input, 'detail'),
          label('opposite', P(B[0] + 1.1, (B[1] + C[1]) / 2), ROLE.output, 'detail'),
          label('hypotenuse', P((A[0] + C[0]) / 2 - 1.15, (A[1] + C[1]) / 2 + 0.45), ROLE.ink, 'detail'),
          label('4', P((A[0] + B[0]) / 2, A[1] + 0.35), ROLE.input, 'detail'),
          label('3', P(B[0] - 0.35, (B[1] + C[1]) / 2), ROLE.output, 'detail'),
          label('5', P((A[0] + C[0]) / 2 + 0.3, (A[1] + C[1]) / 2 - 0.2), ROLE.ink, 'detail'),
        ],
        intent: 'establish',
      },
      {
        narration: 'Sine and cosine compare a leg with the hypotenuse. sin θ = opposite ÷ hypotenuse = 3/5 = 0.6. cos θ = adjacent ÷ hypotenuse = 4/5 = 0.8. They depend only on the angle, not on how big the triangle is.',
        objects: [
          label('sin θ = 3/5', P(2.7, 1.3), ROLE.output, 'detail'),
          label('cos θ = 4/5', P(2.7, 0.2), ROLE.input, 'detail'),
        ],
        intent: 'relate',
      },
      {
        narration: 'Tangent compares the two legs: tan θ = opposite ÷ adjacent = 3/4 = 0.75. The same three ratios work for any right triangle with this angle θ.',
        objects: [label('tan θ = 3/4', P(2.7, -0.9), ROLE.result, 'detail'), dot(P(C[0], C[1]), ROLE.result, 0.12)],
        intent: 'resolve',
      },
    ],
  }
}
