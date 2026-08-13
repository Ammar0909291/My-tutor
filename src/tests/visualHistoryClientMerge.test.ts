import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { applyRestoredVisuals, type VisualCarryingMessage } from '@/lib/teaching/visual/messageMerge'

type ChatMsg = VisualCarryingMessage & { content: string; ts: number }

/**
 * THE ROOT CAUSE OF "DIAGRAMS DISAPPEAR ON REFRESH" — CLIENT SIDE, NOT SERVER.
 *
 * ── WHAT WAS ALREADY CORRECT ────────────────────────────────────────────────
 * `visualHistoryPersistence.test.ts` proves the SERVER half of this feature
 * has been right all along: `Message.visualSession` stores identity per
 * message, `/api/sessions/history` restores each figure keyed by message id
 * via `restoreMessageVisuals`, never by position. Every test in that file
 * passed before this fix and still does — the server was never the bug.
 *
 * ── WHERE THE FIGURE ACTUALLY WENT MISSING ──────────────────────────────────
 * `LessonScreen.tsx` had TWO independent history-restoration code paths:
 *
 *   1. The mount-time WhatsApp-style restore effect — runs on EVERY page
 *      load, which is refresh, logout→login, and reopening the app. It built
 *      `restored: ChatMsg[]` from `hist.data.messages` and called
 *      `setMessages(restored)` directly, WITHOUT EVER READING
 *      `hist.data.visuals` — the map the server had already computed.
 *   2. `startLesson()`'s own restoration, reachable only via an explicit
 *      resumed-session flow (not an ordinary page load), which DID apply
 *      `hist.data.visuals` correctly.
 *
 * So the correct path existed and was tested; it simply never ran for the
 * overwhelmingly common case of a learner just reopening the app. The fix
 * extracts the merge into `lib/teaching/visual/messageMerge.ts` (pure, no
 * React) so both restoration paths import ONE implementation instead of one
 * defining its own — this suite exercises that real function directly, plus
 * a source assertion that neither path can silently stop calling it again.
 *
 * ── ANTI-VACUITY ────────────────────────────────────────────────────────────
 * `restoresRealFigure` below pins the actual attached payload (not just "is
 * defined") — a regression that made restoration return an empty merge
 * would fail here even though "no crash" tests would still pass.
 */

const msg = (id: string, over: Partial<ChatMsg> = {}): ChatMsg => ({
  id, content: 'x', ts: Date.now(), ...over,
})

describe('applyRestoredVisuals — TEST 1 (from the task spec)', () => {
  it('Message A keeps Diagram A, Message B stays visual-free, after restoring history', () => {
    const restored = [msg('A'), msg('B')]
    const visuals = { A: { conceptId: 'phys.mech.free-body-diagram', visual: 'force_diagram' } }

    const { messages, anyAttached } = applyRestoredVisuals(restored, visuals)

    // Anti-vacuity: the actual figure, not merely "something happened".
    expect(messages.find((m) => m.id === 'A')?.visual).toBe('force_diagram')
    expect(anyAttached).toBe(true)
    // B never borrows A's figure — the exact mis-attribution defect (D10)
    // this whole feature exists to close.
    expect(messages.find((m) => m.id === 'B')?.visual).toBeUndefined()
    expect(messages.find((m) => m.id === 'B')?.sceneSpec).toBeUndefined()
    expect(messages.find((m) => m.id === 'B')?.visualSpec).toBeUndefined()
  })
})

describe('applyRestoredVisuals — TEST 2 (from the task spec)', () => {
  it('A -> A, B -> none, C -> B, exactly, after reconstructing history', () => {
    const restored = [msg('A'), msg('B'), msg('C')]
    const visuals = {
      A: { conceptId: 'phys.mech.free-body-diagram', visual: 'force_diagram' },
      C: { conceptId: 'phys.mech.free-body-diagram', visual: 'inclined_plane' },
    }

    const { messages } = applyRestoredVisuals(restored, visuals)

    expect(messages.find((m) => m.id === 'A')?.visual).toBe('force_diagram')
    expect(messages.find((m) => m.id === 'B')?.visual).toBeUndefined()
    expect(messages.find((m) => m.id === 'C')?.visual).toBe('inclined_plane')
    // A must not have picked up C's (or vice versa) — different figures,
    // never merged or swapped.
    expect(messages.find((m) => m.id === 'A')?.visual).not.toBe(
      messages.find((m) => m.id === 'C')?.visual,
    )
  })
})

