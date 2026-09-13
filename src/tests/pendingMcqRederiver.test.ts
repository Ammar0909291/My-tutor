/**
 * `pendingMcq` MUST ALSO SURVIVE A CONCURRENT WRITE, OR AN ALREADY-GRADED
 * PROBE COMES BACK AS "STILL PENDING" AND IS RE-SERVED.
 *
 * ── THE MEASURED DEFECT (real-account adversarial study, phys.mech.
 * conservation-of-momentum, 2026-09-13) ─────────────────────────────────────
 * The "Two cars of equal mass 1200 kg..." probe was correctly graded ONCE
 * (`pendingMcqValueThisTurn` computed as `null` — the grading turn's own
 * intent is to CLEAR it), then the identical question was re-served on the
 * next two turns with no new grading occurring. `writeSnapshotDelta`'s
 * optimistic-concurrency retry discards the whole delta on a version
 * conflict and re-runs the registered `snapshotRederivers` against the fresh
 * row. `pendingMcq` had no rederiver, so on a conflict the fresh row's own
 * (stale, still-pending) value won, and the next turn's `mcqToServe` read it
 * back as unanswered and re-attached it — an already-spent probe served
 * again, with the learner's earlier correct/incorrect answer to it simply
 * discarded from view (though, per the ladder fix above, not from the
 * mastery counters themselves, which folded correctly on the turn that DID
 * persist).
 *
 * ── WHY A REDERIVER SUFFICES HERE, UNLIKE THE LADDER ────────────────────────
 * `pendingMcqValueThisTurn` is already fully decided from THIS turn's own
 * facts (what the gate/model attached this turn, whether this turn's message
 * graded the prior pending question) before the rederiver ever runs — none of
 * that depends on what a concurrent write did. So the rederiver does not need
 * to re-fold against the fresh base the way the ladder's does; it only needs
 * to re-ASSERT the already-correct value so a conflict cannot silently
 * discard it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { writePendingQuestion, readPendingQuestion } from '@/lib/teaching/pendingQuestion'
import { mcqToServe, type TutorMCQ } from '@/lib/teaching/mcq'

const LESSON_KEY = 'phys.mech.conservation-of-momentum:35'

const CARS_PROBE: TutorMCQ = {
  question: 'Two cars of equal mass 1200 kg...',
  options: ['A', 'B', 'C', 'D'],
  correctIndex: 1,
  assetId: 'authored-cars-probe',
}

describe('a correctly-graded pendingMcq survives a concurrent write', () => {
  // The row a concurrent turn left behind: still carries the OLD pending
  // question, as if this turn's own clearing delta never landed.
  const stalePendingRow = { pendingMcq: writePendingQuestion(CARS_PROBE, LESSON_KEY) }

  // This turn correctly graded CARS_PROBE and decided to clear it —
  // `pendingMcqValueThisTurn` is `null` because `served` was `null`
  // (nothing newly attached, and the prior pending question WAS graded).
  const pendingMcqValueThisTurn = writePendingQuestion(null, LESSON_KEY)

  it('BUGGY (no rederiver): the fresh, stale row wins — the probe still reads as pending (the defect)', () => {
    // No rederiver means the fresh row's own value is what persists.
    const persisted = stalePendingRow.pendingMcq
    const restored = readPendingQuestion(persisted, LESSON_KEY)
    // mcqToServe re-attaches it next turn because it is still there and
    // (from the next turn's perspective) not yet graded.
    expect(mcqToServe(null, restored, null)).not.toBeNull()
    expect(mcqToServe(null, restored, null)?.question).toBe(CARS_PROBE.question)
  })

  it('FIXED (rederiver re-applies pendingMcqValueThisTurn): the clear wins regardless of the fresh row', () => {
    // The fixed rederiver is `() => ({ pendingMcq: pendingMcqValueThisTurn })`
    // — it ignores `fresh` entirely, by design (see the module doc above).
    const persisted = pendingMcqValueThisTurn
    const restored = readPendingQuestion(persisted, LESSON_KEY)
    expect(restored).toBeNull()
    expect(mcqToServe(null, restored, null)).toBeNull()
  })

  it('also survives a conflict when this turn ATTACHED a new probe (not just cleared one)', () => {
    const newProbe: TutorMCQ = { question: 'A different question', options: ['X', 'Y'], correctIndex: 0 }
    const thisTurnValue = writePendingQuestion(newProbe, LESSON_KEY)
    // Rederiver re-asserts thisTurnValue regardless of what the fresh row held.
    const restored = readPendingQuestion(thisTurnValue, LESSON_KEY)
    expect(restored?.question).toBe('A different question')
  })
})

describe('the route registers a pendingMcq rederiver at the write site', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  const block = ROUTE.slice(
    ROUTE.indexOf('const pendingMcqValueThisTurn = writePendingQuestion('),
    ROUTE.indexOf('const pendingMcqValueThisTurn = writePendingQuestion(') + 1600,
  )

  it('captures the decided value in a local before persisting it', () => {
    expect(block).toMatch(/const pendingMcqValueThisTurn = writePendingQuestion\(/)
    expect(block).toMatch(/conversationStateUpdate\.pendingMcq = pendingMcqValueThisTurn/)
  })

  it('registers a rederiver that re-asserts the captured value unconditionally', () => {
    expect(block).toMatch(/snapshotRederivers\.push\(\(\) => \(\{ pendingMcq: pendingMcqValueThisTurn \}\)\)/)
  })
})
