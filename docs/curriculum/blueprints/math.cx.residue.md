# Teaching Blueprint: Residue (`math.cx.residue`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.residue` |
| name | Residue |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.cx.laurent-series` |
| unlocks | `math.cx.residue-theorem` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Laurent series; the residue is directly extracted from that machinery |
| description (KG) | Res(f,z₀) = a₋₁ in the Laurent expansion. For a simple pole: Res(f,z₀) = lim_{z→z₀}(z−z₀)f(z). For order-n pole: Res(f,z₀) = (1/(n−1)!) lim_{z→z₀} d^{n-1}/dz^{n-1}[(z−z₀)ⁿf(z)]. |

## Component 1 — Learning Objectives

- LO1: Define the residue $\text{Res}(f,z_0)$ as precisely the $a_{-1}$ coefficient of $f$'s Laurent series at $z_0$ — no more, no less — recognizing this concept introduces no new theory, only names and extracts one specific already-computed coefficient.
- LO2: Compute the residue at a **simple pole** (order 1) using the shortcut $\text{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z)$, avoiding the need to expand the full Laurent series when only $a_{-1}$ is required.
- LO3: Compute the residue at a **higher-order pole** (order $n>1$) using the generalized formula $\text{Res}(f,z_0)=\dfrac1{(n-1)!}\lim_{z\to z_0}\dfrac{d^{n-1}}{dz^{n-1}}\left[(z-z_0)^n f(z)\right]$, verifying it correctly reduces to the simple-pole formula when $n=1$, and recognizing why the simple-pole shortcut alone gives a wrong (typically divergent) result when misapplied to a higher-order pole.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.laurent-series` (the Laurent expansion $f(z)=\sum_{n=-\infty}^\infty a_n(z-z_0)^n$ in an annulus; the principal part; classifying removable/pole/essential singularities by the principal part's structure).

## Component 3 — Core Explanation

**The residue is simply one specific, named Laurent coefficient**: given $f$'s Laurent series $\sum_{n=-\infty}^\infty a_n(z-z_0)^n$ at an isolated singularity $z_0$, the residue $\text{Res}(f,z_0)$ is DEFINED to be exactly $a_{-1}$ — the coefficient of the $(z-z_0)^{-1}$ term. It is not the whole principal part, not any other negative-power coefficient, and introduces no new theoretical machinery beyond what `math.cx.laurent-series` already established; it simply gives one particular coefficient a name because (as `math.cx.residue-theorem` will show) that one coefficient alone determines the value of a contour integral around $z_0$.

**Simple poles have a fast shortcut, avoiding full series expansion**: for a pole of order 1 (a simple pole), the residue can be computed WITHOUT expanding the Laurent series at all: $\text{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z)$. This works because multiplying by $(z-z_0)$ cancels the single $(z-z_0)^{-1}$ term's singular behavior, leaving a function whose limit at $z_0$ is exactly $a_{-1}$ (all other Laurent terms, having non-negative net power after multiplication, vanish in the limit).

**Higher-order poles need the derivative-and-factorial correction**: for a pole of order $n>1$, simply computing $\lim_{z\to z_0}(z-z_0)f(z)$ does NOT give the residue (it typically diverges, since $(z-z_0)f(z)$ still has a leftover singularity of order $n-1$). Instead, multiply by the FULL factor $(z-z_0)^n$ (removing the entire pole), then differentiate $n-1$ times to isolate the $a_{-1}$ term specifically (differentiation shifts each power down by one and reintroduces factorial factors on the way), then divide by $(n-1)!$ to cancel those factorials: $\text{Res}(f,z_0)=\frac1{(n-1)!}\lim_{z\to z_0}\frac{d^{n-1}}{dz^{n-1}}\left[(z-z_0)^nf(z)\right]$. Setting $n=1$ recovers the simple-pole formula exactly (zero derivatives taken, $(1-1)!=1$), confirming the two formulas are one unified rule, not two unrelated ones.

## Component 4 — Worked Examples

**Example 1 (LO1 — the residue is specifically $a_{-1}$, not the whole principal part, breaking MC-3)**: `math.cx.laurent-series` established that $f(z)=1/z^2$ has Laurent series exactly $z^{-2}$ (a single term, $a_{-2}=1$, and every OTHER coefficient, including $a_{-1}$, is $0$). So $\text{Res}(f,0)=a_{-1}=0$ — even though $f$ has a nontrivial principal part (a genuine pole of order 2), its RESIDUE is specifically zero. This directly refutes treating "the residue" as synonymous with "the principal part" or "any nonzero negative coefficient" — it is the ONE specific coefficient $a_{-1}$, which here happens to vanish.

**Example 2 (LO2 — the simple-pole shortcut avoids full expansion, breaking MC-1)**: Compute $\text{Res}(f,2)$ for $f(z)=\dfrac{e^z}{z-2}$, a simple pole at $z_0=2$. Rather than expanding the full Laurent series of $e^z/(z-2)$ about $z=2$, apply the shortcut directly: $\text{Res}(f,2)=\lim_{z\to2}(z-2)\cdot\dfrac{e^z}{z-2}=\lim_{z\to2}e^z=e^2$. The full Laurent expansion was never needed — the shortcut extracted $a_{-1}=e^2$ directly from the function's algebraic form.

**Example 3 (LO3 — the higher-order-pole formula, and why the simple-pole shortcut fails there, breaking MC-2)**: Compute $\text{Res}(f,0)$ for $f(z)=\dfrac{e^z}{z^3}$, a pole of order $n=3$ at $z_0=0$. WRONG approach (misapplying the simple-pole shortcut): $\lim_{z\to0}(z-0)\cdot\dfrac{e^z}{z^3}=\lim_{z\to0}\dfrac{e^z}{z^2}\to\infty$ — diverges, giving no residue at all. CORRECT approach (the order-3 formula): $\text{Res}(f,0)=\dfrac1{(3-1)!}\lim_{z\to0}\dfrac{d^2}{dz^2}\left[z^3\cdot\dfrac{e^z}{z^3}\right]=\dfrac1{2!}\lim_{z\to0}\dfrac{d^2}{dz^2}\left[e^z\right]=\dfrac12\lim_{z\to0}e^z=\dfrac12$. The simple-pole shortcut fails here precisely because it only removes ONE factor of $(z-z_0)$, leaving a still-singular expression of order $n-1=2$; the full formula removes all $n$ factors before differentiating.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Residue Names One Specific Coefficient, Not the Whole Principal Part (Primitive P11: Representation Shift)

State: "the residue is not 'the singular part' of $f$ in some vague sense — it is the exact number sitting in front of $(z-z_0)^{-1}$, and every other coefficient, however large the principal part, is irrelevant to it." Work Example 1's $1/z^2$ case, where a genuine pole nonetheless has residue exactly $0$.

- **MC-3 hook**: ask "if a function has a large, multi-term principal part, does 'the residue' refer to that whole principal part, or to any of its nonzero negative-power coefficients?" — a "yes" (to either) answer reveals MC-3 (confusing the residue with the principal part or with negative coefficients generally, rather than specifically $a_{-1}$).

### Teaching Action A02 — The Simple-Pole Shortcut Skips the Full Expansion (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\text{Res}(e^z/(z-2),2)=e^2$, obtained instantly via the limit shortcut, with no Laurent series ever written out. State: "for a simple pole, you never need to expand the series at all — the limit formula extracts $a_{-1}$ directly."

- **MC-1 hook**: ask "must you always expand a function's full Laurent series to find its residue?" — a "yes" answer reveals MC-1 (missing that the simple-pole shortcut bypasses full series expansion entirely).

### Teaching Action A03 — Higher-Order Poles Need the Full Factor Removed, Then Differentiation (Primitive P06: Contrast Pair)

Contrast Example 3's two computations side by side: the WRONG simple-pole shortcut (diverges to $\infty$) against the CORRECT order-3 formula (giving $1/2$). State: "the simple-pole formula removes only ONE factor of $(z-z_0)$ — for a pole of order $n$, you must remove all $n$ factors, then differentiate $n-1$ times to isolate $a_{-1}$ specifically, correcting for the factorials differentiation introduces."

- **MC-2 hook**: ask "can the simple-pole shortcut $\lim_{z\to z_0}(z-z_0)f(z)$ be applied directly to a pole of order 3, the same way it's applied to a simple pole?" — a "yes" answer reveals MC-2 (misapplying the order-1 formula to a higher-order pole without the needed extra factor and derivative correction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given that $g(z)$'s Laurent series at $z_0$ has $a_{-3}=4$, $a_{-2}=0$, $a_{-1}=7$, and $a_0=2$, state $\text{Res}(g,z_0)$ directly.
  2. Compute $\text{Res}(f,1)$ for $f(z)=\dfrac{\sin z}{z-1}$, a simple pole at $z_0=1$, using the shortcut formula.
  3. Compute $\text{Res}(f,0)$ for $f(z)=\dfrac{\cos z}{z^2}$, a pole of order 2 at $z_0=0$, using the order-2 formula, and verify what the (incorrect) simple-pole shortcut would have given instead.
  4. Explain why setting $n=1$ in the general order-$n$ residue formula reproduces exactly the simple-pole shortcut formula.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs the residue of a transfer function $H(s)=\dfrac{1}{s^2(s-4)}$ at both of its poles: a simple pole at $s=4$ and a pole of order 2 at $s=0$. (a) Compute $\text{Res}(H,4)$ using the simple-pole shortcut. (b) Compute $\text{Res}(H,0)$ using the order-2 formula, showing the differentiation step explicitly. (c) A colleague suggests using the SAME simple-pole shortcut formula for both poles, arguing 'a limit is a limit, so the same computation should work everywhere.' Using your part (b) computation, explain specifically what goes wrong if the simple-pole shortcut is applied directly to the order-2 pole at $s=0$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RESIDUE-REQUIRES-FULL-LAURENT-EXPANSION | Believing the residue can only be found by expanding the entire Laurent series, missing that shortcut formulas extract $a_{-1}$ directly without full expansion | Foundational |
| MC-2 | SIMPLE-POLE-FORMULA-MISAPPLIED-TO-HIGHER-ORDER-POLE | Applying the simple-pole shortcut $\lim(z-z_0)f(z)$ directly to a pole of order $>1$, without the needed extra factor and derivative correction, producing an incorrect (often divergent) result | Foundational |
| MC-3 | RESIDUE-CONFUSED-WITH-PRINCIPAL-PART | Believing "the residue" refers to the whole principal part or to any negative-power coefficient generally, rather than specifically the single coefficient $a_{-1}$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Residue Requires Full Laurent Expansion") → P41 (detect: ask a student how they would find a simple pole's residue, checking whether they immediately reach for full series expansion rather than the limit shortcut) → P64 (conceptual shift: re-walk Example 2's instant shortcut computation, re-anchoring on "the shortcut extracts $a_{-1}$ directly — no expansion needed for a simple pole").
- **B02 (targets MC-2)**: P27 (name it: "Simple-Pole Formula Misapplied to Higher-Order Pole") → P41 (detect: ask a student to apply the simple-pole shortcut to a known order-3 pole and check whether they proceed without noticing the divergence) → P64 (conceptual shift: re-walk Example 3's side-by-side wrong-vs-correct computation, re-anchoring on "remove ALL $n$ factors, then differentiate $n-1$ times, correcting for factorials").
- **B03 (targets MC-3)**: P27 (name it: "Residue Confused with Principal Part") → P41 (detect: present a function with a multi-term principal part and ask a student to state "the residue," checking whether they name more than just $a_{-1}$) → P64 (conceptual shift: re-walk Example 1's $1/z^2$ case, where the principal part is nonzero but the residue is exactly $0$, re-anchoring on "the residue is one specific coefficient, $a_{-1}$, never the whole principal part").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.laurent-series` (the Laurent expansion this concept's residue is directly extracted from — a specific named coefficient, not new theory).
- **Unlocks**: `math.cx.residue-theorem` (uses the residue computed here directly to evaluate contour integrals via $\oint_C f(z)\,dz=2\pi i\sum\text{Res}$).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at a "3 TAs + gate" tier; the concept is appropriately compact given it introduces no new theoretical machinery beyond `math.cx.laurent-series`, focusing entirely on computational technique (extraction shortcuts) for one already-defined coefficient.
- **Division of labor**: `math.cx.laurent-series` owns the full expansion and the principal-part-based singularity classification. This concept, `math.cx.residue`, deliberately does not re-derive Laurent expansion theory; it owns the PRACTICAL EXTRACTION of one specific coefficient via two closed-form shortcuts (simple-pole and higher-order-pole formulas), explicitly verified to unify into one rule at $n=1$ rather than presented as two separate, unrelated formulas.
- Example 1 deliberately reuses `math.cx.laurent-series`'s own $1/z^2$ example (rather than a new function) specifically to demonstrate the residue-vs-principal-part distinction concretely: a genuine pole with a nonzero principal part can still have residue exactly zero, a fact best shown by direct continuity with already-familiar material rather than a fresh, unfamiliar example.

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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Laurent series; residue extracted directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
