/**
 * A paragraph the learner has already read is not sent again (the C7 repeat
 * channel). Text is production: Physics Unit-1 certification, 2026-09-28,
 * phys.mech.normal-force — served from memory at slot 3, recited verbatim by
 * the model at slots 5 and 7.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { dropRepeatedParagraphs } from '@/lib/teaching/historyCompaction'

const MATTRESS = 'Rest a book on a mattress and you can see the mattress dent and push back up. A hard table does exactly the same thing — the dent is just far too small to see. That upward push from the surface is the normal force, and it always points straight out of the surface, not straight up. On a tilted ramp it points out of the ramp, at an angle. Its size adjusts to whatever is needed: press down on the book with your hand and the surface pushes back harder, without the book getting any heavier.'
const SLOT3 = `${MATTRESS}\n\nThe book is on a tilted ramp. Does the surface push straight up?`

describe('dropRepeatedParagraphs', () => {
  it('the production recital is dropped, leaving the rest', () => {
    const reply = `${MATTRESS}\n\nNow try the question below.`
    expect(dropRepeatedParagraphs(reply, [SLOT3])).toEqual({ text: 'Now try the question below.', dropped: 1 })
  })

  it('a reply that is only the recital empties (the caller supplies a fallback)', () => {
    expect(dropRepeatedParagraphs(MATTRESS, ['hello', SLOT3])).toEqual({ text: '', dropped: 1 })
  })

  it('a recital with a trailing edit is still caught', () => {
    const edited = MATTRESS.replace('without the book getting any heavier.', 'even though the book is no heavier.')
    expect(dropRepeatedParagraphs(edited, [SLOT3]).dropped).toBe(1)
  })

  it.each([
    ['short paragraphs are never touched', 'That upward push is the normal force.'],
    ['a new explanation is untouched', 'On a slope the normal force is mg cos θ, smaller than the weight, because only part of the weight presses into the surface; the rest pulls the book down the slope.'],
    ['a verdict paragraph may recur', `Not quite — the answer is: ${MATTRESS}`],
  ])('%s', (_, reply) => expect(dropRepeatedParagraphs(reply, [SLOT3, `Not quite — the answer is: ${MATTRESS}`]).dropped).toBe(0))

  it('no history, no change', () => {
    expect(dropRepeatedParagraphs(MATTRESS, [])).toEqual({ text: MATTRESS, dropped: 0 })
  })
})

describe('route wiring', () => {
  it('checks the uncompacted stored tutor messages and supplies a fallback', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const at = route.indexOf('dropRepeatedParagraphs(cleanText, priorTutor)')
    expect(at).toBeGreaterThan(0)
    expect(route.slice(at - 600, at)).toContain('historyScope.messages')
    expect(route.slice(at, at + 1200)).toContain('conceptFallbackText')
  })
})
