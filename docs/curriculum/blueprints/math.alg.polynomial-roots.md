# Teaching Blueprint: Polynomial Roots (Real and Complex) (`math.alg.polynomial-roots`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.polynomial-roots` |
| name | Polynomial Roots (Real and Complex) |
| domain | Algebra |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.alg.factor-theorem`, `math.alg.quadratic-equation` |
| unlocks | `math.alg.fundamental-theorem-algebra` |
| cross_links | `math.cx.complex-numbers-analysis` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — this concept synthesizes already-concretely-grounded factoring/quadratic-formula/complex-number skills into the general root-counting theorem, so entry is at the abstract/synthesis stage |
| description (KG) | Values x = a where p(a) = 0; a degree-n polynomial has exactly n roots (counting multiplicity) in ℂ by the Fundamental Theorem of Algebra. |

## Component 1 — Learning Objectives

- LO1: Define a **root** of a polynomial $p(x)$ as a value $x=a$ with $p(a)=0$, and connect this to the Factor Theorem: $a$ is a root iff $(x-a)$ is a factor of $p(x)$.
- LO2: State that a degree-$n$ polynomial has **exactly $n$ roots counting multiplicity** over $\mathbb{C}$ (the informal statement of the Fundamental Theorem of Algebra), and correctly account for **multiplicity** — a repeated factor $(x-a)^k$ contributes $k$ roots at the same value $a$, not just one.
- LO3: Apply the **Conjugate Root Theorem** — for a polynomial with *real* coefficients, complex (non-real) roots always occur in conjugate pairs $a+bi$ and $a-bi$ — to find a missing root or to determine the full root set from a partial one.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.factor-theorem` ($(x-a)$ is a factor of $p(x)$ iff $p(a)=0$) and `math.alg.quadratic-equation` (solving $ax^2+bx+c=0$, including via the quadratic formula, which can produce genuinely complex roots when the discriminant is negative).

## Component 3 — Core Explanation

A **root** (or zero) of a polynomial $p(x)$ is a value $x=a$ satisfying $p(a)=0$. By the Factor Theorem (already known), this is equivalent to $(x-a)$ being a factor of $p(x)$.

**The Fundamental Theorem of Algebra** (stated informally here; the rigorous proof belongs to complex analysis) says: a degree-$n$ polynomial has **exactly $n$ roots, counting multiplicity**, over the complex numbers $\mathbb{C}$. This means $p(x)$ factors completely as
$$p(x) = a_n(x-r_1)(x-r_2)\cdots(x-r_n)$$
where the $r_i$ are the (not necessarily distinct) roots.

**Multiplicity**: if a factor $(x-a)$ appears $k$ times in this factorization, $a$ is called a root of **multiplicity $k$**. It counts as $k$ roots toward the total of $n$, even though it's a single value repeated. E.g., $p(x)=(x-2)^3(x+1)$ is degree 4, with root $x=2$ of multiplicity 3 and root $x=-1$ of multiplicity 1 — total root count (with multiplicity) $=3+1=4$, matching the degree.

**The Conjugate Root Theorem**: if $p(x)$ has **real** coefficients and $a+bi$ (with $b\neq 0$) is a root, then its complex conjugate $a-bi$ is *also* a root. This is why non-real roots of a real-coefficient polynomial always come in pairs — a real-coefficient polynomial can never have "just one" non-real root. (This theorem requires real coefficients — a polynomial with genuinely complex coefficients need not have this pairing.)

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — roots, multiplicity, and degree count)**: $p(x)=(x-3)^2(x+2)$. Roots: $x=3$ (multiplicity 2), $x=-1$... wait — $x=-2$ (multiplicity 1). Degree $=2+1=3$. Total roots counting multiplicity $=2+1=3$. ✓ matches degree.

**Example 2 (LO3 — conjugate root theorem, real coefficients)**: A real-coefficient cubic $p(x)$ has known root $x=2$ and known root $x=1+2i$. By the Conjugate Root Theorem, $x=1-2i$ must **also** be a root (since $p$ has real coefficients). Since $p$ is degree 3 and we now have all 3 roots ($2, 1+2i, 1-2i$), $p(x) = a(x-2)(x-(1+2i))(x-(1-2i))$ for some leading coefficient $a$.

