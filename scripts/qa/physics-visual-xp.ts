/**
 * Student XP session — Kinetic Energy (physics), acting as a real confused learner.
 * Concept chosen because it has a confirmed ACTIVE visual asset.
 * Run: QA_PASSWORD=... npx tsx scripts/qa/physics-visual-xp.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = 'https://my-tutor-flame.vercel.app'
const SUBJECT = 'physics'
const CONCEPT = 'phys.mech.kinetic-energy'
const EMAIL = 'suaibamr@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

const TURNS = [
  "Hi! I want to learn about kinetic energy. I've heard the term but I'm not sure what it actually means.",
  "So it's the energy of motion? But what does that actually mean — like, what IS energy?",
  "Ok so energy is the ability to do work. But how does moving faster give you MORE energy? That's the part I don't get.",
  "Wait, so if I double my speed I get FOUR times the kinetic energy? That seems weird. Why squared?",
  "Oh — so KE = ½mv². A 2 kg ball moving at 3 m/s has KE = ½ × 2 × 9 = 9 joules?",
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
    console.log(`\n  🖼️  VISUAL: type=${vs.type ?? vs.kind ?? '?'} source=${vs.source ?? vs.provider ?? '?'}`)
    if (vs.title) console.log(`     title: ${vs.title}`)
    if (vs.description) console.log(`     desc:  ${vs.description?.slice(0, 120)}`)
    if (vs.conceptId) console.log(`     conceptId: ${vs.conceptId}`)
  } else {
    console.log(`\n  🖼️  VISUAL: none`)
  }
  console.log(`\n  📊 [${label}] phase=${phase} check=${check} practice=${practice} mastered=${verified}`)
}

async function run() {
  console.log('\n╔══════════════════════════════════════════════════╗')
  console.log('║  Student XP — Kinetic Energy (Physics)           ║')
  console.log('║  Concept: phys.mech.kinetic-energy               ║')
  console.log('║  Account: suaibamr@gmail.com                     ║')
  console.log('╚══════════════════════════════════════════════════╝\n')

  const cookie = await login()
  console.log('✓ Logged in\n')

  const { sid, init } = await startLesson(cookie)
  console.log(`✓ Lesson: "${init.lessonTitle ?? CONCEPT}" (session ${sid.slice(0, 8)}…)`)

  if (init.text) {
    console.log('\n── T0 (lesson opening) ─────────────────────────────')
    console.log('🤖 Tutor:')
    const t = init.text.replace(/\n{3,}/g, '\n\n').trim()
    console.log(t.length > 1200 ? t.slice(0, 1200) + '\n[…truncated]' : t)
    if (init.visualSpec) {
      const vs = init.visualSpec
      console.log(`\n  🖼️  VISUAL: type=${vs.type ?? vs.kind ?? '?'} source=${vs.source ?? vs.provider ?? '?'}`)
      if (vs.title) console.log(`     title: ${vs.title}`)
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
  console.log('  END OF STUDENT SESSION')
  console.log('══════════════════════════════════════════════════════\n')
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
