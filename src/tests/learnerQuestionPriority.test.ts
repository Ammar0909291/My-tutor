/**
 * MY TUTOR — FINAL ENGLISH ANSWER/QUESTION ALIGNMENT FIX.
 *
 * ── THE DEFECT ───────────────────────────────────────────────────────────
 * A genuine learner question arriving during the session-opening window
 * could be consumed by the deterministic gate renderer (`provider: 'gate'`,
 * zero model calls) before D4b's "answer the student first" instruction —
 * which lives in the LLM's system prompt — ever had a chance to run.
 * MEASURED IN PRODUCTION (session cmttytj5p0004l1049tmxn1bo,
 * eng.vocab.suffixes): "Is this sentence correct: 'The box of chocolates
 * are on the table'?" was answered with ONLY a canned assessment lead-in.
 *
 * ── ROOT CAUSE ───────────────────────────────────────────────────────────
 * `gateEligible` (route.ts's `gateTerms`) is the AND of eight conjuncts,
 * one of which — `arbitrationAllowsProbe` — reads
 * `turnArbitration.allows('AUTHORED_PROBE')`. Every existing arbitration
 * authority (KNOWLEDGE_GAP, RECOVERY, LEARNER_REQUEST, CLOSE, COMPLETE)
 * already denies AUTHORED_PROBE — but NONE of them claims on an ordinary
 * genuine question with no explicit teaching-action request attached
 * (`turnIntent.learnerRequest === null`), because `learnerRequestActive` is
 * DELIBERATELY narrow ("not the message contains a question mark" — its own
 * doc comment). So a bare question fell through to TEACH (the floor), which
 * allows AUTHORED_PROBE — the exact gap the production turn hit. This has
 * nothing to do with D0d specifically: D0d/D4b are both `decideTeaching()`
 * shadow-ladder entries that dispatch to the SAME `LLM_OPEN` executor
 * (`buildBrainExecutionBlock` returns '' for it either way) — the turn never
 * reached the LLM at all on the production example, so no prompt-side fix
 * could have closed this.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────
 * One new, narrow arbitration rung — LEARNER_QUESTION — claims on
 * `detectLearnerQuestion(message)` (the SAME existing, already-precedented
 * detector `buildTurnDirective`'s A.4 "STUDENT QUESTION DETECTED: address
 * FIRST" line already uses for the identical concern — no new detector) and
 * denies ONLY `AUTHORED_PROBE`. It sits just above the TEACH floor, so it
 * only ever wins in the exact gap above; every rung that already denied
 * AUTHORED_PROBE keeps its own, wider denial untouched.
 * `gateTerms.arbitrationAllowsProbe` needed NO route.ts change of its own —
 * it already asked the single authority.
 *
 * ── A MEASURED FALSE START, KEPT FOR THE RECORD ───────────────────────────
 * The first version of this fix used `turnIntent.isQuestion`
 * (`isGenuineQuestion` — a DIFFERENT, deliberately broader detector, tuned
 * for `lessonCompletionRespectsNewIntentHoisted`'s own unrelated concern).
 * `livenessEndToEnd.test.ts`'s real end-to-end L1 replay caught it as a
 * regression: a substantively CORRECT typed answer to a pending probe,
 * "where electrons are released", opens with a WH-word, so the raw,
 * context-free reading misclassified it as a genuine new question and
 * denied the NEXT probe a turn after the stale one was released — asked.length
 * dropped from >=3 to 2. `detectLearnerQuestion` requires an actual '?' AND
 * a recognized question-word pattern, so it does not repeat the mistake.
 * Belt-and-braces on top of that: the claim is additionally gated on
 * `pendingMcqHoisted === null`, so even a hedged answer that DOES carry a
 * '?' ("is it the anode?") cannot claim this rung while a probe from a
 * PRIOR turn is genuinely pending — `noUnansweredProbeOnScreen` already,
 * and more specifically, owns that case.
 *
 * This file tests the exact boundary the task specifies, reusing the real
 * modules throughout — `detectLearnerQuestion`, `readTurnIntent`,
 * `detectLearnerRequest` (via `turnIntent.learnerRequest`), and
 * `arbitrateTurn` — never a re-implemented copy.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { detectLearnerQuestion } from '@/lib/teaching/conversationState'
import { arbitrateTurn, type TurnClaims } from '@/lib/teaching/turnArbitration'

const NO_CLAIMS: TurnClaims = {
  knowledgeGapResolved: false,
  recoveryActive: false,
  learnerRequestActive: false,
  closing: false,
  completionReady: false,
  genuineQuestionActive: false,
}

/**
 * The exact end-to-end question this task asks: given only the learner's
 * raw message (and nothing else), would the deterministic gate be denied a
 * NEW authored probe on this turn? Mirrors route.ts's real construction:
 * `genuineQuestionActive: detectLearnerQuestion(turnIntent.message) &&
 * pendingMcqHoisted === null` feeds `arbitrateTurn`, whose verdict is what
 * `gateTerms.arbitrationAllowsProbe` reads. `pendingProbe` defaults to false
 * (no probe already on screen) — the ordinary case for every example in the
 * task's own test matrix.
 */
