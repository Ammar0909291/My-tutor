/**
 * STRUGGLING-LEARNER HARNESS — a repeatable, subject-agnostic acceptance test.
 *
 * Drives the REAL deployed app as a weak-English, visual-dependent, easily
 * confused learner across a random sample of a subject's hardest concepts,
 * and captures full transcripts for a human (or a future Claude session) to
 * score. It measures objective signals only (visual presence, mastery
 * progress, provider health, turn repetition) — the subjective "how good was
 * this teaching experience" rating still needs a real read of the transcript,
 * because no regex substitutes for that judgment.
 *
 * Born from a manual one-off run (30 physics concepts, 2026-08-29) that found
 * a repeatable pattern: sessions with a real visual scored consistently
 * higher than sessions without one, and only 1 of 30 ever reached verified
 * mastery. This script exists so that comparison can be re-run on demand
 * instead of hand-built each time.
 *
 *   QA_EMAIL=… QA_PASSWORD=… npx tsx scripts/qa/strugglingLearnerHarness.ts \
 *     physics --difficulty=advanced,expert,research --count=30 --seed=1
 *
 * Output: one out-<conceptId>.json transcript per concept plus a
 * summary.json, written to --out (default: a qa-runs/<subject>-<timestamp>
 * directory under this script's own folder — gitignored, see .gitignore).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = process.env.APP_URL ?? 'https://my-tutor-flame.vercel.app'

interface KgConcept {
  id: string
  name: string
  difficulty: string
}

interface CurriculumLesson {
  topicSlug: string
  order: number
  lessonTitle: string
  unitTitle: string
}

interface Payload {
  text?: string
  provider?: string | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number; gatePending?: boolean } | null
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  visualSpec?: unknown
  sceneSpec?: unknown
  visual?: unknown
  dynamicVisualizationCode?: unknown
  lessonComplete?: unknown
  [k: string]: unknown
}

interface Turn { label: string; sent: string; payload: Payload }

function parseArgs(argv: string[]) {
  const subject = argv[0]
  if (!subject) throw new Error('usage: strugglingLearnerHarness.ts <subject> [--difficulty=a,b] [--count=N] [--seed=N] [--out=dir]')
  const opt = (name: string, def: string) => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`))
    return hit ? hit.slice(name.length + 3) : def
  }
  return {
    subject,
    difficulties: opt('difficulty', 'advanced,expert,research').split(','),
    count: Number(opt('count', '30')),
    seed: Number(opt('seed', String(Date.now() % 100000))),
    outDir: opt('out', ''),
  }
}

// Deterministic PRNG so --seed reproduces the same concept sample.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickConcepts(subject: string, difficulties: string[], count: number, seed: number, lessonBySlug: Map<string, CurriculumLesson>) {
  const kgPath = join(__dirname, '..', '..', 'docs', subject, 'kg', 'graph.json')
  const kg = JSON.parse(readFileSync(kgPath, 'utf8')) as { concepts: KgConcept[] }
  const pool = kg.concepts.filter((c) => difficulties.includes(c.difficulty) && lessonBySlug.has(c.id))
  const rand = mulberry32(seed)
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

async function login(): Promise<string> {
  const email = process.env.QA_EMAIL
  const password = process.env.QA_PASSWORD
  if (!email || !password) throw new Error('set QA_EMAIL and QA_PASSWORD')
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = (await c.json()) as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken: t, email, password, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

async function api(cookie: string, method: 'GET' | 'POST', path: string, body?: unknown): Promise<Payload> {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json', cookie } : { cookie },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })
  if (!r.ok) throw new Error(`${path} -> ${r.status}: ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as Payload
}

function hasVisual(p: Payload): boolean {
  return Boolean(p.visualSpec || p.sceneSpec || p.visual || p.dynamicVisualizationCode)
}

// Weak English, easily confused, visual-dependent — the persona this file was
// built to give a repeatable shape to. Adaptive at one point only: it answers
// whatever MCQ is actually pending (wrong once per concept, then right),
// rather than assuming a fixed turn holds the question.
const PERSONA_LINES = [
  'hello sir, sorry my english is not very good, can you teach me easy easy please',
  "i dont understand this, its too hard for me, sorry",
  'can you show me a picture or diagram? i understand better when i see something, my english is weak',
  'ohh ok, i think i understand a little bit now',
  'can you show the picture again, i want to look one more time',
  'thank you sir, i understand a little better now with the picture',
  'ok i will try, i think i know the answer',
]

/**
 * Spoken once the opening arc is spent and no MCQ is pending. Cycled, never
 * clamped.
 *
 * The list used to end with 'can i go to next lesson now, i think i learn this
 * one', and `PERSONA_LINES[Math.min(idx, len-1)]` CLAMPED to it — so every turn
 * after the sixth repeated a request to leave the lesson. At MAX_TURNS 9 that
 * was nearly invisible. At a budget long enough to actually reach mastery it is
 * not: the learner would ask to leave a dozen times running, which is a
 * disengagement signal the engine is right to act on, and the run would measure
 * the harness talking itself out of the lesson rather than the product teaching.
 * These keep the persona in character — still weak, still confused, still
 * asking for help — without asking to leave and without answering anything for
 * the tutor.
 */
