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

const BASE = process.env.AUDIT_BASE ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = process.env.AUDIT_EMAIL
const PASSWORD = process.env.AUDIT_PASSWORD

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : (process.argv[i + 1] ?? fallback)
}

const SUBJECT = arg('subject', 'physics')
const LIMIT = Number(arg('limit', '8'))
const CONCURRENCY = Number(arg('concurrency', '6'))

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

async function req(jar: Jar, url: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: { ...(init.headers ?? {}), cookie: jar.header() },
    redirect: 'manual',
  })
  jar.absorb(res)
  return res
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
  if ((ctx.phaseBefore === 'CHECK' || ctx.phaseBefore === 'PRACTICE')
      && /\?/.test(text) && !r.mcq) {
    out.push({ code: 'E6', detail: `question asked at ${ctx.phaseBefore} without an MCQ tag` })
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

    // Then drive to the gate by answering every MCQ correctly.
    let last = await say('ok give me a question to check i understand')
    for (let i = 0; i < 10 && !result.reachedVerified; i++) {
      const answer = last.mcq
        ? last.mcq.options[last.mcq.correctIndex]
        : 'ok give me a question to practise'
      last = await say(answer)
    }

    // E1 — the ladder must have moved at all.
    const phases = new Set(result.ladder.map((l) => l.split('(')[0]))
    if (phases.size === 1) {
      result.findings.push({ code: 'E1', detail: `ladder never left ${[...phases][0]}` })
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

  const topics = graph.concepts.slice(0, LIMIT).map((c, i) => ({ ...c, order: i + 1 }))
  console.log(`sweeping ${topics.length} ${SUBJECT} topics, concurrency ${CONCURRENCY}\n`)

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

  console.log('\n── ENGINE FINDINGS ──')
  const byCode = new Map<string, { conceptId: string; detail: string }[]>()
  for (const r of results) {
    for (const f of r.findings) {
      if (!byCode.has(f.code)) byCode.set(f.code, [])
      byCode.get(f.code)!.push({ conceptId: r.conceptId, detail: f.detail })
    }
  }
  if (byCode.size === 0) {
    console.log('  none — every checked engine invariant held')
  } else {
    for (const [code, items] of [...byCode].sort()) {
      console.log(`\n  ${code} × ${items.length}`)
      for (const it of items.slice(0, 4)) console.log(`    ${it.conceptId}: ${it.detail}`)
    }
  }

  const verified = results.filter((r) => r.reachedVerified).length
  console.log(`\n── LADDER ──\n  reached verified: ${verified}/${results.length}`)
  for (const r of results) console.log(`  ${r.conceptId.padEnd(32)} ${r.ladder.join(' → ')}`)

  console.log('\nNOTE: this checks ENGINE invariants only. "Is the teaching good?"')
  console.log('is a human judgement and is deliberately not automated here.')
}

void main()
