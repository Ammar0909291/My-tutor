# Teaching Blueprint: Natural Logarithm (`math.alg.natural-logarithm`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.natural-logarithm` |
| name | Natural Logarithm |
| domain | Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.logarithm` |
| unlocks | none |
| cross_links | `math.calc.derivative-ln` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — recognizing $\ln x$ as $\log_e x$ on specific numeric cases before naming its special calculus role |
| description (KG) | The logarithm with base $e\approx2.71828$; $\ln x=\log_ex$; arises naturally in calculus as the antiderivative of $1/x$. |

## Component 1 — Learning Objectives

- LO1: Recognize $\ln x=\log_ex$ as SIMPLY `math.alg.logarithm`'s general definition applied to the specific base $e\approx2.71828$ — not a different KIND of logarithm requiring a separate definition, and confirm that all of `math.alg.logarithm-properties`'s three rules (product, quotient, power) apply to $\ln$ unchanged, since $e$ is just one particular valid base.
- LO2: Use $\ln x$'s properties to simplify expressions (e.g. $\ln(e^3)=3$, $\ln(1/e)=-1$), directly applying the general logarithm rules with base $e$ substituted in.
- LO3 (orientation level — full calculus derivation deferred): recognize, without full derivation, that $e$ is singled out from all other possible bases because $\ln x$ is specifically the ANTIDERIVATIVE of $1/x$ — a fact from calculus, not algebra, that makes base $e$ uniquely natural for calculus purposes, deferred to `math.calc.derivative-ln`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.logarithm` ($\log_a(x)$ as the inverse of exponentiation, defined for any valid base $a>0$, $a\ne1$).

## Component 3 — Core Explanation

**$\ln x$ is not a new kind of logarithm — it is $\log_a(x)$ with $a=e$**: `math.alg.logarithm` already defined $\log_a(x)$ for ANY valid base $a$ — the natural logarithm simply picks the specific base $a=e\approx2.71828$ and gives it its own notation, $\ln x=\log_ex$. Nothing about the DEFINITION changes: $\ln x$ is still "the exponent to which $e$ must be raised to give $x$," exactly matching the general pattern, just with a particular numeric base substituted in.

**Because it's just a specific base, every logarithm rule still applies unchanged**: since $\ln$ is $\log_a$ with $a=e$, `math.alg.logarithm-properties`'s product rule ($\ln(xy)=\ln x+\ln y$), quotient rule ($\ln(x/y)=\ln x-\ln y$), and power rule ($\ln(x^r)=r\ln x$) all hold for $\ln$ with ZERO modification — these rules were derived for a GENERAL base $a$, and $e$ is simply one valid choice of $a$, inheriting every property that argument already established.

**Why $e$ specifically is singled out — a calculus fact, not an algebra fact (orientation level)**: among all possible logarithm bases, $e$ is special specifically because $\ln x$ turns out to be the ANTIDERIVATIVE of $1/x$ (i.e. $\frac{d}{dx}\ln x=\frac{1}{x}$) — no other base's logarithm has this exact clean calculus relationship. This is why calculus courses favor $\ln$ over $\log_{10}$ or any other base, but the REASON is a calculus fact about derivatives/antiderivatives, not anything special about $\ln$'s algebraic definition or properties, which remain identical to any other base's logarithm. Full derivation of this antiderivative relationship is deferred to `math.calc.derivative-ln`.

## Component 4 — Worked Examples

**Example 1 (LO1 — $\ln$ is $\log_a$ with $a=e$, all rules inherited unchanged, breaking MC-1)**: $\ln(e^2\cdot e^3)=\ln(e^2)+\ln(e^3)$ by the SAME product rule already established for any base — computing directly, $e^2\cdot e^3=e^5$, so $\ln(e^5)=5$, matching $\ln(e^2)+\ln(e^3)=2+3=5$ ✓. This is not a "natural-logarithm-specific" version of the product rule — it is literally `math.alg.logarithm-properties`'s general product rule, with $a=e$ substituted in, working exactly as it would for any other base.

