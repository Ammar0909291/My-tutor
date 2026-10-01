# Five Kingdom Classification — `bio.found.five-kingdom`

## Identity

- **Concept ID**: `bio.found.five-kingdom` (canonical biology KG)
- **Curriculum location**: biology / foundations
- **Prerequisites**: `bio.found.classification-need` — the load-bearing
  part is the accepted principle that classification reflects real,
  testable biology (shared ancestry) rather than arbitrary labelling;
  Whittaker's five kingdoms are a specific, concrete application of that
  principle at the broadest rank.
- **Unlocks** (from KG): `bio.found.viruses-viroids-lichens` (a case
  that sits OUTSIDE the five-kingdom system, motivated directly by
  having a settled system to compare against); `bio.div.three-domain-
  system`, `bio.div.fungal-biology`, `bio.div.animal-body-plans-
  symmetry` (all currently unauthored in this Educational Brain).
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.70 · **Est. hours**: 3

## Learning Objective

The learner can: name Whittaker's five kingdoms (Monera, Protista,
Fungi, Plantae, Animalia) and state the defining criterion of each (cell
type, body organisation, mode of nutrition); correctly place a
described organism into the right kingdom using those criteria, even
when a superficial feature (visual resemblance, immobility) suggests a
different kingdom; and explain specifically why Fungi are not a
subdivision of Plantae.

## Core Understanding

Whittaker's five-kingdom system sorts all life using three
criteria applied together: cell type (prokaryotic vs. eukaryotic),
body organisation (unicellular vs. multicellular), and mode of
nutrition (autotrophic — makes its own food — vs. heterotrophic —
consumes or absorbs food from elsewhere). Monera is separated from the
other four kingdoms by cell type alone (prokaryotic). Among the
eukaryotic kingdoms, Protista is unicellular; Fungi, Plantae, and
Animalia are multicellular but are distinguished from each other by
nutrition mode and structure: Fungi are absorptive heterotrophs
(secreting digestive enzymes externally, then absorbing the products)
with chitin cell walls; Plantae are autotrophs with cellulose cell walls
and chlorophyll; Animalia are ingestive heterotrophs with no cell walls
at all. Visual resemblance is not a reliable classification criterion —
fungi resemble plants in growth habit (stationary, growing upward) but
are placed in their own kingdom, and are in fact phylogenetically closer
to animals than to plants, because the three defining criteria, not
appearance, determine placement.

## Mental Models

- **Beginner model — "five boxes for five kinds of living things"**: the
  learner can name the five kingdoms as a list without yet using the
  three underlying criteria to justify why an organism belongs in one
  box rather than another.
- **Intermediate model — "classify mainly by what it looks like"**: the
  direct substrate of M1 — a learner classifying fungi as plants because
  both look stationary and plant-like. Upgrade trigger: the fungi/plant
  contrast, worked through the actual criteria (nutrition mode, cell
  wall material) rather than appearance.
- **Advanced model — "classify using the three defining criteria, not
  appearance"**: the learner correctly places organisms using cell
  type, body organisation, and nutrition mode even when appearance is
  misleading.
