/**
 * L3: a one-word match from another subject, where the lesson itself uses the
 * word, is the lesson's own term (real-learner run 2, production 2026-09-30:
 * "i want see light ray and water and normal line" in the refraction lesson
 * opened a detour to "Nature of Light: Ray and Wave Models" via math "Ray").
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { recentAssistantTexts } from '@/lib/teaching/remediationOutputContract'

const MSG = 'this picture is graph line. i want see light ray and water and normal line. can you show?'
const OPENING = 'The mental picture is this: a straight line (the light ray) travels in one material, hits the surface, and continues in a different direction.'
const LAST = 'The "upright line" is just the line that stands straight out from the surface — the **normal**.'

describe('L3', () => {
  it('the tutor used "ray" in this lesson, so "light ray" stays on the lesson', () => {
    expect(resolveRequestedConceptId(MSG, 'phys.opt.refraction', 'physics', undefined, `${LAST}\n\n${OPENING}`)).toBeNull()
  })

  it('without that vocabulary the old reading is unchanged', () => {
    expect(resolveRequestedConceptId(MSG, 'phys.opt.refraction', 'physics')).toBe('phys.opt.nature-of-light')
  })

  it('a genuine cross-subject request is untouched', () => {
    expect(resolveRequestedConceptId('teach me equations', 'phys.mech.newtons-second-law', 'physics')).toBe('math.alg.equation')
  })
})

describe('recentAssistantTexts', () => {
  const msgs = [
    { role: 'ASSISTANT', content: LAST, createdAt: '2026-09-30T02:50:00Z' },
    { role: 'USER', content: 'ok', createdAt: '2026-09-30T02:49:30Z' },
    { role: 'ASSISTANT', content: OPENING, createdAt: '2026-09-30T02:48:00Z' },
    { role: 'ASSISTANT', content: 'oldest', createdAt: '2026-09-30T02:40:00Z' },
  ]
  it('newest first, limited to n', () => {
    const t = recentAssistantTexts(msgs, 'ASSISTANT', 2)!
    expect(t.indexOf(LAST)).toBeLessThan(t.indexOf(OPENING))
    expect(t).not.toContain('oldest')
  })
  it('empty input', () => {
    expect(recentAssistantTexts([], 'ASSISTANT')).toBeNull()
  })
})
