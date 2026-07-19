# Teaching Blueprint: Joint Distribution (`math.prob.joint-distribution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.joint-distribution` |
| name | Joint Distribution |
| domain | Probability |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.prob.distribution` |
| unlocks | `math.prob.covariance` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a two-dice-roll table of outcomes before the general joint-distribution definition |
| description (KG) | The joint distribution of (X,Y) is given by F(x,y)=P(X≤x, Y≤y). For discrete: joint PMF p(x,y)=P(X=x,Y=y). For continuous: joint PDF f(x,y) with P∈A=∬_A f dxdy. |

## Component 1 — Learning Objectives

- LO1: Define the **joint distribution** of a pair of random variables $(X,Y)$ via the joint CDF $F(x,y)=P(X\le x, Y\le y)$, extending `math.prob.distribution`'s single-variable framework by describing how $X$ and $Y$ behave **together**, not each in isolation.
- LO2: Compute with the **joint PMF** $p(x,y)=P(X=x,Y=y)$ for discrete pairs, and the **joint PDF** $f(x,y)$ for continuous pairs (where $P((X,Y)\in A) = \iint_A f(x,y)\,dx\,dy$) — recognizing these as the joint analogues of the single-variable PMF/PDF.
- LO3: Recover the **marginal distribution** of $X$ alone (or $Y$ alone) from a joint distribution — by summing (discrete) or integrating (continuous) the joint PMF/PDF over all values of the other variable — directly refuting the misconception that the marginal distribution of $X$ can be read off from the joint distribution without actually summing/integrating out $Y$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.distribution` (a distribution is the complete probabilistic description of a random variable, equivalently given by CDF/PMF/PDF, and a single summary statistic is never the whole story).

## Component 3 — Core Explanation

**The joint distribution, describing two variables together**: while `math.prob.distribution` described one random variable completely, many real scenarios involve TWO random variables observed together — e.g. a student's height $X$ and weight $Y$. The **joint distribution** of $(X,Y)$ is the complete description of how $X$ and $Y$ behave jointly, given by the joint CDF $F(x,y) = P(X\le x, Y\le y)$ — the probability that BOTH conditions hold simultaneously.

**Joint PMF and joint PDF**: for discrete $(X,Y)$, the **joint PMF** $p(x,y)=P(X=x,Y=y)$ gives the probability of each specific outcome pair directly (analogous to the single-variable PMF, now over pairs). For continuous $(X,Y)$, the **joint PDF** $f(x,y)$ satisfies $P((X,Y)\in A) = \iint_A f(x,y)\,dx\,dy$ for any region $A$ in the plane — a direct generalization of the single-variable "area under the curve" idea to "volume under the surface" over a two-dimensional region.

**Recovering marginals by summing/integrating out the other variable**: the **marginal distribution** of $X$ alone (ignoring $Y$ entirely) is recovered from the joint distribution by summing over all values of $Y$ (discrete case: $P(X=x) = \sum_y p(x,y)$) or integrating over all values of $y$ (continuous case: $f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$). This is not automatic or free — it requires genuinely performing the sum/integral, "collapsing" the joint table or surface down to one dimension by accounting for every possible value the other variable could have taken.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a joint PMF table for two dice)**: Roll two fair dice, $X$=result of die 1, $Y$=result of die 2 (independent). The joint PMF is $p(x,y)=1/36$ for each of the 36 equally likely pairs $(x,y)$ with $x,y\in\{1,\dots,6\}$. The joint CDF $F(3,2) = P(X\le3,Y\le2)$ counts the pairs with $x\le3$ AND $y\le2$: $(1,1),(1,2),(2,1),(2,2),(3,1),(3,2)$ — 6 pairs, so $F(3,2)=6/36=1/6$.

