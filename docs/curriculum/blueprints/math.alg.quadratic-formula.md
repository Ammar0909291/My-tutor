# Teaching Blueprint: Quadratic Formula (`math.alg.quadratic-formula`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.quadratic-formula` |
| name | Quadratic Formula |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.alg.completing-the-square` |
| unlocks | `math.alg.discriminant` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in completing the square on specific numeric quadratics; the general symbolic derivation is introduced directly |
| description (KG) | The explicit formula x = (−b ± √(b²−4ac)) / (2a) giving all roots of ax² + bx + c = 0; derived from completing the square. |

## Component 1 — Learning Objectives

- LO1: Derive the quadratic formula **symbolically** from completing the square, applied to the GENERAL $ax^2+bx+c=0$ (not a specific numeric case) — reusing `math.alg.completing-the-square`'s own non-monic procedure (factor out $a$, complete the square, solve) — confirming it produces exactly $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$.
- LO2: Apply the quadratic formula DIRECTLY to solve a new quadratic equation, without re-deriving it via completing the square each time — recognizing the formula as a genuine computational SHORTCUT once derived, not requiring the full completing-the-square process to be repeated for every new equation.
- LO3 (orientation level — full classification deferred to the unlocked child): recognize the expression $b^2-4ac$ (the **discriminant**, appearing under the square root) as controlling the NUMBER and TYPE of roots (two real, one repeated real, or two complex) — without deriving the full classification, deferred to `math.alg.discriminant`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.completing-the-square` (the full non-monic completing-the-square procedure — factor out $a$, complete the square, solve — already verified on a specific numeric quadratic in that concept's own Example 3).

## Component 3 — Core Explanation

**The general symbolic derivation**: applying `math.alg.completing-the-square`'s own procedure to $ax^2+bx+c=0$ with $a,b,c$ left as SYMBOLS (rather than specific numbers): factor out $a$: $a\left(x^2+\frac ba x\right)+c=0$. Complete the square: $a\left(\left(x+\frac b{2a}\right)^2-\frac{b^2}{4a^2}\right)+c=0$. Distribute and isolate: $a\left(x+\frac b{2a}\right)^2=\frac{b^2}{4a}-c=\frac{b^2-4ac}{4a}$. Divide by $a$ and take the square root: $x+\frac b{2a}=\pm\dfrac{\sqrt{b^2-4ac}}{2a}$, giving $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$ — the quadratic formula, produced by the EXACT SAME procedure already verified on a specific numeric case, now confirmed to work identically with general symbols.

**The formula as a genuine computational shortcut**: once derived, the formula lets you solve ANY quadratic $ax^2+bx+c=0$ by DIRECT SUBSTITUTION of $a,b,c$ — no need to repeat the completing-the-square process for every new equation. This is the entire practical payoff of having done the general derivation once: subsequent problems become substitution-and-arithmetic, not a fresh derivation.

**The discriminant's role (orientation level)**: the quantity under the square root, $b^2-4ac$ (the **discriminant**), determines how many DISTINCT real roots the equation has, without needing to fully solve for them: positive discriminant gives two distinct real roots; zero discriminant gives exactly one repeated real root; negative discriminant gives no real roots (two complex roots instead). Full development of this classification is the dedicated subject of `math.alg.discriminant`.

## Component 4 — Worked Examples

**Example 1 (LO1 — the general symbolic derivation, breaking MC-1)**: deriving the formula for $ax^2+bx+c=0$ ($a\ne0$) using EXACTLY `math.alg.completing-the-square`'s own procedure, now with symbols: factor out $a$: $a\left(x^2+\frac ba x\right)+c=0$. Complete the square: $a\left(x^2+\frac ba x+\frac{b^2}{4a^2}-\frac{b^2}{4a^2}\right)+c=0\Rightarrow a\left(\left(x+\frac b{2a}\right)^2-\frac{b^2}{4a^2}\right)+c=0$. Distribute: $a\left(x+\frac b{2a}\right)^2-\frac{b^2}{4a}+c=0\Rightarrow a\left(x+\frac b{2a}\right)^2=\frac{b^2-4ac}{4a}$. Divide by $a$: $\left(x+\frac b{2a}\right)^2=\frac{b^2-4ac}{4a^2}$. Take the square root: $x+\frac b{2a}=\pm\dfrac{\sqrt{b^2-4ac}}{2a}$, so $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$ — EXACTLY the quadratic formula, confirming `math.alg.completing-the-square`'s own procedure (already verified on the specific case $3x^2-5x+1=0$) works identically when $a,b,c$ are general symbols.

**Example 2 (LO2 — direct application, the efficiency payoff, breaking MC-2)**: solve $2x^2+5x-3=0$ by DIRECTLY substituting $a=2,b=5,c=-3$ into the formula: $x=\dfrac{-5\pm\sqrt{25-4(2)(-3)}}{2(2)}=\dfrac{-5\pm\sqrt{25+24}}{4}=\dfrac{-5\pm\sqrt{49}}{4}=\dfrac{-5\pm7}4$ — giving $x=\frac24=\frac12$ or $x=\frac{-12}4=-3$. This took a handful of substitution-and-arithmetic steps, with NO completing-the-square process repeated — confirming the formula is a genuine computational shortcut once derived.

**Example 3 (LO3, orientation level — discriminant preview)**: for $2x^2+5x-3=0$ (Example 2), the discriminant $b^2-4ac=25+24=49>0$ (a perfect square), giving TWO distinct real roots — matching Example 2's two distinct answers, $\frac12$ and $-3$. Contrast: for $x^2+4x+4=0$, discriminant $=16-16=0$, giving exactly ONE repeated root ($x=-2$); for $x^2+x+1=0$, discriminant $=1-4=-3<0$, giving no real roots at all (two complex roots). The discriminant's SIGN alone — not its exact value — determines this three-way classification, fully developed in `math.alg.discriminant`.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Is the Output of a Procedure You Already Trust (Primitive P11: Representation Shift)

State: "the quadratic formula isn't a separate fact to memorize from scratch — it's exactly what completing the square produces when you run the procedure with letters instead of numbers." Work Example 1's full symbolic derivation, explicitly matching each step to the already-familiar numeric procedure.

- **MC-1 hook**: ask "is the quadratic formula a separate, independently memorized fact, unrelated to the completing-the-square procedure you already know?" — a "yes" answer reveals MC-1 (missing that the formula is literally the symbolic output of that same procedure).

### Teaching Action A02 — The Formula Replaces Re-Derivation With Substitution (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: solving $2x^2+5x-3=0$ took only a few substitution-and-arithmetic steps, with no completing-the-square process repeated at all. State: "once you've derived the formula once, every new quadratic becomes a plug-in-the-numbers problem — you never need to complete the square again just to solve one."

- **MC-2 hook**: ask "to solve a new quadratic equation, must you still complete the square (or otherwise re-derive the formula) each time?" — a "yes" answer reveals MC-2 (missing that direct substitution into the already-derived formula is sufficient).

### Teaching Action A03 — The Discriminant's Sign Answers "How Many Roots?" Without Solving (Primitive P06: Contrast Pair)

Contrast fully solving a quadratic to count its real roots against Example 3's approach — checking only the SIGN of $b^2-4ac$, with no square root or final answer needed. State: "you don't need to solve the equation to know how many real roots it has — the discriminant's sign alone tells you, before you do any further work."

- **MC-3 hook**: ask "must you actually solve a quadratic equation (compute the roots) to determine how many real roots it has?" — a "yes" answer reveals MC-3 (missing that the discriminant's sign alone answers this, without solving).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Derive the quadratic formula symbolically for $ax^2+bx+c=0$, following Example 1's steps (briefly is fine, rather than reproducing every line).
  2. Solve $3x^2-2x-5=0$ by direct substitution into the quadratic formula (do not complete the square).
  3. Explain why using the quadratic formula directly is more efficient than completing the square from scratch for every new quadratic equation, once the formula itself is known to be correct.
  4. Without solving it, determine how many real roots $x^2-6x+9=0$ has, using only the discriminant's value.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to solve $4x^2+12x+9=0$ to find where a projectile's height equals zero. (a) Compute the discriminant first, and use its value to predict, before solving, how many distinct real roots the equation has. (b) Solve the equation directly using the quadratic formula. (c) Explain why computing the discriminant first (before fully solving) can be a useful strategy — for instance, if the engineer only needed to know whether the projectile's path touches the ground at exactly one point, two points, or never, without needing the exact numerical times."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FORMULA-ASSUMED-UNRELATED-TO-COMPLETING-SQUARE | Believing the quadratic formula is a separate, independently memorized fact, missing that it is literally the symbolic output of the already-known completing-the-square procedure | Foundational |
| MC-2 | RE-DERIVATION-ASSUMED-NECESSARY-EACH-TIME | Believing each new quadratic equation still requires completing the square (or re-deriving the formula) rather than direct substitution into the already-derived formula | High |
| MC-3 | ROOT-COUNT-ASSUMED-TO-REQUIRE-FULL-SOLVING | Believing a quadratic must be fully solved to determine how many real roots it has, missing that the discriminant's sign alone answers this without solving | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Formula Assumed Unrelated to Completing the Square") → P41 (detect: ask whether the quadratic formula is a separate fact unrelated to completing the square) → P64 (conceptual shift: re-walk Example 1's symbolic derivation, re-anchoring on "this is the same procedure, run with letters instead of numbers").
- **B02 (targets MC-2)**: P27 (name it: "Re-Derivation Assumed Necessary Each Time") → P41 (detect: ask whether completing the square must be repeated for each new quadratic) → P64 (conceptual shift: re-walk Example 2's direct-substitution solution, re-anchoring on "the formula, once derived, replaces re-derivation with substitution").
- **B03 (targets MC-3)**: P27 (name it: "Root Count Assumed to Require Full Solving") → P41 (detect: ask whether a quadratic must be fully solved to count its real roots) → P64 (conceptual shift: re-walk Example 3's discriminant-sign classification, re-anchoring on "the sign alone answers this, before any solving").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.completing-the-square` (the full non-monic procedure this concept's derivation directly generalizes symbolically, and whose own Example 3 already verified the procedure on a specific numeric quadratic).
- **Unlocks**: `math.alg.discriminant` (will fully develop the root-count classification previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine symbolic derivation and a direct-substitution application) and LO3 kept orientation-level, appropriately deferring the discriminant's full classification to this concept's own unlocked child.
- **Division of labor**: `math.alg.completing-the-square` owns the general non-monic PROCEDURE and already verified it on a specific numeric quadratic ($3x^2-5x+1=0$); this concept owns the SYMBOLIC generalization of that exact procedure (producing the reusable formula) and its practical payoff as a substitution shortcut — deliberately not re-deriving completing the square's own mechanics from scratch, only running the already-trusted procedure with symbols.
- Example 2's choice of $2x^2+5x-3=0$ (yielding a perfect-square discriminant, $49$) was deliberate — clean, checkable arithmetic keeps the efficiency payoff (LO2) concrete and verifiable by hand, setting up Example 3's discriminant discussion on the exact same equation rather than introducing an unrelated new example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient learner already fluent in numeric completing the square; symbolic derivation introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
