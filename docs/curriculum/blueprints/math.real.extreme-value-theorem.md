# Teaching Blueprint: Extreme Value Theorem (`math.real.extreme-value-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.extreme-value-theorem` |
| name | Extreme Value Theorem |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.real.compactness`, `math.real.continuity-rigorous` |
| unlocks | none |
| cross_links | `math.calc.optimization` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has compactness and rigorous continuity; the task is proving EXISTENCE of extrema (not finding them, which `math.calc.optimization`'s own computational method already handles) |
| description (KG) | A continuous function on a compact (closed, bounded in $\mathbb{R}^n$) set attains its maximum and minimum. Proof: image of compact set under continuous map is compact; compact sets in $\mathbb{R}$ have a max and min. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize this theorem as answering a EXISTENCE question `math.calc.optimization`'s own computational method (critical points + endpoints) silently PRESUPPOSES — that a global max/min genuinely EXISTS to be found — and correctly identify why `math.calc.optimization`'s method is only guaranteed to succeed on a domain satisfying THIS theorem's hypothesis (compact, i.e. closed and bounded).
- LO2: Prove the theorem's two-step structure: (a) `math.real.compactness`'s own fact that continuous images of compact sets are compact, applied to conclude $f(K)$ is compact whenever $K$ is; (b) a compact subset of $\mathbb{R}$ is closed and bounded, hence CONTAINS its own supremum and infimum (since a bounded set's sup/inf could otherwise be a "missing" limit point, but closedness rules this out) — and correctly explain why BOTH steps are needed, not just boundedness of $f(K)$ alone.
- LO3: Correctly identify why DROPPING either hypothesis (continuity or compactness) breaks the conclusion, using a concrete counterexample for each — a continuous function on a NON-compact domain failing to attain its max (e.g. $f(x)=x$ on $(0,1)$), and a DISCONTINUOUS function on a compact domain failing to attain its max.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.compactness` (a set is compact iff every open cover has a finite subcover; Heine-Borel: compact $\Leftrightarrow$ closed and bounded in $\mathbb{R}^n$) and `math.real.continuity-rigorous` (the ε–δ definition of continuity).

## Component 3 — Core Explanation

**This theorem answers the existence question `math.calc.optimization`'s method presupposes**: `math.calc.optimization` teaches finding global extrema on a closed interval by checking critical points and endpoints — a genuinely EFFECTIVE computational procedure, but one that implicitly assumes a global max and min actually EXIST to be found among those candidates. This theorem supplies exactly that missing existence guarantee: for a continuous function on a COMPACT set, a maximum and minimum are GUARANTEED to exist — precisely the hypothesis (a closed, bounded interval) `math.calc.optimization`'s own procedure requires to be reliable. Without this guarantee, checking finitely many candidate points would be searching for something that might not even exist.

