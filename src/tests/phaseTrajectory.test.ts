/**
 * Phase Trajectory — exhaustive audit of the teaching ladder.
 *
 *   OBSERVE → DEMONSTRATE → GUIDE → CHECK → PRACTICE → TRANSFER
 *
 * WHY EXHAUSTIVE, AND WHY IT IS AFFORDABLE. advanceConversationState and
 * decideNextMoveDetailed are pure total functions over a small finite state
 * space, so enumerating it proves strictly more than sampling — the same
 * reasoning ladderConformance.test.ts states for the two ladder mappings.
 *
 * The counters are unbounded integers, so the space is made finite by
 * SATURATING every counter at 2. That abstraction is EXACT rather than
 * approximate: every guard in the machine tests `>= 1` or `>= 2`, so
 * {0, 1, 2-or-more} distinguishes every outcome any guard can produce.
 * Verified by re-running the same exploration saturated at 3 — identical
 * transition graph, identical verdicts.
 *
 * The exploration also honours the runtime's own coupling, which is where
 * the ladder's historical bugs lived: a turn whose decided move is not 'ask'
 * asks nothing, so the model emits no SIGNAL, so signalCorrect is null. A
 * model that lets any state produce any evidence would have declared
 * DEMONSTRATE healthy while it was absorbing for every learner.
 *
 * The suite pins four structural properties (no unreachable phase, no
 * absorbing phase, no skipped rung, no self-contradicting directive) plus the
 * exact transition graph, so a future edit that reintroduces a fixed point or
 * an impossible transition fails here rather than in production.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  decideNextMoveDetailed,
  buildTurnDirective,
  PHASE_ORDER,
  type ConversationState,
  type TeachingPhase,
  type TurnEvidence,
  type NextMove,
} from '@/lib/teaching/conversationState'

// ── The finite abstraction ───────────────────────────────────────────────────

const CAP = 2
const cap = (n: number) => Math.min(n ?? 0, CAP)

function key(s: ConversationState): string {
  return JSON.stringify([
    s.phase, cap(s.questionsAskedSinceTeach), cap(s.teachSegmentsSinceQuestion),
    cap(s.consecutiveFailures), s.demonstrated, cap(s.correctAtCheck), cap(s.correctAtPractice),
    cap(s.consecutiveDontKnows), cap(s.observeFailures), cap(s.totalKnowledgeProbes),
    cap(s.consecutivePriorKnowledgeProbes), s.taughtThisSession, cap(s.askSuppressedTurns),
    s.reflectionAskedThisEntry, cap(s.explanationCount), cap(s.remediationCount),
  ])
}

function normalize(s: ConversationState): ConversationState {
  return {
    ...s,
    questionsAskedSinceTeach: cap(s.questionsAskedSinceTeach),
    teachSegmentsSinceQuestion: cap(s.teachSegmentsSinceQuestion),
    consecutiveFailures: cap(s.consecutiveFailures),
    correctAtCheck: cap(s.correctAtCheck), correctAtPractice: cap(s.correctAtPractice),
    consecutiveDontKnows: cap(s.consecutiveDontKnows), observeFailures: cap(s.observeFailures),
    totalKnowledgeProbes: cap(s.totalKnowledgeProbes),
    consecutivePriorKnowledgeProbes: cap(s.consecutivePriorKnowledgeProbes),
    askSuppressedTurns: cap(s.askSuppressedTurns), explanationCount: cap(s.explanationCount),
    remediationCount: cap(s.remediationCount), turnsInCurrentPhase: 0,
  }
}

/** Which branch of advanceConversationState owns this turn's phase decision.
 *  Mirrors that function's own branch order — remediation returns first, then
 *  failure, then the succeeded/acknowledgement split. */
type Cause = 'REMEDIATION' | 'FAILURE' | 'SUCCESS' | 'ACK' | 'NEUTRAL'
function causeOf(ev: TurnEvidence): Cause {
  if (ev.learnerRequest === 'explain_differently') return 'REMEDIATION'
  if (ev.recoveryFired || ev.signalCorrect === false) return 'FAILURE'
  if (ev.signalCorrect === true) return 'SUCCESS'
  if (ev.acknowledgement) return 'ACK'
  return 'NEUTRAL'
}

