# Teaching Blueprint: Integer Arithmetic (`math.arith.integer-arithmetic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.integer-arithmetic` |
| name | Integer Arithmetic |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.arith.negative-numbers`, `math.arith.multiplication` |
| unlocks | `math.nt.divisibility`, `math.arith.fractions` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — this concept consolidates already-concrete-grounded sign rules into fluent symbolic procedure, so entry is at the abstract/procedural stage rather than re-deriving from models |
| description (KG) | The four arithmetic operations applied to the set of integers, including the sign rules for multiplication and division of signed numbers. |

## Component 1 — Learning Objectives

- LO1: Fluently compute all four operations (+, −, ×, ÷) on signed integers, correctly applying the sign rules for multiplication/division (same signs → positive, different signs → negative) and the addition/subtraction rules from `math.arith.negative-numbers`.
- LO2: Evaluate multi-operation integer expressions correctly applying order of operations together with sign rules (e.g. distinguishing $-3^2$ from $(-3)^2$, and evaluating chained sign changes in a single expression).
- LO3: Determine, without full computation, the sign of a product or quotient of several signed integers by counting negative factors (even count → positive, odd count → negative).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.negative-numbers` (sign rules for addition/subtraction, double-negative, negative×negative=positive) and `math.arith.multiplication` (multiplication as repeated addition, fluency with basic products). This concept is the *consolidation* and *fluency* layer: it does not introduce new sign-rule reasoning so much as demand fast, reliable, integrated four-operation computation.

## Component 3 — Core Explanation

**Integer arithmetic** extends the four basic operations to all integers (…,−3,−2,−1,0,1,2,3,…), governed by sign rules:

- **Addition/subtraction**: use the number-line and double-negative rules from `math.arith.negative-numbers` — e.g. $a - (-b) = a+b$.
- **Multiplication and division sign rule**: 
$$(+)\times(+) = (+), \quad (-)\times(-) = (+), \quad (+)\times(-) = (-), \quad (-)\times(+) = (-)$$
The same rule governs division: $\frac{(-12)}{(-4)} = 3$ (same signs → positive), $\frac{12}{-4} = -3$ (different signs → negative). Division by 0 remains undefined regardless of sign.

**Counting negative factors (sign shortcut)**: for a product of several signed numbers, the overall sign depends only on how many negative factors are present — an **even** number of negative factors gives a positive result; an **odd** number gives a negative result. Example: $(-2)\times(-3)\times(-1)\times 5$ has three negative factors (odd) → result is negative: $-30$.

**Order of operations with signs**: exponentiation binds tighter than a leading unary minus unless parentheses say otherwise: $-3^2 = -(3^2) = -9$, but $(-3)^2 = (-3)\times(-3) = 9$. This is a common point of error precisely because the *sign* rules (same-sign-positive) can mislead students into computing $-3^2$ as if the minus were "inside" the square.

## Component 4 — Worked Examples

**Example 1 (LO1 — four operations)**: Compute $(-8) + 5$, $(-8) - (-5)$, $(-8)\times 5$, $(-8)\div(-4)$.
- $(-8)+5 = -3$ (move 8 left, then 5 right, net −3).
- $(-8)-(-5) = -8+5 = -3$.
- $(-8)\times 5 = -40$ (different signs → negative).
- $(-8)\div(-4) = 2$ (same signs → positive).

**Example 2 (LO2 — order of operations + signs)**: Evaluate $-2^2 + (-3)\times(-4) - (-1)$.
$-2^2 = -(2^2) = -4$ (exponent binds before the unary minus). $(-3)\times(-4)=12$. $-(-1) = +1$.
Total: $-4 + 12 + 1 = 9$.

**Example 3 (LO3 — sign shortcut)**: Without fully computing, find the sign of $(-2)\times 3\times(-5)\times(-1)\times 4$.
Count negative factors: $-2, -5, -1$ → three negatives (odd) → the product is **negative**. (Full value: $2\times3\times5\times1\times4 = 120$, so the product is $-120$.)

## Component 5 — Teaching Actions

### Teaching Action A01 — Multiplication/Division Sign Rule Fluency (Primitive P11: Representation Shift)

Start from the already-taught negative-numbers pattern-extension argument (briefly restate: $(-1)\times(-2)=2$, extending the pattern of decreasing products). Shift representation to a compact sign-rule table:

| × or ÷ | + | − |
|---|---|---|
| **+** | + | − |
| **−** | − | + |

Drill fluency: rapid-fire a sequence of signed products/quotients ($(-6)\times(-3)$, $15 \div(-5)$, $(-20)\div(-4)$, $(-7)\times 2$), having students state the sign *first*, then the magnitude — separating the two judgments builds the speed this h=8 fluency concept targets.

- **MC-1 hook**: ask students to evaluate $-3^2$ immediately after heavy sign-rule drilling — a wrong answer of 9 (instead of −9) reveals MC-1 (over-applying "same-sign-positive" reasoning to override order-of-operations, treating $-3^2$ as if it were $(-3)^2$).

### Teaching Action A02 — Order of Operations with Signs, and the Negative-Factor-Counting Shortcut (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place $-3^2$ and $(-3)^2$ side by side. Compute each explicitly: $-3^2 = -(3\times3) = -9$ (the minus applies to the *result* of squaring 3); $(-3)^2 = (-3)\times(-3) = 9$ (the minus is *part of the base* being squared, because of the parentheses). State the rule explicitly: "no parentheses around a negative base means the exponent applies first, and the minus sign is applied last."

