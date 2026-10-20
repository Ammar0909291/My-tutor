/**
 * Core mathematics figures — batch 44 of the mathematics visual campaign (2026-10-20): Stokes' theorem.
 *
 * `math.calc.stokes-theorem` was served NO figure at all: a learner on the 2026-10-20 hard-concept run was told "I don't have a
 * picture for this one" for a theorem that is about a surface, its edge and the right-hand rule. Same rules as batches 1-43: one
 * visual language from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are free), three cumulative
 * steps, coordinates inside +-5, at most 50 objects per step, and every number drawn comes from the constants and pure helpers
 * exported here, which the test file re-derives independently from the DRAWN coordinates.
 *
 * The worked example is the one the lesson's own cards use: F = (−y, x, 0) on the upper unit hemisphere S, whose boundary C is the
 * unit circle in the xy-plane, traversed counter-clockwise because the outward normal n points up. Circulation ∮_C F·dr = 2π and
 * flux of the curl ∬_S (∇×F)·n dS = 2 × π = 2π.
 *
 * Colour roles keep their meaning: blue is the boundary curve, red the field being circulated, green the curl (the result),
 * violet the normal (a construction aid), slate the surface.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, label } from './visualDesign'
import { P, NO_STAGE, framed, type V3 } from './mathSceneKit'
import { oblique, type Obl } from './mathCoreScenesB20'

type Pt3 = readonly [number, number, number]

/** Oblique view of the unit hemisphere: the same projection family as the divergence-theorem figure. */
export const STK: Obl & { R: number } = { ox: 0, oy: -0.2, ux: 1.7, uz: 1.7, dxy: 0.9, dyy: 0.6, R: 1 }
/** F = (−y, x, 0) and its curl (0, 0, 2): the circulation and the flux both equal 2π. */
export const fieldF = (x: number, y: number): [number, number, number] => [-y, x, 0]
export const curlF: readonly [number, number, number] = [0, 0, 2]
export const circulation = () => 2 * Math.PI                       // ∮ (−y dx + x dy) over the unit circle = ∫ (sin²t + cos²t) dt
export const fluxOfCurl = () => curlF[2] * Math.PI                 // (∇×F)·n dS = 2 dx dy, and the disc under the hemisphere has area π
/** Where the red arrows stand on C, and where the green arrows stand under S (angles in degrees; base points of the curl arrows). */
export const FIELD_AT = [0, 90, 180, 270] as const
export const CURL_BASES: ReadonlyArray<readonly [number, number]> = [[0, 0], [0.5, 0], [-0.5, 0], [0, 0.5], [0, -0.5]]
export const ARROW_LEN = 0.45
export const CURL_RISE = 0.8
export const NORMAL_TIP = 1.55

const ring = (O: (p: Pt3) => V3, f: (t: number) => Pt3, n = 72): V3[] => Array.from({ length: n + 1 }, (_, i) => O(f((2 * Math.PI * i) / n)))
const meridian = (O: (p: Pt3) => V3, f: (t: number) => Pt3, n = 36): V3[] => Array.from({ length: n + 1 }, (_, i) => O(f((Math.PI * i) / n)))

/** KG: Stokes' theorem: the circulation of F around the boundary curve C equals the flux of curl F through a surface S bounded by C. */
export function buildStokesTheoremScene(): SceneSpec {
  return framed(raw_buildStokesTheoremScene())
}
function raw_buildStokesTheoremScene(): SceneSpec {
  const O = oblique(STK), { R } = STK
  const rim = curve(ring(O, (t) => [R * Math.cos(t), R * Math.sin(t), 0]), ROLE.output)
  const dome: SceneObject[] = [
    curve(meridian(O, (t) => [R * Math.cos(t), 0, R * Math.sin(t)]), ROLE.reference),
    curve(meridian(O, (t) => [0, R * Math.cos(t), R * Math.sin(t)]), ROLE.reference),
  ]
  const normal = arrow(O([0, 0, R]), O([0, 0, NORMAL_TIP]), ROLE.aid)
  const field = FIELD_AT.map((deg) => {
    const t = (deg * Math.PI) / 180
    const [fx, fy] = fieldF(R * Math.cos(t), R * Math.sin(t))
    return arrow(O([R * Math.cos(t), R * Math.sin(t), 0]), O([R * Math.cos(t) + ARROW_LEN * fx, R * Math.sin(t) + ARROW_LEN * fy, 0]), ROLE.input)
  })
  const curls = CURL_BASES.map(([x, y]) => arrow(O([x, y, 0]), O([x, y, CURL_RISE]), ROLE.result))
  return {
    id: 'math-stokes-theorem',
    title: "Stokes' theorem: circulation around the edge = flux of the curl through the surface",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show Stokes' theorem ∮_C F·dr = ∬_S (∇×F)·n dS for F = (−y, x, 0) on the upper unit hemisphere S bounded by the unit circle C: the outward normal n points up, so C runs counter-clockwise (right-hand rule); the circulation is ∫₀^{2π}(sin²t + cos²t) dt = 2π and the curl (0, 0, 2) gives a flux of 2 × π = 2π.",
    ariaLabel:
      "The upper unit hemisphere drawn as two grey half-circles in oblique perspective, standing on a blue circle, its boundary curve. A violet arrow at the top points up out of the dome, the normal n. Four red arrows lie along the blue circle pointing counter-clockwise, the field F, and five green arrows rise from the disc under the dome, the curl of F. Captions say the circulation around the edge and the flux of the curl through the surface are both 2π.",
    stage: NO_STAGE,
    steps: [
      {
        narration: 'The surface S is the upper unit hemisphere (grey) and its edge C the unit circle in the xy-plane (blue). The normal n (violet) points up and out of the dome. The right-hand rule ties them together: thumb along n, fingers curl counter-clockwise along C when seen from above.',
        objects: [...dome, rim, normal, label('S', P(-2.05, 1.4)), label('C', P(2.55, -0.5)), label('n', P(0.28, 2.43))],
        intent: 'establish',
      },
      {
        narration: 'Take F = (−y, x, 0). Along C it points counter-clockwise (red), exactly along the direction of travel with length 1, so the circulation is ∮_C F·dr = ∫₀^{2π} (sin²t + cos²t) dt = 2π.',
        objects: [...field, label('F', P(-2.9, -0.55)), label('circulation ∮ F·dr = 2π', P(0, -2.25))],
        intent: 'relate',
      },
      {
        narration: 'Inside, curl F = ∂x/∂x − ∂(−y)/∂y = 2 in the k direction: (0, 0, 2), constant and vertical (green). Only the part along n counts, and (curl F)·n dS = 2 dx dy, so the flux is 2 × (area of the disc under S) = 2 × π = 2π. Both sides equal 2π: the circulation around the edge equals the flux of the curl through the surface.',
        objects: [...curls, label('curl F = (0, 0, 2)', P(2.6, 1.35)), label('flux of curl = 2π', P(0, -2.95))],
        intent: 'resolve',
      },
    ],
  }
}
