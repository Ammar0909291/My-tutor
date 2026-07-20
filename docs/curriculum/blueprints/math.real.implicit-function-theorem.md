# Teaching Blueprint: Implicit Function Theorem (`math.real.implicit-function-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.implicit-function-theorem` |
| name | Implicit Function Theorem |
| domain | Real Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.real.differentiability-rigorous`, `math.linalg.matrix-inverse` |
| unlocks | none |
| cross_links | `math.calc.implicit-differentiation` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has rigorous differentiability and matrix inverses; the general theorem is introduced directly |
| description (KG) | If $F:\mathbb{R}^n\times\mathbb{R}^m\to\mathbb{R}^m$ is $C^1$ and $F(a,b)=0$ with $\partial F/\partial y$ invertible at $(a,b)$, then locally $y$ is a $C^1$ function of $x$ with $y(a)=b$. Used to solve equations implicitly near known solutions. |

## Component 1 — Learning Objectives

- LO1: State the Implicit Function Theorem precisely: given $F(x,y)=0$ (a $C^1$ function $\mathbb{R}^n\times\mathbb{R}^m\to\mathbb{R}^m$) with a known solution $(a,b)$, if the PARTIAL Jacobian $\partial F/\partial y$ is INVERTIBLE at $(a,b)$ (via `math.linalg.matrix-inverse`'s own invertibility criteria), then $y$ is GUARANTEED to be a genuine $C^1$ function of $x$ NEAR $(a,b)$ — recognizing invertibility of $\partial F/\partial y$ as the essential hypothesis, generalizing `math.calc.implicit-differentiation`'s informal single-variable practice of "treating $y$ as a function of $x$."
- LO2: Recognize that `math.calc.implicit-differentiation`'s familiar procedure — differentiating $F(x,y)=0$ with respect to $x$ via the chain rule to solve for $dy/dx$ — implicitly ASSUMES the theorem's hypothesis already holds (that $y$ genuinely IS locally a function of $x$); the theorem SUPPLIES the justification that procedure has always silently relied on.
- LO3 (orientation level — full proof via contraction mapping/inverse function theorem deferred): recognize, without full derivation, that the theorem is fundamentally a STATEMENT ABOUT INVERTIBILITY, not merely differentiation — the SAME $\partial F/\partial y$ invertibility condition that guarantees local existence of $y(x)$ ALSO gives an explicit FORMULA for $y$'s own derivative, $Dy(x)=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$, previewing the theorem's deep connection to the Inverse Function Theorem.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.differentiability-rigorous` ($f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$; in $\mathbb{R}^n$, the total derivative as a linear map) and `math.linalg.matrix-inverse` (a square matrix invertible iff $\det\ne0$ iff full rank).

## Component 3 — Core Explanation

**Invertibility of $\partial F/\partial y$ is the essential hypothesis making $y$ genuinely a function of $x$**: `math.calc.implicit-differentiation` informally TREATS $y$ as a function of $x$ when differentiating $F(x,y)=0$, but never asks WHETHER this is actually valid. The Implicit Function Theorem answers this: at a known solution $(a,b)$ with $F(a,b)=0$, IF the partial Jacobian $\partial F/\partial y$ (the derivative of $F$ with respect to ONLY the $y$-variables, holding $x$ fixed) is INVERTIBLE at $(a,b)$ — via `math.linalg.matrix-inverse`'s own criteria (nonzero determinant, full rank) — THEN $y$ genuinely IS, locally near $(a,b)$, a well-defined $C^1$ function of $x$, with $y(a)=b$.

**The theorem supplies the justification `math.calc.implicit-differentiation`'s procedure has always silently assumed**: every time `math.calc.implicit-differentiation` differentiates $F(x,y)=0$ with respect to $x$ via the chain rule and solves for $dy/dx$, it is IMPLICITLY assuming $y=y(x)$ is a genuine differentiable function — an assumption that procedure never justifies on its own. The Implicit Function Theorem is EXACTLY the missing justification: checking $\partial F/\partial y\ne0$ (in the single-variable case) or invertible (in general) is precisely what certifies the implicit-differentiation procedure was valid to perform in the first place.

