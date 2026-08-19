/**
 * ENGINE STABILITY SWEEP — many topics at once, checked by machine.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The corpus audit's throughput was ~0.5 verified topics per session, against a
 * target of 10. Measuring where the time actually went:
 *
 *   deploy waits          ~35%
 *   engine-defect triage  ~40%
 *   serial probe latency  ~15%
 *   authoring the moat     ~5%
 *
 * Authoring was never the bottleneck. The two fixable costs are SERIAL LATENCY
 * (one session, one turn at a time, ~15s per round trip) and HAND-READING every
 * transcript to decide pass/fail — which produced nine false readings in one
 * day, every one caught only by re-reading the source of truth.
 *
 * So this script does two things the manual loop could not:
 *   1. runs every topic CONCURRENTLY, so wall-clock is one topic's latency
 *      rather than N topics';
 *   2. decides pass/fail from the RESPONSE JSON — the ladder, the grader, the
 *      asset id — never from prose. Prose is recorded for a human to read on
 *      failure, and is never the verdict.
 *
 * ── WHAT IT CHECKS ──────────────────────────────────────────────────────────
 * ENGINE invariants only. Not teaching quality — that still needs a human
 * reading a transcript. Every one of these is a defect class this audit already
 * found in production, so the sweep is a regression net for the whole day's
 * work:
 *
 *   E1  the mastery ladder advances on a graded correct answer
 *   E2  no outage/degraded template on a turn that carried content
 *   E3  no bogus excursion opened by a presentation request
 *   E4  a served memory asset belongs to the concept being taught
 *   E5  a completion is never claimed before the gate is earned
 *   E6  a gate-phase question carries the MCQ tag (so it can be recorded)
 *
 * ── DELIBERATELY NOT AUTOMATED ──────────────────────────────────────────────
 * The verdict "this teaching is good". That judgement is what the human audit
 * is for, and a script that claimed it would be the tenth false instrument.
 *
 * Usage:
 *   AUDIT_EMAIL=… AUDIT_PASSWORD=… npx tsx scripts/audit/engine-sweep.ts \
 *     [--subject physics] [--limit 8] [--concurrency 6]
 */
import { readFileSync } from 'fs'
import path from 'path'
import { summariseSweep } from './sweepReport'
// The REAL predicates the runtime judges a turn by. E6 used to test `/\?/`,
// which is a different question from the one the runtime asks — see the note
// on E6 below.
import { askedAnswerableQuestion } from '../../src/lib/teaching/answerableTurn'
import { containsOptionList } from '../../src/lib/teaching/gateProbeContract'

const BASE = process.env.AUDIT_BASE ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = process.env.AUDIT_EMAIL
const PASSWORD = process.env.AUDIT_PASSWORD

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : (process.argv[i + 1] ?? fallback)
}

const SUBJECT = arg('subject', 'physics')
const LIMIT = Number(arg('limit', '8'))

/**
 * CONCURRENCY IS 1, AND THAT IS NOT A PERFORMANCE CHOICE.
 *
 * A LEARN SESSION BELONGS TO A USER, NOT TO A TOPIC. This sweep signs in as one
 * account, and before each topic it ends every ACTIVE session for the subject
 * "so state cannot leak in" — which, run in parallel, means each topic ends its
 * siblings' sessions. `/api/sessions` then resumes an existing ACTIVE session
 * rather than always minting a fresh one, so two topics can end up driving the
 * same session.
 *
 * MEASURED, and it fabricated a serious-looking production defect. A run at
 * concurrency 2 reported:
 *
 *   E4  phys.wave.wave-speed: served asset … is for phys.em.coulombs-law
 *
 * i.e. "a learner on wave speed was taught Coulomb's law". The database says
 * otherwise: lesson_attempts shows `Wave Speed` starting 06:37:50 and
 * `Coulomb's Law` starting 06:38:07 — overlapping — and BOTH sessions alive in
 * that window carry `currentConceptNodeId = phys.em.coulombs-law`. The asset
 * itself is correctly tagged for Coulomb's law. Nothing was wrong in
 * production; the harness had two topics sharing one session.
 *
 * That is the SECOND false finding this instrument produced in one session (the
 * first was a bot-manufactured DEMONSTRATE freeze), and a harness that invents
 * "the wrong concept was served" is worse than a slow one — it sends people to
 * fix code that is correct.
 *
 * Real isolation needs one account per worker. Until this has that, topics run
 * one at a time. `--unsafe-concurrency N` exists for a throwaway account where
 * contamination does not matter; every finding from such a run must be treated
 * as unverified.
 */
