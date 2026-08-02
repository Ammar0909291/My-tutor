import { describe, it, expect } from 'vitest'
import { parseMcqTag, stripMcqTags, mcqConfidence, buildMcqInstruction } from '@/lib/teaching/mcq'

const TAG = '<!--MCQ q="What is 1/2 + 1/4?" a="1/4" b="3/4" c="2/6" d="1/6" correct="B"-->'

describe('parseMcqTag', () => {
  it('parses a well-formed four-option tag', () => {
    const { mcq, cleanText } = parseMcqTag(`Let's check.\n${TAG}`)
    expect(mcq).toEqual({
      question: 'What is 1/2 + 1/4?',
      options: ['1/4', '3/4', '2/6', '1/6'],
      correctIndex: 1,
    })
    expect(cleanText).toBe("Let's check.")
  })

  it('accepts a two-option item without padding', () => {
    const { mcq } = parseMcqTag('<!--MCQ q="Is 3 prime?" a="Yes" b="No" correct="A"-->')
    expect(mcq?.options).toEqual(['Yes', 'No'])
    expect(mcq?.correctIndex).toBe(0)
  })

  it('accepts the self-closing form the LLM sometimes emits', () => {
    const { mcq } = parseMcqTag('<!--MCQ q="Q" a="x" b="y" correct="b"/>')
    expect(mcq?.correctIndex).toBe(1)
  })

  it('is case-insensitive on the correct-answer letter', () => {
    expect(parseMcqTag('<!--MCQ q="Q" a="x" b="y" correct="B"-->').mcq?.correctIndex).toBe(1)
    expect(parseMcqTag('<!--MCQ q="Q" a="x" b="y" correct="b"-->').mcq?.correctIndex).toBe(1)
  })

  it('returns null when there is no tag', () => {
    const { mcq, cleanText } = parseMcqTag('Just an explanation.')
    expect(mcq).toBeNull()
    expect(cleanText).toBe('Just an explanation.')
  })

  it('rejects fewer than two options', () => {
    expect(parseMcqTag('<!--MCQ q="Q" a="only" correct="A"-->').mcq).toBeNull()
  })

  it('rejects an answer key pointing past the supplied options', () => {
    // Would otherwise mark every possible response wrong.
    expect(parseMcqTag('<!--MCQ q="Q" a="x" b="y" correct="D"-->').mcq).toBeNull()
  })

  it('rejects a missing question or answer key', () => {
    expect(parseMcqTag('<!--MCQ a="x" b="y" correct="A"-->').mcq).toBeNull()
    expect(parseMcqTag('<!--MCQ q="Q" a="x" b="y"-->').mcq).toBeNull()
  })

  it('rejects duplicate options (unanswerable item)', () => {
    expect(parseMcqTag('<!--MCQ q="Q" a="Yes" b="yes" correct="A"-->').mcq).toBeNull()
  })

  it('stops at a gap rather than shifting the answer index', () => {
    // c missing but d present: compacting would make d index 2 and silently
    // change which option `correct="C"` refers to.
    const { mcq } = parseMcqTag('<!--MCQ q="Q" a="x" b="y" d="z" correct="B"-->')
    expect(mcq?.options).toEqual(['x', 'y'])
    expect(mcq?.correctIndex).toBe(1)
  })

  it('strips the tag even when the tag itself is malformed', () => {
    const { mcq, cleanText } = parseMcqTag('Text here.\n<!--MCQ q="Q" a="only" correct="A"-->')
    expect(mcq).toBeNull()
    expect(cleanText).toBe('Text here.')
  })

  it('leaves an unterminated fragment alone (bounded cleanup)', () => {
    const text = 'Text.\n<!--MCQ q="Q" a="x"'
    expect(stripMcqTags(text)).toBe(text)
  })
})

describe('stripMcqTags', () => {
  it('removes every complete tag, not just the first', () => {
    const t = `A.\n${TAG}${TAG}`
    expect(stripMcqTags(t)).toBe('A.\n')
  })
})

describe('mcqConfidence — D1 speed x correctness grid', () => {
  it('fast + correct is fluent retrieval', () => {
    expect(mcqConfidence(true, 2000)).toBe('high')
  })

  it('slow + correct is effortful but sound', () => {
    expect(mcqConfidence(true, 30000)).toBe('medium')
  })

  it('fast + wrong is the dangerous confident-error quadrant', () => {
    expect(mcqConfidence(false, 1500)).toBe('high')
  })

  it('slow + wrong reads as guessing', () => {
    expect(mcqConfidence(false, 40000)).toBe('low')
  })

  it('treats unknown latency as not-fast', () => {
    expect(mcqConfidence(true, null)).toBe('medium')
    expect(mcqConfidence(false, null)).toBe('low')
  })
})

describe('buildMcqInstruction', () => {
  it('mandates MCQ and names the open-ended carve-outs', () => {
    const s = buildMcqInstruction()
    expect(s).toContain('<!--MCQ')
    expect(s).toMatch(/probe/i)
    expect(s).toMatch(/recovery/i)
    expect(s).toMatch(/discovery/i)
  })

  it('forbids re-typing the options in the visible message', () => {
    expect(buildMcqInstruction()).toMatch(/do NOT\s+also re-type/i)
  })
})
