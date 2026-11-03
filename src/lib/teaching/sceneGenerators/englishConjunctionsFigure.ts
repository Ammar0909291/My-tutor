/**
 * englishConjunctionsFigure — `eng.grammar.conjunctions` drawn as the distinction the lesson turns on: EQUAL versus DEPENDENT.
 *
 * The concept served no figure. A learner who asked for a diagram was told "I don't have a picture for this one, so I'll explain it in words", and
 * the reply then drew an ASCII table and described its "left side" and "right side" — a figure that did not exist (learner run on Test6, 2026-11-03).
 * The Educational Brain entry's own picture is "the equal-bridge versus the leaning-bridge" (its Mental Models): coordinating conjunctions (and, but, or, so)
 * join two EQUAL, independent clauses, each able to stand alone, with a comma before the conjunction; subordinating conjunctions (because, although,
 * when, if, since, while) join a DEPENDENT clause to an independent one, and the comma goes after a fronted dependent clause.
 *
 *   left   two bars of the SAME length, one bridge between them: both independent;
 *   right  a long bar (independent) and a shorter one that leans on it (dependent).
 *
 * Faithfulness policy as for the other English figures: every word is one the concept's own sources use, every claim is one they make, and there is no
 * number. `checkConjunctionsConsistency` re-derives the structure from the drawn geometry: the two coordinated bars are equal; the subordinated pair is
 * unequal, the dependent one the shorter, and the leaning arrow runs from the dependent bar to the independent one.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'

const BAR_T = 0.5
export const BARS = {
  /** coordinating: two equal bars on one row, a bridge between them */
  left: [{ y: 2.6, x0: -11, x1: -7.4 }, { y: 2.6, x0: -5.4, x1: -1.8 }],
  /** subordinating: an independent bar, and a shorter dependent one below it that leans on it */
  independent: { y: 2.6, x0: 3.2, x1: 9.2 },
  dependent: { y: -1.2, x0: 5.8, x1: 9.2 },
} as const
const barLen = (b: { x0: number; x1: number }) => b.x1 - b.x0
export const COORDINATING_LABELS = ['both independent', 'and, but, or, so', 'comma before'] as const
export const SUBORDINATING_LABELS = ['independent', 'dependent', 'because, although', 'comma after if first'] as const

const bar = (b: { y: number; x0: number; x1: number }, color: string): SceneObject => line([b.x0, b.y, 0], [b.x1, b.y, 0], color, BAR_T)

