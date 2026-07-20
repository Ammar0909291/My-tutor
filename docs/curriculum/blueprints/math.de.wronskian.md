# Teaching Blueprint: Wronskian (`math.de.wronskian`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.wronskian` |
| name | Wronskian |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.second-order-homogeneous`, `math.linalg.determinant` |
| unlocks | none |
| cross_links | `math.linalg.linear-independence` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — advanced learner already computes and applies the Wronskian as a one-point independence test; the determinant framing and Abel's theorem are introduced directly |
| description (KG) | $W(y_1,y_2)=y_1y_2'-y_1'y_2$; nonzero at some point iff $y_1$ and $y_2$ are linearly independent. Abel's theorem gives $W(x)=W(x_0)\exp(-\int P\,dx)$. |

## Component 1 — Learning Objectives

- LO1: Recognize $W(y_1,y_2)=y_1y_2'-y_1'y_2$ as EXACTLY `math.linalg.determinant`'s own determinant formula, applied to the $2\times2$ MATRIX $\begin{pmatrix}y_1&y_2\\y_1'&y_2'\end{pmatrix}$ — the Wronskian is not a separate new formula to memorize, but a determinant computation you already know, applied to a specifically constructed matrix of functions and their derivatives.
- LO2: Recognize `math.de.second-order-homogeneous`'s own "check the Wronskian at one point" independence test as a DIRECT instance of `math.linalg.linear-independence`'s general definition — $c_1y_1+c_2y_2=0$ (with derivatives $c_1y_1'+c_2y_2'=0$) forcing $c_1=c_2=0$ is EXACTLY the linear-independence condition, and the Wronskian's nonvanishing is what guarantees this linear system has ONLY the trivial solution.
- LO3 (orientation level — full Abel's theorem derivation deferred): recognize, without full derivation, Abel's theorem $W(x)=W(x_0)\exp\left(-\int P\,dx\right)$ as a GENUINELY POWERFUL shortcut — the Wronskian's ENTIRE behavior (as a function of $x$) can be computed from the ODE's own coefficient $P(x)$ ALONE, without ever knowing $y_1,y_2$ explicitly, previewing why this makes the "check one point suffices" fact from `math.de.second-order-homogeneous` unsurprising: an exponential function is either NEVER zero or IDENTICALLY zero.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-homogeneous` (the Wronskian's role as a one-point-suffices independence test, and the fundamental-set concept) and `math.linalg.determinant` (the determinant as a scalar function satisfying multilinearity/alternating/normalization, with $\det(A)\ne0$ iff $A$ invertible).

## Component 3 — Core Explanation

**The Wronskian IS a determinant, of a specific $2\times2$ matrix**: `math.linalg.determinant` already defines $\det$ for a $2\times2$ matrix $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ as $ad-bc$. Forming the matrix $\begin{pmatrix}y_1&y_2\\y_1'&y_2'\end{pmatrix}$ (functions in the top row, their derivatives in the bottom row) and computing its determinant gives $y_1y_2'-y_2y_1'=W(y_1,y_2)$ — EXACTLY the Wronskian formula. This is not a coincidental notational resemblance; the Wronskian is LITERALLY this determinant, and `math.linalg.determinant`'s own general theory (multilinearity, alternating property, invertibility criterion) applies directly.

**The Wronskian's nonvanishing is precisely `math.linalg.linear-independence`'s own condition, made computable**: `math.linalg.linear-independence` defines independence via $c_1v_1+\cdots+c_kv_k=0\Rightarrow$ all $c_i=0$. For $y_1,y_2$: independence means $c_1y_1+c_2y_2=0$ (as functions) forces $c_1=c_2=0$. Differentiating this equation gives $c_1y_1'+c_2y_2'=0$ too — together, these form a $2\times2$ LINEAR SYSTEM in $c_1,c_2$ with coefficient matrix EXACTLY the Wronskian matrix. This system has ONLY the trivial solution $c_1=c_2=0$ (i.e., genuine independence) precisely when its determinant — the Wronskian — is NONZERO, directly invoking `math.linalg.determinant`'s own invertibility criterion.

**Abel's theorem computes the Wronskian's behavior from $P(x)$ alone, explaining the one-point-suffices fact (orientation level)**: for solutions of `math.de.second-order-homogeneous`'s own $y''+P(x)y'+Q(x)y=0$, Abel's theorem gives $W(x)=W(x_0)\exp\left(-\int_{x_0}^xP(t)\,dt\right)$ — the Wronskian's ENTIRE functional form is determined by $P(x)$ ALONE, without needing to know $y_1,y_2$ explicitly. Since $\exp(\cdot)$ is NEVER zero, this formula immediately explains WHY checking the Wronskian at just ONE point $x_0$ suffices (as `math.de.second-order-homogeneous` already used): if $W(x_0)\ne0$, the exponential factor guarantees $W(x)\ne0$ for EVERY $x$; if $W(x_0)=0$, then $W(x)\equiv0$ everywhere. Full derivation of Abel's theorem (via a first-order linear ODE satisfied by $W$ itself) is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Wronskian as a determinant computation, breaking MC-1)**: for $y_1=e^{2x}$, $y_2=e^{-2x}$: forming the matrix $\begin{pmatrix}e^{2x}&e^{-2x}\\2e^{2x}&-2e^{-2x}\end{pmatrix}$ and computing its determinant via `math.linalg.determinant`'s own $ad-bc$ formula: $e^{2x}(-2e^{-2x})-e^{-2x}(2e^{2x})=-2-2=-4$ — EXACTLY the Wronskian $W(y_1,y_2)=-4$. This is the SAME determinant computation already known, applied to this specific function-and-derivative matrix, not a new independent formula.

**Example 2 (LO2 — the Wronskian's nonvanishing as the linear-independence condition, breaking MC-2)**: for $y_1=e^{2x},y_2=e^{-2x}$ from Example 1: checking `math.linalg.linear-independence`'s condition directly, suppose $c_1e^{2x}+c_2e^{-2x}=0$ for all $x$; differentiating, $2c_1e^{2x}-2c_2e^{-2x}=0$. This is a $2\times2$ linear system in $c_1,c_2$ with coefficient matrix EXACTLY Example 1's Wronskian matrix (evaluated at any $x$, say $x=0$: $\begin{pmatrix}1&1\\2&-2\end{pmatrix}$, determinant $-4\ne0$) — by `math.linalg.determinant`'s own invertibility criterion, this system has ONLY the trivial solution $c_1=c_2=0$, confirming $y_1,y_2$ are genuinely linearly independent, EXACTLY because their Wronskian is nonzero.

**Example 3 (LO3, orientation level — Abel's theorem computing $W(x)$ from $P(x)$ alone, breaking MC-3)**: for the ODE $y''+3y'+2y=0$ (so $P(x)=3$, constant), Abel's theorem gives $W(x)=W(x_0)\exp\left(-\int_{x_0}^x3\,dt\right)=W(x_0)e^{-3(x-x_0)}$. Choosing $x_0=0$: this predicts $W(x)=W(0)e^{-3x}$ — a purely EXPONENTIAL decay/growth pattern, DETERMINED ENTIRELY by $P(x)=3$, without ever solving the ODE for $y_1,y_2$ explicitly. Checking directly: the actual solutions are $y_1=e^{-x},y_2=e^{-2x}$, giving $W(y_1,y_2)=e^{-x}(-2e^{-2x})-(-e^{-x})(e^{-2x})=-2e^{-3x}+e^{-3x}=-e^{-3x}$ — matching Abel's PREDICTED exponential form $W(0)e^{-3x}=(-1)e^{-3x}=-e^{-3x}$ EXACTLY, confirming the formula's predictive power without needing $y_1,y_2$ in advance.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Wronskian Is a Determinant You Already Know How to Compute (Primitive P11: Representation Shift)

State: "the Wronskian formula $y_1y_2'-y_1'y_2$ isn't a new thing to memorize — it's EXACTLY `math.linalg.determinant`'s own $2\times2$ determinant formula, applied to the matrix of functions and their derivatives." Walk Example 1's direct determinant computation.

- **MC-1 hook**: ask "is the Wronskian formula $y_1y_2'-y_1'y_2$ an independent new formula, unrelated to `math.linalg.determinant`'s own determinant computation?" — a "yes" answer reveals MC-1 (missing that the Wronskian IS a $2\times2$ determinant, of the function/derivative matrix).

### Teaching Action A02 — Wronskian Nonvanishing Is Linear Independence, Made Computable (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: checking `math.linalg.linear-independence`'s own condition directly (via the linear system in $c_1,c_2$) leads EXACTLY to the Wronskian as the system's determinant, and its nonvanishing forces the trivial-solution-only conclusion. State: "the Wronskian test isn't a separate, ad hoc trick for functions — it's `math.linalg.linear-independence`'s own general condition, made directly computable via the determinant criterion."

- **MC-2 hook**: ask "is the Wronskian's role as an independence test a separate, ad hoc fact specific to differential equations, unconnected to `math.linalg.linear-independence`'s own general definition?" — a "yes" answer reveals MC-2 (missing that the Wronskian nonvanishing directly IS the linear-independence condition, via the determinant criterion).

### Teaching Action A03 — Abel's Theorem Predicts the Wronskian Without Solving the ODE (Primitive P06: Contrast Pair)

Contrast the NAIVE approach (solve the ODE for $y_1,y_2$ FIRST, then compute the Wronskian directly, as in Example 1) against Example 3's Abel's-theorem approach (predicting $W(x)$'s exact functional form from $P(x)$ ALONE, BEFORE ever solving for $y_1,y_2$). State: "Abel's theorem lets you know the Wronskian's entire behavior in advance, directly from the ODE's own coefficient, without doing the (potentially much harder) work of actually solving for the individual solutions first."

- **MC-3 hook**: ask "does computing the Wronskian's functional form always require first solving the ODE explicitly for $y_1$ and $y_2$?" — a "yes" answer reveals MC-3 (missing that Abel's theorem computes $W(x)$'s form directly from $P(x)$, without needing $y_1,y_2$ explicitly).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the Wronskian of $y_1=\cos(2x)$, $y_2=\sin(2x)$ as a $2\times2$ determinant, showing the matrix explicitly.
  2. Using your answer to problem 1, explain (citing `math.linalg.linear-independence`'s own condition) why $y_1,y_2$ are linearly independent.
  3. For the ODE $y''+5y'+6y=0$ (so $P(x)=5$), use Abel's theorem to predict the Wronskian's functional form, given $W(0)=1$.
  4. Explain, in one or two sentences, why Abel's theorem's exponential form directly explains why checking the Wronskian at just one point suffices.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.linalg.linear-independence`)**: "A control-systems engineer needs to verify that two candidate solutions $y_1,y_2$ to a homogeneous ODE $y''+P(x)y'+Q(x)y=0$ (with $P(x)=2x$) genuinely form a fundamental set, but the solutions themselves are only known numerically (not in closed form) except at $x=0$, where $W(0)=3$. (a) Using Abel's theorem, predict $W(x)$'s functional form for this ODE, without needing $y_1,y_2$'s explicit formulas. (b) Explain, citing `math.linalg.linear-independence`'s own condition and `math.linalg.determinant`'s invertibility criterion, why a nonzero Wronskian at $x=0$ genuinely certifies linear independence, not merely a suggestive numeric coincidence. (c) Explain why the engineer does NOT need to separately check the Wronskian at every other value of $x$ to be confident $y_1,y_2$ remain independent throughout the domain."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | WRONSKIAN-ASSUMED-INDEPENDENT-FORMULA | Believing the Wronskian formula is an independent new formula unrelated to `math.linalg.determinant`'s own determinant computation, missing that it IS a $2\times2$ determinant | Foundational |
| MC-2 | WRONSKIAN-TEST-ASSUMED-AD-HOC | Believing the Wronskian's role as an independence test is a separate, ad hoc fact specific to differential equations, missing that it directly IS `math.linalg.linear-independence`'s own condition | High |
| MC-3 | WRONSKIAN-FORM-ASSUMED-TO-REQUIRE-SOLVING-FIRST | Believing computing the Wronskian's functional form always requires first solving the ODE explicitly, missing that Abel's theorem computes it directly from $P(x)$ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Wronskian Assumed Independent Formula") → P41 (detect: ask whether the Wronskian formula is independent of the determinant computation) → P64 (conceptual shift: re-walk Example 1's direct determinant computation, re-anchoring on "the Wronskian IS a $2\times2$ determinant").
- **B02 (targets MC-2)**: P27 (name it: "Wronskian Test Assumed Ad Hoc") → P41 (detect: ask whether the Wronskian's role as an independence test is a separate ad hoc fact) → P64 (conceptual shift: re-walk Example 2's linear-system derivation, re-anchoring on "directly IS `math.linalg.linear-independence`'s own condition").
- **B03 (targets MC-3)**: P27 (name it: "Wronskian Form Assumed to Require Solving First") → P41 (detect: ask whether computing $W(x)$'s form always requires solving the ODE first) → P64 (conceptual shift: re-walk Example 3's Abel's-theorem prediction verified against the direct computation, re-anchoring on "Abel's theorem computes it directly from $P(x)$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-homogeneous` (the Wronskian's already-established one-point-suffices independence test and fundamental-set concept, which this concept now explains and generalizes) and `math.linalg.determinant` (the general determinant/invertibility theory the Wronskian directly instantiates).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.linear-independence`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.linalg.linear-independence`'s own general condition directly in Component 3's derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/analyze tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the direct determinant computation and the linear-system-based independence derivation) and LO3 kept orientation-level, appropriately previewing Abel's theorem's predictive power without deriving the first-order ODE $W$ itself satisfies.
- **Division of labor**: `math.de.second-order-homogeneous` owns the PRACTICAL one-point-suffices Wronskian test and its use verifying fundamental sets (already fully covered there, not re-derived here); this concept owns EXPLAINING that test structurally — as a determinant (`math.linalg.determinant`) certifying linear independence (`math.linalg.linear-independence`) — and extending it with Abel's theorem's predictive formula. Deliberately reusing `math.de.second-order-homogeneous`'s own style of worked pairs (exponential solution pairs) while adding the NEW determinant-matrix and Abel's-theorem framing not covered there.
- Example 3's deliberate choice to VERIFY Abel's theorem's prediction against a DIRECT computation from the actual solutions (rather than presenting the formula in isolation) was chosen to make the "predicts without solving" claim concretely falsifiable and trustworthy, not merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.linear-independence` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already applies the Wronskian as a one-point test; determinant framing and Abel's theorem introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
