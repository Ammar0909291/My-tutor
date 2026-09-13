# math.alg.quadratic-equation

## Identity
- **KG ID**: `math.alg.quadratic-equation`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.factoring-trinomials` — load-bearing part: solving a quadratic equation by factoring
    is a direct application of that concept's own product/sum search procedure combined with the
    zero-product property; without trinomial-factoring fluency already secure, the factoring-based
    solving method (the most efficient of the three, whenever it applies) has no foundation.
- **Unlocks**: `math.func.quadratic-function`, `math.alg.polynomial-roots`
- **Cross-links**: `math.func.quadratic-function` (not yet authored — P76 uses independence mode
  per the Blueprint's own verification)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.alg.quadratic-equation.md` (reused by reference
  throughout)
- **KG children** (not yet authored — `math.alg.completing-the-square`,
  `math.alg.quadratic-formula`, `math.alg.discriminant`): this entry introduces all three solving
  methods together, per the Blueprint's own explicit scoping note (Component 8): completing the
  square is introduced here ONLY as the derivation of the quadratic formula, not as a standalone
  solving technique in its own right (that full treatment belongs to the child concept); the
  discriminant is introduced here as the decisive method-selection and nature-of-roots tool (the
  child concept will deepen this, including the complex-root interpretation). When those child
  concepts are authored, they specialise and extend what this entry establishes rather than
  re-deriving it.

## Learning Objective
- The learner can compute a quadratic equation's discriminant, Δ = b²−4ac, BEFORE attempting to
  solve, and use it to determine both the number and nature of real roots (two distinct, one
  repeated, or none) and to select the most efficient solving method.
- The learner can solve a quadratic equation by factoring when the discriminant is a perfect
  square (reusing `math.alg.factoring-trinomials`' own product/sum search and the zero-product
  property), and by the quadratic formula x = (−b±√(b²−4ac))/(2a) in every case where real roots
  exist — correctly treating the formula as the universal method, not a fallback used only when
  factoring fails.
- The learner can correctly apply sign discipline when substituting into the quadratic formula,
  explicitly negating b (so that a negative b produces a positive −b term) rather than copying b's
  original sign into the formula unchanged.

## Core Understanding
A quadratic equation ax²+bx+c=0 (a≠0) is one degree higher than a linear equation and can have up
to two real solutions rather than exactly one — and the discriminant, Δ=b²−4ac, determines which
case applies BEFORE any solving is attempted: Δ>0 gives two distinct real roots (rational if Δ is
itself a perfect square, irrational otherwise), Δ=0 gives exactly one repeated real root (the
parabola is tangent to the x-axis), and Δ<0 gives no real roots at all. This single computation is
also the correct guide for CHOOSING a solving method: when Δ is a perfect square, factoring
(reusing `math.alg.factoring-trinomials`' product/sum search) is the fastest route, applying the
zero-product property to the factored form; when Δ is not a perfect square (or is simply not
being checked), the quadratic formula x=(−b±√(b²−4ac))/(2a) always works whenever Δ≥0, and should
be understood as the universal, general-purpose method rather than a fallback reached for only
after factoring has failed. The formula itself is not an arbitrary rule to memorise — it is the
direct result of completing the square on the general equation ax²+bx+c=0, a derivation worth
walking through explicitly so the formula's structure (particularly the ± and the 2a in the
denominator) is understood rather than merely recalled. Sign discipline matters critically when
substituting into the formula: the term is literally "negative b," so when b is itself negative,
−b becomes positive — a substitution step easy to perform incorrectly by simply copying b's
original sign rather than genuinely negating it.

## Mental Models
1. **Beginner — a quadratic can have two solutions instead of one, and factoring finds them by
   setting each factor to zero.** For x²−5x+6=0, factor to (x−2)(x−3)=0, so x=2 or x=3. *Upgrade
   trigger*: a quadratic that resists every integer product/sum search, where "keep trying to
   factor" produces no answer and no clear stopping point. *Shelf life*: one session.
2. **Intermediate — check the discriminant FIRST, before attempting any solving method; it tells
   you both how many roots exist and which method is most efficient.** Δ>0 perfect square →
   factor; Δ>0 not a perfect square → formula; Δ=0 → one repeated root; Δ<0 → no real roots, stop.
   *Upgrade trigger*: a quadratic formula computation involving a negative b, where sign discipline
   becomes its own distinct source of error separate from correctly computing Δ. *Shelf life*:
   durable once "discriminant first" becomes an automatic habit preceding any solving attempt.
