# Teaching Blueprint: Generating Functions (`math.disc.generating-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.generating-functions` |
| name | Generating Functions |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.disc.combinatorics`, `math.disc.recurrence-relation`, `math.seq.series` |
| unlocks | none |
| cross_links | `math.prob.generating-function` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in recurrences, series, and the counting toolbox; the generating-function encoding is introduced directly |
| description (KG) | A power series A(x)=Σaₙxⁿ encoding a sequence {aₙ}. Allows algebraic manipulation to find closed forms, count combinations, solve recurrences. Exponential GF: B(x)=Σaₙxⁿ/n! for labeled structures. |

## Component 1 — Learning Objectives

- LO1: Define the **ordinary generating function (OGF)** $A(x)=\sum a_nx^n$ for a sequence $\{a_n\}$ as a FORMAL power series — a bookkeeping device whose COEFFICIENTS carry the sequence's information — and construct it directly for a simple known sequence, reusing `math.seq.series`'s own geometric series machinery.
- LO2: Apply generating functions to **solve a recurrence relation** — reusing `math.disc.recurrence-relation`'s own Fibonacci-style recurrence — by translating the recurrence into an algebraic equation for $A(x)$ and solving for $A(x)$ in closed form, recognizing this as a genuinely DIFFERENT technique from that concept's characteristic-equation method, not a restatement of it.
- LO3 (orientation level — surveying the concept's own two named children): recognize the **exponential generating function (EGF)** $B(x)=\sum a_nx^n/n!$ as a variant suited to LABELED structures, contrasting it with the OGF's suitability for unlabeled counting — deferred to `math.disc.ogf`/`math.disc.egf` for full development.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinatorics` (bijective and recursive counting techniques, and its own preview naming generating functions), `math.disc.recurrence-relation` (the characteristic-equation method for solving recurrences, and the Fibonacci recurrence $F_n=F_{n-1}+F_{n-2}$), and `math.seq.series` (the geometric series and its closed-form sum).

## Component 3 — Core Explanation

**A formal power series, not a number to compute**: the ordinary generating function $A(x)=\sum_{n\ge0}a_nx^n$ encodes an ENTIRE sequence $\{a_n\}$ as the coefficients of a single algebraic object. Crucially, $A(x)$ is treated as a FORMAL power series — a bookkeeping device — not a function to be evaluated at a specific numerical $x$; no convergence check or numerical plugging-in is required for it to validly encode the sequence. The coefficient of $x^n$ in $A(x)$ IS $a_n$, by construction, and that correspondence is the entire point.

**Solving a recurrence algebraically, a genuinely different technique**: given a recurrence like $a_n=a_{n-1}+a_{n-2}$, writing $A(x)=\sum a_nx^n$ and manipulating the SERIES itself (shifting indices, multiplying by powers of $x$, using the recurrence to relate $A(x)$ to itself) produces an ALGEBRAIC equation that can be solved for $A(x)$ in closed form — an approach built entirely from series manipulation, genuinely distinct from `math.disc.recurrence-relation`'s characteristic-equation method (which substitutes the ansatz $a_n=r^n$ directly into the recurrence). Both techniques can solve the SAME recurrence, arriving at equivalent information via completely different routes.

**Exponential generating functions for labeled structures (orientation level)**: the **exponential generating function** $B(x)=\sum a_nx^n/n!$ divides each coefficient by $n!$ — a convention suited to counting problems involving LABELED (distinguishable) structures, where the $n!$ in the denominator naturally accounts for the number of ways to label $n$ objects. The SAME formal power series can represent entirely different sequences depending on whether it is read as an OGF or an EGF — the choice of convention is part of what the generating function means.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the OGF for a known sequence, breaking MC-1)**: for the constant sequence $a_n=1$ for every $n\ge0$, $A(x)=\sum_{n\ge0}x^n=\dfrac1{1-x}$ — directly reusing `math.seq.series`'s own geometric series sum formula. This closed form is a bookkeeping statement: expanding $\dfrac1{1-x}$ back into its power series recovers coefficient $1$ at every power of $x$, exactly matching $a_n=1$. No numerical value of $x$ needs to be substituted for this correspondence to be meaningful.