const UNSAFE = Number(arg('unsafe-concurrency', '0'))
const CONCURRENCY = UNSAFE > 1 ? UNSAFE : 1

// ── session-scoped cookie jar ────────────────────────────────────────────────
//
// One jar PER TOPIC. A shared jar would serialise the whole sweep behind one
// learner session and, worse, let topics contaminate each other's state — the
// exact contamination that once made a replay measure RECOVERY instead of the
// topic under test.
class Jar {
  private cookies = new Map<string, string>()
  header(): string {
    return [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ')
  }
  absorb(res: Response) {
    for (const raw of res.headers.getSetCookie?.() ?? []) {
      const [pair] = raw.split(';')
      const eq = pair.indexOf('=')
      if (eq > 0) this.cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim())
    }
  }
}

/**
 * RETRY THROUGH A DEPLOY, BECAUSE DEPLOYS HAPPEN MID-SWEEP.
 *
 * A full run takes minutes and this repo deploys on every push. MEASURED: one
 * physics run reported all 12 topics as ERROR — five `chat 504`, six
 * `no session id` — and the cause was six production deployments landing
 * inside the run window from a concurrent session. Nothing was wrong with the
 * engine, the sweep, or the topics; the instrument simply had no tolerance for
 * its own environment and voided a ten-minute run.
 *
 * Only transport-level failures and 5xx are retried. A 4xx is a real answer
 * and is returned untouched — retrying it would turn a genuine rejection into
 * a timeout and hide it.
 */
async function req(jar: Jar, url: string, init: RequestInit = {}): Promise<Response> {
  const delays = [1500, 4000, 9000]
  let lastErr: unknown = null
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        headers: { ...(init.headers ?? {}), cookie: jar.header() },
        redirect: 'manual',
      })
      if (res.status >= 500 && attempt < delays.length) {
        await new Promise((r) => setTimeout(r, delays[attempt]))
        continue
      }
      jar.absorb(res)
      return res
    } catch (e) {
      lastErr = e
      if (attempt < delays.length) {
        await new Promise((r) => setTimeout(r, delays[attempt]))
        continue
      }
    }
  }
  throw lastErr ?? new Error(`unreachable after ${delays.length + 1} attempts: ${url}`)
}

async function signIn(jar: Jar): Promise<void> {
  const csrfRes = await req(jar, `${BASE}/api/auth/csrf`)
  const { csrfToken } = (await csrfRes.json()) as { csrfToken: string }
  const body = new URLSearchParams({
    csrfToken, email: EMAIL!, password: PASSWORD!,
    callbackUrl: `${BASE}/dashboard`, json: 'true',
  })
  await req(jar, `${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

type ChatResponse = {
  text?: string
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: {
    phase?: string; checkCorrect?: number; practiceCorrect?: number
    verified?: boolean; completionSuppressed?: boolean
  }
  provider?: string
  memoryAssetId?: string | null
  memoryConceptId?: string | null
  lessonComplete?: { complete?: boolean; fullyMastered?: boolean; needsReview?: string[] } | null
}

async function chat(jar: Jar, sessionId: string, message: string): Promise<ChatResponse> {
  const res = await req(jar, `${BASE}/api/learn/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  })
  if (!res.ok) throw new Error(`chat ${res.status}`)
  return (await res.json()) as ChatResponse
}

