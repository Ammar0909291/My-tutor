/**
 * QA regression lock (2026-07-16 live browser pass): the lesson-opening
 * bootstrap instruction is persisted server-side as an ordinary USER
 * message; history restore must filter it so students never see the
 * internal prompt-engineering string as their own message — while never
 * swallowing genuine student messages.
 */
import { describe, it, expect } from 'vitest'
import { isInternalOpeningPrompt } from '@/lib/learn/internalPromptFilter'

describe('isInternalOpeningPrompt', () => {
  it('detects the English fresh-start template', () => {
    expect(isInternalOpeningPrompt(
      'Start the lesson on "Physics". Level: "e2e testing". Introduce yourself as "Tutor Max" and begin teaching. 3-4 sentences.',
    )).toBe(true)
  })

  it('detects the Russian and Hindi fresh-start templates', () => {
    expect(isInternalOpeningPrompt(
      'Начни урок по "Физика". Уровень: "новичок". Представься как "Репетитор Макс", поприветствуй и начни объяснение. 3-4 предложения.',
    )).toBe(true)
    expect(isInternalOpeningPrompt(
      '"Mathematics" ka lesson shuru karo. Level: "beginner". Apna parichay do aur pehla explanation do. 3-4 sentences.',
    )).toBe(true)
  })

  it('detects the continue-from-history variants', () => {
    expect(isInternalOpeningPrompt(
      'Hi! You were working on "SI Units and Measurement" (Measurement & Units). Last session: "covered base units". Continue from there. Level: "beginner". 3-4 sentences.',
    )).toBe(true)
    expect(isInternalOpeningPrompt(
      'Привет! Ты работал над темой "Дроби". В прошлый раз: "прошли эквивалентность". Продолжи с того места. Уровень: "новичок". 3-4 предложения.',
    )).toBe(true)
  })

  it('NEVER matches genuine student messages, even greeting-shaped ones', () => {
    for (const msg of [
      'What is a unit?',
      'Hi! Can you explain SI units again?',
      'Hi! Last session: I was confused about vectors',        // greeting + phrase but no Level/budget markers
      'My level: "beginner" — is that right?',
      'Start the lesson please',
      'Привет! Объясни ещё раз про дроби',
      'Namaste! Vectors samjhao',
    ]) {
      expect(isInternalOpeningPrompt(msg), msg).toBe(false)
    }
  })
})
