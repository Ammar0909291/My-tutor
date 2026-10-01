# Organisms and their Environment — `bio.eco.organism-environment`

## Identity

- **Concept ID**: `bio.eco.organism-environment` (canonical biology KG)
- **Curriculum location**: biology / ecology (`bio.eco`) — this is the
  first `bio.eco` concept authored in this Educational Brain.
- **Prerequisites**: `bio.found.biomes-levels-of-organisation` — the
  load-bearing part is the population/community/ecosystem distinction,
  since habitat and niche are properties examined at the organism and
  population level within that larger hierarchy.
- **Unlocks** (from KG): `bio.eco.population-ecology` — already
  seed-content-covered in `biologySeedAssets.ts` (`bio.eco.population-
  ecology`, though not yet authored in this Educational Brain);
  population-level dynamics presuppose the habitat/niche vocabulary this
  concept establishes.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.70 · **Est. hours**: 3

## Learning Objective

The learner can: distinguish habitat (where an organism lives) from
niche (its functional ecological role); classify a given environmental
factor as abiotic or biotic; explain the competitive exclusion
principle and why two species cannot indefinitely share the exact same
niche; and distinguish adaptation (genetic, evolutionary-timescale) from
acclimatisation (physiological, within-lifetime).

## Core Understanding

An organism's habitat is the physical PLACE it lives — an address; its
niche is its functional ROLE within that place — what it eats, when it
is active, how it reproduces, and how it interacts with other species,
analogous to a profession rather than a location. This distinction
matters because two species CAN share a habitat (the same pond) without
sharing a niche (different feeding strategies, different activity
times), and the competitive exclusion principle states that two species
cannot indefinitely occupy the exact same niche in the same habitat —
sustained identical competition for identical resources will eventually
lead one species to outcompete the other. Environmental factors
affecting an organism split into abiotic (non-living: temperature,
light, water, soil chemistry, pH) and biotic (living: food sources,
predators, competitors, parasites, mutualists). Organisms respond to
their environment at two different timescales: adaptation is a
heritable, genetically-encoded trait shaped by natural selection over
many generations (a cactus's spines and water-storing stem); 
acclimatisation is a reversible, physiological adjustment an individual
makes within its own lifetime (e.g. producing more red blood cells at
high altitude), with no genetic change and no transmission to offspring.

## Mental Models

- **Beginner model — "habitat and niche both mean 'where it lives'"**:
  the learner has encountered both terms without yet separating location
  from functional role — the direct substrate of M1.
  Shelf-life warning: "these two words sound similar but answer
  completely different questions — WHERE versus WHAT DOES IT DO."
- **Intermediate model — "habitat is location, niche is 'what it does,'
  but the two can't be checked independently yet"**: the learner can
  state the definitions but struggles to correctly separate them when
  given a mixed description (as in the lion scenario below).
- **Advanced model — "habitat and niche cleanly separated, and
  competitive exclusion correctly applied"**: the learner can extract
  the habitat and niche from a mixed description and correctly reason
  about whether two species described can coexist.
- **Expert model — "niche as the organising ecological concept, driving
  community structure"**: the learner understands niche differentiation
  as the underlying reason ecological communities contain many
  coexisting species (each occupying a distinct niche) rather than one
  dominant species monopolising a habitat.
- **Do not upgrade early**: a learner who still conflates habitat and
  niche (intermediate model, unrepaired M1) should not be pushed toward
  competitive exclusion reasoning — that principle is specifically about
  niche overlap, and a learner who cannot separate the two terms will
  reason about the wrong variable (location) rather than the correct one
  (functional role).

## Why Students Fail

Ordinary English uses "niche" loosely to mean something close to
"a particular spot or place" (a "niche market," "a niche in the wall")
— this everyday sense collides directly with ecology's precise,
role-based technical meaning, and a learner's first encounter with the
term in a biology class carries the everyday spatial connotation with
it, predisposing them to treat niche as a location synonym for habitat
rather than as a functional-role concept.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure (`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Niche means the same thing as habitat — a place, not a
  functional role" (Type 3, language contamination)**: the everyday
  sense of "niche" (a spot, a location) collides with ecology's precise
  functional-role meaning. Matches Type 3's cleanest diagnostic test:
  rephrasing away from the word "niche" toward "what does it DO in its
  environment" typically resolves the confusion immediately, since the
  content itself is not difficult — only the word's dual meaning is.
  Characteristic phrase: describing an organism's niche purely in terms
  of location ("its niche is the savanna"). Verbatim detection probe
  (seed corpus, `mcq`): "A lion's ecological niche includes being a top
  predator that hunts large herbivores on grasslands. Which of the
  following best describes the HABITAT of the lion?" — wrong choice
  reuses the niche description ("Top predator of large herbivores") as
  if it answered the habitat question. Recovery path: per Type 3's
  repair implication, name the collision explicitly as a word problem —
  "this is one of those words that means something different in biology
  than it does in everyday speech; 'niche' here means JOB, not
  location" — and re-check with the word "niche" temporarily replaced
  by "ecological job." Verification-of-death: given a new organism
  description, the learner correctly sorts location-type details into
  habitat and role-type details into niche without needing the word
  "niche" avoided.
- **M2 — "Multiple species can permanently share the exact same
  ecological niche" (Type 1, overgeneralization)**: the learner correctly
  observes that many species visibly coexist in the same habitat and
  overgeneralizes "they coexist" into "they must occupy the same niche,"
  missing that stable coexistence in nature is itself evidence of niche
  DIFFERENTIATION (each species doing something at least slightly
  different), not niche identity. Matches Type 1's signature: the
  observation driving the error (many species coexist) is genuinely
  true; the extension (therefore same niche) is the boundary-crossing
  step. Characteristic phrase: "lots of species live together fine, so
  they must have the same role." Verbatim detection probe (seed corpus,
  `misconception_probe`): "Can two different species permanently occupy
  exactly the same ecological niche in the same habitat?" Recovery path:
  point to a real coexisting pair the learner already knows and ask what
  is DIFFERENT about how each makes a living, even though they share a
  habitat — surfacing the actual niche differentiation underlying the
  observed coexistence. Verification-of-death: given two coexisting
  species, the learner spontaneously identifies at least one difference
  in their ecological roles rather than assuming identical niches.

## Analogies

- **Best analogy — an address vs. a job title**: "123 Main Street" is a
  habitat-like fact (where); "software engineer" is a niche-like fact
  (what role, what function) — two completely different kinds of
  information about the same person. Breaking point: a person's job and
  address are both freely changeable by choice; an organism's niche is
  shaped by evolution over generations, not chosen — worth noting if a
  learner pushes on the comparison.
- **Alternative — a shared office building with different job roles**:
  many people (species) share one building (habitat) while doing
  completely different jobs (niches) — directly supports the "shared
  habitat, different niche" structure that resolves M2.
- **Story analogy — the lion (the concept's own worked example)**: "top
  predator hunting large herbivores" is niche; "African savanna
  grassland" is habitat — a single, memorable case carrying M1's repair
  directly.
- **ANTI-ANALOGY — do NOT say "niche is like a corner or nook in the
  ecosystem"**: this directly reinforces the everyday spatial sense of
  "niche" that IS the misconception (M1), rather than countering it.

## Demonstrations

- **Discrimination demonstration — sort the lion facts**: present a
  scrambled list of facts about the lion (grassland, top predator, hunts
  large herbivores, found in Africa) and have the learner sort each into
  "habitat" or "niche" before checking.
- **Teacher-demo — competitive exclusion, worked from a familiar
  coexisting pair**: pick two species the learner already knows coexist
  and walk through what is actually different about their niches,
  demonstrating that apparent "same niche" coexistence dissolves under
  closer inspection.

## Discovery Questions

A genuine discovery design fits: **Need** — "a lion lives on the African
savanna and hunts large herbivores. Are 'savanna' and 'hunts large
herbivores' the same KIND of fact about the lion?" **Playground** — the
learner sorts several mixed facts about a familiar organism.
**Invention** — the learner proposes that some facts are about WHERE
and some are about WHAT IT DOES. **Collision** — presented with two
species that clearly coexist in the same habitat, and asked whether this
means they must have identical niches — surfacing M2 if it exists.
**Formalization** — habitat and niche are formally defined, and
competitive exclusion is stated as the principle resolving the
coexistence puzzle. **Compression** — the learner analyses a new
organism, separating habitat from niche and identifying what makes its
niche distinct from a coexisting species'.

## Teaching Sequence

M1 (habitat/niche conflation) must be resolved before M2 (same-niche
coexistence) is addressed — a learner who has not yet separated the two
terms cannot meaningfully evaluate whether two coexisting species share
a NICHE (as opposed to merely a habitat), since they may still be
answering the wrong question (do they share a location) rather than the
intended one (do they share a functional role).

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (habitat vs.
niche, address vs. job title) → **Classification/Sorting** (lion facts
sorted into habitat/niche) → **Error Analysis** (both misconception
probes) → **Worked Example** (competitive exclusion via a familiar
coexisting pair). **What doesn't fit**: introducing the word "niche"
without immediately flagging its everyday-vs-technical double meaning —
the Standard's Type-3 repair implication specifically calls for naming
the collision at the point of teaching, not after the misconception has
already formed.

## Voice Teaching Notes

Listen for "niche" used to answer a WHERE question (rephrase and
recheck: does the same answer work if "niche" is temporarily swapped
for "ecological job"?) — M1's cleanest verbal signature, and per Type
3's own diagnostic test, the error should specifically correlate with
the word "niche" itself rather than with genuine content difficulty.
Listen for "they both live there, so they must do the same thing" as an
unprompted justification — M2's signature. The load-bearing sentence:
"niche is a job, not a place" — short, and worth returning to verbatim
whenever the confusion recurs. Channel-reality limits owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. On the lion `mcq`, the
seed corpus deliberately reuses the NICHE description itself as the
wrong "habitat" answer — a learner selecting it is showing M1 in its
purest form (mistaking a role-description for a location-description),
distinct from a learner who simply doesn't know either term. On the
coexistence `misconception_probe`, a confident, fast "Yes" answer
signals M2 cleanly; a hedged or slow "Yes" more likely signals general
uncertainty about competitive exclusion rather than the specific
overgeneralization M2 describes, and should route to reviewing the
principle's statement rather than directly to the coexisting-pair
recovery question.

## Tutor Recovery Strategy

Likeliest utterance: answering a habitat question with a niche-shaped
answer, or vice versa (not distress-shaped — foundational, low-stakes
concept). Concept-specific smaller question for M1: "if I ask WHERE
something lives, versus WHAT JOB it has in that place — are those the
same question?" Concept-specific smaller question for M2: "you said
these two species live in the same pond. Do they eat the exact same
food, at the exact same time of day?" Generic recovery machinery owned
by `../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (a two-term distinction plus a principle). Review
form: periodic re-presentation of a mixed-fact organism description,
checking correct habitat/niche sorting. Interleaving partners:
`bio.eco.population-ecology` (this concept's own KG unlock — population
dynamics build directly on the niche vocabulary this concept
establishes).

## Transfer Connections

- **Near**: a new organism description, correctly sorted into habitat
  and niche facts.
- **Far**: recognising the same "location vs. functional role" structure
  outside biology (e.g. a business's office address vs. its market
  position/business model).
- **Real-world**: a nature documentary describing where an animal lives
  and how it survives there — parsing which statements are habitat and
  which are niche.
- **Expert transfer**: on meeting any new species description, the
  learner spontaneously separates location facts from role facts before
  reasoning about competition or coexistence.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.eco.organism-environment.md` as of this entry's authoring (confirmed
by direct directory listing — biology has zero Blueprint files in
total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, all at gradeBand HIGH. No `biologyDepthSeedAssets.ts` probe
exists yet for this concept (the `bio.eco` domain has not yet been
reached by the probe-depth campaign, which has so far closed `bio.found`
and `bio.cell`) — it currently holds 2 gradeable probes, below the
3-probe asset contract floor; recorded honestly, not fixed here. No new
asset created by authoring this entry.

## Curriculum Feedback

None found. This concept's sole KG-listed unlock
(`bio.eco.population-ecology`) is a direct, sensible consequence of
establishing habitat/niche vocabulary first.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, ninth entry, strict KG-prerequisite order — first `bio.eco`
  concept authored in this Educational Brain). No Blueprint exists for
  this concept; both misconceptions classified directly against the
  concept's own seed content using the birth-taxonomy diagnostic
  procedure.
