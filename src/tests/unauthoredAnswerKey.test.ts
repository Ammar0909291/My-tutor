/**
 * A MODEL-INVENTED ANSWER KEY WAS ABOUT TO CERTIFY MASTERY.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.mech.friction`, 2026-09-01, real account, studied as a
 * learner. The tutor served this as a tappable, graded question:
 *
 *   "A 5 kg block rests on a 30° incline with μ_s = 0.5.
 *    Which of the following is the maximum static friction force?"
 *    A) 5 N    B) 12.5 N    C) 25 N    D) 49 N        keyed answer: B
 *
 * N = mg·cos30 = 42.4 N, so f_max = μN = 21.2 N. The keyed 12.5 N is
 * μ·mg·**sin**30 — the down-slope component used where the NORMAL force
 * belongs. The correct answer is not among the four options at all.
 *
 * The item does not exist as an authored asset. The model wrote the question,
 * the options AND the `correct=` index, and `gradeMcqAnswer` reads
 * `correctIndex` as ground truth — so it would have marked a correct learner
 * WRONG and written that into their permanent record.
 *
 * ── WHY assetId IS THE RIGHT DISCRIMINATOR, NOT A GUESS ─────────────────────
 * `gateAssessment.probeToMcq` is, in its own words, "the ONLY writer of
 * TutorMCQ.assetId — a model-parsed tag has no asset and must stay anonymous",
 * and `findBestProbe` reads it straight off the AssetIdentity row. So an
 * authored probe always carries one and a model tag never does. The field
 * existed already; nothing in grading had ever consulted it.
 *
 * ── SUSPICIOUS, NOT SUPPRESSED ──────────────────────────────────────────────
 * The verification layer already means exactly this: flagged evidence "still
 * advances the teaching phase (to avoid over-blocking)" but "does not count
 * toward strict mastery — the gate that authorizes lesson completion". So the
 * lesson keeps moving and only CERTIFICATION is withheld.
 *
 * This makes the RECORD honest, not the FEEDBACK: with a wrong key the
 * learner is still told "Correct!" wrongly on that turn. Fixing that means
 * verifying the key, which means solving the physics.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `probeKeyIsAuthored`, `advanceConversationState`,
 * `masteryVerifiedStrict`, and the real route source for the wiring.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { probeKeyIsAuthored } from '@/lib/teaching/mcq'
import { advanceConversationState, initialConversationState } from '@/lib/teaching/conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'
import { recordConceptOutcome, startLessonAttempt } from '@/lib/teaching/lessonAttempt'

/** The exact item, reproduced verbatim. */
const INVENTED = {
  question: 'Which of the following is the maximum static friction force that can act on the block?',
  options: ['5 N', '12.5 N', '25 N', '49 N'],
  correctIndex: 1,
  // no assetId — the model wrote this one
}
/** The authored probe served earlier in the same lesson, from the database. */
const AUTHORED = {
  question: 'A 10 kg box sits on a rough floor (μ_s = 0.4). You push it horizontally with 20 N and it does NOT move. What is the friction force on it right now? (g = 10)',
  options: ['20 N', '40 N'],
  correctIndex: 0,
  assetId: '4f0b1c2d-0000-4000-8000-000000000001',
}

describe('the physics, re-derived rather than taken on trust', () => {
  it('the keyed answer is the sin/cos slip, and the right answer is absent', () => {
    const g = 10, m = 5, mu = 0.5, th = (30 * Math.PI) / 180
    const correct = mu * m * g * Math.cos(th)          // 21.65 N
    const keyed = mu * m * g * Math.sin(th)            // 12.5 N — what it served
    expect(keyed).toBeCloseTo(12.5, 2)
    expect(Number(INVENTED.options[INVENTED.correctIndex].replace(/[^\d.]/g, ''))).toBeCloseTo(12.5, 2)
    expect(correct).toBeCloseTo(21.65, 2)
    // The physically correct value is not one of the four choices at all.
    const offered = INVENTED.options.map((o) => Number(o.replace(/[^\d.]/g, '')))
    expect(offered.some((v) => Math.abs(v - correct) < 1)).toBe(false)
  })
})

describe('probeKeyIsAuthored', () => {
  it('an authored probe carries its asset identity', () => {
    expect(probeKeyIsAuthored(AUTHORED)).toBe(true)
  })
  it('a model-parsed tag is anonymous, which is the documented contract', () => {
    expect(probeKeyIsAuthored(INVENTED)).toBe(false)
  })
  it('a blank or absent id is not an identity', () => {
    expect(probeKeyIsAuthored({ ...AUTHORED, assetId: '   ' })).toBe(false)
    expect(probeKeyIsAuthored(null)).toBe(false)
    expect(probeKeyIsAuthored(undefined)).toBe(false)
  })
})

