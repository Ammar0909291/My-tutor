# Series and Parallel Circuits — `phys.em.dc-circuits`

## Identity

- **Concept ID**: `phys.em.dc-circuits` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.ohms-law` — series/parallel circuit analysis
  is repeated application of V = IR to specific circuit topologies.
- **Unlocks** (from KG): `phys.em.emf`, `phys.em.kirchhoffs-laws` — a
  genuine hub concept.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that in a SERIES circuit, current is
the SAME through every component (only one path), while voltage divides
across components proportional to their resistance; (2) correctly state
that in a PARALLEL circuit, voltage is the SAME across every branch
(shared connection points), while current divides across branches
inversely proportional to their resistance; (3) correctly compute
equivalent resistance for series (R_eq = R₁+R₂+...) and parallel
(1/R_eq = 1/R₁+1/R₂+...) combinations, and correctly explain why these
rules are structurally opposite to capacitor combination rules already
learned.

## Core Understanding

In a series circuit (components connected end-to-end, forming a single
path), current has nowhere else to go, so the SAME current flows through
every component in sequence — but voltage, driven by that shared current
through each component's own resistance (V = IR), DIVIDES across the
components proportional to their individual resistance values (a larger
resistor in series gets a larger share of the total voltage drop). In a
parallel circuit (components connected across the same two shared nodes),
every branch experiences the identical voltage (since they share the same
two connection points, and voltage between two points is a single,
well-defined quantity regardless of path) — but current DIVIDES across the
branches inversely proportional to resistance (a lower-resistance branch
carries proportionally more current, since it offers an easier path).
Equivalent resistance for series combinations adds directly (R_eq =
R₁+R₂+...), while parallel combinations combine via reciprocals
(1/R_eq = 1/R₁+1/R₂+...) — this is the exact opposite pairing from
capacitor combination rules (where series capacitors use the reciprocal
rule and parallel capacitors add directly), a genuinely useful but also
genuinely confusable contrast.

## Mental Models

**Beginner**: "Current is the same everywhere in any circuit, and voltage
is the same everywhere too" (undifferentiated, no series/parallel
distinction). Upgrade trigger: measuring current and voltage at different
points in an actual series vs. parallel circuit directly confronts the
undifferentiated assumption.

**Intermediate**: "Series: same current, divided voltage. Parallel: same
voltage, divided current." This model correctly captures the two
topologies' distinct behavior, but sometimes confuses the resistor
combination rules with the (structurally opposite) capacitor combination
rules already learned.

**Advanced**: "Resistors and capacitors combine in exactly opposite ways
for series vs. parallel — deliberately cross-referencing the two element
types side by side prevents defaulting to whichever rule was learned most
recently under time pressure."

**Expert**: series/parallel analysis as a special (single-loop or
single-node-pair) case of the more general Kirchhoff's laws framework,
which handles arbitrarily complex circuit topologies — directly setting up
the immediate KG unlock, `phys.em.kirchhoffs-laws`.

## Why Students Fail

The dominant failure is same-everywhere overgeneralization: applying
"current is the same" or "voltage is the same" universally without first
determining whether the specific components in question are in series or
parallel relative to each other; a second, distinct failure confuses the
resistor combination rules with the oppositely-structured capacitor
combination rules.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.dc-circuits.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-SAME-CURRENT-IN-PARALLEL-BRANCHES**: belief current is the same in
  every branch of a parallel circuit (correctly true for series, incorrectly
  extended to parallel). **Birth type**: overgeneralization (Type 1) — the
  series case (learned first or more memorably, "current has nowhere else
  to go") is incorrectly extended to parallel branches, where current
  instead divides based on each branch's resistance. Probe: "Two
  different-resistance resistors are connected in PARALLEL across the same
  battery. Do they carry the same current, or does current divide between
  them?"
- **MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES**: belief voltage is the same
  across every component in a series circuit (correctly true for parallel,
  incorrectly extended to series). **Birth type**: overgeneralization
  (Type 1) — the parallel case's "same voltage" rule is incorrectly
  extended to series, where voltage instead divides proportional to each
  component's resistance. Probe: "Two different-resistance resistors are
  connected in SERIES with a battery. Is the voltage across each resistor
  the same, or does it divide between them?"

## Analogies

**Best**: a single-lane road (series — every car, i.e. every unit of
current, must pass through each toll booth/resistor in sequence, sharing
the same traffic flow rate) vs. a multi-lane highway with separate exits
(parallel — cars/current choose different lanes/branches, dividing based
on how "open"/low-resistance each lane is, while all lanes start and end
at the same two points). Directly targets both misconceptions by giving
concrete, contrasting mental images for the two topologies.

**Anti-analogy**: do NOT say "current and voltage behave the same way in
any circuit" as a simplifying shorthand — this directly installs both
misconceptions by erasing the essential series/parallel distinction.

## Demonstrations

Physical: build a simple series circuit (two different-value resistors, a
battery, an ammeter/voltmeter) and measure current at multiple points
(identical) and voltage across each resistor (different, summing to the
battery voltage) — directly targets MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES.
Repeat with a parallel circuit, measuring voltage across each branch
(identical) and current into each branch (different, summing to total
current) — directly targets MC-SAME-CURRENT-IN-PARALLEL-BRANCHES.

## Discovery Questions

Discovery-style: "in a parallel circuit, do both branches carry the same
current, or does something else stay the same instead?" — learner
predicts, then the parallel-circuit measurement demonstration resolves it,
directly confronting MC-SAME-CURRENT-IN-PARALLEL-BRANCHES with concrete
numbers.

## Teaching Sequence

Blueprint's lesson-composition-grammar component cited by reference.
Series circuit measurement (repairing MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES)
is addressed first, then parallel circuit measurement (repairing
MC-SAME-CURRENT-IN-PARALLEL-BRANCHES) is addressed via DIRECT SIDE-BY-SIDE
CONTRAST with the series case, since presenting the two topologies
side-by-side (rather than as separate, sequential topics) is what
prevents the "same-everywhere" default from persisting across whichever
topology is discussed second.

## Tutor Actions

DEMONSTRATION (series and parallel circuit measurement, side by side);
COMPARE-CONTRAST (explicit series-vs-parallel table: what's shared, what
divides); WORKED-EXAMPLE (equivalent resistance for mixed series-parallel
networks).

## Voice Teaching Notes

Listen for "same current" or "same voltage" asserted without first
checking series vs. parallel — the direct tell for either misconception.
Load-bearing sentence: "series shares current, divides voltage; parallel
shares voltage, divides current — check the topology first." Channel-
reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming equal current in different-resistance parallel branches
signals MC-SAME-CURRENT-IN-PARALLEL-BRANCHES (MISCONCEIVING, full repair
via measurement). A learner claiming equal voltage across
different-resistance series components signals
MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES (same repair approach). Mastery
trigger: correctly identifying what's shared vs. divided for both
topologies, AND correctly computing equivalent resistance for a mixed
series-parallel network. Blueprint's assessment component cited for the
full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the numbers for a second — are these two
components sharing the same TWO connection points (parallel), or
connected one-after-the-other (series)?" (isolating topology
identification before applying either rule). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (series/parallel topology identification) bound to procedure
(equivalent resistance calculation). Interleave with `phys.em.ohms-law`
and, once authored, `phys.em.kirchhoffs-laws` (the general-case
successor), plus explicit cross-reference to `phys.em.capacitance`'s
opposite combination rules.

## Transfer Connections

Near: any resistor-network circuit-analysis problem. Far: household
electrical wiring design (why household outlets are wired in parallel,
so each device gets full voltage independently, while some specialized
circuits use series wiring deliberately) and electronic circuit design
generally. Real-world: why one burnt-out bulb in an old-style series
Christmas-light string kills the whole string, while a modern
parallel-wired string doesn't. Expert: series/parallel analysis as a
special case of the general Kirchhoff's-laws framework for arbitrary
topologies.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
lesson-composition-grammar/assessment components by reference. Not
restated: Concept Identity & Metadata, Concept Explanation Multi-Tier,
Worked Examples, Practice Set, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
