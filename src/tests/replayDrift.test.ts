/**
 * Replay Drift — the replay harness must reproduce the runtime exactly.
 *
 * A transcript replay is only worth running if it computes what the live route
 * computes. When it drifts, it does not merely lose coverage — it actively
 * misleads: a transcript "passes the battery" against a state machine that has
 * not shipped for weeks, and a real regression replays clean.
 *
 * The harness under audit is `replay()` in transcriptReplayFramework.test.ts,
 * which documents itself as driving "the SAME pure functions the route calls,
 * in the same order". Four divergences from
 * src/app/api/learn/chat/route.ts were found and are pinned here, one
 * describe-block per failure class, plus a structural guard that fails on the
 * NEXT divergence rather than waiting for someone to audit again.
 *
 * Reference call sites in route.ts:
 *   detectFailureState(message, priorUserMessage)      — 2 arguments
 *   isLowSignalAcknowledgement(message)                — the ack owner
 *   advanceConversationState(state, { ...evidence })   — the fold contract
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { replay, type ReplayTranscript } from './transcriptReplayFramework.test'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import {
  isLowSignalAcknowledgement, decideNextMoveDetailed, initialConversationState,
} from '@/lib/teaching/conversationState'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'

const ROUTE = 'src/app/api/learn/chat/route.ts'
const HARNESS = 'src/tests/transcriptReplayFramework.test.ts'

// ── Class 1 — detector arity ─────────────────────────────────────────────────

describe('drift class 1 — detectFailureState must receive the prior message', () => {
  it('the two forms genuinely disagree, so the argument is not cosmetic', () => {
    // Repeating yourself is the signature of a stuck conversation. One-arg
    // cannot see it at all; two-arg classifies a repeated ANSWER as
    // frustration — which is where the two forms genuinely disagree.
    expect(detectFailureState('the answer is 12')).toBeNull()
    expect(detectFailureState('the answer is 12', 'The answer is 12.')).toBe('frustrated')
    // A repeated recovery utterance is NOT an answer, so both forms agree on
    // it — the prior-message argument must not change a stated internal state.
    expect(detectFailureState("I don't know")).toBe('dont_know')
    expect(detectFailureState("I don't know", "I don't know")).toBe('dont_know')
  })

  it('the harness threads the prior turn, so a repeat replays as frustration', () => {
    const t: ReplayTranscript = {
      name: 'repeat', conceptId: 'c',
      turns: [
        { learner: 'the answer is 12', tutor: 'Not quite — look at the second step.' },
        { learner: 'the answer is 12', tutor: 'Let us try it a different way.' },
      ],
    }
    const o = replay(t)
    expect(o.recoveryKeys[0]).toBeNull()
    // Would be null under the one-argument form — the drift, pinned.
    expect(o.recoveryKeys[1]).toBe('frustrated')
  })

  it('a genuinely different answer is still not frustration', () => {
    const t: ReplayTranscript = {
      name: 'no-repeat', conceptId: 'c',
      turns: [
        { learner: 'the answer is 12', tutor: 'Not quite.' },
        { learner: 'the answer is 14', tutor: 'Closer.' },
      ],
    }
    expect(replay(t).recoveryKeys).toEqual([null, null])
  })

  it('a repeated acknowledgement is never frustration', () => {
    const t: ReplayTranscript = {
      name: 'repeat-ack', conceptId: 'c',
      turns: [
        { learner: 'Got it', tutor: 'Here is the first step.' },
        { learner: 'Got it', tutor: 'Here is the second step.' },
      ],
    }
    expect(replay(t).recoveryKeys).toEqual([null, null])
  })
})

// ── Class 2 — the acknowledgement evidence field ─────────────────────────────

describe('drift class 2 — the ladder must advance on acknowledgements', () => {
  const ackOnly: ReplayTranscript = {
    name: 'ack-only', conceptId: 'c',
    turns: [
      { learner: 'ok',       tutor: 'Watch what happens to the block here.' },
      { learner: 'Got it',   tutor: 'Now the same thing on a smooth surface.' },
      { learner: 'continue', tutor: 'Notice how much further it travels.' },
      { learner: 'next',     tutor: 'That difference is the whole idea.' },
    ],
  }

  it('does not freeze at OBSERVE — the pre-fix harness never left it', () => {
    const o = replay(ackOnly)
    expect(o.finalState.phase).not.toBe('OBSERVE')
    expect(new Set(o.phases).size).toBeGreaterThan(1)
  })

  it('climbs the delivery phases in order', () => {
    const o = replay(ackOnly)
    // OBSERVE -> DEMONSTRATE -> GUIDE, in that order, no skips.
    expect(o.phases.slice(0, 3)).toEqual(['OBSERVE', 'DEMONSTRATE', 'GUIDE'])
  })

  it('still refuses to move a mastery gate on an acknowledgement alone', () => {
    // The gate is the whole reason acknowledgements were once withheld from
    // the fold. Advancing delivery phases must not have bought mastery.
    const o = replay(ackOnly)
    expect(o.finalState.correctAtCheck).toBe(0)
    expect(o.finalState.correctAtPractice).toBe(0)
  })
})

// ── Class 3 — one owner for "is this an acknowledgement" ─────────────────────

describe('drift class 3 — the ack predicate must be the route\'s', () => {
  /** Forward-request tokens the runtime treats as acknowledgements. */
  const FORWARD = ['ready', "let's go", 'keep going', 'carry on', 'proceed']

  it('the two predicates genuinely disagree on these tokens', () => {
    for (const tok of FORWARD) {
      expect(isLowSignalAcknowledgement(tok), tok).toBe(true)
      expect(isBareAcknowledgement(tok), tok).toBe(false)
    }
  })

  it('the harness follows the route\'s owner, so they advance the ladder', () => {
    for (const tok of FORWARD) {
      const o = replay({
        name: `fwd-${tok}`, conceptId: 'c',
        turns: [{ learner: tok, tutor: 'Here is the next piece of the idea.' }],
      })
      expect(o.finalState.phase, tok).toBe('DEMONSTRATE')
    }
  })

  it('a substantive answer is still not an acknowledgement', () => {
    const o = replay({
      name: 'substantive', conceptId: 'c',
      turns: [{ learner: 'it keeps sliding because friction is small', tutor: 'Right.' }],
    })
    expect(o.finalState.phase).toBe('OBSERVE')
  })
})

