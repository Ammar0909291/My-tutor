/**
 * AN UNRESOLVED PROSE MCQ MUST NOT BE ANSWERED WITH A CANNED MEMORY EXPLANATION.
 *
 * ── THE MEASURED DEFECT (real-account adversarial study, phys.mech.
 * conservation-of-momentum, 2026-09-13) ─────────────────────────────────────
 * Turn 5 served a prose-only multiple-choice question (four lettered options,
 * no `<!--MCQ-->` tag — `hasProseMultipleChoice` matches this shape). The
 * learner's reply was meant to be handled by `buildProseMcqReplyDirective`,
 * which tells the model to restate the SAME question WITH the tag so it
 * becomes gradeable. But turn 6's response came back `provider: "memory"`,
 * `llmCallCount: 0` — served entirely from Explanation Memory
 * (`assembleLesson`), a canned asset with a brand-new, unrelated MCQ
 * attached. No LLM generation happened that turn, so the prompt directive —
 * which only an LLM call can act on — never had anything to influence. The
 * learner's attempt at the prose MCQ was silently abandoned: not graded (no
 * false credit — confirmed no SIGNAL exists on a memory-served turn), but
 * never engaged with either.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────
 * `priorTurnUnresolvedProseMcqHoisted` (route.ts) is set from the exact same
 * `hasProseMultipleChoice` check that already drives the prompt directive,
 * and is now ALSO wired into the Explanation Memory exclusion chain
 * alongside the pre-existing `firstLessonActiveHoisted`/`recoveryKeyHoisted`
 * exclusions — each of which already forces the LLM path for a reason a
 * stored asset cannot honor. This is the same pattern, applied to a fourth
 * reason: a stored asset cannot restate and re-tag a question it did not ask.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'

describe('hasProseMultipleChoice correctly identifies the T5 shape', () => {
  const t5Text =
    'A) The ball’s speed changes, so momentum must change \n'
    + 'B) The wall exerts an external force on the ball, altering its momentum \n'
    + 'C) Momentum is always conserved, so the ball’s momentum cannot change \n'
    + 'D) The ball’s mass changes during the collision, affecting momentum'

  it('flags the real captured prose-MCQ turn', () => {
    expect(hasProseMultipleChoice(t5Text)).toBe(true)
  })

  it('does not flag ordinary teaching prose (no false exclusions)', () => {
    const ordinaryText =
      'Momentum is conserved in a closed system: the total before a collision '
      + 'equals the total after, even when kinetic energy is lost to heat.'
    expect(hasProseMultipleChoice(ordinaryText)).toBe(false)
  })
})

describe('the route forces the LLM path when the prior turn asked an unresolved prose MCQ', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('declares priorTurnUnresolvedProseMcqHoisted, defaulting false', () => {
    expect(ROUTE).toMatch(/let priorTurnUnresolvedProseMcqHoisted = false/)
  })

  it('sets it from the same priorProse check that drives buildProseMcqReplyDirective', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('if (priorProse) {'),
      ROUTE.indexOf('if (priorProse) {') + 200,
    )
    expect(block).toMatch(/systemPrompt \+= buildProseMcqReplyDirective\(true\)/)
    expect(block).toMatch(/priorTurnUnresolvedProseMcqHoisted = true/)
  })

  it('excludes Explanation Memory serving on that turn, alongside the existing exclusions', () => {
    const chainStart = ROUTE.indexOf("memoryFallbackReason = 'Explanation Memory disabled")
    const chain = ROUTE.slice(chainStart, chainStart + 2200)
    expect(chain).toMatch(/firstLessonActiveHoisted/)
    expect(chain).toMatch(/recoveryKeyHoisted/)
    expect(chain).toMatch(/else if \(priorTurnUnresolvedProseMcqHoisted\) \{/)
    expect(chain).toMatch(/memoryFallbackReason = 'Prior turn asked an unresolved prose MCQ'/)
    // `memoryState` must still be computed on this branch (unlike the
    // first-lesson/recovery exclusions) so the deterministic mastery gate
    // can still select a real authored probe via `gateEligible && memoryState`
    // — only the canned-explanation path (assembleLesson) is skipped.
    expect(chain).toMatch(/memoryState = buildStudentState\(\{/)
    expect(chain).not.toMatch(/assembleLesson\(/)
    // Ordering: the new exclusion must come BEFORE the `else {` that actually
    // calls assembleLesson, or it would never take effect.
    const exclusionIdx = ROUTE.indexOf('priorTurnUnresolvedProseMcqHoisted', chainStart)
    const assembleIdx = ROUTE.indexOf('assembleLesson(', chainStart)
    expect(exclusionIdx).toBeGreaterThan(chainStart)
    expect(assembleIdx).toBeGreaterThan(exclusionIdx)
  })
})
