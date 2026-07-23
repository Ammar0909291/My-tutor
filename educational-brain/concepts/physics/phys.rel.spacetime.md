# Spacetime Interval and Four-Vectors — `phys.rel.spacetime`

## Identity

- **Concept ID**: `phys.rel.spacetime` (canonical physics KG)
- **Curriculum location**: physics / special relativity — dependency
  level 16.
- **Prerequisites**: `phys.rel.mass-energy` — the spacetime interval and
  four-vector framework generalize the energy-momentum invariant
  E²=(pc)²+(mc²)² already established as a specific four-vector inner
  product.
- **Unlocks** (from KG): `phys.astro.black-holes`, `phys.astro.
  cosmology`.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that the SPACETIME INTERVAL s²
(not Δx or Δt individually) is the Lorentz-invariant quantity that ALL
inertial observers agree on — Δx and Δt separately DO change between
frames (length contraction, time dilation), but the specific combination
s²=c²Δt²−Δx²−Δy²−Δz² does not; (2) correctly explain that a SPACELIKE
interval (s²<0 in the +−−− convention) does NOT mean the events are
unreal or nonphysical — it means the events are causally disconnected
(no signal could link them), and there exists a frame in which they are
simultaneous; (3) correctly explain that the four-vector inner product
uses the MINKOWSKI metric (+−−−), NOT the ordinary 3D dot product — for
four-momentum, p_μp^μ=(E/c)²−|p⃗|²=(mc)², never simply |p⃗|²;
(4) correctly explain that PROPER TIME τ is a single, observer-
independent, geometric invariant (like arc length along a path) — it is
NOT frame-dependent the way coordinate time t is.

## Core Understanding

Space and time form a unified four-dimensional spacetime; the spacetime
interval s²=c²t²−x²−y²−z² is invariant under Lorentz transformations,
and four-vectors A^μ=(A⁰,A¹,A²,A³) generalize this structure so their
inner product A_μA^μ is Lorentz invariant for any physical quantity. A
first persistent error over-generalizes "everything is relative" to
imply the spacetime interval itself must differ between observers — but
direct computation from the Lorentz transformation shows
c²t'²−x'²=γ²(1−β²)(c²t²−x²)=c²t²−x² EXACTLY; what genuinely IS
frame-dependent is Δx and Δt separately (length contraction, time
dilation, and even simultaneity), never the combination s². A second
error, triggered by the counterintuitive sign in the +−−− convention,
treats a SPACELIKE interval (s²<0) as somehow unreal or imaginary — but
spacelike simply means the spatial separation exceeds what light could
bridge (|Δx|>c|Δt|), so no signal could have passed between the events;
both events are perfectly real, just causally disconnected, and there
exists a frame in which they occur simultaneously. A third error applies
the familiar 3D dot product p⃗·p⃗=|p⃗|² directly to four-vectors — but the
Minkowski metric assigns a RELATIVE sign between time and space
components, so p_μp^μ=(E/c)²−|p⃗|²=(mc)², an indefinite (not positive-
definite) quantity that can be zero (for a photon) or positive (for a
massive particle). A fourth error assumes proper time τ, like coordinate
time, varies by observer — but τ=∫ds/c is a GEOMETRIC property of a
worldline, analogous to arc length: when a traveling twin returns and
both twins compare wristwatches side by side, there is exactly one
number on that watch, and every observer must agree on what it reads.

## Mental Models

**Beginner**: "Since everything is relative in relativity, the spacetime
interval should differ between observers too; a spacelike interval means
the events are imaginary or not real; four-vector inner products work
like ordinary 3D dot products; proper time depends on who's watching, like
everything else." Upgrade trigger: applying the Lorentz transformation
directly to a numerical example and recomputing s² in the new frame
(finding it exactly unchanged) directly confronts the everything-is-
relative overgeneralization; computing p_μp^μ using the 3D dot product
and getting the wrong answer (missing (mc)²) directly confronts the
dot-product-transfer assumption.

**Intermediate**: "The spacetime interval s² is the one quantity all
observers agree on, even though Δx and Δt separately are frame-
dependent; spacelike means causally disconnected, not unreal; four-
vector inner products use the Minkowski metric's relative sign between
time and space; proper time is a single geometric invariant, like arc
length." This model correctly captures all four points but may still
need to explicitly apply the metric (+−−−) rather than assume dot-
product intuition transfers when working an unfamiliar four-vector.

