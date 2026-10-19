import { stripConfirmBack } from '@/lib/teaching/attributionGuard'

// Reported 2026-10-19 (live, three subjects): "please continue" was answered with a confirmation question instead of the next step.
describe('a "continue" answered with a confirm-back is stripped (live 2026-10-19)', () => {
  it.each([
    'So you understood the previous explanation about ecosystem services and are ready to move on—have I got that right?',
    'So you understood the previous example and would like me to move on to the next step, is that right?',
    "You've followed the earlier steps and you're ready for the next part. Is that right?",
  ])('%s', (line) => {
    const r = stripConfirmBack(line)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe('')
  })
  it('keeps the teaching that follows', () => {
    const r = stripConfirmBack('So you understood the example and are ready to move on, is that right? Next, the mean is the sum divided by the count.')
    expect(r.text).toBe('Next, the mean is the sum divided by the count.')
  })
  it('leaves an authored quiz stem alone', () => {
    expect(stripConfirmBack('The mean of 2 and 4 is 3. Is that right?').stripped).toBe(false)
  })
})

import { isStandaloneArtLine } from '@/lib/teaching/asciiDiagramGuard'
describe('a flow drawn between pipes is an art line (live 2026-10-19, cs.prog.type-conversion)', () => {
  it('drops "value: 5 | integer | ---> | float |"', () => {
    expect(isStandaloneArtLine('value: 5 | integer | ---------------------------> | float |')).toBe(true)
  })
  it('leaves a markdown table row and an arrow in prose alone', () => {
    expect(isStandaloneArtLine('| int | float | str |')).toBe(false)
    expect(isStandaloneArtLine('Python turns 5 into 5.0 --> a float')).toBe(false)
  })
})

import { numericAxisForLanguageConcept } from '@/lib/teaching/visual/figureCritic'
describe('a numeric axis is not a figure of a language concept (live 2026-10-19)', () => {
  const line = { kind: 'spec', spec: { type: 'number_line', start: -5, end: 5, highlight: [-5, 5], title: 'Register spectrum' } } as never
  const flow = { kind: 'spec', spec: { type: 'process_flow', title: 'Steps', steps: [] } } as never
  it('rejects a number line or graph for an eng.* concept only', () => {
    expect(numericAxisForLanguageConcept(line, 'eng.vocab.register-and-formality')).toBe(true)
    expect(numericAxisForLanguageConcept(line, 'math.arith.integers')).toBe(false)
    expect(numericAxisForLanguageConcept(flow, 'eng.listening.listening-for-detail')).toBe(false)
  })
})
