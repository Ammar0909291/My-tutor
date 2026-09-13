import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { tokenizeWords, wordCount, mapProportionalIndex, spokenCharIndexToWordIndex } from '@/lib/narration/words'

/**
 * Word-level tokenization and index mapping — the pure building blocks
 * behind word-by-word narration highlighting. No DOM, no audio, no timers:
 * these are exactly the functions the engines call to turn a real signal
 * (a browser boundary event's charIndex, or an audio-time window) into
 * "which rendered word is this."
 */

describe('1 — text -> words segmentation', () => {
  it('splits ordinary prose into word tokens in order, each with its own index', () => {
    const tokens = tokenizeWords('The cat sat')
    const words = tokens.filter((t) => t.kind === 'word')
    expect(words.map((w) => w.text)).toEqual(['The', 'cat', 'sat'])
    expect(words.map((w) => w.wordIndex)).toEqual([0, 1, 2])
  })

  it('empty text produces zero tokens', () => {
    expect(tokenizeWords('')).toEqual([])
  })

  it('a single word with no whitespace produces exactly one word token', () => {
    const tokens = tokenizeWords('Hello')
    expect(tokens).toEqual([{ kind: 'word', text: 'Hello', wordIndex: 0 }])
  })

  it('wordCount matches the number of word-kind tokens', () => {
    expect(wordCount('one two three four')).toBe(4)
    expect(wordCount('')).toBe(0)
    expect(wordCount('single')).toBe(1)
  })
})

describe('2 — punctuation and whitespace preservation', () => {
  it('concatenating every token\'s text reproduces the original string EXACTLY, including double spaces', () => {
    const original = 'Hello,  world!   How are you?'
    const tokens = tokenizeWords(original)
    expect(tokens.map((t) => t.text).join('')).toBe(original)
  })

  it('a double space between two words is preserved as its own single space token, not collapsed', () => {
    const tokens = tokenizeWords('cat  dog')
    expect(tokens).toEqual([
      { kind: 'word', text: 'cat', wordIndex: 0 },
      { kind: 'space', text: '  ' },
      { kind: 'word', text: 'dog', wordIndex: 1 },
    ])
  })

  it('attached punctuation stays attached to its word (never split into a separate token)', () => {
    const tokens = tokenizeWords("Newton's first law, right?")
    const words = tokens.filter((t) => t.kind === 'word')
    expect(words.map((w) => w.text)).toEqual(["Newton's", 'first', 'law,', 'right?'])
  })

  it('a tab or newline between words is preserved as the exact separator text', () => {
    const tokens = tokenizeWords('one\ttwo\nthree')
    expect(tokens.map((t) => t.text).join('')).toBe('one\ttwo\nthree')
    const spaceTokens = tokens.filter((t) => t.kind === 'space')
    expect(spaceTokens.map((t) => t.text)).toEqual(['\t', '\n'])
  })

  it('leading and trailing whitespace is preserved as its own token, not dropped', () => {
    const tokens = tokenizeWords('  hi  ')
    expect(tokens.map((t) => t.text).join('')).toBe('  hi  ')
    expect(tokens[0]).toEqual({ kind: 'space', text: '  ' })
    expect(tokens[tokens.length - 1]).toEqual({ kind: 'space', text: '  ' })
  })
})

describe('3 — rendered/spoken text mapping (proportional index)', () => {
  it('is the IDENTITY mapping when source and target word counts match (the common case)', () => {
    for (let i = 0; i < 5; i++) {
      expect(mapProportionalIndex(i, 5, 5)).toBe(i)
    }
  })

  it('maps proportionally when counts differ (e.g. "5m²" expands to 3 spoken words for 1 rendered word)', () => {
    // 1 rendered word, any spoken index within a 3-word spoken expansion
    // must all map back onto the single rendered word (index 0).
    expect(mapProportionalIndex(0, 3, 1)).toBe(0)
    expect(mapProportionalIndex(1, 3, 1)).toBe(0)
    expect(mapProportionalIndex(2, 3, 1)).toBe(0)
  })

  it('maps a shorter spoken sequence back across a longer rendered one proportionally', () => {
    // 2 spoken words describing 4 rendered words: first half of spoken maps
    // to the first half of rendered, second half to the second half.
    expect(mapProportionalIndex(0, 2, 4)).toBe(0)
    expect(mapProportionalIndex(1, 2, 4)).toBe(2)
  })

  it('clamps into range and never divides by zero', () => {
    expect(mapProportionalIndex(0, 0, 5)).toBe(0)
    expect(mapProportionalIndex(0, 5, 0)).toBe(0)
    expect(mapProportionalIndex(99, 3, 3)).toBe(2) // clamped to the last valid index
  })
})

describe('4/5 — spokenCharIndexToWordIndex: browser boundary charIndex -> word index', () => {
  const text = 'The quick brown fox'
  // indices:                0123456789...
  // "The" = 0-2, " " = 3, "quick" = 4-8, " " = 9, "brown" = 10-14, " " = 15, "fox" = 16-18

  it('a charIndex at the very BEGINNING of a word resolves to that word', () => {
    expect(spokenCharIndexToWordIndex(text, 0)).toBe(0) // "T" of The
    expect(spokenCharIndexToWordIndex(text, 4)).toBe(1) // "q" of quick
    expect(spokenCharIndexToWordIndex(text, 16)).toBe(3) // "f" of fox
  })

  it('a charIndex in the MIDDLE of a word resolves to that same word', () => {
    expect(spokenCharIndexToWordIndex(text, 6)).toBe(1) // "i" inside "quick"
    expect(spokenCharIndexToWordIndex(text, 12)).toBe(2) // "o" inside "brown"
  })

  it('a charIndex at the END of a word (last character) still resolves to that word', () => {
    expect(spokenCharIndexToWordIndex(text, 2)).toBe(0) // "e" of The
    expect(spokenCharIndexToWordIndex(text, 18)).toBe(3) // "x" of fox (last char)
  })

  it('a charIndex landing inside whitespace between words clamps to the PRECEDING word', () => {
    expect(spokenCharIndexToWordIndex(text, 3)).toBe(0) // the space after "The"
    expect(spokenCharIndexToWordIndex(text, 9)).toBe(1) // the space after "quick"
  })

  it('a charIndex past the end of the text clamps to the LAST word', () => {
    expect(spokenCharIndexToWordIndex(text, 999)).toBe(3)
  })

  it('a charIndex of 0 on empty/whitespace-only text does not throw and returns 0', () => {
    expect(spokenCharIndexToWordIndex('', 0)).toBe(0)
    expect(spokenCharIndexToWordIndex('   ', 0)).toBe(0)
  })
})

describe('14 — no subject-specific branching anywhere in this module', () => {
  it('contains no mention of a curriculum subject', () => {
    const src = readFileSync(path.join(process.cwd(), 'src/lib/narration/words.ts'), 'utf8').toLowerCase()
    for (const subject of ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science']) {
      expect(src).not.toContain(subject)
    }
  })
})