**Example 2 (LO2 — solving the Fibonacci recurrence via generating functions, breaking MC-2)**: for $F_0=0$, $F_1=1$, $F_n=F_{n-1}+F_{n-2}$ ($n\ge2$), let $F(x)=\sum F_nx^n$. Then $F(x)-F_0-F_1x=\sum_{n\ge2}(F_{n-1}+F_{n-2})x^n = x\sum_{n\ge2}F_{n-1}x^{n-1}+x^2\sum_{n\ge2}F_{n-2}x^{n-2} = x(F(x)-F_0)+x^2F(x)$. Since $F_0=0$: $F(x)-x=xF(x)+x^2F(x)$, so $F(x)(1-x-x^2)=x$, giving $F(x)=\dfrac x{1-x-x^2}$. This closed form was reached ENTIRELY through algebraic manipulation of the series itself — no characteristic equation, no ansatz $F_n=r^n$ — a genuinely different derivation route from `math.disc.recurrence-relation`'s own method, arriving at an equivalent encoding of the same sequence.

**Example 3 (LO3, orientation level — OGF vs. EGF, the same series, different meaning)**: counting the number of ways to arrange $n$ DISTINCT labeled objects into a sequence ($n!$ permutations), the EGF is $B(x)=\sum n!\cdot x^n/n!=\sum x^n=\dfrac1{1-x}$ — the IDENTICAL closed form as Example 1's ordinary generating function for the constant sequence $a_n=1$. Yet these encode completely different combinatorial meanings: Example 1's OGF counts an unlabeled constant sequence, while this EGF counts labeled permutations, with the $n!$-dividing convention doing the work of distinguishing the two. The same formal series, read under two different conventions, means two different things.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Bookkeeping Device, Not a Function to Evaluate (Primitive P11: Representation Shift)

State: "$A(x)$ isn't something you plug a number into — it's a way of packaging an entire sequence into one algebraic object, where the COEFFICIENTS are the actual information." Work Example 1's construction, emphasizing that $1/(1-x)$'s expansion recovering coefficient $1$ everywhere is the whole point, not a numerical evaluation.

- **MC-1 hook**: ask "does a generating function $A(x)$ need to converge for a specific numerical value of $x$ to be a valid, useful object?" — a "yes" answer reveals MC-1 (treating the formal power series as if it required numerical evaluation, rather than recognizing the coefficients alone carry the meaning).

### Teaching Action A02 — Generating Functions Solve Recurrences Through a Genuinely Different Route (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the Fibonacci generating function $F(x)=x/(1-x-x^2)$ was derived purely by manipulating the SERIES relation itself, with no characteristic equation or $r^n$ ansatz anywhere in the derivation. State: "this is a completely different technique from substituting $a_n=r^n$ — pure algebra on the generating function itself — and it reaches an equivalent closed-form encoding of the same sequence."

- **MC-2 hook**: ask "are generating functions just another name for the characteristic-equation method already used to solve recurrences?" — a "yes" answer reveals MC-2 (missing that generating functions are a genuinely distinct, series-manipulation-based technique, not a relabeling of the characteristic-equation approach).

### Teaching Action A03 — The Same Formal Series Can Mean Different Things Under OGF vs. EGF (Primitive P06: Contrast Pair)

Contrast Example 1's OGF $1/(1-x)$ (encoding the unlabeled constant sequence $a_n=1$) against Example 3's EGF $1/(1-x)$ (encoding labeled permutations $a_n=n!$) — the IDENTICAL closed form, two different meanings. State: "OGF and EGF aren't just two notational styles for the same thing — the $n!$-dividing convention changes which combinatorial problem the series actually represents."

- **MC-3 hook**: ask "are the ordinary and exponential generating functions just two arbitrary notational variants encoding the same information?" — a "yes" answer reveals MC-3 (missing that OGF and EGF are suited to fundamentally different counting-problem types — unlabeled vs. labeled structures).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the ordinary generating function for the sequence $a_n=2$ for all $n\ge0$ (a constant sequence), expressing it as a closed-form fraction.
  2. Using the recurrence $a_n=3a_{n-1}$ with $a_0=1$, derive the equation $A(x)(1-3x)=1$ and solve for $A(x)$ in closed form.
  3. Explain why generating functions are a genuinely different technique from the characteristic-equation method, even though both can solve the same recurrence, referencing Example 2's Fibonacci derivation.
  4. State the EGF for the sequence $a_n=n!$ (counting labeled permutations) and explain what this coefficient convention represents, contrasting it with the OGF of the constant sequence $a_n=1$.
