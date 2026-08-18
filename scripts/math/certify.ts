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
}

interface TurnPayload {
  text?: string
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  lessonComplete?: { complete?: boolean } | null
  visual?: unknown
  sceneSpec?: unknown
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
function hasMalformedLatex(text: string): boolean {
  if (/\$[^$\n]*\\\(/.test(text)) return true            // \( nested inside $…$
  if (/\\\([^)]*\$/.test(text)) return true              // $ inside \(…\)
  const dollars = (text.match(/(?<!\\)\$/g) ?? []).length
  if (dollars % 2 === 1) return true                     // unbalanced $
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
  let turns = 0
  let last: TurnPayload

  const check = (p: TurnPayload) => {
    const text = p.text ?? ''
    const hasFigure = Boolean(p.visual) || Boolean(p.sceneSpec)
    if (REFERENCES_FIGURE.test(text) && !hasFigure && !failed.includes('D6-missing-figure')) {
      failed.push('D6-missing-figure')
      notes.push(`referenced a figure with none attached: ${(text.match(REFERENCES_FIGURE) ?? [''])[0]}`)
    }
    if (hasMalformedLatex(text) && !failed.includes('D6-latex')) {
      failed.push('D6-latex'); notes.push('malformed LaTeX in learner-facing text')
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

    let reply: string
    if (last.mcq) {
      reply = String.fromCharCode(65 + last.mcq.correctIndex)
    } else {
      // D2 — a mastery-phase turn that asks without a structured MCQ cannot be
      // graded however well it is answered. Recorded once; the harness then
      // says "ready" so the lesson can continue and D3 stays measurable.
      const asksSomething = /\?/.test(last.text ?? '')
      if ((phase === 'CHECK' || phase === 'PRACTICE') && asksSomething && !failed.includes('D2-ungradeable')) {
        failed.push('D2-ungradeable')
        notes.push(`ungradeable question at ${phase}: ${(last.text ?? '').slice(-110).replace(/\n/g, ' ')}`)
      }
      reply = 'ready'
    }

    last = await post('/api/learn/chat', { sessionId, message: reply }, cookie)
    check(last)
    turns += 1

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
  }
  if (!verified) { failed.push('D4-not-verified') }
  else if (last.lessonComplete?.complete !== true) {
    failed.push('D4-inconsistent'); notes.push('mastery verified but the lesson did not close')
  }

  return {
    conceptId: target.conceptId, pass: failed.length === 0, failed,
    turns, finalPhase, checkCorrect, practiceCorrect, verified, notes,
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

async function login(): Promise<string> {
  if (!EMAIL || !PASSWORD) throw new Error('set MATH_CERT_COOKIE, or MATH_CERT_EMAIL and MATH_CERT_PASSWORD')
  if (FORBIDDEN_ACCOUNTS.includes(EMAIL.toLowerCase())) {
    throw new Error(`${EMAIL} is an engineering account and must never be used for certification`)
  }
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  const { csrfToken } = (await csrfRes.json()) as { csrfToken: string }
  const jar = (csrfRes.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ')
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const session = (res.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0])
  const all = [...jar.split('; ').filter(Boolean), ...session].join('; ')
  if (!/session-token/.test(all)) throw new Error('login failed — no session cookie returned')
  return all
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
        notes: [String(err)],
      })
      process.stderr.write(`HARNESS-ERROR\n`)
    }
  }

  const passed = results.filter((r) => r.pass).length
  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    baseUrl: BASE, total: results.length, passed, failed: results.length - passed, results,
  }, null, 2))
  process.stderr.write(`\n${passed}/${results.length} PASS\n`)
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1) })