3. **Advanced — the quadratic formula is not an independent rule to memorise but the direct,
   re-derivable result of completing the square on the general equation, and this derivation
   explains the formula's own structure (why ± appears, why 2a is in the denominator).**
   *Upgrade trigger*: a request to solve a quadratic equation arising from a word-problem model,
   where the equation must first be SET UP correctly from a verbal description before any solving
   method can be applied — testing genuine modelling ability, not just mechanical execution.
4. **Expert — the quadratic formula is the universal method (works whenever Δ≥0, regardless of
   whether Δ is a perfect square), while factoring is an efficient special-case shortcut — and
   recognising which situation calls for which is itself a skill, not merely knowing both
   methods.** *Shelf life*: permanent, and it is exactly the discipline this concept's own unlock,
   `math.alg.polynomial-roots`, generalises further to higher-degree polynomials where no single
   universal formula exists.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks foundational, is treating
factoring as a universal method rather than a special-case shortcut — attempting to factor EVERY
quadratic by inspection, and when the discriminant is not a perfect square (so no integer
product/sum pair exists), becoming stuck rather than switching to the quadratic formula; for
x²−3x−1=0, a learner unable to find integers with product −1 and sum −3 may incorrectly conclude
the equation has no solution, when in fact Δ=13>0 confirms two genuine (irrational) real roots
exist, reachable only via the formula. The second major failure is a specific, mechanical sign
error in applying the quadratic formula: for a negative value of b, writing −b with the SAME sign
as b (i.e. treating −b as still negative) instead of genuinely negating it — for b=−6, incorrectly
writing −b=−6 instead of the correct −b=−(−6)=+6, an error that propagates through the entire
computation and produces roots with reversed signs relative to the correct answer. The third
failure occurs specifically when the discriminant is negative: continuing to compute √Δ as though
it were a real number, or reaching "no solution" without having explicitly checked Δ first (which
would have given a definitive, upfront answer rather than a confused dead end reached only after
attempting the full formula) — the discriminant's primary practical value is precisely that it
answers "how many real roots, and of what kind" BEFORE any solving is attempted, and skipping this
check turns a one-step determination into a source of confusion partway through a longer
computation.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — FACTORING-IS-UNIVERSAL** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — factoring, learned and practiced first
    (`math.alg.factoring-trinomials`), is generalised to be THE method for solving any quadratic,
    with the quadratic formula treated as an unfamiliar fallback rather than the universal tool it
    actually is.
  - **Characteristic phrase**: attempting to factor x²−3x−1=0, failing to find integers with
    product −1 and sum −3, and concluding the equation has no solution — when Δ=13>0 confirms two
    genuine irrational roots.
  - **Detection probe** (verbatim, Blueprint): a student cannot factor x²−3x−1=0 by inspection and
    concludes no solution exists — checking whether this conclusion is accepted rather than
    corrected confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — restate the rule with its correction: the quadratic
    formula is not a fallback, it is the universal method; check Δ first, and if Δ≥0 and not a
    perfect square, use the formula directly rather than continuing to search for integer factors.
  - **Verification of death**: given a mixed set of factorable and non-factorable-but-real-rooted
    quadratics, the learner correctly checks Δ first and selects the appropriate method (factoring
    or formula) without getting stuck on the non-factorable cases.

- **MC-2 — NEGATIVE-b-FORMULA-ERROR** (foundational)
  - **Birth type**: Type 4, notation-induced — the "−b" term in the formula is misread as "copy b's
    sign" rather than "genuinely negate b," an error that surfaces specifically and only when b
    itself is already negative.
  - **Characteristic phrase**: for x²−6x+8=0 (b=−6), writing the formula's numerator term as
    −(−6)=−6 instead of the correct +6.
  - **Detection probe** (verbatim, Blueprint): for x²−6x+8=0, a student writes the numerator as
    −(−6)=−6 — confirms MC-2; correct value is −(−6)=+6.
  - **Repair**: Blueprint Repair Action B02 — require an explicit, labelled intermediate step
    before substituting into the formula: "b=___, −b=___" written out as two separate lines, so the
    negation is performed deliberately rather than copied automatically.
  - **Verification of death**: given several quadratics with negative b values, the learner
    correctly computes −b as positive every time, without the explicit labelled-step scaffold being
    required.

