# Binomial Nomenclature — `bio.found.binomial-nomenclature`

## Identity

- **Concept ID**: `bio.found.binomial-nomenclature` (canonical biology
  KG)
- **Curriculum location**: biology / foundations
- **Prerequisites**: `bio.found.classification-need` — the load-bearing
  part is the taxonomic hierarchy's Genus and Species ranks; binomial
  nomenclature is literally the naming convention for exactly those two
  ranks together.
- **Unlocks**: none listed in the KG — this is a terminal leaf of the
  foundations domain's classification thread.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.70 · **Est. hours**: 2

## Learning Objective

The learner can: write a scientific name correctly (genus capitalised,
species lowercase, whole name italicised); explain why the genus name
alone is never abbreviated on FIRST use but may be on subsequent use,
while the species name is NEVER used alone; and explain why a
standardised, worldwide naming system is needed given that common names
vary by language and region.

## Core Understanding

Linnaeus's binomial system assigns every species a unique two-part
Latin name — Genus species — that functions as an internationally
recognised, unambiguous identifier, replacing common names that vary
confusingly by region and language (the word "robin" refers to entirely
different birds in the UK, Erithacus rubecula, and the USA, Turdus
migratorius). The formatting rules exist to make the name instantly
recognisable as a scientific binomial wherever it appears in text: the
genus is capitalised, the species epithet is lowercase, and the whole
name is italicised (or underlined by hand). The species epithet is
never meaningful on its own — it identifies a specific species only
within the context of its genus, since the same species epithet can be
reused across different, unrelated genera. Because of this dependency,
the genus may be abbreviated to a single initial once the full name has
already appeared once in a given document (Homo sapiens → H. sapiens on
later mentions), but the species epithet is never used alone, since
doing so discards the very information (which genus) that makes it
identify anything.

## Mental Models

- **Beginner model — "scientific names are just fancy Latin words for
  organisms"**: the learner accepts that organisms have Latin names
  without yet understanding the two-part structure's actual logic
  (genus + species, each contributing necessary information).
- **Intermediate model — "the species part is the 'real' name, since
  it's the more specific one"**: the direct substrate of M1 — treating
  the species epithet as sufficient on its own because it feels like the
  more precise, final piece of information. Upgrade trigger: the
  Panthera leo / hypothetical "Helianthus leo" contrast, showing the
  same epithet can attach to entirely different organisms under
  different genera.
- **Advanced model — "the whole binomial as one indivisible identifying
  unit"**: the learner correctly writes and reads full binomials and
  understands why abbreviation is genus-only, never species-only.
- **Expert model — "binomial nomenclature as the practical payoff of
  the taxonomic hierarchy"**: the learner connects this naming
  convention back to the hierarchy itself — the binomial name is a
  compressed reference to exactly the two most specific ranks (genus,
  species) of the full eight-rank system, and understands why compressing
  to just those two ranks (rather than all eight) is sufficient for
  unique identification in practice.
- **Do not upgrade early**: a learner who still treats the species
  epithet as independently meaningful (intermediate model, unrepaired
  M1) should not be pushed toward author-citation or ICBN/ICZN
  convention details — those conventions assume the genus-dependency
  point is already secure.

## Why Students Fail

M1 arises because the species epithet is, in ordinary conversation,
often the more memorable or distinctive-sounding word (e.g. "sapiens"
feels like the interesting, specific part, while "Homo" feels generic),
so a learner naturally gravitates toward treating it as sufficient on
its own — nothing in casual encounters with binomial names (seeing them
used correctly in text) makes the genus-dependency explicit, since a
correctly-written name always shows both parts together and never
demonstrates what goes wrong if the species part is used alone.

## Misconceptions

