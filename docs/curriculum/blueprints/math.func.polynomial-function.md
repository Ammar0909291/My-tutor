# Teaching Blueprint: Polynomial Function (`math.func.polynomial-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.polynomial-function` |
| name | Polynomial Function |
| domain | Functions |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.func.quadratic-function`, `math.alg.polynomial` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — evaluating a cubic function at several inputs and noticing a sign change, before the formal root-location technique |
| description (KG) | A function defined by a polynomial p(x) = aₙxⁿ + … + a₀; continuous everywhere; behavior determined by degree and leading coefficient. |

## Component 1 — Learning Objectives

- LO1: Recognize $p(x)=a_nx^n+\cdots+a_0$ as a FUNCTION — extending the function-notation framework already established for `math.func.linear-function` and `math.func.quadratic-function` to general degree $n$ — and evaluate $p(x)$ directly at specific inputs, reusing `math.alg.polynomial`'s own degree/leading-coefficient vocabulary without re-deriving it.
- LO2: Use function EVALUATION at a handful of specific points, together with `math.alg.polynomial`'s already-established continuity fact (polynomials are continuous everywhere, no jumps or breaks), to LOCATE an interval containing a root via a **sign change** — a genuinely analytical technique (informally: if $p(a)$ and $p(b)$ have opposite signs, and $p$ is continuous, a root must lie somewhere between $a$ and $b$) distinct from `math.alg.quadratic-equation`'s exact-solving methods.
- LO3: Combine end-behavior knowledge (already established in `math.alg.polynomial`) with a small number of evaluated points to predict a polynomial function's overall SHAPE, correctly recognizing that NEITHER end behavior alone NOR a handful of evaluated points alone is sufficient — both pieces of information are needed together, refuting the misconception that either one in isolation fully determines the function's graph.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.quadratic-function` (the function-notation evaluation framework, and the established division-of-labor pattern separating function-theoretic treatment from purely algebraic root-finding) and `math.alg.polynomial` (the degree, leading coefficient, standard form, end-behavior rules, and the already-established fact that polynomials are continuous everywhere and differentiable everywhere).

## Component 3 — Core Explanation

**Explicit division of labor with `math.alg.polynomial`**: that concept already fully owns the algebraic ANATOMY of a polynomial (degree, leading coefficient, standard form), the END-BEHAVIOR rules (even/odd degree, leading-coefficient sign), and the CONTINUITY fact (polynomials are continuous and differentiable everywhere). This concept does NOT re-teach any of that — its distinct job, directly paralleling `math.func.quadratic-function`'s own relationship to `math.alg.quadratic-equation`, is treating $p(x)$ as a genuine FUNCTION to be EVALUATED, and using evaluation-based reasoning (sign changes, shape prediction) as an analytical technique.

**Locating roots via evaluation and a sign change**: because a polynomial function is continuous EVERYWHERE (already established, never re-derived here), if $p(a)$ and $p(b)$ have OPPOSITE signs (one positive, one negative) for some $a<b$, then $p$ must cross zero SOMEWHERE between $a$ and $b$ — a continuous function cannot jump from positive to negative without passing through zero at some point in between. This gives a powerful ANALYTICAL tool: evaluate $p$ at a few strategic points, look for a sign change, and you've LOCATED (though not yet precisely found) a root — without needing any algebraic root-finding technique at all.

**Combining end behavior and evaluated points for shape prediction**: knowing the end behavior alone (e.g. "both ends go up, since even degree with positive leading coefficient") tells you what happens FAR from the origin, but says NOTHING about the function's behavior in between (how many times it wiggles, where its local peaks and valleys are). Conversely, evaluating a HANDFUL of points alone gives isolated data but no guarantee about what happens beyond those specific inputs. Combining BOTH — the guaranteed long-run behavior (end behavior) AND a strategic sample of interior evaluations (sign changes, relative sizes) — gives a genuinely informed prediction of the function's overall shape, in a way neither piece of information alone could provide.

## Component 4 — Worked Examples

