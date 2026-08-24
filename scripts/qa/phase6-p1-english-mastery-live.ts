/**
 * PHASE 6 P1 — what the English shortfall actually COSTS a learner, live.
 *
 * The offline audit proves English holds 2 authored closed-choice probes per
 * concept against a bar of 3. This measures the consequence in production:
 * where do the graded questions actually COME from, and can the lesson still
 * reach mastery?
 *
 * The decisive distinction is `provider`:
 *   provider === 'gate'  -> an AUTHORED probe, server-graded, guaranteed
 *   otherwise + mcq      -> the MODEL volunteered an <!--MCQ--> tag, which IS
 *                           gradeable but is advisory, not guaranteed
 *
 * Chemistry (contract-satisfied) is the control. If English needs model-
 * volunteered questions to reach the bar and chemistry does not, that is the
 * cost of the shortfall, measured rather than argued.
 *
 * n = 1 run per subject. This sizes the DEPENDENCY; it is NOT a compliance
 * rate, and is not reported as one.
 *
 * Disposable account, deleted afterwards, re-login verified blocked.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload, type LessonRef } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const ENGLISH: LessonRef = {
  lessonTitle: 'Nouns', lessonOrder: 40,
  topicSlug: 'eng.grammar.nouns', unitTitle: 'Grammar', totalLessons: 216,
}
const CHEMISTRY: LessonRef = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()

interface Result {
  tag: string; authored: number; modelVolunteered: number
  check: number; practice: number; phase: string; completed: boolean; degraded: number
}

async function run(cookie: string, subject: string, lesson: LessonRef, tag: string, turns = 16): Promise<Result> {
  console.log('\n' + '='.repeat(76))
  console.log(`${tag} — ${lesson.topicSlug}`)
  console.log('='.repeat(76))
  const sid = await createSession(cookie, subject)
  let p = await openLesson(cookie, sid, lesson)

  let authored = 0, modelVolunteered = 0, degraded = 0, completed = false
  const seen = new Set<string>()

  for (let i = 0; i < turns; i++) {
    const msg = p.mcq ? p.mcq.options[p.mcq.correctIndex]
      : (i % 2 === 0 ? 'ok, what next?' : 'can you check my understanding?')
    p = await say(cookie, sid, msg)
    const d = isDegradedProvider(p.provider ?? null)
    if (d) degraded++
    const m = p.mastery ?? {}
    let src = ''
    if (p.mcq && !seen.has(p.mcq.question)) {
      seen.add(p.mcq.question)
      // provider 'gate' is the server-rendered authored-probe path.
      if (p.provider === 'gate') { authored++; src = '  <= AUTHORED probe (provider=gate)' }
      else { modelVolunteered++; src = '  <= MODEL-volunteered MCQ tag' }
    }
    console.log(`  t${String(i + 1).padStart(2)} provider=${String(p.provider ?? 'null').padEnd(9)}`
      + ` mcq=${p.mcq ? 'yes' : 'no '} phase=${String(m.phase ?? '?').padEnd(11)}`
      + ` check=${m.checkCorrect ?? 0} practice=${m.practiceCorrect ?? 0}${src}`)
    if (p.lessonComplete?.complete === true) {
      completed = true
      // A LESSON ATTEMPT FINALISING IS NOT THE SAME AS MASTERY, and an earlier
      // version of this script conflated the two and very nearly reported a
      // false-mastery P0 that did not exist. Traced through the real modules:
      //   isConceptClosed = hasDemonstratedMastery || budget exhausted
      //   hasDemonstratedMastery = correctAtPractice >= 2 || phase TRANSFER
      //   conceptOutcome().status = mastered <=> hasDemonstratedMastery
      // so a close at practice < 2 routes to conceptsNeedingReview and
      // markConceptMastered is never called. The lesson ends; the concept is
      // queued for review. That is designed behaviour, not fabricated mastery.
      const mastered = (m.practiceCorrect ?? 0) >= 2 || m.phase === 'TRANSFER'
      console.log(`  >>> LESSON ATTEMPT FINALISED at turn ${i + 1} — concept recorded as `
        + `${mastered ? 'MASTERED' : 'NEEDS REVIEW (budget exhausted, no false mastery)'}`)
      break
    }
  }
  const m = p.mastery ?? {}
  const r: Result = {
    tag, authored, modelVolunteered,
    check: m.checkCorrect ?? 0, practice: m.practiceCorrect ?? 0,
    phase: String(m.phase ?? '?'), completed, degraded,
  }
  console.log(`\n  ${tag}: distinct graded questions = ${authored} authored + ${modelVolunteered} model-volunteered`
    + `  final check=${r.check} practice=${r.practice} phase=${r.phase} completed=${r.completed} degraded=${r.degraded}`)
  return r
}

async function main(): Promise<void> {
  const acct = await createQaAccount('p1english')
  console.log('account:', acct.email)
  try {
    const chem = await run(acct.cookie, 'chemistry', CHEMISTRY, 'CHEMISTRY (contract PASS, control)')
    const eng = await run(acct.cookie, 'english', ENGLISH, 'ENGLISH (contract FAIL: 2 of 3)')

    console.log('\n' + '='.repeat(76))
    console.log('P1 COST — where do English\'s graded questions come from?')
    console.log('='.repeat(76))
    for (const r of [chem, eng]) {
      const total = r.authored + r.modelVolunteered
      const mastered = r.practice >= 2 || r.phase === 'TRANSFER'
      console.log(`  ${r.tag}`)
      console.log(`      authored (guaranteed)  : ${r.authored}`)
      console.log(`      model-volunteered      : ${r.modelVolunteered}   ${total > 0 && r.modelVolunteered > 0
        ? `<= ${((r.modelVolunteered / total) * 100).toFixed(0)}% of graded questions were NOT guaranteed` : ''}`)
      console.log(`      mastery counters       : check=${r.check}/1 practice=${r.practice}/2`)
      console.log(`      attempt finalised      : ${r.completed}`)
      console.log(`      concept recorded as    : ${mastered ? 'MASTERED' : 'NEEDS REVIEW — no false mastery'}`)
    }
    console.log('\n  n=1 per subject. This sizes the DEPENDENCY on model compliance;')
    console.log('  it is NOT a compliance rate and must not be quoted as one.')
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
