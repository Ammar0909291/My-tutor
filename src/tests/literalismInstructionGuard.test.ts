/**
 * PCD-015/016/017/018/020/021 — the tutor took an instruction phrase
 * literally instead of performing the intended teaching action, or
 * substituted a generic off-domain analogy instead of grounding a transfer
 * question in the concept actually being taught.
 *
 * Physics + Chemistry real-student audit evidence (docs/qa/
 * PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md):
 *   - PCD-015: the tutor explained what "in other words" means instead of
 *     rephrasing.
 *   - PCD-018/PCD-020: "please teach from start" regressed the tutor past the
 *     assigned concept into unrelated prerequisites, or made it abandon the
 *     lesson to ask the learner to pick a new topic from a menu.
 *   - PCD-016: transfer/"change one thing" questions answered with a stock
 *     pendulum/recipe/bicycle example instead of a same-subject one.
 *
 * All six entries share one root cause and are closed with one shared
 * instruction (Principle 13 in `buildTutorSystemPrompt`) rather than six
 * concept-specific patches. This is a prompt-level fix — advisory, not a
 * server-enforced gate — so this test only pins that the instruction is
 * actually assembled into the prompt the model receives; it cannot prove the
 * model always follows it.
 */
import { describe, it, expect } from 'vitest'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

function englishPrompt() {
  return buildTutorSystemPrompt(
    'Chemistry', 'Asha', 'beginner', 'learn chemistry', null, 'en', null, undefined, 'beginner',
  )
}

describe('Principle 13 — take the request, never the words', () => {
  const prompt = englishPrompt()

  it('is present in the assembled English system prompt', () => {
    expect(prompt).toMatch(/13\. .*TAKE THE REQUEST, NEVER THE WORDS/)
  })

  it('names the exact literalism triggers found in the audit', () => {
    expect(prompt).toContain('"explain it differently"')
    expect(prompt).toContain('"teach me from the start"')
    expect(prompt).toContain('"teach me from the beginning"')
    expect(prompt).toContain('"in other words"')
  })

  it('explicitly forbids explaining the phrase itself', () => {
    expect(prompt).toMatch(/explain what the phrase .*itself means/)
  })

  it('explicitly forbids abandoning the anchored concept for topic selection', () => {
    expect(prompt).toMatch(/abandon the concept and ask them to pick a different topic/)
  })

  it('explicitly forbids regressing into unrelated deeper prerequisites', () => {
    expect(prompt).toMatch(/regress into unrelated deeper prerequisites/)
  })

  it('instructs grounding examples/analogies in the actual subject, not a generic stock one', () => {
    expect(prompt).toMatch(/never substitute a generic stock example/)
    expect(prompt).toContain('pendulum')
  })

  it('is not duplicated — appears exactly once', () => {
    const matches = prompt.match(/TAKE THE REQUEST, NEVER THE WORDS/g) ?? []
    expect(matches.length).toBe(1)
  })
})
