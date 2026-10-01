/**
 * AN EXHAUSTED AUTHORED POOL IS NOT "NO ALTERNATIVE".
 *
 * ── THE MEASURED DEFECT (production, 2026-09-24, disposable QA account) ─────
 * `phys.mod.photoelectric-effect` holds four authored gradeable probes at the
 * band it is served at. The learner missed two, so all four were spent before
 * PRACTICE finished. The gate's selector then returned null, which
 * `decideModelProbe` could not tell apart from "this concept has no authored
 * probes at all", so it answered 'served-no-alternative' and served the
 * model's own item:
 *
 *   "What does the stopping potential directly measure?"
 *   keyed (by the model) to "The number of photons hitting the metal each second"
 *
 * The correct answer is the maximum kinetic energy of the emitted electrons.
 * The learner tapped the keyed option, the turn event recorded
 * `gradeSource: server-key, gradedCorrect: true`, the plain practice counter
 * moved 0 -> 1, and the next reply opened "That's right". Verified mastery was
 * protected (`unverifiedReason: invented-key`), but the learner was told a
 * wrong answer about the physics was right.
 *
 * Every physics (concept, band) pair holds 4-6 gradeable probes (production
 * count, same day), so any learner who misses two or three reaches this state.
 *
 * ── WHAT THIS PINS ─────────────────────────────────────────────────────────
 *  1. The REAL findBestProbe reports exhaustion (and only exhaustion) through
 *     `onAllCandidatesSpent`, from rows it already fetched — prisma is mocked
 *     at the boundary, nothing else is.
 *  2. The REAL decideModelProbe withholds on it at a counting phase, and
 *     changes nothing anywhere else: below GUIDE, never-authored concepts, and
 *     the selector-never-ran case all keep their prior verdicts.
 *  3. route.ts wires the callback into the gate's selector and the flag into
 *     the guard.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { GradeBand } from '@prisma/client'

const findMany = vi.fn()
vi.mock('@/lib/db/prisma', () => ({ prisma: { assetIdentity: { findMany: (...a: unknown[]) => findMany(...a) } } }))

import { findBestProbe } from '@/lib/teaching/assets/teachingActionRepository'
import { decideModelProbe } from '@/lib/teaching/inventedProbeGuard'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

const CONCEPT = 'phys.mod.photoelectric-effect'
const PROBES = [...AUTHORED_PROBES, ...PHYSICS_DEPTH_PROBES]
  .filter((p) => p.conceptId === CONCEPT && Array.isArray(p.choices) && p.choices.length >= 2)

function row(p: (typeof PROBES)[number], i: number) {
  return {
    assetId: `a${i}`, conceptId: CONCEPT, language: 'en', gradeBand: p.gradeBand,
    status: 'ACTIVE', qualityScore: null, qualityConfidence: null, tags: [], incompatibilities: [],
    probeAsset: { stem: p.stem, choices: p.choices, correctValue: p.correctValue ?? null, difficulty: p.difficulty },
  }
}
const STATE = { conceptId: CONCEPT, subjectSlug: 'physics', language: 'en', gradeBand: GradeBand.UNDERGRADUATE, userMessage: 'next' }

describe('findBestProbe — exhaustion is observable, and distinct from absence', () => {
  beforeEach(() => findMany.mockReset())

  it('the corpus really holds the thin pool the defect needed (>= 3, so the concept is at contract)', () => {
    expect(PROBES.length).toBeGreaterThanOrEqual(3)
  })

  it('every authored probe spent -> null AND the callback fires', async () => {
    findMany.mockResolvedValue(PROBES.map(row))
    const spent = vi.fn()
    const got = await findBestProbe(STATE, { requireMcq: true, excludeProbeStem: () => true, onAllCandidatesSpent: spent })
    expect(got).toBeNull()
    expect(spent).toHaveBeenCalledTimes(1)
  })

  it('one probe left -> that probe is served and the callback does NOT fire', async () => {
    findMany.mockResolvedValue(PROBES.map(row))
    const keep = PROBES[PROBES.length - 1].stem
    const spent = vi.fn()
    const got = await findBestProbe(STATE, { requireMcq: true, excludeProbeStem: (s) => s !== keep, onAllCandidatesSpent: spent })
    expect(got?.stem).toBe(keep)
    expect(got?.poolSize).toBe(1)
    expect(spent).not.toHaveBeenCalled()
  })

  it('no authored probes at all -> null WITHOUT the callback (never-authored stays "no alternative")', async () => {
    findMany.mockResolvedValue([])
    const spent = vi.fn()
    expect(await findBestProbe(STATE, { requireMcq: true, excludeProbeStem: () => true, onAllCandidatesSpent: spent })).toBeNull()
    expect(spent).not.toHaveBeenCalled()
  })

  it('only unconvertible probes exist -> null WITHOUT the callback (nothing gradeable was ever there to spend)', async () => {
    findMany.mockResolvedValue([row({ ...PROBES[0], choices: undefined }, 0)])
    const spent = vi.fn()
    expect(await findBestProbe(STATE, { requireMcq: true, excludeProbeStem: () => true, onAllCandidatesSpent: spent })).toBeNull()
    expect(spent).not.toHaveBeenCalled()
  })

  it('filter reorder is behaviour-neutral: with nothing excluded the same probe wins as before', async () => {
    findMany.mockResolvedValue(PROBES.map(row))
    const a = await findBestProbe(STATE, { requireMcq: true })
    const b = await findBestProbe(STATE, { requireMcq: true, excludeProbeStem: () => false, onAllCandidatesSpent: () => {} })
    expect(a?.assetId).toBeDefined()
    expect(b?.assetId).toBe(a?.assetId)
    expect(b?.poolSize).toBe(PROBES.length)
  })
})

describe('decideModelProbe — the exhausted pool', () => {
  const base = {
    probeWouldCountThisPhase: true,
    gateServedAuthoredProbe: false,
    modelOfferedProbe: true,
    authoredProbesExist: false as boolean | null,
    gateDeclinedByPolicy: false,
  }

  it('the production shape (PRACTICE, selector ran, pool spent) now WITHHOLDS the model item', () => {
    expect(decideModelProbe({ ...base, authoredPoolExhausted: true })).toEqual({ serve: false, reason: 'authored-pool-exhausted' })
  })

  it('never-authored concept is unchanged: still served, silence is worse', () => {
    expect(decideModelProbe(base)).toEqual({ serve: true, reason: 'served-no-alternative' })
    expect(decideModelProbe({ ...base, authoredPoolExhausted: false })).toEqual({ serve: true, reason: 'served-no-alternative' })
  })

  it('below GUIDE is unchanged: an invented key cannot reach the record there', () => {
    expect(decideModelProbe({ ...base, probeWouldCountThisPhase: false, authoredPoolExhausted: true }))
      .toEqual({ serve: true, reason: 'phase-does-not-count' })
  })

  it('an authored probe served this turn still wins first', () => {
    expect(decideModelProbe({ ...base, gateServedAuthoredProbe: true, authoredPoolExhausted: true }).reason).toBe('authored-served')
  })

  it('a repeated model question keeps its own, more specific reason', () => {
    expect(decideModelProbe({ ...base, modelProbeAlreadyAsked: true, authoredPoolExhausted: true }).reason).toBe('model-probe-already-asked')
  })
})

describe('route.ts wiring', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('the gate selector reports exhaustion into the hoisted flag', () => {
    expect(ROUTE).toMatch(/requireMcq: true,\s*onAllCandidatesSpent: \(\) => \{ authoredPoolExhaustedHoisted = true \}/)
  })
  it('the guard receives the flag', () => {
    expect(ROUTE).toMatch(/authoredPoolExhausted: authoredPoolExhaustedHoisted/)
  })
})
