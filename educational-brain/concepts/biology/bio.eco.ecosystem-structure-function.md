# Ecosystem Structure and Function — `bio.eco.ecosystem-structure-function`

## Identity

- **Concept ID**: `bio.eco.ecosystem-structure-function` (canonical
  biology KG)
- **Curriculum location**: biology / ecology (`bio.eco`)
- **Prerequisites**: `bio.eco.population-ecology` — the load-bearing
  part is population interactions (competition, predation, mutualism,
  etc.), which this concept scales UP from pairs of interacting
  populations to whole communities organised into producer/consumer/
  decomposer roles connected by energy flow.
- **Unlocks** (from KG): `bio.eco.nutrient-cycling`,
  `bio.eco.community-ecology`, `bio.eco.microbial-ecology` — the
  producer/consumer/decomposer roles and the energy-flow/10%-law
  framework established here are the direct prerequisite for reasoning
  about matter cycling (which uses decomposers' role explicitly),
  community-level interactions, and microbial ecology's own
  decomposer-centred focus.
- **Difficulty**: developing · **Bloom**: analyze · **Mastery
  threshold**: 0.70 · **Est. hours**: 4

## Learning Objective

The learner can: distinguish an ecosystem's biotic and abiotic
components; classify organisms as producers, consumers, or decomposers
and state each role's function; construct and interpret a simple food
chain or food web; state and apply the 10% law (only about 10% of
energy transfers from one trophic level to the next, the rest lost as
heat) to compute energy available at a given trophic level; and
correctly distinguish energy FLOW (one-way, lost as heat) from matter
CYCLING (reused indefinitely) rather than treating the two as following
the same rules.

## Core Understanding

An ecosystem consists of two interacting components: biotic (living
organisms) and abiotic (non-living physical/chemical factors —
temperature, light, water, soil chemistry). Among the biotic
component, three functional roles structure how energy and matter move
through the system: producers (autotrophs — plants, algae, some
bacteria) fix light energy into chemical energy via photosynthesis;
consumers (heterotrophs) obtain energy by eating producers or other
consumers; decomposers (bacteria, fungi) break down dead organic
matter, releasing its locked nutrients back into the abiotic
environment for producers to use again. Energy moves through this
system along food chains, which interconnect into food webs when
multiple feeding relationships are considered together. Energy transfer
between trophic levels is drastically inefficient: the 10% law states
that only about 10% of the energy present at one trophic level is
captured and stored in biomass at the next level up, with the
remaining roughly 90% lost as metabolic heat (used for movement,
maintenance, and other life processes that do not become new biomass
available to a consumer). This inefficiency compounds at every
transfer, which is why food chains rarely extend beyond four or five
links (the energy remaining at a hypothetical sixth level would be too
little to support a viable population) and why biomass/energy pyramids
have a broad producer base narrowing sharply toward top predators.
Critically, energy and matter behave fundamentally differently in this
system: matter (the actual carbon, nitrogen, and other atoms) is never
lost — it cycles indefinitely between organisms and the physical
environment via decomposition and re-uptake — while energy flows in one
direction only, entering from the sun (or, in rare ecosystems, chemical
sources) and permanently exiting as heat at every trophic transfer,
requiring continuous fresh input to sustain the system.

## Mental Models

- **Beginner model — "producers, consumers, and decomposers are just
  vocabulary for a food chain diagram"**: the learner can label a
  diagram's roles correctly but treats the labels as static categories
  rather than as functionally connected steps in one energy-and-matter
  system.
- **Intermediate model — "energy and matter both cycle through the
  ecosystem"**: the direct substrate of this concept's central
  misconception — since decomposers clearly participate in BOTH energy
  transfer (a trophic level) and matter recycling (breaking down
  organic matter), the two processes' distinct fates (energy lost as
  heat vs. matter physically reused) get conflated. Upgrade trigger:
  being shown that an ecosystem STOPS functioning without continuous new
  solar energy input, even though its matter (carbon, nitrogen) never
  runs out on its own.
- **Advanced model — "quantitative energy-flow reasoning via the 10%
  law"**: the learner can compute energy available at any given trophic
  level from a stated starting quantity, correctly applying the 90%
  loss at EACH successive transfer (compounding, not a single flat
  deduction).
- **Expert model — "ecosystem structure as the biophysical explanation
  for food-chain length and pyramid shape"**: the learner explains WHY
  food chains are short and WHY biomass pyramids narrow toward the top,
  deriving both facts from the 10% law rather than treating them as
  separate memorised observations.
- **Do not upgrade early**: a learner who still believes energy cycles
  the way matter does should not be advanced to quantitative 10%-law
  computation — without first separating the two, "how much energy is
  left after five transfers" risks being answered with a matter-cycling
  intuition ("it just keeps circulating") rather than a correct,
  compounding-loss calculation.

## Why Students Fail

