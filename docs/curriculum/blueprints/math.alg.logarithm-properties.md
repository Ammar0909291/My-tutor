# Teaching Blueprint: Logarithm Properties (`math.alg.logarithm-properties`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.logarithm-properties` |
| name | Logarithm Properties |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.alg.logarithm` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying each identity numerically on a specific base/argument pair before naming the general rule |
| description (KG) | Key identities: $\log(xy)=\log x+\log y$; $\log(x/y)=\log x-\log y$; $\log(x^r)=r\log x$; enabling algebraic manipulation of logarithmic expressions. |

## Component 1 — Learning Objectives

- LO1: Derive the **product rule** $\log_a(xy)=\log_ax+\log_ay$ directly from `math.alg.logarithm`'s own inverse-of-exponentiation definition — recognizing it as inherited from the exponent LAW $a^{m+n}=a^m\cdot a^n$, not an independently memorized fact.
- LO2: Derive the **quotient rule** $\log_a(x/y)=\log_ax-\log_ay$ and the **power rule** $\log_a(x^r)=r\log_ax$ by the SAME method — translating exponent laws into logarithm statements — and apply all three rules together to simplify a multi-term logarithmic expression.
- LO3 (orientation level — full change-of-base derivation deferred): recognize, without full derivation, that these three rules let logarithmic expressions be manipulated ALGEBRAICALLY (expanding, combining, simplifying) much like polynomial expressions, previewing that a change-of-base formula exists to convert between different log bases.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.logarithm` ($\log_a(x)$ as the inverse of exponentiation: the exponent to which $a$ must be raised to give $x$).

## Component 3 — Core Explanation

**Every logarithm rule is an exponent law, translated**: since $\log_a(x)$ is DEFINED as the exponent $e$ such that $a^e=x$, any true statement about exponents translates directly into a true statement about logarithms. The exponent law $a^{m+n}=a^m\cdot a^n$ translates, by setting $x=a^m$ and $y=a^n$ (so $m=\log_ax$, $n=\log_ay$), into $\log_a(xy)=\log_ax+\log_ay$ — the PRODUCT RULE is not a new fact requiring separate memorization; it is the SAME exponent law, viewed through the logarithm's defining inverse relationship.

**The quotient and power rules follow the identical pattern**: $a^{m-n}=a^m/a^n$ translates into $\log_a(x/y)=\log_ax-\log_ay$ (the QUOTIENT RULE), and $a^{rm}=(a^m)^r$ translates into $\log_a(x^r)=r\log_ax$ (the POWER RULE) — by the exact same substitution logic used for the product rule. All three rules are one single translation principle (exponent laws $\leftrightarrow$ logarithm rules), applied to the three basic exponent laws (sum, difference, scalar multiple of exponents).

**Algebraic manipulation, like polynomials (orientation level)**: once all three rules are established, logarithmic expressions can be expanded, combined, and simplified using algebra-like moves — e.g. $\log_a\left(\frac{x^2y}{z^3}\right)=2\log_ax+\log_ay-3\log_az$ — treating logs of products/quotients/powers as "distributing" much like exponents distribute over multiplication. A change-of-base formula (converting $\log_a$ into $\log_b$ for a different base $b$) exists to complete this toolkit, deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the product rule via exponent laws, breaking MC-1)**: to derive $\log_2(4\cdot8)=\log_24+\log_28$: let $m=\log_24=2$ (since $2^2=4$) and $n=\log_28=3$ (since $2^3=8$). Then $4\cdot8=2^2\cdot2^3=2^{2+3}=2^5=32$ (using the exponent law $a^m\cdot a^n=a^{m+n}$), so $\log_2(4\cdot8)=\log_2(32)=5=2+3=\log_24+\log_28$ ✓ — the product rule fell directly out of the exponent law, applied to this specific case.

