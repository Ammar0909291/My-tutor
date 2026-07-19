# Teaching Blueprint: Radon-Nikodym Theorem (`math.meas.radon-nikodym`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.meas.radon-nikodym` |
| name | Radon-Nikodym Theorem |
| domain | Measure Theory |
| difficulty | research |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.meas.lebesgue-integral` |
| unlocks | none |
| cross_links | `math.prob.conditional-probability` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — the already-familiar normal-distribution density function, before the general existence theorem |
| description (KG) | If ν≪μ (ν absolutely continuous w.r.t. μ), then ∃ measurable f≥0 (Radon-Nikodym derivative dν/dμ) with ν(E)=∫_E f dμ. Generalizes density functions. Key tool in probability (conditional expectation) and functional analysis. |

## Component 1 — Learning Objectives

- LO1: State the **Radon-Nikodym theorem**: if $\nu\ll\mu$ (absolute continuity: $\mu(E)=0\Rightarrow\nu(E)=0$), then there EXISTS a measurable $f\ge0$ (the Radon-Nikodym derivative $d\nu/d\mu$) such that $\nu(E)=\int_Ef\,d\mu$ for every measurable $E$ — and recognize this as a GENERALIZATION of the familiar "density function" idea (a probability density function IS literally a Radon-Nikodym derivative).
- LO2: Correctly verify (or refute) absolute continuity $\nu\ll\mu$ for a simple example, and recognize WHY the hypothesis $\nu\ll\mu$ is essential — constructing/recognizing a case where it fails, so no Radon-Nikodym derivative exists.
- LO3 (cross-link probe, engaging `math.prob.conditional-probability`): recognize the Radon-Nikodym derivative as the rigorous foundation of general **conditional expectation** — `math.prob.conditional-probability`'s elementary $P(A\mid B)=P(A\cap B)/P(B)$ formula is the special, simple case where this general machinery reduces to ordinary division.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.lebesgue-integral` (integrating a function against a measure, and measurable sets/functions).

## Component 3 — Core Explanation

**Density functions ARE Radon-Nikodym derivatives**: a "probability density function" is not a separate idea from the Radon-Nikodym derivative — it IS one, specifically. If $\nu$ is a probability measure defined by integrating a density $f$ against Lebesgue measure $\mu$ ($\nu(E)=\int_Ef\,d\mu$), then automatically $\nu\ll\mu$ (integrating anything over a $\mu$-null set gives $0$), and $f$ IS the Radon-Nikodym derivative $d\nu/d\mu$. The theorem's real content is the CONVERSE and more general direction: whenever $\nu\ll\mu$ holds for ANY two measures (not just Lebesgue measure and a probability measure), a density-like function $f=d\nu/d\mu$ is GUARANTEED to exist, even before an explicit formula for it is found.

**Absolute continuity is an essential hypothesis, not a technicality**: $\nu\ll\mu$ means every $\mu$-null set is also $\nu$-null. When this FAILS — e.g., $\mu$ assigns zero measure to a point but $\nu$ assigns positive measure there — no Radon-Nikodym derivative can exist: no function $f$, integrated over a $\mu$-null set, can ever produce a nonzero value (any integral over a measure-zero set is $0$, regardless of the integrand). The hypothesis is therefore doing genuine, unavoidable work, not merely stating a convenient simplifying assumption.

**Foundation of general conditional expectation (cross-link)**: `math.prob.conditional-probability`'s elementary formula $P(A\mid B)=P(A\cap B)/P(B)$ works fine when $B$ is a single event with $P(B)>0$, but breaks down when conditioning on more complex information (e.g., an entire random variable $Y$ taking infinitely many values, where $P(Y=y)=0$ for each specific $y$). The Radon-Nikodym theorem provides the rigorous fix: defining appropriate measures $\nu,\mu$ built from the conditioning information, with $\nu\ll\mu$ guaranteed by construction, the Radon-Nikodym derivative $d\nu/d\mu$ IS the general conditional expectation — with the elementary formula recovered as the special, simple case.

## Component 4 — Worked Examples

**Example 1 (LO1 — density functions ARE Radon-Nikodym derivatives, breaking MC-1)**: let $\mu$ be Lebesgue measure on $\mathbb R$, and $\nu(E)=\int_E\frac{e^{-x^2/2}}{\sqrt{2\pi}}\,dx$ (the standard normal probability measure, defined by integrating its density against Lebesgue measure). Here $\nu\ll\mu$ trivially (integrating any function over a Lebesgue-null set gives $0$), and the Radon-Nikodym derivative $d\nu/d\mu$ is EXACTLY the familiar density function $f(x)=\frac{e^{-x^2/2}}{\sqrt{2\pi}}$ — the "probability density function" already known from elementary probability IS, precisely, the Radon-Nikodym derivative of $\nu$ with respect to $\mu$. The theorem is what GUARANTEES such a density must exist whenever $\nu\ll\mu$, even before an explicit formula has been found.

