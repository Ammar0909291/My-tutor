# Teaching Blueprint: Intermediate Value Theorem (`math.calc.ivt`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.ivt` |
| name | Intermediate Value Theorem |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.continuity` |
| unlocks | none |
| cross_links | `math.num.root-finding` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — verifying the theorem holds numerically on one specific function before naming the general statement and its applications |
| description (KG) | If $f$ is continuous on $[a,b]$ and $N$ is between $f(a)$ and $f(b)$, then there exists $c\in(a,b)$ with $f(c)=N$; guarantees roots and intermediate values. |

## Component 1 — Learning Objectives

- LO1: State IVT: if $f$ is continuous on $[a,b]$ (via `math.calc.continuity`'s own $\lim_{x\to a}f(x)=f(a)$ definition, applied at every point) and $N$ is between $f(a)$ and $f(b)$, then SOME $c\in(a,b)$ satisfies $f(c)=N$ — and recognize CONTINUITY as the essential hypothesis making this guarantee valid, not a minor technical footnote.
- LO2: Apply IVT to prove a root EXISTS (i.e. some $c$ with $f(c)=0$) purely via checking a SIGN CHANGE at the endpoints, without solving for or approximating the root's actual value.
- LO3 (orientation level — full numerical root-finding deferred): recognize, without full derivation, that IVT GUARANTEES a root exists but gives NO method for actually FINDING it — previewing that iterative numerical methods (bisection, Newton's method) are needed to actually locate the root IVT promises, deferred to `math.num.root-finding`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.continuity` ($f$ continuous at $a$ iff $\lim_{x\to a}f(x)=f(a)$, and on an interval if continuous at every point).

## Component 3 — Core Explanation

**Continuity is the essential hypothesis — without it, IVT genuinely fails**: `math.calc.continuity` establishes $f$ continuous means $\lim_{x\to a}f(x)=f(a)$ at every point — informally, no sudden jumps. IVT's guarantee (every intermediate value $N$ between $f(a)$ and $f(b)$ is actually ACHIEVED somewhere in between) depends critically on this no-jumps property: a DISCONTINUOUS function can "skip over" a value $N$ entirely, jumping from below $N$ to above $N$ without ever equaling $N$ — continuity is precisely what rules out this failure mode.

**Proving existence via a sign change requires NO solving**: to show $f(c)=0$ for SOME $c$, IVT only requires checking $f(a)$ and $f(b)$ have OPPOSITE signs (so $N=0$ is between them) and that $f$ is continuous on $[a,b]$ — the theorem then GUARANTEES some $c\in(a,b)$ with $f(c)=0$, without ever needing to solve for $c$'s actual value or even estimate where it might be, beyond knowing it's somewhere in $(a,b)$.

**IVT proves existence, not location — numerical methods are needed to actually FIND the root (orientation level)**: IVT's conclusion is purely EXISTENTIAL — "some $c$ exists" — it provides no formula, no procedure, no narrowing-down beyond the interval $(a,b)$ itself for actually LOCATING that $c$. Finding the root's approximate numeric value requires a genuinely different, ITERATIVE approach (e.g. repeatedly halving the interval via bisection, narrowing in on the root), deferred to `math.num.root-finding`.

## Component 4 — Worked Examples

