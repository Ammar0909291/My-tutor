/**
 * cancerHallmarksLocks — `bio.cell.cancer-biology-hallmarks` drawn as the idea the lesson turns on: a cell has to get past SEVERAL independent safeguards.
 *
 * The concept was served a hub: "Hallmarks of Cancer" in the middle and seven names around it (learner run, 2026-10-21, rated 5.5). A hub says "these
 * belong together" and nothing else; two of its labels touched, and it cannot show the thing the Educational Brain entry calls "the essential,
 * often-missed point": ONE hallmark is generally insufficient, because the body's safeguards are redundant, so a cell must accumulate several.
 * Its own mental model is "multiple independent locks". This draws that:
 *
 *   five walls across a corridor, each a normal safeguard — growth signals (a cell divides only when told to), tumour suppressors (p53, Rb: the
 *   internal STOP), apoptosis (programmed self-destruction), the division limit (telomeres), adhesion (cells stay where they belong) — each defeated by
 *   one hallmark (sustained proliferative signalling, evasion of growth suppressors, resistance to apoptosis, replicative immortality, invasion and
 *   metastasis); a cell that gets through ONE wall is contained; a tumour that has gone through all five is malignant. The other two hallmarks,
 *   angiogenesis induction and metabolic reprogramming, are the supply side (blood vessels; the Warburg shift) and are in the narration, not walls.
 *
 * `checkCancerHallmarksConsistency` re-derives the claims from the drawn geometry: five walls; the breach drawn after step 1 crosses exactly ONE wall and stops
 * before the next; the final breach crosses all five and ends beyond the last; the "contained" label sits in the gap the first breach ended in.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'

export const WALL_X = [-7.2, -3.6, 0, 3.6, 7.2] as const
/** The safeguard each wall is, named as the lesson names it. */
export const SAFEGUARDS = ['growth signals', 'tumour suppressors', 'apoptosis', 'division limit', 'adhesion'] as const
export const WALL_HALF_HEIGHT = 2.6
export const PATH_Y = 0
export const START_X = -9.8
/** Step 2: the first breach, through wall 1 only, stopping short of wall 2. Step 3: it carries on through all the others. */
export const FIRST_BREACH_END_X = -5.4
export const FINAL_END_X = 9.6

export function buildCancerHallmarksScene(): SceneSpec {
  const walls: SceneObject[] = WALL_X.flatMap((x, i): SceneObject[] => [
    line([x, -WALL_HALF_HEIGHT, 0], [x, WALL_HALF_HEIGHT, 0], ROLE.reference, 0.26),
    label(SAFEGUARDS[i], [x, i % 2 === 0 ? WALL_HALF_HEIGHT + 1.6 : -WALL_HALF_HEIGHT - 1.6, 0], ROLE.ink, 'detail'),
  ])
  const cell: SceneObject[] = [
    dot([START_X, PATH_Y, 0], ROLE.output, 0.45),
    label('normal cell', [START_X + 0.4, -WALL_HALF_HEIGHT - 1.6, 0], ROLE.output, 'detail'),
  ]
  const one: SceneObject[] = [
    { ...arrow([START_X, PATH_Y, 0], [FIRST_BREACH_END_X, PATH_Y, 0], ROLE.input), thickness: 0.14 },
    dot([WALL_X[0], PATH_Y, 0], ROLE.input, 0.3),
    label('contained', [FIRST_BREACH_END_X, 1.2, 0], ROLE.input, 'detail'),
  ]
  const all: SceneObject[] = [
    { ...arrow([FIRST_BREACH_END_X, PATH_Y, 0], [FINAL_END_X, PATH_Y, 0], ROLE.input), thickness: 0.14 },
    ...WALL_X.slice(1).map((x) => dot([x, PATH_Y, 0], ROLE.input, 0.3)),
    label('malignant', [FINAL_END_X, 1.2, 0], ROLE.result, 'detail'),
  ]
  return {
    id: 'cancer-hallmarks-independent-locks',
    title: 'Hallmarks of Cancer: Several Independent Safeguards, All Defeated',
    sceneType: 'plot',
    teachingGoal: 'Each hallmark is the failure of a different normal safeguard, and a cell with only one hallmark is contained: a tumour becomes malignant by getting past several.',
    cameraDistance: 15,
    ariaLabel: 'A corridor with five walls in a row, each a normal safeguard of the cell: growth signals, tumour suppressors, apoptosis, the division limit and adhesion. A cell starts at the left. A red arrow breaks through the first wall and stops in front of the second, labelled contained. The arrow then continues through all the other walls to the right-hand end, labelled malignant.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A normal cell is held in by independent safeguards, like locks in a row: it divides only when growth signals tell it to; tumour suppressors such as p53 and Rb are its internal STOP; apoptosis removes damaged cells; telomeres limit how many times it can divide; adhesion keeps it where it belongs.', objects: [...walls, ...cell], intent: 'establish' },
      { narration: 'Each hallmark of cancer is the failure of ONE of these, a different one each time: sustained proliferative signalling, evasion of growth suppressors, resistance to apoptosis, replicative immortality, invasion and metastasis. A cell that has gone through just one is generally contained, because the other safeguards are still in place.', objects: one, intent: 'relate' },
      { narration: 'A tumour becomes malignant by getting past several, one successive mutation at a time. Angiogenesis induction (new blood vessels) and metabolic reprogramming (favouring glycolysis even with oxygen, the Warburg effect) then feed it. Cancer is a multi-step accumulation, not one catastrophic event.', objects: all, intent: 'resolve' },
    ],
  }
}

