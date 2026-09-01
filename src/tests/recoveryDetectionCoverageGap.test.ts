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

/**
 * NAMING THE THING YOU ARE STUCK ON BROKE THE PATTERN.
 *
 * MEASURED live (phys.mech.friction, 2026-09-01, real account, studied as a
 * learner). The object list on the "don't get" patterns was `it|that|this`,
 * so:
 *
 *   "…you mentioned it in the formula but i dont get it"   (an earlier run)
 *     -> dont_understand, and the knowledge-gap detour opened correctly
 *   "wait, i dont get what the normal force is. you keep saying N"
 *     -> null. No [knowledge-gap] log, no detour, nothing.
 *
 * THE IRONY IS THE POINT. `classifyKnowledgeGap` needs a distress signal AND
 * a resolvable concept before it can open a prerequisite detour — so the
 * phrasing that NAMES the concept is precisely the one it needs, and it was
 * the one phrasing that did not register as distress at all.
 *
 * Found while trying to VERIFY a different fix: I set out to confirm that a
 * knowledge-gap detour now closes on a practice request, triggered what I
 * expected to be a detour, and the logs showed none had opened. The
 * verification failed and produced this instead.
 *
 * Same shape as the Phase 5 correction to the bare `dont_know` pattern: one
 * alternation, in one pattern, narrower than its siblings.
 */
describe('“don’t get” with a named object, not just “it”', () => {
  for (const utterance of [
    'wait, i dont get what the normal force is. you keep saying N',
    'i dont get what the normal force is',
    "i don't get what a normal force is",
    'i dont get how you got 100 N',
    "i don't get why it slows down",
    "i didn't get what you meant there",
    "i still don't get how that works",
  ]) {
    it(`registers as distress: ${JSON.stringify(utterance.slice(0, 44))}`, () => {
      expect(detectFailureState(utterance)).toBe('dont_understand')
    })
  }

  it('the forms that already worked are unchanged', () => {
    expect(detectFailureState('i dont get it')).toBe('dont_understand')
    expect(detectFailureState('i dont understand the normal force')).toBe('dont_understand')
    expect(detectFailureState("i don't know what the normal force is")).toBe('dont_know')
    expect(detectFailureState("i'm confused about the normal force")).toBe('confused')
  })
})

describe('a wh-clause cannot fire without the negation in front of it', () => {
  // This is what keeps a plain question — the most common learner utterance
  // there is — from being read as distress. Measured: 0 false positives.
  for (const utterance of [
    'what is the normal force',
    'how do i calculate the friction force',
    'why does the book slow down',
    'can you show me what happens when it tilts',
  ]) {
    it(`stays a question, not distress: ${JSON.stringify(utterance.slice(0, 40))}`, () => {
      expect(detectFailureState(utterance)).toBeNull()
    })
  }

  it('and an AFFIRMATIVE “get” is never distress', () => {
    // "i get what you mean" must not become "i don't get what you mean".
    expect(detectFailureState('i get it now')).toBeNull()
    expect(detectFailureState('i get what you mean')).toBeNull()
    expect(detectFailureState('ok i think i get how that works')).toBeNull()
    expect(detectFailureState('that is what i get when i multiply')).toBeNull()
    expect(detectFailureState('i got it')).toBeNull()
  })
})
