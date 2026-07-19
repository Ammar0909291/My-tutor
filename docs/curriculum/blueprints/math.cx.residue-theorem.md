# Teaching Blueprint: Residue Theorem (`math.cx.residue-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.residue-theorem` |
| name | Residue Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.cx.residue`, `math.cx.cauchy-theorem` |
| unlocks | `math.cx.real-integral-residues` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in residues and Cauchy's theorem; the theorem unifies both directly |
| description (KG) | ∮_C f(z)dz = 2πi ∑ Res(f,zₖ) (sum over poles inside C). Generalizes Cauchy's theorem (no poles) and integral formula (simple pole at z₀). The most powerful computational tool in complex analysis. |

## Component 1 — Learning Objectives

- LO1: State the **Residue Theorem** precisely — $\oint_C f(z)\,dz = 2\pi i\sum_k\text{Res}(f,z_k)$, the sum taken over every pole $z_k$ ENCLOSED by $C$ — and recognize it as a strict GENERALIZATION of `math.cx.cauchy-theorem`'s own result: zero enclosed poles collapses the sum to $0$, exactly matching Cauchy's theorem's conclusion.
- LO2: Apply the Residue Theorem to evaluate a contour integral enclosing **multiple** poles, by computing the residue at EACH enclosed pole individually and summing them, rather than treating the integral as requiring some single combined computation.
- LO3: Correctly identify which poles are actually **enclosed** by a given contour $C$ — excluding any pole of $f$ that lies outside $C$, even when $f$ has poles elsewhere — recognizing that changing the contour (without changing $f$) can change which poles count and hence change the integral's value.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.residue` (computing $\text{Res}(f,z_0)=a_{-1}$ via the simple-pole and higher-order-pole shortcut formulas) and `math.cx.cauchy-theorem` ($\oint_C f\,dz=0$ for $f$ holomorphic on a simply connected domain; the classic counterexample $\oint_C\frac1z\,dz=2\pi i\ne0$ around a curve enclosing the singularity $z=0$).

## Component 3 — Core Explanation

**The Residue Theorem generalizes Cauchy's Theorem exactly**: `math.cx.cauchy-theorem` showed $\oint_Cf(z)\,dz=0$ whenever $f$ is holomorphic EVERYWHERE inside $C$ — no singularities enclosed. The Residue Theorem removes that restriction: if $f$ is holomorphic inside $C$ EXCEPT for finitely many isolated poles $z_1,\dots,z_k$, then $\oint_Cf(z)\,dz=2\pi i\sum_{j=1}^k\text{Res}(f,z_j)$. When there are NO poles enclosed, the sum is empty (equals $0$), and the formula collapses to exactly Cauchy's Theorem's conclusion — the Residue Theorem is not a competing tool, but the fully general version of the same underlying fact.

**Multiple enclosed poles: sum every individual residue**: when $C$ encloses several poles, the theorem requires computing the residue at EACH one separately (using whichever of `math.cx.residue`'s shortcut formulas fits that pole's order) and adding them together — there is no single "combined" computation that skips finding each pole's individual contribution.

**Only ENCLOSED poles count — the contour, not just the function, determines the answer**: the sum is over poles $z_k$ strictly INSIDE $C$. A pole of $f$ lying outside $C$ contributes NOTHING to that particular contour integral, even though it is a genuine pole of the same function. Consequently, the SAME function integrated over two DIFFERENT contours (one enclosing a given pole, one not) can yield two genuinely different answers — the integral depends on both $f$ and the specific contour $C$ chosen.

## Component 4 — Worked Examples

**Example 1 (LO1 — the theorem reduces to Cauchy's theorem's own example, breaking MC-1)**: For $f(z)=1/z$ and $C:|z|=1$ (the exact function and contour `math.cx.cauchy-theorem` used as its own counterexample): the Residue Theorem gives $\oint_Cf(z)\,dz=2\pi i\cdot\text{Res}(f,0)=2\pi i\cdot1=2\pi i$ — EXACTLY matching that concept's own computed value. If instead $C$ is any closed curve NOT enclosing $z=0$ (e.g., a small circle around $z=5$), there are zero enclosed poles, so the Residue Theorem gives $\oint_Cf(z)\,dz=2\pi i\cdot(\text{empty sum})=0$ — matching Cauchy's Theorem's ordinary conclusion exactly, since $f=1/z$ IS holomorphic throughout that curve's interior. One formula, two already-known special cases.

