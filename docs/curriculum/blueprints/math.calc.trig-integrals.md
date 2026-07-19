# Teaching Blueprint: Trigonometric Integrals (`math.calc.trig-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.trig-integrals` |
| name | Trigonometric Integrals |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.u-substitution`, `math.trig.product-to-sum` |
| unlocks | `math.calc.trig-substitution` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in u-substitution and product-to-sum; the strategy-selection logic is introduced directly |
| description (KG) | Integration of products of trig functions using Pythagorean identities, double-angle formulas, and reduction formulas; includes ∫sinⁿx dx, ∫tanⁿx secᵐx dx. |

## Component 1 — Learning Objectives

- LO1: Integrate $\int\sin^nx\cos^mx\,dx$ when **at least one exponent is odd**, by peeling off ONE factor of the odd-power function, converting the remaining EVEN power via the Pythagorean identity $\sin^2x+\cos^2x=1$, and applying `math.calc.u-substitution` directly.
- LO2: Integrate $\int\sin^nx\cos^mx\,dx$ when **both exponents are even**, by applying the double-angle identities ($\sin^2x=\frac{1-\cos2x}2$, $\cos^2x=\frac{1+\cos2x}2$ — the same product-to-sum family from `math.trig.product-to-sum`) to reduce the power BEFORE integrating, since the odd-power substitution technique (LO1) does not apply.
- LO3 *(orientation-level, given the strategy-selection scope of this concept)*: Recognize that $\int\tan^nx\sec^mx\,dx$ requires its OWN parity-based case analysis (reduction formulas, splitting off $\sec^2x$ when $m$ is even, or $\sec x\tan x$ when $n$ is odd) — the same parity-driven strategy-selection PRINCIPLE as LO1/LO2, applied to a different function pair, without deriving every reduction formula in full.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.u-substitution` (recognizing a composite function and its derivative-factor pairing to substitute $u$ and $du$) and `math.trig.product-to-sum` (the four product-to-sum formulas and, by extension, the double-angle identities they generalize).

## Component 3 — Core Explanation

**An odd exponent is what makes u-substitution work directly**: for $\int\sin^nx\cos^mx\,dx$ with (say) $n$ ODD, write $\sin^nx=\sin^{n-1}x\cdot\sin x$, where $n-1$ is now EVEN. Convert $\sin^{n-1}x$ using $\sin^2x=1-\cos^2x$ (Pythagorean identity), leaving the entire integrand as a polynomial in $\cos x$ multiplied by the single leftover factor $\sin x\,dx$ — exactly the $du$ needed for the substitution $u=\cos x$ ($du=-\sin x\,dx$). This technique fundamentally requires an ODD leftover power to isolate that single "$du$-matching" factor.

**When both exponents are even, the odd-power technique has no leftover factor to isolate, so double-angle reduction is required instead**: with both $n$ and $m$ even in $\int\sin^nx\cos^mx\,dx$, there is no single stray factor to peel off for a clean substitution — every factor pairs up evenly. Instead, apply the double-angle identities $\sin^2x=\frac{1-\cos2x}2$ and $\cos^2x=\frac{1+\cos2x}2$ (direct consequences of the same product-to-sum/double-angle family already mastered) to rewrite the integrand in terms of $\cos2x$, $\cos4x$, etc. — reducing the power before integrating, a genuinely different strategy from LO1's substitution.

**$\int\tan^nx\sec^mx\,dx$ requires its own, analogous parity-based case analysis**: using $\tan^2x=\sec^2x-1$ and the derivative pairing $\frac{d}{dx}\tan x=\sec^2x$, $\frac{d}{dx}\sec x=\sec x\tan x$: if $m$ (the secant power) is EVEN, split off $\sec^2x$ and substitute $u=\tan x$; if $n$ (the tangent power) is ODD, split off $\sec x\tan x$ and substitute $u=\sec x$. This is the SAME parity-driven case-selection principle from LO1/LO2, applied to a different function pair — a genuinely large family of reduction formulas exists here, appropriately left at an orientation level within this concept's own scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — odd power enables direct substitution, breaking MC-1)**: $\int\sin^3x\cos^2x\,dx$. The exponent on $\sin x$ (3) is ODD. Split: $\sin^3x=\sin^2x\cdot\sin x=(1-\cos^2x)\sin x$. The integral becomes $\int(1-\cos^2x)\cos^2x\cdot\sin x\,dx$. Substitute $u=\cos x$, $du=-\sin x\,dx$: $-\int(1-u^2)u^2\,du=-\int(u^2-u^4)\,du=-\left[\frac{u^3}3-\frac{u^5}5\right]+C=-\frac{\cos^3x}3+\frac{\cos^5x}5+C$. This worked ONLY because one exponent was odd, leaving exactly the single factor needed to match $du$.

