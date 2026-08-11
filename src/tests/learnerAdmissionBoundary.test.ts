/**
 * AUTHOR-FACING CONTENT MUST NEVER REACH A LEARNER.
 *
 * ── THE PRODUCTION FAILURE (C4, 2026-08-11) ─────────────────────────────────
 * Learner, in a lesson on Ionic Crystal Structures: "Give me a harder one to
 * balance." The chat response carried `provider: "memory"` — Explanation
 * Memory served a stored asset verbatim and the LLM was never called — and the
 * student read:
 *
 *   Trap: "Lattice energy depends primarily on the ATOMIC MASS of the ions
 *   involved — heavier ions should give higher lattice energy." FALSE — lattice
 *   energy depends on CHARGE and DISTANCE… Second trap: …
 *
 * Two failures at once: the REGISTER is a note to a curriculum author, and the
 * asset is about lattice energy while the learner asked about balancing
 * equations.
 *
 * ── WHY THE GATE IS AT SERVE TIME ───────────────────────────────────────────
 * 1,335 explanation assets are ACTIVE in production and 184 of them (counted
 * in the database) carry an author marker. Capture-time validation cannot
 * reach one of them. Only the boundary crossed on the way to the screen can.
 */
import { describe, it, expect } from 'vitest'
import {
  admitForLearner, findAuthorScaffolding, isRelevantToLearnerQuestion,
} from '@/lib/teaching/assets/learnerAdmission'

// Verbatim from src/lib/teaching/assets/chemistrySeedAssets.ts — the register
// this boundary exists to stop. Nothing here is invented.
const REAL_TRAP_ASSET =
  'Trap: "Lattice energy depends primarily on the ATOMIC MASS of the ions involved — ' +
  'heavier ions should give higher lattice energy." FALSE — lattice energy depends on ' +
  'CHARGE and DISTANCE (ionic radius), not mass, following Coulomb\'s law directly. ' +
  'Second trap: "All ionic compounds with a 1:1 cation:anion ratio adopt the SAME ' +
  'crystal structure." FALSE — the structure depends on the RADIUS RATIO.'

const REAL_SIGFIG_ASSET =
  'The #1 sig-fig mistake: treating zeros AFTER a whole number as significant. ' +
  'Is 200 one sig fig, two, or three? The answer: YOU CAN\'T TELL without more context. ' +
  'Second trap: in addition/subtraction, you keep decimal places, not sig figs.'

describe('the exact C4 production failure is refused', () => {
  it('refuses the lattice-energy trap asset outright', () => {
    const verdict = admitForLearner({ content: REAL_TRAP_ASSET, userMessage: 'Give me a harder one to balance.' })
    expect(verdict.admit).toBe(false)
    expect(verdict.admit === false && verdict.reason).toBe('author-scaffolding')
  })

  it('refuses it even when the learner IS asking about lattice energy', () => {
    // Relevance would have passed here. Register alone must still refuse —
    // otherwise the right learner gets the wrong voice.
    const verdict = admitForLearner({ content: REAL_TRAP_ASSET, userMessage: 'What is lattice energy?' })
    expect(verdict.admit).toBe(false)
    expect(verdict.admit === false && verdict.reason).toBe('author-scaffolding')
  })

  it('refuses the sig-fig asset', () => {
    expect(admitForLearner({ content: REAL_SIGFIG_ASSET, userMessage: 'What are significant figures?' }).admit).toBe(false)
  })
})

describe('author-facing constructs', () => {
  it.each([
    ['trap heading', 'Trap: heavier ions give higher lattice energy.'],
    ['second trap', 'Something true. Second trap: another claim.'],
    ['FALSE verdict marker', 'Claim about mass. FALSE — it depends on charge.'],
    ['TRUE verdict marker', 'Claim about charge. TRUE — Coulomb\'s law says so.'],
    ['ranked mistake', 'The #1 mistake students make is using Celsius.'],
    ['answer key', 'See the answer key for the full working.'],
    ['mark scheme', 'Award one mark per step (mark scheme).'],
    ['distractor', 'The distractor here is option B.'],
    ['author note', "Author's note: revisit this after the bonding unit."],
    ['bracketed label', 'Sodium chloride [correct] versus caesium chloride.'],
    ['TODO', 'TODO: add a worked example here.'],
  ])('rejects %s', (_label, text) => {
    expect(findAuthorScaffolding(text)).not.toBeNull()
  })

  it.each([
    ['ordinary prose about a trap', 'This is a common trap that catches many students, so watch the units.'],
    ['a plain false statement', 'It is false that heavier ions always give higher lattice energy.'],
    ['numbers in prose', 'There are 3 significant figures in 2.00 × 10².'],
    ['a normal explanation', 'Kinetic energy is the energy an object has because it is moving.'],
    ['an em dash used normally', 'Lattice energy depends on charge — and on distance.'],
    ['the word correct in prose', 'That is the correct way to balance the equation.'],
  ])('does NOT reject %s', (_label, text) => {
    expect(findAuthorScaffolding(text)).toBeNull()
  })
})

describe('relevance is judged against the learner question, not the lesson', () => {
  it('refuses a lattice-energy asset for a balancing question', () => {
    const clean = 'Lattice energy depends on the charge of the ions and the distance between them.'
    expect(isRelevantToLearnerQuestion(clean, 'Give me a harder one to balance.')).toBe(false)
  })

  it('admits it when the learner asked about lattice energy', () => {
    const clean = 'Lattice energy depends on the charge of the ions and the distance between them.'
    expect(isRelevantToLearnerQuestion(clean, 'Why is lattice energy higher for MgO?')).toBe(true)
  })

  it.each([
    ['ok', 'ok'],
    ['continue', 'go on'],
    ['confusion', "I don't understand"],
    ['bare next', 'next'],
    ['empty', ''],
  ])('never refuses on a turn that names nothing (%s)', (_label, message) => {
    // A learner who names no topic cannot contradict the asset. Continuing the
    // lesson is right there, and refusing would strip the memory path of every
    // ordinary turn it exists to serve.
    const clean = 'Lattice energy depends on the charge of the ions and the distance between them.'
    expect(isRelevantToLearnerQuestion(clean, message)).toBe(true)
  })

  it('one shared topic word is enough', () => {
    // A deliberately low bar: a false refusal costs one ordinary LLM turn,
    // which is the system's strongest path anyway.
    expect(isRelevantToLearnerQuestion('Balancing equations conserves atoms.', 'how do I balance this equation')).toBe(true)
  })
})

describe('fail closed', () => {
  it('refuses empty content', () => {
    expect(admitForLearner({ content: '   ', userMessage: 'anything' }).admit).toBe(false)
  })

  it('admits ordinary teaching content on an ordinary turn', () => {
    // The boundary must not break the feature it guards.
    const good = 'An ionic crystal is a repeating three-dimensional grid of alternating positive and negative ions.'
    expect(admitForLearner({ content: good, userMessage: 'What is an ionic crystal?' }).admit).toBe(true)
  })

  it('reports evidence for every refusal, for the log', () => {
    const verdict = admitForLearner({ content: REAL_TRAP_ASSET, userMessage: 'balance this' })
    expect(verdict.admit).toBe(false)
    expect(verdict.admit === false && verdict.evidence.length).toBeGreaterThan(0)
  })
})
