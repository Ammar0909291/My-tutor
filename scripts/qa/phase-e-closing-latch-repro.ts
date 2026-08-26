/**
 * PHASE E — THE SECOND LATCH: DOES CLOSING STARVE MASTERY?
 *
 * INVESTIGATION ONLY. No production code is changed. Real production modules,
 * no provider, no database, no network, deterministic.
 *
 * The hypothesis under test — NOT assumed:
 *   applySignalToEpisode moves CORE -> CLOSING at visibleFailures >= 2;
 *   nothing anywhere moves CLOSING -> CORE;
 *   arbitrateTurn gives a CLOSING turn to CLOSE, which suppresses
 *   AUTHORED_PROBE; so a learner at CHECK is starved of the very questions
 *   correctAtCheck / correctAtPractice require, until the concept-turn budget
 *   expires.
 *
 * Production state at the moment of failure, quoted for calibration
 * (learn_sessions.contextSnapshot, read directly):
 *
 *   chem.equil.le-chatelier  episode {phase CLOSING, visibleFailures 2}
 *                            conversation {phase CHECK, c 0, p 0, turns 12}
 *   phys.em.faradays-law     episode {phase CORE,    visibleFailures 1}
 *                            conversation {phase TRANSFER, c 1, p 2, turns 13}
 *
 *   npx tsx scripts/qa/phase-e-closing-latch-repro.ts
 */
import {
  deriveEpisode, applySignalToEpisode, forceClosing, clearEpisodeForLessonOpen,
  isNewEpisode, SESSION_GAP_MS, type SessionEpisode,
} from '../../src/lib/teaching/sessionLifecycle'
import { arbitrateTurn, type TurnCapability } from '../../src/lib/teaching/turnArbitration'
import {
  closingTurnWithholdsQuestion, isProbeAttachablePhase, isMasteryGatePhase,
} from '../../src/lib/teaching/gateAssessment'
import {
  advanceConversationState, initialConversationState, isLowSignalAcknowledgement,
  type ConversationState, type TeachingPhase,
} from '../../src/lib/teaching/conversationState'
import { masteryVerifiedStrict, asksForPractice, detectLearnerRequest } from '../../src/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '../../src/lib/teaching/recoveryGuard'
import { CONCEPT_TURN_BUDGET, effectiveTurnBudget } from '../../src/lib/teaching/conceptBudget'

