/**
 * A rhetorical why/how answered in the next sentence is not a question for the
 * learner (synthetic run 2026-09-25, phys.mech.newtons-third-law, CHECK — the
 * stray-question withhold cut 693 chars of teaching to 37).
 */
import { describe, it, expect } from 'vitest'
import { askedAnswerableQuestion } from '@/lib/teaching/answerableTurn'
import { dropAnswerableContent } from '@/lib/teaching/gateAssessment'

const PROD = "Two puzzles unlock the Third Law completely. First: if every force has an equal opposite partner, why doesn't everything cancel and nothing ever move? Because the two forces act on DIFFERENT objects — cancellation only happens between forces on the same body. Your push acts on the trolley; the trolley's push-back acts on YOU. Each object responds only to the forces on itself. Second: how does a rocket accelerate in empty space with nothing to push against? It carries its own something: it hurls exhaust gas backward (rocket pushes gas), and the pair force — gas pushes rocket — drives it forward."

describe('rhetorical why/how', () => {
  it('the production paragraph asks the learner nothing, so its teaching survives the withhold', () => {
    expect(askedAnswerableQuestion(PROD)).toBe(false)
    expect(dropAnswerableContent(PROD)).toBe(PROD)
  })
  it('a trailing real question after the same teaching is still trimmed, the teaching kept', () => {
    const t = PROD + ' Which object feels the bigger force when a truck hits a fly?'
    expect(askedAnswerableQuestion(t)).toBe(true)
    expect(dropAnswerableContent(t)).toBe(PROD)
  })
  it('a question addressed to the learner stays a question even when a statement follows', () => {
    expect(askedAnswerableQuestion('How would you find the acceleration? The diagram shows two forces.')).toBe(true)
    expect(askedAnswerableQuestion('Why does your hand hurt when you punch a wall? That is the question to think about.')).toBe(true)
  })
  it('a what-question followed by a statement is unchanged (only why/how are covered)', () => {
    expect(askedAnswerableQuestion('What is the net force on the box? The diagram shows two forces.')).toBe(true)
  })
})

describe('a scenario left without its question (synthetic run 2026-09-25, [gate-contract] log)', () => {
  it('the production paragraph loses the question AND its bare set-up; the teaching stays', () => {
    const teach = "That wasn't quite right for that particular question, but let's break down why. When a book sits on a table, its weight is the Earth pulling it down. The table pushes back up with a contact force called the normal force."
    const last = "Let's look at another everyday situation. Imagine you are standing on a skateboard and you throw a heavy medicine ball forward. What happens to you on the skateboard?"
    const out = dropAnswerableContent(teach + '\n\n' + last)
    expect(out).toContain('normal force')
    expect(out).not.toMatch(/skateboard|medicine ball|another everyday situation/)
  })
  it('a scenario followed by an explanation is teaching and stays', () => {
    const t = 'Imagine a car taking a sharp bend. Friction from the road provides the inward force that turns it. Which force keeps it on the curve?'
    expect(dropAnswerableContent(t)).toBe('Imagine a car taking a sharp bend. Friction from the road provides the inward force that turns it.')
  })
})
