/**
 * P0-B — mastery evidence registration, alternative-choice questions
 * (2026-08-22).
 *
 * ROOT CAUSE: `askedAnswerableQuestion()` gates whether the model's SIGNAL
 * `correctness` is trusted as evidence. It required a `SOLICITS_CONTENT`
 * wh-word/imperative ("what", "which", "calculate", …). Direct probing of
 * common, real tutoring phrasings found a whole family of genuine content
 * questions that carry none of those words and were therefore invisible to
 * the guard: "Is the acceleration positive or negative here?", "Does the
 * ball move up or down?", "Would this reaction be endothermic or
 * exothermic?" A learner who answered any of these correctly in free-form
 * text ("negative", "down", "endothermic") had that evidence silently
 * suppressed — exactly the P0-B failure mode (correct answers not
 * incrementing mastery, pushing the learner toward budget exhaustion).
 *
 * FIX: a narrow `ALTERNATIVE_CHOICE` pattern — an interrogative auxiliary
 * near the head, an "or" naming a second alternative, ending in "?", and NOT
 * an "or not" confirmation tail — is now an alternate (not replacement) path
 * to `askedAnswerableQuestion() === true`, alongside the existing
 * `SOLICITS_CONTENT` grammar.
 */
import { describe, it, expect } from 'vitest'
import {
  askedAnswerableQuestion, shouldSuppressSignalCorrectness,
} from '@/lib/teaching/answerableTurn'

describe('askedAnswerableQuestion — alternative-choice questions (P0-B)', () => {
  it('recognizes real alternative-choice tutoring questions', () => {
    const positives = [
      'Is the acceleration positive or negative here?',
      'Does the ball move up or down after it leaves your hand?',
      'Would this reaction be endothermic or exothermic?',
      'So, is the force here friction or gravity?',
      'Is the number 12 odd or even?',
      'Does the current increase or decrease as resistance rises?',
    ]
    for (const text of positives) {
      expect(askedAnswerableQuestion(text)).toBe(true)
    }
  })

  it('a correct free-form answer to an alternative-choice question is no longer suppressed', () => {
    const tutorTurn = "Great, we've set up the diagram. Is the acceleration positive or negative here?"
    const d = shouldSuppressSignalCorrectness({
      priorAssistantText: tutorTurn,
      hasPendingStructuredMcq: false,
    })
    expect(d.suppress).toBe(false)
    expect(d.reason).toBeNull()
  })

  it('negative control: "or not" stays a confirmation shape, not alternative-choice', () => {
    expect(askedAnswerableQuestion('Is momentum conserved in this collision or not?')).toBe(false)
  })

  it('negative controls: existing confirmation-tail questions are unaffected', () => {
    const confirmations = [
      'Does that make sense?',
      'Are you ready?',
      'Is that right?',
      'Okay?',
      'Any questions?',
    ]
    for (const text of confirmations) {
      expect(askedAnswerableQuestion(text)).toBe(false)
    }
  })

  it('negative control: prose with "or" but not a question is unaffected', () => {
    expect(askedAnswerableQuestion(
      'You can use either method here, or the shortcut, depending on preference.',
    )).toBe(false)
  })

  it('existing SOLICITS_CONTENT questions remain recognized (no regression)', () => {
    expect(askedAnswerableQuestion('What is the value of x?')).toBe(true)
    expect(askedAnswerableQuestion('Calculate the molar mass of water.')).toBe(true)
  })
})
