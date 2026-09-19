# math.de.wronskian

## Identity
- **KG id**: `math.de.wronskian`
- **Domain**: math.de
- **Requires**: `math.de.second-order-homogeneous`, `math.linalg.determinant`
- **Unlocks**: none
- **Cross-links**: `math.linalg.linear-independence`
- **Difficulty**: advanced
- **Bloom level**: apply (Blueprint's own Component 0 stated `analyze` — the live KG's current
  `apply` used as authoritative, see Curriculum Feedback)
- **Mastery threshold**: 0.85 (Blueprint's own Component 0 stated `0.75` — the live KG's current
  value used as authoritative, see Curriculum Feedback)
- **Estimated hours**: 3 (Blueprint's own Component 0 stated `5` — the live KG's current value
  used as authoritative, see Curriculum Feedback)

## Learning Objective
Recognize $W(y_1,y_2)=y_1y_2'-y_1'y_2$ as EXACTLY `math.linalg.determinant`'s own $2\times2$
determinant, applied to the matrix $\begin{pmatrix}y_1&y_2\\y_1'&y_2'\end{pmatrix}$ — never a
separate formula to memorize; recognize the Wronskian's nonvanishing as a DIRECT instance of
`math.linalg.linear-independence`'s general condition, made computable via the determinant
invertibility criterion; and recognize (orientation level) Abel's theorem
$W(x)=W(x_0)\exp(-\int P\,dx)$ as computing the Wronskian's entire behavior from $P(x)$ alone,
explaining why checking one point suffices.

## Core Understanding
THE WRONSKIAN IS A DETERMINANT — NEVER A SEPARATE, INDEPENDENT FORMULA: for
$y_1=e^{2x},y_2=e^{-2x}$: forming $\begin{pmatrix}e^{2x}&e^{-2x}\\2e^{2x}&-2e^{-2x}\end{pmatrix}$
and computing its determinant via the SAME $ad-bc$ formula already known:
$e^{2x}(-2e^{-2x})-e^{-2x}(2e^{2x})=-2-2=-4$ — EXACTLY the Wronskian. This is the identical
determinant computation applied to a matrix of functions and their derivatives, not a new
independent tool.

WRONSKIAN NONVANISHING IS LITERALLY THE LINEAR-INDEPENDENCE CONDITION, MADE COMPUTABLE — NEVER AN
AD HOC ODE-SPECIFIC FACT: checking $c_1e^{2x}+c_2e^{-2x}=0$ for all $x$, differentiating gives
$2c_1e^{2x}-2c_2e^{-2x}=0$ too — a $2\times2$ linear system in $c_1,c_2$ whose coefficient matrix
is EXACTLY the Wronskian matrix. By the determinant's own invertibility criterion, this system has
ONLY the trivial solution $c_1=c_2=0$ precisely when the Wronskian is nonzero — so the Wronskian
test DIRECTLY IS the linear-independence definition, not a separate tool that happens to work.

ABEL'S THEOREM COMPUTES THE WRONSKIAN'S ENTIRE BEHAVIOR FROM $P(x)$ ALONE — NEVER REQUIRING
SOLVING THE ODE FIRST: for $y''+3y'+2y=0$ ($P(x)=3$): Abel's theorem predicts
$W(x)=W(0)e^{-3x}$, DETERMINED ENTIRELY BY $P(x)=3$, without knowing $y_1,y_2$ in advance.
Checking directly against the actual solutions $y_1=e^{-x},y_2=e^{-2x}$:
$W=e^{-x}(-2e^{-2x})-(-e^{-x})(e^{-2x})=-e^{-3x}$ — matching the PREDICTED form
$W(0)e^{-3x}=(-1)e^{-3x}$ exactly. Since $\exp(\cdot)$ is NEVER zero, this immediately explains
why one-point checking suffices: $W$ is either never zero or identically zero, with nothing in
between.

## Mental Models
- **"The Wronskian isn't new math — it's a determinant you already compute, applied to a matrix
  built from two functions and their derivatives."**
- **"Wronskian nonvanishing doesn't just correlate with independence — it IS independence, seen
  through the determinant's invertibility lens."**

## Why Students Fail

### MC-1: WRONSKIAN-ASSUMED-INDEPENDENT-FORMULA
- **Surface form**: believes the Wronskian formula is independent of, and unrelated to,
  `math.linalg.determinant`'s own determinant computation.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the Wronskian is
  usually introduced by its formula alone, without connecting it to the general determinant
  concept).
- **Repair**: re-walk the direct $2\times2$ determinant computation for $e^{2x},e^{-2x}$,
  confirming it IS the Wronskian.

### MC-2: WRONSKIAN-TEST-ASSUMED-AD-HOC
- **Surface form**: believes the Wronskian's role as an independence test is a separate, ad hoc
  fact specific to differential equations.
- **Birth type**: High severity (Blueprint's own declared severity — the Wronskian test is
  typically taught as a standalone ODE tool, obscuring its origin in general linear-independence
  theory).
