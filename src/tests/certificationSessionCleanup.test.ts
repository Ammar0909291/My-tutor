/**
 * PHASE 0 REMEDIATION — session cleanup after each control (2026-09-03).
 *
 * ROOT CAUSE, measured directly against production: `createSession` opens a
 * session and nothing ever closed it, so it stayed ACTIVE. `/api/sessions`
 * resumes any ACTIVE session for the (user, subject) pair within 24h — a
 * behaviour `createSession`'s own header already documented — so the NEXT
 * control against the same worker and subject (even on a DIFFERENT concept)
 * silently inherited the previous control's ladder. Two consecutive Phase 0
 * runs against the same four accounts produced DIRTY_STATE on 5 of 6
 * controls, all with identical `session-resumed-not-fresh` evidence, traced
 * in production `learn_sessions` to ACTIVE rows the harness itself had left
 * open.
 *
 * Fix: `endSession` (scripts/math/certify.ts) calls the same
 * `POST /api/sessions/end` a real learner's client calls on exit — reusing
 * production's own session-ending behaviour exactly as-is, the same pattern
 * `scripts/qa/strugglingLearnerHarness.ts` already established for the
 * identical leak between concepts within one run. `runOne`
 * (scripts/certification/runPhase0Controls.ts) and `main()`
 * (scripts/math/certify.ts) each wrap their `certifyConcept` call in a
 * `finally` that calls it — guaranteed whether certifyConcept resolves to
 * any verdict or throws.
 *
 * Every test here drives the REAL `runOne`/`createSession`/`certifyConcept`/
 * `endSession` against a stubbed `fetch` — never a copy of their logic —
 * matching this suite's own established convention
 * (certifyDirtyStateWiring.test.ts).
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'fs'
import { createSession, certifyConcept, endSession, type ConceptTarget } from '../../scripts/math/certify'
import type { AnswerIndex } from '../../scripts/certification/answerSource'
import { runOne } from '../../scripts/certification/runPhase0Controls'
import type { ControlDefinition } from '../../scripts/certification/controls'
import type { WorkerAccount } from '../../scripts/certification/measurementIdentity'

const EMPTY_ANSWER_INDEX: AnswerIndex = {
  byQuestion: new Map(), stats: { probes: 0, distinctStems: 0, collisions: 0 }, fingerprint: 'test',
}

const TARGET: ConceptTarget = {
  conceptId: 'phys.mech.angular-momentum', lessonTitle: 'Angular Momentum',
  lessonOrder: 43, unitTitle: 'Classical Mechanics',
}

const WORKER: WorkerAccount = {
  workerId: 'w1', accountLabel: 'worker@example.com', email: 'worker@example.com', password: 'x',
}

function control(overrides: Partial<ControlDefinition> = {}): ControlDefinition {
  return {
    role: 'positive-physics', worker: 'w1', subjectSlug: 'physics',
    conceptId: TARGET.conceptId, lessonTitle: TARGET.lessonTitle, lessonOrder: TARGET.lessonOrder,
    unitTitle: TARGET.unitTitle, totalLessons: 238, expected: 'CERTIFIED', rationale: 'test fixture',
    ...overrides,
  }
}

/** An MCQ with no authored backing — resolveAnswer against an empty index
 *  always fails, so certifyConcept stops at turn 0 with UNMEASURED, never
 *  issuing a single /api/learn/chat call. Keeps every test's stubbed lesson
 *  short and deterministic. */
const UNANSWERABLE_LESSON_INIT = {
  text: 'opening', mastery: { verified: false, phase: 'OBSERVE', checkCorrect: 0, practiceCorrect: 0 },
  mcq: { question: 'unanswerable stem', options: ['A', 'B'] }, lessonComplete: null, provider: 'memory',
}

interface StubOptions {
  authenticatedEmail: string
  lessonInit: unknown | (() => unknown)
  /** Throws instead of responding when a matching path is hit. */
  throwOn?: RegExp
}

/**
 * A minimal stand-in for the deployed app, stateful only where production
 * genuinely is stateful: ONE active session per subject, exactly the
 * resume-by-(user,subject) rule createSession's own header documents.
 */