- **MC-3 — NEGATIVE-DISCRIMINANT-REAL-ROOT** (moderate)
  - **Birth type**: Type 3, language contamination — "solve for x" is interpreted as an instruction
    that must always produce a numeric answer, so a negative discriminant (where no real answer
    exists) is either ignored (continuing to compute √Δ as if real) or reached only as a confused
    dead end rather than being checked and reported upfront as a definitive, valid conclusion in
    its own right.
  - **Characteristic phrase**: for x²+2x+5=0 (Δ=4−20=−16), either computing √(−16) as though it
    were a real number, or reaching "no solution" only after attempting the full formula rather
    than checking Δ first.
  - **Detection probe** (verbatim, Blueprint): asked to determine the number of real roots of
    x²+4x+7=0 WITHOUT solving, an answer other than "no real roots, checked via Δ=16−28=−12<0"
    confirms MC-3, or a "cannot determine without solving" answer reveals the discriminant's
    upfront-determination value has not been internalised.
  - **Repair**: use the discriminant as the deciding, upfront computation — Δ<0 is a definitive,
    complete, valid answer ("no real roots") in its own right, reachable in one step, never a
    confused stopping point reached only after a failed full-formula attempt.
  - **Verification of death**: given a set of quadratics with a mix of positive, zero, and negative
    discriminants, the learner correctly determines the number and nature of real roots for each,
    including confidently reporting "no real roots" for the negative-discriminant cases, without
    attempting unnecessary further computation.

## Analogies
- **A weather forecast that determines your plan before you leave the house.** Computing the
  discriminant before solving is like checking the forecast before deciding whether to bring an
  umbrella (factor), a raincoat (use the formula), or stay inside (no real solution exists) — the
  forecast (Δ) is checked FIRST, and it directly determines the appropriate response, rather than
  guessing a plan and discovering partway through that it doesn't fit the conditions. *Where it
  holds*: the "check first, then act accordingly" structure, directly targeting MC-1 and MC-3.
  *Where it breaks*: a weather forecast doesn't have an equivalent of "the SAME underlying formula
  always works regardless of conditions" — the quadratic formula's universality (working whenever
  Δ≥0, however inefficiently) has no forecast-and-umbrella parallel, and must be taught directly.
- **A translator who must accurately negate, not merely relay, a stated value.** Computing −b is
  like a translator whose job is to state the OPPOSITE of what was given, not simply repeat it in a
  different font — given a negative value, an accurate "opposite" translation produces a positive
  result. *Where it holds*: the "genuinely transform, don't just relay" requirement, directly
  targeting MC-2. *Where it breaks*: a translator's job is externally defined by language rules; the
  "opposite" operation here is a specific, checkable arithmetic rule (multiply by −1) that the
  analogy illustrates conceptually but does not teach mechanically — the explicit labelled-step
  practice remains necessary.

## Demonstrations
1. **Discriminant-first method selection on a factorable case, directly confronting MC-1.** Solve
   3x²−7x+2=0. Δ=(−7)²−4(3)(2)=49−24=25, a perfect square (√25=5) → factoring is viable. AC:
   ac=6; find p,q with p·q=6, p+q=−7: pair (−6,−1). Split and group: 3x²−6x−x+2 = 3x(x−2)−1(x−2)
   = (3x−1)(x−2)=0 → x=1/3 or x=2.
2. **The quadratic formula on a non-perfect-square case, directly confronting MC-1 and MC-2.**
   Solve 2x²−4x−3=0. a=2, b=−4, c=−3. Δ=(−4)²−4(2)(−3)=16+24=40, NOT a perfect square → use the
   formula (never attempt further factoring). Sign discipline: b=−4, so −b=−(−4)=+4 — the
   numerator starts with +4, not −4. x=(4±√40)/4 = (4±2√10)/4 = (2±√10)/2. Two irrational roots,
   x₁≈2.581, x₂≈−0.581.
3. **The three discriminant cases contrasted directly, including the derivation of the formula
   itself.** Δ=25>0 (perfect square): x²−5x+6=0 → x=2, x=3 (two distinct rational roots). Δ=0:
   x²−6x+9=(x−3)²=0 → x=3 only (one repeated root, the parabola tangent to the x-axis). Δ<0,
   directly confronting MC-3: x²+2x+5=0 → Δ=4−20=−16<0 → STOP, no real solution; √(−16) is not a
   real number, and this is a complete, valid, upfront answer. Derivation: completing the square on
   ax²+bx+c=0 gives x²+(b/a)x+(b/2a)² = −c/a+(b/2a)² → (x+b/2a)² = (b²−4ac)/(4a²) →
   x = (−b±√(b²−4ac))/(2a) — the formula IS the completed-square result, not a separate fact.

