# Teaching Blueprint: Monotonic Function (`math.func.monotonic-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.monotonic-function` |
| name | Monotonic Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.func.function-concept` |
| unlocks | `math.func.inverse-functions` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with direct point-by-point comparison before the general definition |
| description (KG) | A function that is either entirely increasing (f(a) < f(b) when a < b) or entirely decreasing; strictly monotonic functions are injective. |

## Component 1 — Learning Objectives

- LO1: Define monotonic (entirely increasing OR entirely decreasing across the WHOLE domain) and distinguish **strict** monotonicity ($f(a)<f(b)$ whenever $a<b$, strict inequality) from **weak** (non-strict) monotonicity ($f(a)\le f(b)$, allowing equal values) — recognizing these are genuinely different conditions, not two names for the same thing.
- LO2: Determine whether a function is monotonic on a given interval by examining its behavior across the FULL interval (via direct computation at genuinely varied points, or derivative sign where applicable), rather than extrapolating a trend observed at only a few sample points.
- LO3: Prove that a strictly monotonic function is injective (using a direct argument: if $a\ne b$, then WLOG $a<b$, so strict monotonicity gives $f(a)\ne f(b)$), and recognize that the CONVERSE fails — an injective function need not be monotonic.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (function definition, domain/codomain, evaluating $f$ at specific inputs).

## Component 3 — Core Explanation

**Monotonic means the SAME trend across the entire domain, and strict vs. weak are genuinely different**: a function is monotonic increasing if $f(a)<f(b)$ whenever $a<b$, for EVERY pair $a,b$ in the domain — one exception anywhere disqualifies the whole function from being monotonic (on that domain). Strict monotonicity requires strict inequality ($f(a)<f(b)$); weak (non-strict) monotonicity only requires $f(a)\le f(b)$, permitting the function to stay constant over some stretch. A constant function is weakly both increasing and decreasing simultaneously, yet strictly neither.

**Checking monotonicity requires the full interval, not a trend from a few points**: because monotonicity is a claim about EVERY pair of points in the domain, observing an increasing trend at a handful of sample points does not establish it — the function could turn around between or beyond the sampled points. A genuine check requires examining the function's behavior across the entire interval of interest (algebraically, or via calculus once available), not extrapolating from a partial sample.

**Strict monotonicity implies injectivity, but not conversely**: if $f$ is strictly monotonic (say increasing) and $a\ne b$, then without loss of generality $a<b$, so strict monotonicity gives $f(a)<f(b)$, hence $f(a)\ne f(b)$ — so $f$ is injective (`math.func.injectivity`). This is a genuine, provable implication, not merely an observed correlation. The CONVERSE, however, fails: a function can be injective (never repeating a value) while still reversing direction somewhere in its domain, as long as the reversal doesn't cause any two values to coincide.

## Component 4 — Worked Examples

**Example 1 (LO1 — strict vs. weak monotonicity, breaking MC-1)**: The constant function $f(x)=3$ satisfies $f(a)\le f(b)$ for every $a<b$ (since $3\le3$ always holds) — so $f$ is weakly (non-strictly) BOTH increasing and decreasing simultaneously. But $f$ is strictly NEITHER: $f(a)<f(b)$ never holds, since $f(a)=f(b)=3$ always. Contrast with $g(x)=2x$: $g(a)<g(b)$ whenever $a<b$ (strict inequality genuinely holds), so $g$ is strictly increasing — a fundamentally stronger condition than $f$ satisfies.

**Example 2 (LO2 — sample points can mislead about the full interval, breaking MC-2)**: $f(x)=x^3-3x$, sampled at $x=-3,-2,-1$: $f(-3)=-27+9=-18$, $f(-2)=-8+6=-2$, $f(-1)=-1+3=2$. The sequence $-18\to-2\to2$ looks increasing — extrapolating, a learner might predict $f(0)$ continues higher still. But directly computing $f(0)=0-0=0$, which is LESS than $f(-1)=2$ — the function has actually turned around between $x=-1$ and $x=0$. $f$ is increasing on $(-\infty,-1)$ but decreasing on $(-1,1)$ (turning again to increasing beyond $x=1$) — the three sampled integer points, all lying in the increasing region, gave no warning of the reversal just beyond them.

**Example 3 (LO3 — strict monotonicity proves injectivity, and the converse fails, breaking MC-3)**: For $g(x)=2x+1$ (strictly increasing, since $a<b\Rightarrow2a+1<2b+1$): if $g(a)=g(b)$ then $2a+1=2b+1\Rightarrow a=b$ — confirming injectivity, exactly as the general proof predicts (strict monotonicity $\Rightarrow$ injective). Now consider $h(x)=1/x$ on $\mathbb{R}\setminus\{0\}$: it IS injective ($1/x=1/y\Rightarrow x=y$ for nonzero $x,y$), but is it monotonic on its whole domain? Comparing $-1<-0.5$: $h(-1)=-1$, $h(-0.5)=-2$ — DECREASING here ($-1$ to $-2$). But comparing $-0.5<0.5$: $h(-0.5)=-2$, $h(0.5)=2$ — INCREASING here ($-2$ to $2$). The same function shows both a decrease and an increase across its domain — $h$ is NOT monotonic overall, even though it is injective. Injectivity does not require or imply monotonicity.

## Component 5 — Teaching Actions

### Teaching Action A01 — Strict Requires Strict Inequality Everywhere (Primitive P06: Contrast Pair)

Contrast Example 1's constant function $f(x)=3$ (weakly both increasing and decreasing, strictly neither) against $g(x)=2x$ (strictly increasing). State: "weak monotonicity permits the function to stay flat; strict monotonicity forbids it — these are genuinely different conditions, and a function satisfying only the weak version is not strictly monotonic."

- **MC-1 hook**: ask "does 'the function is non-decreasing' mean the same thing as 'the function is strictly increasing'?" — a "yes" answer reveals MC-1 (conflating weak and strict monotonicity).

### Teaching Action A02 — A Trend at Sampled Points Is Not a Proof Across the Whole Interval (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the sampled trend $-18\to-2\to2$ (looking increasing) is broken by $f(0)=0$, a reversal invisible from the sampled points alone. State: "monotonicity is a claim about EVERY pair in the domain — checking a few points, even several in a row, can never rule out a reversal just beyond them."

- **MC-2 hook**: ask "if a function increases across several sample points in a row, is that enough to conclude it is monotonic increasing on the whole interval?" — a "yes" answer reveals MC-2 (extrapolating a sampled trend into a full-interval conclusion).

### Teaching Action A03 — Strict Monotonicity Implies Injectivity, But Injectivity Does Not Imply Monotonicity (Primitive P11: Representation Shift)

State: "strict monotonicity is a SUFFICIENT condition for injectivity — provably so — but it is not NECESSARY: a function can avoid ever repeating a value while still changing direction somewhere." Work Example 3's two-part demonstration: the general proof applied to $g(x)=2x+1$, then the injective-but-not-monotonic counterexample $h(x)=1/x$.

- **MC-3 hook**: ask "if a function is injective (never repeats a value), must it also be monotonic?" — a "yes" answer reveals MC-3 (incorrectly believing the converse of "strictly monotonic $\Rightarrow$ injective" also holds).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State whether $f(x)=|x|$ (absolute value) restricted to $x\ge0$ is strictly increasing, weakly increasing, both, or neither, and justify with the definitions.
  2. A function is sampled at $x=1,2,3$ giving $f(1)=5,f(2)=8,f(3)=11$ (increasing). Explain why this alone does not establish $f$ is monotonic increasing on all of $\mathbb{R}$, and describe what additional information would be needed.
  3. Prove directly that $g(x)=-3x+7$ (strictly decreasing) is injective, using the general strict-monotonicity-implies-injectivity argument.
  4. Give an example of a function (other than $1/x$) that is injective but not monotonic on its domain, and explain specifically where the direction reverses.
- **P76 (Transfer Probe, mode = independence)**: "An economist models a company's profit as a function of units sold, $P(x)$, and observes that for the first 100 units sampled ($x=10,20,\dots,100$), profit consistently increases. (a) Explain why this sampled evidence alone does not establish that $P$ is monotonic increasing for all production levels $x$. (b) The economist separately proves that $P$ is STRICTLY increasing on the interval $[0,500]$. Using this lesson's proof technique, explain what this strict monotonicity implies about whether two different production levels in that interval can ever yield the identical profit. (c) A colleague argues 'since the pricing function used elsewhere in the model is known to be injective (no two prices are ever identical for different inputs), it must also be monotonic.' Using this lesson's $1/x$-style counterexample reasoning, explain specifically why this argument is invalid."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STRICT-WEAK-MONOTONICITY-CONFLATED | Believing "increasing" (weak, $f(a)\le f(b)$) and "strictly increasing" ($f(a)<f(b)$) are the same condition, missing that a constant function satisfies the weak version but neither strict version | Foundational |
| MC-2 | MONOTONICITY-EXTRAPOLATED-FROM-SAMPLE-POINTS | Believing an increasing (or decreasing) trend observed at several sample points establishes monotonicity across the whole interval, missing that a reversal could occur between or beyond the sampled points | Foundational |
| MC-3 | INJECTIVE-IMPLIES-MONOTONIC | Believing every injective function must also be monotonic, missing that a function can avoid repeating values while still reversing direction somewhere in its domain | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Strict/Weak Monotonicity Conflated") → P41 (detect: ask a student whether a constant function counts as "strictly increasing," checking for "yes") → P64 (conceptual shift: re-walk Example 1's constant-vs-linear contrast, re-anchoring on "weak permits flat stretches; strict forbids them entirely").
- **B02 (targets MC-2)**: P27 (name it: "Monotonicity Extrapolated from Sample Points") → P41 (detect: present three increasing sample points and ask whether the function is thereby proven monotonic on the whole interval, checking for "yes") → P64 (conceptual shift: re-walk Example 2's reversal at $f(0)$, invisible from the sampled trend, re-anchoring on "monotonicity is a claim about every pair — sampling a few points can never establish it").
- **B03 (targets MC-3)**: P27 (name it: "Injective Implies Monotonic") → P41 (detect: ask a student whether an injective function must be monotonic, checking for "yes") → P64 (conceptual shift: re-walk Example 3's $1/x$ counterexample, showing an injective function that both increases and decreases across its domain, re-anchoring on "strict monotonicity is sufficient for injectivity, never necessary").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (function definition and evaluation, the baseline this concept builds on).
- **Unlocks**: `math.func.inverse-functions` (strict monotonicity is exactly the condition that guarantees a function's restriction to its range has a well-defined inverse, via the injectivity this concept proves).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**. Note: although not a formal `requires` or `cross_links` entry, LO3's central proof directly connects to already-authored `math.func.injectivity` (batch 103) — this concept supplies a SUFFICIENT condition (strict monotonicity) for that concept's injectivity definition, rather than restating its content.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept builds directly on already-mastered function evaluation without requiring new computational machinery.
- **Division of labor**: `math.func.injectivity` (authored batch 103) owns the general definition and non-monotonic-context examples of injectivity. This concept, `math.func.monotonic-function`, deliberately does not re-derive injectivity's general theory; it owns the SPECIFIC provable implication (strict monotonicity $\Rightarrow$ injective) and, just as importantly, the converse's failure — content injectivity's own blueprint would have no reason to cover, since it is monotonicity-specific.
- Example 3's $h(x)=1/x$ counterexample was deliberately chosen as a single, minimal, well-known function serving BOTH purposes at once (confirms injectivity directly, refutes the converse-monotonicity claim by comparing across the domain's two pieces) rather than requiring two separate functions.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: point-by-point comparison before general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
