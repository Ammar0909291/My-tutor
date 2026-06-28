/**
 * DNA double-helix base-pairing scene generator (28th parametric generator),
 * closing the remaining "DNA/chromosome" half of the "Genetics (Punnett
 * squares, DNA/chromosome)" gap noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md
 * (the Punnett-square half is already covered by punnettSquare.ts).
 *
 * Formula-driven: given one DNA strand's base sequence, the complementary
 * strand is derived by the fixed Watson-Crick base-pairing rule
 * (A pairs with T, G pairs with C) — never invented, never LLM-generated.
 * Same architecture as the other generators: extractDNAStructureParams
 * (LLM, isolated) → validateDNAStructureParams (pure) →
 * buildDNAStructureScene (pure, deterministic pairing) →
 * checkDNAStructureConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface DNAStructureParams {
  /** A single DNA strand's base sequence, e.g. "ATGC". Letters A, T, G, C only. */
  sequence: string
}

const MIN_LENGTH = 2
const MAX_LENGTH = 12
const VALID_BASES: ReadonlySet<string> = new Set(['A', 'T', 'G', 'C'])

export function validateDNAStructureParams(raw: unknown): DNAStructureParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.sequence !== 'string') return null
  const sequence = o.sequence.trim().toUpperCase()
  if (sequence.length < MIN_LENGTH || sequence.length > MAX_LENGTH) return null
  if (!sequence.split('').every((c) => VALID_BASES.has(c))) return null
  return { sequence }
}

// ── Deterministic base-pairing (Watson-Crick rule; never LLM-generated) ──────

const COMPLEMENT: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' }

function complementaryStrand(sequence: string): string {
  return sequence.split('').map((base) => COMPLEMENT[base]).join('')
}

function gcContentPercent(sequence: string): number {
  const gcCount = sequence.split('').filter((b) => b === 'G' || b === 'C').length
  return round((gcCount / sequence.length) * 100, 1)
}

const BASE_COLOR: Record<string, string> = { A: '#3b82f6', T: '#ef4444', G: '#22c55e', C: '#f59e0b' }
const BASE_SPACING = 3

/** Build a 2-step DNA SceneSpec: the strand and its complement base-by-base, then the GC-content summary. */
export function buildDNAStructureScene(params: DNAStructureParams): SceneSpec {
  const complement = complementaryStrand(params.sequence)
  const n = params.sequence.length

  const strandObjects: SceneObject[] = []
  for (let i = 0; i < n; i++) {
    const x = round((i - (n - 1) / 2) * BASE_SPACING)
    strandObjects.push(
      { type: 'label', id: `base-top-${i}`, position: [x, 3, 0] as Vec3, text: params.sequence[i], color: BASE_COLOR[params.sequence[i]] },
      { type: 'label', id: `base-bottom-${i}`, position: [x, -3, 0] as Vec3, text: complement[i], color: BASE_COLOR[complement[i]] },
      { type: 'bond', id: `pair-${i}`, from: [x, 3, 0] as Vec3, to: [x, -3, 0] as Vec3 },
    )
  }

  const summaryLabel: SceneObject = {
    type: 'label',
    id: 'gc-content',
    position: [0, -7, 0] as Vec3,
    text: `GC content: ${gcContentPercent(params.sequence)}%`,
    color: '#94a3b8',
  }

  return {
    id: `dna-structure-${params.sequence}`,
    title: `DNA Base Pairing: ${params.sequence}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how each base on a DNA strand pairs with its Watson-Crick complement on the opposite strand.',
    cameraDistance: BASE_SPACING * n + 14,
    ariaLabel: `A DNA double helix showing the strand ${params.sequence} paired with its complementary strand ${complement}.`,
    steps: [
      {
        narration: `Strand: 5'-${params.sequence}-3'. By the base-pairing rule (A-T, G-C), the complementary strand reads 3'-${complement}-5'.`,
        objects: strandObjects,
      },
      {
        narration: `This sequence has a GC content of ${gcContentPercent(params.sequence)}% — the proportion of guanine and cytosine bases, which form a stronger triple hydrogen bond than the adenine-thymine double bond.`,
        objects: [summaryLabel],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkDNAStructureConsistency(spec: SceneSpec, params: DNAStructureParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const complement = complementaryStrand(params.sequence)

  for (let i = 0; i < params.sequence.length; i++) {
    const top = objs.find((o) => o.id === `base-top-${i}`)
    if (top?.text !== params.sequence[i]) errors.push(`base-top-${i} text "${top?.text}" does not match re-derived "${params.sequence[i]}"`)

    const bottom = objs.find((o) => o.id === `base-bottom-${i}`)
    if (bottom?.text !== complement[i]) errors.push(`base-bottom-${i} text "${bottom?.text}" does not match re-derived complement "${complement[i]}"`)
  }

  const summary = objs.find((o) => o.id === 'gc-content')
  const expectedSummary = `GC content: ${gcContentPercent(params.sequence)}%`
  if (summary?.text !== expectedSummary) {
    errors.push(`gc-content text "${summary?.text}" does not match re-derived "${expectedSummary}"`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the DNA base sequence (using letters A, T, G, C) being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isDNASequence": true|false, "sequence": "<string of A/T/G/C letters, 2-12 bases>"}
- isDNASequence is false if the text is not about a specific DNA base sequence.
- sequence must use only the letters A, T, G, C and be the sequence actually stated in the text — do not invent one.`
}

/**
 * Extract validated DNA-structure parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractDNAStructureParams(text: string): Promise<DNAStructureParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isDNASequence !== true) return null
  return validateDNAStructureParams(raw)
}
