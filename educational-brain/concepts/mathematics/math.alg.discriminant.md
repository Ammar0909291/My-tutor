# math.alg.discriminant

## Identity
- **KG ID**: `math.alg.discriminant`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.quadratic-formula` — load-bearing part: the discriminant is precisely the expression
    under that formula's square root, b²−4ac; without the formula already secure, "the
    discriminant" has no structural anchor to point to — it would be an isolated definition rather
    than a recognisable piece of an already-understood object.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.alg.discriminant.md` (reused by reference
  throughout)
- **KG note**: this concept's KG parent is `math.alg.quadratic-equation`, and its own requires is
  `math.alg.quadratic-formula`, whose own already-authored entry introduced the discriminant only
  at orientation level (LO3, explicitly deferred to this concept per that entry's own Blueprint
  scoping); this entry is exactly the full development that deferral anticipated.

## Learning Objective
- The learner can compute the discriminant Δ=b²−4ac for a given quadratic ax²+bx+c=0.
- The learner can use the discriminant's SIGN alone to determine the number and type of roots
  without fully solving the quadratic: positive gives two distinct real roots, zero gives one
  repeated real root, negative gives two complex conjugate roots.
- The learner can explain WHY the discriminant's sign determines root type, by connecting it
  directly to the quadratic formula's √(b²−4ac) term — a real number when non-negative, an
  imaginary number when negative.

## Core Understanding
The discriminant Δ=b²−4ac of a quadratic ax²+bx+c=0 determines the nature of its roots without
needing to fully apply the quadratic formula, because it is EXACTLY the expression sitting under
that formula's radical — its sign directly determines whether that radical produces a real, zero,
or imaginary result. When Δ>0, the square root of a positive number is real and nonzero, so the ±
in the formula genuinely produces two DIFFERENT values: two distinct real roots. When Δ=0, the
square root of zero is zero, collapsing both ± branches onto the SAME single value, x=−b/2a: one
REPEATED real root — a genuine solution, occurring twice, not an absence of solutions. When Δ<0,
the square root of a negative number is imaginary, producing a genuine pair of complex conjugate
roots of the form p±qi — solutions that DO exist, just not among the real numbers; "no real
solution" and "no solution" are entirely different claims, and which one is meant depends on
whether the problem is restricted to real numbers or considers the full complex plane. The
discriminant therefore lets a learner answer "how many roots, and of what kind?" with a single
quick computation, entirely before — and without needing — the fuller work of actually solving the
equation.

## Mental Models
1. **Beginner — compute b²−4ac and check whether it's positive, zero, or negative to know how
   many roots there are.** Positive means two roots, zero means one, negative means none.
   *Upgrade trigger*: being told a negative discriminant's "no roots" conclusion is actually wrong
   — roots exist, just not real ones — revealing the beginner model's silent, incorrect assumption
   that "root" always means "real root." *Shelf life*: one session.
2. **Intermediate — the discriminant's sign maps to THREE outcomes, not two: two distinct real
   roots, one repeated real root, or two complex conjugate roots — "zero roots" is never a correct
   reading of any discriminant sign.** *Upgrade trigger*: being asked to explain WHY these three
   outcomes occur, rather than merely stating the classification rule from memory. *Shelf life*:
   durable once the three-way (never zero-way) classification replaces the beginner's two-way
   reading.
3. **Advanced — the discriminant's sign determines root type because it is literally the argument
   of a square root, and a square root's behaviour (real-nonzero, zero, or imaginary) is exactly
   what determines the three cases.** The classification is not a separate rule to memorise, it is
   a direct consequence of how square roots behave. *Upgrade trigger*: a scenario (such as a
   physical modelling context) where interpreting a negative discriminant's real-world meaning —
   "this specific event never physically occurs" — requires connecting the abstract algebraic
   classification to a concrete situation.
4. **Expert — "no real solution" and "no solution" are fundamentally different claims that must
   never be conflated, and correctly specifying which number system a solution is being sought
   within is part of stating a mathematical result precisely.** *Shelf life*: permanent, and this
   precision habit generalises well beyond quadratics to any equation-solving context involving a
   choice of number system.

