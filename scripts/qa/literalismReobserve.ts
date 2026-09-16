/**
 * PCD-015/016/017/021 re-measurement — is the Principle 13 advisory prompt
 * fix ("TAKE THE REQUEST, NEVER THE WORDS", src/lib/ai/client.ts) actually
 * being followed?
 *
 * Design: docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md's PCD-015/016/
 * 017/021 entry — explicitly flagged as a MONITORING candidate needing a
 * fresh audit re-measurement before any runtime-enforced repair is
 * considered. This script IS that re-measurement: it does not fix anything.
 *
 * Drives a disposable QA account through 2 physics, 2 chemistry, 2 English
 * concepts. For each concept: opens the lesson, then sends every one of the
 * five trigger phrases the instruction itself names, verbatim:
 *   "explain it differently", "in other words", "explain simply",
 *   "teach me from the start", "teach me from the beginning"
 * capturing the full transcript for manual classification against the
 * three failure modes PCD-015/016/017 name: (a) explaining the phrase's
 * own meaning literally, (b) abandoning the concept for topic selection,
 * (c) regressing into an unrelated deeper prerequisite — plus PCD-016's
 * off-domain generic-analogy substitution.
 *
 *   npx tsx scripts/qa/literalismReobserve.ts
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe, type LessonRef } from './liveSession'

interface CurriculumLesson {
  topicSlug: string
  lessonOrder: number
  lessonTitle: string
  unitTitle: string
}

const TRIGGER_PHRASES = [
  'explain it differently',
  'in other words?',
  'can you explain simply',
  'teach me from the start',
  'teach me from the beginning',
]

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie } : { cookie },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return r.json()
}

async function runConcept(cookie: string, subject: string, lesson: CurriculumLesson, totalLessons: number, log: string[]) {
  const sessionId = await createSession(cookie, subject)
  const ref: LessonRef = {
    lessonTitle: lesson.lessonTitle,
    lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle,
    totalLessons,
  }
  log.push(`\n=== ${subject}/${lesson.topicSlug} (session ${sessionId}) ===`)
  const opening = await openLesson(cookie, sessionId, ref)
  log.push(describe('init', opening))
  // One ordinary turn first, so there is a real anchored concept on screen
  // before the trigger phrases arrive — matching a real learner's flow.
  const first = await say(cookie, sessionId, 'ok, go on')
  log.push(describe('t0 "ok, go on"', first))
  await new Promise((res) => setTimeout(res, 300))
  for (let i = 0; i < TRIGGER_PHRASES.length; i += 1) {
    const msg = TRIGGER_PHRASES[i]
    const r = await say(cookie, sessionId, msg)
    log.push(describe(`t${i + 1} "${msg}"`, r))
    await new Promise((res) => setTimeout(res, 300))
  }
}

async function main() {
  const acct = await createQaAccount('literalism')
  console.log('QA account:', acct.email)
  const cookie = acct.cookie
  const log: string[] = []

  const targets: Array<{ subject: string; slug: string }> = [
    { subject: 'physics', slug: 'phys.mech.newtons-second-law' },
    { subject: 'physics', slug: 'phys.mech.momentum' },
    { subject: 'chemistry', slug: 'chem.bond.resonance' },
    { subject: 'chemistry', slug: 'chem.kinet.rate-law' },
    { subject: 'english', slug: 'eng.grammar.verbs' },
    { subject: 'english', slug: 'eng.grammar.nouns' },
  ]

  const bySubject = new Map<string, Map<string, CurriculumLesson>>()
  for (const subject of new Set(targets.map((t) => t.subject))) {
    const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${subject}`)) as unknown as { lessons: CurriculumLesson[] }
    bySubject.set(subject, new Map(cur.lessons.map((l) => [l.topicSlug, l])))
  }

  for (const t of targets) {
    const bySlug = bySubject.get(t.subject)!
    const lesson = bySlug.get(t.slug)
    if (!lesson) { console.error('MISSING curriculum lesson for', t.subject, t.slug); continue }
    try {
      await runConcept(cookie, t.subject, lesson, bySlug.size, log)
    } catch (e) {
      log.push(`ERROR on ${t.subject}/${t.slug}: ${(e as Error).message}`)
      console.error('ERROR on', t.subject, t.slug, e)
    }
  }

  console.log(log.join('\n'))
  console.log('\nACCOUNT_EMAIL=' + acct.email)
  console.log('ACCOUNT_PASSWORD=' + acct.password)

  const del = await deleteQaAccount(acct)
  console.log('deleted:', del.deleted, 'reloginBlocked:', del.reloginBlocked)
}

main().catch((e) => { console.error(e); process.exit(1) })
