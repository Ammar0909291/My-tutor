/**
 * AN UNRESOLVED PENDING MCQ MUST NOT LEAK AN UNAUTHORED MASTERY CREDIT.
 *
 * ── THE DEFECT (chem.bio.vitamins Tier-A certification, three consecutive
 * FAILED_PRODUCT/D4-not-verified runs, 2026-09-07) ──────────────────────────
 * Production log, the closing turn of a real certification run:
 *
 *   [mcq-grade] { asked: 'The four fat-soluble vitamins…',
 *                 chosen: null, correct: null }
 *   [ladder]    { signalTag: true, correctness: true,
 *                 phaseBefore: 'PRACTICE', phaseAfter: 'TRANSFER',
 *                 check: 1, practice: 2 }
 *
 * A real authored probe (`assetId 6f906078-...`) was pending. The server's
 * deterministic grader (`gradeMcqAnswer`) could not resolve the learner's
 * reply to any option — `chosen: null, correct: null`, the exact same shape
 * as "no MCQ was pending at all." Three existing guards each fail to cover
 * this shape:
 *   - the bare-acknowledgement guard only fires on a bare ack;
 *   - the learner-question guard only fires when `detectLearnerQuestion`
 *     matches the message;
 *   - the unauthored-key check is itself gated on the grade having resolved
 *     (`mcqGradedThisTurn` truthy), so it never even asks whether the
 *     pending key was authored when grading failed.
 * With all three silent, the model's own self-reported SIGNAL correctness
 * for that turn flowed through untouched, banking a PLAIN mastery credit and
 * advancing PRACTICE -> TRANSFER on a turn the server never verified.
 * `serverGraded` correctly stayed false, so the STRICT counters never
 * credited it (which is why `verified` correctly read false) — but the
 * PLAIN counters and the phase ladder still moved on zero evidence.
 *
 * ── THE FIX (route.ts, immediately after the `[mcq-grade]` log) ────────────
 * When an MCQ was pending this turn (`pendingMcqHoisted`) and grading could
 * not resolve it (`!mcqGradedThisTurn`), `teachingSignal.correctness` is
 * dropped — the same class of suppression the ack/question guards already
 * apply. Only `correctness` is dropped; `confidence`/`confusion` survive.
 * This can only REMOVE a credit the server never earned: a genuinely graded
 * turn sets `teachingSignal.correctness` from the grade itself a few lines
 * above `mcqGradedThisTurn`'s definition, so it is never falsy when a real
 * grade exists.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `gradeMcqAnswer`, `resolveMcqChoice` and `probeKeyIsAuthored` —
 * the guard is mirrored so the same predicates the route runs decide every
 * case here. The route wiring itself is pinned by source assertions at the
 * bottom, following the same pattern as mcqReoffer.test.ts.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gradeMcqAnswer, probeKeyIsAuthored, type TutorMCQ } from '@/lib/teaching/mcq'
import { hasAskedMcq, recordMcqAsked, initialTeachingHistory } from '@/lib/teaching/teachingHistory'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

const VITAMIN_K_MCQ: TutorMCQ = {
  question: 'The four fat-soluble vitamins are conventionally listed as A, D, E and ______.',
  options: ['K', 'C', 'B12', 'B6'],
  correctIndex: 0,
  assetId: '6f906078-03ee-419f-b75f-4dca2ce0725e',
}

const UNAUTHORED_MCQ: TutorMCQ = {
  question: 'What is the powerhouse of the cell?',
  options: ['Mitochondria', 'Nucleus', 'Ribosome'],
  correctIndex: 0,
  // no assetId: a model-invented question has no authored identity.
}

type Signal = { correctness?: boolean; confidence?: 'high' | 'medium' | 'low'; confusion?: boolean } | null

/**
 * The exact guard added to route.ts, mirrored so this test exercises the
 * same real predicates the route runs. `mcqGradedThisTurn` is computed the
 * same way route.ts computes it: `gradeMcqAnswer` only sets a truthy grade
 * when it actually resolved (`g.correct !== null`).
 */
function suppressUnresolvedPendingMcqSignal(
  pendingMcqHoisted: TutorMCQ | null,
  message: string,
  teachingSignal: Signal,
): Signal {
  const g = pendingMcqHoisted ? gradeMcqAnswer(message, pendingMcqHoisted) : { chosenIndex: null, correct: null }
  const mcqGradedThisTurn = g.correct !== null ? g : null
  if (pendingMcqHoisted && !mcqGradedThisTurn && teachingSignal && teachingSignal.correctness !== undefined) {
    return { ...teachingSignal, correctness: undefined }
  }
  return teachingSignal
}

