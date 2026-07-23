# Helmholtz and Gibbs Free Energy — `phys.stat.free-energy`

## Identity

- **Concept ID**: `phys.stat.free-energy` (canonical physics KG)
- **Curriculum location**: physics / statistical mechanics — dependency
  level 14.
- **Prerequisites**: `phys.stat.partition-function` — free energy is
  computed directly from the already-secure partition function via
  F=−k_BT ln Z.
- **Unlocks** (from KG): `phys.stat.phase-transitions` — a genuine bridge
  concept into phase-transition theory.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that systems do NOT always evolve
to minimize ENERGY alone — equilibrium corresponds to MINIMUM FREE
ENERGY F=U−TS, a trade-off between energy and entropy, so entropy can
drive an energy-costing (endothermic) process spontaneous at
sufficiently high temperature (e.g. water evaporation above 100°C); (2)
correctly explain that Helmholtz free energy F is NOT "the total energy
available for use" — it specifically equals the MAXIMUM WORK obtainable
at constant temperature and volume, ΔF=−W_max, after the environment has
already taken its share TΔS; (3) correctly explain that the partition
function Z and free energy F are NOT unrelated quantities used for
different purposes — F=−k_BT ln Z is the MASTER LINK from which every
thermodynamic property (entropy, pressure, energy) can be derived by
differentiation; (4) correctly explain that ΔG<0 does NOT mean a
chemical reaction proceeds to COMPLETION — it means the reaction is
spontaneous in the forward direction under current conditions, with true
equilibrium reached only when ΔG=0 (not when all reactants are
consumed), and even a substantially negative ΔG° still leaves a finite
equilibrium constant K, not infinite conversion.

## Core Understanding

Systems do NOT always evolve to minimize their ENERGY alone — this is a
natural but incomplete carryover from Newtonian potential-energy
intuition. The genuinely governing quantity at constant temperature is
the FREE ENERGY, F=U−TS (or G=H−TS at constant pressure), and equilibrium
corresponds to MINIMUM FREE ENERGY, not minimum energy. Water
evaporating at 100°C provides a clarifying example: water vapor has
HIGHER energy than liquid water (ΔH_vap>0, an endothermic process), yet
evaporation proceeds spontaneously above 100°C because
ΔG_vap=ΔH_vap−TΔS_vap becomes negative once the entropy term TΔS_vap
exceeds the energy cost ΔH_vap — ENTROPY genuinely drives this
transition despite its energy cost; at exactly 100°C, ΔG_vap=0 (exact
equilibrium), and above 100°C the entropy term dominates. A second,
frequently misread point concerns the MEANING of "free" in "free energy":
Helmholtz free energy F is NOT simply "the total energy that's free for
use" — the name is more precise than it first appears. At constant
temperature and volume, ΔF=ΔU−TΔS=−W_max, meaning F specifically equals
the MAXIMUM WORK the system can perform (excluding ordinary PdV
expansion work) — "free" means "available for useful work ABOVE the
minimum heat that must be exchanged with the environment," since the
environment necessarily claims its own share, TΔS_environment, of the
total energy change. A third, structurally central point addresses the
relationship between the partition function Z and free energy F: these
are NOT separate, unrelated tools (one for entropy calculations, another
for other properties) — F=−k_BT ln Z is the MASTER THERMODYNAMIC LINK,
analogous to how the Lagrangian generates equations of motion in
mechanics. Every macroscopic thermodynamic property follows as a
DERIVATIVE of F (or equivalently of ln Z): pressure P=−(∂F/∂V)_T,
entropy S=−(∂F/∂T)_V, and so on — once F is known as a function of its
natural variables, EVERY thermodynamic property is obtainable without
returning to a separate, independent calculation. A fourth point
addresses a common chemistry-adjacent misreading: ΔG<0 does NOT mean a
chemical reaction proceeds all the way to COMPLETION — the actual Gibbs
energy change during a reaction is ΔG=ΔG°+RT ln Q, where Q (the reaction
quotient) genuinely CHANGES as the reaction proceeds, INCREASING as
products accumulate; true chemical EQUILIBRIUM is reached specifically
when ΔG=0 (NOT when all reactants have been consumed). Even a
substantially negative standard free-energy change, ΔG°=−20 kJ/mol,
corresponds to an equilibrium constant K=exp(−ΔG°/RT)≈3300 at room
temperature — strongly favoring products, but leaving small, finite
amounts of reactants remaining at equilibrium, never complete, 100%
conversion.