export function checkCancerHallmarksConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const steps = spec.steps
  const objects = steps.flatMap((s) => s.objects)
  const walls = objects.filter((o) => o.type === 'bond' && o.from && o.to && Math.abs(o.from[0] - o.to[0]) < 1e-9 && Math.abs(o.to[1] - o.from[1]) > 1)
  if (walls.length !== SAFEGUARDS.length) return { ok: false, errors: [`the figure must draw ${SAFEGUARDS.length} walls (found ${walls.length})`] }
  const xs = walls.map((w) => w.from![0]).sort((a, b) => a - b)
  const crossed = (a: SceneObject) => xs.filter((x) => x > Math.min(a.from![0], a.to![0]) && x < Math.max(a.from![0], a.to![0])).length
  const breaches = steps.map((s) => s.objects.filter((o) => o.type === 'arrow' && o.from && o.to))
  const first = breaches[1]?.[0], rest = breaches[2]?.[0]
  if (!first || !rest) return { ok: false, errors: ['the figure must draw a first breach (step 2) and the rest of the way (step 3)'] }
  if (crossed(first) !== 1) errors.push(`after one hallmark the breach must cross exactly ONE wall (it crosses ${crossed(first)}): one hallmark is not enough`)
  if (Math.abs(first.to![0] - rest.from![0]) > 1e-9) errors.push('the later breach does not start where the first one stopped')
  if (crossed(first) + crossed(rest) !== xs.length) errors.push(`the breach must end up through all ${xs.length} walls (${crossed(first) + crossed(rest)} crossed)`)
  if (!(rest.to![0] > xs[xs.length - 1])) errors.push('the malignant end of the breach is not beyond the last wall')
  if (!(first.to![0] < xs[1])) errors.push('the first breach runs on past the second wall')
  const text = (i: number) => steps[i]?.objects.map((o) => o.text ?? '').join(' | ') ?? ''
  const stillAt = steps[1]?.objects.find((o) => o.type === 'label' && o.text === 'contained')
  if (!stillAt || !(stillAt.position![0] > xs[0] && stillAt.position![0] < xs[1])) errors.push('"contained" is not placed between the first and second walls')
  const malignantAt = steps[2]?.objects.find((o) => o.type === 'label' && o.text === 'malignant')
  if (!malignantAt || !(malignantAt.position![0] > xs[xs.length - 1])) errors.push('"malignant" is not placed beyond the last wall')
  for (const name of SAFEGUARDS) if (!text(0).includes(name)) errors.push(`the safeguard "${name}" is not named`)
  if (!text(0).includes('normal cell')) errors.push('the starting cell is not labelled')
  return { ok: errors.length === 0, errors }
}
