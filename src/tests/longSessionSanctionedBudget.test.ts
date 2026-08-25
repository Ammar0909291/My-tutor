/**
 * PHASE 7N-3 — the narrowed budget under a LONG, MIXED GUIDE session.
 *
 * 7N-1(ii) was verified on a three-turn scenario. This closes the gap it left
 * open: a long session mixing all four turn kinds, driven through the REAL
 * fold and the REAL move engine.
 *
 *   S = engine-sanctioned ask   (the engine chose to ask; authored probe path)
 *   U = model-volunteered ask   (engine said teach, model asked anyway)
 *   T = ordinary teaching turn  (no question)
 *   R = learner requests practice/quiz
 *
 * The four properties under test, all from the phase brief:
 *   1. questionsAskedSinceTeach counts ONLY sanctioned asks
 *   2. teachSegmentsSinceQuestion keeps its intended semantics
 *   3. authored probes keep becoming eligible (GUIDE + move 'ask')
 *   4. no starvation, no interrogation-budget regression, no mastery regression
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMove,
  type ConversationState,
} from '@/lib/teaching/conversationState'

const C = 'phys.opt.total-internal-reflection'
type Kind = 'S' | 'U' | 'T'

const guide = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState(C),
  phase: 'GUIDE', taughtThisSession: true, demonstrated: true, ...over,
})
const ctx = (over: Record<string, unknown> = {}) =>
  ({ recoveryTurn: false, workedExampleFirst: false, ...over }) as never

const step = (s: ConversationState, k: Kind) => advanceConversationState(s, {
  askedQuestion: k !== 'T',
  questionSanctioned: k === 'S',
  deliveredTeaching: k === 'T' ? true : undefined,
  signalCorrect: null,
  recoveryFired: false,
}, C)

/** Drive a script, recording the gate's own condition each turn. */
function run(script: Kind[], requestAt: Set<number> = new Set()) {
  let s = guide()
  const trace: Array<{ i: number; k: Kind; qAST: number; tSSQ: number; move: string; gateOpen: boolean }> = []
  script.forEach((k, i) => {
    const move = decideNextMove(s, ctx({ practiceRequested: requestAt.has(i) }))
    trace.push({
      i, k,
      qAST: s.questionsAskedSinceTeach,
      tSSQ: s.teachSegmentsSinceQuestion,
      move,
      // phaseAllowsProbe's GUIDE clause, verbatim.
      gateOpen: s.phase === 'GUIDE' && move === 'ask',
    })
    s = step(s, k)
  })
  return { state: s, trace }
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE COUNTER COUNTS ONLY SANCTIONED ASKS
// ═══════════════════════════════════════════════════════════════════════════
describe('7N-3 — property 1: only sanctioned asks are counted', () => {
  it('a 20-turn mixed session counts exactly the sanctioned asks since the last teach', () => {
    //            0   1   2   3   4   5   6   7   8   9
    const script: Kind[] = ['U','U','U','S','U','S','T','U','S','U',
                            'T','S','S','U','T','U','U','U','U','U']
    const { trace, state } = run(script)
    // After the final teach at 14, the sanctioned asks are at 15..19 → none are S.
    expect(state.questionsAskedSinceTeach).toBe(0)

    // Spot-check the invariant at every turn: qAST equals the number of S
    // turns since the most recent T.
    trace.forEach(({ i, qAST }) => {
      const lastTeach = script.lastIndexOf('T', i - 1)
      const expected = script.slice(lastTeach + 1, i).filter((k) => k === 'S').length
      expect({ i, qAST }).toEqual({ i, qAST: expected })
    })
  })

  it('an unbroken run of 30 model questions never spends the budget', () => {
    const { state } = run(Array<Kind>(30).fill('U'))
    expect(state.questionsAskedSinceTeach).toBe(0)
  })

  it('an unbroken run of sanctioned asks still accumulates — the budget is real', () => {
    const { state } = run(Array<Kind>(5).fill('S'))
    expect(state.questionsAskedSinceTeach).toBe(5)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. teachSegmentsSinceQuestion KEEPS ITS SEMANTICS
// ═══════════════════════════════════════════════════════════════════════════
describe('7N-3 — property 2: the sibling counter is unchanged', () => {
  it('it equals the teach turns since the last question of EITHER kind', () => {
    const script: Kind[] = ['S','T','T','U','T','T','T','S','T','U','T']
    const { trace } = run(script)
    trace.forEach(({ i, tSSQ }) => {
      const lastQ = Math.max(script.lastIndexOf('S', i - 1), script.lastIndexOf('U', i - 1))
      const expected = i - 1 - lastQ    // teach turns since that question
      expect({ i, tSSQ }).toEqual({ i, tSSQ: Math.max(0, expected) })
    })
  })

  it('a model question still resets it — the visual layer and RC-D depend on this', () => {
    const { state } = run(['T','T','T','T','U'])
    expect(state.teachSegmentsSinceQuestion).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. AUTHORED PROBES KEEP BECOMING ELIGIBLE
// ═══════════════════════════════════════════════════════════════════════════
describe('7N-3 — property 3: the gate keeps opening', () => {
  it('the production pattern (model questions + a request) opens the gate', () => {
    const { trace } = run(Array<Kind>(8).fill('U'), new Set([3, 5, 7]))
    const opened = trace.filter((t) => t.gateOpen)
    expect(opened.length).toBeGreaterThan(0)
    for (const t of opened) expect(t.qAST).toBeLessThan(2)
  })

  it('alternation still opens it WITHOUT any request, after two teach turns', () => {
    const { trace } = run(['S','T','T','T','T'])
    expect(trace.some((t) => t.gateOpen)).toBe(true)
  })

  it('over 20 mixed turns the gate opens repeatedly, not once', () => {
    const script: Kind[] = ['U','T','T','S','U','T','T','S','U','U',
                            'T','T','S','U','T','T','U','S','T','T']
    const { trace } = run(script)
    expect(trace.filter((t) => t.gateOpen).length).toBeGreaterThanOrEqual(3)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. NO REGRESSION — starvation, interrogation, mastery
// ═══════════════════════════════════════════════════════════════════════════
describe('7N-3 — property 4: no regression', () => {
  it('NO STARVATION: a learner asking every turn is never denied for 5 turns running', () => {
    const { trace } = run(Array<Kind>(10).fill('U'), new Set([0,1,2,3,4,5,6,7,8,9]))
    let consecutiveDenied = 0, worst = 0
    for (const t of trace) {
      consecutiveDenied = t.gateOpen ? 0 : consecutiveDenied + 1
      worst = Math.max(worst, consecutiveDenied)
    }
    expect(worst).toBeLessThan(5)
  })

  it('NO INTERROGATION REGRESSION: the engine still cannot ask 3 times in a row', () => {
    // Three consecutive SANCTIONED asks: the budget must bite by the third.
    let s = guide()
    const moves: string[] = []
    for (let i = 0; i < 4; i++) { moves.push(decideNextMove(s, ctx())); s = step(s, 'S') }
    expect(moves.filter((m) => m === 'ask').length).toBeLessThanOrEqual(2)
  })

  it('...and that holds even when the learner keeps requesting', () => {
    let s = guide()
    const moves: string[] = []
    for (let i = 0; i < 6; i++) { moves.push(decideNextMove(s, ctx({ practiceRequested: true }))); s = step(s, 'S') }
    // Sanctioned asks still accumulate, so the budget still intervenes.
    expect(moves.includes('teach') || moves.includes('show')).toBe(true)
  })

  it('NO MASTERY REGRESSION: 20 turns of asking creates no evidence', () => {
    const { state } = run(Array<Kind>(20).fill('U'), new Set([0,5,10,15]))
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
    expect(state.phase).toBe('GUIDE')
  })

  it('a graded correct answer still advances the ladder normally', () => {
    let s = guide()
    for (let i = 0; i < 6; i++) s = step(s, 'U')          // starve first
    s = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: true, recoveryFired: false,
    }, C)
    expect(s.phase).toBe('CHECK')                          // GUIDE → CHECK on correct
  })
})