## Mental Models

**Beginner**: "Systems always minimize their energy, so lower-energy
states should always be favored; free energy F means the total energy
available for use; the partition function Z and free energy F are used
for separate purposes; a negative ΔG means the reaction goes entirely to
completion." Upgrade trigger: computing ΔG for water evaporation at
80°C, 100°C, and 120°C explicitly (finding the sign change exactly at
100°C, where entropy overtakes energy cost) directly confronts the
minimize-energy-only assumption; deriving pressure directly from F
(finding it requires no separate calculation) directly confronts the
Z-and-F-are-unrelated assumption.

**Intermediate**: "Equilibrium minimizes free energy F=U−TS, a trade-off
between energy and entropy, with entropy able to drive endothermic
processes spontaneous at high T; F specifically equals the maximum
extractable work, not total energy; F=−k_BT ln Z is the master
thermodynamic generating function; ΔG=0 (not 100% conversion) marks true
equilibrium." This model correctly captures all four results, but
sometimes still needs to explicitly compute ΔG=ΔG°+RT ln Q to verify
where equilibrium actually lies.

**Advanced**: "Always frame spontaneity and equilibrium in terms of free
energy (energy-entropy trade-off), never energy alone; always derive
thermodynamic properties as explicit derivatives of F rather than
computing them via separate, disconnected formulas."

**Expert**: the full Legendre-transform relationships connecting internal
energy U, Helmholtz free energy F, enthalpy H, and Gibbs free energy G
(each suited to different fixed-variable conditions), and their role in
phase-transition theory — a natural consolidation directly connecting to
the KG unlock `phys.stat.phase-transitions`, not required for mastery.

## Why Students Fail

The dominant failure is applying energy-minimization intuition (from
mechanics) directly to thermodynamic equilibrium, missing the essential
role of entropy; closely related failures include misreading "free
energy" as total available energy rather than maximum extractable work,
treating the partition function and free energy as unrelated
calculational tools, and assuming a negative ΔG guarantees complete
reaction conversion rather than merely locating the equilibrium point.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.free-energy.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (systems always evolve to minimize energy)**: believing
  "systems go to lower energy — so the liquid should be favored" over
  vapor despite the entropy contribution. **Birth type**:
  overgeneralization (Type 1) — Newtonian potential-energy-minimization
  intuition is incorrectly extended to thermodynamic equilibrium, missing
  that free energy (energy MINUS a temperature-weighted entropy term) is
  the actual governing quantity. Probe: "At 100°C, water evaporates
  spontaneously, yet water vapor has higher energy than liquid water.
  How is this possible?"
- **MC-2 (Helmholtz free energy F is the maximum work the system can
  do — read as "total available energy")**: believing "free energy is
  the energy available to do work" in an unqualified, total sense.
  **Birth type**: language contamination (Type 3) — the word "free" in
  "free energy" invites a reading of "totally available," obscuring the
  precise meaning (maximum work AFTER the environment's entropy share is
  accounted for). Probe: "What does 'free energy' mean — is it the total
  energy that's free for use?"
- **MC-3 (the partition function Z and free energy F are unrelated)**:
  believing "I use the equations of state separately; Z is just for
  entropy." **Birth type**: instruction-induced (Type 5) — students
  often first encounter Z specifically for entropy/heat-capacity
  calculations and never see the unifying F=−k_BT ln Z bridge connecting
  it to every other thermodynamic property. Probe: "How do you get
  pressure from the partition function?"
- **MC-4 (ΔG<0 means the reaction proceeds to completion)**: believing
  "negative ΔG means the reaction goes all the way to products." **Birth
  type**: notation-induced (Type 4) — confusing the STANDARD Gibbs energy
  change ΔG° (a fixed reference value) with the ACTUAL, reaction-progress-
  dependent ΔG=ΔG°+RT ln Q, missing that equilibrium (ΔG=0) generally
  leaves finite reactant concentrations. Probe: "If ΔG°=−20 kJ/mol for a
  reaction, will it go to completion?"

## Analogies