describe('an authored MCQ is served and graded normally (the happy path is untouched)', () => {
  it('an exact matching reply resolves server-side and is NOT suppressed', () => {
    const g = gradeMcqAnswer('K', VITAMIN_K_MCQ)
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(true)

    const signal: Signal = { correctness: true, confidence: 'high' }
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'K', signal)
    expect(result?.correctness).toBe(true)
  })

  it('serverGraded is true for a genuine authored-key grade (probeKeyIsAuthored)', () => {
    const g = gradeMcqAnswer('K', VITAMIN_K_MCQ)
    expect(g.correct).toBe(true)
    expect(probeKeyIsAuthored(VITAMIN_K_MCQ)).toBe(true)
  })

  it('the served probe is recorded in mcqAsked once graded, and cannot be re-served', () => {
    let history = initialTeachingHistory('chem.bio.vitamins')
    expect(hasAskedMcq(history, VITAMIN_K_MCQ.question)).toBe(false)
    history = recordMcqAsked(history, VITAMIN_K_MCQ.question)
    expect(hasAskedMcq(history, VITAMIN_K_MCQ.question)).toBe(true)
    // Recording twice is idempotent — the exclusion still fires exactly once.
    history = recordMcqAsked(history, VITAMIN_K_MCQ.question)
    expect(history.mcqAsked.filter((fp) => fp === history.mcqAsked[0]).length).toBe(1)
  })

  it('a wrong tap is genuinely graded false and is not suppressed either', () => {
    const g = gradeMcqAnswer('C', VITAMIN_K_MCQ)
    expect(g.correct).toBe(false)
    const signal: Signal = { correctness: false, confidence: 'high' }
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'C', signal)
    expect(result?.correctness).toBe(false)
  })
})

describe('THE FIX — an unresolved pending MCQ cannot manufacture a mastery credit', () => {
  it('reproduces the exact production failure: an unmappable reply + a false model self-report', () => {
    // A reply gradeMcqAnswer genuinely cannot map to any of the four options.
    const g = gradeMcqAnswer('I think it might be one of these but not sure which', VITAMIN_K_MCQ)
    expect(g.chosenIndex).toBeNull()
    expect(g.correct).toBeNull()

    // The model nonetheless emitted a SIGNAL claiming correctness=true.
    const signal: Signal = { correctness: true, confidence: 'high' }
    const result = suppressUnresolvedPendingMcqSignal(
      VITAMIN_K_MCQ, 'I think it might be one of these but not sure which', signal,
    )
    expect(result?.correctness).toBeUndefined()
  })

  it('confidence/confusion survive suppression — only correctness is dropped', () => {
    const signal: Signal = { correctness: true, confidence: 'low', confusion: true }
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'hmm not sure', signal)
    expect(result?.correctness).toBeUndefined()
    expect(result?.confidence).toBe('low')
    expect(result?.confusion).toBe(true)
  })

  it('also protects an UNAUTHORED (model-invented) pending question the same way', () => {
    const g = gradeMcqAnswer('definitely the powerhouse thing', UNAUTHORED_MCQ)
    expect(g.correct).toBeNull()
    const signal: Signal = { correctness: true }
    const result = suppressUnresolvedPendingMcqSignal(UNAUTHORED_MCQ, 'definitely the powerhouse thing', signal)
    expect(result?.correctness).toBeUndefined()
  })

  it('a signal with no correctness claim at all is left alone (nothing to suppress)', () => {
    const signal: Signal = { confidence: 'medium' }
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'not sure', signal)
    expect(result).toEqual(signal)
  })

  it('a null teachingSignal is left alone', () => {
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'not sure', null)
    expect(result).toBeNull()
  })
})

describe('normal existing signal behaviour is intact where no authored MCQ is pending', () => {
  it('an ordinary prose turn with no pending MCQ keeps its self-reported correctness untouched by this guard', () => {
    const signal: Signal = { correctness: true, confidence: 'medium' }
    const result = suppressUnresolvedPendingMcqSignal(null, 'yes I understand now', signal)
    expect(result?.correctness).toBe(true)
  })

  it('a graded WRONG answer to a genuinely resolved MCQ is not affected by this guard', () => {
    const signal: Signal = { correctness: false }
    const result = suppressUnresolvedPendingMcqSignal(VITAMIN_K_MCQ, 'B6', signal)
    expect(result?.correctness).toBe(false)
  })
})

describe('route wiring — the guard is actually present, in the right place, with the right shape', () => {
  it('the guard checks pendingMcqHoisted, !mcqGradedThisTurn, and teachingSignal.correctness', () => {
    const idx = ROUTE.indexOf('unresolved-pending-mcq-signal-suppressed')
    expect(idx).toBeGreaterThan(-1)
    const block = ROUTE.slice(Math.max(0, idx - 800), idx + 400)
    expect(block).toMatch(/pendingMcqHoisted\s*&&\s*!mcqGradedThisTurn\s*&&\s*teachingSignal\s*&&\s*teachingSignal\.correctness\s*!==\s*undefined/)
    expect(block).toMatch(/teachingSignal\s*=\s*\{\s*\.\.\.teachingSignal,\s*correctness:\s*undefined\s*\}/)
  })

  it('the guard sits AFTER mcqGradedThisTurn is defined and BEFORE the unauthored-key check', () => {
    const mcqGradedIdx = ROUTE.indexOf('const mcqGradedThisTurn = mcqGradeHoisted')
    const guardIdx = ROUTE.indexOf('unresolved-pending-mcq-signal-suppressed')
    const unauthoredIdx = ROUTE.indexOf('unauthored-key-not-certifying')
    expect(mcqGradedIdx).toBeGreaterThan(-1)
    expect(guardIdx).toBeGreaterThan(mcqGradedIdx)
    expect(unauthoredIdx).toBeGreaterThan(guardIdx)
  })

  it('does not touch gradedAgainstServerKeyHoisted or recordMcqAsked gating', () => {
    // Negative controls: this fix must not have touched the surrounding
    // machinery it deliberately leaves alone.
    expect(ROUTE).toMatch(/gradedAgainstServerKeyHoisted\s*=\s*await\s*\(async\s*\(\)\s*=>/)
    expect(ROUTE).toMatch(/if\s*\(pendingMcqHoisted\?\.question\s*&&\s*mcqGradeHoisted\)/)
  })
})
