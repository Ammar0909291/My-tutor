/**
 * PHASE B — the CROSS-LESSON leak, isolated to the IDENTITY guard alone.
 *
 * WHY A SECOND SCRIPT. The first run switched onto a lesson whose attempt was
 * COMPLETED, so `D0a-LESSON-ALREADY-COMPLETE` served the close deterministically
 * and the turn never reached the grading path. The result looked like a pass and
 * proved nothing — the same class of harness self-deception this project has
 * been burnt by four times.
 *
 * This run picks the two lessons deliberately, from the account's real attempt
 * table:
 *
 *   LESSON A  no attempt row at all -> lesson-init opens one (first-start)
 *   LESSON B  an IN_PROGRESS attempt already -> lesson-init opens NOTHING, so
 *             `attemptIsFreshStart` is false and the per-attempt reset does NOT
 *             fire. The stale pendingMcq therefore SURVIVES into lesson B, and
 *             the only thing standing between it and the learner's first
 *             message is `readPendingQuestion`'s lesson-key check.
 *
 * That is the isolation: if the guard is wrong, this run grades. Nothing else
 * is protecting the turn.
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'
import { BASE } from './liveAccount'
import { post, say, describe as describeTurn, type TurnPayload, type LessonRef } from './liveSession'

const EMAIL = process.env.QA_EMAIL ?? ''
const PASSWORD = process.env.QA_PASSWORD ?? ''
const SUBJECT = process.env.QA_SUBJECT ?? 'physics'
const ORDER_A = Number(process.env.QA_LESSON_A ?? '150')
const ORDER_B = Number(process.env.QA_LESSON_B ?? '12')

async function login(): Promise<string> {
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  const body = (await csrfRes.json()) as { csrfToken: string }
  const jar = mergeCookies(csrfRes.headers.getSetCookie?.() ?? [])
  const csrfToken = csrfTokenFromJar(jar) ?? body.csrfToken
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), res.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${res.status})`)
  return all
}

async function curriculum(cookie: string): Promise<LessonRef[]> {
  const res = await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })
  const body = await res.json() as any
  const lessons = body.lessons ?? body.data?.lessons ?? []
  return lessons.map((l: any) => ({
    lessonTitle: l.lessonTitle ?? l.title, lessonOrder: l.order,
    topicSlug: l.topicSlug ?? l.slug, unitTitle: l.unitTitle ?? '', totalLessons: lessons.length,
  }))
}

function open(cookie: string, sessionId: string, lesson: LessonRef, mode: string) {
  return post('/api/learn/lesson-init', {
    sessionId, mode, lessonTitle: lesson.lessonTitle, lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
    totalLessons: lesson.totalLessons, completedLessons: [], teachingLanguage: 'en',
  }, cookie)
}

async function main() {
  const cookie = await login()
  const lessons = await curriculum(cookie)
  const A = lessons.find((l) => l.lessonOrder === ORDER_A)
  const B = lessons.find((l) => l.lessonOrder === ORDER_B)
  if (!A || !B) throw new Error(`lessons ${ORDER_A}/${ORDER_B} not found`)

  const sres = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT }),
  })
  const sbody = await sres.json() as any
  const sessionId = sbody.data?.id ?? sbody.id

  console.log(`SESSION ${sessionId}`)
  console.log(`A order=${A.lessonOrder} ${A.topicSlug} "${A.lessonTitle}"`)
  console.log(`B order=${B.lessonOrder} ${B.topicSlug} "${B.lessonTitle}"`)

  console.log('\n═══ LESSON A ═══')
  console.log(describeTurn('A:open', await open(cookie, sessionId, A, 'restart')))
  let pending: TurnPayload['mcq'] = null
  for (const p of ['ok', 'yes I follow', 'quiz me on this', 'ready', 'ask me a question', 'test me']) {
    const t = await say(cookie, sessionId, p)
    console.log(describeTurn(`A:"${p}"`, t))
    if (t.mcq) { pending = t.mcq; break }
  }
  if (!pending) { console.log('\n!! no MCQ in lesson A — case not exercised'); return }
  const answer = pending.options[pending.correctIndex]
  console.log(`\nPENDING IN A: ${pending.question.slice(0, 100)}`)
  console.log(`CORRECT OPTION (about to be typed in lesson B): "${answer}"`)
  console.log(`\n>>> READ NOW: select "contextSnapshot"->'pendingMcq'->>'lessonKey' from learn_sessions where id='${sessionId}';`)

  console.log('\n═══ LESSON B (no attempt opened -> no reset -> identity guard alone) ═══')
  console.log(describeTurn('B:open', await open(cookie, sessionId, B, 'next')))
  console.log(`\n>>> READ NOW (pendingMcq must STILL be lesson A's): same query as above`)

  const bTurn = await say(cookie, sessionId, answer)
  console.log(describeTurn(`B:"${answer.slice(0, 50)}…"`, bTurn))
  console.log(`\nB MASTERY: ${JSON.stringify(bTurn.mastery)}`)
  console.log(`\nSESSION: ${sessionId}`)
}

main().catch((e) => { console.error('FAILED:', e?.message ?? e); process.exit(1) })
