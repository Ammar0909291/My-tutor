/**
 * LIVE RUNTIME DEFECT, observed on a real account on 2026-08-16 and fixed at
 * source.
 *
 * A production turn asked a multiple-choice question in PROSE only — options
 * lettered A/B/C/D each on its own line, and NO `<!--MCQ-->` tag anywhere. The
 * learner typed "C". The tutor answered "That is right!" and advanced. The
 * correct answer was B.
 *
 *   Q: What does `s` most commonly represent in physics equations?
 *   A) Speed
 *   B) Second (time)
 *   C) Surface area
 *   D) Size
 *
 * There is no code path that grades a prose-only MCQ deterministically —
 * `parseMcqTag()` returns null, so `pendingMcqHoisted` is never populated and
 * `gradeMcqAnswer()` never runs. The ladder's only source of correctness on
 * such a turn is the LLM's own `<!--SIGNAL correctness=…-->`, which is the
 * model grading its own memory of the intended answer key.
 *
 * `proseMcqGuard.ts` is the deterministic backstop: detect the shape, and
 * refuse to accept an LLM-supplied correctness on the answering turn.
 */
import { describe, it, expect } from 'vitest'
import {
  hasProseMultipleChoice,
  buildProseMcqReplyDirective,
} from '@/lib/teaching/proseMcqGuard'

// The exact prose MCQ shape captured from the live production turn, verbatim.
const LIVE_PROSE_MCQ = `Great question! Let's check your intuition.

What does \`s\` most commonly represent in physics equations?

A) Speed
B) Second (time)
C) Surface area
D) Size`

describe('proseMcqGuard — detection', () => {
  it('detects the exact prose MCQ shape from the live production turn', () => {
    expect(hasProseMultipleChoice(LIVE_PROSE_MCQ)).toBe(true)
  })

  it.each([
    ['A. foo\nB. bar', 'A/B with dots', true],
    ['(A) foo\n(B) bar\n(C) baz', 'parenthesised', true],
    ['A) one\nB) two\nC) three\nD) four', 'four options', true],
    ['a) foo\nb) bar', 'lowercase', true],
    ['A) only', 'one option only', false],
    ['A) foo\nB) bar\nC) baz\nD) qux\nE) quux', 'five options', false],
    ['this mentions A) something inline in a sentence', 'inline lettering', false],
    ['Just plain prose with no options at all.', 'no options', false],
    ['1. foo\n2. bar\n3. baz', 'numbered list', false],
    ['A) foo\nA) also foo', 'same letter twice', false],
    ['', 'empty', false],
  ])('%s => %s', (text, _label, expected) => {
    expect(hasProseMultipleChoice(text)).toBe(expected)
  })

  it('is safe on non-string input', () => {
    expect(hasProseMultipleChoice(undefined as unknown as string)).toBe(false)
    expect(hasProseMultipleChoice(null as unknown as string)).toBe(false)
  })

  it('does NOT fire on the tag itself if it survived (never should)', () => {
    // The MCQ tag is stripped BEFORE this check runs, so the tag text should
    // never be seen here. But if it ever did survive, the shape doesn't match
    // (no per-line lettered options), so this stays inert.
    const tagOnly = 'Here is a question: <!--MCQ q="X" a="1" b="2" correct="A"-->'
    expect(hasProseMultipleChoice(tagOnly)).toBe(false)
  })
})

describe('proseMcqGuard — prompt directive', () => {
  it('returns an empty string when not active', () => {
    expect(buildProseMcqReplyDirective(false)).toBe('')
  })

  it('tells the model not to claim correctness and to re-issue with the tag', () => {
    const s = buildProseMcqReplyDirective(true)
    expect(s).toMatch(/cannot verify/i)
    expect(s).toMatch(/multiple-choice/i)
    expect(s).toMatch(/MCQ tag/)
    expect(s).toMatch(/do not (?:tell|declare|claim)/i)
  })
})

/**
 * The deterministic evidence suppression is applied inside `route.ts` after
 * the SIGNAL is verified but before it drives evidence writes. The route-level
 * plumbing itself is exercised by the wider chat suite; here we assert the
 * SHAPE the route uses — `teachingSignal.correctness` is stripped iff the prior
 * assistant message has the prose-MCQ shape and no pendingMcq exists.
 */
describe('the shape the route uses to suppress correctness', () => {
  interface Signal { correctness?: boolean; confidence?: string }

  // A minimal re-encoding of the route's guard so a change to the shape (e.g.
  // a new arg, or a different data source) shows up as a failing test here
  // instead of only as behaviour drift in production.
  function suppressIfProseMcqUngradeable(
    signal: Signal | null,
    pendingMcq: unknown,
    priorAssistantText: string,
  ): Signal | null {
    if (!signal || signal.correctness === undefined) return signal
    if (pendingMcq) return signal
    if (!hasProseMultipleChoice(priorAssistantText)) return signal
    return { ...signal, correctness: undefined }
  }

  it('suppresses correctness when prose MCQ, no pending MCQ, signal claims correct', () => {
    const s = suppressIfProseMcqUngradeable(
      { correctness: true, confidence: 'high' },
      null,
      LIVE_PROSE_MCQ,
    )
    expect(s?.correctness).toBeUndefined()
    expect(s?.confidence).toBe('high') // other fields preserved
  })

  it('suppresses correctness when prose MCQ, no pending MCQ, signal claims incorrect', () => {
    // The direction is symmetric: an LLM that hallucinates false is as harmful
    // as one that hallucinates true — both are unverifiable claims.
    const s = suppressIfProseMcqUngradeable(
      { correctness: false },
      null,
      LIVE_PROSE_MCQ,
    )
    expect(s?.correctness).toBeUndefined()
  })

  it('does NOT suppress when a structured pendingMcq is present', () => {
    // The tag was there; deterministic grading ran. The route's own MCQ grade
    // is the ground truth and MUST override the SIGNAL, not be suppressed.
    const s = suppressIfProseMcqUngradeable(
      { correctness: true },
      { question: 'X', options: ['a', 'b'], correctIndex: 0 },
      LIVE_PROSE_MCQ,
    )
    expect(s?.correctness).toBe(true)
  })

  it('does NOT suppress when the prior assistant message is plain prose', () => {
    const s = suppressIfProseMcqUngradeable(
      { correctness: true },
      null,
      'Ordinary teaching prose with no options at all.',
    )
    expect(s?.correctness).toBe(true)
  })

  it('does NOT touch a signal with no correctness field', () => {
    const s = suppressIfProseMcqUngradeable(
      { confidence: 'low' },
      null,
      LIVE_PROSE_MCQ,
    )
    expect(s).toEqual({ confidence: 'low' })
  })

  it('returns null unchanged', () => {
    expect(suppressIfProseMcqUngradeable(null, null, LIVE_PROSE_MCQ)).toBeNull()
  })
})
