import { describe, it, expect } from 'vitest'
import { buildNarrationSegments, spokenSequence } from '@/lib/narration/segments'

describe('buildNarrationSegments — pure, subject-agnostic segmentation', () => {
  it('splits multi-sentence text into ordered segments with stable ids', () => {
    const segments = buildNarrationSegments('The cell is the basic unit of life. It performs many functions.', 'msg1')
    expect(segments).toHaveLength(2)
    expect(segments[0]).toMatchObject({ id: 'msg1-seg-0', index: 0, text: 'The cell is the basic unit of life.' })
    expect(segments[1]).toMatchObject({ id: 'msg1-seg-1', index: 1, text: 'It performs many functions.' })
  })

  it('rendered text and spoken text are paired by INDEX, not character offset — this is what keeps the correct sentence highlighted even when TTS rewrites a token inside it', () => {
    // cleanTextForTTS expands "H2O" -> "water" for speech; the RENDERED
    // segment must still show "H2O" while its spokenText carries "water".
    const segments = buildNarrationSegments('Water is H2O. It is essential for life.', 'chem1')
    expect(segments[0].text).toContain('H2O')
    expect(segments[0].spokenText.toLowerCase()).toContain('water')
    expect(segments[0].spokenText).not.toContain('H2O')
    // The SECOND sentence has no chemistry token, so rendered === spoken.
    expect(segments[1].text).toBe(segments[1].spokenText)
  })

  it('is subject-agnostic — physics, chemistry, math, english, biology, and CS text all segment the same way, with no branch on subject anywhere', () => {
    const bySubject = {
      physics: buildNarrationSegments("Newton's first law describes inertia. An object at rest stays at rest.", 'p'),
      chemistry: buildNarrationSegments('An atom has a nucleus. Electrons orbit around it.', 'c'),
      mathematics: buildNarrationSegments('A prime number has exactly two divisors. Seven is prime.', 'm'),
      english: buildNarrationSegments('A noun names a person, place, or thing. Dog is a noun.', 'e'),
      biology: buildNarrationSegments('DNA carries genetic information. It is found in the nucleus.', 'b'),
      computer_science: buildNarrationSegments('An array stores items in order. Each item has an index.', 'cs'),
    }
    for (const segs of Object.values(bySubject)) {
      expect(segs.length).toBe(2)
      expect(segs[0].index).toBe(0)
      expect(segs[1].index).toBe(1)
    }
  })

  it('empty text produces zero segments, not a single empty one', () => {
    expect(buildNarrationSegments('', 'x')).toEqual([])
    expect(buildNarrationSegments('   ', 'x')).toEqual([])
  })

  it('a single sentence with no terminal punctuation still produces one segment', () => {
    const segments = buildNarrationSegments('This is the whole message', 'x')
    expect(segments).toHaveLength(1)
    expect(segments[0].text).toBe('This is the whole message')
  })

  it('spokenSequence returns the TTS-bound text in order, ready to hand to a single server-TTS request', () => {
    const segments = buildNarrationSegments('First idea. Second idea. Third idea.', 'x')
    expect(spokenSequence(segments)).toEqual(['First idea.', 'Second idea.', 'Third idea.'])
  })

  it('every segment carries its RENDERED text tokenized into words, for word-level highlighting', () => {
    const segments = buildNarrationSegments('The cat sat. It slept.', 'w1')
    const words0 = segments[0].renderedWords.filter((t) => t.kind === 'word')
    expect(words0.map((w) => w.text)).toEqual(['The', 'cat', 'sat.'])
    // Concatenating every token reproduces the segment's own rendered text.
    expect(segments[0].renderedWords.map((t) => t.text).join('')).toBe(segments[0].text)
  })

  it('spokenWordCount reflects the SPOKEN text word count, which can differ from the rendered word count', () => {
    // "H2O" (1 rendered word) speaks as "water" (still 1 spoken word) —
    // exact match, the common case.
    const exact = buildNarrationSegments('Water is H2O.', 'x1')
    const renderedWords = exact[0].renderedWords.filter((t) => t.kind === 'word').length
    expect(exact[0].spokenWordCount).toBe(renderedWords)

    // "5m²" (1 rendered word) speaks as "5 square meters" (3 spoken words) —
    // spokenWordCount genuinely diverges from the rendered word count.
    const expanded = buildNarrationSegments('The area is 5m².', 'x2')
    const expandedRenderedWords = expanded[0].renderedWords.filter((t) => t.kind === 'word').length
    expect(expanded[0].spokenWordCount).toBeGreaterThan(expandedRenderedWords)
  })
})
