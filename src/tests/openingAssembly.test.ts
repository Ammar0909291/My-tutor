/**
 * Turn assembly, Phase 3 step 3 — a lesson opening asks the learner exactly one
 * question (spec §13). Texts are production shapes from the 2026-10-03 sample
 * of 1,187 openings (about half of the "2+ ?" class were true).
 */
import { describe, it, expect } from 'vitest'
import { assembleOpeningTurn } from '@/lib/teaching/openingAssembly'
import { countLearnerQuestions } from '@/lib/teaching/learnerQuestions'

describe('assembleOpeningTurn', () => {
  it('leaves an opening with one question untouched', () => {
    const t = 'Ohm\'s law links voltage, current and resistance: V = IR.\n\nWhat do you notice about how the current changes when the voltage doubles?'
    expect(assembleOpeningTurn(t)).toEqual({ text: t, changed: false, removed: [], learnerQuestionsBefore: 1, learnerQuestionsAfter: 1 })
  })

  // phys.em.ohms-law, production: three questions to the learner in a row.
  it('keeps only the last of several questions to the learner', () => {
    const t = 'Ohm\'s law says V = IR.\n\nIf you apply 5 V across a 10 Ω resistor, what do you expect to happen to the current? What would the current be?\n\nWhat do you notice about the relationship between the numbers?'
    const r = assembleOpeningTurn(t)
    expect(r.changed).toBe(true)
    expect(r.learnerQuestionsBefore).toBe(3)
    expect(r.learnerQuestionsAfter).toBe(1)
    expect(r.text).toBe('Ohm\'s law says V = IR.\n\nWhat do you notice about the relationship between the numbers?')
  })

  // phys.meas.scalars-vectors / phys.mech.power, production: rhetorical and
  // quoted questions inside the teaching are content.
  it('keeps rhetorical and quoted questions inside the teaching', () => {
    const t = 'When we talk about power we are really asking, "How much energy is being transferred each second?" A thermostat answers how much? A wind vane adds which way? Both matter.\n\n**What do you notice about the light bulb when you turn the switch on?**'
    expect(countLearnerQuestions(t)).toBe(1)
    expect(assembleOpeningTurn(t).changed).toBe(false)
  })

  // lesson:1, production: a short bold heading is not a question to the learner.
  it('does not count a short heading as a question', () => {
    const t = '**Did you know?**\n\nThe ancient Greeks measured the Earth with shadows.\n\nHow familiar are you with this topic?'
    expect(countLearnerQuestions(t)).toBe(1)
    expect(assembleOpeningTurn(t).changed).toBe(false)
  })

  it('drops a confirm-back before the closing question', () => {
    const t = 'A pure substance has a fixed composition. Does this look familiar? Does that make sense so far?\n\nWhich of these do you think is a pure substance: air or water?'
    const r = assembleOpeningTurn(t)
    expect(r.text).not.toContain('make sense')
    expect(r.text.endsWith('Which of these do you think is a pure substance: air or water?')).toBe(true)
    expect(r.learnerQuestionsAfter).toBe(1)
  })

  it('never removes the last question, and never removes teaching', () => {
    const t = 'Forces come in pairs. What happens when you push a wall?\n\nWhat do you notice?'
    const r = assembleOpeningTurn(t)
    expect(r.text).toContain('Forces come in pairs.')
    expect(r.text.endsWith('What do you notice?')).toBe(true)
  })
})

describe('lesson-init wiring (source)', () => {
  const { readFileSync } = require('fs') as typeof import('fs')
  const SRC = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')

  it('assembles after every repair and before the opening row is written', () => {
    const assemble = SRC.indexOf('assembleOpeningTurn(routed.text)')
    const lastRepair = SRC.indexOf("event: 'completion-claim-stripped-from-opening'")
    const write = SRC.indexOf('prisma.message.create({')
    expect(assemble).toBeGreaterThan(lastRepair)
    expect(write).toBeGreaterThan(assemble)
  })

  it('logs one [assembled-open] line per opening and serves only in serve mode', () => {
    expect(SRC).toContain("console.log('[assembled-open] '")
    expect(SRC).toMatch(/serveOpening = openMode === 'serve' && opening\.changed/)
    expect(SRC).toMatch(/if \(serveOpening\) routed = \{ \.\.\.routed, text: opening\.text \}/)
  })

  it('cannot stop a lesson from opening', () => {
    expect(SRC).toMatch(/catch \(err\) \{\n\s*\/\/ An assembler must never stop a lesson from opening\.\n\s*console\.warn\('\[assembled-open\] skipped:'/)
  })
})

describe('turnTypeMode: a new turn type starts in shadow', () => {
  it('is shadow under global serve until its own switch says serve, and off when global is off', async () => {
    const { turnTypeMode } = await import('@/lib/teaching/turnAssembly')
    expect(turnTypeMode('open', {})).toBe('off')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'shadow' })).toBe('shadow')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'serve' })).toBe('shadow')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'serve', TURN_ASSEMBLY_OPEN_MODE: 'serve' })).toBe('serve')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'shadow', TURN_ASSEMBLY_OPEN_MODE: 'serve' })).toBe('shadow')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'serve', TURN_ASSEMBLY_OPEN_MODE: 'off' })).toBe('off')
    expect(turnTypeMode('open', { TURN_ASSEMBLY_MODE: 'off', TURN_ASSEMBLY_OPEN_MODE: 'serve' })).toBe('off')
  })
})
