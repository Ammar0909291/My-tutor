/**
 * EGRESS-1 — the capability cache must be hydrated ONCE, not every turn.
 *
 * THE DEFECT THIS PINS, measured in production against pg_stat_statements
 * (stats since 2026-07-05):
 *
 *     219,295 calls · 105,862,902 rows returned · ~46.9 GB
 *     from `spine_events`, a table holding 44,323 rows.
 *
 * The whole table, 2,389 times over — roughly 23 GB/month against a 5.5 GB
 * Supabase egress quota. It was, on its own, essentially the entire bill.
 *
 * THE MECHANISM. `route.ts` hydrates the session's capability cache from the
 * evidence spine when the cache is empty, and the code's own comment says
 * "Cold cache only: one extra read per NEW session, none per turn." Two facts
 * made that false together:
 *
 *   1. `readCapabilityState({})` returns `{}` — so "never hydrated" and
 *      "hydrated, found nothing" are the SAME value.
 *   2. The persist only wrote `capabilities` when the fold was NON-empty.
 *
 * So a learner who had never triggered a capability observation — the common
 * case — never got anything written, the guard stayed true, and every turn
 * replayed their entire log. The log grows every turn, so the cost grew with
 * the conversation.
 *
 * The fix records the ATTEMPT (`capabilitiesHydrated`) rather than only a
 * non-empty result. These tests assert the two halves that have to hold
 * together; either one alone re-opens the loop.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { readCapabilityState, hydrateFromProjection } from '@/lib/teaching/capabilityModel'

const route = readFileSync(
  join(__dirname, '../app/api/learn/chat/route.ts'), 'utf8',
)

describe('the ambiguity that caused it is real, and still is', () => {
  it('an empty cache and an unhydrated one produce the identical value', () => {
    // This is WHY a marker is needed rather than a cleverer emptiness check:
    // the two states are genuinely indistinguishable from the data alone.
    expect(readCapabilityState(undefined)).toEqual({})
    expect(readCapabilityState({})).toEqual({})
    expect(Object.keys(readCapabilityState(undefined))).toHaveLength(0)
  })

  it('a learner with no capability evidence hydrates to an empty state', () => {
    // The common case. Nothing to persist, under the old rule — which is
    // exactly why nothing was persisted and the replay never stopped.
    expect(hydrateFromProjection({})).toEqual({})
  })
})

describe('the replay is guarded by the marker', () => {
  it('does not replay once the spine has already been read', () => {
    expect(route).toContain("snapshot?.capabilitiesHydrated !== true")
  })

  it('still guards on the empty cache too — the marker ADDS a condition', () => {
    const guard = /if \(Object\.keys\(capabilityStateHoisted\)\.length === 0\s*\n\s*&& snapshot\?\.capabilitiesHydrated !== true\) \{/
    expect(guard.test(route)).toBe(true)
  })

  it('sets the marker on a SUCCESSFUL replay', () => {
    const block = route.slice(
      route.indexOf('const { replayStudentView }'),
      route.indexOf('const statedNo = capMod.detectStatedInability'),
    )
    expect(block).toContain('capabilitiesHydratedThisTurn = true')
    // The assignment must sit in the try, AFTER the await — a marker set in
    // the catch would remember a failure as an answer.
    expect(block.indexOf('await replayStudentView'))
      .toBeLessThan(block.indexOf('capabilitiesHydratedThisTurn = true'))
  })

  it('does NOT set the marker when the replay throws', () => {
    const block = route.slice(
      route.indexOf('const { replayStudentView }'),
      route.indexOf('const statedNo = capMod.detectStatedInability'),
    )
    const catchBody = block.slice(block.indexOf('} catch {'))
    expect(catchBody).not.toContain('capabilitiesHydratedThisTurn = true')
  })
})

describe('the marker is persisted independently of emptiness', () => {
  it('writes capabilitiesHydrated OUTSIDE the non-empty capabilities guard', () => {
    const markerAt = route.indexOf('conversationStateUpdate.capabilitiesHydrated = true')
    const guardAt = route.indexOf(
      'if (capabilityStateHoisted && Object.keys(capabilityStateHoisted).length > 0)',
    )
    expect(markerAt).toBeGreaterThan(-1)
    expect(guardAt).toBeGreaterThan(-1)
    // The marker must be written BEFORE, and outside, the emptiness guard.
    // Inside it, an empty hydration would go unrecorded and the loop reopens.
    expect(markerAt).toBeLessThan(guardAt)
  })

  it('carries the marker forward once set, so it survives later turns', () => {
    expect(route).toContain(
      "if (capabilitiesHydratedThisTurn || snapshot?.capabilitiesHydrated === true) {",
    )
  })
})

describe('the expensive read is still the one being guarded', () => {
  it('replayStudentView remains the only spine read on the chat path', () => {
    const reads = [...route.matchAll(/replayStudentView\s*\(/g)]
    expect(reads.length).toBe(1)
  })

  it('loadSpineEvents still reads the WHOLE log — which is why it must not repeat', () => {
    const replay = readFileSync(
      join(__dirname, '../lib/evidence-spine/replay.ts'), 'utf8',
    )
    // Unbounded by design: it folds a learner's entire history. That is
    // correct for a replay and ruinous as a per-turn read.
    expect(replay).toContain('Load ALL events for a learner')
    expect(replay).not.toMatch(/take:\s*PAGE[\s\S]{0,200}?where:\s*\{\s*learnerId,\s*seq:\s*\{\s*gt:\s*after\s*\}\s*,\s*type:/)
  })
})