**The theorem is fundamentally about invertibility, and yields an explicit derivative formula (orientation level)**: the SAME condition ($\partial F/\partial y$ invertible) that guarantees $y(x)$ exists ALSO produces a formula for its derivative: differentiating $F(x,y(x))=0$ via the chain rule and solving (using the INVERTIBILITY of $\partial F/\partial y$ to isolate $Dy$) gives $Dy(x)=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$ — directly requiring `math.linalg.matrix-inverse`'s matrix inversion. This connects the Implicit Function Theorem deeply to the Inverse Function Theorem (both hinge on the SAME invertibility idea, applied to related but distinct settings). Full proof (typically via contraction mapping or by direct application of the Inverse Function Theorem) is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking the invertibility hypothesis before asserting $y=y(x)$, breaking MC-1)**: for $F(x,y)=x^2+y^2-1$ (the unit circle) at the point $(a,b)=(0,1)$: $F(0,1)=0+1-1=0$ ✓. The partial derivative $\partial F/\partial y=2y$, evaluated at $y=1$: $2(1)=2\ne0$ — INVERTIBLE (nonzero, satisfying `math.linalg.matrix-inverse`'s $1\times1$ criterion). The theorem GUARANTEES $y$ is locally a genuine function of $x$ near $(0,1)$ — and indeed, $y=\sqrt{1-x^2}$ IS such a function near this point. Contrast with the point $(a,b)=(1,0)$: $\partial F/\partial y=2y=2(0)=0$ — NOT invertible, and indeed NO such function exists there (the circle has a VERTICAL tangent at $(1,0)$, where $x$ cannot be locally solved to give a single-valued $y(x)$).

