/**
 * PCD-004A — two tabs are two conversations.
 *
 * The resume rule is a pure function (chooseResumableSession) driven here with
 * real snapshot shapes, plus the wiring assertions that a missing CALL would
 * otherwise hide. The characterization file sessionIdentityMultiTab.test.ts
 * recorded WHY this was escalated; this one records the decision that closed
 * it — a tab id used as a resume PREFERENCE, never as a filter and never as a
 * credential.
 */
import { describe, it, expect } from 'vitest'
import {
  chooseResumableSession, isClaimedByAnotherTab, readSessionTabOwner,
  sessionTabOwnerDelta, SESSION_TAB_OWNER_KEY, TAB_CLAIM_TTL_MS,
} from '@/lib/teaching/sessionLessonPointer'
import { readFileSync } from 'fs'
import path from 'path'

const NOW = new Date('2026-09-12T12:00:00Z')
const ago = (ms: number) => new Date(NOW.getTime() - ms).toISOString()
const owned = (tabId: string, seenAgoMs: number) =>
  ({ [SESSION_TAB_OWNER_KEY]: { tabId, seenAt: ago(seenAgoMs) } })

describe('T1 — two tabs, different lessons → independent sessions', () => {
  it('a second LIVE tab does not resume the first tab\'s session', () => {
    const candidates = [{ id: 'S1', contextSnapshot: owned('tab-1', 5_000) }]
    const r = chooseResumableSession({ candidates, tabId: 'tab-2', now: NOW })
    expect(r.reason).toBe('create-new')
    expect(r.session).toBeNull()
  })

  it('...and once it has its own, each tab keeps resuming its own', () => {
    const candidates = [
      { id: 'S2', contextSnapshot: owned('tab-2', 1_000) },
      { id: 'S1', contextSnapshot: owned('tab-1', 2_000) },
    ]
    expect(chooseResumableSession({ candidates, tabId: 'tab-1', now: NOW }).session?.id).toBe('S1')
    expect(chooseResumableSession({ candidates, tabId: 'tab-2', now: NOW }).session?.id).toBe('S2')
  })

  it('the same tab wins even when it is NOT the newest session', () => {
    const candidates = [
      { id: 'S9', contextSnapshot: owned('tab-9', 1_000) },   // newest
      { id: 'S1', contextSnapshot: owned('tab-1', 60_000) },
    ]
    const r = chooseResumableSession({ candidates, tabId: 'tab-1', now: NOW })
    expect(r).toMatchObject({ reason: 'same-tab' })
    expect(r.session?.id).toBe('S1')
  })
})

describe('T2/T3 — legitimate resume is preserved', () => {
  it('a REFRESH of the same tab resumes, it does not create', () => {
    const candidates = [{ id: 'S1', contextSnapshot: owned('tab-1', 30_000) }]
    const r = chooseResumableSession({ candidates, tabId: 'tab-1', now: NOW })
    expect(r.reason).toBe('same-tab')
    expect(r.session?.id).toBe('S1')
  })

  it('a REOPENED tab (new id, stale claim) takes the session over — the 24h resume survives', () => {
    const candidates = [{ id: 'S1', contextSnapshot: owned('tab-old', TAB_CLAIM_TTL_MS + 60_000) }]
    const r = chooseResumableSession({ candidates, tabId: 'tab-new', now: NOW })
    expect(r.reason).toBe('unclaimed')
    expect(r.session?.id).toBe('S1')
  })

  it('a session nobody ever claimed (pre-PCD-004A row) is resumable by anyone', () => {
    const candidates = [{ id: 'S1', contextSnapshot: { conversationState: {} } }]
    expect(chooseResumableSession({ candidates, tabId: 'tab-1', now: NOW }).session?.id).toBe('S1')
  })

  it('NO tabId at all ⇒ the pre-PCD-004A behaviour: resume the most recent', () => {
    const candidates = [
      { id: 'S2', contextSnapshot: owned('tab-2', 1_000) },
      { id: 'S1', contextSnapshot: owned('tab-1', 2_000) },
    ]
    for (const tabId of [undefined, null, '', '   ']) {
      const r = chooseResumableSession({ candidates, tabId, now: NOW })
      expect(r.session?.id).toBe('S2')
      expect(r.reason).toBe('unclaimed')
    }
  })

  it('no candidates at all ⇒ create, never crash', () => {
    expect(chooseResumableSession({ candidates: [], tabId: 'tab-1', now: NOW }))
      .toEqual({ session: null, reason: 'create-new' })
  })
})

