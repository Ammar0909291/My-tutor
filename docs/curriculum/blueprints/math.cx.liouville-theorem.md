# Teaching Blueprint: Liouville's Theorem (`math.cx.liouville-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.liouville-theorem` |
| name | Liouville's Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.cx.higher-derivatives` |
| unlocks | `math.cx.fundamental-theorem-algebra` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has Cauchy's inequality bounding derivative magnitudes; the task is the single decisive application making a bounded ENTIRE function provably constant |
| description (KG) | Every bounded entire function is constant. Proof: Cauchy's inequality gives $f'(z)=0$ everywhere for bounded entire $f$. Sharp contrast with real analysis where bounded non-constant entire functions exist ($\sin$, $\cos$ — but not entire on $\mathbb{R}$ without analogy). |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Prove the theorem DIRECTLY from `math.cx.higher-derivatives`'s own Cauchy's inequality — for $f$ ENTIRE (holomorphic on ALL of $\mathbb{C}$) and BOUNDED ($|f(z)|\le M$ everywhere), apply Cauchy's inequality $|f^{(n)}(z_0)|\le\frac{n!M}{R^n}$ specifically at $n=1$: $|f'(z_0)|\le\frac{M}{R}$ — and correctly recognize that, since $f$ is entire, this bound holds for EVERY radius $R$, no matter how large, forcing $|f'(z_0)|\to0$ as $R\to\infty$, hence $f'(z_0)=0$ EXACTLY.
- LO2: Correctly conclude $f$ is constant from $f'\equiv0$ EVERYWHERE (a standard consequence of the derivative vanishing identically on a connected domain, reused not re-derived) — and correctly apply the CONTRAPOSITIVE of the full theorem to determine, for a specific NON-constant entire function, that it CANNOT be bounded (without needing to verify unboundedness directly by other means).
- LO3: Correctly identify why the theorem's conclusion has NO analogue for functions of a REAL variable — $\sin(x)$ and $\cos(x)$ are bounded, non-constant, and infinitely differentiable on ALL of $\mathbb{R}$ — and precisely explain WHY these do not contradict Liouville's theorem: they are not ENTIRE in the complex sense (as complex functions $\sin(z),\cos(z)$ are genuinely UNBOUNDED on $\mathbb{C}$, growing exponentially along the imaginary axis), making the real-variable "counterexample" a case of a DIFFERENT, non-entire function once genuinely extended to the complex plane.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.higher-derivatives` (every holomorphic function has derivatives of all orders; Cauchy's inequality $|f^{(n)}(z_0)|\le n!M/R^n$ for $|f|\le M$ on $|z-z_0|=R$).

## Component 3 — Core Explanation

**The proof is a single, decisive application of Cauchy's inequality at $n=1$, letting $R\to\infty$**: `math.cx.higher-derivatives`'s own Cauchy's inequality, applied with $n=1$, gives $|f'(z_0)|\le\frac{M}{R}$ for ANY circle of radius $R$ centered at $z_0$ on which $|f|\le M$. Since $f$ is ENTIRE (holomorphic on ALL of $\mathbb{C}$, with NO singularities anywhere to restrict how large $R$ can be), and BOUNDED (the SAME bound $M$ works on EVERY circle, no matter how large), this inequality holds for arbitrarily large $R$. As $R\to\infty$, the right side $\frac{M}{R}\to0$ — forcing $|f'(z_0)|=0$, i.e. $f'(z_0)=0$ EXACTLY, for this arbitrarily chosen point $z_0$. Since $z_0$ was ARBITRARY, $f'\equiv0$ EVERYWHERE on $\mathbb{C}$.

**$f'\equiv0$ everywhere forces $f$ to be constant — and the contrapositive gives a genuine test for unboundedness**: a standard fact (reused, not re-derived here) states that a function with identically vanishing derivative on a CONNECTED domain must be constant (the same logic as the real-variable fact that a zero-derivative function is constant, extended to $\mathbb{C}$, itself connected). So $f'\equiv0$ directly forces $f\equiv c$ for some constant $c$. The theorem's CONTRAPOSITIVE is often more directly USEFUL: if an entire function is KNOWN to be non-constant, it CANNOT be bounded — a genuinely powerful conclusion, since it certifies unboundedness WITHOUT needing to directly analyze the function's growth.

**Real-variable "counterexamples" like $\sin(x),\cos(x)$ are not genuine counterexamples — extended to $\mathbb{C}$, they are UNBOUNDED**: on $\mathbb{R}$ alone, $\sin(x)$ and $\cos(x)$ are bounded, non-constant, and infinitely differentiable — seemingly contradicting Liouville's theorem's spirit. But Liouville's theorem is specifically about ENTIRE functions — holomorphic on ALL of $\mathbb{C}$, not merely infinitely real-differentiable on $\mathbb{R}$. Extending $\sin,\cos$ to genuine complex functions $\sin(z),\cos(z)$ (via their power series, which converge everywhere, making them entire): $\sin(iy)=i\sinh(y)$ and $\cos(iy)=\cosh(y)$, BOTH of which grow EXPONENTIALLY as $y\to\infty$ along the imaginary axis — so $\sin(z),\cos(z)$ are genuinely UNBOUNDED on $\mathbb{C}$, entirely consistent with Liouville's theorem (a bounded entire function must be constant; these are entire but NOT bounded, so the theorem simply does not apply to them, and no contradiction arises).

## Component 4 — Worked Examples

**Example 1 (LO1 — the $R\to\infty$ argument applied concretely, breaking MC-1)**: suppose $f$ is entire with $|f(z)|\le7$ for ALL $z\in\mathbb{C}$ (a hypothetically bounded entire function). Applying Cauchy's inequality at $n=1$, for ANY $z_0$ and ANY radius $R$: $|f'(z_0)|\le\frac{1!\times7}{R}=\frac7R$. Checking specific values: at $R=100$, $|f'(z_0)|\le0.07$; at $R=10000$, $|f'(z_0)|\le0.0007$; at $R=10^9$, $|f'(z_0)|\le7\times10^{-9}$ — the bound shrinks WITHOUT limit as $R$ grows, and since $f$ is entire (no obstruction to choosing $R$ arbitrarily large), $|f'(z_0)|$ must be smaller than EVERY positive number, forcing $f'(z_0)=0$ EXACTLY — confirming LO1's argument concretely with genuine numeric intuition for why the bound forces exact vanishing, not merely smallness.

**Example 2 (LO2 — applying the contrapositive to certify unboundedness, breaking MC-2)**: consider $f(z)=z^2+1$ — a POLYNOMIAL, hence entire (polynomials have no singularities anywhere), and clearly NON-CONSTANT (e.g. $f(0)=1\ne5=f(2)$). By the theorem's CONTRAPOSITIVE (non-constant entire $\Rightarrow$ NOT bounded): $f(z)=z^2+1$ must be UNBOUNDED on $\mathbb{C}$ — a conclusion reached WITHOUT directly analyzing $f$'s growth (though it IS directly verifiable here: $|f(z)|\to\infty$ as $|z|\to\infty$, confirming the contrapositive's conclusion concretely) — demonstrating LO2's genuinely useful shortcut: entire and non-constant is ALREADY enough to certify unboundedness, in general, even for functions whose growth might be harder to verify directly.

**Example 3 (LO3 — verifying $\sin(z)$'s genuine unboundedness on $\mathbb{C}$, resolving the apparent contradiction, breaking MC-3)**: using the identity $\sin(iy)=i\sinh(y)=i\cdot\frac{e^y-e^{-y}}2$: at $y=10$, $|\sin(10i)|=|\sinh(10)|=\frac{e^{10}-e^{-10}}2\approx11013$ — already enormous. At $y=20$: $|\sin(20i)|\approx\frac{e^{20}}2\approx2.4\times10^8$ — growing EXPONENTIALLY without bound as $y\to\infty$. So $\sin(z)$, viewed as a genuine COMPLEX function (not merely its restriction to the real axis, where it stays bounded between $-1$ and $1$), is UNBOUNDED on $\mathbb{C}$ — confirming Liouville's theorem is entirely CONSISTENT with $\sin(z)$'s existence: $\sin(z)$ is entire and non-constant, and per the theorem's contrapositive (verified independently here by DIRECT computation), it must be (and genuinely is) unbounded — resolving LO3's apparent contradiction concretely.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Proof Is One Decisive Application of Cauchy's Inequality, Letting $R\to\infty$ (Primitive P11: Representation Shift)

State: "the entire proof is just `math.cx.higher-derivatives`'s own Cauchy's inequality, applied at $n=1$, and then noticing that entirety lets you take $R$ as large as you like — the bound $M/R$ shrinks to exactly zero, forcing $f'=0$." Walk Example 1's concrete numeric progression as $R$ grows.

- **MC-1 hook**: ask "does Liouville's theorem require an entirely new, independent proof technique, or does it follow directly from `math.cx.higher-derivatives`'s own Cauchy's inequality, applied cleverly?" — an "entirely new technique" answer reveals MC-1 (missing the direct, single-application derivation from the already-known inequality).

### Teaching Action A02 — The Contrapositive Certifies Unboundedness Without Direct Growth Analysis (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f(z)=z^2+1$'s unboundedness is CERTIFIED by the theorem's contrapositive (entire + non-constant $\Rightarrow$ unbounded) — a conclusion reachable IMMEDIATELY, without needing the direct growth verification also shown (which confirms, but was not strictly necessary for, the conclusion). State: "the contrapositive is often the MORE useful direction in practice — knowing a function is entire and non-constant is ALREADY enough to certify it must be unbounded, without any direct growth analysis."

- **MC-2 hook**: ask "to conclude a specific entire, non-constant function is unbounded, is direct analysis of its growth rate always necessary, or does the theorem's contrapositive certify this immediately?" — a "direct growth analysis always necessary" answer reveals MC-2 (missing the theorem's contrapositive as a direct, immediate certification).

### Teaching Action A03 — Real-Variable "Counterexamples" Become Genuinely Unbounded Once Properly Extended to $\mathbb{C}$ (Primitive P06: Contrast Pair)

Contrast $\sin(x),\cos(x)$'s bounded behavior on the REAL axis alone against Example 3's direct computation showing $\sin(iy)$ grows EXPONENTIALLY along the imaginary axis. State: "these functions LOOK like counterexamples if you only ever look at the real axis — but genuinely extended to all of $\mathbb{C}$ (which is what 'entire' actually means), they are provably unbounded, and Liouville's theorem never claimed anything about functions restricted to $\mathbb{R}$ alone."

- **MC-3 hook**: ask "do $\sin(z)$ and $\cos(z)$, properly understood as entire functions on the whole complex plane, genuinely contradict Liouville's theorem (being bounded, non-constant, and entire simultaneously), or are they in fact unbounded once extended beyond the real axis?" — a "genuinely contradict the theorem" answer reveals MC-3 (missing that these functions are unbounded on $\mathbb{C}$, resolving the apparent contradiction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State Liouville's theorem precisely, and explain in your own words why the $R\to\infty$ step in its proof is the crucial move.
  2. Explain why the polynomial $f(z)=5z^3-2$ must be unbounded on $\mathbb{C}$, citing the theorem's contrapositive directly.
  3. Compute $|\cos(15i)|$ using $\cos(iy)=\cosh(y)$, and confirm it is a large, non-bounded value.
  4. Explain precisely why $f(z)=\sin(z)$ being unbounded on $\mathbb{C}$ (despite $\sin(x)$ being bounded on $\mathbb{R}$) does not contradict Liouville's theorem.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A student is trying to construct a genuinely bounded, non-constant ENTIRE function (holomorphic on all of $\mathbb{C}$, with $|f(z)|\le K$ for some constant $K$ and all $z\in\mathbb{C}$), hoping to find a counterexample to Liouville's theorem. (a) Explain, citing this lesson's proof directly, why ANY attempt at such a construction is guaranteed to fail — what would go wrong at the mathematical level if such a function genuinely existed. (b) The student proposes $f(z)=\frac1{z^2+1}$ as a candidate (bounded away from its two poles at $z=\pm i$). Explain specifically why this function does NOT satisfy the theorem's hypotheses, and hence poses no threat to the theorem. (c) Explain how this connects to `math.cx.fundamental-theorem-algebra`'s own eventual use of Liouville's theorem (previewed only conceptually here, not derived) — specifically, why assuming a polynomial has NO roots leads to a contradiction via Liouville's theorem applied to $1/p(z)$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LIOUVILLE-PROOF-ASSUMED-ENTIRELY-NEW-TECHNIQUE | Believing Liouville's theorem requires an entirely new, independent proof technique, missing that it follows directly from `math.cx.higher-derivatives`'s own Cauchy's inequality applied at $n=1$ with $R\to\infty$ | Foundational |
| MC-2 | UNBOUNDEDNESS-ASSUMED-TO-NEED-DIRECT-GROWTH-ANALYSIS | Believing certifying an entire, non-constant function's unboundedness always requires direct growth analysis, missing that the theorem's contrapositive certifies this immediately | High |
| MC-3 | SIN-COS-ASSUMED-TO-GENUINELY-CONTRADICT-THEOREM | Believing $\sin(z),\cos(z)$ genuinely contradict Liouville's theorem (bounded, non-constant, entire simultaneously), missing that they are unbounded once genuinely extended to $\mathbb{C}$ | High |

- **B01 (targets MC-1)**: P27 (name it: "Liouville Proof Assumed Entirely New Technique") → P41 (detect: ask whether the proof is entirely new or follows from Cauchy's inequality) → P64 (conceptual shift: re-walk Example 1's concrete $R\to\infty$ numeric progression).
- **B02 (targets MC-2)**: P27 (name it: "Unboundedness Assumed to Need Direct Growth Analysis") → P41 (detect: ask whether certifying unboundedness always requires direct growth analysis) → P64 (conceptual shift: re-walk Example 2's immediate contrapositive certification).
- **B03 (targets MC-3)**: P27 (name it: "Sin/Cos Assumed to Genuinely Contradict Theorem") → P41 (detect: ask whether $\sin(z),\cos(z)$ genuinely contradict the theorem) → P64 (conceptual shift: re-walk Example 3's direct computation of $\sin(z)$'s exponential growth along the imaginary axis).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.higher-derivatives` (Cauchy's inequality, the single mechanism this concept's entire proof directly reuses).
- **Unlocks**: `math.cx.fundamental-theorem-algebra` (proving every non-constant polynomial has a root, via applying THIS concept's theorem to $1/p(z)$ under the assumption of no roots, previewed conceptually in the P76 transfer probe).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 grounding the proof entirely in the already-known Cauchy's inequality, LO2 given full depth via the theorem's genuinely useful contrapositive, and LO3 resolving a specific, memorable apparent contradiction.
- **Division of labor**: `math.cx.higher-derivatives` already owns Cauchy's inequality itself (verified by grep — no Liouville-specific content found there). This concept owns the SINGLE decisive application of that inequality (letting $R\to\infty$), the contrapositive's practical unboundedness-certification use, and the real-vs-complex resolution of the $\sin,\cos$ apparent counterexample — genuinely new content built entirely on the prerequisite's own machinery.
- Example 3's deliberate choice to VERIFY $\sin(z)$'s unboundedness by DIRECT computation (rather than merely asserting it) was made to give LO3's resolution concrete, checkable support — the exponential growth along the imaginary axis is a specific, computable fact, not an appeal to authority.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.cx.fundamental-theorem-algebra`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has Cauchy's inequality; task is the single decisive application making bounded entire functions constant) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