**Example 2 (LO2 — simplifying expressions with base $e$, breaking MC-2)**: $\ln(e^3)=3$ (directly: the exponent to which $e$ must be raised to give $e^3$ is $3$). $\ln(1/e)=\ln(e^{-1})=-1$ (using the power rule: $\ln(e^{-1})=-1\cdot\ln(e)=-1\cdot1=-1$, since $\ln(e)=1$ — the exponent to which $e$ must be raised to give $e$ itself is $1$). $\ln(\sqrt{e})=\ln(e^{1/2})=\frac{1}{2}$ (power rule again). Each simplification used ONLY the already-established general logarithm rules, applied with the specific base $e$.

**Example 3 (LO3, orientation level — why $e$ specifically, not $10$ or $2$, breaking MC-3)**: consider $f(x)=\log_{10}x$ versus $g(x)=\ln x$. Both are equally valid logarithms with equally valid product/quotient/power rules (Examples 1–2's rules apply to EITHER base identically). But calculus reveals a sharp difference: $g'(x)=\frac{d}{dx}\ln x=\frac{1}{x}$ exactly, with no extra constant factor, while $f'(x)=\frac{d}{dx}\log_{10}x=\frac{1}{x\ln10}$ — carrying an extra constant $\frac{1}{\ln10}\approx0.4343$ that never disappears. This clean, constant-free derivative is THE reason $e$ is singled out as "natural" for calculus — a fact about DERIVATIVES, not about the algebraic definition or the product/quotient/power rules, which treat every base identically.

## Component 5 — Teaching Actions

### Teaching Action A01 — $\ln$ Is Not a Different Kind of Logarithm (Primitive P11: Representation Shift)

State: "$\ln x$ isn't a special new object — it's exactly `math.alg.logarithm`'s $\log_a(x)$ with the specific choice $a=e$, nothing more." Walk Example 1's direct application of the general product rule to base $e$.

- **MC-1 hook**: ask "is $\ln x$ a fundamentally different KIND of logarithm from $\log_{10}x$ or $\log_2x$, requiring its own separate definition?" — a "yes" answer reveals MC-1 (missing that $\ln x=\log_ex$ is simply the general logarithm definition with the specific base $e$ substituted in).

### Teaching Action A02 — Every Rule Transfers Unchanged (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the product, quotient, and power rules applied to $\ln$ with zero modification, giving correct answers each time. State: "you don't need separate 'natural-logarithm rules' — every rule you already know for logarithms works identically here, because $e$ is just a particular base, like any other."

- **MC-2 hook**: ask "do the product, quotient, and power rules need to be re-derived or modified specifically for the natural logarithm?" — a "yes" answer reveals MC-2 (missing that these rules were established for a general base and apply to $e$ with zero modification).

### Teaching Action A03 — $e$ Is Special For a Calculus Reason, Not an Algebra Reason (Primitive P06: Contrast Pair)

Contrast $\log_{10}$ and $\ln$'s IDENTICAL algebraic behavior (Examples 1–2's rules) against Example 3's sharply different DERIVATIVES ($\frac{1}{x}$ vs. $\frac{1}{x\ln10}$). State: "algebraically, every base behaves the same way — $e$ only becomes special once you bring in calculus, where its derivative comes out clean with no extra constant."

