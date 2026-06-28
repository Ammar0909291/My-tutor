/**
 * Educational Brain Decision Pipeline — stages 0–2.
 * Gated by ENABLE_EDUCATIONAL_BRAIN_PIPELINE (default OFF).
 * Zero overhead on production traffic when flag is absent/false.
 *
 * Usage (additive, non-invasive — do NOT call from /api/learn/chat directly yet):
 *   import { runEducationalBrainPipeline } from '@/lib/educationalBrain/pipeline'
 *   const ctx = await runEducationalBrainPipeline({ userId, sessionId, subjectSlug, userMessage })
 *   // ctx is null when flag is off; otherwise a TurnContext with intent + retrieval results
 */
import { frameStage, type FrameInput } from './frameStage'
import { intentStage } from './intentStage'
import { retrievalStage } from './retrievalStage'
import type { TurnContext } from './types'

export function isEducationalBrainEnabled(): boolean {
  return process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE === 'true'
}

export async function runEducationalBrainPipeline(
  input: FrameInput,
): Promise<TurnContext | null> {
  if (!isEducationalBrainEnabled()) return null

  // Stage 0 — Frame (pure, synchronous)
  let ctx = frameStage(input)

  // Stage 1 — Intent (pure, synchronous)
  ctx = intentStage(ctx)

  // Stage 2 — Retrieval (async, DB read-only)
  ctx = await retrievalStage(ctx)

  return ctx
}
