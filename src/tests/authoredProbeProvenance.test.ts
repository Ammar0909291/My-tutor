/**
 * PHASE F — an authored probe must be identifiable when its answer is graded.
 *
 * MEASURED IN PRODUCTION, all time, not a sample:
 *   PROBE_OUTCOME rows ............................. 2,199
 *   ...carrying an assetId .........................     0
 *   ACTIVE PROBE assets ............................ 2,419
 *   ...with sampleSize > 0 .........................     0
 *   d7104e0a — a probe production demonstrably served, per
 *   [gate-assessment] probeFound=true converted=true — evidence rows ... 0
 *
 * The gate itself works: production logs show three DISTINCT authored assetIds
 * served across one chemistry lesson with mcqAttached=true and divergences=[].
 * What is lost is PROVENANCE. `probeToMcq` returns
 * { question, options, correctIndex } and `TutorMCQ` has no field able to carry
 * an assetId, so by the ANSWER turn — a separate request reading `pendingMcq`
 * off the snapshot — the runtime cannot know which authored probe it graded.
 *
 * CONSEQUENCE, and the only thing this change is for: no authored probe can
 * ever accumulate a sample, so qualityScore stays 0 forever and ADR 13/14's
 * evidence-driven deprecation triggers can never fire. A wrong authored answer
 * key would stay invisible indefinitely.
 *
 * NOT a mastery problem, and these tests pin that too: `correctIndex` is
 * carried from the authored key already, so grading was never affected. This
 * change must not alter a single graded outcome.
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer, parseMcqTag, type TutorMCQ } from '@/lib/teaching/mcq'
import { writePendingQuestion, readPendingQuestion } from '@/lib/teaching/pendingQuestion'

/**
 * The REAL authored probe production served on phys.em.lenzs-law
 * (asset d7104e0a-2013-4ce2-a516-cb1ba190355c), in the shape findBestProbe
 * hands to probeToMcq. Transcribed from asset_identity + probe_assets.
 */
const AUTHORED = {
  assetId: 'd7104e0a-2013-4ce2-a516-cb1ba190355c',
  conceptId: 'phys.em.lenzs-law',
  stem: 'PRACTICE: A magnet is pulled AWAY from a conducting loop. Does the induced current oppose or assist the motion?',
  choices: [
    { text: 'It opposes the motion, attracting the magnet back', isCorrect: true },
    { text: 'It assists the motion, pushing the magnet away', isCorrect: false },
    { text: 'No current is induced when the magnet moves away', isCorrect: false },
  ],
}

// ── conversion ──────────────────────────────────────────────────────────────

describe('probeToMcq carries the authored identity', () => {
  it('preserves the assetId', () => {
    const mcq = probeToMcq(AUTHORED as never)
    expect(mcq).not.toBeNull()
    expect(mcq!.assetId).toBe('d7104e0a-2013-4ce2-a516-cb1ba190355c')
  })

  it('still strips the authoring label and keeps the authored key', () => {
    const mcq = probeToMcq(AUTHORED as never)!
    expect(mcq.question.startsWith('PRACTICE:')).toBe(false)
    expect(mcq.correctIndex).toBe(AUTHORED.choices.findIndex((c) => c.isCorrect))
    expect(mcq.options).toHaveLength(3)
  })

  it('still refuses an unconvertible probe', () => {
    // two correct answers — the item is unanswerable and must be refused,
    // identity or no identity
    expect(probeToMcq({
      ...AUTHORED,
      choices: [
        { text: 'a', isCorrect: true },
        { text: 'b', isCorrect: true },
      ],
    } as never)).toBeNull()
  })
})

// ── the model path must stay anonymous ──────────────────────────────────────

describe('a model-generated MCQ has no assetId', () => {
  it('parseMcqTag produces no identity', () => {
    // the real tag shape: attribute pairs, options a..d, correct as a letter
    const tag = '<!--MCQ q="Which is correct?" a="one" b="two" correct="a" -->'
    const parsed = parseMcqTag(tag)
    expect(parsed.mcq).not.toBeNull()
    expect(parsed.mcq!.assetId).toBeUndefined()
  })

  it('survives the pending round-trip still anonymous', () => {
    const model: TutorMCQ = { question: 'Which is correct?', options: ['one', 'two'], correctIndex: 0 }
    const restored = readPendingQuestion(writePendingQuestion(model, 'lesson:1'), 'lesson:1')
    expect(restored).not.toBeNull()
    expect(restored!.assetId).toBeUndefined()
  })
})

// ── persistence ─────────────────────────────────────────────────────────────

