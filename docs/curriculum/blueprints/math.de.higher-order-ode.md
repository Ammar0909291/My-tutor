# Teaching Blueprint: Higher-Order Linear ODE (`math.de.higher-order-ode`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.higher-order-ode` |
| name | Higher-Order Linear ODE |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.second-order-linear`, `math.alg.polynomial-roots` |
| unlocks | none |
| cross_links | `math.linalg.vector-space` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the second-order characteristic-root method and multiplicity theory; the task is generalizing to degree $n$, not re-deriving from scratch |
| description (KG) | An $n$th-order linear ODE has $n$ linearly independent solutions forming an $n$-dimensional solution space. Constant-coefficient case solved by characteristic polynomial of degree $n$; methods generalize from second-order case. |

## Component 1 — Learning Objectives

- LO1: Generalize the characteristic-equation method to degree $n$: for a constant-coefficient $n$th-order linear homogeneous ODE $a_ny^{(n)}+\cdots+a_1y'+a_0y=0$, form the degree-$n$ characteristic polynomial $a_nr^n+\cdots+a_1r+a_0=0$, and recognize — via `math.alg.polynomial-roots`'s own Fundamental Theorem of Algebra statement (exactly $n$ roots counting multiplicity) — that this polynomial ALWAYS supplies exactly $n$ roots, one for each solution needed.
- LO2: Translate each root's MULTIPLICITY (as `math.alg.polynomial-roots` already defines it) into the correct SOLUTION FORM: a real root $r$ of multiplicity $k$ contributes $k$ independent solutions $e^{rx},xe^{rx},\ldots,x^{k-1}e^{rx}$ — NOT $k$ copies of the same $e^{rx}$ — directly extending the degree-2 case's repeated-root pattern to arbitrary multiplicity.
- LO3 (cross-link objective): Recognize that the $n$ solutions obtained this way are claimed to form a BASIS of an $n$-dimensional solution space, and verify — using `math.linalg.vector-space`'s own axioms — that the solution set genuinely satisfies closure under addition and scalar multiplication (the two axioms that matter for confirming it is a subspace of the space of functions), connecting the informal "$n$-dimensional" language to a concrete axiom check rather than accepting it as an unverified label.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-linear` (standard form, superposition principle, solutions forming a vector space for the homogeneous case) and `math.alg.polynomial-roots` (Fundamental Theorem of Algebra: exactly $n$ roots counting multiplicity for a degree-$n$ polynomial).

## Component 3 — Core Explanation

**The characteristic polynomial generalizes directly to degree $n$**: for $a_ny^{(n)}+a_{n-1}y^{(n-1)}+\cdots+a_1y'+a_0y=0$, substituting the trial solution $y=e^{rx}$ gives $y^{(k)}=r^ke^{rx}$ for every derivative order $k$, so the ODE becomes $e^{rx}(a_nr^n+\cdots+a_1r+a_0)=0$. Since $e^{rx}\ne0$ always, this reduces to the CHARACTERISTIC POLYNOMIAL $a_nr^n+\cdots+a_1r+a_0=0$ — exactly the same substitution trick `math.de.second-order-linear`'s degree-2 case uses, now applied at degree $n$. By `math.alg.polynomial-roots`'s Fundamental Theorem of Algebra, this degree-$n$ polynomial has EXACTLY $n$ roots counting multiplicity — precisely the number of independent solutions an $n$th-order ODE needs.

**Multiplicity (from `math.alg.polynomial-roots`) determines the solution FORM, not just a repeated exponential**: `math.alg.polynomial-roots` already establishes that a root $r$ of multiplicity $k$ counts as $k$ roots toward the total, even though it is a single repeated value. Naively, one might expect a repeated root $r$ to simply contribute $e^{rx}$ counted $k$ times — but $k$ literal copies of the SAME function $e^{rx}$ are not linearly independent, so this cannot supply $k$ genuinely independent solutions. The correct generalization (verified by direct substitution) is that a root of multiplicity $k$ contributes the $k$ independent solutions $e^{rx},xe^{rx},x^2e^{rx},\ldots,x^{k-1}e^{rx}$ — the extra polynomial factors $x,x^2,\ldots,x^{k-1}$ are exactly what restores independence among what would otherwise be identical functions.

**The $n$ solutions form a basis of an $n$-dimensional solution space, verified via `math.linalg.vector-space`'s own axioms**: `math.linalg.vector-space` requires checking CLOSURE under addition and scalar multiplication to confirm a set is (a subspace of) a vector space. If $y_1,\ldots,y_n$ solve the homogeneous linear ODE $L[y]=0$ (where $L$ is the linear differential operator), then for any solutions $y_i,y_j$ and scalars $c_i,c_j$: $L[c_iy_i+c_jy_j]=c_iL[y_i]+c_jL[y_j]=c_i(0)+c_j(0)=0$ by linearity of $L$ — so $c_iy_i+c_jy_j$ is again a solution, confirming closure under both operations. Together with the zero function trivially solving $L[y]=0$, this confirms the solution set satisfies `math.linalg.vector-space`'s closure axioms, making "$n$-dimensional solution space" a genuinely VERIFIED structural claim, not just descriptive language borrowed from linear algebra.

