/**
 * Three channels that still gave a simulation's answers away.
 *
 * 2026-09-30 learner baseline, P3 (phys.wave.pendulum, real account, phone):
 *  1. The lesson OPENING said "the mass of the bob and the size of the swing
 *     angle (as long as it stays small) do not affect T" — before either
 *     prediction. The backstop ran only on chat turns.
 *  2. After the learner tapped "It increases by a factor of √2", the reply
 *     narrated both experiments: "the period, does not change; the heavier bob
 *     swings in exactly the same amount of time" and "Because the period
 *     depends on the square‑root of the length, the period becomes twice as
 *     large". The tap contains a digit, so it read as a reported measurement
 *     and the backstop stood down.
 *  3. "square‑root" was written with U+2011, so "square root of" never matched.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { stripGiveawaysFor, simulationForConcept } from '@/lib/teaching/visual/simulationPrompt'

const sim = simulationForConcept('phys.wave.pendulum')

const OPENING =
  'A simple pendulum is a small heavy bob hanging on a light string. The time for one full swing is called the period, T. ' +
  'For small swings, the mass of the bob and the size of the swing angle (as long as it stays small) do not affect T. ' +
  'Gravity pulls the bob back toward the middle, and that is what keeps it swinging.'

const REPLY =
  'Take a look at the pendulum you’re seeing: the string is L = 1.00 m, the bob is 0.5 kg, and it’s released from a 10° angle.\n\n' +
  'First, imagine swapping the 0.5 kg bob for a much heavier one—say, 2 kg—while keeping the string length and the release angle exactly the same. ' +
  'You’ll notice that the time for one complete swing, the period, does not change; the heavier bob swings in exactly the same amount of time as the lighter one. ' +
  'The extra weight gives a larger gravitational pull, but it also gives the bob more inertia, and those two effects cancel out.\n\n' +
  'Now, keep the bob at 0.5 kg and the angle at 10°, but make the string four times longer. When you run the simulation, the swing takes longer. ' +
  'Because the period depends on the square‑root of the length, the period becomes twice as large as before.'

describe('the concept\'s own simulation is found for the opening', () => {
  it('phys.wave.pendulum is the pendulum experiment', () => {
    expect(sim?.predictions.map((p) => p.id)).toEqual(expect.arrayContaining(['heavier-bob', 'wider-swing']))
  })

  it('a concept without a simulation strips nothing', () => {
    expect(simulationForConcept('chem.found.significant-figures')).toBeNull()
  })
})

describe('1 — the opening no longer answers the predictions', () => {
  it('removes the mass/angle sentence and keeps the teaching', () => {
    const r = stripGiveawaysFor(sim, OPENING, '')
    expect(r.text).not.toMatch(/do not affect T/)
    expect(r.text).toContain('Gravity pulls the bob back')
  })

  it('lesson-init runs the backstop', () => {
    const src = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    expect(src).toContain('stripGiveawaysFor(simulationForConcept(topicSlug), routed.text')
  })
})

describe('2 — a quiz answer with a digit is not a measurement', () => {
  const quiz = { question: 'If you double the length of a simple pendulum, what happens to the period?' }

  it('the mass outcome the quiz did not ask about is removed', () => {
    const r = stripGiveawaysFor(sim, REPLY, 'It increases by a factor of √2', { answeredQuiz: quiz })
    expect(r.text).not.toMatch(/does not change; the heavier bob/)
    expect(r.text).not.toMatch(/cancel out/)
  })

  it('what the quiz asked about (length) may still be explained', () => {
    const r = stripGiveawaysFor(sim, REPLY, 'It increases by a factor of √2', { answeredQuiz: quiz })
    expect(r.text).toMatch(/square‑root of the length/)
  })

  it('a typed measurement still stands the backstop down', () => {
    expect(stripGiveawaysFor(sim, REPLY, 'I measured 2.01 s').removed).toEqual([])
  })

  it('the chat route passes the graded quiz question', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(src.split('answeredQuiz: mcqGradeHoisted && pendingMcqHoisted ? { question: pendingMcqHoisted.question } : null').length - 1).toBe(2)
  })
})

describe('3 — typographic hyphens no longer hide a giveaway', () => {
  it('"square‑root" (U+2011) matches like "square root"', () => {
    const r = stripGiveawaysFor(sim, 'Pendulums swing back and forth all day long. The period depends on the square‑root of the length.', 'ok')
    expect(r.removed).toHaveLength(1)
  })
})
