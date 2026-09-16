/**
 * LEARNER-MOVE LEARNER_REQUEST EQUIVALENCE — Batch 7 (design doc §8 row 6's
 * second half, deferred by Batch 6). Proves
 * `learnerRequestActive: turnIntent.learnerRequest !== null || turnIntent.ambiguous`
 * and
 * `learnerRequestActive: learnerMoveStageAHoisted.has('HELP_REQUEST') || learnerMoveStageAHoisted.ambiguous`
 * are the SAME boolean across a real corpus — structurally, not by
 * argument alone, same discipline as
 * `learnerMoveRecoveryEquivalence.test.ts` (Batch 6):
 *
 *   1. HELP_REQUEST fires iff `intent.learnerRequest !== null`
 *      (learnerMove.ts `readLearnerMove`) — the identical field on the
 *      identical `turnIntent` object `turnIntent.learnerRequest !== null`
 *      already reads.
 *   2. `.ambiguous` is `intent.ambiguous` passed through UNMODIFIED by both
 *      `readLearnerMove` (stage A: `finalize(..., intent.ambiguous, ...)`)
 *      and `refineLearnerMove` (stage B: `finalize(..., reading.ambiguous,
 *      ...)`) — the ONLY assignment site for the `ambiguous` field on a
 *      `LearnerMoveReading` is inside `finalize`, and it always receives
 *      whatever was passed in. Grepped every assignment to `ambiguous` in
 *      learnerMove.ts (lines 156/205/227/374/434) — none mutates it.
 *
 * Corpus: masteryGate.test.ts's own `detectLearnerRequest` fixtures (diagram /
 * real_life_example / explain_differently / null) reused verbatim, PLUS
 * every real message `ambiguousTurnHold.test.ts` and
 * `ambiguityReachesTeaching.test.ts` use to exercise `turnIntent.ambiguous`
 * (both the STOP_AND_QUESTION/STOP_AND_REQUEST positive cases and their own
 * negative controls) — not invented here.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { readLearnerMove } from '@/lib/teaching/learnerMove'

/** Same real chain the route now uses: turnIntent -> reading. */
function learnerRequestActiveFires(message: string): { old: boolean; reading: boolean } {
  const intent = readTurnIntent(message, null)
  const reading = readLearnerMove(intent, { isBareAcknowledgement: false, isLowSignalAcknowledgement: false })
  return {
    old: intent.learnerRequest !== null || intent.ambiguous,
    reading: reading.has('HELP_REQUEST') || reading.ambiguous,
  }
}

// ── masteryGate.test.ts's own detectLearnerRequest corpus, verbatim ──────────
const DIAGRAM_REQUESTS = [
  'show me a diagram', 'can you visualize this?', 'draw it please', 'show me a picture', 'graph it',
  'Explain me vector with visualization', 'Teach me vector with visualization', 'Teach me vector with visualization.',
  'Explain completely with visualization', 'Newton’s Second Law explain with visualization',
  'teach me vector with visualization', 'visualization', 'visualisation',
  'visualize', 'visualise', 'visualize this', 'can you visualise it?',
  'show me an image',
]
const REAL_LIFE_REQUESTS = [
  'give me a real-life example', 'real world application?', 'tell me a story about this',
  'where is this used in everyday life',
]
const EXPLAIN_DIFFERENTLY_REQUESTS = [
  'explain differently', 'explain it another way', "I don't understand", "i'm confused",
  'that makes no sense', "didn't get it", 'explain more simply',
  "I don't understand the diagram", "I don't understand the visualization", "I'm confused by this visualisation",
]
const NO_REQUEST = ['visual', 'any visuals?', 'the anode', 'A', 'ok got it thanks']

// ── ambiguousTurnHold.test.ts + ambiguityReachesTeaching.test.ts's own real
// message fixtures for turnIntent.ambiguous, verbatim ──
const AMBIGUOUS_TRUE = [
  "I'm done for today, but why does it bend?",       // STOP_AND_QUESTION, learnerRequest null
  "that's enough for today, show me a diagram",      // STOP_AND_REQUEST, learnerRequest ALSO non-null
  "I'm done for today, but what is a compound?",     // STOP_AND_QUESTION, learnerRequest null
]
const AMBIGUOUS_FALSE = [
  'why does light bend?',
  "I'm done for today",
  'show me a diagram',
  'explain it differently',
  'the answer is 12',
  "I don't understand this",
  'Stop the lesson, but explain this one thing first.',
  'Explain it simply, actually challenge me.',
]

