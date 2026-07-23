# Conservation Laws in Particle Interactions — `phys.particle.conservation-laws`

## Identity

- **Concept ID**: `phys.particle.conservation-laws` (canonical physics
  KG)
- **Curriculum location**: physics / particle physics — dependency
  level 20.
- **Prerequisites**: `phys.particle.hadron-quark-model` (baryon number
  definition), `phys.particle.leptons` (lepton number and generation
  structure).
- **Unlocks** (from KG): `phys.particle.feynman-diagrams`,
  `phys.particle.accelerators-detectors`, `phys.particle.standard-
  model`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**:
  0.80 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that energy availability alone
never guarantees a proposed reaction is possible — baryon number and
lepton number must ALSO be conserved simultaneously, and failing either
makes a reaction strictly forbidden regardless of available energy; (2)
correctly check lepton number conservation separately per generation
(electron-type, muon-type, tau-type), never treating it as a single
undifferentiated total the way baryon number is tracked; (3) correctly
interpret the decades-long non-observation of proton decay as strong,
positive evidence for baryon number conservation, not as an inconclusive
or incomplete search result.

## Core Understanding

Baryon number and lepton number are strictly conserved in every known
particle interaction; a proposed reaction is forbidden if it violates
either conservation law, regardless of how much energy is available to
power it. A first persistent error assumes any reaction with enough
available energy should be allowed, missing that energy sufficiency is
necessary but never sufficient — proton decay (p→e⁺+π⁰) conserves
energy, momentum, and even electric charge perfectly, yet has never been
observed despite decades of extraordinarily sensitive searches, because
it violates baryon number conservation (B: +1→0). A second error treats
lepton number as a single undifferentiated total, missing that in the
simplest treatment it must be checked separately for each of the three
generations — a hypothetical reaction like e⁻→μ⁻ conserves the crude
total lepton count but fails when checked per generation (electron-type
lepton number goes from +1 to 0; muon-type goes from 0 to +1), and has
never been observed. A third error assumes the extensive, decades-long
search for proton decay must have eventually succeeded, missing that its
persistent non-observation places an extraordinarily long lower bound on
the proton's lifetime (well beyond 10³⁴ years, vastly exceeding the age
of the universe) — itself powerful, positive experimental support for
baryon number conservation, not an inconclusive null result.

## Mental Models

**Beginner**: "If a reaction has enough energy, it should be allowed;
lepton number is one combined total, not three separate generation-
specific totals; proton decay has probably been found by now given how
much searching has happened." Upgrade trigger: computing that proton
decay conserves energy, momentum, and charge perfectly yet remains
unobserved directly confronts the energy-suffices assumption; doing the
per-generation ledger for e⁻→μ⁻ (total matches, per-generation fails)
directly confronts the single-total assumption; presenting the
>10³⁴-year lifetime lower bound against the ~1.4×10¹⁰-year age of the
universe directly confronts the assumed-already-found assumption.

**Intermediate**: "Every proposed reaction must simultaneously satisfy
charge, energy, momentum, baryon number, AND lepton number (per
generation) conservation — failing any single one forbids the reaction;
lepton number requires a three-way per-generation check, unlike baryon
number's single count; proton decay's non-observation is itself strong,
positive evidence." This model correctly captures the checklist
discipline but may still need practice applying it fluently to
unfamiliar, multi-particle proposed reactions.

