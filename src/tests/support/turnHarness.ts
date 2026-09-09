/**
 * THE TURN HARNESS — the instrument this repository has never had.
 *
 * ── WHY IT EXISTS ──────────────────────────────────────────────────────────
 * Measured 2026-09-07: `grep -rln "from '@/app/api/learn/chat/route'" src/tests`
 * returns ZERO. Sixty-odd files named "…RouteWiring" / "…Integration" /
 * "replay" either read route.ts as TEXT and assert a regex, or chain the same
 * pure functions the route calls, by hand, in the same order.
 * transcriptReplayFramework.test.ts says so in its own header.
 *
 * So every individual guard in the teaching runtime is tested, and THE
 * COMPOSITION OF THE GUARDS IS NEVER EXECUTED. Both absorbing states proven in
 * livenessProof.test.ts live in that composition — one of them spans route.ts ×
 * conversationState.ts × questionLegality.ts, which no existing test can see
 * across at once. That is the structural reason this bug class survives.
 *
 * This harness executes the REAL `POST` handler. Four seams are stubbed, and
 * they are stubbed because they are I/O, not because they are logic:
 *   · @/lib/auth        — identity
 *   · @/lib/db/prisma   — an in-memory store
 *   · @/lib/ai/router   — a SCRIPTED model (adversarial output becomes an input)
 *   · @/lib/rateLimit   — always allow
 * Everything else runs for real: the assessment gate, questionLegality,
 * turnArbitration, the conversation-state fold, grading, the suppression
 * layer, pendingQuestion, mcqToServe.
 *
 * ── THE PRISMA STUB IS A PROXY, DELIBERATELY ───────────────────────────────
 * route.ts touches 18 prisma models directly and 35 across its transitive
 * surface (265 dynamic imports). Hand-writing 35 fakes is a multi-session job
 * and brittle forever. Instead: any `prisma.<model>.<method>()` answers with a
 * benign default keyed on the METHOD NAME (findMany → [], count → 0,
 * findUnique/findFirst → null, create/update/upsert → the data given), and
 * only the six models the teaching loop actually needs carry real behaviour.
 * For a fresh learner the other 29 legitimately have nothing to say.
 */
import { vi } from 'vitest'

// ── Row shapes, only as wide as the route actually reads ────────────────────
export interface HarnessProbe {
  assetId: string
  conceptId: string
  stem: string
  choices: { text: string; isCorrect: boolean }[]
  gradeBand?: string
  language?: string
  difficulty?: number
}

export interface HarnessOptions {
  userId?: string
  sessionId?: string
  subjectSlug?: string
  conceptId?: string
  lessonTitle?: string
  /** ACTIVE authored probes the gate may select. */
  probes?: HarnessProbe[]
  /** Seed conversation state (phase, counters). Merged over the initial state. */
  conversationState?: Record<string, unknown>
  currentLevel?: string
}

export interface ServedMcq { question: string; options: string[] }

export interface HarnessTurn {
  /** What the learner sent. A function receives the MCQ that was on screen at
   *  the END of the previous turn, so a test can say "tap the correct option"
   *  without hard-coding which probe the gate happened to select. */
  learnerSays: string | ((mcq: ServedMcq | null) => string)
  /** What the SCRIPTED model replies with (raw, tags included). */
  modelReplies: string
  /** Mirrors the real request body's `ephemeral` field (LessonScreen's
   *  internal lesson-opening/resume instruction — never learner-typed, never
   *  persisted). Defaults to false, i.e. an ordinary learner turn. */
  ephemeral?: boolean
}

export interface TurnResult {
  /** The resolved learner message actually sent this turn. */
  learnerSaid: string
  status: number
  body: Record<string, unknown>
  /** The snapshot persisted at the END of this turn. */
  snapshot: Record<string, unknown>
  /** Everything the route logged this turn, joined — used to read
   *  `[gate-eligibility]`, `[mcq-grade]`, `[ladder]` and friends. */
  logs: string[]
  /** The system prompt the scripted model was handed. */
  systemPrompt: string
}

const DEFAULTS = {
  userId: 'harness-user',
  sessionId: 'harness-session',
  subjectSlug: 'chemistry',
  conceptId: 'chem.elect.galvanic-cell',
  lessonTitle: 'Galvanic Cells',
  currentLevel: 'beginner',
}

