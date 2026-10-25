/**
 * moDiagram — the molecular-orbital energy-level diagram for H₂.
 *
 * `chem.bond.mo-theory` used to be served a generated six-box procedure flowchart ("Identify atomic orbitals → Combine →
 * Order → Fill → Bond order → Predict magnetism"): the STEPS of building an MO diagram with no diagram. A learner on the
 * 2026-10-20 hard-concept run got that flowchart and never saw the thing the lesson is about — two atomic orbitals on the
 * outside, a bonding and an antibonding molecular orbital between them, and the electrons filling from the bottom.
 *
 * This draws it for the simplest case, H₂: each hydrogen's 1s orbital (one electron each) on the outside, the lower
 * bonding σ and the higher antibonding σ* in the middle, joined by the four combination lines, and the two electrons
 * paired in σ. Bond order = (bonding − antibonding) / 2 = (2 − 0) / 2 = 1. The narration extends the same picture to He₂
 * (four electrons fill σ and σ*, bond order 0, no stable molecule) and to O₂'s unpaired π* electrons, which are the two
 * outcomes the lesson's own cards ask about.
 *
 * THE CONSISTENCY GUARANTEE. The bond order written on the figure is DERIVED from the drawn electrons, never authored:
 * `moBondOrder` counts the spin arrows sitting on the σ and σ* levels, and `checkMoDiagramConsistency` re-derives that
 * the level order is σ < 1s < σ*, that σ holds two arrows pointing opposite ways (Pauli) and that the printed number is
 * what those arrows give. A figure whose electrons disagree with its bond order cannot ship.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'

/** Energy of each level (scene y), and the x extent of the atomic and molecular levels. */
export const E_BONDING = -2
export const E_AO = 1
export const E_ANTIBONDING = 4
const AO_LEFT: [number, number] = [-8, -5]
const AO_RIGHT: [number, number] = [5, 8]
const MO_X: [number, number] = [-1.5, 1.5]
const AXIS_X = -9.2

/** A spin arrow standing on a level: up = +1, down = −1. */
function spin(x: number, level: number, up: boolean): SceneObject {
  const a: Vec3 = [x, level - 0.8, 0]
  const b: Vec3 = [x, level + 0.8, 0]
  return up ? arrow(a, b, ROLE.result) : arrow(b, a, ROLE.result)
}

export function buildMoDiagramScene(): SceneSpec {
  const axis: SceneObject[] = [
    arrow([AXIS_X, -5, 0], [AXIS_X, 6.6, 0], ROLE.reference),
    label('energy', [AXIS_X + 1.1, 6.9, 0], ROLE.ink, 'detail'),
  ]
  const atomic: SceneObject[] = [
    line([AO_LEFT[0], E_AO, 0], [AO_LEFT[1], E_AO, 0], ROLE.output, 0.07),
    line([AO_RIGHT[0], E_AO, 0], [AO_RIGHT[1], E_AO, 0], ROLE.output, 0.07),
    label('H 1s', [-6.5, E_AO - 2.1, 0], ROLE.output, 'detail'),
    label('H 1s', [6.5, E_AO - 2.1, 0], ROLE.output, 'detail'),
  ]
  const molecular: SceneObject[] = [
    line([MO_X[0], E_BONDING, 0], [MO_X[1], E_BONDING, 0], ROLE.input, 0.07),
    line([MO_X[0], E_ANTIBONDING, 0], [MO_X[1], E_ANTIBONDING, 0], ROLE.input, 0.07),
    line([AO_LEFT[1], E_AO, 0], [MO_X[0], E_BONDING, 0], ROLE.aid, 0.03),
    line([AO_RIGHT[0], E_AO, 0], [MO_X[1], E_BONDING, 0], ROLE.aid, 0.03),
    line([AO_LEFT[1], E_AO, 0], [MO_X[0], E_ANTIBONDING, 0], ROLE.aid, 0.03),
    line([AO_RIGHT[0], E_AO, 0], [MO_X[1], E_ANTIBONDING, 0], ROLE.aid, 0.03),
    label('σ* antibonding', [0, E_ANTIBONDING + 1.1, 0], ROLE.input, 'detail'),
    label('σ bonding', [0, E_BONDING - 1.4, 0], ROLE.input, 'detail'),
  ]
  const electrons: SceneObject[] = [
    spin(-6.5, E_AO, true),
    spin(6.5, E_AO, false),
    spin(-0.55, E_BONDING, true),
    spin(0.55, E_BONDING, false),
  ]
  const result: SceneObject[] = [
    label('bond order = (2 − 0) / 2 = 1', [0, -5.2, 0], ROLE.result, 'primary'),
  ]

  return {
    id: 'mo-diagram-h2',
    title: 'Molecular Orbital Diagram of H₂',
    sceneType: 'plot',
    teachingGoal: 'Two atomic orbitals combine into one lower-energy bonding and one higher-energy antibonding molecular orbital; electrons fill from the bottom, and bond order = (bonding − antibonding electrons) / 2.',
    cameraDistance: 17,
    ariaLabel: 'An energy-level diagram: each hydrogen 1s atomic orbital on the outside, a lower bonding sigma orbital and a higher antibonding sigma-star orbital between them joined by lines, with the two electrons paired in the bonding orbital, giving bond order 1.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Energy runs up the page. Each hydrogen atom brings one 1s atomic orbital, drawn at the same height on the left and the right.', objects: [...axis, ...atomic], intent: 'establish' },
      { narration: 'Two atomic orbitals combine into two molecular orbitals. In phase, they add: σ, lower in energy than either atom (bonding). Out of phase, they cancel between the nuclei: σ*, higher in energy (antibonding).', objects: molecular, intent: 'relate' },
      { narration: 'Electrons fill from the bottom, one orbital at a time with opposite spins (Pauli). H₂ has two electrons and both sit in σ, so the molecule is lower in energy than two separate atoms.', objects: electrons, intent: 'vary' },
      { narration: 'Bond order = (bonding electrons − antibonding electrons) / 2 = (2 − 0) / 2 = 1: a single bond. For He₂ four electrons fill both σ and σ*, so (2 − 2) / 2 = 0 and no stable molecule forms. In O₂ the last two electrons sit in separate π* orbitals with parallel spins, which is why it is paramagnetic.', objects: result, intent: 'resolve' },
    ],
  }
}

