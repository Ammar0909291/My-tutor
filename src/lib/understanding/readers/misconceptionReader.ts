/**
 * CUE Misconception Reader — maps the misconceptions the existing engine
 * ALREADY detected this turn into candidate form.
 *
 * Reuses: detectMisconceptions() output (misconceptionEngine.ts), captured
 * by the route at its existing call sites — this reader never re-runs the
 * detection (that would duplicate a DB read; the engine remains the single
 * detector). null input means "not computed this turn", which is NOT the
 * same as "none detected" — the fusion layer records that distinction in
 * the uncertainty list. Pure function.
 */
import type { Misconception } from '@/lib/school/adaptive/misconceptionEngine'
import type { MisconceptionCandidate } from '../types'

export interface MisconceptionReaderInput {
  /** detectMisconceptions() result the route captured, or null if that path didn't run this turn. */
  detected: Misconception[] | null
}

export interface MisconceptionReaderOutput {
  misconceptionCandidates: MisconceptionCandidate[]
  /** true when detection genuinely ran this turn (empty array = ran, found none). */
  detectionRan: boolean
}

export function readMisconceptions(input: MisconceptionReaderInput): MisconceptionReaderOutput {
  if (!Array.isArray(input.detected)) {
    return { misconceptionCandidates: [], detectionRan: false }
  }
  return {
    detectionRan: true,
    misconceptionCandidates: input.detected.map((m) => ({
      type: m.type,
      label: m.label,
      description: m.description,
      confidence: m.confidence,
      evidenceCount: m.evidenceCount,
      source: 'misconceptionEngine' as const,
    })),
  }
}
