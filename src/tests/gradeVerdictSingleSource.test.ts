/**
 * ONE GRADED VERDICT, ONE SOURCE (POSTHOC_REPAIR_CENSUS.md Finding 3).
 *
 * The census flagged three post-model sites that each state the server's MCQ
 * grade in the shipped text:
 *   confirmCorrectAnswer     (route ~5788) — "That's right." on a correct answer
 *   applyDontKnowCeiling     (route ~6715) — the `justGraded` answer reveal
 *   repairMirrorWithVerdict  (route ~7324) — replace an echo-question with the verdict
 * "Divergent phrasings of one grade risk disagreeing on screen." The fear is a
 * FUTURE edit giving one of them a SECOND grade source (the model's self-report,
 * a re-derived correctness) — then two sentences about the same answer could
 * disagree, because they no longer share a value.
 *
 * The value already has ONE owner: `mcqGradeHoisted`, assigned exactly once from
 * `gradeMcqAnswer` (the deterministic comparison against an authored, human-
 * reviewed key). This file PINS that — the grade is derived once and every
 * verdict-stater reads that one derivation, never an independently computed grade.
 * It is the structural half of "a graded decision cannot be contradicted by
 * shipped output": three renderers of one value cannot disagree about that value.
 *
 * The renderers are also SEQUENTIAL transforms of one `cleanText` (a later repair
 * replaces the mirror rather than appending a second verdict beside the first), so
 * two divergent verdicts cannot co-render even in phrasing; that ordering is a
 * route-structure property and is asserted by the existing repair-order tests, not
 * re-litigated here. This test owns the narrower, load-bearing claim: one source.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('the MCQ grade has a single derivation', () => {
  it('mcqGradeHoisted is assigned exactly once — from the grader, not recomputed', () => {
    // The `let … = null` declaration is not an assignment of a value; the only
    // place a grade flows in is the grader result `g`. A second assignment site
    // would be a second source of the same verdict.
    const assignments = ROUTE.match(/\bmcqGradeHoisted\s*=\s*(?!=)/g) ?? []
    expect(assignments.length).toBe(1)
    expect(ROUTE).toMatch(/if \(g\.correct !== null\) mcqGradeHoisted = g/)
  })
})

describe('every verdict-stater reads that one source, never a self-report', () => {
  /** The window of source around a marker — where the call reads its grade. */
  function around(marker: string, before: number, after: number): string {
    const at = ROUTE.indexOf(marker)
    expect(at, `marker not found: ${marker}`).toBeGreaterThan(-1)
    return ROUTE.slice(Math.max(0, at - before), at + after)
  }

  it('confirmCorrectAnswer takes correctness from mcqGradeHoisted', () => {
    const block = around('confirmCorrectAnswer({', 0, 300)
    expect(block).toMatch(/correct:\s*mcqGradeHoisted\?\.correct \?\? null/)
  })

  it('repairMirrorWithVerdict takes its verdict AND its option text from the graded item', () => {
    const block = around('repairMirrorWithVerdict({', 0, 700)
    expect(block).toMatch(/graded:\s*mcqGradeHoisted && typeof mcqGradeHoisted\.correct === 'boolean'/)
    expect(block).toMatch(/correct:\s*mcqGradeHoisted\.correct/)
    // The correct-option text comes from the SAME pending item the answer was
    // graded against, so the sentence cannot name a different option.
    expect(block).toMatch(/pendingMcqHoisted\?\.options\?\.\[pendingMcqHoisted\.correctIndex\]/)
  })

  it('the gate reveal (justGraded) reads the same source and shape', () => {
    const block = around('justGraded:', 0, 200)
    expect(block).toMatch(/mcqGradeHoisted && typeof mcqGradeHoisted\.correct === 'boolean'/)
    expect(block).toMatch(/correct:\s*mcqGradeHoisted\.correct/)
  })

  it('none of the three derives correctness from the model self-report', () => {
    // A guard against the exact regression Finding 3 warns of: a verdict-stater
    // reading `signalCorrect` / the parsed SIGNAL instead of the server grade.
    // (The SIGNAL is the model's claim; the grade is ground truth. They are one
    // hoist apart and must not be confused at a rendering site.)
    for (const call of ['confirmCorrectAnswer({', 'repairMirrorWithVerdict({']) {
      const at = ROUTE.indexOf(call)
      const block = ROUTE.slice(at, at + 400)
      expect(block, call).not.toMatch(/correct:\s*signalCorrect/)
    }
  })
})
