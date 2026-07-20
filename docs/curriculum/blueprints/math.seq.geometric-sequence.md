# Teaching Blueprint: Geometric Sequence (`math.seq.geometric-sequence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.seq.geometric-sequence` |
| name | Geometric Sequence |
| domain | Sequences |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.seq.sequence` |
| unlocks | `math.seq.geometric-series` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — proficient learner already recognizes geometric patterns informally from `math.seq.sequence`'s own preview; the task is the formal formula, full behavioral classification by $r$, and genuine applications |
| description (KG) | A sequence where each term is multiplied by a fixed common ratio $r$: $a_n=a_1\cdot r^{n-1}$. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Formalize `math.seq.sequence`'s own informal preview (identifying a constant RATIO between consecutive terms, as opposed to a constant DIFFERENCE) into the precise explicit formula $a_n=a_1\cdot r^{n-1}$ — and correctly derive this formula from the recursive definition $a_n=a_{n-1}\cdot r$ by unwinding the recursion, rather than treating the formula as a fact to memorize.
- LO2: Classify a geometric sequence's LONG-RUN BEHAVIOR based on the value of $r$ — DECAYING toward 0 when $|r|<1$, GROWING without bound when $|r|>1$, OSCILLATING in sign when $r<0$, and CONSTANT when $r=1$ (with the boundary/degenerate cases $r=0$ and $r=-1$ handled explicitly) — and correctly predict a specific sequence's long-run behavior directly from its ratio, without computing many terms.
- LO3: Apply geometric sequences to a genuine real-world context (compound growth/decay) — correctly setting up the geometric-sequence model for a scenario (e.g. compound interest, radioactive decay, population growth) and computing a specific term, while correctly identifying which quantity plays the role of $a_1$ and which plays the role of $r$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.sequence` (the general definition of a sequence as a function from $\mathbb{N}$; the informal preview recognizing constant-ratio patterns as "geometric," deferred to this concept for full development).

## Component 3 — Core Explanation

**The explicit formula, derived by unwinding the recursion, not memorized**: `math.seq.sequence`'s own preview already identifies the PATTERN (constant ratio between consecutive terms: $a_{n}/a_{n-1}=r$ for every $n$, i.e. $a_n=a_{n-1}\cdot r$). Unwinding this recursion explicitly: $a_2=a_1\cdot r$; $a_3=a_2\cdot r=(a_1\cdot r)\cdot r=a_1\cdot r^2$; $a_4=a_3\cdot r=a_1\cdot r^3$; continuing this pattern, $a_n=a_1\cdot r^{n-1}$ — the exponent is $n-1$ (not $n$) because reaching term $n$ from $a_1$ requires exactly $n-1$ multiplications by $r$. This derivation, not a memorized formula, is what makes the "why $n-1$, not $n$" question answerable directly.

**Long-run behavior is entirely determined by the value of $r$**: since $a_n=a_1\cdot r^{n-1}$, the sequence's behavior as $n\to\infty$ depends ENTIRELY on how $r^{n-1}$ behaves. For $|r|<1$: $r^{n-1}\to0$ (each multiplication shrinks the magnitude further), so $a_n\to0$ — DECAY. For $|r|>1$: $r^{n-1}$ grows without bound, so $|a_n|\to\infty$ — GROWTH. For $r<0$ specifically: the SIGN of $r^{n-1}$ alternates with each step (positive when $n-1$ is even, negative when odd), giving OSCILLATION superimposed on whatever growth/decay magnitude behavior $|r|$ separately determines. Boundary cases: $r=1$ gives a CONSTANT sequence ($a_n=a_1$ for all $n$); $r=0$ makes every term past $a_1$ equal to $0$ (a degenerate case); $r=-1$ oscillates between $+a_1$ and $-a_1$ with NEITHER growth nor decay (magnitude stays exactly constant).

**Geometric sequences model MULTIPLICATIVE (compound) growth and decay processes**: any process where a quantity is repeatedly multiplied by the SAME factor each period — compound interest (balance multiplied by $(1+\text{rate})$ each period), radioactive decay (quantity multiplied by a fixed decay factor each half-life), population growth (population multiplied by a growth factor each generation) — is EXACTLY a geometric sequence, with $a_1$ the STARTING quantity and $r$ the PER-PERIOD multiplicative factor. Correctly identifying which real-world number plays which role ($a_1$ vs. $r$) is the key modeling step separating a correctly-set-up problem from an incorrectly-set-up one.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the formula by unwinding the recursion, breaking MC-1)**: for a geometric sequence with $a_1=3$, $r=2$: unwinding directly: $a_1=3$; $a_2=a_1\cdot2=6$; $a_3=a_2\cdot2=12=3\cdot2^2$; $a_4=a_3\cdot2=24=3\cdot2^3$. Pattern confirmed: $a_n=3\cdot2^{n-1}$ — verified explicitly ($a_4=3\cdot2^3=3\cdot8=24$ ✓, matching the recursive computation exactly), demonstrating the formula EMERGES from unwinding the recursion rather than being asserted, with the exponent $n-1$ directly traceable to counting exactly $n-1$ multiplication steps from $a_1$ to $a_n$.

