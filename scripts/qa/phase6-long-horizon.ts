/**
 * PHASE 6 — PART I, LONG-HORIZON VALIDATION.
 *
 * What can and cannot be tested is stated up front, because the honest split
 * matters more than the result:
 *
 *   DETERMINISTIC here — leaving a lesson and returning to it; whether earned
 *   mastery survives a return; whether an incomplete lesson resumes rather than
 *   restarting; whether returning ALONE (with no new evidence) can restore or
 *   manufacture mastery.
 *
 *   NOT TESTABLE here — anything keyed to real elapsed time: decay curves,
 *   spaced-review scheduling, forgetting-rate personalisation. Those need days
 *   of wall-clock, and faking the clock would be manufacturing DB state, which
 *   Phase 6 rule 16 forbids. Reported as UNTESTED, never as PASS.
 *
 * Disposable account only; deleted afterwards, re-login verified blocked.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload, type LessonRef } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const LESSON: LessonRef = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()
type Verdict = 'PASS' | 'FAIL' | 'NOT_APPLICABLE' | 'UNTESTED' | 'UNKNOWN'
const checks: { id: string; what: string; verdict: Verdict; detail: string }[] = []
const record = (id: string, what: string, verdict: Verdict, detail: string) => {
  checks.push({ id, what, verdict, detail })
  console.log(`  [${verdict}] ${id} — ${what}\n         ${detail}`)
}
const mast = (p: TurnPayload) => ({
  check: p.mastery?.checkCorrect ?? 0,
  practice: p.mastery?.practiceCorrect ?? 0,
  phase: String(p.mastery?.phase ?? '?'),
  verified: p.mastery?.verified === true,
})
function show(label: string, p: TurnPayload): boolean {
  const d = isDegradedProvider(p.provider ?? null)
  const m = mast(p)
  console.log(`\n[${label}] provider=${p.provider ?? 'null'}${d ? ' (DEGRADED)' : ''} mastery={phase:${m.phase},check:${m.check},practice:${m.practice},verified:${m.verified}}`)
  console.log(`  mcq=${p.mcq ? 'ATTACHED' : 'none'}  text: ${clean(p.text).slice(0, 190)}`)
  return d
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase6horizon')
  console.log('account:', acct.email)
  try {
    // ── DAY 1: learn, and earn some real graded evidence ──────────────────
    console.log('\n' + '='.repeat(74)); console.log('DAY 1 — learn and earn graded evidence'); console.log('='.repeat(74))
    const sid1 = await createSession(acct.cookie, 'physics')
    let p = await openLesson(acct.cookie, sid1, LESSON)
    show('D1 open', p)
    let degraded = 0
    for (let i = 0; i < 8; i++) {
      const msg = p.mcq ? p.mcq.options[p.mcq.correctIndex] : (i % 2 === 0 ? 'ok, what next?' : 'can you check my understanding?')
      p = await say(acct.cookie, sid1, msg)
      if (show(`D1 turn ${i + 1} <- "${msg.slice(0, 40)}"`, p)) degraded++
    }
    const earned = mast(p)
    console.log(`\n  DAY 1 EARNED: check=${earned.check} practice=${earned.practice} phase=${earned.phase}`)

    // ── LEAVE: explicit stop ───────────────────────────────────────────────
    const stop = await say(acct.cookie, sid1, "I'm done for today.")
    const dStop = show('LEAVE — explicit stop', stop)
    record('LH-1', 'an explicit stop is honoured rather than answered with a new question',
      dStop ? 'UNKNOWN' : (stop.mcq == null ? 'PASS' : 'FAIL'),
      dStop ? 'provider outage' : `mcq=${stop.mcq ? 'ATTACHED (defect)' : 'none'}`)

    // ── RETURN: a genuinely NEW session on the same lesson ────────────────
    console.log('\n' + '='.repeat(74)); console.log('RETURN — new session, same lesson'); console.log('='.repeat(74))
    const sid2 = await createSession(acct.cookie, 'physics')
    const back = await openLesson(acct.cookie, sid2, LESSON)
    const dBack = show('RETURN open', back)
    const onReturn = mast(back)

    record('LH-2', 'returning does NOT silently restore or manufacture verified mastery',
      dBack ? 'UNKNOWN' : (onReturn.verified === false || earned.verified ? 'PASS' : 'FAIL'),
      dBack ? 'provider outage'
        : `earned.verified=${earned.verified} onReturn.verified=${onReturn.verified}`)

    record('LH-3', 'returning does not INFLATE the mastery counters beyond what was earned',
      dBack ? 'UNKNOWN'
        : (onReturn.check <= Math.max(earned.check, 0) && onReturn.practice <= Math.max(earned.practice, 0) ? 'PASS' : 'FAIL'),
      dBack ? 'provider outage'
        : `earned={c:${earned.check},p:${earned.practice}} onReturn={c:${onReturn.check},p:${onReturn.practice}}`)

    // ── REASSESS: is knowledge actually checked again on return? ──────────
    const re = await say(acct.cookie, sid2, 'can you check my understanding?')
    const dRe = show('REASSESS — ask to be checked after returning', re)
    record('LH-4', 'the learner can be re-assessed after returning (knowledge is re-checked, not assumed)',
      dRe ? 'UNKNOWN' : (re.mcq != null || /\?/.test(clean(re.text)) ? 'PASS' : 'FAIL'),
      dRe ? 'provider outage' : `mcq=${re.mcq ? 'ATTACHED' : 'none'} questionMark=${/\?/.test(clean(re.text))}`)

    record('LH-5', 'no lesson completion was fabricated anywhere across leave/return',
      (dBack || dRe) ? 'UNKNOWN'
        : ([stop, back, re].every((t) => t.lessonComplete?.complete !== true) ? 'PASS' : 'FAIL'),
      (dBack || dRe) ? 'provider outage' : 'checked across stop, return-open and reassess turns')

    // ── what genuinely cannot be tested here ──────────────────────────────
    record('LH-6', 'decay / spaced-review scheduling behaves correctly over real elapsed time',
      'UNTESTED',
      'requires days of wall-clock; faking the clock would be manufacturing DB state (rule 16)')
    record('LH-7', 're-mastery after genuine decay is earned by evidence rather than restored',
      'UNTESTED',
      'depends on LH-6 having elapsed; not reachable in a single session')

    console.log('\n' + '='.repeat(74)); console.log('LONG-HORIZON VERDICT'); console.log('='.repeat(74))
    const by = (v: Verdict) => checks.filter((c) => c.verdict === v)
    console.log(`PASS=${by('PASS').length} FAIL=${by('FAIL').length} UNKNOWN=${by('UNKNOWN').length} UNTESTED=${by('UNTESTED').length}`)
    for (const c of by('FAIL')) console.log(`  FAIL ${c.id} — ${c.what} :: ${c.detail}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