// ── Class 4 — the decided move must be captured, not discarded ───────────────

describe('drift class 4 — the move/legality layer must be observable', () => {
  const t: ReplayTranscript = {
    name: 'moves', conceptId: 'c',
    turns: [
      { learner: 'hi',     tutor: 'Here is the idea, shown plainly.' },
      { learner: 'Got it', tutor: 'And here it is working in a second case.' },
      { learner: 'go',     tutor: 'Now let us do one together, step by step.' },
    ],
  }

  it('records one move per turn', () => {
    const o = replay(t)
    expect(o.moves).toHaveLength(t.turns.length)
    expect(o.blockedReasons).toHaveLength(t.turns.length)
    for (const m of o.moves) expect(['teach', 'show', 'ask']).toContain(m)
  })

  it('the first turn is blocked by QL-1 — nothing has been taught yet', () => {
    const o = replay(t)
    // Independently reproduced from the real decision function.
    const direct = decideNextMoveDetailed(initialConversationState('c'), {
      recoveryTurn: false, workedExampleFirst: false,
    })
    expect(o.moves[0]).toBe(direct.move)
    expect(o.blockedReasons[0]).toBe('QL1_NO_ANSWERABLE_SOURCE')
  })

  it('a recovery turn is always a give, never a question', () => {
    const o = replay({
      name: 'rec', conceptId: 'c',
      turns: [
        { learner: 'hi',           tutor: 'Here is the idea.' },
        { learner: "I don't know", tutor: 'Fair enough — let me show you.' },
      ],
    })
    expect(o.recoveryKeys[1]).toBe('dont_know')
    expect(o.moves[1]).not.toBe('ask')
  })
})

// ── The structural guard — catches the NEXT drift ────────────────────────────

/**
 * Everything above pins today's four divergences. None of it would notice a
 * FIFTH: a new evidence field added to route.ts's fold and not to the harness
 * would reproduce exactly this audit's situation, silently.
 *
 * So the two call sites are compared directly. Both pass an object literal to
 * advanceConversationState; the keys of each are extracted from source and the
 * harness is required to cover the route, except for inputs a transcript
 * genuinely cannot carry.
 */
