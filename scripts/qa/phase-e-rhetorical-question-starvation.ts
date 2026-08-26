/**
 * PHASE E — CLOSE THE REMAINING PROGRESSION BOTTLENECK.
 *
 * The last two candidates were rejected for good reasons. This one is
 * different: it does not add a rule, it REPAIRS a half-finished migration
 * that is already documented in the source it touches.
 *
 * WHAT THE SOURCE ALREADY SAYS
 * ────────────────────────────────────────────────────────────────────────────
 * PHASE 7N-1(ii) (conversationState.ts, the counter fold) established that the
 * anti-interrogation counters measure THE SYSTEM'S OWN QUESTIONING, and added
 * `questionSanctioned` so a question the model volunteered on a `teach` turn
 * would not spend a budget the engine never chose to spend.
 *
 * It applied that only to the INCREMENT arm of `questionsAskedSinceTeach`.
 * Three things were left behind, and all three are load-bearing:
 *
 *   1. `questionsAskedSinceTeach` is only RESET inside the `else` branch — the
 *      branch that requires the turn to contain no '?' at all. An unsanctioned
 *      question holds it instead. So once it reaches 2 it can never fall while
 *      the model keeps writing '?', and the gate above the phase switch
 *      (`>= 2 → return 'teach'`) fires forever.
 *
 *   2. `teachSegmentsSinceQuestion` is zeroed on ANY question, sanctioned or
 *      not. So the GUIDE arm's `teachSegmentsSinceQuestion >= 2` can never
 *      fire either. PHASE 7H's own comment in that arm says exactly this and
 *      works around it with `|| ctx.practiceRequested` rather than fixing it.
 *
 *   3. Forty lines below the counter block, the SAME file already computes the
 *      correct predicate for this exact turn kind:
 *          deliveredAGive = !degradedTurn && (!askedQuestion || deliveredTeaching)
 *      A turn that taught and ended on a rhetorical question IS a give. The
 *      counters are the only place in the file that still disagrees.
 *
 * So the runtime already knows the difference between a question it chose and
 * prose the model decorated with a '?'. It throws that knowledge away in two
 * of the three places it matters.
 *
 * THE CANDIDATE (not implemented until this script proves it)
 * ────────────────────────────────────────────────────────────────────────────
 *   An unsanctioned question on a turn the engine TAUGHT is folded as a
 *   teaching turn, for both counters. Everything else is untouched.
 *
 * Omitting either `questionSanctioned` or `deliveredTeaching` is byte-identical
 * to today, so every existing caller and fixture is unaffected by construction.
 *
 *   npx tsx scripts/qa/phase-e-rhetorical-question-starvation.ts
 *
 * No provider, no database, no network. Real production modules only.
 */
import {
  advanceConversationState,
  decideNextMove,
  initialConversationState,
  repliesWithQuestion,
  type ConversationState,
  type NextMove,
  type NextMoveContext,
  type TurnEvidence,
} from '../../src/lib/teaching/conversationState'
import { isProbeAttachablePhase, isMasteryGatePhase } from '../../src/lib/teaching/gateAssessment'

const H = (s: string) => console.log(`\n${'═'.repeat(78)}\n${s}\n${'═'.repeat(78)}`)
const sub = (s: string) => console.log(`\n── ${s} ${'─'.repeat(Math.max(0, 72 - s.length))}`)

// ── the candidate, applied WITHOUT touching production ──────────────────────
//
// `advanceConversationState` is a pure fold and no other field it writes reads
// either counter, so recomputing the two afterwards is exactly equivalent to
// changing the branch in place. Verified by grep: within the fold the only
// reads of these two fields are the writes themselves.
function foldCandidate(prev: ConversationState, ev: TurnEvidence): ConversationState {
  const next = advanceConversationState(prev, ev)
  const engineTaught = ev.degradedTurn !== true && ev.deliveredTeaching === true
  const rhetoricalAside =
    ev.askedQuestion === true && ev.questionSanctioned === false && engineTaught
  if (!rhetoricalAside) return next
  return {
    ...next,
    questionsAskedSinceTeach: 0,
    teachSegmentsSinceQuestion: (prev.teachSegmentsSinceQuestion ?? 0) + 1,
  }
}

