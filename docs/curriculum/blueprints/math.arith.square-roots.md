# Teaching Blueprint: Square Roots (`math.arith.square-roots`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.square-roots` |
| name | Square Roots |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.arith.square-numbers` |
| unlocks | `math.alg.radicals`, `math.geom.pythagorean-theorem` |
| cross_links | `math.alg.radicals`, `math.geom.pythagorean-theorem` (**both not yet authored** — verified via `ls` returning no files for either; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — physical square-area model before symbolic √ notation |
| description (KG) | The square root √x of a nonneg real x is the nonneg number y such that y² = x; extends to n-th roots for positive integers n. |

## Component 1 — Learning Objectives

- LO1: Define the square root $\sqrt{x}$ of a nonnegative real $x$ as the *unique nonnegative* number $y$ such that $y^2 = x$, and compute exact square roots of perfect squares from memory (using `math.arith.square-numbers`).
- LO2: Recognize that every positive real number has *two* numbers whose square equals it ($y$ and $-y$), but that the $\sqrt{\phantom{x}}$ symbol itself denotes only the nonnegative one — correctly distinguishing $\sqrt{x}$ from "the solutions to $y^2=x$."
- LO3: Estimate (bound between consecutive integers) the square root of a non-perfect-square positive integer, and extend the root concept to $n$-th roots for positive integer $n$ (e.g. cube roots), including correctly handling negative radicands for odd-index roots.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.square-numbers` (perfect squares $1,4,9,16,25,\ldots$ recognized fluently, enabling instant recall of $\sqrt{n^2}=n$ for small $n$).

## Component 3 — Core Explanation

The **square root** of a nonnegative real number $x$, written $\sqrt{x}$, is defined as **the unique nonnegative number $y$ such that $y^2 = x$**. For example, $\sqrt{9} = 3$ because $3^2=9$ and 3 is nonnegative (even though $(-3)^2=9$ too, $\sqrt{9}$ by definition names only the nonnegative one, 3).

**Two numbers square to the same value, but √ picks one**: for any positive $x$, both $y$ and $-y$ satisfy (their square) $=x$ — but the *symbol* $\sqrt{x}$ is defined to mean only the nonnegative root. If a problem instead asks "solve $y^2=9$ for all $y$," the answer is $y=\pm 3$ — two solutions — which is a genuinely different question from "what is $\sqrt{9}$?" (one answer, 3).

**Estimating non-perfect-square roots**: since $16 < 20 < 25$, and square root is increasing, $\sqrt{16} < \sqrt{20} < \sqrt{25}$, i.e. $4 < \sqrt{20} < 5$ — bounding between consecutive integers using known perfect squares.

**Extension to $n$-th roots**: for a positive integer $n$, the $n$-th root $\sqrt[n]{x}$ generalizes this idea: $\sqrt[n]{x} = y$ means $y^n = x$. For **even** $n$ (like square roots, $n=2$), the radicand must be nonnegative and the root is defined as the nonnegative solution, exactly as above. For **odd** $n$ (like cube roots, $n=3$), every real number — including negatives — has exactly *one* real $n$-th root, since an odd power preserves sign: $\sqrt[3]{-8} = -2$ because $(-2)^3=-8$, with no sign ambiguity to resolve (unlike the even case).

## Component 4 — Worked Examples

**Example 1 (LO1 — exact perfect-square roots)**: $\sqrt{49}=7$ (since $7^2=49$, nonnegative), $\sqrt{144}=12$ (since $12^2=144$).

**Example 2 (LO2 — √ vs. "solve for y", breaking MC-1)**: What is $\sqrt{25}$? Answer: **5** (the one nonnegative root). What are all solutions to $y^2=25$? Answer: $y=5$ or $y=-5$ (both roots). These are different questions with different numbers of correct answers.

