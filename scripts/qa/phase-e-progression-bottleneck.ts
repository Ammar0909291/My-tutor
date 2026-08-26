/**
 * PHASE E — DOES THE TEACHING LADDER DEPEND ON MODEL VARIANCE?
 *
 * INVESTIGATION ONLY. No production code changed. Real modules, no provider,
 * no database, deterministic.
 *
 * The separation this script exists to make: the LEARNER's input and the
 * MODEL's presentation choice are two independent variables, and the runtime
 * folds both into one state machine. Holding the learner fixed and varying only
 * whether the model happened to end its turn with a question is the experiment.
 *
 *   npx tsx scripts/qa/phase-e-progression-bottleneck.ts
 */
import {
  advanceConversationState, initialConversationState, isLowSignalAcknowledgement,
  decideNextMove, repliesWithQuestion,
  type ConversationState, type TeachingPhase,
} from '../../src/lib/teaching/conversationState'
import { isProbeAttachablePhase, isMasteryGatePhase } from '../../src/lib/teaching/gateAssessment'
import { masteryVerifiedStrict, asksForPractice, detectLearnerRequest } from '../../src/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '../../src/lib/teaching/recoveryGuard'
import { CONCEPT_TURN_BUDGET, effectiveTurnBudget } from '../../src/lib/teaching/conceptBudget'

const rule = (t: string) => console.log(`\n${'═'.repeat(78)}\n${t}\n${'═'.repeat(78)}`)

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE OBSERVE EXIT GRAPH — every transition, from the real fold
// ═══════════════════════════════════════════════════════════════════════════
type Ev = Parameters<typeof advanceConversationState>[1]
const base = (over: Partial<Ev> = {}): Ev => ({
  askedQuestion: true, questionSanctioned: true, signalCorrect: null,
  recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
  isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
  degradedTurn: false, deliveredTeaching: false, acknowledgement: false,
  ...over,
} as Ev)

