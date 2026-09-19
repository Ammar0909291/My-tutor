# math.de.bifurcation

## Identity
- **KG id**: `math.de.bifurcation`
- **Domain**: math.de
- **Requires**: `math.de.nonlinear-ode`, `math.de.stability-analysis`
- **Unlocks**: none (Blueprint's own Component 0 stated `math.de.chaos` — the live KG's current
  value used as authoritative: `math.de.chaos` is listed under `related`, not `unlocks`, see
  Curriculum Feedback)
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 9

## Learning Objective
Recognize a bifurcation as a TOPOLOGICAL change in the phase portrait (creation/destruction of
equilibria, birth of limit cycles — never merely a stability sign-flip); treat the normal form as
the EXACT local topology after a smooth coordinate change (never a mere Taylor approximation); and
recognize a subcritical Hopf bifurcation DOES produce a limit cycle — an UNSTABLE one, whose
collapse at the bifurcation point causes a dangerous jump to a distant attractor (never assumed to
have no limit cycle at all).

## Core Understanding
A BIFURCATION IS A TOPOLOGICAL CHANGE — NEVER MERELY A STABILITY SIGN-FLIP: for the saddle-node
normal form $\dot x=\mu-x^2$: at $\mu<0$, NO equilibrium exists at all; at $\mu>0$, TWO equilibria
appear ($+\sqrt\mu$ stable, $-\sqrt\mu$ unstable) — equilibria are CREATED out of nothing, never
existing before. This is qualitatively different from a mere stability change (e.g. a stable spiral
becoming an unstable spiral WITHOUT any new attractor appearing) — that alone is loss of stability,
not itself a bifurcation in the strict topological sense. The Hopf bifurcation similarly CREATES a
limit cycle, a genuinely new topological feature, never a mere sign flip.

THE NORMAL FORM IS THE EXACT LOCAL TOPOLOGY — NEVER A TAYLOR APPROXIMATION: the pitchfork's normal
form $\dot x=\mu x-x^3$ looks like it comes from truncating a Taylor series, inviting the
misconception that it's merely an approximation valid near the bifurcation point. In fact, the
Guckenheimer-Holmes/Sternberg theorem guarantees a smooth, near-identity coordinate change making
the ORIGINAL system EQUAL to the normal form to any desired order — the higher-order error terms
are TOPOLOGICALLY IRRELEVANT near the bifurcation (they create no new equilibria or cycles there).
"Normal form = approximation" is therefore WRONG: it IS the system's local topology, not an
approximation to it.

A SUBCRITICAL HOPF BIFURCATION GENUINELY HAS A LIMIT CYCLE — IT IS UNSTABLE, NEVER ABSENT: the
amplitude equation $\dot r=\alpha r+a_1r^3$ has equilibria at $r=0$ and $r^2=-\alpha/a_1$. For
$a_1>0$ (subcritical) and $\alpha<0$ (i.e. $\mu<\mu_c$): $r^2=-\alpha/a_1>0$ genuinely has a
solution — an UNSTABLE limit cycle surrounding the stable equilibrium. As $\mu\to0^-$, this
unstable cycle shrinks to zero and merges with the equilibrium, which then becomes unstable at
$\mu=0$ with NO nearby stable cycle to land on — the system JUMPS to a distant (often large-
amplitude, globally-created) attractor. This produces HYSTERESIS: sweeping $\mu$ up triggers the
jump at $\mu_c$, but sweeping back down doesn't reverse it until a different, smaller
$\mu_{\text{fold}}<\mu_c$ — a dangerous asymmetry absent from the supercritical case.

## Mental Models
- **"A bifurcation changes what EXISTS in the phase portrait — count equilibria and cycles on both
  sides of the critical value; if the count or type differs, that's a genuine bifurcation."**
- **"The normal form isn't a rough sketch near the bifurcation — after the right coordinate
  change, it IS the system, exactly, to any order that matters."**
- **"Subcritical Hopf has a limit cycle too — it's just unstable, and its collapse is what causes
  the dangerous jump."**

## Why Students Fail

### MC-1: BIFURCATION-IS-JUST-STABILITY-CHANGE
- **Surface form**: thinks a bifurcation is only when an equilibrium changes from stable to
  unstable, missing that a bifurcation is a topological change including creation/destruction of
  equilibria and birth of limit cycles.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — stability
  analysis via Jacobian eigenvalues is taught first, and "eigenvalue crosses zero → something
  changes" gets conflated with the full definition of bifurcation).
- **Repair**: re-walk the saddle-node example where equilibria are genuinely created from nothing.

### MC-2: NORMAL-FORM-IS-AN-APPROXIMATION
- **Surface form**: treats the bifurcation normal form as an approximation valid only near the
  bifurcation point, missing that it exactly captures the local topology.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — Taylor
  expansion is taught as an approximation, and the normal form's derivation via Taylor expansion is
  wrongly inferred to inherit that approximate status).
- **Repair**: re-anchor on the Guckenheimer-Holmes exact-coordinate-change theorem.

### MC-3: SUBCRITICAL-HOPF-HAS-NO-LIMIT-CYCLE
- **Surface form**: thinks a subcritical Hopf bifurcation never has a limit cycle because the
  small-amplitude cycle is unstable.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the
  supercritical case is presented first as "the" generic Hopf picture, and "Hopf = one stable
  cycle born at bifurcation" is carried forward without recognizing the subcritical scenario).
