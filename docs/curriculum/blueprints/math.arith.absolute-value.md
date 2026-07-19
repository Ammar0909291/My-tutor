# Teaching Blueprint: Absolute Value (`math.arith.absolute-value`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.absolute-value` |
| name | Absolute Value |
| domain | Arithmetic |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.negative-numbers`, `math.arith.number-line` |
| unlocks | `math.alg.absolute-value-equations` |
| cross_links | `math.alg.absolute-value-equations` (not yet authored), `math.real.metric-space` (**authored**) — verified via `ls`; P76_mode = cross-link probe engaging `math.real.metric-space`, see Component 7 |
| CPA_entry_stage | C (Concrete) — points marked on a number line, before the formal piecewise definition |
| description (KG) | The absolute value \|x\| of a real number is its distance from zero on the number line: \|x\| = x if x ≥ 0, and \|x\| = −x if x < 0. |

## Component 1 — Learning Objectives

- LO1: Apply the **piecewise definition** $|x|=x$ if $x\ge0$, $|x|=-x$ if $x<0$ directly to both numeric values and variable EXPRESSIONS, correctly recognizing that the negative case requires the genuine arithmetic NEGATION operation, not a cosmetic "remove the minus sign" shortcut.
- LO2: Recognize that $|x|$ is ALWAYS nonnegative (never negative, regardless of $x$'s own sign) — a direct consequence of measuring DISTANCE — and compute $|a-b|$ as the distance between two points $a$ and $b$ on the number line (a genuine generalization of $|x|=|x-0|$, distance from zero being the special case $b=0$).
- LO3 (orientation level — full generalization deferred to the cross-linked child): recognize $|a-b|$ as the SIMPLEST instance of a general "distance function" (a metric), directly previewing `math.real.metric-space`'s own generalization of distance to far more abstract spaces (like spaces of functions).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.negative-numbers` (negation as a genuine arithmetic operation, not sign removal) and `math.arith.number-line` (representing real numbers as points on a line, with distance corresponding to separation between points).

## Component 3 — Core Explanation

**The piecewise definition is real arithmetic negation, not sign-removal**: $|x|=x$ if $x\ge0$; $|x|=-x$ if $x<0$. For a NEGATIVE number like $x=-5$, $|x|=-(-5)=5$ — this is the genuine arithmetic operation of NEGATING $-5$, which happens to flip its sign, not a cosmetic "delete the minus character." This distinction matters critically once $x$ is a variable EXPRESSION rather than a signed numeral: for an expression like $x-3$ (whose sign depends on the value of $x$), there is no "minus sign to remove" from the expression itself — the correct approach is always to apply the actual negation, $-(x-3)$, when the expression is negative.

**$|x|$ is always nonnegative, and generalizes to distance between any two points**: since $|x|$ measures DISTANCE from zero, it can never be negative — distance is never negative, for any real number $x$, with no exceptions (even $|0|=0$, the boundary case). More generally, the distance between two points $a$ and $b$ on the number line is $|a-b|$ (equivalently $|b-a|$, same value) — and $|x|$ itself is simply the special case $b=0$: $|x|=|x-0|$.

**Toward a general notion of distance (orientation level)**: $|a-b|$ is the simplest possible instance of what mathematicians call a "distance function" or metric — a rule assigning a nonnegative number to any pair of objects, measuring how "far apart" they are. `math.real.metric-space` generalizes this exact idea far beyond points on a line, to entire FUNCTIONS and other abstract objects, using the same absolute-value machinery as a building block.

## Component 4 — Worked Examples

**Example 1 (LO1 — piecewise definition applied to numbers and to a variable expression, breaking MC-1)**: $|5|=5$ ($5\ge0$, apply directly). $|-5|=-(-5)=5$ ($-5<0$, apply the genuine NEGATION operation to $-5$, yielding $5$). Now for a variable expression: evaluate $|x-3|$ at $x=1$. Since $x-3=1-3=-2$ (negative), the piecewise rule requires $|x-3|=-(x-3)=-(1-3)=2$ — matching $|-2|=2$ directly. This confirms that for $x<3$, $|x-3|=-(x-3)=3-x$ is the correct algebraic form, obtained by applying the actual negation operation to the WHOLE expression $(x-3)$ — there is no "sign character" to cosmetically remove from an algebraic expression; the negation must be genuinely computed.

