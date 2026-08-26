/**
 * PHASE E — why OBSERVE consumes most of the concept budget, and whether any
 * EXISTING state can bound it without touching probes, mastery or teaching.
 *
 * THE MEASURED PROBLEM (live, isolated, zero degraded turns, budget 12):
 *   gauss-law          OBSERVE 6   6 MCQs   MASTERED
 *   moment-of-inertia  OBSERVE 5   7 MCQs   MASTERED
 *   atomic-orbitals    OBSERVE 8   8 MCQs   MASTERED (needed the extension)
 *   titration          OBSERVE 8   2 MCQs   budget exhausted, 0 correct
 *
 * The OBSERVE-probe candidate was rejected: 267 of 374 concepts (71%) hold
 * exactly the three gradeable probes the mastery gates themselves need, so
 * spending one in OBSERVE starves CHECK/PRACTICE. This script does not revisit
 * that. It asks the different question: can OBSERVE be made to CONCLUDE on
 * time, using state that already exists?
 *
 *   npx tsx scripts/qa/phase-e-observe-dwell.ts
 *
 * Real production modules. No provider, no database, no network.
 */
import {
  advanceConversationState,
  decideNextMove,
  decideNextMoveDetailed,
  initialConversationState,
  isLowSignalAcknowledgement,
  type ConversationState,
  type NextMove,
  type NextMoveContext,
  type TeachingPhase,
  type TurnEvidence,
} from '../../src/lib/teaching/conversationState'
import { phaseAfterConcludedDiagnostic } from '../../src/lib/teaching/questionLegality'
import { isMasteryGatePhase, isProbeAttachablePhase } from '../../src/lib/teaching/gateAssessment'

const H = (s: string) => console.log(`\n${'═'.repeat(78)}\n${s}\n${'═'.repeat(78)}`)
const CTX: NextMoveContext = { recoveryTurn: false, workedExampleFirst: false }
const BUDGET = 12

/** The shipped probe policy. Unchanged, and unchanged by every candidate here:
 *  no candidate in this file may ever make this true at OBSERVE. */
const probeAttaches = (phase: TeachingPhase, move: NextMove) =>
  (isMasteryGatePhase(phase) || (phase === 'GUIDE' && move === 'ask'))
  && isProbeAttachablePhase(phase)

// ═══════════════════════════════════════════════════════════════════════════
H('PART 1 — EVERY OBSERVE INPUT CLASS, TRACED')

interface InputClass {
  label: string
  detector: string
  ev: Partial<TurnEvidence>
  ctx?: Partial<NextMoveContext>
  /** Does the resulting transition depend on what the MODEL wrote? */
  modelDependent: boolean
}

const TAUGHT: ConversationState = {
  ...initialConversationState('c'), phase: 'OBSERVE',
  taughtThisSession: true, demonstrated: false,
}

const CLASSES: InputClass[] = [
  { label: 'acknowledgement', detector: 'isLowSignalAcknowledgement',
    ev: { acknowledgement: true, signalCorrect: null }, modelDependent: false },
  { label: 'graded correct', detector: 'gradeMcqAnswer / SIGNAL',
    ev: { signalCorrect: true }, modelDependent: true },
  { label: 'graded wrong', detector: 'gradeMcqAnswer / SIGNAL',
    ev: { signalCorrect: false }, modelDependent: true },
  { label: 'dont_know (recovery)', detector: 'recoveryGuard.isDontKnowSignal',
    ev: { signalCorrect: null, recoveryFired: true, dontKnowSignal: true },
    ctx: { recoveryTurn: true }, modelDependent: false },
  { label: 'explain_differently', detector: 'learnerRequest',
    ev: { signalCorrect: null, learnerRequest: 'explain_differently' }, modelDependent: false },
  { label: 'diagram request', detector: 'learnerRequest',
    ev: { signalCorrect: null, learnerRequest: 'diagram' }, modelDependent: false },
  { label: 'real-life example req', detector: 'learnerRequest',
    ev: { signalCorrect: null, learnerRequest: 'real_life_example' }, modelDependent: false },
  { label: 'practice request', detector: 'masteryGate.asksForPractice',
    ev: { signalCorrect: null }, ctx: { practiceRequested: true }, modelDependent: false },
  { label: 'prior-knowledge probe', detector: 'isPriorKnowledgeProbe(assistant)',
    ev: { signalCorrect: null, isPriorKnowledgeProbe: true }, modelDependent: true },
  { label: 'no signal at all', detector: '(none)',
    ev: { signalCorrect: null }, modelDependent: false },
  { label: 'model asked (unsanctioned)', detector: 'repliesWithQuestion',
    ev: { signalCorrect: null, askedQuestion: true, questionSanctioned: false,
      deliveredTeaching: true }, modelDependent: true },
  { label: 'model taught, no question', detector: 'repliesWithQuestion',
    ev: { signalCorrect: null, askedQuestion: false, deliveredTeaching: true },
    modelDependent: true },
  { label: 'degraded turn', detector: 'isDegradedProvider',
    ev: { signalCorrect: null, degradedTurn: true, deliveredTeaching: true },
    modelDependent: false },
]

