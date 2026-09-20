# bio.eco.community-ecology — Community Ecology

## Identity
- **Concept ID**: `bio.eco.community-ecology`
- **Subject**: Biology
- **Domain**: Ecology (`bio.eco`)
- **Prerequisites**: `bio.eco.population-ecology`, `bio.eco.ecosystem-structure-function`
- **Unlocks**: none currently listed
- **Cross-links (KG)**: `bio.eco.biodiversity-conservation`
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can explain why species interactions and disturbance level shape community
diversity in non-obvious, non-monotonic ways — correctly predicting that removing a
keystone predator often reduces diversity, and that maximum diversity occurs at
intermediate rather than minimum disturbance.

## Core Understanding
Community ecology studies how multiple species sharing an area interact, and classifies
those interactions by their effect on each participant: competition (both harmed, −/−),
predation/parasitism (one harmed, one helped, −/+), mutualism (both helped, +/+),
commensalism (one helped, one unaffected, +/0), and amensalism (one harmed, one
unaffected, −/0).

Two ideas in this concept run directly counter to naive intuition, and both are the
actual teaching target. First: **keystone species** have effects on community structure
far out of proportion to their abundance — removing one (even though it may be numerically
rare) can trigger a **trophic cascade** that reshapes the entire community. The canonical
case is the Yellowstone wolf reintroduction: wolves are predators, yet their return
*increased* overall biodiversity, because controlling elk populations reduced overgrazing
of riparian vegetation, which recovered plant communities, which reduced erosion and
changed river morphology. Second: the **intermediate disturbance hypothesis** predicts
that species diversity peaks at *moderate* disturbance levels, not at the lowest possible
disturbance — too little disturbance allows competitive exclusion (the strongest
competitor dominates); too much disturbance eliminates species outright; moderate
disturbance keeps competitive exclusion from running to completion while not wiping
species out, so diversity is highest in the middle, not at either extreme.

Communities also change over time through **succession** — from pioneer species
colonizing bare substrate (primary succession) through a sequence of seral stages toward
a climax community.

## Mental Models
- **Disproportionate effect, not disproportionate abundance**: a keystone species'
  importance is measured by what happens to the community when it's removed, not by how
  common it is — a numerically rare species can still be structurally central.
- **The diversity-vs-disturbance curve is a hump, not a slope**: diversity does not
  simply increase as disturbance decreases; it rises, peaks at an intermediate level, and
  falls again — both "more disturbance" and "less disturbance" can move you further from
  the peak, depending which side you're on.
- **Cascades propagate through trophic levels**: a change at one trophic level (top
  predator) can ripple down through multiple levels (herbivore → vegetation → physical
  landscape) — effects are not confined to the level where the change occurred.

## Why Students Fail
1. They apply a simple, monotonic "predators are destructive" intuition, since predation
   is visibly harmful to individual prey, and do not distinguish individual-level harm
   from community-level structural effects.
2. They assume "less disturbance is always better for diversity" by extrapolating
   linearly from the true but partial fact that severe disturbance destroys diversity,
   without considering what happens at the opposite (zero-disturbance) extreme.
3. They do not yet have competitive exclusion as an available mechanism, so they cannot
   explain *why* an undisturbed community would have lower diversity than a moderately
   disturbed one — the hump shape looks arbitrary without that causal link.

## Misconceptions

### M1 — "Predators/keystone species always reduce biodiversity" (Type 1: Overgeneralization)
**Statement**: Since predators kill and remove individual organisms, adding a predator to
or removing a predator from a community should straightforwardly decrease and increase
biodiversity respectively.
**Origin**: Generalizing from the individual-level fact (predation removes individual
organisms, which is locally harmful to that organism) to a community-level claim
(predation reduces overall diversity), without the intermediate mechanism of competitive
release/exclusion.
**Why it persists**: The direct, visible effect of a predator (killing prey) is far more
salient than the indirect, delayed, multi-step effect (trophic cascade improving
vegetation and reducing erosion), so the intuitive causal story stops one step too early.
**Repair**: Trace the Yellowstone cascade explicitly step by step — wolves reduce elk →
elk overgrazing of riparian vegetation decreases → vegetation recovers → erosion
decreases and river morphology stabilizes → overall biodiversity increases — showing the
predator's net community effect is the sum of an indirect multi-step chain, not just the
direct kill.
**Diagnostic probe**: the existing misconception_probe asking how wolf reintroduction can
increase biodiversity if wolves kill other animals, with the "not possible" distractor
flagged to this misconception.