/** Every turn realizable from a state, honouring the move→evidence coupling. */
function* successors(s: ConversationState):
  Generator<{ next: ConversationState; move: NextMove; ev: TurnEvidence }> {
  for (const recoveryTurn of [false, true]) {
    for (const workedExampleFirst of [false, true]) {
      const d = decideNextMoveDetailed(s, { recoveryTurn, workedExampleFirst })
      // A non-ask turn asks nothing, so it can carry no SIGNAL.
      const asked = d.move === 'ask'
      for (const signalCorrect of (asked ? [true, false, null] : [null]) as (boolean | null)[]) {
        for (const acknowledgement of [false, true]) {
          for (const learnerRequest of [null, 'explain_differently'] as const) {
            for (const dontKnowSignal of recoveryTurn ? [false, true] : [false]) {
              for (const learnerIssuedDirective of recoveryTurn ? [false, true] : [false]) {
                for (const isPriorKnowledgeProbe of [false, true]) {
                  const ev: TurnEvidence = {
                    askedQuestion: asked, signalCorrect, recoveryFired: recoveryTurn,
                    acknowledgement, learnerRequest, dontKnowSignal,
                    learnerIssuedDirective, isPriorKnowledgeProbe,
                  }
                  yield { next: normalize(advanceConversationState(s, ev)), move: d.move, ev }
                }
              }
            }
          }
        }
      }
    }
  }
}

interface Exploration {
  states: Map<string, ConversationState>
  /** "FROM->TO|CAUSE" for every phase transition that fires somewhere. */
  edges: Set<string>
  /** state key -> distinct successor state keys */
  succ: Map<string, Set<string>>
}

let cached: Exploration | null = null
function explore(): Exploration {
  if (cached) return cached
  const start = normalize(initialConversationState('c'))
  const states = new Map<string, ConversationState>([[key(start), start]])
  const edges = new Set<string>()
  const succ = new Map<string, Set<string>>()
  const queue: ConversationState[] = [start]
  while (queue.length) {
    const s = queue.shift()!
    const outs = new Set<string>()
    for (const { next, ev } of successors(s)) {
      if (next.phase !== s.phase) edges.add(`${s.phase}->${next.phase}|${causeOf(ev)}`)
      const nk = key(next)
      outs.add(nk)
      if (!states.has(nk)) { states.set(nk, next); queue.push(next) }
    }
    succ.set(key(s), outs)
  }
  cached = { states, edges, succ }
  return cached
}

const TIMEOUT = 60_000

// ── The golden transition graph ──────────────────────────────────────────────

/**
 * Every (from, to, cause) triple the machine can actually produce. Derived by
 * exhaustive enumeration, not by reading the source — so a guard that is
 * written but unreachable shows up as a missing row rather than passing on the
 * strength of its own existence.
 */
const EXPECTED_EDGES = [
  // Forward — the five rungs.
  'OBSERVE->DEMONSTRATE|SUCCESS',
  'OBSERVE->DEMONSTRATE|ACK',
  // A concluded diagnostic is itself the evidence for leaving OBSERVE
  // (phaseAfterConcludedDiagnostic) — the one forward move a failure can make.
  'OBSERVE->DEMONSTRATE|FAILURE',
  // DEMONSTRATE cannot ask, so it cannot receive a SIGNAL: this rung advances
  // on `demonstrated` alone (the reachability law), never on SUCCESS.
  'DEMONSTRATE->GUIDE|NEUTRAL',
  'DEMONSTRATE->GUIDE|ACK',
  'GUIDE->CHECK|SUCCESS',
  'GUIDE->CHECK|ACK',
  // Mastery gates advance on a graded answer only — no ACK rows below.
  'CHECK->PRACTICE|SUCCESS',
  'PRACTICE->TRANSFER|SUCCESS',

  // Regression — down exactly one rung, floor DEMONSTRATE once demonstrated.
  'GUIDE->DEMONSTRATE|FAILURE',
  'GUIDE->DEMONSTRATE|REMEDIATION',
  'CHECK->GUIDE|FAILURE',
  'CHECK->GUIDE|REMEDIATION',
  'PRACTICE->CHECK|FAILURE',
  'PRACTICE->CHECK|REMEDIATION',
  'TRANSFER->PRACTICE|FAILURE',
  'TRANSFER->PRACTICE|REMEDIATION',
].sort()

