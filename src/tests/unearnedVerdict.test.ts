/** A verdict on an answer nobody gave is removed (unearnedVerdict.ts) — the two production replies of 2026-10-21 are quoted verbatim. */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { dropUnearnedVerdict, isUnearnedVerdictSentence } from '@/lib/teaching/unearnedVerdict'

const PHYSICS = `That’s correct—you’ve seen that the allowed energies are given by Eₙ = (n + ½) ℏ ω, so each step up adds exactly one ℏ ω.`
const BIOLOGY = `That’s right—you’ve linked the label at the bottom, “Sustained proliferative signalling,” to the idea that cancer cells keep telling themselves to divide.`

describe('a sentence that opens with a verdict is dropped', () => {
  it.each([
    ['physics, production', PHYSICS], ['biology, production', BIOLOGY],
    ['plain', `That's right.`], ['exactly', `Exactly! The levels are evenly spaced.`], ['correct with a dash', `Correct — the spacing is constant.`],
    ['filler first', `Yes, that's correct.`], ['well done', `Well done, that is the idea.`], ['you are right', `You're right.`], ['markdown bold', `**That's correct.** Energy is quantised.`],
  ])('%s', (_n, s) => { expect(isUnearnedVerdictSentence(s)).toBe(true) })

  it('removes the verdict and keeps the rest of the lead-in', () => {
    const out = dropUnearnedVerdict(`${PHYSICS} Let us see how that holds up when you try one yourself.`)
    expect(out.text).toBe('Let us see how that holds up when you try one yourself.')
    expect(out.dropped).toHaveLength(1)
  })
  it('a reply that was only a verdict becomes empty (the card on screen is the turn)', () => {
    expect(dropUnearnedVerdict(PHYSICS).text).toBe('')
    expect(dropUnearnedVerdict(BIOLOGY).text).toBe('')
  })
  it('keeps paragraph breaks', () => {
    expect(dropUnearnedVerdict(`${PHYSICS}\n\nHere is a question.`).text).toBe('Here is a question.')
  })
})

describe('teaching prose is not touched', () => {
  it.each([
    `The levels are evenly spaced, which is correct for a parabola.`,
    `A correct statement of the rule is that the spacing is ħω.`,
    `Right now we only need the spacing.`,
    `It is right to say that the ground state is not at rest.`,
    `That is the zero-point energy.`,
    `Great, so let's look at how the levels are spaced.`,
    `Let's see whether that holds. That's a good place to try a card.`,
  ])('%s', (s) => {
    expect(isUnearnedVerdictSentence(s)).toBe(false)
    expect(dropUnearnedVerdict(s).text).toBe(s)
  })
  it('text with no verdict is returned unchanged (same string)', () => {
    const t = 'Think of the ground state as the lowest rung.'
    expect(dropUnearnedVerdict(t).text).toBe(t)
  })
})

describe('the route applies it only where nothing was graded and the model wrote a lead-in only', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('guarded by: the engine card attached, no grade this turn, not an answer-first turn', () => {
    const i = route.indexOf("import('@/lib/teaching/unearnedVerdict')")
    expect(i).toBeGreaterThan(0)
    const before = route.slice(i - 520, i)
    expect(before).toMatch(/mcqHoisted === gateMcqHoisted && mcqGradeHoisted === null && !probeStarvationRelievedHoisted/)
    expect(before).toMatch(/learnerMessageNeedsModelReply\(message, \{ answeredPendingQuestion: false \}\)/)
  })
  it('and again after the regenerations: a one-sentence reply emptied by the first drop can be regenerated with the verdict back (production re-run, 2026-10-21)', () => {
    expect(route).toMatch(/unearnedVerdictScopeHoisted = !!mcqHoisted && mcqHoisted === gateMcqHoisted && mcqGradeHoisted === null/)
    const i = route.indexOf('dropVerdictAgain(cleanText)')
    expect(i).toBeGreaterThan(0)
    expect(route.slice(i - 400, i)).toMatch(/if \(unearnedVerdictScopeHoisted\)/)
    expect(route.slice(i, i + 200)).toMatch(/done\.push\('unearned-verdict'\)/)
  })
})
