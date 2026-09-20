# Gene Interactions and Extensions of Mendelism — `bio.gen.gene-interactions`

## Identity

- **Concept ID**: `bio.gen.gene-interactions` (canonical biology KG)
- **Curriculum location**: biology / genetics (`bio.gen`)
- **Prerequisites**: `bio.gen.mendelian-genetics` — the load-bearing
  part is simple, complete dominance and the monohybrid 3:1 ratio
  established there; this concept is explicitly a set of DEPARTURES
  from that baseline pattern, and each departure only makes sense
  contrasted against the simple case it deviates from.
- **Unlocks** (from KG): `bio.gen.chromosomal-theory-linkage` — the
  gene-interaction patterns established here (particularly the
  distinction between independently-assorting genes and genes on the
  same chromosome) set up the linkage concept's own departure from
  independent assortment.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: distinguish incomplete dominance (heterozygote shows
an intermediate, blended phenotype) from codominance (heterozygote
shows BOTH parental phenotypes simultaneously, neither blended nor
masked); explain multiple alleles using the ABO blood type system as
the worked example; explain epistasis as one gene's expression masking
or modifying a different gene's expression, using Labrador coat colour
as the worked example; and correctly attribute phenotypic variation
among genetically identical individuals to environmental interaction
with a shared genotype (reaction norm), not to a difference in
genotype itself.

## Core Understanding

Gene interactions and extensions of Mendelism describe patterns of
inheritance that depart from simple, complete dominance in specific,
well-characterised ways. Incomplete dominance occurs when neither
allele is fully dominant, so the heterozygote's phenotype is an
intermediate BLEND between the two homozygous phenotypes (unlike simple
dominance, where the heterozygote looks identical to one homozygote).
Codominance occurs when BOTH alleles are simultaneously and fully
expressed in the heterozygote, producing a phenotype showing both
parental traits side by side rather than blended — the classic example
is the AB blood type, where an individual with both the I^A and I^B
alleles expresses BOTH the A and B antigens on their red blood cells
simultaneously (distinct from incomplete dominance, which would
predict a blended, intermediate antigen type rather than both fully
present). Multiple alleles describes genes with more than two allelic
variants circulating in a population (though any individual still
carries only two), illustrated by the ABO blood group system (three
alleles: I^A, I^B, i) which produces four phenotypes (A, B, AB, O)
through combinations of dominance (I^A and I^B are each dominant to i)
and codominance (I^A and I^B are codominant to each other). Epistasis
occurs when one gene's expression masks or modifies the phenotypic
expression of a DIFFERENT gene entirely — illustrated by Labrador
retriever coat colour, where the B locus (black/brown pigment
production) and the E locus (whether pigment is deposited in the coat
at all) interact: a dog homozygous recessive at the E locus (ee) is
yellow REGARDLESS of its genotype at the B locus, because the E locus
epistatically masks the B locus's effect entirely. Polygenic
inheritance describes traits controlled by MANY genes acting together
(such as human height or skin colour), producing continuous, graded
phenotypic variation rather than a small number of discrete categories.
Finally, genetically identical individuals (such as identical twins)
can still show phenotypic differences, because a genotype does not fix
a single, unique phenotype — it defines a REACTION NORM, a range of
possible phenotypic outcomes depending on environmental conditions
during development; identical genotypes exposed to different
environments predictably diverge in phenotype within that range.

## Mental Models

- **Beginner model — "if a heterozygote doesn't look exactly like one
  parent, it must be incomplete dominance"**: the learner has only one
  category (simple dominance) fully secure, and any deviation gets
  defaulted to the single alternative category encountered first
  (incomplete dominance), without yet distinguishing it from
  codominance.
