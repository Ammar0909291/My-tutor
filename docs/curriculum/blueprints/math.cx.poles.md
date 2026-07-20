# Teaching Blueprint: Poles and Meromorphic Functions (`math.cx.poles`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.poles` |
| name | Poles and Meromorphic Functions |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.cx.singularities` |
| unlocks | `math.cx.residue-theorem` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already classifies a singularity AS a pole via `math.cx.singularities`'s own $|f|\to\infty$ test; the task is refining WHICH pole (its order) and the resulting global notion of meromorphic functions |
| description (KG) | $f$ has a pole of order $n$ at $z_0$ iff $(z-z_0)^nf(z)$ is holomorphic and non-zero at $z_0$. Meromorphic function: holomorphic except at isolated poles. Meromorphic on $\mathbb{C}$ with singularity at $\infty$ is a rational function. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize this concept's ORDER-of-pole notion as a REFINEMENT of `math.cx.singularities`'s own binary pole classification ($|f|\to\infty$) — determine the ORDER $n$ of a pole precisely: the unique $n$ such that $(z-z_0)^nf(z)$ is holomorphic AND NONZERO at $z_0$ (not holomorphic-and-zero, which would indicate too LARGE an $n$; not still-unbounded, which would indicate too SMALL an $n$) — and correctly compute the order of a pole for a specific function using this test.
- LO2: Define a MEROMORPHIC function precisely — holomorphic on a domain EXCEPT at isolated poles (no essential singularities permitted, per `math.cx.singularities`'s own three-way classification) — and correctly determine, for a given function, whether it qualifies as meromorphic by checking that EVERY singularity is specifically a pole (not essential).
- LO3: State (without full proof) the classification result for meromorphic functions on ALL of $\mathbb{C}$ with a controlled singularity at infinity: such a function must be a RATIONAL function (a ratio of two polynomials) — and correctly verify this classification concretely by identifying the poles and their orders of a given rational function, confirming they match the function's own algebraic structure.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.singularities` (isolated singularities classified into removable/pole/essential; a pole is where $|f(z)|\to\infty$ as $z\to z_0$; Riemann's removable-singularity theorem).

## Component 3 — Core Explanation

**Pole order refines `math.cx.singularities`'s binary pole classification into a precise integer**: `math.cx.singularities` already establishes WHETHER a singularity is a pole (via $|f(z)|\to\infty$), but treats "pole" as one single category. This concept asks a SHARPER question: exactly HOW SEVERELY does $f$ blow up? The ORDER $n$ of a pole at $z_0$ is the unique positive integer such that $g(z)=(z-z_0)^nf(z)$ EXTENDS to a holomorphic function at $z_0$ that is ALSO NONZERO there. Multiplying by $(z-z_0)^n$ "cancels" exactly the right amount of blow-up: too SMALL an $n$ leaves $g$ still unbounded (not holomorphic at $z_0$); too LARGE an $n$ over-cancels, making $g(z_0)=0$ instead of nonzero — the CORRECT $n$ is the unique value threading exactly between these two failure modes.

**Meromorphic functions: holomorphic except at isolated poles, essential singularities explicitly excluded**: a function $f$ is MEROMORPHIC on a domain if it is holomorphic EVERYWHERE except at a set of isolated singularities, and EVERY one of those singularities is specifically a POLE (never essential) — directly invoking `math.cx.singularities`'s own three-way classification to define this restriction precisely. This is a genuinely useful intermediate notion: broader than "holomorphic everywhere" (allowing controlled blow-ups) but far more restrictive than "has isolated singularities of any kind" (essential singularities, with their wild, unpredictable behavior per `math.cx.singularities`'s own theory, are explicitly excluded from the meromorphic category).

**Global meromorphic functions on $\mathbb{C}$ with controlled behavior at infinity are exactly the rational functions**: if $f$ is meromorphic on ALL of $\mathbb{C}$ (finitely many poles, since poles are isolated and $\mathbb{C}$ has no "edge" to accumulate them at within any bounded region) AND has at worst a pole (not an essential singularity) at $\infty$ itself (viewing $\infty$ via the substitution $w=1/z$), then $f$ must be a RATIO of two polynomials $P(z)/Q(z)$ — a RATIONAL function. This classification result (stated without full proof) is a genuinely satisfying structural fact: the entire, seemingly broad class of "globally meromorphic with tame behavior at infinity" functions collapses down to the familiar, purely algebraic class of rational functions.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing pole order precisely, breaking MC-1)**: for $f(z)=\frac{1}{(z-2)^3}$ at $z_0=2$: testing $n=2$: $(z-2)^2f(z)=\frac1{z-2}$ — still UNBOUNDED as $z\to2$, not holomorphic there — $n=2$ is too small. Testing $n=3$: $(z-2)^3f(z)=1$ — a CONSTANT function, certainly holomorphic at $z_0=2$, AND nonzero there ($=1\ne0$) — $n=3$ works perfectly. Testing $n=4$ (to confirm uniqueness): $(z-2)^4f(z)=(z-2)$ — holomorphic at $z_0=2$, but EQUALS ZERO there ($z-2=0$ at $z=2$) — $n=4$ over-cancels. So the pole order is EXACTLY $n=3$, confirmed by bracketing between the too-small and too-large cases, exactly as LO1's test requires.

