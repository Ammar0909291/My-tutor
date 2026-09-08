import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
  quickCheckMode, setQuickCheckMode, panelIsVisible, questionIsVisible,
  type QuickCheckWindowState,
} from '@/lib/learn/quickCheckWindow'
import { driveTurns, readLog } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

/**
 * DEFECT 2 — the required invariant: CLOSE IS VISUAL STATE ONLY.
 *
 * The hazard is concrete rather than theoretical: `setActiveMcq(null)` is the
 * ANSWERED path in LessonScreen, so a close routed through it would be
 * indistinguishable from answering and would discard a probe the server still
 * holds pending. These tests hold both halves — the presentation rule as
 * behaviour, and the server's own pending-probe contract through the real
 * chat route.
 */

const Q1 = 1_000
const Q2 = 2_000

describe('presentation state cannot reach assessment state', () => {
  it('the window module has NO imports — it can reach no MCQ, probe or mastery state', () => {
    const src = readFileSync(join(process.cwd(), 'src/lib/learn/quickCheckWindow.ts'), 'utf8')
    const code = src.split('\n').filter((l) => !/^\s*(\*|\/\*|\/\/)/.test(l))
    expect(code.some((l) => /^\s*import\b/.test(l))).toBe(false)
    for (const forbidden of ['setActiveMcq', 'sendMessage', 'mastery', 'fetch(', 'probe']) {
      expect(code.join('\n')).not.toContain(forbidden)
    }
  })

  // 1. active MCQ → close → reopen → the SAME pending MCQ remains available
  it('1. close then reopen restores the same question, which was never cleared', () => {
    let win: QuickCheckWindowState | null = null
    expect(quickCheckMode(win, Q1)).toBe('expanded')
    win = setQuickCheckMode(Q1, 'closed')
    expect(quickCheckMode(win, Q1)).toBe('closed')
    expect(panelIsVisible('closed')).toBe(false)
    // Nothing in this module can express "the MCQ is gone" — askedAt is still Q1.
    win = setQuickCheckMode(Q1, 'expanded')
    expect(quickCheckMode(win, Q1)).toBe('expanded')
    expect(questionIsVisible(quickCheckMode(win, Q1))).toBe(true)
  })

  // 2. active MCQ → minimize → restore
  it('2. minimize hides only the body; restore brings it back', () => {
    let win = setQuickCheckMode(Q1, 'minimized')
    expect(panelIsVisible(quickCheckMode(win, Q1))).toBe(true)   // header still shown
    expect(questionIsVisible(quickCheckMode(win, Q1))).toBe(false)
    win = setQuickCheckMode(Q1, 'expanded')
    expect(questionIsVisible(quickCheckMode(win, Q1))).toBe(true)
  })

  // 7 / 3. no MCQ is permanently disabled by close
  it('7. a NEXT question always arrives expanded, whatever was done to the last one', () => {
    for (const mode of ['closed', 'minimized', 'expanded'] as const) {
      const win = setQuickCheckMode(Q1, mode)
      expect(quickCheckMode(win, Q2)).toBe('expanded')
    }
  })

  it('a stale mode with no active question cannot hide anything', () => {
    expect(quickCheckMode(setQuickCheckMode(Q1, 'closed'), null)).toBe('expanded')
  })

  // 6. no duplicate MCQ is created by reopen
  it('6. reopening produces a mode, never a question — it cannot duplicate an MCQ', () => {
    const reopened = setQuickCheckMode(Q1, 'expanded')
    expect(Object.keys(reopened).sort()).toEqual(['askedAt', 'mode'])
    expect(reopened.askedAt).toBe(Q1)
  })

  it('the component reads this module rather than re-deriving the rule inline', () => {
    const tsx = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
    expect(tsx).toContain("from '@/lib/learn/quickCheckWindow'")
    expect(tsx).toContain('quickCheckModeFor(quickCheckWindow, activeMcq?.askedAt ?? null)')
    // The three controls, and nothing else, write the window state.
    const writes = [...tsx.matchAll(/setQuickCheckWindow\(([^)]*\))/g)].map((m) => m[1])
    expect(writes.length).toBe(4) // minimize, maximize, close, reopen chip
    for (const w of writes) expect(w).toContain('setQuickCheckMode(activeMcq.askedAt')
  })
})

/**
 * THE SERVER HALF. Closing sends nothing, so the strongest statement available
 * is the one the server already guarantees: a probe that was served and not
 * graded stays pending and is re-offered, and no counter moves. Driven through
 * the REAL route.
 */
const PROBES = [
  {
    assetId: 'p1', conceptId: 'chem.elect.galvanic-cell', stem: 'Which electrode is oxidised?',
    choices: [{ text: 'The anode', isCorrect: true }, { text: 'The cathode', isCorrect: false }],
  },
  {
    assetId: 'p2', conceptId: 'chem.elect.galvanic-cell', stem: 'Which way do electrons flow externally?',
    choices: [{ text: 'Anode to cathode', isCorrect: true }, { text: 'Cathode to anode', isCorrect: false }],
  },
]

describe('the server-side pending probe survives a turn in which it was not answered', () => {
  it('3/4/5. an unanswered probe is re-offered, consumes nothing, and moves no mastery counter', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const turns = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Here is the idea.' },
      // The learner did not answer — exactly the state a closed window leaves.
      { learnerSays: 'hold on, let me re-read that', modelReplies: 'Take your time.' },
      { learnerSays: 'still thinking', modelReplies: 'No rush.' },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    const served = turns.map((t) => (t.body.mcq as { question?: string } | null)?.question ?? null)
    const withQuestion = served.filter(Boolean)
    expect(withQuestion.length).toBeGreaterThan(0)

    // 5. nothing was consumed: the same probe is still the one on offer.
    const distinct = new Set(withQuestion)
    expect(distinct.size).toBe(1)

    // 4. no mastery was fabricated by a turn that graded nothing.
    const last = turns[turns.length - 1].body.mastery as
      { verified?: boolean; checkCorrect?: number; practiceCorrect?: number } | undefined
    expect(last?.verified).not.toBe(true)
    expect(last?.checkCorrect ?? 0).toBe(0)
    expect(last?.practiceCorrect ?? 0).toBe(0)

    // 3. the assessment machinery is still live, not latched off.
    const gate = readLog(turns[turns.length - 1], '[gate-eligibility]')
    expect(gate).not.toBeNull()
  })
})