- **Intermediate model — "incomplete dominance and codominance are
  basically the same thing — both produce a heterozygote that looks
  different from either parent"**: the direct substrate of one of this
  concept's central misconceptions — both patterns genuinely DO produce
  a heterozygote phenotype distinct from either homozygote, but the
  MECHANISM differs critically (blending vs. simultaneous full
  expression of both). Upgrade trigger: being shown AB blood type,
  where BOTH the A and B antigens are fully, separately present — not a
  blended "AB-intermediate" antigen — directly contradicting a
  blending-only mental model.
- **Advanced model — "epistasis as one gene controlling whether another
  gene's effect can even be observed"**: the learner can correctly
  predict a Labrador's coat colour from its full two-locus genotype,
  including correctly identifying cases (ee at the E locus) where the B
  locus's genotype becomes irrelevant to the observed phenotype.
- **Expert model — "genotype defines a reaction norm, not a single fixed
  phenotype"**: the learner explains why genetically identical
  individuals can differ phenotypically without this implying any
  genetic difference, correctly attributing the divergence to
  environmental interaction within the genotype's own reaction norm.
- **Do not upgrade early**: a learner who still conflates incomplete
  dominance and codominance should not be advanced to epistasis
  reasoning — epistasis analysis requires cleanly tracking effects
  across TWO separate genes at once, and an unresolved single-gene
  dominance-pattern confusion will compound rather than resolve when a
  second gene's interaction is added to the analysis.

## Why Students Fail

Incomplete dominance and codominance are almost always introduced
consecutively, as a pair, specifically BECAUSE both produce a
heterozygote phenotype unlike either homozygous parent — but this
shared surface-level outcome (a "new," blended-or-combined-looking
phenotype) is exactly what makes the two mechanisms hard to
distinguish, since the crucial difference lies in HOW that outcome
arises (physical blending of pigment/product vs. full, separate,
simultaneous expression of both alleles' products) rather than in the
outcome itself.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "AB blood type is an example of incomplete dominance, since
  the heterozygote doesn't look like either parent" (Type 4,
  notation-induced)**: born from incomplete dominance and codominance
  being introduced together as a matched pair with a shared surface
  feature (heterozygote unlike either homozygote), leading a learner to
  apply whichever term was encountered or recalled first to a new
  example, rather than checking the specific mechanism. Matches Type
  4's signature: confusion between two closely co-presented technical
  terms, not a conceptual misunderstanding of inheritance itself.
  Characteristic phrase: describing AB blood type as "blended" or
  "intermediate" between A and B. Verbatim detection probe (seed
  corpus, `mcq`): "AB blood type = codominance" identification task
  (with incomplete dominance as the flagged wrong choice). Recovery
  path: state the precise mechanistic distinction explicitly — the AB
  individual has BOTH the A antigen AND the B antigen fully present on
  their red blood cells simultaneously (verifiable by testing for each
  antigen separately, both positive), not a single "AB-type" blended
  antigen; contrast against a genuinely incompletely-dominant trait
  (e.g. pink snapdragon flowers — a single blended pigment intensity,
  not two separate, fully-expressed pigments side by side).
  Verification-of-death: the learner correctly explains why AB blood
  type is NOT a blend, citing the separate, simultaneous presence of
  both antigens.
- **M2 — "Identical twins with different personalities, health outcomes,
  or subtle physical differences must have some genetic difference
  between them" (Type 1, overgeneralization)**: born from the generally
  correct intuition that phenotypic differences usually trace to
  genetic differences, overgeneralized to identical-genotype cases where
  environmental interaction (within the shared reaction norm) is
  actually responsible instead. Matches Type 1's signature: a broadly
  reliable inference rule (different phenotype implies different
  genotype) applied past its actual scope (identical genotypes can still
  diverge phenotypically via environment). Characteristic phrase:
  assuming any phenotypic difference between identical twins must
  reflect an unnoticed genetic difference. Verbatim detection probe
  (seed corpus, `misconception_probe`): "Identical twins differ despite
  same DNA... [explain via] genotype sets reaction norm, environment
  determines phenotype within range." Recovery path: state the
  reaction-norm concept explicitly — a genotype specifies a RANGE of
  possible phenotypic outcomes, not one fixed, guaranteed outcome, and
  environmental differences during development (even subtle ones, like
  differing prenatal positioning or later lifestyle choices) can shift
  where within that range each twin lands. Verification-of-death: the
  learner correctly explains a new case of phenotypic divergence between
  genetically identical individuals without assuming a hidden genetic
  difference must exist.

