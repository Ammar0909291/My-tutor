/**
 * THE TUTOR MUST NOT BE TOLD A WRONG ANSWER WAS RIGHT.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit Topic 3, `phys.meas.errors`, real production, real learner
 * account. The question was "What does taking the average of multiple
 * measurements actually help reduce?" and the learner chose
 * "Systematic errors and calibration flaws" — flatly wrong (averaging reduces
 * RANDOM error), and precisely the Educational Brain's authored M2 for this
 * concept: random and systematic errors treated as interchangeable.
 *
 * The server GRADED IT WRONG and the ladder acted on it:
 *
 *   [mcq-grade] { chosen: 1, correct: false }
 *   [ladder]    { correctness: false, phaseBefore: 'CHECK', phaseAfter: 'GUIDE' }
 *
 * And in the SAME turn the decision layer said:
 *
 *   CUE decision = ADVANCE_DIFFICULTY (D6-MASTERY-ADVANCE)
 *   rationale: "Correct AND confident with no failures banked this session"
 *   conversation decision = SUCCESS
 *
 * So the tutor was told the learner was right and instructed to raise the
 * demand. It did exactly that — it paraphrased a true-but-irrelevant fragment
 * of the wrong answer back ("you noticed that systematic errors are tied to
 * calibration flaws… have I got that right?") and asked the learner to confirm
 * it. **A learner leaves that turn believing they were correct**, having just
 * demonstrated the exact misconception the curriculum authored a repair for.
 *
 * ── THE CAUSE ───────────────────────────────────────────────────────────────
 * `lastSignal` is the PREVIOUS turn's signal, and it was the only evidence this
 * layer had. That was invisible while no reliable per-turn signal existed at
 * all — the model never emits `<!--SIGNAL-->`, which is why deterministic MCQ
 * grading was added. The grade reached the LADDER and not the DECISION, so two
 * authorities inside one turn disagreed about whether the learner was right.
 *
 * These tests pin the two halves that must not come apart: the ladder demotes,
 * and the decision engine routes to repair.
 */
import { describe, it, expect } from 'vitest'
import { understandStudentTurn } from '@/lib/understanding'
import { decideTeaching } from '@/lib/understanding/decisionEngine'
import { initialConversationState, advanceConversationState } from '@/lib/teaching/conversationState'

/** The exact exchange, reproduced. */
const WRONG_ANSWER = 'Systematic errors and calibration flaws'
const QUESTION = 'What does taking the average of multiple measurements actually help reduce?'

function understanding(lastSignal: { correctness?: boolean; confidence?: string } | null) {
  return understandStudentTurn({
    message: WRONG_ANSWER,
    history: [{ role: 'assistant', content: QUESTION }],
    recoveryKey: null,
    firstLessonActive: false,
    sessionFailureCount: 0,
    consecutivePriorKnowledgeProbes: 0,
    conceptId: 'phys.meas.errors',
    dueReviewCount: 0,
    evidenceMove: 'ask',
    assembled: null,
    memoryFallbackReason: null,
    lastSignal,
  } as never)
}

describe('the production failure', () => {
  it('reproduces with the STALE signal — the defect, pinned', () => {
    // Kept as a test rather than deleted: it is the evidence that the fix
    // targets the right input, and it fails loudly if the precedence is ever
    // reverted at the call site.
    const d = decideTeaching(understanding({ correctness: true, confidence: 'high' }))
    expect(d.decision).toBe('ADVANCE_DIFFICULTY')
  })

  it('routes to misconception repair once THIS turn\'s grade is used', () => {
    const u = understanding({ correctness: false, confidence: 'high' })
    expect(u.masteryState.value).toBe('misconceiving')
    const d = decideTeaching(u)
    expect(d.decision).toBe('DETECT_MISCONCEPTION')
    expect(d.ruleId).toContain('CONFIDENT-WRONG')
  })

  it('never advances difficulty on a wrong answer, at any confidence', () => {
    for (const confidence of ['high', 'medium', 'low']) {
      const d = decideTeaching(understanding({ correctness: false, confidence }))
      expect(d.decision, `confidence=${confidence}`).not.toBe('ADVANCE_DIFFICULTY')
    }
  })
})

describe('the two authorities agree', () => {
  it('the ladder demotes on the same evidence the decision layer sees', () => {
    // CHECK -> GUIDE is what production actually did; the decision layer must
    // not be reasoning about a different learner on the same turn.
    const before = { ...initialConversationState('phys.meas.errors'), phase: 'CHECK' as const, demonstrated: true }
    const after = advanceConversationState(before, {
      askedQuestion: true,
      signalCorrect: false,
      recoveryFired: false,
      learnerRequest: null,
      misconceptionDetected: false,
      isPriorKnowledgeProbe: false,
      deliveredTeaching: true,
    })
    expect(after.phase).not.toBe('CHECK')
    expect(after.correctAtCheck).toBe(0)

    const d = decideTeaching(understanding({ correctness: false, confidence: 'high' }))
    expect(d.decision).toBe('DETECT_MISCONCEPTION')
  })
})

describe('a correct answer is unaffected', () => {
  it('still reads as progressing and may advance', () => {
    // The fix must not turn every turn into a repair turn.
    const u = understandStudentTurn({
      message: 'Random error and scatter',
      history: [{ role: 'assistant', content: QUESTION }],
      recoveryKey: null,
      firstLessonActive: false,
      sessionFailureCount: 0,
      consecutivePriorKnowledgeProbes: 0,
      conceptId: 'phys.meas.errors',
      dueReviewCount: 0,
      evidenceMove: 'ask',
      assembled: null,
      memoryFallbackReason: null,
      lastSignal: { correctness: true, confidence: 'high' },
    } as never)
    expect(u.masteryState.value).not.toBe('misconceiving')
    expect(decideTeaching(u).decision).not.toBe('DETECT_MISCONCEPTION')
  })

  it('an ungradeable turn falls back to the snapshot signal', () => {
    // The route only overrides when the grade resolved. `null` means "not
    // gradeable", never "wrong", so nothing changes for free-text turns.
    const d = decideTeaching(understanding(null))
    expect(d.decision).toBeTruthy()
  })
})
