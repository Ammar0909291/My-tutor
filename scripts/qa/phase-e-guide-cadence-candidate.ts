/**
 * PHASE E — CAN `turnsInCurrentPhase` MAKE GUIDE ASSESSMENT DETERMINISTIC
 * WITHOUT TURNING THE TUTOR INTO A PREMATURE QUIZ MACHINE?
 *
 * INVESTIGATION ONLY. No production code changed. Real modules, no provider,
 * no DB, deterministic.
 *
 * THE CANDIDATE, stated exactly (NOT implemented):
 *   case 'GUIDE': return (teachSegmentsSinceQuestion >= 2
 *                         || practiceRequested
 *                         || turnsInCurrentPhase >= N) ? 'ask' : 'teach'
 * i.e. one extra DISJUNCT inside the existing GUIDE branch, below every gate
 * that already returns before it.
 *
 * HOW THE SIMULATION STAYS FAITHFUL. It never re-implements
 * decideNextMoveHeuristic. It calls the real `decideNextMove`, and detects
 * whether an EARLIER gate fired by asking the same function about the same
 * state with the phase forced to CHECK — a phase whose switch arm is
 * unconditionally 'ask'. If that still answers 'teach'/'show', a gate above the
 * switch fired, and the candidate must not override it.
 *
 *   npx tsx scripts/qa/phase-e-guide-cadence-candidate.ts
 */
import {
  advanceConversationState, initialConversationState, isLowSignalAcknowledgement,
  decideNextMove, repliesWithQuestion,
  type ConversationState, type TeachingPhase,
} from '../../src/lib/teaching/conversationState'
import { isProbeAttachablePhase, isMasteryGatePhase, closingTurnWithholdsQuestion } from '../../src/lib/teaching/gateAssessment'
import { arbitrateTurn } from '../../src/lib/teaching/turnArbitration'
import { masteryVerifiedStrict, asksForPractice, detectLearnerRequest } from '../../src/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '../../src/lib/teaching/recoveryGuard'
import { CONCEPT_TURN_BUDGET, effectiveTurnBudget } from '../../src/lib/teaching/conceptBudget'

const rule = (t: string) => console.log(`\n${'═'.repeat(78)}\n${t}\n${'═'.repeat(78)}`)
type Ev = Parameters<typeof advanceConversationState>[1]
type Ctx = Parameters<typeof decideNextMove>[1]

const base = (o: Partial<Ev> = {}): Ev => ({
  askedQuestion: true, questionSanctioned: true, signalCorrect: null,
  recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
  isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
  degradedTurn: false, deliveredTeaching: false, acknowledgement: false, ...o,
} as Ev)

const moveOf = (s: ConversationState, practiceRequested: boolean): string => {
  const m = decideNextMove(s, { workedExampleFirst: false, practiceRequested } as Ctx)
  return typeof m === 'string' ? m : (m as { move: string }).move
}

/** Did a gate ABOVE the phase switch fire? CHECK's arm is unconditionally 'ask'. */
const earlierGateFired = (s: ConversationState, practiceRequested: boolean): boolean =>
  moveOf({ ...s, phase: 'CHECK' }, practiceRequested) !== 'ask'

/** The candidate's decided move. N = 0 means "production, unchanged". */
function candidateMove(s: ConversationState, practiceRequested: boolean, N: number): string {
  const production = moveOf(s, practiceRequested)
  if (N === 0 || s.phase !== 'GUIDE') return production
  if (earlierGateFired(s, practiceRequested)) return production   // never override remediation
  const dwell = s.turnsInCurrentPhase ?? 0
  return (s.teachSegmentsSinceQuestion >= 2 || practiceRequested || dwell >= N) ? 'ask' : production
}

