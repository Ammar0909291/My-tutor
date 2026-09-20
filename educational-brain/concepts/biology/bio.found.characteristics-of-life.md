# Characteristics of Living Organisms — `bio.found.characteristics-of-life`

## Identity

- **Concept ID**: `bio.found.characteristics-of-life` (canonical biology KG)
- **Curriculum location**: biology / foundations
- **Prerequisites**: `bio.found.what-is-biology` — the load-bearing part
  is not any specific branch name, but the disposition this parent
  concept installs: that biological facts trace to discoverable
  mechanisms rather than arbitrary labels. A learner who still believes
  biology is pure recall (unrepaired M1 on the parent concept) will treat
  the seven characteristics below as seven more names to memorise rather
  than as a coherent, checkable definition.
- **Unlocks** (from KG): `bio.found.classification-need` (classification
  presupposes something worth classifying — "living things" as a
  well-defined category); `bio.found.microscopy-basics` (studying cells,
  the first characteristic below, motivates the tools that see them);
  `bio.found.biomes-levels-of-organisation` (levels of organisation build
  upward from the cell, this concept's own starting characteristic);
  `bio.found.unifying-themes-in-biology` (currently unauthored in this
  Educational Brain).
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.70 · **Est. hours**: 2

## Learning Objective

The learner can: name all seven characteristics of life (cellular
organisation, metabolism, homeostasis, growth, reproduction, response to
stimuli, heredity/evolution); explain, for a borderline case (fire, a
sterile mule, a self-replicating crystal, a virus), which characteristics
are present and which are absent, and conclude correctly whether the case
counts as alive; and explicitly reject the claim that any ONE
characteristic alone is sufficient or necessary in every individual
instance. A learner who can recite the seven-item list but who judges a
borderline case using only one criterion (as in M1 and M2 below) has not
achieved mastery.

## Core Understanding

Life is not defined by any single property but by the joint presence of
seven interacting properties: cellular organisation (built from one or
more cells), metabolism (chemical reactions that acquire and use
energy), homeostasis (actively maintaining a stable internal state
despite a changing environment), growth (an orderly, genetically
directed increase in size or complexity, not mere accumulation), 
reproduction (the capacity, at the level of the organism's species/
lineage, to produce offspring), response to stimuli (detecting and
reacting to environmental signals), and heredity with the capacity for
evolutionary change (transmitting — and, across generations, sometimes
changing — genetically encoded information). The test for "is this
alive" is a conjunction, not a single check: a candidate that shows most
of these but genuinely lacks one core property (fire has no cells, no
homeostasis, no heredity) is not alive, however much it superficially
resembles life on the properties it does share (growth, energy release).
Individual exceptions to a single characteristic (a sterile mule cannot
personally reproduce) do not disqualify an organism, because reproduction
is a property of the LINEAGE the organism belongs to, not a
per-individual requirement that every member must independently satisfy.

## Mental Models

- **Beginner model — "living things do X, Y, Z" as a flat checklist**:
  the learner can recite the seven properties as a list but treats them
  as independent, order-free facts to recall, with no sense that they
  interact or that borderline cases require weighing several at once.
  Shelf-life warning at installation: "the list is right, but real cases
  will test whether you actually understand each item — not just
  whether you can name it."
- **Intermediate model — "check them one at a time, in isolation"**: the
  learner applies the characteristics individually to a borderline case
  but stops at the first hit or miss (e.g. "it reproduces, so it's
  alive" or "it doesn't reproduce, so it's not alive") — the direct
  substrate of both M1 and M2 below. Upgrade trigger: a case (fire, a
  mule) where checking only one property gives the wrong verdict.
- **Advanced model — "the whole conjunction, correctly scoped per
  property"**: the learner checks all seven properties before
  concluding, AND applies each property at its correct scope
  (reproduction at the lineage level, not the individual; growth as
  genetically-directed increase, not any increase in size).
- **Expert model — "characteristics of life as a diagnostic framework,
  not a definition to recite"**: the learner uses the seven
  characteristics actively to evaluate genuinely novel or ambiguous
  cases they have never been told the answer to (an artificial
  self-replicating nanomachine; an extremophile; a prion) — the
  framework becomes a tool for reasoning about the boundary of life,
  not a memorised verdict list.
- **Do not upgrade early**: a learner who has not yet separated "this
  property is present" from "this property alone settles the question"
  (still at the intermediate model) should not be pushed to expert-level
  novel cases — they will apply the same single-criterion shortcut to a
  harder case and simply be wrong with more confidence.

## Why Students Fail

Two distinct failure mechanisms, requiring different repairs. M1 arises
because introductory biology instruction very often teaches "cells are
the basic unit of life" as the single, memorable headline fact before
the other six characteristics are even introduced — a learner who
internalises that headline as THE test for life will judge a
non-cellular but otherwise life-like case (fire) as failing for the
wrong reason (only missing cells) rather than the full reason (also
missing homeostasis and heredity). M2 arises from a genuine, true rule —
reproduction is a hallmark of every biological lineage — applied at the
wrong grain: the rule is true of species and lineages, and the learner
extends it, reasonably but incorrectly, down to every individual member
of that lineage.

## Misconceptions

No Blueprint exists yet for this concept (see Blueprint References
below); both misconceptions classified directly against the concept's
own seed content using the birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "A candidate fails to be alive because of exactly one missing
  characteristic (cells), even when several are actually missing" (Type
  5, instruction-induced)**: born from how cellular organisation is
  conventionally taught as introductory biology's single headline fact,
  ahead of the other six characteristics, so it becomes the reflexive
  first (and often only) check a learner runs. Matches Type 5's
  signature: near-universal across cohorts taught cells-first, and not
  a sign of low ability. Characteristic phrase: "it's not alive because
  it doesn't have cells" — offered as the WHOLE explanation for a case
  that also fails on other grounds. Verbatim detection probe (seed
  corpus, `misconception_probe`): "Why is fire NOT considered a living
  organism even though it consumes fuel, grows, and releases waste
  gases?" — the wrong choice reads "Fire is non-living only because it
  has no cells — the other characteristics do apply." Recovery path:
  hold the cells-check as correct but incomplete, and walk the SAME case
  through the remaining six characteristics explicitly, out loud, one at
  a time, so the learner sees the additional failures (no homeostasis,
  no heredity) rather than being told there are more. Verification-of-
  death: present a NEW borderline case and ask the learner to check all
  seven properties before answering, rather than stopping at the first
  one they check.
- **M2 — "An individual that cannot itself reproduce is therefore not
  alive" (Type 1, overgeneralization)**: the underlying rule
  (reproduction is a defining property of living lineages) is genuinely
  true and the learner has correctly learned it — the error is applying
  a lineage-level property as if it were a per-individual requirement,
  extending a real rule past its actual scope. Matches Type 1's
  signature exactly: the learner can state the rule correctly and will
  affirm it is true of species in general; the error appears specifically
  at the individual-exception boundary. Characteristic phrase: "it can't
  have babies, so it can't be alive." Verbatim detection probe (seed
  corpus, `mcq`): "A mule is sterile and cannot reproduce. Does this mean
  a mule is not alive?" — wrong choice "Yes — reproduction is essential,
  so a sterile organism is not alive." Recovery path: name the scope
  explicitly — "reproduction is a property of the SPECIES a mule belongs
  to (horses and donkeys both reproduce); the mule itself just can't,
  the same way an infertile human is still alive." Verification-of-
  death: the learner, given a new sterile-individual case (e.g. a worker
  ant), correctly identifies it as alive without prompting, citing the
  lineage-level reasoning unprompted.

