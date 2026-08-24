/**
 * PHASE 6 — LIVE CERTIFICATION against the deployed app.
 *
 * Bounded provider budget by design. A full 640-concept x 16-behaviour sweep is
 * ~10,000 provider calls; CLAUDE.md's 2026-08-19 note records a 257-concept
 * sweep exhausting quota and producing a total teaching outage. Phase 6 rule 16
 * forbids manufacturing outages, so this spends its calls only where a model is
 * genuinely required, and everything structural is certified offline instead
 * (scripts/qa/phase6-structural-certification.ts).
 *
 * Disposable account only; deleted afterwards with re-login verified blocked.
 * Never suaibamr@gmail.com (liveAccount.ts enforces this structurally).
 *
 * MEASURED vs INFERRED is enforced, not remembered:
 *   STRUCTURAL (server-owned, exact) — mastery counters, phase, mcq, provider.
 *   INFERRED (labelled)              — whether prose "is about" something.
 *   UNMEASURED                       — any turn the product itself flags degraded.
 * UNKNOWN is never promoted to PASS.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload, type LessonRef } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const PHYSICS_MOMENTUM: LessonRef = {
  lessonTitle: 'Momentum', lessonOrder: 30,
  topicSlug: 'phys.mech.momentum', unitTitle: 'Classical Mechanics', totalLessons: 238,
}
const CHEMISTRY: LessonRef = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const ENGLISH_GRAMMAR: LessonRef = {
  lessonTitle: 'Nouns', lessonOrder: 40,
  topicSlug: 'eng.grammar.nouns', unitTitle: 'Grammar', totalLessons: 216,
}

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()
type Verdict = 'PASS' | 'FAIL' | 'NOT_APPLICABLE' | 'UNTESTED' | 'UNKNOWN'
interface Check { id: string; what: string; verdict: Verdict; detail: string }
const checks: Check[] = []
const record = (id: string, what: string, verdict: Verdict, detail: string) => {
  checks.push({ id, what, verdict, detail })
  console.log(`  [${verdict}] ${id} — ${what}\n         ${detail}`)
}
interface M { check: number; practice: number; phase: string; verified: boolean }
const mast = (p: TurnPayload): M => ({
  check: p.mastery?.checkCorrect ?? 0,
  practice: p.mastery?.practiceCorrect ?? 0,
  phase: String(p.mastery?.phase ?? '?'),
  verified: p.mastery?.verified === true,
})
function show(label: string, p: TurnPayload): boolean {
  const d = isDegradedProvider(p.provider ?? null)
  const m = mast(p)
  console.log(`\n[${label}] provider=${p.provider ?? 'null'}${d ? ' (DEGRADED — UNMEASURED)' : ''}`)
  console.log(`  text(${clean(p.text).length}): ${clean(p.text).slice(0, 230)}`)
  console.log(`  mcq=${p.mcq ? `ATTACHED correct=${p.mcq.correctIndex} ${JSON.stringify(p.mcq.options)}` : 'none'}`)
  console.log(`  figure=${carriesFigure(p) ? (figureLabel(p) ?? 'yes') : 'NO-FIGURE'}  mastery={phase:${m.phase},check:${m.check},practice:${m.practice},verified:${m.verified}}`)
  return d
}

// ═══════════════════════════════════════════════════════════════════════════
// PART E — ANSWER INTEGRITY. The Phase-5 known unknown, made decisive.
//
// The residual gap Phase 5 reported: with NO structured MCQ pending, but a
// prior tutor turn that DID pose an answerable question, `shouldSuppress-
// SignalCorrectness` does NOT suppress — so correctness comes from the model's
// self-report, and a self-consistent-but-wrong grading is unguarded.
//
// This drives the runtime to exactly that state and answers a free-response
// numeric question WRONG, then measures whether mastery moved.
// ═══════════════════════════════════════════════════════════════════════════
async function answerIntegrity(cookie: string): Promise<void> {
  console.log('\n\n' + '='.repeat(76))
  console.log('PART E — ANSWER INTEGRITY (free-response numeric, wrong answer)')
  console.log('='.repeat(76))
  const sid = await createSession(cookie, 'physics')
  await openLesson(cookie, sid, PHYSICS_MOMENTUM)

  // Ask for a calculation explicitly — this is how a learner reaches a
  // free-response numeric turn through the ordinary product path. No question
  // is hard-coded; the tutor authors it.
  const t1 = await say(cookie, sid, 'Can you give me a numerical problem to solve about momentum in a collision?')
  const d1 = show('E1 request a numeric problem', t1)
  const before = mast(t1)

  // A deliberately WRONG but plausible numeric answer. If the tutor posed a
  // free-response problem, this is the unguarded path; if it posed an MCQ,
  // grading is deterministic and this instead confirms the guarded path.
  const t2 = await say(cookie, sid, 'I worked it out and got 2.0 m/s east.')
  const d2 = show('E2 WRONG numeric free-response answer', t2)
  const after = mast(t2)

  const guarded = t1.mcq != null
  record('E-1', guarded
    ? 'the tutor posed a STRUCTURED MCQ — grading is deterministic (guarded path)'
    : 'the tutor posed a FREE-RESPONSE question — grading falls to model self-report (unguarded path)',
    (d1 || d2) ? 'UNKNOWN' : 'PASS',
    (d1 || d2) ? 'provider outage' : `mcq on the question turn: ${guarded ? 'ATTACHED' : 'none'}`)

  record('E-2', 'a WRONG answer did not increase mastery counters',
    (d1 || d2) ? 'UNKNOWN' : (after.check <= before.check && after.practice <= before.practice ? 'PASS' : 'FAIL'),
    (d1 || d2) ? 'provider outage' : `before={c:${before.check},p:${before.practice}} after={c:${after.check},p:${after.practice}}`)

  record('E-3', 'a WRONG answer did not authorize lesson completion',
    (d1 || d2) ? 'UNKNOWN' : (t2.lessonComplete?.complete !== true ? 'PASS' : 'FAIL'),
    (d1 || d2) ? 'provider outage' : `lessonComplete=${JSON.stringify(t2.lessonComplete)}`)

  record('E-4', 'INFERRED ONLY — the tutor told the learner the answer was wrong rather than affirming it',
    (d1 || d2) ? 'UNKNOWN'
      : (/\b(not quite|isn'?t right|incorrect|not correct|let'?s check|actually|recheck|close,? but)\b/i.test(t2.text ?? '')
        ? 'PASS'
        : (/\b(exactly|correct|well done|spot on|perfect|great job)\b/i.test(t2.text ?? '') ? 'FAIL' : 'UNKNOWN')),
    (d1 || d2) ? 'provider outage' : `reply opens: "${clean(t2.text).slice(0, 120)}"`)
}

// ═══════════════════════════════════════════════════════════════════════════
// ASSET-CONTRACT CONSEQUENCE — does a below-contract subject actually stall?
// English holds exactly 2 closed-choice probes per concept (measured offline);
// mastery needs 3 graded correct answers and never re-asks a spent probe.
// Physics holds >= 3 and is the control.
// ═══════════════════════════════════════════════════════════════════════════
async function masteryReachability(
  cookie: string, subject: string, lesson: LessonRef, tag: string, turns = 10,
): Promise<{ authoredMcqs: number; modelMcqs: number; finalCheck: number; finalPractice: number; degraded: number; completed: boolean }> {
  console.log('\n\n' + '='.repeat(76))
  console.log(`MASTERY REACHABILITY — ${tag} (${lesson.topicSlug})`)
  console.log('='.repeat(76))
  const sid = await createSession(cookie, subject)
  let p = await openLesson(cookie, sid, lesson)
  show(`${tag} open`, p)

  let authoredMcqs = 0, modelMcqs = 0, degraded = 0, completed = false
  const seenStems = new Set<string>()
  for (let i = 0; i < turns; i++) {
    // Answer the pending MCQ CORRECTLY when one exists — the fastest legitimate
    // route to mastery. Otherwise nudge the lesson forward neutrally.
    let msg: string
    if (p.mcq) {
      const stem = p.mcq.question
      if (!seenStems.has(stem)) { seenStems.add(stem); authoredMcqs++ }
      msg = p.mcq.options[p.mcq.correctIndex]
    } else {
      msg = i % 2 === 0 ? 'ok, what next?' : 'can you check my understanding?'
    }
    p = await say(cookie, sid, msg)
    const d = show(`${tag} turn ${i + 1} <- "${msg.slice(0, 46)}"`, p)
    if (d) degraded++
    if (p.lessonComplete?.complete === true) { completed = true; console.log(`  >>> LESSON COMPLETED at turn ${i + 1}`); break }
  }
  const m = mast(p)
  console.log(`\n  ${tag} SUMMARY: distinct MCQs served=${seenStems.size} final={check:${m.check},practice:${m.practice},phase:${m.phase},verified:${m.verified}} completed=${completed} degradedTurns=${degraded}`)
  return { authoredMcqs, modelMcqs, finalCheck: m.check, finalPractice: m.practice, degraded, completed }
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase6cert')
  console.log('account:', acct.email)
  try {
    await answerIntegrity(acct.cookie)

    const phys = await masteryReachability(acct.cookie, 'physics', PHYSICS_MOMENTUM, 'PHYSICS (contract PASS)')
    record('AC-1', 'CONTROL: a contract-satisfied subject accumulates graded mastery evidence',
      phys.degraded >= 8 ? 'UNKNOWN'
        : (phys.finalCheck + phys.finalPractice > 0 || phys.completed ? 'PASS' : 'FAIL'),
      phys.degraded >= 8 ? 'mostly provider outage'
        : `distinct MCQs=${phys.authoredMcqs} final check=${phys.finalCheck} practice=${phys.finalPractice} completed=${phys.completed}`)

    const chem = await masteryReachability(acct.cookie, 'chemistry', CHEMISTRY, 'CHEMISTRY (contract PASS)')
    record('AC-2', 'CONTROL: chemistry (contract-satisfied) accumulates graded mastery evidence',
      chem.degraded >= 8 ? 'UNKNOWN'
        : (chem.finalCheck + chem.finalPractice > 0 || chem.completed ? 'PASS' : 'FAIL'),
      chem.degraded >= 8 ? 'mostly provider outage'
        : `distinct MCQs=${chem.authoredMcqs} final check=${chem.finalCheck} practice=${chem.finalPractice} completed=${chem.completed}`)

    const eng = await masteryReachability(acct.cookie, 'english', ENGLISH_GRAMMAR, 'ENGLISH (contract FAIL: 2 probes)')
    record('AC-3', 'SUBJECT UNDER TEST: english reaches >= 3 distinct graded questions (the mastery bar)',
      eng.degraded >= 8 ? 'UNKNOWN' : (eng.authoredMcqs >= 3 ? 'PASS' : 'FAIL'),
      eng.degraded >= 8 ? 'mostly provider outage'
        : `distinct MCQs served=${eng.authoredMcqs} (bar is 3: 1 CHECK + 2 PRACTICE); final check=${eng.finalCheck} practice=${eng.finalPractice} completed=${eng.completed}`)

    console.log('\n' + '='.repeat(76))
    console.log('LIVE VERDICT')
    console.log('='.repeat(76))
    const by = (v: Verdict) => checks.filter((c) => c.verdict === v)
    console.log(`PASS=${by('PASS').length} FAIL=${by('FAIL').length} UNKNOWN=${by('UNKNOWN').length}`)
    for (const c of by('FAIL')) console.log(`  FAIL    ${c.id} — ${c.what} :: ${c.detail}`)
    for (const c of by('UNKNOWN')) console.log(`  UNKNOWN ${c.id} — ${c.what} :: ${c.detail}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
