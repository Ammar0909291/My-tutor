/**
 * Production 2026-10-06 (session cmuwsmggu…, disposable account, deploy
 * 05b7868): lesson A (chem.alc.phenols) → lesson B (chem.alc.ethers) in the
 * same tab → back to A. Opening B was a fresh attempt, the new-attempt
 * boundary nulled the whole teaching history, and A's two answered cards were
 * served again. CHEM-033 / CHEM-017 / BIO-018 / PHYS-007.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readTeachingHistory, recordMcqAsked, recordMcqOutcome, hasAskedMcq, teachingHistoryForNewAttempt } from '@/lib/teaching/teachingHistory'
import { clearTransientStateForNewAttempt, NEW_ATTEMPT_CLEARED_KEYS } from '@/lib/teaching/attemptIsolation'

const A = 'chem.alc.phenols'
const B = 'chem.alc.ethers'
const Q1 = 'Phenol undergoes electrophilic substitution far more readily than benzene because the –OH group ______ the ring.'
const Q2 = 'Phenol (pKa ~10) is roughly a million times more acidic than ethanol (pKa ~16), despite both having an -OH group. What causes this large difference?'
const roundTrip = <T>(x: T): T => JSON.parse(JSON.stringify(x))

function answeredInA() {
  let h = readTeachingHistory(null, A)
  for (const q of [Q1, Q2]) { h = recordMcqAsked(h, q); h = recordMcqOutcome(h, q, false, false) }
  return roundTrip(h)
}

describe('A → B (fresh attempt) → A (resume): A\'s answered cards stay spent', () => {
  it('the production sequence', () => {
    const afterA = answeredInA()
    // lesson-init for B: a fresh attempt.
    const delta = teachingHistoryForNewAttempt(afterA, B)
    const stored = roundTrip(delta.teachingHistory)
    // first chat turn in B
    const inB = readTeachingHistory(stored, B)
    expect(hasAskedMcq(inB, Q1)).toBe(false)
    // back to A with mode 'resume': no new attempt, so the snapshot from B is read under A
    const backInA = readTeachingHistory(roundTrip(inB), A)
    expect(hasAskedMcq(backInA, Q1)).toBe(true)
    expect(hasAskedMcq(backInA, Q2)).toBe(true)
    expect(backInA.mcqMissed.length).toBe(2)
  })
  it('a restart of A still starts A clean', () => {
    const afterA = answeredInA()
    const delta = teachingHistoryForNewAttempt(afterA, A)
    expect(delta.teachingHistory).toBeNull()
    expect(hasAskedMcq(readTeachingHistory(delta.teachingHistory, A), Q1)).toBe(false)
  })
  it('only question/explanation ledgers cross the boundary, never strategies', () => {
    const afterA = { ...answeredInA(), strategiesUsed: [1, 2, 3] }
    const inB = readTeachingHistory(roundTrip(teachingHistoryForNewAttempt(afterA, B).teachingHistory), B)
    expect(inB.strategiesUsed).toEqual([])
    expect(readTeachingHistory(roundTrip(inB), A).strategiesUsed).toEqual([])
  })
  it('nothing to carry → the same explicit null as before', () => {
    expect(teachingHistoryForNewAttempt(null, B)).toEqual({ teachingHistory: null })
  })
})

describe('wiring', () => {
  it('the generic boundary is unchanged (still argument-free, still nulls the six keys)', () => {
    expect(clearTransientStateForNewAttempt.length).toBe(0)
    expect(Object.keys(clearTransientStateForNewAttempt()).sort()).toEqual([...NEW_ATTEMPT_CLEARED_KEYS])
  })
  it('lesson-init applies the carry-over on a fresh attempt, after the generic clear', () => {
    const src = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    expect(src).toMatch(/\.\.\.\(attemptIsFreshStart \? clearTransientStateForNewAttempt\(\) : \{\}\),[\s\S]{0,400}teachingHistoryForNewAttempt\(snapshot\?\.teachingHistory, topicSlug \?\? null\)/)
  })
})
