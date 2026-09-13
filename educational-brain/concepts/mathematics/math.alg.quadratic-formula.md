# math.alg.quadratic-formula

## Identity
- **KG ID**: `math.alg.quadratic-formula`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.completing-the-square` — load-bearing part: this concept's entire derivation is
    `math.alg.completing-the-square`'s own non-monic procedure (factor out a, complete the square,
    solve), applied not to a specific numeric quadratic but with a, b, c left as general symbols;
    without that procedure already verified on a concrete case, the symbolic derivation has no
    trusted foundation to generalise from.
- **Unlocks**: `math.alg.discriminant`
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (MAMR = ⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.quadratic-formula.md` (reused by reference
  throughout)
- **KG note**: this concept's KG parent is `math.alg.quadratic-equation`, whose own already-
  authored entry already states and uses the formula as one of three solving methods; this entry's
  distinct job (per the Blueprint's own explicit division of labour) is the SYMBOLIC generalisation
  of `math.alg.completing-the-square`'s already-trusted procedure, and the formula's practical
  payoff as a direct-substitution computational shortcut — not re-deriving completing the square's
  own mechanics from scratch.

## Learning Objective
- The learner can derive the quadratic formula symbolically from completing the square, applied to
  the GENERAL ax²+bx+c=0 (not a specific numeric case) — reusing `math.alg.completing-the-square`'s
  own non-monic procedure verbatim with a, b, c as symbols — confirming it produces exactly
  x=(−b±√(b²−4ac))/2a.
- The learner can apply the quadratic formula DIRECTLY to solve a new quadratic equation by
  substitution, without re-deriving it via completing the square each time — recognising the
  formula as a genuine computational shortcut once derived, not requiring the full procedure to be
  repeated for every new equation.
- The learner can recognise, at an orientation level, that the expression b²−4ac (the discriminant,
  appearing under the square root) controls the number and type of roots — without yet deriving the
  full three-way classification, which is deferred to `math.alg.discriminant`.

## Core Understanding
The quadratic formula is not a separate fact to memorise from scratch — it is exactly what
`math.alg.completing-the-square`'s own already-trusted, non-monic procedure produces when run with
letters instead of numbers. Applying that identical procedure to ax²+bx+c=0 with a, b, c left as
general symbols: factor out a: a(x²+(b/a)x)+c=0; complete the square:
a((x+b/2a)²−b²/4a²)+c=0; distribute and isolate: a(x+b/2a)²=(b²−4ac)/4a; divide by a and take the
square root: x+b/2a=±√(b²−4ac)/2a, giving x=(−b±√(b²−4ac))/2a — the quadratic formula, produced by
the exact same procedure already verified on a specific numeric case, now confirmed to work
identically with general symbols. The formula's entire practical payoff is that, once derived, it
lets any quadratic ax²+bx+c=0 be solved by DIRECT SUBSTITUTION of a, b, c — no need to repeat the
completing-the-square process for every new equation; subsequent problems become substitution-and-
arithmetic, not a fresh derivation. At an orientation level, the quantity under the square root,
b²−4ac (the discriminant), determines how many distinct real roots the equation has without needing
to fully solve for them: positive gives two distinct real roots, zero gives exactly one repeated
real root, negative gives no real roots (two complex roots instead) — the full development of this
classification is the dedicated subject of this concept's own unlock, `math.alg.discriminant`.

## Mental Models
1. **Beginner — the quadratic formula is a tool for finding roots by plugging in a, b, and c.** For
   ax²+bx+c=0, substitute into x=(−b±√(b²−4ac))/2a and compute. *Upgrade trigger*: being asked
   WHERE the formula comes from, or whether it could be wrong, revealing that it was treated as an
   arbitrary given fact rather than a derived result. *Shelf life*: one session.
2. **Intermediate — the formula is literally completing the square, run once with symbols instead
   of numbers, and the resulting formula replaces re-derivation with substitution forever after.**
   *Upgrade trigger*: being asked how many real roots an equation has WITHOUT solving it — revealing
   that the discriminant carries information beyond merely computing under the radical. *Shelf
   life*: durable once the formula-as-shortcut relationship is internalised.
3. **Advanced — the discriminant's SIGN alone (not its exact value) answers "how many real roots?"
   before any further work is done, making it a genuinely useful triage tool distinct from the full
   solving process.** *Upgrade trigger*: a scenario where only the NUMBER of roots matters (not
   their values), making the discriminant-first check a genuinely more efficient strategy than
   fully solving.
4. **Expert — the quadratic formula, completing the square, and factoring are three tools for the
   same underlying object, each earned by a specific derivation or applicable in a specific
   circumstance, and knowing which to reach for (and why each one works) is itself the mastery
   target, not merely memorised computation.** *Shelf life*: permanent, and it is exactly the
   discipline this concept's own unlock, `math.alg.discriminant`, continues to develop in full.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks foundational, is believing the
quadratic formula is a separate, independently memorised fact, entirely unrelated to the
completing-the-square procedure already known — missing that it is literally the symbolic output of
that same procedure, which produces a fragile, purely rote relationship with the formula (easy to
misremember a sign or a term, with no way to self-correct by re-deriving it). The second failure,
ranked high severity in the Blueprint's own registry, is believing each new quadratic equation still
requires completing the square (or otherwise re-deriving the formula) from scratch, rather than
direct substitution into the already-derived formula — missing the formula's entire practical
payoff, and needlessly repeating a longer procedure when a short, reliable substitution would
suffice. The third failure is believing a quadratic equation must be fully solved (computing the
actual root values) to determine how many real roots it has, missing that the discriminant's sign
alone — a single quick computation, performed before any square root or final answer is needed —
answers this question completely on its own.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — FORMULA-ASSUMED-UNRELATED-TO-COMPLETING-SQUARE** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced — the formula is frequently presented and drilled
    as a standalone fact to memorise (often before or without a full derivation), so its genuine
    origin as completing-the-square's symbolic output is never internalised.
  - **Characteristic phrase**: treating the quadratic formula as an independently memorised fact,
    unable to connect it to the already-known completing-the-square procedure.
  - **Detection probe** (verbatim, Blueprint): asking whether the quadratic formula is a separate,
    independently memorised fact, unrelated to completing the square — a "yes" answer confirms
    MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-walk the symbolic derivation, re-anchoring on
    "this is the same procedure, run with letters instead of numbers."
  - **Verification of death**: given the request "derive the quadratic formula," the learner
    spontaneously begins from completing the square rather than attempting to recall the formula
    from memory alone.

- **MC-2 — RE-DERIVATION-ASSUMED-NECESSARY-EACH-TIME** (high)
  - **Birth type**: Type 1, overgeneralisation — having just learned the formula's derivation, the
    process itself (rather than its OUTPUT) is treated as the reusable tool, so each new problem is
    approached by re-running the full derivation instead of substituting into the already-derived
    result.
  - **Characteristic phrase**: attempting to complete the square from scratch on a new quadratic
    rather than directly substituting a, b, c into the formula.
  - **Detection probe** (verbatim, Blueprint): asking whether completing the square must be
    repeated for each new quadratic — a "yes" answer confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-walk a direct-substitution solution, re-anchoring
    on "the formula, once derived, replaces re-derivation with substitution."
  - **Verification of death**: given a new quadratic equation, the learner solves it by direct
    substitution into the formula without attempting to re-derive it via completing the square.

- **MC-3 — ROOT-COUNT-ASSUMED-TO-REQUIRE-FULL-SOLVING** (moderate)
  - **Birth type**: Type 1, overgeneralisation — "solve the equation" is treated as the only way to
    learn anything about its roots, so the discriminant's standalone diagnostic value (answerable
    without solving at all) is never recognised as a distinct, more efficient question.
  - **Characteristic phrase**: fully solving an equation to determine how many real roots it has,
    rather than checking only the discriminant's sign.
  - **Detection probe** (verbatim, Blueprint): asking whether a quadratic must be fully solved to
    count its real roots — a "yes" answer confirms MC-3.
  - **Repair**: re-walk the discriminant-sign classification directly, re-anchoring on "the sign
    alone answers this, before any solving."
  - **Verification of death**: given a quadratic equation, the learner determines the number of
    real roots by checking only the discriminant's sign, without computing the actual roots.

