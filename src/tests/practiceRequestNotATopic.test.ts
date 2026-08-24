/**
 * PHASE 7D — asking for a practice question is not asking for a new topic.
 *
 * THE DEFECT, proved live in production (Phase 7C). A clean single-concept
 * physics session on `phys.opt.total-internal-reflection`, sitting at GUIDE
 * with three reviewed, gradeable authored probes available and every other
 * gate condition true. The learner typed:
 *
 *     "ok yes lets try practice problem"
 *
 * and the server logged:
 *
 *     [excursion] requestedTopic: 'practice problem', transition: 'started',
 *                 active: true
 *     [ladder]    excursion: true
 *     [turn-decision] divergences: ["QUESTION_SHIPPED_WITHOUT_PROBE"]
 *
 * `namedTopicUnknownTo` read "practice problem" as the name of a topic the
 * curriculum does not contain, so the unresolved-topic excursion opened. An
 * open excursion sets `excursionActiveHoisted`, which is one of the eight
 * conjuncts of `gateEligible` in route.ts — so the authored-probe gate was
 * switched off, `findBestProbe` was never called, and the turn was handed to
 * unconstrained model generation. The replacement question shipped a WRONG
 * answer key (water->air: the only option above the 48.75 deg critical angle
 * is 55 deg; the key said 48 deg), and the lesson's figure was dropped the
 * same turn as "named-topic-left-the-figure".
 *
 * ROOT CAUSE: 'problem' was already in DISCOURSE_NOUNS but 'practice' was
 * not, and ONE surviving real word is enough to name a topic. The same hole
 * existed for "let's do the check" via 'check'.
 *
 * THE INVARIANT this file pins:
 *
 *   A request FOR the exercise ("practice problem", "the check") names no
 *   topic, opens no excursion, and therefore leaves the authored-probe gate
 *   eligible — while a request ABOUT a subject still names its topic.
 *
 * Section 3 is the one that matters most: over-filtering here would suppress
 * genuine topic requests, which is a worse defect than the one being fixed.
 */
import { describe, it, expect } from 'vitest'
import { namedTopicUnknownTo, DISCOURSE_NOUNS } from '@/lib/teaching/visual/requestedTopic'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { decideExcursion, NO_EXCURSION } from '@/lib/teaching/excursion'

const TIR = 'phys.opt.total-internal-reflection'
const TIR_TEXT =
  'Total Internal Reflection and Critical Angle Total internal reflection occurs when ' +
  'light hits a boundary at an angle greater than the critical angle and all light is reflected.'

// ═══════════════════════════════════════════════════════════════════════════
// 1. The exact production failure
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7D — the captured production phrase names no topic', () => {
  it('"ok yes lets try practice problem" names nothing', () => {
    expect(namedTopicUnknownTo('ok yes lets try practice problem', TIR_TEXT)).toBeNull()
  })

  it('opens NO excursion, so the authored-probe gate stays eligible', () => {
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: 'ok yes lets try practice problem',
      lessonConceptId: TIR,
      requestedConceptId: null,
      // the route passes this only when namedTopicUnknownTo returned a topic;
      // it now returns null, so null is what reaches the excursion layer.
      requestedTopicTitle: null,
    })
    expect(decision.state.active).toBe(false)
    expect(decision.transition).toBe('none')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. Discourse / procedural requests — the generalised class, not the phrase
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7D — asking for the exercise is not naming a topic', () => {
  const DISCOURSE = [
    'ok yes lets try practice problem',
    "let's try a practice problem",
    'give me a practice question',
    "let's practice this",
    "let's do the check",
    'give me another question',
    'can you ask me a question',
    'show me an example',
    'give me an example',
    'explain this again',
    'explain that again',
    'what does this mean',
    'can you explain this',
    'make it simpler',
    'one thing at a time',
    // captured earlier in this repo's history, must stay closed
    'explain the main idea please',
    'what is the point of this?',
    'can you show me what that looks like',
    'show me a real-life example of this',
    'show me a diagram',
  ]

  for (const message of DISCOURSE) {
    it(`"${message}" names no topic`, () => {
      expect(namedTopicUnknownTo(message, TIR_TEXT)).toBeNull()
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — the fix must not suppress genuine topic requests
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7D — genuine topic requests still name their topic', () => {
  const LEGIT = [
    'explain photosynthesis',
    'explain entropy',
    'explain wave interference',
    'teach me quadratic equations',
    "teach me Kirchhoff's laws",
    'I want to learn VSEPR',
    'teach me about moles',
    'what causes friction?',
  ]

  for (const message of LEGIT) {
    it(`"${message}" still names its topic`, () => {
      expect(namedTopicUnknownTo(message, TIR_TEXT)).not.toBeNull()
    })
  }

  // A discourse word inside a real title must not disqualify it: ONE
  // surviving real word is enough. These are the exact shapes the Phase-6
  // fix established as the danger of adding vocabulary to this list.
  const COMPOUND = [
    'explain boiling point',        // 'point' is discourse, 'boiling' survives
    'explain point of view',        // ditto
    'explain main sequence stars',  // 'main' is discourse, 'sequence'/'stars' survive
    'explain main group elements',  // ditto
    'explain chemical formula',     // 'formula' is discourse, 'chemical' survives
    'explain agile practices',      // 'practice' is NOW discourse, 'agile' survives
  ]

  for (const message of COMPOUND) {
    it(`"${message}" survives despite containing a discourse word`, () => {
      expect(namedTopicUnknownTo(message, TIR_TEXT)).not.toBeNull()
    })
  }

  it('the one KG concept containing "practice" is still requestable', () => {
    // cs.se.agile-design-principles — "Agile Practices and Software Design
    // Principles" — is the ONLY concept title in all six registered subjects
    // containing this word. It survives on 'agile'.
    const named = namedTopicUnknownTo('explain agile practices', TIR_TEXT)
    expect(named).not.toBeNull()
    expect([...named!.words]).toContain('agile')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. The vocabulary itself — why these two words, and the guard on the rest
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7D — the added vocabulary', () => {
  it('carries the two words the production capture proved missing', () => {
    expect(DISCOURSE_NOUNS.has('practice')).toBe(true)
    expect(DISCOURSE_NOUNS.has('check')).toBe(true)
  })

  it('still refuses words that are real subject matter somewhere', () => {
    // The Phase-6 fix rejected these by name for exactly this reason; adding
    // any of them would trade this defect for a worse one.
    for (const word of ['sound', 'force', 'energy', 'unit', 'law', 'group', 'sequence']) {
      expect(DISCOURSE_NOUNS.has(word)).toBe(false)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. The Phase-6 P0 path shares this vocabulary and must stay fixed
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7D — the KG-title path is unaffected', () => {
  it('"explain the main idea please" still resolves to nothing in chemistry', () => {
    expect(resolveRequestedConceptId('explain the main idea please', 'chem.found.pure-substances', 'chemistry')).toBeNull()
  })

  it('"what is the point of this?" still resolves to nothing in physics', () => {
    expect(resolveRequestedConceptId('what is the point of this?', 'phys.mech.newtons-first-law', 'physics')).toBeNull()
  })

  it('an explicit cross-subject request still resolves', () => {
    expect(resolveRequestedConceptId('explain photosynthesis', TIR, 'physics')).toBe('bio.plant.photosynthesis')
  })
})
