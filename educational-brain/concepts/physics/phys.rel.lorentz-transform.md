# Lorentz Transformations — `phys.rel.lorentz-transform`

## Identity

- **Concept ID**: `phys.rel.lorentz-transform` (canonical physics KG)
- **Curriculum location**: physics / relativity — dependency level 13.
- **Prerequisites**: `phys.rel.length-contraction` — the Lorentz
  transformation is the unifying mathematical framework generating both
  the already-secure time-dilation and length-contraction effects as
  special cases.
- **Unlocks** (from KG): `phys.rel.relativistic-momentum` — a genuine
  bridge concept into relativistic dynamics.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that the Galilean transformation
(u=u'+v) does NOT work at relativistic speeds — it must be replaced by
the relativistic velocity-addition formula, u=(u'+v)/(1+u'v/c²), which
correctly preserves the speed of light in all frames, unlike the Galilean
formula which would predict speeds exceeding c; (2) correctly explain
that the FULL time transformation is t'=γ(t−vx/c²), NOT simply t'=γt —
the spatial term vx/c² is essential and produces the RELATIVITY OF
SIMULTANEITY (events simultaneous in one frame are generally NOT
simultaneous in another), a genuinely different effect from time
dilation alone; (3) correctly apply the relativistic velocity-addition
formula and explain why its denominator (1+u'v/c²) prevents any combined
velocity from ever reaching or exceeding c; (4) correctly explain that
energy is NOT a Lorentz scalar (invariant quantity) — energy transforms
as E'=γ(E−vpₓ), the time-component of the energy-momentum four-vector,
exactly analogous to how (ct,x) transforms, so a photon's energy
genuinely differs between frames (the relativistic Doppler effect).

## Core Understanding

The Galilean transformation (simple velocity addition, u=u'+v) is NOT
universally valid — it fails at relativistic speeds because it does not
preserve the speed of light. If a spaceship moving at 0.9c relative to
Earth emits a forward light beam, Galilean addition would predict
u=c+0.9c=1.9c, directly violating Einstein's second postulate (light
travels at c in ALL inertial frames, confirmed by Michelson-Morley and
countless subsequent experiments). The correct RELATIVISTIC
velocity-addition formula, u=(u'+v)/(1+u'v/c²), gives exactly c for this
case: (c+0.9c)/(1+c×0.9c/c²)=1.9c/1.9=c. The Galilean transformation is
not simply "wrong" — it is the correct LOW-SPEED LIMIT of the Lorentz
transformation (recovered as v/c→0), valid and accurate for everyday
speeds but breaking down as speeds approach c. A second, frequently
oversimplified point concerns the time transformation: the FULL Lorentz
time transformation is t'=γ(t−vx/c²), NOT merely t'=γt (which describes
only TIME DILATION for a single clock at rest in the primed frame). The
spatial correction term, vx/c², is essential and is responsible for a
genuinely distinct effect: the RELATIVITY OF SIMULTANEITY — two events
that are simultaneous in one frame (same t, different x) are generally
NOT simultaneous in a relatively moving frame, since t'=γ(t−vx/c²) gives
different t' values for events at different x even when t is identical.
Treating simultaneity as absolute (assuming "same t always means same
t'") misses this entirely. A third point concerns velocity addition at
relativistic speeds more generally: the correct formula
u=(u'+v)/(1+u'v/c²) has a denominator that is always greater than 1 when
u' and v share the same sign — this denominator is precisely what
prevents the combined velocity from ever reaching or exceeding c, no
matter how close u' and v individually are to c (e.g. two ships each
approaching Earth at 0.8c see each other approaching at
(0.8c+0.8c)/(1+0.64)≈0.976c, not the naively expected 1.6c). A fourth
point addresses a common assumption that only spacetime coordinates
transform under a Lorentz boost: energy is NOT a Lorentz scalar (an
invariant quantity unchanged between frames) — it is the TIME COMPONENT
of the energy-momentum four-vector (E/c,pₓ,p_y,p_z), which transforms
exactly like (ct,x) under a boost: E'=γ(E−vpₓ). For a photon (with
pₓ=E/c), this gives E'=γE(1−v/c)=E√((1−v/c)/(1+v/c)) — precisely the
relativistic Doppler formula, confirming that a photon's energy genuinely
differs when measured in different relatively-moving frames, contrary to
the assumption that energy (being "just a scalar number") stays fixed.

## Mental Models

**Beginner**: "Velocities always add simply, u=u'+v, even near light
speed; the time transformation is just t'=γt; relativistic velocity
addition can give the same wrong sums as classical addition; energy is a
scalar unaffected by the Lorentz transformation." Upgrade trigger:
computing 0.9c+c under Galilean addition (getting the impossible 1.9c)
directly confronts the simple-addition assumption; computing t' for two
events at different x with the SAME t (finding different t' values,
i.e. simultaneity is frame-dependent) directly confronts the
t'=γt-only assumption.

**Intermediate**: "Velocities combine via u=(u'+v)/(1+u'v/c²), which
always gives a result below c; the full time transformation
t'=γ(t−vx/c²) produces relativity of simultaneity via its spatial term;
energy transforms as the time-component of a four-vector,
E'=γ(E−vpₓ), genuinely differing between frames." This model correctly
captures all four results, but sometimes still needs to explicitly
verify the denominator's effect when combining velocities close to c.

**Advanced**: "Always use the full relativistic velocity-addition and
time-transformation formulas explicitly, never the simplified/special-
case versions, unless the low-speed or single-clock conditions are
verified; always check whether a quantity is a genuine Lorentz scalar
(like proper time, rest mass, or the spacetime interval) before assuming
it's frame-independent."

**Expert**: the full derivation of the Lorentz transformation from three
first principles (linearity, low-speed Galilean limit, invariance of c),
and the spacetime-interval geometric picture (Δs²=c²Δt²−Δx² as the
Minkowski analog of Euclidean distance, invariant under Lorentz
"hyperbolic rotations") — a natural consolidation directly connecting to
the KG unlock `phys.rel.relativistic-momentum`, not required for mastery.

## Why Students Fail

The dominant failure is applying simple (Galilean) velocity addition at
relativistic speeds, producing impossible superluminal results; closely
related failures include treating the time transformation as merely
t'=γt (missing the spatial term and the relativity of simultaneity it
produces), and assuming energy is a frame-independent scalar rather than
the time-component of a transforming four-vector.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.rel.lorentz-transform.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (the Galilean transformation works for all speeds)**: believing
  "u=u'+v=c+0.9c=1.9c" is correct for a light beam emitted from a fast
  spaceship. **Birth type**: overgeneralization (Type 1) — the Galilean
  transformation's correctness at everyday speeds is incorrectly extended
  to relativistic speeds, missing that only the Lorentz transformation
  preserves the invariance of c. Probe: "A spaceship moves at 0.9c
  relative to Earth. A light beam is emitted forward from the ship. Use
  Galilean velocity addition to find the beam's speed in the Earth
  frame — does this respect the speed of light?"
