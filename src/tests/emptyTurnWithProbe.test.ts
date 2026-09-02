/**
 * A LEARNER TURN MUST NEVER SHIP EMPTY WHILE A PROBE IS ON SCREEN.
 *
 * Measured on the real account (phys.mech.friction, 2026-09-02): the learner
 * answered the tutor's own prose question ("Easier or harder to slide?" ->
 * "harder"), and the reply shipped with EMPTY text and the pending MCQ
 * re-offered — no reaction, no lead-in, just silence beside a re-shown probe.
 *
 * Root cause (proven from the route): the early empty-with-mcq lead-in
 * (route ~5286) runs on the RAW model text and keys on the MCQ ATTACHED THIS
 * TURN (`mcqHoisted`). Here the probe was PENDING, and the model's follow-up
 * question was stripped to empty by a LATER post-model withhold — after the
 * early guard, and on a probe the early guard did not consider. There was no
 * post-strip backstop.
 *
 * Fix: a final guard at the response boundary — if the text is empty AND a probe
 * is actually being served (attached OR pending, via the same `mcqToServe` the
 * response and snapshot use), introduce the probe with the product's defined
 * compact lead-in. Deterministic, claims nothing, never fabricated, and fires
 * ONLY when a probe is present — so it cannot invent a question-only closing
 * turn (POSTHOC_REPAIR_CENSUS Finding 2 territory).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mcqToServe, type TutorMCQ } from '@/lib/teaching/mcq'

const LEAD_IN = 'Here is a question to check your understanding:'
const PROBE: TutorMCQ = { question: 'q?', options: ['a', 'b'], correctIndex: 0 }

/** The exact guard, mirrored so the reproduction runs the REAL mcqToServe. */
function finalTextGuard(cleanText: string, a: TutorMCQ | null, p: TutorMCQ | null, g: unknown | null): string {
  if (!cleanText.trim() && mcqToServe(a, p, g) !== null) return LEAD_IN
  return cleanText
}

describe('the empty-with-probe backstop', () => {
  it('empty text + a PENDING probe -> the compact lead-in (the measured case)', () => {
    expect(finalTextGuard('', null, PROBE, null)).toBe(LEAD_IN)
    expect(finalTextGuard('   \n ', null, PROBE, null)).toBe(LEAD_IN)
  })

  it('empty text + a freshly ATTACHED probe -> the lead-in too', () => {
    expect(finalTextGuard('', PROBE, null, null)).toBe(LEAD_IN)
  })

  it('non-empty text is never touched — teaching prose ships as written', () => {
    expect(finalTextGuard('Static friction adjusts to match the push.', null, PROBE, null))
      .toBe('Static friction adjusts to match the push.')
  })

  it('empty text + NO probe served is left empty — it does NOT fabricate a question-only turn', () => {
    // A probe graded THIS turn is no longer "served" (answered, not outstanding),
    // and with nothing on screen the guard must not invent a question — that is
    // the deliberate Finding-2 detection-only boundary, not this backstop.
    expect(finalTextGuard('', null, PROBE, { chosenIndex: 0, correct: true })).toBe('')
    expect(finalTextGuard('', null, null, null)).toBe('')
  })
})

describe('the guard is wired at the response boundary and reuses the product lead-in', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('fires only on empty text AND a served probe', () => {
    expect(ROUTE).toMatch(
      /!cleanText\.trim\(\)\s*\n?\s*&& mcqToServeForEmptyGuard\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\) !== null/,
    )
  })

  it('introduces the probe with the SAME compact lead-in the early guard uses', () => {
    // Both the early (~5286) and the final backstop use this exact string, so
    // the compact question presentation is one phrase, not two that can drift.
    expect((ROUTE.match(/Here is a question to check your understanding:/g) ?? []).length)
      .toBeGreaterThanOrEqual(2)
  })
})