console.log('  input class             detector                        move   ->phase       '
  + 'obsF dkn  probe?  model-dep')
for (const c of CLASSES) {
  const ctx = { ...CTX, ...c.ctx }
  const move = decideNextMove(TAUGHT, ctx)
  const next = advanceConversationState(TAUGHT, {
    askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
    deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null, ...c.ev,
  })
  console.log(`  ${c.label.padEnd(23)} ${c.detector.padEnd(31)} ${move.padEnd(6)} `
    + `${next.phase.padEnd(12)} ${String(next.observeFailures ?? 0).padStart(3)} `
    + `${String(next.consecutiveDontKnows ?? 0).padStart(3)}  `
    + `${probeAttaches('OBSERVE', move) ? 'YES' : 'no '}     ${c.modelDependent ? 'YES' : 'no'}`)
}

console.log(`
  READING. Exactly TWO input classes leave OBSERVE in one turn: a graded WRONG
  answer and a dont_know recovery — and only once the counter reaches 2. A graded
  CORRECT answer leaves via the success path. EVERYTHING ELSE — acknowledgement,
  every learner request, a practice request, no signal, degraded — leaves the
  phase at OBSERVE. No input class attaches an authored probe at OBSERVE (the
  'probe?' column is 'no' on every row), which is the shipped policy this file
  must not change.`)

// ── the exit inventory, stated as code, not prose ───────────────────────────
H('PART 1b — EVERY LEGAL OBSERVE EXIT')
console.log(`
  1. SUCCESS      graded correct -> the success path advances the ladder.
  2. ACKNOWLEDGEMENT  a bare "ok sir" -> DEMONSTRATE in ONE turn. Measured in
                  the table above, and it corrects an earlier draft of this
                  script which claimed only two exits existed. It is also why
                  "C: make acknowledgement an OBSERVE exit" is NOT a candidate —
                  it is already the shipped behaviour.
  3. CONCLUDED    max(consecutiveDontKnows, observeFailures) >= 2
                  -> phaseAfterConcludedDiagnostic() -> DEMONSTRATE.

  WHAT IS NOT AN EXIT, and this is the whole bottleneck: every learner request
  (explain_differently, diagram, real-life example), a practice request, and a
  no-signal turn all leave the phase at OBSERVE and move no counter at all. The
  live titration transcript is exactly that shape — eight OBSERVE turns of
  "say it more simple" / "show picture please" / "give me one more question",
  ONE wrong answer (observeFailures 1, one short of the escape), and the first
  "ok sir" not until turn 9.

  CRITICAL STRUCTURAL FACT, verified by reading the call site:
  phaseAfterConcludedDiagnostic is invoked at EXACTLY ONE place in the fold —
  inside \`if (failed)\`. So the "the diagnostic has concluded" transition can
  ONLY fire on a turn the learner FAILED. A learner who never fails and never
  answers — the weak learner who hedges, asks for simpler words, asks for a
  picture, asks for practice — can never reach it, however long they stay.`)
{
  // Prove it: the transition function itself would move the phase, but the
  // counters that feed it never rise outside the failure path.
  console.log(`\n  phaseAfterConcludedDiagnostic('OBSERVE', 2) = `
    + `${phaseAfterConcludedDiagnostic('OBSERVE', 2)}   (the transition works)`)
  let s: ConversationState = { ...TAUGHT }
  for (let i = 0; i < 30; i++) {
    const move = decideNextMove(s, CTX)
    s = advanceConversationState(s, {
      askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
      deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null,
      learnerRequest: 'explain_differently',
    })
  }
  console.log(`  30 "explain it differently" turns: phase=${s.phase} `
    + `observeFailures=${s.observeFailures} consecutiveDontKnows=${s.consecutiveDontKnows}`)
  console.log(`  -> the counters never rise, so the transition never fires. OBSERVE is
     absorbing for a learner who expresses confusion without ever answering.`)
}

