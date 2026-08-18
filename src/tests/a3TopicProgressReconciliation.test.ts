/**
 * A3 — a completed, verified lesson must not leave its concept IN_PROGRESS.
 *
 * MEASURED on the first completed mathematics lesson (session
 * cmsyuv2tw0001lb04jgzr7jqk): phase TRANSFER, correctAtCheck 1,
 * correctAtPractice 2, verifiedCorrectAtCheck 1, verifiedCorrectAtPractice 2,
 * signalContradictions 0, 4 passing PROBE_OUTCOME rows, lesson_attempts
 * COMPLETED — and topic_progress IN_PROGRESS / 65%.
 *
 * Root cause: at finalisation the route wrote TopicProgress only on the
 * conceptsNeedingReview branch. The conceptsMastered branch had no writer, so
 * the row kept the conversational writer's never-certify output.
 *
 * These tests pin the reconciliation AND the thing that must not move with it:
 * no invented score, no invented threshold, no downgrade.
 */
import { describe, it, expect, vi } from 'vitest'
import { markConceptMastered, markConceptForReview } from '@/lib/teaching/lessonAttemptStore'
import { deriveTopicStatus } from '@/lib/mastery/topicMasteryFormula'
import { masteryVerified } from '@/lib/teaching/masteryGate'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'

const ARGS = { userId: 'u1', subjectSlug: 'mathematics', topicSlug: 'math.arith.fraction-equivalence' }

function db(existing: { status: string; masteryPct: number | null } | null) {
  const update = vi.fn().mockResolvedValue({})
  return {
    db: {
      topicProgress: {
        findUnique: vi.fn().mockResolvedValue(existing),
        update,
        upsert: vi.fn().mockResolvedValue({}),
      },
    } as never,
    update,
  }
}

describe('a verified lesson certifies its concept', () => {
  it('promotes the real production row (IN_PROGRESS / 65%) to COMPLETED', async () => {
    const { db: d, update } = db({ status: 'IN_PROGRESS', masteryPct: 65 })
    await markConceptMastered(d, ARGS)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0].data.status).toBe('COMPLETED')
  })

  it('writes NO masteryPct — the score is evidence, not something to invent', async () => {
    const { db: d, update } = db({ status: 'IN_PROGRESS', masteryPct: 65 })
    await markConceptMastered(d, ARGS)
    expect(update.mock.calls[0][0].data).not.toHaveProperty('masteryPct')
  })

  it('uses the platform formula, so a low score still refuses to certify', async () => {
    // 40 < 50: deriveTopicStatus says IN_PROGRESS, and this writer obeys it
    // rather than certifying because the lesson said so.
    const { db: d, update } = db({ status: 'IN_PROGRESS', masteryPct: 40 })
    await markConceptMastered(d, ARGS)
    expect(update).not.toHaveBeenCalled()
    expect(deriveTopicStatus('IN_PROGRESS', 40)).toBe('IN_PROGRESS')
  })

  it('never downgrades MASTERED, and never certifies a REVISION concept', async () => {
    for (const status of ['MASTERED', 'REVISION', 'COMPLETED']) {
      const { db: d, update } = db({ status, masteryPct: 95 })
      await markConceptMastered(d, ARGS)
      expect(update, status).not.toHaveBeenCalled()
    }
  })

  it('creates nothing when no row exists — no row, no recorded evidence', async () => {
    const { db: d, update } = db(null)
    await markConceptMastered(d, ARGS)
    expect(update).not.toHaveBeenCalled()
  })
})

describe('the mastery bar itself is unchanged', () => {
  it('still requires 1 correct at CHECK and 2 at PRACTICE', () => {
    const base = initialConversationState('c')
    const at = (check: number, practice: number): ConversationState =>
      ({ ...base, correctAtCheck: check, correctAtPractice: practice })
    expect(masteryVerified(at(1, 2))).toBe(true)   // the session that completed
    expect(masteryVerified(at(1, 1))).toBe(false)
    expect(masteryVerified(at(0, 2))).toBe(false)
  })

  it('the review branch is untouched by this change', async () => {
    const { db: d } = db({ status: 'IN_PROGRESS', masteryPct: 65 })
    await markConceptForReview(d, ARGS)
    expect((d as unknown as { topicProgress: { upsert: ReturnType<typeof vi.fn> } })
      .topicProgress.upsert).toHaveBeenCalledTimes(1)
  })
})

describe('the route calls it on the branch that lacked a writer', () => {
  it('mastered and needs-review are now symmetric', async () => {
    const fs = await import('node:fs')
    const ROUTE = fs.readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(ROUTE).toContain('store.markConceptForReview(prisma, {')
    expect(ROUTE).toContain('store.markConceptMastered(prisma, {')
    expect(ROUTE).toContain('folded.conceptsMastered.includes(stateForOutcome.conceptId)')
  })
})
