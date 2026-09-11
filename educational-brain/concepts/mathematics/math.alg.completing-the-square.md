# math.alg.completing-the-square

## Identity
- **KG ID**: `math.alg.completing-the-square`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.quadratic-equation` — load-bearing part: that concept already briefly uses completing
    the square as an intermediate derivation step toward the quadratic formula (in a monic or
    lightly-generalised context); this concept's distinct job is to extend that brief encounter into
    the FULL general procedure (including the genuinely trickier non-monic case) and into an
    entirely different application (vertex form for optimisation) that concept never addresses.
- **Unlocks**: `math.alg.quadratic-formula`
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.completing-the-square.md` (reused by reference
  throughout)
- **KG note**: this concept's KG parent is `math.alg.quadratic-equation`, which its own already-
  authored Educational Brain entry explicitly scoped around (completing the square introduced there
  ONLY as the quadratic formula's derivation, full standalone treatment deferred here) — this entry
  is exactly the deferred deep-dive that parent entry's own Curriculum Feedback section anticipated.

## Learning Objective
- The learner can apply the general completing-the-square procedure to rewrite ANY quadratic
  ax²+bx+c (including the non-monic case a≠1, which requires factoring a out first) into vertex
  form a(x−h)²+k — a genuine generalisation beyond `math.alg.quadratic-equation`'s own brief,
  monic-focused use of the technique.
- The learner can read the vertex (h,k) directly off the vertex form and determine whether it is a
  MAXIMUM or MINIMUM based on the sign of a — applying completing the square to a genuinely new
  purpose (graphing/optimisation) distinct from root-finding.
- The learner can re-derive the quadratic formula from the general (non-monic) completing-the-
  square procedure, rigorously handling the a≠1 case in full, directly refuting the idea that the
  technique is restricted to equations already in simple monic form.

## Core Understanding
This concept has an explicit division of labour with its own prerequisite, `math.alg.quadratic-
equation`: that concept already briefly uses completing the square as an intermediate derivation
step, but in a monic or lightly-treated context. This concept's job is twofold: extend the
procedure into full generality (including the non-monic case, a≠1), and introduce its OTHER major
application entirely — converting to vertex form for graphing and optimisation, a use the
prerequisite never addresses since its own focus is exclusively root-finding via the discriminant.
The general procedure, for ANY a≠0, proceeds by first factoring a out of the first two terms:
a(x²+(b/a)x)+c; then adding and subtracting (b/2a)² (half the coefficient of x, squared) inside the
parentheses: a(x²+(b/a)x+(b/2a)²−(b/2a)²)+c; the first three terms inside now form a perfect
square: a((x+b/2a)²−(b/2a)²)+c; distributing the outer a produces vertex form,
a(x−h)²+k, with h=−b/2a and k=c−b²/4a. Once in vertex form, the point (h,k) is IMMEDIATELY the
parabola's vertex with no further computation: if a>0 the parabola opens upward and (h,k) is a
MINIMUM; if a<0 it opens downward and (h,k) is a MAXIMUM — a genuinely different question ("where
is the extreme point?") than root-finding ("where does the graph cross the x-axis?"). Applying the
identical general procedure to ax²+bx+c=0 and solving for x re-derives the quadratic formula in
full rigour, with a present explicitly throughout rather than sketched only for the monic special
case.

## Mental Models
1. **Beginner — completing the square turns a quadratic into a perfect-square-plus-a-number form
   by adding and subtracting the right amount.** For x²+6x+7, add and subtract 9 (half of 6,
   squared) to get (x+3)²−2. *Upgrade trigger*: a non-monic quadratic (a≠1), where "add and
   subtract (b/2)²" alone doesn't correctly generalise without first factoring a out. *Shelf
   life*: one session.
2. **Intermediate — for a non-monic quadratic, factor a out of the first two terms FIRST; every
   step after that is identical to the monic case.** This single extra step is the entire
   generalisation — nothing else about the procedure changes. *Upgrade trigger*: being asked what
   the resulting vertex form actually MEANS (the vertex's coordinates and whether it's a max or
   min), rather than merely producing the algebraic form. *Shelf life*: durable once the
   factor-out-a-first habit is installed.
3. **Advanced — vertex form a(x−h)²+k directly answers an optimisation question ("what's the
   extreme value, and where?") that is fundamentally different from a root-finding question
   ("where are the zeros?"), even though both start from the same quadratic.** The sign of a alone
   determines max versus min, with zero further computation once in vertex form. *Upgrade
   trigger*: a genuine word-problem context (e.g. a projectile's maximum height) where recognising
   WHICH question is being asked (extreme value vs. when a specific value is reached) determines
   which technique (completing the square vs. the quadratic formula) is actually appropriate.
4. **Expert — completing the square, factoring, and the quadratic formula are three views of the
   same underlying object, each suited to a different question: factoring for quick rational
   roots, the formula for any root regardless of form, and completing the square specifically for
   locating and characterising the extreme point.** *Shelf life*: permanent, and it is the
   discipline this concept's own unlock, `math.alg.quadratic-formula`, continues to build on for
   the formula's own edge cases and applications.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks foundational, is assuming
completing the square only works cleanly for monic quadratics (a=1) — having only encountered the
technique in `math.alg.quadratic-equation`'s own brief, lightly-generalised treatment, a learner
may attempt the procedure on a non-monic quadratic without first factoring a out of the leading
two terms, producing an incorrect or incomplete result, or may simply believe the technique doesn't
apply and abandon it entirely; the correction is that factoring a out first is the ONE extra step
required, after which the entire remaining procedure is identical to the monic case. The second
major failure occurs when reading the vertex from a completed-square expression: reversing which
sign of a corresponds to a maximum versus a minimum — for instance, treating a negative leading
coefficient as indicating a minimum rather than the correct maximum, an error that inverts the
entire optimisation conclusion even when every algebraic step leading up to it was correct. The
third failure is a specific computational error in the square-completion term itself: computing
(b/2a)² incorrectly — most commonly forgetting to divide by a as well as by 2 (computing (b/2)²
instead of (b/2a)²), or making an arithmetic error in the squaring step — which produces an
incorrect vertex form even when the overall procedural structure (factor out a, complete the
square, distribute) is correctly understood.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — COMPLETING-THE-SQUARE-ASSUMED-MONIC-ONLY** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — the only prior encounter with this technique
    (`math.alg.quadratic-equation`'s own brief, monic-focused treatment) is generalised to be the
    technique's full scope, missing that factoring a out first extends it fully to any quadratic.
  - **Characteristic phrase**: attempting to complete the square on a non-monic quadratic without
    first factoring a out, or believing the technique simply "doesn't work" for such cases.
  - **Detection probe** (verbatim, Blueprint): asking whether completing the square only works
    cleanly when the leading coefficient is 1 — a "yes" answer confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-walk the explicit factor-out-a step on a non-monic
    example, re-anchoring on "the ONE extra step for a non-monic quadratic is factoring a out
    first — everything else is identical to the monic case."
  - **Verification of death**: given a mixed set of monic and non-monic quadratics, the learner
    correctly factors a out first whenever a≠1, without hesitation, before proceeding with the
    identical remaining steps.

- **MC-2 — VERTEX-SIGN-OF-A-MAX-MIN-DETERMINATION-REVERSED** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the sign-to-shape mapping (positive a ↔ upward-
    opening; negative a ↔ downward-opening) is either not internalised precisely or is reversed
    under cognitive load, inverting the max/min conclusion.
  - **Characteristic phrase**: for a vertex-form expression with a>0, incorrectly stating the vertex
    is a maximum (or the reverse for a<0).
  - **Detection probe** (verbatim, Blueprint): given a vertex-form expression with a specific sign
    of a, asking whether the vertex is a max or min — a reversed answer confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-anchor with a concrete shape image: positive a
    means the parabola opens UPWARD, like a cup — a cup's lowest point is a MINIMUM; negative a
    opens downward, like a cap, giving a MAXIMUM.
  - **Verification of death**: given a mixed set of vertex-form expressions with varying signs of
    a, the learner correctly identifies max versus min every time, without hesitation.

- **MC-3 — SQUARE-COMPLETION-TERM-B-OVER-2A-SQUARED-COMPUTED-INCORRECTLY** (moderate)
  - **Birth type**: Type 4, notation-induced — the term (b/2a)² has three distinct operations
    (divide by 2, divide by a, square) that are easy to perform incompletely or out of order,
    especially the "divide by a" step, which is easy to omit since it wasn't present in the
    simpler monic case.
  - **Characteristic phrase**: computing (b/2)² instead of the correct (b/2a)², omitting the
    division by a.
  - **Detection probe**: asking a student to compute (b/2a)² for a specific non-monic quadratic and
    checking for an arithmetic or setup error — an omitted division by a confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-walk the explicit computation step by step,
    re-anchoring on "divide b by 2a FIRST, then square the result — not the other way around, and
    never forgetting the a in the denominator."
  - **Verification of death**: given several non-monic quadratics, the learner correctly computes
    (b/2a)² every time, including the division by a, without the explicit step-by-step scaffold
    being required.

## Analogies
- **Building an addition onto an already-standing structure without disturbing the original.**
  Adding and subtracting the same quantity inside the parentheses is like temporarily adding and
  then immediately removing scaffolding around a building — the building (the original expression's
  value) is never actually changed, only its visible SHAPE is rearranged to reveal the perfect-
  square structure hiding inside it. *Where it holds*: the "net-zero change, revealed structure"
  idea, directly supporting the general procedure's validity. *Where it breaks*: scaffolding is
  external and visibly temporary; the (b/2a)² term genuinely becomes part of the algebraic
  manipulation (added inside, then subtracted outside after distribution) in a way the physical
  scaffolding metaphor doesn't literally capture — the actual algebra must still be shown step by
  step.
- **A cup versus an upside-down cap, holding or spilling water.** A parabola with a>0 is shaped
  like a cup — it holds its lowest point at the bottom, a MINIMUM; a parabola with a<0 is shaped
  like an upside-down cap — its highest point is at the top, a MAXIMUM. *Where it holds*: the
  direct shape-to-extreme-type mapping, directly targeting MC-2. *Where it breaks*: a physical cup
  or cap doesn't have an equivalent of "vertex coordinates" — the analogy conveys only the
  max/min-and-shape relationship, not how to read off the specific (h,k) values, which must be
  taught through the algebra directly.

## Demonstrations
1. **A non-monic completion, establishing the general procedure and directly confronting MC-1.**
   Complete the square on 2x²+12x+7. Factor out a=2 from the first two terms: 2(x²+6x)+7. Add and
   subtract (6/2)²=9 inside: 2(x²+6x+9−9)+7 = 2((x+3)²−9)+7. Distribute: 2(x+3)²−18+7 =
   2(x+3)²−11 — vertex form, h=−3, k=−11, a=2.
2. **Reading the vertex for optimisation, directly confronting MC-2 and demonstrating the new
   application.** Continuing Demonstration 1, 2(x+3)²−11 has vertex (−3,−11). Since a=2>0, the
   parabola opens upward, so (−3,−11) is the MINIMUM — the function 2x²+12x+7 never goes below
   −11, achieved exactly at x=−3. This is a genuinely different question than "what are the
   roots?" — it asks "what's the smallest value this function ever takes, and where?"
3. **The full non-monic quadratic-formula derivation, directly confronting MC-1 a second time and
   verifying against the formula's known answer.** Derive the roots of 3x²−5x+1=0 via the full
   general procedure. Factor out 3: 3(x²−(5/3)x)+1=0. Complete the square with the correct
   (5/6)²=25/36 term (directly confronting MC-3's division-by-a requirement): 3((x−5/6)²−25/36)+1=0
   → 3(x−5/6)²−25/12+1=0 → 3(x−5/6)²=13/12 → (x−5/6)²=13/36 → x=5/6±√13/6 = (5±√13)/6. Verify this
   matches the quadratic formula's direct computation (b²−4ac=25−12=13, 2a=6):
   x=(5±√13)/6 — exact agreement, confirming the general procedure works completely with no
   special-casing needed for a≠1.
4. **A negative-leading-coefficient case, contrasted directly for MC-2 reinforcement.** Complete the
   square on −2x²+8x−3. Factor out −2: −2(x²−4x)−3. Add and subtract (−4/2)²=4: −2(x²−4x+4−4)−3 =
   −2((x−2)²−4)−3. Distribute: −2(x−2)²+8−3 = −2(x−2)²+5 — vertex (2,5). Since a=−2<0, the parabola
   opens downward, so (2,5) is the MAXIMUM.

## Discovery Questions
- "For 2x²+12x+7, before you add and subtract anything, is there a factor you need to pull out of
  the first two terms first? What happens if you skip that step?" — surfaces MC-1 by requiring the
  learner to identify the missing step before attempting the procedure.
- "You have 2(x+3)²−11 in vertex form. Is 2 positive or negative? Does that mean this vertex is
  the highest point the graph reaches, or the lowest?" — surfaces MC-2 by requiring the sign-to-
  shape reasoning to be stated explicitly rather than guessed.
- "You're computing the square-completion term for 3x²−5x+1. What exactly do you divide 5 by
  before squaring — 2, or something else?" — surfaces MC-3 by isolating the exact computational
  step where the error occurs.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure, brief monic-focused encounter with
   completing the square from `math.alg.quadratic-equation` — this concept extends that into full
   generality and a new application, not an unrelated new topic.
2. **Establish the factor-out-a-first step as the entire generalisation**, worked on a non-monic
   example from the start (Demonstration 1), directly pre-empting MC-1.
3. **Introduce vertex form's optimisation application as its own dedicated focus**, contrasted
   explicitly against root-finding (Demonstration 2), with the cup/cap shape image installed
   immediately, directly pre-empting MC-2.
4. **Install the (b/2a)² computation as its own explicit, checked step** (Demonstrations 1, 3, 4),
   directly pre-empting MC-3.
5. **Derive the quadratic formula in full generality** (Demonstration 3), verifying the result
   against the formula's own direct computation, reinforcing that the general procedure genuinely
   works for any a.
6. **Practice mixed problems** deliberately combining non-monic completions, both positive and
   negative leading coefficients, and both root-finding and optimisation questions on the same
   underlying function, always requiring the factor-out-a step and the explicit (b/2a)²
   computation to be shown.
7. **Bridge forward**: state explicitly that this concept's full derivation of the quadratic
   formula is exactly what `math.alg.quadratic-formula` will build on and extend further.

## Tutor Actions
- Before accepting any completed-square attempt on a non-monic quadratic, ask "did you factor
  anything out of the first two terms before adding and subtracting?" — this single question
  directly defends against MC-1.
- Before accepting any max/min conclusion from a vertex form, ask "what's the sign of a here? Does
  a positive a mean the parabola opens up or down? What does that make the vertex — a max or a
  min?" — targeting MC-2 directly, walking the reasoning chain rather than accepting a guessed
  answer.
- Before accepting any (b/2a)² computation, ask "what exactly are you dividing by before you
  square — just 2, or 2 times a?" — targeting MC-3 directly at the point of computation.
- Never accept a vertex-form answer without the factor-out-a step and the (b/2a)² computation both
  shown explicitly, even when the final answer happens to be correct.

## Voice Teaching Notes
- When demonstrating a non-monic completion aloud, narrate the extra step with clear emphasis:
  "first... factor out the leading coefficient... NOW everything else is the same as before" —
  audibly marking this as the one genuinely new step, directly targeting MC-1.
- When stating a max/min conclusion aloud, speak the reasoning chain in full every time: "a is
  positive... opens upward... like a cup... so this is a MINIMUM" — the complete audible chain
  reinforces the reasoning rather than merely the answer, targeting MC-2.
- When computing the square-completion term aloud, narrate both divisions explicitly: "b, divided
  by two... divided by a... NOW square it" — audibly separating the two divisions from the
  squaring step, targeting MC-3.

## Assessment Signals
- **Correct + fast + factors a out unprompted and reasons through max/min correctly** → MASTERED;
  ready for `math.alg.quadratic-formula`.
- **Attempts completing the square on a non-monic quadratic without factoring a out first** → MC-1
  active; needs the factor-out-a-first repair.
- **Vertex form correct, max/min conclusion reversed** → MC-2 active; needs the cup/cap
  shape-reasoning repair.
- **Procedure structure correct, (b/2a)² computed with a missing or misapplied** → MC-3 active;
  needs the explicit two-division-then-square repair.
- **Cannot complete the square even on a monic quadratic** → prerequisite gap in the brief monic
  treatment already introduced in `math.alg.quadratic-equation`, not specific to this concept's
  non-monic extension; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration that "this technique keeps
changing," reframe directly: nothing about the underlying idea has changed — the procedure is
identical to the monic case they already know, with exactly one additional step (factoring a out)
inserted at the very beginning; this is an extension, not a different technique to relearn from
scratch. If MC-2 persists after one correction, avoid restating the rule alone — instead have the
learner sketch (even roughly) the actual shape implied by the sign of a before stating any max/min
conclusion, since a concrete visual check performed before the verbal answer is more durable than a
memorised rule for this specific reversal-prone error.

## Memory Hooks
- "Factor a out first — then it's just like before" — the entire non-monic generalisation in one
  phrase, directly targeting MC-1.
- "Positive a, cup, minimum; negative a, cap, maximum" — the sign-to-shape-to-extreme mapping,
  directly targeting MC-2.
- "Divide by two, divide by a, THEN square" — the correct order of operations for the
  square-completion term, directly targeting MC-3.

## Transfer Connections
- **`math.alg.quadratic-formula`** (direct unlock): this concept's full non-monic derivation is
  exactly the foundation that concept builds on and extends further.
- **`math.alg.quadratic-equation`** (prerequisite, reused): this concept extends that concept's
  own brief, monic-focused encounter with completing the square into full generality and a new
  application (optimisation via vertex form) that concept never addresses.
- **`math.func.quadratic-function`** (indirect, via the shared parent's own unlock): vertex form's
  role in graphing a parabola (identifying the vertex, axis of symmetry, and max/min behaviour)
  directly anticipates the function-theoretic treatment that concept will formalise.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, projectile motion): finding a projectile's maximum height and
  the time it occurs — the Blueprint's own transfer probe scenario — is a direct optimisation
  application of vertex form, genuinely distinct from finding WHEN the projectile lands (which
  requires root-finding via the quadratic formula instead), making the max/min-versus-roots
  distinction this concept teaches directly consequential.
- **Chemistry** (`chem.` reaction-rate optimisation, economics-adjacent stoichiometry problems):
  finding the concentration or reaction condition that maximises or minimises a quadratic-modelled
  quantity (e.g. reaction rate as a function of a controllable variable) reuses this concept's
  vertex-form optimisation procedure directly.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.completing-the-square.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.8, estimated_hours 5, requires
  [math.alg.quadratic-equation], unlocks [math.alg.quadratic-formula]); Component 6 (Misconception
  Registry MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked
  examples for 2x²+12x+7, 3x²−5x+1=0, and the negative-leading-coefficient case, reused directly in
  the Demonstrations above); the P76 transfer probe (a projectile-motion maximum-height scenario
  requiring vertex-form conversion and an explicit max-vs-roots distinction, independence mode) —
  held in the Blueprint's own mastery-gate item bank, not restated here per the Standard's
  ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The explicit division of labour with
  `math.alg.quadratic-equation` (stated in both Blueprints and cross-referenced in both EB
  entries) is a deliberate, coordinated design choice rather than an accidental gap — recorded
  here as confirmed, not as a finding requiring resolution.

## Version History
- 2026-09-11 — Initial authoring (Batch 9 / math.alg Wave 11 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