### M2 — "The least-disturbed community always has the highest diversity" (Type 2: Perceptual intuition)
**Statement**: Diversity should increase monotonically as disturbance decreases, so an
undisturbed, mature community will have the most species.
**Origin**: A true partial fact (severe disturbance destroys species and reduces
diversity) is extrapolated linearly to the opposite extreme without separately
considering that an undisturbed community allows the strongest competitor to exclude
others over time via competitive exclusion.
**Why it persists**: "Disturbance is destructive" is repeatedly reinforced by examples of
severe disturbance (clear-cutting, fire) with obvious diversity loss, making the
low-disturbance end of the scale feel safely default-good by contrast, without
independent evidence being sought for that end specifically.
**Repair**: Directly compare three disturbance levels (none, moderate, severe) rather
than only two, and ask what stops the strongest competitor from dominating in the
undisturbed case — moderate disturbance periodically resets that competitive process
before it reaches exclusion, which is precisely why the peak sits in the middle.
**Diagnostic probe**: the existing probe-depth short_answer comparing a moderately
disturbed forest patch's higher diversity against both an undisturbed old-growth patch
and a heavily disturbed clear-cut patch, correctly identifying the intermediate
disturbance hypothesis as the governing principle.

## Analogies
- The falling-domino cascade: a change at the top (predator) topples effects down through
  each subsequent level, not just the one directly touched.
- A garden left completely untended for years versus one occasionally (not constantly)
  disturbed by weeding: the occasionally-disturbed garden can support more different
  plant types because no single aggressive species gets the uninterrupted time needed to
  crowd everything else out.

## Demonstrations
- Diagram the Yellowstone trophic cascade as a labeled chain (wolves → elk → riparian
  vegetation → erosion/river morphology → biodiversity), having students predict each
  arrow's direction before revealing it.
- Sketch the diversity-vs-disturbance curve as a hump (not a line) and have students place
  three labeled points (severe clear-cut, moderate tree-fall, undisturbed old-growth) on
  it before being told where they actually fall.

## Discovery Questions
- "Wolves kill elk — an obviously harmful, direct effect. So why did bringing wolves back
  to Yellowstone increase overall biodiversity rather than decrease it?"
- "If less disturbance were always better for diversity, an untouched, ancient forest with
  zero disturbance should have the highest diversity of any forest. Is that actually true?"
- "What could stop the single strongest competing species from eventually taking over an
  undisturbed community completely?"

## Teaching Sequence
1. Introduce the five interaction types (competition, predation/parasitism, mutualism,
   commensalism, amensalism) as a classification system before any specific case study.
2. Present the keystone species concept, defined explicitly by disproportionate effect
   relative to abundance, not by abundance itself.
3. Walk the Yellowstone wolf case as a multi-step causal chain, having students predict
   each link before it's revealed, to directly confront the predators-always-reduce-
   diversity intuition.
4. Introduce competitive exclusion as the missing mechanism that explains why an
   undisturbed community is not automatically the most diverse one.
5. Present the intermediate disturbance hypothesis as the resolution: moderate
   disturbance interrupts competitive exclusion without eliminating species outright,
   producing a diversity peak in the middle of the disturbance scale.
6. Close with succession (pioneer → seral stages → climax) as the temporal dimension of
   community change, connecting disturbance-driven community reset to the successional
   process that follows it.

## Tutor Actions
- If a student predicts wolf removal/reintroduction effects using only the direct kill
  count: ask them to trace at least two further downstream steps before accepting their
  answer — do not let the reasoning stop at the first-order effect.
- If a student ranks disturbance levels by assuming "less is always better": ask them to
  specifically name what happens to the strongest competitor in a zero-disturbance
  scenario over a long time period.
- If a student cannot connect competitive exclusion to the disturbance-diversity curve's
  shape: return to `bio.eco.population-ecology`'s competition content before re-explaining
  the intermediate disturbance hypothesis in isolation.