function observeExitGraph() {
  rule('1. THE OBSERVE EXIT GRAPH — driven through the real fold')
  const at = (): ConversationState => initialConversationState('c')
  const probes: Array<[string, Ev[], string]> = [
    ['graded CORRECT answer', [base({ signalCorrect: true })], 'needs a question on screen'],
    ['acknowledgement', [base({ acknowledgement: true })], 'needs the learner to say a recognised ack'],
    ['graded WRONG × 1', [base({ signalCorrect: false })], '—'],
    ['graded WRONG × 2', [base({ signalCorrect: false }), base({ signalCorrect: false })], 'needs TWO questions'],
    ['recovery utterance × 2', [base({ recoveryFired: true, dontKnowSignal: true }),
                                base({ recoveryFired: true, dontKnowSignal: true })], 'needs detectFailureState to match'],
    ['explain_differently × 5', Array.from({ length: 5 }, () => base({ learnerRequest: 'explain_differently' })), '—'],
    ['explain_differently × 20', Array.from({ length: 20 }, () => base({ learnerRequest: 'explain_differently' })), '—'],
    ['diagram request × 10', Array.from({ length: 10 }, () => base({ learnerRequest: 'diagram' })), '—'],
    ['no signal at all × 20', Array.from({ length: 20 }, () => base()), '—'],
    ['a GIVE (model taught, asked nothing) × 20',
      Array.from({ length: 20 }, () => base({ askedQuestion: false, deliveredTeaching: true })), '—'],
  ]
  console.log('  input                                    -> phase after      exits?  depends on')
  for (const [label, evs, dep] of probes) {
    let s = at()
    for (const e of evs) s = advanceConversationState(s, e)
    const exited = s.phase !== 'OBSERVE'
    console.log(`  ${label.padEnd(40)} -> ${s.phase.padEnd(12)} ${exited ? 'YES ' : 'NO  '}   ${dep}`)
  }
  console.log('\n  There is NO OBSERVE -> GUIDE edge. Every exit lands on DEMONSTRATE.')
  console.log('  Three exits exist and all three need something the learner may never give:')
  console.log('    E1 a graded-correct answer   (needs a question to exist)')
  console.log('    E2 an acknowledgement        (needs recognised ack wording)')
  console.log('    E3 two concluded diagnostics (needs two graded wrongs, or two')
  console.log('       recovery utterances detectFailureState actually matches)')
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE REMEDIATION EARLY RETURN — a fixed point in standard English
// ═══════════════════════════════════════════════════════════════════════════
function remediationFixedPoint() {
  rule('2. "I DON\'T UNDERSTAND", REPEATED — WHERE IT LANDS')
  for (const said of ["I don't understand", 'I am confused', 'sorry sir can you say more simple']) {
    const req = detectLearnerRequest(said)
    const key = detectFailureState(said, null)
    let s = initialConversationState('c')
    for (let i = 0; i < 30; i++) {
      s = advanceConversationState(s, base({
        learnerRequest: req, recoveryFired: key !== null, dontKnowSignal: isDontKnowSignal(key),
      }))
    }
    console.log(`  "${said}"`)
    console.log(`     request=${String(req).padEnd(20)} failureKey=${String(key ?? '—').padEnd(16)}`)
    console.log(`     after 30 turns: phase=${s.phase} consecutiveFailures=${s.consecutiveFailures}`
      + ` observeFailures=${s.observeFailures ?? 0} consecutiveDontKnows=${s.consecutiveDontKnows}`)
  }
  console.log('\n  The remediation branch RETURNS EARLY, above the `failed` branch — so it')
  console.log('  never increments `observeFailures` and never calls')
  console.log('  phaseAfterConcludedDiagnostic. `consecutiveFailures` climbs forever and')
  console.log('  only changes the MOVE. That is the "a move-layer escape cannot advance a')
  console.log('  ladder" defect QL-2 already fixed once — for the OTHER path.')
}

// ═══════════════════════════════════════════════════════════════════════════
// 3/4. THE MODEL-VARIANCE EXPERIMENT
// ═══════════════════════════════════════════════════════════════════════════
/** What the MODEL did this turn — independent of the learner. */
type ModelStyle = 'asks-every-turn' | 'teaches-every-turn' | 'never-asks' | 'alternates'

/** Real production text, so `repliesWithQuestion` decides — not a boolean I set. */
const MODEL_TEXT: Record<ModelStyle, (turn: number) => string> = {
  'asks-every-turn':    () => 'Here is the idea. Does that make sense so far?',
  'teaches-every-turn': () => 'Here is the idea, explained step by step.',
  'never-asks':         () => 'Here is the idea, explained step by step.',
  'alternates':         (t) => (t % 2 === 0 ? 'Here is the idea. What do you notice?' : 'Here is the idea.'),
}

interface Row {
  dwell: Record<string, number>
  eligible: number
  served: number
  check: number
  practice: number
  mastered: boolean
  reachedCheck: number | null
}

function simulate(style: ModelStyle, learner: string[], turns = CONCEPT_TURN_BUDGET): Row {
  let s: ConversationState = initialConversationState('c')
  const dwell: Record<string, number> = {}
  let eligible = 0, served = 0, reachedCheck: number | null = null

  for (let i = 0; i < turns; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) break
    const said = learner[i % learner.length]
    dwell[s.phase] = (dwell[s.phase] ?? 0) + 1

    const practiceRequested = asksForPractice(said)
    const move = decideNextMove(s, { workedExampleFirst: false, practiceRequested } as Parameters<typeof decideNextMove>[1])
    const decided = typeof move === 'string' ? move : (move as { move: string }).move

    // route.ts `phaseAllowsProbe`, verbatim in shape.
    const canAttach = isProbeAttachablePhase(s.phase)
      && (isMasteryGatePhase(s.phase) || (s.phase === 'GUIDE' && decided === 'ask'))
    if (canAttach) { eligible++; served++ }

    // The MODEL's own output decides askedQuestion, exactly as route.ts does.
    const modelText = MODEL_TEXT[style](i)
    const askedQuestion = repliesWithQuestion(modelText) || canAttach

    const key = detectFailureState(said, null)
    s = advanceConversationState(s, base({
      askedQuestion,
      signalCorrect: canAttach ? true : null,
      recoveryFired: key !== null,
      learnerRequest: detectLearnerRequest(said),
      dontKnowSignal: isDontKnowSignal(key),
      // route.ts:5686 verbatim — the SERVER's decided move, not whether the
      // model happened to ask. Getting this wrong inflates the finding.
      deliveredTeaching: decided === 'teach' || decided === 'show',
      acknowledgement: isLowSignalAcknowledgement(said),
    }))
    if (reachedCheck === null && (s.phase === 'CHECK' || s.phase === 'PRACTICE')) reachedCheck = i + 1
    if (masteryVerifiedStrict(s)) break
  }
  return { dwell, eligible, served, check: s.correctAtCheck, practice: s.correctAtPractice,
    mastered: masteryVerifiedStrict(s), reachedCheck }
}