## Component 4 — Worked Examples

**Example 1 (LO1 — degree-$n$ characteristic polynomial and its guaranteed $n$ roots, breaking MC-1)**: for the 3rd-order ODE $y'''-6y''+11y'-6y=0$, substituting $y=e^{rx}$ gives the characteristic polynomial $r^3-6r^2+11r-6=0$. Factoring: $(r-1)(r-2)(r-3)=0$, giving roots $r=1,2,3$ — three DISTINCT roots, matching `math.alg.polynomial-roots`'s guarantee of exactly 3 roots (counting multiplicity, here all multiplicity 1) for this degree-3 polynomial. The general solution is $y=c_1e^{x}+c_2e^{2x}+c_3e^{3x}$, using exactly the 3 roots supplied.

**Example 2 (LO2 — multiplicity determining solution form, breaking MC-2)**: for the 3rd-order ODE $y'''-3y''+3y'-y=0$, the characteristic polynomial is $r^3-3r^2+3r-1=(r-1)^3=0$ — a SINGLE root $r=1$ of multiplicity 3 (by `math.alg.polynomial-roots`'s multiplicity definition, this counts as all 3 roots). The correct 3 independent solutions are $e^{x},xe^{x},x^2e^{x}$ (NOT three copies of $e^x$) — general solution $y=c_1e^{x}+c_2xe^{x}+c_3x^2e^{x}$. Verifying $y_2=xe^x$ independently satisfies the ODE: $y_2'=e^x+xe^x$, $y_2''=2e^x+xe^x$, $y_2'''=3e^x+xe^x$; substituting, $(3e^x+xe^x)-3(2e^x+xe^x)+3(e^x+xe^x)-xe^x=(3-6+3-1+1)xe^x+(3-6+3)e^x=0$ ✓ — confirming $xe^x$ is a genuine, independent solution distinct from $e^x$.

**Example 3 (LO3 — verifying vector-space closure for the solution set, breaking MC-3)**: for Example 1's ODE ($y'''-6y''+11y'-6y=0$, operator $L[y]=y'''-6y''+11y'-6y$), take two solutions $y_1=e^x$ and $y_2=e^{2x}$ and form $y=3y_1-2y_2=3e^x-2e^{2x}$. Checking closure directly per `math.linalg.vector-space`'s axiom: $y'=3e^x-4e^{2x}$, $y''=3e^x-8e^{2x}$, $y'''=3e^x-16e^{2x}$; substituting into $L[y]$: $(3e^x-16e^{2x})-6(3e^x-8e^{2x})+11(3e^x-4e^{2x})-6(3e^x-2e^{2x})=e^x(3-18+33-18)+e^{2x}(-16+48-44+12)=0+0=0$ ✓ — the linear combination genuinely satisfies $L[y]=0$, concretely verifying closure under addition and scalar multiplication for this specific instance, exactly as `math.linalg.vector-space`'s axioms require checking.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Characteristic Polynomial Generalizes Directly to Degree $n$ (Primitive P11: Representation Shift)

State: "the same trial substitution $y=e^{rx}$ that turns a 2nd-order ODE into a quadratic characteristic equation turns an $n$th-order ODE into a degree-$n$ characteristic polynomial — and `math.alg.polynomial-roots` already guarantees this polynomial has EXACTLY $n$ roots (counting multiplicity), exactly enough for the $n$ solutions needed." Walk Example 1's direct substitution and factoring.