**Example 2 (LO2 — quotient and power rules, simplifying a combined expression, breaking MC-2)**: derive $\log_2(16/2)=\log_216-\log_22$: $16/2=2^4/2^1=2^{4-1}=2^3=8$, so $\log_2(16/2)=\log_28=3=4-1=\log_216-\log_22$ ✓ (quotient rule). Derive $\log_2(4^3)=3\log_24$: $4^3=(2^2)^3=2^6=64$, so $\log_2(4^3)=\log_2(64)=6=3\times2=3\log_24$ ✓ (power rule). Combining all three rules: simplify $\log_2\left(\frac{16\cdot4^3}{8}\right)=\log_216+3\log_24-\log_28=4+3(2)-3=4+6-3=7$ — check directly: $\frac{16\cdot64}{8}=\frac{1024}{8}=128=2^7$ ✓.

**Example 3 (LO3, orientation level — algebraic manipulation and the change-of-base preview, breaking MC-3)**: expand $\log_a\left(\frac{x^2y}{z^3}\right)$ fully using all three rules: $\log_a(x^2y)-\log_a(z^3)$ (quotient rule) $=\log_a(x^2)+\log_a(y)-\log_a(z^3)$ (product rule) $=2\log_ax+\log_ay-3\log_az$ (power rule, applied twice). This expansion treats the logarithm almost like a linear operator distributing over products/quotients/powers — much like how exponents distribute over multiplication, since that IS where these rules came from. Converting this entire expression to a DIFFERENT base $b$ (via a change-of-base formula) would let the same manipulated expression be evaluated or compared using any base's logarithm table or calculator function — the precise formula for this conversion is deferred beyond this concept's core scope.

## Component 5 — Teaching Actions

### Teaching Action A01 — Every Log Rule Is an Exponent Law, Not a New Fact (Primitive P11: Representation Shift)

State: "you're not memorizing three new rules — you're translating three exponent laws you already know into logarithm language, using the logarithm's own defining inverse relationship." Walk Example 1's direct exponent-to-logarithm translation.

