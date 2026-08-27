/**
 * DID THIS TURN TEACH ANYTHING?
 *
 * The question no instrument in this repository asked. H3's floor asks whether
 * ANY text survives once the questions are cut away — and a sentence about the
 * LEARNER survives that cut, so a turn can be warm, on-topic, rule-clean and
 * completely empty.
 *
 * Measured in production on 2026-08-27, both after a learner said they did not
 * understand, both scored clean by every guard we own:
 *   "I understand you're still unsure about how friction works. Do I have that
 *    right?"
 *   "So you're saying you understand the forces on the car—have I got that
 *    right?"
 *
 * These cases are the fixtures. They are not invented.
 */
import { describe, it, expect } from 'vitest'
import { turnTaughtSomething, substantiveSentences } from '@/lib/teaching/teachingContent'
import { checkRemediationOutput, buildRemediationFallbackText } from '@/lib/teaching/remediationOutputContract'
import { REMEDIATION_CARDS, renderRemediationCard } from '@/lib/teaching/remediationCards'

const EMPTY_TURNS = [
  "I understand you're still unsure about how friction works.\n\nDo I have that right?",
  'So you\'re saying you understand the forces on the car—have I got that right?',
  'So you\'re saying static friction can change to match whatever push you apply, but only up to a certain maximum—has that got it right?',
  'I hear you. Does that make sense?',
  'It sounds like you are still stuck. Shall we carry on?',
  // MEASURED IN PRODUCTION, 2026-08-27, with the curly apostrophe the model
  // actually emits. The first version of this module scored it SUBSTANTIVE and
  // let it through — one character, and the floor was silent on the exact turn
  // it exists to catch. Kept verbatim, U+2019 and all.
  'So you\u2019re saying you still don\u2019t understand what a kilogram is, and you\u2019d like another explanation. Have I got that right?',
  'I understand you\u2019re still unsure about how friction works. Do I have that right?',
]

const REAL_TEACHING = [
  'Friction is the force that resists one surface sliding over another.',
  'Push a book across a table and something resists you. That resistance is friction.',
  "I understand you're still unsure. Friction gets stronger when the two surfaces are pressed together harder, and the book's weight has nothing to do with it.",
  'A mole is a counting word, like a dozen. It names one fixed, enormous number of particles.',
]

describe('teachingContent — the measurement that was missing', () => {
  it('the production empty turns are recognised as teaching nothing', () => {
    for (const t of EMPTY_TURNS) {
      expect(turnTaughtSomething(t), JSON.stringify(t)).toBe(false)
      expect(substantiveSentences(t), JSON.stringify(t)).toHaveLength(0)
    }
  })

  it('real teaching is not mistaken for an empty turn', () => {
    for (const t of REAL_TEACHING) {
      expect(turnTaughtSomething(t), JSON.stringify(t)).toBe(true)
    }
  })

  it('a reflection FOLLOWED by teaching still counts as teaching', () => {
    // The fix must not punish warmth — only emptiness.
    const t = "I understand you're still unsure about how friction works.\n\n"
      + 'Think of it this way: the harder the two surfaces press together, the harder it is to slide them.'
    expect(turnTaughtSomething(t)).toBe(true)
    expect(substantiveSentences(t).length).toBe(1)
  })

  it('every promoted or drafted card teaches something, by this measure', () => {
    for (const c of REMEDIATION_CARDS) {
      expect(turnTaughtSomething(renderRemediationCard(c)), c.conceptId).toBe(true)
    }
  })

  it('empty input and junk never throw and never claim teaching', () => {
    for (const t of ['', '   ', '\n\n', '?', '...']) {
      expect(turnTaughtSomething(t)).toBe(false)
    }
  })
})

