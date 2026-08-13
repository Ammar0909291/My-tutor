/**
 * Merge server-restored figures onto the messages that actually showed them —
 * keyed by message id, never by position.
 *
 * Lives in `lib/` rather than inside LessonScreen.tsx (where it originally
 * sat as an unexported closure) for one concrete reason: this is the
 * function whose ABSENCE from one of two client-side history-restoration
 * paths was the real cause of "diagrams disappear on refresh". A pure,
 * standalone module is both the fix for that (one shared implementation
 * both paths import) and the only way to unit-test it — LessonScreen.tsx is
 * a large 'use client' component this repo's vitest config cannot parse as
 * an import target (JSX in a .tsx file outside the app's own build), so a
 * function trapped inside it can only ever be source-asserted, never really
 * exercised. See src/tests/visualHistoryClientMerge.test.ts.
 *
 * ── THE DEFECT THIS CLOSES ───────────────────────────────────────────────────
 * `Message.visualSession` (identity) + `/api/sessions/history`'s restored
 * `visuals` map (keyed by message id, never by position) were already
 * correct end to end — see messageVisuals.ts and
 * visualHistoryPersistence.test.ts, which passed before and after this file
 * existed. The bug was purely client-side: LessonScreen's mount-time
 * WhatsApp-style restore effect — the path that runs on every refresh,
 * logout/login, and reopen, i.e. the overwhelmingly common case — built its
 * own `restored` array straight from `hist.data.messages` and called
 * `setMessages(restored)` directly, never reading `hist.data.visuals` at
 * all. A second restoration path inside `startLesson()` (reachable only via
 * an explicit resumed-session flow, not an ordinary page load) DID apply it
 * correctly, which is exactly why the server-side tests never caught this:
 * the correct code existed and was tested, it simply never ran for most
 * learners.
 *
 * The server has already run the resolver and the admission gate; this
 * re-validates the payload once more before rendering — the same
 * defense-in-depth the live path applies, so a payload that does not
 * validate is dropped rather than drawn.
 */

import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { parseVisualSpec } from '@/lib/visuals/visualSpec'

/** The minimal shape this function reads and writes — deliberately not tied
 *  to LessonScreen's full ChatMsg type, so it stays importable anywhere. */
export interface VisualCarryingMessage {
  id: string
  visual?: string
  visualSpec?: unknown
  sceneSpec?: unknown
}

export function applyRestoredVisuals<T extends VisualCarryingMessage>(
  msgs: T[],
  visuals: unknown,
): { messages: T[]; anyAttached: boolean } {
  if (!visuals || typeof visuals !== 'object') return { messages: msgs, anyAttached: false }
  const byId = visuals as Record<string, {
    conceptId?: string; sceneSpec?: unknown; visual?: string; visualSpec?: unknown
  }>
  let anyAttached = false
  const messages = msgs.map((m) => {
    const rv = byId[m.id]
    if (!rv) return m
    const scene = rv.sceneSpec
    const validScene = scene && validateSceneSpec(scene).valid ? scene : undefined
    const validSpec = parseVisualSpec(rv.visualSpec) ?? undefined
    const visualType = typeof rv.visual === 'string' ? rv.visual : undefined
    if (!validScene && !validSpec && !visualType) return m
    anyAttached = true
    return { ...m, sceneSpec: validScene, visualSpec: validSpec, visual: visualType }
  })
  return { messages, anyAttached }
}
