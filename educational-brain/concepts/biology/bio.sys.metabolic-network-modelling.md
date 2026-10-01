# bio.sys.metabolic-network-modelling — Metabolic Network Modelling

## Identity
- **Concept ID**: `bio.sys.metabolic-network-modelling`
- **Subject**: Biology
- **Domain**: Systems Biology (`bio.sys`)
- **Prerequisites**: `bio.sys.gene-regulatory-networks`, `bio.plant.plant-respiration`
- **Unlocks**: `bio.sys.synthetic-biology`
- **Cross-links (KG)**: (none)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 7

## Learning Objective
The student can correctly explain that Flux Balance Analysis (FBA) finds a STEADY-STATE
flux distribution (not a dynamic time-course simulation of changing metabolite
concentrations), and correctly identify regulatory constraints (whether a reaction's
enzyme is actually EXPRESSED) as a specific limitation FBA does not incorporate, even
though FBA correctly predicts gene essentiality from stoichiometric feasibility alone.

## Core Understanding
Metabolic network modelling represents cellular metabolism as a system of
stoichiometrically balanced reactions connecting metabolites through enzyme-catalysed
steps. The **stoichiometric matrix S** (reactions × metabolites) compactly encodes ALL
mass-balance constraints for the network: at steady state, the net production of EVERY
internal metabolite must equal zero (**Sv = 0**, where v is the flux vector — the rate
at which each reaction proceeds). **Flux Balance Analysis (FBA)** uses linear
programming to find the specific flux distribution that MAXIMISES a chosen biological
objective (typically growth rate or ATP yield) while satisfying these stoichiometric
constraints (plus any additional capacity constraints) — critically, FBA achieves this
WITHOUT requiring knowledge of enzyme KINETICS, which is a major practical advantage
specifically for genome-scale models, where kinetic parameters for every enzyme are
rarely all known. **Genome-scale metabolic models (GEMs)**, reconstructed directly from
annotated genomes, now exist for hundreds of organisms; they successfully predict GENE
ESSENTIALITY (computationally delete a reaction → does growth become impossible? → that
gene is predicted essential) and guide metabolic engineering for biotechnology
applications. Constraint-based methods like FBA are complemented by KINETIC models
(ordinary differential equations using Michaelis-Menten or other mechanistic rate laws)
specifically when temporal DYNAMICS and saturation effects genuinely need to be
captured — a task FBA itself is not designed for.

The single most important corrective idea in this concept concerns precisely what FBA
does and does not model. FBA is sometimes casually described as "simulating
metabolism," but this framing is misleading: FBA is NOT a dynamic simulation — it finds
a STEADY-STATE flux distribution that satisfies the given constraints and optimises the
chosen objective; it does NOT track how metabolite CONCENTRATIONS change over TIME, and
it does NOT predict transient responses to a perturbation (e.g., a sudden nutrient
pulse). Beyond the dynamics limitation, FBA also does NOT directly model
THERMODYNAMICS (a reaction can appear stoichiometrically feasible in the matrix while
actually being thermodynamically irreversible inside the real cell), does NOT
incorporate REGULATORY constraints (a specific enzyme's gene must actually be EXPRESSED
for that reaction to carry real flux — the model itself carries every stoichiometrically
possible reaction WITHOUT knowing whether its corresponding enzyme is actually
expressed under the specific condition being modelled), and does NOT model SATURATION
(kinetic effects are ignored entirely; substrate concentrations are not tracked at
all). These are not defects in the sense of flaws to be fixed casually — FBA's
considerable practical POWER comes precisely from requiring only stoichiometry and a
stated objective, both of which are far more readily available at genome scale than
full enzyme kinetics would be. But this means FBA predicts the FEASIBLE SOLUTION SPACE
of possible flux distributions, not a single, uniquely determined biological
prediction, unless additional constraints (such as regulatory information) are
specifically added.

