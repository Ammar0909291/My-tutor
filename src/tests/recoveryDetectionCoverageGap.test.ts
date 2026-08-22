/**
 * P1 — Recovery detection coverage gaps (2026-08-22).
 *
 * Naturally occurring learner utterances measured to be missed by
 * `detectFailureState`: "the direction is confusing me" and "I just
 * guessed" (also "I guessed" / "I wasn't sure"). Extended as structural
 * families — the invariant verb phrase ("confusing me", "guessed", "wasn't
 * sure") rather than a per-sentence phrase list — so natural variants are
 * covered without enumerating them.
 *
 * Every positive here is checked against the existing successful forms too,
 * and every negative control from the investigation is re-asserted so the
 * extension cannot be shown to have widened recovery detection into
 * ordinary acknowledgement or grading behaviour.
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

describe('detectFailureState — newly covered positives (P1)', () => {
  it('"<subject> is confusing me" — structural family, any named subject', () => {
    expect(detectFailureState('the direction is confusing me')).toBe('confused')
    expect(detectFailureState('this notation is confusing me')).toBe('confused')
    expect(detectFailureState('these steps are really confusing me')).toBe('confused')
  })

  it('"I just guessed" / "I guessed" — past tense of the existing guessing family', () => {
    expect(detectFailureState('I just guessed')).toBe('guessing')
    expect(detectFailureState('I guessed')).toBe('guessing')
    expect(detectFailureState('honestly I guessed')).toBe('guessing')
  })

  it('"I wasn\'t sure" — a disclosure of low confidence, same script as guessing', () => {
    expect(detectFailureState("I wasn't sure")).toBe('guessing')
    expect(detectFailureState('I was not sure')).toBe('guessing')
  })
})

describe('detectFailureState — pre-existing successful forms still work', () => {
  it('"I don\'t understand this" / "I\'m confused"', () => {
    expect(detectFailureState("I don't understand this")).toBe('dont_understand')
    expect(detectFailureState("I still don't understand this")).toBe('dont_understand')
    expect(detectFailureState("I'm confused")).toBe('confused')
    expect(detectFailureState("I don't know why")).toBe('dont_know')
  })
})

describe('detectFailureState — negative controls: acknowledgements must stay null', () => {
  for (const ack of ['ok', 'okay', 'thanks', 'got it', 'okay, understood', 'understood']) {
    it(`"${ack}" is not a recovery signal`, () => {
      expect(detectFailureState(ack)).toBeNull()
    })
  }
})

describe('detectFailureState — negative controls: ordinary correct answers must stay null', () => {
  it('does not swallow a lucky-but-correct guess disclosure', () => {
    expect(detectFailureState('I guessed correctly')).toBeNull()
    expect(detectFailureState('I just guessed right')).toBeNull()
  })

  it('does not fire on ordinary answers containing none of the new phrases', () => {
    for (const answer of ['42', 'the answer is B', 'acceleration', 'because the net force is zero']) {
      expect(detectFailureState(answer)).toBeNull()
    }
  })

  it('does not fire on unrelated prose that happens to contain "sure" or "guess" as a different sense', () => {
    expect(detectFailureState('I am sure the answer is negative.')).toBeNull()
    expect(detectFailureState('My best guess is that momentum is conserved.')).toBeNull()
  })
})