**Example 2 (LO2 — the theorem justifies implicit differentiation's silent assumption, breaking MC-2)**: for the SAME circle $F(x,y)=x^2+y^2-1=0$ near $(0,1)$: `math.calc.implicit-differentiation`'s procedure differentiates directly: $2x+2y\frac{dy}{dx}=0$, giving $\frac{dy}{dx}=-\frac{x}{y}$. This procedure is only VALID because Example 1 already confirmed $\partial F/\partial y=2y\ne0$ at $(0,1)$ — had this been zero (as at $(1,0)$), the SAME differentiation steps would produce a formula ($-x/y$, undefined at $y=0$) for a $y(x)$ that DOESN'T ACTUALLY EXIST there, confirming the theorem's hypothesis is the genuine prerequisite the informal procedure has always relied on without stating it.

**Example 3 (LO3, orientation level — the explicit derivative formula from invertibility, breaking MC-3)**: for $F(x,y)=x^2+y^2-1$ at $(0,1)$: using the general formula $Dy(x)=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$: here $\partial F/\partial x=2x$ and $\partial F/\partial y=2y$ (both $1\times1$ "matrices" in this scalar case), so $Dy=-\frac{2x}{2y}=-\frac{x}{y}$ — EXACTLY matching Example 2's implicit-differentiation result, but obtained here directly from the GENERAL invertibility-based formula rather than an ad hoc chain-rule manipulation. This confirms the theorem is doing genuine work beyond mere existence — it hands you the derivative FORMULA directly, via the same invertibility condition that certified $y(x)$ exists in the first place.

## Component 5 — Teaching Actions

### Teaching Action A01 — Invertibility of ∂F/∂y Is What Certifies y Is Genuinely a Function of x (Primitive P11: Representation Shift)

State: "`math.calc.implicit-differentiation` never asked WHETHER $y$ genuinely is a function of $x$ — the Implicit Function Theorem's invertibility check is exactly that missing certification." Walk Example 1's contrast between the valid point $(0,1)$ and the failing point $(1,0)$.

- **MC-1 hook**: ask "is $y$ ALWAYS guaranteed to be a genuine function of $x$ near any solution $(a,b)$ of $F(x,y)=0$, regardless of whether $\partial F/\partial y$ is invertible there?" — a "yes" answer reveals MC-1 (missing that invertibility of $\partial F/\partial y$ is the essential, non-automatic hypothesis).

### Teaching Action A02 — Implicit Differentiation Silently Relies On This Theorem's Hypothesis (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the SAME differentiation steps that work at $(0,1)$ would produce a nonsensical formula (undefined, dividing by zero) at $(1,0)$, where the theorem's hypothesis fails. State: "every time you've done implicit differentiation, you were silently relying on this theorem's invertibility condition holding — without it, the procedure's OUTPUT can be meaningless, even though the ALGEBRA looks identical."

- **MC-2 hook**: ask "is `math.calc.implicit-differentiation`'s procedure (differentiate, then solve for $dy/dx$) valid to perform regardless of whether the Implicit Function Theorem's hypothesis holds at that point?" — a "yes" answer reveals MC-2 (missing that the procedure's validity depends on the theorem's invertibility hypothesis, silently assumed all along).

### Teaching Action A03 — The Theorem Gives a Derivative Formula, Not Just an Existence Guarantee (Primitive P06: Contrast Pair)

Contrast a hypothetical "the theorem only tells you $y(x)$ exists, nothing more" view against Example 3's direct computation of $Dy$ from the invertibility-based formula, matching implicit differentiation's own result. State: "the theorem does more than certify existence — the SAME invertible matrix that guarantees $y(x)$ exists also hands you an explicit formula for its derivative."

- **MC-3 hook**: ask "does the Implicit Function Theorem only guarantee $y(x)$ exists, without providing any additional information about its derivative?" — a "yes" answer reveals MC-3 (missing that the same invertibility condition yields an explicit derivative formula, $Dy=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $F(x,y)=xy-1$ at $(a,b)=(1,1)$, verify $F(1,1)=0$ and check whether $\partial F/\partial y$ is invertible there.
  2. State what the Implicit Function Theorem concludes for problem 1's point, and identify the explicit function $y(x)$ this matches.
  3. For $F(x,y)=y^3-x$ at $(a,b)=(0,0)$, check whether $\partial F/\partial y$ is invertible, and explain what this implies about whether $y$ is guaranteed to be a $C^1$ function of $x$ there.
  4. Using the formula $Dy=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$, compute $dy/dx$ for problem 1's function at $(1,1)$, and verify it matches direct differentiation of $y=1/x$.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.calc.implicit-differentiation`)**: "An economist models a market equilibrium via $F(p,q)=p\cdot q-100=0$ (price $p$ times quantity $q$ equals a fixed revenue target), with a known equilibrium at $(p,q)=(10,10)$. (a) Verify the Implicit Function Theorem's hypothesis holds at this point, certifying $q$ is genuinely a function of $p$ nearby. (b) Using `math.calc.implicit-differentiation`'s own procedure, compute $dq/dp$ at this point, and cross-check it against the theorem's explicit formula. (c) Explain, citing the theorem directly, why an economist could NOT simply assume $q$ is always a well-defined function of $p$ near ANY point satisfying $pq=100$, without first checking the invertibility condition — describe what kind of point would cause this to fail."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | Y-ASSUMED-ALWAYS-A-FUNCTION-OF-X | Believing $y$ is always guaranteed to be a genuine function of $x$ near any solution of $F(x,y)=0$, missing that invertibility of $\partial F/\partial y$ is the essential, non-automatic hypothesis | Foundational |
| MC-2 | IMPLICIT-DIFFERENTIATION-ASSUMED-ALWAYS-VALID | Believing implicit differentiation's procedure is valid regardless of the theorem's hypothesis, missing that it silently relies on the invertibility condition | High |
| MC-3 | THEOREM-ASSUMED-EXISTENCE-ONLY | Believing the theorem only guarantees existence with no further information, missing that it also yields an explicit derivative formula | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Y Assumed Always a Function of X") → P41 (detect: ask whether $y$ is always guaranteed to be a function of $x$ near any solution) → P64 (conceptual shift: re-walk Example 1's valid-versus-failing-point contrast, re-anchoring on "invertibility of $\partial F/\partial y$ is the essential, non-automatic hypothesis").
- **B02 (targets MC-2)**: P27 (name it: "Implicit Differentiation Assumed Always Valid") → P41 (detect: ask whether implicit differentiation is valid regardless of the theorem's hypothesis) → P64 (conceptual shift: re-walk Example 2's nonsensical-formula-at-a-failing-point demonstration, re-anchoring on "the procedure silently relies on the invertibility condition").
- **B03 (targets MC-3)**: P27 (name it: "Theorem Assumed Existence Only") → P41 (detect: ask whether the theorem only guarantees existence with no further information) → P64 (conceptual shift: re-walk Example 3's explicit derivative-formula computation, re-anchoring on "the same invertibility condition yields a derivative formula too").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.differentiability-rigorous` (the rigorous derivative and total-derivative-as-a-linear-map definitions this theorem's $C^1$ hypothesis and conclusion are stated in terms of) and `math.linalg.matrix-inverse` (the invertibility criteria this theorem's essential hypothesis, $\partial F/\partial y$ invertible, directly invokes).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.implicit-differentiation`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.calc.implicit-differentiation`'s own procedure directly in Component 3's justification argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag and a notably reduced mastery_threshold (0.65, MAMR 4/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete verification (the invertibility check and the direct justification argument) and LO3 kept orientation-level, appropriately previewing the derivative formula and its Inverse-Function-Theorem connection without deriving the full contraction-mapping proof.
- **Division of labor**: `math.calc.implicit-differentiation` owns the INFORMAL single-variable procedure (differentiate, solve for $dy/dx$) without justifying its own validity; this concept owns SUPPLYING that justification via the invertibility hypothesis, and generalizing to the vector-valued, multi-dimensional case — deliberately reusing the SAME unit-circle example across all three examples so the existence check, the procedure-validity argument, and the explicit derivative formula all connect to one running, easily-visualized geometric example.
- Example 1's deliberate choice to check BOTH a valid point ($(0,1)$) and a failing point ($(1,0)$, the circle's vertical tangent) on the SAME curve was chosen to make the invertibility hypothesis's necessity concrete and geometrically intuitive (a vertical tangent line is exactly where a curve fails to be a graph of $y=f(x)$), rather than asserting the hypothesis abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.implicit-differentiation` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has rigorous differentiability and matrix inverses; general theorem introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