**Example 2 (LO2 — absolute continuity is essential, a case where it fails, breaking MC-2)**: let $\mu=$ Lebesgue measure, and $\nu=$ the point-mass measure at $0$ ($\nu(E)=1$ if $0\in E$, else $0$). Checking absolute continuity: does $\mu(E)=0$ imply $\nu(E)=0$? Take $E=\{0\}$: $\mu(\{0\})=0$ (Lebesgue measure of a single point is zero), but $\nu(\{0\})=1\ne0$ — absolute continuity FAILS. Consistent with this failure, NO Radon-Nikodym derivative $d\nu/d\mu$ can exist: for any candidate function $f$, $\int_{\{0\}}f\,d\mu=0$ always (integrating over a Lebesgue-null set always gives $0$, regardless of $f$), so no $f$ could ever reproduce $\nu(\{0\})=1$. The theorem's hypothesis $\nu\ll\mu$ is precisely the condition whose failure blocks existence.

**Example 3 (LO3, cross-link probe — conditional expectation as a Radon-Nikodym derivative, breaking MC-3)**: `math.prob.conditional-probability`'s own $P(A\mid B)$ generalizes as follows: define $\nu(E)=P(A\cap E)$ and $\mu(E)=P(E)$, both restricted to the relevant collection of events built from the conditioning information — then $\nu\ll\mu$ (by construction, since $P(E)=0\Rightarrow P(A\cap E)=0$), and the Radon-Nikodym derivative $d\nu/d\mu$, evaluated appropriately, IS the conditional probability/expectation. This is not a loose analogy: the full rigorous theory of conditional expectation (needed when conditioning on information richer than a single positive-probability event) is built directly on the Radon-Nikodym theorem's existence guarantee — `math.prob.conditional-probability`'s elementary $P(A\mid B)=P(A\cap B)/P(B)$ formula is the special case where this general machinery reduces to ordinary division.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Density Function Is a Concrete Instance of the General Theorem (Primitive P11: Representation Shift)

State: "the probability density function you already know isn't a separate idea — it's a specific instance of the Radon-Nikodym derivative, and this theorem is what guarantees one must exist whenever absolute continuity holds." Work Example 1's direct identification of the normal density as $d\nu/d\mu$.

- **MC-1 hook**: ask "are 'probability density function' and 'Radon-Nikodym derivative' two separate concepts that happen to look similar?" — a "yes" answer reveals MC-1 (missing that a density function IS literally a Radon-Nikodym derivative, a specific instance of the general theorem).

### Teaching Action A02 — Absolute Continuity Is Essential, Not Optional (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the point-mass measure genuinely fails $\nu\ll\mu$, and no candidate function $f$ could ever satisfy $\int_Ef\,d\mu=\nu(E)$ for $E=\{0\}$, since any integral over a Lebesgue-null set is always $0$. State: "this isn't a technicality — when absolute continuity fails, the derivative genuinely cannot exist, for a concrete, checkable reason."

- **MC-2 hook**: ask "does a Radon-Nikodym derivative $d\nu/d\mu$ exist for ANY two measures $\nu$ and $\mu$, regardless of whether absolute continuity holds?" — a "yes" answer reveals MC-2 (missing that absolute continuity is an essential hypothesis, not a convenience).

### Teaching Action A03 — Conditional Expectation Is Built Directly on This Theorem (Primitive P06: Contrast Pair)

Contrast the elementary $P(A\mid B)=P(A\cap B)/P(B)$ formula (which only works when $P(B)>0$) against Example 3's general construction (which handles conditioning on much richer information via the Radon-Nikodym derivative). State: "these aren't two separate topics — the general theory IS built on this theorem, and the elementary formula is just its simplest special case."