**The proof's two-step structure**: STEP 1 uses `math.real.compactness`'s own fact that continuous functions map compact sets to compact sets — so $f(K)$ (the set of $f$'s OUTPUT values over compact $K$) is itself compact. STEP 2 uses the Heine-Borel characterization: a compact subset of $\mathbb{R}$ is closed AND bounded. Boundedness alone would only guarantee a SUPREMUM/INFIMUM exists (as real numbers) — but without closedness, that supremum could be a "missing" limit point NOT actually contained in $f(K)$ (imagine $f(K)=(0,1)$, bounded with supremum $1$, but $1\notin f(K)$ itself). Closedness is EXACTLY what guarantees the supremum and infimum are themselves MEMBERS of $f(K)$ — meaning some actual point of $K$ maps to them, i.e., the maximum and minimum are genuinely ATTAINED, not merely approached.

**Both hypotheses are necessary — dropping either breaks the conclusion**: dropping COMPACTNESS: $f(x)=x$ on the NON-compact $(0,1)$ (bounded but not closed, missing its endpoints) is continuous, yet has no maximum (values approach $1$ but $1$ is never attained, since $1\notin(0,1)$) and no minimum (symmetric reasoning at $0$). Dropping CONTINUITY: a discontinuous function on a compact domain can also fail to attain its extrema — a jump discontinuity can leave a "gap" where the supremum of the function's values is approached but never actually reached by any single point's output.

## Component 4 — Worked Examples

**Example 1 (LO1 — connecting the theorem's guarantee to `math.calc.optimization`'s own method's reliability, breaking MC-1)**: for $f(x)=x^3-3x$ on the CLOSED interval $[-2,2]$: `math.calc.optimization`'s own method finds critical points ($f'(x)=3x^2-3=0\Rightarrow x=\pm1$) and evaluates $f$ there AND at the endpoints $x=\pm2$: $f(-2)=-2,f(-1)=2,f(1)=-2,f(2)=2$ — giving candidate values $\{-2,2\}$. This method's RELIABILITY (that the true global max/min are guaranteed to appear among these finitely many candidates) rests ENTIRELY on THIS theorem's guarantee — since $f$ is continuous and $[-2,2]$ is compact (closed and bounded), a global max and min are guaranteed to EXIST, and (by a standard argument, not repeated here) must occur either at a critical point or an endpoint, exactly the candidates checked.

**Example 2 (LO2 — verifying the two-step proof structure directly, breaking MC-2)**: for $f(x)=x^2$ on $K=[-1,2]$ (compact): $f(K)=[0,4]$ (directly computable: minimum value $0$ at $x=0$, maximum value $4$ at $x=2$). Checking STEP 1: $f(K)=[0,4]$ is itself compact (closed and bounded), confirmed directly by inspection, consistent with `math.real.compactness`'s own continuous-image-of-compact-is-compact fact. Checking STEP 2: $[0,4]$ being CLOSED means both its supremum ($4$) and infimum ($0$) are genuinely CONTAINED in the set (not just approached) — contrasted directly with the OPEN interval case $f(K')=(0,4)$ hypothetically (if $K'$ were an open, non-compact domain instead), where the same numeric bounds $0,4$ would be approached but never actually attained — confirming closedness (not boundedness alone) is what secures genuine attainment.

**Example 3 (LO3 — verifying both hypotheses' necessity via concrete counterexamples, breaking MC-3)**: DROPPING compactness: $f(x)=x$ on $(0,1)$ (continuous, but domain not compact — open, missing its endpoints): $\sup f=1$ and $\inf f=0$, but NEITHER value is attained by any point of $(0,1)$ — no maximum or minimum exists, confirming compactness's necessity. DROPPING continuity: define $g(x)=x$ for $x\in[0,1)$ and $g(1)=0$ (a jump discontinuity at $x=1$, but domain $[0,1]$ IS compact): $\sup g=1$ (approached as $x\to1^-$) but $g(1)=0\ne1$, so the supremum is NEVER attained — confirming continuity's necessity too, with each counterexample isolating exactly one hypothesis's failure.

## Component 5 — Teaching Actions

### Teaching Action A01 — This Theorem Supplies the Existence Guarantee `math.calc.optimization`'s Method Relies On (Primitive P11: Representation Shift)

State: "`math.calc.optimization`'s critical-points-and-endpoints method is only guaranteed to actually FIND the global max/min because THIS theorem guarantees one genuinely exists — checking finitely many candidates only makes sense if there's really something to find among them." Walk Example 1's direct connection.

- **MC-1 hook**: ask "does `math.calc.optimization`'s method of checking critical points and endpoints automatically guarantee a global maximum exists, or does it rely on a separate existence theorem?" — an "automatically guarantees" answer reveals MC-1 (missing that the method's reliability depends on this theorem's separate existence guarantee).

### Teaching Action A02 — Closedness (Not Boundedness Alone) Secures Genuine Attainment (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f(K)=[0,4]$'s CLOSEDNESS is what guarantees $0$ and $4$ are genuinely IN the set, contrasted against a hypothetical open-interval image where the same numeric bounds would only be approached. State: "boundedness alone only gives you a supremum and infimum as NUMBERS — closedness is the extra ingredient guaranteeing those numbers are actually ACHIEVED by some point, not just approached from within."

- **MC-2 hook**: ask "is boundedness of $f(K)$ alone sufficient to guarantee $f$ attains a maximum, or is closedness also genuinely necessary?" — a "boundedness alone suffices" answer reveals MC-2 (missing closedness's essential role in guaranteeing attainment, not mere approach).

### Teaching Action A03 — Both Hypotheses Are Independently Necessary (Primitive P06: Contrast Pair)

Contrast Example 3's two ISOLATED counterexamples — one dropping compactness (continuous $f(x)=x$ on non-compact $(0,1)$), one dropping continuity (discontinuous $g$ on compact $[0,1]$) — each individually breaking the conclusion while the OTHER hypothesis remains intact. State: "these aren't overlapping technicalities — each counterexample isolates exactly ONE hypothesis's failure, confirming BOTH compactness and continuity are independently, separately necessary for the theorem's guarantee."

- **MC-3 hook**: ask "if a domain is compact but the function is discontinuous, can the extreme value guarantee still fail, or does compactness alone suffice regardless of continuity?" — a "compactness alone suffices" answer reveals MC-3 (missing that continuity is an independently necessary hypothesis, not subsumed by compactness).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why `math.calc.optimization`'s critical-points-and-endpoints method is only guaranteed reliable on a closed, bounded interval, citing this theorem directly.
  2. For $f(x)=e^{-x^2}$ on $K=[-3,3]$, compute $f(K)$ and verify it is closed and bounded, confirming both the maximum and minimum are attained.
  3. Give an example of a continuous function on a bounded but non-closed domain that fails to attain its maximum, distinct from the $f(x)=x$ example.
  4. Give an example of a discontinuous function on a compact domain that fails to attain its maximum, distinct from the worked example.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.calc.optimization`)**: "An engineer is optimizing a physical design parameter $x$ over the range $[0,10]$ (a closed, bounded interval — genuinely compact), where the design's performance is measured by a continuous function $f(x)$. The engineer plans to use `math.calc.optimization`'s standard method (checking critical points and endpoints) to find the best design. (a) Using this lesson's theorem, explain why the engineer can be confident BEFORE even starting the computation that a genuine global optimum exists somewhere in $[0,10]$. (b) If the engineer's design range were instead the OPEN interval $(0,10)$ (excluding the endpoints, perhaps because the extreme values are physically unreachable), explain what could go wrong with the optimization, using this lesson's compactness-necessity argument. (c) If the engineer's performance function $f$ instead had a discontinuity somewhere in $[0,10]$ (say, a sudden jump due to a design regime change), explain why `math.calc.optimization`'s method could produce a misleading result, even though the domain itself remains compact."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OPTIMIZATION-METHOD-ASSUMED-SELF-GUARANTEEING | Believing `math.calc.optimization`'s critical-points-and-endpoints method automatically guarantees a global maximum exists, missing that its reliability depends on this separate existence theorem | Foundational |
| MC-2 | BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-ATTAINMENT | Believing boundedness of $f(K)$ alone guarantees $f$ attains a maximum, missing that closedness is also genuinely necessary to secure attainment (not mere approach) | High |
| MC-3 | COMPACTNESS-ASSUMED-TO-SUBSUME-CONTINUITY-REQUIREMENT | Believing compactness of the domain alone suffices for the extreme value guarantee regardless of continuity, missing that continuity is an independently necessary hypothesis | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Optimization Method Assumed Self-Guaranteeing") → P41 (detect: ask whether `math.calc.optimization`'s method automatically guarantees existence) → P64 (conceptual shift: re-walk Example 1's direct connection between the theorem's guarantee and the method's reliability).
- **B02 (targets MC-2)**: P27 (name it: "Boundedness Assumed Sufficient for Attainment") → P41 (detect: ask whether boundedness alone guarantees attainment) → P64 (conceptual shift: re-walk Example 2's closed-vs-open contrast).
- **B03 (targets MC-3)**: P27 (name it: "Compactness Assumed to Subsume Continuity Requirement") → P41 (detect: ask whether compactness alone suffices regardless of continuity) → P64 (conceptual shift: re-walk Example 3's isolated discontinuous-function-on-compact-domain counterexample).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.compactness` (the compactness definition and Heine-Borel characterization this theorem's proof directly uses) and `math.real.continuity-rigorous` (the continuity definition underlying the continuous-image-of-compact-is-compact fact).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.optimization`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.calc.optimization`'s own computational method directly in Component 3's existence-guarantee framing and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 grounding the theorem's purpose in `math.calc.optimization`'s own practical needs, LO2 given full two-step proof depth, and LO3 verifying both hypotheses' independent necessity via isolated counterexamples.
- **Division of labor**: `math.calc.optimization` already owns the PRACTICAL, computational method for finding global extrema (critical points + endpoints — verified by grep, no compactness or rigorous-existence content there); `math.real.compactness` already owns the compactness definition and Heine-Borel characterization this theorem's proof directly reuses. This concept owns the RIGOROUS EXISTENCE proof — the missing theoretical justification `math.calc.optimization`'s own method silently relies on — plus the necessity verification for both hypotheses.
- Example 3's deliberate choice of TWO separate, isolated counterexamples (rather than one combined failure) was made specifically so each hypothesis's necessity could be verified independently, directly supporting MC-3's repair by demonstrating continuity's necessity even when compactness genuinely holds.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.optimization` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has compactness and rigorous continuity; task is proving existence, not finding extrema) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
