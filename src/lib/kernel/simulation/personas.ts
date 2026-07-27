/**
 * K6 — Persona automata (RS T-5).
 *
 * Parameterized synthetic learners, driven headless against the REAL kernel
 * stages. The cast is the one the Brain already authored and audited — D9's
 * session simulations and D10's six placement students — mechanized rather
 * than reinvented, so a persona is a transcription of documented learner
 * behaviour and not a fresh invention.
 *
 * A persona is deliberately NOT a model of a mind. It is a reproducible
 * generator of (utterance, correctness) pairs with known ground truth, whose
 * only job is to drive the decision plane into states unit fixtures never
 * reach. The simulator can reject a pedagogical change; it can never certify
 * one — real-learner evidence is the only thing that certifies.
 *
 * Determinism: every persona is a pure function of (seed, turnIndex). Same
 * seed ⇒ byte-identical episode, which is what makes the invariant battery a
 * usable merge gate rather than a flaky one.
 */

/** Deterministic PRNG (mulberry32). Pure given the seed; no Math.random. */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface PersonaTurn {
  /** What the learner types this turn. */
  message: string
  /** Ground truth for the SIGNAL the tutor would parse. null = non-answer. */
  correct: boolean | null
}

export interface Persona {
  id: string
  label: string
  /** Cited source in the authored Brain, so a persona can be audited. */
  source: string
  /** Produce this learner's turn. Pure given (rand, turnIndex, lastMoveWasAsk). */
  turn(rand: () => number, turnIndex: number, lastMoveWasAsk: boolean): PersonaTurn
}

const NON_ANSWERS = ["I don't know", 'no idea', '?', 'not sure']
const ACKS = ['ok', 'got it', 'I see', 'right']

/** RS T-5's six canonical personas. */
export const PERSONAS: readonly Persona[] = [
  {
    id: 'fragile-beginner',
    label: 'Fearful complete beginner',
    source: 'validation/01 simulation A · first-lesson/02',
    turn(rand, i, lastAsk) {
      // Cannot answer early; distress signals; occasionally succeeds late.
      if (!lastAsk) return { message: ACKS[i % ACKS.length], correct: null }
      if (i < 4) return { message: NON_ANSWERS[i % NON_ANSWERS.length], correct: null }
      return rand() < 0.4 ? { message: 'is it the first one', correct: true }
                          : { message: "I'm not sure", correct: null }
    },
  },
  {
    id: 'false-advanced-adult',
    label: 'Adult who over-reports their level',
    source: 'placement/02 · validation/01 simulation B',
    turn(rand, i, lastAsk) {
      if (!lastAsk) return { message: 'yes I know this', correct: null }
      // Confident, and wrong early — the Dunning-Kruger band.
      return i < 3 ? { message: 'obviously it is 12', correct: false }
                   : { message: 'it is 12', correct: rand() < 0.6 }
    },
  },
  {
    id: 'bored-expert',
    label: 'Advanced learner being under-challenged',
    source: 'validation/01 simulation C · student-state/09 boredom-slide',
    turn(rand, i, lastAsk) {
      if (!lastAsk) return { message: 'yeah', correct: null }
      // Fast and right, with disengagement creeping in.
      return i > 5 && rand() < 0.3
        ? { message: 'can we move on', correct: null }
        : { message: 'the answer is 12', correct: true }
    },
  },
  {
    id: 'guesser',
    label: 'Learner who games rather than answers',
    source: 'assessment/01 §5 · F10 gaming',
    turn(rand, _i, lastAsk) {
      if (!lastAsk) return { message: 'got it', correct: null }
      return rand() < 0.5 ? { message: '12', correct: rand() < 0.25 }
                          : { message: 'understood!', correct: null }
    },
  },
  {
    id: 'silent-child',
    label: 'Child who answers minimally or not at all',
    source: 'first-lesson/03 · foundations/03 wait-time',
    turn(_rand, i, lastAsk) {
      // Minimal replies, never an empty POST: a text tutor cannot observe
      // silence as a turn — a silent learner sends nothing and no turn
      // happens. Modelling '' would test an event that cannot occur.
      const minimal = ['...', 'hmm', 'yes', 'ok']
      if (!lastAsk) return { message: minimal[(i + 1) % minimal.length], correct: null }
      return { message: minimal[i % minimal.length], correct: null }
    },
  },
  {
    id: 'returning-after-gap',
    label: 'Learner returning after a long absence',
    source: 'placement/06 · student-state/07 FORGOTTEN-RECOVERABLE',
    turn(rand, i, lastAsk) {
      if (!lastAsk) return { message: 'it has been a while', correct: null }
      // Forgotten access, not lost storage: recovers quickly once cued.
      return i < 2 ? { message: "I've forgotten how to do this", correct: null }
                   : { message: 'oh right, it is 12', correct: rand() < 0.8 }
    },
  },
] as const

export function personaById(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id)
}
