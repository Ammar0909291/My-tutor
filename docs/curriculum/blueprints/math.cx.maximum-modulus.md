# Teaching Blueprint: Maximum Modulus Principle (`math.cx.maximum-modulus`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.maximum-modulus` |
| name | Maximum Modulus Principle |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.cx.analytic-functions`, `math.cx.cauchy-integral-formula` |
| unlocks | none |
| cross_links | `math.de.harmonic-functions` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has holomorphicity and the Cauchy Integral Formula; the task is deriving |f|'s boundary-only-maximum behavior from already-proven real harmonic-function theory |
| description (KG) | If $f$ is holomorphic on a bounded domain $D$ and continuous on $\bar D$, then $|f|$ attains its maximum on the boundary $\partial D$. Non-constant holomorphic function has no interior maximum. Equivalent to: $|f|$ is subharmonic. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize that $|f|$'s maximum-on-the-boundary behavior is NOT an independent new principle to prove from scratch — it follows DIRECTLY from `math.de.harmonic-functions`'s own already-proven maximum principle for REAL harmonic functions, applied to $\log|f(z)|$ (harmonic wherever $f(z)\ne0$, since it is the real part of the holomorphic function $\log f(z)$ locally) — connecting a complex-analysis statement to an already-established real-analysis result.
- LO2: State the theorem precisely: for $f$ holomorphic on a BOUNDED domain $D$ and continuous on the closure $\bar D$, $|f|$ attains its maximum ONLY on the boundary $\partial D$ — and correctly apply it to bound $|f|$ on a specific domain using only its BOUNDARY values, without needing to check every interior point.
- LO3: Apply the sharper NON-CONSTANT clause — if $f$ is non-constant and holomorphic, $|f|$ has NO interior maximum at all (not even a non-strict one, unless $f$ is constant) — to correctly determine, for a specific holomorphic function on a specific domain, whether an apparent interior "maximum" candidate point can genuinely be the true maximum, or whether this already implies $f$ must be constant.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.analytic-functions` (holomorphic $\Leftrightarrow$ analytic in $\mathbb{C}$; power series representability) and `math.cx.cauchy-integral-formula` (recovering interior values of a holomorphic function from its boundary values via the contour integral).

## Component 3 — Core Explanation

**$\log|f|$ is harmonic — this is the entire mechanism connecting complex analysis back to `math.de.harmonic-functions`'s already-proven theory**: wherever $f(z)\ne0$, locally $f(z)=e^{g(z)}$ for some holomorphic $g$ (a local branch of $\log f$), so $\log|f(z)|=\operatorname{Re}(g(z))$ — and the REAL PART of any holomorphic function is automatically HARMONIC (satisfies Laplace's equation $\nabla^2u=0$, a standing fact of complex analysis reused here, not re-derived). So $u=\log|f|$ satisfies EXACTLY the hypotheses of `math.de.harmonic-functions`'s own maximum principle: $u$ is harmonic on $D$, continuous on $\bar D$ (wherever $f\ne0$), and therefore $u$'s maximum occurs ONLY on the boundary $\partial D$ — directly giving $\log|f|$'s maximum-on-boundary behavior, and since $\log$ is increasing, $|f|$ itself inherits the SAME maximum-on-boundary conclusion.

**The theorem, restated using this connection**: for $f$ holomorphic on bounded $D$, continuous on $\bar D$: $|f|$ attains its maximum ONLY on $\partial D$. This is not a separately-proven new fact requiring its own independent machinery — it is `math.de.harmonic-functions`'s maximum principle, TRANSPORTED into complex analysis via the $\log|f|=\operatorname{Re}(g)$ identity. Practically, this means: to BOUND $|f(z)|$ for ALL $z\in D$, it suffices to check $|f|$'s values ONLY on the boundary curve $\partial D$ — a one-dimensional check replacing a two-dimensional (interior) one.

**The non-constant sharpening — an interior maximum forces constancy**: if $f$ is NON-CONSTANT and holomorphic on $D$, then $|f|$ has NO interior maximum whatsoever (not even attained, let alone exceeded) — because if $|f|$ DID attain an interior maximum at some $z_0\in D$, then $\log|f|=\operatorname{Re}(g)$ would attain an interior maximum too, and `math.de.harmonic-functions`'s own maximum principle (via its mean-value-property-based proof) forces a harmonic function attaining an INTERIOR maximum to be CONSTANT throughout — which, via $f=e^g$, would force $|f|$ (and, by a related argument, $f$ itself) to be constant, contradicting the non-constant hypothesis. So observing ANY interior point where $|f|$ seems to reach its overall maximum is itself already strong evidence $f$ must be constant.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying $\log|f|$ is harmonic and inherits the boundary-maximum property, breaking MC-1)**: for $f(z)=z^2$ on the domain $D=\{z:|z|<1\}$ (away from $z=0$, where $f\ne0$): $\log|f(z)|=\log|z^2|=2\log|z|$. Writing $z=x+iy$, $|z|=\sqrt{x^2+y^2}$, direct computation confirms $u=2\log\sqrt{x^2+y^2}$ satisfies $\nabla^2u=0$ away from the origin — HARMONIC, exactly as `math.de.harmonic-functions`'s own theory requires for the maximum principle to apply. By that ALREADY-PROVEN principle, $u=\log|f|$'s maximum on any closed sub-region avoiding the origin occurs only on its boundary — directly transporting to $|f|=|z|^2$ itself attaining its maximum only on the boundary, confirming LO1's claimed connection concretely rather than asserting it abstractly.