## Why Students Fail
The single most frequent failure, ranked foundational, is confusing a zero discriminant with "no
solution" — for x²−6x+9=0, computing Δ=36−36=0 and concluding the equation has no solution, when in
fact Δ=0 means the square root term vanishes entirely, collapsing the ± into a SINGLE genuine real
value (x=3, appearing twice) — a real, existing solution, simply a repeated one, not an absence of
solutions at all. The second failure, equally ranked foundational and structurally the SAME
underlying confusion viewed from a different angle, is concluding "no solution" for a negative
discriminant instead of correctly identifying two complex conjugate solutions — for x²+2x+5=0
(Δ=4−20=−16<0), the roots x=−1±2i genuinely exist, just not among the real numbers; both this
failure and the zero-discriminant failure share the same root cause: treating "the discriminant hit
a special case" as equivalent to "there is nothing to find," when both special cases (zero and
negative) actually correspond to solutions that DO exist, of a specific different character. The
third failure is a purely computational one: miscomputing b²−4ac due to a sign error, especially
when b or c is itself negative — for instance, mishandling the squaring of a negative b, or the
sign when multiplying a negative c into −4ac, producing a discriminant with the WRONG sign and
therefore an entirely incorrect root-type classification even when the intended method was
otherwise correct.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — ZERO-DISCRIMINANT-CONFUSED-WITH-NO-SOLUTION** (FOUNDATIONAL)
  - **Birth type**: Type 3, language contamination — "zero" is colloquially associated with
    "nothing," so a discriminant of exactly zero is read as "nothing to find" rather than as its
    genuine, precise mathematical meaning (the two ± branches coinciding at one value).
  - **Characteristic phrase**: for x²−6x+9=0 (Δ=0), stating the equation "has no solution" instead
    of the correct "one repeated real root, x=3."
  - **Detection probe** (verbatim, Blueprint): presenting Example 2 and checking whether "no
    solution" is concluded from Δ=0 — confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-solve via the quadratic formula explicitly,
    showing the repeated real root x=3 genuinely exists; state the rule: Δ=0 collapses the ± into a
    single real value, a genuine solution, not an absence of solutions.
  - **Verification of death**: given several zero-discriminant quadratics, the learner correctly
    reports "one repeated real root" every time, never "no solution."

