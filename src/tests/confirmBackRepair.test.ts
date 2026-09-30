/**
 * When stripConfirmBack leaves no real reply, the route regenerates once
 * (real-learner run 2, 2026-09-30: bare "Not quite", "Gas Laws covers: …",
 * "Let me check your thinking with this.").
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { stripConfirmBack } from '@/lib/teaching/attributionGuard'
import {
  needsRepair, buildConfirmBackRepairAppendix, mergeRepair, correctionLineOf,
} from '@/lib/teaching/confirmBackRepair'

// The P7 production draft (log 02:55:49Z), before the strip.
const P7_DRAFT = "Not quite — the answer is: 9 m/s² towards the centre — v²/r\n\nI hear you saying that the stone's acceleration is zero because its speed doesn't change. Is that right?"

describe('when a repair is needed', () => {
  it('the P7 draft, after the strip, is a bare correction and needs repair', () => {
    const cb = stripConfirmBack(P7_DRAFT)
    expect(cb.stripped).toBe(true)
    expect(correctionLineOf(cb.text)).toBe('Not quite — the answer is: 9 m/s² towards the centre — v²/r')
    expect(needsRepair(cb.text)).toBe(true)
  })

  it('empty text and a one-line stub need repair', () => {
    expect(needsRepair('')).toBe(true)
    expect(needsRepair('Let me check your thinking with this.')).toBe(true)
  })

  it('a real explanation after the correction does not', () => {
    expect(needsRepair('Not quite — the answer is: 4.0 atm\n\nAt fixed volume, pressure rises with absolute temperature. Doubling 300 K to 600 K doubles the pressure, so 2.0 atm becomes 4.0 atm.')).toBe(false)
  })
})

describe('the repair instruction', () => {
  it('a wrong answer asks for why-wrong and why-right, and bans the confirm-back', () => {
    const a = buildConfirmBackRepairAppendix({ graded: { correct: false }, chosenOption: 'Zero — its speed is not changing', correctOption: '9 m/s² towards the centre — v²/r' })
    expect(a).toContain('"Zero — its speed is not changing", which is WRONG')
    expect(a).toContain('WHY their choice is wrong')
    expect(a).toMatch(/do NOT ask "is that right\?"/)
  })

  it('a right answer asks for a short confirmation with a reason', () => {
    expect(buildConfirmBackRepairAppendix({ graded: { correct: true }, chosenOption: 'B', correctOption: 'B' })).toContain('which is RIGHT')
  })

  it('no grade (a practice request, a complaint) asks for a direct reply', () => {
    const a = buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null })
    expect(a).toContain('give one')
    expect(a).not.toContain('WRONG')
  })
})

describe('merging', () => {
  it('keeps the server correction line and adds the retry once', () => {
    const merged = mergeRepair('Not quite — the answer is: X', 'Not quite — the answer is: X\n\nYour choice mixes up speed and velocity. Direction changes, so velocity changes, so there is acceleration.')
    expect(merged.match(/Not quite/g)).toHaveLength(1)
    expect(merged).toContain('Direction changes')
    expect(needsRepair(merged)).toBe(false)
  })

  it('an empty retry keeps the original', () => {
    expect(mergeRepair('Not quite — the answer is: X', '')).toBe('Not quite — the answer is: X')
  })
})

describe('the route wiring', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('one shared repair regenerates once and re-strips the retry', () => {
    const i = route.indexOf('const repairStubReply = async')
    const helper = route.slice(i, i + 3000)
    expect(helper).toContain('buildConfirmBackRepairAppendix(')
    expect(helper).toContain('stripConfirmBack(routed.text')
  })

  it('both clean-up steps call it before their fallbacks', () => {
    expect(route).toContain("await repairStubReply(next, 'confirm-back')")
    expect(route).toContain("await repairStubReply(next, 'repeat-guard')")
  })
})