describe('phase trajectory — the transition graph', () => {
  it('is exactly the graph above — no extra edges, no missing edges', () => {
    const { edges } = explore()
    expect([...edges].sort()).toEqual(EXPECTED_EDGES)
  }, TIMEOUT)

  it('reaches every phase — none is unreachable', () => {
    const { states } = explore()
    const reached = new Set([...states.values()].map(s => s.phase))
    expect([...reached].sort()).toEqual([...PHASE_ORDER].sort())
  }, TIMEOUT)

  it('never skips a rung — every transition moves exactly one step', () => {
    const { edges } = explore()
    for (const e of edges) {
      const [pair] = e.split('|')
      const [from, to] = pair.split('->') as [TeachingPhase, TeachingPhase]
      const delta = PHASE_ORDER.indexOf(to) - PHASE_ORDER.indexOf(from)
      expect(Math.abs(delta), `${pair} jumps ${Math.abs(delta)} rungs`).toBe(1)
    }
  }, TIMEOUT)

  it('has no absorbing state — every reachable state can still change phase', () => {
    const { states, succ } = explore()
    // A state escapes if some successor is in a different phase, or if some
    // successor escapes. Least fixpoint, computed backwards.
    const escapes = new Set<string>()
    for (const [k, outs] of succ) {
      const phase = states.get(k)!.phase
      for (const nk of outs) {
        if (states.get(nk)!.phase !== phase) { escapes.add(k); break }
      }
    }
    let grew = true
    while (grew) {
      grew = false
      for (const [k, outs] of succ) {
        if (escapes.has(k)) continue
        for (const nk of outs) {
          if (escapes.has(nk)) { escapes.add(k); grew = true; break }
        }
      }
    }
    const trapped = [...succ.keys()].filter(k => !escapes.has(k))
    expect(trapped.map(k => states.get(k)!.phase)).toEqual([])
  }, TIMEOUT)
})

// ── Each rung, as an explicit trajectory ─────────────────────────────────────

function turn(s: ConversationState, ev: Partial<TurnEvidence>): ConversationState {
  return advanceConversationState(s, {
    askedQuestion: false, signalCorrect: null, recoveryFired: false, ...ev,
  })
}

/** Walk the ladder the way a lesson does: give, then a correct answer. */
function climbTo(target: TeachingPhase): ConversationState {
  let s = initialConversationState('c')
  let guard = 0
  while (s.phase !== target) {
    if (guard++ > 30) throw new Error(`could not climb to ${target}, stuck at ${s.phase}`)
    const move = decideNextMoveDetailed(s, { recoveryTurn: false, workedExampleFirst: false }).move
    s = move === 'ask'
      ? turn(s, { askedQuestion: true, signalCorrect: true })
      : turn(s, { acknowledgement: true })
  }
  return s
}

describe('phase trajectory — forward progression', () => {
  it('climbs OBSERVE → DEMONSTRATE → GUIDE → CHECK → PRACTICE → TRANSFER', () => {
    const seen: TeachingPhase[] = ['OBSERVE']
    let s = initialConversationState('c')
    for (let i = 0; i < 40 && s.phase !== 'TRANSFER'; i++) {
      const move = decideNextMoveDetailed(s, { recoveryTurn: false, workedExampleFirst: false }).move
      const before = s.phase
      s = move === 'ask'
        ? turn(s, { askedQuestion: true, signalCorrect: true })
        : turn(s, { acknowledgement: true })
      if (s.phase !== before) seen.push(s.phase)
    }
    expect(seen).toEqual(['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'])
  })

  it('needs TWO practice successes for PRACTICE → TRANSFER, not one', () => {
    const s = climbTo('PRACTICE')
    const once = turn(s, { askedQuestion: true, signalCorrect: true })
    expect(once.phase).toBe('PRACTICE')
    expect(once.correctAtPractice).toBe(1)
    const twice = turn(once, { askedQuestion: true, signalCorrect: true })
    expect(twice.phase).toBe('TRANSFER')
  })

  it('an acknowledgement moves the delivery phases but never a mastery gate', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE'] as TeachingPhase[]) {
      const s = climbTo(phase)
      expect(turn(s, { acknowledgement: true }).phase, `${phase} should advance`)
        .not.toBe(phase)
    }
    for (const phase of ['CHECK', 'PRACTICE', 'TRANSFER'] as TeachingPhase[]) {
      const s = climbTo(phase)
      const after = turn(s, { acknowledgement: true })
      expect(after.phase, `${phase} must not advance on an acknowledgement`).toBe(phase)
      expect(after.correctAtCheck).toBe(s.correctAtCheck)
      expect(after.correctAtPractice).toBe(s.correctAtPractice)
    }
  })
})