**Example 2 (LO2 — both exponents even, requiring double-angle reduction instead, breaking MC-2)**: $\int\sin^2x\cos^2x\,dx$. BOTH exponents are even — LO1's odd-power splitting trick does NOT apply (peeling off one factor from an even power leaves an odd power stranded, with no clean pairing for a $du$). Instead, apply double-angle identities: $\sin^2x=\frac{1-\cos2x}2$, $\cos^2x=\frac{1+\cos2x}2$, so $\sin^2x\cos^2x=\frac{(1-\cos2x)(1+\cos2x)}4=\frac{1-\cos^22x}4$. Reducing $\cos^22x=\frac{1+\cos4x}2$ further: $\sin^2x\cos^2x=\frac{1-\frac{1+\cos4x}2}4=\frac{1-\cos4x}8$. Integrating: $\int\frac{1-\cos4x}8\,dx=\frac x8-\frac{\sin4x}{32}+C$.

**Example 3 (orientation-level — the analogous tan/sec strategy split, breaking MC-3)**: For $\int\tan^nx\sec^mx\,dx$: if $m$ is EVEN (e.g. $\int\tan^3x\sec^4x\,dx$), split off $\sec^2x$: $\sec^4x=\sec^2x\cdot\sec^2x=(1+\tan^2x)\sec^2x$, substitute $u=\tan x$, $du=\sec^2x\,dx$, giving $\int u^3(1+u^2)\,du$, a routine polynomial integral. If $n$ is ODD instead (e.g. $\int\tan^3x\sec x\,dx$), split off $\sec x\tan x$: $\tan^3x\sec x=\tan^2x\cdot(\sec x\tan x)=(\sec^2x-1)(\sec x\tan x)$, substitute $u=\sec x$, $du=\sec x\tan x\,dx$, giving $\int(u^2-1)\,du$. Both cases follow the SAME parity-driven principle as LO1/LO2 — checking which power is more convenient to isolate before choosing a substitution — but the full family of reduction formulas (e.g. when NEITHER $n$ is odd NOR $m$ is even) is deferred beyond this concept's own scope.

## Component 5 — Teaching Actions

### Teaching Action A01 — Odd Power Isolates the Matching Factor for Substitution (Primitive P11: Representation Shift)

State: "an odd exponent always leaves exactly one 'extra' factor after pairing off — and that extra factor is precisely the $du$ a substitution needs." Work Example 1's full odd-power split, Pythagorean-identity conversion, and substitution.

- **MC-1 hook**: ask "can $\int\sin^nx\cos^mx\,dx$ always be solved by substituting $u=\sin x$ or $u=\cos x$ directly, regardless of whether $n$ or $m$ is odd or even?" — a "yes" answer reveals MC-1 (missing that this substitution technique specifically requires an odd leftover power to isolate the matching factor).

### Teaching Action A02 — Both-Even Requires Double-Angle Reduction, Not Substitution (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\int\sin^2x\cos^2x\,dx$ has no odd exponent to exploit, so the LO1 technique stalls — double-angle reduction is required instead. State: "when both exponents are even, there's no stray factor to isolate — you must reduce the power using double-angle identities before integrating."

- **MC-2 hook**: ask "does the double-angle/product-to-sum reduction technique only apply to products of trig functions with DIFFERENT arguments (like $\sin3x\cos x$), or does it also apply to same-argument even powers like $\sin^2x\cos^2x$?" — an "only different arguments" answer reveals MC-2 (missing that double-angle identities also make the both-even case tractable).

### Teaching Action A03 — The Same Strategy-Selection Principle Extends to tan/sec (Primitive P06: Contrast Pair)

Contrast Example 3's two cases: $m$ even (split off $\sec^2x$, substitute $u=\tan x$) against $n$ odd (split off $\sec x\tan x$, substitute $u=\sec x$). State: "this is the identical parity-based decision process from sin/cos, applied to a new function pair — check which power lets you isolate a clean substitution factor first."

