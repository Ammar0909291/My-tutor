/**
 * Identical-student A/B test runner — Groq vs Gemini, item 11 of
 * docs/architecture/TUTOR_QUALITY_FIX_PLAN.md.
 *
 * Three phases, run as separate CLI invocations, because setting
 * `modelOverrideAllowed=true` on a fresh account requires a DB write only
 * the calling agent session can make (via Supabase MCP) — a plain script
 * cannot call that tool. So:
 *
 *   prepare  — creates+onboards all disposable accounts, writes their
 *              {email, userId} list to scratchpad, and STOPS. The agent then
 *              runs ONE batched `UPDATE users SET "modelOverrideAllowed"=true
 *              WHERE id IN (...)` for exactly these ids (owner-approved).
 *   drive    — reads that same account list, logs into each, runs the frozen
 *              14-turn plan (script.json) with the arm's x-cert-provider
 *              header forced on every /api/learn/chat call (never on
 *              lesson-init — see docs/architecture/TUTOR_QUALITY_FIX_PLAN.md
 *              and this file's own header comment for why), and writes one
 *              JSON transcript per lesson to scratchpad. Never stops early.
 *   cleanup  — deletes every account in the list and confirms re-login fails.
 *
 * Turn 0 (lesson-init) is NEVER provider-forced: that route has no
 * `x-cert-provider`/`modelOverrideAllowed` gate at all (verified by reading
 * src/app/api/learn/lesson-init/route.ts — zero references to either), a
 * limitation also independently documented in this repo's own
 * scripts/qa/groqVsGeminiExperiment.ts. Both arms get an identical, unforced
 * opening turn; only turns 1-14 (the fixed plan) are provider-pinned. This
 * was an explicit owner decision (accept as documented, no code change).
 *
 * Run:
 *   OUT_DIR=<scratchpad path> npx tsx scripts/qa/abStudent/runner.ts prepare
 *   OUT_DIR=<scratchpad path> npx tsx scripts/qa/abStudent/runner.ts drive
 *   OUT_DIR=<scratchpad path> npx tsx scripts/qa/abStudent/runner.ts cleanup
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { createQaAccount, deleteQaAccount, login, BASE, type QaAccount } from '../liveAccount'
import { canonicalContent, pickAnswer, proseOptions, answerFreeResponse, type QaSubject } from '../biologyAnswerPicker'

const OUT_DIR = process.env.OUT_DIR
if (!OUT_DIR) throw new Error('OUT_DIR env var required (write outside the repo, e.g. the scratchpad dir)')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const SCRIPT_PATH = join(__dirname, 'script.json')
const ARMS = ['A', 'B'] as const
type Arm = typeof ARMS[number]
const ARM_PROVIDER: Record<Arm, 'groq' | 'gemini'> = { A: 'groq', B: 'gemini' }
const RUNS = [1, 2] as const

interface ScriptConcept {
  subject: QaSubject
  conceptId: string
  lessonTitleHint: string
  misconception: string
  correctTyped: string
  wrongTyped: string
  offTopic: string
}
interface StudentScript { version: number; concepts: ScriptConcept[] }

function loadScript(): { script: StudentScript; sha256: string } {
  const raw = readFileSync(SCRIPT_PATH, 'utf8')
  const sha256 = createHash('sha256').update(raw).digest('hex')
  return { script: JSON.parse(raw) as StudentScript, sha256 }
}

// ── Fixed turn plan (identical for every concept, every arm, every run) ────
type SlotKind = 'fixed' | 'misconception' | 'quiz' | 'right' | 'wrong' | 'offTopic' | 'practiceRequest'
const SLOTS: Array<{ n: number; kind: SlotKind; fixedText?: string }> = [
  { n: 1, kind: 'fixed', fixedText: "ok, let's start" },
  { n: 2, kind: 'fixed', fixedText: 'why does that matter?' },
  { n: 3, kind: 'fixed', fixedText: 'can you show me a diagram?' },
  { n: 4, kind: 'fixed', fixedText: 'ok, continue' },
  { n: 5, kind: 'misconception' },
  { n: 6, kind: 'fixed', fixedText: 'quiz me' },
  { n: 7, kind: 'right' },
  { n: 8, kind: 'fixed', fixedText: 'continue' },
  { n: 9, kind: 'wrong' },
  { n: 10, kind: 'offTopic' },
  { n: 11, kind: 'fixed', fixedText: 'give me a practice question' },
  { n: 12, kind: 'right' },
  { n: 13, kind: 'fixed', fixedText: 'continue' },
  { n: 14, kind: 'right' },
]

interface ChatTurn {
  text?: string
  provider?: string | null
  mcq?: { question: string; options: string[] } | null
  visualSpec?: unknown; visual?: unknown; sceneSpec?: unknown
  mastery?: unknown
  lessonComplete?: unknown
  [k: string]: unknown
}
interface CurriculumLesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

async function apiJson(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown, headers?: Record<string, string>) {
  const t0 = Date.now()
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie, ...headers } : { cookie, ...headers },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  const latencyMs = Date.now() - t0
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return { payload: (await r.json()) as ChatTurn, latencyMs }
}

function carriesFigure(p: ChatTurn): boolean { return Boolean(p.visualSpec) || Boolean(p.visual) || Boolean(p.sceneSpec) }

// ── Phase: prepare ──────────────────────────────────────────────────────────
interface PreparedAccount { conceptId: string; arm: Arm; run: number; email: string; password: string; userId?: string }

async function whoAmI(cookie: string): Promise<string | undefined> {
  const r = await fetch(`${BASE}/api/auth/session`, { headers: { cookie } })
  if (!r.ok) return undefined
  const d = (await r.json()) as { user?: { id?: string } }
  return d.user?.id
}

function accountsPath(): string { return join(OUT_DIR!, 'accounts.json') }

function loadPrepared(): PreparedAccount[] {
  if (!existsSync(accountsPath())) return []
  return JSON.parse(readFileSync(accountsPath(), 'utf8')) as PreparedAccount[]
}

function persist(prepared: PreparedAccount[]): void {
  writeFileSync(accountsPath(), JSON.stringify(prepared, null, 2))
}

function sleep(ms: number): Promise<void> { return new Promise((r) => setTimeout(r, ms)) }

/**
 * /api/auth/register rate-limits at 5/900s per IP (in-memory fallback, since
 * this deployment has no Redis — src/lib/rateLimit.ts). Measured live: this
 * limiter is leaky across serverless instances (10 registrations succeeded
 * before the first 429 in one run), so a bounded retry-with-backoff clears
 * it in practice without a long fixed sleep between every single call.
 */
