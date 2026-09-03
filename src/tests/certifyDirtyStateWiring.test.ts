/**
 * I-2 WIRING — certify.ts's own dirty-state check is now the SHARED,
 * WIDENED predicate, not its old narrower inline one.
 *
 * The old check fired only on `verified === true || checkCorrect > 0`. It
 * missed: `practiceCorrect > 0` with `checkCorrect === 0` (one graded answer
 * from a fabricated pass), a RESUMED session with both counters still at
 * zero, and a non-entry starting phase. This proves certifyConcept — the
 * live HTTP-driving harness itself, not a copy of its logic — now catches
 * all of these, by driving it against a stubbed fetch rather than by
 * re-testing detectDirtyState in isolation (already covered by
 * certificationMeasurementIdentity.test.ts).
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'fs'
import { certifyConcept, type ConceptTarget } from '../../scripts/math/certify'
import type { AnswerIndex } from '../../scripts/certification/answerSource'

const TARGET: ConceptTarget = {
  conceptId: 'phys.mech.newtons-first-law', lessonTitle: "Newton's First Law",
  lessonOrder: 18, unitTitle: 'Classical Mechanics',
}
const EMPTY_ANSWER_INDEX: AnswerIndex = {
  byQuestion: new Map(), stats: { probes: 0, distinctStems: 0, collisions: 0 }, fingerprint: 'test',
}

function stubLessonInit(mastery: Record<string, unknown>) {
  return vi.fn(async (url: string) => {
    if (String(url).includes('/api/learn/lesson-init')) {
      return {
        ok: true,
        json: async () => ({ text: 'opening', mastery, mcq: null, lessonComplete: null, provider: 'memory' }),
      } as Response
    }
    throw new Error(`unexpected fetch to ${url}`)
  })
}

describe('certifyConcept applies the WIDENED I-2 predicate, not the old narrow one', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('catches practiceCorrect > 0 with checkCorrect === 0 — the case the old check missed', async () => {
    vi.stubGlobal('fetch', stubLessonInit({ verified: false, phase: 'DEMONSTRATE', checkCorrect: 0, practiceCorrect: 2 }))
    // Drive one chat turn manually via the same stub shape certifyConcept expects
    // by having lesson-init ALSO serve as the first chat turn's response shape
    // (the stub answers every call identically, which is enough to reach the
    // turn-1 dirty check certifyConcept performs right after its first
    // /api/learn/chat POST).
    vi.stubGlobal('fetch', vi.fn(async (url: string) => ({
      ok: true,
      json: async () => ({
        text: 'x', mastery: { verified: false, phase: 'DEMONSTRATE', checkCorrect: 0, practiceCorrect: 2 },
        mcq: null, lessonComplete: null, provider: 'memory',
      }),
    } as Response)))
    const result = await certifyConcept(TARGET, 'cookie', 'session-1', EMPTY_ANSWER_INDEX, 238, false)
    expect(result.failed).toContain('DIRTY-STATE')
    expect(result.notes.join(' ')).toMatch(/practiceCorrect=2-at-turn-1/)
  })

  it('catches a resumed session even with both counters at zero — old check would have missed it', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({
        text: 'x', mastery: { verified: false, phase: 'OBSERVE', checkCorrect: 0, practiceCorrect: 0 },
        mcq: null, lessonComplete: null, provider: 'memory',
      }),
    } as Response)))
    const result = await certifyConcept(TARGET, 'cookie', 'session-1', EMPTY_ANSWER_INDEX, 238, /* sessionResumed */ true)
    expect(result.failed).toContain('DIRTY-STATE')
    expect(result.notes.join(' ')).toMatch(/session-resumed-not-fresh/)
  })

  it('a genuinely fresh, non-resumed session at an entry phase is NOT flagged dirty', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({
        text: 'x', mastery: { verified: false, phase: 'OBSERVE', checkCorrect: 0, practiceCorrect: 0 },
        mcq: null, lessonComplete: null, provider: 'memory',
      }),
    } as Response)))
    const result = await certifyConcept(TARGET, 'cookie', 'session-1', EMPTY_ANSWER_INDEX, 238, false)
    expect(result.failed).not.toContain('DIRTY-STATE')
  })
})

describe('source wiring — certify.ts calls the shared detectDirtyState, not its own copy', () => {
  it('imports detectDirtyState from measurementIdentity.ts', () => {
    const src = readFileSync('scripts/math/certify.ts', 'utf-8')
    expect(src).toMatch(/import\s*\{\s*detectDirtyState\s*\}\s*from\s*'\.\.\/certification\/measurementIdentity'/)
    expect(src).toMatch(/detectDirtyState\(/)
    // The old, narrower inline predicate must not have come back.
    expect(src).not.toMatch(/last\.mastery\?\.\s*verified\s*===\s*true\s*\|\|\s*\(last\.mastery\?\.\s*checkCorrect/)
  })
})
