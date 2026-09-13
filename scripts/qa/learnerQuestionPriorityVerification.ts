/**
 * MY TUTOR — FINAL ENGLISH ANSWER/QUESTION ALIGNMENT FIX — production verification.
 *
 * Two disposable-account runs against the deployed app:
 *   1. Start a fresh English lesson, ask a genuine concept-relevant question
 *      BEFORE answering the tutor's first assessment. Confirm the tutor
 *      answers the question (not just a lead-in) and does NOT attach an
 *      authored MCQ that turn. Then continue normally.
 *   2. A separate fresh lesson where the FIRST reply is an ordinary opening
 *      acknowledgement ("ok") — confirm normal opening/assessment flow is
 *      unaffected (no regression from this fix).
 *
 * Does NOT manufacture mastery. Reads and reports; account is created,
 * driven, then deleted and the deletion is proven (relogin blocked).
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

async function postJson(pathname: string, body: unknown, cookie: string) {
  const res = await fetch(`${BASE}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let json: any = null
  try { json = JSON.parse(text) } catch { /* non-JSON */ }
  return { status: res.status, json, text }
}

async function chat(cookie: string, sessionId: string, tag: string, message: string) {
  const { status, json } = await postJson('/api/learn/chat', { sessionId, message }, cookie)
  const j = json ?? {}
  const r = {
    tag,
    message,
    status,
    text: String(j.text ?? j.message ?? ''),
    provider: j.provider ?? null,
    mcq: j.mcq ? { question: j.mcq.question, options: j.mcq.options } : null,
    mastery: j.mastery ?? null,
  }
  console.log(`\n=== ${r.tag} (HTTP ${r.status}) ===`)
  console.log(`> learner: ${r.message}`)
  console.log(`  provider=${r.provider} mcq=${r.mcq ? `yes ("${r.mcq.question}")` : 'no'}`)
  if (r.mastery) console.log(`  mastery: phase=${r.mastery.phase} verified=${r.mastery.verified}`)
  console.log(`  reply: ${r.text.replace(/\s+/g, ' ').slice(0, 500)}`)
  return r
}

async function startEnglishLesson(cookie: string, preferSuffix = false) {
  const sr = await postJson('/api/sessions', { subjectSlug: 'english' }, cookie)
  const sessionId = sr.json?.data?.id ?? sr.json?.id
  if (!sessionId) throw new Error(`session create failed: ${JSON.stringify(sr.json)}`)
  const curRes = await fetch(`${BASE}/api/curriculum?subject=english`, { headers: { cookie } })
  const curriculum = await curRes.json() as any
  const lessons: any[] = curriculum.lessons ?? []
  let lesson = preferSuffix
    ? lessons.find((l) => /suffix/i.test(l.lessonTitle ?? '') || l.topicSlug?.startsWith('eng.morph.'))
    : null
  if (!lesson) lesson = lessons.find((l) => l.topicSlug?.startsWith('eng.gram.'))
  if (!lesson) lesson = lessons.find((l) => l.topicSlug?.startsWith('eng.'))
  if (!lesson) throw new Error('No English lesson found in curriculum response')
  console.log(`Selected lesson: ${lesson.topicSlug} — "${lesson.lessonTitle}" (order ${lesson.order}/${lessons.length})`)
  const init = await postJson('/api/learn/lesson-init', {
    sessionId, mode: 'restart',
    lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
    totalLessons: lessons.length, completedLessons: [],
    teachingLanguage: 'en',
  }, cookie)
  console.log(`\n=== lesson-init (HTTP ${init.status}) ===`)
  console.log(`  reply: ${String(init.json?.text ?? '').replace(/\s+/g, ' ').slice(0, 400)}`)
  return { sessionId, lesson }
}

async function runScenario1() {
  console.log('\n\n########## SCENARIO 1 — genuine question before any assessment ##########')
  const acct = await createQaAccount('q-priority-1')
  console.log(`Created disposable account: ${acct.email}`)
  let deletedOk = false
  try {
    const { sessionId } = await startEnglishLesson(acct.cookie, true)

    // A genuine, concept-relevant question, asked BEFORE answering anything.
    const r1 = await chat(acct.cookie, sessionId, 'Q1-genuine-question',
      'Is this sentence correct: "The box of chocolates are on the table"?')

    // Continue normally afterward.
    const r2 = await chat(acct.cookie, sessionId, 'Q2-continue', 'Ok, that makes sense, thanks.')
    const r3 = await chat(acct.cookie, sessionId, 'Q3-continue', 'Can you give me a question to check I understand?')

    console.log('\n--- SCENARIO 1 ANALYSIS ---')
    const answeredTheQuestion = r1.text.length > 40 && !/^quick check\b/i.test(r1.text.trim())
    console.log(`Turn 1 attached an authored probe (should be NO): ${r1.mcq ? 'YES' : 'no'}`)
    console.log(`Turn 1 provider (deterministic gate = "gate"): ${r1.provider}`)
    console.log(`Turn 1 looks like a real answer, not just a lead-in: ${answeredTheQuestion}`)
    console.log(`Session continued normally on turns 2-3: HTTP ${r2.status}/${r3.status}`)
  } finally {
    const del = await deleteQaAccount(acct)
    deletedOk = del.deleted && del.reloginBlocked
    console.log(`\nAccount cleanup (scenario 1): deleted=${del.deleted} reloginBlocked=${del.reloginBlocked}`)
  }
  return deletedOk
}

async function runScenario2() {
  console.log('\n\n########## SCENARIO 2 — ordinary opening acknowledgement (no regression) ##########')
  const acct = await createQaAccount('q-priority-2')
  console.log(`Created disposable account: ${acct.email}`)
  let deletedOk = false
  try {
    const { sessionId } = await startEnglishLesson(acct.cookie, false)
    const r1 = await chat(acct.cookie, sessionId, 'A1-ack', 'ok')
    const r2 = await chat(acct.cookie, sessionId, 'A2-ready', "yes, I'm ready")
    const r3 = await chat(acct.cookie, sessionId, 'A3-answer', 'The correct answer is the first option.')
    console.log('\n--- SCENARIO 2 ANALYSIS ---')
    console.log(`All three turns completed normally: HTTP ${r1.status}/${r2.status}/${r3.status}`)
    console.log(`Any authored probe attached across the 3 turns: ${[r1, r2, r3].some((r) => r.mcq) ? 'yes' : 'NO'}`)
  } finally {
    const del = await deleteQaAccount(acct)
    deletedOk = del.deleted && del.reloginBlocked
    console.log(`\nAccount cleanup (scenario 2): deleted=${del.deleted} reloginBlocked=${del.reloginBlocked}`)
  }
  return deletedOk
}

async function main() {
  console.log(`Base: ${BASE}`)
  const ok1 = await runScenario1()
  const ok2 = await runScenario2()
  if (!ok1 || !ok2) {
    console.error('WARNING: disposable account cleanup could not be fully confirmed for one or both scenarios.')
    process.exitCode = 1
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
