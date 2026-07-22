# Capacitance and Capacitors — `phys.em.capacitance`

## Identity

- **Concept ID**: `phys.em.capacitance` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 6.
- **Prerequisites**: `phys.em.electric-potential` — the load-bearing part
  is treating capacitance as a ratio relating charge to the potential
  difference it creates: C = Q/V is a direct application of the potential
  concept, not a new kind of quantity.
- **Unlocks** (from KG): `phys.em.dielectrics` (materials placed between
  capacitor plates to increase capacitance), `phys.em.energy-capacitor`
  (energy stored in a charged capacitor), `phys.em.lc-circuits` and
  `phys.em.rc-circuits` (capacitors as active circuit elements).
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) state that capacitance is defined as C = Q/V, the
ratio of stored charge to the potential difference across a capacitor, and
correctly explain that C is a fixed property of a given capacitor's
geometry (plate area, separation, and any dielectric present), not a
quantity that changes depending on how much charge happens to be stored at
a given moment; (2) correctly compute the equivalent capacitance for
capacitors combined in series and in parallel, and correctly explain why
these combination rules are the OPPOSITE of the corresponding rules for
resistors (parallel resistors combine like series capacitors, and vice
versa); (3) correctly explain how plate separation affects capacitance
(larger separation, smaller capacitance) and why this relationship holds
physically (in terms of the electric field and potential difference
produced for a given charge).

## Core Understanding

Capacitance, C = Q/V, is a fixed geometric/material property of a
particular capacitor — for a parallel-plate capacitor, C = ε₀A/d (permittivity
times plate area, divided by plate separation) — describing how much charge
that capacitor can store per volt of potential difference applied across
it. Critically, C itself does NOT depend on how much charge is actually
stored at any given moment: if you double the charge on a capacitor's
plates, the potential difference across it also doubles, keeping the ratio
Q/V — and therefore C — exactly constant, exactly the way a container's
volume-per-unit-height (its cross-sectional area) doesn't change no matter
how much liquid happens to be in it right now. When capacitors are combined
in series, the equivalent capacitance is smaller than any individual
capacitor (1/C_eq = 1/C₁ + 1/C₂ + ...), because series capacitors
effectively increase the total plate separation for the same charge,
reducing overall capacitance; when combined in parallel, the equivalent
capacitance is larger than any individual capacitor (C_eq = C₁ + C₂ + ...),
because parallel capacitors effectively increase the total plate area
available to store charge. This is the exact mirror image of how resistors
combine (series resistors ADD directly; parallel resistors combine via
reciprocals) — a genuinely useful, memorable contrast, but also a genuine
trap for students who over-apply resistor intuition to capacitors without
registering the swap.

## Mental Models

**Beginner (arriving model)**: "A capacitor stores charge, and capacitance
is how much charge it holds." This model treats capacitance as if it were
simply "capacity" in the everyday sense (a fixed maximum amount a container
can hold), missing that capacitance is actually a RATIO (charge per volt),
and that the SAME capacitor stores different amounts of charge depending on
the voltage applied — capacitance describes the relationship, not a fixed
charge ceiling. Upgrade trigger: asking whether a capacitor holds the same
fixed number of charges regardless of applied voltage, or a different
amount depending on voltage, directly confronts the "fixed maximum"
misreading.

**Intermediate**: "Capacitance C = Q/V is a fixed property of the
capacitor's geometry; doubling charge doubles voltage, keeping C constant."
This model correctly separates C from the momentary values of Q and V, but
often applies the series/parallel combination rules for capacitors as
memorized formulas without registering that they are structurally inverted
relative to the already-familiar resistor combination rules, leading to
combination errors under time pressure or when switching between resistor
and capacitor circuit problems in the same session.

**Advanced**: "Series capacitors combine like parallel resistors (both use
the reciprocal-sum rule) because series capacitors effectively increase
total plate separation (reducing capacitance, mirroring how parallel
resistors reduce resistance by adding parallel current paths); parallel
capacitors combine like series resistors (both add directly) because
parallel capacitors effectively increase total plate area." This model
explicitly names and exploits the resistor/capacitor combination-rule
inversion as a memorable, reasoned pattern rather than two separately
memorized formula sets.