No Blueprint exists yet for this concept; the misconception classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure (`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "The species epithet alone (e.g. 'sapiens') identifies the
  organism, without needing the genus" (Type 1, overgeneralization)**:
  the learner correctly understands that species is the MOST SPECIFIC
  rank (a true, learned fact) and overgeneralizes "most specific = most
  identifying" into "most specific = sufficient on its own" — extending
  a genuinely correct idea about specificity past the point where the
  epithet's meaning actually depends on its paired genus. Matches Type
  1's signature: the underlying fact (species is the most specific rank)
  is true and the learner can state it correctly; the error is
  specifically at the boundary of what that specificity implies about
  standalone use. Characteristic phrase: writing "sapiens" alone as if
  it identifies humans. Verbatim detection probe (seed corpus,
  `misconception_probe`): "A student writes 'sapiens' as the scientific
  name of humans. What is missing?" Recovery path: the concept's own
  worked hypothetical — a different genus, "Helianthus," could
  hypothetically also have a species called "leo" — same word,
  completely different organism, demonstrating concretely that the
  epithet alone carries no fixed meaning. Verification-of-death: the
  learner, given a bare species epithet with no genus, spontaneously
  states that it cannot identify anything on its own.

## Analogies

- **Best analogy — a surname requiring a first name for a full
  identity, like "Smith" alone not identifying one specific person**:
  the genus is like a family name shared across many members; the
  species epithet, alone, is like a nickname that recurs across
  unrelated families and identifies nothing specific by itself. Breaking
  point: human names don't reuse first names across families in a way
  that changes the person's identity the way a reused species epithet
  changes across genera — useful for the "needs both parts" structure,
  not a perfect structural match.
- **Alternative — a street address needing both street name and city**:
  "5th Avenue" alone could be in many cities; "5th Avenue, New York"
  pins it down — directly parallel to genus (city-level scope) + species
  (street-level specificity within that scope).
- **Story analogy — Panthera leo vs. the hypothetical "Helianthus leo"
  (the concept's own worked example)**: the same word, "leo," attached
  to two entirely different, unrelated genera — the cleanest possible
  demonstration that the epithet alone means nothing.
- **ANTI-ANALOGY — do NOT say "the species name is like someone's most
  personal, unique nickname"**: "unique" framing directly reinforces M1
  by suggesting the epithet alone is sufficiently identifying.

## Demonstrations

- **Teacher-demo — the Helianthus leo hypothetical**: present "leo" as
  a bare word and ask the learner what organism it identifies (nothing,
  without a genus) — then reveal it could belong to Panthera (lion) or,
  hypothetically, Helianthus (a plant genus), driving home the
  dependency concretely.
- **Discrimination demonstration — abbreviation rules**: present three
  candidate abbreviations of a name already used once in a passage
  ("H. sapiens," "Homo s.," "sapiens") and have the learner identify
  which is correctly formed and why.

## Discovery Questions

Direct instruction is the argued choice: this concept is scoped at
"apply" Bloom level around a fixed, historically-settled naming
CONVENTION (formatting and abbreviation rules), not a discoverable
biological principle — there is no "need → collision → formalization"
arc for a convention that is simply a rule agreed upon by taxonomists.
The Helianthus leo demonstration is the closest approach to discovery,
surfacing the genus-dependency point through a concrete case before the
rule is stated outright, but the formatting rules themselves are given
directly.

## Teaching Sequence

The formatting rules (capitalisation, italicisation) should be
introduced before the abbreviation rule, since abbreviation is a
special case that only makes sense once the learner already recognises
the full two-part form; and the genus-dependency point (M1's territory)
should be addressed specifically before or alongside teaching WHY
abbreviation is genus-only, never species-only — the same underlying
fact (the epithet needs its genus) explains both the misconception and
the abbreviation asymmetry.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (formatting
rules) → **Worked Example** (Homo sapiens → H. sapiens on second use) →
**Error Analysis** (the "sapiens" alone misconception probe) →
**Discrimination** (correctly- vs. incorrectly-formed abbreviations).
**What doesn't fit**: a Game-family action — this is a formatting/
convention skill best built through direct correction of written
examples, not a game mechanic.

## Voice Teaching Notes

Listen for the species epithet used alone in speech ("it's a sapiens")
— M1's clearest verbal signature. The load-bearing sentence: "the
species name by itself means nothing — it only means something attached
to its genus" — delivered right after or during the Helianthus leo
demonstration. This concept's core evidence is largely written/
formatting-based (capitalisation, italics) rather than purely oral, so
some diagnostic signal (correct capitalisation) is only fully checkable
in written work; channel-reality limits for the oral portion owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. On the formatting
`mcq`, a wrong choice of "Homo Sapiens" (both words capitalised) or
"homo sapiens" (neither capitalised) signals a formatting-rule gap
distinct from M1 — these should route to re-teaching the capitalisation
rule directly, not to the genus-dependency recovery, since they reflect
a different failure than treating the epithet as independently
meaningful.

## Tutor Recovery Strategy

Likeliest utterance: using the species epithet alone in speech or
writing (not distress-shaped — foundational, low-stakes concept).
Concept-specific smaller question: "if I just say 'leo' with no other
word, do you know what organism I mean? What if I add 'Panthera' in
front?" Generic recovery machinery owned by `../foundations/
01-recovery-engine.md`.

## Memory Hooks

**Type**: procedure (a formatting/writing convention) with an embedded
concept (genus-dependency). Review form: periodic re-presentation of a
name to format correctly, plus occasional bare-epithet checks to verify
M1 stays repaired. Interleaving partners: `bio.found.classification-
need` (revisiting the genus/species ranks strengthens both).

## Transfer Connections

- **Near**: a new organism's binomial name, correctly formatted and
  correctly abbreviated on a simulated "second use."
- **Far**: recognising the same "a component only means something in
  the context of its parent" structure in other naming systems (e.g. a
  file name without its folder path, or a phone extension without the
  main number).
- **Real-world**: reading a scientific article or nature documentary
  that uses binomial names and correctly parsing genus vs. species from
  the formatting alone.
- **Expert transfer**: on encountering any abbreviated scientific name
  in the wild, the learner spontaneously recognises it as a
  second-or-later use and expects the full name to have appeared
  earlier in the same text.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.found.binomial-nomenclature.md` as of this entry's authoring
(confirmed by direct directory listing — biology has zero Blueprint
files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, all at gradeBand HIGH. No `biologyDepthSeedAssets.ts` probe
exists yet for this concept — it currently holds 2 gradeable probes,
below the 3-probe asset contract floor; recorded honestly, not fixed
here. No new asset created by authoring this entry.

## Curriculum Feedback

None found. This concept has no KG-listed unlocks — a genuine terminal
leaf of the foundations domain's classification thread, not an
oversight (confirmed directly against the live KG's `unlocks: []`).

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, eighth entry, strict KG-prerequisite order). No Blueprint
  exists for this concept; the misconception classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
