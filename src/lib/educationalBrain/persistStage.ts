/**
 * Stage 4 — Persist.
 * Writes one EbEvidenceEvent row when a concept was surfaced (ASSET_SHOWN category
 * is the closest fit for "concept surface" in the seeded schema; category is the
 * type of evidence event). Non-fatal — never throws, never sets shortCircuit.
 * Async, DB write (single lightweight INSERT).
 */
import { prisma } from '@/lib/db/prisma'
import type { TurnContext } from './types'

function gradeToGradeBand(grade: number | null | undefined): string {
  if (!grade) return 'g_9_10'
  if (grade <= 5) return 'k_5'
  if (grade <= 8) return 'g_6_8'
  if (grade <= 10) return 'g_9_10'
  if (grade <= 12) return 'g_11_12'
  return 'undergrad'
}

export async function persistStage(ctx: TurnContext): Promise<TurnContext> {
  const start = Date.now()

  // Only persist when we successfully retrieved a concept
  if (!ctx.candidateConcept || ctx.shortCircuit) {
    return {
      ...ctx,
      spans: [...ctx.spans, { stage: 'persist', startedAt: start, durationMs: 0, notes: 'skipped — no concept or shortCircuit' }],
    }
  }

  try {
    await prisma.ebEvidenceEvent.create({
      data: {
        userId: ctx.userId,
        sessionId: ctx.sessionId,
        turnId: ctx.turnId,
        conceptId: ctx.candidateConcept,
        language: 'en',
        gradeBand: gradeToGradeBand(null) as never,
        category: 'ASSET_SHOWN' as never,
        outcome: 'CONCEPT_SURFACE',
        strength: 0.5,
      },
    })
  } catch (err) {
    console.warn('[EB persist] DB write failed (non-fatal):', err)
  }

  return {
    ...ctx,
    spans: [...ctx.spans, { stage: 'persist', startedAt: start, durationMs: Date.now() - start }],
  }
}
