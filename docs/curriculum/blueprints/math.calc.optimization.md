# Teaching Blueprint: Optimization (Calculus) (`math.calc.optimization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.optimization` |
| name | Optimization (Calculus) |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.local-extrema` |
| unlocks | `math.opt.unconstrained-optimization` |
| cross_links | `math.opt.unconstrained-optimization` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — a graph with candidates marked before the closed-interval procedure |
| description (KG) | Finding global maxima and minima of a function on a closed interval or over all reals using critical points, endpoints, and boundary analysis. |

## Component 1 — Learning Objectives

- LO1: Find the **global maximum and minimum** of a continuous function $f$ on a **closed interval** $[a,b]$ by the **Closed Interval Method**: evaluate $f$ at ALL critical points inside $(a,b)$ AND at both endpoints $a,b$; the largest value is the global max, the smallest is the global min.
- LO2: Correctly recognize that the Closed Interval Method's endpoint-inclusion step is essential — a global extremum can occur AT an endpoint even where $f'\neq0$ there — and that omitting endpoint checks can miss the true global max/min entirely.
- LO3: Find global extrema of a function over ALL REALS (an unbounded domain, no endpoints to check), correctly recognizing this requires ADDITIONAL end-behavior analysis (as $x\to\pm\infty$) since there are no finite endpoints to evaluate, and that a global extremum may fail to exist at all in this unbounded setting.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.local-extrema` (the First and Second Derivative Tests for classifying critical points as LOCAL max/min — this concept extends that local classification to a genuinely GLOBAL search).

## Component 3 — Core Explanation

**The Closed Interval Method** (for finding the global max/min of a continuous $f$ on $[a,b]$):
1. Find all critical points of $f$ in the OPEN interval $(a,b)$ (where $f'=0$ or is undefined).
2. Evaluate $f$ at each critical point AND at both endpoints $a,b$.
3. The LARGEST of all these values is the global maximum; the SMALLEST is the global minimum.

**Why endpoints must always be checked**: unlike LOCAL extrema (which require a sign change in $f'$ on both sides, and so cannot occur exactly at an interval endpoint, where there's no "both sides" within the domain), a GLOBAL extremum can absolutely occur at an endpoint, even where $f'(a)\neq0$ or $f'(b)\neq0$ — the function might simply be monotonically climbing or falling right up to the edge of its domain, making the boundary value the largest/smallest achieved anywhere on $[a,b]$, entirely independent of the local derivative behavior there.

**Over all reals (unbounded domain)**: without finite endpoints, the Closed Interval Method's step of "evaluate at the endpoints" has no direct analogue — instead, you must analyze the **end behavior** as $x\to+\infty$ and $x\to-\infty$ (e.g. does $f(x)\to\infty$, $\to-\infty$, or approach a finite limit?) in addition to evaluating critical points. Crucially, a global maximum or minimum may **fail to exist at all** over an unbounded domain (e.g. if $f(x)\to\infty$ in one direction, there's no global max, regardless of how many local maxima exist).

## Component 4 — Worked Examples

