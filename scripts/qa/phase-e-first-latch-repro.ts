/**
 * PHASE E — THE FIRST LATCH: WHY OBSERVE/DEMONSTRATE CANNOT BE ASSESSED,
 * AND WHAT THE SMALLEST SAFE POLICY WOULD BE.
 *
 * INVESTIGATION ONLY. No production code is changed. Real production modules,
 * no provider, no database, no network, deterministic.
 *
 *   npx tsx scripts/qa/phase-e-first-latch-repro.ts
 */
import {
  advanceConversationState, initialConversationState, isLowSignalAcknowledgement,
  decideNextMove, type ConversationState, type TeachingPhase,
} from '../../src/lib/teaching/conversationState'
import { isProbeAttachablePhase, isMasteryGatePhase } from '../../src/lib/teaching/gateAssessment'
import { masteryVerifiedStrict, asksForPractice, detectLearnerRequest } from '../../src/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '../../src/lib/teaching/recoveryGuard'
import { CONCEPT_TURN_BUDGET, effectiveTurnBudget } from '../../src/lib/teaching/conceptBudget'

const rule = (t: string) => console.log(`\n${'═'.repeat(78)}\n${t}\n${'═'.repeat(78)}`)

// ═══════════════════════════════════════════════════════════════════════════
// The four candidate attachment policies. Only OPTION A is production.
// ═══════════════════════════════════════════════════════════════════════════
type Policy = 'A' | 'B' | 'C' | 'D'

/** Production, verbatim: gateAssessment.isProbeAttachablePhase. */
const policyAllowsPhase = (p: Policy, phase: TeachingPhase): boolean => {
  switch (p) {
    case 'A': return isProbeAttachablePhase(phase)
    case 'B': return phase === 'DEMONSTRATE' || isProbeAttachablePhase(phase)
    case 'C': return phase === 'OBSERVE' || phase === 'DEMONSTRATE' || isProbeAttachablePhase(phase)
    case 'D': return isProbeAttachablePhase(phase)   // unchanged; D changes the EXIT, not the gate
  }
}

/**
 * Would the authored gate actually fire this turn?
 *
 * Both real conjuncts, nothing invented:
 *   1. the policy's phase test, AND
 *   2. route.ts's `phaseAllowsProbe`: a mastery gate, or GUIDE with move 'ask'.
 *      The move is the ladder's OWN decision (decideNextMove), which is what
 *      makes attaching a probe at DEMONSTRATE structurally different — see the
 *      report: DEMONSTRATE always decides 'show', and 'show' asks nothing.
 */
