/**
 * THE ISS-13 REDERIVER MUST RE-APPLY THE ACCUMULATIVE RECORDS, OR A CONCURRENT
 * WRITE DROPS THE JUST-SERVED EXPLANATION AND IT IS SERVED AGAIN VERBATIM.
 *
 * ── THE MEASURED DEFECT (C7, 2026-09-02) ────────────────────────────────────
 * `route.ts` records the authored explanation it served this turn into
 * `teachingHistory.explanationsServed`, and the next turn's `hasServedExplanation`
 * guard reads that list to refuse serving the SAME asset twice. The primary fold
 * adds four accumulative records after `updateTeachingHistory`: the served
 * explanation (asset + remediation card), the asked MCQ, and the confidence
 * reading.
 *
 * `writeSnapshotDelta` uses optimistic concurrency: on a version conflict it
 * DISCARDS the delta and re-runs the snapshot rederivers against the fresh row.
 * The teachingHistory rederiver re-applied only strategiesUsed / explanationCount
 * / frustration / mastery — NOT explanationsServed / mcqAsked / confidenceTrail.
 * So on a concurrent write the served-explanation id was dropped, the next turn's
 * guard saw an empty ledger, and the SAME authored explanation was served
 * byte-for-byte again (provider=memory). Reproduced on the deployed app,
 * phys.mech.newtons-first-law: asset c9d6427a served verbatim on three turns.
 * This was the "third channel" the C5/C7 residue note could not identify — a
 * deterministic memory re-serve, not an LLM echo.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real readTeachingHistory / updateTeachingHistory / recordExplanationServed
 * / recordMcqAsked / recordConfidence / hasServedExplanation. The rederiver is
 * mirrored so the same functions the route runs decide the outcome; the route's
 * own wiring is pinned by source assertions.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  initialTeachingHistory,
  updateTeachingHistory,
  readTeachingHistory,
  recordExplanationServed,
  recordMcqAsked,
  recordConfidence,
  hasServedExplanation,
  type TeachingHistory,
} from '@/lib/teaching/teachingHistory'

const CONCEPT = 'phys.mech.newtons-first-law'
const ASSET = 'c9d6427a-3b2c-4ef9-bff0-73216e38cdb6'

/** The FIXED rederiver — re-applies the four accumulative records onto `fresh`. */
function fixedRederiver(
  freshTeachingHistory: unknown,
  captured: { servedExplanation: string | null; askedMcq: string | null; conf: 'high' | 'medium' | 'low' | null },
): TeachingHistory {
  const base = readTeachingHistory(freshTeachingHistory, CONCEPT)
  let rederived = updateTeachingHistory(base, { explanationCount: base.explanationCount + 1 })
  if (captured.servedExplanation) rederived = recordExplanationServed(rederived, captured.servedExplanation)
  if (captured.askedMcq) rederived = recordMcqAsked(rederived, captured.askedMcq)
  if (captured.conf) rederived = recordConfidence(rederived, captured.conf)
  return rederived
}

/** The BUGGY rederiver — the pre-fix behavior, for the negative control. */
function buggyRederiver(freshTeachingHistory: unknown): TeachingHistory {
  const base = readTeachingHistory(freshTeachingHistory, CONCEPT)
  return updateTeachingHistory(base, { explanationCount: base.explanationCount + 1 })
}

describe('the served explanation survives a concurrent write', () => {
  // The fresh row a concurrent turn left behind: same concept, but WITHOUT this
  // turn's just-served explanation recorded.
  const freshFromConcurrentTurn = { ...initialTeachingHistory(CONCEPT), explanationCount: 1 }

  it('BUGGY rederiver loses the served id — the next-turn guard misses (the defect)', () => {
    const h = buggyRederiver(freshFromConcurrentTurn)
    expect(hasServedExplanation(h, ASSET)).toBe(false) // guard would NOT fire -> verbatim re-serve
  })

  it('FIXED rederiver keeps the served id — the next-turn guard fires', () => {
    const h = fixedRederiver(freshFromConcurrentTurn, { servedExplanation: ASSET, askedMcq: null, conf: null })
    expect(hasServedExplanation(h, ASSET)).toBe(true) // guard fires -> no re-serve
  })

  it('also preserves the asked MCQ and the confidence reading', () => {
    const h = fixedRederiver(freshFromConcurrentTurn, { servedExplanation: ASSET, askedMcq: 'Which carrier mediates EM?', conf: 'high' })
    expect(h.mcqAsked.length).toBe(1)
    expect(h.confidenceTrail).toContain('high')
  })

  it('is idempotent when the fresh row ALREADY has the id (another turn recorded it)', () => {
    const already = recordExplanationServed({ ...initialTeachingHistory(CONCEPT) }, ASSET)
    const h = fixedRederiver(already, { servedExplanation: ASSET, askedMcq: null, conf: null })
    expect(h.explanationsServed.filter((x) => x === ASSET).length).toBe(1) // not doubled
  })

  it('records nothing extra when this turn served no explanation', () => {
    const h = fixedRederiver(freshFromConcurrentTurn, { servedExplanation: null, askedMcq: null, conf: null })
    expect(h.explanationsServed).toEqual([])
  })
})

describe('the route rederiver re-applies the four accumulative records', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  // Isolate the rederiver block that follows the ISS-13 root-cause comment.
  const block = ROUTE.slice(ROUTE.indexOf('C7 ROOT CAUSE'))

  it('captures the served explanation, card, asked MCQ and confidence for the re-fold', () => {
    expect(block).toMatch(/rederiveServedExplanation\s*=\s*provider === 'memory'/)
    expect(block).toMatch(/rederiveServedCard\s*=\s*remediationCardServedId/)
    expect(block).toMatch(/rederiveAskedMcq\s*=\s*pendingMcqHoisted\?\.question && mcqGradeHoisted/)
    expect(block).toMatch(/rederiveConfReading\s*=/)
  })

  it('applies recordExplanationServed / recordMcqAsked / recordConfidence inside the rederiver', () => {
    expect(block).toMatch(/recordExplanationServed\(rederived, rederiveServedExplanation\)/)
    expect(block).toMatch(/recordExplanationServed\(rederived, rederiveServedCard\)/)
    expect(block).toMatch(/recordMcqAsked\(rederived, rederiveAskedMcq\)/)
    expect(block).toMatch(/recordConfidence\(rederived, rederiveConfReading\)/)
  })
})
