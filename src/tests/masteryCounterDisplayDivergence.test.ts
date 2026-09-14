/**
 * THE DISPLAYED MASTERY COUNTERS AND THE AUTHORITATIVE VERDICT READ DIFFERENT
 * EVIDENCE. THIS FILE PROVES IT, DETERMINISTICALLY, THROUGH THE REAL MODULES.
 *
 * REPORTED (real account, twice, phys.qm.uncertainty-principle and
 * phys.mech.conservation-of-momentum):
 *
 *     checkCorrect 1/1 · practiceCorrect 2/2 · every graded answer correct
 *     mastery.verified false · mastered [] · needsReview [concept]
 *     fullyMastered false
 *
 * WHY IT IS NOT A CONTRADICTION IN THE ENGINE. `MasterySummary.checkCorrect` /
 * `.practiceCorrect` are `state.correctAtCheck` / `.correctAtPractice` — the
 * PLAIN counters, which advance on the model's own SIGNAL. `.verified` is
 * `conceptMasteryVerdict`, which (once `sawModernGrading` is set) reads only
 * `verifiedCorrectAtCheck` / `verifiedCorrectAtPractice`, and those advance
 * ONLY on `evidence.serverGraded === true` — correctness produced by
 * `gradeMcqAnswer` against an AUTHORED probe's stored `correctIndex`.
 *
 * So a lesson taught through free-response PROSE questions satisfies the
 * displayed counters and cannot satisfy the verdict — by design, and correctly:
 * nothing in that session was ever graded by the server. The defect is that the
 * payload renders one evidence identity beside a verdict computed from another,
 * with nothing in it that explains the gap.
 *
 * FIX-1 / FIX-2 (this file's second half) close the OBSERVABILITY half of that
 * — and only that. `checkCorrect`/`practiceCorrect`/`checkRequired`/
 * `practiceRequired`/`verified` and the verdict itself are untouched; three
 * derived, read-only fields are added beside them so the payload explains
 * itself, plus the same three facts on the `[ladder]` line. The gate is not
 * loosened anywhere in this file.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import {
  conceptMasteryVerdict, buildMasterySummary, masteryVerifiedStrict, unverifiedReasonFor,
} from '@/lib/teaching/masteryGate'
import { conceptOutcome, buildLessonSummary } from '@/lib/teaching/lessonSummary'
import { buildCompletionPayload } from '@/lib/teaching/lessonCompletion'
import { readFileSync } from 'node:fs'

/** A correct answer. `serverGraded` is the ONLY axis varied across these cases. */
function correctAnswer(serverGraded: boolean | undefined): TurnEvidence {
  return {
    askedQuestion: true,
    signalCorrect: true,
    recoveryFired: false,
    questionSanctioned: true,
    signalVerificationStatus: 'CLEAN',
    serverGraded,
  }
}

/** Drives the REAL fold from CHECK, the phase at which grading begins. */
function driveFromCheck(conceptId: string, turns: TurnEvidence[]): ConversationState {
  let s: ConversationState = { ...initialConversationState(conceptId), phase: 'CHECK', demonstrated: true }
  for (const t of turns) s = advanceConversationState(s, t)
  return s
}

