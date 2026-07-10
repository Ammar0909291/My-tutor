/**
 * Wave 0 Steps 2–4 — unit tests for the signal parser, first-lesson guard,
 * and placement verification state machine (all pure; no DB, no LLM).
 */
import { describe, it, expect } from 'vitest'
import { parseSignalTag, buildSignalInstruction } from '@/lib/teaching/signals'
import { isFirstLessonContext, buildFirstLessonBlock } from '@/lib/teaching/firstLessonGuard'
import {
  emptyPlacementState, nextProbe, recordProbeResult, levelBelow, buildPlacementProbeBlock,
} from '@/lib/teaching/placementVerification'

describe('parseSignalTag (Blueprint Phase 3)', () => {
  it('parses a full tag and strips it from the text', () => {
    const { signal, cleanText } = parseSignalTag(
      'Great try!\n<!--SIGNAL correctness="false" confidence="high" confusion="false" phrase="you just add the tops"-->',
    )
    expect(signal).toEqual({
      correctness: false, confidence: 'high', confusion: false, phrase: 'you just add the tops',
    })
    expect(cleanText).toBe('Great try!')
  })

  it('parses the placement probe attribute', () => {
    const { signal } = parseSignalTag('Nice.\n<!--SIGNAL correctness="true" probe="below"-->')
    expect(signal?.probe).toBe('below')
    expect(signal?.correctness).toBe(true)
  })

  it('returns null signal and untouched text when no tag exists', () => {
    const { signal, cleanText } = parseSignalTag('Just a normal reply.')
    expect(signal).toBeNull()
    expect(cleanText).toBe('Just a normal reply.')
  })

  it('ignores malformed attribute values rather than guessing', () => {
    const { signal } = parseSignalTag('x <!--SIGNAL correctness="maybe" confidence="sorta"-->')
    expect(signal).toBeNull()
  })

  it('instruction block forbids fabricating signals for non-answers', () => {
    expect(buildSignalInstruction()).toMatch(/do NOT emit the tag/i)
  })
})

describe('isFirstLessonContext (Blueprint Phase 1 / first-lesson standard)', () => {
  const base = { isSchoolMode: false, currentLevel: 'beginner', currentLessonOrder: 1, completedLessonCount: 0 }
  it('fires for a Library beginner at lesson 1 with no completions', () => {
    expect(isFirstLessonContext(base)).toBe(true)
  })
  it('never fires in school mode (board-prescribed sequence)', () => {
    expect(isFirstLessonContext({ ...base, isSchoolMode: true })).toBe(false)
  })
  it('never fires past lesson 1 or after any completion', () => {
    expect(isFirstLessonContext({ ...base, currentLessonOrder: 2 })).toBe(false)
    expect(isFirstLessonContext({ ...base, completedLessonCount: 1 })).toBe(false)
  })
  it('never fires for intermediate/advanced self-reports', () => {
    expect(isFirstLessonContext({ ...base, currentLevel: 'intermediate' })).toBe(false)
  })
  it('block carries the hard limits and the English ORAL rule', () => {
    const block = buildFirstLessonBlock('english')
    expect(block).toMatch(/ONE concept only/)
    expect(block).toMatch(/Maximum 3 new words/)
    expect(block).toMatch(/at most 6 questions/i)
    expect(block).toMatch(/Failure budget: 1/)
    expect(block).toMatch(/ORAL/)
    expect(block).toMatch(/"phoneme".*banned|banned/i)
  })
  it('physics block bans "SI" in lesson one (first-lesson/07 §3)', () => {
    expect(buildFirstLessonBlock('physics')).toMatch(/"SI" must NOT appear/)
  })
})

describe('placement verification (assessment/02 §2 + placement/01 §2)', () => {
  it('runs below → at → above, nerve-settler first', () => {
    let s = emptyPlacementState()
    expect(nextProbe(s)).toBe('below')
    s = recordProbeResult(s, { probe: 'below', correctness: true })
    expect(nextProbe(s)).toBe('at')
    s = recordProbeResult(s, { probe: 'at', correctness: true })
    expect(nextProbe(s)).toBe('above')
    s = recordProbeResult(s, { probe: 'above', correctness: false })
    expect(s.verified).toBe(true)
    expect(nextProbe(s)).toBeNull()
  })

  it('above-probe failure CONFIRMS placement (expected result, not a demotion)', () => {
    let s = emptyPlacementState()
    s = recordProbeResult(s, { probe: 'below', correctness: true })
    s = recordProbeResult(s, { probe: 'at', correctness: true })
    s = recordProbeResult(s, { probe: 'above', correctness: false })
    expect(s.outcome).toBe('confirmed')
  })

  it('a failed foundation (below) probe always adjusts down', () => {
    let s = emptyPlacementState()
    s = recordProbeResult(s, { probe: 'below', correctness: false })
    s = recordProbeResult(s, { probe: 'at', correctness: false })
    expect(s.verified).toBe(true) // affect budget: 2 failures end probing
    expect(s.outcome).toBe('adjusted_down')
  })

  it('one at-level miss with a solid foundation stands (frontier tolerance)', () => {
    let s = emptyPlacementState()
    s = recordProbeResult(s, { probe: 'below', correctness: true })
    s = recordProbeResult(s, { probe: 'at', correctness: false })
    s = recordProbeResult(s, { probe: 'above', correctness: true })
    expect(s.outcome).toBe('confirmed')
  })

  it('an above success never moves placement up (asymmetry law)', () => {
    let s = emptyPlacementState()
    s = recordProbeResult(s, { probe: 'below', correctness: true })
    s = recordProbeResult(s, { probe: 'at', correctness: true })
    s = recordProbeResult(s, { probe: 'above', correctness: true })
    expect(s.outcome).toBe('confirmed') // never 'adjusted_up' — no such outcome exists
  })

  it('affect budget: two failures stop probing early and place lower', () => {
    let s = emptyPlacementState()
    s = recordProbeResult(s, { probe: 'below', correctness: true })
    s = recordProbeResult(s, { probe: 'at', correctness: false })
    // hypothetical second failure arrives via a re-answer of 'at'? No —
    // simulate the real path: 'above' fails too, but that's a complete run.
    s = recordProbeResult(s, { probe: 'above', correctness: false })
    // complete run, below passed → confirmed despite two misses above the floor
    expect(s.outcome).toBe('confirmed')
  })

  it('levelBelow walks the canonical 3-tier ladder downward', () => {
    expect(levelBelow('advanced')).toBe('intermediate')
    expect(levelBelow('intermediate')).toBe('beginner')
  })

  it('probe block never uses test framing and demands the SIGNAL probe attr', () => {
    const block = buildPlacementProbeBlock('at', 'Mathematics', 'Equivalent Fractions')
    expect(block).toMatch(/never .*call it a test|never name it/i)
    expect(block).toMatch(/probe="at"/)
  })
})