function createStubServer(opts: StubOptions) {
  const calls: string[] = []
  const sessionsIssued: Array<{ subjectSlug: string; id: string; resumed: boolean }> = []
  const activeBySubject = new Map<string, { id: string; ended: boolean }>()
  let nextId = 1

  const fetchStub = vi.fn(async (url: string, init?: { body?: unknown }) => {
    const u = String(url)
    // Only /api/sessions and /api/sessions/end send a JSON body here — the
    // Auth.js callback sends URLSearchParams (form-encoded), which is not
    // JSON and does not need parsing by this stub at all.
    let body: Record<string, unknown> | undefined
    if (typeof init?.body === 'string') {
      try { body = JSON.parse(init.body) as Record<string, unknown> } catch { body = undefined }
    }
    calls.push(u)
    if (opts.throwOn?.test(u)) throw new Error(`stub: simulated failure for ${u}`)

    if (u.includes('/api/auth/csrf')) {
      return {
        headers: { getSetCookie: () => ['__Host-authjs.csrf-token=tok|hash'] },
        json: async () => ({ csrfToken: 'tok' }),
      } as unknown as Response
    }
    if (u.includes('/api/auth/callback/credentials')) {
      return { headers: { getSetCookie: () => ['authjs.session-token=abc'] } } as unknown as Response
    }
    if (u.includes('/api/auth/session')) {
      return { json: async () => ({ user: { email: opts.authenticatedEmail } }) } as unknown as Response
    }
    if (u.includes('/api/sessions/end')) {
      const sid = body?.sessionId as string | undefined
      for (const s of activeBySubject.values()) if (s.id === sid) s.ended = true
      return { ok: true, json: async () => ({ success: true }) } as unknown as Response
    }
    if (u.endsWith('/api/sessions')) {
      const subjectSlug = body?.subjectSlug as string
      const existing = activeBySubject.get(subjectSlug)
      // THE PRODUCTION RULE UNDER TEST: an ACTIVE (not-ended) session for this
      // subject is resumed; only a subject with no active session, or one
      // whose session was ended, gets a fresh one.
      if (existing && !existing.ended) {
        sessionsIssued.push({ subjectSlug, id: existing.id, resumed: true })
        return { ok: true, json: async () => ({ id: existing.id, resumed: true }) } as unknown as Response
      }
      const id = `session-${nextId}`; nextId += 1
      activeBySubject.set(subjectSlug, { id, ended: false })
      sessionsIssued.push({ subjectSlug, id, resumed: false })
      return { ok: true, json: async () => ({ id, resumed: false }) } as unknown as Response
    }
    if (u.includes('/api/learn/lesson-init')) {
      const payload = typeof opts.lessonInit === 'function' ? (opts.lessonInit as () => unknown)() : opts.lessonInit
      return { ok: true, json: async () => payload } as unknown as Response
    }
    throw new Error(`stub: unexpected fetch to ${u}`)
  })

  return { fetch: fetchStub, calls, sessionsIssued, activeBySubject }
}

describe('endSession', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('posts to /api/sessions/end with the given sessionId, and never throws on a non-ok or rejected fetch', async () => {
    const seen: Array<{ url: string; body: unknown }> = []
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: { body?: string }) => {
      seen.push({ url: String(url), body: init?.body ? JSON.parse(init.body) : undefined })
      return { ok: false, status: 500 } as Response
    }))
    await expect(endSession('cookie', 'session-xyz', 'https://example.test')).resolves.toBeUndefined()
    expect(seen).toHaveLength(1)
    expect(seen[0].url).toBe('https://example.test/api/sessions/end')
    expect(seen[0].body).toEqual({ sessionId: 'session-xyz' })

    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down') }))
    await expect(endSession('cookie', 'session-xyz', 'https://example.test')).resolves.toBeUndefined()
  })
})