**Contrast 2 (targets MC-2, sign-counting misapplication)**: Present $(-2)\times(-3)\times(-4)$ (three negatives) next to $(-2)\times(-3)\times(-4)\times(-1)$ (four negatives). Ask for the sign of each *before* computing magnitudes. Students who answer both "positive" (from a rule like "two negatives cancel, so remaining pairs are always positive" applied carelessly) reveal MC-2 — correct the reasoning to explicit counting: 3 negatives → odd → negative ($-24$); 4 negatives → even → positive ($+24$).

### Teaching Action A03 — Composite Multi-Step Expression (Primitive P28: Conflict Evidence)

Present a composite expression forcing sign-rule counting, order of operations, and basic sign-rule fluency together: $\left[(-2)^3 \times (-1) \right] + \left[(-15) \div (-3) \right] - \left[-4^2\right]$.
Walk through: $(-2)^3 = -8$ (odd exponent preserves sign) → $(-8)\times(-1)=8$. $(-15)\div(-3)=5$. $-4^2 = -16$, so $-(-16)=16$.
Total: $8+5+16=29$. This item forces students to correctly separate "the exponent applies to the base as written" (odd power of a negative base stays negative, unlike the earlier even-power example) from the sign-counting shortcut and from order-of-operations sequencing — breaking any single-rule overgeneralization that survived A01/A02.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $(-14) + (-9) - (-20)$.
  2. Compute $(-6)\times(-3)\times 2$.
  3. Evaluate $-5^2 + (-2)\times(-3)$.
  4. Without full computation, state the sign of $(-1)\times(-1)\times(-1)\times(-1)\times(-1)\times 6$.
- **P76 (Transfer Probe, mode = independence)**: "A chemistry log records temperature *changes* per hour as signed integers: −3, −3, −3, −3 (four consecutive hours of the same drop). If the starting temperature was 10°C, use integer multiplication to find the total change over the four hours, then the final temperature. Separately: an error-tracking system multiplies together five signed correction factors, three of which are negative — is the overall correction positive or negative, and why can you tell before multiplying it out?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NEGATIVE-BASE-EXPONENT-ORDER-ERROR | Evaluating $-a^2$ as $(-a)^2$ (applying the minus to the base before exponentiation, instead of after) | Foundational |
| MC-2 | SIGN-COUNTING-OVERGENERALIZED-CANCELLATION | Misapplying "negatives cancel in pairs" reasoning (e.g. assuming any count of negative factors beyond 2 is automatically positive) instead of correctly counting odd/even | Moderate |
| MC-3 | ZERO-DIVISION-SIGN-CONFUSION | Believing division by 0 has some determinable sign (e.g. "negative divided by 0 is negative infinity, so it's still negative") instead of recognizing it as undefined | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Base/Exponent Order Error") → P41 (detect: ask for $-2^4$ — an incorrect answer of 16, rather than −16, reveals MC-1) → P64 (conceptual shift: re-anchor on "no parentheses = the minus is a separate operation applied last, after the power").
- **B02 (targets MC-2)**: P27 (name it: "Overgeneralized Pair-Cancellation") → P41 (detect: ask for the sign of a product of exactly 5 negative factors — an incorrect "positive" answer reveals MC-2) → P64 (conceptual shift: re-derive via explicit tally — each negative factor flips the sign once, so count flips, don't assume pairing).
- **B03 (targets MC-3)**: P27 (name it: "Division-by-Zero Sign Belief") → P41 (detect: ask what sign $\frac{-7}{0}$ has) → P64 (conceptual shift: division by 0 is undefined — no quotient, hence no sign, exists at all; this is a categorical fact, not a sign-rule case).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.negative-numbers` (addition/subtraction sign rules, double-negative), `math.arith.multiplication` (repeated-addition grounding, basic product fluency).
- **Unlocks**: `math.nt.divisibility` (divisibility of integers builds directly on integer division/multiplication fluency here), `math.arith.fractions` (fraction arithmetic requires fluent signed-integer numerator/denominator operations).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a developing/apply tag places this at the "3 main TAs + gate, denser" end of the sizing heuristic — A01 (multiplication/division sign rule), A02 (order-of-operations contrast + sign-counting shortcut), and A03 (a genuinely composite P28 item forcing all rules together) reflect that this concept's purpose is consolidation/fluency across already-taught pieces rather than introducing one single new idea, which is why three main TAs were used despite no single LO being conceptually large on its own.
- CPA_entry_stage is marked Abstract (A) rather than Concrete, a deliberate departure from most other blueprints in this corpus — justified because both prerequisites (`math.arith.negative-numbers`, `math.arith.multiplication`) already did the concrete/pictorial grounding for sign reasoning and repeated-addition; re-doing concrete models here would be redundant repetition rather than new teaching, so this concept opens directly at the symbolic/procedural level and builds *fluency*, not new intuition.
- MC-3 (division-by-zero sign confusion) was included as a minor-severity registry entry even though it's tangential to the KG's core description, because integer division is explicitly named in the KG description and any dedicated integer-division teaching action risks students generalizing sign rules into division-by-zero territory without an explicit categorical correction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, justified in Teaching Notes) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
