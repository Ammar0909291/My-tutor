/**
 * THE SERVE-TIME BOUNDARY REFUSED CORRECT TEACHING PROSE.
 *
 * Found by driving a real production lesson (chem.solid.ionic-solids) on
 * 2026-08-14 and reading the server's own log line, which repeated on EVERY
 * turn of the session:
 *
 *   [explanationMemory] refused 7f48fc93-… for learner: author-scaffolding
 *     — trap-label: …Trap: "Lattice energy depends primarily on th…
 *
 * That particular refusal is CORRECT — the asset opens with a `Trap:` heading
 * and is written for a curriculum author. But measuring the same guard across
 * the whole stored corpus showed it was also refusing content that is plainly
 * learner-facing:
 *
 *   verdict-marker   171 occurrences, 164 immediately after a closing quote,
 *                    ZERO reviewer annotations. The shape it matches is the
 *                    misconception-repair sentence itself.
 *   trap-label       383 occurrences, only 140 at the start of a line. The
 *                    other 243 are a teacher enumerating pitfalls in prose.
 *
 * Effect of the fix, measured on the real corpora: chemistry explanations
 * refused 174 -> 142, authored (math/physics/english) 72 -> 2. Nothing that
 * was admitted before is refused now, and no existing expectation in
 * learnerAdmissionBoundary.test.ts changed — `findAuthorScaffolding` is the
 * unchanged shape detector; `findLearnerFacingScaffolding` is the narrower
 * serve-time question.
 *
 * These tests pin the DIRECTION: the boundary may become stricter about
 * genuine author register, and must never again refuse a quoted-and-corrected
 * misconception or a mid-sentence "another trap:".
 */
import { describe, it, expect } from 'vitest'
import {
  admitForLearner,
  findAuthorScaffolding,
  findLearnerFacingScaffolding,
} from '@/lib/teaching/assets/learnerAdmission'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

// Verbatim from the asset production refused on every turn of the live
// session. It must STAY refused — its `Trap:` is a real heading.
const LIVE_REFUSED_ASSET =
  'Trap: "Lattice energy depends primarily on the ATOMIC MASS of the ions involved — ' +
  'heavier ions should give higher lattice energy." FALSE — lattice energy depends on ' +
  'CHARGE and DISTANCE (ionic radius), not mass, following Coulomb\'s law directly.'

describe('genuine author register is still refused', () => {
  it.each([
    ['a Trap: heading at the start', 'Trap: heavier ions give higher lattice energy.'],
    ['a Trap: heading after a newline', 'Some teaching.\nTrap: heavier ions give higher energy.'],
    ['a bulleted Trap: heading', '- Trap: heavier ions give higher lattice energy.'],
    ['a numbered Trap: heading', '1. Trap: heavier ions give higher lattice energy.'],
    ['a verdict annotation on its own line', 'Some teaching.\nFALSE — this distractor assumes mass matters.'],
    // The five unconditional markers are not position-tested at all.
    ['an answer key anywhere', 'Work through it, then see the answer key for the full working.'],
    ['a TODO anywhere', 'Kinetic energy is energy of motion. TODO: add a worked example.'],
    ['a bracketed label anywhere', 'Sodium chloride [correct] versus caesium chloride.'],
    ['a ranked mistake anywhere', 'Students often slip: the #1 mistake is using Celsius.'],
    ["an author's note anywhere", "Ions alternate. Author's note: revisit after the bonding unit."],
  ])('refuses %s', (_label, text) => {
    expect(findLearnerFacingScaffolding(text)).not.toBeNull()
  })

  it('still refuses the exact asset production refused live', () => {
    const verdict = admitForLearner({ content: LIVE_REFUSED_ASSET, userMessage: 'What is lattice energy?' })
    expect(verdict.admit).toBe(false)
    expect(verdict.admit === false && verdict.reason).toBe('author-scaffolding')
  })
})

describe('learner-facing teaching prose is admitted', () => {
  it.each([
    // Verbatim shapes from the stored corpora.
    ['a quoted misconception then its correction',
      '"Breaking bonds releases energy." WRONG — breaking bonds ALWAYS requires energy.'],
    ['a quoted misconception then FALSE',
      '"l can range from 0 to n." FALSE — l ranges from 0 to n−1.'],
    ['a verdict mid-sentence',
      'Solving an equation means finding the value that makes the claim TRUE — here x = 2.'],
    ['another trap: mid-paragraph',
      'The mole counts PARTICLES, not grams. Another trap: confusing molar mass of an ATOM with that of a COMPOUND.'],
    ['second trap: mid-paragraph',
      'In plain "200" the ambiguity is real. Second trap: in addition you round to decimal places.'],
    ['a notation trap in prose',
      'The club still exists. And watch the notation trap: {∅} is NOT empty.'],
  ])('admits %s', (_label, text) => {
    expect(findLearnerFacingScaffolding(text)).toBeNull()
  })
})

describe('the serve-time question is strictly narrower than the shape test', () => {
  const corpora = [
    ['chemistry explanations', CHEMISTRY_EXPLANATIONS.map((e) => e.content)],
    ['authored explanations', AUTHORED_EXPLANATIONS.map((e) => e.content)],
  ] as const

  it.each(corpora)('%s: nothing the shape test admits is newly refused', (_name, texts) => {
    const regressions = (texts as string[]).filter(
      (t) => findAuthorScaffolding(t) === null && findLearnerFacingScaffolding(t) !== null,
    )
    expect(regressions).toEqual([])
  })

  // RATCHET. These may only ever go DOWN — by rewriting the offending assets
  // out of author register at source, never by loosening the boundary again.
  // Every remaining one is a real line-start `Trap:` heading.
  it.each([
    ['chemistry explanations', CHEMISTRY_EXPLANATIONS.map((e) => e.content), 142],
    ['authored explanations', AUTHORED_EXPLANATIONS.map((e) => e.content), 2],
  ] as const)('%s: at most %d assets remain in author register', (_name, texts, max) => {
    const refused = (texts as string[]).filter((t) => findLearnerFacingScaffolding(t) !== null)
    expect(refused.length).toBeLessThanOrEqual(max)
  })
})

describe('the probe path is unchanged and clean', () => {
  // Probes deliberately keep the raw shape test: a probe's stem and choices
  // are joined onto one line before checking, so a position test would be
  // meaningless there. Two probes used "(incorrect)" as an ordinary
  // parenthetical and were silently unavailable; both were reworded at
  // source rather than loosening a second rule. This pins that at zero.
  const probeText = (p: { stem: string; choices?: readonly unknown[] | null }) =>
    [p.stem, ...((p.choices ?? []) as unknown[]).map((c) => JSON.stringify(c))].join(' ')

  it.each([
    ['chemistry', CHEMISTRY_PROBES],
    ['authored', AUTHORED_PROBES],
  ] as const)('%s: no probe is refused by the learner admission boundary', (_name, probes) => {
    const refused = (probes as readonly { conceptId: string; stem: string; choices?: readonly unknown[] | null }[])
      .filter((p) => findAuthorScaffolding(probeText(p)) !== null)
      .map((p) => p.conceptId)
    expect(refused).toEqual([])
  })
})
