/**
 * "give me another problem" was answered with a stored essay and no question.
 *
 * MEASURED LIVE 2026-10-02 (chem.found.stoichiometry, real account): at
 * DEMONSTRATE the authored probe was declined by the surplus rule
 * ([gate-assessment] below-guide-no-surplus, poolSize 3) — correctly, so
 * mastery stays reachable — and D1-MEMORY-HIT then served a stored Brain
 * explanation (provider=memory, llmCallCount 0). The learner asked for a
 * problem and got none. With no authored quiz attached, a practice request now
 * takes the model path, where its own question at a non-gate phase cannot
 * touch mastery (inventedProbeGuard: phase-does-not-count).
 *
 * Structural, like proseMcqMemoryBypass.test.ts: the turn harness has no
 * explanation-memory store.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('a practice request without an authored quiz is never memory-served', () => {
  it('declares the predicate from the turn\'s own reading and the gate result', () => {
    expect(ROUTE).toContain('const practiceWithoutQuiz = turnIntent.wantsPractice && gateMcqHoisted === null')
  })

  it('is ANDed into every serveFromMemory decision', () => {
    const decisions = ROUTE.match(/serveFromMemory = [^\n]*/g) ?? []
    const memoryDecisions = decisions.filter((d) => d.includes('assembled !== null'))
    expect(memoryDecisions.length).toBe(3)
    for (const d of memoryDecisions) expect(d).toContain('!practiceWithoutQuiz')
  })

  it('records why memory was skipped', () => {
    expect(ROUTE).toContain("memoryFallbackReason = 'Practice requested and no authored question attached'")
  })

  it('is decided after the gate has chosen (or declined) its probe', () => {
    expect(ROUTE.indexOf('gateMcqHoisted = converted')).toBeLessThan(ROUTE.indexOf('const practiceWithoutQuiz'))
  })
})