async function createQaAccountWithRetry(label: string, maxAttempts = 6): Promise<Awaited<ReturnType<typeof createQaAccount>>> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await createQaAccount(label)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (!/429|Too many requests/i.test(msg) || attempt === maxAttempts) throw e
      const waitMs = 30_000 * attempt
      console.log(`  rate-limited creating ${label} (attempt ${attempt}/${maxAttempts}) — waiting ${waitMs / 1000}s`)
      await sleep(waitMs)
    }
  }
  throw new Error('unreachable')
}

async function phasePrepare(): Promise<void> {
  const { script, sha256 } = loadScript()
  console.log(`script.json sha256: ${sha256}`)
  const prepared = loadPrepared()
  const already = new Set(prepared.map((p) => `${p.conceptId}|${p.arm}|${p.run}`))
  if (prepared.length) console.log(`resuming: ${prepared.length} accounts already prepared (found in ${accountsPath()})`)

  for (const c of script.concepts) {
    for (const run of RUNS) {
      for (const arm of ARMS) {
        const key = `${c.conceptId}|${arm}|${run}`
        if (already.has(key)) { console.log(`skip (already prepared): ${key}`); continue }
        const label = `ab-${c.conceptId.replace(/\./g, '-')}-${arm}-${run}`
        const acct = await createQaAccountWithRetry(label)
        const cookie = acct.cookie
        const userId = await whoAmI(cookie)
        await apiJson(cookie, 'POST', '/api/onboarding', {
          subjectSlug: c.subject,
          currentLevel: 'beginner',
          teachingLanguage: 'en',
          voiceChoice: 'male',
          selfDescription: 'I am a student and want to understand each topic properly.',
        })
        prepared.push({ conceptId: c.conceptId, arm, run, email: acct.email, password: acct.password, userId })
        persist(prepared)
        console.log(`prepared ${label}: ${acct.email} userId=${userId ?? 'UNKNOWN'}`)
        await sleep(3000)
      }
    }
  }

  const missingIds = prepared.filter((p) => !p.userId)
  console.log(`\n${prepared.length} accounts prepared, written to ${accountsPath()}`)
  if (missingIds.length) console.log(`WARNING: ${missingIds.length} accounts have no resolved userId — check manually before the DB write.`)
  console.log(`\nNext: agent runs ONE batched SQL —`)
  console.log(`  UPDATE users SET "modelOverrideAllowed" = true WHERE id IN (${prepared.map((p) => `'${p.userId}'`).join(', ')}) AND email LIKE 'qa-%@mytutor-qa.invalid' RETURNING id, email;`)
  console.log(`Then run this script's 'drive' phase.`)
}

