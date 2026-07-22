# Ampere's Circuital Law — `phys.em.amperes-law`

## Identity

- **Concept ID**: `phys.em.amperes-law` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 6.
- **Prerequisites**: `phys.em.biot-savart` — the load-bearing part is
  already having a working method (Biot-Savart) for computing magnetic
  field from current; Ampere's law is introduced as a more powerful,
  symmetry-exploiting alternative for the same underlying physical
  question, not a replacement concept requiring different foundations.
- **Unlocks** (from KG): `phys.em.maxwells-equations` (Ampere's law is one
  of the four, later corrected with the displacement current term),
  `phys.em.solenoid` (a direct, high-value application where Ampere's law
  dramatically simplifies an otherwise difficult Biot-Savart calculation).
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) state Ampere's circuital law, ∮B·dl = μ₀I_enc, and
correctly explain that it relates the line integral of magnetic field
around ANY closed loop (an "Amperian loop") to only the current enclosed by
that loop, regardless of currents outside it; (2) correctly select an
appropriate Amperian loop (exploiting the current distribution's symmetry)
to compute magnetic field for symmetric current configurations (a long
straight wire, a solenoid), and correctly explain WHY the loop's symmetry
must match the current distribution's symmetry for the calculation to be
tractable; (4) correctly identify that Ampere's law, in its basic form, is
valid for any closed loop and current distribution but is only
COMPUTATIONALLY USEFUL (easy to solve for B) when the situation has enough
symmetry to make B constant (or zero) along relevant portions of the chosen
loop.

## Core Understanding

Ampere's circuital law, ∮B·dl = μ₀I_enc, states that the line integral of
the magnetic field around any closed path (an Amperian loop) equals μ₀
(a universal constant) times the total current enclosed by that loop —
critically, ONLY the enclosed current matters; any current outside the loop
contributes nothing to this particular integral, no matter how large or
close it is. This is always true, for any closed loop and any current
distribution, but it is only practically SOLVABLE for the magnetic field B
itself when the current distribution has enough symmetry that an
appropriately-chosen loop makes B constant in magnitude (and known in
direction) along the relevant parts of the path, allowing the integral to
be pulled outside as B times the loop's relevant length. For a long straight
wire, the natural Amperian loop is a circle centered on the wire (by
symmetry, B is constant in magnitude and tangent to this circle everywhere
along it); for a solenoid, the natural loop is a rectangle with one side
inside the solenoid (where B is strong and uniform) and one side far
outside (where B is negligible). Choosing an Amperian loop that does NOT
match the current distribution's symmetry (e.g., a circular loop around an
irregularly-shaped, non-symmetric current distribution) still makes the law
TRUE, but makes the integral intractable to solve directly for B, which is
exactly why symmetric configurations are the standard, teachable use case.

## Mental Models

**Beginner (arriving model)**: "Ampere's law gives you the magnetic field
from any current configuration, the way Biot-Savart does, just with a
different-looking formula." This model treats Ampere's law as a drop-in
computational replacement for Biot-Savart with no sense that its practical
usefulness depends critically on symmetry. Upgrade trigger: asking the
learner to attempt Ampere's law on a deliberately asymmetric current
configuration (e.g., a single point charge moving, or an irregular current
loop) and observing that the integral cannot be pulled outside as B × length
directly confronts the "always equally useful" assumption.

**Intermediate**: "Ampere's law, ∮B·dl = μ₀I_enc, is always TRUE, but only
practically SOLVABLE for B when the Amperian loop can be chosen to exploit
the current distribution's symmetry." This model correctly separates
universal truth from practical solvability, but often still treats "choose
a loop matching the symmetry" as a memorized recipe (circle for a wire,
rectangle for a solenoid) rather than a reasoned choice the learner could
make for a novel symmetric configuration.

**Advanced**: "The correct Amperian loop shape follows directly from asking
'along what path is B constant in magnitude, and known/constant in
direction, given this current distribution's symmetry?' — a circular loop
matches cylindrical symmetry (an infinite straight wire); a rectangular
loop with one side deep inside a long solenoid matches the solenoid's
translational symmetry along its axis." This model generalizes the
loop-choice reasoning into a portable tool for any sufficiently symmetric
new configuration, rather than a fixed list of memorized shapes.

