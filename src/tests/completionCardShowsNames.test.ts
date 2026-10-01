/**
 * The completion card printed a concept id to the learner.
 *
 * MEASURED LIVE 2026-10-01 (real account, post-deploy verification, lesson
 * Newton's Third Law): "✓ Lesson complete — Newton's Third Law —
 * Action-Reaction / Mastered: phys.mech.newtons-third-law". The card joined the
 * payload's id lists. The payload now also carries the concepts' names, and the
 * card shows those.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { startLessonAttempt, recordConceptOutcome, summaryFromAttempt } from '@/lib/teaching/lessonAttempt'
import { buildCompletionPayload } from '@/lib/teaching/lessonCompletion'

const ID = 'phys.mech.newtons-third-law'
const masteredState = { ...initialConversationState(ID), correctAtCheck: 1, correctAtPractice: 2 }

describe('the completion payload names its concepts', () => {
  const a0 = recordConceptOutcome(startLessonAttempt(`lesson:${ID}`, "Newton's Third Law — Action-Reaction", new Date('2026-10-01T21:25:00Z')), masteredState)
  const a = { ...a0, status: 'COMPLETED' as const }
  const payload = buildCompletionPayload(a, summaryFromAttempt(a), 20, { lang: 'en', conceptId: ID })

  it('keeps the ids for machine consumers', () => {
    expect(payload.mastered).toEqual([ID])
  })

  it('carries a learner-facing name, never the id', () => {
    expect(payload.masteredTitles).toHaveLength(1)
    expect(payload.masteredTitles[0]).not.toContain('phys.')
    expect(payload.masteredTitles[0]).toMatch(/Third Law/)
    expect(payload.needsReviewTitles).toEqual([])
  })
})

describe('the card shows the names', () => {
  const SRC = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')
  it('maps the names into the card state, not the ids', () => {
    expect(SRC).toContain('mastered: data.lessonComplete.masteredTitles ?? [],')
    expect(SRC).toContain('needsReview: data.lessonComplete.needsReviewTitles ?? [],')
    expect(SRC).not.toContain('mastered: data.lessonComplete.mastered ?? [],')
  })
})
