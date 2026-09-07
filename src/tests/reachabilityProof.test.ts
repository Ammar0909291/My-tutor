/**
 * S2 — THE REACHABILITY THEOREM.
 *
 * The invariant, stated by the owner and adopted verbatim as a DESIGN-TIME
 * property (it is not decidable at runtime — at turn 7 the server cannot know
 * whether an event is impossible or merely late):
 *
 *   "NO LEGITIMATE NON-TERMINAL STATE MAY DEPEND FOREVER ON AN EVENT THAT THE
 *    RUNTIME HAS MADE IMPOSSIBLE TO PRODUCE."
 *
 * Checked here as a THEOREM about the real fold, not as a runtime guard.
 *
 * ── THE METHOD, AND WHY IT IS PARAMETERISED BY A MOVE SET ──────────────────
 * Asking "can this state ever reach TRANSFER?" is trivially yes: feed it a
 * server-graded correct answer three times. That question is useless, because
 * the whole defect class is that THE RUNTIME REMOVES MOVES FROM THE LEARNER.
 * L1 is exactly this: the pending-probe latch means no server grade can be
 * produced at all, so the learner's usable alphabet shrinks — and the question
 * that matters is whether the machine can still finish using ONLY what is left.
 *
 * So every proof below is `TRANSFER reachable from S using move set M`, and M
 * is chosen to model a real runtime configuration. That makes the owner's
 * sentence machine-checkable: a state that cannot reach TRANSFER under the
 * moves the runtime still permits IS a state depending forever on an event the
 * runtime made impossible.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'

// ── The learner-move alphabet. Each entry is a turn the runtime can actually
//    produce; the name says what the learner did, not what we wish they did.
const MOVES: Record<string, TurnEvidence> = {
  gradedCorrect: {
    askedQuestion: true, questionSanctioned: true, signalCorrect: true,
    serverGraded: true, recoveryFired: false,
  },
  gradedWrong: {
    askedQuestion: true, questionSanctioned: true, signalCorrect: false,
    serverGraded: true, recoveryFired: false,
  },
  acknowledgement: {
    askedQuestion: false, signalCorrect: null, recoveryFired: false,
    acknowledgement: true, deliveredTeaching: true,
  },
  ungradeableAnswerToSanctionedAsk: {
    askedQuestion: true, questionSanctioned: true, signalCorrect: null,
    recoveryFired: false,
  },
  ungradeableAnswerToUnsanctionedAsk: {
    askedQuestion: true, questionSanctioned: false, signalCorrect: null,
    recoveryFired: false,
  },
  teachOnly: {
    askedQuestion: false, signalCorrect: null, recoveryFired: false,
    deliveredTeaching: true,
  },
  dontKnow: {
    askedQuestion: false, signalCorrect: null, recoveryFired: true,
    dontKnowSignal: true,
  },
}

/** The dimensions that decide what the machine can do next. Bounded, so the
 *  space is finite and the search is exhaustive rather than sampled. */
function key(s: ConversationState): string {
  return [
    s.phase,
    Math.min(s.correctAtCheck ?? 0, 2),
    Math.min(s.correctAtPractice ?? 0, 3),
    s.demonstrated ? 1 : 0,
    Math.min(s.observeFailures ?? 0, 3),
    Math.min(s.consecutiveDontKnows ?? 0, 3),
    Math.min(s.teachSegmentsSinceQuestion ?? 0, 3),
  ].join('|')
}

interface Node { state: ConversationState; edges: Map<string, string> }

/** Exhaustive forward exploration of the real fold under a given move set. */
function explore(moveNames: string[], seed?: Partial<ConversationState>) {
  const start = { ...initialConversationState('proof.concept'), ...seed } as ConversationState
  const nodes = new Map<string, Node>()
  const queue: ConversationState[] = [start]
  nodes.set(key(start), { state: start, edges: new Map() })
  while (queue.length) {
    const s = queue.shift()!
    const node = nodes.get(key(s))!
    for (const m of moveNames) {
      const next = advanceConversationState(s, MOVES[m])
      const k = key(next)
      node.edges.set(m, k)
      if (!nodes.has(k)) { nodes.set(k, { state: next, edges: new Map() }); queue.push(next) }
    }
  }
  return nodes
}

/** Which explored states can reach a state satisfying `goal`? Reverse BFS. */
function canReach(nodes: Map<string, Node>, goal: (s: ConversationState) => boolean): Set<string> {
  const good = new Set<string>()
  for (const [k, n] of nodes) if (goal(n.state)) good.add(k)
  let grew = true
  while (grew) {
    grew = false
    for (const [k, n] of nodes) {
      if (good.has(k)) continue
      for (const dest of n.edges.values()) {
        if (good.has(dest)) { good.add(k); grew = true; break }
      }
    }
  }
  return good
}

const MASTERED = (s: ConversationState) =>
  (s.correctAtCheck ?? 0) >= 1 && (s.correctAtPractice ?? 0) >= 2

describe('S2 — reachability theorem over the real conversation-state fold', () => {
  it('CONTROL: with the full move set, every reachable state can still finish', () => {
    const nodes = explore(Object.keys(MOVES))
    const good = canReach(nodes, MASTERED)
    const dead = [...nodes.keys()].filter((k) => !good.has(k))
    // A learner who can produce a graded answer is never stuck, from anywhere.
    expect(dead).toEqual([])
    // and the space is genuinely explored, not trivially small
    expect(nodes.size).toBeGreaterThan(20)
  })

  it('THE THEOREM: strip the server grade — the event L1 makes impossible — and the machine dies', () => {
    // This is the L1 runtime configuration expressed as a move set: the
    // pending-probe latch means no NEW gradeable question is ever put to the
    // learner, so `gradedCorrect`/`gradedWrong` are unproducible. Everything a
    // real learner can still do remains available.
    const without = Object.keys(MOVES).filter((m) => !m.startsWith('graded'))
    const nodes = explore(without)
    const good = canReach(nodes, MASTERED)

    // NOT ONE reachable state can finish. Mastery is unreachable from
    // everywhere, which is the formal statement of the L1 defect.
    expect(good.size).toBe(0)

    // And the ladder still CLIMBS to the gates before dying there — proving
    // this is a trap the learner is walked into, not a wall they start at.
    const phases = new Set([...nodes.values()].map((n) => n.state.phase))
    expect(phases.has('CHECK')).toBe(true)
    expect([...phases]).not.toContain('TRANSFER')
  })

  it('the OBSERVE escape is real: a diagnostic that produces nothing still concludes', () => {
    // S1 measured this end-to-end (OBSERVE holds 4 turns, then escapes). Pinned
    // here at the fold level so a future change cannot silently remove it.
    const nodes = explore(['ungradeableAnswerToSanctionedAsk'])
    const phases = [...nodes.values()].map((n) => n.state.phase)
    expect(phases).toContain('DEMONSTRATE')
  })

  it('but an UNSANCTIONED ask produces nothing at all — OBSERVE never concludes', () => {
    // The double-lock, stated exactly: when the kernel did not choose to ask,
    // the same predicate that withholds the authored probe also withholds the
    // escape. Bounded in practice (S1: the route supplies 'ask' often enough),
    // so this is a LATENT hazard, recorded rather than overclaimed.
    const nodes = explore(['ungradeableAnswerToUnsanctionedAsk'])
    const phases = new Set([...nodes.values()].map((n) => n.state.phase))
    expect([...phases]).toEqual(['OBSERVE'])
  })
})