## Analogies

- **Best analogy — a checklist with no single deciding item, like a
  medical diagnosis needing multiple symptoms together**: no one symptom
  alone confirms or rules out a diagnosis; a doctor weighs several
  findings jointly, and the same is true of judging whether something is
  alive. Breaking point: a medical diagnosis can sometimes be confirmed
  by one decisive test (a specific blood marker); "is it alive" has no
  single decisive property, which is a genuine disanalogy worth naming
  if a learner pushes on it.
- **Alternative — a sports team's roster requirements**: a team needs a
  full roster of DIFFERENT positions to function (a team of only
  strikers cannot play), not just "enough players" — useful for
  reinforcing that DIFFERENT KINDS of properties (not more of the same
  one) are what's required. Breaking point: a team can substitute one
  player type for another in a pinch; life's seven characteristics are
  not substitutable for each other.
- **Story analogy — the mule**: the concept's own worked example (a
  mule, sterile, still unquestionably alive) is a compact, memorable
  single-case argument against M2 specifically, and should be the
  learner's own go-to counterexample once repaired.
- **ANTI-ANALOGY — do NOT say "living things are like machines with
  seven required parts"**: a machine's parts are typically independent
  and swappable, and a machine missing one part is simply broken rather
  than in a genuinely different category — this risks suggesting that a
  fire "missing cells" is just a broken living thing rather than a
  fundamentally non-living one, softening exactly the distinction M1's
  repair is meant to sharpen.

