/** A stacked exercise (the Educational Brain's assessment item copied into the reply) is removed (stackedTask.ts); ordinary procedure steps stay. Production text verbatim. */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { isStackedTask, dropStackedTasks } from '@/lib/teaching/stackedTask'

const SF4 = 'Looking at the figure that illustrates how the bond‑dipole vectors add in CO₂ (linear, cancel) and H₂O (bent, add), draw the Lewis structure and VSEPR shape of SF₄, identify the position of the lone pair and the four S–F bonds, and determine whether SF₄ is polar or non‑polar by showing the vector addition of its bond dipoles.'

describe('a stacked exercise is dropped whole', () => {
  it('the production sentence', () => { expect(isStackedTask(SF4)).toBe(true) })
  it('without the lead clause too', () => { expect(isStackedTask('Draw the Lewis structure of NF₃, identify the lone pair and calculate the net dipole.')).toBe(true) })
  it('the rest of the reply is kept', () => {
    const out = dropStackedTasks(`${SF4} Polarity depends on the vector sum.`)
    expect(out.text).toBe('Polarity depends on the vector sum.'); expect(out.dropped).toHaveLength(1)
  })
  it('a reply that was only the exercise becomes empty (the later fallbacks supply a real explanation)', () => { expect(dropStackedTasks(SF4).text).toBe('') })
})

describe('ordinary instruction is not touched', () => {
  it.each([
    'Identify the independent clause.',
    'Identify the independent clause and combine it with the dependent clause using because.',
    'Draw an arrow from the less electronegative atom toward the more electronegative one.',
    'To find the net dipole, add the bond dipoles as vectors.',
    '1. **Identify the independent clause** – this is the part that can stand alone.',
    'Compare the two cases in it and notice which one cancels.',
    'The molecule is bent, so the dipoles add.',
  ])('%s', (s) => { expect(isStackedTask(s)).toBe(false); expect(dropStackedTasks(s).text).toBe(s) })
})

describe('the route applies it to a reply that carries no card, grade or practice request', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('wired in the reply hygiene, guarded by the three conditions', () => {
    const i = route.indexOf("import('@/lib/teaching/stackedTask')")
    expect(i).toBeGreaterThan(0)
    expect(route.slice(i - 420, i)).toMatch(/mcqGradeHoisted === null && !mcqHoisted && !turnIntent\.wantsPractice/)
    expect(route.slice(i, i + 500)).toMatch(/done\.push\('stacked-task'\)/)
  })
})
