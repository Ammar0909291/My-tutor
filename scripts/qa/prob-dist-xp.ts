/**
 * Student XP session — Probability Distributions in Physics (phys.stat.probability-basics)
 * Average student persona: knows basic maths probability, new to physics applications.
 * Explicitly asks for a diagram on T2 — diagram relevancy/clarity assessed in report.
 * Run: QA_PASSWORD=... npx tsx scripts/qa/prob-dist-xp.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = 'https://my-tutor-flame.vercel.app'
const SUBJECT = 'physics'
const CONCEPT = 'phys.stat.probability-basics'
const EMAIL = 'suaibamr@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

const TURNS = [
  "Hi, I want to learn about probability distributions in physics. I've done basic probability in maths but how is it different in physics?",
  "So it's about how likely different outcomes are for a physical measurement? Can you show me a diagram or graph of what this looks like? A picture would really help.",
  "I don't really get how a continuous distribution works. Like, how can you have a probability for an exact value if every exact number has zero probability?",
  "Ok so the area under the curve gives probability for a range? What's the most common example of this in physics?",
  "So the Maxwell-Boltzmann distribution tells you the most likely speed of a gas molecule? Is that what the bell-curve shape means — most molecules are near the peak?",
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

async function startLesson(cookie: string): Promise<{ sid: string; init: any }> {
  // 1. End any active sessions
  const activeSessions = await fetch(`${BASE}/api/sessions`, { headers: { cookie } })
    .then(r => r.json()).catch(() => ({ data: [] })) as any
  for (const s of activeSessions.data ?? []) {
    if (s.id) await fetch(`${BASE}/api/sessions/end`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ sessionId: s.id }),
    }).catch(() => {})
  }

  // 2. Create new session
  const sr = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT }),
  })
  const sd = await sr.json() as any
  const sid = sd.data?.id ?? sd.id
  if (!sid) throw new Error(`session create failed: ${JSON.stringify(sd)}`)

  // 3. Get curriculum to find lesson metadata
  const cr = await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })
  const curriculum = await cr.json() as any
  const lessons: any[] = curriculum.lessons ?? []
  const lesson = lessons.find((l: any) => l.topicSlug === CONCEPT)
  if (!lesson) throw new Error(`concept not found in curriculum: ${CONCEPT}`)

  // 4. Init the lesson
  const ir = await fetch(`${BASE}/api/learn/lesson-init`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      sessionId: sid,
      mode: 'restart',
      lessonTitle: lesson.lessonTitle,
      lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug,
      unitTitle: lesson.unitTitle,
      totalLessons: lessons.length,
      completedLessons: [],
      teachingLanguage: 'en',
    }),
  })
  if (!ir.ok) throw new Error(`lesson-init failed: ${ir.status} ${await ir.text()}`)
  const init = await ir.json()
  return { sid, init }
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

function displayVisual(vs: any): void {
  const type = vs.type ?? vs.kind ?? '?'
  const source = vs.source ?? vs.provider ?? '?'
  console.log(`\n  🖼️  VISUAL PRESENT:`)
  console.log(`     type:      ${type}`)
  console.log(`     source:    ${source}`)
  if (vs.title)       console.log(`     title:     ${vs.title}`)
  if (vs.conceptId)   console.log(`     conceptId: ${vs.conceptId}`)
  if (vs.description) console.log(`     desc:      ${vs.description.slice(0, 200)}`)
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
    displayVisual(p.visualSpec)
  } else {
    console.log(`\n  🖼️  VISUAL: none`)
  }
  console.log(`\n  📊 [${label}] phase=${phase} check=${check} practice=${practice} mastered=${verified}`)
}

async function run() {
  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  Student XP — Probability Distributions in Physics       ║')
  console.log('║  Concept: phys.stat.probability-basics                   ║')
  console.log('║  Persona: average student, knows basic maths probability ║')
  console.log('║  Account: suaibamr@gmail.com                             ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  const cookie = await login()
  console.log('✓ Logged in\n')

  const { sid, init } = await startLesson(cookie)
  console.log(`✓ Lesson: "${init.lessonTitle ?? CONCEPT}" (session ${sid.slice(0, 8)}…)`)

  if (init.text) {
    console.log('\n── T0 (lesson opening) ─────────────────────────────────────')
    console.log('🤖 Tutor:')
    const t = init.text.replace(/\n{3,}/g, '\n\n').trim()
    console.log(t.length > 1200 ? t.slice(0, 1200) + '\n[…truncated]' : t)
    if (init.visualSpec) {
      displayVisual(init.visualSpec)
    } else {
      console.log(`\n  🖼️  VISUAL: none (expected — lesson-init has no visual pipeline)`)
    }
  }

  const visuals: Array<{ turn: number; spec: any }> = []

  for (let i = 0; i < TURNS.length; i++) {
    const msg = TURNS[i]
    console.log(`\n── T${i + 1} ─────────────────────────────────────────────────`)
    console.log(`🧑 Me: ${msg}`)

    const t0 = Date.now()
    try {
      const p = await chat(msg, sid, cookie)
      display(p, `T${i + 1}, ${Date.now() - t0}ms`)
      if (p.visualSpec) visuals.push({ turn: i + 1, spec: p.visualSpec })
    } catch (e: any) {
      console.log(`❌  ${e.message}`)
      break
    }
  }

  console.log('\n══════════════════════════════════════════════════════════════')
  console.log('  END OF STUDENT SESSION')
  console.log('══════════════════════════════════════════════════════════════')

  if (visuals.length) {
    console.log(`\n📊 Visual summary: ${visuals.length} visual(s) served across T1-T${TURNS.length}`)
    visuals.forEach(v => {
      const vs = v.spec
      console.log(`  T${v.turn}: type=${vs.type ?? vs.kind ?? '?'} source=${vs.source ?? vs.provider ?? '?'} title="${vs.title ?? '—'}"`)
    })
  } else {
    console.log(`\n📊 Visual summary: 0 visuals served (diagram requested on T2 — not fulfilled)`)
  }
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
