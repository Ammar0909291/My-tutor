/**
 * Wave 1 (Runtime Guardian) — action procedure retrieval: every ActionType
 * decide() can emit maps to an authored Brain procedure.
 */
import { describe, it, expect } from 'vitest'
import { buildActionProcedureBlock } from '@/lib/teaching/actionProcedures'
import type { ActionType } from '@/lib/teaching-engine/types'

const ALL_ACTIONS: ActionType[] = [
  'VISUAL_EXPLANATION', 'STEP_BY_STEP_GUIDED', 'INTERACTIVE_QUESTIONING',
  'PROBLEM_SOLVING_SESSION', 'MISCONCEPTION_FIX', 'RAPID_REVIEW',
]

describe('buildActionProcedureBlock', () => {
  it('covers every ActionType the frozen decide() can emit — no silent gaps', () => {
    for (const a of ALL_ACTIONS) {
      const block = buildActionProcedureBlock(a)
      expect(block, a).toMatch(/ACTION PROCEDURE/)
      expect(block.length, a).toBeGreaterThan(200)
    }
  })

  it('demonstration is prediction-first and shows twice before naming', () => {
    const b = buildActionProcedureBlock('VISUAL_EXPLANATION')
    expect(b).toMatch(/prediction BEFORE any reveal/i)
    expect(b).toMatch(/TWICE before naming/i)
  })

  it('worked example fades through completion, never straight to solo', () => {
    const b = buildActionProcedureBlock('STEP_BY_STEP_GUIDED')
    expect(b).toMatch(/REASON for each step/)
    expect(b).toMatch(/self-explanation/i)
    expect(b).toMatch(/Never jump from a full worked example/i)
  })

  it('questioning carries the hard two-question ceiling (conversation engine)', () => {
    expect(buildActionProcedureBlock('INTERACTIVE_QUESTIONING')).toMatch(/never more than two questions in a row/i)
  })

  it('faded practice advances only on the fluency gate, never bare correctness', () => {
    const b = buildActionProcedureBlock('PROBLEM_SOLVING_SESSION')
    expect(b).toMatch(/fast \+ correct \+ confident/i)
    expect(b).toMatch(/never repeat an identical item/i)
  })

  it('misconception fix is the full ordered 7-step repair with no same-session certification', () => {
    const b = buildActionProcedureBlock('MISCONCEPTION_FIX')
    for (const step of ['ELICIT', 'COMMIT', 'COLLIDE', 'REPLACE', 'CONTRAST', 'APPLY']) {
      expect(b).toContain(step)
    }
    expect(b.indexOf('ELICIT')).toBeLessThan(b.indexOf('COLLIDE'))
    expect(b.indexOf('COLLIDE')).toBeLessThan(b.indexOf('CONTRAST'))
    expect(b).toMatch(/Do NOT certify the repair this session/i)
    expect(b).toMatch(/DIFFERENT collision case/i)
  })

  it('review is produce-the-answer with context cues, never "do you remember"', () => {
    const b = buildActionProcedureBlock('RAPID_REVIEW')
    expect(b).toMatch(/NEVER "do you remember/i)
    expect(b).toMatch(/encoding context/i)
  })
})