describe('the claim itself', () => {
  it('expires exactly at the TTL, not before', () => {
    const snap = owned('other', TAB_CLAIM_TTL_MS - 1)
    expect(isClaimedByAnotherTab({ snapshot: snap, tabId: 'mine', now: NOW })).toBe(true)
    expect(isClaimedByAnotherTab({ snapshot: owned('other', TAB_CLAIM_TTL_MS), tabId: 'mine', now: NOW })).toBe(false)
  })

  it('a session is never "claimed against" its own owner', () => {
    expect(isClaimedByAnotherTab({ snapshot: owned('mine', 1_000), tabId: 'mine', now: NOW })).toBe(false)
  })

  it('a claim stamped in the FUTURE (clock skew) does not lock a session forever', () => {
    const future = { [SESSION_TAB_OWNER_KEY]: { tabId: 'other', seenAt: new Date(NOW.getTime() + 60_000).toISOString() } }
    expect(isClaimedByAnotherTab({ snapshot: future, tabId: 'mine', now: NOW })).toBe(false)
  })

  it('the delta is a normal snapshot key, and writes NOTHING without a tabId', () => {
    expect(sessionTabOwnerDelta('tab-1', NOW))
      .toEqual({ [SESSION_TAB_OWNER_KEY]: { tabId: 'tab-1', seenAt: NOW.toISOString() } })
    for (const v of [null, undefined, '', '  ']) {
      // an empty delta cannot clear someone else's claim
      expect(sessionTabOwnerDelta(v, NOW)).toEqual({})
    }
  })

  it('every malformed owner shape reads as unowned (fail-soft, like the pointer)', () => {
    for (const bad of [
      null, undefined, 0, 'x', [], { [SESSION_TAB_OWNER_KEY]: 'x' },
      { [SESSION_TAB_OWNER_KEY]: {} },
      { [SESSION_TAB_OWNER_KEY]: { tabId: 't' } },                      // no seenAt
      { [SESSION_TAB_OWNER_KEY]: { tabId: '', seenAt: NOW.toISOString() } },
      { [SESSION_TAB_OWNER_KEY]: { tabId: 't', seenAt: 'not-a-date' } },
      { [SESSION_TAB_OWNER_KEY]: { tabId: 7, seenAt: NOW.toISOString() } },
    ]) {
      expect(() => readSessionTabOwner(bad)).not.toThrow()
      expect(readSessionTabOwner(bad)).toBeNull()
      expect(isClaimedByAnotherTab({ snapshot: bad, tabId: 'mine', now: NOW })).toBe(false)
    }
  })
})

describe('T4 — ownership and auth are NOT weakened', () => {
  const SESSIONS = readFileSync(path.join(process.cwd(), 'src/app/api/sessions/route.ts'), 'utf8')

  it('the tab id narrows only WITHIN the user\'s own candidates', () => {
    // every candidate already came from a query scoped by userId...
    const at = SESSIONS.indexOf('const resumeWhere = {')
    expect(SESSIONS.slice(at, SESSIONS.indexOf('};', at))).toContain('userId: session.user.id')
    // ...and the chosen row is re-fetched with that same clause, not by bare id
    expect(SESSIONS).toContain('where: { ...resumeWhere, id: resumeCandidate.id }')
  })

  it('a tabId can never name or reach a session directly', () => {
    // it is only ever compared against a candidate's stored owner
    expect(SESSIONS).toContain('chooseResumableSession({')
    expect(SESSIONS).not.toMatch(/where:\s*\{\s*id:\s*tabId/)
  })

  it('it is length-bounded and optional in the schema', () => {
    expect(SESSIONS).toContain('tabId: z.string().min(1).max(64).optional()')
  })
})

describe('the wiring — a missing CALL is the failure mode', () => {
  const read = (r: string) => readFileSync(path.join(process.cwd(), r), 'utf8')

  it('sessions POST chooses by tab and stamps the claim on BOTH paths', () => {
    const s = read('src/app/api/sessions/route.ts')
    expect(s).toContain('const resumeChoice = chooseResumableSession({')
    expect(s).toContain('const resumeCandidate = resumeChoice.session')
    expect(s).toContain('delta: sessionTabOwnerDelta(tabId, new Date())')          // resume
    expect(s).toContain('...sessionTabOwnerDelta(tabId, new Date()),')             // create
  })

  it('the claim is refreshed by activity the tab already performs', () => {
    expect(read('src/app/api/learn/chat/route.ts'))
      .toContain('...sessionTabOwnerDelta(tabId, new Date())')
    expect(read('src/app/api/learn/lesson-init/route.ts'))
      .toContain('...sessionTabOwnerDelta(tabId, new Date())')
  })

  it('the client mints a per-TAB id and sends it on all four calls', () => {
    const c = read('src/components/learn/LessonScreen.tsx')
    expect(c).toContain("import { getTabId } from '@/lib/teaching/tabIdentity'")
    expect((c.match(/tabId: getTabId\(\) \?\? undefined/g) ?? []).length).toBe(4)
    const t = read('src/lib/teaching/tabIdentity.ts')
    expect(t).toMatch(/sessionStorage\.(get|set)Item/)
    // localStorage is shared across every tab of a profile, so it cannot make
    // the distinction. It may be NAMED in the rationale; it must never be USED.
    expect(t).not.toMatch(/localStorage\.(get|set)Item/)
  })
})
