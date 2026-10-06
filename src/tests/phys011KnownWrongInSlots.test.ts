/**
 * PHYS-011 / PHYS-012 (2026-10-06, docs/qa/PHYSICS_REAL_LEARNER_DEFECTS.md).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { buildSlotSystemPrompt } from '@/lib/teaching/turnAssembly'
import { buildLearnerRequestBlock } from '@/lib/teaching/masteryGate'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const FACTS = {
  question: 'What is PROPER time?',
  options: ['The time measured by a clock travelling with the object', 'The longest time any observer measures'],
  chosenIndex: 0, correctIndex: 0, correct: true,
}

describe('PHYS-011 the slot prompt names the concept\'s authored misconceptions as never-true', () => {
  it('listed when known', () => {
    const p = buildSlotSystemPrompt({ ...FACTS, knownWrong: ['Proper time — it is the “real” time, so it must be the longer, more complete measurement'] })
    expect(p).toMatch(/known WRONG beliefs[\s\S]*must be the longer, more complete measurement/)
  })
  it('absent when none, and capped', () => {
    expect(buildSlotSystemPrompt(FACTS)).not.toMatch(/known WRONG/)
    const many = Array.from({ length: 20 }, (_, i) => `wrong statement number ${i} here`)
    expect((buildSlotSystemPrompt({ ...FACTS, knownWrong: many }).match(/^ {2}\* /gm) ?? []).length).toBe(6)
  })
  it('route: loaded from the cached per-concept misconception-probe read', () => {
    expect(ROUTE).toMatch(/facts\.knownWrong = await \(await import\('@\/lib\/teaching\/factCheck'\)\)\.loadFalseStatements\(resolvedConceptId, teachingLang\)/)
  })
})

describe('PHYS-012 an example with numbers shows each conversion step', () => {
  it('both example directives carry the rule', () => {
    for (const form of ['concrete', 'real_life'] as const) {
      expect(buildLearnerRequestBlock('real_life_example', null, 0, false, undefined, null, false, form)).toMatch(/0\.67 h × 60 = 40 min/)
    }
  })
})