// ── Phase: drive ─────────────────────────────────────────────────────────────
function resolveTurn(
  slot: typeof SLOTS[number], concept: ScriptConcept, prevTurn: ChatTurn | null,
): { message: string; rule: 'a' | 'b' | 'c' | 'd' | 'fixed' } {
  if (slot.kind === 'fixed') return { message: slot.fixedText!, rule: 'fixed' }
  if (slot.kind === 'misconception') return { message: concept.misconception, rule: 'fixed' }
  if (slot.kind === 'offTopic') return { message: concept.offTopic, rule: 'fixed' }

  // right/wrong: resolve against the PREVIOUS tutor turn.
  const content = canonicalContent(concept.subject, concept.conceptId)
  const prevText = prevTurn?.text ?? ''
  const prevMcq = prevTurn?.mcq ?? null

  if (prevMcq && Array.isArray(prevMcq.options) && prevMcq.options.length > 0) {
    const pick = pickAnswer(prevMcq.question, prevMcq.options, content)
    const chosen = prevMcq.options[pick.index]
    if (slot.kind === 'right') return { message: chosen, rule: 'a' }
    // WRONG: rank 2 by closeness to the correct answer (the most plausible distractor).
    const scored = prevMcq.options.map((o, i) => ({ o, i }))
    const runnerUp = scored.find((s) => s.i !== pick.index) ?? scored[0]
    return { message: runnerUp.o, rule: 'a' }
  }

  const prose = proseOptions(prevText)
  if (prose && prose.options.length > 0) {
    const pick = pickAnswer(prose.question, prose.options, content)
    if (slot.kind === 'right') return { message: prose.options[pick.index], rule: 'b' }
    const scored = prose.options.map((o, i) => ({ o, i }))
    const runnerUp = scored.find((s) => s.i !== pick.index) ?? scored[0]
    return { message: runnerUp.o, rule: 'b' }
  }

  if (prevText.includes('?')) {
    if (slot.kind === 'right') return { message: concept.correctTyped, rule: 'c' }
    return { message: concept.wrongTyped, rule: 'c' }
  }

  return { message: 'continue', rule: 'd' }
}

interface TurnRecord {
  slot: number; slotKind: SlotKind; rule: string; sent: string
  text?: string; provider?: string | null; mcq?: unknown; mastery?: unknown; lessonComplete?: unknown
  figure: boolean; latencyMs: number
}

