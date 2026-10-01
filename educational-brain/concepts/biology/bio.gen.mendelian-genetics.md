# Mendelian Genetics — `bio.gen.mendelian-genetics`

## Identity

- **Concept ID**: `bio.gen.mendelian-genetics` (canonical biology KG)
- **Curriculum location**: biology / genetics (`bio.gen`)
- **Prerequisites**: `bio.cell.meiosis` — the load-bearing part is
  independent assortment of homologous chromosome pairs during meiosis
  I, which is the physical, cellular mechanism underlying Mendel's Law
  of Independent Assortment; Mendel's laws are the phenotypic-ratio
  CONSEQUENCE of a mechanism meiosis already established.
- **Unlocks** (from KG): `bio.gen.gene-interactions` — Mendelian
  genetics' single-gene, simple-dominance framework is the essential
  baseline that gene-interaction concepts (incomplete dominance,
  codominance, epistasis) are explicitly defined AGAINST, as departures
  from this simpler pattern.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.70 · **Est. hours**: 4

## Learning Objective

The learner can: define gene, allele, genotype, and phenotype, and
distinguish homozygous from heterozygous genotypes; state Mendel's Law
of Segregation (allele pairs separate during gamete formation) and Law
of Independent Assortment (different genes' alleles segregate
independently of one another); construct and interpret Punnett squares
for monohybrid and dihybrid crosses, predicting expected phenotypic
ratios (3:1 monohybrid; 9:3:3:1 dihybrid); and correctly distinguish
"dominant" (the allele expressed in a heterozygote) from "common" (the
more frequent allele in a population) — the two are logically
independent properties.

## Core Understanding

Mendelian genetics describes the pattern of inheritance for traits
controlled by a single gene with two alleles showing simple, complete
dominance. Foundational vocabulary: a gene is a hereditary unit
occupying a specific chromosomal locus; an allele is one specific
version of that gene; a genotype is an organism's actual allele
combination at a locus (homozygous: two identical alleles; heterozygous:
two different alleles); a phenotype is the observable trait resulting
from that genotype (and, in general, environmental interaction). The
Law of Segregation states that the two alleles an organism carries for
a gene separate from each other during gamete formation, so each gamete
receives only one allele per gene — this is the direct genetic
consequence of homologous chromosome separation during meiosis I. The
Law of Independent Assortment states that the alleles of DIFFERENT
genes segregate independently of one another during gamete formation
(as long as those genes are on different chromosomes, or far apart on
the same chromosome) — this is the direct genetic consequence of each
homologous pair orienting independently at the meiosis I metaphase
plate. Punnett squares systematically enumerate all possible gamete
combinations from a given cross, predicting expected genotypic and
phenotypic ratios: a monohybrid cross between two heterozygotes
(Tt × Tt) produces a 3:1 phenotypic ratio (3 dominant-phenotype : 1
recessive-phenotype) among offspring; a dihybrid cross tracking two
independently-assorting genes (RrYy × RrYy) produces a 9:3:3:1
phenotypic ratio across the four possible phenotype combinations.
Crucially, "dominant" describes only which allele's phenotype is
EXPRESSED when both alleles are present in a heterozygote — it carries
no implication about which allele is more common in a population, nor
about severity, desirability, or evolutionary advantage. Huntington's
disease is caused by a dominant allele that remains rare in the human
population, since the dominant allele's harmful effects reduce its
carriers' reproductive success — dominance and population frequency are
governed by entirely separate mechanisms (expression pattern vs.
natural selection).

## Mental Models

- **Beginner model — "dominant traits are the more common ones in a
  population"**: a natural, but incorrect, inference from the everyday
  meaning of "dominant" (prevailing, widespread) applied directly to
  its narrower genetic meaning (expressed in heterozygotes).
- **Intermediate model — "a Punnett square just mechanically produces
  a ratio, without a clear reason WHY that ratio results"**: the
  learner can execute the mechanical procedure (filling in the grid)
  without connecting it back to the Law of Segregation's actual claim
  about gamete formation. Upgrade trigger: being asked to explain, in
  terms of gamete types and their probabilities, WHY a Tt × Tt cross
  produces exactly a 3:1 ratio, rather than simply filling in a
  memorised grid template.
- **Advanced model — "independent assortment as the reason dihybrid
  ratios expand combinatorially"**: the learner can explain why a
  dihybrid cross's 9:3:3:1 ratio follows directly from treating each
  gene's segregation as a statistically independent event, and
  multiplying the two genes' individual monohybrid probabilities
  together.
- **Expert model — "dominance as an expression pattern completely
  decoupled from population frequency, severity, or evolutionary
  fitness"**: the learner fluently applies the Huntington's-disease
  case (a dominant, harmful, rare allele) as a standing counter-example
  whenever "dominant" and "common" risk being conflated in a new
  context.
- **Do not upgrade early**: a learner who still equates dominant with
  common should not be advanced to dihybrid-cross combinatorial
  reasoning — the 9:3:3:1 ratio's derivation implicitly requires
  correctly understanding that "dominant phenotype" refers to
  EXPRESSION pattern within the cross being analysed, not to any
  claim about the allele's frequency in the broader population the
  cross is drawn from.