- **MC-1 hook**: ask "is the product rule $\log_a(xy)=\log_ax+\log_ay$ an independent fact requiring its own separate memorization, unconnected to the exponent laws?" — a "yes" answer reveals MC-1 (missing that the product rule is the exponent law $a^m\cdot a^n=a^{m+n}$, translated via the logarithm's defining inverse relationship).

### Teaching Action A02 — All Three Rules Come From the Same Translation Principle (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the quotient and power rules were derived using the EXACT SAME substitution logic as the product rule, just applied to different exponent laws. State: "there's really only ONE idea here — translate an exponent law into a logarithm statement — applied three times to three different exponent laws, not three unrelated rules to memorize separately."

- **MC-2 hook**: ask "are the product, quotient, and power rules three genuinely different techniques, each requiring its own separate derivation method?" — a "yes" answer reveals MC-2 (missing that all three follow from the SAME exponent-law-translation principle, just applied to sum, difference, and scalar-multiple exponent laws respectively).

### Teaching Action A03 — Logarithms of Sums Do NOT Simplify Like Products Do (Primitive P06: Contrast Pair)

Contrast Example 3's correct expansion of $\log_a\left(\frac{x^2y}{z^3}\right)$ (a PRODUCT/quotient/power structure, which DOES expand) against the false claim $\log_a(x+y)=\log_ax+\log_ay$ (a SUM inside the logarithm, which does NOT simplify this way — check numerically: $\log_2(2+2)=\log_24=2$, but $\log_22+\log_22=1+1=2$... choose a case that actually differs: $\log_2(4+4)=\log_28=3$, while $\log_24+\log_24=2+2=4\ne3$). State: "the product/quotient/power rules apply ONLY when the logarithm's argument is itself a product, quotient, or power — a SUM inside the logarithm has no such simplification rule at all."

- **MC-3 hook**: ask "does $\log_a(x+y)=\log_ax+\log_ay$, the same way $\log_a(xy)=\log_ax+\log_ay$ does?" — a "yes" answer reveals MC-3 (missing that the product rule applies only to products/quotients/powers inside the log, never to sums).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Derive $\log_3(9\cdot27)=\log_39+\log_327$ using the same exponent-translation method as Example 1.
  2. Simplify $\log_5(125/25)$ using the quotient rule, and verify directly.
  3. Fully expand $\log_a\left(\frac{x^3}{y\cdot z^2}\right)$ using all three rules.
  4. Explain, with a numeric counterexample, why $\log_a(x+y)\ne\log_ax+\log_ay$ in general.
- **P76 (Transfer Probe, mode = independence)**: "The Richter scale for earthquake magnitude uses $M=\log_{10}(I/I_0)$ where $I$ is intensity and $I_0$ is a reference intensity. (a) Using the quotient rule, rewrite $M$ as $\log_{10}I-\log_{10}I_0$. (b) If a second earthquake has intensity $100\times$ the first, use the product/power rules to determine how much larger its Richter magnitude is. (c) A student claims that if intensity DOUBLES, magnitude also roughly doubles, reasoning '$\log_{10}(2I)=2\log_{10}I$' — identify and correct the error, citing the correct rule that actually applies to $\log_{10}(2I)$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PRODUCT-RULE-ASSUMED-INDEPENDENT-FACT | Believing the product rule is an independent fact requiring separate memorization, missing that it is the exponent law $a^m\cdot a^n=a^{m+n}$, translated via the logarithm's inverse relationship | Foundational |
| MC-2 | THREE-RULES-ASSUMED-UNRELATED-TECHNIQUES | Believing the product, quotient, and power rules are three genuinely different techniques, missing that all three follow from the same exponent-law-translation principle | High |
| MC-3 | LOG-OF-SUM-ASSUMED-TO-SPLIT-LIKE-PRODUCT | Believing $\log_a(x+y)=\log_ax+\log_ay$ the same way the product rule splits $\log_a(xy)$, missing that no such rule exists for sums inside the logarithm | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Product Rule Assumed Independent Fact") → P41 (detect: ask whether the product rule requires its own separate memorization unconnected to exponent laws) → P64 (conceptual shift: re-walk Example 1's exponent-to-logarithm translation, re-anchoring on "the product rule IS the exponent law $a^m\cdot a^n=a^{m+n}$, translated").
- **B02 (targets MC-2)**: P27 (name it: "Three Rules Assumed Unrelated Techniques") → P41 (detect: ask whether the product, quotient, and power rules are three genuinely different techniques) → P64 (conceptual shift: re-walk Example 2's parallel derivations, re-anchoring on "one translation principle, applied to three different exponent laws").
- **B03 (targets MC-3)**: P27 (name it: "Log of Sum Assumed to Split Like Product") → P41 (detect: ask whether $\log_a(x+y)=\log_ax+\log_ay$) → P64 (conceptual shift: re-walk Example 3's numeric counterexample, re-anchoring on "the product/quotient/power rules apply only to products/quotients/powers inside the log, never to sums").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.logarithm` (the definition of $\log_a(x)$ as the inverse of exponentiation, directly used to translate each exponent law into its corresponding logarithm rule).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full derivational depth (all three rules derived, not merely stated) and LO3 kept orientation-level, appropriately surveying algebraic-manipulation practice and previewing the change-of-base formula without deriving it.
- **Division of labor**: `math.alg.logarithm` owns the basic inverse-of-exponentiation definition; this concept owns TRANSLATING the already-known exponent laws into logarithm rules via that definition — deliberately using base-2 examples with clean powers of 2 throughout Examples 1–2 so every step can be verified by direct numeric computation, not merely asserted symbolically.
- Example 3's deliberate choice of a numeric counterexample for the sum-versus-product contrast (rather than only a symbolic argument) was chosen because MC-3 is a persistent, evidence-resistant misconception that benefits from a concrete, checkable numeric mismatch.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric verification on specific base/argument pairs precedes the general rule statements) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
