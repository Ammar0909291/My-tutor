/**
 * CUE Explanation Memory Reader — records what the Explanation Memory
 * serving path ALREADY found for this turn.
 *
 * Reuses: assembleLesson()'s result and the route's authoritative
 * memoryFallbackReason (both already computed this turn on the canonical
 * serving path). This reader never re-runs matching — matcher.ts stays the
 * single matcher. Pure function.
 */
import type { ExplanationMemoryHit } from '../types'

export interface ExplanationMemoryReaderInput {
  assembled: {
    usedAssetIds: string[]
    explanationConfidence: number | null
    explanationServingMode: string | null
  } | null
  /** The route's single authoritative reason memory did NOT serve (null when it did). */
  fallbackReason: string | null
}

export interface ExplanationMemoryReaderOutput {
  explanationMemoryHits: ExplanationMemoryHit[]
  /** Why there are no hits ('served' when there are) — provenance for the fusion layer. */
  memoryOutcome: string
}

export function readExplanationMemory(input: ExplanationMemoryReaderInput): ExplanationMemoryReaderOutput {
  if (input.assembled && Array.isArray(input.assembled.usedAssetIds)) {
    return {
      explanationMemoryHits: input.assembled.usedAssetIds.map((assetId) => ({
        assetId,
        confidence: input.assembled!.explanationConfidence,
        servingMode: input.assembled!.explanationServingMode,
        source: 'explanationMemory' as const,
      })),
      memoryOutcome: 'served',
    }
  }
  return {
    explanationMemoryHits: [],
    memoryOutcome: input.fallbackReason ?? 'not-computed-this-turn',
  }
}