describe('mastery counter / verdict divergence', () => {
  it('REPRODUCES the reported shape exactly: prose-graded session, counters met, verdict false', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(false), correctAnswer(false), correctAnswer(false),
    ])

    // The plain counters reach the bar, and the ladder reaches TRANSFER.
    expect(state.phase).toBe('TRANSFER')
    expect(state.correctAtCheck).toBe(1)
    expect(state.correctAtPractice).toBe(2)

    // The verified counters — the only ones the verdict reads — never moved.
    expect(state.verifiedCorrectAtCheck).toBe(0)
    expect(state.verifiedCorrectAtPractice).toBe(0)

    // The legacy fallback is correctly declined: the session DID see modern
    // grading (serverGraded was supplied, as false), so it is not pre-feature.
    expect(state.sawModernGrading).toBe(true)
    expect(state.signalContradictions).toBe(0)
    expect(state.unauthoredKeyGrades).toBe(0)
    expect(masteryVerifiedStrict(state)).toBe(false)

    // THE PAYLOAD THE LEARNER SEES: requirements met beside verified false.
    const payload = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })
    expect(payload.checkCorrect).toBe(payload.checkRequired)
    expect(payload.practiceCorrect).toBe(payload.practiceRequired)
    expect(payload.verified).toBe(false)

    // THE PERMANENT RECORD, matching the report field for field.
    const outcome = conceptOutcome(state, 'Heisenberg’s Uncertainty Principle')
    const summary = buildLessonSummary([outcome])
    expect(outcome.status).toBe('needs_review')
    expect(summary.mastered).toHaveLength(0)
    expect(summary.needsReview.map((o) => o.conceptId)).toEqual(['phys.qm.uncertainty-principle'])
    expect(summary.complete).toBe(false)

    // The honest reason ALREADY EXISTS on the outcome and is true here. It is
    // the one field that distinguishes this from an ordinary needs_review, and
    // it is the anchor any fix should build on rather than replace.
    expect(outcome.answeredButUnverified).toBe(true)
  })

  it('reproduces on the second reported concept, and on a MIXED session (check tapped, practice prose)', () => {
    const mixed = driveFromCheck('phys.mech.conservation-of-momentum', [
      correctAnswer(true), correctAnswer(false), correctAnswer(false),
    ])
    expect(mixed.correctAtCheck).toBe(1)
    expect(mixed.correctAtPractice).toBe(2)
    expect(mixed.verifiedCorrectAtCheck).toBe(1)
    expect(mixed.verifiedCorrectAtPractice).toBe(0)
    expect(conceptMasteryVerdict(mixed)).toBe(false)
    expect(conceptOutcome(mixed, 'Conservation of Momentum').answeredButUnverified).toBe(true)
  })

  it('CONTROL — an identical session graded against authored keys certifies', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(true), correctAnswer(true), correctAnswer(true),
    ])
    expect(state.verifiedCorrectAtCheck).toBe(1)
    expect(state.verifiedCorrectAtPractice).toBe(2)
    expect(conceptMasteryVerdict(state)).toBe(true)
    expect(conceptOutcome(state, 'Uncertainty Principle').status).toBe('mastered')
    // A mastered concept has nothing to explain — the honest-reason field is
    // only ever meaningful for needs_review.
    expect(conceptOutcome(state, 'Uncertainty Principle').answeredButUnverified).toBe(false)
  })

  it('CONTROL — the pre-feature legacy fallback still certifies, so this is not a fallback regression', () => {
    const state = driveFromCheck('x', [
      correctAnswer(undefined), correctAnswer(undefined), correctAnswer(undefined),
    ])
    expect(state.sawModernGrading).toBe(false)
    expect(conceptMasteryVerdict(state)).toBe(true)
  })

  it('the divergence is caused by serverGraded ALONE — no other evidence axis differs', () => {
    const prose = driveFromCheck('c', [correctAnswer(false), correctAnswer(false), correctAnswer(false)])
    const graded = driveFromCheck('c', [correctAnswer(true), correctAnswer(true), correctAnswer(true)])
    // Same ladder, same plain counters, same absence of red flags.
    expect(prose.phase).toBe(graded.phase)
    expect(prose.correctAtCheck).toBe(graded.correctAtCheck)
    expect(prose.correctAtPractice).toBe(graded.correctAtPractice)
    expect(prose.signalContradictions).toBe(graded.signalContradictions)
    expect(prose.unauthoredKeyGrades).toBe(graded.unauthoredKeyGrades)
    expect(prose.teachingIntegrityUncertain).toBe(graded.teachingIntegrityUncertain)
    // Differing ONLY in the verified counters, and therefore in the verdict.
    expect(conceptMasteryVerdict(prose)).toBe(false)
    expect(conceptMasteryVerdict(graded)).toBe(true)
  })

  it('the verified counters can never exceed the plain ones (the fix must not break this)', () => {
    for (const a of [true, false, undefined]) {
      for (const b of [true, false, undefined]) {
        for (const c of [true, false, undefined]) {
          const s = driveFromCheck('c', [correctAnswer(a), correctAnswer(b), correctAnswer(c)])
          expect(s.verifiedCorrectAtCheck).toBeLessThanOrEqual(s.correctAtCheck)
          expect(s.verifiedCorrectAtPractice).toBeLessThanOrEqual(s.correctAtPractice)
        }
      }
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// FIX-1 — THE PAYLOAD NOW EXPLAINS ITSELF
// ═══════════════════════════════════════════════════════════════════════════

describe('FIX-1 — MasterySummary exposes the evidence identity', () => {
  it('(1,2) plain 1/2 with verified 0/0, and the payload says both', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(false), correctAnswer(false), correctAnswer(false),
    ])
    const p = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })

    // The pre-existing fields are UNCHANGED in meaning and value.
    expect(p.checkCorrect).toBe(1)
    expect(p.practiceCorrect).toBe(2)
    expect(p.checkRequired).toBe(1)
    expect(p.practiceRequired).toBe(2)
    expect(p.verified).toBe(false)

    // The divergence is now explicit rather than implied.
    expect(p.verifiedCheckCorrect).toBe(0)
    expect(p.verifiedPracticeCorrect).toBe(0)
    expect(p.unverifiedReason).toBe('answered-but-not-server-graded')
  })

  it('(4) unverifiedReason is deterministic and follows the verdict\'s own precedence', () => {
    const prose = driveFromCheck('c', [correctAnswer(false), correctAnswer(false), correctAnswer(false)])
    expect(unverifiedReasonFor(prose)).toBe('answered-but-not-server-graded')

    // contradicted beats the free-response reason
    expect(unverifiedReasonFor({ ...prose, signalContradictions: 1 })).toBe('contradicted')
    // an invented key beats a contradiction
    expect(unverifiedReasonFor({ ...prose, signalContradictions: 1, unauthoredKeyGrades: 1 })).toBe('invented-key')
    // teaching integrity is the verdict's own first test, so it beats everything
    expect(unverifiedReasonFor({
      ...prose, signalContradictions: 1, unauthoredKeyGrades: 1, teachingIntegrityUncertain: true,
    })).toBe('teaching-integrity')

    // Same input, same answer, every time — no randomness, no model input.
    for (let i = 0; i < 25; i++) expect(unverifiedReasonFor(prose)).toBe('answered-but-not-server-graded')
  })

  it('(4) a lesson nobody has answered yet reports NO reason — it is not an unexplained verdict', () => {
    const fresh = { ...initialConversationState('c'), phase: 'CHECK' as const, demonstrated: true }
    expect(conceptMasteryVerdict(fresh)).toBe(false)
    expect(unverifiedReasonFor(fresh)).toBeNull()
    const p = buildMasterySummary(fresh, { completionSuppressed: false, gatePending: false })
    expect(p.checkCorrect).toBe(0)
    expect(p.verifiedCheckCorrect).toBe(0)
    expect(p.unverifiedReason).toBeNull()
  })

  it('(5) fully server-graded evidence still certifies, and reports no reason', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(true), correctAnswer(true), correctAnswer(true),
    ])
    const p = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })
    expect(p.verified).toBe(true)
    expect(p.verifiedCheckCorrect).toBe(1)
    expect(p.verifiedPracticeCorrect).toBe(2)
    expect(p.unverifiedReason).toBeNull()
  })

  it('(6) the pre-feature legacy fallback is unchanged — certifies, reports no reason', () => {
    const state = driveFromCheck('x', [
      correctAnswer(undefined), correctAnswer(undefined), correctAnswer(undefined),
    ])
    expect(state.sawModernGrading).toBe(false)
    const p = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })
    expect(p.verified).toBe(true)
    expect(p.unverifiedReason).toBeNull()
    // The legacy fallback certifies on the PLAIN counters, so the verified
    // counters are genuinely 0 here and are reported honestly as 0.
    expect(p.verifiedCheckCorrect).toBe(0)
  })

  it('(7) the verdict is byte-identical to the verdict alone — the new fields cannot move it', () => {
    for (const a of [true, false, undefined]) {
      for (const b of [true, false, undefined]) {
        for (const c of [true, false, undefined]) {
          for (const extra of [{}, { signalContradictions: 1 }, { unauthoredKeyGrades: 1 }, { teachingIntegrityUncertain: true }]) {
            const base = driveFromCheck('c', [correctAnswer(a), correctAnswer(b), correctAnswer(c)])
            const state = { ...base, ...extra }
            const p = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })
            // The payload's verdict is the authority's verdict, always.
            expect(p.verified).toBe(conceptMasteryVerdict(state))
            // The reason is present exactly when the verdict is false AND
            // there is something to explain — never alongside a true verdict.
            if (p.verified) expect(p.unverifiedReason).toBeNull()
            // The new counters never exceed the plain ones they sit beside.
            expect(p.verifiedCheckCorrect).toBeLessThanOrEqual(p.checkCorrect)
            expect(p.verifiedPracticeCorrect).toBeLessThanOrEqual(p.practiceCorrect)
          }
        }
      }
    }
  })

  it('(3) answeredButUnverified reaches the lessonComplete payload, and is a subset of needsReview', () => {
    const prose = driveFromCheck('phys.mech.conservation-of-momentum', [
      correctAnswer(false), correctAnswer(false), correctAnswer(false),
    ])
    const graded = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(true), correctAnswer(true), correctAnswer(true),
    ])
    const summary = buildLessonSummary([
      conceptOutcome(prose, 'Conservation of Momentum'),
      conceptOutcome(graded, 'Uncertainty Principle'),
    ])
    const payload = buildCompletionPayload(
      {
        lessonKey: 'k', lessonTitle: 'L', durationSeconds: 1, completedAt: null,
        status: 'COMPLETED', conceptsMastered: [], conceptsNeedingReview: [],
      } as unknown as Parameters<typeof buildCompletionPayload>[0],
      summary, 3,
    )
    expect(payload.mastered).toEqual(['phys.qm.uncertainty-principle'])
    expect(payload.needsReview).toEqual(['phys.mech.conservation-of-momentum'])
    expect(payload.answeredButUnverified).toEqual(['phys.mech.conservation-of-momentum'])
    // Always a subset — it can never name a concept that was mastered.
    for (const id of payload.answeredButUnverified) expect(payload.needsReview).toContain(id)
    expect(payload.fullyMastered).toBe(false)
  })

  it('(3) an ordinary struggling learner is NOT flagged answeredButUnverified', () => {
    const struggling = { ...initialConversationState('c'), phase: 'CHECK' as const, demonstrated: true }
    const summary = buildLessonSummary([conceptOutcome(struggling, 'C')])
    const payload = buildCompletionPayload(
      {
        lessonKey: 'k', lessonTitle: 'L', durationSeconds: 1, completedAt: null,
        status: 'COMPLETED', conceptsMastered: [], conceptsNeedingReview: [],
      } as unknown as Parameters<typeof buildCompletionPayload>[0],
      summary, 1,
    )
    expect(payload.needsReview).toEqual(['c'])
    expect(payload.answeredButUnverified).toEqual([])
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// FIX-2 — THE LADDER LINE CARRIES THE GOVERNING EVIDENCE
// ═══════════════════════════════════════════════════════════════════════════

/** The `[ladder]` log call, isolated so no assertion can match elsewhere. */
const LADDER = (() => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  const start = route.indexOf("console.log('[ladder]', {")
  expect(start, 'the [ladder] telemetry call must exist').toBeGreaterThan(-1)
  const end = route.indexOf('\n          })', start)
  expect(end, 'the [ladder] call must terminate').toBeGreaterThan(start)
  return route.slice(start, end)
})()

describe('FIX-2 — [ladder] telemetry', () => {
  it('(8) carries verifiedCheck, verifiedPractice and serverGraded', () => {
    expect(LADDER).toContain('verifiedCheck:')
    expect(LADDER).toContain('verifiedPractice:')
    expect(LADDER).toContain('serverGraded:')
  })

  it('(8) still carries the plain counters it always did — nothing was replaced', () => {
    expect(LADDER).toContain('check: conversationStateAfterTurnHoisted?.correctAtCheck')
    expect(LADDER).toContain('practice: conversationStateAfterTurnHoisted?.correctAtPractice')
  })

  it('reads the already-hoisted authoritative values — no second calculation path', () => {
    // The verified counters come off the SAME folded state object the plain
    // ones do, and serverGraded is the SAME variable the fold was given.
    expect(LADDER).toContain('verifiedCheck: conversationStateAfterTurnHoisted?.verifiedCorrectAtCheck ?? null')
    expect(LADDER).toContain('verifiedPractice: conversationStateAfterTurnHoisted?.verifiedCorrectAtPractice ?? null')
    expect(LADDER).toContain('serverGraded: gradedAgainstServerKeyHoisted')
    // Nothing in the telemetry recomputes a verdict or derives correctness.
    expect(LADDER).not.toContain('masteryVerifiedStrict')
    expect(LADDER).not.toContain('conceptMasteryVerdict')
  })

  it('the fold is still handed serverGraded from that same single variable', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    // Both fold call sites, unchanged by FIX-2.
    expect(route.split('serverGraded: gradedAgainstServerKeyHoisted').length - 1).toBeGreaterThanOrEqual(3)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// (10) NON-VACUITY — the new fields must be REAL, not hardcoded
// ═══════════════════════════════════════════════════════════════════════════

/** Named so the purity scan can exclude its own body — see inside. */
const PURITY_MARKER = '(9) needs no model, provider, DB, network or auth — this whole file is pure'

describe('(10) non-vacuity of the new fields', () => {
  it('the verified counters VARY with the evidence — they are not constants', () => {
    const none = buildMasterySummary(
      driveFromCheck('c', [correctAnswer(false), correctAnswer(false), correctAnswer(false)]),
      { completionSuppressed: false, gatePending: false })
    const all = buildMasterySummary(
      driveFromCheck('c', [correctAnswer(true), correctAnswer(true), correctAnswer(true)]),
      { completionSuppressed: false, gatePending: false })
    const mixed = buildMasterySummary(
      driveFromCheck('c', [correctAnswer(true), correctAnswer(false), correctAnswer(false)]),
      { completionSuppressed: false, gatePending: false })
    // Three distinct observed values for the same field — a hardcoded 0 (or a
    // field aliased to the plain counter) fails at least one of these.
    expect([none.verifiedCheckCorrect, mixed.verifiedCheckCorrect, all.verifiedCheckCorrect]).toEqual([0, 1, 1])
    expect([none.verifiedPracticeCorrect, mixed.verifiedPracticeCorrect, all.verifiedPracticeCorrect]).toEqual([0, 0, 2])
    // And they are NOT the plain counters wearing a new name.
    expect(none.verifiedCheckCorrect).not.toBe(none.checkCorrect)
    expect(mixed.verifiedPracticeCorrect).not.toBe(mixed.practiceCorrect)
  })

  it('unverifiedReason takes at least four distinct values — it is not a constant', () => {
    const prose = driveFromCheck('c', [correctAnswer(false), correctAnswer(false), correctAnswer(false)])
    const seen = new Set([
      unverifiedReasonFor(prose),
      unverifiedReasonFor({ ...prose, signalContradictions: 1 }),
      unverifiedReasonFor({ ...prose, unauthoredKeyGrades: 1 }),
      unverifiedReasonFor({ ...prose, teachingIntegrityUncertain: true }),
      unverifiedReasonFor(driveFromCheck('c', [correctAnswer(true), correctAnswer(true), correctAnswer(true)])),
    ])
    expect(seen).toEqual(new Set([
      'answered-but-not-server-graded', 'contradicted', 'invented-key', 'teaching-integrity', null,
    ]))
  })

  it(PURITY_MARKER, () => {
    const src = readFileSync('src/tests/masteryCounterDisplayDivergence.test.ts', 'utf8')
    // Scans the IMPORT surface, not raw text: a substring scan of the whole
    // file would match this assertion's own forbidden list and pass or fail
    // for the wrong reason. Every external boundary this repo mocks (DB,
    // provider, auth) arrives through an import or a global, so this is where
    // a dependency would actually have to appear.
    // Everything above the first describe(): the whole import section,
    // multi-line imports included (a per-line filter misses those).
    const imports = src.slice(0, src.indexOf('describe('))
    for (const forbidden of ['prisma', '@prisma/client', 'next-auth', '@/lib/ai', 'lib/db']) {
      expect(imports.includes(forbidden), `must not import ${forbidden}`).toBe(false)
    }
    // And no runtime escape hatch. Scanned with THIS assertion's own body
    // removed — otherwise the forbidden list matches itself and the guard
    // reports a dependency it just wrote down (measured: it did, twice).
    const body = src.slice(0, src.indexOf(PURITY_MARKER))
    for (const forbidden of ['vi.mock' + '(', 'vi.fn' + '(', 'globalThis.fetch', 'await fetch']) {
      expect(body.includes(forbidden), `must not use ${forbidden}`).toBe(false)
    }
    // Only node:fs (to read source for the wiring pins) and the real modules.
    expect(imports).toContain("from 'node:fs'")
    expect(imports).toContain("@/lib/teaching/conversationState")
  })
})
