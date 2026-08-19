/**
 * THE CERTIFICATION HARNESS — is this concept actually ready for a learner?
 *
 * ── WHY IT DRIVES THE REAL ENDPOINT ─────────────────────────────────────────
 * `VALIDATION_FRAMEWORK_P10.md` records that this repo's vitest suite tests
 * REPLICAS of LLM-adjacent logic rather than the live modules, and names the
 * resulting replica-drift as an open risk. A harness that asserted against a
 * replica would inherit exactly that risk, so this one holds a session against
 * the deployed app and reads what a learner would actually receive.
 *
 * ── WHAT "CERTIFIED" MEANS HERE ─────────────────────────────────────────────
 * Not coverage. Not asset presence. A concept is certified when a competent
 * learner can start it, be taught, answer, be graded, and finish — which is
 * D1..D6 below. An ACTIVE asset is not a certified concept; that distinction is
 * the whole point of this file.
 *
 *   D1  taught before quizzed        the opening turn teaches, it does not quiz
 *   D2  every counted question is gradeable
 *                                    a mastery-phase question always carries a
 *                                    structured MCQ, never prose alone
 *   D3  CHECK -> TRANSFER reachable  without unbounded repetition
 *   D4  mastery agrees               verified === true and the lesson closes
 *   D5  band-appropriate content     REQUIRES a database; reported, not guessed
 *   D6  runtime quality              no referenced-but-missing figure, no
 *                                    malformed LaTeX in learner-facing text
 *
 * ── HOW IT ANSWERS ──────────────────────────────────────────────────────────
 * Correctly, from the `correctIndex` the API already returns. That is
 * legitimate: this measures the MACHINERY on a learner who knows the answer,
 * so any failure is the system's and never the learner's. It deliberately does
 * NOT answer a prose-only question — refusing is how D2 is detected rather than
 * papered over.
 *
 * Read-only with respect to the corpus: it creates ordinary learner traffic and
 * writes no assets, no schema and no content.
 */

import { askedAnswerableQuestion } from '../../src/lib/teaching/answerableTurn'
// The product owns the string that names a degraded turn; this reads it rather
// than matching on template prose, so the two cannot drift apart.
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'
import { containsOptionList } from '../../src/lib/teaching/gateProbeContract'

const BASE = process.env.MATH_CERT_BASE_URL ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = process.env.MATH_CERT_EMAIL ?? ''
const PASSWORD = process.env.MATH_CERT_PASSWORD ?? ''

/**
 * The engineering account is not a learner and must never appear in a
 * certification record. Enforced here rather than left to discipline, because
 * every prior mix-up in this project was a discipline failure, not a knowledge
 * failure.
 */
const FORBIDDEN_ACCOUNTS = ['suaibamr@gmail.com']

/** A lesson that cannot finish inside this many learner turns has failed D3. */
const MAX_TURNS = 24

export interface ConceptTarget { conceptId: string; lessonTitle: string; lessonOrder: number; unitTitle: string }

/** The complete offending turn, kept so a failure can be judged rather than guessed at. */
export interface TurnEvidence {
  criterion: string
  phase: string
  turn: number
  text: string
}

/**
 * One row per learner turn: what the engine said the ladder was, and whether it
 * offered something answerable. A D3 failure without this is a verdict with no
 * evidence — the same gap that made the first sweep's D6 hits unjudgeable.
 */
export interface LadderStep {
  turn: number
  phase: string | null
  checkCorrect: number
  practiceCorrect: number
  /** what the harness was able to send back: a graded choice, or 'ready' */
  answered: 'mcq' | 'ready'
}

export interface CertificationResult {
  conceptId: string
  pass: boolean
  failed: string[]
  turns: number
  finalPhase: string | null
  checkCorrect: number
  practiceCorrect: number
  verified: boolean
  notes: string[]
  evidence: TurnEvidence[]
  ladder: LadderStep[]
}

interface TurnPayload {
  text?: string
  /** 'degraded' when every AI provider failed and a template was served. */
  provider?: string | null
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  lessonComplete?: { complete?: boolean } | null
  // EVERY figure channel the route can send, taken from the response literal
  // rather than from memory. The first version of this harness knew only
  // `visual` and `sceneSpec`, so a 'spec'-rendered figure was invisible to it —
  // it reported a lesson as having shown nothing while the learner was looking
  // at a diagram, and then failed the lesson for referring to it.
  visual?: unknown
  visualSpec?: unknown
  sceneSpec?: unknown
  dynamicVisualizationCode?: unknown
}