/** Method-name → benign empty answer. The 29 models nobody seeded. */
function defaultFor(method: string, arg: unknown): unknown {
  if (method.startsWith('findMany')) return []
  if (method === 'count') return 0
  if (method === 'aggregate') return {}
  if (method === 'groupBy') return []
  if (method.startsWith('find')) return null
  if (method === 'create' || method === 'update' || method === 'upsert') {
    const data = (arg as { data?: Record<string, unknown>; create?: Record<string, unknown> })
    return { id: `row-${Math.random().toString(36).slice(2, 10)}`, ...(data?.data ?? data?.create ?? {}) }
  }
  if (method === 'createMany' || method === 'updateMany' || method === 'deleteMany') return { count: 0 }
  if (method === 'delete') return {}
  return null
}

export interface Harness {
  auth: () => Promise<{ user: { id: string; email: string } }>
  prisma: Record<string, unknown>
  routeAI: (...args: unknown[]) => Promise<{ text: string; provider: string; finishReason: string | null }>
  /** Set before each turn by driveTurns. */
  script: { next: string | null; lastSystemPrompt: string }
  state: {
    messages: { id: string; role: string; content: string; createdAt: Date }[]
    snapshot: Record<string, unknown>
    probes: HarnessProbe[]
    opts: Required<Pick<HarnessOptions, 'userId' | 'sessionId' | 'subjectSlug' | 'conceptId' | 'lessonTitle' | 'currentLevel'>>
  }
}

export function createHarness(): Harness {
  const script = { next: null as string | null, lastSystemPrompt: '' }
  const state: Harness['state'] = {
    messages: [],
    snapshot: {},
    probes: [],
    opts: { ...DEFAULTS },
  }
  let seq = 0

  const real: Record<string, Record<string, (arg: any) => unknown>> = {
    learnSession: {
      findUnique: () => ({
        id: state.opts.sessionId,
        userId: state.opts.userId,
        subjectId: 'subj-1',
        status: 'ACTIVE',
        startedAt: new Date(Date.now() - 60_000),
        contextSnapshot: state.snapshot,
        subject: { id: 'subj-1', slug: state.opts.subjectSlug, name: state.opts.subjectSlug, category: 'science' },
        // route reads newest-first then reverses
        messages: [...state.messages].sort((a, b) => +b.createdAt - +a.createdAt).slice(0, 30),
      }),
      findFirst: () => null,
      update: (arg: any) => {
        const data = arg?.data ?? {}
        if (data.contextSnapshot && typeof data.contextSnapshot === 'object') {
          state.snapshot = data.contextSnapshot as Record<string, unknown>
        }
        return { id: state.opts.sessionId }
      },
    },
    message: {
      create: (arg: any) => {
        const row = {
          id: `msg-${++seq}`,
          role: arg.data.role,
          content: arg.data.content,
          createdAt: new Date(Date.now() + seq * 1000),
        }
        state.messages.push(row)
        return row
      },
      update: (arg: any) => ({ id: arg?.where?.id ?? 'msg' }),
      findFirst: () => null,
    },
    profile: {
      findUnique: () => ({
        userId: state.opts.userId,
        currentLevel: state.opts.currentLevel,
        teachingLanguage: 'en',
        country: 'IN',
        age: 16,
        grade: 10,
      }),
    },
    user: { findUnique: () => ({ id: state.opts.userId, modelOverrideAllowed: false, email: 'harness@test.invalid' }) },
    studentProgress: {
      // A learner mid-course, NOT on lesson one. Without this the real
      // firstLessonGuard fires (`notFirstLesson: false`), which also nulls
      // memoryState (`hasMemoryState: false`) — two gate terms false for
      // harness-setup reasons rather than real ones. Measured in the first
      // exploratory run; fixed here rather than asserted around.
      findUnique: () => ({
        id: 'sp-1',
        userId: state.opts.userId,
        subjectSlug: state.opts.subjectSlug,
        currentLesson: 12,
        completedLessons: ['l1', 'l2', 'l3'],
        activeLessonSlug: state.opts.conceptId,
        lastLessonTitle: state.opts.lessonTitle,
      }),
      findFirst: () => null,
      upsert: (arg: any) => ({ id: 'sp-1', ...(arg?.create ?? {}) }),
      update: (arg: any) => ({ id: 'sp-1', ...(arg?.data ?? {}) }),
    },
    assetIdentity: {
      count: () => state.probes.length,
      findMany: (arg: any) => {
        const w = arg?.where ?? {}
        if (w.family !== 'PROBE') return []
        return state.probes
          .filter((p) => !w.conceptId || p.conceptId === w.conceptId)
          .map((p) => ({
            assetId: p.assetId,
            conceptId: p.conceptId,
            language: p.language ?? 'en',
            gradeBand: p.gradeBand ?? 'HIGH',
            family: 'PROBE',
            status: 'ACTIVE',
            qualityScore: null,
            qualityConfidence: null,
            tags: [],
            incompatibilities: [],
            probeAsset: {
              assetId: p.assetId,
              stem: p.stem,
              choices: p.choices,
              difficulty: p.difficulty ?? 3,
              probeType: 'mcq',
            },
          }))
          .sort((a, b) => a.assetId.localeCompare(b.assetId))
      },
    },
  }

  const prisma = new Proxy({} as Record<string, unknown>, {
    get(_t, model: string) {
      if (model === 'then') return undefined
      if (model === '$transaction') return async (ops: unknown) =>
        Array.isArray(ops) ? Promise.all(ops as Promise<unknown>[]) : (ops as (p: unknown) => unknown)(prisma)
      if (model === '$queryRaw' || model === '$executeRaw') return async () => []
      // The snapshot is written by snapshotWrite.ts's conditional jsonb merge,
      // NOT by learnSession.update — so a fake that only implements `update`
      // silently loses every state write. Params are (payload, sessionId,
      // expectedVersion) and the WHERE clause is an optimistic-concurrency
      // check on `_v`; both are honoured here so the harness exercises the
      // real retry/rederive path rather than papering over it.
      if (model === '$executeRawUnsafe') {
        return async (_sql: string, payload: string, sessionId: string, expectedVersion: number) => {
          if (sessionId !== state.opts.sessionId) return 0
          const current = Number((state.snapshot as Record<string, unknown>)._v ?? 0)
          if (current !== expectedVersion) return 0
          state.snapshot = { ...state.snapshot, ...JSON.parse(payload) }
          return 1
        }
      }
      return new Proxy({} as Record<string, unknown>, {
        get(_t2, method: string) {
          if (method === 'then') return undefined
          return async (arg: unknown) => {
            const impl = real[model]?.[method]
            return impl ? impl(arg) : defaultFor(method, arg)
          }
        },
      })
    },
  })

  return {
    auth: async () => ({ user: { id: state.opts.userId, email: 'harness@test.invalid' } }),
    prisma,
    routeAI: async (...args: unknown[]) => {
      script.lastSystemPrompt = String(args[1] ?? '')
      return { text: script.next ?? 'Let us continue.', provider: 'harness', finishReason: 'stop' }
    },
    script,
    state,
  }
}