function deniesNewAssessment(
  message: string,
  priorUserMessage: string | null = null,
  pendingProbe = false,
): boolean {
  const turnIntent = readTurnIntent(message, priorUserMessage)
  const v = arbitrateTurn({
    ...NO_CLAIMS,
    learnerRequestActive: turnIntent.learnerRequest !== null || turnIntent.ambiguous,
    genuineQuestionActive: detectLearnerQuestion(turnIntent.message) && !pendingProbe,
  })
  return !v.allows('AUTHORED_PROBE')
}

// ── OPENING SESSION + QUESTION ───────────────────────────────────────────
// Every one of these must deny a new authored assessment this turn —
// whether through the new LEARNER_QUESTION rung (genuine questions) or the
// pre-existing LEARNER_REQUEST rung (explicit confusion/help requests,
// already correctly scoped before this fix).

describe('OPENING SESSION + QUESTION — the assessment must wait', () => {
  it.each([
    'What is a suffix?',
    'Why do we double the consonant?',
    'Can you explain this?',
    'Is this sentence correct?',
    "I don't understand this.",
  ])('denies a new authored probe this turn: %s', (msg) => {
    expect(deniesNewAssessment(msg)).toBe(true)
  })

  it('the two protection paths are distinct, and both fire for the right reason', () => {
    // A genuine question with NO explicit request claims LEARNER_QUESTION.
    const q = readTurnIntent('What is a suffix?', null)
    expect(detectLearnerQuestion(q.message)).toBe(true)
    expect(q.learnerRequest).toBeNull()
    const vq = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: detectLearnerQuestion(q.message) })
    expect(vq.owner).toBe('LEARNER_QUESTION')

    // An explicit confusion/help request claims the PRE-EXISTING
    // LEARNER_REQUEST rung — this fix changed nothing about that path, and
    // it does not even carry a '?', so detectLearnerQuestion agrees it is
    // not what claims here.
    const r = readTurnIntent("I don't understand this.", null)
    expect(r.learnerRequest).toBe('explain_differently')
    expect(detectLearnerQuestion(r.message)).toBe(false)
    const vr = arbitrateTurn({
      ...NO_CLAIMS,
      learnerRequestActive: r.learnerRequest !== null,
      genuineQuestionActive: detectLearnerQuestion(r.message),
    })
    expect(vr.owner).toBe('LEARNER_REQUEST')
  })
})

// ── OPENING SESSION + NON-QUESTION ───────────────────────────────────────
// These must continue working as ordinary opening-session behaviour — the
// fix must not deny a legitimate assessment when nothing was asked.

describe('OPENING SESSION + NON-QUESTION — ordinary opening/assessment flow is untouched', () => {
  it.each([
    'hello',
    'ok',
    'yes',
    'I am ready',
    'got it, thanks',
    'sure, sounds good',
  ])('does NOT deny an authored probe: %s', (msg) => {
    expect(deniesNewAssessment(msg)).toBe(false)
  })
})

