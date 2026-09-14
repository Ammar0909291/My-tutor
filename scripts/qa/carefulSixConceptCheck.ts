/**
 * CAREFUL SIX-CONCEPT BEHAVIOUR CHECK — real account, real deployed app.
 *
 * Drives 2 concepts each in physics, chemistry, english against the live
 * production app using the owner's own real account, and writes a full
 * transcript per concept for manual review. Unlike strugglingLearnerHarness.ts
 * this is not a stress-test persona — it plays an ordinary, moderately
 * engaged learner: reads, occasionally asks for a diagram, answers MCQs by
 * cycling through options (the server never reveals the correct answer to
 * the client, so — same as every other harness in this repo — correctness
 * is discovered empirically via the mastery counters, not assumed).
 *
 * Reuses the proven login()/csrf helpers from scripts/math/certify.ts rather
 * than re-implementing them (the /api/auth/csrf duplicate-cookie bug has
 * already cost one harness its login once).
 *
 * This is the user's OWN real account — never deleted, never abandoned in a
 * broken state: every opened session is explicitly ended in a `finally`
 * block, exactly as strugglingLearnerHarness.ts does, so nothing leaks into
 * whatever the user does next in the app themselves.
 *
 * Run: QA_EMAIL=... QA_PASSWORD=... npx tsx scripts/qa/carefulSixConceptCheck.ts
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'

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

async function login(): Promise<string> {
  const email = process.env.QA_EMAIL
  const password = process.env.QA_PASSWORD
  if (!email || !password) throw new Error('set QA_EMAIL and QA_PASSWORD')
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
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie } : { cookie },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as Payload
}

function hasVisual(p: Payload): boolean {
  return Boolean(p.visualSpec || p.sceneSpec || p.visual || p.dynamicVisualizationCode)
}

// An ordinary, moderately engaged learner — not a stress test. Asks a genuine
// question once, asks for a diagram once, otherwise responds naturally.
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

const MAX_TURNS = 20

async function runConcept(cookie: string, subject: string, lesson: CurriculumLesson, totalLessons: number, label: string) {
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: subject })
  const sessionId = (session.data as { id: string }).id
  const turns: Turn[] = []

  try {
    let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons, completedLessons: [],
      teachingLanguage: 'en',
    })
    turns.push({ label: 'T0', sent: '(lesson-init)', payload: last })

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
        p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg })
      } catch (e) {
        console.error(`  [${label}] [turn ${i + 1}] ${(e as Error).message} — retrying once`)
        await new Promise((res) => setTimeout(res, 3000))
        try {
          p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg })
        } catch (e2) {
          turns.push({ label: `T${i + 1}`, sent: msg, payload: { error: String((e2 as Error).message) } as unknown as Payload })
          break
        }
      }
      turns.push({ label: `T${i + 1}`, sent: msg, payload: p })
      last = p
      if (p.lessonComplete) break
    }

    const servedOrders = turns.map((t) => t.payload.lessonOrder).filter((o): o is number => typeof o === 'number')
    const offTarget = [...new Set(servedOrders.filter((o) => o !== lesson.order))]

    return {
      subject, topicSlug: lesson.topicSlug, lessonTitle: lesson.lessonTitle, sessionId, turns,
      anyVisual: turns.some((t) => hasVisual(t.payload)),
      visualTurnCount: turns.filter((t) => hasVisual(t.payload)).length,
      providerDegraded: turns.some((t) => t.payload.provider === 'degraded'),
      finalMastery: turns.at(-1)?.payload.mastery ?? null,
      lessonDrift: offTarget.length > 0,
      lessonOrdersServed: offTarget,
    }
  } finally {
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
}

async function main() {
  const cookie = await login()
  const OUT_ROOT = join(__dirname, 'qa-runs', `six-concept-${Date.now()}`)
  mkdirSync(OUT_ROOT, { recursive: true })

  const subjects = ['physics', 'chemistry', 'english']
  const results: Record<string, unknown>[] = []

  for (const subject of subjects) {
    const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${subject}`)) as unknown as { lessons: CurriculumLesson[] }
    // Pick two lessons spread across the curriculum, not just the first two —
    // more representative of what a real learner actually hits.
    const pickIdx = [0, Math.floor(cur.lessons.length / 3)]
    for (const idx of pickIdx) {
      const lesson = cur.lessons[idx]
      const label = `${subject}/${lesson.topicSlug}`
      console.log(`\n=== ${label} (order ${lesson.order}) ===`)
      const t0 = Date.now()
      try {
        const result = await runConcept(cookie, subject, lesson, cur.lessons.length, label)
        writeFileSync(join(OUT_ROOT, `${subject}-${lesson.topicSlug.replace(/\./g, '_')}.json`), JSON.stringify(result, null, 2))
        results.push({ label, ok: true, ms: Date.now() - t0, ...result, turns: undefined })
        console.log(
          `  visual=${result.anyVisual} degraded=${result.providerDegraded} mastery=${JSON.stringify(result.finalMastery)}` +
            (result.lessonDrift ? ` DRIFT->${result.lessonOrdersServed.join(',')}` : ''),
        )
      } catch (e) {
        results.push({ label, ok: false, error: String((e as Error).message).slice(0, 400) })
        console.error(`  FAILED: ${(e as Error).message}`)
      }
    }
  }

  writeFileSync(join(OUT_ROOT, 'summary.json'), JSON.stringify(results, null, 2))
  console.log(`\nTranscripts written to: ${OUT_ROOT}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
