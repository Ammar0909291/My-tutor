# Teaching Blueprint: Increasing and Decreasing Functions (`math.calc.increasing-decreasing`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.increasing-decreasing` |
| name | Increasing and Decreasing Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.mean-value-theorem` |
| unlocks | `math.calc.critical-points` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a rising/falling graph before the derivative-sign test |
| description (KG) | If f' > 0 on an interval, f is increasing; if f' < 0, f is decreasing; follows from the MVT. |

## Component 1 — Learning Objectives

- LO1: State the increasing/decreasing test: if $f'(x)>0$ for all $x$ in an interval, $f$ is **increasing** on that interval; if $f'(x)<0$ throughout, $f$ is **decreasing** — and apply this test by finding where $f'(x)$ is positive/negative (typically via sign analysis around critical points).
- LO2: Prove the increasing/decreasing test **using the Mean Value Theorem** — for any two points $x_1<x_2$ in the interval, MVT guarantees some $c$ between them with $f'(c) = \frac{f(x_2)-f(x_1)}{x_2-x_1}$, and since $f'(c)$'s sign matches the whole interval's, this directly forces $f(x_2)-f(x_1)$ to have that same sign.
- LO3: Use sign analysis of $f'$ across critical points to partition a function's domain into intervals of increase/decrease, and correctly handle the boundary/endpoint behavior (the test applies to $f'$ evaluated strictly *inside* an interval, with continuity carrying the conclusion through to closed endpoints).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.mean-value-theorem` (the theorem's precise statement and hypotheses, and the existence-not-uniqueness distinction).

## Component 3 — Core Explanation

**The increasing/decreasing test**: if $f'(x)>0$ for every $x$ in an interval $I$, then $f$ is **increasing** on $I$ (i.e., $x_1<x_2$ in $I$ implies $f(x_1)<f(x_2)$). If $f'(x)<0$ throughout $I$, $f$ is **decreasing** on $I$.

**Why this follows from the MVT**: take any $x_1<x_2$ in $I$. Since $f$ is differentiable (hence continuous) on $[x_1,x_2]\subseteq I$, the MVT guarantees some $c\in(x_1,x_2)$ with
$$f'(c) = \frac{f(x_2)-f(x_1)}{x_2-x_1}$$
If $f'>0$ everywhere on $I$, then in particular $f'(c)>0$. Since $x_2-x_1>0$, the equation forces $f(x_2)-f(x_1) = f'(c)(x_2-x_1) > 0$, i.e. $f(x_2)>f(x_1)$ — exactly the definition of increasing. (The decreasing case is identical with the inequality reversed.)

**Applying via sign analysis**: for a function like a polynomial, find the critical points (where $f'=0$ or is undefined) — these are the only places the sign of $f'$ *could* change. Between consecutive critical points, $f'$ must maintain a single constant sign (since a sign change would require $f'=0$ somewhere in between, by the Intermediate Value Theorem applied to the continuous function $f'$ — but that would itself be another critical point, contradicting "consecutive"). So: test $f'$ at one sample point in each interval between critical points to determine the sign (hence increasing/decreasing) for the entire interval.

## Component 4 — Worked Examples

**Example 1 (LO1/LO3 — sign analysis via critical points)**: $f(x)=x^3-3x$. $f'(x)=3x^2-3=3(x-1)(x+1)$, critical points at $x=\pm1$. This partitions the domain into three intervals: $(-\infty,-1)$, $(-1,1)$, $(1,\infty)$. Test a sample point in each: at $x=-2$, $f'(-2)=3(4)-3=9>0$ (increasing on $(-\infty,-1)$). At $x=0$, $f'(0)=-3<0$ (decreasing on $(-1,1)$). At $x=2$, $f'(2)=9>0$ (increasing on $(1,\infty)$).

**Example 2 (LO2 — the MVT-based proof applied concretely)**: For $f(x)=x^3-3x$ on $(-1,1)$ (where $f'<0$ throughout), verify directly for $x_1=-0.5, x_2=0.5$: $f(-0.5)=-0.125+1.5=1.375$, $f(0.5)=0.125-1.5=-1.375$. Indeed $f(0.5)<f(-0.5)$ (decreasing), consistent with $f'<0$ on this interval — and by the MVT, some $c\in(-0.5,0.5)$ satisfies $f'(c)=\frac{-1.375-1.375}{0.5-(-0.5)}=\frac{-2.75}{1}=-2.75$, matching the negative sign predicted.

**Example 3 (LO3 — a function that's increasing despite a critical point in the interval, breaking MC-1)**: $f(x)=x^3$. $f'(x)=3x^2\geq0$ everywhere, equal to 0 only at $x=0$ — a critical point, but $f'(x)>0$ for all $x\neq0$ in any interval containing 0. Since the test technically requires $f'>0$ throughout the *open* interval, and $f'$ fails only at the single point $x=0$ (not on a sub-interval), $f$ is still genuinely increasing on all of $\mathbb{R}$ — a critical point does not automatically break an interval's increasing/decreasing status if the derivative's sign doesn't actually change there.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Test and Its MVT-Based Proof (Primitive P11: Representation Shift)

Start pictorial: draw a rising curve, marking a few tangent lines with clearly positive slopes. State: "wherever the tangent slope is positive, the curve rises — that's the increasing/decreasing test in picture form." Shift to the symbolic statement ($f'>0\Rightarrow$ increasing) and then to the MVT-based proof: walk through the derivation in Component 3, explicitly connecting "the secant slope between any two points equals SOME tangent slope in between (MVT), and if that tangent slope is always positive, the secant slope must be positive too" — grounding the abstract proof in the already-familiar secant/tangent picture from the MVT lesson itself.

- **MC-1 hook**: present Example 3's $f(x)=x^3$ and its critical point at $x=0$, then ask "does this break the function's increasing behavior on $\mathbb{R}$?" — an answer of "yes, since there's a critical point in the interval" reveals MC-1 (assuming any critical point inside an interval necessarily interrupts increasing/decreasing status, rather than checking whether the derivative's sign actually changes there).

### Teaching Action A02 — Sign Analysis via Critical-Point Partitioning (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 1's full sign-analysis procedure (partition by critical points, test one sample point per interval), producing the complete increasing/decreasing breakdown for $f(x)=x^3-3x$.

**Contrast 2 (targets MC-2, sign consistency between critical points)**: Ask "why is it enough to test just ONE sample point in each interval between critical points, rather than checking many points throughout?" — state the justification precisely: "if $f'$ changed sign somewhere strictly between two consecutive critical points, then $f'$ would have to pass through zero there (by the Intermediate Value Theorem, since $f'$ is continuous) — but that would make that point ITSELF a critical point, contradicting that the two we picked were consecutive. So the sign is guaranteed constant between them, and one sample point suffices." This directly corrects the misconception that sign analysis requires exhaustively checking many points rather than relying on this structural guarantee.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find all intervals of increase and decrease for $f(x)=x^3-6x^2+9x$.
  2. Find all intervals of increase and decrease for $g(x)=x^4-8x^2$.
  3. Using the MVT-based proof structure from this lesson, explain in your own words why $f'(x)>0$ throughout an interval forces $f$ to be increasing there — don't just cite the rule, walk through the argument.
  4. $h(x)=(x-2)^3+1$ has a critical point at $x=2$ (where $h'(2)=0$), yet $h$ is increasing on all of $\mathbb{R}$. Explain why this critical point does not interrupt the increasing behavior, using the sign-analysis reasoning from this lesson.
- **P76 (Transfer Probe, mode = independence)**: "A company's inventory level over time is modeled by $I(t) = t^3-12t^2+36t$ (for $t\geq0$, in days). (a) Find $I'(t)$ and determine all critical points. (b) Using sign analysis, determine the intervals of time where inventory is increasing versus decreasing. (c) A colleague claims that since $I'(6)=0$ is a critical point, inventory must switch from increasing to decreasing exactly at $t=6$ — verify or refute this claim by checking the actual sign of $I'$ immediately before and after $t=6$, connecting your answer to this lesson's distinction between a critical point existing and the derivative's sign actually changing there."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CRITICAL-POINT-ASSUMED-TO-BREAK-MONOTONICITY | Believing any critical point inside an interval necessarily interrupts increasing/decreasing behavior, rather than checking whether the derivative's sign actually changes there | Foundational |
| MC-2 | SIGN-ANALYSIS-REQUIRES-EXHAUSTIVE-TESTING | Believing sign analysis requires testing many points throughout each interval rather than relying on the IVT-based guarantee that one sample point per critical-point-bounded interval suffices | Moderate |
| MC-3 | TEST-CITED-WITHOUT-MVT-JUSTIFICATION | Treating "f' > 0 implies increasing" as a standalone fact to memorize rather than a theorem following directly from the Mean Value Theorem | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Critical-Point-Breaks-Monotonicity Assumption") → P41 (detect: present Example 3's $x^3$ and ask if its critical point at 0 interrupts increasing behavior on $\mathbb{R}$) → P64 (conceptual shift: re-anchor on "check whether the SIGN of $f'$ actually changes across the critical point — a critical point where $f'$ touches zero but doesn't change sign leaves monotonicity intact").
- **B02 (targets MC-2)**: P27 (name it: "Exhaustive Sign-Testing Belief") → P41 (detect: ask a student performing sign analysis whether they need to test more than one point per critical-point-bounded interval) → P64 (conceptual shift: re-derive the IVT-based guarantee — a sign change strictly between two consecutive critical points would itself create a new critical point, contradicting consecutiveness).
- **B03 (targets MC-3)**: P27 (name it: "Unjustified Test Citation") → P41 (detect: ask a student to justify the increasing/decreasing test and check whether they reference the MVT or just restate the rule) → P64 (conceptual shift: walk through the MVT-based derivation explicitly, connecting the secant-slope/tangent-slope relationship to the conclusion).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.mean-value-theorem` (the theorem this concept's entire justification rests on).
- **Unlocks**: `math.calc.critical-points` (identifying critical points is the essential first step of the sign-analysis procedure taught here — note the KG's dependency direction: this concept's own sign-analysis technique motivates and is completed by formally defining critical points in the next concept, even though critical points were informally used here already via Example 1's computation).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" compact tier — A01 (the test and its MVT-based proof) and A02 (sign-analysis procedure plus its own IVT-based justification for testing only one sample point) jointly cover all three LOs without needing a third TA, since the concept is a single test plus its proof and its efficient application procedure, not broad computational variety.
- Despite `math.calc.critical-points` being listed as this concept's unlock (not prerequisite) in the KG, this blueprint necessarily uses the informal notion of "where $f'=0$" in its own worked examples (Example 1) — this is intentional and unavoidable given the KG's own dependency structure, and does not duplicate `math.calc.critical-points`' content, since that concept's actual teaching content (the two-source definition, critical-point-vs-extremum distinction) is not repeated here; this concept only uses zero-finding as a computational tool within its own sign-analysis procedure.
- MC-1 (critical-point-assumed-to-break-monotonicity) was deliberately given Foundational severity and its own dedicated Example (Example 3) plus gate problem (P77 #4) and transfer-probe component (part c), because it represents a genuine logical gap — students correctly execute sign analysis around "real" sign-changing critical points but then over-generalize the rule to critical points that don't actually change the derivative's sign, a subtlety this lesson makes a point of explicitly testing.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.mean-value-theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: rising/falling graph before sign test) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