**Advanced**: always run the full conservation-law checklist (charge,
energy, momentum, baryon number, lepton number per generation) before
attempting any detailed reaction calculation, and always interpret a
rigorous null result (like proton decay's absence) as positive evidence
rather than an inconclusive search.

**Expert**: the connection to Grand Unified Theories (which predict
baryon number is only approximately conserved, with proton decay
occurring at an extraordinarily slow but theoretically nonzero rate) and
the ongoing Super-Kamiokande-style search program as an active test of
GUT proposals — not required for mastery, connects to open problems at
the frontier of particle physics.

## Why Students Fail

The dominant failure is treating energy sufficiency as the only
requirement for a reaction to be possible, missing that baryon number
and lepton number are independent, equally binding conservation laws; a
closely related failure treats lepton number as one combined total
rather than three separate per-generation quantities, missing that
generation-mixing reactions are forbidden even when the crude total
matches; a further failure misreads decades of non-observation of
proton decay as an inconclusive or failed search, missing that it is
itself strong positive evidence for conservation.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.particle.conservation-
laws.md`, Section 4 Misconception Library) documents three; reused by
reference with birth-type added.

- **MC-1 (enough energy means a reaction should be allowed)**: believing
  "as long as there's enough energy, the reaction should be possible."
  **Birth type**: overgeneralization (Type 1) — introductory mechanics
  and nuclear physics treatments emphasize energy conservation almost
  exclusively, so students never learn baryon/lepton number as
  additional, independent requirements. Probe: "A proposed reaction
  conserves energy and momentum perfectly, and plenty of energy is
  available. Is that enough to guarantee it can happen?"
- **MC-2 (lepton number is one single combined total)**: believing "as
  long as the total lepton count matches, the reaction should be fine —
  a lepton is a lepton." **Birth type**: overgeneralization (Type 1) —
  baryon number's single-total structure (no generation split needed) is
  extended by analogy to lepton number, missing the required
  per-generation check. Probe: "Is a reaction that converts an electron
  directly into a muon, with nothing else changing, allowed?"
- **MC-3 (proton decay has already been observed)**: believing "with
  that much searching, they must have found it by now." **Birth type**:
  overgeneralization (Type 1) — the sheer scale and duration of
  proton-decay search experiments is assumed to imply a positive result
  must have eventually emerged, missing that the null result is itself
  the scientifically significant finding. Probe: "After decades of
  dedicated searching in enormous detectors, has proton decay actually
  been directly observed?"

## Analogies

**Best**: a bank's double-entry ledger, requiring several separate
ledgers (energy, momentum, charge, baryon number, and three separate
per-generation lepton-number ledgers) to ALL balance simultaneously — a
transaction balancing every ledger except one is still rejected outright;
directly targets MC-1 by making "all gates must open" the operative
image rather than "enough of one resource suffices."

**Anti-analogy**: do NOT say "conservation laws are just particle
physics' version of accounting rules, so they're somewhat arbitrary" —
this undersells their status; unlike accounting conventions, these are
experimentally tested foundational features of physical law, tested to
the extraordinary precision of the proton-decay search, and this vague
framing risks reinforcing MC-1's implicit "just a formality" reading.

## Demonstrations

Worked-example: check the reaction p+p→p+p+p+p̄ against baryon number
(B: 2→2, conserved) as a concrete, checkable pass-case — directly builds
the checklist habit before introducing a forbidden example. Worked-
example: the per-generation lepton-number ledger for the hypothetical
e⁻→μ⁻ reaction, showing the crude total matches (+1→+1) but the
per-generation check fails (electron-type +1→0, muon-type 0→+1) —
directly targets MC-2 by making the generation-mixing failure a
computed, checkable fact.

## Discovery Questions

Discovery-style: "Here's a reaction that has plenty of available energy,
conserves electric charge perfectly, and conserves momentum and energy
exactly: a proton turning into a positron and a neutral pion. Physicists
have searched for this exact reaction for over forty years, in some of
the most sensitive detectors ever built. They've never found it. Why
not, if the energy books all balance?" — learner discovers (through the
baryon-number check) that a reaction can satisfy every familiar
conservation law and still be strictly forbidden, directly confronting
MC-1's energy-suffices assumption by deriving the resolution rather than
being told it.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session_cap 4: conservation-law-checklist explanation using the
proton-decay hook directly confronting MC-1 → reaction-bookkeeping
worksheet practice → per-generation lepton ledger directly confronting
MC-2 → proton-decay-search-scale demonstration directly confronting
MC-3). MC-1 is addressed first via the checklist explanation and
proton-decay hook, before MC-2 via the per-generation ledger, before
MC-3 via the search-scale demonstration.

## Tutor Actions

WORKED-EXAMPLE (baryon-number check for p+p→p+p+p+p̄, a conserved-case
example); WORKED-EXAMPLE (per-generation lepton-number ledger for the
forbidden e⁻→μ⁻ reaction); THOUGHT-EXPERIMENT (proton decay's
non-observation as positive evidence, with the >10³⁴-year lifetime bound
compared to the universe's age); ANALOGY (the multi-ledger bank
accounting system requiring simultaneous balance).

## Voice Teaching Notes

Listen for "as long as there's enough energy, it should work" or "the
total lepton count matches, so it's fine" or "they must have found
proton decay by now" — the three most frequent misconception tells.
Load-bearing sentence: "having enough energy is necessary but nowhere
near sufficient — a reaction also has to conserve baryon number and
lepton number, checked separately for each of the three lepton
generations, not as one combined total; and proton decay's complete
non-observation, after decades of extraordinarily sensitive searching,
isn't an inconclusive result — it's itself strong, positive evidence
that baryon number is conserved." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assuming sufficient energy guarantees a reaction is possible
signals MC-1 (full repair via the proton-decay baryon-number check). A
learner treating lepton number as a single combined total signals MC-2
(full repair via the per-generation e⁻→μ⁻ ledger). A learner assuming
proton decay has already been observed signals MC-3 (full repair via
the search-scale-versus-lifetime-bound comparison). Mastery trigger:
correctly applying the full conservation-law checklist to determine
whether a proposed reaction is allowed, and correctly explaining why
energy availability alone is insufficient. Blueprint's Section 11
Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if having enough money to buy a house doesn't
matter when the house isn't legally for sale, does 'enough money' alone
ever guarantee a purchase goes through?" (isolating the necessary-but-
not-sufficient pattern before reapplying it specifically to why energy
availability alone never guarantees a reaction is physically allowed).
See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (energy sufficiency is necessary but not sufficient; baryon
number and lepton number must ALSO be conserved; lepton number requires
a per-generation check, not one combined total; proton decay's absence is
positive evidence) bound to procedure (running the full conservation-
law checklist on a proposed reaction; building the per-generation lepton
ledger). Interleave with `phys.particle.hadron-quark-model`,
`phys.particle.leptons`, `phys.particle.feynman-diagrams`,
`phys.particle.accelerators-detectors`, and `phys.particle.standard-
model`.

## Transfer Connections

Near: screening any newly encountered proposed particle reaction (in
Feynman-diagram exercises or accelerator/detector data interpretation)
using the same multi-law checklist before any detailed calculation. Far:
chemistry (mass and charge balance in chemical equations as a simpler
analog of this bookkeeping discipline) and general scientific reasoning
about necessary-versus-sufficient conditions. Real-world: the
Super-Kamiokande proton-decay search as a landmark case study in how a
rigorous null result constitutes powerful positive scientific evidence.
Expert: Grand Unified Theories' prediction of extremely rare baryon-
number violation as an active experimental frontier.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (balancing chemical equations for mass and charge is a
direct, simpler analog of this same multi-quantity conservation-checking
discipline) — recorded honestly as a Curriculum Feedback item, not
fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.particle.
conservation-laws.md`, numbered-Section format). Reuses: Section 4
Misconception Library by reference. Not restated: Section 0 Concept
Metadata, Section 1 Concept Spine full formula derivations, Section 5
Explanation Library, Section 7 Demonstration Library full walkthroughs,
Section 8 Discovery Lesson full sequence, Section 11 Assessment full
item text, Section 12 Recovery Notes, Section 13 Memory and Review
schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real cross-subject connection exists to chemistry (balancing chemical
equations for mass and charge conservation as a direct, simpler analog
of this multi-quantity bookkeeping discipline) — recorded honestly, not
fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 20): initial authoring.