- **Repair**: re-derive the unstable limit cycle from the amplitude equation directly.

## Misconceptions

### MC-1: BIFURCATION-IS-JUST-STABILITY-CHANGE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: NORMAL-FORM-IS-AN-APPROXIMATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SUBCRITICAL-HOPF-HAS-NO-LIMIT-CYCLE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A bifurcation is a scene change, not a costume change — the cast of characters (equilibria,
  cycles) itself changes, not just their mood (stability)."**
- **Anti-analogy**: the normal form is NOT a rough sketch that loses accuracy away from the
  bifurcation point — within its topological validity, it is exact, not approximate.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the saddle-node $\dot x=\mu-x^2$'s equilibria appearing from
  nothing as $\mu$ crosses zero.
- **Demonstration 2 (targets MC-2)**: the Guckenheimer-Holmes exact-coordinate-change theorem
  statement, contrasted with the Taylor-approximation misconception.
- **Demonstration 3 (targets MC-3)**: the direct amplitude-equation derivation of the unstable
  limit cycle for $a_1>0,\mu<0$, and its collapse causing hysteresis.

## Discovery Questions
1. "Is a bifurcation just a change in an equilibrium's stability, or can it also create or destroy
   equilibria and cycles entirely?"
2. "Is the bifurcation normal form only an approximation near the bifurcation point, or does it
   capture the exact local topology?"
3. "Does a subcritical Hopf bifurcation have no limit cycle at all, or does it have one that is
   unstable?"

## Teaching Sequence
1. **Representation shift**: the four codimension-one bifurcation normal forms (saddle-node,
   transcritical, pitchfork), working Demonstration 1, isolating MC-1.
2. **Pattern induction**: Hopf bifurcation, the first Lyapunov coefficient, and the exact-normal-
   form theorem, working Demonstration 2, isolating MC-2.
3. **Conflict evidence**: the subcritical Hopf's unstable limit cycle and hysteresis, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct classification of a bifurcation from its normal form, a
   correct explanation of why the normal form is exact (not approximate), and a correct derivation
   distinguishing supercritical from subcritical Hopf via the first Lyapunov coefficient's sign, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a bifurcation defined as merely a stability sign-flip without checking for
  creation/destruction of equilibria or cycles.
- Never accept the normal form described as an approximation rather than the exact local topology.
- Never accept a subcritical Hopf bifurcation described as having no limit cycle at all.

## Voice Teaching Notes
- Say "count what exists on each side of the critical value — has the number or type changed, not
  just the stability?" whenever a suspected bifurcation is analyzed.
- When a subcritical Hopf is discussed, ask "is there really no limit cycle here, or is there one
  that's just unstable?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a scalar bifurcation from its normal form
  (saddle-node, transcritical, or pitchfork).
- **Rung 2 (application)**: learner correctly computes the first Lyapunov coefficient's sign and
  distinguishes supercritical from subcritical Hopf.
- **Rung 3 (transfer)**: learner correctly explains hysteresis in a subcritical Hopf scenario and
  constructs a bifurcation diagram with correct stable/unstable branch labeling.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the saddle-node equilibria-created-from-nothing example.
- If MC-2 recurs, re-anchor on the exact-coordinate-change theorem.
- If MC-3 recurs, re-derive the unstable limit cycle from the amplitude equation.

## Memory Hooks
- "A bifurcation changes what exists, not just how stable it is."
- "The normal form is exact after the right coordinate change — never just an approximation."
- "Subcritical Hopf has an unstable limit cycle — its collapse causes the dangerous jump."

## Transfer Connections
- `math.de.nonlinear-ode` (already authored, this campaign, Batch 162): supplies the equilibrium-
  finding and linearization framework this concept extends to parameter-dependent families.
- `math.de.stability-analysis` (already authored, this campaign, Batch 154): supplies the
  eigenvalue-based stability classification this concept's non-hyperbolic (bifurcation) case
  extends beyond.
- `math.de.chaos` (not yet authored, KG's declared related concept — corrected from the Blueprint's
  original `unlocks` claim, see Curriculum Feedback): the natural next topic once bifurcation
  cascades are understood.

## Cross-Subject Connections
- Physics/engineering: buckling of structures, laser threshold behavior, population dynamics
  collapse, fluid flow instabilities (e.g. onset of turbulence).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.bifurcation.md`, reused by reference for
  its four normal-form derivations, its Van der Pol Hopf-bifurcation worked example, its
  first-Lyapunov-coefficient formula, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the classification to
  codimension-2 cusp catastrophe, global homoclinic bifurcations, and equivariant bifurcation
  theory under symmetry groups.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 states
  `unlocks: math.de.chaos` — the live KG lists `math.de.chaos` under `related`, not `unlocks`
  (`unlocks` is empty `[]`) — the live KG's current value used as authoritative here. All other
  fields (requires `math.de.nonlinear-ode`/`math.de.stability-analysis`, cross_links none,
  research/analyze, mastery_threshold 0.65, estimated_hours 9) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 167): authored. First entry this batch. Companion batch concept:
  `math.de.laplace-equation`.
