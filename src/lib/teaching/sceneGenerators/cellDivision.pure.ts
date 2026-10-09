/**
 * cellDivision — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { captionBeside, round, type ConsistencyResult } from './shared'

// ── Curated reference data: textbook-fixed mitosis/meiosis stage sequences ───

export type DivisionType = 'mitosis' | 'meiosis'

interface StageDef {
  name: string
  description: string
}

interface DivisionResult {
  daughterCellCount: number
  ploidyLabel: string
}

const MITOSIS_STAGES: StageDef[] = [
  { name: 'Prophase', description: 'Chromatin condenses into visible chromosomes; the nuclear envelope begins to break down.' },
  { name: 'Metaphase', description: 'Chromosomes align along the cell\'s equatorial plate, attached to spindle fibers.' },
  { name: 'Anaphase', description: 'Sister chromatids separate and are pulled to opposite poles of the cell.' },
  { name: 'Telophase', description: 'Nuclear envelopes re-form around each set of chromosomes; the cell prepares to divide.' },
]

const MITOSIS_RESULT: DivisionResult = { daughterCellCount: 2, ploidyLabel: 'diploid (2N), genetically identical to the parent cell' }

const MEIOSIS_STAGES: StageDef[] = [
  { name: 'Prophase I', description: 'Homologous chromosomes pair up and exchange genetic material (crossing over).' },
  { name: 'Metaphase I', description: 'Homologous chromosome pairs align along the equatorial plate.' },
  { name: 'Anaphase I', description: 'Homologous chromosomes separate and move to opposite poles (chromatids stay joined).' },
  { name: 'Telophase I', description: 'The cell divides into two haploid cells, each with one chromosome from each pair.' },
  { name: 'Prophase II', description: 'Chromosomes condense again in each haploid cell; a new spindle forms.' },
  { name: 'Metaphase II', description: 'Chromosomes align along the equatorial plate in each haploid cell.' },
  { name: 'Anaphase II', description: 'Sister chromatids separate and move to opposite poles in each haploid cell.' },
  { name: 'Telophase II', description: 'Nuclear envelopes re-form; each of the two cells divides again.' },
]

const MEIOSIS_RESULT: DivisionResult = { daughterCellCount: 4, ploidyLabel: 'haploid (N), genetically distinct from the parent cell' }

const DIVISION_DATA: Record<DivisionType, { stages: StageDef[]; result: DivisionResult }> = {
  mitosis: { stages: MITOSIS_STAGES, result: MITOSIS_RESULT },
  meiosis: { stages: MEIOSIS_STAGES, result: MEIOSIS_RESULT },
}

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface CellDivisionParams {
  divisionType: DivisionType
}

export function validateCellDivisionParams(raw: unknown): CellDivisionParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.divisionType !== 'mitosis' && o.divisionType !== 'meiosis') return null
  return { divisionType: o.divisionType }
}

// ── Deterministic layout (pure lookup; never LLM-generated) ──────────────────

const STAGE_SPACING = 5
// Stages wrap into rows of at most four. Meiosis has eight stages, and in ONE row they span 35 units:
// MEASURED at 390px the eight captions (and the eight pile-up headings above them) overlapped each other,
// and on desktop the headings were stacked in a column at one point. Two rows of four also put Meiosis I
// above Meiosis II, which is the structure the stage names already describe.
const STAGES_PER_ROW = 4
const ROW_PITCH = 5
const NODE_RADIUS = 0.5

function stageRows(stageCount: number): number {
  return Math.ceil(stageCount / STAGES_PER_ROW)
}

/** Where stage `i` sits: left to right along its row, rows top to bottom, the block centred on the origin. */
function stagePosition(i: number, stageCount: number): Vec3 {
  const rows = stageRows(stageCount)
  const row = Math.floor(i / STAGES_PER_ROW)
  const inRow = Math.min(STAGES_PER_ROW, stageCount - row * STAGES_PER_ROW)
  const col = i % STAGES_PER_ROW
  return [round((col - (inRow - 1) / 2) * STAGE_SPACING), round(((rows - 1) / 2 - row) * ROW_PITCH + 2), 0]
}