**Example 2 (LO2 — verifying meromorphicity by checking every singularity is a pole, not essential, breaking MC-2)**: for $f(z)=\frac{e^z}{z^2(z-1)}$: singularities at $z=0$ and $z=1$ (both isolated). At $z=0$: testing $(z-0)^2f(z)=\frac{e^z}{z-1}$, holomorphic and nonzero at $z=0$ (equals $\frac{e^0}{-1}=-1\ne0$) — a pole of order 2. At $z=1$: testing $(z-1)f(z)=\frac{e^z}{z^2}$, holomorphic and nonzero at $z=1$ (equals $\frac{e}{1}=e\ne0$) — a pole of order 1. BOTH singularities are confirmed to be poles (via `math.cx.singularities`'s own classification, NEITHER removable NOR essential) — so $f$ qualifies as MEROMORPHIC on $\mathbb{C}$, confirmed by explicitly checking every singularity, not merely assuming it.

**Example 3 (LO3 — verifying the rational-function classification concretely, breaking MC-3)**: for the rational function $f(z)=\frac{z^2+1}{(z-1)(z+2)^2}$: its poles are exactly at $z=1$ (order 1, since the factor $(z-1)$ appears to the first power) and $z=-2$ (order 2, since $(z+2)^2$ appears squared) — DIRECTLY readable from the algebraic factorization, matching the general classification's claim that a globally meromorphic function's poles correspond exactly to the denominator's roots (with orders matching multiplicities). This concretely confirms the classification's DIRECTION already expected (rational $\Rightarrow$ meromorphic with poles matching factorization) — illustrating, though not proving, the deeper CONVERSE claim (meromorphic-with-tame-infinity $\Rightarrow$ rational) that makes the full classification theorem genuinely powerful.

## Component 5 — Teaching Actions

### Teaching Action A01 — Pole Order Is the Unique $n$ Threading Between Too-Small and Too-Large (Primitive P11: Representation Shift)

State: "`math.cx.singularities` tells you SOMETHING is a pole — this concept asks exactly how severe: multiply by $(z-z_0)^n$ for increasing $n$ until the result is holomorphic AND nonzero; too few cancels too little, too many cancels too much, and the CORRECT $n$ is the one unique value between them." Walk Example 1's three-way bracketing test.

- **MC-1 hook**: ask "is there only one way to test a pole's order, or could different values of $n$ all equally satisfy the 'holomorphic and nonzero' test?" — an "any $n$ could work" answer reveals MC-1 (missing that exactly one $n$ threads between the too-small and too-large failure modes).

### Teaching Action A02 — Meromorphic Requires EVERY Singularity to Be a Pole, Checked, Not Assumed (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: BOTH of $f$'s singularities were individually tested and confirmed to be poles (order 2 and order 1 respectively), using `math.cx.singularities`'s own classification apparatus at each point. State: "confirming meromorphicity isn't a vague impression that a function 'looks reasonably well-behaved' — it means EXPLICITLY checking, at every single singularity, that `math.cx.singularities`'s own classification rules out the essential case."

- **MC-2 hook**: ask "does confirming a function is meromorphic require checking every individual singularity against `math.cx.singularities`'s own pole-vs-essential classification, or is it enough that the function seems generally well-behaved?" — a "generally well-behaved is enough" answer reveals MC-2 (missing the requirement to explicitly rule out essential singularities at every point).

### Teaching Action A03 — Globally Meromorphic with Tame Infinity Collapses to Rational Functions (Primitive P06: Contrast Pair)

Contrast the seemingly broad class "meromorphic on all of $\mathbb{C}$ with controlled behavior at infinity" against Example 3's concrete confirmation that the poles of a specific rational function are directly readable from its algebraic factorization — illustrating why the classification theorem's conclusion (this broad class equals exactly the rational functions) is genuinely surprising and powerful, not an empty restatement. State: "this classification result says a seemingly much larger class of functions — anything meromorphic globally with tame behavior at infinity — turns out to be EXACTLY the familiar rational functions, no more and no less."

- **MC-3 hook**: ask "is the classification 'globally meromorphic with tame infinity behavior = rational functions' a fairly obvious, expected fact, or a genuinely nontrivial structural theorem worth stating explicitly?" — a "fairly obvious" answer reveals MC-3 (undervaluing the theorem's genuine content — that an apparently much broader analytic class collapses exactly to the purely algebraic rational functions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine the order of the pole of $f(z)=\frac1{(z+1)^2}$ at $z_0=-1$, using the bracketing test explicitly.
  2. For $f(z)=\frac{\sin z}{z^3}$, determine the order of the pole at $z_0=0$ (recall $\sin z\approx z-\frac{z^3}{6}+\cdots$ near 0).
  3. For $f(z)=e^{1/z}\cdot\frac1{z-1}$, explain, citing `math.cx.singularities`'s own classification, why this function does NOT qualify as meromorphic on $\mathbb{C}$.
  4. For the rational function $f(z)=\frac{z-3}{z^2(z+1)}$, identify all poles and their orders directly from the algebraic factorization.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "An engineer analyzing a control system's transfer function $H(z)=\frac{z^2-1}{z^3-z}$ needs to determine the poles and their orders to assess system stability. (a) First simplify $H(z)$ algebraically (factor numerator and denominator, cancel common factors) before identifying poles — explain why skipping this simplification step could lead to incorrectly identifying a pole where none actually exists. (b) After simplification, identify the true poles of $H(z)$ and their orders using this lesson's bracketing test. (c) Explain why $H(z)$, being a ratio of two polynomials, is automatically meromorphic on $\mathbb{C}$ without needing to individually verify each singularity against `math.cx.singularities`'s classification from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POLE-ORDER-ASSUMED-NON-UNIQUE | Believing multiple values of $n$ could equally satisfy the "holomorphic and nonzero" pole-order test, missing that exactly one $n$ threads between the too-small and too-large failure modes | Foundational |
| MC-2 | MEROMORPHICITY-ASSUMED-NOT-TO-NEED-EXPLICIT-CHECKING | Believing confirming meromorphicity does not require explicitly checking every individual singularity against `math.cx.singularities`'s own pole-vs-essential classification | High |
| MC-3 | RATIONAL-CLASSIFICATION-UNDERVALUED-AS-OBVIOUS | Believing the classification of globally meromorphic functions with tame infinity behavior as exactly the rational functions is an obvious, unremarkable fact rather than a genuinely nontrivial structural theorem | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Pole Order Assumed Non-Unique") → P41 (detect: ask whether multiple $n$ values could satisfy the pole-order test) → P64 (conceptual shift: re-walk Example 1's three-way bracketing test showing exactly one $n$ works).
- **B02 (targets MC-2)**: P27 (name it: "Meromorphicity Assumed Not to Need Explicit Checking") → P41 (detect: ask whether confirming meromorphicity requires checking every singularity explicitly) → P64 (conceptual shift: re-walk Example 2's explicit per-singularity verification).
- **B03 (targets MC-3)**: P27 (name it: "Rational Classification Undervalued as Obvious") → P41 (detect: ask whether the rational-function classification is obvious or genuinely nontrivial) → P64 (conceptual shift: re-walk Example 3's concrete verification and its framing as illustrating, not trivializing, the deeper classification claim).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.singularities` (the isolated-singularity classification into removable/pole/essential this concept's pole-order refinement and meromorphicity definition both directly build on).
- **Unlocks**: `math.cx.residue-theorem` (residues are computed specifically at poles, using this concept's own pole-order classification to determine the residue computation method).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the precise order-determination test, LO2 given full depth requiring explicit per-singularity verification, and LO3 grounded in a concrete confirmation of the classification theorem's structural content.
- **Division of labor**: `math.cx.singularities` already owns the binary pole-vs-removable-vs-essential classification and the general $|f|\to\infty$ pole test (verified by grep — its own Unlocks section explicitly names this concept as the pole-order refinement, and explicitly does NOT cover pole order itself, only the pole/removable/essential trichotomy). This concept owns the precise ORDER-of-pole test, the formal meromorphic-function definition, and the global rational-function classification result — none of which appear in the prerequisite.
- Example 1's deliberate three-way bracketing test (checking $n=2$ too small, $n=3$ correct, $n=4$ too large, rather than just stating the correct answer) was chosen to make the uniqueness of the correct order concretely demonstrable, directly supporting MC-1's repair rather than leaving "why exactly this $n$" as an unverified assertion.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.cx.residue-theorem`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already classifies poles binarily; task is precise order plus the global rational-function classification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
