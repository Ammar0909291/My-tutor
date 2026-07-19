# Teaching Blueprint: Recurrence Relation (`math.disc.recurrence-relation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.recurrence-relation` |
| name | Recurrence Relation |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.seq.sequence`, `math.alg.polynomial` |
| unlocks | `math.disc.generating-functions` |
| cross_links | `math.de.ode` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | C (Concrete) — the rabbit-population Fibonacci story before the general definition |
| description (KG) | An equation defining a sequence aₙ in terms of earlier terms. Example: Fibonacci: Fₙ=Fₙ₋₁+Fₙ₋₂. Can often be solved in closed form (characteristic equation) or via generating functions.
Can often be solved in closed form (characteristic equation) or via generating functions. |

## Component 1 — Learning Objectives

- LO1: Define a **recurrence relation** as an equation defining a sequence $a_n$ in terms of one or more earlier terms, requiring **initial conditions** to pin down a specific sequence, and evaluate the first several terms of a given recurrence directly (e.g. the Fibonacci recurrence $F_n=F_{n-1}+F_{n-2}$).
- LO2: Solve a **linear recurrence with constant coefficients** in **closed form** via the **characteristic equation** method — for $a_n = c_1a_{n-1}+c_2a_{n-2}$, form the characteristic equation $x^2=c_1x+c_2$, solve for its roots, and construct the general solution as a combination of those roots raised to the $n$-th power, fitting constants to the initial conditions.
- LO3: Correctly distinguish a recurrence relation's **order** (how many previous terms it references) from its **degree**, and recognize that the SAME closed-form technique (characteristic equation) generalizes to higher-order linear recurrences with repeated or complex roots, requiring adjusted solution forms in those cases.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.sequence` (a sequence as an ordered list of values, function from $\mathbb{N}$) and `math.alg.polynomial` (solving polynomial equations, needed for the characteristic equation).

## Component 3 — Core Explanation

A **recurrence relation** defines a sequence $a_n$ using one or more **earlier** terms of the same sequence, together with **initial conditions** specifying the starting value(s) (without which the recurrence alone cannot pin down a unique sequence — infinitely many sequences could satisfy the same recurrence rule with different starting points). The classic example: the **Fibonacci sequence**, $F_n=F_{n-1}+F_{n-2}$, with initial conditions $F_0=0,F_1=1$.

**Solving via the characteristic equation** (for linear recurrences with constant coefficients): for $a_n = c_1a_{n-1}+c_2a_{n-2}$, hypothesize a solution of the form $a_n=r^n$ for some constant $r$. Substituting: $r^n = c_1r^{n-1}+c_2r^{n-2}$, and dividing by $r^{n-2}$ (assuming $r\neq0$): $r^2 = c_1r+c_2$ — the **characteristic equation**. If this quadratic has two DISTINCT roots $r_1,r_2$, the **general solution** is $a_n = Ar_1^n+Br_2^n$ for constants $A,B$ determined by fitting the initial conditions.

**Order vs. degree**: the **order** of a recurrence is how many previous terms it references (Fibonacci is order 2, since it references $a_{n-1}$ and $a_{n-2}$). This is a genuinely different notion from a polynomial's **degree** (the characteristic equation's own degree happens to match the recurrence's order for a linear constant-coefficient recurrence, but "order" and "degree" describe different objects — order describes the RECURRENCE, degree describes the associated CHARACTERISTIC POLYNOMIAL).

**Generalization to repeated/complex roots**: if the characteristic equation has a REPEATED root $r$ (a double root), the general solution takes the adjusted form $a_n = (A+Bn)r^n$ (note the extra factor of $n$ on the second term) rather than the distinct-roots form — a genuinely different closed-form structure required precisely because the naive $Ar^n+Br^n$ would collapse into a single term, losing a needed degree of freedom.

## Component 4 — Worked Examples

**Example 1 (LO1 — evaluating terms directly)**: For $a_n=2a_{n-1}+3$ with $a_0=1$: $a_1=2(1)+3=5$, $a_2=2(5)+3=13$, $a_3=2(13)+3=29$.

**Example 2 (LO2 — characteristic equation, distinct roots)**: Solve $a_n=5a_{n-1}-6a_{n-2}$ with $a_0=1,a_1=4$. Characteristic equation: $r^2=5r-6 \Rightarrow r^2-5r+6=0 \Rightarrow (r-2)(r-3)=0$, giving distinct roots $r=2,3$. General solution: $a_n=A(2^n)+B(3^n)$. Fit initial conditions: $a_0=A+B=1$; $a_1=2A+3B=4$. Solving: from the first equation $A=1-B$; substitute: $2(1-B)+3B=4 \Rightarrow 2+B=4 \Rightarrow B=2, A=-1$. Closed form: $a_n=-2^n+2(3^n)$. Check: $a_0=-1+2=1$ ✓, $a_1=-2+6=4$ ✓.