**Example 2 (LO2 — classifying long-run behavior directly from $r$, breaking MC-2)**: comparing four geometric sequences by their ratio alone, without computing many terms: $a_1=5,r=0.5$ ($|r|<1$): DECAYS toward $0$ (terms $5,2.5,1.25,0.625,\ldots$). $a_1=2,r=3$ ($|r|>1$): GROWS without bound ($2,6,18,54,\ldots$). $a_1=4,r=-0.5$ ($r<0$, $|r|<1$): OSCILLATES in sign WHILE decaying in magnitude ($4,-2,1,-0.5,\ldots$ — approaching $0$, alternating sign). $a_1=1,r=-2$ ($r<0$, $|r|>1$): OSCILLATES in sign WHILE growing in magnitude ($1,-2,4,-8,\ldots$ — unbounded, alternating sign) — confirming the sign and magnitude behaviors are SEPARATE effects, both determined directly from $r$'s value and sign, exactly as LO2's classification predicts.

**Example 3 (LO3 — modeling compound interest correctly, breaking MC-3)**: a savings account starts with \$1000 and earns 5% interest compounded annually. Setting up the geometric-sequence model: $a_1=1000$ (the STARTING balance — the quantity present at the very first period, NOT the interest rate), $r=1.05$ (the PER-PERIOD multiplicative factor — the balance is multiplied by $1+0.05=1.05$ each year, NOT simply $0.05$ itself, which would be the increment rate alone, missing the "keep the existing 100%" part). After 3 years: $a_4=a_1\cdot r^3=1000\times1.05^3=1000\times1.157625=1157.625$ — computed directly from the correctly-identified $a_1$ and $r$, confirming LO3's modeling-setup skill concretely (note: $a_4$, not $a_3$, since $a_1$ represents the START, before any interest is applied — after 3 years of growth, this is the 4th term in the sequence).

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Comes From Unwinding the Recursion, Not Memorization (Primitive P11: Representation Shift)

State: "`math.seq.sequence` already showed you the pattern informally — this concept derives the formula $a_n=a_1\cdot r^{n-1}$ by literally tracking how many times $r$ gets multiplied in, from $a_1$ up to $a_n$." Walk Example 1's step-by-step unwinding.

