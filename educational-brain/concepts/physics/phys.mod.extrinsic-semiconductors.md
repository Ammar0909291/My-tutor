# Extrinsic Semiconductors: Doping and Carrier Types — `phys.mod.extrinsic-semiconductors`

## Identity

- **Concept ID**: `phys.mod.extrinsic-semiconductors` (canonical physics
  KG)
- **Curriculum location**: physics / modern physics (semiconductor
  physics extension) — dependency level 22.
- **Prerequisites**: `phys.mod.intrinsic-semiconductors` (the electron-
  hole pair concept this concept deliberately unbalances).
- **Unlocks** (from KG): `phys.mod.pn-junction`.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**:
  0.70 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that a doped semiconductor
remains exactly electrically neutral overall, despite a large majority-
carrier imbalance, because fixed ionized-impurity charge exactly
balances mobile majority-carrier charge; (2) correctly state that both
carrier types are always present in any doped semiconductor — n-type
material has a small but nonzero minority hole population, and vice
versa; (3) correctly reason that doping trades majority against minority
carrier concentration (via n×p ≈ n_i², approximately constant), not
increasing both simultaneously.

## Core Understanding

Doping a semiconductor with a donor or acceptor impurity deliberately
breaks the natural n = p balance established in the prerequisite
concept, producing an n-type material (excess mobile electrons) or a
p-type material (excess mobile holes) with a majority charge carrier,
while the material as a whole remains electrically neutral. A first
persistent error believes a doped semiconductor carries a net electric
charge — n-type "should be negatively charged" since it has extra
electrons — missing that every donor atom that releases its extra
electron becomes a fixed, immobile positive ion, exactly balancing the
mobile electron charge created. A second error assumes "n-type" means
literally zero holes present, or "p-type" means literally zero
electrons, missing that both carrier types always coexist — only their
relative populations shift dramatically. A third error believes doping
increases both carrier concentrations together, missing that the
approximate relation n×p ≈ n_i² forces a tradeoff: increasing the
majority carrier concentration actively suppresses the minority carrier
concentration below even the pure intrinsic value.

## Mental Models

**Beginner**: "N-type material should be negatively charged overall,
since it has extra electrons; n-type means only electrons, no holes at
all; doping should increase both carrier types together, making the
material more conductive overall." Upgrade trigger: the fixed-ion-vs-
mobile-carrier charge-balance count, explicitly summing donor ions
against mobile electrons to verify zero net charge, directly confronts
the net-charge assumption; the mass-action-law relation (n×p ≈ n_i²)
with concrete example numbers directly confronts both the zero-minority-
carrier assumption and the both-increase-together assumption.

**Intermediate**: "Doped semiconductors remain electrically neutral
overall — majority carrier imbalance describes mobile carrier type, not
net charge; both carrier types always coexist, described as majority
versus minority, never exclusively one or the other; doping trades
majority against minority carrier concentration via n×p ≈ n_i²,
approximately constant." This model correctly captures the three core
distinctions but may still need practice mapping a given dopant's
valence-electron count directly to the resulting carrier type fluently.

**Advanced**: always state the specific mechanism (pentavalent donor →
weakly-bound 5th electron → n-type; trivalent acceptor → incomplete bond
→ p-type) rather than memorizing "n-type/p-type" as unexplained labels,
and always explicitly verify charge neutrality by counting fixed ions
against mobile carriers when asked.

**Expert**: the connection to real doping ratios (roughly one impurity
atom per 10⁶–10⁹ silicon atoms sufficient to raise majority carrier
concentration from ~10¹⁰ to 10¹⁵–10¹⁸ cm⁻³) and to the entire modern
semiconductor manufacturing industry (ion implantation, diffusion —
precisely controlled doping as the foundation of transistor fabrication)
— not required for mastery, natural bridge to `phys.mod.pn-junction`.

## Why Students Fail

