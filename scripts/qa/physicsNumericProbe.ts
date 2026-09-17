/**
 * Physics Verifier — numeric/arithmetic-consistency check, MEASUREMENT PASS.
 *
 * Before writing a single line of a new checker, this asks the question the
 * dimensional check's own Batch 4 asked: does the pattern the checker would
 * need to fire on actually occur in real generated tutor prose? Building an
 * "arithmetic self-consistency" checker (does a stated numeric substitution
 * into an equation actually compute to the stated result — e.g. "F = ma =
 * 2 kg x 5 m/s^2 = 15 N" is arithmetically WRONG, 2x5=10) needs NO authored
 * tolerance data (unlike order-of-magnitude/sign/limiting-case checks, which
 * the design doc's own S5.7 correctly defers as content work) -- but it is
 * still worthless to build if the tutor never states this shape at all.
 *
 * This is a disposable-account, manufactured-observation script in the same
 * family as DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md S6.2's Batch 4 for the
 * dimensional check: drive real phys.* lessons with turns that EXPLICITLY
 * invite a worked numeric example, and scan the tutor's own text for the
 * pattern a checker would need (>=2 "quantity = number unit" assignments in
 * one reply, joined by an equation).
 *
 * Zero product code touched. Zero enforcement. Read-only measurement.
 *
 * FOLLOW-UP RUN (FOUR_PRIMITIVES_HANDOVER.md's own named Batch 7 next step):
 * the first run sampled 2 lessons from one domain (phys.mech.*) with 3
 * eliciting turns -> 8 replies, 1 checkable identity, correct. Too thin to
 * conclude anything. This run widens BOTH axes it flagged as thin: more
 * concepts (2 lessons each, across 3 arithmetic-heavy domains — mech/em/therm
 * — rather than mech alone, since those are the domains where a numeric
 * worked example is most likely to occur at all) and more aggressive
 * elicitation (5 turns instead of 3, adding two that explicitly ask the tutor
 * to CHECK its own arithmetic rather than just show one). Still deliberately
 * bounded — not a full-corpus sweep — matching every prior batch's "small,
 * additive" discipline and this project's own recorded provider-capacity
 * ceiling for large sweeps.
 *
 * Run: npx tsx scripts/qa/physicsNumericProbe.ts
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

interface CurriculumLesson {
  topicSlug: string
  order: number
  lessonTitle: string
  unitTitle: string
}

interface Payload {
  text?: string
  lessonComplete?: unknown
  [k: string]: unknown
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

// CORRECTED after a first run's null result turned out to be a detector
// artifact, not an absence of signal (see the design-doc addendum this
// script's companion measurement produced). The tutor's real shape is a
// PLAIN ARITHMETIC SENTENCE using concrete digit+unit quantities joined by
// an operator and an equals sign -- "3 m + 2 m = 5 m" -- not a symbolic
// "letter = number" assignment. This pattern requires at least one
// arithmetic operator BEFORE the "=" to avoid matching a single bare
// quantity mention (which is not checkable arithmetic on its own).
const ARITHMETIC_IDENTITY_RE = /-?\d+(\.\d+)?\s*[A-Za-zΩμ°%]*\s*[+\-−]\s*-?\d+(\.\d+)?\s*[A-Za-zΩμ°%]*\s*=\s*-?\d+(\.\d+)?\s*[A-Za-zΩμ°%]*/g

function countNumericAssignments(text: string): number {
  const matches = text.match(ARITHMETIC_IDENTITY_RE)
  return matches ? matches.length : 0
}

const ELICITING_TURNS = [
  'can you show me a worked numerical example with actual numbers plugged in',
  'ok can you give me another worked example with different numbers',
  'can you calculate it step by step with numbers so i can check the arithmetic',
  'walk me through every step of that calculation and check it carefully for any mistakes',
  'please verify that arithmetic is correct — redo the calculation and confirm the numbers',
]

