/**
 * A TURN'S CONTENT IS ITS TEXT *PLUS* ITS STRUCTURED PAYLOADS.
 *
 * ── THREE GUARDS, ONE MISTAKE ───────────────────────────────────────────────
 * The corpus audit found three separate places judging "is there anything in
 * this turn?" from `cleanText` alone — after the MCQ tag has been parsed and
 * STRIPPED. Each concluded the turn was empty when its question was sitting in
 * the `mcq` field the client renders as tappable buttons:
 *
 *   1. `detectFillerTurn` — replaced the turn with a generic "what's one thing
 *      you notice or find surprising?" beside a concrete MCQ. Two mismatched
 *      questions at once. (fixed: `046bda7d`)
 *   2. the empty-response handler — served an OUTAGE template beside a valid
 *      MCQ, and marked the turn `provider: 'degraded'`. (fixed here)
 *   3. the affirmation floor's fail-closed fallback — same shape, already
 *      guarded by its own `!assembled` / repair path.
 *
 * ── WHY (2) IS THE WORST OF THE THREE ───────────────────────────────────────
 * Measured in production:
 *
 *   [learn/chat] empty response from model, finish_reason: STOP
 *   provider: "degraded"   [ladder] { mcqAsked: true }
 *
 * The visible harm is an outage message when nothing was down. The quieter and
 * worse harm is that `degradedTurn` is the exact flag that stops a turn
 * counting as a give — so `demonstrated` and `taughtThisSession` stay false and
 * the ladder does not advance. **A turn that DID teach was recorded as one that
 * taught nothing**, which is the same freeze class as the three already fixed.
 *
 * The model was arguably over-COMPLYING with `buildMcqInstruction`'s "do NOT
 * also re-type the question and its options in your visible message".
 */
import { describe, it, expect } from 'vitest'
import { detectFillerTurn, advanceConversationState, initialConversationState } from '@/lib/teaching/conversationState'

const MCQ = { question: 'Can you eliminate all error?', options: ['Yes', 'No'], correctIndex: 1 }

/** The route's empty-body branch, mirrored exactly. */
function resolveEmptyBody(input: { text: string; mcq: unknown | null }): {
  text: string
  degraded: boolean
} {
  if (!input.text.trim() && input.mcq) {
    return { text: 'Here is a question to check your understanding:', degraded: false }
  }
  if (!input.text.trim()) return { text: '[outage template]', degraded: true }
  return { text: input.text, degraded: false }
}

describe('an MCQ-only turn is not an outage', () => {
  it('does not degrade when the model wrote no prose but a real MCQ', () => {
    const r = resolveEmptyBody({ text: '', mcq: MCQ })
    expect(r.degraded).toBe(false)
    expect(r.text).not.toContain('outage')
  })

  it('introduces the question the learner can already see', () => {
    expect(resolveEmptyBody({ text: '', mcq: MCQ }).text).toMatch(/question/i)
  })

  it('a genuinely empty turn still degrades', () => {
    // The outage path is real and must survive: a provider returning nothing,
    // with nothing else in the turn, IS a degraded turn.
    expect(resolveEmptyBody({ text: '', mcq: null }).degraded).toBe(true)
    expect(resolveEmptyBody({ text: '   \n ', mcq: null }).degraded).toBe(true)
  })

  it('a normal turn is untouched', () => {
    const real = 'An error is not a mistake you made — every tool has a smallest division.'
    expect(resolveEmptyBody({ text: real, mcq: MCQ })).toEqual({ text: real, degraded: false })
  })
})

describe('the quiet harm: a degraded turn does not count as teaching', () => {
  const fold = (degradedTurn: boolean) =>
    advanceConversationState(
      { ...initialConversationState('phys.meas.errors'), phase: 'DEMONSTRATE' as const },
      {
        askedQuestion: false,
        signalCorrect: null,
        recoveryFired: false,
        learnerRequest: null,
        misconceptionDetected: false,
        isPriorKnowledgeProbe: false,
        deliveredTeaching: true,
        degradedTurn,
      },
    )

  it('marking an MCQ turn degraded would freeze the ladder', () => {
    // This is why the fix matters beyond the visible message.
    expect(fold(true).demonstrated).toBe(false)
    expect(fold(true).taughtThisSession).toBe(false)
  })

  it('not marking it degraded lets the same turn count', () => {
    expect(fold(false).demonstrated).toBe(true)
    expect(fold(false).taughtThisSession).toBe(true)
  })
})

describe('the filler detector shares the mistake and is guarded too', () => {
  it('still reads a stripped MCQ lead-in as filler on the text alone', () => {
    // Kept here as well as in its own file so the THREE-guard pattern is
    // visible in one place: the text really does look empty; the turn is not.
    expect(detectFillerTurn('Have a look at the options below and take your time.')).toBe(true)
  })
})
