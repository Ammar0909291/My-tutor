/**
 * Serving-path canonicality — regression lock for the 2026-07-16
 * architectural-ambiguity resolution (EDUCATIONAL_BRAIN_BIBLE.md §6.3).
 *
 * Two authored-content mechanisms sit in the chat-turn pipeline:
 *   - Explanation Memory (`assembleLesson()`, AssetIdentity-backed) — the
 *     canonical serving path; can skip the LLM call entirely for a turn.
 *   - Package Runtime PoC (`buildLessonContextForConcept()`, compiled
 *     Educational Packages) — prompt-context augmentation only; never
 *     skips the LLM; subordinate to Explanation Memory.
 *
 * The relationship depends entirely on each system's default activation
 * state. These tests don't exercise route.ts (that needs a live DB) — they
 * lock in the two flag defaults the Bible's canonicality section documents,
 * so a silent default flip can never invalidate the documented architecture
 * without a test failure pointing back here.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { isExplanationMemoryEnabled } from '@/lib/teaching/assets'

const ORIGINAL_ENV = { ...process.env }

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

describe('serving-path defaults (canonical vs. subordinate)', () => {
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

  it('Package Runtime is OFF by default — the subordinate context-augmentation path requires explicit opt-in', () => {
    delete process.env.ENABLE_PACKAGE_RUNTIME
    // route.ts's exact gate: `process.env.ENABLE_PACKAGE_RUNTIME === '1'`
    expect(process.env.ENABLE_PACKAGE_RUNTIME === '1').toBe(false)
  })

  it('the test environment matches both documented defaults simultaneously (the real coexistence state today)', () => {
    delete process.env.DISABLE_EXPLANATION_MEMORY
    delete process.env.ENABLE_PACKAGE_RUNTIME
    expect(isExplanationMemoryEnabled()).toBe(true)
    expect(process.env.ENABLE_PACKAGE_RUNTIME === '1').toBe(false)
  })
})