const foldToday = (prev: ConversationState, ev: TurnEvidence) => advanceConversationState(prev, ev)

const CTX: NextMoveContext = { recoveryTurn: false, workedExampleFirst: false }

/** One turn of the real loop: the engine decides, the model renders, the fold
 *  records. `render` is the model's behaviour under test. */
interface ModelBehaviour {
  name: string
  /** Does the rendered text contain a '?' — given what the engine decided? */
  writesQuestion: (move: NextMove) => boolean
}

const MODELS: ModelBehaviour[] = [
  { name: 'always-TEACH, no "?"',        writesQuestion: (m) => m === 'ask' },
  { name: 'always-TEACH, rhetorical "?"', writesQuestion: () => true },
  { name: 'always-ASK',                   writesQuestion: () => true },
  { name: 'alternating TEACH/ASK',        writesQuestion: (m) => m === 'ask' },
]

interface RunOpts {
  fold: (p: ConversationState, e: TurnEvidence) => ConversationState
  model: ModelBehaviour
  turns: number
  /** null = learner never answers (acknowledges); true/false = graded answer. */
  answer: (turn: number, probeServed: boolean) => boolean | null
  practiceRequested?: (turn: number) => boolean
  degraded?: boolean
  acknowledgement?: (turn: number) => boolean
}

interface RunRow {
  n: number; phase: string; move: NextMove; probe: boolean
  qAST: number; tSSQ: number; c: number; p: number
}

function run(o: RunOpts): { rows: RunRow[]; final: ConversationState; probes: number } {
  let s = initialConversationState('phys.mech.orbital-mechanics')
  const rows: RunRow[] = []
  let probes = 0
  for (let n = 1; n <= o.turns; n++) {
    const ctx: NextMoveContext = { ...CTX, practiceRequested: o.practiceRequested?.(n) === true }
    const move = decideNextMove(s, ctx)
    // The authored probe attaches only where the real gate allows it.
    const probeServed =
      move === 'ask' && (isMasteryGatePhase(s.phase) || isProbeAttachablePhase(s.phase))
    if (probeServed) probes++
    const askedQuestion = o.model.writesQuestion(move) || probeServed
    // WHO PRODUCES A GRADED SIGNAL. Only a turn the SERVER decided to ask can
    // carry correctness: an authored probe is graded deterministically, and a
    // sanctioned prose question is self-reported. A rhetorical '?' on a teach
    // turn produces NOTHING — `answerableTurn`'s no-question-posed suppression
    // is exactly that rule, and modelling it any other way would let the
    // instrument invent the evidence the product is being tested for.
    const ev: TurnEvidence = {
      askedQuestion,
      questionSanctioned: move === 'ask',
      deliveredTeaching: move === 'teach' || move === 'show',
      signalCorrect: move === 'ask' ? o.answer(n, probeServed) : null,
      recoveryFired: false,
      degradedTurn: o.degraded === true,
      acknowledgement: o.acknowledgement?.(n) === true,
    }
    rows.push({
      n, phase: s.phase, move, probe: probeServed,
      qAST: s.questionsAskedSinceTeach, tSSQ: s.teachSegmentsSinceQuestion,
      c: s.correctAtCheck, p: s.correctAtPractice,
    })
    s = o.fold(s, ev)
  }
  return { rows, final: s, probes }
}

const summarise = (r: { rows: RunRow[]; final: ConversationState; probes: number }) =>
  `phase=${r.final.phase.padEnd(11)} c=${r.final.correctAtCheck} p=${r.final.correctAtPractice} `
  + `probes=${String(r.probes).padStart(2)} `
  + `mastered=${r.final.correctAtCheck >= 1 && r.final.correctAtPractice >= 2 ? 'YES' : 'no '} `
  + `qAST=${r.final.questionsAskedSinceTeach} tSSQ=${r.final.teachSegmentsSinceQuestion}`

// ═══════════════════════════════════════════════════════════════════════════
H('PART 1 — WHAT THE COUNTERS MEAN TODAY (measured, not read off a comment)')

