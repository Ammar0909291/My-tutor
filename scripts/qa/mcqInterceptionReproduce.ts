/**
 * Prompt D — reproduce the "can you explain simply" -> grading-shaped-text
 * anomaly found incidentally during the PCD-015/016/017/021 re-measurement
 * (docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md, commit 69649a3's own
 * report): on chem.kinet.rate-law, the turn after an MCQ attached returned
 * "...So the correct choice is A." instead of a restated explanation.
 *
 * Drives chem.kinet.rate-law with the SAME turn sequence that originally
 * produced it, to see whether it reproduces against the now-deployed fix
 * (69649a3), which changes what "can you explain simply" resolves to.
 *
 *   npx tsx scripts/qa/mcqInterceptionReproduce.ts
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe, type LessonRef } from './liveSession'

interface CurriculumLesson {
  topicSlug: string
  lessonOrder: number
  lessonTitle: string
  unitTitle: string
}

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie } : { cookie },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return r.json()
}

async function main() {
  const acct = await createQaAccount('mcqintercept')
  console.log('QA account:', acct.email)
  const cookie = acct.cookie
  const log: string[] = []

  const cur = (await api(cookie, 'GET', '/api/curriculum?subject=chemistry')) as unknown as { lessons: CurriculumLesson[] }
  const bySlug = new Map(cur.lessons.map((l) => [l.topicSlug, l]))
  const lesson = bySlug.get('chem.kinet.rate-law')
  if (!lesson) throw new Error('MISSING chem.kinet.rate-law')

  const sessionId = await createSession(cookie, 'chemistry')
  const ref: LessonRef = {
    lessonTitle: lesson.lessonTitle,
    lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle,
    totalLessons: bySlug.size,
  }
  log.push(`=== chem.kinet.rate-law (session ${sessionId}) ===`)
  const opening = await openLesson(cookie, sessionId, ref)
  log.push(describe('init', opening))

  // The exact original sequence: t0 "ok, go on", t1 "explain it differently",
  // t2 "in other words?" (this attached the pending MCQ last time),
  // t3 "can you explain simply" (this is where the anomaly appeared).
  const turns = ['ok, go on', 'explain it differently', 'in other words?', 'can you explain simply']
  const responses: Array<{ msg: string; text: string; mcq: unknown }> = []
  for (let i = 0; i < turns.length; i += 1) {
    const msg = turns[i]
    const r = await say(cookie, sessionId, msg)
    log.push(describe(`t${i} "${msg}"`, r))
    log.push(`    FULL TEXT: ${r.text ?? ''}`)
    log.push(`    MCQ: ${JSON.stringify(r.mcq)}`)
    responses.push({ msg, text: r.text ?? '', mcq: r.mcq ?? null })
    await new Promise((res) => setTimeout(res, 300))
  }

  // Repeat the exact scenario a second time in a fresh session, to see if
  // it's deterministic or a one-off model artifact.
  const sessionId2 = await createSession(cookie, 'chemistry')
  log.push(`\n=== chem.kinet.rate-law RUN 2 (session ${sessionId2}) ===`)
  const opening2 = await openLesson(cookie, sessionId2, ref)
  log.push(describe('init', opening2))
  for (let i = 0; i < turns.length; i += 1) {
    const msg = turns[i]
    const r = await say(cookie, sessionId2, msg)
    log.push(describe(`t${i} "${msg}"`, r))
    log.push(`    FULL TEXT: ${r.text ?? ''}`)
    log.push(`    MCQ: ${JSON.stringify(r.mcq)}`)
    await new Promise((res) => setTimeout(res, 300))
  }

  console.log(log.join('\n'))
  console.log('\nACCOUNT_EMAIL=' + acct.email)
  console.log('ACCOUNT_PASSWORD=' + acct.password)

  const del = await deleteQaAccount(acct)
  console.log('deleted:', del.deleted, 'reloginBlocked:', del.reloginBlocked)
}

main().catch((e) => { console.error(e); process.exit(1) })
