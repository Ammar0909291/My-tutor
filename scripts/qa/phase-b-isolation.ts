/**
 * PHASE B — LIVE VERIFICATION AGAINST THE DEPLOYED APP.
 *
 * Drives a REAL lesson sequence through the real HTTP endpoints and prints an
 * honest transcript plus the session ids needed to read `contextSnapshot`
 * directly out of production. It ASSERTS very little on purpose: four separate
 * harnesses in this repository have condemned the product for their own blind
 * spot, and the fix for that was to read the captured turn before believing a
 * verdict. The server-side proof — what `pendingMcq` actually holds, and whose
 * lesson it names — is read from the database, not inferred from prose.
 *
 * ACCOUNT. `liveAccount.ts` refuses `suaibamr@gmail.com` by construction and
 * that guard is deliberately NOT relaxed: it is the right default. This script
 * takes credentials from the environment instead, so using the real account is
 * an explicit act at the call site rather than a weakened shared helper.
 *
 *   QA_EMAIL=... QA_PASSWORD=... npx tsx scripts/qa/phase-b-isolation.ts
 *
 * It acts as a real student throughout: it opens lessons, answers questions,
 * restarts, and resumes. It writes nothing a learner could not write.
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'
import { BASE } from './liveAccount'
import { post, say, describe as describeTurn, type TurnPayload, type LessonRef } from './liveSession'

const EMAIL = process.env.QA_EMAIL ?? ''
const PASSWORD = process.env.QA_PASSWORD ?? ''
const SUBJECT = process.env.QA_SUBJECT ?? 'physics'

async function login(): Promise<string> {
  if (!EMAIL || !PASSWORD) throw new Error('set QA_EMAIL and QA_PASSWORD')
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  const body = (await csrfRes.json()) as { csrfToken: string }
  const jar = mergeCookies(csrfRes.headers.getSetCookie?.() ?? [])
  const csrfToken = csrfTokenFromJar(jar) ?? body.csrfToken
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), res.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (status ${res.status})`)
  return all
}

async function curriculum(cookie: string): Promise<LessonRef[]> {
  const res = await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })
  if (!res.ok) throw new Error(`/api/curriculum -> ${res.status}`)
  const body = await res.json() as { lessons?: any[]; data?: { lessons?: any[] } }
  const lessons = body.lessons ?? body.data?.lessons ?? []
  return lessons.map((l: any) => ({
    lessonTitle: l.lessonTitle ?? l.title,
    lessonOrder: l.order,
    topicSlug: l.topicSlug ?? l.slug,
    unitTitle: l.unitTitle ?? '',
    totalLessons: lessons.length,
  }))
}

async function newSession(cookie: string): Promise<string> {
  const res = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT }),
  })
  const body = await res.json() as { data?: { id?: string }; id?: string }
  const id = body.data?.id ?? body.id
  if (!id) throw new Error(`no session id: ${JSON.stringify(body).slice(0, 300)}`)
  return id
}

function open(cookie: string, sessionId: string, lesson: LessonRef, mode: 'restart' | 'next' | 'resume' | 'review') {
  return post('/api/learn/lesson-init', {
    sessionId, mode,
    lessonTitle: lesson.lessonTitle,
    lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle,
    totalLessons: lesson.totalLessons,
    completedLessons: [],
    teachingLanguage: 'en',
  }, cookie)
}

const line = (s: string) => console.log(s)

async function main() {
  const cookie = await login()
  line(`logged in as ${EMAIL}`)

  const lessons = await curriculum(cookie)
  if (lessons.length < 2) throw new Error(`need 2 lessons, got ${lessons.length}`)
  const A = lessons[0]
  const B = lessons[1]
  const sessionId = await newSession(cookie)

  line(`\nSESSION ${sessionId}`)
  line(`LESSON A  order=${A.lessonOrder} slug=${A.topicSlug} "${A.lessonTitle}"`)
  line(`LESSON B  order=${B.lessonOrder} slug=${B.topicSlug} "${B.lessonTitle}"`)
  line(`\n-- read the snapshot at any point with:`)
  line(`   select "contextSnapshot"->'pendingMcq' from learn_sessions where id = '${sessionId}';`)

  // ── PHASE 1: get a question pending in lesson A ────────────────────────────
  line('\n═══ LESSON A — create a pending question ═══')
  line(describeTurn('A:open', await open(cookie, sessionId, A, 'restart')))

  let pending: TurnPayload['mcq'] = null
  const prompts = ['ok', 'yes I follow', 'can you quiz me on this?', 'ready', 'ask me a question']
  for (const p of prompts) {
    const t = await say(cookie, sessionId, p)
    line(describeTurn(`A:"${p}"`, t))
    if (t.mcq) { pending = t.mcq; break }
  }
  if (!pending) {
    line('\n!! NO MCQ was produced in lesson A — the cross-lesson case cannot be')
    line('   exercised on this run. Reported, not worked around.')
    return
  }
  line(`\nPENDING IN A: "${pending.question.slice(0, 90)}"`)
  line(`   options: ${JSON.stringify(pending.options)}  correct=${pending.correctIndex}`)
  const correctText = pending.options[pending.correctIndex]

  // ── PHASE 2: switch to lesson B and answer A's question there ──────────────
  line('\n═══ LESSON B — the leak, exercised ═══')
  line(describeTurn('B:open', await open(cookie, sessionId, B, 'next')))

  // The learner's FIRST message in lesson B is, verbatim, the correct answer
  // to lesson A's question. Before Phase B this graded and banked evidence for
  // concept B. It must now do nothing at all.
  const bTurn = await say(cookie, sessionId, correctText)
  line(describeTurn(`B:"${correctText}"`, bTurn))
  line(`\nB mastery after that turn: ${JSON.stringify(bTurn.mastery)}`)

  // ── PHASE 3: restart lesson A ──────────────────────────────────────────────
  line('\n═══ LESSON A — restart, must be a fresh attempt ═══')
  line(describeTurn('A:restart', await open(cookie, sessionId, A, 'restart')))
  const afterRestart = await say(cookie, sessionId, 'hello')
  line(describeTurn('A:"hello"', afterRestart))
  line(`\nA mastery after restart turn 1: ${JSON.stringify(afterRestart.mastery)}`)

  // ── PHASE 4: resume must keep what it earned ───────────────────────────────
  line('\n═══ LESSON A — resume must NOT destroy legitimate state ═══')
  let resumePending: TurnPayload['mcq'] = null
  for (const p of ['ok', 'ready', 'quiz me', 'ask me something']) {
    const t = await say(cookie, sessionId, p)
    line(describeTurn(`A2:"${p}"`, t))
    if (t.mcq) { resumePending = t.mcq; break }
  }
  if (!resumePending) {
    line('\n!! no MCQ before the resume — resume case not exercised this run.')
    return
  }
  line(`\nPENDING BEFORE RESUME: "${resumePending.question.slice(0, 80)}"`)
  line(describeTurn('A:resume', await open(cookie, sessionId, A, 'resume')))
  const answered = await say(cookie, sessionId, resumePending.options[resumePending.correctIndex])
  line(describeTurn('A:answer-after-resume', answered))
  line(`\nA mastery after answering across the resume: ${JSON.stringify(answered.mastery)}`)

  line(`\n\nSESSION ID FOR SNAPSHOT READS: ${sessionId}`)
}

main().catch((e) => { console.error('\nFAILED:', e?.message ?? e); process.exit(1) })