Decomposers are the single organism-role that participates visibly in
BOTH systems at once — they consume dead matter for energy (a trophic,
energy-related act) AND they release the matter's locked nutrients back
into the soil (a matter-cycling act) — and because both processes are
taught together, in the same breath, using the same organisms as the
worked example, the two processes' fundamentally different fates
(energy dissipated as heat vs. matter physically conserved and reused)
are easily merged into one undifferentiated "decomposers recycle
everything" idea.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Energy cycles through ecosystems the same way matter does"
  (Type 1, overgeneralization)**: born from decomposers' genuine dual
  role (both a trophic level receiving energy AND the agent that
  releases matter for reuse) being overgeneralized into "everything
  decomposers touch gets recycled, including energy." Matches Type 1's
  signature: a real, correct fact about decomposers' matter-cycling role
  stretched past its actual scope to cover energy too. Characteristic
  phrase: describing energy as being "recycled," "reused," or
  "returned to producers" the way carbon or nitrogen is. Verbatim
  detection probe (seed corpus, `misconception_probe`): "Matter cycles
  through ecosystems indefinitely. Does energy also cycle?" Recovery
  path: state the one-way energy flow explicitly — sun → producers →
  consumers → heat, permanently lost at each step — and contrast it
  directly against the closed-loop matter cycle using the SAME
  decomposer example, showing the same organism doing two different
  things (one process reused, one process not). Verification-of-death:
  the learner correctly explains why an ecosystem would collapse without
  continuous sunlight, even though its atoms never run out.
- **M2 — "Energy transfer efficiency between trophic levels is close to
  50% or higher" (Type 2, perceptual intuition)**: born from an
  everyday, intuitive assumption that "eating" transfers most of a
  food's value to the eater (as it broadly feels true for a human diet
  providing most of a meal's calories), without accounting for how much
  of a prey organism's own energy was already spent on its own
  metabolism, movement, and heat production before ever being eaten.
  Matches Type 2's signature: a plausible-feeling, everyday intuition
  about "how much of X transfers," not a taught error. Characteristic
  phrase: estimating trophic transfer efficiency well above the actual
  ~10%. Verbatim detection probe (seed corpus, `mcq`): "Approximately
  what percentage of energy is transferred from one trophic level to
  the next in a food chain?" (50% is the flagged wrong choice). Recovery
  path: break down where the "missing" ~90% actually goes — an
  organism's own respiration, movement, and heat production consume the
  vast majority of the energy it takes in, before any of it could
  become new biomass available to something eating it. Verification-
  of-death: the learner correctly computes energy remaining after
  multiple successive 10% transfers without reverting to a higher
  intuitive percentage.

## Analogies

- **Best analogy — a leaky bucket brigade passing water (energy) up a
  hill, vs. reusable buckets themselves (matter) collected and refilled
  at the bottom**: at every hand-off, most of the water spills (heat
  loss) and only a small fraction reaches the next person, while the
  buckets themselves (matter) are never lost — they get collected and
  reused indefinitely once emptied.
- **Alternative — an inheritance tax at each generation, vs. the family
  heirloom itself**: money (energy) shrinks substantially at each
  transfer (like tax deducted at each generation); the heirloom object
  itself (matter) simply passes on and can eventually be repurposed or
  recycled without being "used up."
- **Story analogy — tracing a single carbon atom vs. a single joule of
  solar energy**: the carbon atom's story (plant → cow → CO2 →
  atmosphere → plant again, indefinitely) contrasted directly against
  the solar joule's story (sun → plant → cow → dissipated as heat,
  gone for good) — same ecosystem, two entirely different fates.
- **ANTI-ANALOGY — do NOT say "energy and nutrients both flow through
  the food chain"**: using "flow" for both, without distinguishing
  one-way flow (energy) from closed-loop cycling (matter), directly
  installs M1.

## Demonstrations

- **Discrimination demonstration — "where does it go?" tracing**: give
  the learner a specific carbon atom's journey and a specific solar
  energy unit's journey through the same simple food chain, in parallel,
  and have them predict each one's ultimate fate before being told.
- **Teacher-demo — the 10% law arithmetic chain**: starting from a
  stated producer energy quantity, walk the calculation through three or
  four successive trophic transfers explicitly, showing the numbers
  shrink by roughly 90% at each step, making the compounding-loss
  pattern visually and numerically concrete.

## Discovery Questions