## Analogies
- **A recipe you've cooked once from scratch, now written down for repeated use.** Deriving the
  formula once via completing the square is like cooking a complex dish from raw ingredients the
  first time, carefully measuring and testing each step — once the recipe is correctly written
  down, every future preparation is following the recipe directly, not re-inventing it from
  scratch each time. *Where it holds*: the "derive once, reuse via the written result" structure,
  directly targeting MC-1 and MC-2. *Where it breaks*: a recipe can be followed without
  understanding WHY each step works, while the formula's derivation is what guarantees its
  correctness can be re-verified if ever doubted — the analogy should not be read as licensing
  "just memorise the formula and forget the derivation."
- **Checking a weather forecast's category before deciding whether to look at the hourly
  details.** The discriminant's sign is like a forecast's simple category (sunny/rainy/stormy) —
  it answers a coarse but genuinely useful question (how many roots, roughly what kind) without
  requiring the full detailed computation (the exact root values), which is a separate, more
  detailed question you can choose to pursue afterward if needed. *Where it holds*: the
  "coarse-answer-first, detailed-answer-optional" structure, directly targeting MC-3. *Where it
  breaks*: a forecast category doesn't derive FROM the detailed data the way the discriminant is
  literally the same b²−4ac computation embedded inside the full formula — it's not an independent
  shortcut, it's a piece of the same computation read for a narrower purpose.