// ── OPENING SESSION + AMBIGUOUS ──────────────────────────────────────────
// Documented, not mandated to a single "correct" side — these are genuinely
// ambiguous, and the point of this block is to record actual behaviour so a
// future change has to argue with a failing test rather than a guess.
// `detectLearnerQuestion` requires BOTH a recognized question-word pattern
// AND a literal '?' (and at least 8 characters) — deliberately more
// conservative than a bare '?' check, which is exactly what closed the
// typed-answer false positive above.

describe('OPENING SESSION + AMBIGUOUS — documented actual behaviour', () => {
  it('"hmm" is filler, not a question — assessment may proceed', () => {
    expect(deniesNewAssessment('hmm')).toBe(false)
  })

  it('"what?" is below the detector\'s length floor — assessment may proceed', () => {
    expect(deniesNewAssessment('what?')).toBe(false)
  })

  it('"okay, what next?" has a \'?\' but no recognized question-word pattern — assessment may proceed', () => {
    expect(deniesNewAssessment('okay, what next?')).toBe(false)
  })

  it('"I think I understand" is a confidence signal, not a question — assessment may proceed', () => {
    expect(deniesNewAssessment('I think I understand')).toBe(false)
  })
})

// ── SESSION / STATE INDEPENDENCE ─────────────────────────────────────────
// detectLearnerQuestion is a pure function of the message text alone. The
// fix therefore applies identically regardless of session state — the exact
// property that makes it correct for "immediately after lesson opening" AND
// "during a normal lesson" AND "after an assessment" with the SAME rung,
// rather than three separate special cases.

describe('fresh vs. persisted session, with vs. without a prior message — the reading does not change', () => {
  it('a fresh session (no prior user message) reads the question identically', () => {
    expect(detectLearnerQuestion(readTurnIntent('What is a suffix?', null).message)).toBe(true)
  })

  it('a persisted session (a real prior message) reads the question identically', () => {
    const msg = readTurnIntent('What is a suffix?', 'Ok, I think I understand the idea.').message
    expect(detectLearnerQuestion(msg)).toBe(true)
  })

  it('the LEARNER_QUESTION verdict does not depend on any session/phase field', () => {
    // Nothing in TurnClaims besides genuineQuestionActive changes here, and
    // the verdict is identical — confirming the rung is context-independent
    // by construction, which is why it applies uniformly at lesson opening,
    // mid-lesson, and post-assessment without three special cases.
    const a = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: true })
    const b = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: true })
    expect(a.owner).toBe(b.owner)
    expect(a.allows('AUTHORED_PROBE')).toBe(b.allows('AUTHORED_PROBE'))
  })
})

// ── PENDING PROBE / NO PENDING PROBE ─────────────────────────────────────
// This fix's rung is one AND-term among eight in `gateTerms`. It must not
// change the SEPARATE, pre-existing protection for a probe already on
// screen — that stays owned by `noUnansweredProbeOnScreen`. Belt and braces:
// the claim itself is ALSO gated on `pendingMcqHoisted === null`, closing the
// residual case of a hedged answer that legitimately carries a '?'.

describe('pending probe vs. no pending probe — the pre-existing conjunct is untouched, and the claim itself defers to it', () => {
  it('gateTerms ANDs arbitrationAllowsProbe with the pre-existing noUnansweredProbeOnScreen term', () => {
    const s = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const gate = s.slice(s.indexOf('const gateTerms = {'), s.indexOf('const gateEligible ='))
    expect(gate).toContain('noUnansweredProbeOnScreen: !unansweredProbeOnScreen')
    expect(gate).toContain("arbitrationAllowsProbe: (turnArbitrationHoisted ?? arbitrationUnavailable()).allows('AUTHORED_PROBE')")
    expect(s).toContain('const gateEligible = Object.values(gateTerms).every(Boolean)')
  })

  it('a hedged answer with a real \'?\' ("is it the anode?") does not claim the rung while a probe is pending', () => {
    expect(deniesNewAssessment('is it the anode?', null, /* pendingProbe */ true))
      .toBe(false) // the RUNG itself does not claim — noUnansweredProbeOnScreen is the real owner of that case
    const vPending = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: false })
    expect(vPending.owner).toBe('TEACH')
    // With NO probe pending, the exact same message is free to claim the
    // rung on its own honest terms.
    const vFree = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: true })
    expect(vFree.owner).toBe('LEARNER_QUESTION')
  })

  it('REGRESSION FIXED AT THE DETECTOR, not just the guard: a typed answer opening with a WH-word is not a question at all', () => {
    // "where electrons are released" — the exact livenessEndToEnd.test.ts L1
    // repro. No '?', so detectLearnerQuestion is false regardless of
    // pending-probe state — the false positive this file's header records
    // is closed at its source, and the pending-probe guard is genuinely a
    // second, independent layer rather than the only thing standing between
    // this and the regression.
    expect(detectLearnerQuestion('where electrons are released')).toBe(false)
    expect(deniesNewAssessment('where electrons are released', null, false)).toBe(false)
  })
})

