/**
 * lacOperon — the lac operon drawn in its two states.
 *
 * `bio.mol.gene-regulation` used to be served a two-pin text comparison ("Lactose absent → Operon genes: OFF", "Lactose
 * present → Operon genes: ON"): the headline of the lesson with no operon in it. A learner on the 2026-10-20 hard-concept run
 * heard the tutor talk about the operator, the repressor and RNA polymerase while the figure showed two coloured pins — none
 * of the three was on the screen.
 *
 * This draws the mechanism. One strip of DNA per state, with the same layout in both (promoter, operator, then the three
 * structural genes lacZ · lacY · lacA):
 *   - lactose ABSENT (top): the repressor sits on the operator, and RNA polymerase at the promoter cannot move past it, so the
 *     genes are OFF and no mRNA is made;
 *   - lactose PRESENT (bottom): allolactose binds the repressor, the repressor leaves the operator, and RNA polymerase runs along
 *     the genes with an mRNA trailing from it, so the genes are ON.
 * Core understanding only (the lesson's Educational Brain entry): no CAP/cAMP, no catabolite repression.
 *
 * THE CONSISTENCY GUARANTEE. The state each panel claims is DERIVED from where its parts are drawn, never authored:
 * `checkLacOperonConsistency` re-derives that the absent panel's repressor lies on the operator and its polymerase on the
 * promoter with no mRNA, and that the present panel's repressor has left the operator, allolactose touches it, the polymerase
 * is on the genes and an mRNA starts at the polymerase. A figure whose geometry contradicts its OFF / ON caption cannot ship.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

/** x extents of the three DNA regions (identical in both panels), scene units. */
export const PROMOTER: [number, number] = [-9, -6]
export const OPERATOR: [number, number] = [-6, -3.4]
export const GENES: [number, number] = [-3.4, 9]
/** y of each panel's DNA strip. */
export const Y_ABSENT = 5
export const Y_PRESENT = -4.6

const DNA_THICKNESS = 0.22
const REPRESSOR_R = 0.85
const POLYMERASE_R = 0.8
const ALLOLACTOSE_R = 0.32

/** Where the parts sit. Absent: on the DNA. Present: the repressor is lifted clear, the polymerase is on the genes. */
export const ABSENT_REPRESSOR: Vec3 = [-4.7, Y_ABSENT + 1.15, 0]
export const ABSENT_POLYMERASE: Vec3 = [-7.5, Y_ABSENT + 1.15, 0]
export const PRESENT_REPRESSOR: Vec3 = [-4.7, Y_PRESENT + 2.5, 0]
export const PRESENT_ALLOLACTOSE: Vec3 = [-3.45, Y_PRESENT + 3.05, 0]
export const PRESENT_POLYMERASE: Vec3 = [0.8, Y_PRESENT + 1.15, 0]

function mrnaFrom(p: Vec3): Vec3[] {
  const pts: Vec3[] = []
  const n = 24
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pts.push([round(p[0] + 0.6 + 6.4 * t), round(p[1] + 0.2 + 3 * Math.sin((Math.PI / 2) * t) * t), 0])
  }
  return pts
}

function dnaStrip(y: number): SceneObject[] {
  return [
    line([PROMOTER[0], y, 0], [PROMOTER[1], y, 0], ROLE.aid, DNA_THICKNESS),
    line([OPERATOR[0], y, 0], [OPERATOR[1], y, 0], ROLE.input, DNA_THICKNESS),
    line([GENES[0], y, 0], [GENES[1], y, 0], ROLE.output, DNA_THICKNESS),
  ]
}