/** A learner sitting at CHECK, one correct answer away from the first gate. */
const atCheck = (): ConversationState => ({
  ...initialConversationState('phys.mech.friction'),
  phase: 'CHECK',
  demonstrated: true,
})

const correctAnswer = (unauthoredKey: boolean) => ({
  askedQuestion: true,
  questionSanctioned: true,
  signalCorrect: true,
  signalVerificationStatus: (unauthoredKey ? 'SUSPICIOUS' : 'CLEAN') as 'SUSPICIOUS' | 'CLEAN',
  unauthoredKey,
})

describe('an invented key moves the lesson but not the record', () => {
  it('still advances the phase — the learner is never stuck', () => {
    const after = advanceConversationState(atCheck(), correctAnswer(true))
    expect(after.phase).toBe('PRACTICE')
    expect(after.correctAtCheck).toBe(1)
  })

  it('does NOT increment the counter that certifies', () => {
    const after = advanceConversationState(atCheck(), correctAnswer(true))
    expect(after.verifiedCorrectAtCheck ?? 0).toBe(0)
    expect(after.unauthoredKeyGrades).toBe(1)
  })

  it('an AUTHORED key still certifies exactly as before', () => {
    // The assertion that stops this fix from becoming a new defect: mastery
    // must remain reachable on real probes.
    const after = advanceConversationState(atCheck(), correctAnswer(false))
    expect(after.verifiedCorrectAtCheck).toBe(1)
    expect(after.unauthoredKeyGrades).toBe(0)
  })
})

describe('the legacy fallback cannot launder an invented key', () => {
  // masteryVerifiedStrict falls back to the PLAIN counters when a session has
  // no verified counters and no contradictions — written for state persisted
  // before verified counters existed. A session graded entirely on invented
  // keys arrives at that same shape by a different road. Caught while writing
  // this fix, BEFORE it shipped: without the extra term the whole change is
  // defeated.
  const gradedOnInventedKeys = (): ConversationState => ({
    ...initialConversationState('phys.mech.friction'),
    phase: 'TRANSFER',
    demonstrated: true,
    correctAtCheck: 1,
    correctAtPractice: 2,
    verifiedCorrectAtCheck: 0,
    verifiedCorrectAtPractice: 0,
    signalContradictions: 0,
    unauthoredKeyGrades: 3,
  })

  it('refuses to certify a lesson whose every key was invented', () => {
    expect(masteryVerifiedStrict(gradedOnInventedKeys())).toBe(false)
  })

  it('would have certified it without the guard — the trap, pinned', () => {
    const { unauthoredKeyGrades: _drop, ...withoutTheCounter } = gradedOnInventedKeys()
    expect(masteryVerifiedStrict(withoutTheCounter as ConversationState)).toBe(true)
  })

  it('a genuinely legacy session still falls back, unbroken', () => {
    // The case the fallback was written for: no verified counters because the
    // feature did not exist yet, and no invented keys either.
    const legacy = {
      ...initialConversationState('phys.mech.friction'),
      phase: 'TRANSFER' as const,
      demonstrated: true,
      correctAtCheck: 1,
      correctAtPractice: 2,
    }
    const { verifiedCorrectAtCheck: _a, verifiedCorrectAtPractice: _b, unauthoredKeyGrades: _c, ...old } = legacy
    expect(masteryVerifiedStrict(old as ConversationState)).toBe(true)
  })

  it('a mixed lesson certifies on its AUTHORED evidence alone', () => {
    // One invented grade must not poison a lesson that also met the bar on
    // real probes — the counters that certify are still there and still count.
    expect(masteryVerifiedStrict({
      ...initialConversationState('phys.mech.friction'),
      phase: 'TRANSFER',
      demonstrated: true,
      correctAtCheck: 2, correctAtPractice: 3,
      verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2,
      unauthoredKeyGrades: 1,
    })).toBe(true)
  })
})