## Voice Teaching Notes
Say "trace the chain past the first arrow" when a student's prediction stops at the
direct predator-prey interaction, to explicitly signal that cascades require multi-step
reasoning. Say "diversity peaks in the middle, not at either end" rather than "moderate
disturbance is good," to make the hump-shaped relationship (not a simple good/bad
valence) the thing being taught.

## Assessment Signals
- **Early recovery**: after tracing the Yellowstone cascade once, correctly predicts the
  direction of a novel keystone-removal scenario (e.g. sea otters and kelp forests)
  without needing the full chain re-walked.
- **Fragile**: can recite "moderate disturbance maximizes diversity" as a memorized
  statement but cannot explain why zero disturbance would produce lower diversity than
  moderate disturbance.
- **Deep gap**: continues to rank "no disturbance" as the highest-diversity condition
  even after the competitive exclusion mechanism has been explicitly taught — indicates
  the causal link between competition and disturbance was never actually connected, only
  each fact was learned in isolation.

## Tutor Recovery Strategy
For M1, do not just re-assert "predators can increase diversity" — have the student
re-derive the causal chain themselves for a *different* keystone example (not
Yellowstone) to confirm the reasoning transfers rather than being case-specific
memorization. For M2, explicitly connect back to competitive exclusion from
`bio.eco.population-ecology`: ask what happens to a weaker competitor over unlimited time
with no disturbance to reset the competition, before re-presenting the disturbance curve.

## Memory Hooks
- "Keystone: it's the effect that's disproportionate, not the population."
- "Wolves fixed a river — trace the whole chain, not just the kill."
- "Diversity peaks in the middle. Zero disturbance is not the safe maximum."

## Transfer Connections
- `bio.eco.population-ecology`: supplies the competition and competitive exclusion
  mechanism this concept depends on to explain the disturbance-diversity hump.
- `bio.eco.ecosystem-structure-function`: the trophic-level structure that a cascade
  propagates through was established there; this concept applies it to a specific,
  counter-intuitive real case.
- `bio.eco.biodiversity-conservation` (cross-linked in the KG): applies both the keystone-
  species and intermediate-disturbance principles directly to conservation management
  decisions (e.g. controlled burns as intentional intermediate disturbance).

## Cross-Subject Connections
No cross-subject link is authored here; the KG's own `cross_links` field already connects
this concept within biology to `bio.eco.biodiversity-conservation`.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
intermediate-disturbance short_answer probe, using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (UNDERGRADUATE band): interaction types, keystone species/trophic
  cascades, succession, intermediate disturbance hypothesis —
  `biologySeedAssets.ts`, `COMMECO_EXPLANATIONS[0]`.
- `misconception_repair` (UNDERGRADUATE band): Yellowstone wolf cascade repairing the
  predators-always-reduce-diversity assumption — `COMMECO_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): keystone species definition, abundance-based distractor flagged to
  M1 — `COMMECO_PROBES[0]`.
- `misconception_probe` (PROFICIENT): Yellowstone biodiversity-increase explanation task,
  "not possible" distractor flagged to M1 — `COMMECO_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 6): three-way disturbance-level
  comparison isolating the intermediate disturbance hypothesis, closing this concept's
  3-probe floor and directly evidencing M2's diagnostic — `biologyDepthSeedAssets.ts`,
  conceptId `bio.eco.community-ecology`.

## Curriculum Feedback
The KG description additionally names the competitive exclusion principle (Gause's law),
character displacement, niche partitioning, island biogeography theory, and species
diversity indices (Shannon, Simpson) as part of this concept's scope, but the existing
seed corpus covers only interaction types, keystone species/trophic cascades, succession,
and the intermediate disturbance hypothesis — Gause's law, character displacement, niche
partitioning, island biogeography, and diversity indices have zero explanation or probe
content. This EB entry is scoped strictly to what is actually taught in the seed corpus;
the remaining KG-named subtopics are a genuine content gap flagged here as Curriculum
Feedback, not fabricated.

## Version History
- 2026-09-20: Initial authoring (tenth recomputed topological frontier, batch of 3 with
  `bio.mol.dna-replication` and `bio.cell.cell-membrane-transport`), EB concept 47/199.