- **P76 (Transfer Probe, mode = independence)**: "A sequence satisfies $b_n=2b_{n-1}+1$ for $n\ge1$, with $b_0=0$. (a) Let $B(x)=\sum b_nx^n$. Using the recurrence, derive an algebraic equation relating $B(x)$ to itself (following the style of Example 2's Fibonacci derivation), and solve for $B(x)$ in closed form. (b) Explain why this generating-function approach counts as a genuinely different solution method from the characteristic-equation approach, even if both would eventually produce an equivalent closed-form formula for $b_n$. (c) A classmate insists that generating functions are 'just repackaged characteristic equations.' Using this lesson's distinction, explain what they're missing."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GENERATING-FUNCTION-REQUIRES-NUMERICAL-EVALUATION | Believing a generating function must converge for or be evaluated at a specific numerical $x$ to be valid, missing that as a formal power series, the COEFFICIENTS alone carry all the meaning | Foundational |
| MC-2 | GENERATING-FUNCTIONS-CONFLATED-WITH-CHARACTERISTIC-EQUATIONS | Believing generating functions are just another name for the characteristic-equation method, missing that they are a genuinely different, series-manipulation-based technique for solving the same class of problems | High |
| MC-3 | OGF-EGF-TREATED-AS-INTERCHANGEABLE | Treating OGF and EGF as arbitrary notational variants of the same information, missing that they encode fundamentally different counting-problem types (unlabeled vs. labeled structures) | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Generating Function Assumed to Require Numerical Evaluation") → P41 (detect: ask whether $A(x)$ must converge at a specific $x$ to be a useful object) → P64 (conceptual shift: re-walk Example 1's coefficient-extraction framing, re-anchoring on "the coefficients are the information — no numerical evaluation is needed").
- **B02 (targets MC-2)**: P27 (name it: "Generating Functions Conflated with Characteristic Equations") → P41 (detect: ask whether generating functions are just another name for the characteristic-equation method) → P64 (conceptual shift: re-walk Example 2's pure series-manipulation derivation, re-anchoring on "this is algebra on the series itself, with no $r^n$ ansatz anywhere").
- **B03 (targets MC-3)**: P27 (name it: "OGF/EGF Treated as Interchangeable") → P41 (detect: ask whether OGF and EGF are just two notational variants of the same information) → P64 (conceptual shift: re-walk Example 3's dual-meaning $1/(1-x)$, re-anchoring on "the same formal series means different things under the two conventions").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinatorics` (which itself previewed generating functions as a named further technique — this concept directly fulfills that forward reference), `math.disc.recurrence-relation` (the Fibonacci recurrence and characteristic-equation method this concept's Example 2 directly contrasts against), and `math.seq.series` (the geometric series sum formula reused directly in Example 1).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.prob.generating-function`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine OGF construction and a genuine algebraic recurrence-solving derivation) and LO3 kept orientation-level, appropriately surveying the EGF distinction without developing either of the concept's own two named children.
- **Division of labor**: `math.disc.combinatorics` owns the broader counting toolbox and first named generating functions as a further technique; `math.disc.recurrence-relation` owns the characteristic-equation method for solving recurrences. This concept owns the SPECIFIC generating-function encoding and its use as an alternate recurrence-solving technique, deliberately reusing the SAME Fibonacci recurrence already established in `math.disc.recurrence-relation` so the two techniques' outputs can be directly compared on one shared example.
- Example 3 was deliberately built to produce the IDENTICAL closed form $1/(1-x)$ as Example 1, specifically to make the OGF/EGF distinction concrete rather than asserted — the same formula, two different combinatorial readings, is a sharper teaching point than two unrelated formulas would be.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.generating-function` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in recurrences/series; encoding introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
