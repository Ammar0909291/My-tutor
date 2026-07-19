# Teaching Blueprint: Euclidean Algorithm (`math.nt.euclidean-algorithm`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.euclidean-algorithm` |
| name | Euclidean Algorithm |
| domain | Number Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.nt.gcd`, `math.arith.remainder` |
| unlocks | `math.nt.extended-euclidean-algorithm`, `math.nt.bezout-identity` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a physical measuring-stick analogy before the algorithmic procedure |
| description (KG) | An efficient algorithm computing GCD(a, b) by repeatedly replacing (a, b) with (b, a mod b) until the remainder is zero. |

## Component 1 — Learning Objectives

- LO1: State the **Euclidean Algorithm** procedure: repeatedly replace the pair $(a,b)$ with $(b, a\bmod b)$ until the remainder reaches 0 — the LAST nonzero remainder is $\gcd(a,b)$ — and execute the algorithm by hand for two given integers.
- LO2: Explain WHY the algorithm works — the key fact that $\gcd(a,b)=\gcd(b, a\bmod b)$ — by connecting it to the definition of remainder ($a=bq+r$) and showing any common divisor of $a,b$ must also divide $r$, and vice versa.
- LO3: Recognize the Euclidean Algorithm as dramatically more EFFICIENT than the "list all divisors and compare" method for large numbers, and correctly track WHEN to stop (remainder exactly 0, not merely "small").

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.gcd` (the greatest common divisor as the largest integer dividing both $a$ and $b$) and `math.arith.remainder` (the remainder $r$ in $a=bq+r$, $0\leq r<b$).

## Component 3 — Core Explanation

The **Euclidean Algorithm** computes $\gcd(a,b)$ by repeated replacement: starting with $(a,b)$ (assume $a>b>0$), replace the pair with $(b, a\bmod b)$, and repeat — each step replaces the pair with (the smaller number, the remainder of dividing the larger by the smaller) — until the remainder becomes exactly **0**. At that point, the OTHER number in the final pair is $\gcd(a,b)$.

**Why this works — the key identity**: $\gcd(a,b) = \gcd(b, a\bmod b)$. Proof sketch: write $a=bq+r$ (so $r=a\bmod b$). Any common divisor $d$ of $a$ and $b$ must also divide $r=a-bq$ (since $d|a$ and $d|bq$, their difference is divisible by $d$ too) — so $d$ is also a common divisor of $b$ and $r$. Conversely, any common divisor of $b$ and $r$ divides $a=bq+r$ too (since it divides both $bq$ and $r$) — so it's also a common divisor of $a$ and $b$. Since $a,b$ and $b,r$ have EXACTLY the same set of common divisors, they share the same greatest one: $\gcd(a,b)=\gcd(b,r)$.

**Why "efficient"**: listing every divisor of two large numbers and comparing is slow (proportional to the SIZE of the numbers); the Euclidean Algorithm's number of steps grows only logarithmically (roughly proportional to the NUMBER OF DIGITS), making it dramatically faster for large integers — a genuinely important practical algorithm, not just a clever trick.

**Stopping condition — exactly zero, not merely small**: the algorithm terminates precisely when the remainder becomes exactly 0 (meaning the previous divisor evenly divides the previous dividend) — a remainder that's merely SMALL (but nonzero) means the process must continue.

## Component 4 — Worked Examples

**Example 1 (LO1 — executing the algorithm)**: Find $\gcd(252,105)$. $252=105(2)+42$ → $(105,42)$. $105=42(2)+21$ → $(42,21)$. $42=21(2)+0$ → remainder 0, stop. $\gcd(252,105)=21$ (the last nonzero remainder/divisor).

**Example 2 (LO2 — verifying the key identity concretely)**: For $a=252,b=105$: common divisors of 252 and 105 are $\{1,3,7,21\}$ (largest 21). Common divisors of $b=105$ and $r=42$ (the first remainder): also $\{1,3,7,21\}$ — EXACTLY the same set, confirming $\gcd(252,105)=\gcd(105,42)=21$, as the algorithm's underlying identity guarantees.

**Example 3 (LO3 — stopping condition, breaking MC-1)**: Find $\gcd(48,18)$. $48=18(2)+12$ → $(18,12)$. $18=12(1)+6$ → $(12,6)$. $12=6(2)+0$ → remainder 0, STOP. $\gcd(48,18)=6$. A student who stops early at $(12,6)$ because "6 looks small enough" without actually completing the division to confirm the remainder is EXACTLY 0 would risk error — here it happens to work out, but the stopping rule is precisely "remainder = 0," never "remainder looks small," and skipping the final verification step is an unsafe habit even when it happens not to cause an error this time.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Algorithm Procedure, via Repeated Replacement (Primitive P11: Representation Shift)

Start concrete: describe measuring two lengths (a long stick and a short stick) by repeatedly laying the shorter against the longer, marking off the leftover — this repeated "measure and find the leftover" process is exactly the ancient geometric origin of the algorithm's name. State: "keep replacing the pair with (smaller number, remainder) — when the remainder finally hits zero, the OTHER number in that last pair is the GCD."

Shift to the symbolic procedure, working Example 1's full step-by-step execution explicitly, labeling each division clearly ($a=bq+r$ form) at every step.

- **MC-1 hook**: work Example 3 up through $(12,6)$ and ask "can we stop here, since 6 seems like a reasonably small number?" — a "yes, that's clearly the GCD" answer (without actually performing the final division to confirm the remainder is exactly 0) reveals MC-1 (stopping based on the remainder "looking small" rather than verifying it is EXACTLY zero).

