/**
 * Cell division (mitosis / meiosis) scene generator (27th parametric
 * generator), closing the "Cell structure & division" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 *
 * Like electronShells.ts and periodicTrends.ts, this is DATA-driven, not
 * formula-driven: the stage sequence, per-stage description, daughter-cell
 * count, and resulting ploidy are curated, textbook-fixed biology facts for
 * mitosis and meiosis. The LLM only EXTRACTS which division type is meant;
 * code looks up the real stage data, correct by construction (never
 * invented).
 *
 * Same architecture as the other generators: extractCellDivisionParams
 * (LLM, isolated) → validateCellDivisionParams (pure) →
 * buildCellDivisionScene (pure, deterministic lookup) →
 * checkCellDivisionConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

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

/** Build one SceneSpec step per stage, then a final daughter-cell summary step. */
export function buildCellDivisionScene(params: CellDivisionParams): SceneSpec {
  const { stages, result } = DIVISION_DATA[params.divisionType]

  const stageSteps: SceneStep[] = stages.map((stage, i) => {
    const objects: SceneObject[] = [
      { type: 'label', id: `stage-${i}`, position: [0, round(4), 0] as Vec3, text: stage.name, color: '#3b82f6' },
      { type: 'node', id: `stage-cell-${i}`, position: [round(i * STAGE_SPACING - ((stages.length - 1) * STAGE_SPACING) / 2), 0, 0] as Vec3, color: '#22c55e', text: stage.name },
    ]
    return { narration: stage.description, objects }
  })

  const daughterCellObjects: SceneObject[] = Array.from({ length: result.daughterCellCount }, (_, i) => ({
    type: 'node' as const,
    id: `daughter-cell-${i}`,
    position: [round((i - (result.daughterCellCount - 1) / 2) * STAGE_SPACING), round(-5), 0] as Vec3,
    color: '#f59e0b',
    text: `Daughter cell ${i + 1}`,
  }))

  const summaryLabel: SceneObject = {
    type: 'label',
    id: 'division-summary',
    position: [0, round(-8), 0] as Vec3,
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
    cameraDistance: 22,
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

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and determine whether it is about mitosis or meiosis (cell division), if either.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCellDivision": true|false, "divisionType": "mitosis"|"meiosis"}
- isCellDivision is false if the text is not about mitosis or meiosis.
- divisionType must be exactly "mitosis" or "meiosis" based on which one the text describes.`
}

/**
 * Extract validated cell-division parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCellDivisionParams(text: string): Promise<CellDivisionParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isCellDivision !== true) return null
  return validateCellDivisionParams(raw)
}