## Analogies

- **Best analogy — mixing two paint colours (incomplete dominance) vs.
  a two-colour checkerboard pattern (codominance)**: mixing red and
  white paint produces a single, blended pink (incomplete dominance —
  one new, intermediate colour); painting a checkerboard with
  alternating red and white squares keeps BOTH colours fully, separately
  visible at once (codominance — both original "colours" simultaneously
  present, not merged).
- **Alternative — a company with two active CEOs sharing power equally
  (codominance) vs. a single CEO who is a genuine 50/50 hybrid of two
  management styles (incomplete dominance)**: distinguishes "both fully
  present and operating" from "a single blended compromise."
- **Story analogy — the identical twins raised in different environments**:
  same starting genetic "blueprint," but different construction
  conditions (nutrition, experiences, chance developmental events)
  producing measurably different final "buildings" — a concrete anchor
  for the reaction-norm concept.
- **ANTI-ANALOGY — do NOT say "codominance is just a stronger version of
  incomplete dominance"**: this reinforces exactly the M1 confusion,
  implying a difference of DEGREE rather than the actual difference in
  KIND (blending vs. simultaneous separate expression).

## Demonstrations

- **Discrimination demonstration — blend or both?**: present several
  trait examples (pink snapdragons, AB blood type, roan cattle coat
  colour) and have the learner classify each as incomplete dominance or
  codominance BEFORE being told, based on whether the heterozygous
  phenotype is a single blend or both parental traits separately
  visible, directly targeting M1.
- **Teacher-demo — the Labrador coat-colour genotype-to-phenotype
  walkthrough**: work through several two-locus (B/b, E/e) Labrador
  genotypes explicitly, including at least one ee genotype where the B
  locus becomes irrelevant, making epistasis's masking effect concrete.

## Discovery Questions

A genuine discovery design fits: **Need** — "AB blood type isn't A, and
it isn't B, and it isn't a mix — so what exactly IS it?" **Playground**
— the learner considers what a blood test would actually detect in an
AB individual (both antigens, tested separately). **Invention** — the
learner proposes that both alleles must be FULLY, SEPARATELY expressed,
not blended into one intermediate product. **Collision** — confronted
with incomplete dominance's blending pattern (already learned),
creating tension between the two similar-sounding but mechanistically
different categories. **Formalization** — the precise mechanistic
distinction (blending vs. simultaneous full expression) is stated
explicitly, anchored to AB blood type and pink snapdragons respectively.
**Compression** — given a new trait example, the learner correctly
classifies it as incomplete dominance or codominance based on the
heterozygote's actual phenotype structure.

## Teaching Sequence

Incomplete dominance and codominance should be taught with their
DISTINGUISHING mechanism (blending vs. simultaneous separate
expression) stated explicitly and repeatedly from the first
introduction of each, rather than relying on the surface similarity
("heterozygote looks different from either parent") to implicitly
convey the distinction. Epistasis should be introduced only after both
dominance-pattern concepts are secure, since Labrador coat colour
requires simultaneously tracking TWO genes' effects, compounding any
unresolved single-gene confusion.

## Tutor Actions

From `../../teaching-actions/`: **Discrimination** (blend-or-both
sorting exercise, incomplete dominance vs. codominance) →
**Definition/Orientation** (multiple alleles via ABO blood groups;
epistasis via Labrador coat colour) → **Error Analysis** (the identical-
twins-must-differ-genetically misconception, using the reaction-norm
concept). **What doesn't fit**: introducing epistasis before the
incomplete-dominance/codominance distinction is fully secure.

