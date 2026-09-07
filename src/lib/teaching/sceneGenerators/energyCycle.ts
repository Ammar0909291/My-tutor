/**
 * energyCycle — one small, reusable "energy diagram" generator.
 *
 * Chemistry Visual Coverage programme (2026-09). Three concepts that look
 * unrelated by name share one real visual archetype: a vertical ENERGY AXIS
 * with named levels connected by labelled steps.
 *
 *   - Hess's Law (chem.thermo.enthalpy): the SAME net ΔH reached by a direct
 *     step or by a chain of intermediate steps.
 *   - The Born–Haber cycle (chem.thermo.bond-enthalpy): the same idea with
 *     five steps instead of two.
 *   - Crystal Field Theory splitting (chem.coord.cft): just two levels (t2g,
 *     eg) separated by one gap, Δo — the degenerate case of the same shape.
 *
 * No existing generator draws this — `calculusGraph` plots continuous
 * functions, `periodicTrends` compares two elements' property VALUES, neither
 * draws a level-and-step energy diagram. This is the one new archetype the
 * three concepts genuinely need.
 *
 * THE CONSISTENCY GUARANTEE. Hess's Law is exactly the claim that every path
 * between the same start and end state carries the same total ΔH. Rather
 * than authoring level heights by hand (which could silently disagree with
 * the very law being taught), each path's levels are DERIVED from its own
 * step values — height is never an independent input — and the checker
 * verifies every path sharing a start/end pair converges on the same total.
 * A wrong bond-enthalpy number fails the check instead of quietly drawing a
 * diagram that contradicts the law it illustrates.
 *
 * Pure: no network, no LLM, no randomness — reached only through
 * `conceptSceneParams.ts`'s canonical-parameter path, so (like
 * `physicsPilot.ts`) it has no LLM-extraction counterpart and is not named
 * `.pure.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, heading, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

export interface EnergyStep {
  /** Label for the level reached AFTER this step, e.g. "CO(g) + ½O₂(g)". */
  label: string
  /** Signed ΔH/ΔE for this step, in `unit`. */
  delta: number
  /** Label for the step's arrow, e.g. "ΔH₁ = −110.5 kJ/mol". */
  deltaLabel: string
}

export interface EnergyPath {
  /** Short name for this path/column, e.g. "Direct", "Via CO(g)". */
  name: string
  steps: EnergyStep[]
}

export interface EnergyCycleParams {
  title: string
  /** Shared label for every path's starting level, e.g. "C(s) + O₂(g)". */
  startLabel: string
  unit: string
  paths: EnergyPath[]
  /** Optional electron-occupancy dots drawn at a level (Crystal Field Theory orbital filling). Level matched by label. */
  occupancy?: { levelLabel: string; dots: number }[]
}

function isStep(raw: unknown): raw is EnergyStep {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return typeof o.label === 'string' && !!o.label.trim()
    && typeof o.delta === 'number' && Number.isFinite(o.delta)
    && typeof o.deltaLabel === 'string' && !!o.deltaLabel.trim()
}

function isPath(raw: unknown): raw is EnergyPath {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return typeof o.name === 'string' && !!o.name.trim()
    && Array.isArray(o.steps) && o.steps.length > 0 && o.steps.every(isStep)
}

export function validateEnergyCycleParams(raw: unknown): EnergyCycleParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.title !== 'string' || !o.title.trim()) return null
  if (typeof o.startLabel !== 'string' || !o.startLabel.trim()) return null
  if (typeof o.unit !== 'string' || !o.unit.trim()) return null
  if (!Array.isArray(o.paths) || o.paths.length === 0 || !o.paths.every(isPath)) return null
  return {
    title: o.title.trim(),
    startLabel: o.startLabel.trim(),
    unit: o.unit.trim(),
    paths: o.paths as EnergyPath[],
    occupancy: Array.isArray(o.occupancy) ? (o.occupancy as { levelLabel: string; dots: number }[]) : undefined,
  }
}

// ── Deterministic derivation: heights come FROM the step values ──────────────

interface DerivedLevel {
  label: string
  /** Cumulative height from the shared start (height 0). */
  height: number
}

interface DerivedPath {
  name: string
  levels: DerivedLevel[]  // [start, ...after each step]
  total: number
}

export function derivePaths(p: EnergyCycleParams): DerivedPath[] {
  return p.paths.map((path) => {
    let cumulative = 0
    const levels: DerivedLevel[] = [{ label: p.startLabel, height: 0 }]
    for (const step of path.steps) {
      cumulative = round(cumulative + step.delta, 3)
      levels.push({ label: step.label, height: cumulative })
    }
    return { name: path.name, levels, total: cumulative }
  })
}

// ── Scene construction ────────────────────────────────────────────────────────

const COLUMN_WIDTH = 4
const HALF_BAR = 1.5
const HEIGHT_SCALE_TARGET = 8 // the largest |height| across all paths maps to this many scene units