- **Repair**: re-derive the linear system in $c_1,c_2$ whose coefficient matrix is the Wronskian
  matrix, confirming nonvanishing forces the trivial-solution-only conclusion.

### MC-3: WRONSKIAN-FORM-ASSUMED-TO-REQUIRE-SOLVING-FIRST
- **Surface form**: believes computing the Wronskian's functional form always requires first
  solving the ODE explicitly for $y_1,y_2$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — computing a quantity from
  known functions feels like it should always require having those functions first).
- **Repair**: re-walk Abel's theorem's prediction for $y''+3y'+2y=0$, verified exactly against the
  direct computation without needing $y_1,y_2$ in advance.

## Misconceptions

### MC-1: WRONSKIAN-ASSUMED-INDEPENDENT-FORMULA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: WRONSKIAN-TEST-ASSUMED-AD-HOC
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: WRONSKIAN-FORM-ASSUMED-TO-REQUIRE-SOLVING-FIRST
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Wronskian is the determinant wearing a differential-equations costume — same tool,
  different application."**
- **Anti-analogy**: Abel's theorem is NOT a formula you can only apply after already solving the
  ODE — it predicts the Wronskian's shape directly from the coefficient $P(x)$, before any solving
  happens.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $2\times2$ determinant computation for
  $e^{2x},e^{-2x}$.
- **Demonstration 2 (targets MC-2)**: the linear-system derivation showing the Wronskian matrix as
  the system's coefficient matrix.
- **Demonstration 3 (targets MC-3)**: Abel's theorem's prediction for $y''+3y'+2y=0$, verified
  exactly against direct computation.

## Discovery Questions
1. "Is the Wronskian formula independent of the determinant computation, or is it exactly a 2×2
   determinant?"
2. "Is the Wronskian's role as an independence test a separate, ad hoc fact, or is it directly the
   linear-independence condition made computable?"
3. "Does computing the Wronskian's functional form always require first solving the ODE
   explicitly?"

## Teaching Sequence
1. **Representation shift**: the determinant-computation identification, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the linear-independence-condition derivation, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: Abel's theorem's predictive power, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct Wronskian-as-determinant computation, a correct
   explanation citing the linear-independence condition, and a correct Abel's-theorem prediction
   verified against direct computation, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Wronskian formula treated as unrelated to the general determinant computation.
- Never accept the Wronskian's independence-test role described as an ad hoc ODE-specific fact.
- Never accept a claim that the Wronskian's functional form always requires solving the ODE first.

## Voice Teaching Notes
- Say "is that a new formula, or exactly the determinant you already know?" whenever the Wronskian
  is computed.
- When independence is verified via the Wronskian, ask "why does nonvanishing actually guarantee
  independence?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Wronskian as an explicit $2\times2$
  determinant.
- **Rung 2 (application)**: learner correctly explains, via the linear system in $c_1,c_2$, why
  Wronskian nonvanishing certifies independence.
- **Rung 3 (transfer)**: learner correctly applies Abel's theorem to predict a Wronskian's
  functional form from $P(x)$ alone, without needing the explicit solutions.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct determinant computation.
- If MC-2 recurs, re-derive the linear system and its coefficient matrix.
- If MC-3 recurs, re-walk Abel's theorem's prediction verified against direct computation.

## Memory Hooks
- "The Wronskian is a 2×2 determinant — nothing more, nothing separate."
- "Wronskian nonvanishing IS linear independence, via the determinant's invertibility criterion."
- "Abel's theorem predicts W(x) from P(x) alone — no need to solve the ODE first."

## Transfer Connections
- `math.de.second-order-homogeneous` (already authored, this campaign, Batch 151): supplies the
  Wronskian's already-established one-point-suffices independence test and fundamental-set
  concept, which this concept now explains structurally.
- `math.linalg.determinant` (already authored, certified domain): supplies the general determinant
  and invertibility theory the Wronskian directly instantiates.
- `math.linalg.linear-independence` (already authored, certified domain, formal KG cross-link):
  supplies the general independence condition the Wronskian's nonvanishing directly certifies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.wronskian.md`, reused by reference for its
  determinant-computation example, its linear-system independence derivation, its Abel's-theorem
  verification example, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own declared cross-link probe engaging
  `math.linalg.linear-independence`, applying Abel's theorem and the determinant invertibility
  criterion to a control-systems engineer's numerically-known solutions.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 states
  `bloom=analyze`, `mastery_threshold=0.75`, `estimated_hours=5` — the live KG's current values
  (`apply`, `0.85`, `3`) used as authoritative throughout this entry. Requires
  (`math.de.second-order-homogeneous`/`math.linalg.determinant`) and cross_links
  (`math.linalg.linear-independence`) matched exactly.

## Version History
- 2026-09-19 (Batch 152): authored. First entry this batch. Companion batch concept:
  `math.de.char-equation`.