## Discovery Questions
- "You can't find two integers that multiply to −1 and add to −3 for x²−3x−1=0. Before you
  conclude there's no solution, compute the discriminant. What does it tell you?" — surfaces MC-1
  by redirecting to the discriminant check rather than accepting a factoring dead end as final.
- "For x²−6x+8=0, b is −6. What is −b? Write it out as its own line before you substitute it into
  the formula." — surfaces MC-2 by requiring the explicit negation step to be performed and
  checked in isolation.
- "For x²+4x+7=0, can you tell how many real roots it has WITHOUT solving the whole equation? What
  single number would tell you?" — surfaces MC-3 by requiring the discriminant to be recognised as
  a sufficient, upfront answer on its own.

## Teaching Sequence
1. **Anchor**: connect to the already-secure linear-equation experience — a quadratic is one degree
   higher and can have up to two solutions instead of exactly one, introduced as a natural
   extension rather than an unrelated new topic.
2. **Establish the discriminant as the mandatory first step**, before any solving method is
   attempted, with the full decision table (Δ>0 perfect square / Δ>0 not / Δ=0 / Δ<0) stated
   explicitly from the start — directly pre-empting both MC-1 and MC-3.
3. **Work a factorable case first, reusing already-fluent trinomial factoring** (Demonstration 1),
   confirming the connection to `math.alg.factoring-trinomials` explicitly.
4. **Work a non-perfect-square case via the formula, with sign discipline made explicit from the
   first example** (Demonstration 2), requiring the labelled "b=___, −b=___" step every time,
   directly pre-empting MC-2.
5. **Contrast all three discriminant cases side by side, including the negative case treated as a
   complete valid answer** (Demonstration 3), directly pre-empting MC-3.
6. **Derive the quadratic formula via completing the square explicitly**, so the formula's own
   structure is understood rather than merely memorised, per the Blueprint's own scoping (full
   completing-the-square-as-a-method is deferred to the child concept).
7. **Practice mixed problems** deliberately combining all three discriminant cases and requiring
   the discriminant-first discipline before any solving method is chosen.
8. **Bridge forward**: state explicitly that this concept's method-selection discipline generalises
   to `math.alg.polynomial-roots` (higher-degree equations, where no single universal formula
   exists), and that its own children (`completing-the-square`, `quadratic-formula`, `discriminant`)
   will deepen each piece introduced here.

## Tutor Actions
- Before accepting any solving attempt, ask "what is the discriminant here, and what does it tell
  you about which method to use?" — this single question directly defends against both MC-1 and
  MC-3 by installing the discriminant-first habit as a non-negotiable opening step.
- Before accepting any quadratic-formula substitution, ask the learner to state b and −b as two
  separate, explicit values before proceeding — targeting MC-2 directly, at the exact point the
  error would be made.
- When a factoring attempt stalls, ask "have you checked the discriminant yet? Is it even a
  perfect square?" before offering the formula — this makes the discriminant check itself the
  recovery step, not merely a bypassed-and-forgotten preliminary.
- Never accept "no solution" as a final answer without the discriminant computation shown
  explicitly — a "no solution" reached by exhausting factoring attempts (rather than by checking Δ)
  is a symptom of MC-1, not a correct conclusion, even when the final verdict happens to be right.

## Voice Teaching Notes
- When introducing the discriminant, speak the decision-tree structure with clear pacing: "compute
  delta first... is it negative? Stop. Is it a perfect square? Factor. Otherwise? Formula." —
  narrated as a fixed, repeatable sequence every time, directly reinforcing the discriminant-first
  discipline against MC-1 and MC-3.
- When substituting into the quadratic formula aloud, say the negation step explicitly and audibly
  every time: "b is negative six... so minus b is... positive six" — spoken with a genuine pause
  before stating the negated value, modelling the deliberate (not automatic) negation targeted at
  MC-2.
- When reaching a negative-discriminant case aloud, state the conclusion with confidence rather
  than hesitation: "delta is negative — that's a complete answer: no real roots" — spoken assertion
  (not trailing uncertainty) reinforces that this is a valid, sufficient stopping point, targeting
  MC-3.

## Assessment Signals
- **Correct + fast + checks the discriminant before choosing a method unprompted** → MASTERED;
  ready for `math.alg.polynomial-roots` and, eventually, `math.func.quadratic-function`.