**Example 1 (LO1 — evaluating a polynomial function directly)**: For $p(x)=2x^3-5x^2+x+3$, evaluate $p(2) = 2(8)-5(4)+2+3 = 16-20+2+3=1$. This is a direct FUNCTION EVALUATION — a specific input ($2$) producing a specific output ($1$) — distinct from asking "solve $p(x)=0$," which is `math.alg.polynomial`'s own root-finding territory (via factoring or numerical methods), not addressed here.

**Example 2 (LO2 — locating a root via a sign change)**: Continuing $p(x)=2x^3-5x^2+x+3$: evaluate $p(0)=3$ (positive) and $p(1) = 2-5+1+3=1$ (also positive — no sign change yet). Evaluate $p(-1) = -2-5-1+3=-5$ (negative!). Since $p(-1)=-5<0$ and $p(0)=3>0$, and $p$ is continuous everywhere (already established), there MUST be a root somewhere in the interval $(-1,0)$ — located purely by evaluation and the sign-change argument, without any algebraic solving at all.

**Example 3 (LO3 — end behavior plus evaluated points, neither alone sufficient, breaking MC-1)**: For $p(x)=x^4-5x^2+4$ (even degree, positive leading coefficient — end behavior: both ends go UP, per `math.alg.polynomial`'s already-known rule). End behavior ALONE tells you nothing about what happens between the ends — does the graph dip down in the middle? How many times? Evaluating a few points: $p(0)=4$, $p(1)=1-5+4=0$, $p(2)=16-20+4=0$, $p(1.5)=5.0625-11.25+4=-2.1875$ (negative!) — revealing the graph actually DIPS BELOW zero between $x=1$ and $x=2$, a genuine "wiggle" the end-behavior information alone could never reveal. Conversely, these isolated evaluated points ALONE don't guarantee what happens for very large $|x|$ (e.g., whether the function eventually turns back down) — only the END-BEHAVIOR rule guarantees it continues upward far from the origin. Both pieces of information were necessary; neither alone gives the full picture.

## Component 5 — Teaching Actions

### Teaching Action A01 — Polynomial Functions as Functions: Evaluation (Primitive P11: Representation Shift)

State: "you've already extended function notation from linear to quadratic — this is the same move, now for ANY degree. Evaluate first, before anything else." Work Example 1's direct evaluation.

### Teaching Action A02 — Locating Roots via Sign Changes, Using Continuity (Primitive P11: Representation Shift)

State: "you already know polynomials are continuous everywhere — no jumps. So if evaluating at two points gives opposite signs, a root MUST be hiding somewhere between them, guaranteed by that continuity." Work Example 2's direct sign-change location.

### Teaching Action A03 — End Behavior and Evaluated Points Together, Neither Alone Sufficient (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: end behavior (both ends up) says nothing about the dip between $x=1$ and $x=2$; a few evaluated points alone say nothing about behavior at very large $|x|$. State: "you need BOTH — the guaranteed long-run shape from end behavior, AND a strategic sample of evaluations to catch what happens in between."

- **MC-1 hook**: ask "if you know a polynomial's end behavior, do you already know everything important about its graph's shape?" — a "yes" answer reveals MC-1 (believing end behavior alone is sufficient, missing that interior evaluations can reveal wiggles/dips end behavior says nothing about).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Evaluate $p(x)=x^3-4x+1$ at $x=0,1,2$.
  2. Using your results from problem 1 (and additional evaluations if needed), locate an interval containing a root of $p(x)=x^3-4x+1$ via a sign change.
  3. For $p(x)=-x^4+3x^2$, state the end behavior (both ends, using degree/leading-coefficient rules), then evaluate $p(0),p(1),p(2)$ and describe what additional shape information these evaluations reveal beyond the end behavior alone.
  4. Explain, in your own words, why knowing a polynomial's end behavior is not sufficient by itself to sketch its complete graph shape.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models a bridge cable's tension distribution with a polynomial function $T(x) = x^3-6x^2+9x+2$ (x = position along the cable, in meters) and needs to determine if the tension ever drops to a critical near-zero or negative value anywhere along the cable. (a) Evaluate $T(x)$ at $x=0,1,2,3,4$ and identify any sign changes. (b) Using the continuity of polynomial functions, explain what a sign change between two evaluated points guarantees about the existence of a point where $T(x)=0$ in between. (c) Explain why simply checking the END BEHAVIOR of $T(x)$ (what happens for very large or very negative $x$) would NOT be sufficient for the engineer's purposes here — they specifically need to know about behavior in the middle of the cable's actual physical range, not just the far extremes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | END-BEHAVIOR-ASSUMED-SUFFICIENT-FOR-FULL-SHAPE | Believing knowing a polynomial's end behavior is sufficient to know its complete graph shape, missing that interior evaluations can reveal wiggles/dips end behavior alone cannot show | Foundational |
| MC-2 | SIGN-CHANGE-ARGUMENT-APPLIED-WITHOUT-CONTINUITY-JUSTIFICATION | Using the sign-change-implies-a-root argument without recognizing that this relies specifically on the function being continuous (already established for polynomials, but not automatically true for every function) | Foundational |
| MC-3 | FUNCTION-EVALUATION-CONFUSED-WITH-ROOT-FINDING | Confusing evaluating $p(x)$ at a specific input with solving $p(x)=0$ for the input, using the wrong direction of the input-output relationship | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "End-Behavior-Sufficient-for-Full-Shape Assumption") → P41 (detect: ask whether knowing end behavior alone tells you everything about a polynomial's graph) → P64 (conceptual shift: re-walk Example 3's direct demonstration — end behavior says nothing about the dip between $x=1$ and $x=2$ — re-anchoring on "end behavior plus interior evaluations, together, not either alone").
- **B02 (targets MC-2)**: P27 (name it: "Sign-Change Argument Without Continuity Justification") → P41 (detect: ask a student to explain WHY a sign change guarantees a root, checking whether they cite continuity specifically) → P64 (conceptual shift: re-anchor on "this argument depends ENTIRELY on the function being continuous — no jumps means it can't skip over zero; polynomials are guaranteed continuous, which is exactly what licenses this technique here").
- **B03 (targets MC-3)**: P27 (name it: "Function-Evaluation-vs-Root-Finding Confusion") → P41 (detect: ask a student to evaluate $p(3)$ for a given polynomial and check whether they instead attempt to solve $p(x)=3$) → P64 (conceptual shift: re-anchor on "evaluating means: input given, compute the output. Root-finding means: output is zero, find the input — these are different directions of the same rule").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.quadratic-function` (the function-notation evaluation framework and its established division-of-labor pattern this concept extends to general degree), `math.alg.polynomial` (the degree/leading-coefficient/end-behavior/continuity facts this concept reuses without re-deriving).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/analyze tag places this at a "3 TAs + gate" tier — A01 (function evaluation), A02 (locating roots via sign changes and continuity), and A03 (end behavior plus evaluations together) each target a distinct LO, appropriate for the "analyze" bloom level's emphasis on combining multiple pieces of information (continuity, end behavior, evaluated points) into a synthesized conclusion, rather than mechanical application of a single rule.
- **Explicit division of labor with `math.alg.polynomial`** (stated directly in Component 3): that concept owns the algebraic anatomy, end-behavior rules, and the continuity fact; this concept's distinct contribution is function-notation EVALUATION and using it analytically (sign-change root-location, shape prediction combining end behavior with interior data) — directly paralleling the established `math.func.quadratic-function`/`math.alg.quadratic-equation` pattern.
- The sign-change root-location technique (LO2) was deliberately introduced as an informal, evaluation-based tool (not a formal statement/proof of the Intermediate Value Theorem, which belongs to a more specialized future concept) — appropriately scoped to this concept's "apply/analyze" needs without requiring the full rigorous machinery.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: evaluating a cubic at several inputs, noticing a sign change, before the formal technique) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
