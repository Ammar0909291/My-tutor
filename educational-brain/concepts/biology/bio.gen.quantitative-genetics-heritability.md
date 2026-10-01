# bio.gen.quantitative-genetics-heritability — Quantitative Genetics and Heritability

## Identity
- **Concept ID**: `bio.gen.quantitative-genetics-heritability`
- **Subject**: Biology
- **Domain**: Genetics (`bio.gen`)
- **Prerequisites**: `bio.gen.population-genetics`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: `math.prob.variance`, `math.prob.normal-distribution`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 6

## Learning Objective
The student can correctly explain heritability as a POPULATION-SPECIFIC statistic
describing the PROPORTION of trait VARIANCE attributable to genetic differences within
that SPECIFIC population and environment — not a fixed, universal property of the trait
itself, and not a measure of how much of an INDIVIDUAL'S trait value is "caused by"
genes — and correctly distinguish broad-sense heritability (all genetic variance) from
narrow-sense heritability (only ADDITIVE genetic variance).

## Core Understanding
**Quantitative genetics** studies CONTINUOUS, polygenic traits (like height, blood
pressure, or crop yield) — traits influenced by MANY genes each contributing a SMALL
effect, plus environmental factors, producing a continuous range of phenotypic
VALUES — in explicit CONTRAST to the discrete, single-locus traits studied in classical
Mendelian genetics (like Mendel's pea-plant traits, governed by one gene with clearly
distinguishable phenotypic categories).

**Heritability** quantifies what PROPORTION of the total phenotypic VARIANCE (variation
BETWEEN individuals) in a POPULATION is attributable to GENETIC variance, as opposed to
environmental variance (or other non-genetic sources). Two distinct heritability
measures are used for different specific purposes. **Broad-sense heritability (H²)**
captures ALL genetic variance contributing to a trait's variation, including additive,
dominance, and epistatic (gene-gene interaction) genetic effects together.
**Narrow-sense heritability (h²)** captures ONLY the ADDITIVE genetic variance
component — specifically because ADDITIVE genetic effects are the component that
predictably transmits from parent to offspring and therefore most directly determines a
population's response to SELECTION (whether natural or artificial breeding selection);
dominance and epistatic effects do not transmit as predictably across generations.
Heritability is typically ESTIMATED using **twin and family studies**, comparing trait
similarity between individuals with KNOWN degrees of genetic relatedness (e.g.,
identical versus fraternal twins) sharing similar environments.

The single most important, and most frequently misunderstood, conceptual point in this
entire topic is this: **heritability is a POPULATION-SPECIFIC statistic, NOT a fixed
property of the trait itself**, and it does NOT describe how much of an INDIVIDUAL'S
own trait value is "caused by" genes versus environment. Heritability specifically
measures the PROPORTION of variance WITHIN a GIVEN population, under that population's
SPECIFIC range of environmental conditions — the SAME trait can have a COMPLETELY
DIFFERENT heritability value in a DIFFERENT population, or even in the SAME population
under DIFFERENT environmental conditions, because heritability depends on how much
VARIANCE exists in BOTH the genetic AND the environmental factors present in that
specific context. If environmental variance INCREASES (e.g., a population experiences
much more varied nutrition or living conditions), heritability for a trait can DECREASE
— even if the underlying GENETIC contribution to the trait hasn't changed at all —
simply because a larger SHARE of the total variance is now attributable to the more
varied environment. **Genotype-by-environment interaction** — where a given genotype's
phenotypic EXPRESSION itself depends on the specific environment it develops in —
further reinforces why heritability cannot be treated as a fixed, universal, or
individually-applicable number.

## Mental Models
- **Heritability as "what fraction of the DIFFERENCES between people, in THIS group, in
  THESE conditions, traces to genes" — not "how much of MY trait is genetic"**: think of
  heritability as answering a question specifically about VARIATION within a defined
  population under defined conditions, not a question about any single individual's own
  trait causation.
- **Heritability as a ratio that shifts when either "ingredient" changes**: heritability
  is like a ratio of two ingredient amounts (genetic variance ÷ total variance) — change
  EITHER ingredient's amount (e.g., increase environmental variance by making
  conditions much more varied), and the RATIO shifts, even if the genetic ingredient
  itself hasn't changed at all.

