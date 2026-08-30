/**
 * THE GATE RE-SELECTED THE PROBE ON THE VERY TURN THAT GRADED IT.
 *
 * ── MEASURED IN PRODUCTION, from the gate's own logs ────────────────────────
 * Session cmtayc5c3…, phys.mech.generalized-coordinates, 2026-08-27, on the
 * build that already carries the D1 key-normalisation fix:
 *
 *   03:18:46  move=ask    [gate-assessment] assetId 0c6f384c-…   ← served
 *   03:19:06  [mcq-grade] { chosen: 0, correct: true }            ← graded
 *   03:19:06  move=teach  [gate-assessment] assetId 0c6f384c-…   ← RE-SELECTED
 *
 * The same shape repeated for 182becc3-… (03:19:45 → 03:20:05) and
 * 0e0e5ef4-… (03:20:46 → 03:21:07). Result: three distinct authored probes,
 * but SIX PROBE_OUTCOME rows — two `pass` per asset. One question, two pieces
 * of evidence.
 *
 * ── WHY THE EXISTING GUARDS DID NOT CATCH IT ────────────────────────────────
 * A probe is spent when it is ANSWERED, not when it is shown — `recordMcqAsked`
 * runs at the END of the turn, in the teaching-history fold. The gate selects
 * near the START of the same turn. So on the grading turn the probe is not yet
 * in `mcqAsked`, and it is not protected by `unansweredProbeOnScreen` either,
 * because it is no longer unanswered — it was answered THIS turn.
 *
 * route.ts's own comment asserted the opposite: "`unansweredProbeOnScreen`
 * already stops the gate selecting a new probe while one is pending, so
 * deferring the record cannot let the same probe be handed out twice in a
 * row." That is true only while the probe is UNANSWERED. The turn that grades
 * it falls in the gap between the two guards.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * One assignment. The gate reads the ledger AS IT WILL BE at the end of this
 * turn: when this turn graded a pending question, fold that question in with
 * the real writer (`recordMcqAsked`) before building the exclusion predicate.
 *
 * Reusing the actual writer and the actual reader is deliberate — a
 * hand-rolled fingerprint comparison here would be a second definition of
 * "spent" and could drift from the ledger, which is the defect class this
 * whole D1 investigation has been about.
 *
 * It prevents duplicate PRESENTATION. It does not suppress, dedupe, or reweigh
 * evidence; grading, mastery thresholds, CLOSE, budget, ladder transitions and
 * probe-eligibility policy are all untouched.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { stripAuthoringLabel } from '@/lib/teaching/gateProbeContract'
import { recordMcqAsked, hasAskedMcq, initialTeachingHistory } from '@/lib/teaching/teachingHistory'
import { probeToMcq } from '@/lib/teaching/gateAssessment'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')

/** The production probe, verbatim (probe_assets 0c6f384c-…). */
const D1_STEM =
  'DIAGNOSTIC (Prerequisite PD-1/PD-2): Is the normal force on a frictionless ramp '
  + 'a constraint force? A particle moves in a circle of radius R — express its velocity '
  + 'in terms of θ and θ̇.'
const D1_CHOICES = [
  { text: 'Yes, N is a constraint force (perpendicular to motion, does zero work); v = Rθ̇', isCorrect: true },
  { text: 'No, N does work on the particle; v = R+θ̇', isCorrect: false },
]
const OTHER_STEM = 'FORMATIVE: Is "rolling without slipping" a holonomic constraint?'

/** The pendingMcq the route holds on the grading turn. */
const pendingMcq = probeToMcq({ stem: D1_STEM, choices: D1_CHOICES, assetId: '0c6f384c' })!

/**
 * The gate's view of the ledger, as the fix builds it: the persisted history,
 * plus THIS turn's graded question when there is one.
 */
const gateLedger = (
  history: ReturnType<typeof initialTeachingHistory>,
  graded: boolean,
) => (graded ? recordMcqAsked(history, pendingMcq.question) : history)

const excludes = (h: ReturnType<typeof initialTeachingHistory>) =>
  (stem: string) => hasAskedMcq(h, stripAuthoringLabel(stem))

const fresh = () => initialTeachingHistory('phys.mech.generalized-coordinates')

describe('1 · a newly served MCQ can be answered normally', () => {
  it('before it is graded, the probe is selectable — nothing is pre-emptively burned', () => {
    // The serving turn: no grade yet, so the pool is untouched.
    expect(excludes(gateLedger(fresh(), false))(D1_STEM)).toBe(false)
  })
})

describe('2 · a graded MCQ cannot be re-selected on the turn that graded it', () => {
  it('the probe is spent the moment its answer is graded', () => {
    expect(excludes(gateLedger(fresh(), true))(D1_STEM)).toBe(true)
  })

  it('this is exactly the production sequence, replayed', () => {
    let h = fresh()
    // 03:18:46 — gate serves it; not graded yet, so it is legitimately available
    expect(excludes(gateLedger(h, false))(D1_STEM)).toBe(false)
    // 03:19:06 — the answer is graded THIS turn; the gate must no longer see it
    expect(excludes(gateLedger(h, true))(D1_STEM)).toBe(true)
    // end of turn: the real writer persists it, so later turns agree
    h = recordMcqAsked(h, pendingMcq.question)
    expect(excludes(gateLedger(h, false))(D1_STEM)).toBe(true)
  })
})