describe('runOne closes the session it created', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('cleanup occurs when certifyConcept resolves (any verdict)', async () => {
    const stub = createStubServer({ authenticatedEmail: WORKER.email, lessonInit: UNANSWERABLE_LESSON_INIT })
    vi.stubGlobal('fetch', stub.fetch)

    const outcome = await runOne(control(), WORKER, 'run-1', new Date().toISOString())

    // A legitimate, non-crash verdict — proves cleanup runs on the NORMAL
    // return path, not only when something throws.
    expect(outcome.error).toBeNull()
    expect(outcome.verdict).toBe('UNMEASURED')
    expect(stub.calls.filter((u) => u.includes('/api/sessions/end'))).toHaveLength(1)
    expect(stub.sessionsIssued).toHaveLength(1)
    expect(stub.activeBySubject.get('physics')?.ended).toBe(true)
    // Cleanup happens AFTER the session that owns it was created.
    const sessionsIdx = stub.calls.findIndex((u) => u.endsWith('/api/sessions'))
    const endIdx = stub.calls.findIndex((u) => u.includes('/api/sessions/end'))
    expect(sessionsIdx).toBeGreaterThanOrEqual(0)
    expect(endIdx).toBeGreaterThan(sessionsIdx)
  })

  it('cleanup occurs when certifyConcept throws', async () => {
    const stub = createStubServer({
      authenticatedEmail: WORKER.email, lessonInit: UNANSWERABLE_LESSON_INIT,
      throwOn: /\/api\/learn\/lesson-init/,
    })
    vi.stubGlobal('fetch', stub.fetch)

    const outcome = await runOne(control(), WORKER, 'run-1', new Date().toISOString())

    expect(outcome.verdict).toBe('FAILED_INSTRUMENT')
    expect(outcome.error).toMatch(/simulated failure/)
    // The session WAS created before the throw (lesson-init happens after
    // createSession) and must still have been closed.
    expect(stub.calls.filter((u) => u.includes('/api/sessions/end'))).toHaveLength(1)
    expect(stub.activeBySubject.get('physics')?.ended).toBe(true)
  })

  it('a control cannot contaminate the next control through an ACTIVE session', async () => {
    const stub = createStubServer({ authenticatedEmail: WORKER.email, lessonInit: UNANSWERABLE_LESSON_INIT })
    vi.stubGlobal('fetch', stub.fetch)

    const first = await runOne(
      control({ role: 'positive-physics', conceptId: 'phys.mech.angular-momentum' }),
      WORKER, 'run-1', new Date().toISOString(),
    )
    const second = await runOne(
      control({ role: 'duplicate-integrity', conceptId: 'phys.mech.newtons-first-law' }),
      WORKER, 'run-1', new Date().toISOString(),
    )

    expect(first.error).toBeNull()
    expect(second.error).toBeNull()
    // Two DIFFERENT sessions, neither reported as resumed — without the fix
    // the second call would have found the first session still ACTIVE and
    // resumed it (resumed: true, same id), which is the exact mechanism that
    // produced DIRTY_STATE on 5 of 6 controls in the invalidated run.
    expect(stub.sessionsIssued).toHaveLength(2)
    expect(stub.sessionsIssued[0].resumed).toBe(false)
    expect(stub.sessionsIssued[1].resumed).toBe(false)
    expect(stub.sessionsIssued[1].id).not.toBe(stub.sessionsIssued[0].id)
    // Neither control observed a resumed session — the concept-level dirty
    // check certifyConcept applies never had a reason to fire on that basis.
    expect(second.record?.failed).not.toContain('DIRTY-STATE')
  })

  it('worker/account isolation remains unchanged — a mismatched identity never creates or ends a session', async () => {
    const stub = createStubServer({
      authenticatedEmail: 'someone-else@example.com', // != WORKER.email
      lessonInit: UNANSWERABLE_LESSON_INIT,
      // Proves the isolation check returns BEFORE any session traffic: the
      // stub would throw if either endpoint were reached at all.
      throwOn: /\/api\/sessions/,
    })
    vi.stubGlobal('fetch', stub.fetch)

    const outcome = await runOne(control(), WORKER, 'run-1', new Date().toISOString())

    expect(outcome.verdict).toBe('FAILED_INSTRUMENT')
    expect(outcome.error).toMatch(/worker isolation violated/)
    expect(stub.calls.some((u) => u.includes('/api/sessions'))).toBe(false)
  })
})

describe('createSession + certifyConcept + endSession, driven directly (no auth machinery)', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('endSession closes exactly the session createSession returned', async () => {
    const stub = createStubServer({ authenticatedEmail: 'x@example.com', lessonInit: UNANSWERABLE_LESSON_INIT })
    vi.stubGlobal('fetch', stub.fetch)

    const session = await createSession('cookie', 'physics', 'https://example.test')
    expect(session.resumed).toBe(false)
    const result = await certifyConcept(TARGET, 'cookie', session.id, EMPTY_ANSWER_INDEX, 238, session.resumed)
    expect(result.failed).toContain('UNMEASURED-no-authored-match')
    await endSession('cookie', session.id, 'https://example.test')

    expect(stub.activeBySubject.get('physics')).toEqual({ id: session.id, ended: true })
  })
})

describe('source wiring — both certifyConcept call sites guarantee cleanup', () => {
  it('runOne wraps certifyConcept in try/finally calling endSession', () => {
    const src = readFileSync('scripts/certification/runPhase0Controls.ts', 'utf-8')
    expect(src).toMatch(/import\s*\{[^}]*\bendSession\b[^}]*\}\s*from\s*'\.\.\/math\/certify'/)
    expect(src).toMatch(/finally\s*\{\s*\n\s*await endSession\(cookie, session\.id, BASE_URL\)/)
  })

  it("certify.ts's own main() loop wraps certifyConcept in try/finally calling endSession", () => {
    const src = readFileSync('scripts/math/certify.ts', 'utf-8')
    expect(src).toMatch(/export async function endSession\(/)
    expect(src).toMatch(/finally\s*\{\s*\n(?:.*\n)*?\s*await endSession\(cookie, session\.id, BASE\)/)
  })
})