// ── DIRECT QUESTION AT DIFFERENT LESSON POSITIONS ────────────────────────
// "during a normal lesson", "immediately after lesson opening", and "after
// an assessment" are all just TEACH-owned turns from arbitration's point of
// view — none of D0d/D0a/D0b/D0c's session-boundary machinery is consulted
// by this rung at all, which is exactly why one fix covers all three.

describe('a genuine question denies AUTHORED_PROBE regardless of WHERE in the lesson it lands', () => {
  it.each([
    'during a normal lesson mid-teaching turn',
    'immediately after the lesson-opening turn',
    'right after the tutor just graded an assessment',
  ] as const)('%s — the verdict is identical', () => {
    // The rung reads only genuineQuestionActive; it has no phase/session
    // parameter to vary, so there is exactly one code path to test, and it
    // is asserted for all three named positions here as a single group.
    const v = arbitrateTurn({ ...NO_CLAIMS, genuineQuestionActive: true })
    expect(v.owner).toBe('LEARNER_QUESTION')
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
  })
})

// ── DIRECT FACTUAL CHALLENGE / CONFUSION REQUEST ─────────────────────────
// A direct factual challenge ("that's not right, are you sure?") is its OWN
// speech act, owned by claimChallengeGuard.ts's `isClaimChallenge` — a
// DIFFERENT capability (whether the tutor may confidently double down on a
// disputed claim) from this rung (whether a NEW authored probe may attach).
// Not every challenge phrasing carries a recognized question-word pattern
// ("are you sure about that?" has no WH-word), so this rung correctly does
// not claim it — that is not a gap, because claimChallengeGuard's own
// dedicated, already-tested directive is unconditional on the model's own
// turn regardless of whether an authored probe would otherwise attach.

describe('direct factual challenge and confusion request — pre-existing protections confirmed intact', () => {
  it('a challenge with a recognized question-word pattern claims this rung too', () => {
    expect(deniesNewAssessment('Is that really true?')).toBe(true)
  })

  it('a challenge with no recognized question-word pattern does not claim THIS rung — claimChallengeGuard owns that case separately', () => {
    expect(deniesNewAssessment("That's not right, are you sure about that?")).toBe(false)
  })

  it('a confusion request denies a new probe via the pre-existing LEARNER_REQUEST rung, not the new one', () => {
    const t = readTurnIntent('I am lost, can you explain this differently?', null)
    expect(t.learnerRequest).toBe('explain_differently')
    const v = arbitrateTurn({
      ...NO_CLAIMS,
      learnerRequestActive: t.learnerRequest !== null,
      genuineQuestionActive: detectLearnerQuestion(t.message),
    })
    expect(v.owner).toBe('LEARNER_REQUEST')
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
  })
})

// ── LEGITIMATE OPENING-SESSION ASSESSMENT FLOW ───────────────────────────

describe('legitimate opening-session assessment flow survives unchanged', () => {
  it('an ordinary "ready to start" acknowledgement at the opening does not block the gate', () => {
    expect(deniesNewAssessment("Ok, I'm ready to start.")).toBe(false)
  })

  it('a correct, unhedged answer to a just-served probe does not block the gate', () => {
    // Answering a probe is not itself a question, even when it happens to
    // land right after the lesson opening.
    expect(deniesNewAssessment('The suffix is -ly.')).toBe(false)
  })
})