**Advanced**: "Always verify which quantities are genuinely frame-
dependent (Δx, Δt, simultaneity) versus genuinely invariant (s², proper
time, any four-vector inner product A_μA^μ) before reasoning about a
relativistic scenario, and never apply 3D dot-product rules to
four-vectors without the metric's relative sign."

**Expert**: the geometric reframing of Lorentz boosts as hyperbolic
rotations in Minkowski space (paralleling ordinary rotations preserving
Euclidean distance) and the direct generalization to general relativity,
where the flat metric η_μν is replaced by a curved g_μν(x) — spacetime
curvature IS gravity — not required for mastery, natural bridge to
`phys.astro.black-holes`.

## Why Students Fail

The dominant failure is over-generalizing relativity's "everything is
relative" framing to the spacetime interval itself, rather than
recognizing it as the specific invariant combination; closely related
failures include treating spacelike separation as unreal rather than
merely causally disconnected, applying the ordinary 3D dot product to
four-vectors without the Minkowski metric's relative sign, and assuming
proper time varies by observer the way coordinate time does.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.rel.spacetime.md`, Section 4
Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (different observers measure different spacetime intervals)**:
  believing "B measures a different interval since they're moving
  differently." **Birth type**: overgeneralization (Type 1) — the
  correct fact that many relativistic quantities (Δx, Δt, simultaneity)
  ARE frame-dependent is over-generalized to imply s² is too, missing
  that s² is exactly the combination the Lorentz transformation is
  constructed to leave invariant. Probe: "If observer A measures s²=9
  m², what does observer B measure for the same two events?"
- **MC-2 (spacelike intervals are unphysical)**: believing "spacelike is
  imaginary — it doesn't correspond to anything real." **Birth type**:
  notation-induced (Type 4) — the sign convention (+−−−) making s²<0
  for spacelike separation is misread as mathematically "imaginary" in
  the colloquial sense of unreal, missing that spacelike simply denotes
  causal disconnection between two perfectly real events. Probe: "What
  does it mean for two events to have spacelike separation?"
- **MC-3 (four-momentum inner product is p⃗·p⃗=|p⃗|²)**: believing
  "p·p=|p|²=p_x²+p_y²+p_z²." **Birth type**: overgeneralization (Type
  1) — the familiar 3D dot product is directly transferred to four-
  vectors, missing the Minkowski metric's relative sign between the time
  and space components. Probe: "What is p_μp^μ for a particle with
  3-momentum p⃗ and energy E?"
- **MC-4 (proper time is observer-dependent)**: believing "the proper
  time depends on the frame." **Birth type**: overgeneralization (Type
  1) — general relativistic "everything is relative" framing is
  extended to proper time specifically, missing that τ is a geometric,
  path-dependent invariant analogous to arc length, on which all
  observers must agree (confirmed when clocks are compared side by
  side). Probe: "Does the astronaut's wristwatch (proper time) depend on
  who observes it?"

## Analogies

**Best**: 3D spatial rotations preserving Euclidean distance r²=x²+y² —
rotating axes changes the (x,y) coordinates of a point but never the
distance; Lorentz boosts are the spacetime analog, changing (ct,x) but
never s²=c²t²−x² — directly targets MC-1 by grounding invariance in a
familiar geometric precedent, with the explicit breaking point that the
Minkowski metric's relative MINUS sign (rather than Euclidean's all-
positive signs) makes s² able to be positive, negative, or zero — a
structure with no Euclidean analog, which directly explains why
spacelike (MC-2) is a meaningful, real classification rather than an
error.

**Anti-analogy**: do NOT say "in relativity, absolutely everything is
relative, nothing is fixed" without immediately naming the invariants —
this vague framing is exactly what feeds MC-1 (interval invariance) and
MC-4 (proper time invariance); always pair "many things ARE relative"
with "but here specifically is what stays the same."

## Demonstrations

Worked-example: apply the Lorentz transformation to a specific numerical
event pair, computing s² in the original frame and again after boosting
at v=0.6c, verifying the identical value −16c² in both — directly
targets MC-1. Worked-example: compute p_μp^μ=(E/c)²−|p⃗|²=(mc)² for a
specific particle both at rest and in motion, verifying both give the
same invariant (mc)² — directly targets MC-3 by making the metric's
relative sign concrete and checkable.

## Discovery Questions

Discovery-style: "Starting from the Lorentz transformation formulas
ct'=γ(ct−βx), x'=γ(x−βct), expand c²t'²−x'² algebraically. What do you
get?" — learner derives γ²(1−β²)(c²t²−x²)=c²t²−x² themselves, converting
interval invariance from an asserted fact into a self-derived result,
directly confronting MC-1.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: derive interval invariance algebraically from the Lorentz
transformation → draw a Minkowski diagram classifying events as
timelike/spacelike/lightlike → compute p_μp^μ for a photon and a massive
particle). MC-1 (interval invariance) is addressed first via the
algebraic derivation, before MC-2 (spacelike reality) during the
Minkowski-diagram classification exercise, before MC-3 (dot-product
transfer) during the four-momentum computation, with MC-4 (proper time)
addressed via the twin-paradox discussion woven into the closing
consolidation.

## Tutor Actions

WORKED-EXAMPLE (interval invariance verified numerically before and
after a Lorentz boost); WORKED-EXAMPLE (p_μp^μ computed for a photon vs.
a massive particle, both consistent with the same invariant); THOUGHT-
EXPERIMENT (deriving interval invariance algebraically from the Lorentz
transformation formulas); ANALOGY (3D rotations preserving Euclidean
distance, as the geometric precedent for Lorentz boosts preserving s²).

## Voice Teaching Notes

Listen for "the interval should differ for different observers,"
"spacelike means it's not real," "four-vector dot product is just like
3D," or "proper time depends on the frame" — the four direct
misconception tells. Load-bearing sentence: "lots of things ARE relative
— length, time, simultaneity — but the spacetime interval isn't one of
them, every observer agrees on it; spacelike just means no signal could
connect the two events, not that they're unreal; and four-vectors need
the metric's minus sign, not the ordinary dot product." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming the interval differs between observers signals MC-1
(full repair via the algebraic Lorentz-transformation derivation). A
learner treating spacelike as unreal signals MC-2 (full repair via the
Minkowski-diagram classification exercise). A learner applying the 3D
dot product to four-vectors signals MC-3 (full repair via the explicit
index-lowering computation). A learner claiming proper time is frame-
dependent signals MC-4 (full repair via the twin-paradox side-by-side-
clock-comparison argument). Mastery trigger: correctly computing the
spacetime interval AND correctly classifying events as timelike/
spacelike/lightlike AND correctly evaluating four-vector inner products
AND correctly explaining the invariance of proper time. Blueprint's
Section 11 Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget spacetime for a second — if you rotate a
piece of graph paper, do the (x,y) coordinates of a marked point change?
Does the DISTANCE from the origin to that point change?" (isolating the
invariant-under-transformation intuition from ordinary rotations before
reapplying it to Lorentz boosts and the spacetime interval specifically).
See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (s² is THE Lorentz invariant, not Δx or Δt separately; spacelike
= causally disconnected, not unreal; four-vector inner products use the
Minkowski metric's relative sign; proper time is a single geometric
invariant) bound to procedure (computing s² directly; classifying event
pairs via sign; evaluating four-vector inner products with the correct
metric; computing τ=t/γ along a worldline). Interleave with `phys.rel.
mass-energy` (E²=(pc)²+(mc²)² is p_μp^μ=(mc)² in disguise) and, once
authored, `phys.astro.black-holes`.

## Transfer Connections

Near: any spacetime-interval computation, event classification, or
four-vector inner-product problem. Far: general relativity (the flat
metric η_μν generalizing to a curved g_μν(x), where spacetime curvature
IS gravity) and particle physics (invariant mass of decay products
computed via four-momentum conservation, independent of reference
frame). Real-world: none direct at this level — this is a foundational
mathematical-physics structure underlying GPS relativistic corrections
and particle-collider kinematics rather than a directly observable
everyday phenomenon. Expert: covariant electrodynamics (Maxwell's
equations reduce from four to two using the four-potential and
four-current) as a template for "covariant form guarantees frame-
independence" reasoning.

## Cross-Subject Connections

KG `cross_links` empty. No genuine cross-subject connection identified
at this authoring pass — this is a foundational physics/mathematics
structure (differential geometry, Lorentz group theory) without a
natural analog surfaced in chemistry, biology, or CS.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.rel.spacetime.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula set, Section 5 Explanation Library, Section 7
Demonstration Library full procedures, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

None. Prerequisite (`phys.rel.mass-energy`) is necessary and sufficient;
no ambiguity or overlap found with sibling concepts.

## Version History

- 2026-07-23 (physics EB Wave 16): initial authoring.
