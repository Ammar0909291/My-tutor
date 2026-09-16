/**
 * Deterministic Physics Verifier — Batch 4, the real observation window.
 *
 * Design: docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md §6 row 4.
 * §6.1 already recorded one incidental sample (7 sessions from an unrelated
 * live-verification run) and explicitly flagged it as NOT this campaign — no
 * turn in that sample was designed to elicit an equation assertion. This
 * script is the deliberate campaign: drive a disposable QA account through
 * several phys.mech.* lessons (all already bound in dimensionBindings.ts)
 * with turns that explicitly invite the model to write out a formula, so the
 * shadowed rule (Batch 3) is exercised by real generated prose. Read the
 * PHYSICS_DIM lines afterward via Vercel MCP — this script does not read
 * production logs itself.
 *
 *   npx tsx scripts/qa/physicsDimBatch4Drive.ts
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, describe, type LessonRef } from './liveSession'

interface CurriculumLesson {
  topicSlug: string
  lessonOrder: number
  lessonTitle: string
  unitTitle: string
}

// Phrasings chosen to make the model write a standalone equation line or use
// one of Gate C's whitelisted frames ("the formula is X = Y", "so X = Y",
// "X = Y tells us") — never a question about the formula, which Gate C's own
// question-mark override would exclude from assertion regardless.
const ELICITING_TURNS = [
  "what's the formula for net force?",
  'can you show me F=ma written out?',
  'walk me through a worked example with numbers',
  "what's the equation for momentum here?",
  'can you write the formula as an equation for me',
  'show me the equation, not just words',
  'ok so what does the formula actually look like',
  "what's the equation that connects these quantities?",
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

async function runConcept(cookie: string, lesson: CurriculumLesson, totalLessons: number, turnCount: number, log: string[]) {
  const sessionId = await createSession(cookie, 'physics')
  const ref: LessonRef = {
    lessonTitle: lesson.lessonTitle,
    lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle,
    totalLessons,
  }
  log.push(`\n=== ${lesson.topicSlug} (session ${sessionId}) ===`)
  const opening = await openLesson(cookie, sessionId, ref)
  log.push(describe('init', opening))
  for (let i = 0; i < turnCount; i += 1) {
    const msg = ELICITING_TURNS[i % ELICITING_TURNS.length]
    const r = await say(cookie, sessionId, msg)
    log.push(describe(`t${i + 1} "${msg}"`, r))
    await new Promise((res) => setTimeout(res, 300))
  }
}

async function main() {
  const acct = await createQaAccount('physverif-b4')
  console.log('QA account:', acct.email)
  const cookie = acct.cookie
  const log: string[] = []

  const cur = (await api(cookie, 'GET', '/api/curriculum?subject=physics')) as unknown as { lessons: CurriculumLesson[] }
  const bySlug = new Map(cur.lessons.map((l) => [l.topicSlug, l]))
  const totalLessons = cur.lessons.length

  const targets = [
    'phys.mech.newtons-second-law',
    'phys.mech.free-body-diagram',
    'phys.mech.momentum',
    'phys.mech.kinetic-energy',
  ]

  for (const t of targets) {
    const lesson = bySlug.get(t)
    if (!lesson) { console.error('MISSING curriculum lesson for', t); continue }
    try {
      await runConcept(cookie, lesson, totalLessons, 8, log)
    } catch (e) {
      log.push(`ERROR on ${t}: ${(e as Error).message}`)
      console.error('ERROR on', t, e)
    }
  }

  console.log(log.join('\n'))
  console.log('\nACCOUNT_EMAIL=' + acct.email)
  console.log('ACCOUNT_PASSWORD=' + acct.password)

  const del = await deleteQaAccount(acct)
  console.log('deleted:', del.deleted, 'reloginBlocked:', del.reloginBlocked)
}

main().catch((e) => { console.error(e); process.exit(1) })
