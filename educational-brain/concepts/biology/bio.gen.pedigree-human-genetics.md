# Pedigree Analysis and Human Genetic Disorders — `bio.gen.pedigree-human-genetics`

## Identity

- **Concept ID**: `bio.gen.pedigree-human-genetics` (canonical biology
  KG)
- **Curriculum location**: biology / genetics (`bio.gen`)
- **Prerequisites**: `bio.gen.chromosomal-theory-linkage` — the
  load-bearing part is X-linked recessive inheritance's hemizygosity
  mechanism (males, one X, express any X-linked recessive allele
  directly) established there; pedigree analysis is the applied skill
  of tracing that same chromosomal mechanism through multiple
  generations of a real family tree.
- **Unlocks** (from KG): `bio.gen.population-genetics`,
  `bio.gen.genetic-testing-counseling` — pedigree analysis's
  probability calculations are the direct individual-family-level
  foundation that population genetics scales up to whole populations,
  and the practical basis for genetic counselling's risk assessments.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery
  threshold**: 0.75 · **Est. hours**: 5

## Learning Objective

The learner can: read standard pedigree chart conventions (squares for
males, circles for females, shaded symbols for affected individuals,
horizontal lines for mating, vertical lines for offspring) and
correctly determine an inheritance pattern (autosomal dominant,
autosomal recessive, X-linked recessive, X-linked dominant) from the
pattern of affected individuals across generations; calculate
offspring probability for a known genotype cross using pedigree
information; and correctly distinguish disorders caused by single-gene
mutations (haemophilia, colour blindness, sickle cell anaemia) from
disorders caused by whole-chromosome abnormalities (Down syndrome —
trisomy 21; Turner syndrome — monosomy X; Klinefelter syndrome — XXY).

## Core Understanding

Pedigree charts use standardised conventions to represent inheritance
across generations: squares represent males, circles represent
females, shaded (filled) symbols represent affected individuals,
horizontal lines connect mates, and vertical lines connect parents to
offspring. Reading a pedigree correctly means inferring the underlying
inheritance PATTERN from the specific arrangement of affected and
unaffected individuals across generations, then using that inferred
pattern to calculate probabilities for future offspring. Key
diagnostic patterns: an autosomal dominant trait typically appears in
every generation (since only one copy of the dominant allele is needed
for expression) and affects males and females roughly equally; an
autosomal recessive trait can skip generations (since carriers, with
one recessive allele, show no symptoms) and also affects males and
females roughly equally; an X-linked recessive trait shows the
distinctive hemizygosity signature — affected individuals are
predominantly (though not exclusively) male, an affected father passes
the trait-carrying X to ALL his daughters (making them obligate
carriers) but to NONE of his sons (who receive his Y chromosome
instead), and the trait can appear to "skip" a generation via
unaffected carrier mothers; an X-linked dominant trait, by contrast,
appears in every generation like autosomal dominance, but shows a
distinctive asymmetry — an affected father passes the trait to ALL his
daughters but NONE of his sons (since sons don't receive his X at
all). For any known cross (e.g. both parents' genotypes established
from the pedigree), standard probability rules apply exactly as in a
simple Mendelian cross — critically, each child's outcome is an
INDEPENDENT probabilistic event, so having already had one affected
child does NOT change the probability for the next child (a common
point of confusion, since intuition sometimes suggests probability
should "even out"). Human genetic disorders fall into two fundamentally
different categories requiring pedigree tools to distinguish: single-
gene (Mendelian) disorders caused by a mutation in ONE specific gene
(haemophilia and colour blindness — X-linked recessive; sickle cell
anaemia and thalassemia — autosomal recessive), which show the
inheritance patterns described above and can be tracked through
ordinary pedigree analysis; and chromosomal disorders caused by an
abnormal NUMBER of whole chromosomes (aneuploidy), arising from errors
during meiosis rather than from any single mutated gene — Down syndrome
(trisomy 21, three copies of chromosome 21), Turner syndrome (monosomy
X, a single X chromosome and no Y or second X), and Klinefelter
syndrome (XXY, an extra X chromosome in males) — these do NOT follow
simple Mendelian pedigree patterns, since they arise from chromosome
non-disjunction events during gamete formation rather than from
inherited allele combinations.

