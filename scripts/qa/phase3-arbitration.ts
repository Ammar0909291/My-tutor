/**
 * PHASE 3 LIVE — one deterministic authority owns the turn.
 *
 * Verifies the highest-risk precedence collisions against the DEPLOYED app,
 * on disposable accounts only, deleted and re-login-verified afterwards.
 *
 * ── WHAT IS MEASURED VERSUS INFERRED, STATED UP FRONT ───────────────────────
 * This harness has condemned the product for its own blind spot four times in
 * this repository's history, so the distinction is enforced rather than
 * remembered:
 *
 *   STRUCTURAL (exact, server-owned, not prose): `mcq` — whether a graded
 *   question was actually attached — and `mastery` — the server's own phase and
 *   counters. Every headline verdict below rests on these.
 *
 *   INFERRED (a proxy, and labelled as one): whether the TEXT reads as closing
 *   or teaching. Reported for context, never as the verdict.
 *
 * A provider outage is NOT a teaching failure. `isDegradedProvider` is the
 * product's own flag and is read directly rather than matched against template
 * prose; an outage turn is reported UNMEASURED and the run says so.
 *
 * No provider outage is manufactured. Nothing here writes to a real account.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()

/**
 * Did this turn attach a graded question?
 *
 * `mcq` is OPTIONAL on TurnPayload: the route omits the key entirely when no
 * question is attached, so the value is `undefined`, not `null`. The first
 * version of this file asserted `p.mcq === null` and reported FAIL on four
 * checks while printing `mcq=null` — a harness bug that would have been read as
 * four product defects. It is written as a named helper so the comparison
 * happens in exactly one place.
 */
const noQuestionAttached = (p: TurnPayload): boolean => p.mcq == null
const CLOSEY = /(next time|next session|come back|see you|well done today|great work today|for today|pick (this|it) up)/i

type Check = { id: string; what: string; ok: boolean | null; detail: string }
const checks: Check[] = []
const record = (id: string, what: string, ok: boolean | null, detail: string) => {
  checks.push({ id, what, ok, detail })
  const mark = ok === null ? 'UNMEASURED' : ok ? 'PASS' : 'FAIL'
  console.log(`  [${mark}] ${id} — ${what}\n         ${detail}`)
}

function show(label: string, p: TurnPayload): boolean {
  const degraded = isDegradedProvider(p.provider ?? null)
  const m = p.mastery ?? {}
  console.log(`\n[${label}] provider=${p.provider ?? 'null'}${degraded ? ' (DEGRADED — UNMEASURED)' : ''}`)
  console.log(`  text(${clean(p.text).length}): ${clean(p.text).slice(0, 220)}`)
  console.log(`  mcq=${p.mcq ? JSON.stringify(p.mcq.question).slice(0, 90) : 'null'}`
    + `  figure=${carriesFigure(p)}`
    + `  mastery={phase:${m.phase ?? '?'},check:${m.checkCorrect ?? '?'},practice:${m.practiceCorrect ?? '?'},verified:${m.verified ?? '?'}}`)
  return degraded
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase3arb')
  console.log('account:', acct.email)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sid, LESSON)

    // ── CONTROL: an ordinary teaching turn must be completely unaffected ────
    const t0 = await say(acct.cookie, sid, 'why do mixtures separate?')
    const d0 = show('0 CONTROL — ordinary teaching turn', t0)
    record('C-1', 'an ordinary turn still teaches (Phase 3 changed nothing here)',
      d0 ? null : clean(t0.text).length > 200,
      d0 ? 'provider outage' : `${clean(t0.text).length} chars`)
    record('C-2', 'an ordinary turn is still allowed to carry a graded question',
      d0 ? null : true,
      d0 ? 'provider outage' : `mcq=${t0.mcq ? 'attached' : 'none this turn (permitted either way)'}`)

    // ── D3 / Phase 2 C6: an explicit request is not answered with a quiz ────
    const t1 = await say(acct.cookie, sid, 'show me a diagram')
    const d1 = show('1 LEARNER REQUEST — a diagram was asked for', t1)
    record('D3', 'an explicit visual request is NOT converted into a graded quiz',
      d1 ? null : noQuestionAttached(t1),
      d1 ? 'provider outage' : `mcq=${t1.mcq ? 'ATTACHED (defect)' : 'null'} figure=${carriesFigure(t1)}`)

    // ── D4/D5: distress owns the turn ──────────────────────────────────────
    const t2 = await say(acct.cookie, sid, "I'm lost. I don't understand any of this.")
    const d2 = show('2 RECOVERY — the learner voiced a failure state', t2)
    record('D5', 'a recovery turn carries NO graded question',
      d2 ? null : noQuestionAttached(t2),
      d2 ? 'provider outage' : `mcq=${t2.mcq ? 'ATTACHED (defect)' : 'null'}`)
    record('D5b', 'a recovery turn banks no mastery',
      d2 ? null : (t2.mastery?.verified !== true),
      d2 ? 'provider outage' : `verified=${t2.mastery?.verified ?? 'null'}`)

    // ── D1/D2: the stop, and the turn after it ─────────────────────────────
    const t3 = await say(acct.cookie, sid, "I'm done for today.")
    const d3 = show('3 EXPLICIT STOP', t3)
    record('D2', 'the closing turn carries NO graded question',
      d3 ? null : noQuestionAttached(t3),
      d3 ? 'provider outage' : `mcq=${t3.mcq ? 'ATTACHED (defect)' : 'null'}`)
    record('D2-proxy', 'INFERRED ONLY — the closing turn reads as a close',
      d3 ? null : CLOSEY.test(t3.text ?? ''),
      d3 ? 'provider outage' : `closing language ${CLOSEY.test(t3.text ?? '') ? 'present' : 'absent'}`)

    const t4 = await say(acct.cookie, sid, 'ok')
    const d4 = show('4 TURN AFTER THE STOP — CLOSING must still own it', t4)
    record('D1', 'the turn after a stop carries NO graded question (episode still CLOSING)',
      d4 ? null : noQuestionAttached(t4),
      d4 ? 'provider outage' : `mcq=${t4.mcq ? 'ATTACHED (defect)' : 'null'}`)
    record('D1-proxy', 'INFERRED ONLY — the turn after a stop does not teach new content',
      d4 ? null : CLOSEY.test(t4.text ?? ''),
      d4 ? 'provider outage' : `closing language ${CLOSEY.test(t4.text ?? '') ? 'present' : 'absent'}`)

    // ── the stop must not have manufactured progress ───────────────────────
    const all = [t0, t1, t2, t3, t4]
    const anyMeasured = all.some((p) => !isDegradedProvider(p.provider ?? null))
    record('X-1', 'no turn in this run verified mastery or completed the lesson',
      anyMeasured ? all.every((p) => p.mastery?.verified !== true && p.lessonComplete?.complete !== true) : null,
      anyMeasured ? 'checked across all five turns' : 'every turn was a provider outage')

    console.log('\n===== VERDICT =====')
    const fails = checks.filter((c) => c.ok === false)
    const unmeasured = checks.filter((c) => c.ok === null)
    const passes = checks.filter((c) => c.ok === true)
    console.log(`pass=${passes.length} fail=${fails.length} unmeasured=${unmeasured.length}`)
    if (unmeasured.length > 0) {
      console.log('UNMEASURED (provider outage — NOT a teaching failure):')
      for (const c of unmeasured) console.log(`  - ${c.id} ${c.what}`)
    }
    if (fails.length > 0) {
      console.log('FAILURES:')
      for (const c of fails) console.log(`  - ${c.id} ${c.what} :: ${c.detail}`)
    }
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