- **Attempts factoring on every quadratic regardless of the discriminant, stalls on non-perfect-
  square cases** → MC-1 active; needs the discriminant-first, formula-is-universal repair.
- **Formula setup correct except for sign errors on a negative b** → MC-2 active; needs the
  explicit labelled-negation-step repair.
- **Reaches or reports "no solution" only after a stalled attempt, rather than via an upfront
  discriminant check; or continues computing with a negative Δ** → MC-3 active; needs the
  discriminant-as-upfront-answer repair.
- **Cannot factor a trinomial at all, even a simple one** → prerequisite gap in
  `math.alg.factoring-trinomials`, not specific to this concept's method-selection or formula
  content; route back to that concept.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out after a frustrating failed factoring search, validate
the frustration directly — factoring genuinely does not work for every quadratic, and their search
was not wasted effort; reframe the correction as "you've now confirmed factoring isn't the tool for
THIS one" rather than "you failed," then pivot immediately to the formula as the next, reliable
step rather than dwelling on the unsuccessful search. If sign errors (MC-2) persist after one
correction, do not simply restate the rule — require the explicit "b=___, −b=___" written step on
every subsequent problem for several repetitions, since this specific error responds better to a
structural scaffold (a mandatory written step) than to a verbal reminder alone.

## Memory Hooks
- "Delta first, always" — the discriminant-first opening discipline, directly targeting both MC-1
  and MC-3.
- "The formula is universal; factoring is the shortcut" — the correct relationship between the two
  methods, directly targeting MC-1.
- "Negative b means genuinely flip the sign" — the negation discipline, directly targeting MC-2.
- "Delta negative is a complete answer, not a dead end" — the negative-discriminant confidence
  rule, directly targeting MC-3.

## Transfer Connections
- **`math.alg.factoring-trinomials`** (prerequisite, reused): the factoring-based solving method
  here is a direct application of that concept's own product/sum search, combined with the
  zero-product property newly introduced here.
- **`math.alg.polynomial-roots`** (direct unlock): this concept's discriminant-based method-
  selection discipline is the direct precursor to the more general root-finding strategies
  (Rational Root Theorem, deflation) needed once no single universal formula exists for
  higher-degree polynomials.
- **`math.func.quadratic-function`** (direct unlock, not yet authored): the function-theoretic
  treatment of quadratics — vertex, axis of symmetry, the discriminant's connection to whether the
  parabola crosses, touches, or misses the x-axis — is a direct formalisation of the exact
  root-counting logic this concept's discriminant already establishes.
- **KG children (`completing-the-square`, `quadratic-formula`, `discriminant`)**: each will deepen
  one piece of the treatment introduced together here — completing the square as a standalone
  method (not merely a derivation), the formula's own edge cases and applications, and the
  discriminant's complex-root interpretation.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, projectile motion): solving for the time a projectile returns to
  a given height, or reaches a given range, is a direct quadratic-equation application — the
  discriminant's "no real roots" case corresponds to a physically meaningful "this event never
  occurs" conclusion.
- **Chemistry** (`chem.` equilibrium, quadratic ICE-table expressions): solving for an unknown
  concentration in an equilibrium expression that reduces to a quadratic reuses this exact
  discriminant-first, factor-or-formula procedure, with a negative discriminant again carrying the
  physically meaningful reading "no real concentration solves this."

## Blueprint References
- `docs/curriculum/blueprints/math.alg.quadratic-equation.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.85, estimated_hours 12, requires
  [math.alg.factoring-trinomials], unlocks [math.func.quadratic-function,
  math.alg.polynomial-roots]); Component 2 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for 3x²−7x+2=0, x²−5x+6=0,
  2x²−4x−3=0, x²−6x+9=0, x²+2x+5=0, and the completing-the-square derivation, reused directly in
  the Demonstrations above); the P76 transfer probe (a rectangle perimeter/area word problem
  requiring genuine equation setup, discriminant computation, and dual-condition verification,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The Blueprint's own Component 8 already documents its deliberate
  scoping decision (completing the square introduced only as derivation, full method deferred to
  the child concept) as an intentional design choice, not a gap — recorded here as a standing
  forward-work note for when `math.alg.completing-the-square`, `math.alg.quadratic-formula`, and
  `math.alg.discriminant` are reached in a future wave.

## Version History
- 2026-09-11 — Initial authoring (Batch 8 / math.alg Wave 10 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