- **MC-1 hook**: ask "is the exponent in $a_n=a_1\cdot r^{n-1}$ equal to $n$ or to $n-1$, and why specifically that value?" — an "$n$" answer (or an inability to justify $n-1$) reveals MC-1 (missing the direct derivation connecting the exponent to the number of multiplication STEPS, not the term's INDEX).

### Teaching Action A02 — Sign and Magnitude Behavior Are Determined Separately by $r$ (Primitive P28: Conflict Evidence)

Present Example 2's direct four-way comparison: sign behavior (oscillating vs. not) determined by whether $r<0$, MAGNITUDE behavior (growing vs. decaying) determined SEPARATELY by $|r|$ compared to $1$ — confirmed across all four combinations. State: "don't try to guess a geometric sequence's behavior from $r$ all at once — separate the question into two independent checks: does $|r|$ predict growth or decay, and does $r$'s SIGN predict oscillation or not."

- **MC-2 hook**: ask "for a geometric sequence with $r=-3$, does the negative sign of $r$ by itself tell you whether the sequence's MAGNITUDE grows or decays?" — a "yes" answer reveals MC-2 (conflating the sign-driven oscillation question with the magnitude-driven growth/decay question, which are determined independently).

### Teaching Action A03 — Correctly Identifying $a_1$ and $r$ Is the Key Modeling Step (Primitive P06: Contrast Pair)

Contrast the tempting error of setting $r=0.05$ (just the interest RATE) against Example 3's correct $r=1.05$ (the full multiplicative factor, including "keeping the existing balance"). State: "the per-period multiplier $r$ isn't just the growth RATE by itself — it's the factor the ENTIRE quantity gets multiplied by, which for compound growth means $1+\text{rate}$, not the rate alone."

- **MC-3 hook**: ask "for a 5% annual compound interest scenario, is the correct geometric-sequence ratio $r=0.05$ or $r=1.05$?" — a "$r=0.05$" answer reveals MC-3 (using the bare growth rate instead of the full multiplicative factor $1+\text{rate}$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a geometric sequence with $a_1=7$, $r=3$, derive $a_5$ by unwinding the recursion, then verify against the explicit formula.
  2. Classify the long-run behavior (growth/decay, oscillating or not) of a geometric sequence with $r=-0.8$, without computing terms directly.
  3. A population of bacteria starts at 200 and TRIPLES every hour. Correctly identify $a_1$ and $r$, then compute the population after 4 hours.
  4. Explain why the per-period ratio $r$ for a 3% compound DECAY (e.g. depreciation) scenario is $0.97$, not $0.03$ or $-0.03$.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A financial analyst is comparing two investment scenarios: Scenario A grows a \$5000 initial investment by a fixed 4% each year; Scenario B starts with the SAME \$5000 but LOSES 4% of its value each year (e.g. due to a depreciating asset). (a) Set up BOTH scenarios as geometric sequences, correctly identifying $a_1$ and $r$ for each — being careful that Scenario B's ratio is NOT simply the negative of Scenario A's. (b) Using this lesson's classification (LO2), explain why Scenario A's sequence grows without bound while Scenario B's sequence decays toward (but never reaches) zero, citing each scenario's specific $r$ value. (c) Compute both scenarios' values after 5 years, and explain concretely why Scenario B's value, despite steadily shrinking, mathematically never reaches exactly zero."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GEOMETRIC-EXPONENT-ASSUMED-EQUAL-TO-INDEX | Believing the explicit formula's exponent equals $n$ rather than $n-1$, missing the direct connection between the exponent and the number of multiplication steps from $a_1$ | Foundational |
| MC-2 | SIGN-AND-MAGNITUDE-BEHAVIOR-CONFLATED | Believing $r$'s sign alone determines whether the sequence's magnitude grows or decays, missing that sign-driven oscillation and magnitude-driven growth/decay are determined independently | High |
| MC-3 | RATIO-SET-TO-BARE-GROWTH-RATE | Believing the per-period ratio $r$ for compound growth/decay is the bare percentage rate itself, rather than $1+\text{rate}$ (growth) or $1-\text{rate}$ (decay) | High |

- **B01 (targets MC-1)**: P27 (name it: "Geometric Exponent Assumed Equal to Index") → P41 (detect: ask for the exponent in the explicit formula and whether it's $n$ or $n-1$) → P64 (conceptual shift: re-walk Example 1's step-by-step recursion unwinding).
- **B02 (targets MC-2)**: P27 (name it: "Sign and Magnitude Behavior Conflated") → P41 (detect: ask whether $r$'s sign alone determines magnitude growth/decay) → P64 (conceptual shift: re-walk Example 2's four-way independent comparison).
- **B03 (targets MC-3)**: P27 (name it: "Ratio Set to Bare Growth Rate") → P41 (detect: ask for the correct $r$ value for a 5% compound growth scenario) → P64 (conceptual shift: re-walk Example 3's correct $r=1.05$ setup).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.sequence` (the general sequence definition and the informal geometric-pattern preview this concept fully formalizes).
- **Unlocks**: `math.seq.geometric-series` (summing geometric sequences, building directly on this concept's explicit formula).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the formula in a genuine derivation, LO2 given full classification depth separating sign and magnitude effects, and LO3 addressing the single most common real-world modeling error (bare rate vs. full multiplicative factor).
- **Division of labor**: `math.seq.sequence` already owns the general sequence definition and previews geometric patterns only informally, explicitly deferring full development here (verified by grep — its own "Next concepts" note names this concept as where geometric sequences receive full treatment). This concept owns the formal explicit-formula derivation, the full $r$-based behavioral classification, and genuine compound-growth/decay modeling applications — none of which appear in the prerequisite beyond the bare pattern-recognition preview.
- Example 2's deliberate four-way comparison (covering all combinations of $|r|\lessgtr1$ and $r\lessgtr0$) rather than a single illustrative case was chosen specifically to make the sign/magnitude independence concrete and falsifiable across every combination, directly supporting MC-2's repair rather than leaving the independence claim as an unverified generalization from one example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.seq.geometric-series`) |
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
| V-15 | CPA_entry_stage justified | PASS (Concrete: proficient learner already recognizes the pattern informally; task is the formal formula, classification, and applications) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