## Demonstrations
1. **The general symbolic derivation, directly confronting MC-1.** Derive the formula for
   ax²+bx+c=0 using exactly `math.alg.completing-the-square`'s own procedure, now with symbols:
   factor out a: a(x²+(b/a)x)+c=0. Complete the square: a(x²+(b/a)x+b²/4a²−b²/4a²)+c=0 →
   a((x+b/2a)²−b²/4a²)+c=0. Distribute: a(x+b/2a)²−b²/4a+c=0 → a(x+b/2a)²=(b²−4ac)/4a. Divide by a:
   (x+b/2a)²=(b²−4ac)/4a². Take the square root: x+b/2a=±√(b²−4ac)/2a, so
   x=(−b±√(b²−4ac))/2a — exactly the quadratic formula, confirming `math.alg.completing-the-
   square`'s own procedure (already verified on 3x²−5x+1=0) works identically with general
   symbols.
2. **Direct application, the efficiency payoff, directly confronting MC-2.** Solve 2x²+5x−3=0 by
   directly substituting a=2, b=5, c=−3 into the formula: x=(−5±√(25−4(2)(−3)))/2(2) =
   (−5±√(25+24))/4 = (−5±√49)/4 = (−5±7)/4 — giving x=2/4=1/2 or x=−12/4=−3. This took a handful of
   substitution-and-arithmetic steps, with NO completing-the-square process repeated.
3. **The discriminant preview, directly confronting MC-3.** For 2x²+5x−3=0 (Demonstration 2), the
   discriminant b²−4ac=25+24=49>0 (a perfect square), giving TWO distinct real roots — matching the
   two distinct answers found, 1/2 and −3. Contrast: for x²+4x+4=0, discriminant=16−16=0, giving
   exactly ONE repeated root; for x²+x+1=0, discriminant=1−4=−3<0, giving no real roots at all. The
   discriminant's SIGN alone — computed without solving anything further — determines this
   three-way classification.

## Discovery Questions
- "You've been asked to derive the quadratic formula. Where would you actually start — trying to
  recall it from memory, or running a procedure you already know?" — surfaces MC-1 by directing
  attention to the derivation route rather than rote recall.
- "You have a brand-new quadratic to solve. Do you need to complete the square again, or is there
  something faster now that you've already derived the formula once?" — surfaces MC-2 by requiring
  the learner to justify their chosen approach.
- "Without solving x²+4x+4=0 all the way through, can you tell how many real roots it has? What
  single number would tell you?" — surfaces MC-3 by requiring the discriminant to be recognised as
  a sufficient, standalone answer.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure, non-monic completing-the-square procedure
   — this concept is the symbolic generalisation of that exact procedure, not a new topic.
2. **Work the full symbolic derivation first** (Demonstration 1), matching each step explicitly to
   the already-familiar numeric procedure, directly pre-empting MC-1.
3. **Immediately demonstrate the efficiency payoff on a fresh numeric example** (Demonstration 2),
   with no completing-the-square steps shown, directly pre-empting MC-2.
4. **Introduce the discriminant as a standalone diagnostic tool** (Demonstration 3), contrasted
   against fully solving, directly pre-empting MC-3.
5. **Practice mixed problems** deliberately requiring direct substitution (never re-derivation) and
   discriminant-only root-counting (never unnecessary full solving).
6. **Bridge forward**: state explicitly that the discriminant's full three-way classification is
   this concept's own unlock, `math.alg.discriminant`.

## Tutor Actions
- Before accepting any statement of the quadratic formula, ask "where does this come from? Can you
  show me, even briefly, how completing the square produces it?" — targeting MC-1 directly.
