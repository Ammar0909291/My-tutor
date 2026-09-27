/**
 * CAN A BIOLOGY LESSON REACH VERIFIED MASTERY? — live, per concept.
 *
 * Drives each named Biology concept's real lesson against the DEPLOYED app as
 * a learner who has read the material, and reports whether the server's own
 * mastery gate (1 verified CHECK + 2 verified PRACTICE, masteryGate.ts) is
 * reached.
 *
 * WHY THIS EXISTS. The earlier Biology harness matched quiz stems with
 * hand-written regexes, answered by exact canonical text, and guessed option 0
 * for anything else — so every quiz variant the tutor wrote beyond the three
 * seeded probes was answered at random, and a lesson that "didn't reach
 * mastery" said nothing about the product. Answers here come from
 * `biologyAnswerPicker.ts`, grounded only in the concept's own canonical
 * sources (seed probes, seed explanations, Educational Brain entry). Measured
 * offline on all 597 Biology seed probes: 99.5% on an authored probe, 72.9%
 * on an unseen one (leave-one-out) against a 35.0% random baseline. The route
 * strips `correctIndex` from the client payload; nothing here reads a key.
 *
 * It reads and records. The verdict per concept is the server's own mastery
 * payload plus the transcript that produced it — read the transcript before
 * believing a "not reached".
 *
 * DISPOSABLE ACCOUNTS ONLY (liveAccount.ts register -> drive), one per worker.
 * They are NOT deleted by the drive run: topic_progress / evidence rows cascade on user
 * delete, and the DB cross-check must read them first. Delete afterwards with
 *   npx tsx scripts/qa/biologyMasteryReachability.ts --cleanup <QA_OUT>/qa-accounts.json
 * The creds file holds only the throwaway accounts' generated credentials, is
 * written OUTSIDE the repo (QA_OUT), and has each password removed on delete.
 *
 * Run:
 *   QA_OUT=/tmp/bio-mastery npx tsx scripts/qa/biologyMasteryReachability.ts [conceptId ...]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createQaAccount, deleteQaAccount, login, BASE, type QaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'
import { biologyCanonicalContent, pickAnswer, answerFreeResponse, proseOptions } from './biologyAnswerPicker'

/** The Biology Visual Coverage Campaign's batch 13 (BIOLOGY_VISUAL_COVERAGE_HANDOVER.md). */
export const BATCH_13 = [
  'bio.physio.exercise-physiology',
  'bio.physio.homeostasis-thermoregulation',
  'bio.physio.integumentary-system',
  'bio.physio.lymphatic-system-detail',
  'bio.physio.muscle-physiology-energetics',
  'bio.plant.mycorrhizae-plant-symbioses',
  'bio.plant.phytochrome-photoperiodic-flowering',
  'bio.plant.plant-biotechnology-applications',
  'bio.plant.plant-defense-mechanisms',
  'bio.plant.plant-stress-physiology',
  'bio.plant.plant-tissue-systems',
  'bio.plant.secondary-growth-anatomy',
  'bio.plant.seed-germination-dormancy',
  'bio.repro.animal-reproductive-strategies',
  'bio.repro.hormonal-regulation-reproduction-detail',
  'bio.sys.evolutionary-systems-biology',
  'bio.sys.quantitative-systems-modeling',
]

const MAX_TURNS = Number(process.env.QA_MAX_TURNS ?? 30)
const CONCURRENCY = Number(process.env.QA_CONCURRENCY ?? 3)
const OUT = process.env.QA_OUT ?? '/tmp/bio-mastery-qa'

/**
 * What a learner says when nothing is being asked of them: acknowledgement
 * only. MEASURED (first smoke run): nudging with "can you quiz me on this?"
 * made the tutor write its own quiz during GUIDE, whose model-invented key
 * cannot count toward verified mastery but whose wrong answer still regresses
 * the ladder — so the harness was spending authored probes itself. The
 * lesson's own gate decides when to ask; the learner just follows.
 */
const NUDGES = [
  'ok, that makes sense',
  'right, i follow so far',
  'i see, please go on',
]

