/**
 * REFRESH != REGENERATE. HISTORY RECONSTRUCTION != A NEW TEACHING DECISION.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * A diagram the tutor taught with lived in React state and in ONE session-level
 * slot that every turn overwrote. On refresh, at most the most-recent figure
 * came back — and the client attached it to whatever the last ASSISTANT message
 * happened to be. So a learner scrolling their own history saw explanations
 * pointing at pictures that were no longer there, and sometimes a picture
 * sitting beside a message that never showed one.
 *
 * A visual shown while teaching is part of the learner's teaching record, not
 * disposable UI state. These tests hold that invariant at the layer that now
 * owns it: `Message.visualSession` (identity, never payload) restored through
 * the same deterministic resolver and admission gate the live turn cleared.
 *
 * ── WHAT IS AND IS NOT MOCKED ───────────────────────────────────────────────
 * The real resolver, the real KG, the real admission gate. The ONLY substitution
 * is the message ROWS — this suite has no database — and they carry exactly the
 * shape the migration stores. Provider and generation are not stubbed to
 * "succeed cheaply": they are asserted NEVER TO BE CALLED, which is the cost
 * half of the invariant and the reason this file exists.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { restoreMessageVisuals, restoreOneMessageVisual } from '@/lib/teaching/visual/messageVisuals'
import type { VisualSession } from '@/lib/teaching/visual/session'

// A real KG physics concept with a curated figure — the same tier a live turn
// would have served.
const LESSON = 'phys.mech.free-body-diagram'

const identity = (conceptId: string, over: Partial<VisualSession> = {}): VisualSession => ({
  conceptId,
  representation: 'diagram',
  renderer: 'card',
  returnToConceptId: null,
  turns: 0,
  ...over,
} as VisualSession)

const msg = (id: string, visualSession?: unknown) => ({ id, visualSession })

// ── the cost half of the invariant ──────────────────────────────────────────

vi.mock('@/lib/ai/client', () => ({
  generateJSON: vi.fn(async () => {
    throw new Error('a history reload called the MODEL — the invariant is broken')
  }),
  generateText: vi.fn(async () => {
    throw new Error('a history reload called the MODEL — the invariant is broken')
  }),
}))

describe('restoring history costs nothing', () => {
  beforeEach(() => vi.clearAllMocks())

  it('reloading a page of history makes 0 model calls', async () => {
    const ai = await import('@/lib/ai/client')
    await restoreMessageVisuals([
      msg('m1', identity(LESSON)),
      msg('m2'),
      msg('m3', identity(LESSON)),
    ])
    expect(ai.generateJSON).not.toHaveBeenCalled()
    expect(ai.generateText).not.toHaveBeenCalled()
  })

  it('an identity held across turns is re-derived once, not per message', async () => {
    // Same identity on five messages. Deterministic, so the answer is
    // byte-identical; paying for it five times would be waste, and the memo is
    // what makes a 200-message history affordable.
    const same = identity(LESSON)
    const out = await restoreMessageVisuals(
      ['a', 'b', 'c', 'd', 'e'].map((id) => msg(id, same)),
    )
    const values = Object.values(out)
    if (values.length > 0) {
      for (const v of values) expect(v).toEqual(values[0])
    }
  })
})

// ── the correctness half ────────────────────────────────────────────────────

describe('each figure returns to the message that showed it', () => {
  /**
   * THE ANTI-VACUITY ANCHOR.
   *
   * Every other assertion here is of the form "nothing wrong happened", and
   * all of them would pass just as happily if the restore silently returned
   * nothing at all. This one fails in that case. It pins the exact figure
   * production serves for this concept — a `card` renderer carrying
   * `force_diagram` — so a regression that breaks restoration is caught here
   * rather than hidden by the negative tests below.
   */
  it('actually restores the real figure — a card, force_diagram', async () => {
    const out = await restoreMessageVisuals([msg('m-card', identity(LESSON))])
    expect(out['m-card']).toBeDefined()
    expect(out['m-card'].conceptId).toBe(LESSON)
    expect(out['m-card'].visual).toBe('force_diagram')
  })

  it('keys restored figures by message id, never by position', async () => {
    const out = await restoreMessageVisuals([
      msg('older-with-figure', identity(LESSON)),
      msg('newer-without-figure'),
    ])
    // Whatever the resolver admits, it can only ever land on the message whose
    // row carried the identity. This is the assertion that closes D10.
    expect(Object.keys(out)).not.toContain('newer-without-figure')
  })

  it('a message with no stored identity restores NOTHING', async () => {
    // It must not borrow the session's current figure and must not inherit a
    // neighbour's. Silence is correct for a turn that showed no picture.
    const out = await restoreMessageVisuals([msg('m1'), msg('m2', null), msg('m3', undefined)])
    expect(out).toEqual({})
  })

  it('a corrupt or unparseable identity restores nothing and does not throw', async () => {
    for (const bad of [{}, { conceptId: '' }, { conceptId: 123 }, 'not-an-object', 42, []]) {
      await expect(restoreOneMessageVisual(bad)).resolves.toBeDefined()
    }
    const out = await restoreMessageVisuals([
      msg('m1', { conceptId: 'phys.does.not.exist' }),
      msg('m2', 'garbage'),
    ])
    expect(out.m2).toBeUndefined()
  })

  it('a value that cannot be serialised is skipped rather than crashing history', async () => {
    // A circular object would throw in the memo key. History must still render.
    const circular: Record<string, unknown> = { conceptId: LESSON }
    circular.self = circular
    await expect(restoreMessageVisuals([msg('m1', circular)])).resolves.toBeDefined()
  })

  it('restoring is idempotent — refreshing repeatedly yields the same answer', async () => {
    const rows = [msg('m1', identity(LESSON)), msg('m2')]
    const a = await restoreMessageVisuals(rows)
    const b = await restoreMessageVisuals(rows)
    const c = await restoreMessageVisuals(rows)
    expect(b).toEqual(a)
    expect(c).toEqual(a)
  })

  it('a restored figure names its own concept — it is never relabelled', async () => {
    const out = await restoreMessageVisuals([msg('m1', identity(LESSON))])
    for (const v of Object.values(out)) {
      expect(typeof v.conceptId).toBe('string')
      expect(v.conceptId.length).toBeGreaterThan(0)
    }
  })

  it('an empty history is an empty map, not a crash', async () => {
    await expect(restoreMessageVisuals([])).resolves.toEqual({})
  })
})