describe('the pending-question round trip', () => {
  it('preserves the assetId across the turn boundary', () => {
    const mcq = probeToMcq(AUTHORED as never)!
    const stored = writePendingQuestion(mcq, 'lesson:147')
    const restored = readPendingQuestion(stored, 'lesson:147')
    expect(restored!.assetId).toBe(AUTHORED.assetId)
  })

  it('still enforces the lesson identity guard', () => {
    const mcq = probeToMcq(AUTHORED as never)!
    const stored = writePendingQuestion(mcq, 'lesson:147')
    // a different lesson must not be graded against this question, assetId or not
    expect(readPendingQuestion(stored, 'lesson:148')).toBeNull()
  })

  it('reads a LEGACY row that has no assetId', () => {
    // rows written before this change carry no assetId; they must restore and
    // grade exactly as they always did
    const legacy = { question: 'Q?', options: ['a', 'b'], correctIndex: 1, lessonKey: 'lesson:9' }
    const restored = readPendingQuestion(legacy, 'lesson:9')
    expect(restored).not.toBeNull()
    expect(restored!.assetId).toBeUndefined()
    expect(gradeMcqAnswer('b', restored!)).toEqual({ chosenIndex: 1, correct: true })
  })

  it('reads a legacy row with no lessonKey at all', () => {
    const ancient = { question: 'Q?', options: ['a', 'b'], correctIndex: 0 }
    expect(readPendingQuestion(ancient, 'lesson:9')).not.toBeNull()
  })
})

// ── grading must be untouched ───────────────────────────────────────────────

describe('grading is byte-identical with and without an assetId', () => {
  const mcq = probeToMcq(AUTHORED as never)!
  const anonymous: TutorMCQ = {
    question: mcq.question, options: mcq.options, correctIndex: mcq.correctIndex,
  }

  const ANSWERS = [
    'It opposes the motion, attracting the magnet back',
    'A',
    'i think it is it opposes the motion sir',
    'B. but sir i not fully sure',
    'maybe it assists the motion',
    'can you show picture please',
    '',
  ]

  it.each(ANSWERS)('grades %j the same either way', (answer) => {
    expect(gradeMcqAnswer(answer, mcq)).toEqual(gradeMcqAnswer(answer, anonymous))
  })

  it('grades against the AUTHORED key, not a guess', () => {
    expect(gradeMcqAnswer('A', mcq)).toEqual({ chosenIndex: 0, correct: true })
    expect(gradeMcqAnswer('B', mcq)).toEqual({ chosenIndex: 1, correct: false })
    expect(gradeMcqAnswer('what?', mcq)).toEqual({ chosenIndex: null, correct: null })
  })
})

// ── the route wiring, asserted from source ──────────────────────────────────
//
// The PROBE_OUTCOME writer lives inside route.ts and cannot be imported, so its
// wiring is asserted structurally — the same idiom gateAssessmentRouteWiring
// and gateEligibilityTelemetry already use for this file.

describe('the PROBE_OUTCOME writer records the authored identity', () => {
  const src = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string
  // Anchor on the CODE, not on the first textual mention — the file discusses
  // PROBE_OUTCOME in a comment well before it writes one.
  const anchor = src.indexOf('category:  EvidenceCategory.PROBE_OUTCOME')
  const block = src.slice(anchor - 1400, anchor + 2200)

  it('the writer was located', () => {
    expect(anchor).toBeGreaterThan(0)
  })

  it('passes the pending question\'s assetId', () => {
    expect(block).toMatch(/assetId:\s*pendingMcqHoisted\?\.assetId/)
  })

  it('still writes the same outcome string and strength', () => {
    expect(block).toMatch(/outcome:\s*`\$\{teachingSignal\.correctness \? 'pass' : 'fail'\}`/)
    expect(block).toMatch(/strength:\s*teachingSignal\.correctness \? 1\.0 : 0\.0/)
  })

  it('is still gated on a real signal, so nothing new is written', () => {
    expect(block).toMatch(/teachingSignal && teachingSignal\.correctness !== undefined/)
  })
})

// ── the suppression paths must be untouched ─────────────────────────────────

describe('CLOSE, arbitration and completion still suppress the question', () => {
  const src = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('closing turns still null the MCQ', () => {
    expect(src).toMatch(/if \(closingTurnWithholdsQuestion\(sessionEpisodeHoisted\?\.phase\)\) mcqHoisted = null/)
  })

  it('an owner that denies NEW_QUESTION still nulls the MCQ', () => {
    expect(src).toMatch(/allows\('NEW_QUESTION'\) && mcqHoisted\)/)
  })

  it('the server gate question still outranks the model tag', () => {
    expect(src).toMatch(/mcqHoisted = gateMcqHoisted \?\? mcqParse\.mcq/)
  })
})
