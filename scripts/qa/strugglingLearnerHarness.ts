/**
 * STRUGGLING-LEARNER HARNESS — a repeatable, subject-agnostic acceptance test.
 *
 * Drives the REAL deployed app as a weak-English, visual-dependent, easily
 * confused learner across a random sample of a subject's hardest concepts,
 * and captures full transcripts for a human (or a future Claude session) to
 * score. It measures objective signals only (visual presence, mastery
 * progress, provider health, turn repetition) — the subjective "how good was
 * this teaching experience" rating still needs a real read of the transcript,
 * because no regex substitutes for that judgment.
 *
 * Born from a manual one-off run (30 physics concepts, 2026-08-29) that found
 * a repeatable pattern: sessions with a real visual scored consistently
 * higher than sessions without one, and only 1 of 30 ever reached verified
 * mastery. This script exists so that comparison can be re-run on demand
 * instead of hand-built each time.
 *
 *   QA_EMAIL=… QA_PASSWORD=… npx tsx scripts/qa/strugglingLearnerHarness.ts \
 *     physics --difficulty=advanced,expert,research --count=30 --seed=1
 *
 * Output: one out-<conceptId>.json transcript per concept plus a
 * summary.json, written to --out (default: a qa-runs/<subject>-<timestamp>
 * directory under this script's own folder — gitignored, see .gitignore).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'

interface KgConcept {
  id: string
  name: string
  difficulty: string
}

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
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  visualSpec?: unknown
  sceneSpec?: unknown
  visual?: unknown
  dynamicVisualizationCode?: unknown
  lessonComplete?: unknown
  [k: string]: unknown
}

interface Turn { label: string; sent: string; payload: Payload }

function parseArgs(argv: string[]) {
  const subject = argv[0]
  if (!subject) throw new Error('usage: strugglingLearnerHarness.ts <subject> [--difficulty=a,b] [--count=N] [--seed=N] [--out=dir]')
  const opt = (name: string, def: string) => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`))
    return hit ? hit.slice(name.length + 3) : def
  }
  return {
    subject,
    difficulties: opt('difficulty', 'advanced,expert,research').split(','),
    count: Number(opt('count', '30')),
    seed: Number(opt('seed', String(Date.now() % 100000))),
    outDir: opt('out', ''),
  }
}

// Deterministic PRNG so --seed reproduces the same concept sample.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickConcepts(subject: string, difficulties: string[], count: number, seed: number, lessonBySlug: Map<string, CurriculumLesson>) {
  const kgPath = join(__dirname, '..', '..', 'docs', subject, 'kg', 'graph.json')
  const kg = JSON.parse(readFileSync(kgPath, 'utf8')) as { concepts: KgConcept[] }
  const pool = kg.concepts.filter((c) => difficulties.includes(c.difficulty) && lessonBySlug.has(c.id))
  const rand = mulberry32(seed)
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

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

// Weak English, easily confused, visual-dependent — the persona this file was
// built to give a repeatable shape to. Adaptive at one point only: it answers
// whatever MCQ is actually pending (wrong once per concept, then right),
// rather than assuming a fixed turn holds the question.
const PERSONA_LINES = [
  'hello sir, sorry my english is not very good, can you teach me easy easy please',
  "i dont understand this, its too hard for me, sorry",
  'can you show me a picture or diagram? i understand better when i see something, my english is weak',
  'ohh ok, i think i understand a little bit now',
  'can you show the picture again, i want to look one more time',
  'thank you sir, i understand a little better now with the picture',
  'ok i will try, i think i know the answer',
  'can i go to next lesson now, i think i learn this one',
]
const MAX_TURNS = 9

async function runConcept(cookie: string, subject: string, concept: KgConcept, lesson: CurriculumLesson, totalLessons: number) {
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: subject })
  const sessionId = (session.data as { id: string }).id
  const turns: Turn[] = []

  let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons, completedLessons: [],
    teachingLanguage: 'en',
  })
  turns.push({ label: 'T0', sent: '(lesson-init)', payload: last })

  let personaIdx = 0
  let answeredWrongOnce = false
  for (let i = 0; i < MAX_TURNS; i += 1) {
    let msg: string
    if (last.mcq) {
      if (!answeredWrongOnce) { msg = last.mcq.options[(last.mcq.correctIndex + 1) % last.mcq.options.length]; answeredWrongOnce = true }
      else msg = last.mcq.options[last.mcq.correctIndex]
    } else {
      msg = PERSONA_LINES[Math.min(personaIdx, PERSONA_LINES.length - 1)]
      personaIdx += 1
    }
    const p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg })
    turns.push({ label: `T${i + 1}`, sent: msg, payload: p })
    last = p
    if (p.lessonComplete) break
  }

  await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})

  return {
    id: concept.id, name: concept.name, difficulty: concept.difficulty, sessionId, turns,
    anyVisual: turns.some((t) => hasVisual(t.payload)),
    visualTurnCount: turns.filter((t) => hasVisual(t.payload)).length,
    providerDegraded: turns.some((t) => t.payload.provider === 'degraded'),
    finalMastery: turns.at(-1)!.payload.mastery ?? null,
  }
}

async function main() {
  const { subject, difficulties, count, seed, outDir } = parseArgs(process.argv.slice(2))
  const cookie = await login()

  const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${subject}`)) as unknown as { lessons: CurriculumLesson[] }
  const lessonBySlug = new Map(cur.lessons.map((l) => [l.topicSlug, l]))
  const picked = pickConcepts(subject, difficulties, count, seed, lessonBySlug)
  if (picked.length < count) {
    console.warn(`WARNING: only ${picked.length}/${count} concepts matched difficulty=[${difficulties.join(',')}] with a curriculum entry`)
  }

  const OUT_ROOT = join(__dirname, 'qa-runs') // gitignored — see .gitignore
  const dir = outDir || join(OUT_ROOT, `${subject}-${Date.now()}`)
  mkdirSync(dir, { recursive: true })

  const summary: Array<Record<string, unknown>> = []
  for (let i = 0; i < picked.length; i += 1) {
    const concept = picked[i]
    const lesson = lessonBySlug.get(concept.id)!
    const t0 = Date.now()
    try {
      const result = await runConcept(cookie, subject, concept, lesson, cur.lessons.length)
      writeFileSync(join(dir, `out-${concept.id.replace(/\./g, '_')}.json`), JSON.stringify(result, null, 2))
      summary.push({
        id: concept.id, difficulty: concept.difficulty, ok: true, ms: Date.now() - t0,
        anyVisual: result.anyVisual, visualTurnCount: result.visualTurnCount,
        providerDegraded: result.providerDegraded, finalMastery: result.finalMastery,
      })
      console.log(`[${i + 1}/${picked.length}] ${concept.id} visual=${result.anyVisual} degraded=${result.providerDegraded}`)
    } catch (e) {
      summary.push({ id: concept.id, difficulty: concept.difficulty, ok: false, ms: Date.now() - t0, error: String((e as Error).message).slice(0, 300) })
      console.error(`[${i + 1}/${picked.length}] FAILED ${concept.id}: ${(e as Error).message}`)
    }
    writeFileSync(join(dir, 'summary.json'), JSON.stringify(summary, null, 2))
  }

  const ok = summary.filter((s) => s.ok)
  const withVisual = ok.filter((s) => s.anyVisual).length
  console.log(`\n${ok.length}/${picked.length} completed. ${withVisual}/${ok.length} showed a real visual at least once.`)
  console.log(`Transcripts: ${dir}`)
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
