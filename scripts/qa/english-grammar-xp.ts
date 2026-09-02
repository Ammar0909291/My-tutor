/**
 * Student XP — English Grammar lesson (first eng.gram.* concept found in curriculum).
 * Persona: average student who struggles with grammar rules.
 * Run: QA_PASSWORD=... npx tsx scripts/qa/english-grammar-xp.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = 'https://my-tutor-flame.vercel.app'
const SUBJECT = 'english'
const EMAIL = 'suaibamr@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

const TURNS = [
  "Hi! I always get confused about grammar. Can we start with something basic?",
  "Ok I think I understand the idea. Can you show me a simple example with a sentence?",
  "Wait — so the verb has to match the subject, not the closest noun? That trips me up. Like 'The box of chocolates are on the table' — is that wrong?",
  "Ok so 'are' should be 'is' because 'box' is the subject, not 'chocolates'. Got it. What about 'Neither the teachers nor the student know the answer' — is that right?",
  "Interesting — 'know' should be 'knows' because we match the verb to the nearest subject. I think I'm getting it now.",
]

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

async function startLesson(cookie: string): Promise<{ sid: string; init: any; lesson: any }> {
  const activeSessions = await fetch(`${BASE}/api/sessions`, { headers: { cookie } })
    .then(r => r.json()).catch(() => ({ data: [] })) as any
  for (const s of activeSessions.data ?? []) {
    if (s.id) await fetch(`${BASE}/api/sessions/end`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ sessionId: s.id }),
    }).catch(() => {})
  }

  const sr = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT }),
  })
  const sd = await sr.json() as any
  const sid = sd.data?.id ?? sd.id
  if (!sid) throw new Error(`session create failed: ${JSON.stringify(sd)}`)

  const cr = await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })
  const curriculum = await cr.json() as any
  const lessons: any[] = curriculum.lessons ?? []

  // Pick the first grammar concept (eng.gram.*), fall back to any eng.* concept
  let lesson = lessons.find((l: any) => l.topicSlug?.startsWith('eng.gram.'))
  if (!lesson) lesson = lessons.find((l: any) => l.topicSlug?.startsWith('eng.'))
  if (!lesson) throw new Error('No English concept found in curriculum')
  console.log(`✓ Concept selected: ${lesson.topicSlug} — "${lesson.lessonTitle}"`)

  const ir = await fetch(`${BASE}/api/learn/lesson-init`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      sessionId: sid, mode: 'restart',
      lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
      totalLessons: lessons.length, completedLessons: [],
      teachingLanguage: 'en',
    }),
  })
  if (!ir.ok) throw new Error(`lesson-init failed: ${ir.status} ${await ir.text()}`)
  const init = await ir.json()
  return { sid, init, lesson }
}

async function chat(message: string, sid: string, cookie: string): Promise<any> {
  const r = await fetch(`${BASE}/api/learn/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid, message }),
  })
  if (!r.ok) throw new Error(`chat failed: ${r.status} ${await r.text()}`)
  return r.json()
}

function display(p: any, label: string): void {
  const m = p.mastery
  const phase = m?.phase ?? '?'
  const check = m?.correctAtCheck ?? 0
  const practice = m?.correctAtPractice ?? 0
  const verified = m?.verified ?? false
  const prov = p.provider ? ` [${p.provider}]` : ''
  console.log(`\n🤖 Tutor${prov}:`)
  if (p.text) {
    const t = p.text.replace(/\n{3,}/g, '\n\n').trim()
    console.log(t.length > 1500 ? t.slice(0, 1500) + '\n[…truncated]' : t)
  }
  if (p.mcq) {
    console.log(`\n  📋 MCQ: ${p.mcq.question}`)
    p.mcq.options.forEach((o: string, i: number) =>
      console.log(`     ${i + 1}. ${o}${i === p.mcq.correctIndex ? '  ✓' : ''}`))
  }
  if (p.visualSpec) {
    const vs = p.visualSpec
    console.log(`\n  🖼️  VISUAL: type=${vs.type ?? vs.kind ?? '?'} source=${vs.source ?? '?'} title="${vs.title ?? '—'}"`)
    if (vs.description) console.log(`     desc: ${vs.description?.slice(0, 120)}`)
  } else {
    console.log(`\n  🖼️  VISUAL: none`)
  }
  console.log(`\n  📊 [${label}] phase=${phase} check=${check} practice=${practice} mastered=${verified}`)
}

async function run() {
  console.log('\n╔══════════════════════════════════════════════════╗')
  console.log('║  Student XP — English Grammar                    ║')
  console.log('║  Persona: average student, struggles with rules  ║')
  console.log('╚══════════════════════════════════════════════════╝\n')

  const cookie = await login()
  console.log('✓ Logged in')

  const { sid, init, lesson } = await startLesson(cookie)
  console.log(`✓ Session: ${sid.slice(0, 8)}…`)

  if (init.text) {
    console.log('\n── T0 (lesson opening) ─────────────────────────────')
    console.log('🤖 Tutor:')
    const t = init.text.replace(/\n{3,}/g, '\n\n').trim()
    console.log(t.length > 1000 ? t.slice(0, 1000) + '\n[…truncated]' : t)
    if (init.visualSpec) {
      console.log(`\n  🖼️  VISUAL: type=${init.visualSpec.type ?? '?'} title="${init.visualSpec.title ?? '—'}"`)
    } else {
      console.log(`\n  🖼️  VISUAL: none`)
    }
  }

  for (let i = 0; i < TURNS.length; i++) {
    const msg = TURNS[i]
    console.log(`\n── T${i + 1} ──────────────────────────────────────────`)
    console.log(`🧑 Me: ${msg}`)
    const t0 = Date.now()
    try {
      const p = await chat(msg, sid, cookie)
      display(p, `T${i + 1}, ${Date.now() - t0}ms`)
    } catch (e: any) {
      console.log(`❌  ${e.message}`)
      break
    }
  }

  console.log('\n══════════════════════════════════════════════════════')
  console.log('  END')
  console.log('══════════════════════════════════════════════════════\n')
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
