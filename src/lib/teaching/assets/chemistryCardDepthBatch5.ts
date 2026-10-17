/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 5 (chem.hyd, chem.kinet, chem.nitro and chem.org (part 5), 17 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots among HIGH : short_answer and true_false.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_5: SeedProbe[] = [
  // ─── chem.hyd.alkenes ────────────────────────────────────────────────────
  card('chem.hyd.alkenes', 'short_answer', H,
    'But-1-ene is treated with HBr, and cyclohexene with Br₂. A student says the HBr product comes from the rule "H goes to the carbon with more Hs", with no mechanism, and that Br₂ adds to cyclohexene from the same face. Which statement is correct?',
    'H adds to give the more stable secondary carbocation, and Br₂ adds anti through a bromonium ion',
    ['The product comes from a memorised rule with no mechanism behind it, so no carbocation is involved', 'MC1'],
    ['Br₂ adds from the same face (syn), giving cis-1,2-dibromocyclohexane', 'MC2'],
    'MC1 Markovnikov follows carbocation stability, MC2 anti addition, re-asked with but-1-ene and cyclohexene'),
  card('chem.hyd.alkenes', 'true_false', H,
    'To make propan-2-ol from propene, which method is correct?',
    'Oxymercuration–demercuration (or acid-catalysed hydration), which puts OH on the more substituted carbon',
    ['Hydroboration–oxidation, since it gives the same alcohol as oxymercuration', 'MC3'],
    ['Any method works, since the product is set by the rule "H goes to the carbon with more Hs", whatever the reagents', 'MC1'],
    'MC3 choose the method for the regiochemistry, MC1 mechanism decides, re-asked with propene → propan-2-ol'),

  // ─── chem.hyd.alkynes ────────────────────────────────────────────────────
  card('chem.hyd.alkynes', 'short_answer', H,
    'Hex-3-yne is reduced with H₂ over Lindlar catalyst and, separately, with Na in liquid NH₃; pent-1-yne is hydrated with H₂SO₄/HgSO₄. A student says Lindlar gives the trans-alkene and that the hydration gives the aldehyde pentanal. Which statement is correct?',
    'Lindlar gives the cis-alkene and Na/NH₃ the trans; hydration gives the ketone pentan-2-one',
    ['Lindlar gives the trans-alkene and Na/NH₃ gives the cis-alkene, as the two methods are reversed', 'MC1'],
    ['Hydration of pent-1-yne gives pentanal, the aldehyde', 'MC2'],
    'MC1 Lindlar = syn = cis, MC2 terminal alkyne hydration gives a ketone, re-asked with hex-3-yne and pent-1-yne'),
  card('chem.hyd.alkynes', 'true_false', H,
    'Which base can deprotonate the terminal alkyne propyne to form its acetylide?',
    'NaNH₂, because NH₃ (pKₐ ≈ 38) is a far weaker acid than propyne (pKₐ ≈ 25)',
    ['None can, because C–H bonds are never acidic', 'MC3'],
    ['NaOH, because hydroxide is strong enough to deprotonate any hydrocarbon at all', ''],
    'MC3 terminal alkyne C–H is acidic, re-asked with propyne'),

  // ─── chem.hyd.arenes ─────────────────────────────────────────────────────
  card('chem.hyd.arenes', 'short_answer', H,
    'Benzene is nitrated with HNO₃/H₂SO₄ and, separately, alkylated with 1-chloropropane/AlCl₃. A student says HNO₃ itself is the electrophile and that the alkylation gives propylbenzene. Which statement is correct?',
    'The electrophile is NO₂⁺, made by H₂SO₄, and the primary carbocation rearranges to give isopropylbenzene',
    ['HNO₃ itself is the electrophile that attacks the ring', 'MC1'],
    ['The alkylation gives propylbenzene directly, with no rearrangement, as in an SN2 reaction in alkane chemistry', 'MC3'],
    'MC1 nitronium ion, MC3 carbocation rearrangement, re-asked with nitration and propylation'),
  card('chem.hyd.arenes', 'true_false', H,
    'Nitrobenzene is nitrated a second time. Which statement is correct?',
    'The meta product forms, because –NO₂ deactivates every position but deactivates meta the least',
    ['The meta product forms because –NO₂ attracts the electrophile to the meta position', 'MC2'],
    ['The ortho and para products form, because –NO₂ is an activating group', ''],
    'MC2 meta is the least deactivated, not most attractive, re-asked with nitrobenzene'),

  // ─── chem.hyd.petroleum ──────────────────────────────────────────────────
  card('chem.hyd.petroleum', 'short_answer', H,
    'A student says heavy fractions leave the top of a fractionating column because they are denser and rise highest, and that a petrol with an octane number of 95 has 95 carbon atoms per molecule. Which statement is correct?',
    'Heavy fractions condense near the hot bottom, and octane number is an anti-knock rating',
    ['Heavy fractions come off at the top because they are denser and rise highest in the column', 'MC1'],
    ['An octane number of 95 means 95 carbon atoms per molecule', 'MC3'],
    'MC1 boiling-point condensation, MC3 octane number is a rating, re-asked in general terms'),

  // ─── chem.kinet.catalysis ────────────────────────────────────────────────
  card('chem.kinet.catalysis', 'short_answer', H,
    'An iron catalyst is added to N₂ + 3H₂ ⇌ 2NH₃. A student says the catalyst gives more NH₃ at equilibrium and is used up as the reaction proceeds. Which statement is correct?',
    'The catalyst only speeds up reaching equilibrium (K is unchanged), and it is regenerated in a later step',
    ['The catalyst shifts the equilibrium so that more NH₃ forms', 'MC1'],
    ['The catalyst is consumed overall, since it appears in the first step', 'MC2'],
    'MC1 catalysts do not change K, MC2 catalyst is regenerated, re-asked with the Haber process'),

  // ─── chem.kinet.integrated-rate ──────────────────────────────────────────
  card('chem.kinet.integrated-rate', 'short_answer', H,
    'A student plots [A] against t for a first-order reaction and expects a straight line, and says the half-life of a second-order reaction is constant like a first-order one. Which statement is correct?',
    'For first order plot ln[A] against t to get a line; a second-order half-life 1/(k[A]₀) grows as the concentration falls',
    ['[A] against t is the test for first order, and it gives a straight line', 'MC3'],
    ['Every half-life is constant regardless of the reaction order', 'MC1'],
    'MC3 plot ln[A] for first order, MC1 half-life depends on the order, re-asked in general terms'),

  // ─── chem.kinet.rate ─────────────────────────────────────────────────────
  card('chem.kinet.rate', 'short_answer', H,
    'For 2N₂O₅ → 4NO₂ + O₂, a student says N₂O₅ is lost at the same rate that NO₂ forms, and that the reaction rate stays constant until the reactant is used up. Which statement is correct?',
    'Rate = −½ Δ[N₂O₅]/Δt = ¼ Δ[NO₂]/Δt, so NO₂ forms twice as fast as N₂O₅ is lost',
    ['N₂O₅ is lost at the same rate that NO₂ forms', 'MC1'],
    ['The rate stays constant until the N₂O₅ is used up, then drops to zero all at once, with no gradual change', 'MC2'],
    'MC1 rates are normalised by coefficients, MC2 rate falls over time, re-asked with N₂O₅'),

  // ─── chem.kinet.rate-law ─────────────────────────────────────────────────
  card('chem.kinet.rate-law', 'short_answer', H,
    'For 2NO₂ + F₂ → 2NO₂F, a student writes rate = k[NO₂]²[F₂] straight from the equation, and says k doubles when [NO₂] doubles. Which statement is correct?',
    'Orders come from experiment (here rate = k[NO₂][F₂]), and k depends only on temperature, not on concentration',
    ['The rate law is rate = k[NO₂]²[F₂], read straight from the coefficients', 'MC1'],
    ['k doubles when [NO₂] doubles, since k changes with concentration', 'MC3'],
    'MC1 orders from experiment, MC3 k depends on temperature only, re-asked with NO₂ and F₂'),

  // ─── chem.nitro.amines ───────────────────────────────────────────────────
  card('chem.nitro.amines', 'short_answer', H,
    'A student ranks aniline above methylamine as a base, and plans to make pure ethylamine by reacting ammonia with bromoethane. Which statement is correct?',
    'Aniline is the weaker base (lone pair delocalised), and pure ethylamine needs the Gabriel synthesis',
    ['Aniline is the stronger base, because its lone pair is more exposed than the one in methylamine', 'MC1'],
    ['Ammonia with bromoethane gives clean ethylamine', 'MC3'],
    'MC1 delocalised lone pair, MC3 over-alkylation, re-asked with aniline/methylamine and ethylamine'),

  // ─── chem.nitro.amino-acids ──────────────────────────────────────────────
  card('chem.nitro.amino-acids', 'short_answer', H,
    'A student draws alanine at pH 7 as H₂N–CH(CH₃)–COOH, and says that at the isoelectric point the molecule has no charged groups. Which statement is correct?',
    'At pH 7 alanine is the zwitterion ⁺H₃N–CH(CH₃)–COO⁻, and at its pI the net charge is zero',
    ['At pH 7 alanine is the neutral H₂N–CH(CH₃)–COOH form, as it is drawn in textbooks and in water', 'MC1'],
    ['At the pI alanine has no charged groups at all', 'MC2'],
    'MC1 zwitterion at pH 7, MC2 net zero not uncharged, re-asked with alanine'),

  // ─── chem.org.aromaticity ────────────────────────────────────────────────
  card('chem.org.aromaticity', 'short_answer', H,
    'A student calls cyclooctatetraene aromatic because it is a ring of alternating double bonds, and calls the C₅H₅⁺ cation aromatic because it comes from an aromatic ring. Which statement is correct?',
    'COT has 8π electrons and is non-planar, so not aromatic; C₅H₅⁺ has 4π and is antiaromatic',
    ['Any cyclic compound with alternating double bonds is aromatic', 'MC1'],
    ['C₅H₅⁺ is aromatic because it is a carbocation of an aromatic ring, so it keeps the stable ring', 'MC3'],
    'MC1 planarity and 4n + 2, MC3 recount π electrons, re-asked with cyclooctatetraene and C₅H₅⁺'),

  // ─── chem.org.arrow-pushing ──────────────────────────────────────────────
  card('chem.org.arrow-pushing', 'short_answer', H,
    'For the step OH⁻ + CH₃Br, a student starts the arrow at the oxygen atom and also draws two arrows from one lone pair of oxygen. Which statement is correct?',
    'Start the arrow at a lone pair on oxygen, with one arrow per lone pair forming one new bond',
    ['The arrow should start at the oxygen atom itself, wherever its electrons are', 'MC1'],
    ['Two arrows can leave one lone pair in a single step, forming two bonds at once', 'MC2'],
    'MC1 arrows start at electrons, MC2 one arrow per lone pair, re-asked with OH⁻ and CH₃Br'),

  // ─── chem.org.electronic-effects ─────────────────────────────────────────
  card('chem.org.electronic-effects', 'short_answer', H,
    'A student says electron-withdrawing groups make acids weaker because they add electrons to the system, and that the inductive effect alone explains why aniline is a much weaker base than methylamine. Which statement is correct?',
    'Withdrawing groups strengthen acids, and aniline\'s weak basicity is mainly resonance',
    ['Electron-withdrawing groups weaken acids, because they add electrons to the system', 'MC2'],
    ['The inductive effect explains it all, so aniline is weaker than methylamine purely by induction', 'MC3'],
    'MC2 withdrawing groups strengthen acids, MC3 resonance dominates for aniline, re-asked in general terms'),
  card('chem.org.electronic-effects', 'true_false', H,
    'Chlorobenzene reacts with an electrophile. Which statement is correct?',
    'It reacts more slowly than benzene (net −I) but at the ortho and para positions (+M)',
    ['It reacts at the meta position because halogens withdraw electrons by −I', 'MC1'],
    ['It reacts faster than benzene because the electron-withdrawing chlorine adds electrons to the ring', 'MC2'],
    'MC1 halogens direct ortho/para yet deactivate, MC2 withdrawal does not add electrons, re-asked with chlorobenzene'),
]