interface CurriculumLesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }

interface TurnRecord {
  n: number
  sent: string
  how: 'nudge' | 'mcq-authored' | 'mcq-adhoc' | 'prose-options' | 'free-response'
  mcq?: { question: string; options: string[]; picked: number; confidence: number; matchedStem?: string }
  tutor: string
  mastery: TurnPayload['mastery']
  figure: boolean
}

export interface ConceptOutcome {
  conceptId: string
  lessonTitle: string
  sessionId: string
  verified: boolean
  final: TurnPayload['mastery']
  turns: TurnRecord[]
  error?: string
}

function lastQuestion(text: string | undefined): string | null {
  if (!text) return null
  const sentences = text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/)
  const q = [...sentences].reverse().find((s) => s.trim().endsWith('?'))
  return q ? q.trim() : null
}

/** Onboard the throwaway learner with Biology — the path a real learner takes. */
async function onboardBiology(cookie: string): Promise<void> {
  const r = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      subjectSlug: 'biology', currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en',
      selfDescription: 'I am studying biology and want to understand each topic properly.',
    }),
  })
  if (!r.ok) throw new Error(`onboarding -> HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`)
}

async function fetchCurriculum(cookie: string): Promise<CurriculumLesson[]> {
  const r = await fetch(`${BASE}/api/curriculum?subject=biology`, { headers: { cookie } })
  if (!r.ok) throw new Error(`curriculum -> HTTP ${r.status}`)
  return ((await r.json()) as { lessons?: CurriculumLesson[] }).lessons ?? []
}

export async function driveConcept(cookie: string, lessons: CurriculumLesson[], conceptId: string): Promise<ConceptOutcome> {
  const lesson = lessons.find((l) => l.topicSlug === conceptId)
  if (!lesson) throw new Error(`no curriculum lesson for ${conceptId}`)
  const content = biologyCanonicalContent(conceptId)
  const sessionId = await createSession(cookie, 'biology')
  const outcome: ConceptOutcome = { conceptId, lessonTitle: lesson.lessonTitle, sessionId, verified: false, final: null, turns: [] }

  let p: TurnPayload = await openLesson(cookie, sessionId, {
    lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order, topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle, totalLessons: lessons.length,
  })
  outcome.turns.push({ n: 0, sent: '(lesson-init)', how: 'nudge', tutor: p.text ?? '', mastery: p.mastery, figure: carriesFigure(p) })

  let nudge = 0
  for (let n = 1; n <= MAX_TURNS; n++) {
    let sent: string
    let how: TurnRecord['how']
    let mcqRec: TurnRecord['mcq']
    const question = lastQuestion(p.text)
    const prose = p.mcq ? null : proseOptions(p.text)
    if (p.mcq && Array.isArray(p.mcq.options) && p.mcq.options.length) {
      const pick = pickAnswer(p.mcq.question ?? '', p.mcq.options, content)
      sent = p.mcq.options[pick.index]
      how = pick.tier === 'authored' ? 'mcq-authored' : 'mcq-adhoc'
      mcqRec = { question: p.mcq.question, options: p.mcq.options, picked: pick.index, confidence: pick.confidence, matchedStem: pick.matchedStem }
    } else if (prose) {
      const pick = pickAnswer(prose.question || (p.text ?? ''), prose.options, content)
      sent = prose.options[pick.index]
      how = 'prose-options'
      mcqRec = { question: prose.question, options: prose.options, picked: pick.index, confidence: pick.confidence, matchedStem: pick.matchedStem }
    } else if (question) {
      sent = answerFreeResponse(question, content)
      how = 'free-response'
    } else {
      sent = NUDGES[nudge++ % NUDGES.length]
      how = 'nudge'
    }
    p = await say(cookie, sessionId, sent)
    outcome.turns.push({ n, sent, how, mcq: mcqRec, tutor: p.text ?? '', mastery: p.mastery, figure: carriesFigure(p) })
    if (p.mastery?.verified === true || p.lessonComplete?.complete === true) break
  }
  outcome.final = p.mastery
  outcome.verified = p.mastery?.verified === true
  return outcome
}