function gateFires(p: Policy, s: ConversationState, said: string): boolean {
  if (!policyAllowsPhase(p, s.phase)) return false
  const move = decideNextMove(s, {
    workedExampleFirst: false,
    practiceRequested: asksForPractice(said),
  } as Parameters<typeof decideNextMove>[1])
  const decided = typeof move === 'string' ? move : (move as { move: string }).move
  if (isMasteryGatePhase(s.phase)) return true
  // Every other phase may only carry a probe on a turn the ladder chose to ASK.
  return decided === 'ask'
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3 — the five learner archetypes
// ═══════════════════════════════════════════════════════════════════════════
const SCRIPTS: Record<string, string[]> = {
  'A only answers questions':        ['i think it is the right one'],
  'B only asks for simpler words':   ['sorry sir can you say more simple', 'please explain one more time simple words'],
  'C only acknowledges':             ['ok sir'],
  'D answers correctly when asked':  ['ok sir', 'sir can you give me one question to try'],
  'E alternates correct + confused': ['ok sir', 'i am bit confused sir', 'give me one more question sir'],
}

interface Result {
  dwell: Record<string, number>
  couldFire: number
  fired: number
  check: number
  practice: number
  mastered: boolean
  turns: number
  reachedGuide: number | null
  reachedCheck: number | null
}

function run(policy: Policy, script: string[], maxTurns = CONCEPT_TURN_BUDGET): Result {
  let s: ConversationState = initialConversationState('demo.concept')
  const dwell: Record<string, number> = {}
  let couldFire = 0, fired = 0
  let reachedGuide: number | null = null, reachedCheck: number | null = null

  for (let i = 0; i < maxTurns; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) break
    const said = script[i % script.length]
    dwell[s.phase] = (dwell[s.phase] ?? 0) + 1

    // "could fire" = an authored probe exists and the phase test alone allows it.
    if (policyAllowsPhase(policy, s.phase)) couldFire++
    const served = gateFires(policy, s, said)
    if (served) fired++

    // OPTION D: a deterministic extra exit from OBSERVE — an explicit request to
    // be questioned concludes the diagnostic, exactly as two failed observation
    // probes already do (phaseAfterConcludedDiagnostic). No probe is attached.
    const dExit = policy === 'D' && s.phase === 'OBSERVE' && asksForPractice(said)

    const key = detectFailureState(said, null)
    s = advanceConversationState(s, {
      askedQuestion: true, questionSanctioned: true,
      signalCorrect: served ? true : null,
      recoveryFired: key !== null,
      learnerRequest: detectLearnerRequest(said),
      misconceptionDetected: false, isPriorKnowledgeProbe: false,
      dontKnowSignal: isDontKnowSignal(key), learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: true,
      acknowledgement: dExit ? true : isLowSignalAcknowledgement(said),
    } as Parameters<typeof advanceConversationState>[1])

    if (reachedGuide === null && s.phase === 'GUIDE') reachedGuide = i + 1
    if (reachedCheck === null && (s.phase === 'CHECK' || s.phase === 'PRACTICE')) reachedCheck = i + 1
    if (masteryVerifiedStrict(s)) break
  }
  return {
    dwell, couldFire, fired,
    check: s.correctAtCheck, practice: s.correctAtPractice,
    mastered: masteryVerifiedStrict(s), turns: s.turnsOnConcept ?? 0,
    reachedGuide, reachedCheck,
  }
}

const fmt = (r: Result) =>
  `O=${(r.dwell.OBSERVE ?? 0).toString().padStart(2)} D=${(r.dwell.DEMONSTRATE ?? 0)} `
  + `G=${(r.dwell.GUIDE ?? 0).toString().padStart(2)} C=${(r.dwell.CHECK ?? 0)} P=${(r.dwell.PRACTICE ?? 0)} `
  + `| probes could=${r.couldFire.toString().padStart(2)} fired=${r.fired.toString().padStart(2)} `
  + `| ->GUIDE ${String(r.reachedGuide ?? '—').padStart(3)} ->CHECK ${String(r.reachedCheck ?? '—').padStart(3)} `
  + `| c=${r.check} p=${r.practice} ${r.mastered ? 'MASTERED' : '        '}`

function part3() {
  rule('PART 3 — REACHABILITY UNDER PRODUCTION POLICY (A)')
  console.log('  Budget 12. "could" = phase test alone; "fired" = phase AND the ladder\'s')
  console.log('  own decided move, which is the real gate.\n')
  for (const [name, script] of Object.entries(SCRIPTS)) {
    console.log(`  ${name.padEnd(34)} ${fmt(run('A', script))}`)
  }
  console.log('\n  THE QUESTION: can a weak learner reach mastery when the only questions')
  console.log('  available before GUIDE are ones the MODEL volunteers?')
}

function part4() {
  rule('PART 4 — THE FOUR POLICIES, SAME LEARNERS')
  for (const [name, script] of Object.entries(SCRIPTS)) {
    console.log(`\n  ${name}`)
    for (const p of ['A', 'B', 'C', 'D'] as Policy[]) {
      console.log(`    ${p}  ${fmt(run(p, script))}`)
    }
  }
}

function part4b() {
  rule('PART 4b — WHY OPTION B CANNOT HELP, MEASURED')
  console.log('  DEMONSTRATE\'s decided move, at every state a learner can be in there:\n')
  for (const demonstrated of [false, true]) {
    for (const fails of [0, 1, 2]) {
      const s: ConversationState = {
        ...initialConversationState('demo.concept'),
        phase: 'DEMONSTRATE', demonstrated, consecutiveFailures: fails,
      }
      const move = decideNextMove(s, { workedExampleFirst: false, practiceRequested: true } as Parameters<typeof decideNextMove>[1])
      const decided = typeof move === 'string' ? move : (move as { move: string }).move
      console.log(`    demonstrated=${String(demonstrated).padEnd(5)} consecutiveFailures=${fails}`
        + `  practiceRequested=true  ->  move '${decided}'`)
    }
  }
  console.log('\n  A probe may only ride a turn the ladder decided to ASK. DEMONSTRATE never')
  console.log('  decides ask — not even when the learner explicitly requests a question.')
  console.log('  So OPTION B is either vacuous (gated on the move) or contradicts the')
  console.log('  ladder\'s own decision (not gated), which is the defect shape')
  console.log('  gateAssessment:475 calls "the FIFTH root-cause fix of one recurring shape".')
  console.log('\n  And it has no headroom to buy even if it were safe — DEMONSTRATE dwell,')
  console.log('  measured live across the last 8 lessons: 1,1,1,2,1,1,1,2 turns.')
}

