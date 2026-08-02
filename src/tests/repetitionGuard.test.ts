import { describe, it, expect } from 'vitest'
import {
  emptyQuestionLedger, readQuestionLedger, fingerprintQuestion, extractQuestions,
  isRepeatQuestion, findRepeatedQuestion, recordQuestions, findBannedStockPhrases,
  buildAntiRepetitionBlock, MAX_LEDGER_ENTRIES,
} from '@/lib/teaching/repetitionGuard'

describe('fingerprintQuestion', () => {
  it('collides on trivial rewordings and word order', () => {
    const a = fingerprintQuestion('What do you notice about the shape?')
    const b = fingerprintQuestion('About the shape, what do you notice?')
    expect(a).toBe(b)
  })

  it('ignores punctuation and casing', () => {
    expect(fingerprintQuestion('Why does IT float?')).toBe(fingerprintQuestion('why does it float'))
  })

  it('keeps genuinely different questions distinct', () => {
    expect(fingerprintQuestion('Why does ice float?'))
      .not.toBe(fingerprintQuestion('Why does iron sink?'))
  })

  it('returns empty for a filler-only string', () => {
    expect(fingerprintQuestion('do you know?')).toBe('')
  })
})

describe('extractQuestions', () => {
  it('picks out only the interrogative sentences', () => {
    const text = 'Nice work. Why does it float? Let me show you. What changes?'
    expect(extractQuestions(text)).toEqual(['Why does it float?', 'What changes?'])
  })

  it('returns nothing for text with no questions', () => {
    expect(extractQuestions('This is an explanation. It has no questions.')).toEqual([])
  })

  it('handles empty input', () => {
    expect(extractQuestions('')).toEqual([])
  })
})

describe('ledger recording and repeat detection', () => {
  it('detects an exact repeat', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    expect(isRepeatQuestion(l, 'Why does ice float?')).toBe(true)
  })

  it('detects a reworded repeat', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'What do you notice about the shape?')
    expect(isRepeatQuestion(l, 'About the shape, what do you notice?')).toBe(true)
  })

  it('does not flag a genuinely new question', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    expect(isRepeatQuestion(l, 'What is density?')).toBe(false)
  })

  it('finds the offending question inside a full reply', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    const reply = 'Good. Let me recap. Why does ice float?'
    expect(findRepeatedQuestion(l, reply)).toBe('Why does ice float?')
  })

  it('returns null when a reply repeats nothing', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    expect(findRepeatedQuestion(l, 'Now, what is density?')).toBeNull()
  })

  it('is idempotent — recording the same question twice adds one entry', () => {
    let l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    l = recordQuestions(l, 'Why does ice float?')
    expect(l.fingerprints).toHaveLength(1)
    expect(l.recent).toHaveLength(1)
  })

  it('leaves the ledger untouched when the turn asked nothing', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Here is an explanation.')
    expect(l.fingerprints).toEqual([])
  })

  it('caps growth, keeping the newest entries', () => {
    let l = emptyQuestionLedger()
    for (let i = 0; i < MAX_LEDGER_ENTRIES + 10; i++) l = recordQuestions(l, `Question number ${i}alpha?`)
    expect(l.fingerprints).toHaveLength(MAX_LEDGER_ENTRIES)
    // The most recent question must still be blocked.
    expect(isRepeatQuestion(l, `Question number ${MAX_LEDGER_ENTRIES + 9}alpha?`)).toBe(true)
  })
})

describe('readQuestionLedger', () => {
  it('round-trips a real ledger', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    expect(readQuestionLedger(JSON.parse(JSON.stringify(l)))).toEqual(l)
  })

  it('falls back to empty on junk', () => {
    expect(readQuestionLedger(null)).toEqual(emptyQuestionLedger())
    expect(readQuestionLedger('nope')).toEqual(emptyQuestionLedger())
    expect(readQuestionLedger({ fingerprints: 'x' })).toEqual(emptyQuestionLedger())
  })
})

describe('findBannedStockPhrases', () => {
  it('catches each looping formulation', () => {
    expect(findBannedStockPhrases("Let's take one small step together.")).toContain(
      "Let's take one small step together",
    )
    expect(findBannedStockPhrases('What do you notice here?')).toContain('What do you notice')
    expect(findBannedStockPhrases('What surprised you?')).toContain('What surprised you')
  })

  it('does not fire on ordinary use of the same words', () => {
    expect(findBannedStockPhrases('Notice that the sign flipped.')).toEqual([])
    expect(findBannedStockPhrases('That result is surprising.')).toEqual([])
  })
})

describe('buildAntiRepetitionBlock', () => {
  it('quotes previously asked questions back', () => {
    const l = recordQuestions(emptyQuestionLedger(), 'Why does ice float?')
    const block = buildAntiRepetitionBlock(l)
    expect(block).toContain('Why does ice float?')
    expect(block).toMatch(/DO NOT REPEAT/)
  })

  it('always bans the stock phrases, even with an empty ledger', () => {
    const block = buildAntiRepetitionBlock(emptyQuestionLedger())
    expect(block).toMatch(/DO NOT REPEAT/)
    expect(block).toContain('What do you notice')
  })

  it('adds the move-forward rule after an acknowledgement', () => {
    const block = buildAntiRepetitionBlock(emptyQuestionLedger(), { learnerAcknowledged: true })
    expect(block).toMatch(/MOVE FORWARD/)
    expect(block).toMatch(/re-asking|re-ask/i)
  })

  it('always states the confusion recipe instead of re-asking', () => {
    const block = buildAntiRepetitionBlock(emptyQuestionLedger())
    expect(block).toMatch(/NEW example/)
    expect(block).toMatch(/multiple-choice/)
  })
})