/** Did this turn put a figure in front of the learner, by any renderer? */
function carriesFigure(p: TurnPayload): boolean {
  return Boolean(p.visual) || Boolean(p.visualSpec) || Boolean(p.sceneSpec)
    || Boolean(p.dynamicVisualizationCode)
}

// ── D6 detectors ────────────────────────────────────────────────────────────

/**
 * The tutor pointing at a figure that is not there. Observed in production:
 * "Look at the Deductive Reasoning Flow on your screen" on a turn whose payload
 * carried no visual and no sceneSpec.
 */
const REFERENCES_FIGURE =
  /\b(on your screen|in the (?:diagram|figure|graph|picture|image)|look at the (?:diagram|figure|graph|picture|image)|shown (?:above|below)|the (?:diagram|figure|graph) (?:above|below))\b/i

/**
 * LaTeX that these renderers PRINT rather than typeset, and malformed
 * delimiters. Observed shipped to a learner: `$a:b\(as\)b:a$`.
 */
export function hasMalformedLatex(text: string): boolean {
  // A DOLLAR SIGN IN FRONT OF A DIGIT IS MONEY, NOT A DELIMITER.
  //
  // Both D6-latex failures in the first full sweep were this, and both were
  // wrong. Measured on math.arith.order-of-operations:
  //
  //   "you buy 3 pens for $2 each, plus a notebook for $5. To find the total
  //    cost, you write down an expression … : \(3 \times 2 + 5\)."
  //
  // Perfectly good LaTeX, and a shopping example — which is the natural way to
  // teach order of operations. The old rules read "$5 … \(" as a delimiter
  // nested inside a math span and failed the lesson for it. A subject taught
  // through money examples would fail this check forever.
  //
  // Currency is removed first so the delimiter rules see only real delimiters.
  const withoutCurrency = text.replace(/\$(?=\d)/g, '')

  if (/\$[^$\n]*\\\(/.test(withoutCurrency)) return true   // \( nested inside $…$
  if (/\\\([^)]*\$/.test(withoutCurrency)) return true     // $ inside \(…\)
  const dollars = (withoutCurrency.match(/(?<!\\)\$/g) ?? []).length
  if (dollars % 2 === 1) return true                    // unbalanced $
  return false
}

// ── transport ───────────────────────────────────────────────────────────────

async function post(pathname: string, body: unknown, cookie: string): Promise<TurnPayload> {
  const res = await fetch(`${BASE}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${pathname} -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return (await res.json()) as TurnPayload
}

/**
 * Certify one concept. Returns a verdict; never throws for a teaching failure —
 * a failed concept is data, not an error.
 */
/**
 * A FRESH session per concept, always.
 *
 * The first run of this harness reused one session across concepts and reported
 * math.found.logic as TRANSFER / verified / checkCorrect 1 / practiceCorrect 2
 * after a SINGLE turn — it was reading the mastery the PREVIOUS concept had
 * earned in that session. At scale that is worse than a broken harness: it
 * manufactures PASSes for concepts nobody taught. Certification must start from
 * a learner who knows nothing about this concept, so the session is created
 * here and never shared.
 */
async function createSession(cookie: string): Promise<string> {
  const res = await fetch(`${BASE}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: 'mathematics' }),
  })
  if (!res.ok) throw new Error(`/api/sessions -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const body = (await res.json()) as { data?: { id?: string }; id?: string; resumed?: boolean }
  const id = body.data?.id ?? body.id
  if (!id) throw new Error(`/api/sessions returned no session id: ${JSON.stringify(body).slice(0, 200)}`)
  // The endpoint RESUMES any ACTIVE session for the subject from the last 24
  // hours rather than minting a new one, and says so. A resumed session carries
  // the previous concept's ladder, which is the condition `DIRTY-STATE` below
  // exists to catch.
  return id
}

export async function certifyConcept(
  target: ConceptTarget, cookie: string, sessionId: string,
): Promise<CertificationResult> {
  const failed: string[] = []
  const notes: string[] = []
  /** Full text of every turn that tripped a criterion, so a FAIL is diagnosable. */
  const evidence: TurnEvidence[] = []
  const ladder: LadderStep[] = []
  let turns = 0
  let last: TurnPayload

  // A REFERENCE TO A FIGURE SHOWN EARLIER IS NOT THE SAME DEFECT.
  //
  // The runtime deliberately does not re-attach a HELD figure — one message owns
  // it, so the transcript does not repeat the same diagram under every reply —
  // and the tutor is explicitly told it may still refer to it. A turn carrying
  // no payload can therefore be pointing at something the learner really does
  // have, just further up.
  //
  // So "no figure on THIS turn" is not enough to call it a lie. What matters is
  // whether the lesson has EVER shown one before that point: if it has not, the
  // reference cannot be true. If it has, the reference may merely be stale
  // (upstream's own finding: a figure belongs to a message and scrolls away,
  // fastest on a phone), which is a real but different problem and is recorded
  // as an observation rather than a failure.
  //
  // Two runs were misread before this distinction existed, so it is drawn here
  // rather than argued about afterwards.
  let figureShownByTurn = -1
  const staleReferences: TurnEvidence[] = []

  const check = (p: TurnPayload) => {
    const text = p.text ?? ''
    const hasFigure = carriesFigure(p)
    if (hasFigure && figureShownByTurn < 0) figureShownByTurn = turns
    if (REFERENCES_FIGURE.test(text) && !hasFigure) {
      const everShown = figureShownByTurn >= 0
      const item: TurnEvidence = {
        criterion: everShown ? 'D6-stale-reference' : 'D6-missing-figure',
        phase: String(p.mastery?.phase ?? ''), turn: turns, text,
      }
      if (!everShown && !failed.includes('D6-missing-figure')) {
        failed.push('D6-missing-figure')
        notes.push(
          'referenced a figure this lesson has never shown: ' +
          `${(text.match(REFERENCES_FIGURE) ?? [''])[0]}`,
        )
        evidence.push(item)
      } else if (everShown && staleReferences.length === 0) {
        notes.push(
          `referenced a figure last attached on turn ${figureShownByTurn} — ` +
          'possibly still on screen, possibly scrolled away; recorded, not failed',
        )
        staleReferences.push(item)
      }
    }
    if (hasMalformedLatex(text) && !failed.includes('D6-latex')) {
      failed.push('D6-latex')
      notes.push('malformed LaTeX in learner-facing text')
      // The turn, not just the verdict. This path was the one place a failure
      // still reported without its evidence, so the first two D6-latex hits in
      // the full sweep could not be judged at all — which is the same mistake
      // the 110-character slice made, in the one branch that had not been
      // fixed with it.
      evidence.push({
        criterion: 'D6-latex', phase: String(p.mastery?.phase ?? ''), turn: turns, text,
      })
    }
  }

  // `mode: 'restart'` rather than 'next': certification must begin from a
  // learner who knows nothing about THIS concept, and the endpoint hands back an
  // existing ACTIVE session for the subject rather than minting a new one, so a
  // fresh session cannot be relied on for isolation.
  last = await post('/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: target.lessonTitle,
    lessonOrder: target.lessonOrder, topicSlug: target.conceptId,
    unitTitle: target.unitTitle, totalLessons: 908, completedLessons: [], teachingLanguage: 'en',
  }, cookie)
  check(last)

  // D1 — the opening turn teaches. A quiz-first opener is a first-lesson
  // violation and is judged on the opener alone, before any answer exists.
  if (last.mcq) { failed.push('D1-quiz-first'); notes.push('opening turn led with an MCQ') }

  // MASTERY FROM lesson-init IS NOT THIS CONCEPT'S MASTERY.
  //
  // The opening response carries the snapshot as it stood BEFORE this lesson
  // began — on the first run of this harness that was the previous concept's
  // finished state, so math.found.logic was reported TRANSFER / verified /
  // check 1 / practice 2 after zero teaching. The ladder resets on the first
  // chat turn, so mastery is only read from turns, never from the opener.
  last = { ...last, mastery: null, lessonComplete: null }

  while (turns < MAX_TURNS) {
    const phase = last.mastery?.phase ?? null
    if (last.mastery?.verified === true || last.lessonComplete?.complete === true) break

    // ── AN OUTAGE IS NOT A TEACHING VERDICT ───────────────────────────────
    //
    // MEASURED. A nine-concept sweep exhausted the provider quota partway
    // through, and every concept after that point reported an IDENTICAL
    // D3-unreachable: 24 turns, phase still OBSERVE, check 0, practice 0.
    // Production logs for the same window:
    //
    //   [ai/attempt] provider=gemini http_status=429 error_name=AIRateLimitError
    //   [ai/router]  all providers failed: Rate limit exceeded on gemini
    //   [learn/chat] all providers down — serving degraded template (RS P-3)
    //
    // The engine was never reached. Reporting that as D3 would have condemned
    // the teaching ladder for an infrastructure fault — the exact mistake this
    // file has already been burned by three times (the manufactured DEMONSTRATE
    // freeze, the parallel-session asset mix-up, the currency-as-delimiter
    // LaTeX check), each of which nearly produced a fix for a defect that did
    // not exist. The run stops here and says so.
    if (isDegradedProvider(last.provider)) {
      failed.push('INFRASTRUCTURE-degraded')
      notes.push(
        'every AI provider failed and a degraded template was served — the ' +
        'teaching engine was not exercised, so this concept is NOT certified ' +
        'and is NOT a teaching failure. Re-run when the provider recovers.',
      )
      evidence.push({
        criterion: 'INFRASTRUCTURE-degraded', phase: String(phase), turn: turns, text: last.text ?? '',
      })
      break
    }

    let reply: string
    if (last.mcq) {
      reply = String.fromCharCode(65 + last.mcq.correctIndex)
    } else {
      // D2 — a mastery-phase turn that asks without a structured MCQ cannot be
      // graded however well it is answered. Recorded once; the harness then
      // says "ready" so the lesson can continue and D3 stays measurable.
      //
      // MEASURED FALSE POSITIVE, and the reason this is not a bare "?" test.
      // The first run flagged math.geom.coordinate-plane on the turn
      // "...known as Quadrant II. So you're saying the correct choice is option
      // A — have I got that right?" — a CONFIRMATION, not a mastery question,
      // and one the runtime deliberately leaves alone. A harness that cries
      // wolf on a correct turn is worse than no harness, so this reuses the
      // same judgement the runtime makes (`askedAnswerableQuestion`, which
      // already excludes confirmation tails) plus the option-list detector that
      // catches a prose MCQ with no question mark at all.
      const text = last.text ?? ''
      const asksSomething = askedAnswerableQuestion(text) || containsOptionList(text)
      if ((phase === 'CHECK' || phase === 'PRACTICE') && asksSomething && !failed.includes('D2-ungradeable')) {
        failed.push('D2-ungradeable')
        notes.push(`ungradeable question at ${phase}`)
        // THE WHOLE TURN, NOT A SLICE. The first run recorded the last 110
        // characters with newlines flattened, and that was not enough to tell a
        // genuine prose MCQ from a confirmation tail — the one judgement the
        // note existed to support. A failure the harness cannot diagnose is a
        // failure it has only half-reported.
        evidence.push({ criterion: 'D2-ungradeable', phase: String(phase), turn: turns + 1, text })
      }
      reply = 'ready'
    }

    last = await post('/api/learn/chat', { sessionId, message: reply }, cookie)
    check(last)
    turns += 1
    ladder.push({
      turn: turns,
      phase: last.mastery?.phase ?? null,
      checkCorrect: last.mastery?.checkCorrect ?? 0,
      practiceCorrect: last.mastery?.practiceCorrect ?? 0,
      answered: reply === 'ready' ? 'ready' : 'mcq',
    })

    // ── CERTIFICATION MUST START FROM A LEARNER WHO KNOWS NOTHING ──────────
    //
    // A false PASS is worse than no harness. Measured here twice: reusing a
    // session made math.found.logic report TRANSFER / verified / check 1 /
    // practice 2 on the FIRST turn — it was reading the ladder a previous run
    // had left behind, and reported PASS for a concept nobody taught.
    //
    // `/api/sessions` resumes any ACTIVE session for the subject from the last
    // 24 hours, and `mode: 'restart'` does not clear the stored conversation
    // state, so isolation cannot be assumed — it has to be checked. Mastery
    // that is already at or past the gate one turn in did not come from this
    // run, so the concept is reported DIRTY-STATE rather than certified.
    if (turns === 1 && (last.mastery?.verified === true || (last.mastery?.checkCorrect ?? 0) > 0)) {
      failed.push('DIRTY-STATE')
      notes.push(
        `session carried prior mastery into turn 1 (phase ${last.mastery?.phase}, ` +
        `check ${last.mastery?.checkCorrect}, practice ${last.mastery?.practiceCorrect}) — ` +
        'not certified; certification needs a learner with no history on this concept',
      )
      break
    }
  }

  const m = last.mastery ?? {}
  const verified = m.verified === true
  const finalPhase = m.phase ?? null
  const checkCorrect = m.checkCorrect ?? 0
  const practiceCorrect = m.practiceCorrect ?? 0

  if (turns >= MAX_TURNS && !verified) {
    failed.push('D3-unreachable'); notes.push(`did not finish within ${MAX_TURNS} turns`)
    // THE TURN, NOT THE VERDICT — the same rule D2 and D6 already follow. A
    // lesson that runs out the limit is the one failure most likely to be the
    // HARNESS rather than the product (it answers 'ready' whenever no MCQ is
    // offered, which is not what a learner would say), and that cannot be told
    // apart without reading what the tutor actually sent.
    evidence.push({
      criterion: 'D3-unreachable', phase: String(finalPhase), turn: turns, text: last.text ?? '',
    })
  }
  if (!verified) { failed.push('D4-not-verified') }
  else if (last.lessonComplete?.complete !== true) {
    failed.push('D4-inconsistent'); notes.push('mastery verified but the lesson did not close')
  }

  return {
    conceptId: target.conceptId, pass: failed.length === 0, failed,
    turns, finalPhase, checkCorrect, practiceCorrect, verified, notes,
    evidence: [...evidence, ...staleReferences], ladder,
  }
}

/**
 * A session cookie, however it is obtained.
 *
 * MATH_CERT_COOKIE is the supported path and is checked first: the credentials
 * flow below reimplements Auth.js's callback handshake, which is version-coupled
 * and fails silently when it drifts. A harness that cannot log in reports a
 * fleet of HARNESS-ERRORs that look exactly like teaching failures, so the
 * robust path is the default one.
 *
 * The account is verified against /api/auth/session either way — the forbidden
 * account must be refused whether it arrived as a password or as a cookie.
 */
async function authenticate(): Promise<string> {
  const cookie = process.env.MATH_CERT_COOKIE ? process.env.MATH_CERT_COOKIE : await login()
  const res = await fetch(`${BASE}/api/auth/session`, { headers: { cookie } })
  const who = (await res.json()) as { user?: { email?: string; name?: string } }
  const email = who.user?.email
  if (!email) throw new Error('not authenticated — no session for the supplied cookie')
  if (FORBIDDEN_ACCOUNTS.includes(email.toLowerCase())) {
    throw new Error(`${email} is an engineering account and must never be used for certification`)
  }
  process.stderr.write(`authenticated as ${who.user?.name} <${email}>\n`)
  return cookie
}

/**
 * A COOKIE JAR, NOT A CONCATENATION.
 *
 * `/api/auth/csrf` was observed returning the SAME cookie name twice with two
 * DIFFERENT values in one response:
 *
 *   __Host-authjs.csrf-token=4e0a723d…
 *   __Host-authjs.csrf-token=3f5a39a5…
 *
 * Joining every Set-Cookie into one header sends both, the server reads the
 * first, the JSON body carried the second, and the login is rejected with
 * `MissingCSRF` — which is what this harness reported as "login failed" and is
 * why it could not be run at all. A browser and curl both keep ONE value per
 * name (last write wins), so this does the same. Later writes of a name
 * override earlier ones, and a deletion (empty value) removes it.
 */
export function mergeCookies(...sources: readonly (readonly string[])[]): string {
  const jar = new Map<string, string>()
  for (const source of sources) {
    for (const raw of source) {
      const pair = raw.split(';')[0]
      const eq = pair.indexOf('=')
      if (eq <= 0) continue
      const name = pair.slice(0, eq).trim()
      const value = pair.slice(eq + 1).trim()
      if (!value) jar.delete(name)
      else jar.set(name, value)
    }
  }
  return [...jar].map(([n, v]) => `${n}=${v}`).join('; ')
}

/** The `<token>` half of the `<token>|<hash>` csrf cookie the jar will send. */
export function csrfTokenFromJar(jar: string): string | null {
  for (const pair of jar.split('; ')) {
    const eq = pair.indexOf('=')
    if (eq <= 0) continue
    if (!/csrf-token$/.test(pair.slice(0, eq).trim())) continue
    const value = decodeURIComponent(pair.slice(eq + 1).trim())
    return value.split('|')[0] || null
  }
  return null
}

async function login(): Promise<string> {
  if (!EMAIL || !PASSWORD) throw new Error('set MATH_CERT_COOKIE, or MATH_CERT_EMAIL and MATH_CERT_PASSWORD')
  if (FORBIDDEN_ACCOUNTS.includes(EMAIL.toLowerCase())) {
    throw new Error(`${EMAIL} is an engineering account and must never be used for certification`)
  }
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  const body = (await csrfRes.json()) as { csrfToken: string }
  const jar = mergeCookies(csrfRes.headers.getSetCookie?.() ?? [])
  // The token is taken from the COOKIE THAT WILL BE SENT, not from the JSON
  // body: when the endpoint answers twice, the body carries one response's
  // token and the jar keeps the other's, and the two must agree or the POST is
  // rejected. The cookie's value is `<token>|<hash>`; the form wants `<token>`.
  const csrfToken = csrfTokenFromJar(jar) ?? body.csrfToken
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), res.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error('login failed — no session cookie returned')
  return all
}

/**
 * The three outcomes a certification run can produce. Exported so the split is
 * testable: an outage counted as a teaching failure turns the pass rate into a
 * measure of the AI quota, which is how a nine-concept sweep produced four
 * identical D3 verdicts against an engine that was never reached.
 */
export type CertificationOutcome = 'pass' | 'teaching-failure' | 'unmeasured'

export function classifyOutcome(
  result: Pick<CertificationResult, 'pass' | 'failed'>,
): CertificationOutcome {
  if (result.failed.includes('INFRASTRUCTURE-degraded')) return 'unmeasured'
  return result.pass ? 'pass' : 'teaching-failure'
}

async function main() {
  const targets: ConceptTarget[] = JSON.parse(
    require('fs').readFileSync(process.argv[2] ?? 'scripts/math/targets.json', 'utf-8'),
  )
  const cookie = await authenticate()

  const results: CertificationResult[] = []
  for (const t of targets) {
    process.stderr.write(`certifying ${t.conceptId} … `)
    try {
      const sessionId = await createSession(cookie)
      const r = await certifyConcept(t, cookie, sessionId)
      results.push(r)
      process.stderr.write(`${r.pass ? 'PASS' : `FAIL [${r.failed.join(', ')}]`} (${r.turns} turns)\n`)
    } catch (err) {
      results.push({
        conceptId: t.conceptId, pass: false, failed: ['HARNESS-ERROR'], turns: 0,
        finalPhase: null, checkCorrect: 0, practiceCorrect: 0, verified: false,
        notes: [String(err)], evidence: [], ladder: [],
      })
      process.stderr.write(`HARNESS-ERROR\n`)
    }
  }

  const passed = results.filter((r) => r.pass).length
  // Three outcomes, not two. A concept the provider outage prevented from being
  // taught is UNMEASURED — counting it as a teaching failure would make the
  // pass rate a measure of the AI quota rather than of the engine.
  const degraded = results.filter((r) => classifyOutcome(r) === 'unmeasured')
  const teachingFailures = results.filter((r) => classifyOutcome(r) === 'teaching-failure')
  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    baseUrl: BASE,
    total: results.length,
    passed,
    failed: teachingFailures.length,
    unmeasured: degraded.length,
    results,
  }, null, 2))
  process.stderr.write(
    `\n${passed}/${results.length} PASS` +
    `, ${teachingFailures.length} teaching failure(s)` +
    `, ${degraded.length} UNMEASURED (provider outage)\n`,
  )
  if (degraded.length > 0) {
    process.stderr.write(
      'The provider was rate-limited during this run. The unmeasured concepts ' +
      'were never taught and must be re-run before any verdict is drawn.\n',
    )
  }
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
