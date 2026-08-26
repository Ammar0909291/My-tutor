/**
 * PHASE D — FULL LEARNING LOOP VERIFICATION, as a genuinely weak learner.
 *
 * The question is NOT "does each component work". Phases A-C proved components.
 * The question is whether a real, struggling student can start a hard lesson and
 * FINISH it:
 *
 *   OBSERVE -> DEMONSTRATE -> GUIDE -> authored assessment -> grading
 *           -> mastery -> COMPLETE
 *
 * THE LEARNER THIS DRIVES. Below-intermediate English, limited prior knowledge,
 * nervous, asks small confused questions, paraphrases instead of quoting, gets
 * one thing wrong before getting it right, and asks for practice in their own
 * words. Every reply below is written the way that student actually types —
 * lowercase, missing articles, "sir", hedges. That is the point: a grader that
 * only accepts clean answers passes a component test and fails this one.
 *
 * IT REPORTS; IT DOES NOT DECIDE. Every turn is printed with the server-side
 * counters beside it, so a verdict can always be checked against what was
 * actually said. Five harnesses in this repository have delivered a wrong
 * verdict about working code; the rule learned from them is to read the turn.
 *
 * OBSERVATION ONLY on first run — no production code is changed to make this
 * pass. If the loop fails, the failure is the finding.
 *
 *   QA_EMAIL=... QA_PASSWORD=... npx tsx scripts/qa/phase-d-learning-loop.ts
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'
import { BASE } from './liveAccount'
import { post, say, type TurnPayload, type LessonRef } from './liveSession'

const EMAIL = process.env.QA_EMAIL ?? ''
const PASSWORD = process.env.QA_PASSWORD ?? ''
const MAX_TURNS = Number(process.env.QA_MAX_TURNS ?? '22')

/**
 * Drawn at random from difficult + visually teachable pools.
 *
 * QA_TARGETS overrides, so re-verification after a fix runs on concepts the fix
 * was NOT derived from — the reproduction set must never be the proof set.
 *   seed 20260825 (reproduction): orbital-mechanics, quantum-tunneling,
 *                                 metallic-bonding, hybridization
 *   seed 20260826 (verification): wave-function, spin, covalent-bonding,
 *                                 ionic-bonding
 */
const DEFAULT_TARGETS: Array<{ subject: string; concept: string }> = [
  { subject: 'physics',   concept: 'phys.mech.orbital-mechanics' },
  { subject: 'physics',   concept: 'phys.qm.quantum-tunneling' },
  { subject: 'chemistry', concept: 'chem.bond.metallic-bonding' },
  { subject: 'chemistry', concept: 'chem.bond.hybridization' },
]
const TARGETS = process.env.QA_TARGETS
  ? process.env.QA_TARGETS.split(',').map((c) => ({
      subject: c.trim().startsWith('phys.') ? 'physics' : 'chemistry',
      concept: c.trim(),
    }))
  : DEFAULT_TARGETS

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

async function curriculum(cookie: string, subject: string): Promise<LessonRef[]> {
  const res = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  const body = await res.json() as any
  const lessons = body.lessons ?? body.data?.lessons ?? []
  return lessons.map((l: any) => ({
    lessonTitle: l.lessonTitle ?? l.title, lessonOrder: l.order,
    topicSlug: l.topicSlug ?? l.slug, unitTitle: l.unitTitle ?? '', totalLessons: lessons.length,
  }))
}

async function newSession(cookie: string, subject: string): Promise<string> {
  const r = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: subject }),
  })
  const b = await r.json() as any
  return b.data?.id ?? b.id
}

const open = (cookie: string, sessionId: string, l: LessonRef, mode: string) =>
  post('/api/learn/lesson-init', {
    sessionId, mode, lessonTitle: l.lessonTitle, lessonOrder: l.lessonOrder,
    topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: l.totalLessons,
    completedLessons: [], teachingLanguage: 'en',
  }, cookie)

