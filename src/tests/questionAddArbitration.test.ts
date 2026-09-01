/**
 * SUCCESS CONDITION #5 — a question cannot be ADDED to a turn except through the
 * one arbiter (turnArbitration). The "does a question ship this turn" decision
 * has ONE owner.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * POSTHOC_REPAIR_CENSUS.md Finding 1 flagged five post-model sites that touch
 * whether a question is on screen. Three (applyDontKnowCeiling,
 * withholdUngradedGateQuestion, withholdClosingProseQuestion) are pure STRIPS —
 * removing a question is safe by construction and needs no arbiter. The two that
 * ADD a question — the filler-repair swap and the completion-nudge — are the
 * only sites that can put a NEW question in front of a learner after generation,
 * and each was, historically, gated by its own ad-hoc booleans. Series B Phase 3
 * unified them onto `turnArbitration`: the filler add reads
 * `allows('FILLER_REPAIR')`, the nudge reads `allows('NEW_QUESTION')`. The
 * filler site's own comment records why — "a future authority added to the
 * ladder protects this site automatically instead of waiting for a fourth
 * production incident to add a fourth boolean."
 *
 * This test PINS that both add sites consult the arbiter, so a future third
 * add site (or a refactor that drops a guard) cannot ship an unguarded question.
 * It is the structural half of "gradeable-question decisions cannot be
 * contradicted by shipped output": an ADD that ignored the arbiter could put a
 * question on a RECOVERY / CLOSE / LEARNER_REQUEST turn the arbiter forbids.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The window of source immediately preceding a marker — where its guard lives. */
function preceding(marker: string, chars: number): string {
  const at = ROUTE.indexOf(marker)
  expect(at, `marker not found: ${marker}`).toBeGreaterThan(-1)
  return ROUTE.slice(Math.max(0, at - chars), at)
}

describe('the two post-model question-ADD sites are both arbitration-gated', () => {
  it('the filler-repair swap is inside an allows(FILLER_REPAIR) block', () => {
    // The canned question the filler swap installs.
    const guard = preceding(
      "cleanText = `Let me ask you something concrete", 3000,
    )
    expect(guard).toMatch(/turnArbitrationHoisted[^\n]*\)\.allows\('FILLER_REPAIR'\)/)
  })

  it('the completion-nudge is inside an allows(NEW_QUESTION) block', () => {
    const guard = preceding("Before we call this lesson finished, let's do", 1200)
    expect(guard).toMatch(/turnArbitrationHoisted[^\n]*\)\.allows\('NEW_QUESTION'\)/)
    // and it fires only after a completion claim was made in prose
    expect(guard).toContain('claimedCompletionInProse')
  })

  it("the model's own MCQ is withheld when the arbiter denies a new question", () => {
    // The gate side of the same owner: an unarbitrated MCQ cannot ship either.
    expect(ROUTE).toMatch(
      /if \(!\(turnArbitrationHoisted \?\? arbitrationUnavailable\(\)\)\.allows\('NEW_QUESTION'\) && mcqHoisted\)/,
    )
  })
})

describe('the arbiter is the single owner — consulted at the probe gate too', () => {
  it('authored-probe eligibility reads the arbiter', () => {
    expect(ROUTE).toMatch(/arbitrationAllowsProbe:\s*\(turnArbitrationHoisted[^\n]*\)\.allows\('AUTHORED_PROBE'\)/)
  })

  it('turnArbitration is imported and arbitrated once per turn', () => {
    expect(ROUTE).toContain("import { arbitrateTurn, arbitrationUnavailable } from '@/lib/teaching/turnArbitration'")
    expect((ROUTE.match(/turnArbitrationHoisted = arbitrateTurn\(/g) ?? []).length).toBe(1)
  })
})