export function buildEnergyCycleScene(p: EnergyCycleParams): SceneSpec {
  const paths = derivePaths(p)
  const maxAbsHeight = Math.max(1e-9, ...paths.flatMap((path) => path.levels.map((l) => Math.abs(l.height))))
  const scale = HEIGHT_SCALE_TARGET / maxAbsHeight

  const establishObjects: SceneObject[] = [heading(p.title, [0, HEIGHT_SCALE_TARGET + 2, 0], ROLE.ink)]
  const levelObjects: SceneObject[] = []
  const stepObjects: SceneObject[] = []

  paths.forEach((path, colIndex) => {
    const x0 = colIndex * (COLUMN_WIDTH * 1.6) - ((paths.length - 1) * COLUMN_WIDTH * 1.6) / 2
    if (paths.length > 1) {
      levelObjects.push(label(path.name, [x0, HEIGHT_SCALE_TARGET + 0.9, 0], ROLE.aid, 'detail'))
    }
    path.levels.forEach((lvl, i) => {
      const y = round(lvl.height * scale, 3)
      levelObjects.push(line([x0 - HALF_BAR, y, 0], [x0 + HALF_BAR, y, 0], colIndex === 0 && i === 0 ? ROLE.reference : ROLE.output, 0.07))
      levelObjects.push(label(lvl.label, [x0, y + (i === 0 ? -0.65 : 0.5), 0], ROLE.ink, 'detail'))
      const occ = p.occupancy?.find((o) => o.levelLabel === lvl.label)
      if (occ) {
        for (let d = 0; d < occ.dots; d++) {
          levelObjects.push({ type: 'node', position: [x0 - HALF_BAR + 0.4 + d * 0.5, y + 0.22, 0], color: ROLE.result, radius: 0.1 })
        }
      }
      if (i > 0) {
        const prevY = round(path.levels[i - 1].height * scale, 3)
        stepObjects.push(arrow([x0, prevY, 0], [x0, y, 0], prevY <= y ? ROLE.input : ROLE.output))
        stepObjects.push(label(p.paths[colIndex].steps[i - 1].deltaLabel, [x0 + HALF_BAR + 0.3, (prevY + y) / 2, 0], ROLE.aid, 'detail'))
      }
    })
  })

  const resultObjects: SceneObject[] = []
  if (paths.length > 1) {
    const totals = paths.map((path) => path.total)
    const allAgree = totals.every((t) => Math.abs(t - totals[0]) < 1e-6)
    resultObjects.push(heading(
      allAgree
        ? `Every path gives the same total: ${totals[0]} ${p.unit} (Hess's Law)`
        : `Paths disagree — ${totals.join(` ${p.unit} vs `)} ${p.unit}`,
      [0, HEIGHT_SCALE_TARGET + 1.6, 0],
      allAgree ? ROLE.result : ROLE.input,
    ))
  }
  // A single path (e.g. Crystal Field Theory's t2g/eg gap) needs no
  // convergence claim — the gap arrow and its label, drawn in the "relate"
  // step above, are the whole figure.

  return {
    id: `energy-cycle-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: p.title,
    sceneType: paths.length > 1 ? 'comparison' : 'diagram',
    teachingGoal: paths.length > 1
      ? `Show that ${p.startLabel} reaches the same final state by every path, with the same total ${p.unit}.`
      : `Show the energy gap between two levels.`,
    cameraDistance: 22,
    ariaLabel: `${p.title}: an energy level diagram starting at ${p.startLabel}${paths.length > 1 ? `, compared across ${paths.length} paths that all total ${paths[0].total} ${p.unit}` : ''}.`,
    stage: { grid: false, axes: false },
    steps: [
      { narration: `${p.startLabel} is the shared starting point.`, objects: establishObjects, intent: 'establish' },
      { narration: paths.length > 1 ? 'Each path takes a different route to the same destination.' : 'Two energy levels, one gap.', objects: levelObjects, intent: 'relate' },
      { narration: 'Each step is a measured energy change.', objects: stepObjects, intent: 'vary' },
      ...(resultObjects.length > 0 ? [{ narration: 'The totals agree.', objects: resultObjects, intent: 'resolve' as const }] : []),
    ],
  }
}

// ── Safety-net consistency checker (deterministic) ────────────────────────────

export function checkEnergyCycleConsistency(spec: SceneSpec, p: EnergyCycleParams): ConsistencyResult {
  const errors: string[] = []
  const paths = derivePaths(p)

  if (paths.length > 1) {
    const totals = paths.map((path) => path.total)
    const disagreeing = totals.some((t) => Math.abs(t - totals[0]) > 1e-6)
    if (disagreeing) {
      errors.push(`paths do not converge on the same total: ${totals.join(', ')} ${p.unit} — check the authored step values`)
    }
  }

  const allText = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' | ')
  if (!allText.includes(p.startLabel)) errors.push('scene does not show the shared starting label')
  for (const path of p.paths) {
    for (const step of path.steps) {
      if (!allText.includes(step.deltaLabel)) errors.push(`scene is missing the step label "${step.deltaLabel}"`)
    }
  }

  return { ok: errors.length === 0, errors }
}
