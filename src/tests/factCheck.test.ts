/**
 * Phase 5 — fact-check gate, deterministic first pass (launch-readiness item 3,
 * 2026-10-03). Check F1: the teaching prose states an AUTHORED WRONG ANSWER as
 * fact. Every authored probe for the concept carries its distractors; a
 * misconception probe's distractor IS the misconception written as a sentence.
 * A sentence that says the same thing, without negating it, is flagged.
 * Shadow only until precision is measured (>= 90% required to serve).
 */
import { describe, it, expect } from 'vitest'
import { falseStatementsFromProbes, checkProseAgainstFalseStatements, factCheckMode } from '@/lib/teaching/factCheck'

const PROBES = [
  {
    stem: 'What happens to respiration in a plant at night?',
    choices: [
      { text: 'Respiration continues; only photosynthesis stops', isCorrect: true },
      { text: 'Plants stop respiring at night because there is no light', isCorrect: false },
      { text: 'Both processes stop', isCorrect: false },
    ],
  },
  {
    stem: 'Which statement about the compensation point is right?',
    choices: [
      { text: 'Photosynthesis and respiration run at equal rates', isCorrect: true },
      { text: 'At the compensation point photosynthesis and respiration have both stopped', isCorrect: false },
    ],
  },
]

describe('falseStatementsFromProbes', () => {
  it('keeps statement-like wrong choices only (4+ content words), never the key', () => {
    const s = falseStatementsFromProbes(PROBES)
    expect(s).toContain('Plants stop respiring at night because there is no light')
    expect(s).toContain('At the compensation point photosynthesis and respiration have both stopped')
    expect(s).not.toContain('Both processes stop')
    expect(s.some((x) => x.startsWith('Respiration continues'))).toBe(false)
  })
})

describe('checkProseAgainstFalseStatements', () => {
  const S = falseStatementsFromProbes(PROBES)

  it('flags a sentence that states a distractor as fact', () => {
    const r = checkProseAgainstFalseStatements('Leaves are busy in daylight. At night plants stop respiring because there is no light.', S)
    expect(r).toHaveLength(1)
    expect(r[0].statement).toBe('Plants stop respiring at night because there is no light')
  })

  it('does not flag the same idea when it is negated or named as a misconception', () => {
    expect(checkProseAgainstFalseStatements('Plants do not stop respiring at night, even though there is no light.', S)).toEqual([])
    expect(checkProseAgainstFalseStatements('A common myth is that plants stop respiring at night because there is no light.', S)).toEqual([])
    expect(checkProseAgainstFalseStatements('Many learners think plants stop respiring at night because there is no light, but they keep going.', S)).toEqual([])
  })

  it('does not flag the correct statement, or prose that only shares the topic words', () => {
    expect(checkProseAgainstFalseStatements('At the compensation point photosynthesis and respiration run at equal rates, so there is no net gas exchange.', S)).toEqual([])
    expect(checkProseAgainstFalseStatements('Respiration releases energy from glucose in every living cell, day and night.', S)).toEqual([])
  })
})

describe('factCheckMode', () => {
  it('defaults to shadow; off and serve are explicit', () => {
    expect(factCheckMode({})).toBe('shadow')
    expect(factCheckMode({ FACT_CHECK_MODE: 'off' })).toBe('off')
    expect(factCheckMode({ FACT_CHECK_MODE: 'serve' })).toBe('serve')
  })
})

describe('route wiring (source)', () => {
  const { readFileSync } = require('fs') as typeof import('fs')
  const SRC = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('checks the SERVED text, after every assembler and before save-once, and only logs', () => {
    const at = SRC.indexOf("console.log('[fact-check] '")
    expect(at).toBeGreaterThan(SRC.indexOf("console.log('[assembled-question] '"))
    expect(at).toBeLessThan(SRC.indexOf('// SAVE ONCE (plan'))
    const block = SRC.slice(SRC.indexOf('// PHASE 5 — FACT-CHECK GATE, SHADOW'), SRC.indexOf('// SAVE ONCE (plan'))
    expect(block).toContain('checkProseAgainstFalseStatements(servedText')
    expect(block).not.toMatch(/servedText\s*=[^=]/)
    expect(block).not.toMatch(/cleanText\s*=[^=]/)
  })
})