**Example 3 (LO2/LO3 — complex-coefficient counterexample, breaking MC-3)**: $q(x) = x - i$ (degree 1, genuinely complex coefficient $-i$). Its only root is $x=i$. Its conjugate, $-i$, is **not** a root ($q(-i) = -i-i=-2i\neq 0$). This is *not* a violation of the Conjugate Root Theorem — that theorem's hypothesis (real coefficients) simply doesn't hold here, so no pairing is guaranteed.

## Component 5 — Teaching Actions

### Teaching Action A01 — Roots, Multiplicity, and the Root-Count Theorem (Primitive P11: Representation Shift)

Start from the already-known Factor Theorem: "$(x-a)$ is a factor iff $p(a)=0$." Shift representation: "if $p(x)$ factors *completely* into $n$ linear factors (over $\mathbb{C}$), each factor gives one root — so a degree-$n$ polynomial has exactly $n$ roots, some of which might repeat." Work Example 1 together: factor $(x-3)^2(x+2)$, count $x=3$ **twice** (multiplicity 2) plus $x=-2$ once, total 3 = the degree.

Contrast against just listing *distinct* roots: "$(x-3)^2(x+2)$ has only **2 distinct** root *values* (3 and −2), but **3 roots counting multiplicity** — these are different counts, and the Fundamental Theorem of Algebra promises the multiplicity-counted total matches the degree, not the distinct-value count."

- **MC-1 hook**: ask "how many roots does $(x-1)^4$ (a degree-4 polynomial) have?" — an answer of "1" (rather than 4, counting multiplicity) reveals MC-1 (counting only distinct root values instead of multiplicity-weighted roots).

### Teaching Action A02 — The Conjugate Root Theorem, With and Without Real Coefficients (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-2)**: Work Example 2 (real-coefficient cubic, known roots 2 and $1+2i$, deduce $1-2i$ must also be a root). State the theorem precisely: "for REAL-coefficient polynomials, a non-real root's conjugate is automatically also a root — you get complex roots in matched pairs, never alone."