**Example 2 (LO3 — recovering the marginal by summing, breaking MC-1)**: Continuing Example 1, find the marginal distribution of $X$ alone (ignoring $Y$'s specific value). $P(X=3) = \sum_{y=1}^6 p(3,y) = \sum_{y=1}^6 \frac{1}{36} = \frac{6}{36} = \frac{1}{6}$ — summing the joint PMF across ALL 6 possible values of $Y$ for the fixed row $x=3$. This matches the already-known fact that a single fair die roll has $P(X=3)=1/6$, but the point is that this answer was NOT read directly off any single entry of the joint table — it required summing across the entire row.

**Example 3 (LO2/LO3 — a continuous joint PDF and its marginal, contrasted)**: Let $(X,Y)$ have joint PDF $f(x,y) = 2$ for $0\le x\le y\le1$ (and $0$ elsewhere — a triangular region). Compute $P(X<0.5, Y<0.5)$: this requires integrating $f$ over the region where BOTH $x<0.5$ and $y<0.5$ (and $x\le y$, from the support), giving $\int_0^{0.5}\int_x^{0.5} 2\,dy\,dx = 0.125$. Now find the MARGINAL PDF of $X$: $f_X(x) = \int_x^1 2\,dy = 2(1-x)$ for $0\le x\le1$ — genuinely integrating OUT the $y$-dependence across its full valid range (which itself depends on $x$, since the support is triangular) — producing a different-looking one-variable function, not a simple "slice" read directly from the joint formula $f(x,y)=2$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Joint Distribution: Describing Two Variables Together (Primitive P11: Representation Shift)

Show the two-dice 6×6 grid of equally likely outcomes. State: "just like a single random variable's distribution tells the complete story of its behavior, the JOINT distribution tells the complete story of how TWO random variables behave TOGETHER — including how they might be related." Work Example 1's joint CDF computation directly on the grid.

### Teaching Action A02 — Joint PMF/PDF as the Direct Two-Variable Analogue (Primitive P11: Representation Shift)

State: "the joint PMF just assigns a probability to EACH pair of outcomes, exactly like a single-variable PMF assigns a probability to each single outcome. The joint PDF does the same continuously — probability is now VOLUME under a surface, not area under a curve." Work Example 3's region-probability computation, drawing the triangular support region explicitly.

### Teaching Action A03 — Marginals Require Genuinely Summing/Integrating Out (Primitive P28: Conflict Evidence)

Present Example 2's direct demonstration: $P(X=3)$ is NOT any single entry of the joint table — it's the SUM of six entries across the whole row. Reinforce with Example 3's marginal PDF $f_X(x)=2(1-x)$, a genuinely different-looking function from the joint PDF's constant value $2$. State: "you cannot read a marginal off a joint distribution by inspection — you must actually sum (discrete) or integrate (continuous) across every possible value of the OTHER variable."

- **MC-1 hook**: ask "can you find the marginal probability P(X=3) just by looking at one entry of the joint PMF table?" — a "yes" answer reveals MC-1 (believing a marginal can be read directly from a single joint-table entry rather than requiring a genuine sum/integral across the other variable).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using the two-dice joint PMF from Example 1, compute $F(2,4) = P(X\le2,Y\le4)$ by directly counting the qualifying pairs.
  2. Using the same joint PMF, find the marginal distribution of $Y$ alone (i.e., state $P(Y=y)$ for each $y=1,\dots,6$), showing the summing-out process explicitly for at least one value.
  3. For the joint PDF $f(x,y)=2$ on $0\le x\le y\le1$ from Example 3, find the marginal PDF of $Y$, $f_Y(y) = \int_0^y 2\,dx$, and verify it integrates to $1$ over $[0,1]$.
  4. Explain, in your own words, why the marginal PDF $f_X(x)=2(1-x)$ looks different from the joint PDF's constant value $f(x,y)=2$, even though the marginal is "derived from" the joint.
- **P76 (Transfer Probe, mode = independence)**: "A weather station records, for each day, both the amount of rainfall $X$ and the average temperature $Y$, with some known joint distribution $p(x,y)$ (discrete categories, say). (a) Explain what question the joint distribution $p(x,y)$ answers that neither the marginal distribution of $X$ alone nor the marginal distribution of $Y$ alone can answer by itself. (b) Describe, in words (no need to compute), the process of obtaining the marginal distribution of rainfall $X$ alone from this joint distribution. (c) A colleague claims: 'once you know the joint distribution, you already automatically know both marginals without any further work — they're just built in.' Explain what's importantly correct about this claim (the marginals ARE determined by the joint) and what's importantly misleading about it (recovering them still requires an explicit summation/integration step)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MARGINAL-READ-DIRECTLY-FROM-JOINT-ENTRY | Believing a marginal probability can be read directly from a single entry of the joint PMF/PDF, rather than requiring a genuine sum (discrete) or integral (continuous) across the other variable | Foundational |
| MC-2 | JOINT-PDF-INTEGRATION-REGION-MISIDENTIFIED | Integrating a joint PDF over the wrong region (e.g. using constant bounds when the actual support is a non-rectangular region, like Example 3's triangle) | Foundational |
| MC-3 | JOINT-DISTRIBUTION-ASSUMED-DETERMINED-BY-MARGINALS-ALONE | Assuming the two marginal distributions of $X$ and $Y$ together fully determine the joint distribution, missing that the joint distribution can carry additional information (about the relationship between $X$ and $Y$) beyond what either marginal reveals | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Marginal-Read-Directly-From-Joint-Entry Assumption") → P41 (detect: ask for $P(X=3)$ from the two-dice joint table and check whether the student reads a single cell instead of summing the row) → P64 (conceptual shift: re-walk Example 2's explicit row-sum, re-anchoring on "the marginal accounts for every possible value the OTHER variable could take — that means summing across the whole row or column, never picking one cell").
- **B02 (targets MC-2)**: P27 (name it: "Joint-PDF Integration-Region Misidentification") → P41 (detect: give the triangular-support joint PDF from Example 3 and ask a student to compute a marginal, checking whether they use full $[0,1]$ bounds for both variables rather than the correct $x$-dependent bound) → P64 (conceptual shift: re-draw the triangular support region explicitly, re-deriving the correct integration bounds ($y$ from $x$ to $1$ for the marginal of $X$) directly from where the joint PDF is actually nonzero).
- **B03 (targets MC-3)**: P27 (name it: "Joint-Determined-by-Marginals-Alone Assumption") → P41 (detect: ask whether knowing both marginal distributions of $X$ and $Y$ is enough to reconstruct the full joint distribution) → P64 (conceptual shift: note that the marginals only describe each variable in isolation — the joint distribution can additionally encode how $X$ and $Y$ move together (or don't), information the marginals alone cannot recover, foreshadowing `math.prob.covariance`).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.distribution` (the single-variable CDF/PMF/PDF framework this concept extends to pairs of random variables).
- **Unlocks**: `math.prob.covariance` (which measures the relationship between $X$ and $Y$ using their joint distribution, directly building on the marginal-vs-joint distinction established here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (joint distribution as a two-variable extension), A02 (joint PMF/PDF computation), and A03 (marginals require genuine summing/integrating) each target a distinct LO, appropriate for a concept whose main new content is a genuine dimensional extension of already-mastered single-variable machinery.
- Example 3's triangular-support joint PDF was deliberately chosen (over a simpler rectangular-support example) specifically to stress-test MC-2 — a rectangular support would let a student get away with using constant integration bounds without ever confronting the need to determine variable-dependent bounds from the actual support region.
- MC-3's forward-looking note (marginals don't determine the joint) is included specifically to motivate `math.prob.covariance` as the natural next concept — establishing that "how $X$ and $Y$ relate" is genuine additional information the joint distribution carries beyond what either marginal alone reveals.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: two-dice outcome table before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