- Before accepting a completing-the-square attempt on a new quadratic equation, ask "do you need to
  do this from scratch, or is there a faster tool available now?" — targeting MC-2 directly.
- Before accepting a fully-solved answer to "how many real roots," ask "could you have answered
  this with just one computation, before solving anything?" — targeting MC-3 directly.
- Never accept the quadratic formula's statement without at least a brief acknowledgment of its
  derivation origin, even when the formula itself is stated correctly.

## Voice Teaching Notes
- When deriving the formula aloud, narrate the parallel to the numeric case explicitly: "this is
  the exact same steps... just with letters instead of numbers" — audibly reinforcing the
  connection, directly targeting MC-1.
- When demonstrating direct substitution aloud, speak with a clear sense of speed and efficiency:
  "plug in a, b, c... done — no completing the square needed" — the contrast in pacing reinforces
  the efficiency payoff, targeting MC-2.
- When checking the discriminant aloud, narrate it as a self-contained question: "just this one
  number tells me how many roots — I don't need to solve anything else yet" — targeting MC-3.

## Assessment Signals
- **Correct + fast + derives the formula from completing the square when asked, uses substitution
  by default** → MASTERED; ready for `math.alg.discriminant`.
- **Formula recalled but cannot connect it to completing the square** → MC-1 active; needs the
  re-derivation repair.
- **Attempts to complete the square from scratch on a new problem instead of substituting** → MC-2
  active; needs the direct-substitution-efficiency repair.
- **Fully solves an equation merely to count its real roots** → MC-3 active; needs the
  discriminant-sign repair.
- **Cannot complete the square even on a specific numeric quadratic** → prerequisite gap in
  `math.alg.completing-the-square`, not specific to this concept's symbolic generalisation; route
  back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration at having "memorised it
wrong," reassure directly that the formula itself may well be correctly recalled — the gap is in
its CONNECTION to the derivation, not necessarily the formula's accuracy; reframe the correction as
adding a safety net (the ability to re-derive if ever unsure) rather than implying the prior
knowledge was flawed. If MC-2 persists after one correction, avoid simply restating "use the
formula" — instead time both approaches side by side on the same problem (a brief completing-the-
square attempt versus direct substitution), making the efficiency difference concrete and
self-evident rather than an assertion to take on faith.

## Memory Hooks
- "Same procedure, just with letters" — the formula's genuine origin, directly targeting MC-1.
- "Derived once, used forever by substitution" — the efficiency payoff, directly targeting MC-2.
- "The sign alone tells you how many, before you solve anything" — the discriminant's standalone
  diagnostic value, directly targeting MC-3.

## Transfer Connections
- **`math.alg.discriminant`** (direct unlock): this concept's orientation-level introduction of the
  discriminant's sign-based classification is exactly what that concept will develop in full.
- **`math.alg.completing-the-square`** (prerequisite, reused): this concept is the direct symbolic
  generalisation of that concept's own already-verified procedure.
- **`math.alg.quadratic-equation`** (KG parent, indirect): that concept's own brief introduction of
  the formula as one of three solving methods is deepened here into a full derivation and
  efficiency argument.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, circuits): the quadratic formula is the direct computational
  tool for solving time-of-flight and other quadratic-modelled physical equations — the Blueprint's
  own transfer probe uses exactly a projectile-height scenario.
- **Computer science** (`cs.` numerical methods): the quadratic formula's direct-substitution
  efficiency is precisely the kind of "derive once, apply repeatedly" pattern that underlies
  algorithmic efficiency more broadly — recognising a reusable closed-form solution versus
  re-deriving from scratch each time is a transferable computational habit.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.quadratic-formula.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.9, estimated_hours 5, requires
  [math.alg.completing-the-square], unlocks [math.alg.discriminant]); Component 6 (Misconception
  Registry MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked
  examples for the general symbolic derivation and 2x²+5x−3=0, reused directly in the
  Demonstrations above); the P76 transfer probe (a projectile height-equals-zero scenario requiring
  discriminant-first prediction then direct solving, independence mode) — held in the Blueprint's
  own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The explicit division of labour with
  `math.alg.completing-the-square` (that concept owns the general non-monic PROCEDURE, this concept
  owns the SYMBOLIC generalisation) is a deliberate, coordinated design choice — recorded as
  confirmed, not as a finding requiring resolution.

## Version History
- 2026-09-11 — Initial authoring (Batch 10 / math.alg Wave 12 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
