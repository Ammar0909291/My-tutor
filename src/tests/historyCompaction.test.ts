/**
 * Criterion 7 — no verbatim reuse of content already served this session.
 *
 * The advisory instruction moved sessions containing a repeat from 65% to 31%
 * and stopped there. Measured across the physics sweep, 52 of 58 remaining
 * repeat pairs are the model reciting the authored explanation it was served
 * earlier in the same session. This removes the text from the model's view so
 * there is nothing to recite.
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'vitest'
import {
  compactServedExplanations,
  SERVED_EXPLANATION_MARKER,
  type SourcedMessage,
} from '@/lib/teaching/historyCompaction'

const long = (seed: string) => `${seed} `.repeat(60).trim()
const AUTHORED = long('An electric current is charge in motion through a conductor.')

describe('a served authored explanation is compacted out of the model view', () => {
  it('replaces the body with the marker', () => {
    const out = compactServedExplanations([
      { role: 'user', content: 'teach me' },
      { role: 'assistant', content: AUTHORED, provider: 'memory' },
    ])
    expect(out[1].content).toBe(SERVED_EXPLANATION_MARKER)
  })

  it('keeps the turn in place — the model must not think it never happened', () => {
    const out = compactServedExplanations([
      { role: 'assistant', content: AUTHORED, provider: 'memory' },
    ])
    expect(out).toHaveLength(1)
    expect(out[0].role).toBe('assistant')
    expect(out[0].content.length).toBeGreaterThan(0)
  })

  it('the marker is far shorter than what it replaces', () => {
    expect(SERVED_EXPLANATION_MARKER.length).toBeLessThan(AUTHORED.length / 2)
  })
})

describe('NEGATIVE CONTROLS — it touches nothing else', () => {
  it('leaves model-authored assistant turns alone, even long ones', () => {
    const t: SourcedMessage = { role: 'assistant', content: AUTHORED, provider: 'groq' }
    expect(compactServedExplanations([t])[0].content).toBe(AUTHORED)
  })

  it('leaves rows with no provider alone — they predate the field', () => {
    for (const provider of [undefined, null]) {
      const t: SourcedMessage = { role: 'assistant', content: AUTHORED, provider }
      expect(compactServedExplanations([t])[0].content).toBe(AUTHORED)
    }
  })

  it('never touches a user message, whatever its provider says', () => {
    const t: SourcedMessage = { role: 'user', content: AUTHORED, provider: 'memory' }
    expect(compactServedExplanations([t])[0].content).toBe(AUTHORED)
  })

  it('leaves a SHORT memory turn alone — that is not the passage being recited', () => {
    const t: SourcedMessage = { role: 'assistant', content: 'Yes, exactly.', provider: 'memory' }
    expect(compactServedExplanations([t])[0].content).toBe('Yes, exactly.')
  })

  it('preserves order and length exactly', () => {
    const msgs: SourcedMessage[] = [
      { role: 'user', content: 'a' },
      { role: 'assistant', content: AUTHORED, provider: 'memory' },
      { role: 'user', content: 'b' },
      { role: 'assistant', content: long('model prose'), provider: 'gemini' },
    ]
    const out = compactServedExplanations(msgs)
    expect(out).toHaveLength(4)
    expect(out.map((m) => m.role)).toEqual(['user', 'assistant', 'user', 'assistant'])
    expect(out[0].content).toBe('a')
    expect(out[2].content).toBe('b')
    expect(out[3].content).toBe(msgs[3].content)
  })

  it('is idempotent', () => {
    const once = compactServedExplanations([{ role: 'assistant', content: AUTHORED, provider: 'memory' }])
    const twice = compactServedExplanations(once.map((m) => ({ ...m, provider: 'memory' })))
    expect(twice[0].content).toBe(SERVED_EXPLANATION_MARKER)
  })

  it('does not mutate its input', () => {
    const msgs: SourcedMessage[] = [{ role: 'assistant', content: AUTHORED, provider: 'memory' }]
    compactServedExplanations(msgs)
    expect(msgs[0].content).toBe(AUTHORED)
  })
})

describe('the route applies it to the model view only', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('is applied where historyMessages is built', () => {
    expect(route).toMatch(/compactServedExplanations/)
  })

  it('carries the provider through, or the filter can never match', () => {
    const near = route.slice(route.indexOf('const historyMessages'), route.indexOf('const historyMessages') + 900)
    expect(near).toMatch(/provider: m\.provider/)
  })
})