## Why Students Fail
1. They interpret heritability as describing how much of an INDIVIDUAL'S own trait
   value is caused by genes (e.g., "height is 80% heritable" being misread as "80% of
   MY height is due to my genes"), missing that heritability is specifically a
   POPULATION-level VARIANCE statistic, not an individual-level causal proportion.
2. They treat heritability as a FIXED, universal property of a given trait, missing
   that it is SPECIFIC to a given population under given environmental conditions, and
   can change if either genetic or environmental variance changes.
3. They conflate broad-sense and narrow-sense heritability, missing that narrow-sense
   heritability specifically captures only the ADDITIVE genetic variance component
   (the component most relevant to predicting a population's response to selection).

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "Heritability describes how much of an individual's trait is caused by genes" (Type 4: Notation/mechanism-induced)
**Statement**: A heritability value (e.g., "height is 80% heritable") is interpreted as
meaning that 80% of a SPECIFIC INDIVIDUAL'S own height is caused/determined by their
genes (with the remaining percentage attributed to their own personal environment),
rather than as a POPULATION-level statistic about the proportion of BETWEEN-INDIVIDUAL
variance attributable to genetic differences.
**Origin**: The word "heritability," combined with a percentage, intuitively suggests a
proportional BREAKDOWN of causation WITHIN a single individual (analogous to "this
much of the outcome is due to this cause"), rather than its actual, more abstract
statistical meaning about variance PATTERNS across a population.
**Why it persists**: Without an explicit statement that heritability is fundamentally a
VARIANCE-partitioning statistic (comparing DIFFERENCES BETWEEN individuals, not
causation WITHIN one individual), the percentage framing naturally invites an
individual-level causal misreading.
**Repair**: State explicitly that heritability measures the PROPORTION of
PHENOTYPIC VARIANCE (differences BETWEEN individuals) in a population attributable to
GENETIC variance — it says NOTHING about how much of any SINGLE individual's trait
value is "due to" genes versus environment; for an individual, genes and environment
interact inseparably to produce that person's specific trait value, and heritability
simply does not apply at that individual level at all.
**Verification-of-death**: given a scenario asking what an 80% heritability estimate
for a trait tells you about a SPECIFIC individual's own trait value, the learner
correctly states that it tells you NOTHING directly about that individual — it
describes population-level variance patterns only.

### M2 — "Heritability is a fixed, universal property of a trait" (Type 1: Overgeneralization)
**Statement**: A trait's heritability value is assumed to be a FIXED, stable property
of that trait itself, applicable universally across different populations and
environmental conditions, rather than a POPULATION- and ENVIRONMENT-SPECIFIC
statistic that can genuinely differ across contexts.
**Origin**: Overgeneralizing from the trait NAME itself (e.g., "height") being fixed
and consistent to an incorrect inference that its heritability VALUE must also be
fixed, without registering that heritability specifically depends on the relative
AMOUNTS of genetic and environmental variance present in a SPECIFIC population under
SPECIFIC conditions — both of which can genuinely differ across populations and
environments.
**Why it persists**: A single heritability NUMBER is often reported for a trait
without explicit qualification of the specific population and environmental context it
was measured IN, which can create an impression of a universal, trait-intrinsic
constant rather than a context-specific statistic.
**Repair**: State explicitly that heritability can genuinely DIFFER between different
populations, or even within the SAME population under DIFFERENT environmental
conditions — if environmental variance INCREASES (e.g., much more varied living
conditions), heritability can DECREASE even though the underlying genetic contribution
to the trait has not changed, simply because a LARGER share of the total variance is
now attributable to the environment. Genotype-by-environment interaction further
reinforces that a genotype's phenotypic expression itself can depend on the specific
environment.
**Verification-of-death**: given a scenario describing the SAME trait measured in two
populations with very DIFFERENT levels of environmental variance, the learner correctly
predicts that heritability estimates could DIFFER between the two populations, even if
the underlying genetics are identical.

## Analogies
- The recipe-ratio model for heritability's population-specificity: heritability is
  like the RATIO of two specific ingredients in a dish (genetic variance to total
  variance) — change the amount of ONE ingredient (say, environmental variance)
  without changing the other, and the ratio shifts, even though nothing about the
  OTHER ingredient (genetic variance) has changed at all.
- The group-photo-versus-individual-portrait model for population versus individual
  statistics: heritability is like a statistic describing patterns of HEIGHT VARIATION
  across an entire group photo (a population-level measure) — it tells you nothing
  directly about any ONE person's individual portrait (an individual-level statement),
  even though both use the word "height."

## Demonstrations
- Present the "height is 80% heritable" statement and ask the student what this DOES
  and DOES NOT tell you about a SPECIFIC individual's own height.
- Present the same-trait-two-populations-different-environmental-variance scenario and
  ask the student to predict whether heritability estimates would match or differ
  between the two populations.

## Discovery Questions
- "If a trait is reported as '80% heritable' in a population, does that mean 80% of
  YOUR own specific trait value is caused by your genes? What does the 80% actually
  describe instead?"
- "If the SAME trait is measured in two different populations, one with very uniform
  living conditions and one with highly varied living conditions, would you expect the
  heritability estimate to be the SAME in both, or different? Why?"
- "What specifically distinguishes narrow-sense heritability from broad-sense
  heritability, and why would a plant breeder care about that specific distinction?"

## Teaching Sequence
1. Introduce continuous, polygenic traits in contrast to Mendelian single-locus
   traits before introducing heritability specifically.
2. Introduce broad-sense and narrow-sense heritability as distinct measures, connecting
   narrow-sense heritability's additive-variance focus to its relevance for selection
   response.
3. Directly correct the individual-causation misconception, stating explicitly that
   heritability is a population-level variance statistic, not an individual-level
   causal breakdown.
4. Directly correct the fixed-universal-property misconception, using the two-
   populations-different-environmental-variance scenario.
5. Close by connecting genotype-by-environment interaction as further reinforcing why
   heritability is context-specific, not a fixed trait property.

## Tutor Actions
- If a student interprets a heritability percentage as an individual causal
  breakdown: ask them what heritability actually MEASURES (variance across a
  population, not causation within one person).
- If a student treats heritability as universal: ask them to predict the effect of
  increased environmental variance on the SAME trait's heritability estimate.
- If a student conflates broad-sense and narrow-sense heritability: ask them which
  specific genetic variance component (additive only, or all types) each captures.

## Voice Teaching Notes
Say "population variance, not individual causation" whenever a heritability value is
being interpreted, to keep the population-level framing explicit. Say "specific to
this population, these conditions" whenever heritability's context-dependence comes
up, to keep the non-universal framing active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M1, once
probes exist: a learner who correctly states that a heritability value says nothing
about any individual's own trait causation shows the repaired model; a learner who
applies the percentage to an individual is showing M1 in its cleanest, most-detectable
form.

## Tutor Recovery Strategy
For M1, present the "80% heritable" statement and ask the student directly what it
tells them about ONE specific individual, forcing them to confront the population-
versus-individual distinction themselves rather than accepting a restated definition.
For M2, present the two-populations scenario and ask the student to predict the
heritability comparison BEFORE revealing it, testing whether the context-specificity
framing has been adopted.

## Memory Hooks
- "Heritability describes variance across a GROUP, never causation within ONE person."
- "Change the environment's variance, and heritability can shift — even if genetics
  stayed the same."
- "Narrow-sense heritability: only the additive part, the part selection can act on."

## Transfer Connections
- `bio.gen.population-genetics` (prerequisite): supplies the allele-frequency and
  variance concepts this concept extends into continuous, polygenic trait analysis.
- `math.prob.variance` (cross-linked in the KG): supplies the statistical variance
  concept this concept's entire heritability framework is built directly on.
- `math.prob.normal-distribution` (cross-linked in the KG): connects the continuous,
  polygenic trait distributions described here to the normal-distribution statistical
  model.

## Cross-Subject Connections
The KG's own `cross_links` field connects this concept to `math.prob.variance` and
`math.prob.normal-distribution` (Mathematics' probability/statistics concepts) —
heritability's variance-partitioning framework and the continuous, normally-
distributed nature of polygenic traits are direct applications of these mathematical
concepts, authored here from first principles since no seed content exists to draw the
connection from directly.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.found.scientific-method-in-biology` and
`bio.found.unifying-themes-in-biology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (continuous polygenic traits contrasted with
Mendelian single-locus traits, broad-sense versus narrow-sense heritability,
heritability estimation from twin and family studies, genotype-by-environment
interaction and heritability's population-specificity) are all covered in this EB
entry directly from first principles, since no seed content exists to check against.
No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (forty-second recomputed topological frontier, batch
  of 3 with `bio.neuro.audition-vestibular-system` and
  `bio.physio.endocrine-disorders-feedback`, all first-principles entries — an EIGHTH
  consecutive fully zero-seed-content batch, 0 of 27 frontier candidates), EB concept
  141/199.