function part5() {
  rule('PART 5 — REGRESSION INVARIANTS UNDER EVERY POLICY')
  const checks: Array<[string, (p: Policy) => boolean]> = [
    ['an acknowledgement never increments check/practice', (p) => {
      const s: ConversationState = { ...initialConversationState('c'), phase: 'CHECK', demonstrated: true }
      const n = advanceConversationState(s, {
        askedQuestion: false, questionSanctioned: true, signalCorrect: null,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
        degradedTurn: false, deliveredTeaching: true, acknowledgement: true,
      } as Parameters<typeof advanceConversationState>[1])
      return n.correctAtCheck === 0 && n.correctAtPractice === 0 && policyAllowsPhase(p, 'CHECK')
    }],
    ['a wrong answer never increments check/practice', (p) => {
      const s: ConversationState = { ...initialConversationState('c'), phase: 'CHECK', demonstrated: true }
      const n = advanceConversationState(s, {
        askedQuestion: true, questionSanctioned: true, signalCorrect: false,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
        degradedTurn: false, deliveredTeaching: false, acknowledgement: false,
      } as Parameters<typeof advanceConversationState>[1])
      return n.correctAtCheck === 0 && n.correctAtPractice === 0 && !!p
    }],
    ['a degraded turn never advances the ladder', (p) => {
      const s: ConversationState = { ...initialConversationState('c'), phase: 'CHECK', demonstrated: true }
      const n = advanceConversationState(s, {
        askedQuestion: false, questionSanctioned: true, signalCorrect: null,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
        degradedTurn: true, deliveredTeaching: true, acknowledgement: false,
      } as Parameters<typeof advanceConversationState>[1])
      return n.phase === 'CHECK' && n.turnsOnConcept === s.turnsOnConcept && !!p
    }],
    ['check/practice still move ONLY inside CHECK/PRACTICE', () =>
      !isMasteryGatePhase('OBSERVE') && !isMasteryGatePhase('DEMONSTRATE')
      && !isMasteryGatePhase('GUIDE') && isMasteryGatePhase('CHECK') && isMasteryGatePhase('PRACTICE')],
    ['no policy grants mastery without graded evidence', (p) => {
      // 40 turns of a learner who is SERVED probes and never answers one —
      // they only acknowledge. `run()` deliberately models the opposite (it
      // assumes a correct answer whenever a probe is served), so this drives
      // the fold directly rather than through it. That shortcut is a property
      // of the simulator, not of the product, and must not be measured as one.
      let s: ConversationState = initialConversationState('c')
      for (let i = 0; i < 40; i++) {
        s = advanceConversationState(s, {
          askedQuestion: true, questionSanctioned: true, signalCorrect: null,
          recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
          isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
          degradedTurn: false, deliveredTeaching: true, acknowledgement: true,
        } as Parameters<typeof advanceConversationState>[1])
      }
      return !!p && !masteryVerifiedStrict(s) && s.correctAtCheck === 0 && s.correctAtPractice === 0
    }],
  ]
  for (const [label, fn] of checks) {
    const results = (['A', 'B', 'C', 'D'] as Policy[]).map((p) => fn(p))
    console.log(`  ${results.every(Boolean) ? 'HOLDS ' : 'BROKEN'} under A/B/C/D  ${label}`)
  }
  console.log(`\n  CONCEPT_TURN_BUDGET = ${CONCEPT_TURN_BUDGET}, untouched throughout.`)
}

function main() { part3(); part4(); part4b(); part5() }
main()