- **MC-3 hook**: ask "is general conditional expectation (conditioning on complex information, not just a single event) a completely separate topic from the Radon-Nikodym theorem?" — a "yes" answer reveals MC-3 (missing that the Radon-Nikodym theorem is the rigorous foundation making general conditional expectation well-defined at all).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Let $\mu$ be Lebesgue measure and $\nu(E)=\int_E2x\,dx$ for $E\subseteq[0,1]$. Identify the Radon-Nikodym derivative $d\nu/d\mu$ directly from this definition.
  2. Check whether $\nu\ll\mu$ holds for $\mu=$ Lebesgue measure and $\nu=$ a point mass at $x=5$, by testing a specific Lebesgue-null set.
  3. Explain why no Radon-Nikodym derivative $d\nu/d\mu$ can exist for the $\nu$ and $\mu$ in problem 2, referencing what would need to be true of any candidate function $f$.
  4. Explain, referencing this lesson's discussion, why the elementary formula $P(A\mid B)=P(A\cap B)/P(B)$ can be understood as a simple special case of a more general Radon-Nikodym-derivative-based theory of conditional expectation.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.prob.conditional-probability`)**: "A statistician needs to define $E[X\mid Y]$ (the conditional expectation of a random variable $X$ given another random variable $Y$) rigorously, for a case where $Y$ takes infinitely many possible values (so `math.prob.conditional-probability`'s elementary $P(A\mid B)=P(A\cap B)/P(B)$ formula can't be directly applied, since $P(Y=y)=0$ for a continuous $Y$). (a) Explain, in general terms, how defining two measures — one built from $X$ restricted to information about $Y$, and one being the base probability measure — and applying the Radon-Nikodym theorem provides a way forward, even in this case where naive division fails. (b) Explain why the hypothesis $\nu\ll\mu$ needs to hold (or be arranged to hold, by construction) before this approach can work at all. (c) Explain how this general construction reduces to the ordinary $P(A\mid B)=P(A\cap B)/P(B)$ formula in the simple case where $B$ is a single event with $P(B)>0$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DENSITY-FUNCTION-ASSUMED-UNRELATED-TO-RN-DERIVATIVE | Believing "probability density function" and "Radon-Nikodym derivative" are separate concepts, missing that a density function IS literally a Radon-Nikodym derivative | Foundational |
| MC-2 | RN-DERIVATIVE-ASSUMED-TO-ALWAYS-EXIST | Believing a Radon-Nikodym derivative exists for any two measures regardless of absolute continuity, missing that $\nu\ll\mu$ is an essential hypothesis whose failure genuinely blocks existence | High |
| MC-3 | CONDITIONAL-EXPECTATION-ASSUMED-UNRELATED-TO-RN-THEOREM | Believing general conditional expectation is a completely separate topic from the Radon-Nikodym theorem, missing that the theorem is the rigorous foundation making it well-defined | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Density Function Assumed Unrelated to RN Derivative") → P41 (detect: ask whether density functions and Radon-Nikodym derivatives are separate concepts) → P64 (conceptual shift: re-walk Example 1's direct identification, re-anchoring on "the density function IS the Radon-Nikodym derivative, a specific instance of the general theorem").
- **B02 (targets MC-2)**: P27 (name it: "RN Derivative Assumed to Always Exist") → P41 (detect: ask whether a Radon-Nikodym derivative exists for any two measures) → P64 (conceptual shift: re-walk Example 2's point-mass counterexample, re-anchoring on "absolute continuity genuinely blocks or permits existence").
- **B03 (targets MC-3)**: P27 (name it: "Conditional Expectation Assumed Unrelated to RN Theorem") → P41 (detect: ask whether general conditional expectation is a separate topic from the Radon-Nikodym theorem) → P64 (conceptual shift: re-walk Example 3's construction, re-anchoring on "the general theory is built directly on this theorem's existence guarantee").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.lebesgue-integral` (integration against a measure, the machinery underlying $\int_Ef\,d\mu$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.prob.conditional-probability`, verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, directly resolving that concept's own elementary formula's limitation (undefined when conditioning on a zero-probability event) via the Radon-Nikodym theorem's rigorous existence guarantee.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a research/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full conceptual depth (the density-function identification and a genuine absolute-continuity failure case) and LO3 built as a cross-link probe against the single authored cross-subject target, consistent with this corpus's established single-cross-link-probe pattern.
- **Division of labor**: `math.meas.lebesgue-integral` owns integration against a measure generally; `math.prob.conditional-probability` owns the elementary conditional probability formula and its own limitations (implicitly, by only being valid for positive-probability conditioning events). This concept owns the EXISTENCE theorem itself and its two major applications (recovering density functions as a special case, and rigorously founding general conditional expectation), deliberately using the cross-link to explain WHY the elementary formula needs a deeper foundation in the first place, rather than treating the connection as an unmotivated add-on.
- Example 2's point-mass counterexample was chosen specifically because it makes MC-2's target error genuinely falsifiable rather than merely asserted — a concrete measurable set ($\{0\}$) where the failure of absolute continuity can be checked by hand, and where the impossibility of any candidate $f$ follows from a simple, general fact (integrals over null sets are always zero).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.conditional-probability` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: the already-familiar normal-distribution density function, before the general existence theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
