/**
 * Regression tests — natural speech pacing (src/lib/tts.ts).
 *
 * Tutor Max Review — Conversation 1, finding 4: browser speech synthesis has
 * no SSML, so the only way to give a single utterance real breathing pauses
 * between ideas is to split it into sentence-sized segments and chain them
 * with small gaps, pausing a little longer and speaking a touch slower right
 * before a question. These are the pure, testable pieces of that chain.
 */
import { describe, it, expect } from 'vitest'
import { splitIntoSpeechSegments, pauseBeforeSegment, rateForSegment } from '@/lib/tts'

describe('splitIntoSpeechSegments', () => {
  it('splits multiple sentences into separate trimmed segments', () => {
    expect(splitIntoSpeechSegments('Hello there. How are you? Good.')).toEqual([
      'Hello there.',
      'How are you?',
      'Good.',
    ])
  })

  it('returns a single segment for text with no terminal punctuation', () => {
    expect(splitIntoSpeechSegments('Hello')).toEqual(['Hello'])
  })

  it('keeps an ellipsis as part of the same segment', () => {
    expect(splitIntoSpeechSegments('Wait... let me think.')).toEqual([
      'Wait...',
      'let me think.',
    ])
  })

  it('handles a trailing sentence with no terminal punctuation', () => {
    expect(splitIntoSpeechSegments('First one. Then this')).toEqual([
      'First one.',
      'Then this',
    ])
  })
})

describe('pauseBeforeSegment', () => {
  it('gives a longer pause before a question', () => {
    expect(pauseBeforeSegment('How are you?')).toBeGreaterThan(pauseBeforeSegment('Good.'))
  })

  it('returns zero when there is no next segment', () => {
    expect(pauseBeforeSegment(undefined)).toBe(0)
  })
})

describe('rateForSegment', () => {
  it('slows down slightly for a question', () => {
    expect(rateForSegment(1, 'How are you?')).toBeLessThan(1)
  })

  it('leaves the rate untouched for a plain statement', () => {
    expect(rateForSegment(1, 'Good.')).toBe(1)
  })
})
