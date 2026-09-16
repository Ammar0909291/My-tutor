/**
 * GROQ vs GEMINI — real accounts, same concept, forced provider each side.
 *
 * Built for a direct comparison the AI provider chain alone can't give: in
 * normal operation Groq is primary (src/lib/ai/router.ts) and Gemini is only
 * a failover, so under healthy conditions every learner hits Groq and Gemini
 * is never actually exercised. To compare them fairly, this script uses the
 * A/B provider-certification gate (router.ts's `CertProviderOverride`,
 * isAllowedCertProvider) to PIN one account's teaching turns to Groq and the
 * other's to Gemini — no failover, so a response really is what that one
 * provider produced, not "whichever one happened to answer."
 *
 * The gate requires `modelOverrideAllowed = true` on the authenticated
 * user's own DB row (never anything the client sends) — set directly via
 * Supabase MCP for the two accounts this script drives, per explicit
 * instruction. It is NOT reverted by this script; see the report for why.
 *
 * Reuses the proven login()/csrf helpers from scripts/math/certify.ts rather
 * than re-implementing them (the /api/auth/csrf duplicate-cookie bug has
 * already cost one harness its login once — see CLAUDE.md, 2026-08-19).
 *
 * Same concept, same opening/continuation script, same turn count for both
 * accounts — the only thing that differs between the two transcripts is the
 * `x-cert-provider` header. lesson-init deliberately does NOT force a
 * provider (that route wasn't wired into this gate) — both accounts get an
 * identical opening turn, and the two transcripts diverge starting at the
 * first real chat turn, which is the cleaner experimental design: same
 * starting point, then only the provider differs.
 *
 * Run: npx tsx scripts/qa/groqVsGeminiExperiment.ts
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'

const ACCOUNT_GROQ = { email: 'suaibamr1@gmail.com', password: 'papa@786', provider: 'groq' as const }
const ACCOUNT_GEMINI = { email: 'suaibamr3@gmail.com', password: 'papa@786', provider: 'gemini' as const }

const SUBJECT = 'physics'
const TOPIC_SLUG = 'phys.mech.newtons-second-law'

interface CurriculumLesson {
  topicSlug: string
  order: number
  lessonTitle: string
  unitTitle: string
}

interface Payload {
  text?: string
  provider?: string | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number; gatePending?: boolean } | null
  mcq?: { question: string; options: string[] } | null
  visualSpec?: unknown
  sceneSpec?: unknown
  visual?: unknown
  dynamicVisualizationCode?: unknown
  lessonComplete?: unknown
  lessonOrder?: number
  [k: string]: unknown
}

interface Turn { label: string; sent: string; payload: Payload }

async function login(email: string, password: string): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken: t, email, password, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed for ${email} (${r.status})`)
  return all
}

async function api(
  cookie: string, method: 'GET' | 'POST', path: string, body?: unknown, extraHeaders?: Record<string, string>,
): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST'
      ? { 'Content-Type': 'application/json', cookie, ...extraHeaders }
      : { cookie, ...extraHeaders },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as Payload
}

function hasVisual(p: Payload): boolean {
  return Boolean(p.visualSpec || p.sceneSpec || p.visual || p.dynamicVisualizationCode)
}

// Identical script for both accounts — the only intended variable is the
// forced provider.
const OPENING_LINES = [
  'hi, can you teach me this topic',
  'ok that makes sense, can you show me a diagram or picture for this?',
  'got it, can you explain a bit more with an example',
  'ok i think i understand now',
]
const CONTINUATIONS = [
  'can you give another example',
  'ok makes sense, what is next',
  'i see, please continue',
]

const MAX_TURNS = 12

async function runAccount(acct: { email: string; password: string; provider: 'groq' | 'gemini' }) {
  const cookie = await login(acct.email, acct.password)
  const certHeaders = { 'x-cert-provider': acct.provider }

  const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${SUBJECT}`)) as unknown as { lessons: CurriculumLesson[] }
  const lesson = cur.lessons.find((l) => l.topicSlug === TOPIC_SLUG)
  if (!lesson) throw new Error(`concept ${TOPIC_SLUG} not found in ${SUBJECT} curriculum`)

  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: SUBJECT })
  const sessionId = (session.data as { id: string }).id
  const turns: Turn[] = []
  const providersSeen: string[] = []

  try {
    // Deliberately NOT forced — see file header. Same opening for both accounts.
    let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: cur.lessons.length,
      completedLessons: [], teachingLanguage: 'en',
    })
    turns.push({ label: 'T0', sent: '(lesson-init, unforced)', payload: last })

    let openingIdx = 0
    let contIdx = 0
    let mcqAttemptCount = 0
    for (let i = 0; i < MAX_TURNS; i += 1) {
      let msg: string
      if (last.mcq) {
        msg = last.mcq.options[mcqAttemptCount % last.mcq.options.length]
        mcqAttemptCount += 1
      } else if (openingIdx < OPENING_LINES.length) {
        msg = OPENING_LINES[openingIdx]
        openingIdx += 1
      } else {
        msg = CONTINUATIONS[contIdx % CONTINUATIONS.length]
        contIdx += 1
      }
      let p: Payload
      try {
        p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg }, certHeaders)
      } catch (e) {
        console.error(`  [${acct.provider}] [turn ${i + 1}] ${(e as Error).message} — retrying once`)
        await new Promise((res) => setTimeout(res, 3000))
        try {
          p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg }, certHeaders)
        } catch (e2) {
          turns.push({ label: `T${i + 1}`, sent: msg, payload: { error: String((e2 as Error).message) } as unknown as Payload })
          break
        }
      }
      turns.push({ label: `T${i + 1}`, sent: msg, payload: p })
      if (p.provider) providersSeen.push(p.provider)
      last = p
      if (p.lessonComplete) break
    }

    return {
      account: acct.email,
      forcedProvider: acct.provider,
      subject: SUBJECT,
      topicSlug: lesson.topicSlug,
      lessonTitle: lesson.lessonTitle,
      sessionId,
      turns,
      providersSeen,
      allTurnsMatchForcedProvider: providersSeen.every((p) => p === acct.provider),
      anyVisual: turns.some((t) => hasVisual(t.payload)),
      visualTurnCount: turns.filter((t) => hasVisual(t.payload)).length,
      finalMastery: turns.at(-1)?.payload.mastery ?? null,
      totalTextChars: turns.reduce((sum, t) => sum + (t.payload.text?.length ?? 0), 0),
    }
  } finally {
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
}

async function main() {
  const OUT_ROOT = join(__dirname, 'qa-runs', `groq-vs-gemini-${Date.now()}`)
  mkdirSync(OUT_ROOT, { recursive: true })

  console.log(`=== Groq (${ACCOUNT_GROQ.email}) ===`)
  const groqResult = await runAccount(ACCOUNT_GROQ)
  writeFileSync(join(OUT_ROOT, 'groq.json'), JSON.stringify(groqResult, null, 2))
  console.log(
    `  turns=${groqResult.turns.length} providersSeen=${JSON.stringify([...new Set(groqResult.providersSeen)])}` +
    ` allForced=${groqResult.allTurnsMatchForcedProvider} visual=${groqResult.anyVisual}` +
    ` mastery=${JSON.stringify(groqResult.finalMastery)} chars=${groqResult.totalTextChars}`,
  )

  console.log(`\n=== Gemini (${ACCOUNT_GEMINI.email}) ===`)
  const geminiResult = await runAccount(ACCOUNT_GEMINI)
  writeFileSync(join(OUT_ROOT, 'gemini.json'), JSON.stringify(geminiResult, null, 2))
  console.log(
    `  turns=${geminiResult.turns.length} providersSeen=${JSON.stringify([...new Set(geminiResult.providersSeen)])}` +
    ` allForced=${geminiResult.allTurnsMatchForcedProvider} visual=${geminiResult.anyVisual}` +
    ` mastery=${JSON.stringify(geminiResult.finalMastery)} chars=${geminiResult.totalTextChars}`,
  )

  writeFileSync(join(OUT_ROOT, 'summary.json'), JSON.stringify({
    groq: { ...groqResult, turns: undefined },
    gemini: { ...geminiResult, turns: undefined },
  }, null, 2))

  console.log(`\nTranscripts written to: ${OUT_ROOT}`)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