export function buildLacOperonScene(): SceneSpec {
  const absentDna: SceneObject[] = [
    ...dnaStrip(Y_ABSENT),
    label('lactose absent: genes OFF', [0, Y_ABSENT + 5.2, 0], ROLE.ink, 'primary'),
    label('promoter', [-7.5, Y_ABSENT - 1.1, 0], ROLE.aid, 'detail'),
    label('operator', [-4.7, Y_ABSENT - 1.1, 0], ROLE.input, 'detail'),
    label('lacZ · lacY · lacA', [3.2, Y_ABSENT - 1.1, 0], ROLE.output, 'detail'),
      ]
  const absentParts: SceneObject[] = [
    dot(ABSENT_REPRESSOR, ROLE.input, REPRESSOR_R),
    dot(ABSENT_POLYMERASE, ROLE.output, POLYMERASE_R),
    label('RNA polymerase', [-7.4, Y_ABSENT + 2.7, 0], ROLE.output, 'detail'),
    label('repressor', [-2.9, Y_ABSENT + 3.9, 0], ROLE.input, 'detail'),
  ]
  const presentDna: SceneObject[] = [
    ...dnaStrip(Y_PRESENT),
    label('lactose present: genes ON', [0, Y_PRESENT + 5.6, 0], ROLE.ink, 'primary'),
  ]
  const presentParts: SceneObject[] = [
    dot(PRESENT_REPRESSOR, ROLE.input, REPRESSOR_R),
    dot(PRESENT_ALLOLACTOSE, ROLE.result, ALLOLACTOSE_R),
    label('allolactose', [-2.2, Y_PRESENT + 3.9, 0], ROLE.result, 'detail'),
    dot(PRESENT_POLYMERASE, ROLE.output, POLYMERASE_R),
    curve(mrnaFrom(PRESENT_POLYMERASE), ROLE.result),
    label('mRNA', [7.6, Y_PRESENT + 3.5, 0], ROLE.result, 'detail'),
  ]

  return {
    id: 'lac-operon-two-states',
    title: 'The lac Operon: Negative-Feedback Regulation',
    sceneType: 'plot',
    teachingGoal: 'The operon switches off by default and switches on only when its specific substrate signal (lactose) is present.',
    cameraDistance: 22,
    ariaLabel: 'The lac operon in two states. Lactose absent: the repressor sits on the operator and blocks RNA polymerase at the promoter, so the genes lacZ, lacY and lacA are off. Lactose present: allolactose binds the repressor, which leaves the operator, and RNA polymerase transcribes the genes into mRNA.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'An operon is a strip of DNA: a promoter where RNA polymerase attaches, an operator that can be blocked, and the genes for using lactose (lacZ, lacY, lacA).', objects: absentDna, intent: 'establish' },
      { narration: 'Lactose absent: the repressor protein binds the operator and physically blocks RNA polymerase. No mRNA, so the lactose enzymes are not made. The default is OFF.', objects: absentParts, intent: 'relate' },
      { narration: 'Lactose present: allolactose binds the repressor and changes its shape, so it falls off the operator. RNA polymerase is free to transcribe the genes into mRNA. The operon is ON.', objects: [...presentDna, ...presentParts], intent: 'resolve' },
    ],
  }
}

const near = (p: Vec3 | undefined, q: Vec3) => !!p && Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6
const within = (x: number, [a, b]: [number, number]) => x >= a && x <= b

export function checkLacOperonConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const nodes = objects.filter((o) => o.type === 'node' && o.position)
  const has = (q: Vec3) => nodes.some((o) => near(o.position, q))

  if (!within(ABSENT_REPRESSOR[0], OPERATOR)) errors.push('lactose absent: the repressor is not on the operator')
  if (!within(ABSENT_POLYMERASE[0], PROMOTER)) errors.push('lactose absent: RNA polymerase is not at the promoter')
  if (ABSENT_REPRESSOR[0] <= ABSENT_POLYMERASE[0]) errors.push('lactose absent: the repressor is not between the polymerase and the genes')
  if (within(PRESENT_REPRESSOR[0], OPERATOR) && PRESENT_REPRESSOR[1] - Y_PRESENT < 2) errors.push('lactose present: the repressor is still on the operator')
  if (Math.hypot(PRESENT_ALLOLACTOSE[0] - PRESENT_REPRESSOR[0], PRESENT_ALLOLACTOSE[1] - PRESENT_REPRESSOR[1]) > REPRESSOR_R + ALLOLACTOSE_R + 0.2) errors.push('lactose present: allolactose does not touch the repressor')
  if (!within(PRESENT_POLYMERASE[0], GENES)) errors.push('lactose present: RNA polymerase is not on the genes')
  for (const [name, q] of [['absent repressor', ABSENT_REPRESSOR], ['absent polymerase', ABSENT_POLYMERASE], ['present repressor', PRESENT_REPRESSOR], ['present allolactose', PRESENT_ALLOLACTOSE], ['present polymerase', PRESENT_POLYMERASE]] as const) {
    if (!has(q)) errors.push(`the ${name} is not drawn where the state requires`)
  }

  const paths = objects.filter((o) => o.type === 'path' && o.points)
  const mrna = paths.filter((o) => o.points![0][1] > Y_PRESENT && o.points![0][1] < Y_PRESENT + 2)
  if (mrna.length !== 1) errors.push(`expected one mRNA transcript in the present panel, found ${mrna.length}`)
  else if (!within(mrna[0].points![0][0], [PRESENT_POLYMERASE[0], PRESENT_POLYMERASE[0] + 1.5])) errors.push('the mRNA does not start at the polymerase')
  if (paths.some((o) => o.points![0][1] > Y_ABSENT)) errors.push('lactose absent: an mRNA is drawn although the operon is off')

  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['lactose absent: genes OFF', 'lactose present: genes ON', 'promoter', 'operator', 'repressor', 'RNA polymerase', 'allolactose', 'mRNA', 'lacZ']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  return { ok: errors.length === 0, errors }
}