## Demonstrations

- **Discrimination demonstration — fire vs. a candidate borderline
  case**: present fire (growth, energy release, waste production —
  strongly life-LIKE on several counts) side by side with a genuinely
  living but visually unremarkable case (a lichen, a seed) and ask the
  learner to run the full seven-property check on both, predicting the
  verdict before working through the list.
- **Discrimination demonstration — the mule**: present the mule scenario
  directly from the seed corpus and ask the learner to identify WHICH
  characteristic is in question (reproduction) and at WHAT scope
  (individual vs. lineage) before answering yes/no.
- **Teacher-demo — the depth-fix transfer probe's synthetic molecule**:
  a hypothetical lab molecule that increases in number, releases energy,
  and responds to pH, but has no membrane, no compartments, and cannot
  vary heritably — walking through why this fails despite passing
  several checks reinforces that the conjunction, not any subset, is the
  test.

## Discovery Questions

A genuine, argued discovery design fits here, unlike the parent concept:
**Need** — "fire grows, eats fuel, and produces waste — so is it alive?"
(the concept's own worked hook). **Playground** — the learner is given
the seven-property list and invited to check fire against each one.
**Invention** — the learner discovers, unprompted, that fire fails on
several properties at once (not just "no cells"), inventing the insight
that a SINGLE missing property understates the case. **Collision** — the
mule case is introduced next, where the learner's freshly-generalised
"missing one thing disqualifies it" heuristic from the fire case now
gives the WRONG answer (reproduction is missing, yet a mule is alive) —
this collision is what should surface M2 for repair. **Formalization** —
the explicit statement that reproduction is a lineage-level property
while cellular organisation, homeostasis, etc. are more directly
per-individual, so "missing one property" means different things
depending on which property it is. **Compression** — immediate
reapplication to a third case (a worker ant, or a post-menopausal
human) to confirm the corrected model transfers.

## Teaching Sequence

M1 must be addressed before M2: the fire case surfaces the general
"check ALL seven, not just one" principle in its most memorable form,
and only once that principle is installed does the mule case's more
subtle scope-of-reproduction distinction become teachable — introducing
the mule case first risks the learner concluding "some properties don't
count," a strictly worse misconception than either M1 or M2 alone. This
matches the concept's own seed-corpus ordering: the core explanation
introduces all seven properties and explicitly warns "no single property
alone is sufficient" using fire as the worked example, before the
misconception_repair pass and before the mule mcq.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (the seven
properties, stated plainly) → **Worked Example** (fire, walked through
property-by-property) → **Error Analysis** (the M1 misconception probe,
"why is fire not alive even though...") → **Prediction** (mule case,
predict before checking) → **Discrimination** (fire vs. a genuinely
living but unremarkable organism). **What doesn't fit**: a Game-family
action at this stage — the seven-property conjunction is still being
installed as a checklist habit, and gamifying it risks rewarding fast
single-property guesses (exactly M1/M2's shape) over the slower,
complete check the concept requires.

## Voice Teaching Notes

Listen for a verdict delivered after checking only ONE property out
loud ("it grows, so it's alive" or "it can't reproduce, so it's not") —
the SPEED and finality of that verdict, before any other property is
even mentioned, is the clearest voice signal of both M1 and M2, stronger
than a formal probe response. The load-bearing sentence: "check all
seven before you decide — missing one thing doesn't always mean the
same thing" — delivered slowly, especially the second clause, since it
is the part that distinguishes correctly-applied reasoning from a
shortcut. Channel-reality limits for voice signal capture are owned by
`../foundations/03-voice-first-learning-model.md §7`, cited, not
repeated.

## Assessment Signals

Seed corpus probes (see Runtime Asset References) are this concept's
item bank. Diagnostic interpretation this entry adds: on the fire
`misconception_probe`, an answer that correctly identifies fire as
non-living but for the WRONG reason (choosing the "only missing cells"
distractor, tagged M1 in the seed corpus) is a MORE informative signal
than a flatly wrong verdict — it shows the learner has the right
conclusion built on an incomplete check, which routes specifically to
the M1 repair (walk the other six properties), not to re-teaching
whether fire is alive at all. On the mule `mcq`, a fast, confident wrong
answer signals M2 in its cleanest form (the individual/lineage scope
error); a slow, hedged wrong answer more likely signals genuine
uncertainty about the seven-property list itself and should route back
to the list, not directly to the lineage-scope explanation. On the
depth-fix `short_answer` transfer probe (the synthetic lab molecule), any
answer concluding "alive" signals the learner is still working from a
subset of properties (the ones the molecule DOES satisfy) rather than
checking for the ones it is missing — this item is designed so the
correct answer requires explicitly naming an ABSENT property, not just
counting present ones.

## Tutor Recovery Strategy

Likeliest utterance: a confident wrong verdict delivered immediately
after checking one property (not distress-shaped — this is a
foundational, low-stakes concept). Concept-specific smaller question for
M1: "you're right that it has no cells — but let's check just one more
thing: does it keep a stable internal state the way your body keeps a
stable temperature?" — a single additional concrete check rather than
restating the full list. Concept-specific smaller question for M2: "if
a mule can't have babies, can horses in general? Whose job is
reproduction here — the mule's alone, or the whole species'?" — pointing
directly at the scope distinction rather than re-asserting the answer.
Generic recovery machinery is owned by `../foundations/
01-recovery-engine.md`, cited, not restated.

## Memory Hooks

**Type**: concept (a diagnostic framework), with an embedded
discrimination skill (correctly scoping each property). Review form: 
periodic re-presentation of a NEW borderline case (not fire, not the
mule) with a check on whether the learner runs the full seven-property
conjunction rather than a shortcut. Interleaving partners:
`bio.found.what-is-biology` (both concepts share the "look for the whole
picture, not one convenient fact" disposition, and mixed practice asking
"which branch, or which characteristic, applies here" strengthens both);
`bio.found.classification-need` once authored (classification presumes
a settled definition of "living," so revisiting borderline cases when
teaching classification is a natural, low-cost interleave).

## Transfer Connections

- **Near**: a new borderline case (a virus, a self-replicating crystal,
  a seed in dormancy) checked against all seven properties.
- **Far**: recognising the same "no single criterion is sufficient;
  check the whole set" structure in a non-biological domain (e.g.
  diagnosing a mechanical fault from multiple symptoms, or judging
  whether a startup is "viable" from several independent signals).
- **Real-world**: news or nature-documentary claims that something
  "seems almost alive" (self-replicating machines, complex weather
  systems, AI systems) examined against the seven-property conjunction.
- **Expert transfer**: on meeting any claim that something is or is not
  alive, the learner spontaneously runs the full seven-property check
  rather than accepting or rejecting the claim on the strength of one
  vivid property.

## Cross-Subject Connections

KG `cross_links` for this concept is empty (`[]`) — no KG-encoded
cross-subject edge exists, and none is fabricated here. A genuine but
KG-unencoded connection exists to chemistry's definition of a chemical
reaction system (fire IS a chemical reaction — rapid oxidation — and
contrasting "a reaction that releases energy" with "an organism that
metabolises" is a natural bridge to `chem.` combustion/thermodynamics
content once biology's own EB coverage of this concept is complete
enough to reference it); recorded here as an honest, weak-but-real
observation, not a claim that the KG should encode a direct biology-
chemistry edge for this specific pair.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.found.characteristics-of-life.md` as of this entry's authoring
(confirmed by direct directory listing — biology has zero Blueprint
files in total). Recorded as Curriculum Production Pipeline backlog
signal, not filled here.

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not independently
re-verified this session — see the parent concept's entry for the same
caveat): `src/lib/teaching/assets/biologySeedAssets.ts` carries
`core_explanation` and `misconception_repair` explanations plus `mcq`
and `misconception_probe` probes, all at gradeBand HIGH (canonicalSlug
pattern `bio.found.characteristics-of-life:{familyKind}:en:high`);
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 1) adds one
further `short_answer` probe at gradeBand HIGH, PROFICIENT difficulty,
closing this concept to the 3-probe asset contract floor. No new asset
created by authoring this entry.

## Curriculum Feedback

None found. This concept's four KG-listed unlocks
(`biomes-levels-of-organisation`, `classification-need`,
`microscopy-basics`, `unifying-themes-in-biology`) are each a plausible
direct consequence of accepting a well-defined notion of "living" —
no missing or misleading prerequisite/unlock edge identified.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, second entry, following strict KG-prerequisite order from the
  just-authored root). No Blueprint exists for this concept; both
  misconceptions classified directly against the concept's own seed
  content using the birth-taxonomy diagnostic procedure.