describe('phase trajectory — legal regression', () => {
  it('failure drops exactly one rung from every phase above the floor', () => {
    for (const [from, to] of [
      ['GUIDE', 'DEMONSTRATE'], ['CHECK', 'GUIDE'],
      ['PRACTICE', 'CHECK'], ['TRANSFER', 'PRACTICE'],
    ] as [TeachingPhase, TeachingPhase][]) {
      const s = climbTo(from)
      expect(turn(s, { askedQuestion: true, signalCorrect: false }).phase).toBe(to)
      expect(turn(s, { recoveryFired: true }).phase).toBe(to)
    }
  })

  it('"explain differently" counts as remediation, and HOLDS the gate once', () => {
    // UPDATED BY PHASE E (G-2), deliberately. This previously asserted that a
    // clarification request at CHECK regresses to GUIDE unconditionally.
    // Phase D measured the cost live: "sorry sir can you say more simple" is
    // the defining move of a weak learner, and demoting on it meant the mastery
    // gate was entered and left without a CHECK-phase question ever being
    // asked — 3 of 4 hard lessons closed at check=0 for this reason.
    //
    // The FIRST clarification inside a gate now re-teaches in place. Everything
    // else about remediation is unchanged and is still asserted here.
    const s = climbTo('CHECK')
    const after = turn(s, { learnerRequest: 'explain_differently' })
    expect(after.phase).toBe('CHECK')
    expect(after.remediationCount).toBe(s.remediationCount + 1)
    expect(after.consecutiveFailures).toBe(s.consecutiveFailures + 1)
  })

  it('and the SECOND one regresses exactly as it always did', () => {
    // The hold is once per remediation cycle, not a licence to sit in the gate.
    const s = climbTo('CHECK')
    const once = turn(s, { learnerRequest: 'explain_differently' })
    const twice = turn(once, { learnerRequest: 'explain_differently' })
    expect(twice.phase).toBe('GUIDE')
  })

  it('clarification at GUIDE holds once, then regresses (G-2b)', () => {
    // NARROWED 2026-08-30, previously "regresses one rung, unchanged".
    // `remediationCount` is cleared by a graded-correct answer, so a learner
    // alternating "explain it again" with a correct answer arrived here with
    // the counter at 0 every time: every request was the first, and
    // GUIDE <-> DEMONSTRATE cycled for the whole lesson with check 0.
    // Reproduced offline at 12 turns / 6 correct answers, and measured live on
    // 3 physics sessions plus chem.bio.enzyme-kinetics, all ending 0/0.
    // The regression it protected is intact — it is now on the second request.
    const g = climbTo('GUIDE')
    const once = turn(g, { learnerRequest: 'explain_differently' })
    expect(once.phase).toBe('GUIDE')
    expect(turn(once, { learnerRequest: 'explain_differently' }).phase).toBe('DEMONSTRATE')
  })

  it('OBSERVE still goes to DEMONSTRATE on a clarification — the hold is only against a DEMOTION', () => {
    // phaseDown floors at DEMONSTRATE once something has been demonstrated, so
    // at OBSERVE it moves the learner UP: "explain it differently" there has
    // always meant go and show them. G-2b holds only when the step would walk
    // the ladder backwards, so this path is untouched.
    const o = climbTo('DEMONSTRATE')
    const back = turn(o, { learnerRequest: 'explain_differently' })
    expect(back.phase).toBe('DEMONSTRATE')
  })

  it('never regresses below DEMONSTRATE once something has been demonstrated', () => {
    const s = climbTo('DEMONSTRATE')
    let cur = turn(s, { acknowledgement: false })  // a SHOW turn sets demonstrated
    expect(cur.demonstrated).toBe(true)
    for (let i = 0; i < 5; i++) cur = turn(cur, { recoveryFired: true })
    expect(cur.phase).toBe('DEMONSTRATE')
  })

  it('a failure at OBSERVE concludes the diagnostic and moves FORWARD, not down', () => {
    let s = initialConversationState('c')
    s = turn(s, { recoveryFired: true, dontKnowSignal: true })
    expect(s.phase).toBe('OBSERVE')
    s = turn(s, { recoveryFired: true, dontKnowSignal: true })
    // Two non-answers: the probe has succeeded, its answer is "they don't know".
    expect(s.phase).toBe('DEMONSTRATE')
  })
})