- **MC-2 — NEGATIVE-DISCRIMINANT-CONCLUDED-AS-NO-SOLUTION-RATHER-THAN-COMPLEX** (FOUNDATIONAL)
  - **Birth type**: Type 3, language contamination — the same "special case means nothing to find"
    misreading as MC-1, applied to the negative case, where the correct conclusion ("no REAL
    solution, but complex solutions exist") is silently truncated to the stronger, incorrect "no
    solution at all."
  - **Characteristic phrase**: for x²+2x+5=0 (Δ=−16<0), stating "no solution" instead of the
    correct "two complex conjugate roots, −1±2i."
  - **Detection probe** (verbatim, Blueprint): presenting Example 3 and checking whether "no
    solution" (rather than "no real solution, but complex solutions exist") is concluded — confirms
    MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-derive the complex roots explicitly via the
    quadratic formula, showing solutions genuinely exist in the complex numbers; state the rule:
    "no real solution" and "no solution" are different claims — always specify which number system
    is meant.
  - **Verification of death**: given several negative-discriminant quadratics, the learner
    correctly derives and states the complex conjugate roots, never simply "no solution."

- **MC-3 — DISCRIMINANT-FORMULA-SIGN-ERROR** (moderate)
  - **Birth type**: Type 4, notation-induced — squaring a negative b or multiplying a negative c
    into −4ac requires careful, deliberate sign-tracking that is easy to perform incorrectly under
    the compressed notation b²−4ac, especially when the negative sign on b or c is not explicitly
    parenthesised before computing.
  - **Characteristic phrase**: computing b² incorrectly for a negative b (e.g. treating (−5)² as
    −25 instead of the correct 25), or mishandling the sign of −4ac when c is negative.
  - **Detection probe**: reviewing a submitted discriminant computation for a sign error,
    especially with negative b or c — confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-substitute values carefully into b²−4ac, explicitly
    parenthesising negative values before squaring or multiplying.
  - **Verification of death**: given several quadratics with negative b and/or c values, the
    learner correctly computes the discriminant every time, with explicit parenthesisation shown.

## Analogies
- **A traffic light with three genuine states, none of which mean "no car exists."** The
  discriminant's sign is like a traffic light's colour: green (positive, go — two distinct real
  roots), yellow (zero, a single transitional state — one repeated root), red (negative, stop for
  real traffic but a side street continues — complex roots exist "elsewhere"). *Where it holds*:
  the "three distinct, all meaningful states" structure, directly targeting MC-1 and MC-2's shared
  confusion. *Where it breaks*: a red light genuinely stops traffic entirely at that light, while a
  negative discriminant's roots don't "stop" — they continue to exist, just in a different domain
  (the complex numbers) — the analogy should not be read as "negative means nothing happens," which
  would reproduce the exact misconception it is meant to counter, so it must be stated carefully
  with this caveat explicit.
- **A locked door with a key that exists, but not in the room you're currently searching.**
  Concluding "no solution" for a negative discriminant is like searching only one room for a key
  and concluding no key exists anywhere — the key (the complex roots) is real and findable, just
  not in the room you restricted your search to (the real numbers). *Where it holds*: the
  "genuinely exists, just not where you were looking" structure, directly targeting MC-2. *Where it
  breaks*: a physical key exists in one determinate place; complex roots don't have a physical
  "location" the way a key does — the analogy illustrates the logical structure of the error, not
  the mathematical nature of complex numbers themselves.

## Demonstrations
1. **A positive discriminant, establishing the base classification.** For x²−5x+6=0: Δ=(−5)²−4(1)
   (6)=25−24=1>0 — two distinct real roots, confirmed directly by solving: x=2, x=3.
2. **A zero discriminant, directly confronting MC-1.** For x²−6x+9=0: Δ=(−6)²−4(1)(9)=36−36=0 —
   solving via the formula: x=(6±√0)/2=6/2=3. ONE repeated real root, x=3, appearing twice — a
   genuine solution, not an absence of one.
3. **A negative discriminant, directly confronting MC-2.** For x²+2x+5=0: Δ=(2)²−4(1)(5)=4−20=
   −16<0. Solving via the formula: x=(−2±√−16)/2=(−2±4i)/2=−1±2i — two complex conjugate roots
   that genuinely exist, simply not among the real numbers.
4. **A sign-heavy computation, directly confronting MC-3.** For 2x²+7x−4=0: Δ=(7)²−4(2)(−4)=
   49−(−32)=49+32=81>0 — two distinct real roots. Note the careful handling: −4×2×(−4) = −4×2=−8,
   then −8×(−4)=+32 (two negative signs multiplying to a positive), explicitly shown rather than
   rushed, since this is exactly the step MC-3 targets.

## Discovery Questions
- "For x²−6x+9=0, you computed Δ=0. Before concluding 'no solution,' try actually solving the
  equation via the quadratic formula. What do you get?" — surfaces MC-1 by requiring the learner to
  discover the repeated root directly rather than accepting a premature reading of Δ=0.
- "For x²+2x+5=0, Δ is negative. Does that mean NOTHING solves this equation, or does it mean
  something more specific — solving within a particular number system?" — surfaces MC-2 by
  directing attention to the precision of the claim being made.
- "You're computing (−7)²−4(2)(−5). Before combining anything, what does (−7)² actually equal? And
  what does −4×2×(−5) actually equal, step by step?" — surfaces MC-3 by isolating the exact
  computational steps prone to sign errors.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure quadratic formula — the discriminant is not
   a new independent object, it is precisely the expression already sitting under that formula's
   radical.
2. **Establish the positive case first, verified by actually solving** (Demonstration 1), grounding
   the sign-to-outcome mapping in a concrete, checkable example.
3. **Introduce the zero case with the repeated-root solving shown explicitly** (Demonstration 2),
   directly pre-empting MC-1 by making the "genuine solution, just repeated" fact undeniable rather
   than asserted.
4. **Introduce the negative case with the complex roots derived explicitly** (Demonstration 3),
   directly pre-empting MC-2 by making "solutions genuinely exist, just complex" undeniable rather
   than asserted.
5. **Install careful sign-tracking as its own explicit habit** (Demonstration 4), directly
   pre-empting MC-3.
6. **Practice mixed problems** deliberately combining all three discriminant signs, always requiring
   the precise three-way classification (never "no solution" for zero or negative cases) to be
   stated.
7. **Bridge forward**: connect this concept's classification back to `math.alg.quadratic-equation`'s
   own original introduction of the discriminant as a method-selection tool, now fully developed.

## Tutor Actions
- Before accepting any "no solution" conclusion from a discriminant computation, ask "is that
  really true, or does it mean something more specific — no REAL solution?" — this single question
  directly defends against both MC-1 and MC-2.
- Before accepting a zero-discriminant conclusion, ask the learner to actually solve the equation
  via the formula and report what they get — targeting MC-1 directly with concrete verification.
- Before accepting a negative-discriminant conclusion, ask the learner to derive the actual complex
  roots — targeting MC-2 directly with concrete verification.
- Before accepting any discriminant computation involving a negative b or c, ask the learner to
  show the squaring and multiplication steps explicitly, parenthesised — targeting MC-3 directly.

## Voice Teaching Notes
- When stating a zero-discriminant conclusion aloud, use precise language every time: "one REAL
  root, repeated — NOT no solution" — the explicit contrast spoken aloud reinforces the correct
  reading, directly targeting MC-1.
- When stating a negative-discriminant conclusion aloud, use the identical precise-language
  discipline: "no REAL solution — but complex solutions DO exist" — targeting MC-2 directly.
- When computing a discriminant with negative values aloud, narrate each sign step explicitly:
  "minus seven, squared... that's forty-nine, positive... now minus four times two times minus
  four..." — the audible step-by-step sign-tracking reinforces the careful computation habit,
  targeting MC-3.

## Assessment Signals
- **Correct + fast + states the precise three-way classification unprompted, never conflating a
  special case with "no solution"** → MASTERED.
- **Zero discriminant read as "no solution"** → MC-1 active; needs the explicit-solving repair.
- **Negative discriminant read as "no solution" rather than "no real solution, complex roots
  exist"** → MC-2 active; needs the explicit complex-root-derivation repair.
- **Discriminant computed with a sign error involving negative b or c** → MC-3 active; needs the
  explicit parenthesised-computation repair.
- **Cannot apply the quadratic formula at all** → prerequisite gap in `math.alg.quadratic-formula`,
  not specific to this concept's discriminant-interpretation content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 or MC-2 pointed out and expresses genuine surprise that "zero" or
"negative" don't mean "nothing," validate the surprise directly — this IS a subtle, easy-to-misread
distinction, not a careless error, and the correction is worth taking seriously rather than
dismissing as an obvious oversight; walk the explicit solving/derivation step every time until the
precise language becomes automatic. If MC-3 (sign errors) persists after one correction, do not
simply restate "be careful with signs" — instead require every subsequent discriminant computation
to be written with explicit parentheses around every substituted value before any arithmetic is
performed, since a structural writing habit is more durable than a verbal caution for this specific
class of error.

## Memory Hooks
- "Zero means one real root, repeated — never nothing" — the precise zero-discriminant reading,
  directly targeting MC-1.
- "Negative means complex, not nothing — specify the number system" — the precise
  negative-discriminant reading, directly targeting MC-2.
- "Parenthesise before you square or multiply" — the sign-safety habit, directly targeting MC-3.

## Transfer Connections
- **`math.alg.quadratic-formula`** (prerequisite, reused): the discriminant is literally the
  expression under that formula's radical; this concept fully develops the orientation-level
  preview that entry deliberately deferred.
- **`math.alg.quadratic-equation`** (KG grandparent, indirect): that concept's own original
  discriminant-based method-selection framing (factor when Δ is a perfect square, formula
  otherwise) is now fully grounded in this concept's complete three-way root-type classification.
- **`math.alg.polynomial-roots`** (indirect, shared domain): the real-versus-complex root
  distinction this concept teaches for quadratics specifically is the two-root special case of that
  concept's general root-counting and Conjugate Root Theorem machinery.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, projectile motion): determining whether a projectile ever
  reaches a specific height is directly answered by checking a discriminant's sign — the
  Blueprint's own transfer probe uses exactly this scenario, requiring the negative-discriminant
  case to be interpreted physically ("this height is never reached") rather than merely
  algebraically.
- **Electrical engineering** (`phys.` circuits, control systems): a system's characteristic
  equation discriminant determines whether a circuit's response is overdamped (real, distinct
  roots), critically damped (repeated real root), or underdamped/oscillatory (complex roots) —
  reusing this exact three-way classification directly.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.discriminant.md` — Component 0 (metadata: difficulty
  proficient, bloom analyze, mastery_threshold 0.85, estimated_hours 3, requires
  [math.alg.quadratic-formula]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for x²−5x+6=0, x²−6x+9=0,
  x²+2x+5=0, reused directly in the Demonstrations above); the P76 transfer probe (a projectile
  height-target scenario requiring the discriminant to be computed in terms of an unknown
  parameter and its negative case interpreted physically, independence mode) — held in the
  Blueprint's own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The deliberate deferral from `math.alg.quadratic-formula`'s own
  orientation-level LO3 (stated explicitly in that entry's own Curriculum Feedback) is confirmed
  fulfilled by this entry's full development — recorded as confirmed, not as a new finding.

## Version History
- 2026-09-11 — Initial authoring (Batch 11 / math.alg Wave 12 part 2 of the Mathematics Educational
  Brain completion campaign). Blueprint reused by reference in full. No KG or Blueprint file
  modified.