- **MC-2 (the time transformation is just t'=γt)**: believing "simultaneous
  means same t, so same t' — simultaneity is absolute," omitting the
  spatial term. **Birth type**: overgeneralization (Type 1) — the
  time-dilation formula (a special case for a single clock at rest in the
  primed frame) is incorrectly generalized to the full transformation for
  arbitrary events, missing the vx/c² term that produces relativity of
  simultaneity. Probe: "Two events occur at (t=0,x=0) and (t=0,x=L) in
  frame S. Are they simultaneous in frame S'?"
- **MC-3 (relativistic velocity addition gives u=u'+v)**: believing
  "0.8c+0.8c=1.6c" for two ships approaching each other. **Birth type**:
  overgeneralization (Type 1) — classical intuition that velocities add
  linearly is applied without the relativistic correction, producing a
  superluminal (impossible) result. Probe: "Two ships approach each other,
  each at v=0.8c relative to Earth. What speed does each ship measure the
  other approaching at?"
- **MC-4 (the Lorentz transformation changes only x and t but leaves
  energy unchanged)**: believing "energy is a scalar — Lorentz
  transformation doesn't change it." **Birth type**: overgeneralization
  (Type 1) — students know the Lorentz transformation acts on (t,x) but
  don't realize energy and momentum form a four-vector transforming the
  same way, missing the relativistic Doppler consequence for photon
  energy. Probe: "A photon has energy E in frame S. Frame S' moves at v
  relative to S in the direction of photon travel. Does the photon have
  the same energy E in S'?"

## Analogies

**Best**: rotating coordinate axes in 2D, where a point's (x,y)
coordinates change to (x',y') under rotation while the length x²+y² stays
invariant — a Lorentz boost is the analogous "hyperbolic rotation" in
(ct,x) space, with c²t²−x² (note the minus sign) as the invariant —
directly targets MC-1/MC-2 by giving a concrete image of coordinates
transforming together under one unified transformation, rather than
independently.

**Anti-analogy**: do NOT say "the Lorentz transformation just stretches
and compresses space and time separately" — time dilation and length
contraction appear as separate effects in ISOLATION, but the full
transformation COUPLES time and position (the vx/c² term) — this directly
installs MC-2 by implying simultaneity is unaffected.

## Demonstrations

Worked-example: check whether the Galilean transformation preserves c for
a light ray (x=ct in frame S), finding x'/t'=c−v≠c under Galilean vs.
exactly c under Lorentz — directly targets MC-1. Worked-example: the
"train lightning" thought experiment — two lightning strikes
simultaneous in frame S (Δt=0) at x=0 and x=L, computing
Δt'=γ(0−vL/c²)≠0 in frame S' — directly targets MC-2.

## Discovery Questions

Discovery-style: "if two ships each measure the other approaching at
0.8c relative to Earth, and simple addition gives 1.6c — faster than
light — what must be happening in the actual velocity-addition formula
to prevent this?" — learner reasons through the denominator's effect,
directly confronting MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing why Galilean addition fails, motivating the need for
a new transformation), before MC-3 (the correct relativistic
velocity-addition formula and its denominator), before MC-2 (the full
time transformation and relativity of simultaneity), before MC-4 (energy
as a four-vector component) — this order builds from the most
experimentally direct failure (superluminal light) through the full
spacetime transformation to its dynamical (energy-momentum) consequences.

## Tutor Actions

WORKED-EXAMPLE (Galilean vs. Lorentz preservation of c for a light ray);
WORKED-EXAMPLE (train-lightning simultaneity thought experiment);
ANALOGY (2D coordinate rotation vs. Lorentz "hyperbolic rotation").

## Voice Teaching Notes

Listen for "velocities just add" at relativistic speeds, or "simultaneous
means simultaneous in every frame," or assuming energy never changes
between frames — the key misconception tells. Load-bearing sentence:
"velocities don't simply add once you're near light speed — and time and
position get mixed together in the full transformation, which is why two
events at the same time in one frame aren't at the same time in
another." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner using Galilean addition near light speed signals MC-1
(MISCONCEIVING, full repair via the c-preservation worked example). A
learner assuming absolute simultaneity signals MC-2 (full repair via the
train-lightning thought experiment). A learner adding relativistic
velocities linearly signals MC-3 (full repair via the denominator
discovery question). A learner assuming energy is frame-invariant
signals MC-4. Mastery trigger: correctly applying the relativistic
velocity-addition formula, AND correctly computing the full time
transformation including simultaneity effects, AND correctly identifying
energy as a transforming four-vector component. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — can ANY two
speeds, however you combine them, ever add up to more than the speed of
light?" (isolating the physical impossibility before re-deriving the
correct formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (relativistic velocity addition with its speed-limiting
denominator; full time transformation producing relativity of
simultaneity; energy as a four-vector component) bound to procedure
(applying u=(u'+v)/(1+u'v/c²) and t'=γ(t−vx/c²)). Interleave with
`phys.rel.length-contraction` and, once authored,
`phys.rel.relativistic-momentum`.

## Transfer Connections

Near: any relativistic velocity-addition or simultaneity problem. Far:
particle physics (relativistic kinematics in collider experiments,
requiring the full energy-momentum four-vector transformation) and
astrophysics (relativistic jets and their observed superluminal-appearing
motion, itself a projection effect requiring careful Lorentz-
transformation analysis). Real-world: understanding why GPS satellites
must account for both special-relativistic time dilation and the
Lorentz-transformation framework to maintain positioning accuracy. Expert:
the full derivation from first principles and the spacetime-interval
geometric picture.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

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

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 13): initial authoring.