## Why Students Fail

The word "dominant" in everyday English near-universally means
prevailing, widespread, or most common — a genetics-specific technical
meaning (the allele expressed in a heterozygote, regardless of its
population frequency) directly collides with this far more familiar
everyday sense, and because the genetics course rarely introduces
"dominant" with an explicit warning about this collision, the everyday
meaning persists as the default interpretation until a specific
counter-example (like Huntington's disease) forces a correction.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Dominant alleles are the more common ones in a population"
  (Type 3, language contamination)**: born from "dominant"'s everyday
  meaning (prevailing, widespread) bleeding directly into its narrower
  genetic technical meaning (the allele expressed in a heterozygote).
  Matches Type 3's signature exactly: the misconception tracks a
  specific word's everyday connotation, not a reasoning error about the
  underlying inheritance mechanism. Characteristic phrase: assuming a
  dominant allele must be more frequent, or a recessive allele must be
  rare, purely from the dominant/recessive label. Verbatim detection
  probe (seed corpus, `misconception_probe`): a Huntington's-disease-
  style scenario contrasting a dominant, harmful, RARE allele against
  the assumption that dominant implies common. Recovery path: state the
  precise technical definition explicitly (dominance is about
  EXPRESSION in a heterozygote, not frequency) and anchor to the
  Huntington's-disease counter-example — a dominant allele that remains
  rare because its harmful effects reduce reproductive success, meaning
  population frequency is governed by natural selection, an entirely
  separate mechanism from dominance itself. Verification-of-death: the
  learner correctly predicts, for a new hypothetical harmful dominant
  allele, that it would likely remain rare in a population despite
  being dominant.
- **M2 — "Ratios like 1:1 or arbitrary fractions can result from a
  simple monohybrid cross between two heterozygotes" (Type 4,
  notation-induced)**: born from the Punnett square's grid format
  inviting a range of plausible-looking fraction guesses when a learner
  has not yet internalised that a Tt × Tt cross ALWAYS yields exactly
  1 TT : 2 Tt : 1 tt genotypically (3:1 phenotypically), regardless of
  surface details of the specific trait involved. Matches Type 4's
  signature: confusion driven by the grid's open-ended appearance
  rather than a conceptual misunderstanding of segregation itself.
  Characteristic phrase: predicting a monohybrid heterozygote cross
  ratio other than 3:1 (phenotypic) or 1:2:1 (genotypic). Verbatim
  detection probe (seed corpus, `mcq`): "A Tt × Tt cross... produces
  what ratio?" (with "1:1" flagged as a wrong choice). Recovery path:
  walk through the Punnett square explicitly, showing all four equally-
  likely gamete-combination outcomes, and generalise: any Aa × Aa cross
  always produces the same 3:1 phenotypic ratio, mechanically, because
  the underlying gamete probabilities (1/2 A, 1/2 a from each parent)
  never change. Verification-of-death: the learner correctly predicts
  the 3:1 ratio for a NEW trait's Aa × Aa cross without needing to
  re-derive the grid from scratch each time.

## Analogies

- **Best analogy — a job title vs. how common that job is in a city**:
  "manager" (dominant) describes a ROLE (who's in charge when both are
  present), completely independent of how many managers actually exist
  in the city (population frequency) — directly targets M1.
- **Alternative — a coin flip repeated for two independent traits**:
  each gene's inheritance is like an independent coin flip; a dihybrid
  cross is like flipping two separate coins simultaneously, and the
  9:3:3:1 ratio falls directly out of multiplying each coin's
  independent 3:1-style probability — targets the combinatorial
  reasoning behind dihybrid ratios.
- **Story analogy — Huntington's disease's persistent rarity despite
  dominance**: a dominant allele that reduces its carriers'
  reproductive success stays rare for generations, precisely because
  dominance and population frequency are governed by separate
  mechanisms — a concrete, memorable, real-world anchor for M1's
  correction.
- **ANTI-ANALOGY — do NOT say "dominant alleles usually win out and
  become more common over time"**: this directly reinforces M1 by
  implying dominance itself drives frequency change, when only natural
  selection (acting on fitness, independent of dominance) does that.

## Demonstrations

- **Discrimination demonstration — dominant-but-rare vs. recessive-but-
  common sorting**: present several real or hypothetical alleles
  (labelled dominant/recessive and rare/common in various combinations)
  and have the learner sort them, confirming all four combinations are
  logically possible, directly targeting M1.
- **Teacher-demo — the Punnett square as gamete-probability arithmetic**:
  walk through a Tt × Tt cross explicitly as "1/2 T or t from each
  parent, four equally likely combinations," generalising the 3:1
  pattern as arithmetic necessity rather than a memorised grid shape,
  directly targeting M2.

## Discovery Questions

