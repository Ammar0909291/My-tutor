/**
 * Real-learner QA driver for the English ADULT-band probe-contract Batch 6
 * (10 concepts: all core grammar, see englishAdultBandBatch6.ts).
 *
 * Same persona and technique as Batches 1-5's live-QA drivers. Deliberately
 * avoids re-using the exact T1 phrasing that triggered the tracked topic-drift
 * defect (docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md) since that finding
 * is already reported and tracked separately -- this run's job is validating
 * THIS batch's content and grading, not re-litigating the tracked bug.
 *
 * Also watches (but does not fix) the MCQ re-offer disambiguation false-
 * positive found in Groups 3-5's QA
 * (docs/architecture/ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md).
 *
 * Run: QA_PASSWORD=... npx tsx scripts/qa/englishAdultBandBatch6LiveQa.ts
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
    p.mcq.options.forEach((o: string, i: number) => console.log(`     ${i + 1}. ${o}`))
  }
  const visual = p.visualSpec ?? p.sceneSpec ?? p.visual
  console.log(`\n  VISUAL: ${visual ? `type=${visual.type ?? visual.kind ?? '?'}` : 'none'}`)
  console.log(`\n  [${label}] phase=${phase} check=${check} practice=${practice} verified=${verified} lessonComplete=${p.lessonComplete?.complete ?? false}`)
}

interface Turn { msg: string; pickCorrect?: boolean; pickWrong?: boolean }

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
    if (turns[i].pickCorrect && lastMcq) msg = pickOption(lastMcq, true)
    else if (turns[i].pickWrong && lastMcq) msg = pickOption(lastMcq, false)
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

  // Lesson A: eng.grammar.active-and-passive-voice -- nuanced (passive isn't
  // "bad writing," subject/object don't just swap), a genuinely difficult
  // concept for a weak learner.
  await runLesson(cookie, 'english', 'eng.grammar.active-and-passive-voice', [
    { msg: "hi, passive voice confuses me, please go slow" },
    { msg: "so its just swapping the subject and object around right?" },
    { msg: "i dont get why passive voice is used at all" },
    { msg: "can you explain it a different way" },
    { msg: "i dont know", pickWrong: true },
    { msg: "oh wait, i think i need to reconsider" },
    { msg: "ok trying again", pickCorrect: true },
    { msg: "thanks, that helped a lot" },
    { msg: "can you show me a diagram for this" },
    { msg: "alright, next question please", pickCorrect: true },
  ])

  // Lesson B: eng.grammar.subject-verb-agreement -- nuanced (nearest-noun
  // trap, collective nouns), classic ESL difficulty.
  await runLesson(cookie, 'english', 'eng.grammar.subject-verb-agreement', [
    { msg: "hi, subject verb agreement is hard for me" },
    { msg: "so the verb just matches whichever noun is closest right?" },
    { msg: "i dont understand collective nouns like team or committee" },
    { msg: "please explain it another way" },
    { msg: "i dont know", pickWrong: true },
    { msg: "hold on, let me think about that again" },
    { msg: "got it now", pickCorrect: true },
  ])

  console.log('\n' + '='.repeat(70))
  console.log('END OF QA RUN')
  console.log('='.repeat(70))
}

run().catch((e) => { console.error('Fatal:', e.message); process.exit(1) })