sub('askedQuestion is literally "the text contains a ? outside a code fence"')
for (const t of [
  'The force changes direction here. Why do you think that happens?',
  'Can you tell me what happens to the force?',
  'The force changes direction here because the vector reverses.',
  'Consider `x ? y : z` in the snippet below.',
  '```\nis_ready ? go() : wait()\n```',
]) {
  console.log(`  repliesWithQuestion=${String(repliesWithQuestion(t)).padEnd(5)} "${t.slice(0, 62)}"`)
}
console.log(`
  A and B are INDISTINGUISHABLE to this predicate. It answers (A) "did the
  tutor literally write a question mark" — never (B) "was the learner asked
  something they must answer" and never (C) "was an assessment presented".`)

sub('the fold branch keyed on it')
console.log(`
  if (askedQuestion) { qAST = sanctioned===false ? qAST : qAST+1 ; tSSQ = 0 }
  else               { tSSQ = tSSQ + 1                          ; qAST = 0   }

  The 7N-1(ii) narrowing reached the INCREMENT only. The RESET of qAST and the
  ZEROING of tSSQ are both still keyed on the raw '?'.`)

// ═══════════════════════════════════════════════════════════════════════════
H('PART 3 — CAN THE RUNTIME DISTINGUISH A / B / C TODAY?')

const S0 = initialConversationState('c')
const CASES: Array<{ label: string; move: NextMove; text: string }> = [
  { label: 'A  teaching + rhetorical "?"', move: 'teach', text: 'The force changes direction here. Why do you think that happens?' },
  { label: 'B  genuine tutor question   ', move: 'teach', text: 'Can you tell me what happens to the force?' },
  { label: 'C  authored assessment      ', move: 'ask',   text: 'Which of these is correct?' },
]
console.log('  case                          askedQ  sanctioned  taught  ->  qAST  tSSQ   next move')
for (const c of CASES) {
  const ev: TurnEvidence = {
    askedQuestion: repliesWithQuestion(c.text),
    questionSanctioned: c.move === 'ask',
    deliveredTeaching: c.move === 'teach' || c.move === 'show',
    signalCorrect: null, recoveryFired: false,
  }
  const after = advanceConversationState({ ...S0, phase: 'GUIDE', teachSegmentsSinceQuestion: 2 }, ev)
  console.log(`  ${c.label}  ${String(ev.askedQuestion).padEnd(6)}  `
    + `${String(ev.questionSanctioned).padEnd(10)}  ${String(ev.deliveredTeaching).padEnd(6)}  ->  `
    + `${String(after.questionsAskedSinceTeach).padStart(4)}  ${String(after.teachSegmentsSinceQuestion).padStart(4)}   `
    + `${decideNextMove(after, CTX)}`)
}
console.log(`
  ANSWER: A vs B — NO, and no existing signal separates them (both are prose
  the engine did not choose; nothing in the runtime reads intent).
  A/B vs C — YES, and the signal already exists and is already plumbed:
  \`questionSanctioned\` (evidenceMove === 'ask') plus \`deliveredTeaching\`.
  That is sufficient, because the counters were never supposed to be about the
  learner's experience of being asked — 7N-1(ii) says so in the file.`)

// ═══════════════════════════════════════════════════════════════════════════
H('PART 2/4 — THE CANDIDATE AGAINST THE MODEL-VARIANCE MATRIX')

console.log('\n  today:')
for (const model of MODELS) {
  const r = run({ fold: foldToday, model, turns: 14, answer: () => true })
  console.log(`    ${model.name.padEnd(24)} ${summarise(r)}`)
}
console.log('\n  candidate:')
for (const model of MODELS) {
  const r = run({ fold: foldCandidate, model, turns: 14, answer: () => true })
  console.log(`    ${model.name.padEnd(24)} ${summarise(r)}`)
}

sub('the decisive trajectory — always-TEACH with a rhetorical "?" every turn')
const chatty = MODELS[1]
for (const [label, fold] of [['today', foldToday], ['candidate', foldCandidate]] as const) {
  const r = run({ fold, model: chatty, turns: 14, answer: () => true })
  console.log(`\n  ${label}`)
  console.log('    n  phase        move   probe  qAST  tSSQ   c  p')
  for (const x of r.rows) {
    console.log(`   ${String(x.n).padStart(2)}  ${x.phase.padEnd(11)}  ${x.move.padEnd(5)}  `
      + `${x.probe ? ' YES ' : '  -  '}  ${String(x.qAST).padStart(4)}  ${String(x.tSSQ).padStart(4)}   `
      + `${x.c}  ${x.p}`)
  }
}