/** Build one SceneSpec step per stage, then a final daughter-cell summary step. */
export function buildCellDivisionScene(params: CellDivisionParams): SceneSpec {
  const { stages, result } = DIVISION_DATA[params.divisionType]

  const stageSteps: SceneStep[] = stages.map((stage, i) => {
    const at = stagePosition(i, stages.length)
    const objects: SceneObject[] = [
      // The stage's name is drawn ONCE, directly above its own cell. It used to be drawn twice — a heading
      // at one shared point (every stage's heading stacked on the others) and again on the cell.
      { type: 'label', id: `stage-${i}`, position: [at[0], round(at[1] + NODE_RADIUS + 0.7), 0] as Vec3, text: stage.name, color: '#3b82f6' },
      { type: 'node', id: `stage-cell-${i}`, position: at, radius: NODE_RADIUS, color: '#22c55e' },
    ]
    // An arrow from the previous stage along the row makes the ORDER explicit rather than implied by position.
    if (i > 0 && Math.floor((i - 1) / STAGES_PER_ROW) === Math.floor(i / STAGES_PER_ROW)) {
      const prev = stagePosition(i - 1, stages.length)
      objects.push({ type: 'arrow', id: `stage-arrow-${i}`, from: [round(prev[0] + NODE_RADIUS + 0.4), prev[1], 0] as Vec3, to: [round(at[0] - NODE_RADIUS - 0.4), at[1], 0] as Vec3, color: '#9AA5B8', thickness: 0.05 })
    }
    return { narration: stage.description, objects }
  })

  const lastRowY = stagePosition(stages.length - 1, stages.length)[1]
  const daughterY = round(lastRowY - ROW_PITCH - 1)
  const daughterCellObjects: SceneObject[] = Array.from({ length: result.daughterCellCount }, (_, i) => ({
    type: 'node' as const,
    id: `daughter-cell-${i}`,
    position: [round((i - (result.daughterCellCount - 1) / 2) * STAGE_SPACING), daughterY, 0] as Vec3,
    radius: NODE_RADIUS,
    color: '#f59e0b',
    text: `Daughter cell ${i + 1}`,
    properties: captionBeside(NODE_RADIUS, 'below'),
  }))

  const summaryLabel: SceneObject = {
    type: 'label',
    id: 'division-summary',
    position: [0, round(daughterY - 3), 0] as Vec3,
    text: `${result.daughterCellCount} daughter cells: ${result.ploidyLabel}`,
    color: '#ef4444',
  }

  const summaryStep: SceneStep = {
    narration: `${params.divisionType === 'mitosis' ? 'Mitosis' : 'Meiosis'} produces ${result.daughterCellCount} daughter cells that are ${result.ploidyLabel}.`,
    objects: [...daughterCellObjects, summaryLabel],
  }

  return {
    id: `cell-division-${params.divisionType}`,
    title: `Cell Division: ${params.divisionType === 'mitosis' ? 'Mitosis' : 'Meiosis'}`,
    sceneType: 'process',
    teachingGoal: `Show the stages of ${params.divisionType} in order and connect them to the number and type of daughter cells produced.`,
    cameraDistance: 20,
    ariaLabel: `An animation of the stages of ${params.divisionType}, ending with ${result.daughterCellCount} daughter cells that are ${result.ploidyLabel}.`,
    steps: [...stageSteps, summaryStep],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkCellDivisionConsistency(spec: SceneSpec, params: CellDivisionParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const { stages, result } = DIVISION_DATA[params.divisionType]

  stages.forEach((stage, i) => {
    const label = objs.find((o) => o.id === `stage-${i}`)
    if (label?.text !== stage.name) {
      errors.push(`stage-${i} text "${label?.text}" does not match re-derived "${stage.name}"`)
    }
  })

  for (let i = 0; i < result.daughterCellCount; i++) {
    const cell = objs.find((o) => o.id === `daughter-cell-${i}`)
    if (!cell) errors.push(`missing daughter-cell-${i}`)
  }

  const summary = objs.find((o) => o.id === 'division-summary')
  const expectedSummary = `${result.daughterCellCount} daughter cells: ${result.ploidyLabel}`
  if (summary?.text !== expectedSummary) {
    errors.push(`division-summary text "${summary?.text}" does not match re-derived "${expectedSummary}"`)
  }

  if (spec.steps.length !== stages.length + 1) {
    errors.push(`expected ${stages.length + 1} steps, got ${spec.steps.length}`)
  }

  return { ok: errors.length === 0, errors }
}