**Contrast 2 (targets MC-3)**: Work Example 3 ($q(x)=x-i$, a genuinely complex-coefficient polynomial) immediately beside Example 2. Ask: "does $-i$ have to be a root of $q(x)=x-i$, by the same reasoning as before?" — a "yes" answer reveals MC-3 (applying the Conjugate Root Theorem's conclusion without checking its real-coefficients hypothesis). State clearly: "the theorem's guarantee only kicks in when *every* coefficient of the polynomial is real — check that first, always."

### Teaching Action A03 — Composite Application (Primitive P28: Conflict Evidence)

Present: "A real-coefficient degree-5 polynomial has known roots $3$ (multiplicity 2), $-1$, and $2+i$. Using the Fundamental Theorem of Algebra (exact root count = degree) and the Conjugate Root Theorem, determine the complete root list, including multiplicities." Walk through: known roots so far, counting multiplicity: $3,3,-1,2+i$ — that's 4 roots counted so far ($3$ twice, $-1$ once, $2+i$ once). By the Conjugate Root Theorem (real coefficients), $2-i$ must also be a root — bringing the count to 5, matching the degree exactly, with no further undetermined roots remaining. This forces the learner to combine the counting theorem (as a *stopping condition* — "have I found them all yet?") with the conjugate-pairing theorem (as a *generating tool* — "what root does this one force to also exist?") in a single reasoning chain.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $p(x)=(x+4)^3(x-5)$. List all roots with multiplicities, and verify the total matches the degree.
  2. A real-coefficient degree-4 polynomial has known roots $1$ and $3-i$. Find all remaining roots.
  3. Explain why $r(x) = x^2+1$ having roots $i$ and $-i$ is consistent with (in fact required by) the Conjugate Root Theorem, given its coefficients are real.
  4. $s(x) = (x-2i)(x-1)$ has a root at $2i$. Does the Conjugate Root Theorem force $-2i$ to also be a root of $s(x)$? Justify using $s(x)$'s coefficients.
- **P76 (Transfer Probe, mode = cross-link probe against `math.cx.complex-numbers-analysis`)**: "Recall from your complex-numbers-analysis lesson that for $z=x+iy$, the conjugate is $z̄=x-iy$ and $|z|^2 = z\bar z$. A real-coefficient quadratic $p(x)=x^2-6x+13$ has roots that are a conjugate pair (by the Conjugate Root Theorem, since its discriminant is negative). Use the quadratic formula to find both roots explicitly in $a+bi$ form, confirm they are indeed conjugates $z$ and $\bar z$ in exactly the sense from that lesson, then compute $|z|$ two ways: (a) directly via $\sqrt{x^2+y^2}$ from the root's real/imaginary parts, and (b) via $\sqrt{z\bar z}$ using both roots together. Confirm both methods agree."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DISTINCT-ROOTS-NOT-MULTIPLICITY | Counting only distinct root values rather than roots weighted by multiplicity, leading to a root count that doesn't match the polynomial's degree | Foundational |
| MC-2 | CONJUGATE-PAIRING-NOT-APPLIED | Failing to recognize that a real-coefficient polynomial's non-real roots must occur in conjugate pairs, missing a root that the theorem would otherwise supply for free | Moderate |
| MC-3 | CONJUGATE-THEOREM-APPLIED-WITHOUT-REAL-COEFFICIENTS-CHECK | Applying the Conjugate Root Theorem's conclusion to a polynomial without first verifying its coefficients are all real | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Distinct-Value Undercounting") → P41 (detect: ask for the root count of $(x+5)^3$, a degree-3 polynomial — an answer of "1" reveals MC-1) → P64 (conceptual shift: re-anchor on the factored form — three identical linear factors still means three roots, by the same logic that three identical items in a list is a count of three, not one).
- **B02 (targets MC-2)**: P27 (name it: "Missed Conjugate Pair") → P41 (detect: give a real-coefficient polynomial with a known non-real root and ask for the FULL root list, checking whether the conjugate is included) → P64 (conceptual shift: re-derive from the theorem statement — non-real roots of a real-coefficient polynomial are never "solo," they arrive in matched pairs).
- **B03 (targets MC-3)**: P27 (name it: "Real-Coefficients Hypothesis Skipped") → P41 (detect: give a genuinely complex-coefficient polynomial like Example 3's $q(x)=x-i$ and ask if the conjugate of its known root must also be a root) → P64 (conceptual shift: re-anchor on "check the hypothesis first — real coefficients only; a complex-coefficient polynomial gives no such guarantee").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.factor-theorem` (the root/factor equivalence this whole concept is built on), `math.alg.quadratic-equation` (the quadratic formula, the first place students meet genuinely complex roots via a negative discriminant).
- **Unlocks**: `math.alg.fundamental-theorem-algebra` (the rigorous statement and proof-sketch of the root-counting theorem informally used throughout this concept).
- **Cross-link**: KG lists `math.cx.complex-numbers-analysis` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.cx.complex-numbers-analysis.md` **is already authored** (confirmed by reading its content: it covers modulus $|z|=\sqrt{x^2+y^2}$, argument, polar form, and conjugation $\bar z = x-iy$ with $|z|^2=z\bar z$). The P76 transfer probe above directly reuses that concept's conjugation and modulus machinery, applying it to a conjugate root pair produced by this concept's own Conjugate Root Theorem — genuinely connecting the two concepts rather than restating either in isolation.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/analyze tag places this at the "3 main TAs + gate" tier — A01 (root-count/multiplicity), A02 (conjugate-pairing contrast), and A03 (a genuinely composite item forcing both theorems together as a single reasoning chain) reflect the concept's real difficulty: not computing any single root, but correctly reasoning about *how many* roots must exist and what additional roots a given one *forces*.
- A03's composite problem was deliberately designed so the two theorems must be combined in a specific ORDER — using the conjugate theorem to *generate* a missing root, then using the counting theorem to *confirm* no further roots remain undetermined — since presenting them as two independently-testable facts (without ever requiring their combination) would under-assess the analyze-level Bloom target this concept carries.
- The cross-link probe (P76) was written only after reading `math.cx.complex-numbers-analysis.md`'s actual content (confirmed via grep of its Components 3-4) to ensure the modulus/conjugation notation genuinely matches what that blueprint already taught, rather than inventing new notation under the same names.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.complex-numbers-analysis` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuinely references target content) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: synthesis of already-grounded skills) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