**Example 2 (LO2 — always nonnegative, and distance between two points, breaking MC-2)**: $|x|$ can never be negative — even $|0|=0$ (the boundary case, distance zero from itself). The distance between two points $a=3$ and $b=-2$ on the number line is $|a-b|=|3-(-2)|=|5|=5$ — matching the number line directly ($5$ units apart). Checking the other order: $|b-a|=|-2-3|=|-5|=5$ — the SAME answer either way, confirming $|a-b|=|b-a|$ and that this generalizes $|x|=|x-0|$ (distance from zero is simply the special case $b=0$).

**Example 3 (LO3, orientation level — metric-space preview)**: $|a-b|$ is the simplest instance of a general "distance function." `math.real.metric-space`'s own sup-norm example, $d_{\sup}(f,g)=\max_{x}|f(x)-g(x)|$, generalizes this EXACT idea — measuring "how far apart" two objects are — from single numbers on a line to entire FUNCTIONS, using the SAME absolute-value machinery pointwise (computing $|f(x)-g(x)|$ at every $x$) before taking a maximum over all $x$ — a direct, concrete preview of that much more abstract generalization.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Negative Case Requires Genuine Negation, Not Sign-Removal (Primitive P11: Representation Shift)

State: "for a negative expression, $|x|=-x$ means actually NEGATE the expression — it's a real arithmetic operation, not deleting a minus-sign character, and that distinction matters as soon as $x$ is a variable expression rather than a bare number." Work Example 1's full numeric AND algebraic-expression computation.

- **MC-1 hook**: ask "to evaluate $|x-3|$ for some value of $x$ where $x-3$ is negative, can you just 'remove the negative sign' from the expression $x-3$?" — a "yes" answer reveals MC-1 (treating negation as cosmetic sign-removal rather than a genuine arithmetic operation applied to the whole expression).

### Teaching Action A02 — Absolute Value Is Always Nonnegative, No Exceptions (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: no matter which sign the input has, $|x|$ comes out nonnegative every time, because it measures distance, which is never negative. State: "there is no input, however negative, that makes $|x|$ come out negative — that would contradict what distance itself means."

- **MC-2 hook**: ask "could $|x|$ ever come out negative, for some particular value of $x$?" — a "yes" answer reveals MC-2 (missing that $|x|\ge0$ always, with no exceptions, since it measures distance).

### Teaching Action A03 — Distance From Zero Is Just the Special Case of Distance Between Two Points (Primitive P06: Contrast Pair)

Contrast treating "$|x|$, distance from zero" and "$|a-b|$, distance between two points" as two separate ideas against Example 2's direct demonstration that $|x|=|x-0|$ — the first is simply the special case $b=0$ of the second. State: "these aren't two different concepts — distance from zero is just distance between two points, where one of the points happens to be zero."