const PERSONA_CONTINUATIONS = [
  'sorry sir i am still little confused, can you help me again please',
  'ok i am trying, can you explain one more time slowly',
  'i think i understand some part but not all, sorry',
  'can you give me one more example please, easy one',
]

/**
 * WHY THIS IS NOT 9.
 *
 * Verified mastery is THREE server-graded correct answers — `correctAtCheck >= 1`
 * plus `correctAtPractice >= 2` — and the gate never re-asks a spent probe, so
 * each one needs its own MCQ turn. The persona also answers the first MCQ
 * deliberately WRONG (see the loop below), and spends its opening arc before the
 * engine attaches any MCQ at all.
 *
 * Measured end to end on `phys.stat.boltzmann-factor` (2026-08-29, real account,
 * deployed app) at the old budget of 9:
 *
 *   T1-T6  opening arc — first MCQ arrives WITH the T6 response
 *   T7     answers it deliberately wrong          -> checkCorrect 0
 *   T8     persona line, engine teaches
 *   T9     second MCQ arrives WITH the T9 response — and the run ENDS
 *
 * The second MCQ was never answered, because answering it would have been turn
 * 10. The session finished phase GUIDE, check 0, practice 0, and was recorded as
 * a teaching failure. It was not one: the budget ran out one turn before the
 * instrument could record a single correct answer, and three were needed.
 *
 * That is the same class of defect this harness has hit repeatedly — condemning
 * the product for the harness's own blind spot. The prior finding it produced,
 * "only 1 of 30 sessions reached verified mastery", is therefore not evidence
 * about the product: at 9 turns the persona can at best answer ONE MCQ
 * correctly, and the bar is three. No product could have passed it.
 *
 * 20 gives the opening arc (7), the deliberate wrong answer (1), three correct
 * answers (3), and room for the teaching turns the engine legitimately spends
 * between gates — without being so long that a genuinely stuck lesson looks
 * like a passing one. A concept that has not closed by 20 turns is a real
 * finding; one that had not closed by 9 was an arithmetic artefact.
 */
const MAX_TURNS = 20