A genuine discovery design fits: **Need** — "Huntington's disease is
caused by a DOMINANT allele, yet it remains rare — shouldn't a dominant
trait be common, since 'dominant' usually means widespread?" **Playground**
— the learner considers what actually determines whether an allele
becomes common or stays rare (reproductive success, i.e. natural
selection) versus what determines dominance (expression pattern in a
heterozygote). **Invention** — the learner proposes that dominance and
frequency must be controlled by two separate, independent mechanisms.
**Collision** — confronted with the everyday meaning of "dominant"
(widespread, prevailing), which conflicts with the just-reasoned
conclusion. **Formalization** — the precise technical definition of
dominance (expression in a heterozygote) is stated explicitly, fully
decoupled from population frequency. **Compression** — given a new
hypothetical allele's dominance status and fitness effect, the learner
correctly predicts whether it is likely to become common or stay rare.

## Teaching Sequence

The dominant-vs-common language distinction (M1) should be addressed
BEFORE Punnett square mechanics are drilled extensively, since drilling
"dominant phenotype" terminology repeatedly without first flagging the
everyday-meaning collision risks the incorrect association hardening
through repetition. The Punnett-square-as-arithmetic framing (targeting
M2) should follow immediately, generalising the grid mechanism as a
gamete-probability calculation rather than a memorised template shape.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (gene,
allele, genotype, phenotype, dominance's precise meaning) → **Error
Analysis** (the dominant-means-common misconception, using
Huntington's disease) → **Quantitative Reasoning** (Punnett-square
gamete-probability arithmetic, generalising the 3:1/9:3:3:1 ratios).
**What doesn't fit**: drilling Punnett square construction repeatedly
before the dominant-vs-common distinction is explicitly addressed.

## Voice Teaching Notes

Listen for a dominant allele assumed to be common, or a recessive
allele assumed to be rare, purely from the label — M1's clearest verbal
signature. Also listen for a predicted monohybrid cross ratio other
than 3:1/1:2:1 for a straightforward Aa × Aa cross — M2's signature.
The load-bearing sentence: "dominant just means which one shows up when
both are present — it says nothing about how common that allele
actually is in the population." Channel-reality limits owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank, supplemented by this
entry's own probe-depth batch addition. A learner who answers the
monohybrid-ratio `mcq` correctly but fails the dominant-means-common
`misconception_probe` has M1 specifically — they can execute Punnett
square mechanics but still misunderstand the dominance/frequency
relationship, which should route to the Huntington's-disease recovery
rather than re-teaching cross mechanics. The probe-depth batch's own
dihybrid-cross `short_answer` probe (Batch 5) verifies the advanced-
model combinatorial reasoning specifically, distinct from either
concern above.

## Tutor Recovery Strategy

Likeliest utterance: assuming a dominant trait must be the more common
one, or expressing surprise that a dominant disease allele could remain
rare (not distress-shaped — a common, everyday-language-driven
assumption, not a sign of confusion about inheritance mechanics).
Concept-specific smaller question: "if everyone who carries this
dominant allele has fewer children on average, do you think the allele
would become MORE or LESS common over many generations, even though
it's dominant?" Generic recovery machinery owned by `../foundations/
01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (inheritance vocabulary and laws) with an embedded
quantitative-reasoning skill (Punnett-square probability arithmetic)
and a language-precision skill (dominance vs. population frequency).
Review form: periodic re-presentation of a new monohybrid/dihybrid
cross for ratio prediction, and periodic re-presentation of a
dominant-vs-common discrimination scenario. Interleaving partners:
`bio.gen.gene-interactions` (the direct KG unlock, explicitly defined
as departures from this concept's simple-dominance baseline) and
`bio.cell.meiosis` (this concept's own prerequisite, sharing the
independent-assortment mechanistic basis).

## Transfer Connections

- **Near**: a new monohybrid or dihybrid cross, correctly predicted for
  phenotypic ratio.
- **Far**: recognising the same "a technical term's precise meaning is
  narrower than its everyday connotation" structure elsewhere (e.g.
  "significant" in statistics meaning a specific probability threshold,
  not "important" or "large").
- **Real-world**: correctly interpreting genetic counselling information
  about a dominant hereditary condition without assuming it must be
  common in the general population.
- **Expert transfer**: on meeting any claim that a "dominant" trait,
  gene, or allele must therefore be common or advantageous, the learner
  spontaneously separates the expression-pattern claim (dominance) from
  the frequency/fitness claim (a matter for natural selection, not
  dominance).

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.gen.mendelian-genetics.md` as of this entry's authoring (confirmed
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
dihybrid-cross 9/16 ratio check), closing this concept to the 3-probe
asset contract floor. No new asset created by authoring this entry.

## Curriculum Feedback

None found. This concept's one KG-listed unlock (`bio.gen.gene-
interactions`) is a plausible direct consequence of establishing simple
Mendelian dominance as the baseline pattern gene interactions depart
from.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, thirty-third entry, strict KG-prerequisite order — first of
  the sixth recomputed frontier, from the 32-concept baseline). No
  Blueprint exists for this concept; both misconceptions classified
  directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