**Example 2 (LO2 — summing residues at multiple enclosed poles, breaking MC-3 partially, setting up MC-2)**: For $f(z)=\dfrac1{z(z-2)}$ and $C:|z|=3$ (enclosing BOTH poles, $z=0$ and $z=2$, since both have modulus less than 3): compute each residue separately. $\text{Res}(f,0)=\lim_{z\to0}z\cdot\dfrac1{z(z-2)}=\dfrac1{0-2}=-\dfrac12$. $\text{Res}(f,2)=\lim_{z\to2}(z-2)\cdot\dfrac1{z(z-2)}=\dfrac12$. Sum: $-\dfrac12+\dfrac12=0$. So $\oint_Cf(z)\,dz=2\pi i\cdot0=0$.

**Example 3 (LO3 — only enclosed poles count; shrinking the contour changes the answer, breaking MC-2)**: Using the SAME $f(z)=\dfrac1{z(z-2)}$ from Example 2, but now $C':|z|=1$ — this SMALLER contour encloses ONLY $z=0$ (since $z=2$ has modulus $2>1$, lying OUTSIDE $C'$). The Residue Theorem now sums over only the enclosed pole: $\oint_{C'}f(z)\,dz=2\pi i\cdot\text{Res}(f,0)=2\pi i\cdot\left(-\dfrac12\right)=-\pi i$ — a genuinely DIFFERENT answer from Example 2's $0$, even though the function $f$ never changed. Including the residue at $z=2$ here (which would incorrectly reproduce Example 2's answer of $0$) would be wrong, since that pole lies outside $C'$ entirely.

## Component 5 — Teaching Actions

### Teaching Action A01 — One Formula, Generalizing Two Already-Known Results (Primitive P11: Representation Shift)

State: "the Residue Theorem is not a brand-new, unrelated tool — it is Cauchy's Theorem with the 'no singularities' restriction lifted, and it reduces to exactly Cauchy's Theorem's own computations when applied to the same function and contour." Work Example 1's direct match against `math.cx.cauchy-theorem`'s own $1/z$ counterexample.

- **MC-1 hook**: ask "is the Residue Theorem an entirely separate tool from Cauchy's Theorem, requiring unrelated reasoning?" — a "yes" answer reveals MC-1 (missing that the Residue Theorem strictly generalizes Cauchy's Theorem, collapsing to it exactly when zero poles are enclosed).

### Teaching Action A02 — Sum Every Enclosed Pole's Own Residue Separately (Primitive P06: Contrast Pair)

Work Example 2's two-pole computation, contrasting the SEPARATE computation of $\text{Res}(f,0)=-1/2$ and $\text{Res}(f,2)=1/2$ against a hypothetical shortcut that tries to treat $f(z)=1/(z(z-2))$ as "one combined pole" without finding each residue individually. State: "each enclosed pole contributes its OWN residue to the sum — there is no way to skip computing them individually."

- **MC-3 hook**: ask "when a contour encloses two poles, can the residue theorem be applied using just one combined computation for both poles at once?" — a "yes" answer reveals MC-3 (missing that each enclosed pole's residue must be found and summed individually).

### Teaching Action A03 — The Contour Determines Which Poles Count (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: the SAME function $f(z)=1/(z(z-2))$ gives $0$ over $|z|=3$ (both poles enclosed) but $-\pi i$ over $|z|=1$ (only $z=0$ enclosed) — two different answers from one function, purely because the contour changed. State: "a pole of $f$ lying outside the specific contour you're integrating over contributes nothing to that integral — always check enclosure before summing."

- **MC-2 hook**: ask "should every pole of a function be included in the residue sum, regardless of whether the specific contour actually encloses it?" — a "yes" answer reveals MC-2 (including poles outside the contour, or failing to check enclosure at all).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why the Residue Theorem's conclusion becomes exactly Cauchy's Theorem's conclusion when $f$ has no poles inside $C$.
  2. Evaluate $\oint_Cf(z)\,dz$ for $f(z)=\dfrac{e^z}{z(z-1)}$ and $C:|z|=5$ (enclosing both poles), computing each residue separately.
  3. Using the SAME $f$ from problem 2, evaluate $\oint_{C'}f(z)\,dz$ for $C':|z-1|=0.5$ (a small circle enclosing ONLY the pole at $z=1$), and explain why this answer differs from problem 2's.
  4. A contour $C$ encloses poles at $z=1,2,3$ with residues $2,-3,1$ respectively. State $\oint_Cf(z)\,dz$ directly.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs $\oint_Cf(z)\,dz$ for $f(z)=\dfrac{1}{(z-1)(z-4)}$, where $C$ is the contour $|z|=2$. (a) Determine which of $f$'s two poles (at $z=1$ and $z=4$) lie inside $C$, and compute the integral using only the enclosed pole(s)'s residue(s). (b) A colleague, working with the same function but a DIFFERENT contour $C':|z|=10$ (enclosing both poles), computes the integral using both residues and gets a different numeric answer. Explain why both engineers can be correct even though they used the same function. (c) The colleague then argues 'since Cauchy's Theorem says integrals of holomorphic functions are $0$, and $f$ is holomorphic almost everywhere, both of our answers should really have been $0$.' Explain specifically why this argument misapplies Cauchy's Theorem here."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RESIDUE-THEOREM-AS-UNRELATED-TOOL | Believing the Residue Theorem is an entirely new, unrelated tool from Cauchy's Theorem, missing that it strictly generalizes it (collapsing to it exactly when no poles are enclosed) | Foundational |
| MC-2 | ALL-POLES-INCLUDED-REGARDLESS-OF-ENCLOSURE | Believing every pole of a function must be included in the residue sum regardless of whether the specific contour actually encloses it, missing that only enclosed poles contribute | Foundational |
| MC-3 | MULTIPLE-POLES-TREATED-AS-ONE-COMBINED-COMPUTATION | Believing multiple enclosed poles can be handled with a single combined computation rather than finding and summing each pole's own residue individually | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Residue Theorem as Unrelated Tool") → P41 (detect: ask a student whether the Residue Theorem and Cauchy's Theorem are connected, checking for "no, entirely separate") → P64 (conceptual shift: re-walk Example 1's exact match against Cauchy's Theorem's own $1/z$ example, re-anchoring on "zero enclosed poles collapses the Residue Theorem to Cauchy's Theorem exactly").
- **B02 (targets MC-2)**: P27 (name it: "All Poles Included Regardless of Enclosure") → P41 (detect: present a function with a pole outside a given contour and ask whether it contributes to that contour's integral, checking for "yes") → P64 (conceptual shift: re-walk Example 3's two-contour comparison, re-anchoring on "only poles strictly inside the contour contribute — always check enclosure first").
- **B03 (targets MC-3)**: P27 (name it: "Multiple Poles Treated as One Combined Computation") → P41 (detect: present a contour enclosing two poles and ask whether a single combined computation suffices, checking for "yes") → P64 (conceptual shift: re-walk Example 2's separate residue computations at $z=0$ and $z=2$, re-anchoring on "each enclosed pole contributes its own residue, individually found, to the sum").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.residue` (the per-pole residue computation this theorem sums over), `math.cx.cauchy-theorem` (the zero-poles special case this theorem generalizes, and whose own $1/z$ counterexample this concept directly reuses in Example 1).
- **Unlocks**: `math.cx.real-integral-residues` (uses the Residue Theorem as the central tool for evaluating real-variable integrals via complex contour techniques).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier; the concept is appropriately compact given it introduces no genuinely new computational technique beyond what `math.cx.residue` already established (per-pole residue extraction), focusing entirely on the SUMMATION/ENCLOSURE logic that assembles those already-mastered residues into a contour integral value.
- **Division of labor**: `math.cx.cauchy-theorem` owns the zero-poles case and the general holomorphic/simply-connected hypotheses; `math.cx.residue` owns computing an individual pole's residue. This concept, `math.cx.residue-theorem`, deliberately does not re-derive either; it owns the UNIFYING summation formula and, critically, the enclosure logic (which poles count, and why the contour itself is part of the answer) that neither prerequisite concept addresses.
- Example 1 deliberately reuses `math.cx.cauchy-theorem`'s own exact function and contour ($1/z$, $|z|=1$) rather than a new example, specifically so a learner can verify the new, more general formula reproduces an already-trusted result exactly — the strongest possible confirmation that generalization did not silently change the answer in a familiar case.

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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in both prerequisites, unified directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
