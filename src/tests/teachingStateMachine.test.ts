/**
 * K4 — TSM tests: 10-state ladder, ISS-01 legacy↔canonical mapping,
 * evidence-gated transitions, recovery/failure drop rules, entry mapping.
 */
import { describe, it, expect } from 'vitest'
import { step, initialMachineState, machineFromLegacy } from '@/lib/kernel/tsm/machine'
import {
  legacyToCanonical, canonicalToLegacy, getStageCeiling,
  isCanonicalPhase, PHASE_ORDER_10, STAGE_CEILING,
} from '@/lib/kernel/tsm/phases'

describe('ISS-01 legacy↔canonical mapping', () => {
  it.each([
    ['OBSERVE', 'ANCHOR'], ['DEMONSTRATE', 'DEMONSTRATE'], ['GUIDE', 'GUIDED'],
    ['CHECK', 'ASSESS'], ['PRACTICE', 'INDEPENDENT'], ['TRANSFER', 'TRANSFER'],
  ])('legacy %s → canonical %s', (l, c) => {
    expect(legacyToCanonical(l)).toBe(c)
  })

  it('unknown phase falls back to ANCHOR (conservative)', () => {
    expect(legacyToCanonical('MYSTERY_PHASE')).toBe('ANCHOR')
  })

  it('canonical → legacy is surjective (round-trip preserves TRANSFER + DEMONSTRATE)', () => {
    expect(canonicalToLegacy('DEMONSTRATE')).toBe('DEMONSTRATE')
    expect(canonicalToLegacy('TRANSFER')).toBe('TRANSFER')
  })

  it('isCanonicalPhase correctly classifies both phase sets', () => {
    expect(isCanonicalPhase('DIAGNOSE')).toBe(true)
    expect(isCanonicalPhase('OBSERVE')).toBe(false)
  })
})

describe('Stage ceilings (RS §4.10 extension)', () => {
  it('ANCHOR/DEMONSTRATE = 2, GUIDED = 4, INDEPENDENT = 5, ASSESS = 6, TRANSFER = 7', () => {
    expect(STAGE_CEILING.ANCHOR).toBe(2)
    expect(STAGE_CEILING.DEMONSTRATE).toBe(2)
    expect(STAGE_CEILING.GUIDED).toBe(4)
    expect(STAGE_CEILING.INDEPENDENT).toBe(5)
    expect(STAGE_CEILING.ASSESS).toBe(6)
    expect(STAGE_CEILING.TRANSFER).toBe(7)
  })

  it('legacy names resolve via the same accessor', () => {
    expect(getStageCeiling('OBSERVE')).toBe(2)
    expect(getStageCeiling('PRACTICE')).toBe(6)
    expect(getStageCeiling('nonexistent')).toBe(2)
  })
})

describe('TSM transitions — evidence-gated', () => {
  it('ANCHOR → DEMONSTRATE on correct engagement, demonstrated becomes true', () => {
    const s0 = initialMachineState('ANCHOR')
    const { state, result } = step(s0, { signalCorrect: true, signalConfidence: 'medium', recoveryFired: false, learnerRestated: false })
    expect(result.from).toBe('ANCHOR')
    expect(result.to).toBe('DEMONSTRATE')
    expect(result.direction).toBe('up')
    expect(state.demonstrated).toBe(true)
  })

  it('NAME holds without own-words gate; advances with it', () => {
    const s = { ...initialMachineState('NAME'), demonstrated: true }
    const held = step(s, { signalCorrect: true, signalConfidence: 'medium', recoveryFired: false, learnerRestated: false })
    expect(held.state.phase).toBe('NAME')
    const adv = step(s, { signalCorrect: true, signalConfidence: 'medium', recoveryFired: false, learnerRestated: true })
    expect(adv.state.phase).toBe('FORMALIZE')
    expect(adv.state.namedGate).toBe(true)
  })

  it('GUIDED → INDEPENDENT requires non-low confidence (FRAGILE hold)', () => {
    const s = { ...initialMachineState('GUIDED'), demonstrated: true }
    const fragile = step(s, { signalCorrect: true, signalConfidence: 'low', recoveryFired: false, learnerRestated: false })
    expect(fragile.state.phase).toBe('GUIDED')
    const fluent = step(s, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    expect(fluent.state.phase).toBe('INDEPENDENT')
  })

  it('INDEPENDENT → REFLECT needs ≥2 correct', () => {
    let s = { ...initialMachineState('INDEPENDENT'), demonstrated: true }
    let r = step(s, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    expect(r.state.phase).toBe('INDEPENDENT')
    r = step(r.state, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    expect(r.state.phase).toBe('REFLECT')
  })

  it('failure drops exactly one phase; floor is DEMONSTRATE once demonstrated', () => {
    let s = { ...initialMachineState('GUIDED'), demonstrated: true }
    let r = step(s, { signalCorrect: false, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    expect(r.state.phase).toBe('FORMALIZE')
    r = step(r.state, { signalCorrect: false, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    expect(r.state.phase).toBe('NAME')
    // Continue failing — never falls below DEMONSTRATE
    for (let i = 0; i < 10; i++) {
      r = step(r.state, { signalCorrect: false, signalConfidence: 'high', recoveryFired: false, learnerRestated: false })
    }
    expect(r.state.phase).toBe('DEMONSTRATE')
  })

  it('recovery fires: drop one step, respect floor', () => {
    const s = { ...initialMachineState('GUIDED'), demonstrated: true }
    const r = step(s, { signalCorrect: null, signalConfidence: null, recoveryFired: true, learnerRestated: false })
    expect(r.state.phase).toBe('FORMALIZE')
    expect(r.result.gate).toMatch(/recovery preempt/)
  })

  it('null signal → machine holds', () => {
    const s = initialMachineState('ANCHOR')
    const r = step(s, { signalCorrect: null, signalConfidence: null, recoveryFired: false, learnerRestated: false })
    expect(r.state).toEqual(s)
    expect(r.result.direction).toBe('none')
  })

  it('machineFromLegacy bridges Phase-C/G snapshots', () => {
    const s = machineFromLegacy('CHECK', { demonstrated: true, consecutiveFailures: 2 })
    expect(s.phase).toBe('ASSESS')
    expect(s.demonstrated).toBe(true)
    expect(s.consecutiveFailuresAtPhase).toBe(2)
  })
})

describe('Determinism', () => {
  it('same state + evidence → byte-identical next state', () => {
    const s = initialMachineState('DEMONSTRATE')
    const ev = { signalCorrect: true as const, signalConfidence: 'high' as const, recoveryFired: false, learnerRestated: false }
    expect(JSON.stringify(step(s, ev))).toBe(JSON.stringify(step(s, ev)))
  })

  it('the phase order is stable', () => {
    expect([...PHASE_ORDER_10]).toEqual([
      'DIAGNOSE', 'ANCHOR', 'DEMONSTRATE', 'NAME', 'FORMALIZE',
      'GUIDED', 'INDEPENDENT', 'REFLECT', 'ASSESS', 'TRANSFER',
    ])
  })
})