async function cleanup(credsPath: string) {
  const accounts = JSON.parse(readFileSync(credsPath, 'utf8')) as { email: string; password?: string; deleted?: boolean }[]
  for (const a of accounts) {
    if (a.deleted || !a.password) continue
    if (!a.email.endsWith('@mytutor-qa.invalid')) throw new Error('refusing to delete a non-QA account')
    const cookie = await login(a.email, a.password)
    const r = await deleteQaAccount({ email: a.email, password: a.password, name: '', cookie } as QaAccount)
    console.log(`deleted=${r.deleted} reloginBlocked=${r.reloginBlocked} (${a.email})`)
    a.deleted = r.deleted
    if (r.deleted) delete a.password
  }
  writeFileSync(credsPath, JSON.stringify(accounts, null, 2))
}

/**
 * One disposable account PER WORKER, each driving its concepts one after
 * another — the way a real learner works through lessons. MEASURED (first
 * full run): three lessons driven concurrently on ONE account overwrote each
 * other's lesson state — one session taught another concept's figure and
 * closed "<other concept> is on pause", another's CHECK counter dropped from 1
 * to 0 — because the app scopes live lesson state per learner+subject and
 * tells browser tabs apart by a `tabId` this API harness does not send. Those
 * 12 "not verified" results measured the harness, not the product.
 */
async function main() {
  if (process.argv[2] === '--cleanup') return cleanup(process.argv[3])
  const concepts = process.argv.slice(2).length ? process.argv.slice(2) : BATCH_13
  mkdirSync(OUT, { recursive: true })
  const workers = Math.max(1, Math.min(CONCURRENCY, concepts.length))
  const credsPath = join(OUT, 'qa-accounts.json')
  const accounts: { email: string; password?: string }[] = []
  console.log(`BASE=${BASE} concepts=${concepts.length} maxTurns=${MAX_TURNS} workers=${workers} (one account each)`)

  const outcomes: ConceptOutcome[] = []
  let next = 0
  await Promise.all(Array.from({ length: workers }, async (_, w) => {
    const acct = await createQaAccount(`bio-mastery-w${w}`)
    accounts.push({ email: acct.email, password: acct.password })
    writeFileSync(credsPath, JSON.stringify(accounts, null, 2))
    await onboardBiology(acct.cookie)
    const lessons = await fetchCurriculum(acct.cookie)
    while (next < concepts.length) {
      const c = concepts[next++]
      let o: ConceptOutcome
      try {
        o = await driveConcept(acct.cookie, lessons, c)
        const counts = o.turns.reduce<Record<string, number>>((m, t) => ((m[t.how] = (m[t.how] ?? 0) + 1), m), {})
        console.log(`${o.verified ? 'VERIFIED    ' : 'NOT-VERIFIED'} ${c}  [${acct.email}] turns=${o.turns.length - 1} final=${JSON.stringify(o.final)} ${JSON.stringify(counts)}`)
      } catch (e) {
        o = { conceptId: c, lessonTitle: '', sessionId: '', verified: false, final: null, turns: [], error: (e as Error).message }
        console.log(`ERROR        ${c}  ${o.error}`)
      }
      writeFileSync(join(OUT, `${c}.json`), JSON.stringify({ account: acct.email, ...o }, null, 2))
      outcomes.push(o)
    }
  }))

  const verified = outcomes.filter((o) => o.verified).length
  writeFileSync(join(OUT, 'summary.json'), JSON.stringify({ accounts: accounts.map((a) => a.email), verified, total: outcomes.length,
    outcomes: outcomes.map((o) => ({ conceptId: o.conceptId, verified: o.verified, final: o.final, turns: o.turns.length - 1, sessionId: o.sessionId, error: o.error })) }, null, 2))
  console.log(`\nverified ${verified}/${outcomes.length}. Accounts left in place for the DB cross-check;`)
  console.log(`delete them afterwards: npx tsx scripts/qa/biologyMasteryReachability.ts --cleanup ${credsPath}`)
}

main().catch((e) => { console.error('FAILED:', (e as Error).message); process.exit(1) })