**Example 2 (LO2 — bounding $|f|$ using only boundary values, breaking MC-2)**: for $f(z)=z^2+1$ on $D=\{z:|z|<1\}$ (bounded, and $f$ continuous on $\bar D$): rather than checking $|f(z)|$ at every interior point, the theorem guarantees the maximum occurs on $\partial D=\{z:|z|=1\}$. Checking the boundary: for $|z|=1$, write $z=e^{i\theta}$, so $f(z)=e^{2i\theta}+1$, giving $|f(z)|=|e^{2i\theta}+1|$, which by the triangle inequality is at most $|e^{2i\theta}|+|1|=2$, with equality at $\theta=0$ (i.e. $z=1$). So $\max_{\bar D}|f|=2$, attained at the BOUNDARY point $z=1$ — confirmed by direct boundary-only computation, exactly as LO2's theorem application requires, with no interior scan needed.

**Example 3 (LO3 — an apparent interior maximum forcing constancy, breaking MC-3)**: suppose (hypothetically) $f$ is holomorphic and NON-CONSTANT on $D=\{z:|z|<1\}$, and a student observes $|f|$ appears to reach its overall maximum value at an INTERIOR point $z_0=0$. By LO3's non-constant clause, this is IMPOSSIBLE for a genuinely non-constant $f$ — the observation itself is evidence that either (a) $f$ is secretly constant after all, or (b) the apparent interior "maximum" is not actually the TRUE maximum, and checking further (e.g., the boundary values, per Example 2's method) would reveal a strictly LARGER value somewhere on $\partial D$. Concretely: for the genuinely constant function $f(z)=3$, $|f|=3$ EVERYWHERE, including the interior — consistent with the non-constant clause's exception, since $f$ here IS constant.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Maximum Modulus Principle Is `math.de.harmonic-functions`'s Own Theorem, Transported via $\log|f|$ (Primitive P11: Representation Shift)

State: "this isn't a new principle requiring its own independent proof — $\log|f|$ is harmonic wherever $f\ne0$, so `math.de.harmonic-functions`'s already-proven maximum principle applies DIRECTLY to it, and the conclusion transports straight to $|f|$ itself." Walk Example 1's direct harmonicity verification.

- **MC-1 hook**: ask "does the Maximum Modulus Principle require an entirely new, independent proof technique specific to complex analysis, or does it follow directly from `math.de.harmonic-functions`'s already-proven real-harmonic-function theory?" — an "entirely new" answer reveals MC-1 (missing the direct $\log|f|$-is-harmonic connection).

### Teaching Action A02 — Boundary Values Alone Bound $|f|$ Everywhere in $D$ (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the maximum of $|z^2+1|$ over the ENTIRE closed disc was found by checking ONLY the boundary circle, with no interior computation required, and the answer (2, at $z=1$) is provably the true overall maximum. State: "you never need to scan the interior to bound $|f|$ — the theorem GUARANTEES the maximum lives on the boundary, so checking the boundary alone is not a shortcut approximation, it's the complete, exact answer."

- **MC-2 hook**: ask "to find the maximum of $|f|$ over a closed bounded domain, is it necessary to check interior points as well as the boundary, or does checking the boundary alone suffice?" — a "must check interior too" answer reveals MC-2 (missing that the theorem guarantees the boundary alone is sufficient).

### Teaching Action A03 — An Interior Maximum of $|f|$ Forces $f$ to Be Constant (Primitive P06: Contrast Pair)

Contrast the tempting assumption that a non-constant holomorphic function could still happen to have a (non-strict) interior maximum against the sharpened clause's guarantee that this is flatly impossible — any genuine interior maximum FORCES constancy. State: "it's not just that boundary values TEND to be larger — for a genuinely non-constant $f$, $|f|$ CANNOT reach its overall maximum anywhere in the interior, not even tied with a boundary value; spotting an apparent interior maximum is itself a red flag that $f$ must be constant."

