/**
 * GENERATE BEFORE ANYONE IS WAITING.
 *
 * THE PROBLEM. Generation runs inline on the first turn that reaches an
 * uncurated concept, so the first learner to arrive there pays the full model
 * latency in the middle of a lesson — measured at 2.0-4.2s on
 * gemini-3.5-flash-lite, and unbounded when a provider is slow. The engine's
 * on-turn budget makes that failure cheap; this makes it rare, by doing the
 * work when no one is waiting.
 *
 * WHY THIS IS NOT A SECOND ENGINE. It calls `generateConceptScene` and nothing
 * else. Every property that path already guarantees — eligibility first, the
 * permanent cache, structural and semantic validation, the outcome record,
 * NO FIGURE on any rejection — holds here unchanged, because this module makes
 * no decisions of its own. It chooses WHEN, never WHAT.
 *
 * ── THE CACHE IS WHAT MAKES THIS CHEAP ──────────────────────────────────────
 * A concept costs at most ONE generation for the whole platform, ever. Warming
 * does not add calls; it moves them off the learner's turn. A concept that is
 * already cached costs nothing at all — the engine returns the cached scene
 * without contacting a provider, which is why re-running a warm pass is safe.
 *
 * ── ORDERING IS DELIBERATELY BORING ─────────────────────────────────────────
 * Sequential, in the order given. Not because concurrency is hard, but because
 * a warm pass competes with live teaching traffic for the same provider quota,
 * and the failure it must never cause is a slow lesson for a learner who is
 * actually present.
 */

import { generateConceptScene } from './visualEngine'
import { resolveServicePolicy } from './generationPolicy'
import type { GenerationOutcomeSink } from './generationOutcome'
import type { VisualizationCacheClient } from '@/lib/teaching/visuals/visualizationCache'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { ArchetypeContext } from './archetypes'

export interface WarmResult {
  conceptId: string
  /** 'cached' — already had a scene; nothing was generated and nothing was spent. */
  outcome: 'cached' | 'generated' | 'rejected' | 'skipped-not-eligible' | 'unknown-concept'
  reason?: string
  elapsedMs: number
}

export interface WarmReport {
  results: WarmResult[]
  generated: number
  rejected: number
  cached: number
  skipped: number
  /** Provider calls this pass is likely to have cost — cached hits are free. */
  estimatedCalls: number
}

export interface WarmOptions {
  cacheClient?: VisualizationCacheClient
  outcomeSink?: GenerationOutcomeSink
  /** Test seam, matching the engine's own. */
  generate?: (prompt: string, maxTokens?: number) => Promise<unknown>
  /**
   * Hard ceiling on provider calls for one pass. A warm pass that can run away
   * is a warm pass that can empty a quota, so the caller must state a bound and
   * the pass stops at it rather than "finishing the list".
   */
  maxCalls: number
  /** Called after each concept, for progress reporting on long passes. */
  onProgress?: (result: WarmResult) => void
}

function contextFor(conceptId: string): ArchetypeContext | null {
  const node = getKGNode(conceptId)
  if (!node) return null
  return {
    conceptId,
    title: node.title,
    description: node.description ?? '',
    prerequisites: node.prerequisites ?? [],
    difficulty: node.difficulty,
  }
}

/**
 * Warm a list of concepts, in order, up to the call ceiling.
 *
 * NOT eligible is a SKIP, not a failure: a concept whose policy is 'off' has
 * nothing to warm, and warming it anyway would be a way to generate figures for
 * concepts the allowlist never admitted.
 */
export async function warmConceptScenes(
  conceptIds: readonly string[],
  options: WarmOptions,
): Promise<WarmReport> {
  const results: WarmResult[] = []
  let calls = 0

  for (const conceptId of conceptIds) {
    if (calls >= options.maxCalls) break

    const started = Date.now()
    const record = (outcome: WarmResult['outcome'], reason?: string): WarmResult => {
      const r: WarmResult = { conceptId, outcome, reason, elapsedMs: Date.now() - started }
      results.push(r)
      options.onProgress?.(r)
      return r
    }

    if (resolveServicePolicy(conceptId) === 'off') { record('skipped-not-eligible'); continue }

    const ctx = contextFor(conceptId)
    if (!ctx) { record('unknown-concept'); continue }

    const result = await generateConceptScene(ctx, {
      cacheClient: options.cacheClient,
      outcomeSink: options.outcomeSink,
      generate: options.generate,
      // Nobody is waiting for a warm pass, so it must not abandon a slow
      // provider halfway and record a budget rejection that means nothing.
      budgetMs: 0,
    })

    if (result.ok) {
      // A cached hit cost no provider call — that is the whole economy of this.
      if (!result.cached) calls++
      record(result.cached ? 'cached' : 'generated')
    } else {
      // A rejection still consumed a call unless it never reached the provider.
      if (result.reason !== 'flag-off' && result.reason !== 'no-source-text') calls++
      record('rejected', result.reason)
    }
  }

  const count = (o: WarmResult['outcome']) => results.filter((r) => r.outcome === o).length
  return {
    results,
    generated: count('generated'),
    rejected: count('rejected'),
    cached: count('cached'),
    skipped: count('skipped-not-eligible') + count('unknown-concept'),
    estimatedCalls: calls,
  }
}

/** One line per pass, for an operator watching a long warm run. */
export function describeWarmReport(report: WarmReport): string {
  return (
    `warmed ${report.results.length} concepts · generated ${report.generated} · ` +
    `cached ${report.cached} · rejected ${report.rejected} · skipped ${report.skipped} · ` +
    `~${report.estimatedCalls} provider calls`
  )
}
