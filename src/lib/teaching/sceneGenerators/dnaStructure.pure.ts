/**
 * dnaStructure — the PURE half (geometry, validation, consistency check).
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