describe('applyRestoredVisuals — negative and edge cases', () => {
  it('no visuals map at all leaves every message untouched', () => {
    const restored = [msg('A'), msg('B')]
    const { messages, anyAttached } = applyRestoredVisuals(restored, undefined)
    expect(messages).toEqual(restored)
    expect(anyAttached).toBe(false)
  })

  it('a visuals entry with no valid payload (all fields absent) attaches nothing', () => {
    const restored = [msg('A')]
    const { messages, anyAttached } = applyRestoredVisuals(restored, { A: { conceptId: 'x' } })
    expect(messages[0].visual).toBeUndefined()
    expect(messages[0].sceneSpec).toBeUndefined()
    expect(messages[0].visualSpec).toBeUndefined()
    expect(anyAttached).toBe(false)
  })

  it('an invalid sceneSpec is dropped rather than rendered — defense in depth', () => {
    const restored = [msg('A')]
    const { messages, anyAttached } = applyRestoredVisuals(restored, {
      A: { conceptId: 'x', sceneSpec: { not: 'a valid scene' } },
    })
    expect(messages[0].sceneSpec).toBeUndefined()
    expect(anyAttached).toBe(false)
  })

  it('is idempotent — applying it twice yields the same result', () => {
    const restored = [msg('A'), msg('B')]
    const visuals = { A: { conceptId: 'x', visual: 'force_diagram' } }
    const once = applyRestoredVisuals(restored, visuals)
    const twice = applyRestoredVisuals(once.messages, visuals)
    expect(twice.messages).toEqual(once.messages)
  })

  it('text content, ids, and ordering are never altered by the merge', () => {
    const restored = [msg('A', { content: 'hello' }), msg('B', { content: 'world' })]
    const { messages } = applyRestoredVisuals(restored, {
      A: { conceptId: 'x', visual: 'force_diagram' },
    })
    expect(messages.map((m) => m.id)).toEqual(['A', 'B'])
    expect(messages.map((m) => m.content)).toEqual(['hello', 'world'])
  })
})

// ── SOURCE ASSERTION — both restoration paths must call the shared merge ────
//
// LessonScreen.tsx has no React-render test harness in this repo (matching
// completedLessonIsReEnterable.test.ts's own note on this file). The bug
// this whole suite exists to prevent from recurring was exactly a THIRD
// restoration path that built `messages` without calling this function —
// so the regression guard that actually matters is "every place that reads
// history and calls setMessages also merges visuals first."
const SCREEN = path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx')
const screenSrc = readFileSync(SCREEN, 'utf8')

describe('both history-restoration paths call the shared merge (regression guard)', () => {
  it('LessonScreen imports the shared merge from lib/ rather than redefining it', () => {
    expect(screenSrc).toMatch(/import \{ applyRestoredVisuals \} from '@\/lib\/teaching\/visual\/messageMerge'/)
  })

  it('the mount-time restore effect merges visuals before setMessages — the actual fix', () => {
    const lines = screenSrc.split('\n')
    const mergeLine = lines.findIndex((l) => /applyRestoredVisuals\(restored, hist\?\.\s*data\?\.\s*visuals\)/.test(l))
    const setLine = lines.findIndex((l, i) => i > mergeLine && /setMessages\(restoredWithVisuals\)/.test(l))
    expect(mergeLine).toBeGreaterThan(-1)
    expect(setLine).toBeGreaterThan(mergeLine)
  })

  it('startLesson() still merges visuals on both of its own restore branches', () => {
    const occurrences = (screenSrc.match(/applyRestoredVisuals\(restored,/g) ?? []).length
    // Mount-time effect (1) + startLesson's history branch (1) +
    // startLesson's resumed-session fallback branch (1) = 3 call sites.
    expect(occurrences).toBe(3)
  })

  it('no restoration path calls setMessages directly on a freshly-mapped array without merging first', () => {
    // The exact shape of the original defect: `setMessages(restored)` where
    // `restored` was built straight from the history fetch. Any survivor of
    // this pattern is the bug returning under a different name.
    expect(screenSrc).not.toMatch(/setMessages\(restored\)/)
  })
})
