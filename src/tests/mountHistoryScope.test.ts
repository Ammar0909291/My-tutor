/**
 * C — THE MOUNT-TIME HISTORY FETCH.
 *
 * ── THE DEFECT, AND WHY IT IS REAL RATHER THAN THEORETICAL ────────────────
 * LessonScreen's mount effect fires `/api/sessions/history` and `/api/sessions`
 * in PARALLEL — deliberately, because the sequential order was the original
 * cause of the "Loading your lesson..." delay. So the history request cannot
 * name a session, the server scopes it by the PER-USER pointer, and with
 * another session open on the account that pointer can name a DIFFERENT
 * lesson. This is the restore path a returning learner actually takes
 * (refresh, re-open, re-login) — the OTHER restore path in the file is inside
 * `startLesson`, i.e. only the welcome-screen button — so the screen could
 * render one lesson's transcript while the tutor taught this session's lesson,
 * and nothing re-fetched afterwards to correct it.
 *
 * The fix adds NO delay. Both endpoints already computed the key they resolved
 * and now return it; when they agree there is no second request at all.
 */
import { describe, it, expect } from 'vitest'
import { shouldRefetchScopedHistory } from '@/lib/teaching/sessionLessonPointer'
import { readFileSync } from 'fs'
import path from 'path'

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), 'utf8')

describe('T8 — the correction is deterministic, and free when nothing is wrong', () => {
  it('keys agree ⇒ NO re-fetch (every single-session learner pays nothing)', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: 's1', sessionLessonKey: 'phys.meas.dimensions', historyLessonKey: 'phys.meas.dimensions',
    })).toBe(false)
  })

  it('keys differ ⇒ exactly one corrective re-fetch', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: 's1', sessionLessonKey: 'phys.meas.dimensions', historyLessonKey: 'phys.mech.kinematics-1d',
    })).toBe(true)
  })

  it('both null (an unscoped learner) ⇒ NO re-fetch', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: 's1', sessionLessonKey: null, historyLessonKey: null,
    })).toBe(false)
  })

  it('null is a REAL value — session has no lesson but the page was scoped ⇒ correct it', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: 's1', sessionLessonKey: null, historyLessonKey: 'phys.mech.kinematics-1d',
    })).toBe(true)
  })

  it('no session id yet ⇒ NO re-fetch (nothing to scope BY)', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: null, sessionLessonKey: 'a', historyLessonKey: 'b',
    })).toBe(false)
    expect(shouldRefetchScopedHistory({
      sessionId: undefined, sessionLessonKey: 'a', historyLessonKey: 'b',
    })).toBe(false)
  })

  it('the session did not report a key ⇒ NO re-fetch — never act on absent information', () => {
    expect(shouldRefetchScopedHistory({
      sessionId: 's1', sessionLessonKey: undefined, historyLessonKey: 'b',
    })).toBe(false)
  })

  it('IDEMPOTENT: after the corrective fetch the keys agree, so it cannot loop', () => {
    const sessionKey = 'phys.meas.dimensions'
    expect(shouldRefetchScopedHistory({ sessionId: 's1', sessionLessonKey: sessionKey, historyLessonKey: 'other' })).toBe(true)
    // the scoped page comes back carrying the session's own key
    expect(shouldRefetchScopedHistory({ sessionId: 's1', sessionLessonKey: sessionKey, historyLessonKey: sessionKey })).toBe(false)
  })
})

describe('T9 — the three consumers agree on one key', () => {
  const HISTORY = read('src/app/api/sessions/history/route.ts')
  const SESSIONS = read('src/app/api/sessions/route.ts')
  const CHAT = read('src/app/api/learn/chat/route.ts')

  it('all three resolve through the SAME resolver', () => {
    expect(HISTORY).toContain('resolveSessionLessonSlug')
    expect(SESSIONS).toContain('resolveSessionLessonSlug')
    expect(CHAT).toContain('resolveSessionLessonSlug')
  })

  it('the screen filter reports the key it scoped by, so the client can compare', () => {
    const at = HISTORY.indexOf('hasMore: raw.length === HISTORY_DISPLAY_LIMIT')
    expect(at).toBeGreaterThan(-1)
    expect(HISTORY.slice(at, at + 700)).toMatch(/\n\s*lessonKey,/)
  })

  it('session creation reports the key it resolved, on BOTH the resume and create paths', () => {
    expect(SESSIONS).toContain('resumed: true, restoredVisual, messageVisuals, lessonKey: resumeLessonKey')
    expect(SESSIONS).toContain('data: learnSession, lessonKey: resumeLessonKey')
  })

  it('Message.lessonKey and the prompt scope still share ONE resolution per turn', () => {
    // unchanged by this task — re-asserted so C cannot regress PCD-004
    expect((CHAT.match(/const activeLessonSlugHoisted = /g) ?? []).length).toBe(1)
    expect((CHAT.match(/lessonKeyFor\w*\(\{\s*\n?\s*topicSlug: activeLessonSlugHoisted,/g) ?? []).length).toBe(3)
  })
})

describe('the client wiring — a missing CALL is the failure mode here', () => {
  const SCREEN = read('src/components/learn/LessonScreen.tsx')

  it('the mount effect asks the predicate and re-fetches scoped to its own session', () => {
    const at = SCREEN.indexOf('shouldRefetchScopedHistory({')
    expect(at).toBeGreaterThan(-1)
    const block = SCREEN.slice(at, at + 900)
    expect(block).toContain('sessionId=${encodeURIComponent(scopedSid)}')
    expect(block).toContain('/api/sessions/history?subject=')
  })

  it('the call is REACHABLE — the guard is not short-circuited', () => {
    // Found by negative control: asserting only that the call TEXT exists
    // passed with the condition disabled as `if (false && scopedSid && ...)`.
    // The condition itself is therefore pinned exactly, so a dead call fails.
    expect(SCREEN).toContain('if (scopedSid && shouldRefetchScopedHistory({')
    const at = SCREEN.indexOf('if (scopedSid && shouldRefetchScopedHistory({')
    const cond = SCREEN.slice(at, SCREEN.indexOf('})) {', at))
    expect(cond).not.toMatch(/\bfalse\b|\btrue\b|\/\//)
  })

  it('a FAILED correction keeps the page it already had — it never blanks history', () => {
    const at = SCREEN.indexOf('shouldRefetchScopedHistory({')
    const block = SCREEN.slice(at, at + 1100)
    expect(block).toContain('if (scoped?.success) hist = scoped')
    expect(block).toMatch(/catch \{[^}]*keep the unscoped page/)
  })

  it('NO artificial delay was introduced — the two mount requests still run in parallel', () => {
    expect(SCREEN).toMatch(/const \[histRes, sessionRes\] = await Promise\.all\(\[/)
  })

  it('the mount fetch itself still sends no sessionId (it genuinely has none yet)', () => {
    const at = SCREEN.indexOf('const [histRes, sessionRes] = await Promise.all([')
    const block = SCREEN.slice(at, at + 400)
    expect(block).toContain('/api/sessions/history?subject=')
    expect(block).not.toContain('sessionId=')
  })
})
