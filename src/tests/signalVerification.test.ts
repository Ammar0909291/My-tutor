import { describe, it, expect } from 'vitest'
import { verifySignal, resolveContradiction } from '@/lib/teaching/signalVerification'
import type { TeachingSignal } from '@/lib/teaching/signals'

describe('signalVerification', () => {
  describe('verifySignal', () => {
    it('returns CLEAN for a consistent correct signal', () => {
      const signal: TeachingSignal = { correctness: true, confidence: 'high' }
      const result = verifySignal(signal, {
        assistantText: 'Excellent! That is exactly right. Now try this next problem.',
        learnerMessage: 'The answer is 42 because we multiply 6 by 7',
        phase: 'CHECK',
      })
      expect(result.status).toBe('CLEAN')
      expect(result.reasons).toHaveLength(0)
    })

    it('returns CLEAN for a consistent incorrect signal', () => {
      const signal: TeachingSignal = { correctness: false, confidence: 'low' }
      const result = verifySignal(signal, {
        assistantText: 'Not quite — let me show you the correct approach.',
        learnerMessage: 'I think it is 5?',
        phase: 'CHECK',
      })
      expect(result.status).toBe('CLEAN')
    })

    it('detects text-contradicts-correct when LLM says "not quite" but signals true', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Not quite — the actual answer is different. Let me explain.',
        learnerMessage: 'Is it 12?',
        phase: 'CHECK',
      })
      expect(result.status).toBe('CONTRADICTED')
      expect(result.reasons).toContain('text-contradicts-correct')
    })

    it('detects text-contradicts-incorrect when LLM says "exactly right" but signals false', () => {
      const signal: TeachingSignal = { correctness: false }
      const result = verifySignal(signal, {
        assistantText: 'Exactly right! You\'ve got it. The force equals mass times acceleration.',
        learnerMessage: 'F = ma',
        phase: 'CHECK',
      })
      expect(result.status).toBe('CONTRADICTED')
      expect(result.reasons).toContain('text-contradicts-incorrect')
    })

    it('flags bare-content-at-advanced-phase for very short correct answers at CHECK', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Great work on understanding that concept!',
        learnerMessage: 'ok',
        phase: 'CHECK',
      })
      expect(result.status).toBe('SUSPICIOUS')
      expect(result.reasons).toContain('bare-content-at-advanced-phase')
    })

    it('does NOT flag bare content at OBSERVE phase', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Yes, you have seen that before.',
        learnerMessage: 'yes',
        phase: 'OBSERVE',
      })
      expect(result.status).toBe('CLEAN')
    })

    it('does NOT flag short messages with numbers at CHECK', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'That is correct!',
        learnerMessage: '42',
        phase: 'CHECK',
      })
      expect(result.status).toBe('CLEAN')
    })

    it('flags implausibly fast correct answer at PRACTICE', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Great answer!',
        learnerMessage: 'The derivative is 2x',
        phase: 'PRACTICE',
        turnLatencyMs: 500,
      })
      expect(result.status).toBe('SUSPICIOUS')
      expect(result.reasons).toContain('implausibly-fast-correct')
    })

    it('does NOT flag fast response at OBSERVE', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Yes!',
        learnerMessage: 'yes I have seen fractions',
        phase: 'OBSERVE',
        turnLatencyMs: 500,
      })
      expect(result.status).toBe('CLEAN')
    })

    it('returns CLEAN when signal has no correctness', () => {
      const signal: TeachingSignal = { confidence: 'medium' }
      const result = verifySignal(signal, {
        assistantText: 'Some response',
        learnerMessage: 'Some message',
        phase: 'GUIDE',
      })
      expect(result.status).toBe('CLEAN')
    })

    it('CONTRADICTED wins over SUSPICIOUS when both present', () => {
      const signal: TeachingSignal = { correctness: true }
      const result = verifySignal(signal, {
        assistantText: 'Not quite right — let me correct that.',
        learnerMessage: 'ok',
        phase: 'PRACTICE',
        turnLatencyMs: 500,
      })
      expect(result.status).toBe('CONTRADICTED')
    })
  })

  describe('resolveContradiction', () => {
    it('flips correctness=true to false on text-contradicts-correct', () => {
      const signal: TeachingSignal = { correctness: true, confidence: 'high' }
      const resolved = resolveContradiction(signal, {
        status: 'CONTRADICTED',
        reasons: ['text-contradicts-correct'],
      })
      expect(resolved.correctness).toBe(false)
      expect(resolved.confidence).toBe('high')
    })

    it('flips correctness=false to true on text-contradicts-incorrect', () => {
      const signal: TeachingSignal = { correctness: false }
      const resolved = resolveContradiction(signal, {
        status: 'CONTRADICTED',
        reasons: ['text-contradicts-incorrect'],
      })
      expect(resolved.correctness).toBe(true)
    })

    it('returns same signal on CLEAN', () => {
      const signal: TeachingSignal = { correctness: true }
      const resolved = resolveContradiction(signal, {
        status: 'CLEAN',
        reasons: [],
      })
      expect(resolved).toBe(signal)
    })

    it('returns same signal on SUSPICIOUS (no override)', () => {
      const signal: TeachingSignal = { correctness: true }
      const resolved = resolveContradiction(signal, {
        status: 'SUSPICIOUS',
        reasons: ['bare-content-at-advanced-phase'],
      })
      expect(resolved).toBe(signal)
    })
  })
})