**Example 1 (LO1 — continuity as the essential, not optional, hypothesis, breaking MC-1)**: for $f(x)=x^3-2x-5$ on $[2,3]$: $f$ is a polynomial, hence continuous everywhere (satisfying `math.calc.continuity`'s definition at every point). $f(2)=8-4-5=-1$ and $f(3)=27-6-5=16$. IVT applies (continuity confirmed, $0$ is between $-1$ and $16$), guaranteeing some $c\in(2,3)$ with $f(c)=0$. Contrast with a DISCONTINUOUS function like $g(x)=1/(x-2.5)$ on $[2,3]$: $g(2)=-2$ and $g(3)=2$ (opposite signs, seemingly promising), but $g$ has a discontinuity (undefined) at $x=2.5$ inside the interval — IVT's conclusion GENUINELY FAILS here in the naive sense (there's no $c$ with $g(c)=0$ at all, since $g$ never equals zero), precisely because continuity was violated.

**Example 2 (LO2 — proving root existence via sign change alone, breaking MC-2)**: for $f(x)=x^3-2x-5$ (Example 1) on $[2,3]$: $f(2)=-1<0$ and $f(3)=16>0$ — a sign change, with $f$ continuous (polynomial). IVT guarantees a root $c\in(2,3)$ with $f(c)=0$. This is a COMPLETE, rigorous existence proof: at no point was the root's actual value computed, estimated, or narrowed down beyond "somewhere strictly between $2$ and $3$" — checking the sign change and continuity was the ENTIRE argument needed.

**Example 3 (LO3, orientation level — existence without location, breaking MC-3)**: continuing Example 2: IVT guarantees a root exists in $(2,3)$, but provides ZERO further information about WHERE — is it near $2.0$? Near $2.9$? IVT alone cannot say. To actually LOCATE the root numerically (e.g. to 3 decimal places), a genuinely different technique is needed: BISECTION repeatedly evaluates $f$ at the interval's midpoint, checks which half retains the sign change, and narrows the interval — e.g. checking $f(2.5)=15.625-5-5=5.625>0$ narrows the root to $(2,2.5)$, then checking further midpoints narrows further. IVT's existence guarantee is the STARTING POINT justifying this search is worthwhile, but the actual narrowing-down is a separate, iterative computational process.

## Component 5 — Teaching Actions

### Teaching Action A01 — Continuity Is What Prevents "Jumping Over" a Value (Primitive P11: Representation Shift)

State: "IVT's guarantee depends entirely on continuity ruling out sudden jumps — without it, a function can genuinely skip past the value you're looking for, never actually hitting it." Walk Example 1's contrast between the continuous polynomial and the discontinuous $g(x)=1/(x-2.5)$.

- **MC-1 hook**: ask "does IVT's conclusion still hold if $f$ has a discontinuity somewhere inside the interval $[a,b]$, as long as $f(a)$ and $f(b)$ straddle the target value $N$?" — a "yes" answer reveals MC-1 (missing that continuity is the essential hypothesis; without it, the function can skip the value entirely).

### Teaching Action A02 — A Sign Change Alone Is a Complete Existence Proof (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: checking $f(2)<0$ and $f(3)>0$, plus continuity, was the ENTIRE argument establishing a root exists — no further computation was needed. State: "you don't need to know anything about WHERE the root is to prove it EXISTS — the sign-change-plus-continuity check is a complete, rigorous existence proof on its own."

- **MC-2 hook**: ask "does proving a root exists via IVT also require estimating or narrowing down where that root actually is?" — a "yes" answer reveals MC-2 (missing that the sign-change check alone constitutes a complete existence proof, with no location information required).

### Teaching Action A03 — Existence Is Not the Same as Locating the Root (Primitive P06: Contrast Pair)

Contrast Example 2's complete existence proof (using only a sign check) against Example 3's SEPARATE, iterative bisection process needed to actually narrow down the root's numeric value. State: "IVT tells you a root is somewhere in $(2,3)$ and stops there — actually finding where requires a genuinely different tool, an iterative numerical search, which IVT itself does not provide."

- **MC-3 hook**: ask "does IVT itself provide a method or formula for finding the root's actual numeric location, beyond confirming it exists somewhere in the interval?" — a "yes" answer reveals MC-3 (missing that IVT is purely existential; locating the root requires separate iterative numerical methods).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify $f(x)=x^2-7$ is continuous on $[2,3]$, check the sign of $f(2)$ and $f(3)$, and state what IVT concludes.
  2. For $g(x)=1/x$ on $[-1,1]$ (note $g$ is undefined, hence discontinuous, at $x=0$), check $g(-1)=-1<0$ and $g(1)=1>0$, and explain why IVT does NOT apply here despite the sign change.
  3. Using only a sign check (no solving), prove $h(x)=x^3-x-3$ has a root in $(1,2)$.
  4. Explain, in one or two sentences, why IVT's existence guarantee does not by itself tell you the root's approximate numeric value.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models a bridge's structural stress as a continuous function $S(t)$ of temperature $t$, and wants to know if there's a temperature where stress exactly equals a critical threshold $S_0$, given $S(0°C)=800$ (below threshold $S_0=1000$) and $S(40°C)=1200$ (above threshold). (a) State what IVT guarantees here, and justify why continuity of $S$ is essential to this conclusion (not merely a technical formality). (b) Explain why this existence guarantee, by itself, does not tell the engineer the SPECIFIC temperature at which the critical stress occurs. (c) Propose, in general terms (without computing it), how the engineer might use an iterative approach like bisection to actually narrow down the critical temperature, given that IVT alone confirms such a temperature exists somewhere in $(0°C,40°C)$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | IVT-ASSUMED-TO-HOLD-WITHOUT-CONTINUITY | Believing IVT's conclusion holds even if $f$ has a discontinuity in the interval, as long as the endpoints straddle the target value, missing that continuity is the essential hypothesis | Foundational |
| MC-2 | ROOT-EXISTENCE-PROOF-ASSUMED-TO-NEED-LOCATION | Believing proving root existence via IVT also requires estimating where the root is, missing that the sign-change check alone is a complete existence proof | High |
| MC-3 | IVT-ASSUMED-TO-LOCATE-THE-ROOT | Believing IVT itself provides a method for finding the root's numeric location, missing that it is purely existential and locating requires separate iterative methods | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "IVT Assumed to Hold Without Continuity") → P41 (detect: ask whether IVT's conclusion holds even with a discontinuity present) → P64 (conceptual shift: re-walk Example 1's continuous-versus-discontinuous contrast, re-anchoring on "continuity is the essential hypothesis preventing the function from skipping the value").
- **B02 (targets MC-2)**: P27 (name it: "Root Existence Proof Assumed to Need Location") → P41 (detect: ask whether proving root existence also requires estimating its location) → P64 (conceptual shift: re-walk Example 2's complete sign-check-only proof, re-anchoring on "the sign-change check alone is a complete existence proof").
- **B03 (targets MC-3)**: P27 (name it: "IVT Assumed to Locate the Root") → P41 (detect: ask whether IVT itself provides a method for finding the root's location) → P64 (conceptual shift: re-walk Example 3's bisection-versus-IVT contrast, re-anchoring on "IVT is purely existential; locating requires separate iterative methods").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.continuity` (the $\lim_{x\to a}f(x)=f(a)$ definition, the essential hypothesis IVT depends on).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.num.root-finding`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the continuity-hypothesis contrast and the complete sign-change existence proof) and LO3 kept orientation-level, appropriately previewing bisection's iterative nature without deriving its convergence rate or stopping criteria.
- **Division of labor**: `math.calc.continuity` owns the general continuity definition; this concept owns APPLYING it as IVT's essential hypothesis and the sign-change existence-proof technique — deliberately reusing the SAME cubic $f(x)=x^3-2x-5$ across Examples 1–3 so the continuity check, the existence proof, and the bisection preview all connect to one running example rather than three disconnected ones.
- Example 1's deliberate choice of a discontinuous function whose naive sign-change WOULD seem to suggest a root (but genuinely has none) was chosen to make MC-1's failure mode as concrete and falsifiable as possible, rather than merely asserting "continuity matters" abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.num.root-finding` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric verification on a specific function precedes the general statement and applications) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