describe('the H3 floor now catches the empty turn it used to pass', () => {
  it('a reflection-only remediation turn is a violation', () => {
    const r = checkRemediationOutput({
      remediationTurn: true,
      text: "I understand you're still unsure about how friction works.\n\nDo I have that right?",
    })
    expect(r.violation).toBe('no-teaching-content')
    expect(r.reason).toBeTruthy()
  })

  it('the same text on a NON-remediation turn is left alone', () => {
    const r = checkRemediationOutput({ remediationTurn: false, text: EMPTY_TURNS[0] })
    expect(r.violation).toBeNull()
  })

  it('a turn carrying a structured MCQ is still excluded, unchanged', () => {
    const r = checkRemediationOutput({
      remediationTurn: true, text: EMPTY_TURNS[0], hasStructuredMcq: true,
    })
    expect(r.violation).toBeNull()
  })

  it('the two pre-existing violations still fire exactly as before', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you think happens next?',
    }).violation).toBe('question-only')
    expect(checkRemediationOutput({
      remediationTurn: true,
      text: 'Friction resists sliding between two surfaces.',
      previousAssistantText: 'Friction resists sliding between two surfaces.',
    }).violation).toBe('repeats-previous-turn')
  })

  it('the authored fallback itself teaches something — the floor cannot trap the repair', () => {
    // The last resort is applied unconditionally after a failed regeneration.
    // If it did not clear this floor, the repair would replace an empty turn
    // with another empty turn.
    const fb = buildRemediationFallbackText(
      'Friction is a contact force that opposes relative motion between surfaces in contact.',
    )
    expect(fb).toBeTruthy()
    expect(turnTaughtSomething(fb!)).toBe(true)
  })

  it('real teaching passes the floor', () => {
    for (const t of REAL_TEACHING) {
      expect(checkRemediationOutput({ remediationTurn: true, text: t }).violation, t).toBeNull()
    }
  })
})

describe('a HELD turn that teaches nothing is rejected too', () => {
  // Measured on the physics sweep, 2026-08-27, verbatim. Both shipped.
  const HELD_EMPTY = [
    "So you're saying the push you give the wall and the push the wall gives you act on different objects. Is that right?",
    "So you're saying the table stays the same length but the number changes when we switch units. Have I got that right?",
  ]
  const CARD = 'Stand on a skateboard and push against a wall. You roll backwards.'

  it('is caught when a card is holding', () => {
    for (const t of HELD_EMPTY) {
      expect(checkRemediationOutput({ remediationTurn: false, text: t, heldCardText: CARD }).violation, t)
        .toBe('no-teaching-content')
    }
  })

  it('but the card\'s own micro-check is NOT rejected — that is the desired move', () => {
    expect(checkRemediationOutput({
      remediationTurn: false,
      text: 'You press down on the book with your hand. Easier or harder to slide?',
      heldCardText: CARD,
    }).violation).toBeNull()
  })

  it('and nothing is checked when no card is holding', () => {
    for (const t of HELD_EMPTY) {
      expect(checkRemediationOutput({ remediationTurn: false, text: t }).violation).toBeNull()
    }
  })
})

// ── The hedged reflection, measured in production ─────────────────────────────
// phys.qm.spin, 2026-08-27, on the learner's SECOND "I still don't understand",
// after a repair had already run once. Twenty-five words, no teaching.
describe('a hedge in front of a reflection does not make it teaching', () => {
  const PROD = 'I think you’re saying you’re still unsure how the two spots in the '
    + 'experiment show that electrons have a built‑in two‑valued spin. Is that right?'

  it('the production turn taught nothing', () => {
    expect(turnTaughtSomething(PROD)).toBe(false)
    expect(substantiveSentences(PROD)).toEqual([])
  })

  it('catches the hedges and the synonym, straight and curly', () => {
    for (const s of [
      "I think you're saying the field pushes them apart.",
      'I guess you are saying the beam splits.',
      "I believe you're meaning the two spots.",
      "I suppose you're telling me it is unclear.",
      "I think you mean the magnetic field.",
      "You're saying the beam splits.",
      'So you are saying it splits in two.',
    ]) expect(turnTaughtSomething(s), s).toBe(false)
  })

  it('a reflection FOLLOWED by teaching still passes', () => {
    expect(turnTaughtSomething(
      "I think you're saying the two spots are confusing. A silver atom carries one "
      + 'unpaired electron, and the field pushes it one of exactly two ways.',
    )).toBe(true)
  })

  it('does not swallow ordinary teaching that mentions the learner', () => {
    for (const s of [
      'You are looking at two spots because the beam split.',
      'I think the field gradient is what does the pushing here.',
      'What you saw on the screen was two separate spots.',
    ]) expect(turnTaughtSomething(s), s).toBe(true)
  })
})