**Example 1 (LO1 — Closed Interval Method)**: Find the global max/min of $f(x)=x^3-3x$ on $[-2,3]$. Critical points (from `math.calc.local-extrema`'s own worked example): $x=\pm1$. Evaluate: $f(-2)=-8+6=-2$; $f(-1)=-1+3=2$; $f(1)=1-3=-2$; $f(3)=27-9=18$. Comparing all four values: global max is $18$ at $x=3$ (an endpoint); global min is $-2$, achieved at BOTH $x=-2$ and $x=1$ (tied).

**Example 2 (LO2 — global extremum at an endpoint despite $f'\neq0$ there, breaking MC-1)**: For $f(x)=x^2$ on $[1,5]$: $f'(x)=2x$, which is never zero on $(1,5)$ — there are NO critical points inside this interval at all. The Closed Interval Method still requires evaluating the endpoints: $f(1)=1$, $f(5)=25$. Global min is $1$ (at $x=1$), global max is $25$ (at $x=5$) — BOTH global extrema occur at endpoints, even though $f'\neq0$ at either endpoint; skipping the endpoint-evaluation step (mistakenly relying only on critical points) would have found NO extrema at all, missing both.

**Example 3 (LO3 — unbounded domain, no global max exists)**: Find the global extrema of $f(x)=x^3-3x$ over ALL of $\mathbb{R}$ (no endpoints). Critical points remain $x=\pm1$: $f(-1)=2$ (a LOCAL max), $f(1)=-2$ (a LOCAL min). But checking end behavior: as $x\to\infty$, $f(x)\to\infty$; as $x\to-\infty$, $f(x)\to-\infty$. Since $f$ grows without bound in BOTH directions, there is **no global maximum and no global minimum** over all of $\mathbb{R}$ — the local extrema found at $x=\pm1$ are only LOCAL, not global, precisely because the unbounded domain lets $f$ eventually exceed (or fall below) both of them.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Closed Interval Method (Primitive P11: Representation Shift)

Draw a graph on $[a,b]$ with a local max/min inside the interval AND visibly higher/lower values right at the endpoints. State: "to find the TRUE highest and lowest points of this graph over the whole interval, you can't just check the local bumps — you also have to check the very edges, since the graph might simply be climbing or falling all the way to the boundary." Work Example 1's complete four-point comparison (two critical points, two endpoints), landing on the correct global max/min.

- **MC-1 hook**: work Example 2 ($f(x)=x^2$ on $[1,5]$, no critical points inside the interval at all) and ask "since there are no critical points here, does this function have a global max or min on $[1,5]$?" — an answer of "no, since there are no critical points" reveals MC-1 (believing the absence of critical points means no global extrema exist, forgetting endpoints are always candidates too).

### Teaching Action A02 — Endpoints Are Always Candidates, and the Unbounded-Domain Case (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Revisit Example 2 explicitly — despite zero critical points inside $(1,5)$, BOTH the global max (25, at $x=5$) and global min (1, at $x=1$) exist and occur exactly at the two endpoints. State the rule unambiguously: "endpoints are ALWAYS candidates for the Closed Interval Method, regardless of how many (or how few) critical points exist inside the interval — never skip this step."

**Contrast 2 (targets MC-2, unbounded domain)**: Work Example 3's over-all-reals case, showing the SAME critical points ($x=\pm1$) that gave clean global extrema on the bounded interval $[-2,3]$ (Example 1) now give only LOCAL extrema once the domain is unbounded — since end behavior ($f\to\pm\infty$) rules out any global max/min existing at all. State explicitly: "restricting a function to a closed, bounded interval GUARANTEES a global max and min exist (this is itself a theorem, the Extreme Value Theorem) — but over an unbounded domain, this guarantee disappears entirely, and you must separately check end behavior before concluding anything."

### Teaching Action A03 — Composite Applied Optimization Problem (Primitive P28: Conflict Evidence)

Present a genuine applied optimization problem requiring the full procedure end-to-end: "A rectangular garden plot uses 100m of fencing on three sides (one side is against an existing wall, needing no fence). Let $x$ be the width (the two sides perpendicular to the wall) and find the dimensions maximizing the enclosed area." Set up: fencing constraint $2x+y=100 \Rightarrow y=100-2x$; area $A(x)=xy=x(100-2x)=100x-2x^2$, with a natural domain constraint $0\leq x\leq50$ (both $x\geq0$ and $y=100-2x\geq0$). Find $A'(x)=100-4x=0 \Rightarrow x=25$ (a critical point). Apply the Closed Interval Method on $[0,50]$: $A(0)=0$, $A(25)=100(25)-2(625)=2500-1250=1250$, $A(50)=100(50)-2(2500)=5000-5000=0$. Global max: $A=1250$ at $x=25$ (giving $y=50$). This forces the FULL pipeline: translating a word problem into a function with a genuinely bounded domain, finding the critical point, and correctly comparing against BOTH endpoints (which here both give the trivial, non-useful value 0 — confirming the interior critical point is indeed the answer, but only after checking, not by assumption).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the global max/min of $f(x)=x^3-6x^2+9x$ on $[0,5]$ using the Closed Interval Method.
  2. Find the global max/min of $g(x)=\sqrt{x}$ on $[1,9]$ (note: $g'(x)=\frac{1}{2\sqrt x}$ is never zero — check carefully what this implies for the procedure).
  3. Determine whether $h(x)=-x^2+4$ has a global maximum over ALL of $\mathbb{R}$, and if so, find it; separately determine whether it has a global minimum over all of $\mathbb{R}$, explaining your reasoning using end behavior.
  4. A rectangular box with a square base (side $x$) and no top is to be built using exactly 300 square inches of material. Set up the volume function in terms of $x$ alone, identify the natural domain restriction, and find the value of $x$ maximizing volume using the full Closed Interval Method procedure.
- **P76 (Transfer Probe, mode = independence)**: "A shipping company wants to design a rectangular box (with a square base of side $x$ and height $h$) with FIXED total surface area of 600 square inches, maximizing volume. (a) Express volume $V$ as a function of $x$ alone (eliminating $h$ using the surface-area constraint), and determine the natural domain restriction on $x$ (recall both $x>0$ and the resulting $h$ must be positive). (b) Find all critical points of $V(x)$ within this domain. (c) Apply the full Closed Interval Method (including checking the domain's boundary behavior, even if the true endpoints correspond to a degenerate box with zero volume) to confirm the critical point you found genuinely gives the GLOBAL maximum volume, not merely a local one."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ENDPOINTS-SKIPPED-WHEN-NO-CRITICAL-POINTS | Believing that if a function has no critical points inside an interval, it has no global max/min on that interval, forgetting endpoints are always candidates regardless of critical-point count | Foundational |
| MC-2 | UNBOUNDED-DOMAIN-ASSUMED-TO-STILL-GUARANTEE-GLOBAL-EXTREMA | Believing a global maximum/minimum must exist for any continuous function, even over an unbounded domain, not recognizing the Extreme Value Theorem's guarantee specifically requires a closed, BOUNDED interval | Foundational |
| MC-3 | LOCAL-EXTREMUM-ASSUMED-AUTOMATICALLY-GLOBAL | Believing a local maximum/minimum found via critical-point analysis is automatically the GLOBAL maximum/minimum, without comparing against other candidates (other critical points, endpoints, or end behavior) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Endpoints Skipped When No Critical Points") → P41 (detect: present Example 2's $x^2$ on $[1,5]$ (no interior critical points) and ask if a global max/min exists) → P64 (conceptual shift: re-anchor on "endpoints are ALWAYS candidates in the Closed Interval Method — evaluate them regardless of what critical-point search turns up").
- **B02 (targets MC-2)**: P27 (name it: "Unbounded Domain Extrema Overassumption") → P41 (detect: ask whether a continuous function defined on all of $\mathbb{R}$ must have a global max, checking against Example 3's $x^3-3x$) → P64 (conceptual shift: re-anchor on the Extreme Value Theorem's precise hypothesis — closed AND bounded interval; an unbounded domain provides no such guarantee, and end behavior must be separately checked).
- **B03 (targets MC-3)**: P27 (name it: "Local-as-Global Overgeneralization") → P41 (detect: find one local extremum via the derivative tests and ask if it's automatically the global extremum, without comparing to other candidates) → P64 (conceptual shift: re-derive via Example 1's complete comparison, showing the correct global extremum required comparing ALL candidates — multiple critical points AND both endpoints — not just the first one found).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.local-extrema` (the local classification tools this concept extends to a genuinely global search).
- **Unlocks**: `math.opt.unconstrained-optimization` (the more general, often multivariable optimization theory building directly on this concept's global-search procedure).
- **Cross-link**: KG lists `math.opt.unconstrained-optimization` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.opt.unconstrained-optimization.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's single-variable Closed Interval Method directly to that concept's generalization to multivariable unconstrained optimization (where "checking the boundary" becomes checking the boundary of a higher-dimensional region, and critical points are found via the gradient vanishing rather than a single derivative).

## Component 8 — Teaching Notes

- estimated_hours = 10 with an advanced/apply tag places this at the "3 main TAs + gate" tier — A01 (the Closed Interval Method's core procedure), A02 (the endpoints-always-matter contrast plus the unbounded-domain caveat), and A03 (a genuinely composite applied word-problem forcing the full pipeline: setup, critical-point-finding, domain restriction, and comparison) reflect the concept's substantial breadth: not just executing the procedure mechanically, but correctly setting up applied problems and correctly scoping when the procedure's guarantees actually hold.
- MC-1 (endpoints skipped when no critical points) was given the most extensive treatment because it represents the single most consequential shortcut error in this concept's procedure — Example 2 was deliberately chosen as a case with ZERO interior critical points specifically to make the endpoint-only global extrema maximally visible and impossible to miss via any other route.
- A03's fencing/garden problem was deliberately designed so BOTH endpoints of the natural domain restriction give the trivial value $A=0$ — this was a deliberate pedagogical choice forcing genuine verification (the interior critical point beats both endpoints) rather than allowing the learner to skip the endpoint-comparison step on the assumption that "the interior point is obviously the answer for an applied max problem," directly reinforcing MC-1's correction within an applied context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.local-extrema`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.opt.unconstrained-optimization` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: graph with candidates marked before procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