**Example 3 (LO3 — estimation and n-th roots)**: Estimate $\sqrt{50}$: since $49<50<64$ i.e. $7^2<50<8^2$, we get $7<\sqrt{50}<8$ (closer to 7, since 50 is much nearer 49 than 64). Separately, $\sqrt[3]{27}=3$ (since $3^3=27$) and $\sqrt[3]{-27}=-3$ (since $(-3)^3=-27$ — no sign ambiguity for the odd-index root, unlike $\sqrt{-27}$, which is not defined over the reals since a negative number has no real square root).

## Component 5 — Teaching Actions

### Teaching Action A01 — Square Root as the Inverse of Squaring, Grounded in Area (Primitive P11: Representation Shift)

Start concrete: draw a square with area 16 square units. Ask: "What's the side length?" — students reason from `math.arith.square-numbers` that $4\times 4=16$, so the side is 4. State: "we call this the square root of 16, written $\sqrt{16}=4$ — 'the side length of a square whose area is 16.'" Repeat with area 25 (side 5), area 9 (side 3), reinforcing the perfect-square recall from the prerequisite concept.

Shift representation to the symbolic definition: $\sqrt{x}=y$ means $y^2=x$ and $y\geq 0$. Emphasize the nonnegativity: "a square's side length can't be negative — that's baked into why √ always gives you the nonnegative answer."

Now generalize beyond exact perfect squares: "what if the area is 20, not a perfect square? There's no whole-number side length, but there's still a definite positive real number whose square is 20 — we just can't write it as a simple integer." Introduce estimation: since $16<20<25$, the side is between 4 and 5.

- **MC-1 hook**: ask "does 9 have one square root or two?" — an answer of "one" without qualification, or confusion when later asked to "solve $y^2=9$," surfaces MC-1 (conflating $\sqrt{x}$-the-symbol with "all numbers that square to x").

### Teaching Action A02 — √-Notation vs. "Solve for y", and Extension to n-th Roots (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place side by side: "Compute $\sqrt{36}$" (answer: 6, one number) versus "Solve $y^2=36$ for all $y$" (answer: $y=6$ or $y=-6$, two numbers). State explicitly: "$\sqrt{\phantom{x}}$ is a *function* — it must give exactly one output for a given input, and mathematicians defined it to output the nonnegative root. 'Solve $y^2=x$' is a different task that asks for *every* number satisfying the equation."

**Contrast 2 (targets MC-2, even vs. odd-index roots with negative radicands)**: Ask "what is $\sqrt{-9}$?" — over the real numbers, there is **no** real number whose square is negative (since any real number squared is nonnegative), so $\sqrt{-9}$ is undefined here. Now ask "what is $\sqrt[3]{-8}$?" — this **is** defined and equals $-2$, since $(-2)^3=-8$ (cubing, an odd power, preserves sign, so no restriction to nonnegative radicands is needed). State the rule: "even-index roots need a nonnegative radicand (over the reals); odd-index roots accept any real radicand, with a uniquely determined sign-matching root."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\sqrt{81}$ and $\sqrt{169}$.
  2. State all solutions to $y^2=64$, and separately state $\sqrt{64}$. Explain why these answers differ.
  3. Estimate $\sqrt{40}$ by bounding it between two consecutive integers, and state which integer it's closer to.
  4. Compute $\sqrt[3]{64}$ and $\sqrt[3]{-64}$. Then state whether $\sqrt{-64}$ is defined over the real numbers, and why or why not.
