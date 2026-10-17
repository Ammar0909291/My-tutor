/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 7 (phys.mech part 2, phys.em part 1, 13 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds mcq, misconception_probe, checkpoint and short_answer probes (plus a four-option card) at its own band, so the new cards take the FREE slot step_check (and fill_blank for rolling-motion) at that band (the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_7: SeedProbe[] = [
  // ─── phys.mech.surface-tension ───────────────────────────────────────────
  card('phys.mech.surface-tension', 'step_check', H,
    'Two soap bubbles with the same surface tension have radii 1 cm and 3 cm. Which has the higher excess pressure?',
    'The 1 cm bubble: excess pressure goes as 1/r, so the smaller bubble has more',
    ['The 3 cm bubble, since a larger bubble holds more air and so has more pressure', 'MC-LARGER-HAS-HIGHER-PRESSURE'],
    ['They are equal, since both have the same surface tension', ''],
    'excess pressure falls as the radius grows, re-asked with 1 cm and 3 cm bubbles'),

  // ─── phys.mech.rolling-motion ────────────────────────────────────────────
  card('phys.mech.rolling-motion', 'step_check', H,
    'A ring (I = mR²) and a solid disc (I = ½mR²) of equal mass and radius roll from rest down the same ramp. Which reaches the bottom first?',
    'The solid disc: less of its energy goes into spinning',
    ['They tie, because with equal mass and radius gravity treats them alike', 'MC-SAME-RACE'],
    ['The ring, because its mass is all at the rim and so it runs more steadily', ''],
    'the race depends on the moment of inertia, re-asked with a ring and a disc'),
  card('phys.mech.rolling-motion', 'fill_blank', H,
    'Complete the sentence: for a wheel rolling without slipping, the top of the wheel moves at ____ the speed of its centre.',
    'twice',
    ['the same as, as it would for a wheel sliding along the ground', 'MC-ROLLING-SAME-AS-SLIDING'],
    ['half', ''],
    'rolling combines translation and rotation, re-asked with the top of the wheel'),

  // ─── phys.mech.conservative-forces ───────────────────────────────────────
  card('phys.mech.conservative-forces', 'step_check', H,
    'Which statement about friction is correct?',
    'Friction is non-conservative: its work depends on the path, and it has no potential energy',
    ['Friction stores potential energy that can be recovered when the block comes back', 'MC-FRICTION-HAS-PE'],
    ['Friction is conservative on level ground and non-conservative on slopes', ''],
    'friction has no potential energy, re-asked as a statement'),

  // ─── phys.mech.gravitational-field ───────────────────────────────────────
  card('phys.mech.gravitational-field', 'step_check', H,
    'A 2 kg mass at point X feels 19.6 N of gravitational force. What is g at X, and what force would a 10 kg mass feel there?',
    '9.8 N/kg, so 98 N: the field is the force per unit mass',
    ['19.6 N/kg, and the same 19.6 N on the 10 kg mass', 'MC-FIELD-IS-FORCE'],
    ['39.2 N/kg, so 392 N on the 10 kg mass', ''],
    'the field is force per unit mass, re-asked with 2 kg and 10 kg'),

  // ─── phys.mech.gravitational-potential ───────────────────────────────────
  card('phys.mech.gravitational-potential', 'step_check', H,
    'A probe moves from r = 2R to r = 4R from the centre of a planet. What happens to U = −GMm/r?',
    'U rises, from −GMm/(2R) to −GMm/(4R): it becomes less negative',
    ['U rises by mgh, using U = mgh with h = 2R', 'MC-MGHZERO'],
    ['U falls, from +GMm/(2R) to +GMm/(4R)', 'MC-POSITIVE-POTENTIAL'],
    'U = −GMm/r is negative and rises with r, re-asked with r = 2R to 4R'),

  // ─── phys.mech.escape-velocity ───────────────────────────────────────────
  card('phys.mech.escape-velocity', 'step_check', H,
    'Which changes the escape speed from a planet\'s surface: doubling the probe\'s mass, or using a planet of four times the mass and the same radius?',
    'Only the planet: v_e = √(2GM/R) depends on M and R',
    ['Both: a heavier probe needs a higher launch speed to escape', 'MC-ESCAPE-DEPENDS-ON-MASS'],
    ['Neither: escape speed is fixed at 11.2 km/s everywhere', ''],
    'escape speed does not depend on the escaping mass, re-asked with a heavier probe or planet'),

  // ─── phys.mech.keplers-laws ──────────────────────────────────────────────
  card('phys.mech.keplers-laws', 'step_check', H,
    'Planet X takes 8 years to orbit the Sun. What is its semi-major axis in AU, using T² = a³?',
    '4 AU, since a³ = T² = 64',
    ['8 AU, since the period in years equals the orbital radius in AU', 'MC-KEPLER-CIRCULAR'],
    ['2 AU, found as the cube root of 8', ''],
    'Kepler\'s third law links T² and a³, re-asked with an 8-year period'),

  // ─── phys.mech.orbital-mechanics ─────────────────────────────────────────
  card('phys.mech.orbital-mechanics', 'step_check', H,
    'A moon orbits a planet at radius r with speed v. Another moon of the same planet orbits at 9r. What is its speed?',
    'v/3: orbital speed goes as 1/√r',
    ['3v, since a higher orbit means a faster orbit', 'MC-HIGHER-ORBIT-FASTER'],
    ['v/9, falling in direct proportion to r', ''],
    'higher orbits are slower, re-asked with a ninefold radius'),

  // ─── phys.mech.satellites ────────────────────────────────────────────────
  card('phys.mech.satellites', 'step_check', H,
    'Over which places on Earth can a geostationary satellite stay fixed?',
    'Only above the equator, at the one radius whose period is 24 hours',
    ['Above any city, at any altitude, as long as its speed matches the rotation of the Earth', 'MC-GEO-ANYWHERE'],
    ['Above the poles, where the rotation of the Earth is slowest', ''],
    'geostationary orbits are equatorial and unique, re-asked as which places'),

  // ─── phys.mech.relative-motion ───────────────────────────────────────────
  card('phys.mech.relative-motion', 'step_check', H,
    'A boat heads north at 4 m/s relative to the water, and the river flows east at 3 m/s. What is the boat\'s speed relative to the bank?',
    '5 m/s, at an angle: the velocities add as vectors (3–4–5)',
    ['7 m/s, since the two speeds simply add', 'MC-FRAMES-ADD-SPEEDS'],
    ['1 m/s, the difference of the two speeds', ''],
    'velocities add as vectors, re-asked with 4 m/s and 3 m/s'),

  // ─── phys.em.electric-field ──────────────────────────────────────────────
  card('phys.em.electric-field', 'step_check', H,
    'Two equal +4 nC charges are 0.20 m apart. What is the net field at the midpoint?',
    'Zero: the two equal fields point in opposite directions and cancel',
    ['Twice the field of one charge, since the fields always add up together', 'MC-FIELDS-ALWAYS-ADD'],
    ['Half the field of one charge', ''],
    'fields add as vectors, re-asked with two like charges'),

  // ─── phys.em.electric-potential ──────────────────────────────────────────
  card('phys.em.electric-potential', 'step_check', H,
    'An electron is accelerated through a potential difference of 100 V. What kinetic energy does it gain?',
    '100 eV (about 1.6 × 10⁻¹⁷ J)',
    ['−100 eV, since the electron\'s charge is negative', 'MC-SIGN-CONVENTION-EV'],
    ['100 J', ''],
    'the electron-volt sign convention, re-asked with 100 V'),
]
