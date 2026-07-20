# Teaching Blueprint: Arithmetic Sequence (`math.seq.arithmetic-sequence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.seq.arithmetic-sequence` |
| name | Arithmetic Sequence |
| domain | Sequences |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.seq.sequence` |
| unlocks | `math.seq.arithmetic-series` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — proficient learner already recognizes constant-difference patterns informally from `math.seq.sequence`'s own preview; the task is the formal formula, the LINEAR (additive) behavior contrast with the geometric (multiplicative) case, and genuine applications |
| description (KG) | A sequence where each term differs from the previous by a fixed common difference $d$: $a_n=a_1+(n-1)d$. |

## Component 1 — Learning Objectives

- LO1: Formalize `math.seq.sequence`'s own informal preview (identifying a constant DIFFERENCE between consecutive terms, as opposed to a constant RATIO) into the precise explicit formula $a_n=a_1+(n-1)d$ — and correctly derive this formula from the recursive definition $a_n=a_{n-1}+d$ by unwinding the recursion, exactly paralleling `math.seq.geometric-sequence`'s own unwinding derivation but with ADDITION accumulating instead of MULTIPLICATION.
- LO2: Correctly classify an arithmetic sequence's long-run behavior from the sign of $d$ ALONE — increasing without bound for $d>0$, decreasing without bound for $d<0$, constant for $d=0$ — and explicitly contrast this LINEAR, UNBOUNDED-OR-CONSTANT behavior against `math.seq.geometric-sequence`'s own richer classification (which additionally distinguishes decay/growth by $|r|$ and oscillation by sign), correctly explaining WHY arithmetic sequences have no "decay toward zero while still moving" analogue the way geometric sequences do.
- LO3: Apply arithmetic sequences to a genuine real-world context involving LINEAR (additive, not compound) accumulation — correctly setting up the model for a scenario (e.g. simple, non-compounding interest, or a fixed hourly wage accumulation, or linear depreciation by a fixed dollar amount) and computing a specific term, while correctly identifying which quantity plays the role of $a_1$ and which plays the role of $d$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.sequence` (the general definition of a sequence as a function from $\mathbb{N}$; the informal preview recognizing constant-difference patterns as "arithmetic," deferred to this concept for full development).

## Component 3 — Core Explanation

**The explicit formula, derived by unwinding the recursion — additively, not multiplicatively**: `math.seq.sequence`'s own preview identifies the pattern (constant difference: $a_n-a_{n-1}=d$ for every $n$, i.e. $a_n=a_{n-1}+d$). Unwinding this recursion explicitly: $a_2=a_1+d$; $a_3=a_2+d=(a_1+d)+d=a_1+2d$; $a_4=a_3+d=a_1+3d$; continuing, $a_n=a_1+(n-1)d$ — the coefficient of $d$ is $n-1$ (not $n$) for EXACTLY the same reason `math.seq.geometric-sequence`'s exponent was $n-1$: reaching term $n$ from $a_1$ requires exactly $n-1$ steps. The structural PARALLEL is genuine — both derivations track the number of steps taken — but the OPERATION accumulated differs fundamentally: arithmetic sequences accumulate $d$ by REPEATED ADDITION, geometric sequences accumulate $r$ by REPEATED MULTIPLICATION.

**Arithmetic long-run behavior is determined ENTIRELY by the SIGN of $d$ — a strictly simpler classification than the geometric case**: since $a_n=a_1+(n-1)d$ is LINEAR in $n$, the behavior is simple: $d>0$ gives an UNBOUNDED INCREASING sequence; $d<0$ gives an UNBOUNDED DECREASING sequence; $d=0$ gives a CONSTANT sequence. There is NO analogue of `math.seq.geometric-sequence`'s decay-toward-zero behavior (which required $|r|<1$, a MAGNITUDE condition on the multiplicative factor) — because ADDING a fixed nonzero amount repeatedly can NEVER cause the terms to approach a finite limit; the terms just keep accumulating in one direction, without bound, for ANY nonzero $d$, however small. This is a structural consequence of addition versus multiplication: multiplying repeatedly by a factor with $|r|<1$ shrinks toward zero, but adding a fixed nonzero amount repeatedly never "shrinks" — it only ever grows or shrinks WITHOUT bound (never approaching a finite limit), or stays exactly constant at $d=0$.

