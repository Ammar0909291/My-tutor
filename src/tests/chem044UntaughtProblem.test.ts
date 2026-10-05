/**
 * CHEM-044 / CHEM-024 (2026-10-05, chemistry real-learner run): on turn 1,
 * when the question-legality kernel had blocked every question (QL1 — nothing
 * taught yet), the reply to "ok" was an untaught three-part problem (#40), a
 * reaction-quotient calculation (#58), or "Can you walk me through how you
 * thought you could calculate…" about an attempt never made (#78). The reply
 * now keeps only its teaching; with none left, the existing one-shot
 * regeneration (no question allowed) runs.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropUntaughtWorkDemands, needsRepair } from '@/lib/teaching/confirmBackRepair'

const C40 = 'Real gases do not behave exactly like ideal ones. Imagine you have a sealed 1.00 L container holding exactly 1.00 mol of CO₂ at 400 K. Using the ideal-gas law, what pressure would you predict? Now apply the van der Waals equation with a = 3.59 and b = 0.0427. Finally, explain why the two pressures differ and which way the van der Waals result moves.'
const C78 = 'Can you walk me through how you thought you could calculate the limiting molar conductivity of acetic acid?'
const C58 = 'You are told that the concentrations are [A] = 0.5 M, [B] = 0.5 M, [C] = 2.0 M for the reaction A + B ⇌ C with K = 16. Calculate the reaction quotient Q for this mixture, and then tell me which way the reaction will shift to reach equilibrium.'

describe('dropUntaughtWorkDemands', () => {
  it('#40: the problem goes, the teaching sentence stays', () => {
    const r = dropUntaughtWorkDemands(C40)
    expect(r.text).toContain('Real gases do not behave exactly like ideal ones.')
    expect(r.text).not.toMatch(/predict|apply the van der Waals|explain why/)
    expect(r.removed.length).toBeGreaterThanOrEqual(3)
  })
  it('#78 and #58: nothing teaching is left, so the turn is a stub for the regeneration', () => {
    expect(needsRepair(dropUntaughtWorkDemands(C78).text)).toBe(true)
    const r58 = dropUntaughtWorkDemands(C58)
    expect(r58.text).not.toMatch(/Calculate/)
  })
  it('keeps a teaching turn that only mentions calculation in the third person', () => {
    const t = 'Chemists calculate the reaction quotient Q the same way as K, but with the concentrations right now. When Q is smaller than K the reaction moves forward.'
    expect(dropUntaughtWorkDemands(t)).toEqual({ text: t, removed: [] })
  })
})

describe('route wiring (source)', () => {
  it('runs only on a QL1 turn with no card, when the learner asked nothing', () => {
    const SRC = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(SRC).toMatch(/if \(resolvedLegalityBlockedReason === 'QL1_NO_ANSWERABLE_SOURCE' && mcqHoisted === null && resolvedQuestionServed === null/)
    expect(SRC).toMatch(/needsRepair\(cut\.text\) \? await repairStubReply\(cut\.text, 'gate-contract'\) : null/)
  })
})
