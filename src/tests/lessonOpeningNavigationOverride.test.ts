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
  it('the collision is GONE: the instruction no longer sends a trigger phrase', () => {
    // UPDATED 2026-08-23, and this is a strengthening, not a relaxation.
    //
    // This test used to assert that the collision EXISTED — that the route
    // sends `Let's restart lesson "<title>"` while the rule refuses exactly
    // that phrase — because at the time the only mitigation was the prompt
    // override, and the collision was the thing worth pinning.
    //
    // Live measurement then showed the override is not sufficient on its own:
    // 1 opening in 12 still returned the refusal as the whole turn. The
    // collision has since been removed AT SOURCE, so asserting it still exists
    // would now fail for the right reason. What must be pinned instead is that
    // it stays removed: the rule still refuses the phrase (unchanged, and the
    // chat route depends on it) and the instruction no longer contains it.
    const prompt = buildTutorSystemPrompt('Physics', 'S', 'beginner', 'learn', null, 'en', null)
    expect(prompt).toContain('restart lesson')
    expect(prompt).toContain('Use the lesson navigation panel at the top to switch lessons.')
    const fn = ROUTE.slice(ROUTE.indexOf('function buildInstruction'))
    expect(fn).not.toMatch(/restart lesson "/i)
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
    // Asserted as an imported SYMBOL rather than as an exact import-line
    // spelling: the line legitimately grew a second import when the
    // navigation-refusal backstop was added, and pinning its formatting
    // measures nothing about the override being wired.
    expect(ROUTE).toMatch(/import \{[^}]*\bbuildLessonOpeningOverride\b[^}]*\} from '@\/lib\/ai\/client'/)
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