**Arithmetic sequences model LINEAR (additive, non-compounding) accumulation processes**: any process adding the SAME fixed amount each period — simple (non-compounding) interest (a FIXED dollar amount added each period, computed once on the ORIGINAL principal, not on the growing balance), a fixed hourly wage accumulating hour by hour, or linear depreciation (an asset losing the SAME fixed dollar amount of value each year) — is an arithmetic sequence, with $a_1$ the STARTING value and $d$ the FIXED per-period ADDITIVE change (which can be negative, for depreciation or decrease). This contrasts sharply with `math.seq.geometric-sequence`'s own compound-growth modeling, where the per-period change is instead a MULTIPLICATIVE factor.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the formula by unwinding the recursion, breaking MC-1)**: for an arithmetic sequence with $a_1=5$, $d=3$: unwinding directly: $a_1=5$; $a_2=a_1+3=8$; $a_3=a_2+3=11=5+2\times3$; $a_4=a_3+3=14=5+3\times3$. Pattern confirmed: $a_n=5+(n-1)\times3$ — verified explicitly ($a_4=5+3\times3=5+9=14$ ✓), demonstrating the formula EMERGES from unwinding the recursion, with the coefficient $n-1$ directly traceable to counting exactly $n-1$ addition steps from $a_1$ — the SAME step-counting logic as `math.seq.geometric-sequence`'s own derivation, but accumulating $d$ additively rather than $r$ multiplicatively.

**Example 2 (LO2 — arithmetic behavior's strict simplicity contrasted with geometric's richness, breaking MC-2)**: for $a_1=10,d=-2$: the sequence DECREASES without bound ($10,8,6,4,2,0,-2,-4,\ldots$) — notice it does NOT "decay toward zero and stop" the way a geometric sequence with $|r|<1$ would; it simply keeps decreasing PAST zero, without bound, forever. Contrast directly with `math.seq.geometric-sequence`'s own Example 2, where $a_1=5,r=0.5$ genuinely APPROACHES (but never reaches) zero, staying positive forever — a fundamentally different long-run shape. No choice of nonzero $d$ can replicate this "approach a finite limit" behavior for an arithmetic sequence — confirming LO2's structural claim concretely.

**Example 3 (LO3 — modeling simple interest correctly, contrasted with compound, breaking MC-3)**: a \$1000 investment earns SIMPLE (non-compounding) interest of 5% per year, computed ALWAYS on the original \$1000 (not on the growing balance). Each year adds a FIXED $1000\times0.05=\$50$ — so $a_1=1000$ (starting balance) and $d=50$ (the FIXED yearly addition, computed once and reused every year, NOT recalculated on a growing balance). After 3 years: $a_4=a_1+3d=1000+3\times50=1150$ — computed via simple ADDITION. Contrast directly with `math.seq.geometric-sequence`'s own Example 3 (the SAME \$1000 at 5% COMPOUND interest reached \$1157.625 after 3 years) — a strictly LARGER value, since compounding earns interest on ALREADY-earned interest, while simple interest's fixed $d=50$ never grows, concretely confirming the two models are genuinely different, not interchangeable phrasings of "5% growth."

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Comes From Unwinding the Recursion — Additively, Paralleling the Geometric Case (Primitive P11: Representation Shift)

State: "`math.seq.sequence` already showed you the constant-difference pattern informally — this concept derives $a_n=a_1+(n-1)d$ by tracking how many times $d$ gets ADDED, from $a_1$ up to $a_n$ — the SAME step-counting logic as the geometric case, but accumulating additively instead of multiplicatively." Walk Example 1's step-by-step unwinding.

