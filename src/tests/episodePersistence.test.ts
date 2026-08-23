/**
 * AN EXPLICIT STOP MUST SURVIVE THE REQUEST BOUNDARY. (Phase 1 — persistence.)
 *
 * ── THE DEFECT, EXACTLY ─────────────────────────────────────────────────────
 * route.ts derives the episode, then mutates it in place for an explicit stop:
 *
 *   sessionEpisodeHoisted = deriveEpisode(prevEpisode, boundary, …)   (~2240)
 *   if (turnIntent.wantsToStop) sessionEpisodeHoisted = forceClosing(…)  (~2246)
 *
 * …and ~3,940 lines later decides whether to write it back:
 *
 *   nextEpisode = applySignalToEpisode(sessionEpisodeHoisted, signal, …)
 *   if (freshBoundary || nextEpisode !== sessionEpisodeHoisted) persist    (~6204)
 *
 * The baseline of that comparison is the ALREADY-MUTATED in-request value. So
 * the question it actually asks is "did the SIGNAL FOLD change anything?" —
 * not "does this turn's episode differ from what is stored?". Every mutation
 * made before the fold is invisible to it.
 *
 * `applySignalToEpisode` returns the SAME OBJECT REFERENCE when there is no
 * graded signal (`!signal || signal.correctness === undefined`), and a stop
 * turn has no graded signal — a bare acknowledgement even sets the signal to
 * null outright. So CLOSING is computed, used for this turn, and dropped.
 *
 * ── THE INVARIANT ───────────────────────────────────────────────────────────
 * Persistence must depend on whether this turn's episode DIVERGES FROM THE
 * STORED ONE — never on whether some other subsystem happened to return a new
 * object reference.
 *
 * Reference comparison against the stored episode is exact here, not a
 * heuristic: `deriveEpisode` returns `prev` ITSELF when there is no boundary,
 * and every mutation path (`forceClosing`, `applySignalToEpisode`) builds a new
 * object. So `next !== persisted` is true if and only if something really
 * changed. No deep equality is needed, and no no-op write is produced.
 *
 * ── WHAT THESE TESTS DO ─────────────────────────────────────────────────────
 * They drive the REAL lifecycle functions across a simulated request boundary:
 * turn 1 derives → mutates → decides persistence; whatever it persists (or
 * fails to) is what turn 2 reads back. Nothing is mocked away — least of all
 * the persistence decision itself, which is the thing under test.
 *
 * `OLD_RULE` below is a faithful replica of the shipped condition, kept so the
 * defect stays demonstrated rather than merely described.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  deriveEpisode, forceClosing, applySignalToEpisode, episodeNeedsPersist,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'

/** The shipped rule, replicated: baseline = the already-mutated in-request value. */
const OLD_RULE = (freshBoundary: boolean, next: SessionEpisode, hoisted: SessionEpisode) =>
  freshBoundary || next !== hoisted

const stored = (phase: SessionEpisode['phase']): SessionEpisode => ({
  startedAt: '2026-08-23T10:00:00.000Z',
  phase,
  visibleFailures: 0,
  retroWinOwed: false,
  openingSatisfied: phase !== 'OPENING',
})

/**
 * One real turn: derive from what is stored, optionally force-close, fold the
 * signal, then decide persistence under the given rule. Returns what the NEXT
 * turn would read back.
 */
function runTurn(opts: {
  persisted: SessionEpisode | null
  boundary: boolean
  wantsToStop: boolean
  signal: { correctness?: boolean } | null
  rule: 'old' | 'new'
}): { persistedAfter: SessionEpisode | null; wrote: boolean; phaseThisTurn: string } {
  let hoisted = deriveEpisode(opts.persisted, opts.boundary, Date.parse('2026-08-23T10:05:00.000Z'), null)
  if (opts.wantsToStop) hoisted = forceClosing(hoisted)
  const phaseThisTurn = hoisted.phase
  const next = applySignalToEpisode(hoisted, opts.signal, { isFirstLesson: false })
  const wrote = opts.rule === 'old'
    ? OLD_RULE(opts.boundary, next, hoisted)
    : episodeNeedsPersist({ persisted: opts.persisted, next, freshBoundary: opts.boundary })
  return { persistedAfter: wrote ? next : opts.persisted, wrote, phaseThisTurn }
}

describe('Phase 1 — characterisation: the shipped rule loses an explicit stop', () => {
  it('A — explicit stop, signal null: CLOSING this turn, CORE next turn', () => {
    const t1 = runTurn({ persisted: stored('CORE'), boundary: false, wantsToStop: true, signal: null, rule: 'old' })
    expect(t1.phaseThisTurn).toBe('CLOSING')   // the turn itself is right
    expect(t1.wrote).toBe(false)               // …and nothing is written
    expect(t1.persistedAfter?.phase).toBe('CORE')  // the stop is gone
  })

  it('B — explicit stop, signal present but correctness undefined: same loss', () => {
    const t1 = runTurn({
      persisted: stored('CORE'), boundary: false, wantsToStop: true,
      signal: { }, rule: 'old',
    })
    expect(t1.phaseThisTurn).toBe('CLOSING')
    expect(t1.wrote).toBe(false)
    expect(t1.persistedAfter?.phase).toBe('CORE')
  })
})