- **Expert model — "five-kingdom system as one historical snapshot, not
  the final word"**: the learner recognises Whittaker's system as a
  specific, once-influential classification later refined by molecular
  evidence (e.g. the three-domain system, this concept's own unlock),
  and can explain why classification systems are revised as evidence
  improves.
- **Do not upgrade early**: a learner still classifying by appearance
  (intermediate model, unrepaired M1) should not be pushed toward the
  three-domain system's molecular refinements — without first accepting
  that criteria, not appearance, drive classification, the newer
  system's molecular evidence will seem like an arbitrary change rather
  than a genuine improvement in evidence quality.

## Why Students Fail

M1 arises because fungi genuinely share several visually salient
features with plants (stationary growth, upward growth, visible
fruiting structures resembling plant parts) that are far more available
to casual observation than the underlying, invisible criteria (nutrition
mode, cell wall chemistry) that actually determine classification — a
learner reasonably classifies by the features they can most easily see,
absent explicit instruction to check the less visible criteria instead.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure (`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Fungi are a type of plant, since they look plant-like" (Type
  2, perceptual intuition)**: built from a lifetime of casual visual
  observation (mushrooms, moulds appear stationary and plant-like) with
  no explicit rule ever taught that says "looks like a plant = is a
  plant" — the belief forms from raw, unlabelled perceptual experience,
  matching Type 2's signature: it can persist even in a learner who can
  correctly state the criteria when asked directly, because the
  perceptual pull toward "stationary and green-ish/plant-shaped = plant"
  competes with the correct model rather than simply being absent.
  Characteristic phrase: "mushrooms are just non-green plants."
  Verbatim detection probe (seed corpus, `misconception_probe`): "Why
  are fungi placed in a separate kingdom rather than with Plantae?"
  Recovery path: per Type 2's repair implication, verbal restatement of
  the criteria is insufficient — use the concrete, checkable contrast
  (a plant makes its own food via photosynthesis; a fungus secretes
  enzymes externally and absorbs the products — ask the learner to name
  which of the two a mushroom does, not to recall the rule).
  Verification-of-death: given a new fungus example (not a mushroom),
  the learner correctly explains its kingdom placement using nutrition
  mode, without appearance entering the justification — and, per Type
  2's documented regrowth pattern, this should be re-checked periodically
  rather than assumed permanently repaired.
- **M2 — "Protista (unicellular eukaryotes) is confused with Monera
  (prokaryotes) as the kingdom containing prokaryotic organisms" (Type
  4, notation-induced)**: the seed corpus's own `mcq` distractor pattern
  shows "Protista" chosen when asked which kingdom is prokaryotic — both
  names begin with similar Greek-derived prefixes evoking "primitive/
  first" ("Proto-," "Mon-") and are typically listed adjacently in the
  five-kingdom sequence, so the visual/list-position similarity of the
  two names plausibly drives the confusion independent of understanding
  either kingdom's actual content. Characteristic phrase: naming
  "Protista" when asked for the prokaryotic kingdom. Verbatim detection
  probe (seed corpus, `mcq`): "Which kingdom contains organisms that are
  prokaryotic?" Recovery path: anchor Monera to its own name's root
  ("Monera" relates to "single/simple," matching "no nucleus, simplest
  cell type") and contrast it directly against Protista's defining
  feature (eukaryotic, unicellular) side by side. Verification-of-death:
  given the two names presented in reverse or shuffled order, the
  learner correctly matches "prokaryotic" to Monera without hesitation.

## Analogies

- **Best analogy — sorting by function, not by appearance (a plumber vs.
  an electrician wearing similar work clothes)**: two tradespeople may
  look alike from a distance (same overalls, same toolbelt shape), but
  what they actually DO (nutrition mode, in the biological case) is what
  sorts them correctly. Breaking point: professions are self-reported
  and don't have a "wrong" classification the way biological criteria
  do — useful for the look-past-appearance structure, not for teaching
  the criteria's content.
- **Alternative — a chef vs. a customer at a restaurant**: the chef
  MAKES the food (autotroph-like); the customer CONSUMES food made by
  someone else (heterotroph-like) — directly maps onto the
  autotroph/heterotroph distinction that separates Plantae from
  Fungi/Animalia.
- **Story analogy — the mushroom (the concept's own worked example)**:
  a mushroom looks plant-like but eats like neither a plant nor a
  typical animal — it "digests outside its body first," a memorable,
  slightly unsettling detail that tends to stick.
- **ANTI-ANALOGY — do NOT say "kingdoms are like colour-coded folders,
  sort by what a thing looks like"**: this directly reinforces M1 by
  suggesting visual sorting is the correct method.

## Demonstrations

- **Discrimination demonstration — mushroom vs. a green plant, criterion
  by criterion**: walk through cell wall material (chitin vs.
  cellulose), nutrition mode (absorptive vs. photosynthetic), and body
  organisation side by side for a mushroom and a green plant, having the
  learner predict the mushroom's kingdom BEFORE being told.
- **Discrimination demonstration — Monera vs. Protista, name-anchored**:
  present both names together with their defining feature and drill the
  contrast explicitly to counter the name-similarity confusion (M2).

## Discovery Questions

A genuine discovery design fits: **Need** — "here's a mushroom. It
doesn't move, it grows upward like a plant, and it has no green colour
because it doesn't need sunlight the way plants do — so is it a plant?"
**Playground** — the learner examines mushroom features against a green
plant's features side by side. **Invention** — the learner proposes
their own sorting criterion (visual similarity, most likely). **Collision**
— shown that fungi digest food EXTERNALLY and absorb it, unlike
either typical plants or animals — a genuinely surprising fact that
breaks the visual-sorting heuristic. **Formalization** — the three
defining criteria (cell type, body organisation, nutrition mode) are
introduced as the actual sorting rule. **Compression** — the learner
classifies a new organism (e.g. a protozoan) using the three criteria.

## Teaching Sequence

M1 (fungi mistaken for plants) should be addressed before M2 (Monera/
Protista name confusion) — M1's repair installs the general principle
"sort by criteria, not appearance/name," which directly helps prevent
M2's more superficial name-similarity error from taking hold in the
first place.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (the five
kingdoms and their three criteria) → **Discrimination** (mushroom vs.
green plant, criterion by criterion) → **Error Analysis** (both
misconception probes) → **Classification/Sorting** (a new, unfamiliar
organism assigned to a kingdom). **What doesn't fit**: teaching the five
kingdoms as a flat memorised list without the mushroom contrast — this
is exactly the presentation that leaves the visual-sorting heuristic
(M1) unchallenged.

## Voice Teaching Notes

Listen for "plant" used casually to describe a fungus ("that mushroom
plant") — M1's clearest verbal signature. Listen for a fast, confident
"Protista" answer to the prokaryotic-kingdom question, paired with
otherwise-correct recall of Protista's own actual definition when asked
separately — this pattern (correct definition, wrong retrieval under
the specific "which is prokaryotic" phrasing) is M2's signature. Channel-
reality limits owned by `../foundations/03-voice-first-learning-model.md
§7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. On the prokaryotic-
kingdom `mcq`, a fast wrong answer of "Protista" combined with correct
performance on other Protista-related items isolates M2 as a
name-retrieval confusion rather than a conceptual gap — route to the
name-anchoring recovery, not to re-teaching what Protista actually is.

## Tutor Recovery Strategy

Likeliest utterance: confidently calling a fungus a plant, or naming
Protista for the prokaryotic-kingdom question (not distress-shaped).
Concept-specific smaller question for M1: "does a mushroom make its own
food with sunlight, the way a plant does — or does it get food some
other way?" Concept-specific smaller question for M2: "which name sounds
like 'simple, no nucleus' — Monera, or Protista?" Generic recovery
machinery owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (a three-criterion sorting system) with an embedded
factual component (five kingdom names and their defining features).
Review form: periodic re-presentation of a new, unfamiliar organism to
classify using the three criteria. Interleaving partners: `bio.found.
viruses-viroids-lichens` (this concept's own KG unlock — a case that
sits deliberately OUTSIDE the five-kingdom system, and contrasting "in
the system" vs. "outside the system" cases strengthens both).

## Transfer Connections

- **Near**: a new organism, correctly classified using the three
  criteria.
- **Far**: recognising the same "sort by underlying function/mechanism,
  not surface appearance" structure in a non-biological domain (e.g.
  categorising software by what it actually does, not by its icon or
  name).
- **Real-world**: a news report describing a newly discovered organism
  and predicting which kingdom it likely belongs to from the described
  features.
- **Expert transfer**: on meeting any new organism description, the
  learner spontaneously checks the three defining criteria before
  guessing from appearance.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.found.five-kingdom.md` as of this entry's authoring (confirmed by
direct directory listing — biology has zero Blueprint files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, all at gradeBand HIGH. No `biologyDepthSeedAssets.ts` probe
exists yet for this concept — it currently holds 2 gradeable probes,
below the 3-probe asset contract floor; recorded honestly, not fixed
here (probe-depth authoring for the remaining `bio.found` concepts
outside the already-closed 8 is a separate, not-yet-reached workstream
in this program). No new asset created by authoring this entry.

## Curriculum Feedback

None found. This concept's four KG-listed unlocks are each a plausible
direct consequence of having a settled five-kingdom baseline to extend
or contrast against.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, seventh entry, strict KG-prerequisite order). No Blueprint
  exists for this concept; both misconceptions classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
