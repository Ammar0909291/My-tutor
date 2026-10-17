import { describe, it, expect } from 'vitest'
import { confirmCorrectAnswer, confirmationPhrase } from '@/lib/teaching/answerConfirmation'
import { qualifyUncovered, UNCOVERED_EXAMPLE_NOTE } from '@/lib/teaching/groundedProseCheck'
import { analogyCapReached } from '@/lib/teaching/reuseCaps'

describe('a "No" answer is never confirmed with "Yes, …" (English study 2026-10-17)', () => {
  it('skips the Yes phrasing at every rotation position', () => {
    for (let n = 0; n < 9; n++) {
      const r = confirmCorrectAnswer({ text: 'A minimal pair differs in one sound.', correct: true, priorConfirmations: n, learnerAnswer: 'No' })
      expect(r.text).not.toMatch(/^Yes\b/i)
      expect(confirmationPhrase(n, 'No')).not.toMatch(/^Yes\b/i)
    }
  })
  it('also covers an empty reply and an answer such as "No — most marks are erased"', () => {
    expect(confirmCorrectAnswer({ text: ' ', correct: true, priorConfirmations: 2, learnerAnswer: 'No — most marks are erased' }).text).not.toMatch(/^Yes\b/i)
  })
  it('leaves the rotation unchanged for other answers', () => {
    expect(confirmationPhrase(2)).toBe('Yes, exactly right.')
    expect(confirmationPhrase(2, 'Yes')).toBe('Yes, exactly right.')
    expect(confirmationPhrase(2, 'Nothing changes')).toBe('Yes, exactly right.')
  })
})

describe('the "not in your lesson materials" note never splits a lead-in from its code block', () => {
  const intro = 'The first box is where you write source code. \nFor example, a simple line in Python might be:'
  const code = '```python\nprint("Hello, world!")\n```'
  const rest = 'The next box shows translation.'
  it('goes after the code block, not between "might be:" and the block', () => {
    const out = qualifyUncovered([intro, code, rest].join('\n\n'), 'For example, a simple line in Python might be:')
    expect(out.changed).toBe(true)
    const i = out.text.indexOf(UNCOVERED_EXAMPLE_NOTE)
    expect(i).toBeGreaterThan(out.text.indexOf('```python'))
    expect(out.text.indexOf(UNCOVERED_EXAMPLE_NOTE)).toBeLessThan(out.text.indexOf(rest))
  })
  it('does not land inside a code block that contains a blank line', () => {
    const block = '```python\nx = 1\n\nprint(x)\n```'
    const out = qualifyUncovered(['Here is an example of the idea:', block, rest].join('\n\n'), 'Here is an example of the idea:')
    const note = out.text.indexOf(UNCOVERED_EXAMPLE_NOTE)
    expect(note).toBeGreaterThan(out.text.indexOf('print(x)'))
  })
  it('keeps the old placement for a plain paragraph', () => {
    const out = qualifyUncovered('First claim here.\n\nSecond paragraph.', 'First claim here.')
    expect(out.text).toBe(`First claim here.\n\n${UNCOVERED_EXAMPLE_NOTE}\n\nSecond paragraph.`)
  })
})

describe('analogy limit 0 blocks any analogy', () => {
  it('is reached even with no earlier analogy', () => {
    expect(analogyCapReached([], 0)).toBe(true)
    expect(analogyCapReached([], 1)).toBe(false)
  })
})