- **MC-1 hook**: ask "is the coefficient of $d$ in $a_n=a_1+(n-1)d$ equal to $n$ or to $n-1$, and why specifically that value?" — an "$n$" answer (or inability to justify $n-1$) reveals MC-1 (missing the direct derivation connecting the coefficient to the number of addition STEPS, not the term's INDEX).

### Teaching Action A02 — Arithmetic Sequences Have No "Decay Toward a Finite Limit" Behavior (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $a_1=10,d=-2$ decreases PAST zero without bound, never settling near any finite value — structurally different from a geometric sequence's genuine decay-toward-zero for $|r|<1$. State: "adding a fixed nonzero amount repeatedly NEVER makes a sequence approach a finite limit — it always marches off to $+\infty$ or $-\infty$ (or stays exactly constant at $d=0$); only MULTIPLYING by a factor smaller than 1 in magnitude can produce genuine decay toward zero."

- **MC-2 hook**: ask "can an arithmetic sequence with $d\ne0$ ever 'decay' toward a finite limit the way a geometric sequence with $|r|<1$ does?" — a "yes" answer reveals MC-2 (missing the structural reason additive accumulation can never produce this behavior).

### Teaching Action A03 — Simple Interest's $d$ Is a Fixed Addition, Not a Recalculated Percentage (Primitive P06: Contrast Pair)

Contrast Example 3's simple-interest computation (fixed $d=50$ added every year, giving \$1150 after 3 years) directly against `math.seq.geometric-sequence`'s own compound-interest result (\$1157.625 after 3 years, using $r=1.05$) on the SAME starting principal and SAME percentage. State: "simple interest and compound interest at the 'same rate' are NOT interchangeable — simple interest is arithmetic (a fixed dollar amount $d$ added every period, computed once on the original principal), while compound interest is geometric (a multiplicative factor $r$ applied to the CURRENT, growing balance)."

- **MC-3 hook**: ask "for a fixed percentage rate, does simple interest and compound interest produce the same total after several periods, since they're 'the same rate'?" — a "yes, same result" answer reveals MC-3 (conflating the additive arithmetic model with the multiplicative geometric model, missing that compounding genuinely produces a larger result).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For an arithmetic sequence with $a_1=4$, $d=6$, derive $a_5$ by unwinding the recursion, then verify against the explicit formula.
  2. Explain, without computing terms, why an arithmetic sequence with $d=-0.1$ (a very small negative difference) still decreases WITHOUT bound, rather than approaching a finite limit.
  3. A worker earns a fixed \$20/hour with no bonuses or raises. Set up the total-earnings-after-$n$-hours as an arithmetic sequence, correctly identifying $a_1$ and $d$.
  4. Explain, using both this concept's simple-interest example and `math.seq.geometric-sequence`'s own compound-interest example, why "5% simple interest" and "5% compound interest" on the same principal produce genuinely different results after multiple years.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A phone plan charges a flat \$30 base fee plus \$0.10 per minute used, while a SEPARATE savings account starts at \$500 and grows via 3% ANNUAL COMPOUND interest. (a) Model the phone bill's total cost as a function of minutes used as an arithmetic sequence (treating minutes as the index), correctly identifying $a_1$ and $d$. (b) Explain why the savings account's growth CANNOT be modeled as an arithmetic sequence, citing the structural reason arithmetic sequences can't replicate compounding behavior. (c) If someone mistakenly modeled the savings account using an arithmetic sequence with $d=500\times0.03=15$ (treating it like simple interest), explain specifically how and why this would UNDERESTIMATE the account's true value after several years."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ARITHMETIC-COEFFICIENT-ASSUMED-EQUAL-TO-INDEX | Believing the explicit formula's coefficient of $d$ equals $n$ rather than $n-1$, missing the direct connection between the coefficient and the number of addition steps from $a_1$ | Foundational |
| MC-2 | ARITHMETIC-SEQUENCE-ASSUMED-CAN-DECAY-TO-LIMIT | Believing an arithmetic sequence with nonzero $d$ can decay toward a finite limit the way a geometric sequence with $|r|<1$ does, missing the structural reason additive accumulation cannot produce this behavior | High |
| MC-3 | SIMPLE-AND-COMPOUND-INTEREST-CONFLATED | Believing simple interest and compound interest at the "same rate" produce the same total, missing that compounding (multiplicative, geometric) genuinely outpaces simple interest (additive, arithmetic) | High |

- **B01 (targets MC-1)**: P27 (name it: "Arithmetic Coefficient Assumed Equal to Index") → P41 (detect: ask for the coefficient of $d$ and whether it's $n$ or $n-1$) → P64 (conceptual shift: re-walk Example 1's step-by-step recursion unwinding).
- **B02 (targets MC-2)**: P27 (name it: "Arithmetic Sequence Assumed Can Decay to Limit") → P41 (detect: ask whether an arithmetic sequence can decay toward a finite limit) → P64 (conceptual shift: re-walk Example 2's unbounded-decrease demonstration, contrasted against geometric decay).
- **B03 (targets MC-3)**: P27 (name it: "Simple and Compound Interest Conflated") → P41 (detect: ask whether simple and compound interest at the same rate give the same result) → P64 (conceptual shift: re-walk Example 3's direct numeric comparison against `math.seq.geometric-sequence`'s compound-interest result).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.sequence` (the general sequence definition and the informal arithmetic-pattern preview this concept fully formalizes).
- **Unlocks**: `math.seq.arithmetic-series` (summing arithmetic sequences, building directly on this concept's explicit formula).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the formula in a genuine derivation paralleling `math.seq.geometric-sequence`'s own, LO2 given full depth via a structural (not merely example-based) explanation of why decay-to-limit behavior is impossible, and LO3 addressing the single most common real-world modeling confusion (simple vs. compound).
- **Division of labor**: `math.seq.sequence` already owns the general sequence definition and previews arithmetic patterns only informally, explicitly deferring full development here (verified by grep — parallel structure to its own geometric preview); `math.seq.series` (authored) already covers geometric, telescoping, and alternating series in depth as its three worked instances but contains NO arithmetic-sequence or arithmetic-series content (verified by grep — only a single forward-pointer name, "math.seq.arithmetic-series"). This concept owns the formal explicit-formula derivation, the (strictly simpler) behavioral classification, and genuine linear-accumulation modeling applications, deliberately contrasted against — not confused with — `math.seq.geometric-sequence`'s own compound-growth modeling.
- Example 3's deliberate reuse of the EXACT SAME starting principal (\$1000) and EXACT SAME percentage (5%) as `math.seq.geometric-sequence`'s own Example 3, computed here via simple interest instead of compound, was chosen specifically to make the two models' genuinely different results directly, numerically comparable — \$1150 (simple/arithmetic) vs. \$1157.625 (compound/geometric) — rather than using unrelated numbers that would leave the contrast only qualitative.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.seq.arithmetic-series`) |
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