/**
 * SESSION ISOLATION — the harness cannot assume it got a fresh session.
 *
 * `POST /api/sessions` RESUMES any ACTIVE session for the account from the last
 * 24h, and `mode: 'restart'` on lesson-init does not clear the ladder. That is
 * documented behaviour, and `scripts/math/certify.ts` already refuses to report
 * PASS when it sees the consequence, calling it DIRTY-STATE. This harness had no
 * such guard, and it ran a whole sweep on ONE account back to back.
 *
 * Measured 2026-08-29 on a 4-concept run: inside a single session declared as
 * `phys.stat.boltzmann-factor`, `lessonOrder` moved 203 -> 62 -> 188 -> 210 and
 * the mastery gate served probes about the WKB approximation and the
 * Euler-Lagrange equation — two OTHER concepts in the same sample. The persona
 * answered them, the phase machine reset to OBSERVE twice, and `checkCorrect`
 * went 0 -> 1 -> 0. Everything that run recorded about "boltzmann-factor" was
 * partly about three different concepts.
 *
 * Ruled out as the cause: concurrency. Every learn_session in the window was
 * sequential on one user with no overlap, so this is inherited state, not two
 * runners fighting.
 *
 * Two guards, both instrument-only — neither changes the product:
 *   1. End any session this harness opened, on the FAILURE path too. It used to
 *      end only after a clean loop, so a thrown turn leaked an ACTIVE session
 *      that the next concept then resumed. One was still ACTIVE after the run.
 *   2. Record the lesson the server actually served on every turn, and flag the
 *      concept `lessonDrift` when it leaves the target. A drifted concept is
 *      reported, never silently averaged into a score.
 */
async function runConcept(cookie: string, subject: string, concept: KgConcept, lesson: CurriculumLesson, totalLessons: number) {
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: subject })
  const sessionId = (session.data as { id: string }).id
  const turns: Turn[] = []

  try {
  let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons, completedLessons: [],
    teachingLanguage: 'en',
  })
  turns.push({ label: 'T0', sent: '(lesson-init)', payload: last })

  let personaIdx = 0
  let answeredWrongOnce = false
  for (let i = 0; i < MAX_TURNS; i += 1) {
    let msg: string
    if (last.mcq) {
      if (!answeredWrongOnce) { msg = last.mcq.options[(last.mcq.correctIndex + 1) % last.mcq.options.length]; answeredWrongOnce = true }
      else msg = last.mcq.options[last.mcq.correctIndex]
    } else if (personaIdx < PERSONA_LINES.length) {
      msg = PERSONA_LINES[personaIdx]
      personaIdx += 1
    } else {
      // Opening arc spent: cycle the continuations rather than clamping to the
      // last line. See PERSONA_CONTINUATIONS for why clamping corrupted a long
      // run.
      msg = PERSONA_CONTINUATIONS[(personaIdx - PERSONA_LINES.length) % PERSONA_CONTINUATIONS.length]
      personaIdx += 1
    }
    const p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg })
    turns.push({ label: `T${i + 1}`, sent: msg, payload: p })
    last = p
    if (p.lessonComplete) break
  }

  return buildResult(concept, lesson, sessionId, turns)
  } finally {
    // ALWAYS, including when a turn threw. An ACTIVE session left behind is
    // resumed by the NEXT concept's POST /api/sessions, which is how one
    // concept's ladder and active lesson leak into the next one's measurement.
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
}

/**
 * Shared by the clean and the thrown path so a partial run is still reported
 * with its drift, rather than discarded as a bare error string.
 */
function buildResult(concept: KgConcept, lesson: CurriculumLesson, sessionId: string, turns: Turn[]) {
  const servedOrders = turns
    .map((t) => (t.payload as { lessonOrder?: number }).lessonOrder)
    .filter((o): o is number => typeof o === 'number')
  const offTarget = [...new Set(servedOrders.filter((o) => o !== lesson.order))]

  return {
    id: concept.id, name: concept.name, difficulty: concept.difficulty, sessionId, turns,
    anyVisual: turns.some((t) => hasVisual(t.payload)),
    visualTurnCount: turns.filter((t) => hasVisual(t.payload)).length,
    providerDegraded: turns.some((t) => t.payload.provider === 'degraded'),
    finalMastery: turns.at(-1)?.payload.mastery ?? null,
    // See the runConcept header. A drifted concept measured something other
    // than the concept it names, so its score is not evidence about that
    // concept and must not be averaged in as if it were.
    targetLessonOrder: lesson.order,
    lessonDrift: offTarget.length > 0,
    lessonOrdersServed: offTarget,
  }
}

