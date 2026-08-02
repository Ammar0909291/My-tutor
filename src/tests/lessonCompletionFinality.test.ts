/**
 * REMAINING POST-COMPLETION BUG — the finalising turn also taught.
 *
 * PRODUCTION:
 *   lesson completes -> summary appears -> "✓ Lesson finished" -> and the
 *   Brain asks ANOTHER teaching question in the same breath, sometimes
 *   repeating the identical reflection question ("What surprised you about
 *   Nature of Matter?") after the learner has already answered it.
 *
 * WHY IT SURVIVED THE EARLIER FIXES. Lesson IDENTITY was already fixed (P20):
 * StudentProgress.currentLesson is authoritative and the runtime resolves the
 * right lesson. What was never fixed is the ORDERING inside the finalising
 * turn:
 *
 *   turn START  lessonCompletedHoisted  <- read from the PREVIOUSLY persisted
 *                                          attempt. Still false, because this
 *                                          turn has not folded its evidence yet.
 *               -> D-0a / SERVE_LESSON_COMPLETE cannot fire
 *               -> the turn runs as an ordinary teaching turn
 *               -> the model drafts a new question
 *   turn END    shouldFinalizeLesson()  <- decided from THIS turn's evidence
 *               -> LessonAttempt CLOSED, completion payload built
 *               -> both the question AND "lesson finished" are returned
 *
 * buildLessonCompleteBlock() could not prevent it: it is prompt text
 * (advisory) and it is only injected on LATER turns, once the gate has
 * flipped.
 *
 * These tests cover ONLY that remaining bug. They do not restate P20's
 * lesson-identity coverage (src/tests/lessonTransitionOwnership.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  buildLessonCloseText, buildLessonCompleteBlock, shouldFinalizeLesson,
  requiredConceptsForLesson,
} from '@/lib/teaching/lessonCompletion'

const SUMMARY = {
  mastered: [{ conceptId: 'chem.found.matter', title: 'Nature of Matter', status: 'mastered' as const }],
  needsReview: [],
}

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('a completed lesson cannot ask another teaching question', () => {
  it('the close asks nothing at all', () => {
    const text = buildLessonCloseText('Nature of Matter', SUMMARY)
    expect(text).not.toContain('?')
  })

  it('the close names what was mastered and hands control back to the learner', () => {
    const text = buildLessonCloseText('Nature of Matter', SUMMARY)
    expect(text).toContain('Nature of Matter')
    expect(text).toContain('Start next lesson')
  })

  it('it never invites continuation on its own', () => {
    const text = buildLessonCloseText('Nature of Matter', SUMMARY)
    expect(text).not.toMatch(/let'?s (continue|keep going|move on)/i)
    expect(text).not.toMatch(/next,? (we|let)/i)
  })

  it('the finalising turn REPLACES the outgoing text with the close', () => {
    // The defect was that the model's already-drafted question was returned
    // alongside the completion payload.
    const payloadAt = ROUTE.indexOf('lessonCompletionHoisted = buildCompletionPayload(')
    const closeAt = ROUTE.indexOf('cleanText = buildLessonCloseText(')
    expect(payloadAt).toBeGreaterThan(-1)
    expect(closeAt).toBeGreaterThan(payloadAt)
    // and no second finalisation site sits between them
    expect(ROUTE.slice(payloadAt, closeAt)).not.toContain('finalizeLessonAttempt(')
  })

  it('nothing that solicits an answer rides along with the completion', () => {
    const finalise = ROUTE.slice(ROUTE.indexOf('cleanText = buildLessonCloseText('))
    const window = finalise.slice(0, 900)
    expect(window).toContain('mcqHoisted = null')
    expect(window).toContain('hintHoisted = null')
  })
})

describe('pending question cleared / repeated Brain prompt impossible', () => {
  it('the finalising turn marks the reflection question spent', () => {
    // Without this the next turn re-enters CHECK believing no reflection
    // question has been asked and asks the identical one again.
    const finalise = ROUTE.slice(ROUTE.indexOf('cleanText = buildLessonCloseText('))
    expect(finalise.slice(0, 1400)).toContain('reflectionAskedThisEntry: true')
  })

  it('the close text cannot itself be recorded as a new question', () => {
    // The question ledger records questions from the delivered text; a close
    // with no question mark contributes nothing to re-ask later.
    expect(buildLessonCloseText('X', SUMMARY)).not.toContain('?')
  })
})

describe('Brain state finalized / LessonAttempt closed', () => {
  it('finalisation is idempotent — a second closing turn cannot re-finalise', () => {
    const required = requiredConceptsForLesson('chem.found.matter')
    const closed = {
      status: 'COMPLETED' as const,
      conceptsMastered: ['chem.found.matter'],
      conceptsNeedingReview: [],
    }
    expect(shouldFinalizeLesson(required, closed as never)).toBe(false)
  })

  it('an unresolved lesson can never complete itself', () => {
    expect(requiredConceptsForLesson(null)).toEqual([])
    expect(shouldFinalizeLesson([], { status: 'IN_PROGRESS', conceptsMastered: [], conceptsNeedingReview: [] } as never)).toBe(false)
  })

  it('completion still requires every required concept to be closed', () => {
    const required = requiredConceptsForLesson('chem.found.matter')
    const open = { status: 'IN_PROGRESS' as const, conceptsMastered: [], conceptsNeedingReview: [] }
    const done = { status: 'IN_PROGRESS' as const, conceptsMastered: ['chem.found.matter'], conceptsNeedingReview: [] }
    expect(shouldFinalizeLesson(required, open as never)).toBe(false)
    expect(shouldFinalizeLesson(required, done as never)).toBe(true)
  })
})

describe('Continue / Got it cannot resume a completed lesson', () => {
  it('the already-complete serve renders the same close, not a lesson turn', () => {
    const text = buildLessonCloseText('Nature of Matter', SUMMARY, { alreadyFinished: true })
    expect(text).toContain('already finished')
    expect(text).not.toContain('?')
    expect(text).toContain('Start next lesson')
  })

  it('there is ONE close builder — the two paths cannot drift apart', () => {
    // The already-complete serve used to construct its own copy inline.
    expect(ROUTE).not.toMatch(/You've already finished \$\{/)
    const uses = ROUTE.match(/buildLessonCloseText\(/g) ?? []
    expect(uses.length).toBe(2) // finalising turn + already-complete serve
  })

  it('the deterministic serve makes no model call', () => {
    // provider=memory on that branch is what proves no provider was invoked.
    const serve = ROUTE.slice(ROUTE.indexOf('if (serveLessonComplete)'))
    expect(serve.slice(0, 1200)).toContain("provider = 'memory'")
  })

  it('the prompt block remains as defence in depth for later turns', () => {
    // Advisory, and no longer the only thing standing between a completed
    // lesson and another question.
    const block = buildLessonCompleteBlock()
    expect(block).toMatch(/do NOT ask another question/i)
  })
})

describe('Review / Restart still work', () => {
  it('the close is only built when a lesson actually finalises', () => {
    // Guarded by shouldFinalizeLesson, which is false for an already-COMPLETED
    // attempt — so re-entering a lesson via Review/Restart cannot trigger a
    // spurious close.
    const idx = ROUTE.indexOf('cleanText = buildLessonCloseText(')
    const guard = ROUTE.lastIndexOf('if (shouldFinalizeLesson(required, folded))', idx)
    expect(guard).toBeGreaterThan(-1)
    // The close sits inside that guard: no other branch or guard opens between
    // the finalisation test and the text replacement.
    const between = ROUTE.slice(guard, idx)
    expect(between).toContain('finalizeLessonAttempt(')
    expect(between).not.toMatch(/\n\s{18}\}\s*\n/) // guard block never closes first
  })

  it('Review/Restart go through lesson-init, which never finalises anything', () => {
    const init = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    expect(init).not.toContain('finalizeLessonAttempt')
    expect(init).not.toContain('buildLessonCloseText')
  })
})