// ═══════════════════════════════════════════════════════════════════════════
H('PART 2 — EXISTING STATE THAT COULD CARRY A DWELL FLOOR')

const FIELDS = [
  ['turnsInCurrentPhase', 'folded at EVERY return point; PINNED on degraded turns; reset on transition. Existing consumer: the STALE LOOP directive at >= 4.'],
  ['observeFailures', 'ONLY incremented inside `if (failed)` when prev.phase === OBSERVE. Its own comment defines it as "an OBSERVE probe was run and produced nothing".'],
  ['consecutiveDontKnows', 'recovery-utterance channel for the same fact. Same >= 2 threshold.'],
  ['consecutiveFailures', 'global, not OBSERVE-scoped; drives struggle/worked-example, not the phase.'],
  ['teachSegmentsSinceQuestion', 'gives since the last question. Read by the GUIDE arm and remedialGiveDelivered. Not an OBSERVE concept.'],
  ['demonstrated', 'set by a GIVE outside OBSERVE. Cannot rise while in OBSERVE — that is the pin the QL-2 comment describes.'],
  ['totalKnowledgeProbes', 'counts FORMAL "have you seen/heard" patterns only. Model-wording dependent by construction.'],
]
for (const [f, note] of FIELDS) console.log(`  ${f}\n      ${note}`)

console.log(`
  turnsInCurrentPhase is the only field that measures DWELL, is already folded
  on every path, already survives degraded turns correctly, and needs no new
  persistent state. observeFailures is the only field carrying the right
  SEMANTIC ("a probe was run and produced nothing").`)

// ═══════════════════════════════════════════════════════════════════════════
H('PART 3 — CANDIDATES')

type Fold = (prev: ConversationState, ev: TurnEvidence, move: NextMove) => ConversationState

/** SHIPPED. */
const shipped: Fold = (prev, ev) => advanceConversationState(prev, ev)

/**
 * A — blind dwell floor: after N turns in OBSERVE, jump to DEMONSTRATE.
 * Included ONLY to be measured and rejected: it asserts the diagnostic
 * concluded without any evidence that it did. Part 4 of the brief forbids
 * exactly this.
 */
const candidateA = (N: number): Fold => (prev, ev) => {
  const next = advanceConversationState(prev, ev)
  if (prev.phase === 'OBSERVE' && next.phase === 'OBSERVE'
    && (prev.turnsInCurrentPhase ?? 0) + 1 >= N) {
    return { ...next, phase: 'DEMONSTRATE', turnsInCurrentPhase: 0 }
  }
  return next
}

/**
 * B — extend the EXISTING semantic. `observeFailures`'s own comment defines it
 * as "an OBSERVE probe was run and produced nothing". Today it rises only when
 * the learner answers WRONG. A turn where the ENGINE ASKED and no gradeable
 * answer came back is the same fact by the same definition, and is currently
 * unrecorded. Feed that fact into the counter the module already owns, and let
 * the EXISTING phaseAfterConcludedDiagnostic transition fire unchanged.
 *
 * No new state, no new threshold, no new phase meaning, no blind jump: the
 * machine still only leaves OBSERVE when the diagnostic has demonstrably
 * produced nothing twice.
 */
const candidateB: Fold = (prev, ev, move) => {
  const next = advanceConversationState(prev, ev)
  const engineAskedAndLearnedNothing =
    prev.phase === 'OBSERVE'
    && move === 'ask'                       // the engine ran a probe
    && ev.signalCorrect === null            // it produced no gradeable answer
    && ev.degradedTurn !== true             // an outage is not a diagnostic result
    && ev.recoveryFired !== true            // recovery has its own channel
  if (!engineAskedAndLearnedNothing || next.phase !== 'OBSERVE') return next
  const observeFailures = (next.observeFailures ?? 0) + 1
  return {
    ...next,
    observeFailures,
    phase: phaseAfterConcludedDiagnostic(
      next.phase, Math.max(next.consecutiveDontKnows ?? 0, observeFailures),
    ),
  }
}