async function main() {
  const { subject, difficulties, count, seed, outDir } = parseArgs(process.argv.slice(2))
  const cookie = await login()

  const cur = (await api(cookie, 'GET', `/api/curriculum?subject=${subject}`)) as unknown as { lessons: CurriculumLesson[] }
  const lessonBySlug = new Map(cur.lessons.map((l) => [l.topicSlug, l]))
  const picked = pickConcepts(subject, difficulties, count, seed, lessonBySlug)
  if (picked.length < count) {
    console.warn(`WARNING: only ${picked.length}/${count} concepts matched difficulty=[${difficulties.join(',')}] with a curriculum entry`)
  }

  const OUT_ROOT = join(__dirname, 'qa-runs') // gitignored — see .gitignore
  const dir = outDir || join(OUT_ROOT, `${subject}-${Date.now()}`)
  mkdirSync(dir, { recursive: true })

  const summary: Array<Record<string, unknown>> = []
  for (let i = 0; i < picked.length; i += 1) {
    const concept = picked[i]
    const lesson = lessonBySlug.get(concept.id)!
    const t0 = Date.now()
    try {
      const result = await runConcept(cookie, subject, concept, lesson, cur.lessons.length)
      writeFileSync(join(dir, `out-${concept.id.replace(/\./g, '_')}.json`), JSON.stringify(result, null, 2))
      summary.push({
        id: concept.id, difficulty: concept.difficulty, ok: true, ms: Date.now() - t0,
        anyVisual: result.anyVisual, visualTurnCount: result.visualTurnCount,
        providerDegraded: result.providerDegraded, finalMastery: result.finalMastery,
        lessonDrift: result.lessonDrift, targetLessonOrder: result.targetLessonOrder,
        lessonOrdersServed: result.lessonOrdersServed,
      })
      console.log(
        `[${i + 1}/${picked.length}] ${concept.id} visual=${result.anyVisual} degraded=${result.providerDegraded}` +
          (result.lessonDrift ? ` DRIFT->${result.lessonOrdersServed.join(',')}` : ''),
      )
    } catch (e) {
      summary.push({ id: concept.id, difficulty: concept.difficulty, ok: false, ms: Date.now() - t0, error: String((e as Error).message).slice(0, 300) })
      console.error(`[${i + 1}/${picked.length}] FAILED ${concept.id}: ${(e as Error).message}`)
    }
    writeFileSync(join(dir, 'summary.json'), JSON.stringify(summary, null, 2))
  }

  const ok = summary.filter((s) => s.ok)
  const clean = ok.filter((s) => !s.lessonDrift)
  const drifted = ok.filter((s) => s.lessonDrift)
  const withVisual = clean.filter((s) => s.anyVisual).length
  const mastered = clean.filter((s) => {
    const m = s.finalMastery as { checkCorrect?: number; practiceCorrect?: number } | null
    return (m?.checkCorrect ?? 0) >= 1 && (m?.practiceCorrect ?? 0) >= 2
  }).length

  console.log(`\n${ok.length}/${picked.length} completed.`)
  // Reported against CLEAN concepts only. A drifted concept was served a
  // different lesson mid-session, so counting it either way would be a claim
  // about a concept the run did not actually measure.
  console.log(`${clean.length} clean, ${drifted.length} discarded for lesson drift.`)
  console.log(`${withVisual}/${clean.length} showed a real visual at least once.`)
  console.log(`${mastered}/${clean.length} reached verified mastery (check>=1 and practice>=2).`)
  if (drifted.length > 0) console.log(`Drifted: ${drifted.map((s) => s.id).join(', ')}`)
  console.log(`Transcripts: ${dir}`)
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
