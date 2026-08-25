/**
 * PHASE 7K TRACK D — the tutor must not describe a figure the client lacks.
 *
 * REPRODUCED LIVE (2026-08-25, phys.opt.total-internal-reflection). On a turn
 * whose response carried NO figure — verified by dumping every response key,
 * not by trusting a summariser — the tutor wrote:
 *
 *   "Key points from the figure you're looking at: … the labels 'θ < θc',
 *    'θ = θc', and 'θ > θc' show what happens as the angle changes"
 *
 * and, told none was visible, blamed the learner's browser:
 *
 *   "there's a figure already attached to this message… try refreshing the
 *    page or switching your browser window."
 *
 * Server-side cause, from the same request's logs:
 *
 *   [visual-v2] { continuity: 'continuity', heldTurns: 5 }   → 6 → 7
 *
 * The engine HELD the figure — deliberately not re-sending it — because
 * `contextSnapshot.visualSession` is read at its load site as "the figure
 * already on the learner's screen". After a lesson open that is false: the
 * screen is new and shows nothing.
 *
 * FIXED AT THE STATE LAYER, per the phase's own instruction not to add a
 * phrase filter. Clearing the session does not lose continuity — it forces the
 * next turn to re-derive and re-SEND, re-establishing continuity against a
 * client that genuinely has the figure.
 */
import { describe, it, expect } from 'vitest'
import {
  clearVisualSessionForNewClientView, parseVisualSession,
} from '@/lib/teaching/visual/session'

/**
 * A session mid-hold, in the shape parseVisualSession actually requires.
 * The first version of this fixture used {conceptId, figureId, heldTurns} —
 * the field names from the [visual-v2] LOG LINE — and parsed to null, which
 * would have made the whole file assert nothing. The log's vocabulary is not
 * the snapshot's schema; the schema wants representation + renderer.
 */
const HELD = {
  conceptId: 'phys.opt.total-internal-reflection',
  representation: 'labelled_figure',
  renderer: 'scene',
  turns: 5,
}

describe('Phase 7K Track D — a remembered figure is not a rendered figure', () => {
  it('REPRODUCES IT: a held session survives into a new view and reads as active', () => {
    const carried = parseVisualSession(HELD)
    expect(carried).not.toBeNull()   // the engine would hold, and send nothing
  })

  it('FIXES IT: after a lesson open there is no active session to hold', () => {
    const merged = { ...{ visualSession: HELD }, ...clearVisualSessionForNewClientView() }
    expect(parseVisualSession(merged.visualSession)).toBeNull()
  })

  it('retires the key with an explicit null — the writer MERGES, it cannot delete', () => {
    const delta = clearVisualSessionForNewClientView()
    expect(delta.visualSession).toBeNull()
    expect(Object.keys(delta)).toEqual(['visualSession'])
  })

  it('parseVisualSession already treats null/undefined as no session — no reader changed', () => {
    expect(parseVisualSession(null)).toBeNull()
    expect(parseVisualSession(undefined)).toBeNull()
  })

  it('takes no argument, so it cannot rewrite unrelated snapshot state', () => {
    expect(clearVisualSessionForNewClientView.length).toBe(0)
  })
})

// ── NEGATIVE CONTROLS — uninterrupted continuity is untouched ────────────────
describe('Phase 7K Track D — mid-lesson continuity still holds', () => {
  it('an ongoing session is still parsed as active when nothing cleared it', () => {
    // The clear fires ONLY on lesson open. A normal turn never calls it, so
    // hold-and-carry — which stops an answer swapping a vector figure for a
    // geometry one mid-correction — behaves exactly as before.
    expect(parseVisualSession(HELD)).not.toBeNull()
  })

  it('clearing is not global: it returns a delta, it does not mutate a snapshot', () => {
    const snapshot = { visualSession: HELD, memoryContext: 'keep', sessionEpisode: { phase: 'CORE' } }
    const delta = clearVisualSessionForNewClientView()
    const merged = { ...snapshot, ...delta }
    expect(merged.memoryContext).toBe('keep')
    expect(merged.sessionEpisode).toEqual({ phase: 'CORE' })
    expect(snapshot.visualSession).toBe(HELD)      // input untouched
  })
})