**Best**: a shared paycheck where the "boss" (the environment) takes a
fixed cut (TΔS) before the "worker" (the system) gets the remaining
"free" portion to spend on useful work — directly targets MC-2 by giving
a concrete image of "free" meaning "left over after a mandatory share,"
not "the whole amount."

**Anti-analogy**: do NOT say "free energy is just the system's energy
budget" without specifying the temperature-entropy trade-off — this
directly installs MC-1/MC-2 by omitting the essential role of entropy in
determining what's actually "free."

## Demonstrations

Worked-example: compute ΔG=ΔH−TΔS for water evaporation at T=80°C, 100°C,
and 120°C explicitly, showing the sign change exactly at 100°C —
directly targets MC-1. Worked-example: derive the ideal-gas pressure
P=Nk_BT/V directly from F=−k_BT ln Z, step by step — directly targets
MC-3.

## Discovery Questions

Discovery-style: "if ΔG°=−20 kJ/mol gives an equilibrium constant K≈3300
(strongly favoring products but not infinite), does 'strongly favors
products' mean the same thing as 'goes to completion'?" — learner
computes K explicitly and reasons through the distinction, directly
confronting MC-4.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing free energy, not energy alone, as the governing
quantity), before MC-2 (the precise meaning of "free" in free energy),
before MC-3 (F as the master link to all other properties via Z), before
MC-4 (ΔG=0, not 100% conversion, as the equilibrium condition) — this
order builds from the most foundational reframing of equilibrium to
progressively more specific formal and chemical-context distinctions.

## Tutor Actions

WORKED-EXAMPLE (ΔG computed for water evaporation at three temperatures,
showing the sign change); WORKED-EXAMPLE (ideal-gas pressure derived
directly from F); WORKED-EXAMPLE (equilibrium constant K computed for
several ΔG° values, showing finite conversion even for strongly negative
ΔG°); ANALOGY (shared paycheck with a mandatory environmental cut).

## Voice Teaching Notes

Listen for "systems minimize energy" (ignoring entropy) or "free energy
is the total available energy" or treating Z and F as unrelated, or "a
negative ΔG means complete conversion" — the four direct misconception
tells. Load-bearing sentence: "equilibrium minimizes free energy, not
energy alone — entropy gets a vote too — and F is what's left over for
useful work AFTER the environment takes its share." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assuming energy alone determines equilibrium signals MC-1
(MISCONCEIVING, full repair via the water-evaporation worked example). A
learner treating free energy as total available energy signals MC-2
(full repair via the shared-paycheck analogy). A learner treating Z and
F as unrelated signals MC-3 (full repair via the pressure-derivation
worked example). A learner assuming negative ΔG means complete
conversion signals MC-4 (full repair via the equilibrium-constant worked
example). Mastery trigger: correctly identifying free energy (not energy
alone) as the equilibrium-determining quantity, AND correctly
interpreting "free" as maximum extractable work, AND correctly deriving
thermodynamic properties from F, AND correctly distinguishing ΔG=0
equilibrium from complete conversion. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — does hot water
turning to steam release energy, or does it actually COST energy?"
(isolating the endothermic-yet-spontaneous puzzle before introducing
entropy's role). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (free energy, not energy alone, as the equilibrium quantity;
"free" meaning maximum extractable work; F as the master link to all
thermodynamic properties; ΔG=0 as the true equilibrium condition) bound
to procedure (computing F=−k_BT ln Z and deriving properties by
differentiation). Interleave with `phys.stat.partition-function`.

## Transfer Connections

Near: any free-energy or spontaneity-determination problem. Far:
chemistry (reaction equilibria and equilibrium constants, directly built
on Gibbs free energy) and biology (protein folding and biochemical
reaction spontaneity, governed by free-energy minimization). Real-world:
understanding why endothermic reactions and phase transitions (like
evaporation, melting) can still occur spontaneously at the right
temperature, driven by entropy. Expert: the full Legendre-transform
relationships among U, F, H, and G, and their role in phase-transition
theory.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (reaction equilibria, equilibrium constants) and biology
(protein folding, biochemical spontaneity) — recorded honestly as a
Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to chemistry
(reaction equilibria) and biology (protein folding) — recorded honestly,
not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 14): initial authoring.
