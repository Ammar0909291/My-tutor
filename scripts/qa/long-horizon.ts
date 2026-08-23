/**
 * LONG-HORIZON, the half that needs no time travel.
 *
 * Real elapsed days cannot be produced in a session and fabricating historical
 * timestamps in production is forbidden, so the decay/scheduling LAW is
 * validated offline in longHorizonRetention.test.ts against the scheduler's own
 * injectable clock. What IS decidable live is whether state SURVIVES leaving:
 *
 *   1. complete-ish lesson  → leave → return
 *   2. incomplete lesson    → leave → return
 *   3. progress consistency across a new session on the same account
 *
 * "Leaving" here is a genuine new session against the same account, which is
 * what a learner closing the tab and coming back the same day produces. It is
 * NOT a multi-day gap — the 30-minute episode boundary and the 15-45 day
 * forgetting half-life both need real time, and which scenarios that leaves
 * unresolved is stated in the report rather than simulated.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type LessonRef, type TurnPayload } from './liveSession'
import { BASE } from './liveAccount'

const LESSON: LessonRef = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}
const OTHER: LessonRef = {
  lessonTitle: 'Integers', lessonOrder: 78,
  topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908,
}

const m = (p: TurnPayload) => ({
  phase: p.mastery?.phase ?? null, check: p.mastery?.checkCorrect ?? 0,
  practice: p.mastery?.practiceCorrect ?? 0, verified: p.mastery?.verified ?? false,
})

async function curriculum(cookie: string, subject: string) {
  const res = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  if (!res.ok) throw new Error(`/api/curriculum -> ${res.status}`)
  const b = await res.json() as any
  const p = b?.data?.progress ?? b?.progress ?? {}
  return {
    currentLesson: p.currentLesson ?? null,
    completed: (p.completedLessons ?? []).length,
    activeSlug: p.activeLessonSlug ?? null,
  }
}

async function main(): Promise<void> {
  const acct = await createQaAccount('longh')
  console.log(`account: ${acct.email}\n`)
  try {
    // ── 1 + 2: engage a lesson, answer some things, then LEAVE ──────────
    const s1 = await createSession(acct.cookie, 'physics')
    await openLesson(acct.cookie, s1, LESSON)
    let last: TurnPayload | null = null
    for (const t of ['ok', 'the forces cancel so it stays still', 'yes that makes sense', 'what next?']) {
      last = await say(acct.cookie, s1, t)
    }
    const before = m(last!)
    const progBefore = await curriculum(acct.cookie, 'physics')
    console.log(`session 1 end : mastery=${JSON.stringify(before)}`)
    console.log(`                curriculum=${JSON.stringify(progBefore)}`)

    // ── LEAVE. A brand-new session on the same account. ────────────────
    const s2 = await createSession(acct.cookie, 'physics')
    const resumed = await say(acct.cookie, s2, 'hello again')
    const after = m(resumed)
    const progAfter = await curriculum(acct.cookie, 'physics')
    console.log(`\nsession 2 open: mastery=${JSON.stringify(after)}`)
    console.log(`                curriculum=${JSON.stringify(progAfter)}`)
    console.log(`   tutor: ${(resumed.text ?? '').replace(/\s+/g, ' ').slice(0, 300)}\n`)

    console.log('─── readings ───')
    // MASTERY MUST NOT APPEAR WITHOUT EVIDENCE, and must not vanish either.
    console.log(`earned counters preserved or higher : ${after.check >= before.check && after.practice >= before.practice}`)
    console.log(`no mastery invented on resume       : ${after.verified === before.verified || before.verified}`)
    console.log(`curriculum anchor stable            : ${progAfter.currentLesson === progBefore.currentLesson}`)
    console.log(`completed count did not shrink      : ${progAfter.completed >= progBefore.completed}`)

    // ── 3: a DIFFERENT subject must not disturb the first ──────────────
    const s3 = await createSession(acct.cookie, 'mathematics')
    await openLesson(acct.cookie, s3, OTHER)
    await say(acct.cookie, s3, 'ok')
    const physAfterMaths = await curriculum(acct.cookie, 'physics')
    console.log(`physics progress unchanged by a maths session: ${JSON.stringify(physAfterMaths) === JSON.stringify(progAfter)}`)
    console.log(`   physics before=${JSON.stringify(progAfter)} after=${JSON.stringify(physAfterMaths)}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
