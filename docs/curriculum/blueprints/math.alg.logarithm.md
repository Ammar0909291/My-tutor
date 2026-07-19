# Teaching Blueprint: Logarithm (`math.alg.logarithm`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.logarithm` |
| name | Logarithm |
| domain | Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.alg.exponential-function` |
| unlocks | `math.alg.logarithmic-equations` |
| cross_links | `math.calc.derivative-ln` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — "what power gives this?" question before formal notation |
| description (KG) | The inverse of the exponential function: logₐ(x) is the exponent to which a must be raised to give x; defined for x > 0, a > 0, a ≠ 1. |

## Component 1 — Learning Objectives

- LO1: Define $\log_a(x)$ as **the exponent to which $a$ must be raised to give $x$** — i.e., $\log_a(x)=y \iff a^y=x$ — and convert fluently between logarithmic and exponential notation for the same fact.
- LO2: State and apply the logarithm's **domain restriction** ($x>0$) and explain WHY, connecting directly to the already-known fact that $a^y>0$ for every real $y$ (any valid base raised to any real power is always positive) — so there is NO exponent $y$ that could ever produce $a^y=x$ for a non-positive $x$.
- LO3: Correctly evaluate $\log_a(x)$ for values where $x$ is a recognizable power of $a$, and correctly distinguish the logarithm (a function taking an exponent as OUTPUT) from the exponential function (which takes an exponent as INPUT) — recognizing these two functions as inverses, undoing each other.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponential-function` ($a^x$, base restrictions $a>0,a\neq1$, growth/decay).

## Component 3 — Core Explanation

The **logarithm** $\log_a(x)$ is defined as: **the exponent to which $a$ must be raised to produce $x$**. Formally:
$$\log_a(x) = y \iff a^y = x$$
This is precisely the statement that $\log_a$ is the **inverse function** of $f(x)=a^x$ — where the exponential function takes an exponent as INPUT and produces a positive number as output, the logarithm takes a positive number as INPUT and produces the corresponding exponent as output.

