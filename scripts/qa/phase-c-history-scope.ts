/**
 * PHASE C — LIVE VERIFICATION.
 *
 * Two things must be true at once, and a fix that gets only the first is worse
 * than no fix:
 *
 *   THE LEAK      lesson B's prompt must not contain lesson A's turns, so the
 *                 tutor cannot answer from a question the learner cannot see.
 *   CONTINUITY    lesson B's prompt must still contain lesson B's OWN turns,
 *                 so "say that again more simply" still works. Scoping that
 *                 empties the window would pass the leak test and destroy the
 *                 product.
 *
 * The pre-fix baseline is recorded and exact. On 2026-08-25, deployment
 * dpl_C2dQAub, this same sequence produced:
 *
 *   tutor: "Correct! 230 volts is the RMS value for a 325-volt peak sine wave."
 *
 * in a KINEMATICS lesson. This script re-runs it and reads the reply for lesson
 * A's vocabulary, then immediately probes continuity in the same lesson.
 *
 * It reports; it does not decide. Read the captured turn before believing a
 * verdict — four harnesses in this repo have condemned the product for their
 * own blind spot.
 *
 *   QA_EMAIL=... QA_PASSWORD=... npx tsx scripts/qa/phase-c-history-scope.ts
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

/** Words that belong to lesson A and to nothing in lesson B. Derived from the
 *  pending question's own text rather than hardcoded, so the check follows
 *  whatever lesson A actually taught. */
function foreignVocabulary(question: string, options: string[]): string[] {
  const STOP = new Set([
    'what', 'which', 'the', 'of', 'a', 'an', 'is', 'are', 'to', 'in', 'its', 'it',
    'if', 'and', 'or', 'that', 'this', 'you', 'your', 'for', 'with', 'by', 'on',
    'happens', 'when', 'does', 'do', 'how', 'why', 'true', 'following', 'about',
    'value', 'values', 'one', 'two', 'its', 'be', 'as', 'at', 'from', 'has',
  ])
  return [...new Set(
    `${question} ${options.join(' ')}`
      .toLowerCase()
      .replace(/[^a-z0-9\s.-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOP.has(w)),
  )]
}

const line = (s: string) => console.log(s)

async function main() {
  const cookie = await login()
  const lessons = await curriculum(cookie)
  const A = lessons.find((l) => l.lessonOrder === ORDER_A)!
  const B = lessons.find((l) => l.lessonOrder === ORDER_B)!

  const sres = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT }),
  })
  const sessionId = (await sres.json() as any).data?.id ?? (await Promise.resolve(null))
  line(`SESSION ${sessionId}`)
  line(`A ${A.topicSlug} "${A.lessonTitle}"`)
  line(`B ${B.topicSlug} "${B.lessonTitle}"`)

  // ── lesson A: leave a question pending ──────────────────────────────────
  line('\n═══ LESSON A ═══')
  line(describeTurn('A:open', await open(cookie, sessionId, A, 'restart')))
  let pending: TurnPayload['mcq'] = null
  for (const p of ['ok', 'yes I follow', 'quiz me on this', 'ready', 'ask me a question']) {
    const t = await say(cookie, sessionId, p)
    line(describeTurn(`A:"${p}"`, t))
    if (t.mcq) { pending = t.mcq; break }
  }
  if (!pending) { line('\n!! no MCQ in lesson A — case not exercised this run'); return }
  const answer = pending.options[pending.correctIndex]
  const foreign = foreignVocabulary(pending.question, pending.options)
  line(`\nPENDING IN A: ${pending.question}`)
  line(`ANSWER TO BE TYPED IN B: "${answer}"`)
  line(`LESSON-A VOCABULARY TO WATCH FOR: ${foreign.slice(0, 14).join(', ')}`)

  // ── THE LEAK TEST ───────────────────────────────────────────────────────
  line('\n═══ LESSON B — the leak test ═══')
  line(describeTurn('B:open', await open(cookie, sessionId, B, 'next')))
  const bTurn = await say(cookie, sessionId, answer)
  line(describeTurn(`B:"${answer.slice(0, 45)}…"`, bTurn))

  const reply = (bTurn.text ?? '').toLowerCase()
  const hits = foreign.filter((w) => reply.includes(w))
  line('\n── LEAK RESULT ──')
  line(`  lesson-A words appearing in lesson B's reply: ${hits.length ? hits.join(', ') : 'NONE'}`)
  line(`  mastery: ${JSON.stringify(bTurn.mastery)}`)
  line(hits.length === 0
    ? '  PASS — the tutor did not answer from lesson A.'
    : `  ATTENTION — ${hits.length} lesson-A word(s) present. Read the turn above.`)

  // ── THE CONTINUITY NEGATIVE CONTROL ─────────────────────────────────────
  // Same lesson, immediately after. The tutor must still be able to refer to
  // its OWN previous turn. If scoping emptied the window this fails.
  line('\n═══ LESSON B — continuity negative control ═══')
  const follow = await say(cookie, sessionId, 'can you say that again in simpler words?')
  line(describeTurn('B:"say that again simpler"', follow))
  const followText = (follow.text ?? '')
  line('\n── CONTINUITY RESULT ──')
  line(`  reply length: ${followText.length} chars`)
  line(/i (do not|don'?t) (have|see|recall)|nothing to repeat|no previous|start (a |the )?lesson/i.test(followText)
    ? '  ATTENTION — the tutor appears to have lost its own previous turn.'
    : '  PASS — the tutor still has lesson B\'s own history.')

  line(`\nSESSION: ${sessionId}`)
}

main().catch((e) => { console.error('FAILED:', e?.message ?? e); process.exit(1) })
