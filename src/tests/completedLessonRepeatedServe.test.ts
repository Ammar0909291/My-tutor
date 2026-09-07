/**
 * THE STUCK-FOREVER LOOP — a learner reports (live transcript, Gauss's Law):
 * every message they send ("Понял" / "Got it" / "go") gets back the exact
 * same plain-text bubble —
 *
 *   "Gauss's Law is on pause — you haven't mastered it yet. Worth another
 *    look later: Gauss's Law. Press "Start next lesson" whenever you're
 *    ready to carry on."
 *
 * — with no button anywhere on screen, forever.
 *
 * ── ROOT CAUSE ────────────────────────────────────────────────────────────
 * `lessonCompletionHoisted` (the `data.lessonComplete` payload the client
 * needs to render the actionable completion CARD — Start Next Lesson /
 * Restart / Close) was set in exactly ONE place: the outcome-recording block
 * that runs on the SINGLE turn a lesson finalises (guarded on
 * `!lessonCompletedHoisted`, so it can never re-fire once the attempt is
 * COMPLETED). Every LATER turn on that same completed lesson goes through
 * the P13 "already complete" branch instead, which built the identical close
 * TEXT from the same persisted attempt (via `buildLessonCloseText`) but never
 * attached the payload alongside it.
 *
 * `LessonScreen.tsx`'s `setLessonCompletion(...)` — the ONLY place that ever
 * sets the card's React state — fires exclusively off `data.lessonComplete`;
 * there is no hydration from persisted chat history on mount/resume. So the
 * moment a learner did not act on the card the ONE time it was ever sent
 * (closed the tab, refreshed, resumed the session later, or simply kept
 * typing past it), the card was gone for good: every future turn re-served
 * the same text with no `lessonComplete` payload, so it always rendered as
 * an ordinary chat bubble with nothing clickable — the transcript above,
 * happening on every single turn no matter what the learner typed.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────
 * The P13 branch now ALSO calls `buildCompletionPayload` — the exact same
 * builder the finalising turn uses — from the SAME `attempt` + `summary` the
 * close text was just built from, so `data.lessonComplete` (and therefore
 * the actionable card) accompanies EVERY re-serve, not just the first one.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  buildLessonCloseText, buildCompletionPayload,
} from '@/lib/teaching/lessonCompletion'
import type { LessonAttemptOutcome } from '@/lib/teaching/lessonAttempt'
import { summaryFromAttempt } from '@/lib/teaching/lessonAttempt'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

const ALREADY_COMPLETE_ATTEMPT: LessonAttemptOutcome = {
  status: 'COMPLETED',
  lessonKey: 'phys.em.gauss-law',
  lessonTitle: "Gauss's Law",
  startedAt: new Date('2026-09-01T00:00:00Z'),
  completedAt: new Date('2026-09-01T00:10:00Z'),
  durationSeconds: 600,
  conceptsMastered: [],
  conceptsNeedingReview: ['phys.em.gauss-law'],
  misconceptionsCorrected: [],
  teachingAttempts: 3,
  budgetExhaustions: 1,
}

describe('an already-complete re-serve rebuilds the same completion payload the finalising turn built', () => {
  it('buildCompletionPayload accepts the SAME (attempt, summary) shape buildLessonCloseText already reads', () => {
    const summary = summaryFromAttempt(ALREADY_COMPLETE_ATTEMPT)
    const text = buildLessonCloseText(ALREADY_COMPLETE_ATTEMPT.lessonTitle, summary, { alreadyFinished: true })
    const payload = buildCompletionPayload(ALREADY_COMPLETE_ATTEMPT, summary, 42)

    // Nothing was mastered (conceptsMastered: []), so this is the "on pause"
    // wording — the EXACT text from the live production transcript this
    // fix responds to, not the "already finished" wording (which requires
    // something in `mastered`).
    expect(text).toContain('on pause')
    expect(text).toContain("haven't mastered it yet")
    expect(payload.complete).toBe(true)
    expect(payload.lessonKey).toBe('phys.em.gauss-law')
    expect(payload.needsReview).toEqual(['phys.em.gauss-law'])
    expect(payload.mastered).toEqual([])
    // Never fabricated: nextLessonOrder is derived from the SAME
    // currentLessonOrder the caller passes, not invented here.
    expect(payload.nextLessonOrder).toBe(43)
  })

  it('the P13 already-complete branch calls buildCompletionPayload, not just buildLessonCloseText', () => {
    const p13Start = ROUTE.indexOf('P13 — LESSON ALREADY COMPLETE')
    const p13End = ROUTE.indexOf('\n      }\n', ROUTE.indexOf('if (serveLessonComplete) {', p13Start))
    const block = ROUTE.slice(p13Start, p13End)
    expect(block).toContain('buildCompletionPayload')
    expect(block).toContain('lessonCompletionHoisted = buildCompletionPayload(')
    // Built from the SAME attempt + summary the close text uses — never a
    // second read, never partially-filled fields.
    expect(block).toMatch(/buildCompletionPayload\(\s*\n\s*attempt, summary, lessonCtx\?\.currentLesson \?\? null,/)
  })

  it('the assignment happens on the SAME branch that sets provider=memory (no model call introduced)', () => {
    const p13Start = ROUTE.indexOf('if (serveLessonComplete) {')
    const payloadIdx = ROUTE.indexOf('lessonCompletionHoisted = buildCompletionPayload(', p13Start)
    const providerIdx = ROUTE.indexOf("provider = 'memory'", p13Start)
    expect(payloadIdx).toBeGreaterThan(p13Start)
    expect(providerIdx).toBeGreaterThan(payloadIdx)
  })

  it('two call sites build this payload now: the finalising turn and the already-complete re-serve — never a third, ad-hoc one', () => {
    const uses = [...ROUTE.matchAll(/lessonCompletionHoisted = buildCompletionPayload\(/g)]
    expect(uses.length).toBe(2)
  })

  it('the re-serve path still makes no provider call — reusing the builder does not add a Gemini/Groq round trip', () => {
    const serve = ROUTE.slice(ROUTE.indexOf('if (serveLessonComplete)'))
    const window = serve.slice(0, 2800)
    expect(window).not.toMatch(/routeAI\(/)
    expect(window).toContain("provider = 'memory'")
  })
})

describe('the client renders the card from data.lessonComplete unconditionally (no turn-type gate)', () => {
  it('LessonScreen sets lessonCompletion off data.lessonComplete?.complete alone, not off which branch served the turn', () => {
    const screen = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')
    const idx = screen.indexOf('data.lessonComplete?.complete === true')
    expect(idx).toBeGreaterThan(-1)
    const block = screen.slice(idx, idx + 400)
    expect(block).toContain('setLessonCompletion({')
  })
})
