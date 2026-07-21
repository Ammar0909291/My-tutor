# Teaching Blueprint: Stability Analysis (`math.de.stability-analysis`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.stability-analysis` |
| name | Stability Analysis |
| domain | Differential Equations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.de.phase-plane` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already classifies equilibria by TYPE (node/saddle/spiral/center) via eigenvalues; the task is the sharper STABILITY question, and a genuinely different global technique for when linearization fails |
| description (KG) | Classification of equilibria of ODEs: stable (Lyapunov), asymptotically stable, or unstable. Linearization near equilibria using the Jacobian determines local stability; Lyapunov functions give global results. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Distinguish this concept's STABILITY question (do NEARBY trajectories stay near, or return to, the equilibrium?) from `math.de.phase-plane`'s own equilibrium TYPE classification (node/saddle/spiral/center) — recognizing that TYPE and STABILITY are closely related but NOT identical questions: nodes and spirals can be either stable OR unstable depending on the SIGN of the eigenvalues' real part, while saddles are ALWAYS unstable and centers are (Lyapunov) stable but never asymptotically stable — and correctly determine an equilibrium's stability CATEGORY from `math.de.phase-plane`'s own already-computed eigenvalues.
- LO2: Precisely distinguish LYAPUNOV stability (nearby trajectories stay CLOSE to the equilibrium forever, without necessarily approaching it) from ASYMPTOTIC stability (nearby trajectories stay close AND eventually converge TO the equilibrium) — and correctly classify a specific equilibrium (given its eigenvalues) into one of: asymptotically stable, (merely) Lyapunov stable, or unstable, using the precise sign/type conditions on the eigenvalues.
- LO3: Construct and apply a simple Lyapunov function to determine GLOBAL stability for a nonlinear system where LINEARIZATION genuinely fails to determine stability (the borderline case of PURELY IMAGINARY eigenvalues, where the linear approximation alone cannot distinguish a center from a spiral) — correctly verifying the Lyapunov function's required properties (positive definite, with derivative along trajectories non-positive) for a specific example.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.phase-plane` (constructing phase portraits; classifying equilibria into nodes/saddles/spirals/centers via the linearization's Jacobian eigenvalues).

## Component 3 — Core Explanation

**Stability asks a SHARPER question than `math.de.phase-plane`'s own type classification**: `math.de.phase-plane`'s own eigenvalue-based classification determines the equilibrium's GEOMETRIC type (node, saddle, spiral, center) — but STABILITY asks specifically whether trajectories starting NEAR the equilibrium stay near it (or return to it) as time progresses. These questions are RELATED but not identical: a NODE can be either stable (eigenvalues both negative — trajectories flow IN) or unstable (both positive — trajectories flow OUT), and similarly a SPIRAL can spiral IN (stable) or OUT (unstable) depending on the SIGN of the real part; a SADDLE is ALWAYS unstable (one eigendirection always repels, regardless of the other); a CENTER is (merely) Lyapunov stable but NEVER asymptotically stable (trajectories orbit forever, neither approaching nor escaping).

**Lyapunov stability vs. asymptotic stability — a precise, genuinely different distinction**: an equilibrium is LYAPUNOV STABLE if trajectories starting sufficiently close STAY within any prescribed small distance of the equilibrium for ALL future time (they don't necessarily approach it, just don't wander far) — a CENTER is the standard example (orbits stay at a fixed distance forever). An equilibrium is ASYMPTOTICALLY STABLE if it is Lyapunov stable AND ADDITIONALLY nearby trajectories eventually CONVERGE to the equilibrium as $t\to\infty$ — a stable NODE or stable SPIRAL both satisfy this stronger condition. The precise correspondence with `math.de.phase-plane`'s own eigenvalues: BOTH eigenvalues' real parts strictly negative gives asymptotic stability; purely imaginary eigenvalues (the center case) give Lyapunov stability WITHOUT asymptotic stability; any eigenvalue with strictly positive real part (or a saddle's inherently mixed signs) gives instability.

**Lyapunov functions determine GLOBAL stability precisely where linearization fails — the purely-imaginary-eigenvalue borderline case**: `math.de.phase-plane`'s own linearization technique determines stability CONCLUSIVELY when the linearized eigenvalues have NONZERO real part — but when the linearization gives PURELY IMAGINARY eigenvalues (predicting a "center" for the LINEAR approximation), the actual NONLINEAR system's true behavior is genuinely AMBIGUOUS from linearization alone — it could be a genuine center, or a slowly spiraling stable/unstable trajectory that the linear approximation is too crude to distinguish. A LYAPUNOV FUNCTION $V(x,y)$ — a function that is POSITIVE everywhere near the equilibrium except AT the equilibrium (where it's zero), with $\dot V$ (its rate of change ALONG system trajectories, computed via the chain rule using the system's own equations) provably NON-POSITIVE — directly certifies stability WITHOUT needing linearization at all, resolving precisely the cases where the linear approximation is inconclusive.

## Component 4 — Worked Examples

**Example 1 (LO1 — distinguishing type from stability using already-computed eigenvalues, breaking MC-1)**: for `math.de.phase-plane`'s own Example 2 system ($x'=x-y,y'=x+y$, equilibrium at the origin, ALREADY classified there as a spiral via eigenvalues $\lambda=1\pm i$): the REAL PART of these eigenvalues is $+1$ — STRICTLY POSITIVE. So this spiral is UNSTABLE (trajectories spiral AWAY from the origin, not toward it) — a conclusion requiring the SAME eigenvalues already computed there, but asking the ADDITIONAL, sharper stability question (sign of the real part), not merely the type (spiral) that concept's own classification already settled.

**Example 2 (LO2 — the precise Lyapunov-vs-asymptotic distinction, applied to specific eigenvalue cases, breaking MC-2)**: three equilibria with different eigenvalue structures: (a) $\lambda=-2,-3$ (both real, both negative) — ASYMPTOTICALLY STABLE (a stable node; trajectories both stay close AND converge to the equilibrium). (b) $\lambda=\pm3i$ (purely imaginary) — Lyapunov STABLE but NOT asymptotically stable (a center; trajectories orbit at a fixed distance forever, staying close but never converging). (c) $\lambda=2,-1$ (real, opposite signs) — UNSTABLE (a saddle; the positive eigenvalue's eigendirection guarantees some nearby trajectories move away, regardless of the other direction's attraction) — confirming LO2's precise three-way classification concretely across genuinely different eigenvalue structures.

**Example 3 (LO3 — constructing a Lyapunov function where linearization is inconclusive, breaking MC-3)**: for the nonlinear system $x'=-y-x^3,y'=x-y^3$ (equilibrium at the origin): linearizing gives the Jacobian $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ at the origin, with eigenvalues $\lambda=\pm i$ — PURELY IMAGINARY, so linearization ALONE cannot determine whether the true nonlinear system is a genuine center or actually spirals (in either direction). Trying $V(x,y)=x^2+y^2$ (positive everywhere except zero at the origin, satisfying the required positivity property): computing $\dot V=2x\dot x+2y\dot y=2x(-y-x^3)+2y(x-y^3)=-2xy-2x^4+2xy-2y^4=-2x^4-2y^4$ — STRICTLY NEGATIVE everywhere except at the origin (where it's exactly zero) — certifying the origin is ACTUALLY ASYMPTOTICALLY STABLE (not merely a center, resolving the linearization's ambiguity), since $V$ strictly DECREASES along every trajectory, forcing trajectories to approach the equilibrium.

## Component 5 — Teaching Actions

### Teaching Action A01 — Type and Stability Are Related But Not Identical Questions (Primitive P11: Representation Shift)

State: "`math.de.phase-plane`'s own type classification (node, saddle, spiral, center) tells you the GEOMETRIC shape near an equilibrium — stability asks the SHARPER question of whether nearby trajectories actually stay near or return; the SAME eigenvalues answer both, but you need to look at a DIFFERENT feature (the sign of the real part) for stability." Walk Example 1's direct sign-based stability determination.

- **MC-1 hook**: ask "does knowing an equilibrium's TYPE (e.g. 'it's a spiral') automatically tell you whether it's stable or unstable, without checking anything further?" — a "yes, type alone determines stability" answer reveals MC-1 (missing that both stable and unstable spirals/nodes exist, distinguished by the eigenvalues' real-part sign).

### Teaching Action A02 — Lyapunov Stability and Asymptotic Stability Are Precisely Different — the Center Case Proves It (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: case (b)'s purely imaginary eigenvalues give a center that is Lyapunov stable (trajectories stay close) but genuinely NOT asymptotically stable (they never converge, orbiting forever). State: "these aren't two names for the same thing — a center is the standing example of Lyapunov stability WITHOUT asymptotic stability, staying close forever without ever actually arriving."

- **MC-2 hook**: ask "does Lyapunov stability (staying close) automatically imply asymptotic stability (eventually converging), or can an equilibrium be stable in the Lyapunov sense without ever being approached?" — a "Lyapunov stability implies asymptotic stability" answer reveals MC-2 (missing the center case's genuine distinction).

### Teaching Action A03 — Lyapunov Functions Resolve Exactly the Cases Linearization Cannot (Primitive P06: Contrast Pair)

Contrast `math.de.phase-plane`'s own linearization approach (INCONCLUSIVE for Example 3's purely-imaginary-eigenvalue case) against the SAME example's Lyapunov-function approach, which DIRECTLY certifies asymptotic stability via $\dot V=-2x^4-2y^4<0$. State: "linearization works great when the eigenvalues have nonzero real part — but when they're purely imaginary, it simply can't tell you the true nonlinear behavior; a Lyapunov function sidesteps this entirely, working directly with the nonlinear equations."

- **MC-3 hook**: ask "when linearization gives purely imaginary eigenvalues (an inconclusive borderline case), is there any further technique available to determine the true nonlinear system's stability, or must the question remain unresolved?" — a "must remain unresolved" answer reveals MC-3 (missing that Lyapunov functions can resolve exactly this borderline case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For an equilibrium with eigenvalues $\lambda=-1,-4$, determine its type (using `math.de.phase-plane`'s own classification) AND its stability category.
  2. For an equilibrium with eigenvalues $\lambda=\pm5i$, explain precisely why it is Lyapunov stable but not asymptotically stable.
  3. For the system $x'=-x^3,y'=-y^3$, compute the Jacobian eigenvalues at the origin, and explain why linearization alone is inconclusive.
  4. For problem 3's system, verify $V(x,y)=x^2+y^2$ is a valid Lyapunov function, computing $\dot V$ explicitly.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A robotics engineer designs a control system intended to bring a robotic arm to rest at a target position (the equilibrium), and linearizing the closed-loop system's dynamics near this target gives purely imaginary eigenvalues — an inconclusive result via `math.de.phase-plane`'s own linearization method alone. (a) Explain why the engineer cannot conclude the arm will actually settle at the target from the linearization alone, referencing the ambiguity between a genuine center and a slow spiral. (b) Explain what property a candidate Lyapunov function (e.g., related to the system's total energy) would need to satisfy to CERTIFY the arm genuinely settles at the target (asymptotic stability), rather than merely orbiting nearby forever. (c) Explain why finding such a Lyapunov function, if successful, would give the engineer a STRONGER guarantee than simply observing the arm's trajectory in simulation for a fixed amount of time."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUILIBRIUM-TYPE-ASSUMED-TO-DETERMINE-STABILITY-ALONE | Believing an equilibrium's TYPE (node, saddle, spiral, center) alone determines its stability without further checking, missing that stable and unstable versions of nodes/spirals both exist | Foundational |
| MC-2 | LYAPUNOV-STABILITY-ASSUMED-TO-IMPLY-ASYMPTOTIC-STABILITY | Believing Lyapunov stability (staying close) automatically implies asymptotic stability (eventually converging), missing the center case's genuine distinction | High |
| MC-3 | LINEARIZATION-INCONCLUSIVE-CASE-ASSUMED-UNRESOLVABLE | Believing that when linearization gives purely imaginary eigenvalues (an inconclusive result), no further technique can resolve the true nonlinear system's stability | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Equilibrium Type Assumed to Determine Stability Alone") → P41 (detect: ask whether type alone determines stability) → P64 (conceptual shift: re-walk Example 1's sign-based stability determination on an already-classified spiral).
- **B02 (targets MC-2)**: P27 (name it: "Lyapunov Stability Assumed to Imply Asymptotic Stability") → P41 (detect: ask whether Lyapunov stability implies asymptotic stability) → P64 (conceptual shift: re-walk Example 2's center case, staying close but never converging).
- **B03 (targets MC-3)**: P27 (name it: "Linearization Inconclusive Case Assumed Unresolvable") → P41 (detect: ask whether the purely-imaginary-eigenvalue case can be resolved at all) → P64 (conceptual shift: re-walk Example 3's direct Lyapunov-function certification).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.phase-plane` (equilibrium classification via linearization eigenvalues, this concept's stability question directly builds on and sharpens).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 sharpening `math.de.phase-plane`'s own type classification into the stability question, LO2 given full depth via the precise Lyapunov-vs-asymptotic distinction, and LO3 demonstrating a genuinely different technique for linearization's borderline failure case.
- **Division of labor**: `math.de.phase-plane` already owns equilibrium type classification via linearization eigenvalues (verified by grep — no Lyapunov-stability terminology or Lyapunov-function content found there). This concept owns the SHARPER stability question (distinct from mere type), the precise Lyapunov-vs-asymptotic distinction, and Lyapunov functions as a genuinely different technique resolving linearization's inconclusive borderline case.
- Example 1's deliberate reuse of `math.de.phase-plane`'s own already-classified spiral example (rather than a fresh equilibrium) was chosen to make explicit that the SAME eigenvalues already computed there directly answer this concept's sharper stability question too, once the additional sign-of-real-part feature is examined — reinforcing that this concept builds on, rather than replaces, that concept's own computation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already classifies equilibria by type; task is the sharper stability question and Lyapunov functions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