- **MC-3 hook**: ask "does every trigonometric integral of the form $\int\sin^nx\cos^mx\,dx$ or $\int\tan^nx\sec^mx\,dx$ get solved by exactly ONE universal technique, regardless of the exponents' parities?" — a "yes" answer reveals MC-3 (missing that the correct strategy depends on case analysis of the exponents' parities, not one universal method).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\int\sin^5x\,dx$ (treat as $\cos^0x$; only one factor present), identifying which exponent is odd and applying the appropriate substitution.
  2. Compute $\int\cos^4x\,dx$ using double-angle reduction (both the trivial "other" exponent and the given one are effectively even here).
  3. Determine, without fully solving, which strategy (substitution or double-angle reduction) applies to $\int\sin^4x\cos^3x\,dx$, and justify your choice from the exponents' parities.
  4. Compute $\int\tan^2x\sec^4x\,dx$, choosing the appropriate split (even secant power) and substitution.
- **P76 (Transfer Probe, mode = independence)**: "An electrical engineer needs to compute the average power of an AC signal, which requires evaluating $\int\sin^2(\omega t)\cos^2(\omega t)\,dt$ over one period. (a) Determine which strategy (odd-power substitution or double-angle reduction) applies here, based on the exponents' parities, and explain your reasoning before computing anything. (b) A colleague suggests trying $u=\sin(\omega t)$ directly, arguing 'since there's a $\sin$ factor present, substitution should work the same way it always does.' Using this lesson's parity requirement, explain specifically why this substitution attempt will stall. (c) The colleague, after seeing the double-angle approach work, asks whether this same reduction technique would also work for $\int\tan^2(\omega t)\sec^2(\omega t)\,dt$. Using this lesson's distinction between the sin/cos family and the tan/sec family, explain why a DIFFERENT (though analogous) technique is needed there instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIG-SUBSTITUTION-APPLIED-REGARDLESS-OF-PARITY | Believing sin/cos products can always be solved via direct u-substitution regardless of exponent parity, missing that this technique specifically requires an odd leftover power | Foundational |
| MC-2 | DOUBLE-ANGLE-REDUCTION-ASSUMED-LIMITED-TO-DIFFERENT-ARGUMENTS | Believing double-angle/product-to-sum reduction only applies to products of trig functions with different arguments, missing that it also resolves the same-argument both-even case | Moderate |
| MC-3 | ONE-UNIVERSAL-TECHNIQUE-ASSUMED-FOR-ALL-TRIG-INTEGRALS | Believing all trigonometric integrals of a given function family are solved by one universal technique, missing that the correct strategy depends on case analysis of the exponents' parities | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Trig Substitution Applied Regardless of Parity") → P41 (detect: ask a student to substitute $u=\sin x$ directly into $\int\sin^2x\cos^2x\,dx$ and check whether they proceed without noticing the stall) → P64 (conceptual shift: re-walk Example 1's odd-power isolation, re-anchoring on "substitution needs an odd leftover power to isolate a matching factor").
- **B02 (targets MC-2)**: P27 (name it: "Double-Angle Reduction Assumed Limited to Different Arguments") → P41 (detect: ask a student whether double-angle identities can help with $\sin^2x\cos^2x$ (same argument), checking for "no") → P64 (conceptual shift: re-walk Example 2's full double-angle reduction of $\sin^2x\cos^2x$, re-anchoring on "double-angle identities resolve the both-even case regardless of matching arguments").
- **B03 (targets MC-3)**: P27 (name it: "One Universal Technique Assumed for All Trig Integrals") → P41 (detect: ask a student whether one method solves every $\int\sin^nx\cos^mx\,dx$ regardless of $n,m$, checking for "yes") → P64 (conceptual shift: re-walk the parity-based case split across Examples 1-3, re-anchoring on "the correct technique always depends on checking the exponents' parities first").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.u-substitution` (the substitution technique LO1's odd-power case directly applies), `math.trig.product-to-sum` (the double-angle identities, a direct consequence of that concept's formulas, LO2's both-even case relies on).
- **Unlocks**: `math.calc.trig-substitution` (uses trigonometric identities in the REVERSE direction — substituting a trig expression IN to simplify an algebraic integral — building on the identity fluency this concept establishes).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag places this at a "3 TAs + gate" tier; per established precedent for concepts spanning a genuinely large technique family (`math.abst.galois-theory`, `math.top.homology`), LO3 (the tan/sec family) is deliberately kept at ORIENTATION level, demonstrating the SAME parity-selection principle on a new function pair without deriving the full reduction-formula family in exhaustive detail.
- **Division of labor**: `math.calc.u-substitution` owns the general substitution technique; `math.trig.product-to-sum` owns the product-to-sum/double-angle formulas. This concept, `math.calc.trig-integrals`, deliberately does not re-derive either; it owns the STRATEGY-SELECTION logic — recognizing from the exponents' parities which of the two already-mastered tools (substitution or double-angle reduction) actually applies, and correctly diagnosing when the "obvious" substitution attempt will stall.
- Examples 1 and 2 deliberately use closely related integrands ($\sin^3x\cos^2x$ vs. $\sin^2x\cos^2x$ — differing only in whether the sine exponent is odd or even) specifically so the parity-driven strategy split is demonstrated as cleanly as possible, isolating exactly what changes the required technique.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already fluent in prerequisites; strategy-selection introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
