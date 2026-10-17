/**
 * Core school-mathematics figures — batch 43 of the mathematics visual campaign
 * (2026-10-17): the unit circle.
 *
 * `math.trig.unit-circle` was served the geometry domain's shared overview card because it had no figure of its own
 * (owner decision Q1 in review-dispositions.json). Same rules as batches 1-42: one visual language from visualDesign.ts,
 * labels are names not sentences (marks of 1-2 characters are free), three cumulative steps, coordinates inside +-5, at most
 * 50 objects per step, and every number drawn comes from the constants and pure helpers exported here, which the test file
 * re-derives independently from the DRAWN coordinates.
 *
 * Colour roles keep their meaning: red is the horizontal coordinate (cos), blue the vertical coordinate (sin), green the
 * point/result, violet is a construction aid, slate is axes and inert reference geometry.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, axes2, arcPts } from './mathSceneKit'

const rad = (deg: number) => (deg * Math.PI) / 180
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const minus = (s: string) => s.replace('-', '−')
const circle = (cx: number, cy: number, r: number, color: string): SceneObject => curve(arcPts(cx, cy, r, 0, 360, 96), color)

/**
 * Unit circle drawn with radius R screen units about (cx, cy) = the origin. First point P at 30 degrees, second point Q at
 * 150 degrees. The value labels sit OUTSIDE the circle, beside the foot of each leg: a label of 12-16 characters is wider
 * than one quadrant of the circle, so inside it would cross the axes or the outline.
 */
export const UC = { R: 2.2, cx: 0, cy: 0, first: 30, second: 150 } as const
export const ucPoint = (deg: number) => ({ x: Math.cos(rad(deg)), y: Math.sin(rad(deg)) })

/** KG: "The circle of radius 1 centered at the origin; defines sin θ and cos θ as the y and x coordinates of the point at angle θ, extending trig to all real angles." */
export function buildUnitCircleScene(): SceneSpec {
  return framed(raw_buildUnitCircleScene())
}
function raw_buildUnitCircleScene(): SceneSpec {
  const { R, cx, cy, first, second } = UC
  const p = ucPoint(first), q = ucPoint(second)
  const px = cx + R * p.x, py = cy + R * p.y
  const qx = cx + R * q.x, qy = cy + R * q.y
  return {
    id: 'math-unit-circle',
    title: 'The unit circle: the point at angle θ is (cos θ, sin θ)',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the unit circle as the circle of radius 1 about the origin, where the point at angle θ has x-coordinate cos θ and y-coordinate sin θ, so the same rule works for angles beyond 90 degrees, where cos becomes negative.',
    ariaLabel:
      'A circle of radius 1 centred at the origin with the x and y axes marked at 1 and minus 1. A radius at an angle of 30 degrees from the positive x-axis ends at the point P, whose horizontal coordinate is cos 30 degrees, about 0.87, and whose height is sin 30 degrees, which is 0.5. A second radius at 150 degrees ends at the point Q, on the other side of the vertical axis, with horizontal coordinate cos 150 degrees, about minus 0.87, and the same height 0.5.',
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The unit circle has radius 1 and its centre at the origin, so every point (x, y) on it satisfies x² + y² = 1. An angle θ is measured from the positive x-axis, counter-clockwise. Here θ = 30°, and the radius at that angle ends at the point P.',
        objects: [
          ...axes2(cx, cy, cx - R - 0.6, cx + R + 0.6, cy - R - 0.6, cy + R + 0.6),
          circle(cx, cy, R, ROLE.ink),
          line(P(cx, cy), P(px, py), ROLE.ink, 0.05),
          curve(arcPts(cx, cy, 0.7, 0, first, 20), ROLE.aid),
          label('1', P(cx + R + 0.25, cy + 0.5), ROLE.reference, 'detail'),
          label('1', P(cx - 0.3, cy + R + 0.3), ROLE.reference, 'detail'),
          label('−1', P(cx - R - 0.3, cy + 0.5), ROLE.reference, 'detail'),
          label('−1', P(cx + 0.45, cy - R - 0.3), ROLE.reference, 'detail'),
          label(`${first}°`, P(cx + 0.8, cy + 1.05), ROLE.aid, 'detail'),
          label('x² + y² = 1', P(cx + 3.3, cy - 1.6), ROLE.ink, 'detail'),
        ],
      },
      {
        narration: `The x-coordinate of P is the horizontal distance from the centre: cos θ = ${f2(p.x)}. The y-coordinate is its height: sin θ = ${f2(p.y)}. So P = (cos θ, sin θ); the angle fixes the point, and the point gives both numbers.`,
        objects: [
          line(P(cx, cy), P(px, cy), ROLE.input, 0.07),
          line(P(px, cy), P(px, py), ROLE.output, 0.07),
          dot(P(px, py), ROLE.result, 0.15),
          label(`cos θ = ${f2(p.x)}`, P(cx + 3.55, cy - 0.42), ROLE.input, 'detail'),
          label(`sin θ = ${f2(p.y)}`, P(cx + 3.55, cy + 1.05), ROLE.output, 'detail'),
          label('P', P(px + 0.2, py + 0.4), ROLE.result, 'primary'),
        ],
      },
      {
        narration: `The same rule works past 90°. At θ = ${second}° the radius ends at Q, on the left of the vertical axis, so cos ${second}° = ${minus(f2(q.x))} is negative, while the height is still sin ${second}° = ${f2(q.y)}. This is how the unit circle extends sine and cosine to every angle, not just the angles inside a triangle.`,
        objects: [
          curve(arcPts(cx, cy, 0.45, 0, second, 40), ROLE.aid),
          line(P(cx, cy), P(qx, qy), ROLE.ink, 0.05),
          line(P(cx, cy), P(qx, cy), ROLE.input, 0.07),
          line(P(qx, cy), P(qx, qy), ROLE.output, 0.07),
          dot(P(qx, qy), ROLE.result, 0.15),
          label(`${second}°`, P(cx - 1.0, cy + 1.3), ROLE.aid, 'detail'),
          label(`cos ${second}° = ${minus(f2(q.x))}`, P(cx - 3.85, cy - 0.42), ROLE.input, 'detail'),
          label(`sin ${second}° = ${f2(q.y)}`, P(cx - 3.6, cy + 1.05), ROLE.output, 'detail'),
          label('Q', P(qx - 0.2, qy + 0.4), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}