// Domains most likely to actually contain a worked numeric example at all —
// widened from mech-only after the first run's thin (1/8) sample. astro/
// particle/rel/qm skew qualitative at the concepts this account's level
// would reach; mech/em/therm are the classic plug-numbers-into-an-equation
// domains (F=ma, V=IR, Q=mcΔT).
const PROBE_DOMAIN_PREFIXES = ['phys.mech.', 'phys.em.', 'phys.therm.']

async function probeLesson(cookie: string, lesson: CurriculumLesson, totalLessons: number) {
  const session = await api(cookie, 'POST', '/api/sessions', { subjectSlug: 'physics' })
  const sessionId = (session.data as { id: string }).id
  const findings: { turn: string; sent: string; numericAssignments: number; snippet: string }[] = []
  try {
    let last = await api(cookie, 'POST', '/api/learn/lesson-init', {
      sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons, completedLessons: [],
      teachingLanguage: 'en',
    })
    const t0Count = countNumericAssignments(String(last.text ?? ''))
    findings.push({ turn: 'T0', sent: '(lesson-init)', numericAssignments: t0Count, snippet: String(last.text ?? '').slice(0, 400) })

    for (let i = 0; i < ELICITING_TURNS.length; i += 1) {
      const msg = ELICITING_TURNS[i]
      const p = await api(cookie, 'POST', '/api/learn/chat', { sessionId, message: msg })
      const text = String(p.text ?? '')
      findings.push({ turn: `T${i + 1}`, sent: msg, numericAssignments: countNumericAssignments(text), snippet: text.slice(0, 500) })
      last = p
      if (p.lessonComplete) break
    }
  } finally {
    await api(cookie, 'POST', '/api/sessions/end', { sessionId }).catch(() => {})
  }
  return findings
}

async function main() {
  const acct = await createQaAccount('numeric-probe')
  console.log(`Created disposable account: ${acct.email}`)
  try {
    const cur = (await api(acct.cookie, 'GET', '/api/curriculum?subject=physics')) as unknown as { lessons: CurriculumLesson[] }

    // 2 lessons (first + middle) per domain, across the 3 domains above —
    // widened from 1 domain / 2 lessons in the first run.
    const picks: CurriculumLesson[] = []
    for (const prefix of PROBE_DOMAIN_PREFIXES) {
      const domainLessons = cur.lessons.filter((l) => l.topicSlug.startsWith(prefix))
      const chosen = [domainLessons[0], domainLessons[Math.floor(domainLessons.length / 2)]].filter(Boolean)
      picks.push(...chosen)
    }

    let totalReplies = 0
    let repliesWithIdentity = 0
    const perDomainCounts: Record<string, { replies: number; withIdentity: number }> = {}
    for (const lesson of picks) {
      const domain = PROBE_DOMAIN_PREFIXES.find((p) => lesson.topicSlug.startsWith(p)) ?? lesson.topicSlug
      perDomainCounts[domain] ??= { replies: 0, withIdentity: 0 }
      console.log(`\n=== ${lesson.topicSlug} (order ${lesson.order}) ===`)
      const findings = await probeLesson(acct.cookie, lesson, cur.lessons.length)
      for (const f of findings) {
        totalReplies += 1
        perDomainCounts[domain].replies += 1
        if (f.numericAssignments >= 1) {
          repliesWithIdentity += 1
          perDomainCounts[domain].withIdentity += 1
        }
        console.log(`  [${f.turn}] sent="${f.sent}" arithmeticIdentities=${f.numericAssignments}`)
        if (f.numericAssignments >= 1) {
          console.log(`    SNIPPET: ${f.snippet.replace(/\n/g, ' ')}`)
        }
      }
    }

    console.log(`\n=== RESULT ===`)
    console.log(`replies containing a checkable arithmetic identity (digit op digit = digit): ${repliesWithIdentity} / ${totalReplies}`)
    console.log(`per-domain breakdown:`)
    for (const [domain, counts] of Object.entries(perDomainCounts)) {
      console.log(`  ${domain} ${counts.withIdentity} / ${counts.replies}`)
    }
  } finally {
    const del = await deleteQaAccount(acct)
    console.log(`\nDeleted: ${del.deleted}, re-login blocked: ${del.reloginBlocked}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