- **MC-3 hook**: ask "is base $e$ algebraically special compared to other logarithm bases, in a way that makes its product/quotient/power rules behave differently?" — a "yes" answer reveals MC-3 (missing that $e$'s special status comes entirely from calculus — its clean derivative — not from any algebraic difference in how its logarithm rules work).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Simplify $\ln(e^4)$ and $\ln(e^{-2})$ directly from the definition.
  2. Use the product rule to simplify $\ln(e^2\cdot e^5)$, verifying both by direct computation and by the rule.
  3. Simplify $\ln(\sqrt[3]{e})$ using the power rule.
  4. Explain, in one or two sentences, why $\ln x$'s special role in calculus does not imply it obeys different algebraic rules than $\log_{10}x$ or any other base's logarithm.
- **P76 (Transfer Probe, mode = independence)**: "Continuously compounded interest is modeled by $A=Pe^{rt}$, and solving for $t$ requires taking $\ln$ of both sides. (a) Starting from $A=Pe^{rt}$, use the definition of $\ln$ as the inverse of $e^x$ to solve for $t$ in terms of $\ln(A/P)$ and $r$. (b) Confirm that the quotient and power rules you already know (not any special 'natural-log' version) justify each algebraic step. (c) A colleague asks why the formula uses $e$ specifically rather than base $10$ — explain, citing the calculus reason, why $e$ is the natural choice here even though base $10$ would work equally well algebraically."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LN-ASSUMED-DIFFERENT-KIND-OF-LOG | Believing $\ln x$ is a fundamentally different kind of logarithm requiring its own separate definition, missing that it is simply $\log_ex$, the general logarithm definition with base $e$ | Foundational |
| MC-2 | LN-RULES-ASSUMED-TO-NEED-SEPARATE-DERIVATION | Believing the product/quotient/power rules need re-deriving or modifying specifically for $\ln$, missing that they transfer unchanged from the general-base case | High |
| MC-3 | E-ASSUMED-ALGEBRAICALLY-SPECIAL | Believing base $e$ is algebraically special in a way that changes how its logarithm rules behave, missing that $e$'s special status comes entirely from a calculus fact (its clean derivative), not algebra | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Ln Assumed Different Kind of Log") → P41 (detect: ask whether $\ln x$ is a fundamentally different kind of logarithm requiring its own definition) → P64 (conceptual shift: re-walk Example 1's direct base-$e$ application of the general product rule, re-anchoring on "$\ln x$ IS $\log_ex$, nothing more").
- **B02 (targets MC-2)**: P27 (name it: "Ln Rules Assumed to Need Separate Derivation") → P41 (detect: ask whether the product/quotient/power rules need modification for $\ln$) → P64 (conceptual shift: re-walk Example 2's zero-modification rule applications, re-anchoring on "every rule transfers unchanged, since $e$ is just a particular base").
- **B03 (targets MC-3)**: P27 (name it: "E Assumed Algebraically Special") → P41 (detect: ask whether base $e$ is algebraically special in a way that changes its logarithm rules) → P64 (conceptual shift: re-walk Example 3's derivative contrast, re-anchoring on "$e$'s special status is a calculus fact about clean derivatives, not an algebraic difference").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.logarithm` (the general inverse-of-exponentiation definition and, transitively via `math.alg.logarithm-properties`, the product/quotient/power rules this concept confirms transfer unchanged to base $e$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.derivative-ln`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (confirming rule-transfer and simplifying base-$e$ expressions) and LO3 kept orientation-level, appropriately previewing the antiderivative relationship without deriving $\frac{d}{dx}\ln x=\frac{1}{x}$ from first principles.
- **Division of labor**: `math.alg.logarithm` and `math.alg.logarithm-properties` own the general definition and the three algebraic rules for ANY base; this concept owns the SPECIFIC observation that these transfer unchanged to base $e$, and the preview of WHY $e$ is nonetheless the calculus-preferred base — deliberately contrasting $\log_{10}$ and $\ln$ side by side in Example 3 so the algebra/calculus distinction is visible in one direct comparison rather than asserted abstractly.
- Example 3's deliberate choice to state the derivative fact ($\frac{d}{dx}\ln x=1/x$ vs. $\frac{d}{dx}\log_{10}x=\frac{1}{x\ln10}$) without proving it was chosen to respect this concept's algebra-only scope while still making the calculus preview concrete and falsifiable, fully deferring the proof to `math.calc.derivative-ln`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.derivative-ln` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric base-$e$ cases precede naming the special calculus role) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