const near = (a: number | undefined, b: number) => a !== undefined && Math.abs(a - b) < 1e-6

/** Bond order read back from the drawn spin arrows on σ and σ*. */
export function moBondOrder(spec: SceneSpec): number {
  const arrows = spec.steps.flatMap((s) => s.objects).filter((o) => o.type === 'arrow' && o.from && o.to)
  const on = (level: number) => arrows.filter((o) => near((o.from![1] + o.to![1]) / 2, level) && Math.abs(o.from![0]) < 2).length
  return (on(E_BONDING) - on(E_ANTIBONDING)) / 2
}

export function checkMoDiagramConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  if (!(E_BONDING < E_AO && E_AO < E_ANTIBONDING)) errors.push('the levels are not ordered σ < 1s < σ*')
  const levelLine = (y: number, x0: number, x1: number) => objects.some((o) => o.type === 'bond' && o.from && o.to
    && near(o.from[1], y) && near(o.to[1], y) && near(o.from[0], x0) && near(o.to[0], x1))
  if (!levelLine(E_BONDING, MO_X[0], MO_X[1])) errors.push('the bonding σ level is missing')
  if (!levelLine(E_ANTIBONDING, MO_X[0], MO_X[1])) errors.push('the antibonding σ* level is missing')
  if (!levelLine(E_AO, AO_LEFT[0], AO_LEFT[1]) || !levelLine(E_AO, AO_RIGHT[0], AO_RIGHT[1])) errors.push('an atomic 1s level is missing')
  const inSigma = objects.filter((o) => o.type === 'arrow' && o.from && o.to && near((o.from[1] + o.to[1]) / 2, E_BONDING) && Math.abs(o.from[0]) < 2)
  if (inSigma.length !== 2) errors.push(`σ holds ${inSigma.length} electrons, expected 2`)
  else if (Math.sign(inSigma[0].to![1] - inSigma[0].from![1]) === Math.sign(inSigma[1].to![1] - inSigma[1].from![1])) errors.push('the two electrons in σ do not have opposite spins')
  const text = objects.map((o) => o.text ?? '').join(' | ')
  const order = moBondOrder(spec)
  if (!text.includes(`= ${order}`)) errors.push(`the printed bond order does not equal the drawn electrons' ${order}`)
  for (const need of ['σ bonding', 'σ* antibonding', 'H 1s', 'energy']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  return { ok: errors.length === 0, errors }
}
