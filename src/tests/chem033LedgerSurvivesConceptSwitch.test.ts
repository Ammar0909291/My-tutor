/**
 * CHEM-033 / BIO-018 / PHYS-007 (2026-10-06): the asked-question ledger held
 * one concept, so a turn on another concept wiped it and spent probes were
 * asked again when the lesson came back.
 */
import { describe, it, expect } from 'vitest'
import { readTeachingHistory, recordMcqAsked, recordMcqOutcome, hasAskedMcq, initialTeachingHistory } from '@/lib/teaching/teachingHistory'

const Q = 'Phenol undergoes electrophilic substitution far more readily than benzene because the –OH group ______ the ring.'

describe('the ledger survives a concept switch', () => {
  it('asked on A, a turn on B, back on A: still asked', () => {
    let a = readTeachingHistory(null, 'chem.alc.phenols')
    a = recordMcqAsked(a, Q)
    a = recordMcqOutcome(a, Q, false, false)
    const b = readTeachingHistory(JSON.parse(JSON.stringify(a)), 'chem.org.electronic-effects')
    expect(hasAskedMcq(b, Q)).toBe(false)
    const back = readTeachingHistory(JSON.parse(JSON.stringify(b)), 'chem.alc.phenols')
    expect(hasAskedMcq(back, Q)).toBe(true)
    expect(back.mcqMissed.length).toBe(1)
  })
  it('teaching strategies are NOT carried over (only the asked/served ledger)', () => {
    const a = { ...initialTeachingHistory('x'), strategiesUsed: [1, 2], mcqAsked: ['q'] }
    const back = readTeachingHistory(readTeachingHistory(a, 'y'), 'x')
    expect(back.strategiesUsed).toEqual([])
    expect(back.mcqAsked).toEqual(['q'])
  })
  it('same concept: unchanged behaviour', () => {
    const a = { ...initialTeachingHistory('x'), mcqAsked: ['q'], strategiesUsed: [3] }
    expect(readTeachingHistory(a, 'x')).toMatchObject({ mcqAsked: ['q'], strategiesUsed: [3] })
  })
  it('the archive is bounded', () => {
    let h = readTeachingHistory(null, 'c0')
    for (let i = 1; i <= 40; i++) h = readTeachingHistory({ ...h, mcqAsked: [`q${i}`] }, `c${i}`)
    expect(Object.keys(h.ledgerByConcept ?? {}).length).toBeLessThanOrEqual(24)
  })
})