## Mental Models
- **FBA as a single frozen frame, not a movie**: FBA answers "given these constraints,
  what is the BEST steady-state flux distribution?" — a single frozen frame representing
  one particular, optimised operating state — not a MOVIE showing how the system's
  concentrations actually change moment to moment over time.
- **Stoichiometrically possible is not the same as actually happening**: think of the
  stoichiometric matrix as listing every reaction that COULD, in principle, balance
  correctly on paper — but whether that reaction ACTUALLY carries flux in a real cell
  additionally depends on whether the corresponding enzyme gene is switched ON, which
  the stoichiometry-only model has no way of checking by itself.

## Why Students Fail
1. They describe FBA as "simulating metabolism" in the dynamic sense, missing that FBA
   specifically finds a STEADY-STATE flux distribution and does not track metabolite
   concentrations changing over time.
2. They assume that if a reaction is stoichiometrically FEASIBLE in the model, it must
   actually be OCCURRING in the real cell, missing that FBA does not check whether the
   corresponding enzyme's gene is actually EXPRESSED under the modelled condition.
3. They treat FBA's limitations (no dynamics, no regulation, no kinetics) as flaws that
   undermine its usefulness, missing that these limitations are precisely what make FBA
   practical at genome scale, where full kinetic data is rarely available.

## Misconceptions

No Blueprint exists yet for this concept, and this concept DOES have existing seed
content in `biologySeedAssets.ts` (`METABNET_EXPLANATIONS`/`METABNET_PROBES`) and a
probe-depth short_answer in `biologyDepthSeedAssets.ts` (Batch 13) — confirmed via
direct grep before authoring. Both misconceptions below are classified directly against
that existing seed content, following the same evidence-grounded procedure used
throughout this authoring campaign.

### M1 — "FBA simulates how metabolite concentrations change over time" (Type 4: Notation/mechanism-induced)
**Statement**: FBA is understood as a DYNAMIC simulation tool capable of predicting how
a cell's metabolite concentrations change moment-to-moment over a specific time course
(e.g., following a nutrient pulse), rather than as a method that finds a single
steady-state flux distribution.
**Origin**: The word "simulating" is loosely applied to FBA in casual usage, and without
an explicit distinction between STEADY-STATE optimisation (what FBA actually does) and
DYNAMIC time-course modelling (what kinetic/ODE models do instead), the two can blend
into a single undifferentiated "computational metabolism model" category.
**Why it persists**: FBA and dynamic kinetic models are often discussed together as
complementary "metabolic modelling" approaches, which can obscure that only ONE of the
two (kinetic/ODE models) is actually designed to track concentrations over time.
**Repair**: State explicitly that FBA finds a STEADY-STATE flux distribution satisfying
mass-balance constraints (Sv = 0) and optimising an objective — it does NOT track
metabolite concentrations changing over time, and does NOT predict transient responses
to a perturbation. Dynamic, time-resolved questions specifically require KINETIC models
(ODEs with Michaelis-Menten or other mechanistic rate laws), which is a genuinely
DIFFERENT modelling approach from FBA.
**Diagnostic probe**: the existing misconception_probe presenting a student's attempt to
use FBA to model a 60-minute glucose-pulse time course, with the FBA-can-model-time-
courses-given-enough-points distractor flagged to this misconception.