**Expert**: "Capacitance is one specific instance of the general concept of
a system's 'compliance' — how much a system's state variable (charge, here)
changes per unit of the conjugate driving variable (voltage, here) — the
same mathematical role played by mechanical compliance (inverse spring
stiffness) and thermal capacitance in other physical systems." Not required
for mastery, but worth flagging as the cross-domain unifying pattern for a
student ready for it.

## Why Students Fail

The dominant failure mode is combination-rule inversion confusion: because
students learn resistor combination rules first and practice them
extensively, the capacitor combination rules (which use the EXACT OPPOSITE
structure — reciprocal-sum for series, direct-sum for parallel) are
frequently applied with the resistor pattern instead, producing confidently
wrong answers that "feel" procedurally correct because the calculation
itself is executed cleanly, just using the wrong rule.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.em.capacitance.md`,
Component 3 — Misconception Profiles) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-SERIES-CAPACITORS-ADD-DIRECTLY**: the belief that capacitors in
  series combine by simple direct addition (C_eq = C₁ + C₂), the same rule
  as series resistors, rather than the correct reciprocal-sum rule. **Birth
  type**: analogy overextension (Type 6) — the resistor combination rules,
  learned first and practiced extensively, are directly transferred to
  capacitors without registering that the underlying physical mechanism
  (and therefore the correct rule) is inverted for capacitance. Detection
  probe: "Two identical 10 μF capacitors are connected in series. Is the
  equivalent capacitance greater than 10 μF, less than 10 μF, or exactly
  20 μF?" An answer of "20 μF" reveals this misconception (the correct
  answer is 5 μF, LESS than either individual capacitor).
- **MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE**: the belief that
  increasing the distance between a parallel-plate capacitor's plates
  increases its capacitance, rather than decreasing it (C = ε₀A/d, so C is
  inversely proportional to separation d). **Birth type**: overgeneralization
  (Type 1) — "more space/distance" is often associated with "more room to
  store more," a broadly reliable everyday heuristic incorrectly extended to
  capacitor geometry, where greater plate separation actually WEAKENS the
  electric field's ability to accumulate charge for a given voltage (a
  larger separation requires a larger voltage to push the same charge onto
  the plates, meaning the SAME charge now corresponds to a LARGER voltage,
  reducing C = Q/V). Detection probe: "If you pull the plates of a
  parallel-plate capacitor farther apart (with charge held constant), does
  its capacitance increase or decrease?" An answer of "increase" reveals
  this misconception.

## Analogies

**Best analogy — two different-shaped water containers with the same
cross-sectional area vs. combining containers.** Capacitance is like a
container's ability to store more volume per unit of "fill height"
(voltage) — a wider container (larger plate area) stores more volume per
unit height, exactly as larger plate area increases C. Connecting two
containers side by side (parallel) increases total storage-per-height
(capacitance adds directly), while stacking containers vertically in series
(so the same total "fill height" must be shared across all of them)
effectively reduces how much any single unit of height can hold across the
whole stack (capacitance combines via reciprocals) — directly targeting
MC-SERIES-CAPACITORS-ADD-DIRECTLY through a physical, visualizable
combination-rule analog. **Breaking point**: water containers don't have an
exact electrical analog for voltage/potential difference across each
element, so this analogy is for the combination-RULE-shape (direct-sum vs.
reciprocal-sum), not for deriving the exact numeric formula.

**Alternative analogy — stretching a rubber sheet.** A parallel-plate
capacitor's field is like tension in a rubber sheet stretched between two
plates — pulling the plates farther apart (increasing separation) makes it
"harder" (requires more voltage) to push the same amount of charge onto the
plates, directly countering MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE
by framing greater separation as making charge storage HARDER, not easier.

**Story analogy**: the historical parallel-plate capacitor design used in
early Leyden jars (one of the first practical charge-storage devices) is a
worthwhile brief historical anchor, though not central to mastery.

**Visual analogy**: a side-by-side circuit diagram showing series
capacitors and series resistors, with an explicit annotation that the
combination formula "swaps" between the two element types — directly and
visually confronting MC-SERIES-CAPACITORS-ADD-DIRECTLY by making the
inversion pattern explicit rather than implicit.

**Anti-analogy**: do NOT describe capacitors as "just like resistors, but
for charge instead of current" without an immediate, explicit combination-
rule-inversion caveat — this framing is exactly what installs
MC-SERIES-CAPACITORS-ADD-DIRECTLY by implying the two circuit elements
behave analogously in every respect, including combination rules, when they
in fact behave oppositely for series/parallel combination specifically.

## Demonstrations

**Physical**: a variable-separation parallel-plate capacitor (a real,
inexpensive demonstration apparatus) connected to a capacitance meter,
showing the reading change directly as plate separation is adjusted —
directly targets MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE with
observable evidence.

**Digital/interactive**: a circuit simulator allowing the learner to build
series and parallel capacitor combinations and compute (or measure) the
equivalent capacitance, directly comparing against the series/parallel
resistor case built alongside it for explicit contrast.

**Teacher-demo with elicited prediction**: before revealing the correct
series-combination answer, ask "two identical 10 μF capacitors in series —
is the combined capacitance more than, less than, or equal to 10 μF?" —
directly surfacing MC-SERIES-CAPACITORS-ADD-DIRECTLY for diagnosis before
instruction.

## Discovery Questions

**Argued call: a genuine discovery design fits well for the combination
rules specifically.** Need: "if resistors in series simply add, do
capacitors in series work the same way, or differently?" Playground: the
learner (via simulator or measured real capacitors) tests several series
and parallel capacitor combinations, recording the equivalent capacitance
in each case. Invention: the learner is guided to notice that series
combinations produce a SMALLER equivalent capacitance than any individual
capacitor (surprising, if the resistor-series intuition is assumed), and
proposes a reciprocal-sum relationship from the pattern in their own data.
Collision: present the resistor-vs-capacitor combination-rule contrast
diagram directly as a test of whatever rule the learner has proposed.
Formalization: name both combination formulas explicitly, connecting each
to the plate-area/plate-separation mechanism. Compression: "capacitors
combine oppositely to resistors: series capacitors use reciprocals
(smaller result), parallel capacitors add directly (larger result)." For
the specific ε₀A/d formula's derivation, direct instruction is more
appropriate given the underlying field-theory machinery involved.

## Teaching Sequence

This concept's Blueprint (Component 5 — Lesson Composition Grammar)
provides the turn-by-turn script; cited by reference. The concept-specific
sequencing logic this entry adds: MC-SERIES-CAPACITORS-ADD-DIRECTLY should
be surfaced and repaired using DIRECT CONTRAST against the already-secure
resistor combination rules, not in isolation — presenting the capacitor
rule alone risks the learner correctly memorizing it in the moment while
still defaulting to the resistor pattern under time pressure later; the
explicit side-by-side contrast (Visual analogy, above) should be introduced
at the same teaching turn as the capacitor rule itself, not as a later
add-on. MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE should be
addressed once the C = Q/V definition itself is fully secure, since the
repair (larger separation requires more voltage for the same charge,
lowering C) depends on fluently reasoning through the Q/V ratio, not just
recalling the formula ε₀A/d.

## Tutor Actions

From `../teaching-actions/*`: COMPARE-CONTRAST (the resistor-vs-capacitor
combination-rule table) is the single best-fit action for
MC-SERIES-CAPACITORS-ADD-DIRECTLY, since this misconception's root cause is
specifically an unexamined cross-element analogy. DEMONSTRATION (the
variable-separation capacitor) fits well for
MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE. WORKED-EXAMPLE (computing
equivalent capacitance for mixed series/parallel networks) fits the
computational learning objective. ERROR-ANALYSIS (a worked solution that
adds series capacitors directly) directly confronts
MC-SERIES-CAPACITORS-ADD-DIRECTLY.

## Voice Teaching Notes

Listen for a learner confidently stating "so they just add" when
describing series capacitors — this is the direct verbal tell for
MC-SERIES-CAPACITORS-ADD-DIRECTLY and should trigger an immediate
comparison prompt ("does that match what happens with series resistors, or
is it different?") rather than a blunt correction, leveraging the learner's
own already-secure resistor knowledge as the repair tool. The load-bearing
sentence to slow down on is the combination-rule-inversion statement itself
— "capacitors combine the OPPOSITE way resistors do" — since this single
sentence, if rushed or under-emphasized, is exactly what allows the
resistor-pattern default to persist unchallenged. General channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "20 μF" answer to the series-capacitor probe signals
MC-SERIES-CAPACITORS-ADD-DIRECTLY firmly held (MISCONCEIVING quadrant, full
repair via the resistor-contrast method required). A hesitant or
self-correcting answer suggests the correct rule is present but fragile.
Mastery-certification trigger: the learner correctly computes equivalent
capacitance for both series and parallel combinations without external
cueing, AND correctly predicts that increasing plate separation decreases
(not increases) capacitance. This concept's Blueprint (Component 6 —
Assessment Items) contains the full item bank; check there before
authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "wait, is this the same as
resistors or not?" expressed when a learner first encounters capacitor
combination rules — this is exactly the productive confusion the concept
depends on surfacing, and the concept-specific shrink-to question is "just
answer this: does adding a SECOND capacitor in series make it HARDER or
EASIER to store the same total charge?" (isolating the physical mechanism —
harder, since total effective separation increases — before re-introducing
the formal reciprocal-sum formula). See
`../foundations/01-recovery-engine.md` for generic engine mechanics.

## Memory Hooks

Concept type: procedure (combination-rule calculation) bound to a
discrimination skill (correctly distinguishing capacitor rules from the
already-known, structurally opposite resistor rules) — review should
always interleave capacitor and resistor combination problems within the
same session, specifically because the discrimination between the two
rule sets, not either rule alone, is this concept's highest-failure-rate
component. Interleaving partners: `phys.em.electric-potential` (the Q/V
ratio's conceptual basis) and, once authored, `phys.em.ohms-law` /
resistor-network concepts (the deliberate contrast partner for combination
rules).

## Transfer Connections

**Near transfer**: any capacitor-network circuit-analysis problem,
including mixed series-parallel networks requiring the combination rules
applied in sequence. **Far transfer**: capacitor selection in real circuit
design (choosing capacitor values and configurations for filtering, timing,
and energy-storage applications) and, once `phys.em.energy-capacitor` is
studied, energy-storage system design (capacitor banks in power
electronics). **Real-world transfer**: understanding why capacitors are
used for camera flash energy storage (rapid charge/discharge, distinct from
battery chemistry) as an everyday device application. **Expert-transfer**:
recognizing the general "compliance" pattern (charge per unit potential;
displacement per unit force; heat per unit temperature) as a recurring
mathematical structure across electrical, mechanical, and thermal physics.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. No genuinely
strong cross-SUBJECT connection (beyond the intra-physics resistor contrast
already treated in depth above) was identified for this specific concept at
this curriculum level — recorded as a "weak but real" honest assessment
rather than a fabricated link.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.em.capacitance.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Profiles** (both misconceptions, birth-type classification
added, not re-derived), **Component 5 — Lesson Composition Grammar** (cited
in Teaching Sequence), and **Component 6 — Assessment Items** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Identity &
Metadata), Component 1 (Concept Explanation Multi-Tier), Component 2
(Worked Examples), Component 4 (Practice Set), Component 7 (Retrieval
Spacing Schedule), Component 8 (Prerequisite & Unlock Map).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

No genuinely strong cross-subject connection was found beyond this
concept's intra-physics resistor contrast — consistent with the KG's
currently empty `cross_links` field for this node; no fix proposed.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