// ── the checks ───────────────────────────────────────────────────────────────

type Finding = { code: string; detail: string }

/** The degraded/outage templates, verbatim from `degradedMode` + the verifier fallback. */
const TEMPLATE_RE =
  /(let'?s take (?:a|one) (?:small )?step together|we can continue from here whenever you'?re ready|what'?s one thing you notice or find surprising)/i

/** Presentation requests that must never open an off-lesson excursion. */
const PRESENTATION_PROBE = 'can you show me what that looks like'

function checkTurn(
  conceptId: string,
  r: ChatResponse,
  ctx: { phaseBefore?: string; isPresentationProbe?: boolean },
): Finding[] {
  const out: Finding[] = []
  const text = r.text ?? ''
  const hasContent = text.trim().length > 0 || Boolean(r.mcq)

  // E2 — an outage/filler template on a turn that carried content.
  if (TEMPLATE_RE.test(text) && r.mcq) {
    out.push({ code: 'E2', detail: 'degraded/filler template served beside a valid MCQ' })
  }
  if (r.provider === 'degraded' && hasContent) {
    out.push({ code: 'E2', detail: 'turn marked provider=degraded while carrying content' })
  }

  // E4 — a served memory asset must belong to the concept being taught.
  if (r.provider === 'memory' && r.memoryConceptId && r.memoryConceptId !== conceptId) {
    out.push({
      code: 'E4',
      detail: `served asset ${r.memoryAssetId} is for ${r.memoryConceptId}, lesson is ${conceptId}`,
    })
  }

  // E5 — completion claimed before the gate is earned.
  //
  // THE FIRST DRAFT OF THIS CHECK WAS WRONG and fired 16 times on run 1. It
  // asserted `lessonComplete.complete && !mastery.verified` was a contradiction.
  // It is not: `closedConceptIds` is `conceptsMastered` PLUS
  // `conceptsNeedingReview`, so a lesson finalises when its concept is closed
  // EITHER by mastery OR by a spent budget — that is the documented P6
  // definition, and the payload is honest about which, via `fullyMastered` and
  // `needsReview`.
  //
  // The real contradiction is a claim of FULL mastery without verified
  // evidence, so that is what is checked. Recorded rather than quietly
  // corrected: this is the tenth instrument of mine to produce a false reading
  // in this audit, and every one was caught by reading the source of truth.
  const m = r.mastery
  if (m && m.verified === false && r.lessonComplete?.fullyMastered === true) {
    out.push({ code: 'E5', detail: 'lessonComplete.fullyMastered while mastery.verified is false' })
  }
  if (m && m.verified === false && /you(?:'ve| have)? (?:completed|finished)|next up is/i.test(text)) {
    out.push({ code: 'E5', detail: 'completion claimed in prose before the gate was earned' })
  }

  // E6 — a gate-phase question must carry the tag, or it cannot be recorded.
  //
  // SHARPENED 2026-08-19, because the instrument was asking a different
  // question from the runtime. It tested `/\?/` — ANY question mark — so
  // "does that make sense?" and "shall we carry on?" were reported as
  // ungradeable mastery questions. Those are confirmation tails, not mastery
  // questions, and the runtime's own repair
  // (`withholdUngradedGateQuestion`) deliberately lets them through: it asks
  // `askedAnswerableQuestion(text) || containsOptionList(text)`.
  //
  // Using the runtime's predicates means a finding here is the same event the
  // server would have acted on, rather than a stricter one this file invented
  // — the pattern this whole harness has been burned by twice already (the
  // bot-manufactured DEMONSTRATE freeze, the parallel-session asset mix-up).
  // The offending text rides along so the verdict can be judged, not guessed.
  if ((ctx.phaseBefore === 'CHECK' || ctx.phaseBefore === 'PRACTICE') && !r.mcq
      && (askedAnswerableQuestion(text) || containsOptionList(text))) {
    const snippet = text.replace(/\s+/g, ' ').trim().slice(-220)
    out.push({
      code: 'E6',
      detail: `answerable question asked at ${ctx.phaseBefore} without an MCQ tag — "…${snippet}"`,
    })
  }

  return out
}

// ── one topic, start to finish ───────────────────────────────────────────────

type TopicResult = {
  conceptId: string
  title: string
  findings: Finding[]
  ladder: string[]
  reachedVerified: boolean
  transcript: { me: string; tutor: string }[]
  error?: string
}

async function sweepTopic(concept: { id: string; name: string; description: string; order: number }): Promise<TopicResult> {
  const jar = new Jar()
  const result: TopicResult = {
    conceptId: concept.id, title: concept.name,
    findings: [], ladder: [], reachedVerified: false, transcript: [],
  }
  try {
    await signIn(jar)

    // End any active session for this subject so state cannot leak in.
    const listRes = await req(jar, `${BASE}/api/sessions`)
    const list = (await listRes.json()) as { data?: { id: string; status: string; subject?: { slug?: string } }[] }
    for (const s of list.data ?? []) {
      if (s.status === 'ACTIVE' && s.subject?.slug === SUBJECT) {
        await req(jar, `${BASE}/api/sessions/end`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ sessionId: s.id }),
        })
      }
    }

    const newRes = await req(jar, `${BASE}/api/sessions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ subjectSlug: SUBJECT }),
    })
    const sessionId = ((await newRes.json()) as { data?: { id: string } }).data?.id
    if (!sessionId) throw new Error('no session id')

    await req(jar, `${BASE}/api/learn/lesson-init`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        sessionId, mode: 'restart',
        lessonTitle: concept.name, lessonGoal: concept.description,
        lessonOrder: concept.order, topicSlug: concept.id,
        unitTitle: '', teachingLanguage: 'en',
      }),
    })

    // The script drives a fixed, mechanical sequence. It is NOT trying to be a
    // realistic learner — that is the human audit's job. It is trying to reach
    // the mastery gate deterministically so the ENGINE is exercised.
    let phaseBefore = 'OBSERVE'
    const say = async (msg: string, isPresentationProbe = false) => {
      const r = await chat(jar, sessionId, msg)
      result.transcript.push({ me: msg, tutor: (r.text ?? '').slice(0, 300) })
      result.findings.push(...checkTurn(concept.id, r, { phaseBefore, isPresentationProbe }))
      const m = r.mastery
      result.ladder.push(`${m?.phase ?? '?'}(${m?.checkCorrect ?? 0}/${m?.practiceCorrect ?? 0})`)
      if (m?.verified) result.reachedVerified = true
      phaseBefore = m?.phase ?? phaseBefore
      return r
    }

    // E3 — a presentation request must not open an excursion, which would
    // freeze the ladder for the rest of the session.
    await say(PRESENTATION_PROBE, true)

    // ── DRIVE TO THE GATE ─────────────────────────────────────────────────
    //
    // Two changes after this harness produced a badly misleading run: 12
    // physics topics, 2 verified, six apparently frozen at DEMONSTRATE with
    // 0/0 — which traced to a real-looking gate defect. Hand-driving one of
    // the "frozen" topics as a learner moved it OBSERVE -> DEMONSTRATE ->
    // GUIDE in four turns. The freeze was the BOT, not the engine.
    //
    // 1. WHEN THERE IS NO MCQ, ENGAGE INSTEAD OF DEMANDING. The loop used to
    //    reply "ok give me a question to practise" on every question-less
    //    turn. That is not an answer, so the tutor kept teaching and the bot
    //    kept demanding — a standoff no learner produces. Alternating a short
    //    engaged reply with the request is still not a realistic learner, but
    //    it stops manufacturing a deadlock and calling it an engine defect.
    //
    // 2. TYPE THE NUMBER, NOT ONLY THE OPTION. Sending the option verbatim is
    //    the TAPPED path. Typing the bare value is what a person does, and it
    //    was completely ungraded until the number-word/digit fix — a defect
    //    this harness ran straight past for exactly that reason. Alternating
    //    the two exercises both, so a regression in either is visible.
    const ENGAGE = [
      'yes, i think so — it depends on how big each quantity is',
      'ok, that makes sense so far',
      'i think it changes when the other quantity changes',
    ]
    /** The correct option's bare number, when it has exactly one. */
    const typedValue = (opt: string): string | null => {
      const nums = opt.match(/\d+(?:\.\d+)?/g)
      return nums && nums.length === 1 ? nums[0] : null
    }
    let last = await say('ok give me a question to check i understand')
    let answered = 0
    for (let i = 0; i < 12 && !result.reachedVerified; i++) {
      let answer: string
      if (last.mcq) {
        const correct = last.mcq.options[last.mcq.correctIndex]
        const asNumber = answered % 2 === 1 ? typedValue(correct) : null
        answer = asNumber ?? correct
        answered++
      } else {
        answer = i % 2 === 0 ? ENGAGE[i % ENGAGE.length] : 'ok give me a question to practise'
      }
      last = await say(answer)
    }

    // E1 — the ladder must have moved at all.
    const phases = new Set(result.ladder.map((l) => l.split('(')[0]))
    if (phases.size === 1) {
      result.findings.push({ code: 'E1', detail: `ladder never left ${[...phases][0]}` })
    }

    // E7 — THE SHAPE E1 WAS TOO WEAK TO SEE.
    //
    // E1 only fires when the ladder never leaves its FIRST phase. Six topics
    // in the misleading run left OBSERVE, sat at DEMONSTRATE for the rest of
    // the session with zero graded answers, and were reported as "no
    // findings" — the dominant failure mode, invisible to every check.
    //
    // A drive that answers every question it is offered and still ends below
    // CHECK with nothing graded means no gradeable question was ever put in
    // front of it. That is worth naming whether the cause is the engine or
    // the corpus.
    const lastRung = result.ladder[result.ladder.length - 1] ?? ''
    const belowCheck = /^(OBSERVE|DEMONSTRATE|GUIDE)\(/.test(lastRung)
    const nothingGraded = result.ladder.every((l) => l.includes('(0/0)'))
    if (belowCheck && nothingGraded) {
      result.findings.push({
        code: 'E7',
        detail: `ended at ${lastRung} with no graded answer in ${result.ladder.length} turns — no gradeable question was ever offered`,
      })
    }
  } catch (e) {
    result.error = String((e as Error).message)
  }
  return result
}

// ── run ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!EMAIL || !PASSWORD) {
    console.error('AUDIT_EMAIL and AUDIT_PASSWORD are required')
    process.exit(1)
  }
  const graph = JSON.parse(
    readFileSync(path.join(process.cwd(), 'docs', SUBJECT, 'kg', 'graph.json'), 'utf8'),
  ) as { concepts: { id: string; name: string; description: string }[] }

  // ── WHICH TOPICS ──────────────────────────────────────────────────────────
  //
  // `slice(0, LIMIT)` could only ever test the FRONT of a subject. Physics has
  // 238 concepts across 12 domains and the sweep never reached past the first
  // handful, so every later domain — electromagnetism, modern, particle,
  // semiconductors — was unswept. The one real defect found by hand this
  // session was at index 132 (`phys.em.kirchhoffs-laws`), i.e. in the region
  // the sweep structurally could not see.
  //
  // `--spread` samples evenly across the WHOLE graph instead, so a run of N
  // covers N domains' worth of ground rather than N adjacent concepts.
  //
  // `order` is the concept's REAL index in the graph, not its position in the
  // sample. It was `i + 1` over the slice, which is the same number only while
  // the slice starts at 0 — a latent trap the moment selection changes, and
  // lesson-init is given this value as the learner's lesson number.
  const all = graph.concepts.map((c, i) => ({ ...c, order: i + 1 }))
  const SPREAD = process.argv.includes('--spread')
  const OFFSET = Number(arg('offset', '0'))
  const topics = SPREAD
    ? Array.from({ length: Math.min(LIMIT, all.length) }, (_, k) =>
        all[Math.floor((k * all.length) / Math.min(LIMIT, all.length))])
    : all.slice(OFFSET, OFFSET + LIMIT)
  console.log(`sweeping ${topics.length} ${SUBJECT} topics, concurrency ${CONCURRENCY}\n`)
  if (CONCURRENCY > 1) {
    console.log(
      '  UNSAFE CONCURRENCY — a session belongs to the ACCOUNT, not the topic, so\n'
      + '  topics will share and end each other\'s sessions. Findings from this run are\n'
      + '  NOT trustworthy: a previous such run invented a cross-concept serve.\n',
    )
  }

  const results: TopicResult[] = []
  const queue = [...topics]
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (;;) {
        const next = queue.shift()
        if (!next) return
        const r = await sweepTopic(next)
        results.push(r)
        const verdict = r.error ? `ERROR ${r.error}`
          : r.findings.length ? `${r.findings.length} FINDING(S)`
          : r.reachedVerified ? 'clean + verified' : 'clean, gate not reached'
        console.log(`  ${r.conceptId.padEnd(32)} ${verdict}`)
      }
    }),
  )

  const summary = summariseSweep(results)

  // ── THE TRANSCRIPT IS THE EVIDENCE ────────────────────────────────────────
  //
  // A finding code is a claim; the turn that produced it is the proof. This
  // harness has twice reported a real-looking engine defect that the actual
  // exchange disproved — a bot-manufactured DEMONSTRATE freeze, and an asset
  // mix-up that was two sessions on one account. Both cost a near-miss fix to
  // production code. `--dump <path>` writes every topic's full ladder,
  // findings and transcript so a verdict can be READ rather than trusted.
  const dumpPath = arg('dump', '')
  if (dumpPath) {
    const { writeFileSync } = await import('fs')
    writeFileSync(dumpPath, JSON.stringify({
      subject: SUBJECT,
      ranAt: new Date().toISOString(),
      results,
    }, null, 2))
    console.log(`\n  transcripts written to ${dumpPath}`)
  }

  console.log('\n── ENGINE FINDINGS ──')
  console.log(`  ${summary.findingsLine}`)
  for (const [code, items] of [...summary.findingsByCode].sort()) {
    console.log(`\n  ${code} × ${items.length}`)
    for (const it of items.slice(0, 4)) console.log(`    ${it.conceptId}: ${it.detail}`)
  }

  if (summary.errored > 0) {
    console.log(`\n── ERRORED (never checked) ──`)
    for (const r of results.filter((x) => x.error)) {
      console.log(`  ${r.conceptId.padEnd(32)} ${r.error}`)
    }
  }

  // Denominator is the topics that COMPLETED. Dividing by the full list would
  // silently blame the engine for topics that never reached it.
  console.log(`\n── LADDER ──\n  reached verified: ${summary.verified}/${summary.checked} checked (${summary.total} requested)`)
  for (const r of results) {
    if (r.error) continue
    console.log(`  ${r.conceptId.padEnd(32)} ${r.ladder.join(' → ')}`)
  }

  console.log('\nNOTE: this checks ENGINE invariants only. "Is the teaching good?"')
  console.log('is a human judgement and is deliberately not automated here.')

  if (summary.inconclusive) {
    console.log('\n⚠ INCONCLUSIVE — this run must not be recorded as a pass.')
  }
  process.exitCode = summary.exitCode
}

void main()
