/**
 * chemistrySystemScenes — small, concept-owned system-boundary diagrams.
 *
 * Chemistry Visual Coverage programme (2026-09). Two concepts —
 * `chem.thermo.system` (open/closed/isolated systems) and
 * `chem.thermo.first-law` (ΔU = q + w) — share one real diagram archetype:
 * a system boundary with matter/energy arrows crossing it. Neither is a
 * "cell", a "cycle" nor a coordination geometry, so neither belongs in this
 * programme's other two new generators; each also needs no interactivity or
 * numeric derivation richer than a single sum, so — following the same
 * precedent as `physicsPilot.ts`'s seven concept-owned scenes — these are
 * plain SceneSpec builders using the shared visual language
 * (`visualDesign.ts`), not a new generalized "kind".
 *
 * Pure: no network, no LLM, no randomness — same convention as
 * `physicsPilot.ts`, which these builders are modelled on directly.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, box, heading, label } from './visualDesign'
import { round } from './shared'

export type SystemType = 'open' | 'closed' | 'isolated'

/**
 * System, Surroundings and State Functions (chem.thermo.system).
 *
 * The one fact that distinguishes the three system types is WHICH of
 * matter/energy can cross the boundary — drawn as present-or-absent arrows,
 * never as a claim resting on colour alone (the arrows are also labelled).
 */
export function buildSystemBoundaryScene(systemType: SystemType): SceneSpec {
  const boundary = box(-3, -3, 3, 3, ROLE.reference)
  const matterCrosses = systemType === 'open'
  const energyCrosses = systemType === 'open' || systemType === 'closed'

  const objects: SceneObject[] = [
    ...boundary,
    label('system', [0, 0, 0], ROLE.ink, 'primary'),
    label('surroundings', [0, -4.2, 0], ROLE.reference, 'detail'),
  ]

  if (matterCrosses) {
    objects.push(arrow([-5, 1.2, 0], [-3, 1.2, 0], ROLE.input, 'matter in'))
    objects.push(arrow([3, 0.6, 0], [5, 0.6, 0], ROLE.output, 'matter out'))
  } else {
    objects.push(label('no matter exchange', [-4, 1.2, 0], ROLE.reference, 'detail'))
  }

  if (energyCrosses) {
    objects.push(arrow([-5, -0.6, 0], [-3, -0.6, 0], ROLE.input, 'heat in'))
    objects.push(arrow([3, -1.2, 0], [5, -1.2, 0], ROLE.output, 'heat out'))
  } else {
    objects.push(label('no energy exchange', [-4, -0.9, 0], ROLE.reference, 'detail'))
  }

  const description = systemType === 'open'
    ? 'An open system exchanges both matter and energy with its surroundings.'
    : systemType === 'closed'
      ? 'A closed system exchanges energy but not matter with its surroundings.'
      : 'An isolated system exchanges neither matter nor energy with its surroundings.'

  return {
    id: `chem-system-${systemType}`,
    title: `${systemType[0].toUpperCase()}${systemType.slice(1)} System`,
    sceneType: 'diagram',
    teachingGoal: description,
    cameraDistance: 16,
    ariaLabel: `A boundary separating a system from its surroundings. ${description}`,
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A system is separated from its surroundings by a boundary.', objects: objects.slice(0, 6) },
      { narration: description, objects: objects.slice(6) },
    ],
  }
}

/** Independent re-derivation check: the scene must name every arrow the system type implies. */
export function checkSystemBoundaryConsistency(spec: SceneSpec, systemType: SystemType): { ok: boolean; errors: string[] } {
  const allText = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' | ')
  const errors: string[] = []
  const expectMatter = systemType === 'open'
  const expectEnergy = systemType === 'open' || systemType === 'closed'
  if (expectMatter !== allText.includes('matter in')) errors.push('matter-exchange arrows do not match the system type')
  if (expectEnergy !== allText.includes('heat in')) errors.push('energy-exchange arrows do not match the system type')
  return { ok: errors.length === 0, errors }
}

/**
 * The First Law of Thermodynamics (chem.thermo.first-law): ΔU = q + w.
 *
 * `q` and `w` are signed (positive = added TO the system, the IUPAC/physical-
 * chemistry sign convention this concept's own KG description uses via
 * `qv`/`qp`). The arrow direction is derived from the sign, never hardcoded,
 * so the figure can never show heat "entering" a system whose q is negative.
 */
export function buildFirstLawScene(q: number, w: number): SceneSpec {
  const deltaU = round(q + w, 2)
  const boundary = box(-3, -3, 3, 3, ROLE.reference)
  const qArrow = q >= 0
    ? arrow([-5, 1, 0], [-3, 1, 0], ROLE.input, `q = ${q >= 0 ? '+' : ''}${q}`)
    : arrow([-3, 1, 0], [-5, 1, 0], ROLE.output, `q = ${q}`)
  const wArrow = w >= 0
    ? arrow([-5, -1, 0], [-3, -1, 0], ROLE.input, `w = ${w >= 0 ? '+' : ''}${w}`)
    : arrow([-3, -1, 0], [-5, -1, 0], ROLE.output, `w = ${w}`)

  return {
    id: 'chem-first-law',
    title: 'First Law of Thermodynamics',
    sceneType: 'diagram',
    teachingGoal: `Show ΔU = q + w for a system receiving q = ${q} and w = ${w}, giving ΔU = ${deltaU}.`,
    cameraDistance: 16,
    ariaLabel: `A system with heat q = ${q} and work w = ${w} crossing its boundary, giving a change in internal energy delta U = ${deltaU}.`,
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Internal energy U changes only through heat and work crossing the boundary.', objects: [...boundary, label('system, U', [0, 0, 0], ROLE.ink, 'primary')] },
      { narration: `Heat: q = ${q}. Positive means heat flows in.`, objects: [qArrow] },
      { narration: `Work: w = ${w}. Positive means work is done on the system.`, objects: [wArrow] },
      { narration: `ΔU = q + w = ${q} + ${w} = ${deltaU}.`, objects: [heading(`ΔU = ${deltaU}`, [0, 4, 0], ROLE.result)] },
    ],
  }
}

export function checkFirstLawConsistency(spec: SceneSpec, q: number, w: number): { ok: boolean; errors: string[] } {
  const deltaU = round(q + w, 2)
  const allText = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' | ')
  const errors: string[] = []
  if (!allText.includes(`ΔU = ${deltaU}`)) errors.push(`scene does not state the derived ΔU = ${deltaU}`)
  if (!allText.includes(`q = ${q >= 0 ? '+' : ''}${q}`)) errors.push('scene does not label q correctly')
  if (!allText.includes(`w = ${w >= 0 ? '+' : ''}${w}`)) errors.push('scene does not label w correctly')
  return { ok: errors.length === 0, errors }
}
