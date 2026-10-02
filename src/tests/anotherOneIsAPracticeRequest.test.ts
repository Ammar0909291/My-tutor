/**
 * "ok another one" was not read as asking for another question.
 *
 * MEASURED LIVE 2026-10-02 (phys.mech.tension, real account): after three
 * answered quizzes the learner wrote "ok another one" and got a stored Brain
 * explanation with no question — asksForPractice matched nothing.
 */
import { describe, it, expect } from 'vitest'
import { asksForPractice } from '@/lib/teaching/masteryGate'

describe('short "another one" requests', () => {
  it.each([
    'ok another one', 'another one', 'another one?', 'ok another one please',
    'next one', 'give me another one', 'yes another', 'can you give me another one', "let's do another one",
  ])('%s', (m) => expect(asksForPractice(m)).toBe(true))
})

describe('things that are not', () => {
  it.each([
    'next', 'ok next', 'another one of these confuses me', 'is there another one like the lamp?',
    'I got another one wrong', 'one',
  ])('%s', (m) => expect(asksForPractice(m)).toBe(false))
})