### Teaching Action A02 — Why the Algorithm Works, and Efficiency (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's explicit common-divisor-set comparison for $(252,105)$ versus $(105,42)$, showing they're IDENTICAL sets, hence identical GCDs. State the underlying reason precisely: "any common divisor of $a$ and $b$ automatically divides the remainder $r=a-bq$ too, and vice versa — so the two pairs always share exactly the same common divisors, guaranteeing the same GCD, no matter how many times you repeat the process."

**Contrast 2 (targets MC-1)**: Revisit Example 3's stopping-point ambiguity directly — contrast "stopping because a remainder looks small" against "stopping because a specific division yields remainder exactly 0." State the rule unambiguously: "always perform the division and check the remainder explicitly — the algorithm's correctness depends on this exact stopping condition, and skipping the final confirming step is a habit that WILL eventually produce an error on a case where the 'small-looking' remainder isn't actually zero."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Use the Euclidean Algorithm to find $\gcd(1071,462)$, showing every step.
  2. Use the Euclidean Algorithm to find $\gcd(357,234)$, showing every step.
  3. Verify, by listing the common divisors of $(96,36)$ and separately of $(36,24)$ (the pair after one algorithm step), that both pairs give the same GCD.
  4. Explain precisely why "the remainder looks small" is not a valid stopping condition for the Euclidean Algorithm, using the exact wording of the correct stopping rule.
- **P76 (Transfer Probe, mode = independence)**: "A cryptography course explains that computing $\gcd(a,b)$ for two very large numbers (hundreds of digits, as used in RSA encryption) would be computationally infeasible using a 'list all divisors and compare' approach, but is entirely practical using the Euclidean Algorithm. (a) Using this lesson's efficiency discussion, explain qualitatively why the Euclidean Algorithm's number of steps depends on the NUMBER OF DIGITS of the inputs rather than their actual SIZE, making it feasible even for enormous numbers. (b) A student proposes 'speeding up' the algorithm by stopping as soon as the remainder becomes smaller than, say, 10, assuming that's 'close enough' to done — using this lesson's exact stopping condition, explain precisely why this shortcut could produce an incorrect GCD."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STOPPING-CONDITION-BASED-ON-SMALL-REMAINDER | Stopping the algorithm because a remainder "looks small" rather than verifying it is EXACTLY zero via an actual division | Foundational |
| MC-2 | REPLACEMENT-PAIR-ORDER-REVERSED | Incorrectly replacing $(a,b)$ with $(a\bmod b, b)$ (order reversed) instead of the correct $(b, a\bmod b)$, disrupting the algorithm's required "larger, smaller" structure at each step | Moderate |
| MC-3 | GCD-IDENTITY-TREATED-AS-UNEXPLAINED-RULE | Applying $\gcd(a,b)=\gcd(b,a\bmod b)$ as a memorized rule without understanding why common divisors are preserved at each replacement step | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Small-Remainder Stopping Error") → P41 (detect: present a partially-worked algorithm and ask if it's safe to stop at a small-but-unverified remainder) → P64 (conceptual shift: re-anchor on "always perform the actual division and check for remainder EXACTLY 0 — 'small' is not the criterion, zero is").
- **B02 (targets MC-2)**: P27 (name it: "Replacement Pair Order Reversed") → P41 (detect: check whether a student's algorithm execution correctly places the previous divisor first and remainder second at each step) → P64 (conceptual shift: re-derive the correct order from the division statement $a=bq+r$ directly — the next pair is $(b,r)$, divisor then remainder, preserving the "divide the larger by the smaller" structure needed for the next step).
- **B03 (targets MC-3)**: P27 (name it: "GCD Identity as Unexplained Rule") → P41 (detect: ask a student to explain WHY $\gcd(a,b)=\gcd(b,a\bmod b)$, checking for a genuine explanation versus mere restatement) → P64 (conceptual shift: work through Example 2's explicit common-divisor-set comparison, and the general argument that any common divisor of one pair automatically divides the other pair's members too).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.gcd` (the greatest common divisor this algorithm computes), `math.arith.remainder` (the remainder operation, $a\bmod b$, the algorithm's core repeated step).
- **Unlocks**: `math.nt.extended-euclidean-algorithm` (the extended version tracking coefficients alongside this algorithm's basic remainder-replacement steps), `math.nt.bezout-identity` (Bézout's identity is proven using exactly this algorithm's mechanics, run in reverse).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at the "2 main TAs + gate" tier — A01 (the algorithm procedure via the measuring-stick analogy) and A02 (why it works, plus the stopping-condition/efficiency contrast) jointly cover all three LOs.
- MC-1 (stopping condition based on small remainder) was deliberately chosen as this blueprint's central focus because it represents a genuinely dangerous procedural habit — one that frequently produces the CORRECT answer by coincidence (as in Example 3, where stopping early at $(12,6)$ happens to still identify 6 as the eventual GCD) precisely because small numbers often do turn out to be GCDs, masking the error's presence until it eventually fails on a case where it matters; the transfer probe's part (b) makes this failure mode's real consequence explicit.
- The RSA/cryptography transfer probe was chosen because computational efficiency of the Euclidean Algorithm is a genuine, widely-cited practical justification for why this ancient algorithm remains foundational to modern computing infrastructure, giving the KG's own "efficient algorithm" framing concrete, high-stakes grounding.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: measuring-stick analogy before algorithm) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