describe('3 · one authored asset yields at most one graded outcome', () => {
  it('a second grading opportunity for the same asset never arises', () => {
    let h = fresh()
    h = recordMcqAsked(h, pendingMcq.question)
    for (let laterTurn = 0; laterTurn < 4; laterTurn += 1) {
      expect(excludes(gateLedger(h, false))(D1_STEM)).toBe(true)
    }
  })
})

describe('4 · a genuinely NEW authored probe still attaches', () => {
  it('the unspent sibling survives the same predicate', () => {
    const h = gateLedger(fresh(), true)
    expect(excludes(h)(D1_STEM)).toBe(true)
    expect(excludes(h)(OTHER_STEM)).toBe(false)
  })

  it('probes rotate: spend one, the next is still offered', () => {
    let h = fresh()
    h = recordMcqAsked(h, pendingMcq.question)
    expect([D1_STEM, OTHER_STEM].filter((s) => !excludes(h)(s))).toEqual([OTHER_STEM])
  })
})

describe('5 · model-generated MCQs keep their existing behaviour', () => {
  it('a model question folds by the same rule, with no label to strip', () => {
    const modelQ = 'Which statement best describes a generalized coordinate?'
    let h = fresh()
    expect(hasAskedMcq(h, modelQ)).toBe(false)
    h = recordMcqAsked(h, modelQ)
    expect(hasAskedMcq(h, modelQ)).toBe(true)
    expect(stripAuthoringLabel(modelQ)).toBe(modelQ)
  })
})

describe('6 · pending-question lesson identity is untouched', () => {
  it('the pending question is still written and read with its lesson key', () => {
    // The lesson key — this test's actual subject — is unchanged. The question
    // argument became `mcqToServe(...)` on 2026-08-30 so the response payload
    // and the persisted snapshot cannot disagree about what is on the learner's
    // screen; `mcqHoisted` is still its first and winning input.
    expect(ROUTE).toMatch(/writePendingQuestion\(\s*\n\s*mcqToServe\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\),\s*\n\s*lessonKeyThisTurnHoisted,\s*\n\s*\)/)
  })
})

describe('7 · Phase F assetId provenance is untouched', () => {
  it('the graded pending MCQ still carries its authored identity', () => {
    expect(pendingMcq.assetId).toBe('0c6f384c')
  })

  it('and the outcome still names the asset it scored', () => {
    expect(ROUTE).toMatch(/assetId:\s+pendingMcqHoisted\?\.assetId/)
  })
})

describe('8-12 · nothing about grading, mastery, CLOSE or budget moves', () => {
  it('grading is still the sole producer of the grade', () => {
    expect(ROUTE).toMatch(/if \(g\.correct !== null\) mcqGradeHoisted = g/)
  })

  it('a probe is still spent on the GRADE, not on being shown', () => {
    expect(ROUTE).toMatch(/if \(pendingMcqHoisted\?\.question && mcqGradeHoisted\) \{/)
  })

  it('the mastery bar is unchanged', () => {
    const CS = REPO('src/lib/teaching/conversationState.ts')
    expect(CS).toMatch(/correctAtCheck\s*>=\s*1/)
    expect(CS).toMatch(/correctAtPractice\s*>=\s*2/)
  })

  it('no duplicate-evidence suppression was introduced — presentation is what changes', () => {
    // If a future edit "fixes" this by dropping a second outcome row instead of
    // preventing the second presentation, this fails.
    expect(ROUTE).not.toMatch(/skipDuplicateOutcome|dedupeProbeOutcome|suppressRepeatEvidence/)
  })
})

describe('the wiring is real', () => {
  it('the gate folds this turn\'s grade into the ledger it reads', () => {
    expect(ROUTE).toMatch(/const historyForGate =/)
    expect(ROUTE).toMatch(/recordMcqAskedForGate\(history, pendingMcqHoisted\.question\)/)
  })

  it('and the exclusion predicate reads THAT ledger', () => {
    expect(ROUTE).toMatch(/excludeProbeStem: historyForGate \? \(stem\) => hasAskedMcq\(historyForGate, stripAuthoringLabel\(stem\)\) : undefined/)
  })

  it('the memory selector path folds the same way', () => {
    const at = ROUTE.indexOf('assembleLesson(memoryState, {')
    expect(at).toBeGreaterThan(0)
    expect(ROUTE.slice(at - 1400, at + 400)).toMatch(/historyForMemory/)
    expect(ROUTE.slice(at - 1400, at + 400)).toMatch(/recordMcqAskedForMemory/)
  })

  it('both paths still derive the spent key with the one normalisation', () => {
    const uses = ROUTE.match(/hasAskedMcq(?:ForMemory)?\((?:historyForGate|historyForMemory), strip(?:AuthoringLabel|LabelForMemory)\(stem\)\)/g) ?? []
    expect(uses).toHaveLength(2)
  })
})