## Mental Models

- **Beginner model — "a pedigree chart is just a family tree showing
  who has a disease"**: the chart is read passively, as a record of
  facts, without the ACTIVE inference process (determining inheritance
  pattern from the arrangement of affected individuals) being
  recognised as the chart's actual analytical purpose.
- **Intermediate model — "if two carrier parents already had one
  affected child, their next child is less likely to be affected, since
  probability should even out"**: the direct substrate of one of this
  concept's central misconceptions — a gambler's-fallacy-style
  intuition applied to independent genetic events. Upgrade trigger:
  being shown that each fertilisation event is a completely independent
  trial (like a fresh coin flip), with no "memory" of previous
  outcomes influencing the next.
- **Advanced model — "inheritance pattern diagnosis from pedigree shape
  alone, before any genotype is stated"**: the learner can look at an
  unlabelled pedigree's pattern of affected individuals across
  generations and correctly infer whether it shows autosomal dominant,
  autosomal recessive, X-linked recessive, or X-linked dominant
  inheritance, using the specific diagnostic signatures for each.
- **Expert model — "single-gene disorders and chromosomal disorders as
  two entirely different classes requiring different analytical tools"**:
  the learner explains why Down syndrome, unlike haemophilia, cannot be
  predicted from parental genotypes via a standard pedigree/Punnett-
  square approach, since it arises from a meiotic error (non-
  disjunction) rather than from inherited allele combinations.
- **Do not upgrade early**: a learner who still holds the gambler's-
  fallacy intuition about sequential offspring probability should not
  be advanced to complex multi-generation pedigree diagnosis — correctly
  calculating ANY offspring probability from a pedigree (not just the
  first child) depends on treating each birth as an independent event,
  and the fallacy will silently corrupt probability calculations
  throughout more complex pedigree problems.

## Why Students Fail

Everyday intuition about probability, particularly the common
"gambler's fallacy" (a coin that has landed heads several times in a
row feels "due" for tails), transfers directly and plausibly onto
sequential childbirths within a family — since both scenarios involve a
sequence of chance outcomes, the same flawed "balancing out" intuition
applies, even though each conception is in fact a fully independent
probabilistic event exactly like an ordinary coin flip with no memory
of prior outcomes.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "After having one affected child, subsequent children are
  less likely to be affected, since probability should even out" (Type
  2, perceptual intuition)**: born from the gambler's-fallacy intuition
  that a sequence of chance events should "balance out," incorrectly
  applied to independent reproductive events. Matches Type 2's
  signature: an intuitive, plausible-feeling probabilistic error, not a
  taught rule misapplied. Characteristic phrase: expecting a lower
  probability of a genetic condition in a subsequent child because an
  earlier child was already affected. Verbatim detection probe (this
  entry's own reasoning, extending the concept's own probability
  content): "Two carrier parents have one child with an autosomal
  recessive disorder. What is the probability their NEXT child will
  also be affected?" (correct answer: still 1/4, unchanged by the
  previous outcome). Recovery path: state explicitly that each
  fertilisation event is fully independent — like a fresh coin flip
  each time, with no memory of previous flips — and that the 1/4
  probability applies IDENTICALLY to every single child from this
  couple, regardless of how many previous children were or weren't
  affected. Verification-of-death: the learner correctly states the
  same 1/4 probability for a THIRD child even after being told the
  first two were both affected.
- **M2 — "A trait appearing in every generation must be autosomal
  dominant, with no exceptions" (Type 1, overgeneralization)**: born
  from autosomal dominant inheritance's genuinely correct
  every-generation pattern being overgeneralized to assume it is the
  ONLY inheritance pattern producing that signature, when X-linked
  dominant inheritance ALSO appears in every generation (differing only
  in the specific male/female transmission asymmetry, not in
  generational persistence). Matches Type 1's signature: a real,
  correct diagnostic feature of one pattern (autosomal dominant)
  applied past its actual scope (assumed to uniquely identify that
  pattern). Characteristic phrase: diagnosing any every-generation
  pattern as automatically autosomal dominant without checking the
  male/female transmission details. Verbatim detection probe (seed
  corpus, `misconception_probe`): a trait appearing in every generation
  and affecting both sexes equally, with a flagged wrong choice
  assuming X-linked dominant inheritance would ALSO always show up
  every generation in an indistinguishable way. Recovery path: state
  the specific distinguishing detail explicitly — X-linked dominant
  inheritance shows an affected father passing the trait to ALL
  daughters but NO sons, a specific asymmetry autosomal dominant
  inheritance does NOT show (autosomal dominant transmission is
  symmetric regardless of parent or offspring sex). Verification-of-
  death: the learner correctly distinguishes autosomal dominant from
  X-linked dominant inheritance using the father-to-offspring
  transmission pattern specifically, not generational persistence
  alone.

