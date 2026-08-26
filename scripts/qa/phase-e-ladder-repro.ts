/**
 * PHASE E — OFFLINE ROOT-CAUSE REPRODUCTION OF THE 3/4 MASTERY FAILURE.
 *
 * INVESTIGATION ONLY. Nothing here changes production code. It imports the
 * REAL modules — advanceConversationState, isLowSignalAcknowledgement,
 * isBareAcknowledgement, detectLearnerRequest, detectFailureState,
 * isDontKnowSignal, qualifiesForBudgetExtension — and drives them with the
 * exact learner utterances the live Phase E run sent, so a verdict here can be
 * checked line by line against `phaseE2.log`.
 *
 * No provider. No database. No network. Deterministic.
 *
 *   npx tsx scripts/qa/phase-e-ladder-repro.ts
 */
import {
  advanceConversationState,
  initialConversationState,
  isLowSignalAcknowledgement,
  type ConversationState,
  type TeachingPhase,
} from '../../src/lib/teaching/conversationState'
import { isBareAcknowledgement, detectLearnerRequest, masteryVerifiedStrict, asksForPractice } from '../../src/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '../../src/lib/teaching/recoveryGuard'
import {
  CONCEPT_TURN_BUDGET,
  BUDGET_EXTENSION_TURNS,
  qualifiesForBudgetExtension,
  effectiveTurnBudget,
} from '../../src/lib/teaching/conceptBudget'

const rule = (t: string) => console.log(`\n${'═'.repeat(78)}\n${t}\n${'═'.repeat(78)}`)

// ── The learner's own words, exactly as the live harness sent them ──────────
const CONFUSED = [
  'sir i not understand this',
  'ok but why it happen like that',
  'sorry sir can you say more simple',
  'hmm i think i get little bit',
  'can you show picture please',
  'ok sir',
  'i am bit confused sir',
  'please explain one more time simple words',
]
const PRACTICE = [
  'sir can you give me one question to try',
  'i want practice please',
  'give me one more question sir',
]

// ═══════════════════════════════════════════════════════════════════════════
// A. WHAT DO THE REAL DETECTORS SAY ABOUT THIS LEARNER'S WORDS?
// ═══════════════════════════════════════════════════════════════════════════
function classify(msg: string) {
  const key = detectFailureState(msg, null)
  return {
    ack: isLowSignalAcknowledgement(msg),
    bareAck: isBareAcknowledgement(msg),
    request: detectLearnerRequest(msg),
    failureKey: key,
    dontKnow: isDontKnowSignal(key),
  }
}