/** Configure the harness for a lesson, then drive N turns through the REAL route. */
export async function driveTurns(
  h: Harness,
  POST: (req: Request) => Promise<Response>,
  turns: HarnessTurn[],
  opts: HarnessOptions = {},
): Promise<TurnResult[]> {
  Object.assign(h.state.opts, opts)
  h.state.probes = opts.probes ?? []
  if (opts.conversationState) {
    h.state.snapshot = { ...h.state.snapshot, conversationState: opts.conversationState }
  }

  const results: TurnResult[] = []
  let onScreen: ServedMcq | null = null
  for (const t of turns) {
    const learnerSays = typeof t.learnerSays === 'function' ? t.learnerSays(onScreen) : t.learnerSays
    h.script.next = t.modelReplies
    const logs: string[] = []
    const spies = (['log', 'warn', 'error'] as const).map((k) =>
      vi.spyOn(console, k).mockImplementation((...a: unknown[]) => {
        logs.push(a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' '))
      }),
    )
    let res: Response
    try {
      res = await POST(new Request('http://localhost/api/learn/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sessionId: h.state.opts.sessionId, message: learnerSays,
          ...(t.ephemeral ? { ephemeral: true } : {}),
        }),
      }))
    } finally {
      spies.forEach((s) => s.mockRestore())
    }
    let body: Record<string, unknown> = {}
    try { body = await res.json() } catch { /* non-JSON */ }
    const served = (body as { mcq?: { question?: string; options?: string[] } })?.mcq
    onScreen = served?.question && Array.isArray(served.options)
      ? { question: served.question, options: served.options }
      : null
    results.push({
      learnerSaid: learnerSays,
      status: res.status,
      body,
      snapshot: JSON.parse(JSON.stringify(h.state.snapshot)),
      logs,
      systemPrompt: h.script.lastSystemPrompt,
    })
  }
  return results
}

/** Read a structured log line, e.g. readLog(turn, '[gate-eligibility]'). */
export function readLog(turn: TurnResult, prefix: string): Record<string, unknown> | null {
  const line = [...turn.logs].reverse().find((l) => l.startsWith(prefix))
  if (!line) return null
  const brace = line.indexOf('{')
  if (brace < 0) return null
  try { return JSON.parse(line.slice(brace)) } catch { return null }
}
