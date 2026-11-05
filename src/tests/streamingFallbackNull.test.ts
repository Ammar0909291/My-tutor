/**
 * Production, 2026-11-05: "TypeError: Cannot read properties of null (reading 'replace')" replaced the whole /learn page with the error screen for a learner who
 * reloaded a lesson. The stripped content is null for a message with a cached preview, and the fallback called .replace on it when a familiarity line was parsed.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { streamingFallbackText } from '@/lib/learn/streamingFallback'

const FAM = 'Вы уже знакомы с этой темой?'

describe('streamingFallbackText', () => {
  it('THE CRASH: a cached message (stripped content null) with a familiarity line returns "" instead of throwing', () => {
    expect(() => streamingFallbackText({ cached: true, stripped: null, revealing: false, familiarityLine: FAM })).not.toThrow()
    expect(streamingFallbackText({ cached: true, stripped: null, revealing: false, familiarityLine: FAM })).toBe('')
  })
  it('null or undefined stripped content is "" whatever else is set (never throws)', () => {
    for (const stripped of [null, undefined]) for (const familiarityLine of [null, FAM]) for (const revealing of [true, false]) {
      expect(streamingFallbackText({ cached: false, stripped, revealing, revealedLength: 5, familiarityLine })).toBe('')
    }
  })
  it('a live message: the stripped text, with the familiarity question taken out and blank runs collapsed', () => {
    expect(streamingFallbackText({ cached: false, stripped: `Привет.\n\n\n\n${FAM}\n\nПоехали.`, revealing: false, familiarityLine: FAM })).toBe('Привет.\n\n\n\nПоехали.'.replace(/\n{3,}/g, '\n\n'))
    expect(streamingFallbackText({ cached: false, stripped: 'plain text', revealing: false, familiarityLine: null })).toBe('plain text')
  })
  it('during a reveal only the first revealedLength characters are used', () => {
    expect(streamingFallbackText({ cached: false, stripped: 'abcdefghij', revealing: true, revealedLength: 4, familiarityLine: null })).toBe('abcd')
  })
})

describe('LessonScreen no longer calls .replace on the possibly-null stripped content', () => {
  const src = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')
  it('uses the null-safe helper, and the old inline cast is gone', () => {
    expect(src).toMatch(/streamingFallbackText\(\{ cached: Boolean\(cached\)/)
    expect(src).not.toMatch(/\(strippedContent as string\)/)
  })
})
