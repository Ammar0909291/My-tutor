/**
 * Educational Brain Decision Pipeline — stages 0–4.
 * Gated by ENABLE_EDUCATIONAL_BRAIN_PIPELINE (default OFF).
 * Zero overhead on production traffic when flag is absent/false.
 *
 * ARCHIVED — SHADOW CODE, NOT THE BRAIN OF RECORD.
 * Invoked fire-and-forget after the chat response is already built
 * (src/app/api/learn/chat/route.ts) — its output never reaches a student.
 * The live teaching-decision system is the canonical pipeline documented
 * in docs/architecture/EDUCATIONAL_BRAIN_V1.md (Teaching Engine decide()
 * -> Teaching Action Generator -> Dynamic Lesson Composer, plus the
 * src/lib/school/adaptive/* supporting/recommendation cluster), wired
 * synchronously into that same route. This file's status is independently
 * confirmed in that freeze's ARCHITECTURE_DECISIONS.md, Part 2 ("Two
 * pipelines, by design"). See also docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md.
 * Kept in place (not deleted) as a reference implementation and ideas
 * backlog — do not build new features on top of this pipeline without
 * amending that ADR.
 */
import { frameStage, type FrameInput } from './frameStage'
import { intentStage } from './intentStage'
import { retrievalStage } from './retrievalStage'
import { compositionStage } from './compositionStage'
import { persistStage } from './persistStage'
import type { TurnContext } from './types'

export function isEducationalBrainEnabled(): boolean {
  return process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE === 'true'
}

export async function runEducationalBrainPipeline(
  input: FrameInput,
): Promise<TurnContext | null> {
  if (!isEducationalBrainEnabled()) return null

  const wallStart = Date.now()

  // Stage 0 — Frame (pure, synchronous)
  let ctx = frameStage(input)

  // Stage 1 — Intent (pure, synchronous)
  ctx = intentStage(ctx)

  // Stage 2 — Retrieval (async, DB read-only)
  ctx = await retrievalStage(ctx)

  // Stage 3 — Composition (pure, formats concept context)
  ctx = compositionStage(ctx)

  // Stage 4 — Persist (async, single DB write, non-fatal)
  ctx = await persistStage(ctx)

  const totalMs = Date.now() - wallStart
  console.warn(`[EB] pipeline ${totalMs}ms turnId=${ctx.turnId} concept=${ctx.candidateConcept ?? 'none'}`)

  return ctx
}
