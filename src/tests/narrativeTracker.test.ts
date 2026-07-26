import { describe, it, expect } from 'vitest'
import {
  initialNarrativeState,
  readNarrativeState,
  advanceNarrativeState,
  narrativeComplete,
  deriveNarrativeEvidence,
  buildNarrativeCloseBlock,
} from '@/lib/teaching/narrativeTracker'

describe('narrativeTracker', () => {
  describe('initialNarrativeState', () => {
    it('starts with all milestones false', () => {
      const s = initialNarrativeState()
      expect(s).toEqual({ hookDelivered: false, coreTaught: false, hookResolved: false })
    })
  })

  describe('readNarrativeState', () => {
    it('returns initial state for null/undefined', () => {
      expect(readNarrativeState(null)).toEqual(initialNarrativeState())
      expect(readNarrativeState(undefined)).toEqual(initialNarrativeState())
    })

    it('restores persisted state', () => {
      const persisted = { hookDelivered: true, coreTaught: true, hookResolved: false }
      expect(readNarrativeState(persisted)).toEqual(persisted)
    })

    it('fills missing fields from initial state', () => {
      const partial = { hookDelivered: true }
      const result = readNarrativeState(partial)
      expect(result.hookDelivered).toBe(true)
      expect(result.coreTaught).toBe(false)
      expect(result.hookResolved).toBe(false)
    })

    it('rejects non-objects', () => {
      expect(readNarrativeState('string')).toEqual(initialNarrativeState())
      expect(readNarrativeState(42)).toEqual(initialNarrativeState())
    })
  })

  describe('advanceNarrativeState', () => {
    it('sets milestones monotonically', () => {
      const s0 = initialNarrativeState()
      const s1 = advanceNarrativeState(s0, { deliveredHook: true, taughtCore: false, resolvedHook: false })
      expect(s1.hookDelivered).toBe(true)
      expect(s1.coreTaught).toBe(false)

      const s2 = advanceNarrativeState(s1, { deliveredHook: false, taughtCore: true, resolvedHook: false })
      expect(s2.hookDelivered).toBe(true)
      expect(s2.coreTaught).toBe(true)
    })

    it('never reverts a reached milestone', () => {
      const reached = { hookDelivered: true, coreTaught: true, hookResolved: true }
      const after = advanceNarrativeState(reached, { deliveredHook: false, taughtCore: false, resolvedHook: false })
      expect(after).toEqual(reached)
    })
  })

  describe('narrativeComplete', () => {
    it('requires coreTaught', () => {
      expect(narrativeComplete({ hookDelivered: true, coreTaught: false, hookResolved: true })).toBe(false)
      expect(narrativeComplete({ hookDelivered: false, coreTaught: true, hookResolved: false })).toBe(true)
    })
  })

  describe('deriveNarrativeEvidence', () => {
    it('derives hook from OBSERVE/DEMONSTRATE phases', () => {
      expect(deriveNarrativeEvidence('OBSERVE', false, 'teach').deliveredHook).toBe(true)
      expect(deriveNarrativeEvidence('DEMONSTRATE', false, 'teach').deliveredHook).toBe(true)
      expect(deriveNarrativeEvidence('CHECK', false, 'ask').deliveredHook).toBe(false)
    })

    it('derives coreTaught from demonstrated flag', () => {
      expect(deriveNarrativeEvidence('GUIDE', true, 'teach').taughtCore).toBe(true)
      expect(deriveNarrativeEvidence('GUIDE', false, 'teach').taughtCore).toBe(false)
    })

    it('derives hookResolved from CHECK/PRACTICE/TRANSFER phases', () => {
      expect(deriveNarrativeEvidence('CHECK', false, 'ask').resolvedHook).toBe(true)
      expect(deriveNarrativeEvidence('PRACTICE', false, 'ask').resolvedHook).toBe(true)
      expect(deriveNarrativeEvidence('TRANSFER', false, 'teach').resolvedHook).toBe(true)
      expect(deriveNarrativeEvidence('GUIDE', false, 'teach').resolvedHook).toBe(false)
    })
  })

  describe('buildNarrativeCloseBlock', () => {
    it('includes the concept title', () => {
      const block = buildNarrativeCloseBlock('Newton\'s Second Law')
      expect(block).toContain('Newton\'s Second Law')
      expect(block).toContain('NARRATIVE CLOSE')
    })

    it('instructs to restate the key idea', () => {
      const block = buildNarrativeCloseBlock('Fractions')
      expect(block).toContain('restate the key idea')
      expect(block).toContain('complete story')
    })
  })
})