### M2 — "A reaction stoichiometrically feasible in an FBA model is guaranteed to actually occur in the cell" (Type 4: Notation/mechanism-induced)
**Statement**: If FBA's stoichiometric matrix indicates a reaction COULD carry flux
(is stoichiometrically feasible) under given constraints, that reaction is assumed to
actually be OCCURRING in the real cell under the modelled condition, without
considering whether the corresponding enzyme's gene is actually expressed.
**Origin**: FBA's stoichiometry-based feasibility check is the most prominent, explicitly
computed part of the method, so without an explicit statement that GENE EXPRESSION is a
SEPARATE requirement the model does not check, feasibility alone can be mistaken for a
complete predictor of actual occurrence.
**Why it persists**: FBA's genuine SUCCESS at predicting gene ESSENTIALITY (deleting a
reaction and observing whether growth becomes impossible) can create an impression that
the model comprehensively captures which reactions are active, when in fact
essentiality prediction and actual-flux prediction are answering different questions.
**Repair**: State explicitly that standard FBA evaluates STOICHIOMETRIC feasibility only
— it does not know whether the gene encoding a given reaction's enzyme is actually
expressed under the modelled condition. A reaction can be stoichiometrically feasible on
paper while never actually occurring in the real cell, specifically because its enzyme
is not being made at that time. This is a distinct limitation from the dynamics
limitation (M1) — this one concerns MISSING regulatory information, not missing time
resolution.
**Diagnostic probe**: the existing short_answer probe-depth task presenting a
stoichiometrically-feasible-but-unexpressed-enzyme scenario directly, with the
incorrect-kinetic-data and coding-error distractors both testing this misconception.

## Analogies
- The parking-lot-capacity model for FBA's steady-state nature: FBA is like calculating
  the OPTIMAL final arrangement of cars in a parking lot given the total number of
  spaces and cars (a steady-state answer) — it does NOT tell you the moment-to-moment
  sequence of cars arriving and parking over the course of the afternoon (the dynamic
  time course).
- The "on the blueprint, but is the crew actually there?" model for regulatory
  constraints: a reaction being stoichiometrically feasible is like a construction task
  being technically POSSIBLE according to the building's blueprint — but whether that
  specific task actually gets DONE additionally depends on whether the crew qualified to
  do it (the enzyme) has actually been HIRED (the gene expressed) for this particular
  job.

## Demonstrations
- Present the gene-knockout-essentiality scenario explicitly: a reaction is
  computationally deleted, maximum growth rate drops to zero — asking what this
  specifically predicts (gene essentiality) and confirming this uses only stoichiometric
  feasibility, no kinetics required.
- Present the unexpressed-enzyme scenario explicitly: a reaction is stoichiometrically
  feasible but its enzyme is never expressed under the tested condition — asking what
  SPECIFIC limitation of standard FBA this reveals (missing regulatory constraints).

## Discovery Questions
- "If you wanted to know how a bacterium's metabolite concentrations change minute by
  minute after a glucose pulse, would standard FBA give you that answer? What kind of
  model would you need instead?"
- "FBA says a specific reaction COULD carry flux, stoichiometrically. Does that
  guarantee the reaction is actually happening in the real cell right now? What
  additional information would you need to check?"
- "FBA doesn't model enzyme kinetics or gene expression at all. Given that, why is it
  still considered a powerful, practical tool for genome-scale metabolic models?"

## Teaching Sequence
1. Introduce the stoichiometric matrix and the steady-state mass-balance constraint
   (Sv = 0) before discussing FBA's optimisation step.
2. Present FBA's gene-essentiality prediction success as a worked example of its actual
   capability.
3. Directly correct the FBA-simulates-dynamics-over-time misconception using the
   glucose-pulse scenario.
4. Directly correct the stoichiometric-feasibility-guarantees-occurrence misconception
   using the unexpressed-enzyme scenario, explicitly distinguishing this from the
   dynamics limitation.
5. Close by reframing FBA's limitations (no dynamics, no regulation, no kinetics) as the
   direct SOURCE of its practical power at genome scale, not as flaws.

## Tutor Actions
- If a student describes FBA as tracking concentrations over time: ask them what SPECIFIC
  question FBA actually answers (a steady-state flux distribution) versus what a
  dynamic/kinetic model would answer instead.
- If a student assumes stoichiometric feasibility guarantees actual occurrence: ask them
  what ADDITIONAL information (gene expression) would be needed to confirm a reaction is
  actually active.
- If a student treats FBA's limitations as disqualifying flaws: ask them why requiring
  only stoichiometry (rather than full kinetics) makes FBA practical at genome scale.