describe('LEARNER_REQUEST equivalence: (learnerRequest !== null || ambiguous) === (has(\'HELP_REQUEST\') || .ambiguous)', () => {
  it.each(DIAGRAM_REQUESTS)('DIAGRAM request: %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(true)
  })

  it.each(REAL_LIFE_REQUESTS)('REAL_LIFE_EXAMPLE request: %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(true)
  })

  it.each(EXPLAIN_DIFFERENTLY_REQUESTS)('EXPLAIN_DIFFERENTLY request: %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(true)
  })

  it.each(NO_REQUEST)('NO REQUEST, not ambiguous: %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(false)
  })

  it.each(AMBIGUOUS_TRUE)('AMBIGUOUS (real STOP_AND_QUESTION/STOP_AND_REQUEST fixture): %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(true) // sanity: this corpus really is ambiguous
  })

  it.each(AMBIGUOUS_FALSE)('NOT ambiguous (negative control fixture): %s', (msg) => {
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
  })

  it('the STRESS CASE: ambiguous AND a genuine learner request both true at once — both sides still agree', () => {
    // "that's enough for today, show me a diagram" — learnerRequest='diagram'
    // (already true) AND ambiguous=true (also true). Proves the OR-composition
    // itself, not just each half in isolation.
    const msg = "that's enough for today, show me a diagram"
    const intent = readTurnIntent(msg, null)
    expect(intent.learnerRequest).toBe('diagram')
    expect(intent.ambiguous).toBe(true)
    const { old, reading } = learnerRequestActiveFires(msg)
    expect(reading).toBe(old)
    expect(old).toBe(true)
  })

  it('summary: 0 disagreements across the full combined corpus', () => {
    const all = [
      ...DIAGRAM_REQUESTS, ...REAL_LIFE_REQUESTS, ...EXPLAIN_DIFFERENTLY_REQUESTS,
      ...NO_REQUEST, ...AMBIGUOUS_TRUE, ...AMBIGUOUS_FALSE,
    ]
    const disagreements = all.filter((msg) => {
      const { old, reading } = learnerRequestActiveFires(msg)
      return old !== reading
    })
    expect(disagreements).toEqual([])
    expect(all.length).toBeGreaterThanOrEqual(40)
  })
})

describe('the structural argument, verified rather than assumed', () => {
  it('HELP_REQUEST fires iff intent.learnerRequest !== null — the exact condition, read from source', () => {
    const src = readFileSync('src/lib/teaching/learnerMove.ts', 'utf-8')
    const at = src.indexOf("kind: 'HELP_REQUEST'")
    expect(at).toBeGreaterThan(-1)
    const before = src.slice(Math.max(0, at - 200), at)
    expect(before).toMatch(/if \(intent\.learnerRequest !== null\)/)
  })

  it('.ambiguous has exactly ONE assignment site (inside finalize) in the whole module, and both callers pass it through unmodified', () => {
    const src = readFileSync('src/lib/teaching/learnerMove.ts', 'utf-8')
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    // The field-shorthand assignment inside finalize()'s return object.
    const shorthandOccurrences = (code.match(/^\s*ambiguous,\s*$/gm) ?? []).length
    expect(shorthandOccurrences).toBe(1)
    // readLearnerMove (stage A) passes intent.ambiguous straight through.
    expect(code).toMatch(/finalize\([^)]*intent\.ambiguous[^)]*\)/)
    // refineLearnerMove (stage B) passes reading.ambiguous straight through
    // — the value stage A already set, never `intent.ambiguous` again
    // (which would silently re-derive rather than carry forward).
    expect(code).toMatch(/finalize\([^)]*reading\.ambiguous[^)]*\)/)
  })

  it('confidence clears the >= 0.8 authority bar (CONFIDENCE.HELP_REQUEST = 0.8)', () => {
    const intent = readTurnIntent('show me a diagram', null)
    const reading = readLearnerMove(intent, { isBareAcknowledgement: false, isLowSignalAcknowledgement: false })
    const signal = reading.signals.find((s) => s.kind === 'HELP_REQUEST')
    expect(signal).toBeDefined()
    expect(signal!.confidence).toBe(0.8)
    expect(signal!.confidence).toBeGreaterThanOrEqual(0.8)
  })
})

describe('the route wires Batch 7 correctly — source pins', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('arbitrateTurn reads the reading for learnerRequestActive — both halves', () => {
    const at = ROUTE.indexOf('turnArbitrationHoisted = arbitrateTurn({')
    expect(at).toBeGreaterThan(-1)
    const block = ROUTE.slice(at, at + 1600)
    expect(block).toMatch(
      /learnerRequestActive:\s*\n\s*learnerMoveStageAHoisted\.has\('HELP_REQUEST'\) \|\| learnerMoveStageAHoisted\.ambiguous/,
    )
    expect(block).not.toMatch(/learnerRequestActive:\s*\n\s*turnIntent\.learnerRequest !== null \|\| turnIntent\.ambiguous/)
  })

  it('recoveryActive is UNTOUCHED — still Batch 6\'s own conversion, not re-touched here', () => {
    const at = ROUTE.indexOf('turnArbitrationHoisted = arbitrateTurn({')
    const block = ROUTE.slice(at, at + 700)
    expect(block).toContain("recoveryActive: learnerMoveStageAHoisted.has('DISTRESS')")
  })

  it('no new hoist was added — learnerMoveStageAHoisted is Batch 6\'s own consolidated hoist, still exactly 3 readLearnerMove( call-expressions in the file', () => {
    const code = ROUTE
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    expect(code.split('readLearnerMove(').length - 1).toBe(3)
  })
})
