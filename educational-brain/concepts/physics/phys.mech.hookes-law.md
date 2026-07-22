# Hooke's Law and Spring Force — `phys.mech.hookes-law`

## Identity

- **Concept ID**: `phys.mech.hookes-law` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 6.
- **Prerequisites**: `phys.mech.newtons-second-law` — the load-bearing part
  is treating the spring force as one more force to plug into F = ma;
  everything specific to this concept (the −kx relationship, the sign
  convention, the linearity limit) is new content built on that frame.
- **Unlocks** (from KG): `phys.mech.stress-strain` (generalizing Hooke's
  law from a single spring to a deformable material's elastic response),
  `phys.wave.shm` (simple harmonic motion, whose entire mathematical
  structure is Hooke's law combined with F = ma).
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state Hooke's law, F = −kx, and correctly identify what
each symbol represents (spring constant, displacement from equilibrium,
restoring force) including the physical meaning of the negative sign
(the force always opposes the displacement, pointing back toward
equilibrium); (2) correctly compute the force for a given displacement and
spring constant, and correctly compute how a spring's force response
changes when comparing two springs of different stiffness (k values) at the
same displacement; (3) correctly identify that Hooke's law is a good
approximation only within an elastic limit, and that stretching a spring far
enough eventually leaves the linear F = −kx regime entirely; (4) correctly
distinguish "a stiffer spring" (larger k) from "a spring stretched further"
(larger x) as two entirely independent ways to get a larger force.

## Core Understanding

A real spring's restoring force is, for small-to-moderate displacements from
its equilibrium (natural, unstretched) length, directly proportional to how
far it has been displaced, and always points back toward equilibrium — hence
the negative sign in F = −kx, where k (the spring constant) is a fixed
property of that specific spring's stiffness. This is not a universal law of
nature the way gravitation is; it is an empirical, approximately-linear
description of how many real elastic materials behave over a limited range
— stretch or compress far enough, and every real spring eventually
deviates from this linear relationship (the elastic limit), after which
either permanent deformation occurs or the force-displacement relationship
becomes genuinely nonlinear. Within its valid range, though, F = −kx is
exact enough to underlie enormous swaths of physics and engineering, from
literal springs to the vibration of atoms in a solid to the restoring force
in any system executing simple harmonic motion.

## Mental Models

**Beginner (arriving model)**: "A spring pushes or pulls back when you
stretch or squish it." This model is directionally correct (it captures the
restoring nature of the force) but has no quantitative content — no sense
that the force scales with how far the spring is displaced, nor that
different springs respond differently to the same displacement. Upgrade
trigger: asking the learner to predict whether pulling a spring twice as far
produces the same, double, or more-than-double force forces the qualitative
model to become quantitative.

**Intermediate**: "The restoring force is proportional to displacement:
F = −kx." This model is correct and computational but often treats k as an
abstract number to plug in rather than a genuine physical property (spring
stiffness) that can be compared, reasoned about, and predicted from context
(a thick, short spring is stiffer — larger k — than a thin, long one).
Shelf-life warning: this model, taken as universally true for any amount of
displacement, will fail the moment the learner meets a spring stretched
beyond its elastic limit — flag this explicitly rather than let the learner
discover the boundary through confusion later.

**Advanced**: "F = −kx is the leading-order (linear) term of a more general
force-displacement relationship that is only approximately linear near
equilibrium; k itself can be understood as related to the material's
elastic modulus and geometry." This model directly sets up
`phys.mech.stress-strain`, generalizing spring-specific stiffness (k) into
a material-general property (elastic modulus) independent of a particular
object's shape.

**Expert**: "Hooke's law is a specific instance of the general physical
principle that near any stable equilibrium, the restoring force for small
displacements is approximately linear — the same mathematical structure
recurs in molecular bonds, pendulums (for small angles), and any potential-
energy well approximated near its minimum by a parabola." This model is not
required for mastery but is worth flagging as the "why does this simple
formula show up everywhere" insight for a student ready for it.

## Why Students Fail

The dominant failure mode is conflating "stiffer spring" with "more
stretched spring" as if they were the same kind of "bigger" — students
often cannot cleanly separate k (a fixed property of the spring itself) from
x (a variable, situational displacement the experimenter chooses), leading
to confused reasoning whenever a problem varies both simultaneously (e.g.,
comparing a stiff spring pulled a little to a soft spring pulled a lot).

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.mech.hookes-law.md`,
Component 1 — Misconception Register) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-HOOKES-ALWAYS-LINEAR**: the belief that F = −kx holds for any amount
  of stretch or compression, with no elastic limit. **Birth type**:
  overgeneralization (Type 1) — the formula is taught and practiced
  exclusively within its valid linear range, so nothing in the student's
  experience signals a boundary exists, and the formula is generalized to
  "always true" by default, the same pattern that makes many first-taught
  formulas feel universally applicable until a boundary case is explicitly
  introduced. Detection probe: "If you keep stretching a spring further and
  further, does the force just keep increasing according to F = −kx
  forever, or does something else eventually happen?" A confident "it just
  keeps following the formula" answer reveals this misconception.
- **MC-KBIG-MEANS-MORE-EXTENSION**: the belief that a spring with a larger
  spring constant k stretches MORE for a given applied force (confusing
  stiffness with compliance — the two are inversely related: a larger k
  means the spring resists stretching more, so it stretches LESS for the
  same applied force). **Birth type**: language contamination (Type 3) —
  "big k, big spring constant" is misread as "big response," when in fact a
  large spring constant describes a stiff, hard-to-stretch spring producing
  a SMALL extension for a given force; the word "constant" being associated
  with "large = more" in other everyday contexts primes the wrong
  directional intuition. Detection probe: "Spring A has a larger spring
  constant than Spring B. If you apply the same force to both, which one
  stretches further?" An answer of "Spring A" (the larger-k spring) reveals
  MC-KBIG-MEANS-MORE-EXTENSION.

## Analogies

**Best analogy — a stubborn rubber band vs. a loose one.** A stiff rubber
band (large k) resists being stretched — you have to pull hard just to get
a little bit of stretch out of it. A loose, well-worn rubber band (small k)
stretches easily with just a gentle pull. This directly targets
MC-KBIG-MEANS-MORE-EXTENSION by anchoring "stiff = resists stretching = small
extension for a given force" in a tactile, familiar experience. **Breaking
point**: real rubber bands are far more nonlinear than an idealized spring
even at modest stretch, so the analogy should not be pushed toward precise
quantitative claims — it's for the qualitative stiffness/extension
relationship only.

**Alternative analogy — a trampoline vs. a firm mattress.** Both push back
when compressed (restoring force), but the trampoline (small k, "soft") sags
a long way for a gentle push while the firm mattress (large k, "stiff")
barely compresses for the same push — useful for illustrating the same
stiffness concept from a compression rather than stretching angle.

**Story analogy**: Robert Hooke's own 1676 anagram publication of his
discovery ("ceiiinosssttuv," later revealed to decode to "ut tensio, sic
vis" — "as the extension, so the force") is a genuinely interesting
historical hook illustrating that Hooke deliberately delayed full disclosure
to establish priority — worth a brief mention for engagement, not central to
mastery.

**Visual analogy**: a force-vs-extension graph showing a straight line
through the origin (the linear Hooke's-law regime) that eventually curves
away from linearity at large extension — this single diagram directly
counters MC-HOOKES-ALWAYS-LINEAR by making the elastic limit visually
concrete as the point where the graph stops being straight.

**Anti-analogy**: do NOT describe a stiffer spring as "a spring that can
stretch further" — this directly installs MC-KBIG-MEANS-MORE-EXTENSION;
"stiff" must always be anchored to "resists deformation / smaller response
for a given force," never to "can handle more before breaking" (a different,
unrelated property — a stiff spring can in fact be more or less likely to
break than a soft one, independent of its stiffness).

## Demonstrations

**Physical**: hang increasing known weights from a real spring and measure
extension at each step, plotting force vs. extension live — the resulting
straight line (within the elastic range) is far more convincing than any
verbal description, and the demonstration naturally surfaces the elastic
limit if enough weight is added to visibly deviate from linearity.

**Digital/interactive**: a virtual spring simulator allowing the learner to
adjust k and observe how the same applied force produces different
extensions — directly targeting MC-KBIG-MEANS-MORE-EXTENSION through guided
manipulation rather than verbal correction alone.

**Teacher-demo with elicited prediction**: before revealing data, ask "if I
double the weight hanging on this spring, will the stretch double, more than
double, or less than double?" (surfacing whether the linear relationship is
already assumed or not) and separately "if I switch to a stiffer spring and
hang the exact same weight, will it stretch more or less than before?"
(directly surfacing MC-KBIG-MEANS-MORE-EXTENSION before instruction).

## Discovery Questions

**Argued call: a genuine discovery design fits well here**, unlike
universal gravitation's empirical constant. Need: "how much will this spring
stretch if I hang a given weight on it — and can I predict what happens with
a different weight without re-measuring?" Playground: the learner
experiments (physically or via simulation) with several known weights on the
same spring, recording extension each time. Invention: the learner is guided
to notice the pattern in their own data (extension roughly proportional to
weight) and to propose the proportionality themselves before being told the
name "Hooke's law." Collision: present a scenario where the learner's
proposed "always proportional" rule is tested against a spring stretched
far beyond typical classroom range (or shown data from an over-stretched
spring), producing the collision that reveals the elastic limit directly,
rather than being told about it as an abstract caveat. Formalization: the
proportionality is named, F = −kx, with the negative sign explicitly
connected to the restoring (opposing) direction the learner already
observed. Compression: the learner states the rule and its boundary in one
sentence: "force is proportional to stretch, up to a limit."

## Teaching Sequence

This concept's Blueprint (Component 4 — Conceptual Development Sequence)
provides the turn-by-turn script; cited by reference. The concept-specific
sequencing logic this entry adds: MC-KBIG-MEANS-MORE-EXTENSION should be
surfaced and repaired BEFORE any problem comparing two different springs is
attempted, since a student carrying this misconception will systematically
mis-rank spring stiffness on every subsequent comparison problem, and the
error compounds silently (the student may still get single-spring
calculations right while failing every comparison problem, making the
misconception easy to miss if comparison problems are deferred too late in
the session). MC-HOOKES-ALWAYS-LINEAR should be addressed only after the
core linear relationship is secure — introducing the elastic limit too early
(before the linear rule itself is confidently held) risks the learner
concluding the whole rule is unreliable rather than understanding it as a
valid-within-range approximation.

## Tutor Actions

From `../teaching-actions/*`: WORKED-EXAMPLE (side-by-side computation for
two different springs at the same extension, and the same spring at two
different extensions) directly targets both misconceptions by making k and
x's independent roles concrete. PREDICTION (eliciting a stretch-amount guess
before revealing data, as in Demonstrations above) fits well as an opening
move. ERROR-ANALYSIS (presenting a solved problem that swaps which spring
stretches further) directly targets MC-KBIG-MEANS-MORE-EXTENSION. GAME does
not fit especially well here — the core content is a proportional
relationship and its boundary, best served by direct numerical practice
rather than game-skin dressing.

## Voice Teaching Notes

Listen for direction confusion around "stiff" and "soft" when comparing
springs — students sometimes use these words correctly in isolation but
invert them under time pressure when asked to predict a comparison ("the
stiffer one stretches more" said quickly, then self-corrected on reflection)
— this hesitation-then-correction pattern is itself useful diagnostic
signal (see Assessment Signals) distinct from a confident, uncorrected wrong
answer. The load-bearing sentence to slow down on is the negative sign's
meaning — "the force always points back toward equilibrium, opposite to the
displacement" — since rushing past this is exactly how sign-confusion
errors in later simple-harmonic-motion work get planted. General
channel-reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident wrong answer to the stiffness-comparison probe ("the
stiffer spring stretches more") signals MC-KBIG-MEANS-MORE-EXTENSION firmly
held, appropriate for the MISCONCEIVING quadrant (D1 grid) requiring a full
schema-repair chain, not just a hint. A slow, hedged answer with
self-correction mid-sentence suggests the misconception is present but
weakly held, more appropriately handled with a single clarifying question
than a full repair sequence. Mastery-certification trigger: the learner
correctly compares force or extension across at least two different-k
scenarios (not just varying x on one spring) without external cueing, and
correctly states that Hooke's law has a limited valid range when asked
directly. This concept's Blueprint (Component 6 — Mastery Probe Set)
contains the full item bank; check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: confusion expressed as "wait, which
one is which again?" when a problem introduces both a k comparison and an x
comparison simultaneously — this is a working-memory overload symptom, not
necessarily a misconception, and the concept-specific shrink-to question is
"let's just look at ONE spring first — if I stretch it further, does the
force go up or down?" (isolating the x-only relationship before
reintroducing the k comparison). See `../foundations/01-recovery-engine.md`
for generic engine mechanics.

## Memory Hooks

Concept type: concept (the proportional relationship) bound to a
discrimination skill (correctly separating k and x's independent roles) —
review should specifically interleave problems that vary k alone, x alone,
and both together, since the discrimination skill (not just the formula) is
the harder, more failure-prone part of this concept. Interleaving partners:
`phys.mech.newtons-second-law` (the F = ma frame Hooke's law plugs into) and,
once authored, `phys.wave.shm` (where Hooke's law becomes the source of an
oscillating restoring force) — mixing static Hooke's-law problems with
dynamic SHM problems reinforces that the same force law underlies both a
static equilibrium calculation and a full oscillation.

## Transfer Connections

**Near transfer**: any linear restoring-force problem, including simple
pendulums for small angles (a different physical system, same F ∝ −x
mathematical structure) and molecular bond models in introductory chemistry.
**Far transfer**: engineering design of springs, suspensions, and any
compliant mechanical element, where selecting an appropriate spring
constant for a desired force-displacement response is a direct, everyday
application. **Real-world transfer**: understanding why a "softer" mattress
or car suspension compresses more under the same weight than a "firmer"
one — directly countering MC-KBIG-MEANS-MORE-EXTENSION in an everyday
physical experience the learner has likely already had. **Expert-transfer**:
recognizing Hooke's law as the linear (small-displacement) approximation of
a much broader class of restoring-force phenomena (any stable equilibrium,
expanded near its minimum, looks locally like a Hooke's-law spring) — a
pattern-recognition habit that recurs throughout advanced mechanics and
quantum mechanics (the harmonic oscillator).

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to chemistry (molecular bond vibration
models, which use the identical Hooke's-law mathematical structure for the
restoring force between bonded atoms) — not currently captured as a
cross_link. Recorded as Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.mech.hookes-law.md`
(Component-format). This entry reuses by reference: **Component 1 —
Misconception Register** (both misconceptions, birth-type classification
added above, not re-derived), **Component 4 — Conceptual Development
Sequence** (cited in Teaching Sequence rather than restated), and
**Component 6 — Mastery Probe Set** (cited in Assessment Signals rather than
restated). Not restated here: Component 2 (Prerequisite Diagnostic Block),
Component 5 (Worked Examples), Component 7 (Session Architecture), Component
8 (Adaptive Flags).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, pedagogically
useful connection to chemistry's molecular bond vibration models (both use
the identical Hooke's-law mathematical form). Flagged for the Curriculum
Production Pipeline's own backlog, not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