export function buildConjunctionsScene(): SceneSpec {
  const [l1, l2] = BARS.left
  const coordinating: SceneObject[] = [
    label('coordinating', [-6.2, 6.8, 0], ROLE.ink, 'detail'),
    bar(l1, ROLE.output), bar(l2, ROLE.output),
    arrow([l1.x1 + 0.1, l1.y, 0], [l2.x0 - 0.1, l2.y, 0], ROLE.result),
    label('both independent', [-6.2, 4.6, 0], ROLE.output, 'detail'),
    label('and, but, or, so', [-6.2, 0.5, 0], ROLE.result, 'detail'),
  ]
  const comma: SceneObject[] = [
    label(',', [l1.x1 + 0.2, l1.y - 0.9, 0], ROLE.input, 'heading'),
    label('comma before', [-6.2, -3.4, 0], ROLE.input, 'detail'),
  ]
  const subordinating: SceneObject[] = [
    label('subordinating', [6.2, 6.8, 0], ROLE.ink, 'detail'),
    bar(BARS.independent, ROLE.output), bar(BARS.dependent, ROLE.aid),
    arrow([BARS.dependent.x0 + 1.7, BARS.dependent.y + 0.35, 0], [BARS.dependent.x0 + 1.7, BARS.independent.y - 0.35, 0], ROLE.result),
    label('independent', [BARS.independent.x0 + 3, 4.6, 0], ROLE.output, 'detail'),
    label('dependent', [BARS.dependent.x0 + 1.7, -2.7, 0], ROLE.aid, 'detail'),
    label('because, although', [3.5, 0.7, 0], ROLE.result, 'detail'),
  ]
  const subComma: SceneObject[] = [
    label(',', [BARS.dependent.x1 + 0.45, BARS.dependent.y - 0.35, 0], ROLE.input, 'heading'),
    label('comma after if first', [6.2, -4.7, 0], ROLE.input, 'detail'),
  ]
  return {
    id: 'conjunctions-equal-and-dependent',
    title: 'Conjunctions: equal clauses and dependent clauses',
    sceneType: 'diagram',
    cameraDistance: 15,
    teachingGoal: 'Coordinating conjunctions join two equal, independent clauses; subordinating conjunctions join a dependent clause to an independent one, and the comma goes before the first and after a fronted dependent clause.',
    ariaLabel: 'Two pictures side by side. On the left, coordinating conjunctions: two bars of equal length, both independent clauses, with a bridge between them for and, but, or, so, and a comma before the conjunction. On the right, subordinating conjunctions: a long bar, the independent clause, and a shorter bar below it, the dependent clause, leaning on it by a because, although or if; a comma comes after a dependent clause that goes first.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Coordinating conjunctions (and, but, or, so) join two EQUAL ideas, each an independent clause that could stand alone as a complete sentence: the equal-bridge.', objects: coordinating, intent: 'establish' },
      { narration: 'Subordinating conjunctions (because, although, when, if, since, while) are different: they make one clause DEPENDENT, one that cannot stand alone, and join it to an independent clause: the leaning-bridge.', objects: subordinating, intent: 'relate' },
      { narration: 'Commas follow the type. Put a comma before a coordinating conjunction that joins two independent clauses. With a subordinating conjunction, the comma goes after the dependent clause when it comes first, and is typically omitted when it follows.', objects: [...comma, ...subComma], intent: 'resolve' },
    ],
  }
}

export function checkConjunctionsConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const bars = objects.filter((o) => o.type === 'bond' && o.from && o.to && Math.abs(o.from[1] - o.to[1]) < 1e-9 && Math.abs(o.to[0] - o.from[0]) > 2)
  const len = (o: SceneObject) => Math.abs(o.to![0] - o.from![0])
  if (bars.length !== 4) return { ok: false, errors: [`the figure must draw four clause bars (found ${bars.length})`] }
  const left = bars.filter((o) => o.from![0] < 0), right = bars.filter((o) => o.from![0] >= 0)
  if (left.length !== 2 || right.length !== 2) return { ok: false, errors: ['two bars belong on each side'] }
  if (Math.abs(len(left[0]) - len(left[1])) > 1e-6) errors.push('the two coordinated clauses are not equal: they must be drawn the same length')
  const [indep, dep] = [...right].sort((a, b) => b.from![1] - a.from![1])
  if (!(len(indep) > len(dep) + 0.5)) errors.push('the dependent clause must be drawn shorter than the independent clause it leans on')
  if (!(dep.from![1] < indep.from![1])) errors.push('the dependent clause is not below the independent one')
  const arrows = objects.filter((o) => o.type === 'arrow' && o.from && o.to)
  const lean = arrows.find((a) => Math.abs(a.from![0] - a.to![0]) < 1e-9 && a.to![1] > a.from![1] && a.from![0] > dep.from![0] && a.from![0] < dep.to![0])
  if (!lean) errors.push('the dependent clause must lean on the independent one: an arrow from the dependent bar up to the independent bar')
  const bridge = arrows.find((a) => Math.abs(a.from![1] - a.to![1]) < 1e-9 && a.from![0] >= left[0].to![0] - 0.2 && a.to![0] <= left[1].from![0] + 0.2)
  if (!bridge) errors.push('the two coordinated clauses must be joined by a bridge between them')
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of [...COORDINATING_LABELS, ...SUBORDINATING_LABELS, 'coordinating', 'subordinating']) if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  return { ok: errors.length === 0, errors }
}
