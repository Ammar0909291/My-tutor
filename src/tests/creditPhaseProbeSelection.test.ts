/**
 * A CARD IS SPENT WHERE IT COUNTS (MatchOptions.creditPhase) — production, 2026-10-21, phys.qm.harmonic-oscillator-qm.
 *
 * A learner who got every card right was still re-asked three of them and was at 65 % after 16 turns. The concept holds three 3+-option
 * cards (all `certifiesMastery` counts once it holds three) and four 2-option ones (practice only). The first certifying card was spent on
 * "Can I try a practice question?" at GUIDE — a correct answer there banks nothing — and two 2-option cards then took the practice turns.
 *
 * The rule: where an answer banks no credit (OBSERVE, DEMONSTRATE, GUIDE) spend a 2-option card first; where it does (CHECK on) spend a
 * certifying card first, then give a certifying card its one re-ask BEFORE a 2-option card. Only when the concept holds three certifying cards.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GradeBand } from '@prisma/client'

const findMany = vi.fn()
vi.mock('@/lib/db/prisma', () => ({ prisma: { assetIdentity: { findMany: (...a: unknown[]) => findMany(...a) } } }))

import { findBestProbe } from '@/lib/teaching/assets/teachingActionRepository'

const CONCEPT = 'phys.qm.harmonic-oscillator-qm'
const opts = (n: number) => Array.from({ length: n }, (_, i) => ({ text: `option ${i}`, isCorrect: i === 0 }))
const mkRows = (certifying: number, twoOption: number) => [
  ...Array.from({ length: certifying }, (_, i) => ({ stem: `CERT ${i + 1}?`, n: i % 2 === 0 ? 4 : 3 })),
  ...Array.from({ length: twoOption }, (_, i) => ({ stem: `TWO ${i + 1}?`, n: 2 })),
].map(({ stem, n }, i) => ({
  assetId: `a${i}`, conceptId: CONCEPT, language: 'en', gradeBand: GradeBand.HIGH,
  status: 'ACTIVE', qualityScore: null, qualityConfidence: null, tags: [], incompatibilities: [],
  probeAsset: { stem, choices: opts(n), correctValue: null, difficulty: 'CORE' },
}))
const STATE = { conceptId: CONCEPT, subjectSlug: 'physics', language: 'en', gradeBand: GradeBand.HIGH, userMessage: 'next' }
const stemOf = async (o: Parameters<typeof findBestProbe>[1]) => (await findBestProbe(STATE as never, { requireMcq: true, ...o }))?.stem ?? null

describe('creditPhase: which card a turn may draw', () => {
  beforeEach(() => { findMany.mockReset(); findMany.mockResolvedValue(mkRows(3, 4)) })

  it('no-credit phase (GUIDE and earlier): a 2-option card, so the certifying cards are kept for CHECK', async () => {
    expect(await stemOf({ creditPhase: false })).toMatch(/^TWO /)
  })
  it('credit phase (CHECK on): a certifying card', async () => {
    expect(await stemOf({ creditPhase: true })).toMatch(/^CERT /)
  })
  it('credit phase spends the certifying cards one by one, and only then a 2-option card', async () => {
    const asked = new Set<string>()
    const order: string[] = []
    for (let i = 0; i < 4; i++) {
      const s = await stemOf({ creditPhase: true, excludeProbeStem: (x) => asked.has(x) })
      order.push(s!); asked.add(s!)
    }
    expect(order.slice(0, 3).every((s) => s.startsWith('CERT '))).toBe(true)
    expect(order[3]).toMatch(/^TWO /)
  })
  it('a certifying card that may be asked once more comes BEFORE a fresh 2-option card (the production re-ask of a wasted GUIDE answer)', async () => {
    const asked = new Set(['CERT 1?', 'CERT 2?', 'CERT 3?'])
    const got = await findBestProbe(STATE as never, {
      requireMcq: true, creditPhase: true, excludeProbeStem: (x) => asked.has(x), allowMissedStem: (x) => x === 'CERT 2?',
    })
    expect(got?.stem).toBe('CERT 2?')
    expect(got?.reask).toBe(true)
  })
  it('in a no-credit phase the re-ask rule is unchanged: a fresh card first, a re-ask only when nothing is fresh', async () => {
    const got = await findBestProbe(STATE as never, {
      requireMcq: true, creditPhase: false, excludeProbeStem: (x) => x === 'CERT 2?', allowMissedStem: (x) => x === 'CERT 2?',
    })
    expect(got?.reask).toBeUndefined()
    expect(got?.stem).not.toBe('CERT 2?')
  })
  it('an exhausted pool still reports itself (nothing here can serve a card the old rule would not)', async () => {
    const spent = vi.fn()
    expect(await stemOf({ creditPhase: true, excludeProbeStem: () => true, onAllCandidatesSpent: spent })).toBeNull()
    expect(spent).toHaveBeenCalled()
  })
  it('poolSize keeps its old meaning: every unasked card, certifying or not (the below-guide surplus rule reads it)', async () => {
    const got = await findBestProbe(STATE as never, { requireMcq: true, creditPhase: false })
    expect(got?.poolSize).toBe(7)
  })
})

describe('creditPhase: unchanged where 2-option cards still certify', () => {
  it('fewer than three certifying cards: selection ignores creditPhase (both values pick exactly what no value picks)', async () => {
    findMany.mockReset(); findMany.mockResolvedValue(mkRows(2, 4))
    const plain = await stemOf({})
    expect(await stemOf({ creditPhase: true })).toBe(plain)
    expect(await stemOf({ creditPhase: false })).toBe(plain)
  })
  it('undefined creditPhase is the exact prior selection', async () => {
    findMany.mockReset(); findMany.mockResolvedValue(mkRows(3, 4))
    const a = await stemOf({}); const b = await stemOf({ creditPhase: undefined })
    expect(a).toBe(b)
  })
})

describe('the route passes the phase it is selecting in', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('credit from CHECK on, none at OBSERVE / DEMONSTRATE / GUIDE', () => {
    const i = route.indexOf('creditPhase: phaseBeforeTurn')
    expect(i).toBeGreaterThan(0)
    const block = route.slice(i, i + 320)
    expect(block).toMatch(/'CHECK' \|\| phaseBeforeTurn === 'PRACTICE' \|\| phaseBeforeTurn === 'TRANSFER' \? true/)
    expect(block).toMatch(/'OBSERVE' \|\| phaseBeforeTurn === 'DEMONSTRATE' \|\| phaseBeforeTurn === 'GUIDE' \? false/)
  })
})