// ── the weak learner's voice ────────────────────────────────────────────────
//
// Confused, small, hedged, imperfect. Cycled so the tutor never sees the same
// filler twice in a row (which would look like a stuck client, not a student).
const CONFUSED = [
  'sir i not understand this',
  'ok but why it happen like that',
  'sorry sir can you say more simple',
  'hmm i think i get little bit',
  'can you show picture please',
  'ok sir',
  'i am bit confused sir',
  'please explain one more time simple words',
]
const PRACTICE = [
  'sir can you give me one question to try',
  'i want practice please',
  'give me one more question sir',
]

/**
 * How a weak learner writes their answer.
 *
 * REWRITTEN AFTER THE PHASE E RUN, because the first version was producing
 * input no human would ever send and was therefore measuring nothing. It did
 * `text.replace(/[^\w\s]/g,' ').split(/\s+/).slice(0,4)`, which destroys any
 * option containing mathematics:
 *
 *      "v = ωr"   ->  "i think it is v 2 r"
 *      "2.0"      ->  "maybe 2 0"
 *      "MgO's ions carry a higher charge"  ->  "maybe mgo s ions carry a"
 *
 * Half the served assessments in that run went ungraded, and I could not tell
 * whether that was a real grading gap or my own generator — which makes the
 * measurement worthless either way. Six harnesses in this repository have now
 * been on the verge of condemning working code; the instrument gets fixed
 * before the product is judged.
 *
 * The four forms below are what a struggling student actually types, and every
 * one of them is something the grader could in principle read:
 *   - the bare letter, with the punctuation they habitually add
 *   - "sir i think B"
 *   - the option ECHOED off the screen, verbatim and unmangled, which is the
 *     commonest thing a weak reader does
 *   - a short lead-in plus that echo
 *
 * `echo()` truncates on a WORD boundary and never strips characters, so
 * notation survives intact.
 */
function echoOption(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/)
  const kept = words.slice(0, maxWords).join(' ')
  return kept.replace(/[,;:]$/, '')
}

function weakCorrectAnswer(options: string[], correctIndex: number, variant: number): string {
  const text = options[correctIndex]
  const letter = 'ABCD'[correctIndex]
  switch (variant % 4) {
    case 0:  return `i think it is ${echoOption(text, 6).toLowerCase()} sir`
    case 1:  return `${letter}. but sir i not fully sure`
    case 2:  return `maybe ${echoOption(text, 5).toLowerCase()}`
    default: return `sir i think ${letter}`
  }
}

/** A wrong answer, chosen deliberately once per lesson to exercise remediation.
 *  Same echo rule — a learner picking the wrong option still reads it off the
 *  screen rather than inventing a mangled fragment of it. */
function weakWrongAnswer(options: string[], correctIndex: number): string {
  const wrong = options.findIndex((_, i) => i !== correctIndex)
  return `i think it is ${echoOption(options[wrong], 6).toLowerCase()}`
}

interface TurnRow {
  n: number; said: string; phase: string; check: number; practice: number
  verified: boolean; mcq: boolean; complete: boolean; provider: string; text: string
}

function row(n: number, said: string, p: TurnPayload): TurnRow {
  const m = (p.mastery ?? {}) as any
  return {
    n, said,
    phase: m.phase ?? '-', check: m.checkCorrect ?? 0, practice: m.practiceCorrect ?? 0,
    verified: Boolean(m.verified), mcq: Boolean(p.mcq),
    complete: Boolean((p.lessonComplete as any)?.complete ?? p.lessonComplete),
    provider: String(p.provider ?? '?'),
    text: (p.text ?? '').replace(/\s+/g, ' '),
  }
}

const fmt = (r: TurnRow) =>
  `  ${String(r.n).padStart(2)} | ${r.phase.padEnd(11)} c=${r.check} p=${r.practice} `
  + `${r.verified ? 'VERIFIED' : '        '} ${r.mcq ? 'MCQ' : '   '} ${r.complete ? 'COMPLETE' : '        '} `
  + `${r.provider.padEnd(11)}\n     learner: "${r.said}"\n     tutor  : ${r.text.slice(0, 230)}`

