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

/**
 * VERTICAL LANES. The figure's text lives in separate bands that must never share a row:
 *
 *   title ........ top lane      (highest level + TITLE_LIFT), clear of the highest level label
 *   levels ....... the ladder itself
 *   path names ... COLUMN FOOTERS, just below the lowest level line (like the category labels under a bar chart)
 *   result ....... below the footers, not above the ladder
 *
 * Measured in Chromium (2026-10-08 Chemistry Visual Quality audit): the result heading used to sit at
 * HEIGHT_SCALE_TARGET + 1.6 — between the title and the path names and ON TOP of both the "Direct"/"Via ions"
 * labels and the highest level label, so the Born–Haber cycle had 24 label collisions at 1280px and 29 at 390px. Moving the
 * result below the ladder fixed that, but the path names still shared the top of the ladder with the title and the highest
 * level labels: at desktop type (~15.5px, against 11.5px on a phone) inside the same ~290px-tall canvas that is four rows
 * (title, names, two levels 1.35 units apart) in ~90px, and the solver shoved the names down through the level labels.
 * A teaching figure's headline answer — and its column names — cannot be what hides its own columns.
 */
const TITLE_LIFT = 2.6       // above the highest level line: a heading is ~2.5 units tall, the highest level label sits +0.5 above its line
const START_LABEL_DROP = 0.65
const LABEL_RISE = 0.5       // a level label's offset from its line (above it, or below it when the row above is too close)
const MIN_ROW_GAP = 1.9      // one text row at desktop type (~21px) at the ~11.5px/unit the ladder is fitted to
const NAME_DROP = 1.1        // column footers: below the lowest drawn text
const RESULT_GAP = 1.5       // below the lowest drawn text (the footers, when there are any)

/**
 * Distance from a column's centre to a step label's centre. Labels are centred on their anchor, so the anchor has to clear
 * the bar. The FIRST column's labels go left, where there is room, and move out by half their estimated width; the other
 * columns' labels go right and stay close to the bar, because on a phone the figure already spans the whole 282px canvas
 * (measured: a 23-character label pushed 5 units out ran 31px off the right edge).
 */
const STEP_LABEL_MAX_CHARS = 28
function stepLabelOffset(text: string, side: -1 | 1): number {
  const perChar = side < 0 ? 0.14 : 0
  return HALF_BAR + 0.3 + Math.min(text.length, STEP_LABEL_MAX_CHARS) * perChar
}

