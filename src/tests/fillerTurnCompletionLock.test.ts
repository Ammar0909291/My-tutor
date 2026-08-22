/**
 * P1 — "got it" after completion, SECOND root cause (2026-08-22).
 *
 * Live-reproduced against production (fresh throwaway QA account, real
 * lesson genuinely completed via budget exhaustion, then "got it" sent):
 *
 *   "got it" -> "Let me ask you something concrete about SI Units and
 *   Measurement: what's one thing you notice or find surprising about what
 *   we just covered?" (provider=memory, llmCallCount=0)
 *
 * ROOT CAUSE: route.ts's filler-turn repair (Bug 4) replaces a detected-
 * filler response with a canned probing reflection question, guarded only
 * against a completed lesson's turn carrying genuine NEW intent
 * (`lessonCompletionRespectsNewIntentHoisted`). It said nothing about an
 * ORDINARY acknowledgement on a completed lesson — the far more common
 * case. The completion-lock prompt correctly tells the model to answer such
 * a turn with a brief, non-probing confirmation, and a brief warm
 * confirmation ("we can continue", "whenever you're ready") is exactly the
 * shape `detectFillerTurn`'s `FILLER_PHRASE_RE` is built to catch — so a
 * model that OBEYED the completion lock had its compliant reply overwritten
 * with a brand-new question, on a lesson already marked finished. This is a
 * pure text substitution (llmCallCount=0), so no prompt instruction could
 * ever have prevented it — the earlier gateAssessment `lessonCompleted`
 * bypass (a different call site) does not reach this one.
 *
 * FIX: `shouldRepairFillerTurn` (lessonCompletion.ts) — a completed lesson
 * never gets the filler-repair substitution, new intent or not.
 */
import { describe, it, expect } from 'vitest'
import { shouldRepairFillerTurn } from '@/lib/teaching/lessonCompletion'

describe('shouldRepairFillerTurn', () => {
  it('an ordinary (non-completed) lesson still gets the filler repair (no regression)', () => {
    expect(shouldRepairFillerTurn({ lessonCompleted: false, respectsNewIntent: false })).toBe(true)
  })

  it('a completed lesson with genuine new intent: unaffected — was already excluded', () => {
    expect(shouldRepairFillerTurn({ lessonCompleted: true, respectsNewIntent: true })).toBe(false)
  })

  it('THE FIX: a completed lesson with an ordinary acknowledgement ("got it") is now also excluded', () => {
    expect(shouldRepairFillerTurn({ lessonCompleted: true, respectsNewIntent: false })).toBe(false)
  })

  it('respectsNewIntent alone (without lessonCompleted) still suppresses repair — preserves the pre-existing guard', () => {
    // respectsNewIntent is only ever computed true inside the
    // lessonCompletedHoisted branch in route.ts in practice, so this exact
    // combination should never occur live — asserted here only to pin the
    // predicate's logic (either flag alone is sufficient to suppress
    // repair) rather than assume the caller supplies a coupled pair.
    expect(shouldRepairFillerTurn({ lessonCompleted: false, respectsNewIntent: true })).toBe(false)
  })
})