The dominant failure is believing a doped semiconductor carries a net
electric charge, missing that fixed ionized-impurity charge exactly
balances mobile majority-carrier charge, keeping the material perfectly
neutral overall; a closely related failure assumes n-type material has
literally zero holes (or p-type literally zero electrons), missing that
both carrier types always coexist as majority and minority populations;
a further failure confuses donor (pentavalent) and acceptor (trivalent)
impurities or which produces which carrier type, missing that the
dopant's valence-electron count relative to silicon's 4 directly
determines the outcome; a final failure assumes doping increases both
carrier concentrations simultaneously, missing the genuine majority/
minority tradeoff forced by the approximately-constant n×p product.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.extrinsic-
semiconductors.md`, Section 4 Misconception Library) documents three;
reused by reference with birth-type added.

- **MC-1 ("an n-type, or p-type, doped semiconductor carries an overall
  net electric charge")**: believing "n-type material should be
  negatively charged overall, since it has extra electrons." **Birth
  type**: language contamination (Type 3) — the phrase "excess
  electrons" (describing n-type's majority carrier) is misread as
  implying an excess of total negative charge in the material. Probe:
  "If an n-type semiconductor has a huge excess of mobile electrons
  compared to holes, does that mean the material as a whole is
  negatively charged?"
- **MC-2 ("n-type material has literally zero holes; p-type material has
  literally zero electrons")**: believing "n-type means only electrons,
  no holes at all." **Birth type**: overgeneralization (Type 1) — the
  simplified "n-type = electrons, p-type = holes" shorthand, useful as a
  first pass, is taken as an absolute, exclusive statement. Probe: "Does
  n-type silicon have absolutely no holes present at all, or does it
  just have far fewer holes than electrons?"
- **MC-3 ("doping increases both electron and hole concentrations
  together, proportionally")**: believing "doping should make the
  material more conductive overall by increasing both types of
  carriers." **Birth type**: overgeneralization (Type 1) — assuming
  "doping increases conductivity" implies both underlying carrier
  populations increase together, rather than recognizing a genuine
  tradeoff. Probe: "If doping silicon with a donor impurity dramatically
  increases the electron concentration, does the hole concentration also
  increase, stay the same, or decrease?"

## Analogies

**Best**: a marching band where every formation position is normally
filled by exactly the right number of paired members. Introducing one
"extra" person into a row (a donor atom, with one member's free hand no
partner is grabbing) lets that free hand wander off easily (the extra
electron); removing one member from a row (an acceptor atom) leaves an
empty formation slot (a hole) that nearby members constantly shuffle to
fill. Explicitly breaks down at one point: a marching band's "extra
hand" or "missing member" leaves behind no analog of a fixed, charged
ion the way a real donor or acceptor atom does — the analogy captures
the "one extra vs. one missing" structural idea but not the overall-
neutrality point, which requires the more technical fixed-ion framing.

**Anti-analogy**: do NOT say "n-type material is just negatively charged
material, and p-type is positively charged material" — this directly
reinforces MC-1; always immediately specify that both types remain
exactly electrically neutral overall, with only the mobile-carrier-type
balance shifted.

## Demonstrations

Worked-example: present a diagram with a specific number of donor atoms
(each becoming a fixed positive ion) and the resulting equal number of
mobile electrons, having the learner explicitly sum the total charge to
verify neutrality — directly targets MC-1. Worked-example: present real
approximate numbers (intrinsic n_i ≈ 10¹⁰ cm⁻³; heavily n-type doped n ≈
10¹⁷ cm⁻³, implied p ≈ 10³ cm⁻³) and have the learner verify the
approximate n×p ≈ n_i² relationship — directly targets MC-3.

## Discovery Questions

Discovery-style: "Pure silicon barely conducts electricity at room
temperature — you learned that in the last concept. Engineers solved
this problem by deliberately adding an incredibly tiny amount of a
different element — sometimes as little as one atom per billion — and it
can increase conductivity by many orders of magnitude. What do you think
that added element actually does?" — learner discovers (through the
donor/acceptor mechanism resolution) that doping introduces either a
weakly-bound extra electron or an easily-filled vacancy, directly
grounding the doping mechanism.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (5 actions,
session cap 5: donor/acceptor mechanism explanation alongside the ball-
and-stick lattice build, covering both n-type and p-type doping →
fixed-ion-vs-mobile-carrier charge-balance count directly confronting
MC-1 → direct probe of MC-2 clarifying the majority/minority framing →
majority/minority concentration table directly confronting MC-3 →
consolidation exercise determining carrier type from a given dopant,
priming for the p-n junction concept ahead). MC-1 is addressed first via
the charge-balance count, before MC-2 via the direct majority/minority
clarification, before MC-3 via the concentration table.

## Tutor Actions

EXPLAIN + DEMONSTRATE (donor/acceptor mechanism alongside a ball-and-
stick lattice build, covering both n-type and p-type doping); CHALLENGE
(fixed-ion-vs-mobile-carrier charge-balance count, directly confronting
MC-1); EXPLAIN (direct probe of MC-2, clarifying majority/minority
framing); DEMONSTRATE + CHALLENGE (majority/minority concentration
table, directly confronting MC-3); SYNTHESIS (consolidation exercise:
given a dopant, determine carrier type, majority/minority carriers, and
confirm overall neutrality).

## Voice Teaching Notes

Listen for "n-type material should be negatively charged," "n-type means
only electrons, no holes at all," or "doping should increase both
carrier types together" — the three most frequent misconception tells.
Load-bearing sentence: "Doping is the single engineering trick that
turns a nearly useless pure semiconductor into the foundation of every
modern electronic device — and it works not by adding charge to the
material, but by deliberately, precisely shifting the balance between
two carrier types that are always both present, while keeping the
material perfectly neutral throughout." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing a doped semiconductor as carrying net charge
signals MC-1 (full repair via the fixed-ion-vs-mobile-carrier charge-
balance count). A learner assuming a doped material has literally zero
minority carriers signals MC-2 (full repair via the direct majority/
minority clarification). A learner assuming both carrier types increase
together under doping signals MC-3 (full repair via the majority/
minority concentration table). Mastery trigger: correctly determining
the carrier type resulting from a given dopant, correctly explaining
overall neutrality, and correctly explaining the majority/minority
tradeoff. Blueprint's Section 11 Assessment (FA-1 through FA-4) cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a room has 100 people each holding a red balloon
tied to the floor (fixed positive ions) and 100 free-floating blue
balloons drifting around (mobile electrons), is the room's total balloon
count unbalanced just because the blue balloons are the ones visibly
moving?" (isolating the fixed-charge-balances-mobile-charge pattern
before re-applying it specifically to doped semiconductor neutrality).
See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (doping as deliberate n = p imbalance via donor/acceptor
impurities; overall electrical neutrality via fixed ionized-impurity
charge balancing mobile majority-carrier charge; the majority/minority
carrier tradeoff via n×p ≈ n_i²) bound to procedure (mapping a dopant's
valence-electron count to the resulting carrier type; verifying overall
neutrality by counting fixed ions against mobile carriers). Interleave
with `phys.mod.intrinsic-semiconductors` (prerequisite — the electron-
hole pair concept this concept deliberately unbalances) and
`phys.mod.pn-junction` (successor — joining n-type and p-type regions
together).

## Transfer Connections

Near: applying the same donor/acceptor mechanism and neutrality
reasoning to other semiconductor materials (germanium, gallium arsenide)
doped with analogous impurities. Far: semiconductor device manufacturing
and integrated circuit design (precisely controlled doping profiles as
the foundation of transistor fabrication), materials engineering
generally (deliberately introducing controlled impurities to dramatically
alter bulk material properties, also seen in metallurgy's alloying), and
chemical equilibrium reasoning (the mass-action-law-like n×p ≈ n_i²
relationship directly parallels equilibrium constant relationships).
Real-world: solar cell design, which requires carefully balanced n-type
and p-type layers engineered via specific doping choices. Expert: the
general principle that a small, controlled perturbation can dramatically
shift the balance between two coupled, tradeoff-linked quantities without
changing a system's overall conserved status — recurring in chemical
equilibrium and population genetics.

## Cross-Subject Connections

KG `cross_links` not separately checked this batch (not required by the
Blueprint's Section 15 Curriculum Feedback, which records no open
issues); the chemical-equilibrium mass-action-law parallel (n×p ≈ n_i²
mirroring equilibrium constant relationships) is the primary cross-
subject bridge, already covered under Transfer Connections above.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.extrinsic-
semiconductors.md`, numbered-Section format). Reuses: Section 4
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

No open issues found this batch — prerequisite adequacy
(`phys.mod.intrinsic-semiconductors`) and unlock readiness
(`phys.mod.pn-junction`, directly depending on n-type and p-type
material being independently understood) are both internally consistent
with the Blueprint's own Section 15 findings, continuing the six-concept
semiconductor-physics extension of the Modern Physics domain.

## Version History

- 2026-07-23 (physics EB Wave 22): initial authoring.