// ── Conflicting guards, at the directive layer ───────────────────────────────

/**
 * The transition machine and the prompt are two halves of one decision. A
 * directive that forbids and demands a question in the same block is a
 * conflicting guard even though no transition is malformed: the model resolves
 * opposite orders with a content-free holding message, the learner
 * acknowledges it, and the lesson stops moving while the state machine looks
 * healthy.
 *
 * buildTurnDirective is a pure function of (state, nextMove, flags), so this
 * is checkable exhaustively rather than by inspection.
 */
const FORBIDS_QUESTION = /Ask NO questions this turn|QUESTIONS ARE NOT LEGAL THIS TURN/
const DEMANDS_QUESTION: [string, RegExp][] = [
  ['low-signal acknowledgement', /You MUST ask ONE concrete check question/],
  ['PREDICT-THEN-CHECK', /PREDICT-THEN-CHECK/],
  ['STRATEGY NAMING', /STRATEGY NAMING/],
]

describe('phase trajectory — no self-contradicting directive', () => {
  it('never forbids and demands a question in the same directive', () => {
    const conflicts: string[] = []
    for (const phase of PHASE_ORDER) {
      for (const nextMove of ['teach', 'show', 'ask'] as NextMove[]) {
        for (const lowSignalAcknowledgement of [false, true]) {
          for (const correctAtPractice of [0, 1, 2]) {
            // A legality rationale exists only when Band 2 REMOVED ask, so it
            // can never accompany an 'ask' move. Pairing them would test an
            // input decideNextMoveDetailed cannot produce.
            const rationales = nextMove === 'ask'
              ? [null]
              : [null, 'Teach. Do not ask anything this turn.']
            for (const legalityRationale of rationales) {
              const state: ConversationState = {
                ...initialConversationState('c'),
                phase, correctAtPractice, demonstrated: true, taughtThisSession: true,
              }
              const d = buildTurnDirective({
                state, nextMove, maxParagraphs: null, workedExampleFirst: false,
                visualType: null, lowSignalAcknowledgement, legalityRationale,
              })
              if (!FORBIDS_QUESTION.test(d)) continue
              for (const [name, re] of DEMANDS_QUESTION) {
                if (re.test(d)) {
                  conflicts.push(`${phase}/${nextMove}/ack=${lowSignalAcknowledgement}: ${name}`)
                }
              }
            }
          }
        }
      }
    }
    expect(conflicts).toEqual([])
  })

  it('still orders the check question when the turn actually asks', () => {
    const state: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK',
      demonstrated: true, taughtThisSession: true,
    }
    const d = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: null, workedExampleFirst: false,
      visualType: null, lowSignalAcknowledgement: true,
    })
    expect(d).toMatch(/You MUST ask ONE concrete check question/)
  })

  it('on a give turn at a mastery gate, still refuses the acknowledgement credit', () => {
    const state: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK',
      demonstrated: true, taughtThisSession: true,
    }
    const d = buildTurnDirective({
      state, nextMove: 'teach', maxParagraphs: null, workedExampleFirst: false,
      visualType: null, lowSignalAcknowledgement: true,
    })
    expect(d).toMatch(/NOT evidence of understanding/)
    expect(d).not.toMatch(/You MUST ask ONE concrete check question/)
    // and it must not answer the acknowledgement with a holding line
    expect(d).toMatch(/do NOT send a holding line/i)
  })

  it('keeps PREDICT-THEN-CHECK on TRANSFER turns that ask', () => {
    const state: ConversationState = {
      ...initialConversationState('c'), phase: 'TRANSFER',
      demonstrated: true, taughtThisSession: true,
    }
    const asking = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: null, workedExampleFirst: false, visualType: null,
    })
    expect(asking).toMatch(/PREDICT-THEN-CHECK/)
  })
})
