/**
 * Repeated recovery utterances must keep their own classification.
 *
 * Found by replaying real production traffic (Supabase project
 * ywakxiqbevfuxsiwewnw, spine_events.UtteranceStateDetected joined to the
 * learner messages that produced it) through the current runtime modules.
 * Production recorded 29 'frustrated' detections across 11 sessions, and the
 * learner utterances behind them are dominated by canned UI-button text that
 * a learner naturally sends twice in a row.
 *
 * detectFailureState evaluated isRepeatedAnswer() BEFORE the mild-pattern
 * classification, so any recovery utterance sent twice was reclassified as
 * 'frustrated' and never reached its own classifier. Two consequences, both
 * load-bearing:
 *
 *   · 'frustrated' is not in DONT_KNOW_SIGNAL_KEYS, so isDontKnowSignal()
 *     returned false and ConversationState.consecutiveDontKnows did not
 *     increment on the SECOND "I don't know". The Rule 2 escalation that
 *     ends discovery and forces explanation after two consecutive signals
 *     therefore could not fire for the learner who needs it most.
 *   · It re-infers an internal state the learner just stated, against
 *     foundations/04 P20 (stated internal state is ground truth, accepted
 *     instantly, never re-inferred).
 *
 * The exclusion mirrors the one isRepeatedAnswer() already documents for
 * acknowledgements: an acknowledgement is not an answer, and neither is a
 * recovery utterance.
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'

describe('repeated recovery utterances keep their own failure state', () => {
  it('classifies a repeated "I don\'t know" as dont_know, not frustrated', () => {
    expect(detectFailureState("I don't know", "I don't know")).toBe('dont_know')
  })

  it('counts the second consecutive "I don\'t know" as a dont-know signal', () => {
    // The property that actually drives Rule 2: without this,
    // consecutiveDontKnows stays at 1 no matter how often the learner repeats.
    const first = detectFailureState("I don't know", null)
    const second = detectFailureState("I don't know", "I don't know")
    expect(isDontKnowSignal(first)).toBe(true)
    expect(isDontKnowSignal(second)).toBe(true)
  })

  it('keeps the specific state for the other repeated mild utterances', () => {
    expect(detectFailureState("Still didn't get it.", "Still didn't get it.")).toBe('dont_understand')
    expect(detectFailureState("I'm confused", "I'm confused")).toBe('confused')
  })

  it('still reads a genuinely repeated substantive answer as frustrated', () => {
    // Real production pair: the learner answered "Light" twice running.
    expect(detectFailureState('Light', 'Light')).toBe('frustrated')
    expect(detectFailureState('1 bond?', '1 bond?')).toBe('frustrated')
  })

  it('still ignores a repeated acknowledgement (2ca0734 stays fixed)', () => {
    // Real production pair: "Got it" sent on consecutive turns, 15+ times.
    expect(detectFailureState('Got it', 'Got it')).toBeNull()
  })

  it('leaves single-utterance classification unchanged', () => {
    expect(detectFailureState("I don't know", null)).toBe('dont_know')
    expect(detectFailureState("Still didn't get it.", null)).toBe('dont_understand')
    expect(detectFailureState('Got it', null)).toBeNull()
  })

  it('still lets shouting outrank a mild pattern', () => {
    expect(detectFailureState("I DON'T UNDERSTAND ANY OF THIS", null)).toBe('frustrated')
  })
})
