import { describe, it, expect } from 'vitest'
import { lessonAttemptStartDecision } from '@/lib/teaching/lessonAttempt'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * A FINISHED LESSON MUST STILL BE LEARNABLE.
 *
 * ── MEASURED IN PRODUCTION, NOT PREDICTED ───────────────────────────────────
 * 2026-08-12, real learner account, BRAND-NEW session, `mode: 'restart'` on
 * phys.meas.vector-addition. Three different learner turns —
 *
 *     "it moves faster i think"                        (a wrong answer)
 *     "i dont know i dont get it"                      (distress)
 *     "so when two people pull does the box go between them?"  (correct!)
 *
 * — each returned the SAME 146-character canned sentence, byte for byte, and
 * the runtime logs show no model call was made on any of them:
 *
 *     CUE decision = SERVE_LESSON_COMPLETE
 *     ruleId       = D0a-LESSON-ALREADY-COMPLETE
 *     RESPONSE provider=deterministic lessonKey=lesson:6 groq_invoked=false
 *     llmUsed: false
 *
 * ── THE MECHANISM ───────────────────────────────────────────────────────────
 * `lessonCompletedHoisted` (chat route) reads
 * `latestLessonAttempt(userId, subjectSlug, lessonKey)` — keyed on the LESSON,
 * never on the session — and D-0a refuses to teach a finished lesson before
 * every other rule fires. Re-opening the lesson created no new attempt:
 * `mode` only ever chose the opening PROMPT text. So the newest attempt stayed
 * COMPLETED forever and the concept became permanently unteachable for that
 * learner, in every future session.
 *
 * D-0a's own comment assumes the opposite — "Starting a NEW lesson clears
 * this" — which is true for a DIFFERENT lesson and silently false for the
 * SAME one. Revision is the same one.
 *
 * ── WHY THIS TEST IS A SOURCE ASSERTION ─────────────────────────────────────
 * The fix lives in an API route that needs a database, a session and an authed
 * user; the repo has no fixture harness for those (VALIDATION_FRAMEWORK_P10
 * Tier 3a is explicitly not built yet). Asserting the wiring exists in source
 * is weaker than executing it and is honestly labelled as such — but it is far
 * stronger than nothing, and it is exactly the class of guard that would have
 * caught this: the defect was never a logic error, it was a MISSING CALL.
 */
const ROUTE = path.join(process.cwd(), 'src/app/api/learn/lesson-init/route.ts')
const src = readFileSync(ROUTE, 'utf8')

const lineOf = (re: RegExp) => {
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) return i + 1
  return -1
}

describe('lesson-init re-opens a completed lesson', () => {
  it('imports and calls openLessonAttempt — the call whose absence was the defect', () => {
    expect(lineOf(/openLessonAttempt/)).toBeGreaterThan(0)
    expect(src).toMatch(/await openLessonAttempt\(prisma, \{/)
  })

  it('reads the latest attempt first, and only a re-teach disturbs an IN_PROGRESS one', () => {
    // Re-opening unconditionally would discard a lesson in flight, so the read
    // must still precede the open.
    const read = lineOf(/latestLessonAttempt\(prisma, \{/)
    const open = lineOf(/await openLessonAttempt\(prisma, \{/)
    expect(read).toBeGreaterThan(0)
    expect(open).toBeGreaterThan(read)

    // NARROWED 2026-08-30, deliberately. This previously read "an IN_PROGRESS
    // one is never disturbed", which was too strong and hid a real defect: an
    // ABANDONED attempt is also IN_PROGRESS, and `restart` over one inherited
    // its spent concept budget and its ladder. Measured on the real account,
    // physics lesson 24: turn one arrived at PRACTICE and the lesson closed on
    // turn three having taught nothing. The invariant that actually matters —
    // a lesson genuinely in flight is not discarded — is carried by resume and
    // next, which is what is pinned here.
    expect(lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'resume').freshStart).toBe(false)
    expect(lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'next').reason).toBeNull()
    expect(lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'restart').freshStart).toBe(true)
  })

  it('is scoped to the two modes that mean "teach me this again"', () => {
    // 'resume' must NOT re-open — resuming a finished lesson should still
    // deliver the close. 'next' moves to a different lessonKey entirely.
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'restart').freshStart).toBe(true)
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'review').freshStart).toBe(true)
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'resume').reason).toBeNull()
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'next').reason).toBeNull()
    expect(src).not.toMatch(/mode === 'resume'\s*\)\s*\{\s*[\s\S]{0,200}openLessonAttempt/)
  })

  it('keys the attempt by lesson order via lessonKeyFor, matching the chat route', () => {
    // The gate compares against lessonKeyFor({ lessonOrder }); a different key
    // here would create an attempt the gate never reads.
    expect(src).toMatch(/lessonKeyFor\(\{ lessonOrder \}\)/)
  })

  it('cannot break the lesson if the re-open fails', () => {
    // Advisory, like the activeLessonSlug write above it: a learner must still
    // get their lesson when this write fails.
    const open = lineOf(/await openLessonAttempt\(prisma, \{/)
    // Message renamed 2026-08-16 when the same block also became the opener for
    // a lesson's FIRST start (attempt-duration fix) — "re-open" no longer
    // described every case. The assertion is unchanged: the catch must follow
    // the open, so a failed write never costs the learner their lesson.
    const caught = lineOf(/lesson attempt open failed/)
    expect(caught).toBeGreaterThan(open)
  })

  it('records WHY in the source, so the next reader does not delete it as dead code', () => {
    expect(src).toMatch(/D0a-LESSON-ALREADY-COMPLETE/)
    expect(src).toMatch(/groq_invoked=false/)
  })
})