/** route.ts's phaseAllowsProbe + the two CLOSE conjuncts, verbatim in shape. */
function probeAttaches(
  s: ConversationState, practiceRequested: boolean, N: number,
  opts: { closing?: boolean; recovery?: boolean; unansweredProbe?: boolean } = {},
): boolean {
  const decided = candidateMove(s, practiceRequested, N)
  const phaseOk = isProbeAttachablePhase(s.phase)
    && (isMasteryGatePhase(s.phase) || (s.phase === 'GUIDE' && decided === 'ask'))
  if (!phaseOk) return false
  if (opts.unansweredProbe) return false
  const arb = arbitrateTurn({
    knowledgeGapResolved: false, recoveryActive: opts.recovery === true,
    learnerRequestActive: false, closing: opts.closing === true, completionReady: false,
  })
  return arb.allows('AUTHORED_PROBE') && !closingTurnWithholdsQuestion(opts.closing ? 'CLOSING' : 'CORE')
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 1 — THE THRESHOLD SWEEP
// ═══════════════════════════════════════════════════════════════════════════
function part1() {
  rule('PART 1 — THRESHOLD SWEEP AT GUIDE (dwell 0..5 × eight conditions)')
  const guide = (dwell: number, over: Partial<ConversationState> = {}): ConversationState => ({
    ...initialConversationState('c'), phase: 'GUIDE', demonstrated: true,
    turnsInCurrentPhase: dwell, ...over,
  })
  const conditions: Array<[string, ConversationState, boolean, Parameters<typeof probeAttaches>[3]]> = [
    ['A model TEACH (no question asked yet)', guide(0, { teachSegmentsSinceQuestion: 0 }), false, {}],
    ['B model ASK (chatty, tSSQ pinned 0)',   guide(0, { teachSegmentsSinceQuestion: 0 }), false, {}],
    ['C learner asks for practice',           guide(0), true,  {}],
    ['D learner asks for simpler explanation', guide(0, { consecutiveFailures: 1, remediationCount: 1 }), false, {}],
    ['E learner acknowledges',                guide(0), false, {}],
    ['F unanswered authored probe on screen', guide(0), false, { unansweredProbe: true }],
    ['G right after a WRONG answer',          guide(0, { consecutiveFailures: 1 }), false, {}],
    ['H right after a CORRECT answer',        guide(0, { consecutiveFailures: 0 }), false, {}],
  ]
  console.log('  condition                                 dwell:  0    1    2    3    4    5')
  for (const [label, st, pr, opts] of conditions) {
    const cells = [0, 1, 2, 3, 4, 5].map((d) => {
      // N is the threshold; here we ask "at dwell d, does a floor of N=d attach?"
      const s = { ...st, turnsInCurrentPhase: d }
      return probeAttaches(s, pr, d === 0 ? 0 : d, opts) ? ' YES' : '  no'
    })
    console.log(`  ${label.padEnd(41)}       ${cells.join(' ')}`)
  }
  console.log('\n  Now the real question: with a FIXED floor N, at which dwell does a probe')
  console.log('  first attach for the chatty-model learner who never asks for practice?\n')
  for (const N of [1, 2, 3, 4, 5]) {
    const first = [0, 1, 2, 3, 4, 5, 6].find((d) =>
      probeAttaches(guide(d, { teachSegmentsSinceQuestion: 0 }), false, N))
    console.log(`    floor N=${N}  ->  first attaches at GUIDE dwell ${first ?? 'never'}`
      + `   (turn ${first === undefined ? '—' : first + 1} of the GUIDE stay)`)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 2/3 — MODEL VARIANCE AND FULL LADDER
// ═══════════════════════════════════════════════════════════════════════════
type ModelStyle = 'always-TEACH' | 'always-ASK' | 'alternate' | 'chatty-teach-with-?'
const MODEL_TEXT: Record<ModelStyle, (t: number) => string> = {
  'always-TEACH':        () => 'Here is the idea, step by step.',
  'always-ASK':          () => 'Here is the idea. Does that make sense?',
  'alternate':           (t) => (t % 2 === 0 ? 'Here is the idea. What do you notice?' : 'Here is the idea.'),
  'chatty-teach-with-?': () => 'Let me explain it another way. Following so far?',
}

interface Row { dwell: Record<string, number>; served: number; check: number; practice: number
  mastered: boolean; reached: Record<string, boolean> }

function ladder(style: ModelStyle, script: string[], N: number, turns = CONCEPT_TURN_BUDGET): Row {
  let s: ConversationState = initialConversationState('c')
  const dwell: Record<string, number> = {}
  const reached: Record<string, boolean> = {}
  let served = 0
  for (let i = 0; i < turns; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) break
    const said = script[i % script.length]
    dwell[s.phase] = (dwell[s.phase] ?? 0) + 1
    reached[s.phase] = true
    const pr = asksForPractice(said)
    const decided = candidateMove(s, pr, N)
    const attaches = probeAttaches(s, pr, N)
    if (attaches) served++
    const askedQuestion = repliesWithQuestion(MODEL_TEXT[style](i)) || attaches
    const key = detectFailureState(said, null)
    s = advanceConversationState(s, base({
      askedQuestion, questionSanctioned: decided === 'ask',
      signalCorrect: attaches ? true : null,
      recoveryFired: key !== null, learnerRequest: detectLearnerRequest(said),
      dontKnowSignal: isDontKnowSignal(key),
      deliveredTeaching: decided === 'teach' || decided === 'show',
      acknowledgement: isLowSignalAcknowledgement(said),
    }))
    reached[s.phase] = true
    if (masteryVerifiedStrict(s)) break
  }
  return { dwell, served, check: s.correctAtCheck, practice: s.correctAtPractice,
    mastered: masteryVerifiedStrict(s), reached }
}

const show = (r: Row) =>
  `O=${String(r.dwell.OBSERVE ?? 0).padStart(2)} D=${r.dwell.DEMONSTRATE ?? 0} G=${String(r.dwell.GUIDE ?? 0).padStart(2)} `
  + `C=${r.dwell.CHECK ?? 0} P=${r.dwell.PRACTICE ?? 0} | probes ${String(r.served).padStart(2)} `
  + `| ${r.reached.CHECK ? 'CHK' : '   '} ${r.reached.PRACTICE ? 'PRA' : '   '} ${r.reached.TRANSFER ? 'TRA' : '   '} `
  + `| c=${r.check} p=${r.practice} ${r.mastered ? 'MASTERED' : ''}`

const ARCHETYPES: Record<string, string[]> = {
  'A only answers questions':      ['i think it is the right one'],
  'B only asks for simpler words': ['sorry sir can you say more simple', 'please explain one more time simple words'],
  'C only acknowledges':           ['ok sir'],
  'D answers when asked':          ['ok sir', 'sir can you give me one question to try'],
  'E correct + confused':          ['ok sir', 'i am bit confused sir', 'give me one more question sir'],
  'F never ack, never asks':       ['ok but why it happen like that', 'hmm i think i get little bit'],
  // THE ONE THAT MATTERS: the exact live harness cycle, in order. The clean
  // Phase E run produced GUIDE dwell 3,3,3,2 on this script, which is the only
  // place a dwell floor could ever have fired.
  'LIVE harness cycle':            ['sir i not understand this', 'ok but why it happen like that',
                                    'sorry sir can you say more simple', 'i want practice please',
                                    'hmm i think i get little bit', 'can you show picture please',
                                    'ok sir', 'give me one more question sir',
                                    'i am bit confused sir', 'please explain one more time simple words'],
}

function part23() {
  rule('PART 2/3 — FULL LADDER: PRODUCTION (N=0) vs CANDIDATE, ALL MODELS')
  for (const [name, script] of Object.entries(ARCHETYPES)) {
    console.log(`\n  ${name}`)
    for (const style of Object.keys(MODEL_TEXT) as ModelStyle[]) {
      const prod = ladder(style, script, 0)
      const cand = ladder(style, script, 3)
      const changed = prod.mastered !== cand.mastered || prod.served !== cand.served
      console.log(`    ${style.padEnd(21)} prod  ${show(prod)}`)
      console.log(`    ${' '.repeat(21)} N=3   ${show(cand)}${changed ? '   <<< CHANGED' : ''}`)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 4 + 9 — PEDAGOGICAL AND CLOSE SAFETY
// ═══════════════════════════════════════════════════════════════════════════
function part49() {
  rule('PART 4 + 9 — CAN THE CANDIDATE PUT A QUESTION WHERE IT MUST NOT?')
  const N = 3
  const st = (phase: TeachingPhase, over: Partial<ConversationState> = {}): ConversationState => ({
    ...initialConversationState('c'), phase, demonstrated: phase !== 'OBSERVE',
    turnsInCurrentPhase: 99, ...over,
  })
  const cases: Array<[string, boolean, boolean]> = [
    ['OBSERVE, dwell 99 (before any teaching)', probeAttaches(st('OBSERVE'), false, N), false],
    ['DEMONSTRATE, dwell 99',                   probeAttaches(st('DEMONSTRATE'), false, N), false],
    ['GUIDE, dwell 99',                         probeAttaches(st('GUIDE'), false, N), true],
    ['CHECK',                                   probeAttaches(st('CHECK'), false, N), true],
    ['PRACTICE',                                probeAttaches(st('PRACTICE'), false, N), true],
    ['TRANSFER (existing policy: not attachable)', probeAttaches(st('TRANSFER'), false, N), false],
    ['GUIDE while CLOSING',                     probeAttaches(st('GUIDE'), false, N, { closing: true }), false],
    ['GUIDE while recovery active',             probeAttaches(st('GUIDE'), false, N, { recovery: true }), false],
    ['GUIDE with an unanswered probe on screen', probeAttaches(st('GUIDE'), false, N, { unansweredProbe: true }), false],
    ['GUIDE right after a WRONG answer',
      probeAttaches(st('GUIDE', { consecutiveFailures: 1 }), false, N), true],
    ['GUIDE after TWO wrong answers (struggle gate)',
      probeAttaches(st('GUIDE', { consecutiveFailures: 2 }), false, N), false],
    ['GUIDE mid-remediation (2 dontKnows)',
      probeAttaches(st('GUIDE', { consecutiveDontKnows: 2 }), false, N), false],
    ['GUIDE after a degraded turn (dwell PINNED, not incremented)',
      probeAttaches(st('GUIDE', { turnsInCurrentPhase: 0 }), false, N), false],
    ['GUIDE after explicit stop -> CLOSING',    probeAttaches(st('GUIDE'), false, N, { closing: true }), false],
  ]
  for (const [label, actual, expected] of cases) {
    console.log(`  ${actual === expected ? 'OK  ' : 'FAIL'} ${String(actual).padEnd(5)} (expected ${expected})  ${label}`)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 6 — REMEDIATION INTERACTION
// ═══════════════════════════════════════════════════════════════════════════
function part6() {
  rule('PART 6 — LEARNER AT GUIDE ASKING FOR SIMPLER WORDS, FOREVER')
  for (const N of [0, 3]) {
    let s: ConversationState = { ...initialConversationState('c'), phase: 'GUIDE', demonstrated: true }
    let served = 0
    const said = "I don't understand"
    for (let i = 0; i < 12; i++) {
      const pr = asksForPractice(said)
      const decided = candidateMove(s, pr, N)
      const attaches = probeAttaches(s, pr, N)
      if (attaches) served++
      const key = detectFailureState(said, null)
      s = advanceConversationState(s, base({
        askedQuestion: true, questionSanctioned: decided === 'ask',
        signalCorrect: attaches ? true : null,
        recoveryFired: key !== null, learnerRequest: detectLearnerRequest(said),
        dontKnowSignal: isDontKnowSignal(key),
        deliveredTeaching: decided === 'teach' || decided === 'show',
      }))
    }
    console.log(`  ${N === 0 ? 'production' : 'N=3       '}  probes served ${served}  phase ${s.phase.padEnd(11)}`
      + ` consecutiveFailures=${s.consecutiveFailures} remediationCount=${s.remediationCount}`
      + ` c=${s.correctAtCheck} p=${s.correctAtPractice}`)
  }
  console.log('\n  A learner who says "I don\'t understand" is in remediation; the branch')
  console.log('  returns early and demotes, so GUIDE is left almost immediately and the')
  console.log('  dwell floor never accumulates. The candidate does not quiz them.')
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 7 — MASTERY SAFETY
// ═══════════════════════════════════════════════════════════════════════════
function part7() {
  rule('PART 7 — THE CANDIDATE MAY CREATE OPPORTUNITY, NEVER EVIDENCE')
  const drive = (n: number, ev: Partial<Ev>) => {
    let s: ConversationState = { ...initialConversationState('c'), phase: 'CHECK', demonstrated: true }
    for (let i = 0; i < n; i++) s = advanceConversationState(s, base(ev))
    return s
  }
  const rows: Array<[string, ConversationState]> = [
    ['100 acknowledgements',            drive(100, { acknowledgement: true, askedQuestion: false, deliveredTeaching: true })],
    ['100 wrong answers',               drive(100, { signalCorrect: false })],
    ['100 degraded turns',              drive(100, { degradedTurn: true, signalCorrect: true })],
    ['100 forced ASK, no correct answer', drive(100, { askedQuestion: true, questionSanctioned: true, signalCorrect: null })],
  ]
  for (const [label, s] of rows) {
    const ok = s.correctAtCheck === 0 && s.correctAtPractice === 0 && !masteryVerifiedStrict(s)
    console.log(`  ${ok ? 'SAFE  ' : 'BROKEN'} ${label.padEnd(36)} c=${s.correctAtCheck} p=${s.correctAtPractice}`
      + ` mastered=${masteryVerifiedStrict(s)} turnsOnConcept=${s.turnsOnConcept}`)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 8 — THE 12-TURN BUDGET, ARITHMETICALLY
// ═══════════════════════════════════════════════════════════════════════════
function part8() {
  rule('PART 8 — WORST-CASE TURN COUNT UNDER THE CANDIDATE (budget NOT changed)')
  const N = 3
  const legs: Array<[string, number, string]> = [
    ['OBSERVE exit',            1, 'one ack, or one graded-correct answer'],
    ['DEMONSTRATE delivery',    1, 'G-1 exits on the first give'],
    ['GUIDE dwell to the floor', N, `turnsInCurrentPhase must reach ${N}`],
    ['GUIDE assessment + pass', 1, 'the probe attaches and is answered -> CHECK'],
    ['CHECK correct',           1, ''],
    ['PRACTICE correct x2',     2, ''],
    ['one WRONG answer',        1, 'costs a rung: phaseDown, must be re-earned'],
    ['re-earn the lost rung',   1, ''],
    ['one remediation turn',    1, 'explain-differently, returns early'],
  ]
  let total = 0
  for (const [label, n, note] of legs) { total += n; console.log(`  ${String(n).padStart(2)}  ${label.padEnd(26)} ${note}`) }
  console.log(`  ${'—'.repeat(4)}`)
  console.log(`  ${String(total).padStart(2)}  TOTAL worst case`)
  console.log(`\n  CONCEPT_TURN_BUDGET = ${CONCEPT_TURN_BUDGET}.  ${total <= CONCEPT_TURN_BUDGET
    ? `SUFFICIENT, with ${CONCEPT_TURN_BUDGET - total} turns of slack.`
    : `INSUFFICIENT by ${total - CONCEPT_TURN_BUDGET} turns — reported, not fixed.`}`)
  for (const n of [2, 3, 4]) {
    const t = total - N + n
    console.log(`    with floor N=${n}: worst case ${t} turns -> ${t <= CONCEPT_TURN_BUDGET ? 'fits' : 'does NOT fit'}`)
  }
}

function main() { part1(); part23(); part49(); part6(); part7(); part8() }
main()
