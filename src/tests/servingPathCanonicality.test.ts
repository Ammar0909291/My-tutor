/**
 * Serving-path canonicality — regression lock, updated for the Library
 * Mode cleanup that made Explanation Memory the ONLY authored-content
 * serving path in route.ts (EDUCATIONAL_BRAIN_BIBLE.md §6.3).
 *
 * History: two authored-content mechanisms used to sit in the chat-turn
 * pipeline —
 *   - Explanation Memory (`assembleLesson()`, AssetIdentity-backed) — the
 *     canonical serving path; can skip the LLM call entirely for a turn.
 *   - Package Runtime PoC (`buildLessonContextForConcept()`, compiled
 *     Educational Packages) — prompt-context augmentation only; never
 *     skipped the LLM; was subordinate to Explanation Memory and never
 *     activated in any environment (ENABLE_PACKAGE_RUNTIME defaulted off).
 *
 * Package Runtime's route-level wiring has since been REMOVED (not just
 * left off-by-default) — a zero-behavior-change cleanup, since the flag
 * was never on anywhere. Package Runtime's own module, tests, compiler,
 * and compiled artifacts are untouched; only the route.ts call site that
 * invoked it was removed. Explanation Memory is now the sole
 * authored-content serving path in route.ts.
 *
 * These tests don't exercise route.ts (that needs a live DB) — they lock
 * in (a) Explanation Memory's default activation state, and (b) the
 * source-level fact that route.ts no longer reads ENABLE_PACKAGE_RUNTIME
 * or calls buildLessonContextForConcept at all, following the same
 * source-lock precedent used by libraryModeReviewDeduplication.test.ts.
 */
import { describe, it, expect, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { isExplanationMemoryEnabled } from '@/lib/teaching/assets'

const ORIGINAL_ENV = { ...process.env }

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

describe('serving-path defaults (Explanation Memory is canonical)', () => {
  it('Explanation Memory is ON by default — the canonical path is live unless explicitly disabled', () => {
    delete process.env.DISABLE_EXPLANATION_MEMORY
    expect(isExplanationMemoryEnabled()).toBe(true)
  })

  it('DISABLE_EXPLANATION_MEMORY=true is the only way to turn off the canonical path', () => {
    process.env.DISABLE_EXPLANATION_MEMORY = 'true'
    expect(isExplanationMemoryEnabled()).toBe(false)
  })

  it('any other value leaves the canonical path enabled (kill-switch semantics, not a generic boolean flag)', () => {
    process.env.DISABLE_EXPLANATION_MEMORY = 'false'
    expect(isExplanationMemoryEnabled()).toBe(true)
    process.env.DISABLE_EXPLANATION_MEMORY = '1'
    expect(isExplanationMemoryEnabled()).toBe(true)
  })
})

describe('route.ts structural lock: Package Runtime route-level wiring is fully removed', () => {
  const ROUTE_SOURCE = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
    'utf-8',
  )

  it('route.ts no longer reads process.env.ENABLE_PACKAGE_RUNTIME anywhere', () => {
    expect(ROUTE_SOURCE).not.toContain('process.env.ENABLE_PACKAGE_RUNTIME')
  })

  it('route.ts no longer calls buildLessonContextForConcept anywhere (mentions in prose comments are fine)', () => {
    expect(ROUTE_SOURCE).not.toMatch(/buildLessonContextForConcept\(/)
    expect(ROUTE_SOURCE).not.toContain("await import('@/lib/curriculum/packageRuntime')")
  })

  it('the legacy blueprint loader now runs unconditionally (no packageContextInjected gate remains)', () => {
    expect(ROUTE_SOURCE).not.toContain('packageContextInjected')
  })

  it('Explanation Memory (assembleLesson) is still called exactly once — the sole serving path', () => {
    const matches = ROUTE_SOURCE.match(/assembled = await assembleLesson\(/g) ?? []
    expect(matches).toHaveLength(1)
  })
})
