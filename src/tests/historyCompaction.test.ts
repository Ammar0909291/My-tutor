/**
 * Criterion 7 — no verbatim reuse of content already served this session.
 *
 * The advisory instruction moved sessions containing a repeat from 65% to 31%
 * and stopped there. Measured across the physics sweep, 52 of 58 remaining
 * repeat pairs were the model reciting the authored explanation it was served
 * earlier in the same session — closed by compacting `provider === 'memory'`
 * turns out of the model's view.
 *
 * That first version shipped and the full-sample C7 re-measurement
 * (`docs/architecture/PHYSICS_REMEASUREMENT_2026-08-31.md`) found NO
 * measurable effect (p = 0.80) — 58% of remaining repeats (11 of 19) occurred
 * with this turn's own retrieval empty and compaction active, meaning the
 * model was reciting something this file never touched: its OWN prior
 * long-form turn, which the original scope deliberately left alone (see the
 * ORIGINAL negative control below, kept verbatim for history).
 *
 * 2026-09-19: scope widened to compact ANY sufficiently long assistant turn,
 * not just `provider === 'memory'` ones, with a marker whose wording is
 * honest about whether the content was authored or model-composed. The tests
 * below that pinned the old, narrower exclusion are UPDATED in place (not
 * silently deleted) — each states what it used to assert and why that
 * changed.
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'vitest'
import {
  compactServedExplanations,
  SERVED_EXPLANATION_MARKER,
  SERVED_MODEL_TURN_MARKER,
  type SourcedMessage,
} from '@/lib/teaching/historyCompaction'

const long = (seed: string) => `${seed} `.repeat(60).trim()
const AUTHORED = long('An electric current is charge in motion through a conductor.')

describe('a served authored explanation is compacted out of the model view', () => {
  it('replaces the body with the authored marker', () => {
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

  it('the authored marker is far shorter than what it replaces', () => {
    expect(SERVED_EXPLANATION_MARKER.length).toBeLessThan(AUTHORED.length / 2)
  })
})

describe('a long MODEL-COMPOSED turn is now ALSO compacted (2026-09-19 widening)', () => {
  it('replaces a long groq/gemini-authored turn with the model-turn marker, not the authored one', () => {
    const t: SourcedMessage = { role: 'assistant', content: AUTHORED, provider: 'groq' }
    const out = compactServedExplanations([t])
    expect(out[0].content).toBe(SERVED_MODEL_TURN_MARKER)
    expect(out[0].content).not.toBe(SERVED_EXPLANATION_MARKER)
  })

  it('the model-turn marker never claims the content was authored/curated', () => {
    expect(SERVED_MODEL_TURN_MARKER.toLowerCase()).not.toContain('authored')
  })

  it('the two markers are distinguishable strings', () => {
    expect(SERVED_MODEL_TURN_MARKER).not.toBe(SERVED_EXPLANATION_MARKER)
  })

  it('a row with no provider (predates the column) is compacted the same as any other model turn', () => {
    for (const provider of [undefined, null]) {
      const t: SourcedMessage = { role: 'assistant', content: AUTHORED, provider }
      expect(compactServedExplanations([t])[0].content).toBe(SERVED_MODEL_TURN_MARKER)
    }
  })
})

describe('NEGATIVE CONTROLS — it still touches nothing outside long assistant turns', () => {
  it('never touches a user message, whatever its provider says', () => {
    const t: SourcedMessage = { role: 'user', content: AUTHORED, provider: 'memory' }
    expect(compactServedExplanations([t])[0].content).toBe(AUTHORED)
  })

  it('leaves a SHORT memory turn alone — that is not the passage being recited', () => {
    const t: SourcedMessage = { role: 'assistant', content: 'Yes, exactly.', provider: 'memory' }
    expect(compactServedExplanations([t])[0].content).toBe('Yes, exactly.')
  })

  it('leaves a SHORT model turn alone too — same reasoning, any provider', () => {
    const t: SourcedMessage = { role: 'assistant', content: 'Yes, exactly.', provider: 'groq' }
    expect(compactServedExplanations([t])[0].content).toBe('Yes, exactly.')
  })

  it('preserves order and length exactly, and compacts every qualifying turn regardless of provider', () => {
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
    // ORIGINAL assertion here was `expect(out[3].content).toBe(msgs[3].content)` —
    // a long non-memory turn passed through untouched. That was the exact gap
    // this widening closes: it is now compacted, same as the memory turn.
    expect(out[3].content).toBe(SERVED_MODEL_TURN_MARKER)
  })

  it('is idempotent for the authored marker', () => {
    const once = compactServedExplanations([{ role: 'assistant', content: AUTHORED, provider: 'memory' }])
    const twice = compactServedExplanations(once.map((m) => ({ ...m, provider: 'memory' })))
    expect(twice[0].content).toBe(SERVED_EXPLANATION_MARKER)
  })

  it('is idempotent for the model-turn marker', () => {
    const once = compactServedExplanations([{ role: 'assistant', content: AUTHORED, provider: 'groq' }])
    const twice = compactServedExplanations(once.map((m) => ({ ...m, provider: 'groq' })))
    expect(twice[0].content).toBe(SERVED_MODEL_TURN_MARKER)
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
