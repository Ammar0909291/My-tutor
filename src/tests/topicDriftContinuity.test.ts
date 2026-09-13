/**
 * A LEARNER'S OWN INCIDENTAL PHRASING MUST NEVER BECOME A NEW LESSON TOPIC.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * See topicDrift.ts's own module docblock for the full production transcript
 * this pins. In short: a learner's non-question aside ("...you teach me this
 * one at start") got literalized, two turns later, into an entire off-topic
 * mini-lesson with its own heading and its own unrelated practice question.
 */
import { describe, it, expect } from 'vitest'
import { stripLearnerPhraseDrift } from '@/lib/teaching/topicDrift'

const DRIFTED_REPLY = `That's right. **Teaching "one at start"**
When we want to give a clear, step-by-step instruction, we often start the list with the number **one**.
Example:
1. **One**: Gather the bread.
2. **Two**: Spread butter.
3. **Three**: Add the filling.

Starting with "one" signals to the reader that this is the first item in a sequence and helps keep the order clear.

**Quick check**
If you were writing a short recipe for a peanut-butter sandwich, what would you write as the very first step?`

describe('the measured production defect is caught', () => {
  it('strips the drifted mini-lesson, keeps the legitimate grade acknowledgement', () => {
    const r = stripLearnerPhraseDrift({
      text: DRIFTED_REPLY,
      recentMessages: [
        { role: 'user', content: 'hmm B and D both look like reveal secret to me. i pick B spill the beans because you teach me this one at start' },
      ],
      currentMessage: 'B',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(true)
    expect(r.text).toBe("That's right.")
    expect(r.removedPhrase).toBe('one at start')
    expect(r.text).not.toContain('peanut-butter')
    expect(r.text).not.toContain('recipe')
  })

  it('does nothing when the phrase was never typed by the learner at all', () => {
    const r = stripLearnerPhraseDrift({
      text: DRIFTED_REPLY,
      recentMessages: [{ role: 'user', content: 'ok thank you' }],
      currentMessage: 'B',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(DRIFTED_REPLY)
  })
})

describe('legitimate teaching is never stripped', () => {
  it('a brand-new idiom the model introduces (not sourced from the learner) survives', () => {
    const text = '**Understanding "break the ice"**\nThis idiom means to start a conversation and make people feel comfortable.'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [{ role: 'user', content: 'ok thank you' }],
      currentMessage: 'ok thank you',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('a genuine "what does X mean?" answer survives — this turn asked directly', () => {
    const text = '**Understanding "spill the beans"**\nThis idiom means to reveal a secret.'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [{ role: 'user', content: 'what does spill the beans mean?' }],
      currentMessage: 'what does spill the beans mean?',
      excursionActive: false,
      learnerAskedDirectQuestion: true,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('a phrase asked about several turns ago (question mark on that turn) still survives', () => {
    const text = '**Understanding "one at start"**\nHere is what it means.'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [
        { role: 'user', content: 'what does one at start mean?' },
        { role: 'assistant', content: 'It refers to...' },
      ],
      currentMessage: 'B',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('a worked example quoting a full sentence — no verb+quote heading shape — is untouched', () => {
    const text = 'Example: "If I had a million dollars, I would travel the world."'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [{ role: 'user', content: 'give me example' }],
      currentMessage: 'give me example',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('cross-domain analogies (no heading at all) are completely unaffected', () => {
    const text = 'Think of the microphone like a megaphone you use in a park — it carries your voice further.'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [{ role: 'user', content: 'i dont understand microphone' }],
      currentMessage: 'i dont understand microphone',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('generic structural headings ("Quick check", "Example") are never mistaken for drift', () => {
    const text = '**Quick check**\nWhich idiom means to reveal a secret unintentionally?'
    const r = stripLearnerPhraseDrift({
      text,
      recentMessages: [{ role: 'user', content: 'ok' }],
      currentMessage: 'ok',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('an active excursion always wins — this repair never fights a legitimate detour', () => {
    const r = stripLearnerPhraseDrift({
      text: DRIFTED_REPLY,
      recentMessages: [{ role: 'user', content: 'you teach me this one at start' }],
      currentMessage: 'B',
      excursionActive: true,
      learnerAskedDirectQuestion: false,
    })
    expect(r.stripped).toBe(false)
  })
})

describe('a repair may never break a turn', () => {
  it('emptying the turn falls back to the original text', () => {
    const r = stripLearnerPhraseDrift({
      text: '**Teaching "one at start"**',
      recentMessages: [{ role: 'user', content: 'you teach me this one at start' }],
      currentMessage: 'B',
      excursionActive: false,
      learnerAskedDirectQuestion: false,
    })
    expect(r.text.length).toBeGreaterThan(0)
  })

  it('malformed input never throws', () => {
    expect(() =>
      stripLearnerPhraseDrift({
        text: null as unknown as string,
        recentMessages: null as unknown as never[],
        currentMessage: undefined as unknown as string,
        excursionActive: false,
        learnerAskedDirectQuestion: false,
      }),
    ).not.toThrow()
  })
})

describe('the route actually wires this repair', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('imports and calls stripLearnerPhraseDrift with the real signals', () => {
    expect(ROUTE).toMatch(/stripLearnerPhraseDrift\(\{/)
    expect(ROUTE).toMatch(/recentMessages: historyMessages/)
    expect(ROUTE).toMatch(/excursionActive: excursionActiveHoisted === true/)
  })
})
