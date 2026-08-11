/**
 * THE FIGURES A CONVERSATION'S HISTORY SHOWED — restored, never regenerated.
 *
 * ── THE DEFECT THIS CLOSES ──────────────────────────────────────────────────
 * A diagram the tutor taught with lived in exactly two places: React state on
 * the message, and ONE session-level slot
 * (`LearnSession.contextSnapshot.visualSession`) that every turn overwrote. So
 * a refresh restored at most the most-recent figure, and the client attached it
 * to whatever the last ASSISTANT message happened to be — which is not
 * necessarily the message that showed it. Every earlier figure was simply gone,
 * while the tutor's words kept pointing at pictures that were no longer there.
 *
 * A visual shown while teaching is part of the learner's teaching record. The
 * invariant this module exists to hold:
 *
 *     REFRESH != REGENERATE
 *     HISTORY RECONSTRUCTION != A NEW TEACHING DECISION
 *
 * ── WHY THIS COSTS NOTHING ──────────────────────────────────────────────────
 * `Message.visualSession` stores IDENTITY, not payload — the same VisualSession
 * object the session slot already held. `restoreVisualSession` re-derives the
 * payload by running the deterministic resolver and the SAME admission gate the
 * live turn cleared. No model is called, no figure is generated, no asset is
 * duplicated, and nothing here can choose a different visual than the one that
 * was shown: the identity fixes the concept and the renderer.
 *
 * A runtime topic (one the curriculum does not contain) is restored through
 * `restoreRuntimeTopicSession`, which reads the figure back out of the cache it
 * was already written to and re-derives its id from its own words — so a
 * hand-edited row cannot attach an arbitrary description to a cached figure.
 * That path reads a cache; it still calls no model and generates nothing.
 *
 * ── WHAT IT REFUSES TO DO ───────────────────────────────────────────────────
 * A message with no stored identity restores NOTHING. It never borrows the
 * session's current figure, and it never inherits a neighbour's — that
 * borrowing was the mis-attribution defect, and silence is the correct answer
 * for a turn that genuinely showed no picture.
 */

import { restoreVisualSession, restoreRuntimeTopicSession } from './resolveVisual'

/** The payload shape the client already renders for a live turn. */
export interface RestoredMessageVisual {
  conceptId: string
  sceneSpec?: unknown
  visual?: string
  visualSpec?: unknown
}

/** Just enough of a message row for this to work on either read path. */
interface MessageWithVisual {
  id: string
  visualSession?: unknown
}

/**
 * Restore one stored identity to a renderable payload, or null.
 *
 * Never throws: a figure that cannot be restored degrades to no figure, which
 * is the pre-existing behaviour and strictly better than rendering a guess.
 */
export async function restoreOneMessageVisual(
  raw: unknown,
): Promise<RestoredMessageVisual | null> {
  if (!raw) return null
  try {
    const decision =
      restoreVisualSession(raw) ?? (await restoreRuntimeTopicSession(raw))
    const payload = decision?.payload
    if (!payload || !decision?.asset) return null

    // One branch per renderer the payload union declares. An unhandled
    // renderer restores nothing rather than guessing a shape — the same rule
    // the session-level restore already applies.
    const conceptId = decision.asset.conceptId
    if (payload.renderer === 'scene') return { conceptId, sceneSpec: payload.sceneSpec }
    if (payload.renderer === 'card') return { conceptId, visual: payload.visualType }
    if (payload.renderer === 'spec') return { conceptId, visualSpec: payload.visualSpec }
    return null
  } catch (err) {
    console.warn('[messageVisuals] restore skipped for one message:', err)
    return null
  }
}

/**
 * Restore every figure a page of history showed, keyed by message id.
 *
 * Messages carrying no identity are absent from the map — callers must treat
 * "absent" as "this message showed no figure", never as "look elsewhere".
 *
 * Identical identities are restored ONCE and shared: a figure held across
 * several turns is the common case, and re-deriving it per message would pay
 * the same deterministic cost repeatedly for a byte-identical answer.
 */
export async function restoreMessageVisuals(
  messages: readonly MessageWithVisual[],
): Promise<Record<string, RestoredMessageVisual>> {
  const out: Record<string, RestoredMessageVisual> = {}
  const memo = new Map<string, RestoredMessageVisual | null>()

  for (const m of messages) {
    if (!m?.visualSession) continue
    // The stored identity IS the cache key: same identity, same figure, by
    // construction — that is what makes re-deriving it deterministic.
    let key: string
    try {
      key = JSON.stringify(m.visualSession)
    } catch {
      continue
    }
    if (!memo.has(key)) memo.set(key, await restoreOneMessageVisual(m.visualSession))
    const restored = memo.get(key)
    if (restored) out[m.id] = restored
  }

  return out
}
