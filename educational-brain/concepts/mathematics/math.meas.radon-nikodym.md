# math.meas.radon-nikodym

## Identity
- **KG id**: `math.meas.radon-nikodym`
- **Domain**: math.meas
- **Requires**: `math.meas.lebesgue-integral`
- **Unlocks**: none
- **Cross-links**: `math.prob.conditional-probability` (already authored — verified via `ls`;
  genuine cross-link probe used, see Blueprint References)
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 6

## Learning Objective
State the RADON-NIKODYM THEOREM: if $\nu\ll\mu$ (absolute continuity: $\mu(E)=0\Rightarrow
\nu(E)=0$), then there EXISTS measurable $f\ge0$ (the derivative $d\nu/d\mu$) with $\nu(E)=
\int_Ef\,d\mu$ — recognizing a probability density function AS a Radon-Nikodym derivative,
never a separate concept; verify absolute continuity and recognize its FAILURE genuinely blocks
existence; and recognize the theorem as the RIGOROUS FOUNDATION of general conditional
expectation, with `math.prob.conditional-probability`'s elementary formula as its simplest special
case.

## Core Understanding
A DENSITY FUNCTION IS LITERALLY A RADON-NIKODYM DERIVATIVE, NEVER A SEPARATE IDEA: for $\mu=$
Lebesgue measure and $\nu(E)=\int_E\frac{e^{-x^2/2}}{\sqrt{2\pi}}\,dx$ (the standard normal
probability measure): $\nu\ll\mu$ trivially (integrating over a Lebesgue-null set always gives 0),
and $d\nu/d\mu$ is EXACTLY the familiar density $f(x)=\frac{e^{-x^2/2}}{\sqrt{2\pi}}$. The
theorem's real content is the CONVERSE: whenever $\nu\ll\mu$ holds for ANY two measures, a
density-like $f$ is GUARANTEED to exist, even before an explicit formula is found.

ABSOLUTE CONTINUITY IS AN ESSENTIAL HYPOTHESIS — ITS FAILURE GENUINELY BLOCKS EXISTENCE: for
$\mu=$ Lebesgue measure and $\nu=$ the point mass at 0: checking $E=\{0\}$: $\mu(\{0\})=0$ but
$\nu(\{0\})=1\ne0$ — absolute continuity FAILS. Consistent with this, NO Radon-Nikodym derivative
can exist: for ANY candidate $f$, $\int_{\{0\}}f\,d\mu=0$ always (integrating over a Lebesgue-null
set always gives 0), so no $f$ could ever reproduce $\nu(\{0\})=1$. The hypothesis does genuine,
unavoidable work, never a mere convenient simplification.

CONDITIONAL EXPECTATION IS BUILT DIRECTLY ON THIS THEOREM, NEVER A SEPARATE TOPIC:
`math.prob.conditional-probability`'s elementary $P(A\mid B)=P(A\cap B)/P(B)$ breaks down when
conditioning on richer information (e.g. a continuous random variable $Y$, where $P(Y=y)=0$ for
each $y$). Defining $\nu(E)=P(A\cap E)$ and $\mu(E)=P(E)$ over the conditioning information, with
$\nu\ll\mu$ guaranteed by construction, the Radon-Nikodym derivative $d\nu/d\mu$ IS the general
conditional expectation — with the elementary formula recovered exactly as the special case where
$B$ is a single positive-probability event.

## Mental Models
- **"Every density function you've ever used was quietly a Radon-Nikodym derivative — this
  theorem is what guarantees one exists whenever absolute continuity holds."**
- **"Absolute continuity is a checkable, essential gate — when it fails, no derivative can ever
  exist, for a concrete, verifiable reason."**

## Why Students Fail

### MC-1: DENSITY-FUNCTION-ASSUMED-UNRELATED-TO-RN-DERIVATIVE
- **Surface form**: believes "probability density function" and "Radon-Nikodym derivative" are
  separate concepts that happen to look similar.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  density functions are typically introduced with elementary calculus vocabulary, obscuring the
  measure-theoretic identity underneath).
- **Repair**: re-walk the normal-density identification directly as $d\nu/d\mu$.

### MC-2: RN-DERIVATIVE-ASSUMED-TO-ALWAYS-EXIST
- **Surface form**: believes a Radon-Nikodym derivative exists for any two measures regardless of
  absolute continuity.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — the
  theorem's existence GUARANTEE, once known, invites forgetting it has a hypothesis at all).
- **Repair**: re-walk the point-mass counterexample, re-anchoring on absolute continuity genuinely
  blocking or permitting existence.

### MC-3: CONDITIONAL-EXPECTATION-ASSUMED-UNRELATED-TO-RN-THEOREM
- **Surface form**: believes general conditional expectation is a completely separate topic from
  the Radon-Nikodym theorem.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity —
  elementary conditional probability is typically taught with no reference to measure theory,
  obscuring the later rigorous foundation).
- **Repair**: re-walk the general construction, re-anchoring on the elementary formula as the
  theorem's simplest special case.