- **MC-3 hook**: ask "can a non-constant holomorphic function's $|f|$ attain an interior maximum, as long as that value doesn't exceed the boundary values?" — a "yes, if it doesn't exceed them" answer reveals MC-3 (missing that ANY interior maximum, strict or not, forces constancy for a holomorphic function).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, citing `math.de.harmonic-functions`'s own maximum principle, why $\log|f|$'s maximum-on-boundary behavior directly implies the same for $|f|$ itself.
  2. Find the maximum of $|f(z)|=|3z-1|$ on the closed disc $|z|\le1$, using boundary values only.
  3. Explain why a genuinely non-constant holomorphic function on a bounded domain cannot have $|f|$ attain a maximum at any interior point.
  4. For $f(z)=5$ (a constant function) on $|z|<1$, explain why this does NOT violate the non-constant clause of the theorem.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.de.harmonic-functions`)**: "An engineer modeling a 2D electrostatic potential problem has independently proven (using `math.de.harmonic-functions`'s own maximum principle) that the potential $u$ in a bounded region achieves its extreme values only on the region's boundary. Separately, the engineer is analyzing a holomorphic 'analytic signal' representation $f(z)$ of a related physical quantity on the same bounded region. (a) Using THIS lesson's connection between $\log|f|$ and harmonic functions, explain precisely why the engineer can reuse the ALREADY-PROVEN electrostatic-potential result (rather than deriving a separate maximum principle from scratch) to conclude that $|f|$ also achieves its maximum only on the boundary. (b) If the engineer observes that $|f|$ seems to peak at an interior point of the region, explain what this observation would imply about $f$, citing the non-constant clause. (c) Explain what specifically about $\log|f|$ (rather than $f$ or $|f|$ directly) makes the connection to `math.de.harmonic-functions`'s theory possible."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MAX-MODULUS-ASSUMED-INDEPENDENT-PROOF | Believing the Maximum Modulus Principle requires an entirely new, independent proof specific to complex analysis, missing that it follows directly from `math.de.harmonic-functions`'s already-proven theory via $\log|f|$'s harmonicity | Foundational |
| MC-2 | INTERIOR-CHECK-ASSUMED-NECESSARY-FOR-MAX-MODULUS | Believing finding $|f|$'s maximum over a closed domain requires checking interior points as well as the boundary, missing that the theorem guarantees the boundary alone suffices | High |
| MC-3 | NON-STRICT-INTERIOR-MAXIMUM-ASSUMED-PERMITTED | Believing a non-constant holomorphic function could have $|f|$ attain a non-strict interior maximum (tied with the boundary value), missing that ANY interior maximum forces constancy | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Max Modulus Assumed Independent Proof") → P41 (detect: ask whether the principle requires an entirely new proof or follows from harmonic-function theory) → P64 (conceptual shift: re-walk Example 1's direct $\log|f|$-harmonicity verification).
- **B02 (targets MC-2)**: P27 (name it: "Interior Check Assumed Necessary for Max Modulus") → P41 (detect: ask whether interior points must be checked to find $|f|$'s maximum) → P64 (conceptual shift: re-walk Example 2's boundary-only computation confirmed as the true overall maximum).
- **B03 (targets MC-3)**: P27 (name it: "Non-Strict Interior Maximum Assumed Permitted") → P41 (detect: ask whether a non-constant holomorphic function can have a non-strict interior maximum) → P64 (conceptual shift: re-walk Example 3's constancy-forcing argument).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-functions` (holomorphicity and local power-series representability, underlying the local $f=e^g$ decomposition) and `math.cx.cauchy-integral-formula` (the boundary-recovers-interior machinery that underlies the deeper theory this principle sits within).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.harmonic-functions`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.de.harmonic-functions`'s own maximum principle for real harmonic functions directly in Component 3's $\log|f|$-transport derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the cross-domain connection as the theorem's actual mechanism, LO2 given full computational depth via a boundary-only maximum computation, and LO3 sharpened via the non-constant clause's constancy-forcing consequence.
- **Division of labor**: `math.de.harmonic-functions` already owns the full real-harmonic-function maximum principle (mean value property, boundary-only extrema, Dirichlet uniqueness — verified by grep, its own KG description already lists "maximum/minimum principle" as owned content there). This concept deliberately does NOT re-prove the maximum principle from scratch — it owns the SPECIFIC complex-analysis transport mechanism ($\log|f|$ is harmonic, hence inherits the already-proven boundary-only-maximum behavior) and the sharper non-constant clause specific to holomorphic $f$ (not a general harmonic-function fact, since not every harmonic function arises as $\log|$holomorphic$|$).
- Example 1's deliberate choice to work with $f(z)=z^2$ (avoiding $z=0$ where $\log|f|$ is undefined) makes the harmonicity verification directly computable while honestly acknowledging the $\log|f|$ transport mechanism's domain restriction (it only applies away from $f$'s zeros) — a genuine subtlety of the underlying mechanism, not glossed over.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.harmonic-functions` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has holomorphicity and CIF; task is deriving the boundary-only-maximum result from already-proven real theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
