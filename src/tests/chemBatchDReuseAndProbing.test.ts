/**
 * CHEM-079 / CHEM-041 / CHEM-039 (2026-10-05, chemistry real-learner run).
 * Inputs quoted from docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropPresupposedAttemptQuestions } from '@/lib/teaching/confirmBackRepair'
import { stripEmpathyOpener, usesAnalogy, analogyCapReached, voicesStruggle } from '@/lib/teaching/reuseCaps'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('CHEM-079 a question about an attempt never made', () => {
  it('the observed lone questions are removed', () => {
    for (const q of [
      'How did you decide that elements in the same row of the table should have very similar chemical behavior?',
      'Can you walk me through how you thought you could calculate the limiting molar conductivity of acetic acid?',
    ]) {
      const r = dropPresupposedAttemptQuestions(q)
      expect(r.removed.length, q).toBe(1)
      expect(r.text).toBe('')
    }
  })
  it('teaching and an ordinary question stay', () => {
    const t = 'Rows are periods; columns are groups. Elements in a group share outer-electron patterns. Which group is sodium in?'
    expect(dropPresupposedAttemptQuestions(t)).toEqual({ text: t, removed: [] })
  })
  it('route: only after "ok"/a request with nothing graded; an emptied reply is regenerated without a question', () => {
    expect(ROUTE).toMatch(/if \(mcqGradeHoisted === null && !serveLessonComplete\) \{[\s\S]{0,400}dropPresupposedAttemptQuestions/)
    expect(ROUTE).toMatch(/needsRepair\(cut\.text\) \? await repairStubReply\(cut\.text, 'gate-contract'\) : null\n\s+console\.warn\('\[presupposed-attempt\]/)
  })
})

describe('CHEM-041 empathy openers', () => {
  const reply = "test8, this is genuinely tricky, so let's slow right down and look at it from a fresh angle. Adsorption means molecules stick to the surface of a solid, not inside it."
  it('dropped on "ok" and on a request for numbers', () => {
    expect(stripEmpathyOpener(reply, 'ok', []).text).toBe('Adsorption means molecules stick to the surface of a solid, not inside it.')
    expect(stripEmpathyOpener(reply, 'give me example with numbers', []).stripped).toBe(true)
  })
  it('kept once for a voiced struggle, dropped when one of the last four replies already opened that way', () => {
    expect(voicesStruggle('i dont understand')).toBe(true)
    expect(stripEmpathyOpener(reply, 'i dont understand', []).stripped).toBe(false)
    const prior = ['Fine.', "I hear you — let's break it down into a tiny, simple piece. Atoms are small."]
    expect(stripEmpathyOpener(reply, 'i dont understand', prior).stripped).toBe(true)
  })
  it('never leaves an empty reply', () => {
    expect(stripEmpathyOpener('I hear you — this is genuinely tricky.', 'ok', []).stripped).toBe(false)
  })
})

describe('CHEM-039 analogy reuse', () => {
  it('the observed metaphors read as analogies; a plain explanation does not', () => {
    expect(usesAnalogy('Think of it like a packed subway car at rush hour.')).toBe(true)
    expect(usesAnalogy('Imagine a bank vault with a heavy door.')).toBe(true)
    expect(usesAnalogy('Removing a second electron needs more energy because the ion is already positive.')).toBe(false)
  })
  it('the cap is two analogies in the last four replies', () => {
    expect(analogyCapReached(['Imagine a dance floor.', 'Atoms.', 'Think of it like an elevator.'])).toBe(true)
    expect(analogyCapReached(['Imagine a dance floor.', 'Atoms.', 'Ions.', 'Electrons.', 'Think of it like an elevator.'])).toBe(false)
  })
  it('route: both caps run on model replies only, and a no-analogy retry is kept only if it has none', () => {
    expect(ROUTE).toMatch(/if \(!serveLessonComplete && provider !== 'degraded' && provider !== 'memory'\) \{\n\s+try \{\n\s+const caps = await import\('@\/lib\/teaching\/reuseCaps'\)/)
    expect(ROUTE).toMatch(/const kept = retry && !caps\.usesAnalogy\(retry\)/)
  })
})