A genuine discovery design fits: **Need** — "if a food chain just keeps
recycling energy the way it recycles carbon, why can't ecosystems run
forever on the same store of energy, with no sunlight?" **Playground** —
the learner traces both a carbon atom and a solar energy unit through
the same food chain. **Invention** — the learner proposes that carbon
comes back around but energy might not. **Collision** — confronted with
the fact that most everyday language ("energy flows through the food
chain") sounds like it could mean cycling too, creating ambiguity to
resolve. **Formalization** — the one-way energy flow vs. closed-loop
matter cycle distinction is stated explicitly, with the heat-loss
mechanism named. **Compression** — given a new ecosystem scenario, the
learner correctly predicts what would happen to it if the sun
disappeared (collapse) versus if decomposition somehow stopped
(nutrient lock-up, but not the same immediate energy crisis).

## Teaching Sequence

Producer/consumer/decomposer roles and simple food-chain construction
should be secure before the 10% law is introduced, since the law's
quantitative claims only make sense once the learner has a concrete
food chain to apply them to. The energy-vs-matter distinction (M1)
should be introduced immediately after decomposers are first discussed
— not later, as an afterthought correction — since decomposers are
exactly where the two processes visibly overlap and where the
conflation risk is highest.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation**
(producer/consumer/decomposer roles, food chains/webs) → **Quantitative
Reasoning** (10% law arithmetic across multiple transfers) → **Error
Analysis** (the energy-vs-matter-cycling misconception probe). **What
doesn't fit**: teaching decomposers' matter-cycling role without
explicitly flagging that their ENERGY role (as a trophic level) follows
different rules.

## Voice Teaching Notes

Listen for "energy is recycled" or "energy cycles back to producers" —
M1's clearest verbal signature, often triggered right after discussing
decomposers. Also listen for trophic transfer efficiency estimated well
above 10% — M2's signature. The load-bearing sentence: "carbon comes
back around forever; energy goes through once and is gone as heat — an
ecosystem needs the sun every single day, not just at the start."
Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A learner who answers
the 10%-transfer-percentage `mcq` correctly but fails the energy-cycles-
like-matter `misconception_probe` has M1 specifically intact — they know
the correct NUMBER but still believe energy loops back, which should
route to the carbon-vs-energy-tracing recovery rather than re-teaching
the percentage. A learner who fails the `mcq` itself (over-estimating
efficiency) has M2 and needs the "where does the missing 90% go"
breakdown first. The probe-depth batch's own compounding-three-transfer
`short_answer` probe verifies the expert-model quantitative reasoning
specifically.

## Tutor Recovery Strategy

Likeliest utterance: confidently stating that energy "gets recycled" or
"goes back to the plants" when explaining what happens after a consumer
dies (not distress-shaped — a common, reasonable-sounding overextension
of a correct fact about matter). Concept-specific smaller question: "if
you left an ecosystem completely sealed off from any new sunlight, but
its carbon and nitrogen stayed exactly where they were, would it keep
running?" Generic recovery machinery owned by `../foundations/
01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (ecosystem role structure) with an embedded
quantitative-reasoning skill (10%-law compounding computation) and a
discrimination skill (energy flow vs. matter cycling). Review form:
periodic re-presentation of a new food-chain scenario for both energy
computation and the carbon-vs-energy fate question. Interleaving
partners: `bio.eco.nutrient-cycling` (the direct KG unlock, and this
concept's own natural energy-vs-matter contrast partner) and
`bio.eco.population-ecology` (this concept's own prerequisite).

## Transfer Connections

- **Near**: a new food chain, correctly analysed for trophic roles and
  energy availability at each level.
- **Far**: recognising the same "one-way flow vs. closed-loop cycling"
  structural distinction elsewhere (e.g. money spent and gone vs. a
  physical asset that can be resold and reused).
- **Real-world**: understanding why eating lower on the food chain
  (plant-based diets) is more energy-efficient per calorie consumed than
  eating higher up — a direct, practical consequence of the 10% law's
  compounding loss.
- **Expert transfer**: on meeting any claim that "X cycles through a
  system," the learner spontaneously checks whether X is actually
  conserved (like matter) or dissipated (like energy), rather than
  assuming all system components follow the same rule.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). A genuine, currently KG-unencoded
connection exists to physics's first and second laws of thermodynamics
(energy conservation and the inevitability of heat loss/entropy
increase at each transformation), which is the precise physical
principle underlying the 10% law and the energy-vs-matter distinction —
flagged below as Curriculum Feedback rather than fabricated as an
official cross-link.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.eco.ecosystem-structure-function.md` as of this entry's authoring
(confirmed by direct directory listing — biology has zero Blueprint
files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (DEVELOPING) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 6, `bio.eco`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty (the compounding three-trophic-transfer quantitative check),
closing this concept to the 3-probe asset contract floor. No new asset
created by authoring this entry.

## Curriculum Feedback

A genuine, currently-missing `cross_links` edge to physics's laws of
thermodynamics would make explicit the cross-subject principle
underlying this concept's central energy-vs-matter distinction —
recorded as feedback to the Curriculum Production Pipeline, not added
locally.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, twenty-second entry, strict KG-prerequisite order — second of
  the frontier recomputed from the 20-concept baseline). No Blueprint
  exists for this concept; both misconceptions classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