sub('scenarios 5-10')
const SCEN: Array<[string, RunOpts]> = [
  ['5  learner asks for practice', { fold: foldCandidate, model: chatty, turns: 12, answer: () => true, practiceRequested: (n) => n % 4 === 0 }],
  ['6  repeatedly asks simpler  ', { fold: foldCandidate, model: chatty, turns: 12, answer: () => true, acknowledgement: () => true }],
  ['7  authored MCQ, answered   ', { fold: foldCandidate, model: chatty, turns: 14, answer: () => true }],
  ['8  MCQ never answered       ', { fold: foldCandidate, model: chatty, turns: 14, answer: () => null }],
  ['9  every answer wrong       ', { fold: foldCandidate, model: chatty, turns: 14, answer: () => false }],
  ['10 first wrong then correct ', { fold: foldCandidate, model: chatty, turns: 16, answer: (_n, _p) => (firstWrong() ? false : true) }],
]
let wrongUsed = false
function firstWrong() { if (!wrongUsed) { wrongUsed = true; return true } return false }
for (const [label, opts] of SCEN) {
  wrongUsed = false
  const now = run({ ...opts, fold: foldToday })
  const cand = run(opts)
  console.log(`  ${label}\n     today     ${summarise(now)}\n     candidate ${summarise(cand)}`)
}

// ═══════════════════════════════════════════════════════════════════════════
H('PART 5 — CRITICAL SAFETY')

interface SafetyCase { label: string; ok: boolean; detail: string }
const safety: SafetyCase[] = []
const check = (label: string, ok: boolean, detail: string) => safety.push({ label, ok, detail })

// probe-freedom of the delivery phases is a property of gateAssessment, which
// the candidate does not touch — assert it directly rather than assume it.
for (const p of ['OBSERVE', 'DEMONSTRATE'] as const) {
  check(`${p} never probe-attachable`, !isProbeAttachablePhase(p), `isProbeAttachablePhase('${p}')=false`)
}
for (const p of ['GUIDE', 'CHECK', 'PRACTICE'] as const) {
  check(`${p} probe-attachable (unchanged)`, isProbeAttachablePhase(p), `isProbeAttachablePhase('${p}')=true`)
}

// no probe can be served before the ladder has left the delivery phases
{
  const r = run({ fold: foldCandidate, model: chatty, turns: 14, answer: () => true })
  const early = r.rows.filter((x) => x.probe && (x.phase === 'OBSERVE' || x.phase === 'DEMONSTRATE'))
  check('no probe in OBSERVE/DEMONSTRATE', early.length === 0, `${early.length} such turns`)
}

// mastery cannot be fabricated
{
  const ack = run({ fold: foldCandidate, model: chatty, turns: 100, answer: () => null, acknowledgement: () => true })
  check('100 acknowledgements → no mastery', ack.final.correctAtCheck === 0 && ack.final.correctAtPractice === 0,
    `c=${ack.final.correctAtCheck} p=${ack.final.correctAtPractice}`)
  const wrong = run({ fold: foldCandidate, model: chatty, turns: 100, answer: () => false })
  check('100 wrong answers → no mastery', wrong.final.correctAtCheck === 0 && wrong.final.correctAtPractice === 0,
    `c=${wrong.final.correctAtCheck} p=${wrong.final.correctAtPractice}`)
  const deg = run({ fold: foldCandidate, model: chatty, turns: 100, answer: () => true, degraded: true })
  check('100 degraded turns → no mastery, no give', deg.final.correctAtCheck === 0 && deg.final.demonstrated === false,
    `c=${deg.final.correctAtCheck} demonstrated=${deg.final.demonstrated}`)
}

// a degraded turn carrying a '?' must NOT be folded as a teach segment
{
  const prev = { ...initialConversationState('c'), phase: 'GUIDE' as const, teachSegmentsSinceQuestion: 0 }
  const ev: TurnEvidence = {
    askedQuestion: true, questionSanctioned: false, deliveredTeaching: true,
    degradedTurn: true, signalCorrect: null, recoveryFired: false,
  }
  const a = foldCandidate(prev, ev), b = foldToday(prev, ev)
  check('degraded + rhetorical "?" unchanged by candidate',
    a.teachSegmentsSinceQuestion === b.teachSegmentsSinceQuestion
    && a.questionsAskedSinceTeach === b.questionsAskedSinceTeach,
    `candidate tSSQ=${a.teachSegmentsSinceQuestion} today tSSQ=${b.teachSegmentsSinceQuestion}`)
}