- **MC-3 hook**: ask "do 'distance from zero' and 'distance between two arbitrary points' require fundamentally different formulas?" — a "yes" answer reveals MC-3 (missing that $|x|$ is simply $|a-b|$ with $b=0$, the same underlying idea).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $|8|$ and $|-8|$ directly using the piecewise definition.
  2. Evaluate $|x-5|$ at $x=2$ by first determining whether $x-5$ is positive or negative, then applying the correct piece of the definition.
  3. Compute the distance between the points $-7$ and $4$ on the number line using $|a-b|$, and verify you get the same answer computing $|b-a|$.
  4. Explain why $|x|$ can never be negative for any real number $x$, referencing what absolute value represents geometrically.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.real.metric-space`)**: "A physicist needs to measure how 'far apart' two temperature readings are, and separately, how 'far apart' two entire temperature-vs-time GRAPHS are (comparing a predicted curve to an actual measured curve). (a) For two single temperature readings, $72°F$ and $65°F$, compute the distance between them using $|a-b|$. (b) Explain, using this lesson's distance-from-zero-is-a-special-case idea, why $|a-b|$ is really 'distance between two points,' not a fundamentally separate concept from $|x|$ itself. (c) `math.real.metric-space` generalizes this exact idea to compare entire FUNCTIONS (like two temperature-vs-time curves) using $d_{\sup}(f,g)=\max|f(x)-g(x)|$ — explain, in your own words, how this formula reuses the absolute-value machinery from part (a), just applied pointwise across the whole curve before taking a maximum."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ABSOLUTE-VALUE-AS-SIGN-REMOVAL | Believing the negative case of absolute value means cosmetically "removing the minus sign" rather than applying the genuine arithmetic negation operation, an error that becomes consequential once the input is a variable expression | Foundational |
| MC-2 | ABSOLUTE-VALUE-ASSUMED-SOMETIMES-NEGATIVE | Believing $|x|$ could come out negative for some input, missing that it is always nonnegative, with no exceptions, since it measures distance | High |
| MC-3 | DISTANCE-FROM-ZERO-TREATED-AS-SEPARATE-FROM-DISTANCE-BETWEEN-POINTS | Treating "distance from zero" and "distance between two points" as requiring fundamentally different formulas, missing that $|x|=|x-0|$ is simply the special case $b=0$ of $|a-b|$ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Absolute Value as Sign Removal") → P41 (detect: ask whether $|x-3|$ can be found by "removing the negative sign" from the expression $x-3$) → P64 (conceptual shift: re-walk Example 1's algebraic-expression computation, re-anchoring on "the negative case requires genuine negation of the whole expression, not sign removal").
- **B02 (targets MC-2)**: P27 (name it: "Absolute Value Assumed Sometimes Negative") → P41 (detect: ask whether $|x|$ could ever come out negative) → P64 (conceptual shift: re-walk Example 2's direct confirmation, re-anchoring on "distance is never negative — no exceptions").
- **B03 (targets MC-3)**: P27 (name it: "Distance From Zero Treated as Separate") → P41 (detect: ask whether distance-from-zero and distance-between-two-points need different formulas) → P64 (conceptual shift: re-walk Example 2's $|x|=|x-0|$ identification, re-anchoring on "distance from zero is just the special case $b=0$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.negative-numbers` (negation as a genuine arithmetic operation, this concept's piecewise definition directly reuses) and `math.arith.number-line` (points and distance on the line, the geometric interpretation this concept's whole definition rests on).
- **Unlocks**: `math.alg.absolute-value-equations` (will apply the piecewise definition to solve equations involving $|x|$; not yet authored).
- **Cross-link**: KG lists `math.alg.absolute-value-equations` (checked via `ls`, confirmed NOT YET authored) and `math.real.metric-space` (checked via `ls`, confirmed AUTHORED). $P76_{mode}=$ **cross-link probe**, engaging `math.real.metric-space` directly (that concept's own sup-norm example is cited and connected to this concept's distance formula in Example 3 and the P76 transfer probe).

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the piecewise definition applied to both numbers and variable expressions, and the always-nonnegative/distance-between-points facts) and LO3 built as a cross-link probe against the single authored cross-subject target, consistent with this corpus's established single-cross-link-probe pattern.
- **Division of labor**: `math.arith.negative-numbers` owns negation as a general arithmetic operation; `math.arith.number-line` owns the geometric point/distance interpretation. This concept owns the SPECIFIC absolute-value definition unifying both, deliberately including a variable-expression example (Example 1's $|x-3|$) rather than stopping at bare-numeral examples, since the sign-removal misconception (MC-1) only becomes consequential once the input is an expression whose sign isn't visually obvious.
- Example 3's connection to `math.real.metric-space` was chosen deliberately to give this early, developing-level concept a genuine forward-looking payoff — showing that the humble $|a-b|$ formula is the literal seed of a much later, much more abstract idea (metrics on function spaces), reinforcing that foundational arithmetic content has real mathematical staying power.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.alg.absolute-value-equations` unauthored, `math.real.metric-space` authored → cross-link probe engaging the authored target) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: points marked on a number line, before the formal piecewise definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
