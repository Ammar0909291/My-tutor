/**
 * PRODUCTION VERIFICATION — FIX-1 / FIX-2, on the OWNER'S REAL ACCOUNT.
 *
 * Does the deployed app now REPORT which evidence its mastery verdict is
 * computed from? Two things are checked against the real product over the real
 * API:
 *
 *   POSITIVE  a server-graded authored probe (the learner TAPS an option)
 *             moves the VERIFIED counters, and the payload says so.
 *   BENIGN    a turn whose correctness was accepted WITHOUT a server grade
 *             moves the PLAIN counters only, and the payload explains the gap
 *             via `unverifiedReason`.
 *
 * ACCOUNT. Driven as the owner's real learner account, per explicit owner
 * instruction. The per-account refusal of this address was REVOKED 2026-09-06
 * (see CLAUDE.md and scripts/certification/measurementIdentity.ts).
 * Credentials come from QA_EMAIL / QA_PASSWORD — never hardcoded here.
 *
 * WHAT IT WILL NOT DO. It does not drive a lesson to completion and never
 * certifies mastery: the loop STOPS the moment both facts are observed, and is
 * hard-capped well below a full lesson. It makes no direct database write —
 * every state change goes through the product's own endpoints. It asserts
 * nothing about teaching quality. The BENIGN case depends on the tutor choosing
 * a free-response question, which a verification script may not manufacture —
 * if it does not occur naturally, that is REPORTED as not-observed, never
 * fabricated, and the deterministic tests remain the proof of that half.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

const CONCEPTS = [
  { conceptId: 'phys.qm.uncertainty-principle', subjectSlug: 'physics' },
  { conceptId: 'phys.mech.conservation-of-momentum', subjectSlug: 'physics' },
]
/** Hard cap. A full lesson needs 1 CHECK + 2 PRACTICE correct answers; this
 *  cannot reach that on both counters and then keep going, and the loop exits
 *  earlier still once the two observations are in hand. */
const MAX_TURNS = 6

interface Mastery {
  verified?: boolean; phase?: string
  checkCorrect?: number; practiceCorrect?: number
  checkRequired?: number; practiceRequired?: number
  verifiedCheckCorrect?: number; verifiedPracticeCorrect?: number
  unverifiedReason?: string | null
}

async function resolveLesson(cookie: string, subjectSlug: string, conceptId: string) {
  const res = await fetch(`${BASE}/api/curriculum?subject=${subjectSlug}`, { headers: { cookie } })
  if (!res.ok) throw new Error(`/api/curriculum ${subjectSlug} -> HTTP ${res.status}`)
  const body = (await res.json()) as { lessons?: Array<Record<string, unknown>> }
  const lessons = body.lessons ?? []
  const l = lessons.find((x) => x.topicSlug === conceptId)
  if (!l) throw new Error(`${conceptId} not found in ${subjectSlug}`)
  return {
    lessonTitle: String(l.lessonTitle), lessonOrder: Number(l.order),
    topicSlug: conceptId, unitTitle: String(l.unitTitle), totalLessons: lessons.length,
  }
}

const m = (p: TurnPayload): Mastery => (p.mastery ?? {}) as Mastery

function row(tag: string, p: TurnPayload): string {
  const x = m(p)
  const fields = x.verifiedCheckCorrect === undefined
    ? 'NEW FIELDS ABSENT'
    : `vCheck=${x.verifiedCheckCorrect} vPractice=${x.verifiedPracticeCorrect} reason=${String(x.unverifiedReason)}`
  return `[${tag}] provider=${p.provider ?? '?'} phase=${x.phase} verified=${x.verified} `
    + `check=${x.checkCorrect}/${x.checkRequired} practice=${x.practiceCorrect}/${x.practiceRequired} `
    + `${fields} mcq=${p.mcq ? 'yes' : 'no'}`
}

async function main() {
  const email = process.env.QA_EMAIL
  const password = process.env.QA_PASSWORD
  if (!email || !password) throw new Error('set QA_EMAIL and QA_PASSWORD')
  const cookie = await login(email, password)
  console.log(`logged in as ${email}`)

  const observed = {
    newFieldsPresent: false,
    verifiedMovedOnServerGrade: false,
    benignDivergenceSeen: false,
    benignReason: null as string | null,
    degradedTurns: 0,
    masteryCertifiedDuringRun: false,
  }

  for (const c of CONCEPTS) {
    if (observed.verifiedMovedOnServerGrade && observed.benignDivergenceSeen) break
    const sessionId = await createSession(cookie, c.subjectSlug)
    const lesson = await resolveLesson(cookie, c.subjectSlug, c.conceptId)
    console.log(`\n=== ${c.conceptId} (lesson ${lesson.lessonOrder}: ${lesson.lessonTitle}) ===`)

    let p = await openLesson(cookie, sessionId, lesson)
    console.log(row('open', p))

    for (let turn = 1; turn <= MAX_TURNS; turn++) {
      if (p.provider === 'fallback' || p.provider === 'degraded') { observed.degradedTurns++; break }
      const prev = m(p)
      // TAP the option when one is offered — that is the server-graded path.
      // Otherwise answer in the learner's own words, the path the benign
      // divergence lives on. No answer key is read: the option is chosen by
      // the product's own ordering, never by correctness.
      const mcq = p.mcq as { question: string; options: string[] } | null | undefined
      const msg = mcq?.options?.length
        ? mcq.options[0]
        : 'In my own words: the quantity stays the same because no external force acts on the system.'
      p = await say(cookie, sessionId, msg)
      const now = m(p)
      console.log(row(`t${turn}${mcq ? ' TAP' : ' PROSE'}`, p))

      if (now.verifiedCheckCorrect !== undefined) observed.newFieldsPresent = true
      if (now.verified === true) observed.masteryCertifiedDuringRun = true

      const plainMoved = (now.checkCorrect ?? 0) > (prev.checkCorrect ?? 0)
        || (now.practiceCorrect ?? 0) > (prev.practiceCorrect ?? 0)
      const verifiedMoved = (now.verifiedCheckCorrect ?? 0) > (prev.verifiedCheckCorrect ?? 0)
        || (now.verifiedPracticeCorrect ?? 0) > (prev.verifiedPracticeCorrect ?? 0)

      if (verifiedMoved) {
        observed.verifiedMovedOnServerGrade = true
        console.log('    ^ POSITIVE: a VERIFIED counter moved on a server-graded answer')
      }
      if (plainMoved && !verifiedMoved) {
        observed.benignDivergenceSeen = true
        observed.benignReason = String(now.unverifiedReason)
        console.log(`    ^ BENIGN DIVERGENCE: plain advanced, verified did not — reason=${now.unverifiedReason}`)
      }
      if (p.lessonComplete) { console.log(`    lessonComplete=${JSON.stringify(p.lessonComplete)}`); break }
      // Stop as soon as both facts are in hand — never keep driving toward a
      // verdict this script has no business producing.
      if (observed.verifiedMovedOnServerGrade && observed.benignDivergenceSeen) break
    }
  }

  console.log('\n=== OBSERVED ===')
  console.log(JSON.stringify(observed, null, 2))
  if (!observed.newFieldsPresent) { console.log('FAIL — the new payload fields never appeared'); process.exit(1) }
  if (!observed.benignDivergenceSeen) {
    console.log('NOTE — the benign divergence did not occur naturally in this run. NOT fabricated;')
    console.log('       masteryCounterDisplayDivergence.test.ts remains the proof of that half.')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