// C — "make acknowledgement/practice-request an OBSERVE exit" is NOT included:
// Part 1 measured acknowledgement ALREADY exiting OBSERVE -> DEMONSTRATE in one
// turn. Implementing it would be a no-op at best and a duplicate authority over
// the same transition at worst.
//
// D — "existing phaseAfterConcludedDiagnostic behaviour" is not a separate
// candidate either: it is the transition candidate B fires. B is D, given the
// missing evidence channel.

const CANDIDATES: Array<[string, Fold]> = [
  ['SHIPPED', shipped],
  ['A (blind floor N=4)', candidateA(4)],
  ['B (existing semantic)', candidateB],
]

// ═══════════════════════════════════════════════════════════════════════════
H('PART 5 — WORST-CASE TRACES, BUDGET 12')

interface Learner { name: string; ev: (n: number) => Partial<TurnEvidence>; ctx?: Partial<NextMoveContext> }
const LEARNERS: Learner[] = [
  { name: '1  answers only when asked', ev: () => ({}) },
  { name: '2  only "I don\'t understand"', ev: () => ({ signalCorrect: null, recoveryFired: true, dontKnowSignal: true }) },
  { name: '3  asks for simpler English', ev: () => ({ signalCorrect: null, learnerRequest: 'explain_differently' }) },
  { name: '4  repeatedly asks practice', ev: () => ({ signalCorrect: null }), ctx: { practiceRequested: true } },
  { name: '5  acknowledges late', ev: (n) => (n >= 6 ? { signalCorrect: null, acknowledgement: true } : { signalCorrect: null }) },
  { name: '6  gives no signal', ev: () => ({ signalCorrect: null }) },
  { name: '7  model asks every turn', ev: () => ({ signalCorrect: null, askedQuestion: true, questionSanctioned: false, deliveredTeaching: true }) },
  { name: '8  model never asks', ev: () => ({ signalCorrect: null, askedQuestion: false, deliveredTeaching: true }) },
  { name: '9  one wrong then recovery', ev: (n) => (n === 3 ? { signalCorrect: false } : {}) },
  { name: '10 two wrong, correct between', ev: (n) => (n === 3 || n === 7 ? { signalCorrect: false } : {}) },
  { name: '11 degraded turns', ev: () => ({ signalCorrect: null, degradedTurn: true, deliveredTeaching: true }) },
  { name: '12 explicit closing', ev: () => ({ signalCorrect: null, acknowledgement: true }) },
  // THE REAL FAILING LESSON, replayed turn by turn from the live
  // chem.equil.titration transcript (session cmta7kmsz…, fresh session, zero
  // degraded turns, budget exhausted at CHECK with c=0 p=0). This is the case
  // any candidate has to actually improve.
  { name: '13 LIVE titration replay', ev: (n) => {
    switch (n) {
      case 1:  return { signalCorrect: null, recoveryFired: true, dontKnowSignal: true }
      case 2:  return { signalCorrect: null }
      case 3:  return { signalCorrect: null, learnerRequest: 'explain_differently' }
      case 4:  return { signalCorrect: null }
      case 5:  return { signalCorrect: false }
      case 6:  return { signalCorrect: null }
      case 7:  return { signalCorrect: null, learnerRequest: 'diagram' }
      case 8:  return { signalCorrect: null }
      case 9:  return { signalCorrect: null, acknowledgement: true }
      case 10: return { signalCorrect: null }
      case 11: return { signalCorrect: null, learnerRequest: 'explain_differently' }
      default: return { signalCorrect: true }
    }
  } },
]

/**
 * THE ACTUAL HARNESS LEARNER, which the fixed-message replay above cannot
 * express: phase-d-learning-loop.ts answers whenever an MCQ is pending (the
 * FIRST answer deliberately wrong, every later one correct) and otherwise
 * cycles confused filler and practice requests. So the number of graded answers
 * is a FUNCTION of how often the engine asks — which is exactly the variable a
 * dwell candidate moves. Holding the learner's messages fixed understates every
 * candidate; this models the feedback loop honestly.
 */