async function driveOneLesson(
  concept: ScriptConcept, arm: Arm, run: number, acct: { email: string; password: string },
): Promise<{ turns: TurnRecord[]; contaminated: number; lessonKey?: string }> {
  const cookie = await login(acct.email, acct.password)
  const provider = ARM_PROVIDER[arm]
  const certHeaders = { 'x-cert-provider': provider }

  const { payload: cur } = await apiJson(cookie, 'GET', `/api/curriculum?subject=${concept.subject}`)
  const lessons = ((cur as unknown as { lessons: CurriculumLesson[] }).lessons) ?? []
  const lesson = lessons.find((l) => l.topicSlug === concept.conceptId)
  if (!lesson) throw new Error(`concept ${concept.conceptId} not found in ${concept.subject} curriculum`)

  const { payload: session } = await apiJson(cookie, 'POST', '/api/sessions', { subjectSlug: concept.subject })
  const sessionId = (session as unknown as { data: { id: string } }).data.id

  const turns: TurnRecord[] = []
  let contaminated = 0

  const { payload: t0, latencyMs: l0 } = await apiJson(cookie, 'POST', '/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: lessons.length,
    completedLessons: [], teachingLanguage: 'en',
  })
  turns.push({ slot: 0, slotKind: 'fixed', rule: 'fixed', sent: '(lesson-init, unforced by design)', text: t0.text, provider: t0.provider, mcq: t0.mcq, mastery: t0.mastery, lessonComplete: t0.lessonComplete, figure: carriesFigure(t0), latencyMs: l0 })

  let prevTurn: ChatTurn = t0
  for (const slot of SLOTS) {
    const { message, rule } = resolveTurn(slot, concept, prevTurn)
    const { payload, latencyMs } = await apiJson(cookie, 'POST', '/api/learn/chat', { sessionId, message }, certHeaders)
    if (payload.provider && payload.provider !== provider) contaminated++
    turns.push({
      slot: slot.n, slotKind: slot.kind, rule, sent: message,
      text: payload.text, provider: payload.provider, mcq: payload.mcq, mastery: payload.mastery,
      lessonComplete: payload.lessonComplete, figure: carriesFigure(payload), latencyMs,
    })
    prevTurn = payload
    // ALWAYS all 14 turns — never stop early on mastery/completion, per spec.
  }

  return { turns, contaminated }
}

async function phaseDrive(): Promise<void> {
  const { script, sha256 } = loadScript()
  console.log(`script.json sha256: ${sha256}`)
  const accounts = JSON.parse(readFileSync(join(OUT_DIR!, 'accounts.json'), 'utf8')) as PreparedAccount[]

  for (const concept of script.concepts) {
    for (const run of RUNS) {
      for (const arm of ARMS) {
        const acct = accounts.find((a) => a.conceptId === concept.conceptId && a.arm === arm && a.run === run)
        if (!acct) throw new Error(`no prepared account for ${concept.conceptId}/${arm}/run${run}`)
        console.log(`\n=== ${concept.conceptId} arm=${arm} (${ARM_PROVIDER[arm]}) run=${run} — ${acct.email} ===`)
        const result = await driveOneLesson(concept, arm, run, acct)
        const outPath = join(OUT_DIR!, `${concept.conceptId}__${arm}__run${run}.json`)
        writeFileSync(outPath, JSON.stringify({
          scriptSha256: sha256, conceptId: concept.conceptId, subject: concept.subject,
          arm, forcedProvider: ARM_PROVIDER[arm], run, account: acct.email,
          contaminatedTurns: result.contaminated, turns: result.turns,
        }, null, 2))
        console.log(`  ${result.turns.length} turns recorded, contaminated=${result.contaminated} -> ${outPath}`)
      }
    }
  }
}

// ── Phase: cleanup ───────────────────────────────────────────────────────────
async function phaseCleanup(): Promise<void> {
  const accounts = JSON.parse(readFileSync(join(OUT_DIR!, 'accounts.json'), 'utf8')) as PreparedAccount[]
  let deleted = 0
  let stillLoginable = 0
  for (const a of accounts) {
    const acct: QaAccount = { email: a.email, password: a.password, name: '', cookie: '' }
    const res = await deleteQaAccount(acct)
    if (res.deleted && res.reloginBlocked) deleted++
    if (!res.reloginBlocked) stillLoginable++
    console.log(`${a.email}: deleted=${res.deleted} reloginBlocked=${res.reloginBlocked}`)
  }
  console.log(`\n${deleted}/${accounts.length} confirmed deleted (re-login blocked).`)
  if (stillLoginable > 0) console.log(`WARNING: ${stillLoginable} account(s) can still log in — investigate before considering cleanup complete.`)
}

async function main() {
  const phase = process.argv[2]
  if (phase === 'prepare') return phasePrepare()
  if (phase === 'drive') return phaseDrive()
  if (phase === 'cleanup') return phaseCleanup()
  throw new Error("usage: runner.ts <prepare|drive|cleanup>")
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