**Expert**: "Ampere's law in this basic form is incomplete — it fails for
time-varying electric fields (e.g., inside a charging capacitor's gap,
where there is no conduction current but a changing electric field still
produces a magnetic field), which is exactly why Maxwell added the
displacement current term, producing the full Ampere-Maxwell law that
appears among Maxwell's four equations." Not required for mastery, but
worth flagging explicitly as an honest "this version has a known limit,
corrected in the very next unlock" fact, rather than presenting the basic
law as the final, complete word on the subject.

## Why Students Fail

The dominant failure mode is symmetry-blindness: because the two standard
worked examples (straight wire, solenoid) are practiced repeatedly with
their specific loop shapes essentially handed to the student, many students
never develop genuine reasoning about WHY that particular loop shape was
chosen, and are unable to select or justify an appropriate Amperian loop
when faced with an unfamiliar (even if still symmetric) current
configuration — treating loop selection as a memorized pattern-match rather
than a reasoned consequence of the specific symmetry present.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.em.amperes-law.md`,
Component 3 — Misconception Engine) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY**: the belief that
  the magnetic field AT A SPECIFIC POINT on the Amperian loop depends only
  on the enclosed current, ignoring any contribution from current outside
  the loop — a subtly wrong overreading of the law's actual claim, which is
  about the LINE INTEGRAL of B around the whole loop, not the value of B at
  any single point. In reality, external currents absolutely do contribute
  to the magnetic field's value at individual points on the loop (and can
  even make B non-constant around an otherwise-symmetric loop if placed
  asymmetrically) — the law's exact claim is about the total INTEGRAL, which
  happens to depend only on enclosed current, not that each point's B value
  individually depends only on enclosed current. **Birth type**:
  overgeneralization (Type 1) — the correct, narrower claim ("the total
  line integral depends only on enclosed current") is over-simplified during
  learning into the broader, incorrect claim ("the field depends only on
  enclosed current"), losing the crucial line-integral qualifier. Detection
  probe: "A current-carrying wire lies just outside an Amperian loop, very
  close to one section of it, with no current enclosed by the loop at all.
  Does this outside wire affect the magnetic field AT POINTS on the loop,
  even though it contributes zero to the enclosed current and therefore
  zero to the line integral?" An answer of "no effect at all" reveals this
  misconception (the outside wire absolutely does affect local B values;
  it just happens that its contributions to the line integral around the
  full loop sum to zero).
- **MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES**: the belief that any
  Amperian loop, chosen for any current configuration, can be practically
  solved for B, when in fact the law is only solvable in closed form when
  sufficient symmetry exists to make B constant (or zero) along the
  relevant path segments. **Birth type**: overgeneralization (Type 1) — the
  two standard worked examples (wire, solenoid) are the only cases most
  students ever practice, and the law's universal TRUTH (it always holds)
  is conflated with universal SOLVABILITY (it can always be practically
  used to find B), without the symmetry-dependence of solvability being
  made explicit. Detection probe: "Could you use Ampere's law to easily
  compute the magnetic field near an irregularly bent, asymmetric current-
  carrying wire, the same way you did for a straight wire?" An answer of
  "yes, just as easily" reveals this misconception.

## Analogies

**Best analogy — a sealed room's total heat loss vs. temperature at any
specific wall point.** Ampere's law is like knowing the TOTAL heat energy
escaping through every surface of a sealed room (analogous to the full
line integral around the loop, determined only by what's generating heat
INSIDE the room) — this total is fixed and known from the internal heat
sources alone, but it tells you nothing about the specific temperature at
any one particular point on a specific wall (analogous to B at one point on
the loop), which depends on the full, detailed arrangement of heat sources
both inside AND outside, plus the room's specific geometry. This directly
targets MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY by separating the
aggregate, integral-level claim from the pointwise claim. **Breaking
point**: heat and magnetic field are different physical quantities with
different mathematical structures (scalar heat flow vs. vector field
circulation), so this analogy is for the aggregate-vs-pointwise structural
distinction only, not a literal physical equivalence.

**Alternative analogy — total votes cast in an election vs. the vote count
at one specific polling station.** The nationwide total (analogous to the
enclosed-current-determined line integral) is fixed by the total pool of
voters, but knowing the total tells you nothing about how many votes were
cast at any ONE specific polling station (analogous to a specific point's B
value), which depends on local, station-specific factors.

**Story analogy**: André-Marie Ampère's own systematic study of the forces
between current-carrying wires (building directly on Oersted's accidental
1820 discovery that current deflects a compass needle) is a worthwhile
historical anchor establishing that electromagnetism as a unified field of
study effectively began with exactly this kind of careful, symmetry-driven
mathematical formalization.

**Visual analogy**: a diagram showing a circular Amperian loop around a
straight wire, with a SECOND wire drawn just outside the loop — annotated
to show that while the outside wire's current does not enter the
I_enc term, its magnetic field still visibly bends/adds to the field
lines at points along the loop, breaking the loop's otherwise-clean
symmetry and making the integral (though still equal to μ₀I_enc overall)
no longer trivially solvable by pulling B outside as a constant.

**Anti-analogy**: do NOT describe Ampere's law as "a shortcut that always
works instead of Biot-Savart" — this framing directly installs
MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES by suggesting universal practical
superiority rather than a symmetry-dependent tool that is dramatically
easier ONLY in specific, sufficiently symmetric cases (and, for genuinely
asymmetric cases, Biot-Savart or numerical methods remain necessary).

## Demonstrations

**Physical/visual**: use field-line visualization software or iron-filing
photographs to show the actual magnetic field pattern around a straight
wire WITH a second, nearby external wire present — visually showing the
field lines are distorted from perfect circular symmetry by the external
wire, even though the enclosed-current-only line-integral result still
holds exactly — directly targeting MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY.

**Digital/interactive**: a magnetic field simulator allowing the learner to
place multiple current-carrying wires and draw a candidate Amperian loop,
observing both the (visually complex, asymmetric) field pattern and the
(still simple, enclosed-current-only) line-integral value.

**Teacher-demo with elicited prediction**: before revealing the answer, ask
"if I place a strong external current-carrying wire just outside this
Amperian loop, will the magnetic field AT POINTS on the loop stay exactly
the same as before, or will it change?" — directly surfacing
MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY for diagnosis.

## Discovery Questions

**Argued call: a genuine discovery design fits reasonably well for the
loop-selection reasoning, though the law's own statement is best delivered
by direct instruction.** Need (once the law itself is given): "why does the
standard worked example for a straight wire use a CIRCULAR loop, and the
standard solenoid example use a RECTANGULAR loop — could either shape work
for both situations?" Playground: the learner attempts (or is shown
attempts at) using a rectangular loop for the straight-wire case and a
circular loop for the solenoid case, observing that these mismatched
choices do not simplify to a solvable integral. Invention: the learner
proposes that the loop shape must be chosen to match the current
distribution's own symmetry. Collision: present a genuinely novel but
still symmetric configuration (e.g., a toroidal coil) and ask the learner
to propose an appropriate loop shape using their own newly-stated
principle, before being shown the standard answer. Formalization: name the
general principle explicitly — choose the loop so B is constant (or zero)
along each segment, exploiting the current distribution's symmetry.
Compression: "pick the loop shape that matches the symmetry of the
currents — that's what makes the integral solvable."

## Teaching Sequence

This concept's Blueprint (Component 6 — Session Flow Script) provides the
turn-by-turn script; cited by reference. The concept-specific sequencing
logic this entry adds: MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES should be
surfaced and repaired using an explicit ATTEMPTED-AND-FAILED mismatched-loop
demonstration (Discovery Questions, above) BEFORE introducing any new
symmetric configuration beyond the two standard examples — a student who
believes the law is universally, equally solvable will not understand why
loop CHOICE matters at all, undermining the entire point of the symmetry-
reasoning skill this concept is meant to build.
MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY should be addressed once
the basic law and its standard applications are secure, using the
external-wire field-distortion demonstration directly as the repair
mechanism, since this misconception is subtle enough that verbal correction
alone is unlikely to be sufficient without a concrete counterexample.

## Tutor Actions

From `../teaching-actions/*`: DEMONSTRATION (the external-wire field
visualization) is the best-fit action for
MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY, since this
misconception's subtlety benefits enormously from direct visual evidence.
ERROR-ANALYSIS (attempting a mismatched loop shape and observing the
integral fails to simplify) directly targets MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES.
WORKED-EXAMPLE (the standard wire and solenoid derivations, plus at least
one novel symmetric configuration like a toroid) fits the core
computational objective and the symmetry-reasoning generalization goal.
CONCEPT-MAP (relating symmetry type to loop shape to which path segments
allow B to be pulled outside the integral) fits well as a consolidating
activity.

## Voice Teaching Notes

Listen for a learner asserting that a nearby external current "doesn't
matter at all" to the field near a loop with zero enclosed current — this
is the direct verbal tell for
MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY and should trigger the
external-wire demonstration rather than a purely verbal correction. The
load-bearing sentence to slow down on is the precise scope of the law's
claim — "the TOTAL LINE INTEGRAL around the loop depends only on enclosed
current — not the field at any one point" — since compressing this into a
casual "the enclosed current gives you the field" restatement is exactly
how the misconception gets installed or reinforced. This concept's core
evidence is substantially visual/diagrammatic (field-line patterns and loop
geometry); general channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "no effect at all" answer to the external-wire probe
signals MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY firmly held
(MISCONCEIVING quadrant, full repair via demonstration required). A
correct-but-uncertain answer suggests the subtle distinction is present but
fragile. Mastery-certification trigger: the learner correctly derives B for
at least one novel (not memorized wire/solenoid) symmetric current
configuration by independently choosing an appropriate Amperian loop and
justifying the choice via symmetry, AND correctly explains that external
currents affect pointwise B even when excluded from I_enc. This concept's
Blueprint (Component 4 — Assessment Probes) contains the full item bank;
check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "I don't know what shape loop to
pick" expressed when faced with an unfamiliar symmetric configuration — the
concept-specific shrink-to question is "forget the loop for a second — just
looking at this current distribution's shape, along what kind of path would
you expect the field's STRENGTH to stay the same everywhere?" (isolating
the symmetry-recognition step before re-introducing the formal loop-
selection procedure). See `../foundations/01-recovery-engine.md` for
generic engine mechanics.

## Memory Hooks

Concept type: procedure (loop selection and integral evaluation) bound to a
concept (the enclosed-current-only, line-integral-level claim) — review
should specifically test loop-selection reasoning on NOVEL symmetric
configurations, not just the two standard memorized examples, since
pattern-matching to memorized shapes (rather than genuine symmetry
reasoning) is this concept's highest-failure-rate risk. Interleaving
partners: `phys.em.biot-savart` (the more general, always-computationally-
valid alternative method, useful for contrast on asymmetric cases) and,
once authored, `phys.em.solenoid` (the immediate high-value application)
and `phys.em.maxwells-equations` (the corrected, complete version).

## Transfer Connections

**Near transfer**: any symmetric magnetic-field calculation problem,
including toroidal coils and coaxial cable field calculations, both direct
extensions of the same symmetry-exploiting reasoning. **Far transfer**:
electromagnet and inductor design (engineering applications directly
building on solenoid field calculations enabled by Ampere's law). **Real-world
transfer**: understanding why MRI machines and particle accelerators use
carefully wound solenoid/toroid coil geometries specifically because their
symmetry makes the resulting field both calculable and controllable via
exactly this reasoning. **Expert-transfer**: recognizing the general
pattern of "exploit a symmetry to convert a hard integral into simple
algebra" as a technique that recurs throughout physics (Gauss's law for
electric fields and gravity use the identical strategic structure) —
Ampere's law is best understood as one instance of this broader
symmetry-exploitation technique, not an isolated formula.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to mathematics (line integrals and vector
calculus, the formal mathematical machinery ∮B·dl represents) — not
currently captured as a cross_link. Recorded as Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.em.amperes-law.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Engine** (both misconceptions, birth-type classification
added, not re-derived), **Component 6 — Session Flow Script** (cited in
Teaching Sequence), and **Component 4 — Assessment Probes** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Identity),
Component 1 (Concept Explanation Blocks), Component 2 (Worked Examples),
Component 5 (Retrieval & Spacing Schedule), Component 7 (Adaptive
Branching), Component 8 (Visualisation Specification).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, direct connection
to mathematics' vector calculus/line integral content. Flagged for the
Curriculum Production Pipeline's own backlog, not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