function reportDetectors() {
  rule('A. THE REAL DETECTORS, ON THE LEARNER\'S REAL WORDS')
  console.log('  ack        = isLowSignalAcknowledgement  (the ONLY input that advances a')
  console.log('               delivery phase without a graded-correct answer)')
  console.log('  request    = detectLearnerRequest        (explain_differently => remediation')
  console.log('               branch, early return, no advance)')
  console.log('  failureKey = detectFailureState          (=> recoveryFired => failure branch)\n')
  const all = [...CONFUSED, ...PRACTICE, 'ok', 'ok sir', 'yes sir', 'got it sir', 'thik hai sir']
  for (const m of all) {
    const c = classify(m)
    console.log(
      `  ${c.ack ? 'ACK ' : '    '}${c.bareAck ? 'BARE' : '    '} `
      + `${(c.request ?? '—').padEnd(20)} ${(c.failureKey ?? '—').padEnd(18)} "${m}"`,
    )
  }

  console.log('\n  ── THE POLITENESS CLIFF ──')
  for (const [a, b] of [['ok', 'ok sir'], ['got it', 'got it sir'], ['yes', 'yes sir'], ['okay', 'okay sir']]) {
    console.log(`  "${a}" -> ack=${isLowSignalAcknowledgement(a)}   |   "${b}" -> ack=${isLowSignalAcknowledgement(b)}`)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// B. THE LADDER, DRIVEN BY THE REAL FOLD
// ═══════════════════════════════════════════════════════════════════════════
interface Turn {
  said: string
  /** null = the tutor asked nothing gradeable this turn. */
  graded?: boolean | null
  /** The server's decided move for the ASSISTANT turn being folded. */
  move?: 'teach' | 'show' | 'ask'
}

function replay(label: string, turns: Turn[]) {
  let s: ConversationState = initialConversationState('demo.concept')
  const rows: string[] = []
  for (let i = 0; i < turns.length; i++) {
    const t = turns[i]
    const move = t.move ?? 'ask'
    const key = detectFailureState(t.said, null)
    const before = s.phase
    // Budget stop: the route ends the concept once turnsOnConcept reaches the
    // effective budget. Evaluated on the state as the route evaluates it.
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) {
      rows.push(`  ${String(i + 1).padStart(2)} | ——— BUDGET EXHAUSTED (${effectiveTurnBudget(s)} turns) ———`)
      break
    }
    s = advanceConversationState(s, {
      askedQuestion: move === 'ask',
      questionSanctioned: move === 'ask',
      signalCorrect: t.graded ?? null,
      recoveryFired: key !== null,
      learnerRequest: detectLearnerRequest(t.said),
      misconceptionDetected: false,
      isPriorKnowledgeProbe: false,
      dontKnowSignal: isDontKnowSignal(key),
      learnerIssuedDirective: false,
      degradedTurn: false,
      deliveredTeaching: move === 'teach' || move === 'show',
      acknowledgement: isLowSignalAcknowledgement(t.said),
    } as Parameters<typeof advanceConversationState>[1])
    const moved = before !== s.phase
    rows.push(
      `  ${String(i + 1).padStart(2)} | ${s.phase.padEnd(11)} c=${s.correctAtCheck} p=${s.correctAtPractice}`
      + ` ${moved ? '▲' : ' '} ${s.budgetExtensionGranted ? 'EXT' : '   '}`
      + `  "${t.said}"`,
    )
  }
  console.log(`\n  ── ${label} ──`)
  rows.forEach((r) => console.log(r))
  console.log(
    `     final: phase=${s.phase} check=${s.correctAtCheck} practice=${s.correctAtPractice}`
    + ` turns=${s.turnsOnConcept} extension=${s.budgetExtensionGranted ?? false}`
    + ` MASTERED=${masteryVerifiedStrict(s)}`,
  )
  return s
}

// ═══════════════════════════════════════════════════════════════════════════
// C. THE MINIMUM COST OF THE LADDER
// ═══════════════════════════════════════════════════════════════════════════
function minimumCost() {
  rule('C. THE CHEAPEST POSSIBLE ROUTE TO MASTERY')
  console.log('  A learner who answers a gradeable question CORRECTLY on every single turn')
  console.log('  and never says anything else. This is the floor — nobody can do better.\n')
  let s = initialConversationState('demo.concept')
  let n = 0
  const seen: TeachingPhase[] = [s.phase]
  while (!masteryVerifiedStrict(s) && n < 40) {
    n++
    s = advanceConversationState(s, {
      askedQuestion: true, questionSanctioned: true, signalCorrect: true,
      recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
      isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: false, acknowledgement: false,
    } as Parameters<typeof advanceConversationState>[1])
    seen.push(s.phase)
  }
  console.log(`  ${seen.join(' -> ')}`)
  console.log(`  MINIMUM TURNS TO MASTERY = ${n}   (budget = ${CONCEPT_TURN_BUDGET})`)
  console.log(`  SLACK for a perfect learner = ${CONCEPT_TURN_BUDGET - n} turns`)
  console.log('\n  Each of those turns needs a gradeable question ALREADY on screen. The')
  console.log('  gate attaches one only when phaseBeforeTurn is already a mastery gate')
  console.log('  (or GUIDE+ask), so reaching CHECK and being ASKED at CHECK are two')
  console.log('  different turns.')
  return n
}

// ═══════════════════════════════════════════════════════════════════════════
// D. THE BUDGET EXTENSION — WHO GETS IT
// ═══════════════════════════════════════════════════════════════════════════
function extensionAudit() {
  rule('D. THE BUDGET EXTENSION IS DENIED TO EXACTLY THE STALLED LEARNER')
  const at = (phase: TeachingPhase, c: number, p: number, fails = 0): ConversationState => ({
    ...initialConversationState('demo.concept'),
    phase, correctAtCheck: c, correctAtPractice: p,
    consecutiveFailures: fails, turnsOnConcept: CONCEPT_TURN_BUDGET,
  })
  const cases: Array<[string, ConversationState]> = [
    ['reached CHECK on the last turn, 0 answers yet (rolling-motion)', at('CHECK', 0, 0)],
    ['still at GUIDE (particle-in-box)', at('GUIDE', 0, 0)],
    ['still at DEMONSTRATE (mo-theory)', at('DEMONSTRATE', 0, 0)],
    ['at PRACTICE with 1 check + 1 practice (vsepr)', at('PRACTICE', 1, 1)],
  ]
  console.log(`  base budget ${CONCEPT_TURN_BUDGET}, extension +${BUDGET_EXTENSION_TURNS}\n`)
  for (const [label, st] of cases) {
    const ok = qualifiesForBudgetExtension(st)
    console.log(`  ${ok ? 'GRANTED ' : 'DENIED  '} ${label}`)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// E. THE REGISTER EXPERIMENT — the same lesson, said two ways
// ═══════════════════════════════════════════════════════════════════════════
/**
 * A deterministic model of WHERE a gradeable question comes from. Two rules,
 * both read straight out of production, nothing invented:
 *
 *   1. gateAssessment.isProbeAttachablePhase — the authored gate may attach a
 *      probe at GUIDE / CHECK / PRACTICE and NOWHERE else.
 *   2. route.ts's GUIDE branch — at GUIDE the move is `ask` (so the gate can
 *      fire) when the learner asked for one: masteryGate.asksForPractice.
 *      At CHECK / PRACTICE the move is always `ask`.
 *
 * The model is DELIBERATELY GENEROUS to the failing case: it assumes the
 * probe pool never runs dry and the learner always answers correctly. If the
 * lesson still cannot close under those assumptions, wording is the binding
 * constraint and nothing else is.
 */
function questionOnScreen(phase: TeachingPhase, said: string): boolean {
  if (phase === 'CHECK' || phase === 'PRACTICE' || phase === 'TRANSFER') return true
  if (phase === 'GUIDE') return asksForPractice(said)
  return false // OBSERVE and DEMONSTRATE: the authored gate is forbidden here.
}

function registerRun(label: string, script: string[]) {
  let s: ConversationState = initialConversationState('demo.concept')
  const rows: string[] = []
  let asked = 0
  for (let i = 0; i < script.length; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) {
      rows.push(`  ${String(i + 1).padStart(2)} | ——— BUDGET EXHAUSTED ———`); break
    }
    const said = script[i]
    const gradeable = questionOnScreen(s.phase, said)
    if (gradeable) asked++
    const key = detectFailureState(said, null)
    const before = s.phase
    s = advanceConversationState(s, {
      askedQuestion: true, questionSanctioned: true,
      // Generous: whenever a question was on screen, the learner gets it right.
      signalCorrect: gradeable ? true : null,
      recoveryFired: key !== null,
      learnerRequest: detectLearnerRequest(said),
      misconceptionDetected: false, isPriorKnowledgeProbe: false,
      dontKnowSignal: isDontKnowSignal(key), learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: true,
      acknowledgement: isLowSignalAcknowledgement(said),
    } as Parameters<typeof advanceConversationState>[1])
    rows.push(
      `  ${String(i + 1).padStart(2)} | ${s.phase.padEnd(11)} c=${s.correctAtCheck} p=${s.correctAtPractice}`
      + ` ${before !== s.phase ? '▲' : ' '} ${gradeable ? 'Q' : ' '}  "${said}"`,
    )
    if (masteryVerifiedStrict(s)) break
  }
  console.log(`\n  ── ${label} ──`)
  rows.forEach((r) => console.log(r))
  console.log(`     gradeable questions served: ${asked}   MASTERED=${masteryVerifiedStrict(s)}`
    + `  final=${s.phase} c=${s.correctAtCheck} p=${s.correctAtPractice}`)
}

function registerExperiment() {
  rule('E. THE SAME LESSON, SAID TWO WAYS')
  console.log('  Identical intent, turn for turn. Only the WORDING differs. The learner is')
  console.log('  assumed to answer correctly every time a question is on screen, and the')
  console.log('  authored probe pool is assumed infinite — both in the weak learner\'s favour.')
  const weak = [
    'sir i not understand this', 'ok but why it happen like that',
    'sorry sir can you say more simple', 'i want practice please',
    'hmm i think i get little bit', 'can you show picture please',
    'ok sir', 'give me one more question sir',
    'i am bit confused sir', 'ok sir',
    'sir can you give me one question to try', 'ok sir',
  ]
  const standard = [
    'I don\'t understand this', 'but why does it happen like that',
    'can you explain it more simply', 'can we practice',
    'I think I get it a little', 'can you show me a picture',
    'ok', 'ask me another question',
    'I am confused', 'ok',
    'give me a question to try', 'ok',
  ]
  registerRun('WEAK-LEARNER REGISTER (what the live run actually sent)', weak)
  registerRun('STANDARD REGISTER (same intent, same order)', standard)
}

// ═══════════════════════════════════════════════════════════════════════════
// F. WOULD THE CANDIDATE FIX BE ENOUGH? (simulated, production untouched)
// ═══════════════════════════════════════════════════════════════════════════
/**
 * The candidate is a NORMALISATION applied before the two EXISTING detectors,
 * not a new detector: strip a leading/trailing vocative and politeness marker
 * so "ok sir" reaches `isLowSignalAcknowledgement` as "ok", and
 * "give me one more question sir" reaches `asksForPractice` as
 * "give me one more question".
 *
 * Simulated here by normalising the string this script passes in. Production
 * code is NOT modified — this only measures whether the fix would be
 * sufficient, which is the one thing worth knowing before writing it.
 */
const VOCATIVE = /\b(sir|ma'?am|madam|miss|teacher|please|thanks|thank\s+you)\b/gi
function normaliseForDetectors(m: string): string {
  return m.replace(VOCATIVE, ' ').replace(/\s{2,}/g, ' ').replace(/^[\s,]+|[\s,]+$/g, '')
}

function fixRun(label: string, script: string[], normalise: boolean) {
  let s: ConversationState = initialConversationState('demo.concept')
  const rows: string[] = []
  let asked = 0
  for (let i = 0; i < script.length; i++) {
    if ((s.turnsOnConcept ?? 0) >= effectiveTurnBudget(s)) {
      rows.push(`  ${String(i + 1).padStart(2)} | ——— BUDGET EXHAUSTED (${effectiveTurnBudget(s)}) ———`); break
    }
    const said = script[i]
    const seen = normalise ? normaliseForDetectors(said) : said
    const gradeable = questionOnScreen(s.phase, seen)
    if (gradeable) asked++
    const key = detectFailureState(seen, null)
    const before = s.phase
    s = advanceConversationState(s, {
      askedQuestion: true, questionSanctioned: true,
      signalCorrect: gradeable ? true : null,
      recoveryFired: key !== null,
      learnerRequest: detectLearnerRequest(seen),
      misconceptionDetected: false, isPriorKnowledgeProbe: false,
      dontKnowSignal: isDontKnowSignal(key), learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: true,
      acknowledgement: isLowSignalAcknowledgement(seen),
    } as Parameters<typeof advanceConversationState>[1])
    rows.push(
      `  ${String(i + 1).padStart(2)} | ${s.phase.padEnd(11)} c=${s.correctAtCheck} p=${s.correctAtPractice}`
      + ` ${before !== s.phase ? '▲' : ' '} ${gradeable ? 'Q' : ' '}  "${said}"`,
    )
    if (masteryVerifiedStrict(s)) break
  }
  console.log(`\n  ── ${label} ──`)
  rows.forEach((r) => console.log(r))
  console.log(`     questions served: ${asked}   MASTERED=${masteryVerifiedStrict(s)}`
    + `  final=${s.phase} c=${s.correctAtCheck} p=${s.correctAtPractice} turns=${s.turnsOnConcept}`)
}

function candidateFix() {
  rule('F. WOULD READING THE VOCATIVE BE ENOUGH? (simulation only)')
  console.log('  The SAME twelve weak-register turns as section E. Production is unchanged;')
  console.log('  the string is normalised before the REAL detectors read it.\n')
  const weak = [
    'sir i not understand this', 'ok but why it happen like that',
    'sorry sir can you say more simple', 'i want practice please',
    'hmm i think i get little bit', 'can you show picture please',
    'ok sir', 'give me one more question sir',
    'i am bit confused sir', 'ok sir',
    'sir can you give me one question to try', 'ok sir',
    // The budget extension is evaluated at turn 12; these two exist to show
    // whether it is granted and what the learner does with it.
    'sir can you give me one question to try', 'ok sir',
  ]
  fixRun('TODAY  (no normalisation)', weak, false)
  fixRun('WITH the vocative strip', weak, true)
}

function main() {
  reportDetectors()

  rule('B. THE THREE FAILED LESSONS, REPLAYED THROUGH THE REAL FOLD')
  console.log('  ▲ = the ladder moved this turn.  Assistant move is `ask` unless the live')
  console.log('  trace shows a pure delivery turn.')

  // phys.mech.rolling-motion — the live trace, turn for turn.
  replay('rolling-motion (live: OBSERVE->DEMONSTRATE->GUIDE->CHECK, c=0 p=0)', [
    { said: CONFUSED[0] },
    { said: CONFUSED[1], move: 'teach' },
    { said: CONFUSED[2], move: 'teach' },
    { said: PRACTICE[1] },
    { said: 'i think it is 3.1 m/s', graded: false },
    { said: CONFUSED[3], move: 'teach' },
    { said: CONFUSED[4], move: 'show' },
    { said: PRACTICE[2] },
    { said: 'A. but sir i not fully sure', graded: true },
    { said: CONFUSED[5], move: 'teach' },
    { said: CONFUSED[6] },
    { said: 'maybe 7.5 rad/s', graded: true },
  ])

  // phys.qm.particle-in-box
  replay('particle-in-box (live: OBSERVE->DEMONSTRATE->GUIDE, c=0 p=0)', [
    { said: CONFUSED[0] },
    { said: CONFUSED[1], move: 'teach' },
    { said: CONFUSED[2], move: 'teach' },
    { said: PRACTICE[1] },
    { said: 'i think it is 3pi^2', graded: null },
    { said: CONFUSED[3], move: 'teach' },
    { said: CONFUSED[4], move: 'show' },
    { said: PRACTICE[2] },
    { said: 'A. but sir i not fully sure', graded: true },
    { said: CONFUSED[5], move: 'teach' },
    { said: CONFUSED[6], move: 'teach' },
    { said: PRACTICE[0] },
  ])

  // chem.bond.mo-theory
  replay('mo-theory (live: OBSERVE only, c=0 p=0)', [
    { said: CONFUSED[0], move: 'teach' },
    { said: CONFUSED[1] },
    { said: CONFUSED[2], move: 'teach' },
    { said: PRACTICE[1] },
    { said: CONFUSED[3] },
    { said: CONFUSED[4], move: 'show' },
    { said: CONFUSED[5], move: 'teach' },
    { said: PRACTICE[2] },
    { said: 'i think it is n2 has a bond order of', graded: null },
    { said: CONFUSED[6] },
    { said: CONFUSED[7], move: 'teach' },
    { said: 'C. but sir i not fully sure', graded: null },
  ])

  // chem.bond.vsepr — the one that worked.
  replay('vsepr (live: reached TRANSFER, c=1 p=2, MASTERED on turn 13)', [
    { said: CONFUSED[0], move: 'teach' },
    { said: CONFUSED[1], move: 'teach' },
    { said: CONFUSED[2], move: 'teach' },
    { said: PRACTICE[1] },
    { said: 'i think it is linear', graded: false },
    { said: 'D. but sir i not fully sure', graded: true },
    { said: CONFUSED[3], move: 'teach' },
    { said: 'maybe tetrahedral', graded: true },
    { said: CONFUSED[4], move: 'show' },
    { said: CONFUSED[5], move: 'teach' },
    { said: 'sir i think A', graded: true },
    { said: 'i think it is trigonal pyramidal', graded: true },
    { said: 'A. but sir i not fully sure', graded: true },
  ])

  rule('B2. THE ONE-WORD EXPERIMENT — "ok" vs "ok sir"')
  console.log('  The SAME twelve turns. The learner is equally engaged in both. The only')
  console.log('  difference is that one of them is polite.')
  const script = (ack: string): Turn[] => ([
    { said: ack, move: 'teach' }, { said: ack, move: 'teach' }, { said: ack, move: 'teach' },
    { said: ack, move: 'teach' }, { said: ack, move: 'teach' }, { said: ack, move: 'teach' },
    { said: 'A', graded: true }, { said: 'B', graded: true }, { said: 'C', graded: true },
    { said: ack, move: 'teach' }, { said: ack, move: 'teach' }, { said: ack, move: 'teach' },
  ])
  replay('learner says "ok"', script('ok'))
  replay('learner says "ok sir"', script('ok sir'))

  registerExperiment()
  candidateFix()
  minimumCost()
  extensionAudit()

  rule('VERDICT INPUTS — read these against phaseE2.log before believing anything')
}

main()
