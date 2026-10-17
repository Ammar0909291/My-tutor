/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 10 (chem undergraduate part 2 (equil, hal, hyd, kinet, nitro, org, pblock), 14 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: most chemistry concepts hold fewer than three authored cards
 * with 3+ options (151 of 186 concepts, 247 cards short). Owner decision 3 (2026-10-07,
 * `turnContract.certifiesMastery`) makes a 2-option card practice-only once a concept
 * holds three such cards, so a blind guess on the remaining 2-option cards would
 * otherwise still count towards mastery. Owner decision (2026-10-17, "go ahead"): ADD
 * new 3-option cards (Path A) rather than edit existing identities, so the create-only
 * bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for each of two of the
 * concept's registered misconceptions (ids read off the concept's own existing probes,
 * so none is invented); a wrong answer that matches no registered misconception carries
 * no id. Every stem is a NEW worked example. Facts come only from the concept's
 * blueprint (docs/curriculum/blueprints/<concept>.md — Misconception Library,
 * Replacement and Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each chemistry concept in this batch has only an UNDERGRADUATE band and already uses UNDERGRADUATE : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots among UNDERGRADUATE : short_answer, true_false and step_check.
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'short_answer' | 'fill_blank' | 'true_false' | 'step_check'

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

export const CHEMISTRY_CARD_DEPTH_BATCH_10: SeedProbe[] = [
  // ─── chem.equil.complex-equil ────────────────────────────────────────────
  card('chem.equil.complex-equil', 'short_answer', U,
    'Two successive complex-formation steps have K₁ = 1.0 × 10⁴ and K₂ = 1.0 × 10³. A student says the overall K is K₁ + K₂ = 1.1 × 10⁴, and that the reverse of the first step has K = −1.0 × 10⁴. Which statement is correct?',
    'The overall K is the product, 1.0 × 10⁷, and the reverse of the first step has K = 1/K₁ = 1.0 × 10⁻⁴',
    ['The overall K is the sum of the stepwise values, 1.1 × 10⁴', 'MC1'],
    ['Reversing a step changes K to −K, so the reverse has K = −1.0 × 10⁴, the negative of the forward constant', 'MC2'],
    'MC1 multiply K values, MC2 reverse is the reciprocal, re-asked with K₁ = 10⁴ and K₂ = 10³'),
  card('chem.equil.complex-equil', 'true_false', U,
    'For A ⇌ B with K = 0.50, followed by B ⇌ C with K = 4.0, which statement is correct?',
    'For A ⇌ C, K = 0.50 × 4.0 = 2.0',
    ['For A ⇌ C, K = 0.50 + 4.0 = 4.5, adding the two constants', 'MC1'],
    ['For C ⇌ A, K = −2.0, the negative of the forward constant', 'MC2'],
    'MC1 and MC2, re-asked with a two-step sequence'),

  // ─── chem.hal.grignard ───────────────────────────────────────────────────
  card('chem.hal.grignard', 'short_answer', U,
    'A student dilutes a Grignard reagent with aqueous acid before it has reacted with acetone, and draws the carbanion attacking the oxygen of the carbonyl. Which statement is correct?',
    'It must stay anhydrous until workup, and the carbanion attacks the carbonyl carbon',
    ['Aqueous acid can be added before the reaction, because the Grignard is stable in water', 'MC1'],
    ['The carbanion attacks the oxygen of the carbonyl, which is the electrophilic site', 'MC2'],
    'MC1 anhydrous until workup, MC2 attack at carbon, re-asked with acetone'),
  card('chem.hal.grignard', 'step_check', U,
    'Ethyl acetate is treated with excess methylmagnesium bromide and then worked up with aqueous acid. Which statement is correct?',
    'The more electrophilic ketone reacts again, giving the tertiary alcohol 2-methylpropan-2-ol',
    ['The reaction stops at the ketone, acetone, because ketone formation ends the Grignard addition', 'MC3'],
    ['The aqueous acid is added together with the Grignard, so the workup happens during the reaction', 'MC1'],
    'MC3 esters give tertiary alcohols, MC1 water only at workup, re-asked with ethyl acetate'),

  // ─── chem.hyd.polycyclic ─────────────────────────────────────────────────
  card('chem.hyd.polycyclic', 'short_answer', U,
    'A student says pyridine is electron-rich because nitrogen donates its lone pair into the ring, and that furan is less reactive than benzene toward EAS because it is less aromatic. Which statement is correct?',
    'Pyridine\'s in-plane sp² lone pair does not conjugate, and furan is more reactive than benzene',
    ['Pyridine\'s nitrogen donates its lone pair into the ring, making pyridine electron-rich', 'MC1'],
    ['Furan is less reactive than benzene, because less aromatic stabilisation means less reactivity', 'MC3'],
    'MC1 which orbital holds the lone pair, MC3 aromaticity and EAS reactivity are independent, re-asked with pyridine and furan'),
  card('chem.hyd.polycyclic', 'true_false', U,
    'Naphthalene undergoes electrophilic substitution. Which statement is correct?',
    'Attack at C1 (α) is favoured because its intermediate keeps the other ring\'s full aromaticity',
    ['C1 and C2 are equally activated, since the molecule is symmetrical', 'MC2'],
    ['Neither position reacts, because naphthalene is less reactive than benzene', ''],
    'MC2 α and β positions differ, re-asked with naphthalene'),

  // ─── chem.kinet.photochemistry ───────────────────────────────────────────
  card('chem.kinet.photochemistry', 'short_answer', U,
    'A student says a photochemical quantum yield can never exceed 1, and that a thermal propagation step in a chain reaction must also absorb a photon. Which statement is correct?',
    'Φ can exceed 1 in a chain reaction, and only the primary step absorbs a photon',
    ['A quantum yield is always 1 or less, since one photon gives at most one product', 'MC1'],
    ['Every step in the mechanism, including propagation, directly absorbs a photon', 'MC3'],
    'MC1 quantum yield and chains, MC3 only the primary step uses light, re-asked in general terms'),

  // ─── chem.nitro.diazonium ────────────────────────────────────────────────
  card('chem.nitro.diazonium', 'short_answer', U,
    'A student stores benzenediazonium chloride on the bench for a week, and says azo coupling with phenol releases N₂ just as the Sandmeyer reaction does. Which statement is correct?',
    'Diazonium salts are made and used in situ at 0–5 °C, and azo coupling keeps the –N=N– link, so no N₂ is released',
    ['Diazonium salts are stable and storable, so a week on the bench is fine', 'MC1'],
    ['Azo coupling releases N₂, like the Sandmeyer and Balz–Schiemann reactions', 'MC2'],
    'MC1 diazonium salts are unstable, MC2 coupling retains N=N, re-asked with benzenediazonium chloride and phenol'),

  // ─── chem.org.reactive-intermediates ─────────────────────────────────────
  card('chem.org.reactive-intermediates', 'short_answer', U,
    'A student says a tertiary carbanion is the most stable carbanion, as a tertiary carbocation is the most stable carbocation, and that a free radical carries a negative charge. Which statement is correct?',
    'Carbanion stability falls with alkyl substitution, and a free radical is neutral (one unpaired electron)',
    ['Tertiary carbanions are the most stable carbanions, just like tertiary carbocations are the most stable', 'MC1'],
    ['A free radical is negatively charged, because it has an extra electron', 'MC2'],
    'MC1 carbanions are destabilised by alkyl groups, MC2 radicals are neutral, re-asked in general terms'),

  // ─── chem.pblock.group13 ─────────────────────────────────────────────────
  card('chem.pblock.group13', 'short_answer', U,
    'A student says thallium forms Tl³⁺ just like aluminium, and that aluminium dissolves only in acids because it is a metal. Which statement is correct?',
    'Tl is dominantly +1 (inert pair effect), and aluminium is amphoteric, dissolving in strong base too',
    ['Thallium forms Tl³⁺ just like aluminium, since every element in Group 13 is dominantly in the +3 state', 'MC1'],
    ['Aluminium reacts only with acids, because it is a metal', 'MC2'],
    'MC1 inert pair effect, MC2 aluminium is amphoteric, re-asked with Tl and Al'),
  card('chem.pblock.group13', 'true_false', U,
    'Which statement about boric acid, B(OH)₃, is correct?',
    'It is a Lewis acid: it accepts a lone pair from water to form [B(OH)₄]⁻, so H⁺ is released only indirectly',
    ['It is a Brønsted acid that donates H⁺ directly from its own O–H groups, like HCl', 'MC3'],
    ['Boron forms B³⁺ ions in solution, so boric acid behaves as a simple metal cation', 'MC1'],
    'MC3 boric acid is a Lewis acid, MC1 boron forms no simple cation'),

  // ─── chem.pblock.group14 ─────────────────────────────────────────────────
  card('chem.pblock.group14', 'short_answer', U,
    'A student says SiO₂ dissolves in water to form an acid like CO₂, and that diamond conducts electricity because it is made of carbon, like graphite. Which statement is correct?',
    'SiO₂ is an insoluble network solid, and diamond (localised σ bonds) is an insulator',
    ['SiO₂ dissolves in water to give an acid, just as CO₂ does', 'MC1'],
    ['Diamond conducts electricity because it is made of carbon, like graphite, which conducts too', 'MC2'],
    'MC1 SiO₂ is a network solid, MC2 bonding decides conductivity, re-asked with SiO₂ and diamond'),

  // ─── chem.pblock.group15 ─────────────────────────────────────────────────
  card('chem.pblock.group15', 'short_answer', U,
    'A student says P₄ contains P≡P triple bonds like N₂, and that nitrogen with oxidation state +5 in NO₃⁻ must form five bonds. Which statement is correct?',
    'P₄ has single P–P bonds, and nitrogen forms at most four bonds, so +5 is formal',
    ['P₄ has P≡P triple bonds, like the N≡N bond in N₂', 'MC1'],
    ['Nitrogen in NO₃⁻ forms five bonds, because its oxidation state of +5 equals its bond count', 'MC2'],
    'MC1 P₄ has single bonds, MC2 oxidation state is not a bond count, re-asked with P₄ and NO₃⁻'),
  card('chem.pblock.group15', 'true_false', U,
    'Which statement about nitrogen is correct?',
    'In HNO₃ its oxidation state is +5 but it forms only four bonds, since a period 2 element cannot exceed an octet',
    ['It forms five bonds in HNO₃ because its oxidation state is +5', 'MC2'],
    ['Nitrogen exists as tetrahedral N₄ molecules with single bonds, like P₄', 'MC1'],
    'MC2 bond count vs oxidation state, MC1 N₂ is triple-bonded'),
]
