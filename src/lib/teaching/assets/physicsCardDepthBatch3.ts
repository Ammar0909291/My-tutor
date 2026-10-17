/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 3 (phys.stat part 2, phys.astro, phys.opt part 1, 12 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 166 of 283 physics concepts held fewer than three authored cards with
 * 3+ options (215 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Library, Replacement and
 * Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds true_false, misconception_probe and mcq probes (and, for optics, short_answer and checkpoint probes) at its own band, so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'physics'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'mcq' | 'misconception_probe' | 'true_false' | 'checkpoint' | 'step_check' | 'short_answer' | 'fill_blank' | 'numeric'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  const wrong = (w: [string, string]) => ({ text: w[0], isCorrect: false, ...(w[1] ? { misconceptionId: id(w[1]) } : {}) })
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [{ text: correct, isCorrect: true }, wrong(wrongA), wrong(wrongB)],
    targetedMisconceptions: [wrongA, wrongB].filter((w) => w[1]).map((w) => id(w[1])),
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Library; ${note}`,
  }
}

export const PHYSICS_CARD_DEPTH_BATCH_3: SeedProbe[] = [
  // ─── phys.stat.partition-function ────────────────────────────────────────
  card('phys.stat.partition-function', 'step_check', H,
    'Three identical classical molecules each have single-molecule partition function Z₁. What is the partition function of the system?',
    'Z₁³/3!, after the Gibbs correction for identical particles',
    ['Z₁³, exactly as for three distinguishable molecules', 'MC-4'],
    ['3Z₁, since the partition functions of separate molecules add up', ''],
    'MC-4 identical particles need the N! correction, re-asked with three molecules'),
  card('phys.stat.partition-function', 'fill_blank', H,
    'Complete the sentence: a system has one microstate at E₀ and three at E₁, so Z = ____.',
    'e^(−βE₀) + 3e^(−βE₁)',
    ['e^(−βE₀) + e^(−βE₁), since Z sums over the energy levels only', 'MC-2'],
    ['e^(−βE₀) + 3e^(−3βE₁), since the degeneracy also multiplies the exponent', ''],
    'MC-2 Z sums over microstates, re-asked with degeneracies 1 and 3'),

  // ─── phys.stat.probability-basics ────────────────────────────────────────
  card('phys.stat.probability-basics', 'step_check', H,
    'Which box shows the larger RELATIVE fluctuation in the number of molecules in its left half: N = 100 or N = 10²⁰?',
    'N = 100: relative fluctuations scale as 1/√N',
    ['The same for both, since small and large systems obey the same statistics in the same way', 'MC-4'],
    ['N = 10²⁰, since more molecules means more fluctuation', ''],
    'MC-4 fluctuations shrink as 1/√N, re-asked with N = 100 and 10²⁰'),

  // ─── phys.astro.black-holes (undergraduate) ──────────────────────────────
  card('phys.astro.black-holes', 'step_check', U,
    'How does the average density of a supermassive black hole (10⁹ solar masses) compare with that of a stellar-mass one?',
    'Much lower: it falls with mass, and is below the density of air for a supermassive hole',
    ['Higher still, since bigger black holes are infinitely dense', 'MC-4'],
    ['The same, since every black hole has about the density of an atomic nucleus', ''],
    'MC-4 black holes are not infinitely dense, re-asked as a density comparison'),

  // ─── phys.astro.cosmology (undergraduate) ────────────────────────────────
  card('phys.astro.cosmology', 'step_check', U,
    'The CMB was released at about 3000 K but is now about 2.7 K. Why?',
    'Expansion has stretched its wavelengths by a factor of about 1100',
    ['A Doppler shift: the emitting matter is moving away through space at near light speed', 'MC-3'],
    ['The radiation has gradually lost energy by passing through cold gas', ''],
    'MC-3 cosmological redshift is not a Doppler shift, re-asked with the CMB temperature'),

  // ─── phys.astro.dark-matter ──────────────────────────────────────────────
  card('phys.astro.dark-matter', 'step_check', H,
    'Which observations does MOND fail to explain, though dark matter explains them?',
    'The Bullet Cluster, the CMB and large-scale structure, taken together',
    ['None: MOND fits everything that dark matter does, so dark matter may not exist', 'MC-3'],
    ['Only the rotation curves of spiral galaxies', ''],
    'MC-3 dark matter explains all observations together, re-asked as what MOND misses'),

  // ─── phys.astro.gravitational-waves ──────────────────────────────────────
  card('phys.astro.gravitational-waves', 'step_check', H,
    'LIGO\'s arms are 4 km long and a wave with strain h ≈ 10⁻²¹ passes. About how much does an arm change in length?',
    'About 4 × 10⁻¹⁸ m, since ΔL = h·L',
    ['Nothing is measured in the arms: LIGO only times how fast the wave travels', 'MC-2'],
    ['About 4 × 10⁻²¹ m, the strain value itself', ''],
    'MC-2 LIGO measures strain, re-asked with ΔL = hL'),

  // ─── phys.astro.stellar-evolution ────────────────────────────────────────
  card('phys.astro.stellar-evolution', 'step_check', H,
    'A supernova leaves a 1.5 solar-mass core. What supports it against gravity?',
    'Neutron degeneracy pressure, which makes it a neutron star rather than a white dwarf',
    ['Electron degeneracy pressure, as in a white dwarf but a little denser', 'MC-4'],
    ['Fusion of iron in the core, which releases energy', ''],
    'MC-4 a neutron star is a different kind of object, re-asked with a 1.5 solar-mass core'),

  // ─── phys.astro.stellar-structure ────────────────────────────────────────
  card('phys.astro.stellar-structure', 'step_check', H,
    'A 0.12 solar-mass star (L ≈ 0.0017 L☉) and the Sun are compared. Which lives longer?',
    'The small star, by far: it burns fuel very slowly (about 4 × 10¹² yr)',
    ['The Sun, because it has more fuel to burn', 'MC-2'],
    ['They live equally long, since both are main-sequence stars', ''],
    'MC-2 lifetime goes as M/L, re-asked with a red dwarf'),

  // ─── phys.opt.diffraction ────────────────────────────────────────────────
  card('phys.opt.diffraction', 'step_check', H,
    'A single slit is made three times as wide. What happens to the angular width of the central maximum?',
    'It narrows to one third, since θ ≈ λ/a',
    ['It triples, since a wider slit gives a wider pattern', 'MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN'],
    ['It stays the same, since only the wavelength sets the width', ''],
    'a narrower slit gives a wider pattern, re-asked with a slit made three times as wide'),

  // ─── phys.opt.single-slit ────────────────────────────────────────────────
  card('phys.opt.single-slit', 'step_check', H,
    'Light of 500 nm passes a slit of width 0.1 mm, so the first dark fringe is at sin θ = 0.005. What is the full angular width of the central maximum?',
    'About 0.010 rad: twice the first-minimum angle, 2λ/a = 2 × 0.005',
    ['About 0.005 rad: the same as a secondary maximum, λ/a', 'MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES'],
    ['About 0.0025 rad, since the width is half of λ/a', ''],
    'the central maximum is twice as wide as a secondary one, re-asked with numbers'),
  card('phys.opt.single-slit', 'fill_blank', H,
    'Complete the sentence: in single-slit diffraction the successive secondary maxima are ____.',
    'progressively dimmer, following the sinc² envelope',
    ['equally bright, as in Young\'s double slit', 'MC-3'],
    ['progressively brighter with distance from the centre', ''],
    'MC-3 the secondary maxima fade, re-asked as a completion'),
]
