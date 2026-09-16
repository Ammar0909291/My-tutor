/**
 * design doc §4.4 GAP CLOSED — recoveryGuard.ts's `dont_understand` patterns
 * widened to match conversationDecision.ts's `CONFUSION_RE`.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §4.4,
 * "reported here, fixed separately." Deferred by Batches 5, 6, and 7's own
 * commits/reports; closed here.
 *
 * THE GAP, verbatim from conversationDecision.ts's own header (the exact
 * evidence basis this fix uses, not re-derived): its `CONFUSION_RE` "was a
 * second, narrower copy of exactly the pattern H1 fixed in masteryGate: it
 * recognised 'don't understand' but not 'i not understand', 'i cannot
 * understand', 'i am not getting it'." That gap was fixed IN
 * conversationDecision.ts already; `recoveryGuard.ts`'s own `dont_understand`
 * patterns were never widened to match.
 *
 * THIS FILE PINS THE FIX AS A FIXED-DEFECT REGRESSION TEST: before this
 * commit, all three named phrasings returned `null` from `detectFailureState`
 * (confirmed by running them against `main` before the fix, not assumed) —
 * a real production learner writing "sir i not understand this" or
 * equivalent got the LEARNER_REQUEST-tier remediation (still correct
 * teaching) but NOT the RECOVERY tier (the authored recovery script, the
 * affect handling that rides with it, and — since Batch 6 — outright
 * priority over TEACH/CLOSE/etc. in `turnArbitration`). After this fix, all
 * three correctly return `dont_understand` and inherit RECOVERY for free.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { readLearnerMove } from '@/lib/teaching/learnerMove'

describe('FIXED DEFECT: the three exact phrasings conversationDecision.ts\'s own header names', () => {
  // Verbatim from that file's header comment — not paraphrased.
  const NAMED_PHRASINGS = ['i not understand', 'i cannot understand', 'i am not getting it']

  it.each(NAMED_PHRASINGS)('%s -> dont_understand (previously null)', (phrase) => {
    expect(detectFailureState(phrase)).toBe('dont_understand')
  })

  it.each(NAMED_PHRASINGS)('%s -> isDontKnowSignal true (previously false, since the key was null)', (phrase) => {
    expect(isDontKnowSignal(detectFailureState(phrase))).toBe(true)
  })
})

describe('the full 9-phrasing table from design doc §4.4 / learnerMoveAgreement.test.ts, re-measured', () => {
  // 8 of these 9 are now fixed by the 3 new patterns (reused verbatim from
  // conversationDecision.ts's CONFUSION_RE); the 9th ("i am very weak in
  // this") belongs to a DIFFERENT CONFUSION_RE fragment (the "weak in
  // this" family, ~L57) that this fix deliberately does NOT touch — see
  // the task's own explicit scope. It remains a genuine, reported,
  // unfixed residual gap.
  const NOW_FIXED = [
    'sir i not understand this',
    'i not understand',
    'i cannot understand',
    'i can not understand',
    "i couldn't understand",
    'i am not getting it',
    "i'm not getting it",
    'not able to understand',
  ]

  it.each(NOW_FIXED)('%s -> dont_understand', (phrase) => {
    expect(detectFailureState(phrase)).toBe('dont_understand')
  })

  it('the 9th phrasing, "i am very weak in this", is a DIFFERENT, DELIBERATELY UNFIXED gap', () => {
    // Out of scope for this fix by explicit instruction: CONFUSION_RE's
    // "weak in this" fragment is a separate family (self-reported
    // weakness), not one of the three named forms this fix closes.
    // Reported honestly, not silently patched.
    expect(detectFailureState('i am very weak in this')).toBeNull()
  })
})

describe('INHERITED FOR FREE: the reading picks this up with ZERO changes to learnerMove.ts', () => {
  const NO_EXTRA = { isBareAcknowledgement: false, isLowSignalAcknowledgement: false }

  it.each(['i not understand', 'i cannot understand', 'i am not getting it'])(
    '%s -> reading.has(\'DISTRESS\') is now true (previously false)',
    (phrase) => {
      const intent = readTurnIntent(phrase, null)
      const reading = readLearnerMove(intent, NO_EXTRA)
      expect(reading.has('DISTRESS')).toBe(true)
      // NOT_KNOWING is a DIFFERENT signal (isDontKnowSignal-gated inside
      // readLearnerMove) — dont_understand IS a dont-know signal (see
      // DONT_KNOW_SIGNAL_KEYS), so it fires too. Asserted for completeness,
      // not the point of this test.
      expect(reading.has('NOT_KNOWING')).toBe(true)
    },
  )

  it('learnerMove.ts itself required NO CHANGE — DISTRESS was always sourced from detectFailureState', () => {
    // Structural proof, not just "the test above passed": DISTRESS's own
    // firing condition (learnerMove.ts) is `intent.failureState !== null`,
    // unconditionally, for every value `detectFailureState` can return —
    // it needed no awareness of which patterns matched to begin picking up
    // a wider set of them.
    const src = readFileSync('src/lib/teaching/learnerMove.ts', 'utf-8')
    expect(src).toContain('if (intent.failureState !== null) {')
  })
})

describe('DOWNSTREAM: turnArbitration\'s RECOVERY rung now correctly wins for these messages too', () => {
  // Batch 6 wired `recoveryActive: learnerMoveStageAHoisted.has('DISTRESS')`
  // at the arbitrateTurn( call site — this is an AUTHORITY-level change, not
  // just telemetry, exactly as this task's own caution names.
  const NO_EXTRA = { isBareAcknowledgement: false, isLowSignalAcknowledgement: false }

  it('"i not understand this properly" (Batch 6\'s own negative-control message) now sets recoveryActive', () => {
    const intent = readTurnIntent('i not understand this properly', null)
    const reading = readLearnerMove(intent, NO_EXTRA)
    // This is the EXACT boolean route.ts now computes at the arbitrateTurn(
    // call site (learnerMoveStageAHoisted.has('DISTRESS')) — reproduced here
    // without importing route.ts, since it is a >10,000-line handler.
    expect(reading.has('DISTRESS')).toBe(true)
  })
})
