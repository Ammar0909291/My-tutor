/**
 * "LET'S STAY WITH THIS IDEA FOR A MOMENT." — SHIPPED IN FRONT OF A TAPPABLE
 * QUESTION.
 *
 * ── MEASURED LIVE ───────────────────────────────────────────────────────────
 * phys.opt.mirrors, 2026-09-01, disposable account, deployed app, driving the
 * diagram-under-struggle probe:
 *
 *   [T6] mcq=yes   "Let's stay with this idea for a moment."
 *
 * The learner had a question on screen and was told to stay with an idea.
 * That is precisely the situation `WITHHELD_QUESTION_HANDS_OFF_TO_MCQ` exists
 * for — "Let me check your thinking with this." — and it did not fire.
 *
 * ── ROOT CAUSE: TWO DIFFERENT QUESTIONS, ONE FLAG ───────────────────────────
 * `hasStructuredMcq` means "the gate attached a probe THIS turn". The route
 * serves the learner `mcqToServe(attachedThisTurn, pending, graded)`, which
 * ALSO serves a probe carried forward from an earlier turn when nothing was
 * attached and nothing was graded. So the learner can be looking at a question
 * while `hasStructuredMcq` is false — and the fallback then chose the sentence
 * written for a turn with nothing following it.
 *
 * Same seam as the earlier `mcqToServe` defect this session: the route and the
 * widget disagreeing about what is on the screen.
 *
 * ── WHAT CHANGED, AND WHAT DELIBERATELY DID NOT ─────────────────────────────
 * ONLY the replacement sentence. The withhold DECISION is untouched: a stray
 * ungradeable question is still stripped, because no probe was attached this
 * turn and the branch that compares prose against an attached question has
 * nothing to compare with. Flipping `hasStructuredMcq` instead would enter
 * that branch, find no `attachedMcqQuestion`, and return the text UNTOUCHED —
 * shipping the ungradeable question. That is why this is a sentence fix and
 * not a branch fix.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

type Args = Parameters<typeof withholdUngradedGateQuestion>[0]
const run = (over: Partial<Args>) => withholdUngradedGateQuestion({
  text: 'Let me ask you something. What is the focal length of that mirror?',
  phase: 'CHECK',
  hasGradeableProbe: false,
  hasStructuredMcq: false,
  ...over,
} as Args)

describe('A. the live turn', () => {
  it('hands off when a carried-forward question is on screen', () => {
    const r = run({ questionOnScreen: true })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe('Let me check your thinking with this.')
    expect(r.text).not.toContain("stay with this idea")
  })

  it('still stalls honestly when nothing is on screen', () => {
    // The hold sentence is correct THERE — it is only wrong in front of a
    // question. Removing it entirely would be the opposite defect.
    const r = run({ questionOnScreen: false })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe("Let's stay with this idea for a moment.")
  })

  it('an omitted flag behaves exactly as before', () => {
    expect(run({}).text).toBe("Let's stay with this idea for a moment.")
  })
})

describe('B. with a graded answer, the verdict still leads', () => {
  it('a wrong answer reveals the key and then hands off', () => {
    const r = run({
      questionOnScreen: true,
      justGraded: { correct: false, correctOptionText: 'v = +20 cm' },
    })
    expect(r.text).toBe('Not quite — the answer was: v = +20 cm. Let me check your thinking with this.')
  })

  it('a correct answer confirms and then hands off', () => {
    const r = run({ questionOnScreen: true, justGraded: { correct: true } })
    expect(r.text).toBe("That's right. Let me check your thinking with this.")
  })
})

describe('C. the withhold DECISION is unchanged', () => {
  it('a turn that asks nothing gradeable is still left alone', () => {
    const r = run({ text: 'Friction resists sliding between two surfaces.', questionOnScreen: true })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
  })

  it('the stray question is still stripped, on screen or not', () => {
    for (const questionOnScreen of [true, false]) {
      const r = run({ questionOnScreen })
      expect(r.withheld).toBe(true)
      expect(r.reason).toBe('no-gradeable-probe')
      expect(r.text).not.toContain('focal length')
    }
  })

  it('MEASURED: a teaching sentence before the question is ALSO dropped', () => {
    // I expected the teaching to survive and the question alone to go. It does
    // not: `dropOrphanedLeadIn(dropAnswerableContent(text))` returns empty for
    // this input, so the whole turn becomes the hand-off sentence.
    //
    // Recorded as measured behaviour, NOT endorsed. Whether a sentence that
    // teaches ("parallel rays converge at the focus") should be treated as an
    // orphaned lead-in is a real question — the helper's own docblock says it
    // drops "trailing lines that only ANNOUNCE the question just removed", and
    // this one announces nothing. Investigating that is its own measurement,
    // not a change smuggled in beside this one, so the current behaviour is
    // pinned here and the question is left standing rather than silently
    // answered.
    const r = run({
      text: 'A concave mirror bulges away from you, so parallel rays converge at the focus. '
        + 'What is the focal length of that mirror?',
      questionOnScreen: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toContain('focal length of that mirror')
    expect(r.text).toBe('Let me check your thinking with this.')
  })
})

describe('D. the route asks the right question of the right helper', () => {
  it('passes questionOnScreen from mcqToServe, not from mcqHoisted', () => {
    const { readFileSync } = require('node:fs')
    const { join } = require('node:path')
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    const i = route.indexOf('withholdUngradedGateQuestion({')
    expect(i).toBeGreaterThan(-1)
    const block = route.slice(i - 400, i + 1400)
    expect(block).toContain('questionOnScreen:')
    expect(block).toContain('mcqToServeForWithhold(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)')
    // and hasStructuredMcq still means what it meant
    expect(block).toContain('hasStructuredMcq: mcqHoisted !== null')
  })
})