function evidenceKeys(source: string, receiver: string): Set<string> {
  const start = source.indexOf(`advanceConversationState(${receiver}, {`)
  if (start < 0) throw new Error(`no advanceConversationState(${receiver}, {...}) found`)
  const open = source.indexOf('{', start)
  let depth = 0
  let end = open
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') { depth--; if (depth === 0) { end = i; break } }
  }
  const body = source.slice(open + 1, end)
  const keys = new Set<string>()
  // Top-level keys only — nested object literals and comments are skipped by
  // tracking depth and ignoring `//` lines. Both `key: value` and the ES6
  // shorthand `key,` count: the harness uses shorthand for askedQuestion and
  // learnerRequest, and a colon-only extractor reports those as missing —
  // a false positive that would train the reader to ignore this guard.
  let d = 0
  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim()
    if (!line.startsWith('//')) {
      const m = d === 0 ? line.match(/^([A-Za-z_$][\w$]*)\s*(?::|,|$)/) : null
      if (m) keys.add(m[1])
    }
    for (const ch of line) {
      if (ch === '{' || ch === '[') d++
      else if (ch === '}' || ch === ']') d--
    }
  }
  return keys
}

describe('structural guard — the harness fold must cover the route fold', () => {
  /**
   * Evidence a transcript cannot supply, with the reason. Anything NOT listed
   * here must appear in the harness.
   */
  const CANNOT_REPLAY: Record<string, string> = {
    misconceptionDetected:    'derived from the SIGNAL tag\'s phrase field, not recorded in a transcript',
    strategyUsed:             'server-selected strategy id, not visible in the conversation text',
    signalConfidence:         'SIGNAL tag confidence, not recorded in a transcript',
    signalVerificationStatus: 'produced by the signal-verification subsystem at runtime',
    degradedTurn:             'AI-provider availability (Message.provider), not a property of the '
                            + 'conversation text; ReplayTurn carries learner/tutor/signalCorrect only, '
                            + 'and inferring an outage by matching the template wording would be the '
                            + 'keyword hack this harness exists to catch. Give ReplayTurn a `degraded` '
                            + 'flag and delete this entry to replay outages.',
  }

  it('every route evidence field is either replayed or explicitly excused', () => {
    const routeKeys = evidenceKeys(readFileSync(ROUTE, 'utf8'), 'conversationStateHoisted')
    const harnessKeys = evidenceKeys(readFileSync(HARNESS, 'utf8'), 'state')

    const missing = [...routeKeys].filter(
      (k) => !harnessKeys.has(k) && !(k in CANNOT_REPLAY),
    )
    expect(missing).toEqual([])
  })

  it('the excuse list stays honest — no stale entries', () => {
    const routeKeys = evidenceKeys(readFileSync(ROUTE, 'utf8'), 'conversationStateHoisted')
    // An excuse for a field the route no longer passes is dead weight that
    // would silently absolve a future field of the same name.
    const stale = Object.keys(CANNOT_REPLAY).filter((k) => !routeKeys.has(k))
    expect(stale).toEqual([])
  })

  it('the extractor works — it finds the fields this audit added', () => {
    const harnessKeys = evidenceKeys(readFileSync(HARNESS, 'utf8'), 'state')
    expect(harnessKeys.has('acknowledgement')).toBe(true)
    expect(harnessKeys.has('parityViolation')).toBe(true)
    expect(harnessKeys.has('recoveryFired')).toBe(true)
  })

  it('the harness calls detectFailureState with both arguments', () => {
    const src = readFileSync(HARNESS, 'utf8')
    expect(src).toMatch(/detectFailureState\(\s*turn\.learner\s*,\s*priorLearnerMessage\s*\)/)
  })

  it('the harness uses the route\'s acknowledgement owner', () => {
    const src = readFileSync(HARNESS, 'utf8')
    expect(src).toMatch(/isLowSignalAcknowledgement\(turn\.learner\)/)
    expect(src).not.toMatch(/isBareAcknowledgement\(turn\.learner\)/)
  })
})