async function runLesson(cookie: string, subject: string, conceptId: string) {
  console.log(`\n${'═'.repeat(78)}\n${subject.toUpperCase()}  ${conceptId}\n${'═'.repeat(78)}`)
  const lessons = await curriculum(cookie, subject)
  const lesson = lessons.find((l) => l.topicSlug === conceptId)
  if (!lesson) { console.log(`  !! ${conceptId} not in the ${subject} curriculum — skipped`); return null }
  console.log(`  lesson ${lesson.lessonOrder}/${lesson.totalLessons} "${lesson.lessonTitle}"`)

  const sessionId = await newSession(cookie, subject)
  console.log(`  session ${sessionId}`)
  const openTurn = await open(cookie, sessionId, lesson, 'restart')
  console.log(fmt(row(0, '(opened lesson)', openTurn)))

  const rows: TurnRow[] = []
  let pending: TurnPayload['mcq'] = null
  let answered = 0
  let spentWrongAnswer = false
  let confusedIdx = 0

  for (let n = 1; n <= MAX_TURNS; n++) {
    let said: string
    if (pending) {
      // A weak learner answers the question in front of them — badly worded,
      // and once, wrongly.
      if (!spentWrongAnswer && answered === 0) {
        said = weakWrongAnswer(pending.options, pending.correctIndex)
        spentWrongAnswer = true
      } else {
        said = weakCorrectAnswer(pending.options, pending.correctIndex, answered)
      }
      answered++
    } else if (n % 4 === 0) {
      said = PRACTICE[Math.floor(n / 4) % PRACTICE.length]
    } else {
      said = CONFUSED[confusedIdx++ % CONFUSED.length]
    }

    const t = await say(cookie, sessionId, said)
    const r = row(n, said, t)
    rows.push(r)
    console.log(fmt(r))
    pending = t.mcq ?? null
    if (r.complete) { console.log(`\n  >>> LESSON COMPLETE at turn ${n}`); break }
  }

  const last = rows[rows.length - 1]
  const best = rows.reduce((a, b) => (b.check + b.practice >= a.check + a.practice ? b : a), rows[0])
  console.log(`\n  ── OUTCOME ──`)
  console.log(`  reached phase   : ${[...new Set(rows.map((r) => r.phase))].join(' -> ')}`)
  console.log(`  MCQs served     : ${rows.filter((r) => r.mcq).length}`)
  console.log(`  best counters   : check=${best.check} practice=${best.practice}`)
  console.log(`  mastery verified: ${rows.some((r) => r.verified)}`)
  console.log(`  COMPLETED       : ${rows.some((r) => r.complete)}`)
  return { subject, conceptId, sessionId, rows, completed: rows.some((r) => r.complete) }
}

async function main() {
  const cookie = await login()
  console.log(`logged in as ${EMAIL}`)
  const results = []
  for (const t of TARGETS) {
    try { results.push(await runLesson(cookie, t.subject, t.concept)) }
    catch (e: any) { console.log(`  !! ${t.concept} FAILED: ${e?.message ?? e}`) }
  }
  console.log(`\n${'═'.repeat(78)}\nSUMMARY\n${'═'.repeat(78)}`)
  for (const r of results) {
    if (!r) continue
    const best = r.rows.reduce((a, b) => (b.check + b.practice >= a.check + a.practice ? b : a), r.rows[0])
    console.log(`  ${r.completed ? 'COMPLETE ' : 'STUCK    '} ${r.conceptId.padEnd(34)} `
      + `phase=${best.phase.padEnd(11)} check=${best.check} practice=${best.practice} `
      + `mcqs=${r.rows.filter((x) => x.mcq).length} session=${r.sessionId}`)
  }
}

main().catch((e) => { console.error('FAILED:', e?.message ?? e); process.exit(1) })
