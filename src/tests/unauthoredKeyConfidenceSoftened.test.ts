/**
 * AN UNAUTHORED KEY MUST NOT BE CELEBRATED OR CORRECTED WITH FULL CONFIDENCE.
 *
 * ── THE DEFECT, REPRODUCED LIVE ─────────────────────────────────────────────
 * Driving `phys.meas.units` on a real account (2026-09-14): the model asked
 * its own unkeyed question, self-graded the answer, and the reply opened
 * "🎉 Great job!" while the SAME payload carried `mastery.unverifiedReason:
 * 'invented-key'`, `completionSuppressed: true` — the learner is told they
 * got it right; the system cannot confirm that.
 *
 * `confirmCorrectAnswer` and `stateCorrectionForWrongAnswer` both document
 * themselves as firing only against "an authored, human-reviewed key" — but
 * neither route.ts call site actually enforced that: both read
 * `mcqGradeHoisted?.correct` directly, which is `true`/`false` for ANY graded
 * probe, authored or model-invented. `unauthoredKeyGradeHoisted` (the exact
 * flag that already drives `unverifiedReason: 'invented-key'`) was computed
 * earlier in the same request and simply never consulted by either enforcer.
 *
 * The risk cuts both ways, and the worse direction is documented precedent,
 * not speculation: `inventedProbeGuard.ts` records `phys.mech.friction`
 * sessions where the model's own invented key was mathematically WRONG
 * (keying μ·mg·sin30 where the normal force needs cos30) — in which case
 * `stateCorrectionForWrongAnswer` would have confidently told a CORRECT
 * learner "Not quite — the answer is: <the model's own error>", stated as
 * fact off `options[correctIndex]`.
 *
 * ── THE FIX, AND WHAT IT DELIBERATELY DOES NOT DO ───────────────────────────
 * This does not attempt to determine whether an invented key is actually
 * right — that needs solving the underlying problem, which
 * wrongAnswerCorrection.ts's own header already names as out of scope
 * ("Fixing that means verifying the key, which means solving the physics.
 * This makes the RECORD honest, not the feedback."). It only stops the reply
 * from ASSERTING a certainty the system has already flagged as unverifiable:
 * `correctForConfirmation` (route.ts) is forced to `null` whenever
 * `unauthoredKeyGradeHoisted` is true, so neither enforcer's own
 * `correct !== true` / `correct !== false` early return can be bypassed —
 * they become genuine no-ops on these turns, exactly as their headers already
 * claimed.
 *
 * The model's own SPONTANEOUS celebratory claim (never server-injected, so
 * gating the enforcers cannot touch it) is separately stripped via
 * `stripLeadingFalseConfirmation` — reused, not re-implemented, and scoped
 * exactly as its own header already scopes it: opening sentence only.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { confirmCorrectAnswer, stripLeadingFalseConfirmation } from '@/lib/teaching/answerConfirmation'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'

describe('neither enforcer can inject confident text when the key is unauthored', () => {
  it('confirmCorrectAnswer is a no-op when correctForConfirmation is null (server-graded correct, key unauthored)', () => {
    // The exact shape route.ts now produces: mcqGradeHoisted?.correct === true,
    // but correctForConfirmation forced to null because unauthoredKeyGradeHoisted.
    const result = confirmCorrectAnswer({
      text: 'Let\'s try another example.',
      correct: null, // what the route now passes, not the raw server grade
      priorConfirmations: 0,
    })
    expect(result.added).toBe(false)
    expect(result.text).toBe('Let\'s try another example.')
  })

  it('stateCorrectionForWrongAnswer is a no-op when correctForConfirmation is null (server-graded wrong, key unauthored)', () => {
    const result = stateCorrectionForWrongAnswer({
      text: 'Let\'s look at this differently.',
      correct: null,
      probe: { options: ['A', 'B', 'C'], correctIndex: 1 },
    })
    expect(result.added).toBe(false)
    expect(result.reason).toBe('not-graded-wrong')
    expect(result.text).toBe('Let\'s look at this differently.')
  })
})

describe('the model\'s own spontaneous celebration is stripped, reproduced verbatim from production', () => {
  it('strips the exact "🎉 Great job!" opening from the phys.meas.units transcript', () => {
    // Byte-for-byte the reply captured on the real account, 2026-09-14,
    // turn T5 of the phys.meas.units session — the exact turn whose payload
    // carried unverifiedReason: 'invented-key'.
    const real = '🎉 Great job! \n' +
      '✓ Common mistakes — forgetting that the unit must be the agreed standard ' +
      '(mixing up centimeters with meters) and dropping the unit when doing ' +
      'calculations.\n\n' +
      'Before we call this lesson finished, let\'s do 2 practice questions ' +
      'together — ready?'
    const stripped = stripLeadingFalseConfirmation(real)
    expect(stripped).not.toContain('Great job')
    expect(stripped).not.toContain('🎉')
    // The rest of the teaching content survives — this is a strip, not a
    // wholesale replacement.
    expect(stripped).toContain('Common mistakes')
    expect(stripped).toContain('2 practice questions')
  })

  it('leaves an ordinary reply with no leading claim untouched', () => {
    const text = 'Let\'s look at another example: a kitchen scale showing 3 grams.'
    expect(stripLeadingFalseConfirmation(text)).toBe(text)
  })
})

describe('route.ts wiring — the shared derivation and both call sites', () => {
  const route = fs.readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('correctForConfirmation is derived once, from the collapsed ServerGrade', () => {
    // Pre-Typed-Turn-Contract-Batch-3 assertion (kept verbatim, no longer
    // matches source — design doc §6 Batch 3, "answer-verdict cluster",
    // collapsed `mcqGradeHoisted`/`unauthoredKeyGradeHoisted`/
    // `gradedAgainstServerKeyHoisted` into `ServerGrade` + `certifies`/
    // `mayStateVerdict`):
    //   expect(route).toMatch(
    //     /const correctForConfirmation = unauthoredKeyGradeHoisted \? null : \(mcqGradeHoisted\?\.correct \?\? null\)/,
    //   )
    // `gradeForVerdict` is `resolvedGrade !== null && resolvedGrade.kind ===
    // 'graded' && mayStateVerdict(resolvedGrade) ? resolvedGrade : null` —
    // provably equivalent to the old expression: see `resolvedGrade`'s own
    // comment in route.ts and this batch's commit message for the
    // case-by-case proof. Same invariant, new source.
    expect(route).toMatch(/const correctForConfirmation = gradeForVerdict\?\.correct \?\? null/)
    expect(route).toMatch(/const gradeForVerdict: \{ readonly correct: boolean \} \| null =/)
    expect(route).toMatch(/mayStateVerdict\(resolvedGrade\)/)
  })

  it('both enforcers read correctForConfirmation, never the raw server grade directly', () => {
    const confirmAt = route.indexOf('confirmCorrectAnswer({')
    const correctAt = route.indexOf('stateCorrectionForWrongAnswer({')
    expect(confirmAt).toBeGreaterThan(0)
    expect(correctAt).toBeGreaterThan(confirmAt)
    expect(route.slice(confirmAt, confirmAt + 200)).toContain('correct: correctForConfirmation')
    expect(route.slice(correctAt, correctAt + 200)).toContain('correct: correctForConfirmation')
  })

  it('the derivation runs before both call sites', () => {
    const derivationAt = route.indexOf('const correctForConfirmation =')
    const confirmAt = route.indexOf('confirmCorrectAnswer({')
    const correctAt = route.indexOf('stateCorrectionForWrongAnswer({')
    expect(derivationAt).toBeGreaterThan(0)
    expect(derivationAt).toBeLessThan(confirmAt)
    expect(derivationAt).toBeLessThan(correctAt)
  })

  it('the model\'s own spontaneous claim is stripped only when the key was unauthored', () => {
    // Pre-Typed-Turn-Contract-Batch-3 assertion (kept verbatim, no longer
    // matches source — Batch 3 moved `correctForConfirmation`'s declaration
    // up to the D1 derivation block, ~1,000 lines before the strip that used
    // to sit immediately after it; the strip's own gate condition changed
    // from `unauthoredKeyGradeHoisted` to the provably-equivalent
    // `resolvedGrade !== null && !certifies(resolvedGrade)`):
    //   const derivationAt = route.indexOf('const correctForConfirmation =')
    //   const stripBlock = route.slice(derivationAt, derivationAt + 800)
    //   expect(stripBlock).toContain('if (unauthoredKeyGradeHoisted)')
    //   expect(stripBlock).toContain('stripLeadingFalseConfirmation')
    // Same invariant, new source: anchored on the gate itself, since
    // `stripLeadingFalseConfirmation` also appears earlier (in a comment)
    // and later (the re-offer guard's own, unrelated call).
    const gateAt = route.indexOf('if (resolvedGrade !== null && !certifies(resolvedGrade))')
    expect(gateAt).toBeGreaterThan(0)
    const stripBlock = route.slice(gateAt, gateAt + 400)
    expect(stripBlock).toContain('stripLeadingFalseConfirmation')
  })

  it('the C5 telemetry reads correctForConfirmation, not the raw server grade', () => {
    // A turn withheld for an unauthored key must not be logged as a MISSED
    // confirmation — see the comment above this line in route.ts.
    const callStart = route.indexOf('confirmCorrectAnswer({')
    const block = route.slice(callStart, callStart + 1900)
    expect(block).toMatch(/if \(correctForConfirmation === true\)/)
    expect(block).not.toMatch(/if \(mcqGradeHoisted\?\.correct === true\)/)
  })
})