- **MC-1 hook**: ask "does an $n$th-order linear ODE's characteristic polynomial always supply enough roots for all $n$ needed solutions?" — a "no" or uncertain answer reveals MC-1 (not recognizing `math.alg.polynomial-roots`'s Fundamental Theorem of Algebra guarantee applies directly here).

### Teaching Action A02 — Multiplicity $k$ Means $k$ Solutions Multiplied by $1,x,\ldots,x^{k-1}$, Not $k$ Copies (Primitive P28: Conflict Evidence)

Present the naive expectation (a root of multiplicity 3 gives "$e^{rx}$, three times") directly against Example 2's verified evidence that $xe^x$ and $x^2e^x$ are genuinely NEW, independent solutions distinct from $e^x$ itself. State: "multiplicity $k$ doesn't mean literally repeating the same solution $k$ times — that wouldn't even be independent — it means multiplying by $1,x,x^2,\ldots,x^{k-1}$ to generate $k$ genuinely different solutions."

- **MC-2 hook**: ask "for a root of multiplicity 3, are the 3 solutions three literal copies of $e^{rx}$?" — a "yes" answer reveals MC-2 (missing the $x,x^2,\ldots$ multiplier pattern that restores independence).

### Teaching Action A03 — "$n$-Dimensional Solution Space" Is a Verified Claim, Not a Borrowed Label (Primitive P06: Contrast Pair)

Contrast simply ASSERTING "the solutions form an $n$-dimensional vector space" (an unverified label) against Example 3's direct closure check using `math.linalg.vector-space`'s own axioms (verifying $L[c_1y_1+c_2y_2]=0$ by direct substitution). State: "'$n$-dimensional solution space' isn't just descriptive language borrowed from linear algebra — it's a claim you can and should verify directly, the same way `math.linalg.vector-space` requires checking closure for any candidate vector space."

- **MC-3 hook**: ask "is 'the ODE's solutions form an $n$-dimensional vector space' something you take on faith, or something checkable using `math.linalg.vector-space`'s own axioms?" — an "on faith" answer reveals MC-3 (treating the vector-space structure as descriptive language rather than a verifiable structural fact).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the characteristic polynomial and all roots (with multiplicities) for $y^{(4)}-5y''+4y=0$.
  2. Using your roots from problem 1, write the general solution, correctly applying the multiplicity rule to any repeated root.
  3. For a 4th-order ODE with characteristic root $r=2$ of multiplicity 4, write all 4 independent solutions this root contributes.
  4. Explain, citing `math.linalg.vector-space`'s closure axiom, why a linear combination of two solutions to a homogeneous linear ODE is guaranteed to again be a solution.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.linalg.vector-space`)**: "A structural engineer models a beam's higher-order deflection equation as a 5th-order constant-coefficient linear homogeneous ODE. The characteristic polynomial factors as $(r+1)^2(r-3)(r^2+4)=0$. (a) List all 5 roots (real and complex, with multiplicities) and write the corresponding 5 independent solutions, correctly handling the repeated root's multiplicity. (b) The engineer claims the full set of solutions to this ODE forms a 5-dimensional vector space. Using `math.linalg.vector-space`'s own closure axioms, explain what specifically must be verified to justify this claim (rather than simply asserting it), and briefly indicate why the general linearity argument (as in Example 3) guarantees it holds here too, without needing to re-check every possible combination individually."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHARACTERISTIC-POLYNOMIAL-ROOT-COUNT-DOUBTED | Not recognizing that `math.alg.polynomial-roots`'s Fundamental Theorem of Algebra guarantee (exactly $n$ roots counting multiplicity) applies directly to guarantee enough roots for an $n$th-order ODE's characteristic polynomial | Foundational |
| MC-2 | MULTIPLICITY-TREATED-AS-LITERAL-REPETITION | Believing a root of multiplicity $k$ contributes $k$ literal copies of $e^{rx}$, rather than the $k$ genuinely independent solutions $e^{rx},xe^{rx},\ldots,x^{k-1}e^{rx}$ | High |
| MC-3 | SOLUTION-SPACE-DIMENSIONALITY-UNVERIFIED | Treating "the solutions form an $n$-dimensional vector space" as descriptive language taken on faith, rather than a claim verifiable via `math.linalg.vector-space`'s own closure axioms | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Characteristic Polynomial Root Count Doubted") → P41 (detect: ask whether the degree-$n$ characteristic polynomial is guaranteed enough roots) → P64 (conceptual shift: re-walk Example 1's factoring, re-anchoring on `math.alg.polynomial-roots`'s Fundamental Theorem of Algebra guarantee).
- **B02 (targets MC-2)**: P27 (name it: "Multiplicity Treated as Literal Repetition") → P41 (detect: ask whether multiplicity $k$ means $k$ literal copies of $e^{rx}$) → P64 (conceptual shift: re-walk Example 2's direct verification that $xe^x$ is a genuinely new, independent solution).
- **B03 (targets MC-3)**: P27 (name it: "Solution Space Dimensionality Unverified") → P41 (detect: ask whether the $n$-dimensional vector-space claim is checkable or taken on faith) → P64 (conceptual shift: re-walk Example 3's direct closure verification using `math.linalg.vector-space`'s own axioms).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-linear` (standard form, superposition principle, and the solution set's vector-space structure at degree 2, generalized here to degree $n$) and `math.alg.polynomial-roots` (the Fundamental Theorem of Algebra's exact-root-count guarantee and multiplicity definition, both used directly).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.vector-space`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.linalg.vector-space`'s own closure axioms directly in Component 3's derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the degree-$n$ characteristic polynomial and the multiplicity-to-solution-form rule) and LO3 grounding the "$n$-dimensional" language in a concrete, checkable closure verification rather than leaving it as unverified terminology.
- **Division of labor**: `math.de.second-order-linear` already owns the degree-2 characteristic-equation derivation, superposition principle, and solution-space vector-space structure (verified by grep — no characteristic-polynomial content found there); this concept owns the GENERALIZATION to arbitrary degree $n$, the multiplicity-to-solution-form rule (not present at degree 2, where multiplicity is at most 2), and the explicit closure verification tying the informal "$n$-dimensional" language to `math.linalg.vector-space`'s own axioms. `math.alg.polynomial-roots`'s multiplicity concept is reused directly, not re-derived.
- Example 2's choice of a triple root (multiplicity 3, rather than just repeating the degree-2 case's double-root pattern) was made specifically to make the $x,x^2$ multiplier PATTERN visible (not just a single special case), and to give MC-2's repair a genuinely non-trivial instance to re-verify against.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.vector-space` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the degree-2 method; the task is generalizing, not re-deriving) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