## Analogies

- **Best analogy — a coin with no memory, flipped once per
  pregnancy**: each child's genetic outcome is a fresh coin flip,
  fully independent of every previous flip — the coin does not "know"
  or "care" how the last several flips landed, exactly as each
  conception carries the same probability regardless of prior children's
  outcomes.
- **Alternative — reading a barcode's specific pattern, not just
  counting how many black bars appear**: diagnosing inheritance pattern
  from a pedigree requires reading the SPECIFIC pattern of
  transmission (who passes what to whom), not simply noting a
  surface feature like "appears every generation," which alone is
  insufficient to distinguish autosomal dominant from X-linked dominant.
- **Story analogy — the affected-father transmission signature**:
  tracing exactly which of an affected father's children (all
  daughters, no sons for X-linked patterns; all children equally for
  autosomal patterns) inherit a trait provides the decisive diagnostic
  detail, more informative than simply noting the trait's generational
  persistence.
- **ANTI-ANALOGY — do NOT say "since one child already has the
  condition, the odds are now in your favour for a healthy child next
  time"**: this reinforces exactly the gambler's-fallacy misconception
  (M1) the concept needs to correct.

## Demonstrations

- **Discrimination demonstration — the coin-flip-family simulation**:
  simulate (physically or numerically) repeated independent 1/4-
  probability "births" and show that even after several affected
  outcomes in a row, the next flip's probability remains exactly 1/4,
  directly targeting M1.
- **Teacher-demo — autosomal dominant vs. X-linked dominant father-
  transmission comparison**: present both patterns' pedigrees side by
  side, focusing specifically on an affected father's children, making
  the distinguishing asymmetry (X-linked: all daughters, no sons;
  autosomal: no such asymmetry) visually explicit, directly targeting
  M2.

## Discovery Questions

