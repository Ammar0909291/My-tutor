/**
 * AN ANSWER IS NOT A REQUEST FOR AN EXPLANATION.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, `phys.meas.dimensions`, real production. The learner answered
 * an MCQ, and the reply was a stored asset served whole:
 *
 *   [ladder] { mcqAsked: false, askedQuestion: false,
 *              phaseBefore: 'GUIDE', phaseAfter: 'CHECK' }
 *   provider=memory asset_ids=[f22e5673-…] servingMode=exact_match
 *
 *   "Mohammad Suaib, wave interference happens when two water waves overlap
 *    on a pond… Good question — now, back to Dimensional Analysis…"
 *
 * `admitForLearner`'s relevance test could not stop it, and its own comment
 * explains why: a turn that "names nothing specific" carries no topic to
 * contradict, so it CANNOT fail the test. That is right for "ok" and "go on".
 * It is wrong for an ANSWER — and the very next log line was the SAME asset
 * being refused as `irrelevant-to-question` on a turn where the learner did use
 * words. The guard works; a bare answer is simply invisible to it.
 *
 * ── THE POINT IS NOT ASSET QUALITY ──────────────────────────────────────────
 * A learner who has just answered a question is owed FEEDBACK ON THAT ANSWER —
 * whether they were right, and why. A canned explanation, however good, is the
 * wrong move on that turn. So the gate is not "was the asset relevant" but "did
 * the learner just answer something".
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'
import { admitForLearner, isRelevantToLearnerQuestion } from '@/lib/teaching/assets/learnerAdmission'
import type { TutorMCQ } from '@/lib/teaching/mcq'

/** The route's gate, mirrored exactly: `serveFromMemory = assembled && !answersPendingQuestion`. */
function serveFromMemory(input: {
  assembled: boolean
  pendingMcq: TutorMCQ | null
  message: string
  isBareAck: boolean
}): boolean {
  const graded = input.pendingMcq && !input.isBareAck
    ? gradeMcqAnswer(input.message, input.pendingMcq)
    : null
  const answersPendingQuestion = graded !== null && graded.correct !== null
  return input.assembled && !answersPendingQuestion
}

const MCQ: TutorMCQ = {
  question: 'Which of the following represents the correct dimensional formula for force?',
  options: ['[M][L][T]', '[M][L][T]⁻²', '[M][L]⁻¹[T]²', '[M]²[L][T]⁻¹'],
  correctIndex: 1,
}

/** The asset that was actually served, verbatim. */
const SERVED_ASSET =
  "Mohammad Suaib, wave interference happens when two water waves overlap on a pond, " +
  "combining to make either a much higher crest where they meet or completely flattening out."

describe('the production failure', () => {
  it('a tapped MCQ option no longer draws a stored explanation', () => {
    // The client sends the full option text when a learner taps a button.
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: '[M][L][T]⁻²', isBareAck: false,
    })).toBe(false)
  })

  it('a typed letter answer is treated the same', () => {
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: 'b', isBareAck: false,
    })).toBe(false)
  })

  it('a WRONG answer especially draws feedback, not an explanation', () => {
    // The turn a learner most needs a response to is the one they got wrong.
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: 'a', isBareAck: false,
    })).toBe(false)
  })
})

describe('why the existing relevance guard could not catch it', () => {
  it('a bare answer names nothing, so it cannot fail the relevance test', () => {
    // Documented behaviour, pinned so the reason stays visible: this is not a
    // bug in admitForLearner, it is a case outside what it can see.
    expect(isRelevantToLearnerQuestion(SERVED_ASSET, 'b')).toBe(true)
    expect(admitForLearner({ content: SERVED_ASSET, userMessage: 'b' }).admit).toBe(true)
  })

  it('a FOREIGN topic is still refused once the learner uses words', () => {
    // The other half, straight from the production log line.
    const r = admitForLearner({ content: SERVED_ASSET, userMessage: 'ok tell me about photosynthesis' })
    expect(r.admit).toBe(false)
    if (r.admit) return
    expect(r.reason).toBe('irrelevant-to-question')
  })

  it('PHASE 7K TRACK G CHANGED THIS: a practice request is no longer refused', () => {
    // This assertion previously read `.admit === false` for
    // "ok give me a question to practise", pinning the refusal as the "other
    // half" of the production log line. Phase 7K reclassified that refusal as
    // the P2-2 DEFECT, not as desired behaviour: on the one turn a learner
    // explicitly asks to work on the concept, every authored asset for it was
    // discarded and the turn fell through to an ungoverned model answer.
    //
    // THIS FILE'S PROTECTION IS UNAFFECTED, and the header says why in its own
    // words: "the gate is not 'was the asset relevant' but 'did the learner
    // just answer something'". That gate is `serveFromMemory`, asserted
    // directly below — the relevance guard never enforced it, which is what
    // this whole describe block ("why the existing relevance guard could not
    // catch it") exists to document.
    const r = admitForLearner({ content: SERVED_ASSET, userMessage: 'ok give me a question to practise' })
    expect(r.admit).toBe(true)
  })

  it('...and the REAL gate still refuses that same turn when an answer is pending', () => {
    // The strengthening half: admission is not the protection, so prove the
    // protection independently. A pending MCQ that the message answers still
    // blocks the memory path regardless of what admitForLearner now says.
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: 'b', isBareAck: false,
    })).toBe(false)
  })
})

describe('the gate does not close the memory path generally', () => {
  it('an ordinary question still serves a stored explanation', () => {
    expect(serveFromMemory({
      assembled: true, pendingMcq: null, message: 'what is a dimension?', isBareAck: false,
    })).toBe(true)
  })

  it('"go on" with no pending question still serves', () => {
    expect(serveFromMemory({
      assembled: true, pendingMcq: null, message: 'ok go on', isBareAck: true,
    })).toBe(true)
  })

  it('an unrelated message during a pending MCQ still serves', () => {
    // The learner ignored the question and asked something else. That IS a
    // request, so the memory path is correct — and the grader returns null,
    // which is what makes the distinction possible.
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: 'wait, what does dimension mean again?', isBareAck: false,
    })).toBe(true)
  })

  it('a bare acknowledgement during a pending MCQ still serves', () => {
    // "ok" is not an answer; grading is skipped, and continuing the lesson
    // from the stored asset is right.
    expect(serveFromMemory({
      assembled: true, pendingMcq: MCQ, message: 'ok', isBareAck: true,
    })).toBe(true)
  })

  it('nothing assembled means nothing to serve, answer or not', () => {
    expect(serveFromMemory({
      assembled: false, pendingMcq: MCQ, message: 'b', isBareAck: false,
    })).toBe(false)
  })
})
