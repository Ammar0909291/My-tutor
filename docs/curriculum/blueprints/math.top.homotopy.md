# Teaching Blueprint: Homotopy (`math.top.homotopy`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.homotopy` |
| name | Homotopy |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.top.continuity-top` |
| unlocks | `math.top.fundamental-group`, `math.top.homotopy-equivalence` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a rubber band continuously stretched from one shape into another, before the formal $H(x,t)$ definition |
| description (KG) | Two continuous maps f,g:X→Y are homotopic if there exists a continuous H:X×[0,1]→Y with H(x,0)=f(x) and H(x,1)=g(x). Homotopy is an equivalence relation. Fundamental in algebraic topology and classifying spaces. |

## Component 1 — Learning Objectives

- LO1: Define a **homotopy** between two continuous maps $f,g:X\to Y$ as a single continuous function $H:X\times[0,1]\to Y$ satisfying $H(x,0)=f(x)$ and $H(x,1)=g(x)$ — a continuous "movie" of maps that starts at $f$ and smoothly deforms into $g$ as the second parameter $t$ runs from $0$ to $1$.
- LO2: Verify a homotopy relates two SPECIFIC given maps by constructing an explicit $H(x,t)$ and checking both endpoint conditions ($H(x,0)=f(x)$, $H(x,1)=g(x)$) AND that $H$ itself is continuous (per `math.top.continuity-top`) — directly refuting the misconception that any function merely "interpolating" between $f$ and $g$ at intermediate $t$-values automatically qualifies, without checking continuity of the whole map $H$.
- LO3: State and use the fact that homotopy is an **equivalence relation** (reflexive: $f$ is homotopic to itself; symmetric: if $f\simeq g$ then $g\simeq f$; transitive: if $f\simeq g$ and $g\simeq h$ then $f\simeq h$), and recognize that two maps failing to be homotopic is a genuine topological obstruction — not every pair of continuous maps between the same spaces is homotopic to each other.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.continuity-top` (a map is continuous iff preimages of open sets are open, and composition of continuous maps is continuous) — the homotopy $H$ is itself required to be a continuous map, on the product space $X\times[0,1]$.

## Component 3 — Core Explanation

**A homotopy as a continuous deformation, parametrized by "time"**: given two continuous maps $f,g:X\to Y$, a homotopy from $f$ to $g$ is a single continuous function $H:X\times[0,1]\to Y$ of TWO arguments — a point $x\in X$ and a "time" parameter $t\in[0,1]$ — satisfying $H(x,0)=f(x)$ for every $x$ (at time $0$, $H$ IS $f$) and $H(x,1)=g(x)$ for every $x$ (at time $1$, $H$ IS $g$). For intermediate $t$, $H(\cdot,t)$ is some continuous map "in between" $f$ and $g$ — the whole family, swept out continuously as $t$ varies, constitutes a continuous deformation of $f$ into $g$. When such an $H$ exists, $f$ and $g$ are called **homotopic**, written $f\simeq g$.

**Continuity of the WHOLE map H, not just pointwise interpolation**: crucially, $H$ must be continuous as a function of BOTH its arguments TOGETHER (as a map on the product space $X\times[0,1]$) — it is not enough that, for each fixed $x$, $t\mapsto H(x,t)$ traces some path from $f(x)$ to $g(x)$; nor is it enough that, for each fixed $t$, $x\mapsto H(x,t)$ is continuous. The continuity requirement is a genuine joint condition on $H:X\times[0,1]\to Y$ as a single function of the pair $(x,t)$, checked exactly as any other continuity claim would be (via preimages of open sets, per `math.top.continuity-top`).

