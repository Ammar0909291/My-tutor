/**
 * A learner refusing the side topic closes the detour, even without "back to"
 * (real-learner run 2, 2026-09-30: Bohr model held on an angular-momentum
 * detour through "stop chair please"; Gas Laws held on a hyperbola detour
 * through "i only want gas").
 */
import { describe, it, expect } from 'vitest'
import { decideExcursion, parseExcursionState } from '@/lib/teaching/excursion'
import { isSideTopicRejection } from '@/lib/teaching/visual/session'

const open = parseExcursionState({
  active: true, targetConceptId: 'phys.mech.angular-momentum', targetTopicTitle: null,
  returnToConceptId: 'chem.atomic.bohr-model', turns: 1,
})

const decide = (message: string) => decideExcursion({
  state: open, message, lessonConceptId: 'chem.atomic.bohr-model', requestedConceptId: null,
} as Parameters<typeof decideExcursion>[0])

describe('refusing the side topic', () => {
  it.each([
    'stop chair please. so big jump give blue, small jump give red? give me bohr question',
    'I DONT WANT CHAIR',
    'chair? i ask about atom colour light. how electron make light?',
    'too hard math. i only want gas. you not answer hot balloon',
    'no hyperbola please!!',
  ])('%j closes the detour', (m) => {
    expect(isSideTopicRejection(m)).toBe(true)
    const d = decide(m)
    expect(d.transition).toBe('closed-returned')
    expect(d.targetConceptId).toBe('chem.atomic.bohr-model')
  })

  it.each([
    'why does the chair spin faster?',
    'the electron stops radiating in that orbit',
    'i think the ball stop because friction',
    'ok what is the next part',
  ])('%j does not', (m) => {
    expect(isSideTopicRejection(m)).toBe(false)
  })

  it('with no detour open, a refusal changes nothing', () => {
    const d = decideExcursion({
      state: parseExcursionState(null), message: 'stop chair please',
      lessonConceptId: 'chem.atomic.bohr-model', requestedConceptId: null,
    } as Parameters<typeof decideExcursion>[0])
    expect(d.justClosed).toBe(false)
  })
})
