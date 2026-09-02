/**
 * qa5 — minimal, stateful, INTERACTIVE driver for a real-account learner run.
 *
 * One turn per invocation, state persisted to a scratch file, so a human (or
 * Claude acting as the student) reads each Tutor Max reply and composes the next
 * message. NOT a harness, NOT a scripted scenario, NO database access — every
 * action is an ordinary learner HTTP call to the deployed app, exactly what the
 * browser sends. Egress-safe: no polling, no bulk queries, curriculum fetched
 * once and cached.
 *
 * Subcommands:
 *   login                         real /api/auth flow; saves the cookie
 *   lessons                       GET /api/curriculum?subject=physics (once, cached)
 *   open   <topicSlug|order>      new session + lesson-init mode=restart
 *   resume <topicSlug|order>      lesson-init mode=resume (continuation)
 *   say    <message...>           one /api/learn/chat turn (free text)
 *   opt    <index>                answer the pending MCQ by tapping option[index]
 *   state                         print current session/lesson/pending mcq
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BASE = process.env.QA_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
// Holds the live session cookie between one-shot invocations. Portable temp by
// default (override with QA5_STATE). Never commit a populated copy — it carries
// an auth cookie; delete it when done.
const STATE = process.env.QA5_STATE ?? join(tmpdir(), 'qa5_state.json')

interface Mcq { question: string; options: string[]; correctIndex?: number }
interface Payload {
  text?: string; provider?: string | null; mcq?: Mcq | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  lessonComplete?: { complete?: boolean } | null
  visual?: unknown; visualSpec?: unknown; sceneSpec?: unknown; dynamicVisualizationCode?: unknown
  [k: string]: unknown
}
interface Lesson { topicSlug: string; order: number; lessonTitle: string; unitTitle: string; totalLessons: number; locked?: boolean }
interface State { cookie?: string; sessionId?: string; topicSlug?: string; lastMcq?: Mcq | null; lessons?: Lesson[] }

const load = (): State => (existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {})
const save = (s: State) => writeFileSync(STATE, JSON.stringify(s, null, 2))

function carriesFigure(p: Payload): boolean {
  return Boolean(p.visual) || Boolean(p.visualSpec) || Boolean(p.sceneSpec) || Boolean(p.dynamicVisualizationCode)
}
function figLabel(p: Payload): string {
  const probe = (v: unknown): string | null => {
    if (!v || typeof v !== 'object') return null
    const o = v as Record<string, unknown>
    for (const k of ['title', 'name', 'type', 'kind', 'renderer', 'conceptId', 'id']) {
      const val = o[k]; if (typeof val === 'string' && val.trim()) return `${k}=${val}`
    }
    return 'figure'
  }
  return carriesFigure(p)
    ? (probe(p.visual) ?? probe(p.visualSpec) ?? probe(p.sceneSpec) ?? (p.dynamicVisualizationCode ? 'dynamicVisualizationCode' : 'figure'))!
    : 'NO-FIGURE'
}

function show(tag: string, p: Payload) {
  const m = p.mastery
  const mastery = m ? `phase=${m.phase} verified=${m.verified} check=${m.checkCorrect} practice=${m.practiceCorrect}` : 'mastery=none'
  const complete = p.lessonComplete?.complete ? ' LESSON_COMPLETE' : ''
  console.log(`\n== [${tag}] provider=${p.provider ?? '?'} | ${figLabel(p)} | ${mastery} | mcq=${p.mcq ? 'YES' : 'no'}${complete}`)
  if (p.mcq) {
    console.log(`   MCQ: ${p.mcq.question}`)
    p.mcq.options.forEach((o, i) => console.log(`     [${i}] ${o}`))
    if (p.mcq.correctIndex !== undefined) console.log(`   (payload.correctIndex present = ${p.mcq.correctIndex})`)
  }
  console.log('   TUTOR: ' + (p.text ?? '').replace(/\s+/g, ' ').trim())
}

async function login(): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({
      csrfToken: t, email: process.env.QA_EMAIL!, password: process.env.QA_PASSWORD!, callbackUrl: `${BASE}/learn`,
    }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status}): ${(await r.text()).slice(0, 200)}`)
  return all
}

async function post(path: string, body: unknown, cookie: string): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie }, body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as Payload
}

function pickLesson(s: State, ref: string): Lesson {
  const ls = s.lessons ?? []
  const byNum = /^\d+$/.test(ref) ? ls.find((l) => l.order === Number(ref)) : undefined
  const bySlug = ls.find((l) => l.topicSlug === ref)
  const l = byNum ?? bySlug
  if (!l) throw new Error(`lesson not found: ${ref} (run 'lessons' first)`)
  return l
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2)
  const s = load()

  if (cmd === 'login') {
    s.cookie = await login(); save(s)
    console.log('login OK — session-token present'); return
  }
  if (!s.cookie) throw new Error("no cookie — run 'login' first")

  if (cmd === 'lessons') {
    const raw = await (await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie: s.cookie } })).json() as
      { lessons?: Array<Record<string, unknown>> }
    const ls = (raw.lessons ?? []).map((n) => ({
      topicSlug: String(n.topicSlug ?? n.slug ?? n.id ?? ''),
      order: Number(n.order ?? n.lessonOrder ?? 0),
      lessonTitle: String(n.lessonTitle ?? n.title ?? ''),
      unitTitle: String(n.unitTitle ?? n.unit ?? ''),
      totalLessons: (raw.lessons ?? []).length,
      locked: Boolean(n.locked ?? false),
    })) as Lesson[]
    s.lessons = ls; save(s)
    console.log(`physics lessons: ${ls.length}`)
    for (const l of ls.slice(0, 40)) console.log(`  #${l.order}  ${l.locked ? 'LOCKED ' : '      '}${l.topicSlug}  —  ${l.lessonTitle}  [${l.unitTitle}]`)
    return
  }

  if (cmd === 'open' || cmd === 'resume') {
    const l = pickLesson(s, rest[0])
    if (cmd === 'open' || !s.sessionId) {
      const sess = await (await fetch(`${BASE}/api/sessions`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', cookie: s.cookie }, body: JSON.stringify({ subjectSlug: 'physics' }),
      })).json() as { data?: { id?: string }; id?: string }
      s.sessionId = sess.data?.id ?? sess.id
      if (!s.sessionId) throw new Error('no session id')
    }
    s.topicSlug = l.topicSlug
    const p = await post('/api/learn/lesson-init', {
      sessionId: s.sessionId, mode: cmd === 'open' ? 'restart' : 'resume',
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug,
      unitTitle: l.unitTitle, totalLessons: l.totalLessons, completedLessons: [], teachingLanguage: 'en',
    }, s.cookie)
    s.lastMcq = p.mcq ?? null; save(s)
    console.log(`${cmd} session=${s.sessionId} lesson=#${l.order} ${l.topicSlug} (${l.lessonTitle})`)
    show(cmd === 'open' ? 'OPEN' : 'RESUME', p)
    return
  }

  if (cmd === 'say' || cmd === 'opt') {
    if (!s.sessionId) throw new Error("no session — run 'open' first")
    let message: string
    if (cmd === 'opt') {
      const idx = Number(rest[0])
      if (!s.lastMcq || !s.lastMcq.options[idx]) throw new Error('no pending MCQ option at that index')
      message = s.lastMcq.options[idx]
      console.log(`STUDENT taps option [${idx}]: "${message}"`)
    } else {
      message = rest.join(' ')
      console.log(`STUDENT: "${message}"`)
    }
    const p = await post('/api/learn/chat', { sessionId: s.sessionId, message }, s.cookie)
    s.lastMcq = p.mcq ?? null; save(s)
    show('TURN', p)
    return
  }

  if (cmd === 'state') { console.log(JSON.stringify({ ...s, cookie: s.cookie ? 'present' : 'none', lessons: `${s.lessons?.length ?? 0} cached` }, null, 2)); return }

  console.log('usage: login | lessons | open <ref> | resume <ref> | say <msg> | opt <i> | state')
}

main().catch((e) => { console.error('ERR', e.message); process.exit(1) })
