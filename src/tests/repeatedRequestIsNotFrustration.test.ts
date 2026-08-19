/**
 * ASKING FOR THE NEXT QUESTION TWICE IS NOT DISTRESS.
 *
 * ── THE DEFECT, TRACED END TO END IN PRODUCTION ─────────────────────────────
 * phys.mech.viscosity, captured turn by turn on the real account. The learner
 * asked for a question, was taught, and asked again — the ordinary rhythm of a
 * lesson. On the SECOND identical request:
 *
 *   detectFailureState('ok give me the next question',
 *                      'ok give me the next question')  ->  'frustrated'
 *
 * The route turns that into `recoveryFired`, which advanceConversationState
 * reads as `failed`: consecutiveFailures + 1, phaseDown(), memory suppressed.
 * MAX_CONSECUTIVE_FAILURES is 3, so the third such turn exhausts the concept
 * budget, `isConceptClosed` goes true, and the LESSON FINALISES.
 *
 * MEASURED, from the captured payloads:
 *   T4  lessonComplete {complete: true, mastered: [], needsReview:
 *       [phys.mech.viscosity], fullyMastered: false, durationSeconds: 68}
 *       mastery {phase: DEMONSTRATE, checkCorrect: 0, practiceCorrect: 0}
 *   T5+ provider=memory, llmCallCount=0, the completion text forever:
 *       "what's one thing you notice or find surprising about what we just
 *        covered?"
 *
 * The lesson ended 68 seconds in, on turn 4, with zero graded evidence — on a
 * turn where the learner had just answered CORRECTLY — and then talked at them
 * in a loop. This is the mechanism behind every "frozen at DEMONSTRATE with
 * 0/0" row the engine sweep reported: the ladder was never stuck, the lesson
 * was over.
 *
 * ── THE FIX IS THE MODULE'S OWN REASONING, APPLIED ONCE MORE ────────────────
 * `isRepeatedAnswer` already excluded acknowledgements, and the classifier
 * already excluded recovery utterances, both because they are not ANSWERS. A
 * request to be given a question is not an answer either — and typing it twice
 * means the learner is still willing, the opposite of what 'frustrated' says.
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

/** The learner says the same thing twice — the shape that misfired. */
const repeated = (m: string) => detectFailureState(m, m)

describe('THE PRODUCTION TURN', () => {
  it('the exact message that ended a lesson in 68 seconds is no longer distress', () => {
    expect(repeated('ok give me the next question')).toBeNull()
  })

  it('and neither are the other phrasings measured in real sessions', () => {
    for (const m of [
      'ok give me the next practice question',
      'ok give me a question to check i understand',
      'ok next question please',
      'ok give me the next question',
    ]) {
      expect(repeated(m)).toBeNull()
    }
  })
})

describe('the class this covers — a request for the next item', () => {
  it('requests for a question, problem, example or exercise', () => {
    for (const m of [
      'give me another one',
      'another question please',
      'can you give me a practice problem',
      'show me another example',
      'please give me an exercise',
      'lets do another question',
    ]) {
      expect(repeated(m)).toBeNull()
    }
  })

  it('bare nudges with no content of their own', () => {
    for (const m of ['next', 'another', 'carry on', 'go on', 'keep going', 'ok next']) {
      expect(repeated(m)).toBeNull()
    }
  })
})

describe('WHAT MUST STILL FIRE — the guard is narrowed, not disabled', () => {
  it('A REPEATED SUBSTANTIVE ANSWER IS STILL FRUSTRATION', () => {
    // This is the case isRepeatedAnswer exists for: a learner giving the same
    // answer again is stuck, and that must keep reaching recovery.
    for (const m of ['the drag force doubles', '10 m/s', 'because gravity pulls it down']) {
      expect(repeated(m)).toBe('frustrated')
    }
  })

  it('stated distress is untouched, repeated or not', () => {
    expect(detectFailureState('i give up')).toBe('give_up')
    expect(repeated('i give up')).toBe('give_up')
    expect(detectFailureState('i dont understand any of this')).toBe('dont_understand')
  })

  it('a repeated REPHRASE request is still a signal — isRephraseRequest owns it', () => {
    // "explain it differently" twice means the second explanation did not land.
    // That is worth acting on, and is deliberately NOT in the exempt class.
    expect(repeated('explain it differently')).toBe('frustrated')
  })

  it('a single benign request was never distress and still is not', () => {
    for (const m of ['ok give me the next question', 'next', 'another question please']) {
      expect(detectFailureState(m)).toBeNull()
      expect(detectFailureState(m, 'something else entirely')).toBeNull()
    }
  })

  it('never throws', () => {
    for (const m of ['', '   ', '?', 'a'.repeat(500)]) {
      expect(() => detectFailureState(m, m)).not.toThrow()
    }
  })
})