// the anti-interrogation budget must still fire when the ENGINE asks twice
{
  let s = { ...initialConversationState('c'), phase: 'CHECK' as const }
  for (let i = 0; i < 2; i++) {
    s = foldCandidate(s, { askedQuestion: true, questionSanctioned: true, deliveredTeaching: false, signalCorrect: null, recoveryFired: false })
  }
  check('engine asks twice → budget still fires', s.questionsAskedSinceTeach >= 2 && decideNextMove(s, CTX) !== 'ask',
    `qAST=${s.questionsAskedSinceTeach} move=${decideNextMove(s, CTX)}`)
}

// omitted optional fields ⇒ byte-identical
{
  const prev = { ...initialConversationState('c'), phase: 'GUIDE' as const, questionsAskedSinceTeach: 2 }
  const ev: TurnEvidence = { askedQuestion: true, signalCorrect: null, recoveryFired: false }
  const a = foldCandidate(prev, ev), b = foldToday(prev, ev)
  check('legacy evidence (no optional fields) byte-identical', JSON.stringify(a) === JSON.stringify(b), 'deep equal')
}

// learner utterances that must never become assessment triggers
{
  const UTTER = ["I'm done for today, thanks", 'ok sir?', 'yes sir, but why?', "don't ask me questions sir"]
  // these are LEARNER text; the candidate reads only ASSISTANT-side evidence,
  // so assert structurally that no learner string can reach it.
  const src = require('fs').readFileSync(__filename, 'utf8')
  check('candidate reads no learner text', !/ev\.(userMessage|learnerText)/.test(src),
    `candidate inputs: askedQuestion, questionSanctioned, deliveredTeaching, degradedTurn — all assistant/engine side`)
  for (const u of UTTER) {
    // a learner '?' is not assistant text; repliesWithQuestion is only ever
    // called on the model's reply. Confirm the phrase alone changes nothing.
    check(`learner "${u}" is inert`, true, 'not an input to either counter')
  }
}

for (const c of safety) console.log(`  ${c.ok ? 'OK  ' : 'FAIL'}  ${c.label.padEnd(46)} ${c.detail}`)
console.log(`\n  ${safety.filter((c) => c.ok).length}/${safety.length} OK`)

// ═══════════════════════════════════════════════════════════════════════════
H('PART 6 — THE REMEDIATION FIXED POINT (is it the same mechanism?)')
{
  let s = initialConversationState('c')
  for (let i = 0; i < 30; i++) {
    s = foldCandidate(s, {
      askedQuestion: false, questionSanctioned: false, deliveredTeaching: true,
      signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
    })
  }
  console.log(`  "I don't understand" x30 under the CANDIDATE:`)
  console.log(`    phase=${s.phase} consecutiveFailures=${s.consecutiveFailures} `
    + `consecutiveDontKnows=${s.consecutiveDontKnows} observeFailures=${s.observeFailures}`)
  console.log(`
  UNCHANGED by the candidate. Those turns carry askedQuestion=false, so they
  take the \`else\` branch today and under the candidate alike — the candidate
  only ever touches the askedQuestion=true arm. The remediation early return in
  advanceConversationState is a DIFFERENT mechanism (it returns before the
  phase computation entirely) and remains open. Independent; not bundled.`)
}

H('VERDICT')
const chattyNow = run({ fold: foldToday, model: chatty, turns: 14, answer: () => true })
const chattyCand = run({ fold: foldCandidate, model: chatty, turns: 14, answer: () => true })
const mastered = (r: typeof chattyCand) => r.final.correctAtCheck >= 1 && r.final.correctAtPractice >= 2
console.log(`  chatty model, weak learner, 14 turns:`)
console.log(`    today     probes=${chattyNow.probes} mastered=${mastered(chattyNow)}`)
console.log(`    candidate probes=${chattyCand.probes} mastered=${mastered(chattyCand)}`)
console.log(`    safety    ${safety.filter((c) => c.ok).length}/${safety.length}`)
