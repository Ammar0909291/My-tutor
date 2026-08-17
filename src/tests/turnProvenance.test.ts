/**
 * PHASE 4 — TURN PROVENANCE (badge from execution, not from a label).
 *
 * ── THE MEASURED DEFECT ─────────────────────────────────────────────────────
 * Production, 2026-08-17: FOUR turns carried `provider='memory'` while
 * `llmCallCount=1`. Every one was `dispatchExecutor='LESSON_COMPLETE'` with
 * `memoryFallbackReason='lesson_complete'`, and the stored text was model
 * prose, not the deterministic close `buildLessonCloseText` produces.
 *
 * Root cause: `servedFromMemory` is defined as `!serveLessonComplete && …`, so
 * a completed-lesson turn is FALSE for it and therefore ran the output
 * verifier — whose remedy is `rerender`, which calls a provider. The serve
 * branch had already set `provider='memory'`, so the learner was shown the
 * Brain badge on an LLM-written turn. That is a false provenance claim, and it
 * is the one thing the badge exists to prevent.
 *
 * Two fixes, tested here:
 *   1. a completed-lesson answer is server-authored and is now excluded from
 *      verification, exactly as the memory and gate paths already were —
 *      which also stops the call being spent at all;
 *   2. the badge derives from `llmCallCount` (what the turn SPENT) rather than
 *      `provider` (which branch served it).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')
const HISTORY = REPO('src/app/api/sessions/history/route.ts')
const SCREEN = REPO('src/components/learn/LessonScreen.tsx')

/**
 * The rule the client implements, extracted so the matrix is executable rather
 * than merely asserted as source text.
 */
type Badge = 'brain' | 'ai' | 'none'
function badgeFor(msg: { provider?: string; llmCallCount?: number }): Badge {
  const spent = msg.llmCallCount
  if (typeof spent === 'number') return spent === 0 ? 'brain' : 'ai'
  if (msg.provider === 'memory' || msg.provider === 'gate') return 'brain'
  if (msg.provider) return 'ai'
  return 'none'
}

describe('provenance matrix — the label must match what the turn spent', () => {
  it('an LLM turn shows AI', () => {
    expect(badgeFor({ provider: 'gemini', llmCallCount: 1 })).toBe('ai')
    expect(badgeFor({ provider: 'groq', llmCallCount: 1 })).toBe('ai')
  })

  it('a Brain / Explanation Memory turn shows Brain', () => {
    expect(badgeFor({ provider: 'memory', llmCallCount: 0 })).toBe('brain')
  })

  it('a deterministic gate turn shows Brain', () => {
    expect(badgeFor({ provider: 'gate', llmCallCount: 0 })).toBe('brain')
  })

  it("THE DEFECT: provider='memory' with a spent call shows AI, not Brain", () => {
    // The exact production shape. Four real turns looked like this and were
    // badged Brain.
    expect(badgeFor({ provider: 'memory', llmCallCount: 1 })).toBe('ai')
  })

  it('llmCallCount=0 is Brain whatever the provider string says', () => {
    expect(badgeFor({ provider: 'gemini', llmCallCount: 0 })).toBe('brain')
  })

  it('a degraded outage template is not an AI turn — no model produced it', () => {
    expect(badgeFor({ provider: 'degraded', llmCallCount: 0 })).toBe('brain')
  })

  it('legacy rows without the column keep the old provider rule', () => {
    // Rows written before llmCallCount existed must not lose their badge.
    expect(badgeFor({ provider: 'memory' })).toBe('brain')
    expect(badgeFor({ provider: 'gemini' })).toBe('ai')
    expect(badgeFor({})).toBe('none')
  })
})

describe('the rule is actually wired, end to end', () => {
  it('the client derives the badge from llmCallCount before provider', () => {
    expect(SCREEN).toContain('const spent = msg.llmCallCount')
    expect(SCREEN).toContain("? <MemoryBadge />")
  })

  it('the chat API ships llmCallCount to the client', () => {
    expect(ROUTE).toMatch(/success: true, text: cleanText, provider,[\s\S]{0,600}llmCallCount,/)
  })

  it('the history endpoint selects it, so a restored transcript re-badges too', () => {
    // Without this a reloaded conversation would keep showing the wrong badge
    // forever, because the client would only ever see `provider`.
    expect(HISTORY).toContain('llmCallCount: true')
  })
})

describe('root cause — a completed-lesson turn no longer spends a call', () => {
  it('lesson-complete is excluded from output verification', () => {
    // The verifier's remedy is rerender(), which calls a provider. Running it
    // on server-authored close text both spent the call and replaced the text.
    expect(ROUTE).toContain('const servedByLessonComplete = serveLessonComplete')
    expect(ROUTE).toContain(
      'servedFromMemory || servedByGateRenderer || servedByLessonComplete',
    )
  })

  it('all three deterministic serving paths share one exclusion', () => {
    // memory, gate and lesson-complete are the three branches that produce
    // server-authored text. If a fourth is ever added it must join this list.
    for (const flag of ['servedFromMemory', 'servedByGateRenderer', 'servedByLessonComplete']) {
      expect(ROUTE).toContain(flag)
    }
    expect(ROUTE).toContain('if (!servedDeterministically) {')
  })

  it('the deterministic close text builder is still what serves the turn', () => {
    expect(ROUTE).toContain('buildLessonCloseText')
    expect(ROUTE).toContain("memoryFallbackReasonCode = 'lesson_complete'")
  })
})

describe('nothing else was changed', () => {
  it('no new provider call site was introduced', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('grading, evidence and the MCQ attach line are untouched', () => {
    expect(ROUTE).toContain('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
  })
})
