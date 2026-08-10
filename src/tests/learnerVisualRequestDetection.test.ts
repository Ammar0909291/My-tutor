import { describe, it, expect } from 'vitest'
import { detectLearnerRequest, asksForAVisual } from '@/lib/teaching/masteryGate'

/**
 * ASKING FOR A PICTURE — measured against the real walkthrough, not assumed.
 *
 * A six-turn beginner session produced ZERO visualizations. The server's own
 * [visual-v2] log showed `purpose: 'explain'` on all six turns, including the
 * turn the student typed:
 *
 *     "I do not understand. Can you show me a picture?"
 *
 * That message contains an explicit request for a medium AND a statement of
 * confusion. The detector tested confusion first, so it returned
 * `explain_differently`, `purpose` never became `demonstrate`, and the engine
 * was never asked for a figure. The learner had already said how to fix the
 * confusion; the vaguer half of their sentence was being treated as the whole.
 *
 * Measuring the old rule over 37 phrasings found it wrong in BOTH directions:
 * it fired on "picture this: a ball rolling", "I get the picture" and "the
 * graph of my grades is going down", and stayed silent on "sketch it",
 * "can you illustrate that", "show it visually" and "any visual for this?".
 *
 * The rule is now grammatical rather than lexical — a verb that can only mean
 * "produce a visual", or a medium noun inside an ordinary English request
 * frame — over the same exported noun vocabulary the target resolver uses.
 * This table is the measurement.
 */

const ASKS_FOR_A_VISUAL = [
  // the two turns measured in the real session
  'I do not understand. Can you show me a picture?',
  'Give me a diagram',
  // plain requests
  'can you show me a picture?',
  'show me a picture',
  'can I see a picture of that',
  'is there a picture',
  'do you have a diagram',
  'draw it for me',
  'can you draw that',
  'show me what that looks like',
  'can you show me',
  'a diagram would help',
  'maybe a picture would help me',
  // vocabulary the old rule had no word for
  'I need to see this visually',
  'show it visually',
  'can you illustrate that',
  'please illustrate this',
  'sketch it',
  // confusion AND an explicit ask — the ask is the more specific of the two
  "I'm confused, can you show me a picture",
  "I don't get it, draw it please",
  'I still do not understand, is there a diagram',
]

const DOES_NOT_ASK = [
  // The one idiom the rule can tell apart: `picture` used as a verb.
  'picture this: a ball rolling',
  // plain acknowledgement
  'I see',
  'ok thanks',
  'yes',
  '12',
  // confusion with no medium named
  'I do not understand',
  "I'm lost",
  'explain it differently',
  'that makes no sense',
]

describe('Detecting a request for a visual', () => {
  for (const message of ASKS_FOR_A_VISUAL) {
    it(`asks: "${message}"`, () => {
      expect(asksForAVisual(message)).toBe(true)
      expect(detectLearnerRequest(message)).toBe('diagram')
    })
  }

  for (const message of DOES_NOT_ASK) {
    it(`does not ask: "${message}"`, () => {
      expect(asksForAVisual(message)).toBe(false)
      expect(detectLearnerRequest(message)).not.toBe('diagram')
    })
  }
})

/**
 * WHAT THIS RULE STILL GETS WRONG, kept visible rather than deleted.
 *
 * Naming a medium anywhere in a message is read as a request, because
 * production evidence requires it: "Explain me vector with visualization"
 * contains no request frame and is unambiguously an ask. The cost is that
 * incidental mentions are read the same way. Both were true before this change
 * and neither appeared in the measured session; they fail SAFE, toward
 * offering a figure.
 *
 * Bare "visual"/"visuals" is deliberately NOT a trigger — that vocabulary
 * belongs to the Teaching Planner's non-authoritative matcher, and
 * `masteryGate.test.ts` holds that boundary.
 */
const KNOWN_FALSE_POSITIVES = ['I get the picture', 'the graph of my grades is going down']

describe('Known false positives, recorded not hidden', () => {
  for (const message of KNOWN_FALSE_POSITIVES) {
    it(`still reads as a request: "${message}"`, () => {
      expect(detectLearnerRequest(message)).toBe('diagram')
    })
  }
})

describe('Precedence', () => {
  it('confusion alone still routes to a different explanation', () => {
    for (const m of ['I do not understand', "I'm lost", 'that makes no sense', 'explain it differently']) {
      expect(detectLearnerRequest(m)).toBe('explain_differently')
    }
  })

  it('an explicit visual request outranks the confusion beside it', () => {
    // The measured production failure, as a single assertion.
    expect(detectLearnerRequest('I do not understand. Can you show me a picture?')).toBe('diagram')
  })

  it('a medium NAMED but not asked for stays a statement of confusion', () => {
    // The distinction the single old rule could not express.
    expect(detectLearnerRequest("I don't understand the diagram")).toBe('explain_differently')
  })

  it('a request for an example is untouched', () => {
    expect(detectLearnerRequest('give me a real life example')).toBe('real_life_example')
  })

  it('an empty or whitespace message asks for nothing', () => {
    expect(detectLearnerRequest('')).toBeNull()
    expect(detectLearnerRequest('   ')).toBeNull()
  })
})