**Example 3 (LO3 — repeated root, breaking MC-1)**: Solve $a_n=4a_{n-1}-4a_{n-2}$ with $a_0=1,a_1=4$. Characteristic equation: $r^2=4r-4 \Rightarrow r^2-4r+4=0 \Rightarrow (r-2)^2=0$ — a REPEATED root $r=2$. Using the CORRECT repeated-root form $a_n=(A+Bn)2^n$ (not the distinct-roots form $A(2^n)+B(2^n)$, which would just collapse to $(A+B)2^n$, a single constant times $2^n$ — insufficient to fit two independent initial conditions). Fit: $a_0=(A+0)2^0=A=1$; $a_1=(A+B)2^1 = 2(1+B)=4 \Rightarrow 1+B=2\Rightarrow B=1$. Closed form: $a_n=(1+n)2^n$. Check: $a_0=1\cdot1=1$ ✓, $a_1=2\cdot2=4$ ✓.

## Component 5 — Teaching Actions

### Teaching Action A01 — Recurrences and Evaluating Terms, via Fibonacci (Primitive P11: Representation Shift)

Start concrete: tell the classic rabbit-population story motivating $F_n=F_{n-1}+F_{n-2}$ (each generation's count is the sum of the previous two). State: "a recurrence relation is exactly this — a rule for getting the NEXT term from earlier ones, plus a starting point (or points) to actually kick things off." Work Example 1's direct term-by-term evaluation.

Shift representation to the characteristic-equation method: state the hypothesis $a_n=r^n$, substitute into the recurrence, and derive the characteristic equation — work Example 2's full distinct-roots solution, including fitting the initial conditions.

- **MC-1 hook**: present Example 3's repeated-root case and ask a student to apply the distinct-roots form $A(2^n)+B(2^n)$ directly — watch whether they notice this collapses to a single effective constant, unable to fit BOTH initial conditions independently, revealing MC-1 (applying the distinct-roots closed-form template to a repeated-root characteristic equation without adjustment).

### Teaching Action A02 — Repeated Roots Require a Different Form, and Order vs. Degree (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's full repeated-root solution using the CORRECT form $(A+Bn)2^n$, explicitly contrasting it against the naive (and here, non-working) distinct-roots template. State the rule: "a repeated root needs the extra factor of $n$ specifically because the distinct-roots form doesn't have enough independent 'directions' to fit two separate initial conditions when both roots coincide — you'd be trying to solve two equations with what's effectively only one unknown."

**Contrast 2**: State the order/degree distinction directly — Fibonacci is "order 2" (references 2 previous terms) with a characteristic equation that happens to be degree 2 as well; state that these numbers coincide for this simple linear-constant-coefficient case but describe fundamentally different objects (the recurrence's own reference depth, vs. the characteristic polynomial's degree) — a distinction that matters more once nonlinear or variable-coefficient recurrences are considered (beyond this concept's scope, but worth naming precisely now).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $a_n=3a_{n-1}-1$ with $a_0=2$, compute $a_1,a_2,a_3$ directly.
  2. Solve $a_n=7a_{n-1}-12a_{n-2}$ with $a_0=1,a_1=6$ using the characteristic-equation method (distinct roots expected).
  3. Solve $a_n=6a_{n-1}-9a_{n-2}$ with $a_0=2,a_1=3$ using the characteristic-equation method, checking carefully whether the roots are distinct or repeated before choosing a solution form.
  4. Explain why the general solution form for a repeated root ($(A+Bn)r^n$) genuinely needs the extra factor of $n$, rather than just being a stylistic convention.
- **P76 (Transfer Probe, mode = cross-link probe against `math.de.ode`)**: "Recall from your `math.de.ode` lesson that an ordinary differential equation involves an unknown function and its derivatives, with 'order' meaning the highest derivative present — directly analogous to this lesson's recurrence 'order' (how many previous discrete terms are referenced). (a) A discrete recurrence $a_n=5a_{n-1}-6a_{n-2}$ (Example 2) and a continuous second-order linear ODE with constant coefficients both use a strikingly similar 'characteristic equation' solsolution method — using this lesson's own characteristic-equation procedure, explain in your own words what role the DISCRETE step (from $a_{n-1}$ to $a_n$) plays here that the CONTINUOUS derivative plays in an ODE's own characteristic-equation method (you do not need ODE-solving details — a structural comparison is sufficient). (b) Explain why BOTH the discrete recurrence and (analogously) the continuous ODE would need an adjusted, repeated-root solution form in the special case their respective characteristic equations have a repeated root, rather than treating repeated roots as a rare edge case unique to one setting or the other."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DISTINCT-ROOTS-FORM-APPLIED-TO-REPEATED-ROOTS | Applying the distinct-roots closed-form template $Ar_1^n+Br_2^n$ directly to a repeated-root characteristic equation, without recognizing the collapse into an underdetermined single-constant form | Foundational |
| MC-2 | INITIAL-CONDITIONS-OMITTED-AS-UNNECESSARY | Believing the recurrence relation alone (without stated initial conditions) fully determines a specific sequence, rather than recognizing infinitely many sequences can satisfy the same recurrence rule with different starting values | Foundational |
| MC-3 | ORDER-CONFLATED-WITH-DEGREE | Treating a recurrence's "order" and its characteristic polynomial's "degree" as interchangeable terms for the identical concept, rather than recognizing them as describing different objects that happen to coincide in this simple linear case | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Distinct-Roots Form Misapplied") → P41 (detect: give a repeated-root recurrence and check whether the student attempts $Ar^n+Br^n$ rather than $(A+Bn)r^n$) → P64 (conceptual shift: show explicitly that $Ar^n+Br^n=(A+B)r^n$ collapses to one effective constant, insufficient to fit two independent initial conditions, motivating the adjusted form).
- **B02 (targets MC-2)**: P27 (name it: "Initial Conditions Omitted") → P41 (detect: give a bare recurrence rule without initial conditions and ask the student to state "the" sequence it defines) → P64 (conceptual shift: demonstrate two different valid sequences satisfying the identical recurrence rule but different starting values, e.g. $a_0=0$ vs. $a_0=5$ for the same $a_n=2a_{n-1}$, producing entirely different sequences).
- **B03 (targets MC-3)**: P27 (name it: "Order/Degree Conflation") → P41 (detect: ask a student to define "order" and "degree" separately for a given recurrence, checking whether they can articulate the distinction rather than just supplying the same number for both) → P64 (conceptual shift: re-anchor on "order describes the recurrence itself — how far back it looks; degree describes the characteristic POLYNOMIAL — these coincide for this simple case but are conceptually distinct").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.sequence` (the general notion of a sequence this concept's recurrence defines), `math.alg.polynomial` (solving the characteristic equation, a polynomial equation).
- **Unlocks**: `math.disc.generating-functions` (generating functions are an alternative, often more powerful technique for solving recurrences, directly building on this concept's foundational setup).
- **Cross-link**: KG lists `math.de.ode` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.de.ode.md` **is already authored** (confirmed: ODEs are defined with an "order" meaning the highest derivative present, directly paralleling this concept's own recurrence order). The P76 transfer probe above directly connects this concept's characteristic-equation method and repeated-root adjustment to the structurally analogous ODE method, treating the discrete-vs-continuous distinction as the key structural comparison point — the sixth instance in this corpus of a genuine, content-verified cross-link probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at the "2 main TAs + gate" compact tier — A01 (recurrences via Fibonacci, plus the characteristic-equation method for distinct roots) and A02 (the repeated-root contrast plus order/degree distinction) jointly cover all three LOs.
- MC-1 (distinct-roots form misapplied to repeated roots) was given the most extensive treatment (both A01's hook and the entirety of A02 Contrast 1) because it represents the single most common procedural error once students have learned ONE closed-form template — the temptation to apply a memorized formula without first checking whether its underlying assumption (distinct roots) actually holds is a recurring pattern this corpus has flagged in several other concepts (e.g. `math.linalg.matrix-inverse`'s analogous "check first" lesson).
- The cross-link probe was deliberately scoped to a STRUCTURAL comparison (discrete step vs. continuous derivative; repeated-root adjustment needed in both settings) rather than requiring genuine ODE-solving technique, since `math.de.ode` itself, while authored, is an introductory concept not assumed to cover the full characteristic-equation method for ODEs — the probe respects that scope boundary while still making a genuine, verifiable cross-concept connection.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.ode` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, structural comparison) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: Fibonacci rabbit story before general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
