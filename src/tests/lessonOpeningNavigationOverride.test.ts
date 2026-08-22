/**
 * The lesson OPENING must not be refused as a navigation request.
 *
 * Reproduced live (physics, Lesson 39 -> 40): opening a lesson returned the
 * literal sentence "Use the lesson navigation panel at the top to switch
 * lessons." instead of a lesson introduction. Root cause: lesson-init sends
 * `Let's restart lesson "<title>" from the beginning.` as its user turn, and
 * the shared NAVIGATION RULE lists "restart lesson" among the phrases the model
 * must answer with exactly that sentence — so the endpoint refused its own
 * instruction. Opening the same lesson twice produced an introduction once and
 * the refusal the other time, which is the "sometimes no lesson introduction"
 * report.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { buildTutorSystemPrompt, buildLessonOpeningOverride } from '@/lib/ai/client'

const ROUTE = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')

describe('lesson-init opening override', () => {
  it('the collision is real: the shared prompt refuses the phrase lesson-init sends', () => {
    // Both halves asserted from the SOURCE, so this test fails if either the
    // rule's trigger list or the instruction wording changes — which is what
    // would silently re-open the defect.
    const prompt = buildTutorSystemPrompt('Physics', 'S', 'beginner', 'learn', null, 'en', null)
    expect(prompt).toContain('restart lesson')
    expect(prompt).toContain('Use the lesson navigation panel at the top to switch lessons.')
    expect(ROUTE).toContain('Let\'s restart lesson "${lessonTitle}" from the beginning.')
  })

  it('the override cancels the rule for this turn and names the lesson', () => {
    const o = buildLessonOpeningOverride('Angular Kinematics')
    expect(o).toMatch(/NOT A NAVIGATION REQUEST/i)
    expect(o).toMatch(/do NOT tell the student to use the lesson navigation panel/i)
    expect(o).toContain('Angular Kinematics')
  })

  it('the override asks for a real orientation, not just a greeting', () => {
    // The second live run named the lesson but gave no objective and no
    // outcome, which is the other half of the reported defect.
    const o = buildLessonOpeningOverride('Rotational Dynamics')
    expect(o).toMatch(/what it is about/i)
    expect(o).toMatch(/able to do by the end/i)
  })

  it('lesson-init appends it to the system prompt', () => {
    expect(ROUTE).toContain('buildLessonOpeningOverride(lessonTitle)')
    expect(ROUTE).toContain('buildLessonOpeningOverride, type LessonContext')
  })

  it('the CHAT route is untouched — it must still refuse navigation', () => {
    const chat = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(chat).not.toContain('buildLessonOpeningOverride')
    // And the rule itself still exists for that route to rely on.
    const prompt = buildTutorSystemPrompt('Physics', 'S', 'beginner', 'learn', null, 'en', null)
    expect(prompt).toContain('NAVIGATION RULE')
  })

  it('the override is applied for every teaching language', () => {
    // lesson-init appends it unconditionally; the localized prompts each carry
    // their own copy of the navigation rule, so a language-gated override would
    // leave ru/hi learners with the original defect.
    // Each localized prompt states the rule in its own words — en/hi use
    // "NAVIGATION RULE", ru uses "ПРАВИЛО НАВИГАЦИИ" — so all three learners
    // can hit this defect and a language-gated override would leave two of
    // them broken.
    const marker: Record<'en' | 'ru' | 'hi', string> = {
      en: 'NAVIGATION RULE', hi: 'NAVIGATION RULE', ru: 'ПРАВИЛО НАВИГАЦИИ',
    }
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const prompt = buildTutorSystemPrompt('Physics', 'S', 'beginner', 'learn', null, lang, null)
      expect(prompt).toContain(marker[lang])
    }
    expect(ROUTE).not.toMatch(/teachingLanguage === '\w+'\s*\?\s*buildLessonOpeningOverride/)
  })
})