export function buildEnergyCycleScene(p: EnergyCycleParams): SceneSpec {
  const paths = derivePaths(p)
  const maxAbsHeight = Math.max(1e-9, ...paths.flatMap((path) => path.levels.map((l) => Math.abs(l.height))))
  const scale = HEIGHT_SCALE_TARGET / maxAbsHeight

  // The title sits above the HIGHEST level actually drawn, not above the scale's ceiling: Hess's Law only ever descends from
  // 0, so anchoring at HEIGHT_SCALE_TARGET left eight empty units between the title and the ladder and, because the camera is
  // fitted to the whole extent, made every label in the figure smaller for it.
  const highestLevelY = Math.max(0, ...paths.flatMap((path) => path.levels.map((l) => round(l.height * scale, 3))))
  const establishObjects: SceneObject[] = [heading(p.title, [0, round(highestLevelY + TITLE_LIFT, 3), 0], ROLE.ink)]
  const levelObjects: SceneObject[] = []
  const stepObjects: SceneObject[] = []

  // The lowest text the ladder draws: a level's own line, or the start label hung below the baseline. The path names go
  // underneath it as column footers and the result underneath them.
  const lowestTextY = Math.min(-START_LABEL_DROP, ...paths.flatMap((path) => path.levels.map((l) => round(l.height * scale, 3))))
  const nameY = round(lowestTextY - NAME_DROP, 3)

  const columnX = (colIndex: number): number => colIndex * (COLUMN_WIDTH * 1.6) - ((paths.length - 1) * COLUMN_WIDTH * 1.6) / 2

  // A level the paths SHARE (the start, and a common end state) is one state at one height: it is labelled once, centred
  // between the columns that reach it. Drawing the same words under every column stacked identical labels on top of each
  // other (measured 2026-10-08: the Born–Haber start label twice, the solver shoving one up through the level above it).
  const sharedLevels = new Map<string, number[]>()
  paths.forEach((path, colIndex) => path.levels.forEach((lvl) => {
    const key = `${lvl.label}|${round(lvl.height * scale, 3)}`
    sharedLevels.set(key, [...(sharedLevels.get(key) ?? []), colIndex])
  }))

  // A level's label sits just above its line — unless the label of the level above would then be closer than a text row, in
  // which case it hangs just BELOW its own line. Born–Haber has two levels 1.35 units apart (the electron-gain step): both
  // labels above their lines overlap by half a row, and at desktop type the solver cannot separate them within its
  // displacement bound. Walking down from the top, each label keeps a full row from the one above it.
  const labelDy = new Map<string, number>()
  {
    const entries = [...sharedLevels.keys()]
      .map((key) => ({ key, y: Number(key.slice(key.lastIndexOf('|') + 1)) }))
      .filter((e) => !paths.some((path) => `${path.levels[0].label}|${round(path.levels[0].height * scale, 3)}` === e.key))
      .sort((a, b) => b.y - a.y)
    let previousLabelY = Infinity
    for (const e of entries) {
      const above = e.y + LABEL_RISE
      const dy = previousLabelY - above < MIN_ROW_GAP ? -LABEL_RISE : LABEL_RISE
      labelDy.set(e.key, dy)
      previousLabelY = e.y + dy
    }
  }

  paths.forEach((path, colIndex) => {
    const x0 = columnX(colIndex)
    if (paths.length > 1) {
      levelObjects.push(label(path.name, [x0, nameY, 0], ROLE.aid, 'detail'))
    }
    // Step labels sit OUTWARD of their arrow: the first column of a multi-column figure to its left, every other column to its
    // right. Labels are centred on their anchor, so anchoring at the bar's edge (the old x0 + 1.8) put the text across the
    // arrow and, for the first column, in the gap between the columns, where the next column's own labels collide with it.
    const stepSide: -1 | 1 = paths.length > 1 && colIndex === 0 ? -1 : 1
    path.levels.forEach((lvl, i) => {
      const y = round(lvl.height * scale, 3)
      levelObjects.push(line([x0 - HALF_BAR, y, 0], [x0 + HALF_BAR, y, 0], colIndex === 0 && i === 0 ? ROLE.reference : ROLE.output, 0.07))
      const sharers = sharedLevels.get(`${lvl.label}|${y}`) ?? [colIndex]
      if (sharers[0] === colIndex) {
        const labelX = sharers.reduce((sum, c) => sum + columnX(c), 0) / sharers.length
        const dy = i === 0 ? -START_LABEL_DROP : labelDy.get(`${lvl.label}|${y}`) ?? LABEL_RISE
        levelObjects.push(label(lvl.label, [labelX, y + dy, 0], ROLE.ink, 'detail'))
      }
      const occ = p.occupancy?.find((o) => o.levelLabel === lvl.label)
      if (occ) {
        for (let d = 0; d < occ.dots; d++) {
          levelObjects.push({ type: 'node', position: [x0 - HALF_BAR + 0.4 + d * 0.5, y + 0.22, 0], color: ROLE.result, radius: 0.1 })
        }
      }
      if (i > 0) {
        const prevY = round(path.levels[i - 1].height * scale, 3)
        stepObjects.push(arrow([x0, prevY, 0], [x0, y, 0], prevY <= y ? ROLE.input : ROLE.output))
        const stepText = p.paths[colIndex].steps[i - 1].deltaLabel
        stepObjects.push(label(stepText, [x0 + stepSide * stepLabelOffset(stepText, stepSide), (prevY + y) / 2, 0], ROLE.aid, 'detail'))
      }
    })
  })

  const resultY = round(lowestTextY - (paths.length > 1 ? NAME_DROP : 0) - RESULT_GAP, 3)

  const allPathsAgree = paths.every((path) => Math.abs(path.total - paths[0].total) < 1e-6)
  const resultObjects: SceneObject[] = []
  if (paths.length > 1) {
    const totals = paths.map((path) => path.total)
    // U+2212 for a negative total, matching the step labels ("ΔH = −393.5 kJ/mol"); a bare JS number prints an ASCII hyphen.
    const signed = (n: number): string => String(n).replace('-', '−')
    resultObjects.push(label(
      allPathsAgree
        // One line at every viewport (31 characters at the detail tier fits a 282px phone canvas). The longer
        // "…gives the same total: X (Hess's Law)" wrapped to two lines, was the last label the solver placed, and had no
        // room left — it stood on the level and step labels at desktop and ran off the bottom edge on a phone. The
        // attribution to Hess's Law moved to the stage narration below.
        ? `Every path totals ${signed(totals[0])} ${p.unit}`
        : `Paths disagree — ${totals.map(signed).join(` ${p.unit} vs `)} ${p.unit}`,
      [0, resultY, 0],
      allPathsAgree ? ROLE.result : ROLE.input,
      // 'detail', not 'heading': a result sentence is a statement, not a title, and it carries its colour (the result
      // role) for emphasis. At the heading tier it wrapped to three lines (71px) on a 390px phone and stood on the
      // figure it was summarising; at 'primary' it still took three lines and ran off the bottom edge.
      'detail',
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
      // The narration says what the figure says: "agree" only when the drawn totals do (the label already reports a
      // disagreement; a hard-coded "The totals agree" under "Paths disagree — …" contradicted it).
      ...(resultObjects.length > 0 ? [{ narration: allPathsAgree ? 'The totals agree — that is Hess\'s Law.' : 'The totals do not agree — check the step values.', objects: resultObjects, intent: 'resolve' as const }] : []),
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
