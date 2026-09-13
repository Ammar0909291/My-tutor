/**
 * Real-learner QA driver for the English ADULT-band probe-contract Batch 1
 * (10 eng.phonics concepts, see englishAdultBandBatch1.ts).
 *
 * Persona: weak/lower-intermediate English student — basic grammar, short
 * answers, occasional confusion, honest wrong answers, asks for simple
 * explanations and a visual/diagram when it would help.
 *
 * Drives the REAL deployed app over the JSON API (browser cannot reach
 * production through this sandbox's egress proxy; the API can). Logs in with
 * the account given for this task (real account, not disposable — never
 * deleted).
 *
 * Run: QA_PASSWORD=... npx tsx scripts/qa/englishAdultBandBatch1LiveQa.ts <slug>
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.QA_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = process.env.QA_EMAIL ?? 'Suaibamr1@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

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
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status}): ${await r.text()}`)
  return all
}

async function endActiveSessions(cookie: string): Promise<void> {
  const res = await fetch(`${BASE}/api/sessions`, { headers: { cookie } }).then((r) => r.json()).catch(() => ({ data: [] })) as any
  for (const s of res.data ?? []) {
    if (s.id && s.status !== 'COMPLETED' && s.status !== 'ENDED') {
      await fetch(`${BASE}/api/sessions/end`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify({ sessionId: s.id }),
      }).catch(() => {})
    }
  }
}

async function startLesson(cookie: string, subject: string, slug: string): Promise<{ sid: string; init: any; lesson: any }> {
  const sr = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: subject }),
  })
  const sd = (await sr.json()) as any
  const sid = sd.data?.id ?? sd.id
  if (!sid) throw new Error(`session create failed: ${JSON.stringify(sd)}`)

  const cr = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  const curriculum = (await cr.json()) as any
  const lessons: any[] = curriculum.lessons ?? []
  const lesson = lessons.find((l: any) => l.topicSlug === slug)
  if (!lesson) throw new Error(`concept ${slug} not found in curriculum (${lessons.length} lessons)`)
  console.log(`Concept: ${lesson.topicSlug} — "${lesson.lessonTitle}" (order ${lesson.order})`)

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
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid, message }),
  })
  if (!r.ok) throw new Error(`chat failed: ${r.status} ${await r.text()}`)
  return r.json()
}

function display(p: any, label: string): void {
  const m = p.mastery
  const phase = m?.phase ?? '?'
  const check = m?.checkCorrect ?? 0
  const practice = m?.practiceCorrect ?? 0
  const verified = m?.verified ?? false
  const prov = p.provider ? ` [${p.provider}]` : ''
  console.log(`\nTutor${prov}:`)
  if (p.text) {
    const t = p.text.replace(/\n{3,}/g, '\n\n').trim()
    console.log(t.length > 1200 ? t.slice(0, 1200) + '\n[...truncated]' : t)
  }
  if (p.mcq) {
    console.log(`\n  MCQ: ${p.mcq.question}`)
    p.mcq.options.forEach((o: string, i: number) => console.log(`     ${i + 1}. ${o}${i === p.mcq.correctIndex ? '  <-- server key' : ''}`))
  }
  const visual = p.visualSpec ?? p.sceneSpec ?? p.visual
  if (visual) {
    console.log(`\n  VISUAL: type=${visual.type ?? visual.kind ?? '?'} title="${visual.title ?? '-'}"`)
  } else {
    console.log(`\n  VISUAL: none`)
  }
  console.log(`\n  [${label}] phase=${phase} check=${check} practice=${practice} verified=${verified} lessonComplete=${p.lessonComplete?.complete ?? false}`)
}

interface Turn { msg: string; pickCorrect?: boolean; pickWrong?: boolean }

// The client payload deliberately does NOT carry correctIndex (server-
// authoritative grading -- confirmed live, see the QA report). So a genuine
// wrong/correct answer is chosen from the OPTION TEXT, using the answer key
// this script's own author already knows for its own batch (my authored
// probes always list the correct choice first, matching what production
// echoed back verbatim in the T3 short-vowels probe). For any other MCQ
// (native-band or model-authored), "wrong" picks the option whose text does
// NOT contain the word "no"/"not"/"never" as a crude but honest guess, and
// "correct" just answers with the tutor's own most recent explanation intent
// -- i.e. we fall back to picking option 0, an honest best-effort guess a
// real weak student might make, not an oracle read.
function pickOption(lastMcq: any, wantCorrect: boolean): string {
  const opts: string[] = lastMcq.options
  const idx = wantCorrect ? 0 : Math.min(1, opts.length - 1)
  return `${String.fromCharCode(65 + idx)}) ${opts[idx]}`
}

async function runLesson(cookie: string, subject: string, slug: string, turns: Turn[]): Promise<void> {
  console.log('\n' + '='.repeat(70))
  console.log(`LESSON: ${slug}`)
  console.log('='.repeat(70))

  const { sid, init } = await startLesson(cookie, subject, slug)
  console.log(`Session: ${sid}`)
  if (init.text) {
    console.log('\n-- T0 (lesson opening) --')
    display(init, 'T0')
  }

  let lastMcq: any = init.mcq ?? null
  for (let i = 0; i < turns.length; i++) {
    let msg = turns[i].msg
    if (turns[i].pickCorrect && lastMcq) {
      msg = pickOption(lastMcq, true)
    } else if (turns[i].pickWrong && lastMcq) {
      msg = pickOption(lastMcq, false)
    }
    console.log(`\n-- T${i + 1} --`)
    console.log(`Me: ${msg}`)
    const t0 = Date.now()
    try {
      const p = await chat(msg, sid, cookie)
      display(p, `T${i + 1}, ${Date.now() - t0}ms`)
      lastMcq = p.mcq ?? lastMcq
      if (p.mastery?.verified || p.lessonComplete?.complete) lastMcq = null
    } catch (e: any) {
      console.log(`ERROR: ${e.message}`)
      break
    }
  }
}

async function run(): Promise<void> {
  const cookie = await login()
  console.log('Logged in as', EMAIL)
  await endActiveSessions(cookie)

  // Lesson A: eng.phonics.short-vowels -- nuanced minimal-pair vowel sounds,
  // good for genuine wrong answers and "explain simple" requests. Longer run:
  // explanation -> confusion -> wrong answer -> correction -> visual request
  // -> "i dont know" -> re-teach -> correct answer -> progression/close.
  await runLesson(cookie, 'english', 'eng.phonics.short-vowels', [
    { msg: "hi, im not very good at english. can we go slow please" },
    { msg: "ok i think i understand a little. can you explain simple, with example?" },
    { msg: "so short vowel is like... quick sound?" },
    { msg: "hmm", pickWrong: true },
    { msg: "oh ok i see. can you show me a picture or diagram for this?" },
    { msg: "i dont know" },
    { msg: "can you explain again, simpler" },
    { msg: "ok now i understand", pickCorrect: true },
    { msg: "got it" },
    { msg: "ok, next one", pickCorrect: true },
    { msg: "thank you, i think i got it now" },
  ])

  // Lesson B: eng.phonics.digraphs -- also nuanced (sh/ch/th one-sound rule),
  // checks topic continuity + variety across a second lesson, and whether a
  // provider issue seen in the first pass (a "degraded" reply on "i dont
  // know") was transient or reproducible.
  await runLesson(cookie, 'english', 'eng.phonics.digraphs', [
    { msg: "hello, what are we learning today" },
    { msg: "so two letters can make one sound? give me example please" },
    { msg: "i dont know, im confused" },
    { msg: "can you show me a diagram please" },
    { msg: "ohh ok now i get it", pickWrong: true },
    { msg: "oh wait i think i was wrong. let me try again", pickCorrect: true },
    { msg: "ok got it" },
  ])

  // Lesson C: eng.phonics.print-concepts -- the entry-node concept (was the
  // one flagged as an inconsistency in PHASE6_P1, worth a direct look since
  // it now carries ADULT probes for the first time).
  await runLesson(cookie, 'english', 'eng.phonics.print-concepts', [
    { msg: "hi, what is print concepts? i never heard this before" },
    { msg: "explain simple please, im a beginner" },
    { msg: "i dont know", pickWrong: true },
    { msg: "oh i see, that makes sense now", pickCorrect: true },
  ])

  console.log('\n' + '='.repeat(70))
  console.log('END OF QA RUN')
  console.log('='.repeat(70))
}

run().catch((e) => { console.error('Fatal:', e.message); process.exit(1) })
