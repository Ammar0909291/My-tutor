/**
 * phaseDiagram — a schematic pressure–temperature phase diagram.
 *
 * `chem.state.phase-diagram` used to be served a four-box text comparison ("Three regions / Boundary curves / Triple point /
 * Critical point"): the words of a phase diagram with no diagram. Measured in the 2026-10-08 chemistry audit as a
 * "prose-comparison"; its human review (semantic-review.json) passed it as correct but recorded that a learner never sees
 * the thing the lesson is about — a P–T plane carved into regions by three curves that meet at one point.
 *
 * This draws that plane. It is a SCHEMATIC, not to scale, drawn water-like (its melting curve leans left): the three boundary curves meet at one
 * triple point, the liquid–gas curve ends at the critical point, and beyond it the liquid and gas regions merge into a
 * supercritical fluid. The numbers (273.16 K, 612 Pa for water's triple point; CO₂ 304 K, 73 atm and water 647 K, 218 atm
 * for the critical points) stay in the tutor's prose and in the stage narration, which is where the old figure carried them.
 *
 * THE CONSISTENCY GUARANTEE. The curves are DERIVED from the two anchor points, never authored point by point: the
 * sublimation and vaporisation curves both start at the triple point, the vaporisation curve ends at the critical point, and
 * the fusion line rises from the triple point. `checkPhaseDiagramConsistency` re-derives that from the drawn objects, so a
 * figure whose curves do not meet at the triple point cannot ship.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

/** Plot area, scene units. */
const X0 = -9, X1 = 9, Y0 = -6, Y1 = 8
/** Triple point and critical point: the two anchors every curve is derived from. */
export const TRIPLE: Vec3 = [-2, -2, 0]
export const CRITICAL: Vec3 = [5.5, 4.5, 0]
/** The fusion (solid–liquid) line: steep, and for WATER (the substance whose triple point is quoted) leaning slightly left. */
const FUSION_TOP: Vec3 = [-3, Y1, 0]
const SAMPLES = 48

/** t in [0,1] along a convex power curve from `a` to `b` (pressure rises faster than temperature). */
function powerCurve(a: Vec3, b: Vec3, exponent: number): Vec3[] {
  const pts: Vec3[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    pts.push([round(a[0] + (b[0] - a[0]) * t), round(a[1] + (b[1] - a[1]) * Math.pow(t, exponent)), 0])
  }
  return pts
}

const SUBLIMATION_START: Vec3 = [-8, -5.6, 0]

export function buildPhaseDiagramScene(): SceneSpec {
  const sublimation = powerCurve(SUBLIMATION_START, TRIPLE, 1.7)
  const vaporisation = powerCurve(TRIPLE, CRITICAL, 1.6)

  const axes: SceneObject[] = [
    arrow([X0, Y0, 0], [X1 + 0.6, Y0, 0], ROLE.reference),
    arrow([X0, Y0, 0], [X0, Y1 + 0.6, 0], ROLE.reference),
    label('temperature, T', [X1 - 2.2, Y0 - 1.1, 0], ROLE.ink, 'detail'),
    label('pressure, P', [X0 + 1.4, Y1 + 1.4, 0], ROLE.ink, 'detail'),
  ]
  const regions: SceneObject[] = [
    label('solid', [-5.6, 3, 0], ROLE.ink, 'primary'),
    label('liquid', [1.8, 3, 0], ROLE.ink, 'primary'),
    label('gas', [4.2, -3.6, 0], ROLE.ink, 'primary'),
  ]
  const boundaries: SceneObject[] = [
    curve(sublimation, ROLE.aid),
    curve(vaporisation, ROLE.aid),
    line(TRIPLE, FUSION_TOP, ROLE.aid, 0.06),
    label('vaporisation', [2.6, -1.4, 0], ROLE.aid, 'detail'),
  ]
  const points: SceneObject[] = [
    dot(TRIPLE, ROLE.result, 0.22),
    label('triple point', [-4.4, -0.4, 0], ROLE.result, 'detail'),
    dot(CRITICAL, ROLE.result, 0.22),
    label('critical point', [7.2, 3.4, 0], ROLE.result, 'detail'),
    label('supercritical fluid', [7, 6.6, 0], ROLE.ink, 'detail'),
  ]

  return {
    id: 'phase-diagram-pt',
    title: 'Reading a Phase Diagram: Pressure against Temperature',
    sceneType: 'plot',
    teachingGoal: 'Every P–T point lies in one region (solid, liquid or gas); on a boundary curve two phases coexist; at the triple point all three do; beyond the critical point liquid and gas become one supercritical fluid.',
    cameraDistance: 19,
    ariaLabel: 'A schematic pressure–temperature phase diagram: solid, liquid and gas regions separated by three boundary curves that meet at the triple point, with the liquid–gas curve ending at the critical point beyond which lies a supercritical fluid.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A phase diagram is a map of pressure against temperature. Every point on it is one state of the substance.', objects: axes, intent: 'establish' },
      { narration: 'Three regions: solid at low temperature and high pressure, gas at high temperature and low pressure, liquid in between.', objects: regions, intent: 'relate' },
      { narration: 'Where two regions meet there is a boundary curve, and on it two phases coexist: solid–liquid is melting, solid–gas is sublimation (dry ice) and liquid–gas is vaporisation — read the boiling point from it. For water the melting curve leans slightly left, because ice is less dense than liquid water.', objects: boundaries, intent: 'vary' },
      { narration: 'The three curves meet at the triple point, where all three phases coexist (water: 273.16 K, 612 Pa). The liquid–gas curve ends at the critical point (CO₂: 304 K, 73 atm; water: 647 K, 218 atm), beyond which liquid and gas are one supercritical fluid.', objects: points, intent: 'resolve' },
    ],
  }
}

export function checkPhaseDiagramConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const paths = objects.filter((o) => o.type === 'path' && o.points)
  const near = (p: Vec3 | undefined, q: Vec3) => !!p && Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6
  const startsAt = (q: Vec3) => paths.some((o) => near(o.points![0], q))
  const endsAt = (q: Vec3) => paths.some((o) => near(o.points![o.points!.length - 1], q))
  if (!endsAt(TRIPLE)) errors.push('the sublimation curve does not end at the triple point')
  if (!startsAt(TRIPLE)) errors.push('the vaporisation curve does not start at the triple point')
  if (!endsAt(CRITICAL)) errors.push('the vaporisation curve does not end at the critical point')
  const fusion = objects.find((o) => o.type === 'bond' && near(o.from, TRIPLE))
  if (!fusion) errors.push('the fusion line does not start at the triple point')
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['solid', 'liquid', 'gas', 'triple point', 'critical point', 'supercritical fluid']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  return { ok: errors.length === 0, errors }
}