**Homotopy as an equivalence relation**: $\simeq$ satisfies the three equivalence-relation properties. **Reflexive**: $f\simeq f$ via the constant-in-$t$ homotopy $H(x,t)=f(x)$ (trivially continuous, since it doesn't depend on $t$ at all). **Symmetric**: if $H$ homotopes $f$ to $g$, then $H'(x,t)=H(x,1-t)$ homotopes $g$ back to $f$ (just running the same deformation backward in time — continuity is preserved since $t\mapsto1-t$ is itself continuous). **Transitive**: if $H_1$ homotopes $f$ to $g$ and $H_2$ homotopes $g$ to $h$, concatenating them (running $H_1$ during $t\in[0,1/2]$, rescaled, then $H_2$ during $t\in[1/2,1]$, rescaled) gives a homotopy from $f$ directly to $h$. Because $\simeq$ is a genuine equivalence relation, continuous maps between $X$ and $Y$ split into distinct **homotopy classes** — and two maps in DIFFERENT classes are provably, permanently NOT homotopic to each other, a genuine topological obstruction rather than a failure to find the right construction.

## Component 4 — Worked Examples

**Example 1 (LO1 — a concrete homotopy, straight-line deformation)**: Let $X=Y=\mathbb{R}^2$, $f(x)=x$ (identity map) and $g(x)=0$ (constant zero map). Define $H(x,t) = (1-t)x$ — check: $H(x,0)=x=f(x)$ ✓, $H(x,1)=0=g(x)$ ✓. $H$ is continuous (a simple product/scaling of continuous functions of $x$ and $t$ together). This "straight-line homotopy" continuously shrinks every point toward the origin as $t$ goes from $0$ to $1$ — a direct, concrete example of the identity map being homotopic to the constant map on $\mathbb{R}^2$.

**Example 2 (LO2 — checking JOINT continuity, not just pointwise interpolation, breaking MC-1)**: Consider $X=[0,1]$, $Y=\mathbb{R}$, $f(x)=0$, $g(x)=1$ for all $x$, and the candidate $H(x,t) = \begin{cases}0 & t<1/2 \\ 1 & t\ge1/2\end{cases}$ (independent of $x$). Check the ENDPOINTS: $H(x,0)=0=f(x)$ ✓, $H(x,1)=1=g(x)$ ✓ — so far it looks like a valid interpolation. But checking CONTINUITY of $H$ as a function of $(x,t)$ jointly: at $t=1/2$, $H$ jumps discontinuously from $0$ to $1$ — $H$ is NOT continuous in $t$, so this candidate FAILS to be a valid homotopy, despite satisfying both endpoint conditions correctly. (A genuinely continuous homotopy between these constant maps, e.g. $H(x,t)=t$, works instead — smoothly sliding from $0$ to $1$ with no jump.)

**Example 3 (LO3 — homotopy classes and a genuine obstruction, orientation level)**: On $X=Y=S^1$ (the unit circle), the identity map $f(z)=z$ and the constant map $g(z)=1$ (mapping every point to a fixed point) are famously **NOT** homotopic — no continuous deformation of the identity map on the circle into a constant map exists, because doing so would require continuously "unwrapping" the circle's single full loop down to a point while staying on the circle throughout, which is topologically obstructed (this is the seed idea behind the fundamental group, `math.top.fundamental-group`, which this concept unlocks). Contrast with Example 1's $\mathbb{R}^2$ case, where an analogous identity-to-constant homotopy DID exist — proving that whether such a deformation exists depends genuinely on the SPACE involved (a disk-like space like $\mathbb{R}^2$ allows it; a loop-like space like $S^1$ does not), not just on the two maps' formulas looking superficially similar.

## Component 5 — Teaching Actions

### Teaching Action A01 — Homotopy as a Continuous Movie From f to g (Primitive P11: Representation Shift)

Show a rubber band continuously stretching from one shape into another, frame by frame. State: "a homotopy is exactly this — a continuous 'movie,' parametrized by $t$ from $0$ to $1$, starting at $f$ and ending at $g$, with every intermediate frame ALSO required to fit together continuously." Work Example 1's straight-line homotopy directly.

### Teaching Action A02 — Joint Continuity Is a Real, Checkable Requirement (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: a candidate $H$ satisfying both endpoint conditions perfectly, yet failing because it jumps discontinuously at $t=1/2$. State: "matching $f$ at $t=0$ and $g$ at $t=1$ is necessary but NOT sufficient — the whole map $H(x,t)$, as a function of BOTH variables together, must itself be continuous, with no jumps anywhere in between."

- **MC-1 hook**: ask "if a function $H$ correctly satisfies $H(x,0)=f(x)$ and $H(x,1)=g(x)$, is it automatically a valid homotopy?" — a "yes" answer reveals MC-1 (checking only the endpoint conditions, without verifying that $H$ itself is continuous as a joint function of $x$ and $t$).

### Teaching Action A03 — Homotopy Classes and Genuine Topological Obstructions (Primitive P06: Contrast Pair)

**Contrast** Example 1 ($\mathbb{R}^2$: identity homotopic to a constant map, via a simple straight-line shrink) against Example 3 ($S^1$: identity NOT homotopic to a constant map, no matter what deformation is attempted). State: "whether two maps are homotopic isn't just about the formulas — it depends genuinely on the SPACE they're defined on. A disk-like space lets you contract everything to a point; a loop-like space provably does not."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=x$ and $g(x)=2x$ on $X=Y=\mathbb{R}$, construct an explicit homotopy $H(x,t)$ and verify both endpoint conditions.
  2. Verify that your $H$ from problem 1 is continuous as a joint function of $x$ and $t$.
  3. Explain why the "reflexive" property of homotopy ($f\simeq f$) holds, by exhibiting the specific (trivial) homotopy that establishes it.
  4. A candidate homotopy correctly satisfies $H(x,0)=f(x)$ and $H(x,1)=g(x)$, but is defined piecewise with a jump discontinuity at $t=0.3$. Explain why this candidate fails to be a valid homotopy, referencing Example 2.
- **P76 (Transfer Probe, mode = independence)**: "A robotics engineer wants to continuously move a robotic arm's configuration (modeled as a continuous map from a parameter space $X$ to the space of possible arm positions $Y$) from an initial configuration $f$ to a target configuration $g$, without ever having the arm 'teleport' or jump discontinuously at any moment during the transition. (a) Explain why modeling this transition as a homotopy $H(x,t)$ is an appropriate mathematical framework for this physical requirement. (b) Explain, using Example 2's lesson, what property of $H$ the engineer must verify to guarantee the arm never jumps discontinuously, even momentarily. (c) If the engineer discovers that NO continuous homotopy exists between two particular arm configurations (perhaps because the arm's configuration space has an obstruction, like $S^1$'s in Example 3), explain what this would mean physically for the robot — could it still reach the target configuration at all, and if so, how might it need to move differently?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HOMOTOPY-ENDPOINTS-CHECKED-WITHOUT-VERIFYING-JOINT-CONTINUITY | Believing a candidate function satisfying the two endpoint conditions ($H(x,0)=f(x)$, $H(x,1)=g(x)$) automatically qualifies as a homotopy, without separately verifying that $H$ is continuous as a joint function of $x$ and $t$ | Foundational |
| MC-2 | ALL-CONTINUOUS-MAPS-BETWEEN-SAME-SPACES-ASSUMED-HOMOTOPIC | Assuming any two continuous maps between the same pair of spaces must be homotopic to each other, missing that genuine topological obstructions (like on $S^1$) can prevent this | Foundational |
| MC-3 | HOMOTOPY-EQUIVALENCE-RELATION-PROPERTIES-ASSUMED-WITHOUT-CONSTRUCTION | Accepting that homotopy is reflexive/symmetric/transitive without being able to exhibit the specific homotopies (identity, time-reversal, concatenation) that establish each property | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Endpoints-Only Homotopy Verification") → P41 (detect: present Example 2's discontinuous candidate and ask whether it is a valid homotopy, given it satisfies both endpoint conditions) → P64 (conceptual shift: re-walk Example 2's direct demonstration of the jump discontinuity at $t=1/2$, re-anchoring on "endpoints matching is necessary, but the WHOLE map must be jointly continuous too").
- **B02 (targets MC-2)**: P27 (name it: "All-Maps-Assumed-Homotopic Assumption") → P41 (detect: ask whether the identity map and a constant map on the circle $S^1$ must be homotopic, since they're both continuous maps between the same space) → P64 (conceptual shift: re-present Example 3's contrast between $\mathbb{R}^2$ (where such a homotopy exists) and $S^1$ (where it provably does not), re-anchoring on "whether a homotopy exists depends on the SPACE, not just on the maps looking similar").
- **B03 (targets MC-3)**: P27 (name it: "Equivalence-Relation Properties Assumed Without Construction") → P41 (detect: ask a student to state why homotopy is symmetric, and check whether they can produce the actual time-reversed homotopy $H(x,1-t)$ rather than just asserting the property) → P64 (conceptual shift: re-walk Component 3's explicit reflexive/symmetric/transitive constructions, re-anchoring on "each equivalence-relation property corresponds to an actual homotopy you can write down, not just an abstract label").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.continuity-top` (the continuity condition this concept's homotopy $H$ must itself satisfy, as a map on the product space $X\times[0,1]$).
- **Unlocks**: `math.top.fundamental-group` (built directly from homotopy classes of loops, the exact obstruction hinted at in Example 3), `math.top.homotopy-equivalence` (a weaker notion of "same shape" for spaces themselves, built from homotopic maps between them).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at a "3 TAs + gate" tier — A01 (the continuous-deformation definition), A02 (joint continuity as a genuine requirement), and A03 (homotopy classes and obstructions) each target a distinct LO, appropriate for a foundational algebraic-topology concept whose subtlety lies in a joint-continuity technicality plus an important conceptual payoff (genuine obstructions exist).
- Example 3's $S^1$ obstruction is deliberately treated at an orientation level (asserting the non-homotopy fact without proving it, which properly requires the fundamental group / winding number machinery this concept unlocks) — Teaching Notes flag this explicitly as the natural forward pointer to `math.top.fundamental-group`, rather than attempting a self-contained proof here.
- Example 2's discontinuous candidate was deliberately built to satisfy BOTH endpoint conditions exactly, isolating joint continuity as the ONLY thing that fails — this is the strongest possible demonstration that endpoint-matching alone is insufficient, directly targeting MC-1.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: continuous rubber-band deformation before the formal H(x,t) definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