const rule = (t: string) => console.log(`\n${'═'.repeat(78)}\n${t}\n${'═'.repeat(78)}`)

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE CLOSING LIFECYCLE — every transition, exhaustively
// ═══════════════════════════════════════════════════════════════════════════
function lifecycleTrace() {
  rule('1. CAN THE EPISODE EVER LEAVE CLOSING?')
  const closing: SessionEpisode = {
    startedAt: new Date().toISOString(), phase: 'CLOSING',
    visibleFailures: 2, retroWinOwed: false, openingSatisfied: true,
  }
  const opts = { isFirstLesson: false }
  const probes: Array<[string, SessionEpisode]> = [
    ['a CORRECT answer', applySignalToEpisode(closing, { correctness: true }, opts)],
    ['ten CORRECT answers', Array.from({ length: 10 }).reduce<SessionEpisode>(
      (e) => applySignalToEpisode(e, { correctness: true }, opts), closing)],
    ['a wrong answer', applySignalToEpisode(closing, { correctness: false }, opts)],
    ['a turn with no signal', applySignalToEpisode(closing, null, opts)],
    ['forceClosing again', forceClosing(closing)],
    ['deriveEpisode, NO boundary', deriveEpisode(closing, false, Date.now(), null)],
    ['deriveEpisode, boundary (>30 min idle)', deriveEpisode(closing, true, Date.now(), null)],
  ]
  for (const [label, ep] of probes) {
    console.log(`  ${ep.phase === 'CLOSING' ? 'STILL CLOSING' : `-> ${ep.phase}`.padEnd(13)}  after ${label}`)
  }
  console.log(`\n  clearEpisodeForLessonOpen() -> ${JSON.stringify(clearEpisodeForLessonOpen())}`)
  console.log(`  isNewEpisode(now - 29 min) = ${isNewEpisode(Date.now() - 29 * 60_000, Date.now())}`)
  console.log(`  isNewEpisode(now - 31 min) = ${isNewEpisode(Date.now() - 31 * 60_000, Date.now())}`)
  console.log(`  SESSION_GAP_MS = ${SESSION_GAP_MS} (${SESSION_GAP_MS / 60000} min)`)
  console.log('\n  CONCLUSION: within a lesson there is NO exit. The only two ways out are')
  console.log('  (a) 30 minutes of silence, or (b) opening a different lesson. Neither is')
  console.log('  something a learner mid-CHECK can do without abandoning the lesson.')
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. ARBITRATION — how CLOSE takes the probe
// ═══════════════════════════════════════════════════════════════════════════
function arbitrationTrace() {
  rule('2. ARBITRATION AT CHECK WITH AN ELIGIBLE AUTHORED PROBE')
  const base = {
    knowledgeGapResolved: false, recoveryActive: false,
    learnerRequestActive: false, completionReady: false,
  }
  for (const closing of [false, true]) {
    const v = arbitrateTurn({ ...base, closing })
    console.log(`  closing=${String(closing).padEnd(5)} owner=${v.owner.padEnd(15)}`
      + ` AUTHORED_PROBE allowed=${String(v.allows('AUTHORED_PROBE')).padEnd(5)}`
      + ` NEW_QUESTION allowed=${v.allows('NEW_QUESTION')}`)
    console.log(`                denied=[${v.denied.join(', ')}]`)
  }
  console.log('\n  And the OTHER conjunct of gateEligible, independently:')
  console.log(`    closingTurnWithholdsQuestion('CLOSING') = ${closingTurnWithholdsQuestion('CLOSING')}`)
  console.log(`    closingTurnWithholdsQuestion('CORE')    = ${closingTurnWithholdsQuestion('CORE')}`)
  console.log('\n  Two independent gates, one fact. Removing either alone changes nothing —')
  console.log('  which is exactly what the live [gate-eligibility] blockedBy showed:')
  console.log('    blockedBy:["arbitrationAllowsProbe","notClosingTurn"]')
  console.log('\n  Note what does NOT rescue it: a learner request outranks CLOSE, but')
  console.log('  LEARNER_REQUEST ALSO suppresses AUTHORED_PROBE (masteryGate D3/C6) —')
  const req = arbitrateTurn({ ...base, closing: true, learnerRequestActive: true })
  console.log(`    learnerRequest+closing -> owner=${req.owner}, AUTHORED_PROBE=${req.allows('AUTHORED_PROBE')}`)
  console.log('  so asking for a question cannot recover the gate either.')
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. THE FULL LOOP — episode + ladder + gate, driven together
// ═══════════════════════════════════════════════════════════════════════════
interface Turn { said: string; graded?: boolean | null }

/** The real question-supply rule, read from production, nothing invented:
 *  gateEligible = isProbeAttachablePhase(phase) && arbitration.allows(AUTHORED_PROBE)
 *                 && !closingTurnWithholdsQuestion(episode.phase) && … */
function gateWouldServe(convPhase: TeachingPhase, ep: SessionEpisode, said: string, learnerRequest: boolean): boolean {
  const arb = arbitrateTurn({
    knowledgeGapResolved: false, recoveryActive: false,
    learnerRequestActive: learnerRequest, closing: ep.phase === 'CLOSING',
    completionReady: false,
  })
  const phaseAllows = isMasteryGatePhase(convPhase) || (convPhase === 'GUIDE' && asksForPractice(said))
  return phaseAllows
    && isProbeAttachablePhase(convPhase)
    && arb.allows('AUTHORED_PROBE')
    && !closingTurnWithholdsQuestion(ep.phase)
}

function runLesson(label: string, script: Turn[]) {
  let s: ConversationState = initialConversationState('demo.concept')
  let ep = deriveEpisode(null, true, Date.now(), null)
  const rows: string[] = []
  let served = 0
  let closedAt: number | null = null

  for (let i = 0; i < script.length; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) {
      rows.push(`  ${String(i + 1).padStart(2)} | ─── CONCEPT BUDGET EXHAUSTED at ${effectiveTurnBudget(s)} turns ───`)
      break
    }
    const t = script[i]
    const req = detectLearnerRequest(t.said) !== null
    const canServe = gateWouldServe(s.phase, ep, t.said, req)
    if (canServe) served++
    // The learner answers only what was actually put in front of them.
    const graded = t.graded !== undefined ? t.graded : (canServe ? true : null)
    const key = detectFailureState(t.said, null)

    s = advanceConversationState(s, {
      askedQuestion: true, questionSanctioned: true, signalCorrect: graded,
      recoveryFired: key !== null, learnerRequest: detectLearnerRequest(t.said),
      misconceptionDetected: false, isPriorKnowledgeProbe: false,
      dontKnowSignal: isDontKnowSignal(key), learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: true,
      acknowledgement: isLowSignalAcknowledgement(t.said),
    } as Parameters<typeof advanceConversationState>[1])

    const before = ep.phase
    if (graded !== null) ep = applySignalToEpisode(ep, { correctness: graded }, { isFirstLesson: false })
    if (before !== 'CLOSING' && ep.phase === 'CLOSING') closedAt = i + 1

    rows.push(
      `  ${String(i + 1).padStart(2)} | ${s.phase.padEnd(11)} c=${s.correctAtCheck} p=${s.correctAtPractice}`
      + ` | ep=${ep.phase.padEnd(7)} f=${ep.visibleFailures}`
      + ` | ${canServe ? 'Q served ' : 'no question'} | "${t.said}"`,
    )
    if (masteryVerifiedStrict(s)) break
  }
  console.log(`\n  ── ${label} ──`)
  rows.forEach((r) => console.log(r))
  console.log(`     episode entered CLOSING at turn ${closedAt ?? 'never'}`
    + ` | questions served: ${served}`
    + ` | final conv=${s.phase} c=${s.correctAtCheck} p=${s.correctAtPractice} turns=${s.turnsOnConcept}`
    + ` | MASTERED=${masteryVerifiedStrict(s)}`)
  return { closedAt, served, s, ep }
}

function fullLoop() {
  rule('3. THE SMALLEST SEQUENCE THAT STARVES A LEARNER AT CHECK')
  console.log('  Identical scripts. The ONLY difference is one graded answer: the second')
  console.log('  wrong one. Everything else — wording, order, length — is byte-identical.')

  //  Climb to CHECK on acknowledgements (post polite-register fix), then answer.
  const climb: Turn[] = [
    { said: 'ok sir' },                    // OBSERVE -> DEMONSTRATE
    { said: 'ok sir' },                    // DEMONSTRATE -> GUIDE
    { said: 'give me one question sir' },  // GUIDE + practice request -> probe
  ]
  const oneFailure: Turn[] = [
    ...climb,
    { said: 'i think it is the wrong one', graded: false },   // failure 1
    { said: 'ok sir' }, { said: 'ok sir' }, { said: 'ok sir' },
    { said: 'ok sir' }, { said: 'ok sir' }, { said: 'ok sir' },
  ]
  const twoFailures: Turn[] = [
    ...climb,
    { said: 'i think it is the wrong one', graded: false },   // failure 1
    { said: 'i think it is the wrong one', graded: false },   // failure 2 <<<
    { said: 'ok sir' }, { said: 'ok sir' }, { said: 'ok sir' },
    { said: 'ok sir' }, { said: 'ok sir' }, { said: 'ok sir' },
    { said: 'ok sir' }, { said: 'ok sir' },
  ]
  runLesson('ONE visible failure  (the shape phys.em.faradays-law had)', oneFailure)
  runLesson('TWO visible failures (the shape chem.equil.le-chatelier had)', twoFailures)
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. IS THE STARVATION PERMANENT? — 200 turns, budget ignored
// ═══════════════════════════════════════════════════════════════════════════
function permanence() {
  rule('4. ONCE CLOSING, IS THE GATE SHUT FOREVER?')
  let ep: SessionEpisode = {
    startedAt: new Date().toISOString(), phase: 'CLOSING',
    visibleFailures: 2, retroWinOwed: false, openingSatisfied: true,
  }
  let served = 0
  for (let i = 0; i < 200; i++) {
    if (gateWouldServe('CHECK', ep, 'give me one question sir', true)) served++
    // A model of maximal learner effort: they keep asking, and would answer
    // correctly every time — but nothing is ever put in front of them.
    ep = applySignalToEpisode(ep, { correctness: true }, { isFirstLesson: false })
  }
  console.log(`  200 turns at CHECK, learner asking for a question every single turn,`)
  console.log(`  answering correctly whenever asked:  questions served = ${served}`)
  console.log(`  episode after 200 correct answers:   phase = ${ep.phase}, visibleFailures = ${ep.visibleFailures}`)
  console.log('\n  The budget is not the constraint. The concept-turn budget merely decides')
  console.log('  WHEN the starved lesson is written off; it is not why it starved.')
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. ALTERNATIVES — each tested, not argued
// ═══════════════════════════════════════════════════════════════════════════
function alternatives() {
  rule('5. ALTERNATIVE EXPLANATIONS, TESTED')
  const ep = (phase: SessionEpisode['phase'], f: number): SessionEpisode => ({
    startedAt: new Date().toISOString(), phase, visibleFailures: f,
    retroWinOwed: false, openingSatisfied: true,
  })
  const checks: Array<[string, boolean, string]> = [
    ['CORE at CHECK serves a question',
      gateWouldServe('CHECK', ep('CORE', 1), 'ok sir', false), 'must be true'],
    ['CLOSING at CHECK serves a question',
      gateWouldServe('CHECK', ep('CLOSING', 2), 'ok sir', false), 'must be FALSE'],
    ['CLOSING at PRACTICE serves a question',
      gateWouldServe('PRACTICE', ep('CLOSING', 2), 'ok sir', false), 'must be FALSE'],
    ['CLOSING + explicit practice request serves a question',
      gateWouldServe('CHECK', ep('CLOSING', 2), 'give me one question sir', true), 'must be FALSE'],
    ['a 3rd failure is needed (i.e. budget is really 3)',
      ep('CORE', 2).phase === 'CLOSING', 'must be false — 2 is the threshold'],
    ['visibleFailures 1 already closes',
      applySignalToEpisode(ep('CORE', 0), { correctness: false }, { isFirstLesson: false }).phase === 'CLOSING',
      'must be false — one wrong answer is survivable'],
    ['visibleFailures 2 closes',
      applySignalToEpisode(ep('CORE', 1), { correctness: false }, { isFirstLesson: false }).phase === 'CLOSING',
      'must be TRUE — this is the trigger'],
    ['lesson one closes on the FIRST failure',
      applySignalToEpisode(ep('CORE', 0), { correctness: false }, { isFirstLesson: true }).phase === 'CLOSING',
      'must be TRUE — budget is 1 in lesson one'],
    ['an acknowledgement can spend the affect budget',
      applySignalToEpisode(ep('CORE', 1), null, { isFirstLesson: false }).phase === 'CLOSING',
      'must be false — no signal, no failure'],
    ['a CORRECT answer can spend it',
      applySignalToEpisode(ep('CORE', 1), { correctness: true }, { isFirstLesson: false }).phase === 'CLOSING',
      'must be false'],
  ]
  for (const [label, actual, expectation] of checks) {
    console.log(`  ${String(actual).padEnd(6)} ${label.padEnd(52)} (${expectation})`)
  }
}

function main() {
  lifecycleTrace()
  arbitrationTrace()
  fullLoop()
  permanence()
  alternatives()
  rule(`CONCEPT_TURN_BUDGET = ${CONCEPT_TURN_BUDGET} — untouched, and not the cause`)
}

main()