## Voice Teaching Notes
Say "one frozen frame, not the movie" whenever FBA's steady-state nature comes up, to
keep the no-dynamics limitation explicit. Say "feasible on paper, but is the enzyme
actually made?" whenever stoichiometric feasibility is discussed, to keep the missing-
regulation limitation distinct from the missing-dynamics limitation.

## Assessment Signals
- **Early recovery**: correctly identifies, for a novel time-course question, that FBA
  is the wrong tool and a kinetic model is needed instead, and correctly identifies, for
  a novel unexpressed-enzyme scenario, the missing-regulatory-constraint limitation,
  without needing either restated.
- **Fragile**: can recite "FBA is steady-state, not dynamic" as a memorized correction
  but cannot explain what SPECIFIC alternative modelling approach (kinetic ODEs) would
  be needed instead.
- **Deep gap**: continues to describe FBA as tracking concentrations over time, or
  continues to assume stoichiometric feasibility guarantees actual occurrence, after
  both have been explicitly worked through.

## Tutor Recovery Strategy
For M1, present the glucose-pulse scenario and ask the student to state, specifically,
what FBA WOULD need to track (concentrations changing continuously over time) to answer
that question, then ask whether FBA's actual method (a single steady-state optimisation)
can provide that. For M2, present the unexpressed-enzyme scenario and ask the student
what ADDITIONAL piece of information (beyond stoichiometry) would need to be checked to
confirm the reaction is actually occurring, walking them to the gene-expression gap
themselves.

## Memory Hooks
- "FBA finds the best steady state — not a movie of concentrations over time."
- "Stoichiometrically feasible doesn't mean the enzyme is actually there."
- "Only stoichiometry and an objective — that's exactly why FBA scales to whole
  genomes."

## Transfer Connections
- `bio.sys.gene-regulatory-networks` (prerequisite): supplies the regulatory-network
  concepts this concept explicitly identifies as MISSING from standard FBA (the
  regulatory-constraint limitation).
- `bio.plant.plant-respiration` (prerequisite): supplies the specific metabolic pathway
  (cellular respiration) reactions this concept's stoichiometric modelling approach
  applies to.
- `bio.sys.synthetic-biology` (unlocks): applies the metabolic-network modelling
  approach introduced here to engineered biological systems design.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); both misconceptions above were classified directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
unexpressed-enzyme regulatory-constraint short_answer probe, using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (UNDERGRADUATE band): stoichiometric matrix, FBA/linear
  programming, genome-scale metabolic models, gene essentiality, kinetic-model
  complement — `biologySeedAssets.ts`, `METABNET_EXPLANATIONS[0]`.
- `misconception_repair` (UNDERGRADUATE band): FBA-is-not-dynamic-simulation
  correction, thermodynamics/regulatory/saturation limitations — `METABNET_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): gene-essentiality prediction from a zero-flux knockout,
  redundant-gene distractor flagged to M2's counterpart misconception —
  `METABNET_PROBES[0]`.
- `misconception_probe` (DEVELOPING): using FBA to model a 60-minute glucose-pulse time
  course, FBA-can-model-time-courses distractor flagged to M1 — `METABNET_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 13): unexpressed-enzyme regulatory-
  constraint reasoning task, closing this concept's 3-probe floor —
  `biologyDepthSeedAssets.ts`, conceptId `bio.sys.metabolic-network-modelling`.

## Curriculum Feedback
No additional Curriculum Feedback gap beyond the seed corpus is recorded for this entry
— the KG description's named sub-topics (flux balance analysis, stoichiometric
modelling of metabolic pathways, constraint-based reconstruction of genome-scale
metabolic networks) are all directly covered by the existing seed content.

## Version History
- 2026-09-20: Initial authoring (thirty-third recomputed topological frontier, batch of
  3 with `bio.bioinfo.structural-bioinformatics` — both seed-content-backed — and
  `bio.evo.macroevolution-extinction`, a first-principles entry), EB concept 115/199.