describe('Phase 1 — the invariant: divergence from what is STORED', () => {
  it('C — explicit stop with a null signal now persists CLOSING', () => {
    const t1 = runTurn({ persisted: stored('CORE'), boundary: false, wantsToStop: true, signal: null, rule: 'new' })
    expect(t1.phaseThisTurn).toBe('CLOSING')
    expect(t1.wrote).toBe(true)
    expect(t1.persistedAfter?.phase).toBe('CLOSING')
  })

  it('D — CROSS-TURN: turn 1 stops, turn 2 reads back CLOSING', () => {
    const t1 = runTurn({ persisted: stored('CORE'), boundary: false, wantsToStop: true, signal: null, rule: 'new' })
    // Turn 2 is an ordinary turn: it reads whatever turn 1 actually persisted.
    const t2 = runTurn({ persisted: t1.persistedAfter, boundary: false, wantsToStop: false, signal: null, rule: 'new' })
    expect(t2.phaseThisTurn).toBe('CLOSING')
    // …and having changed nothing, turn 2 writes nothing.
    expect(t2.wrote).toBe(false)
  })

  it('E — the same cross-turn sequence under the OLD rule reverts to CORE', () => {
    const t1 = runTurn({ persisted: stored('CORE'), boundary: false, wantsToStop: true, signal: null, rule: 'old' })
    const t2 = runTurn({ persisted: t1.persistedAfter, boundary: false, wantsToStop: false, signal: null, rule: 'old' })
    expect(t2.phaseThisTurn).toBe('CORE')
  })

  it('F — a stop already in CLOSING writes nothing (forceClosing is idempotent)', () => {
    const t1 = runTurn({ persisted: stored('CLOSING'), boundary: false, wantsToStop: true, signal: null, rule: 'new' })
    expect(t1.phaseThisTurn).toBe('CLOSING')
    expect(t1.wrote).toBe(false)
  })
})

describe('Phase 1 — the route actually uses the predicate', () => {
  it('L — the write-back compares against the STORED episode, not the hoisted one', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain('episodeNeedsPersist({')
    expect(route).toContain('persisted: persistedEpisodeHoisted')
    expect(route).toContain('persistedEpisodeHoisted = prevEpisode')
    // The old identity check must be gone, or the predicate is decorative.
    expect(route).not.toContain('nextEpisode !== sessionEpisodeHoisted')
  })
})

describe('Phase 1 — existing behaviour must not move', () => {
  it('G — an ordinary graded turn still persists (OPENING -> CORE)', () => {
    for (const rule of ['old', 'new'] as const) {
      const t = runTurn({
        persisted: stored('OPENING'), boundary: false, wantsToStop: false,
        signal: { correctness: true }, rule,
      })
      expect(t.wrote, rule).toBe(true)
      expect(t.persistedAfter?.phase, rule).toBe('CORE')
    }
  })

  it('H — a wrong answer still spends the affect budget identically', () => {
    for (const rule of ['old', 'new'] as const) {
      let p: SessionEpisode | null = { ...stored('CORE'), visibleFailures: 1 }
      const t = runTurn({ persisted: p, boundary: false, wantsToStop: false, signal: { correctness: false }, rule })
      expect(t.wrote, rule).toBe(true)
      expect(t.persistedAfter?.visibleFailures, rule).toBe(2)
      expect(t.persistedAfter?.phase, rule).toBe('CLOSING')
    }
  })

  it('I — a fresh boundary still always persists', () => {
    for (const rule of ['old', 'new'] as const) {
      const t = runTurn({ persisted: stored('CLOSING'), boundary: true, wantsToStop: false, signal: null, rule })
      expect(t.wrote, rule).toBe(true)
      expect(t.persistedAfter?.phase, rule).toBe('OPENING')
    }
  })

  it('J — NO-OP TURN: nothing changed, so nothing is written', () => {
    for (const rule of ['old', 'new'] as const) {
      const t = runTurn({ persisted: stored('CORE'), boundary: false, wantsToStop: false, signal: null, rule })
      expect(t.wrote, rule).toBe(false)
      expect(t.persistedAfter?.phase, rule).toBe('CORE')
    }
  })

  it('K — a stop does NOT touch mastery evidence: only `phase` differs', () => {
    const before = stored('CORE')
    const t1 = runTurn({ persisted: before, boundary: false, wantsToStop: true, signal: null, rule: 'new' })
    const after = t1.persistedAfter!
    expect(after.phase).toBe('CLOSING')
    expect(after.visibleFailures).toBe(before.visibleFailures)
    expect(after.openingSatisfied).toBe(before.openingSatisfied)
    expect(after.retroWinOwed).toBe(before.retroWinOwed)
    expect(after.startedAt).toBe(before.startedAt)
  })
})
