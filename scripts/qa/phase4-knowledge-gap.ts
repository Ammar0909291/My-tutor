/**
 * PHASE 4 LIVE — a named missing concept is taught, not treated as distress.
 *
 * Disposable accounts only, deleted afterwards with re-login verified blocked.
 *
 * ── MEASURED vs INFERRED, enforced rather than remembered ───────────────────
 * STRUCTURAL (server-owned, exact): `mastery` (phase and counters) and `mcq`.
 * The decisive evidence for this phase is not in the payload at all — it is the
 * server's own `[knowledge-gap]`, `[excursion]` and `[arbitration]` log lines,
 * which are read separately. This harness proves the LEARNER-VISIBLE half and
 * the invariants; the log lines prove the decision.
 * INFERRED: whether the reply is about the named concept. Labelled as such.
 * A provider outage is UNMEASURED, read from the product's own flag.
 *
 * THE CONTROL PAIR IS THE POINT. The same lesson, two messages that differ only
 * in whether they NAME a concept the curriculum can title:
 *     "I don't know enough about the mole concept"   -> gap, detour, no budget
 *     "I don't know"                                 -> unchanged: recovery
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const LESSON = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()
/** `mcq` is OPTIONAL on TurnPayload — `undefined`, not `null`, when absent. */
const noQuestionAttached = (p: TurnPayload) => p.mcq == null
/** INFERRED ONLY: does the reply talk about the concept the learner named? */
const MOLE = /(mole|avogadro|6\.022|molar)/i

type Check = { id: string; what: string; ok: boolean | null; detail: string }
const checks: Check[] = []
const record = (id: string, what: string, ok: boolean | null, detail: string) => {
  checks.push({ id, what, ok, detail })
  console.log(`  [${ok === null ? 'UNMEASURED' : ok ? 'PASS' : 'FAIL'}] ${id} — ${what}\n         ${detail}`)
}
function show(label: string, p: TurnPayload): boolean {
  const d = isDegradedProvider(p.provider ?? null)
  const m = p.mastery ?? {}
  console.log(`\n[${label}] provider=${p.provider ?? 'null'}${d ? ' (DEGRADED — UNMEASURED)' : ''}`)
  console.log(`  text(${clean(p.text).length}): ${clean(p.text).slice(0, 240)}`)
  console.log(`  mcq=${p.mcq ? 'ATTACHED' : 'none'} mastery={phase:${m.phase ?? '?'},check:${m.checkCorrect ?? '?'},practice:${m.practiceCorrect ?? '?'},verified:${m.verified ?? '?'}}`)
  return d
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase4gap')
  console.log('account:', acct.email)
  try {
    const sid = await createSession(acct.cookie, 'chemistry')
    await openLesson(acct.cookie, sid, LESSON)

    const t0 = await say(acct.cookie, sid, 'why do mixtures separate?')
    const d0 = show('0 CONTROL — ordinary teaching turn', t0)
    record('C-1', 'an ordinary turn still teaches', d0 ? null : clean(t0.text).length > 200,
      d0 ? 'provider outage' : `${clean(t0.text).length} chars`)

    // ── THE GAP TURN ────────────────────────────────────────────────────────
    const t1 = await say(acct.cookie, sid, "I don't know enough about the mole concept")
    const d1 = show('1 KNOWLEDGE GAP — a concept the KG can title', t1)
    record('G-1', 'the gap turn is not answered with a graded question',
      d1 ? null : noQuestionAttached(t1),
      d1 ? 'provider outage' : `mcq=${t1.mcq ? 'ATTACHED (defect)' : 'none'}`)
    record('G-2', 'INFERRED ONLY — the reply teaches the concept the learner NAMED',
      d1 ? null : MOLE.test(t1.text ?? ''),
      d1 ? 'provider outage' : `mole/avogadro/molar language ${MOLE.test(t1.text ?? '') ? 'present' : 'absent'}`)
    record('G-3', 'the gap banks no mastery for the parent lesson',
      d1 ? null : (t1.mastery?.verified !== true),
      d1 ? 'provider outage' : `verified=${t1.mastery?.verified ?? 'null'}`)

    // Two more gap turns. Before Phase 4 these would each fold a synthetic
    // FAILURE into the episode, and the affect budget is TWO.
    const t2 = await say(acct.cookie, sid, "I still don't know enough about the mole concept")
    const d2 = show('2 SECOND gap turn — the budget must NOT be spent', t2)
    record('G-4', 'a second gap turn does not close the session',
      d2 ? null : !/next time|next session|come back|for today|see you/i.test(t2.text ?? ''),
      d2 ? 'provider outage' : 'closing language absent = budget not spent')

    // ── THE CONTROL: same intent, nothing named ─────────────────────────────
    const t3 = await say(acct.cookie, sid, "I don't know")
    const d3 = show('3 CONTROL — a bare "I don\'t know" names nothing', t3)
    record('C-2', 'a bare "I don\'t know" still gets recovery, unchanged',
      d3 ? null : noQuestionAttached(t3),
      d3 ? 'provider outage' : `mcq=${t3.mcq ? 'ATTACHED' : 'none'} (recovery asks nothing)`)

    // ── DISTRESS CONTROL: must be untouched by Phase 4 ──────────────────────
    const t4 = await say(acct.cookie, sid, "I give up")
    const d4 = show('4 CONTROL — emotional distress is NOT a gap', t4)
    record('C-3', 'distress still routes to recovery and asks nothing',
      d4 ? null : noQuestionAttached(t4),
      d4 ? 'provider outage' : `mcq=${t4.mcq ? 'ATTACHED (defect)' : 'none'}`)

    const all = [t0, t1, t2, t3, t4]
    const measured = all.some((p) => !isDegradedProvider(p.provider ?? null))
    record('X-1', 'NO false mastery and NO lesson completion anywhere in the run',
      measured ? all.every((p) => p.mastery?.verified !== true && p.lessonComplete?.complete !== true) : null,
      measured ? 'checked across all five turns' : 'every turn was a provider outage')

    console.log('\n===== VERDICT =====')
    const f = checks.filter((c) => c.ok === false), u = checks.filter((c) => c.ok === null)
    console.log(`pass=${checks.filter((c) => c.ok === true).length} fail=${f.length} unmeasured=${u.length}`)
    for (const c of u) console.log(`  UNMEASURED (outage, NOT a teaching failure): ${c.id}`)
    for (const c of f) console.log(`  FAIL: ${c.id} ${c.what} :: ${c.detail}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