## Misconceptions

### MC-1: DENSITY-FUNCTION-ASSUMED-UNRELATED-TO-RN-DERIVATIVE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: RN-DERIVATIVE-ASSUMED-TO-ALWAYS-EXIST
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CONDITIONAL-EXPECTATION-ASSUMED-UNRELATED-TO-RN-THEOREM
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Radon-Nikodym theorem is a factory guarantee — whenever the absolute-continuity ticket
  is stamped, a density function is guaranteed to roll off the line, even before you've seen its
  formula."**
- **Anti-analogy**: absolute continuity failing is NOT a minor technical gap papered over by a
  more general formula — it's a hard wall; no function can ever reproduce a positive measure on a
  null set.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the standard normal density $f(x)=\frac{e^{-x^2/2}}
  {\sqrt{2\pi}}$ IS $d\nu/d\mu$ for $\nu(E)=\int_Ef\,d\mu$, $\mu=$ Lebesgue measure.
- **Demonstration 2 (targets MC-2)**: the point mass at 0 fails $\nu\ll\mu$ against Lebesgue
  measure ($\mu(\{0\})=0$, $\nu(\{0\})=1$) — no derivative can exist.
- **Demonstration 3 (targets MC-3)**: $\nu(E)=P(A\cap E)$, $\mu(E)=P(E)$ over conditioning
  information, with $d\nu/d\mu$ recovering ordinary conditional probability as its simple case.

## Discovery Questions
1. "Are 'probability density function' and 'Radon-Nikodym derivative' two separate concepts that
   happen to look similar?"
2. "Does a Radon-Nikodym derivative exist for ANY two measures, regardless of whether absolute
   continuity holds?"
3. "Is general conditional expectation a completely separate topic from the Radon-Nikodym
   theorem?"

## Teaching Sequence
1. **Representation shift**: state the theorem directly, working Demonstration 1's normal-density
   identification, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's point-mass counterexample, isolating MC-2 by requiring
   the concrete non-existence argument stated.
3. **Contrast pair**: Demonstration 3's general conditional-expectation construction, isolating
   MC-3 by requiring the elementary formula recognized as the theorem's special case.
4. **Mastery gate**: require a correct identification of a Radon-Nikodym derivative from a given
   measure definition, a correct absolute-continuity check with a concrete counterexample when it
   fails, and a correct explanation of how the elementary conditional-probability formula reduces
   from the general theorem, at the Blueprint's own stated MAMR of 4/5 (⌈0.7×5⌉).

## Tutor Actions
- Never accept "density function" and "Radon-Nikodym derivative" treated as unrelated concepts.
- Never accept a Radon-Nikodym derivative assumed to exist without absolute continuity checked.

## Voice Teaching Notes
- Say "is that density function actually a Radon-Nikodym derivative in disguise?" whenever a
  density is introduced.
- When existence is claimed, ask "did you verify absolute continuity, or just assume it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a Radon-Nikodym derivative directly from
  a given measure definition.
- **Rung 2 (application)**: learner correctly checks absolute continuity for a new pair of
  measures and explains why a derivative can or cannot exist.
- **Rung 3 (transfer)**: learner correctly explains how the general Radon-Nikodym-based
  conditional expectation construction reduces to the elementary $P(A\mid B)$ formula in the
  simple positive-probability case.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the normal-density identification directly.
- If MC-2 recurs, re-walk the point-mass counterexample.
- If MC-3 recurs, re-walk the general conditional-expectation construction.

## Memory Hooks
- "Every density function is secretly a Radon-Nikodym derivative."
- "Absolute continuity failing is a hard wall — no derivative can cross it."
- "Elementary conditional probability is this theorem's simplest special case, never a separate
  topic."

## Transfer Connections
- `math.meas.lebesgue-integral` (already authored, this campaign, Batch 115): supplies the
  integration-against-a-measure machinery underlying $\int_Ef\,d\mu$.
- `math.prob.conditional-probability` (already authored): the GENUINE cross-link target — its own
  elementary formula's limitation (undefined for zero-probability conditioning events) is directly
  resolved by this theorem's existence guarantee.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.meas.radon-nikodym.md`, reused by reference
  for its density-function identification, its point-mass absolute-continuity counterexample, its
  general conditional-expectation construction, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own GENUINE cross-link probe against
  `math.prob.conditional-probability` (confirmed authored via `ls`), rigorously defining
  $E[X\mid Y]$ for continuous $Y$ via the Radon-Nikodym construction and reducing it to the
  elementary formula in the simple case.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.meas.lebesgue-
  integral`, unlocks none, cross_links `math.prob.conditional-probability`, research/apply,
  mastery_threshold 0.7, estimated_hours 6) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared cross-link-probe P76 (target confirmed authored
  via `ls`) required no correction — a genuine, content-verified cross-link.

## Version History
- 2026-09-19 (Batch 120): authored. First entry this batch, completing `math.meas`'s full 13-
  concept domain (12/13 → 13/13). Companion batch concept: `math.prob.discrete-distributions`.