function traceHarnessLearner(fold: Fold): Trace {
  let s = initialConversationState('c')
  const dwell: Record<string, number> = {}
  let probes = 0
  let answered = 0
  let pending = false
  for (let n = 1; n <= BUDGET; n++) {
    const move = decideNextMove(s, CTX)
    dwell[s.phase] = (dwell[s.phase] ?? 0) + 1
    const probeThisTurn = probeAttaches(s.phase, move)
    if (probeThisTurn) probes++
    // the learner answers the question that was pending from the PREVIOUS turn
    const answersNow = pending
    const correct = answersNow ? answered > 0 : null   // first answer wrong
    if (answersNow) answered++
    s = fold(s, {
      askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
      deliveredTeaching: move !== 'ask', recoveryFired: false,
      signalCorrect: correct,
      // filler turns look like the harness's CONFUSED/PRACTICE cycle
      learnerRequest: answersNow ? null : (n % 3 === 0 ? 'explain_differently' : null),
    }, move)
    pending = move === 'ask'
  }
  return { dwell, probes, c: s.correctAtCheck, p: s.correctAtPractice,
    mastered: s.correctAtCheck >= 1 && s.correctAtPractice >= 2, final: s.phase }
}

interface Trace {
  dwell: Record<string, number>; probes: number; c: number; p: number; mastered: boolean; final: TeachingPhase
}
function trace(fold: Fold, l: Learner): Trace {
  let s = initialConversationState('c')
  const dwell: Record<string, number> = {}
  let probes = 0
  for (let n = 1; n <= BUDGET; n++) {
    const ctx = { ...CTX, ...l.ctx }
    const move = decideNextMove(s, ctx)
    dwell[s.phase] = (dwell[s.phase] ?? 0) + 1
    if (probeAttaches(s.phase, move)) probes++
    const base: TurnEvidence = {
      askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
      deliveredTeaching: move !== 'ask', recoveryFired: false,
      // the learner answers correctly whenever the ENGINE asked, unless the
      // learner profile overrides it
      signalCorrect: move === 'ask' ? true : null,
    }
    const ev = { ...base, ...l.ev(n) }
    s = fold(s, ev, move)
  }
  return { dwell, probes, c: s.correctAtCheck, p: s.correctAtPractice,
    mastered: s.correctAtCheck >= 1 && s.correctAtPractice >= 2, final: s.phase }
}

const short = (d: Record<string, number>) =>
  ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']
    .map((p) => `${p[0]}${d[p] ?? 0}`).join(' ')

for (const [cname, fold] of CANDIDATES) {
  console.log(`\n  ${cname}`)
  console.log(`     learner                        O/D/G/C/P/T      probes c/p  mastered`)
  for (const l of LEARNERS) {
    const t = trace(fold, l)
    console.log(`     ${l.name.padEnd(30)} ${short(t.dwell).padEnd(16)} ${String(t.probes).padStart(6)} `
      + `${t.c}/${t.p}  ${t.mastered ? 'YES' : 'no'}`)
  }
  const h = traceHarnessLearner(fold)
  console.log(`     ${'14 REAL HARNESS learner'.padEnd(30)} ${short(h.dwell).padEnd(16)} `
    + `${String(h.probes).padStart(6)} ${h.c}/${h.p}  ${h.mastered ? 'YES' : 'no'}   <<<`)
}

// ═══════════════════════════════════════════════════════════════════════════
H('PART 3b — SAFETY MATRIX (15 questions, per candidate)')