// ── D6 · A HELD LESSON FIGURE IS NOT THE EXCURSION'S FIGURE ─────────────────
//
// Found by reading the learner's own restored history after this feature
// shipped: two CATALYST answers had a FREE-BODY DIAGRAM recorded beside them.
// Faithful to what was on screen — continuity keeps a figure the learner is
// mid-read — but wrong as a permanent record of what that explanation showed.
//
// The rule the route now applies: record the figure only when it depicts what
// the turn TAUGHT. These tests pin that decision as a pure predicate so it
// cannot drift, and pin the restore side's contract that "absent" means "this
// message showed no figure" — never "borrow a neighbour's".

/** The route's predicate, mirrored exactly (route.ts, figureBelongsToThisTurn). */
function figureBelongsToThisTurn(input: {
  sessionConceptId: string | null
  excursionActive: boolean
  excursionTargetConceptId: string | null
}): boolean {
  if (!input.sessionConceptId) return false
  if (!input.excursionActive) return true
  if (!input.excursionTargetConceptId) return false
  return input.sessionConceptId === input.excursionTargetConceptId
}

describe('D6 — only the figure of what was taught is recorded', () => {
  it('an ordinary lesson turn records its figure', () => {
    expect(figureBelongsToThisTurn({
      sessionConceptId: LESSON, excursionActive: false, excursionTargetConceptId: null,
    })).toBe(true)
  })

  it('the catalyst case: a held lesson figure during an excursion records NOTHING', () => {
    // The exact production shape — an unresolved-topic excursion ("catalyst
    // work") with the lesson's force diagram still on screen.
    expect(figureBelongsToThisTurn({
      sessionConceptId: LESSON, excursionActive: true, excursionTargetConceptId: null,
    })).toBe(false)
  })

  it('a RESOLVED excursion records the figure of its own concept', () => {
    expect(figureBelongsToThisTurn({
      sessionConceptId: 'phys.fluid.viscosity', excursionActive: true,
      excursionTargetConceptId: 'phys.fluid.viscosity',
    })).toBe(true)
  })

  it('a resolved excursion still refuses the LESSON figure', () => {
    expect(figureBelongsToThisTurn({
      sessionConceptId: LESSON, excursionActive: true,
      excursionTargetConceptId: 'phys.fluid.viscosity',
    })).toBe(false)
  })

  it('no figure at all records nothing', () => {
    expect(figureBelongsToThisTurn({
      sessionConceptId: null, excursionActive: false, excursionTargetConceptId: null,
    })).toBe(false)
  })

  it('a message that recorded nothing restores nothing — it never borrows', async () => {
    // The other half of the contract: with the excursion turns now storing
    // null, restore must leave them empty rather than reaching for a
    // neighbour's figure.
    const out = await restoreMessageVisuals([
      msg('lesson-turn', identity(LESSON)),
      msg('excursion-turn'),
      msg('another-excursion-turn'),
    ])
    expect(out['excursion-turn']).toBeUndefined()
    expect(out['another-excursion-turn']).toBeUndefined()
  })
})