A genuine discovery design fits: **Need** — "two parents already have
one child with a genetic condition needing two recessive alleles —
does that make their next child MORE or LESS likely to be affected?"
**Playground** — the learner considers whether each conception depends
in any way on previous conceptions. **Invention** — the learner
proposes that each child's outcome must be a completely fresh,
independent probability, unaffected by previous children. **Collision**
— confronted with the intuitive "probability should even out" framing
(the gambler's fallacy), creating tension with the just-reasoned
conclusion. **Formalization** — the independence of each conception
event is stated explicitly, with the unchanging 1/4 probability
emphasised for every subsequent child. **Compression** — given a family
with several affected children in a row, the learner correctly states
the SAME probability for yet another child, without any adjustment.

## Teaching Sequence

Pedigree chart conventions and the four diagnostic inheritance patterns
should be taught with EXPLICIT father-to-offspring transmission details
for each pattern (not just generational-persistence summaries), since
relying on generational persistence alone is precisely what invites M2
(confusing autosomal dominant with X-linked dominant). The independence-
of-conception-events principle (targeting M1) should be introduced
early, ideally BEFORE any multi-child probability problems are
attempted, since M1 can silently corrupt every subsequent probability
calculation if left uncorrected.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (pedigree
chart conventions; the four diagnostic inheritance patterns, with
transmission-detail emphasis) → **Error Analysis** (the gambler's-
fallacy independence-of-events misconception) → **Discrimination**
(autosomal dominant vs. X-linked dominant father-transmission
comparison). **What doesn't fit**: teaching multi-child probability
problems before the independence-of-conception-events principle is
explicitly established.

## Voice Teaching Notes

Listen for a lower probability expected for a subsequent child because
an earlier child was already affected — M1's clearest verbal
signature. Also listen for a trait appearing in every generation
diagnosed as autosomal dominant without checking the father-to-
offspring transmission pattern — M2's signature. The load-bearing
sentence: "each pregnancy is its own fresh coin flip — the odds don't
change just because a previous child was affected." Channel-reality
limits owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank, supplemented by this
entry's own probe-depth batch addition. A learner who answers the
X-linked-recessive-affected-father `mcq` correctly but fails the
every-generation-must-be-autosomal-dominant `misconception_probe` has
M2 specifically — they understand ONE pattern's transmission details
but still conflate two different every-generation patterns, which
should route to the autosomal-vs-X-linked-dominant recovery rather than
re-teaching the affected-father case. The probe-depth batch's own
independent-conception-probability `short_answer` probe (Batch 11)
verifies the M1 independence-of-events reasoning specifically, distinct
from the pattern-diagnosis misconception check above.

## Tutor Recovery Strategy

Likeliest utterance: expecting a lower probability of a genetic
condition for a subsequent child after an earlier child was already
affected (not distress-shaped — a common, everyday-probability-
intuition-driven error, not a sign of confusion about the underlying
genetics). Concept-specific smaller question: "does a coin 'remember'
how it landed last time, or does every single flip have exactly the
same odds?" Generic recovery machinery owned by `../foundations/
01-recovery-engine.md`.

## Memory Hooks

**Type**: procedure (pedigree-reading and probability calculation) with
an embedded discrimination skill (autosomal vs. X-linked dominant
diagnosis) and a probability-independence skill (each conception as an
unrelated event). Review form: periodic re-presentation of a new
unlabelled pedigree for inheritance-pattern diagnosis, and periodic
re-presentation of a multi-child probability scenario to check for
gambler's-fallacy reasoning. Interleaving partners:
`bio.gen.chromosomal-theory-linkage` (this concept's own prerequisite,
providing the hemizygosity mechanism this concept applies) and
`bio.gen.population-genetics` (a direct KG unlock, scaling
individual-family probability up to population-level allele
frequencies).

## Transfer Connections

- **Near**: a new unlabelled pedigree, correctly diagnosed for
  inheritance pattern and used to calculate offspring probability.
- **Far**: recognising the same "sequential independent chance events
  incorrectly expected to 'balance out'" gambler's-fallacy structure
  elsewhere (e.g. assuming a roulette wheel is "due" for a colour after
  a streak, or a sports team is "due" for a win after several losses).
- **Real-world**: correctly interpreting genetic counselling risk
  estimates for prospective parents, understanding that a stated risk
  (e.g. 1/4) applies identically and independently to EACH pregnancy,
  not cumulatively or adjusted by prior outcomes.
- **Expert transfer**: on meeting any claim that a run of similar
  chance outcomes makes a different outcome "due" next, the learner
  spontaneously checks whether the events in question are actually
  independent, in which case no such adjustment is justified.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). A genuine, currently KG-unencoded
connection exists to mathematics's probability theory (independent
events, the gambler's-fallacy error itself being a well-studied
statistical misconception), which is the precise mathematical
foundation this concept's central misconception recovery depends on —
flagged below as Curriculum Feedback rather than fabricated as an
official cross-link.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.gen.pedigree-human-genetics.md` as of this entry's authoring
(confirmed by direct directory listing — biology has zero Blueprint
files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, both at gradeBand HIGH; `src/lib/teaching/assets/
biologyDepthSeedAssets.ts` (Batch 5, `bio.gen`) adds one further
`short_answer` probe at gradeBand HIGH, PROFICIENT difficulty (the
independent-conception-probability check), closing this concept to the
3-probe asset contract floor. No new asset created by authoring this
entry.

## Curriculum Feedback

A genuine, currently-missing `cross_links` edge to mathematics's
probability theory (independent events, the gambler's fallacy) would
make explicit the cross-subject foundation this concept's central
misconception recovery depends on — recorded as feedback to the
Curriculum Production Pipeline, not added locally.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, forty-second entry, strict KG-prerequisite order — first of
  the ninth recomputed frontier, from the 41-concept baseline). No
  Blueprint exists for this concept; both misconceptions classified
  directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