function safety(name: string, fold: Fold) {
  const q: Array<[string, boolean, string]> = []

  // 2 · authored probe in OBSERVE — the policy is untouched by all candidates
  let observeProbe = 0
  for (const l of LEARNERS) {
    let s = initialConversationState('c')
    for (let n = 1; n <= BUDGET; n++) {
      const move = decideNextMove(s, { ...CTX, ...l.ctx })
      if (s.phase === 'OBSERVE' && probeAttaches(s.phase, move)) observeProbe++
      s = fold(s, { askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false,
        signalCorrect: move === 'ask' ? true : null, ...l.ev(n) }, move)
    }
  }
  q.push(['2  never attaches an authored probe in OBSERVE', observeProbe === 0, `${observeProbe} occurrences`])

  // 3 · bypasses DEMONSTRATE?
  let bypass = 0
  for (const l of LEARNERS) {
    let s = initialConversationState('c')
    for (let n = 1; n <= BUDGET; n++) {
      const move = decideNextMove(s, { ...CTX, ...l.ctx })
      const before = s.phase
      s = fold(s, { askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false,
        signalCorrect: move === 'ask' ? true : null, ...l.ev(n) }, move)
      if (before === 'OBSERVE' && (s.phase === 'GUIDE' || s.phase === 'CHECK'
        || s.phase === 'PRACTICE' || s.phase === 'TRANSFER')) bypass++
    }
  }
  q.push(['3  never jumps OBSERVE past DEMONSTRATE', bypass === 0, `${bypass} jumps`])

  // 5/6 · loops
  let loops = 0
  for (const l of LEARNERS) {
    let s = initialConversationState('c')
    const trail: TeachingPhase[] = []
    for (let n = 1; n <= 40; n++) {
      const move = decideNextMove(s, { ...CTX, ...l.ctx })
      s = fold(s, { askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false,
        signalCorrect: move === 'ask' ? true : null, ...l.ev(n) }, move)
      trail.push(s.phase)
    }
    const tail = trail.slice(-8).join('>')
    if (/^(OBSERVE>DEMONSTRATE){4}$/.test(tail) || /^(DEMONSTRATE>OBSERVE){4}$/.test(tail)
      || /^(OBSERVE>GUIDE){4}$/.test(tail) || /^(GUIDE>OBSERVE){4}$/.test(tail)) loops++
  }
  q.push(['5/6 no OBSERVE<->neighbour 2-cycle', loops === 0, `${loops} loops`])

  // 11 · mastery counters without graded evidence
  let s2 = initialConversationState('c')
  for (let i = 0; i < 100; i++) {
    const move = decideNextMove(s2, CTX)
    s2 = fold(s2, { askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
      deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null,
      acknowledgement: true }, move)
  }
  q.push(['11 100 acks create no mastery', s2.correctAtCheck === 0 && s2.correctAtPractice === 0,
    `c=${s2.correctAtCheck} p=${s2.correctAtPractice}`])

  // 9 · degraded turns
  let s3 = initialConversationState('c')
  for (let i = 0; i < 40; i++) {
    const move = decideNextMove(s3, CTX)
    s3 = fold(s3, { askedQuestion: false, questionSanctioned: false, deliveredTeaching: true,
      recoveryFired: false, signalCorrect: null, degradedTurn: true }, move)
  }
  q.push(['9  40 degraded turns neither teach nor advance',
    s3.demonstrated === false && s3.correctAtCheck === 0, `demonstrated=${s3.demonstrated}`])

  // 14 · two-concluded-diagnostic escape preserved
  const escapeState: ConversationState = { ...TAUGHT, observeFailures: 2 }
  q.push(['14 concluded-diagnostic escape preserved',
    phaseAfterConcludedDiagnostic('OBSERVE', 2) === 'DEMONSTRATE'
    && decideNextMove(escapeState, CTX) === 'show', 'unchanged transition + move'])

  // 15 · perfect-learner path unchanged
  const perfect = trace(fold, LEARNERS[0])
  const perfectShipped = trace(shipped, LEARNERS[0])
  q.push(['15 perfect-learner path unchanged',
    JSON.stringify(perfect) === JSON.stringify(perfectShipped),
    `${short(perfect.dwell)} vs ${short(perfectShipped.dwell)}`])

  // Worst-case OBSERVE dwell, EXCLUDING the degraded-outage learner. During a
  // provider outage the templates are content-free by construction, so staying
  // in OBSERVE is the CORRECT behaviour and no candidate should move it — an
  // earlier version of this metric counted that learner and reported every
  // candidate, including the shipped baseline, as capped at 12.
  const teachable = LEARNERS.filter((l) => !l.name.includes('degraded'))
  const worst = Math.max(...teachable.map((l) => trace(fold, l).dwell.OBSERVE ?? 0))
  const degraded = trace(fold, LEARNERS.find((l) => l.name.includes('degraded'))!).dwell.OBSERVE ?? 0
  q.push([`worst-case OBSERVE dwell (non-degraded) = ${worst}/12`, worst <= 6,
    `${worst} turns; degraded learner correctly stays at ${degraded}`])

  console.log(`\n  ${name}`)
  for (const [t, ok, d] of q) console.log(`     ${ok ? 'OK  ' : 'FAIL'} ${t.padEnd(45)} ${d}`)
  return q.every(([, ok]) => ok)
}

const verdicts = CANDIDATES.filter(([n]) => n !== 'SHIPPED')
  .map(([n, f]) => [n, safety(n, f)] as const)
safety('SHIPPED (baseline)', shipped)

H('VERDICTS')
for (const [n, ok] of verdicts) console.log(`  ${ok ? 'SAFE  ' : 'UNSAFE'}  ${n}`)
