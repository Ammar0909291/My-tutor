/**
 * Provider/model comparison — real deployed app, one concept each in
 * physics, chemistry, english (same three concepts as
 * groqVsGeminiCompare.ts, for continuity), driven twice: once forced to
 * Groq's `openai/gpt-oss-120b` (the per-request-only cert-allowlist entry
 * added in commit 8a3a57a9 — the live PRODUCTION DEFAULT for every other
 * learner remains `openai/gpt-oss-20b`, untouched by this script), once
 * forced to Gemini. Uses the same `x-cert-provider` +
 * (for groq) `x-cert-groq-model` headers as groqVsGeminiCompare.ts
 * (src/app/api/learn/chat/route.ts ~L196-219). Both headers are INERT
 * unless the authenticated user's own DB row has `modelOverrideAllowed =
 * true` — verified directly against production before writing the sibling
 * script (suaibamr1@gmail.com already has it set to true).
 *
 * Captures the server-reported `provider` field on every turn so the
 * comparison is never based on an assumption about which provider actually
 * answered — if a forced provider fails over, that shows up in the data
 * rather than being silently misreported as the forced one.
 *
 * Run: npx tsx scripts/qa/groq120bVsGeminiCompare.ts
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = 'suaibamr1@gmail.com'
const PASSWORD = 'papa@786'

interface CurriculumLesson {
  topicSlug: string
  order: number
  lessonTitle: string
  unitTitle: string
}

interface Payload {
  text?: string
  provider?: string | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  mcq?: { question: string; options: string[] } | null
  visualSpec?: unknown
  sceneSpec?: unknown
  visual?: unknown
  dynamicVisualizationCode?: unknown
  lessonComplete?: unknown
  lessonOrder?: number
  data?: { id?: string }
  lessons?: CurriculumLesson[]
  [k: string]: unknown
}

async function login(): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken: t, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown, extraHeaders?: Record<string, string>): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie, ...(extraHeaders ?? {}) } : { cookie, ...(extraHeaders ?? {}) },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 400)}`)
  return (await r.json()) as Payload
}

function hasVisual(p: Payload): boolean {
  return Boolean(p.visualSpec || p.sceneSpec || p.visual || p.dynamicVisualizationCode)
}

// An ordinary, engaged learner turn sequence. Same for both provider runs on
// the same concept so the comparison is apples-to-apples.
const TURNS = [
  'hi, can you teach me this topic',
  'ok that makes sense, can you show me a diagram or example?',
  'got it, can you explain a bit more and give me a practice question',
  'ok i think i understand now',
]

const MAX_TURNS = 8

async function runConcept(cookie: string, subject: string, lesson: CurriculumLesson, totalLessons: number, provider: 'groq' | 'gemini') {
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: subject })
  const sessionId = session.data!.id as string
  const providerHeader = provider === "groq" ? { "x-cert-provider": "groq", "x-cert-groq-model": "openai/gpt-oss-120b" } : { "x-cert-provider": "gemini" }
  const turns: { label: string; sent: string; provider: string | null | undefined; text: string; hasVisual: boolean; mcq: boolean }[] = []

  try {
    let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons, completedLessons: [],
      teachingLanguage: 'en',
    }, providerHeader)
    turns.push({ label: 'T0', sent: '(lesson-init)', provider: last.provider, text: String(last.text ?? ''), hasVisual: hasVisual(last), mcq: Boolean(last.mcq) })

    for (let i = 0; i < MAX_TURNS; i += 1) {
      let msg: string
      if (last.mcq) {
        msg = last.mcq.options[0]
      } else if (i < TURNS.length) {
        msg = TURNS[i]
      } else {
        break
      }
      const p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg }, providerHeader)
      turns.push({ label: `T${i + 1}`, sent: msg, provider: p.provider, text: String(p.text ?? ''), hasVisual: hasVisual(p), mcq: Boolean(p.mcq) })
      last = p
      if (p.lessonComplete) break
    }

    return {
      subject, topicSlug: lesson.topicSlug, lessonTitle: lesson.lessonTitle, requestedProvider: provider,
      actualProviders: [...new Set(turns.map((t) => t.provider))],
      anyVisual: turns.some((t) => t.hasVisual),
      anyMcq: turns.some((t) => t.mcq),
      finalMastery: last.mastery ?? null,
      turnCount: turns.length,
      turns,
    }
  } finally {
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
}

async function main() {
  const cookie = await login()
  const OUT_ROOT = join(__dirname, 'qa-runs', `groq-vs-gemini-${Date.now()}`)
  mkdirSync(OUT_ROOT, { recursive: true })

  // One concept per subject, an early-but-not-trivial lesson so there is
  // real content to compare (not the bare entry-node concept).
  const picks: { subject: string; index: number }[] = [
    { subject: 'physics', index: 5 },
    { subject: 'chemistry', index: 5 },
    { subject: 'english', index: 5 },
  ]

  const results: Record<string, unknown>[] = []

  for (const pick of picks) {
    const cur = await api(cookie, 'GET', `/api/curriculum?subject=${pick.subject}`)
    const lesson = (cur.lessons as CurriculumLesson[])[pick.index]
    console.log(`\n########## ${pick.subject} / ${lesson.topicSlug} ##########`)

    for (const provider of ['groq', 'gemini'] as const) {
      console.log(`\n=== provider=${provider} ===`)
      try {
        const result = await runConcept(cookie, pick.subject, lesson, 999, provider)
        writeFileSync(
          join(OUT_ROOT, `${pick.subject}-${lesson.topicSlug.replace(/\./g, '_')}-${provider}.json`),
          JSON.stringify(result, null, 2),
        )
        results.push({ ...result, turns: undefined })
        console.log(`  actualProviders=${JSON.stringify(result.actualProviders)} visual=${result.anyVisual} mcq=${result.anyMcq} mastery=${JSON.stringify(result.finalMastery)}`)
        for (const t of result.turns) {
          console.log(`   [${t.label}] provider=${t.provider} len=${t.text.length} "${t.text.slice(0, 120).replace(/\n/g, ' ')}"`)
        }
      } catch (e) {
        console.error(`  FAILED: ${(e as Error).message}`)
        results.push({ subject: pick.subject, topicSlug: lesson.topicSlug, requestedProvider: provider, error: String((e as Error).message).slice(0, 400) })
      }
    }
  }

  writeFileSync(join(OUT_ROOT, 'summary.json'), JSON.stringify(results, null, 2))
  console.log(`\nTranscripts written to: ${OUT_ROOT}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