- **P76 (Transfer Probe, mode = independence)**: "A framer needs a square picture mat with area exactly 200 square centimeters. Using square-root estimation (bounding between consecutive integers using known perfect squares), find the two whole-centimeter side lengths the true side length falls between, and state which is the closer estimate. Separately: a physics formula for a certain oscillation period involves $\sqrt[3]{V}$ where $V$ can be negative (representing a directional volume-like quantity) — explain, using the odd-root sign rule from this lesson, why this formula remains well-defined even when $V<0$, unlike a formula that instead used $\sqrt{V}$." *Component 7 note: these two independent scenarios were chosen deliberately since the KG's named cross-link targets, `math.alg.radicals` and `math.geom.pythagorean-theorem`, do not yet have authored blueprints.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SQRT-SYMBOL-CONFLATED-WITH-ALL-ROOTS | Believing $\sqrt{x}$ itself denotes both $+y$ and $-y$ (rather than only the nonnegative root), conflating "compute $\sqrt{x}$" with "solve $y^2=x$" | Foundational |
| MC-2 | NEGATIVE-RADICAND-ALWAYS-UNDEFINED | Believing every root of a negative number is undefined, failing to distinguish even-index roots (genuinely undefined over the reals for negative radicands) from odd-index roots (well-defined for any real radicand) | Moderate |
| MC-3 | ESTIMATION-ROUNDS-TO-NEAREST-INTEGER-ONLY | Believing an irrational square root must be reported as one of the two bounding integers (rounding), rather than understanding it as a genuine non-integer real number that merely *lies between* them | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Symbol/Solution-Set Conflation") → P41 (detect: ask for $\sqrt{16}$ immediately followed by "solve $y^2=16$" — a matching single-valued answer to both reveals MC-1) → P64 (conceptual shift: re-anchor on "√ is a function, and functions give one output — the definition specifically chose the nonnegative one").
- **B02 (targets MC-2)**: P27 (name it: "Negative-Radicand Overgeneralization") → P41 (detect: ask for $\sqrt[3]{-27}$ — an incorrect "undefined" answer reveals MC-2) → P64 (conceptual shift: re-derive from odd-power sign preservation — $(-3)^3=-27$ directly, no contradiction, unlike squaring which can never yield a negative result).
- **B03 (targets MC-3)**: P27 (name it: "Estimation-as-Rounding") → P41 (detect: ask "is $\sqrt{20}$ exactly equal to 4 or exactly equal to 5?" — answering yes to either reveals MC-3) → P64 (conceptual shift: re-anchor on the area model — a square of area 20 has a genuine, single, non-integer side length strictly between the side lengths of the area-16 and area-25 squares).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.square-numbers` (fluent perfect-square recall is what makes both exact computation and bounding-estimation practical).
- **Unlocks**: `math.alg.radicals` (general radical notation/simplification builds directly on the √ definition and n-th-root extension here), `math.geom.pythagorean-theorem` (computing a hypotenuse or leg length requires taking a square root of a sum/difference of squares).
- **Cross-link**: KG lists both `math.alg.radicals` and `math.geom.pythagorean-theorem` as cross-links. Verified via directory listing that neither blueprint yet exists. Per the established P76_mode rule, this blueprint uses **independence** mode for its transfer probe. A future revision, once either target is authored, may add a genuine cross-link probe — e.g. once `math.geom.pythagorean-theorem` exists, a probe computing a hypotenuse via $\sqrt{a^2+b^2}$ directly exercising this concept's estimation and exact-computation skills together.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a developing/apply tag places this at the "2 main TAs + gate" tier, similar to other h=5-7 concepts in this corpus, since the concept — while carrying three distinct LOs — has a tight conceptual core (inverse of squaring, restricted to nonnegative outputs, generalized by index parity) that both TAs jointly and thoroughly cover without needing a third.
- The n-th-root extension (LO3's second half) was folded into A02 rather than given its own teaching action, because it is best taught as a direct *contrast* with the even-root case already under discussion (same TA, same contrast-pair primitive) rather than as an independent new idea — introducing it separately risked presenting even/odd-index roots as unrelated topics rather than as one parity-governed rule.
- Both cross-link targets being simultaneously unauthored is a first for this corpus (previous blueprints typically had zero or one unauthored cross-link); the transfer probe was designed with two genuinely independent real-world scenarios (mat-framing estimation; a physics odd-root formula) specifically so neither LO went untested by the absence of the cross-linked concepts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.square-numbers`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: area model before symbolic √) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