const show = (r: Row) =>
  `O=${String(r.dwell.OBSERVE ?? 0).padStart(2)} D=${r.dwell.DEMONSTRATE ?? 0} `
  + `G=${String(r.dwell.GUIDE ?? 0).padStart(2)} C=${r.dwell.CHECK ?? 0} P=${r.dwell.PRACTICE ?? 0} `
  + `| probes ${String(r.served).padStart(2)} | ->CHECK ${String(r.reachedCheck ?? '—').padStart(3)} `
  + `| c=${r.check} p=${r.practice} ${r.mastered ? 'MASTERED' : ''}`

function modelVariance() {
  rule('3/4. SAME LEARNER, DIFFERENT MODEL — the experiment')
  const learners: Record<string, string[]> = {
    'F cooperates, never asks for practice': ['ok sir', 'i am bit confused sir', 'sorry sir can you say more simple'],
    'E cooperates AND asks for practice':    ['ok sir', 'give me one more question sir'],
  }
  for (const [lname, script] of Object.entries(learners)) {
    console.log(`\n  ${lname}`)
    for (const style of ['asks-every-turn', 'teaches-every-turn', 'never-asks', 'alternates'] as ModelStyle[]) {
      console.log(`    model ${style.padEnd(19)} ${show(simulate(style, script))}`)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. THE WORST CASE, PROVED
// ═══════════════════════════════════════════════════════════════════════════
function worstCase() {
  rule('5. THE FIXED POINT AT GUIDE — the anti-interrogation budget')
  console.log('  A learner who ASKS FOR PRACTICE on every single turn — the most')
  console.log('  cooperative input possible — against a tutor that ends each turn with a')
  console.log('  question, which is ordinary good teaching.\n')

  for (const modelAsks of [true, false]) {
    let s: ConversationState = {
      ...initialConversationState('c'), phase: 'GUIDE', demonstrated: true,
    }
    let served = 0
    const moves: string[] = []
    for (let i = 0; i < 30; i++) {
      const said = 'give me one more question sir'
      const practiceRequested = asksForPractice(said)
      const move = decideNextMove(s, { workedExampleFirst: false, practiceRequested } as Parameters<typeof decideNextMove>[1])
      const decided = typeof move === 'string' ? move : (move as { move: string }).move
      if (i < 6) moves.push(decided)
      const canAttach = s.phase === 'GUIDE' && decided === 'ask'
      if (canAttach) served++
      const modelText = modelAsks ? 'Good. Can you see why that follows?' : 'Good. That is the whole idea.'
      const askedQuestion = repliesWithQuestion(modelText) || canAttach
      s = advanceConversationState(s, base({
        askedQuestion,
        questionSanctioned: decided === 'ask',
        signalCorrect: canAttach ? true : null,
        acknowledgement: false,
        deliveredTeaching: decided === 'teach' || decided === 'show',
      }))
      if (s.phase !== 'GUIDE') break
    }
    console.log(`  model ${modelAsks ? 'ends every turn with "?"' : 'sometimes asks nothing  '}`
      + `  ->  probes served ${String(served).padStart(2)}   phase ${s.phase.padEnd(8)}`
      + ` questionsAskedSinceTeach=${s.questionsAskedSinceTeach}`
      + ` teachSegmentsSinceQuestion=${s.teachSegmentsSinceQuestion}`)
    console.log(`      first six decided moves: ${moves.join(' ')}`)
  }

  console.log('\n  THE MECHANISM, from decideNextMoveHeuristic in source order:')
  console.log('    if (questionsAskedSinceTeach >= 2)')
  console.log('        return consecutiveFailures >= 1 ? \'show\' : \'teach\'   <-- RETURNS EARLY')
  console.log('    ...')
  console.log("    case 'GUIDE': return (teachSegmentsSinceQuestion >= 2 || practiceRequested)")
  console.log("                         ? 'ask' : 'teach'")
  console.log('\n  The anti-interrogation budget is checked BEFORE the GUIDE branch, so once')
  console.log('  it is spent an explicit request for practice CANNOT open the gate. And the')
  console.log('  two counters it depends on move only on the MODEL\'s output:')
  console.log('    askedQuestion = repliesWithQuestion(cleanText) || mcq !== null')
  console.log('    repliesWithQuestion(t) = t contains "?" outside code fences')
  console.log('  questionsAskedSinceTeach resets ONLY on a turn with askedQuestion false,')
  console.log('  i.e. only when the model writes a turn containing no question mark.')
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. THE PROPOSED OBSERVE PRACTICE-REQUEST EXIT — does it solve anything?
// ═══════════════════════════════════════════════════════════════════════════
function proposedExit() {
  rule('6. SIMULATING THE PROPOSED OBSERVE EXIT (NOT IMPLEMENTED)')
  const script = ['sir can you give me one question to try', 'ok but why it happen like that',
                  'sorry sir can you say more simple']
  for (const withExit of [false, true]) {
    let s: ConversationState = initialConversationState('c')
    const dwell: Record<string, number> = {}
    let served = 0
    for (let i = 0; i < CONCEPT_TURN_BUDGET; i++) {
      if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) break
      const said = script[i % script.length]
      dwell[s.phase] = (dwell[s.phase] ?? 0) + 1
      const practiceRequested = asksForPractice(said)
      const move = decideNextMove(s, { workedExampleFirst: false, practiceRequested } as Parameters<typeof decideNextMove>[1])
      const decided = typeof move === 'string' ? move : (move as { move: string }).move
      const canAttach = isProbeAttachablePhase(s.phase)
        && (isMasteryGatePhase(s.phase) || (s.phase === 'GUIDE' && decided === 'ask'))
      if (canAttach) served++
      // THE CANDIDATE: an explicit request to be questioned concludes the
      // prior-knowledge diagnostic, exactly as two failed probes already do.
      const candidateExit = withExit && s.phase === 'OBSERVE' && practiceRequested
      const key = detectFailureState(said, null)
      s = advanceConversationState(s, base({
        askedQuestion: true, signalCorrect: canAttach ? true : null,
        recoveryFired: key !== null, learnerRequest: detectLearnerRequest(said),
        dontKnowSignal: isDontKnowSignal(key),
        deliveredTeaching: decided === 'teach' || decided === 'show',
        acknowledgement: candidateExit ? true : isLowSignalAcknowledgement(said),
      }))
      if (masteryVerifiedStrict(s)) break
    }
    console.log(`  ${withExit ? 'WITH the candidate exit ' : 'production (no exit)   '} `
      + `O=${String(dwell.OBSERVE ?? 0).padStart(2)} D=${dwell.DEMONSTRATE ?? 0} G=${String(dwell.GUIDE ?? 0).padStart(2)} `
      + `C=${dwell.CHECK ?? 0} P=${dwell.PRACTICE ?? 0} | probes ${served} | c=${s.correctAtCheck} p=${s.correctAtPractice} `
      + `${masteryVerifiedStrict(s) ? 'MASTERED' : ''}`)
  }
}

function main() {
  observeExitGraph(); remediationFixedPoint(); modelVariance(); worstCase(); proposedExit()
  rule(`CONCEPT_TURN_BUDGET = ${CONCEPT_TURN_BUDGET} — untouched. No production code changed.`)
}
main()