## Voice Teaching Notes

Listen for AB blood type described as "blended" or as an "intermediate"
type — M1's clearest verbal signature. Also listen for a phenotypic
difference between identical twins attributed to an assumed hidden
genetic difference — M2's signature. The load-bearing sentence: "AB
blood type isn't a blend — it's BOTH antigens, fully present, at the
same time; a blend would be incomplete dominance, and this isn't that."
Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank, supplemented by this
entry's own probe-depth batch addition. A learner who answers the AB-
blood-type-codominance `mcq` correctly but fails the identical-twins
`misconception_probe` has M2 specifically — they understand THIS
concept's dominance patterns but still misattribute unrelated
phenotypic variation to hidden genetic differences, which should route
to the reaction-norm recovery rather than re-teaching codominance. The
probe-depth batch's own Labrador-epistasis `short_answer` probe (Batch
5) verifies the advanced-model two-locus epistasis reasoning
specifically, distinct from either misconception check above.

## Tutor Recovery Strategy

Likeliest utterance: describing AB blood type or a similarly codominant
trait as a "blend" or "mix" (not distress-shaped — a reasonable,
surface-similarity-driven mix-up with incomplete dominance, not a sign
of confusion about inheritance generally). Concept-specific smaller
question: "if you tested an AB blood sample for the A antigen AND the B
antigen separately, would BOTH tests come back positive, or would you
get one 'in-between' result?" Generic recovery machinery owned by
`../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (a taxonomy of departures from simple dominance) with
an embedded discrimination skill (blending vs. simultaneous expression)
and a two-locus reasoning skill (epistasis genotype-to-phenotype
mapping). Review form: periodic re-presentation of a new trait example
for incomplete-dominance/codominance classification, and periodic
re-presentation of a two-locus genotype for epistasis-based phenotype
prediction. Interleaving partners: `bio.gen.mendelian-genetics` (this
concept's own prerequisite, providing the simple-dominance baseline
every pattern here departs from) and `bio.gen.chromosomal-theory-
linkage` (the direct KG unlock, building on independently-assorting
vs. linked genes).

## Transfer Connections

- **Near**: a new trait example, correctly classified among incomplete
  dominance, codominance, multiple alleles, or epistasis.
- **Far**: recognising the same "two categories share a surface feature
  but differ in underlying mechanism" structure elsewhere (e.g.
  distinguishing correlation from causation, both of which can produce
  the surface appearance "two things vary together").
- **Real-world**: correctly interpreting a blood type compatibility
  chart for transfusions, using the codominance/multiple-alleles
  framework rather than assuming blood types blend or combine.
- **Expert transfer**: on meeting any claim about a hybrid or combined
  outcome, the learner spontaneously checks whether the components are
  BLENDED into something new, or SEPARATELY, FULLY present side by
  side, since the distinction matters for correctly predicting further
  behaviour.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.gen.gene-interactions.md` as of this entry's authoring (confirmed
by direct directory listing — biology has zero Blueprint files in
total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, both at gradeBand HIGH; `src/lib/teaching/assets/
biologyDepthSeedAssets.ts` (Batch 5, `bio.gen`) adds one further
`short_answer` probe at gradeBand HIGH, PROFICIENT difficulty (the
Labrador-coat-colour epistasis check), closing this concept to the
3-probe asset contract floor. No new asset created by authoring this
entry.

## Curriculum Feedback

None found. This concept's one KG-listed unlock
(`bio.gen.chromosomal-theory-linkage`) is a plausible direct consequence
of establishing gene-interaction patterns as departures from
independent, simple-dominance inheritance.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, thirty-sixth entry, strict KG-prerequisite order — first of
  the seventh recomputed frontier, from the 35-concept baseline). No
  Blueprint exists for this concept; both misconceptions classified
  directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