**Domain restriction, $x>0$, and why**: since $a^y>0$ for EVERY real exponent $y$ (a direct consequence of the exponential function's own always-positive range, already established), there is simply no exponent $y$ that could ever satisfy $a^y=x$ for $x\leq0$ — so $\log_a(x)$ is undefined for $x\leq0$, not by an arbitrary convention, but because no valid answer could exist.

**Evaluating directly**: $\log_a(x)$ asks "$a$ to WHAT power gives $x$?" — when $x$ is a recognizable power of $a$, this is a direct read-off: $\log_2(8)=3$ (since $2^3=8$); $\log_{10}(0.01)=-2$ (since $10^{-2}=0.01$); $\log_5(1)=0$ (since $5^0=1$, for ANY valid base).

## Component 4 — Worked Examples

**Example 1 (LO1 — converting between notations)**: $\log_3(81)=4$ is exactly the same fact as $3^4=81$ — verify: $3^4=3\times3\times3\times3=81$ ✓. Converting the other direction: $2^5=32$ becomes $\log_2(32)=5$.

**Example 2 (LO2 — domain restriction, breaking MC-1)**: Is $\log_2(-8)$ defined? Ask: "is there ANY real exponent $y$ with $2^y=-8$?" Since $2^y>0$ for every real $y$ (positive base to any real power stays positive — already known from the exponential function's range), NO such $y$ exists — $\log_2(-8)$ is **undefined**, not because of an arbitrary rule, but because the equation $2^y=-8$ genuinely has no real solution.

**Example 3 (LO3 — logarithm and exponential as inverses, breaking MC-2)**: Compute $\log_5(5^3)$ and separately $5^{\log_5(9)}$. For the first: $\log_5(5^3)$ asks "5 to what power gives $5^3$?" — obviously 3 (the exponent is already right there): $\log_5(5^3)=3$. For the second: $5^{\log_5(9)}$ asks for 5 raised to (the power that gives 9 when 5 is raised to it) — by definition, that's exactly 9: $5^{\log_5(9)}=9$. Both illustrate the inverse-function "undoing" relationship directly: applying $\log_a$ then $a^{(\cdot)}$ (or vice versa) returns the original input, exactly as any function composed with its own inverse does.

## Component 5 — Teaching Actions

### Teaching Action A01 — The "What Power Gives This?" Question, and Notation Conversion (Primitive P11: Representation Shift)

Start concrete: ask directly, "2 raised to what power gives 8?" — the answer, 3, IS $\log_2(8)$; state the formal definition immediately after this concrete question-and-answer exchange. Work Example 1's notation-conversion exercises, moving fluently between $\log_a(x)=y$ and $a^y=x$ forms.

Shift representation to the domain restriction: pose "2 raised to what power gives $-8$?" and let the student search fruitlessly for an answer before revealing WHY none exists (Example 2's argument from the exponential function's always-positive range).

- **MC-1 hook**: ask "is $\log_2(-8)$ just some large negative number, since $-8$ is a 'big' negative value?" — an attempt to compute a specific numeric answer (rather than recognizing NO real answer exists) reveals MC-1 (believing the logarithm of a non-positive number simply produces some (perhaps unusual) number, rather than recognizing it as fundamentally undefined).

### Teaching Action A02 — Domain Restriction Derivation, and Logarithm/Exponential as True Inverses (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's domain-restriction argument explicitly and rigorously — since $a^y>0$ always (for valid $a$), the EQUATION $a^y=x$ for $x\leq0$ has no solution, full stop; this isn't a convention chosen for convenience, it's forced by the exponential function's own range. Contrast against $\log_2(0.001)$ (a legitimately small but POSITIVE input) — this IS defined (a large negative exponent), unlike $\log_2(-8)$ or $\log_2(0)$, which are not.

**Contrast 2 (targets MC-2)**: Work Example 3's two inverse-composition computations side by side ($\log_5(5^3)=3$; $5^{\log_5(9)}=9$), explicitly connecting BOTH to the general inverse-function principle: "applying a function and then its inverse (in either order) always returns you to where you started — this is exactly what 'inverse' means, and it's why these two specific compositions simplify so directly, without needing separate memorized rules for each direction."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Convert $\log_4(64)=3$ to exponential form, and verify it's correct.
  2. Evaluate $\log_{10}(0.0001)$ directly, by asking "10 to what power gives 0.0001?"
  3. Explain, using the exponential function's range, why $\log_7(0)$ is undefined.
  4. Compute $\log_3(3^7)$ and $3^{\log_3(20)}$, explaining both using the inverse-function relationship (not by separately memorizing two rules).
- **P76 (Transfer Probe, mode = independence)**: "A sound engineer measures loudness in decibels using $L = 10\log_{10}(I/I_0)$ where $I$ is sound intensity and $I_0$ is a fixed reference intensity. (a) Explain, using this lesson's domain-restriction reasoning, why this formula requires $I>0$ (i.e., why a sound intensity of exactly zero, or a negative 'intensity,' would make the formula undefined, connecting your answer to why logarithms of non-positive numbers have no real value). (b) A student wants to 'undo' the decibel formula to recover the original intensity $I$ from a measured $L$ value — using this lesson's logarithm/exponential inverse relationship, describe the general shape of the calculation needed (you do not need to solve the specific formula algebraically, just identify which operation — exponentiating with the same base — would undo the logarithm here, by direct analogy with $5^{\log_5(9)}=9$)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LOGARITHM-OF-NONPOSITIVE-NUMBER-ASSUMED-COMPUTABLE | Believing $\log_a(x)$ for $x\leq0$ produces some (perhaps unusual or negative) numeric answer, rather than recognizing it as genuinely undefined | Foundational |
| MC-2 | LOGARITHM-EXPONENTIAL-INVERSE-RELATIONSHIP-NOT-RECOGNIZED | Treating $\log_a(a^n)=n$ and $a^{\log_a(n)}=n$ as two unrelated memorized rules, rather than recognizing both as instances of the single general "inverse functions undo each other" principle | Moderate |
| MC-3 | BASE-OF-LOGARITHM-CONFUSED-WITH-BASE-OF-EXPONENTIAL-DEFINITION | When converting between $\log_a(x)=y$ and $a^y=x$, misplacing which quantity is the base, which is the exponent, and which is the argument/result | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Nonpositive-Argument Logarithm Assumed Computable") → P41 (detect: ask a student to evaluate $\log_2(-8)$ or $\log_5(0)$ and check whether they attempt a specific numeric answer) → P64 (conceptual shift: re-derive from "is there ANY real $y$ with $a^y=x$?" — since $a^y>0$ always, checking this directly shows no such $y$ can exist for non-positive $x$).
- **B02 (targets MC-2)**: P27 (name it: "Inverse Relationship Not Recognized") → P41 (detect: ask a student to explain why $\log_a(a^n)=n$, checking for a genuine inverse-function explanation versus rote recall) → P64 (conceptual shift: connect explicitly to the general inverse-function principle already familiar from function composition — $f^{-1}(f(x))=x$ and $f(f^{-1}(x))=x$, with $\log_a$ and $a^{(\cdot)}$ as a specific instance).
- **B03 (targets MC-3)**: P27 (name it: "Base/Exponent/Argument Position Confusion") → P41 (detect: check a student's notation conversions for correctly-placed base, exponent, and argument) → P64 (conceptual shift: re-derive using the "what power gives this?" question form explicitly for each conversion, rather than applying a memorized template mechanically).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponential-function` (the exponential function this concept is defined as the inverse of, and whose always-positive range directly justifies the domain restriction here).
- **Unlocks**: `math.alg.logarithmic-equations` (solving equations involving logarithms builds directly on this concept's definition and domain awareness).
- **Cross-link**: KG lists `math.calc.derivative-ln` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.calc.derivative-ln.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's inverse-function definition directly to that concept's derivation of $\frac{d}{dx}\ln(x)=\frac1x$ via implicit differentiation of the inverse relationship $e^{\ln x}=x$.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (the "what power gives this?" question and notation conversion) and A02 (domain-restriction derivation plus the inverse-function relationship) jointly cover all three LOs, with the substantial hour count reflecting the need for extensive fluency practice converting between logarithmic and exponential notation, a skill every subsequent logarithm-related concept depends on.
- MC-1 (logarithm of nonpositive number assumed computable) was made this blueprint's central focus because the domain restriction is frequently presented as an arbitrary rule to memorize ("logs are only defined for positive numbers") rather than a DERIVED consequence of the exponential function's own range — this blueprint deliberately derives it explicitly (Example 2, Contrast 1) to prevent rote, ungrounded memorization.
- The decibel transfer probe was chosen because logarithmic scales (decibels, pH, Richter scale) are among the most immediately recognizable real-world applications of logarithms, and the domain-restriction question (can sound intensity be zero or negative?) gives the abstract restriction genuine physical grounding.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.exponential-function`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.derivative-ln` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: "what power gives this?" before notation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