/**
 * THE RECORD IS A SECOND AUTHORITY, AND IT LET THE INVENTED KEY THROUGH.
 *
 * MEASURED live 2026-09-01, real account, phys.mech.friction, ON THE DEPLOY
 * THAT SHIPPED THE FIX ABOVE. Re-studying the concept as a learner, the tutor
 * invented a graded item and keyed it 7.9 N where μ·mg·cos30 = 10.4 N — a
 * value not among its own four options — said "That's right", and the session
 * ended:
 *
 *   correctAtCheck 1     verifiedCorrectAtCheck 0
 *   correctAtPractice 2  verifiedCorrectAtPractice 2
 *   unauthoredKeyGrades 2
 *
 * `masteryVerifiedStrict` is FALSE there, so `gateLessonCompletion` correctly
 * refused the [LESSON_COMPLETE] tag. The learner was told "You mastered:
 * Friction Forces" anyway, and lesson_attempts was written COMPLETED.
 *
 * Because the PERMANENT RECORD never runs through that gate. It runs through
 * `isConceptClosed` -> `conceptOutcome`, and `hasDemonstratedMastery` reads
 * the PLAIN `correctAtPractice`, or merely `phase === 'TRANSFER'` — which
 * needs no verified evidence at all. The first fix covered the tag; the
 * record is what actually matters, and it was untouched.
 */
describe('the record path, which the first fix did not reach', () => {
  /** The exact end state of the measured session. */
  const measuredSession = (): ConversationState => ({
    ...initialConversationState('phys.mech.friction'),
    phase: 'TRANSFER',
    demonstrated: true,
    correctAtCheck: 1,
    correctAtPractice: 2,
    verifiedCorrectAtCheck: 0,
    verifiedCorrectAtPractice: 2,
    unauthoredKeyGrades: 2,
  })

  it('the tag gate was already right — it refused', () => {
    expect(masteryVerifiedStrict(measuredSession())).toBe(false)
  })

  it('the record no longer says mastered on that evidence', () => {
    expect(conceptOutcome(measuredSession()).status).toBe('needs_review')
  })

  it('and it is not folded into conceptsMastered', () => {
    const folded = recordConceptOutcome(
      startLessonAttempt('lesson-22', 'Friction Forces', new Date()),
      measuredSession(),
      'Friction Forces',
    )
    expect(folded.conceptsMastered).not.toContain('phys.mech.friction')
    expect(folded.conceptsNeedingReview).toContain('phys.mech.friction')
  })
})

describe('it cannot break a lesson the model did not invent a question into', () => {
  // The scope that keeps this surgical: the strict test is required ONLY when
  // this session actually graded against an invented key. At zero, the
  // expression is byte-identical to what shipped before.
  const ordinary = (over: Partial<ConversationState> = {}): ConversationState => ({
    ...initialConversationState('phys.mech.friction'),
    phase: 'TRANSFER',
    demonstrated: true,
    correctAtPractice: 2,
    unauthoredKeyGrades: 0,
    ...over,
  })

  it('mastery on TRANSFER alone still records, exactly as before', () => {
    expect(conceptOutcome(ordinary({ correctAtPractice: 0 })).status).toBe('mastered')
  })

  it('mastery on two practice answers still records', () => {
    expect(conceptOutcome(ordinary()).status).toBe('mastered')
  })

  it('a legacy session with no verified counters at all still records', () => {
    const { verifiedCorrectAtCheck: _a, verifiedCorrectAtPractice: _b, ...legacy } = ordinary()
    expect(conceptOutcome(legacy as ConversationState).status).toBe('mastered')
  })

  it('a session WITH an invented key but genuine verified evidence records', () => {
    // One invented grade must not poison a lesson that also met the bar on
    // real probes.
    expect(conceptOutcome(ordinary({
      unauthoredKeyGrades: 1,
      correctAtCheck: 2,
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    })).status).toBe('mastered')
  })
})

describe('the chat route applies it', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('consults the predicate on a graded turn', () => {
    expect(ROUTE).toMatch(/probeKeyIsAuthored\(pendingMcqHoisted\)/)
  })

  it('downgrades AFTER verification, which overwrites the status', () => {
    // verifySignal assigns signalVerificationStatusHoisted wholesale. A
    // downgrade written above it would be silently discarded.
    const verify = ROUTE.indexOf('signalVerificationStatusHoisted = verification.status')
    const downgrade = ROUTE.indexOf("signalVerificationStatusHoisted = 'SUSPICIOUS'")
    expect(verify).toBeGreaterThan(0)
    expect(downgrade).toBeGreaterThan(verify)
  })

  it('never upgrades a CONTRADICTED signal', () => {
    expect(ROUTE).toMatch(/signalVerificationStatusHoisted === 'CLEAN'\) signalVerificationStatusHoisted = 'SUSPICIOUS'/)
  })

  it('feeds the counter into the state fold', () => {
    expect(ROUTE).toMatch(/unauthoredKey: unauthoredKeyGradeHoisted/)
  })
})
