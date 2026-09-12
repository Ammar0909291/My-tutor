# math.trig.trig-functions — Trigonometric Functions

## Identity
- **KG id**: `math.trig.trig-functions`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.unit-circle`
- **Unlocks**: `math.trig.trig-identities`, `math.trig.inverse-trig`
- **Cross-links**: `math.func.periodic-function`
- **Difficulty**: proficient · **Bloom level**: understand
- **Mastery threshold**: 0.85 · **Estimated hours**: 10

## Learning Objective
The learner treats $\sin(x)$, $\cos(x)$, and $\tan(x)$ as globally-defined periodic functions of a real variable — stating each function's correct domain, range, and period in radians — and computes exact values at any real input using the reference-angle method plus odd/even symmetry.

## Core Understanding
`math.trig.unit-circle` defined $(\cos\theta,\sin\theta)$ for any angle placed on the circle. This concept takes the final step: letting the input $x$ be **any real number** (not just an angle drawn once around a circle), which is what makes sin, cos, and tan genuine *functions* of a real variable rather than a geometric construction.

Since a full revolution is $2\pi$ radians, sweeping $x$ past $2\pi$ simply revisits the same unit-circle point: $\sin(x+2\pi)=\sin(x)$ and $\cos(x+2\pi)=\cos(x)$ — both functions are **periodic with period $2\pi$**. Their domain is all reals; their range is $[-1,1]$ (the coordinate range of a unit circle).

$\tan(x)=\sin(x)/\cos(x)=y/x$ is undefined exactly where $\cos(x)=0$ (the $x$-coordinate vanishes), i.e. at $x=\pi/2+n\pi$ — vertical asymptotes there. Its period is $\pi$, not $2\pi$: shifting $x$ by $\pi$ negates *both* $\sin$ and $\cos$ simultaneously, so their ratio is unchanged — $\tan(x+\pi)=\frac{-\sin x}{-\cos x}=\tan x$. Tan completes a full cycle in half the distance sin/cos need.

Evaluating any of the three at a real number beyond the memorized Q1 table uses exactly the machinery `math.trig.reference-angles` just built: find the reference angle, read the Q1 magnitude, apply the ASTC sign — plus two extra tools this concept introduces: **odd/even symmetry** ($\sin(-x)=-\sin x$, $\cos(-x)=\cos x$, $\tan(-x)=-\tan x$) for negative inputs, and **reduction modulo the period** ($2\pi$ for sin/cos, $\pi$ for tan) for inputs beyond one revolution.

## Mental Models
- **The graph is the circle "unrolled."** Tracing the $y$-coordinate of a point sweeping counter-clockwise around the unit circle, plotted against the swept angle on a horizontal axis, produces exactly the sine wave — this single image explains both the wave shape and why it repeats every $2\pi$.
- **Tan's period is a cancellation, not a coincidence.** Both $\sin$ and $\cos$ flip sign after $\pi$ radians; since $\tan$ is their ratio, the two sign flips cancel, and the ratio returns to its original value in half the distance sin/cos themselves need.
- **The domain restriction is a leftover from the right triangle, not the function.** The unit-circle definition has no gaps — every real $x$ maps to a well-defined point — so "sin isn't defined past $90°$" is a rule about right triangles, never about the sin function itself.

## Why Students Fail
None of this Blueprint's three misconceptions carry an explicit birth-type column (consistent with virtually every math.trig Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 4 (notation-induced)** confusion: "$360$" is deeply overlearned as *the* period from all prior right-triangle and degree-based work, and nothing in the notation of "$x$" (as opposed to "$\theta$ in degrees") visually signals that the unit has silently changed to radians.
- **MC-2** is a **Type 1 (overgeneralization)**: having just learned that sin and cos share period $2\pi$, the learner extends "trig functions have period $2\pi$" to tan without tracing through why tan's ratio structure genuinely behaves differently.
- **MC-3** is a **Type 5 (instruction-induced)** gap: the transition from "sin only makes sense for a right-triangle angle between $0°$ and $90°$" to "sin is defined for every real number" is a genuine domain *extension*, and if the unit-circle generalization isn't presented as explicitly overriding the right-triangle restriction, the older, narrower rule persists as the only one the learner has internalized.

## Misconceptions
**MC-1 — PERIOD-IS-360-IN-RADIANS** *(Foundational, Type 4)*
- Surface form: "sin(x) repeats every 360 units, so sin(370)=sin(10)" — stated with $x$ implicitly in radians.
- Root cause: the degree-based period ($360°$) is overlearned from earlier work and applied without translating to the radian value ($2\pi$) once the input becomes a bare real number.
- Repair: a direct numerical check — $\sin(2\pi)=\sin(0)=0$ ✓, but $\sin(360)$ (360 *radians*, not degrees) reduces to $\sin(360-357.96)\approx\sin(2.04)\approx0.896\ne0$ — proving 360 is the wrong period once the input is genuinely a real number rather than a degree measure.

**MC-2 — TAN-PERIOD-IS-2PI**
- Surface form: "All trig functions have period $2\pi$."
- Root cause: overgeneralizing sin/cos's shared period onto tan without checking whether tan's own ratio structure behaves the same way.
- Repair: the algebraic proof — $\tan(x+\pi)=\frac{\sin(x+\pi)}{\cos(x+\pi)}=\frac{-\sin x}{-\cos x}=\tan x$ — both negatives cancel, giving period exactly $\pi$, provably the *smallest* positive period (testing $p=\pi/2$ fails since $\tan(\pi/2)$ is undefined).

**MC-3 — DOMAIN-RESTRICTED-TO-FIRST-QUADRANT** *(Type 5)*
- Surface form: "$\sin(120°)$ isn't defined because the angle is bigger than $90°$; sine is only for right triangles."
- Root cause: the right-triangle domain restriction ($0°<\theta<90°$) persists as the only rule the learner has internalized, because the unit-circle extension to all reals was never presented as explicitly *overriding* it.
- Repair: directly compute $\sin(120°)$ via the unit circle — Q2, reference angle $60°$, sin positive in Q2, so $\sin(120°)=+\sin(60°)=+\sqrt3/2$ — a concrete, well-defined answer that the right-triangle picture alone could never produce, since no right triangle can *have* a $120°$ interior angle.

## Analogies
- **The unrolled-circle animation**: a point sweeping the unit circle counter-clockwise, its height traced onto a horizontal timeline — this is the single clearest way to make periodicity and the wave shape simultaneously visible, and is reused explicitly from the Blueprint's own Teaching Notes as the anchoring visual for this whole concept.
- **Anti-analogy — tan is NOT "just sin and cos combined the same way sin and cos combine with each other."** Tan's period, domain, and range are all genuinely *different* from sin/cos's (period $\pi$ vs. $2\pi$; unbounded range vs. $[-1,1]$; excluded points vs. none) — treating tan as a minor variation on the sin/cos pattern, rather than a structurally distinct function built by division, is exactly what produces MC-2.

## Demonstrations
1. **Numerical period check**: compute $\sin(2\pi)$ vs. $\sin(360)$ (360 radians) directly, showing the first equals $\sin(0)=0$ and the second does not — falsifying "period = 360" for radian inputs.
2. **Tan-period algebraic proof**: derive $\tan(x+\pi)=\tan(x)$ step by step from the sign-flip of sin and cos, then confirm $p=\pi/2$ fails (undefined), establishing $\pi$ as the genuinely smallest period.
3. **Beyond-Q1 evaluation**: compute $\sin(120°)$ directly via the unit circle (Q2, reference angle $60°$, sign $+$), producing a concrete value a right triangle alone cannot produce — directly refuting MC-3.
4. **Contrast table**: sin vs. cos vs. tan side by side on period/domain/range/zeros/even-odd, making the genuine structural differences (not just superficial notation differences) explicit.

## Discovery Questions
1. "If $x$ is measured in radians, is $\sin(x+2\pi)$ the same as $\sin(x+360)$? Compute $\sin(2\pi)$ and $\sin(360)$ (as radians) and compare."
2. "Compute $\tan(0)$ and $\tan(\pi)$. Are they equal? Now try $\tan(\pi/4)$ and $\tan(\pi/4+\pi)$. What does this suggest about tan's period compared to sin and cos?"
3. "Can you compute $\sin(120°)$ using the unit circle, even though no right triangle has a $120°$ angle?"

## Teaching Sequence
1. **Anchor in `math.trig.unit-circle`**: restate $(\cos\theta,\sin\theta)$ as the coordinate on the circle, then extend $\theta$ to any real $x$ — a full revolution ($2\pi$) revisits the same point, which *is* what periodicity means for a function.
2. **Representation shift (breaks MC-1)**: unit circle → sin graph → cos graph → tan graph → domain/range/period table, ending with the numerical $\sin(2\pi)$-vs-$\sin(360)$ check.
3. **Contrast pair (breaks MC-2)**: sin/cos (same period, phase-shifted) vs. tan (different period, domain, range), ending with the algebraic $\tan(x+\pi)=\tan(x)$ proof.
4. **Pattern induction (breaks MC-3 and extends to all quadrants)**: Q1 exact-value table extended via reference angle + ASTC sign to all four quadrants, then negative angles via odd/even symmetry, then angles beyond $2\pi$ via reduction modulo the period.
5. **Mastery gate**: 4-item problem set (period of cos, domain of tan, exact value of $\sin(5\pi/6)$, true/false on tan's period) plus 1 independence-mode transfer probe (a 4-part problem on $\cos(x)$ covering period/range, a Q3 value, an even-symmetry value, and a solve-for-$x$ item).

## Tutor Actions
- **Representation shift** (MC-1): unit circle → three graphs → domain/range/period table.
- **Contrast pair** (MC-2): sin/cos vs. tan structural comparison, ending in the algebraic period proof.
- **Pattern induction**: Q1 table → all-quadrant extension → negative angles → beyond-$2\pi$ reduction, breaking MC-3 along the way.
- **Mastery gate**, 4-item problem set plus 1 transfer probe.

## Voice Teaching Notes
- When first extending the domain past a right triangle's $0°$–$90°$, say explicitly "the unit circle has no gaps — every real number gets a point" before showing any specific beyond-Q1 example, front-loading the repair for MC-3 rather than treating it reactively.
- For the tan-period proof, narrate the two sign flips as a spoken pair: "sine flips... cosine flips... and in a ratio, two flips cancel" — reinforcing the cancellation mechanism verbally alongside the algebra.
- Whenever radians are the input unit, say "radians" aloud explicitly the first few times a period value ($2\pi$ or $\pi$) is stated, to break the automatic "$360$" reflex from prior degree-based work.

## Assessment Signals
- **Early warning for MC-1**: stating a period value of $360$ (or any multiple of $360$) when the stated input is a bare real number rather than an explicit degree measure.
- **Early warning for MC-2**: stating tan's period as $2\pi$ or claiming "all three trig functions share the same period."
- **Early warning for MC-3**: refusing to evaluate a trig function at an angle outside $[0°,90°]$, or claiming such an evaluation is "undefined" or "impossible."
- **Mastery evidence**: correctly stating domain, range, and period for all three functions independently (not just sin/cos), and computing an exact value at a fresh angle in any quadrant, including negative angles and angles beyond one revolution.

## Tutor Recovery Strategy
- On MC-1: use the direct numerical contrast ($\sin(2\pi)$ vs. $\sin(360)$ as radians) rather than simply restating "the period is $2\pi$" — the misconception is a units confusion and needs a concrete number, not an abstract correction.
- On MC-2: re-derive the algebraic proof step by step ($\tan(x+\pi)$ expanded via the sign-flip identities) rather than asserting "tan's period is $\pi$" — understanding *why* the sign cancellation happens is what prevents the misconception from recurring.
- On MC-3: return to a concrete beyond-Q1 evaluation (like $\sin(120°)$) computed all the way to a numeric answer, rather than arguing abstractly that "the domain is all reals" — a learner who has just watched a "forbidden" evaluation succeed cannot continue believing it is forbidden.
- If a learner correctly handles Q1–Q4 evaluation but fails specifically on negative angles or angles beyond $2\pi$, treat these as two separate extension skills (odd/even symmetry; periodic reduction) rather than re-drilling the reference-angle method itself.

## Memory Hooks
- "$2\pi$, not $360$ — when $x$ is a bare number, it's radians" — for MC-1.
- "Two sign flips cancel — that's why tan needs only $\pi$" — for MC-2, paired with the algebraic proof.
- "The circle has no gaps — every real number gets a point" — for MC-3.
- "Odd, even, odd" — for the sin/cos/tan symmetry pattern under negation.

## Transfer Connections
- **`math.trig.trig-identities`** (unlocked): the Pythagorean identity and its derived family (e.g. $\tan^2x+1=\sec^2x$) all assume the global, all-reals definition of sin and cos established here — this concept is the direct prerequisite those identities are proved from.
- **`math.trig.inverse-trig`** (unlocked): defining $\arcsin$, $\arccos$, $\arctan$ as restricted inverses requires precisely knowing the full domain and range of the original functions this concept establishes — the restriction to a principal branch only makes sense once the *unrestricted* domain/range are on the table.
- **`math.func.periodic-function`** (cross-linked, NOT Tier 1 per the Blueprint's own designation — already authored, Batch 31 of `math.func`): that concept's generic definition of periodicity ($f(x+T)=f(x)$ for the smallest positive $T$) is the exact abstract framework sin/cos/tan instantiate concretely here — sin/cos with $T=2\pi$, tan with $T=\pi$ — a genuine, substantively-incorporated connection even though the Blueprint sets P76 to independence mode regardless of the cross-link's Tier status.

## Cross-Subject Connections
- No physics or other-subject cross-links are declared in the KG for this concept beyond `math.func.periodic-function`, and none are asserted here beyond the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.trig-functions.md` (older 10-component format: Metadata, Cognitive Map, Misconception Registry, Scaffolding Protocol, Protocol A main sequence with 4 teaching actions including the mastery gate, Protocol B repair sequences, P89 spaced repetition, Cross-Blueprint Dependencies, Teaching Notes, Validation Checklist). All worked examples (the unit-circle-to-graph representation shift, the sin/cos/tan contrast table, the full Q1-through-Q4-through-negative-through-beyond-$2\pi$ pattern), the complete misconception registry (MC-1/MC-2/MC-3, none carrying an explicit birth-type column), and the spaced-repetition schedule are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` — the cross-link `math.func.periodic-function` is explicitly designated NOT Tier 1 in the Blueprint's own Component 7): "For the function $f(x)=\cos(x)$: (a) State the period and range. (b) Find the exact value of $\cos(7\pi/6)$. (c) Find the exact value of $\cos(-\pi/4)$. (d) For which $x$ in $[0,2\pi)$ does $\cos(x)=-1/2$? Give exact answers." *(Expected: (a) period $2\pi$, range $[-1,1]$. (b) $7\pi/6$ is Q3, reference angle $\pi/6$, cos negative: $\cos(7\pi/6)=-\sqrt3/2$. (c) cos is even: $\cos(-\pi/4)=\cos(\pi/4)=\sqrt2/2$. (d) cos $=-1/2$ in Q2 and Q3; reference angle for $1/2$ is $\pi/3$; Q2: $x=\pi-\pi/3=2\pi/3$; Q3: $x=\pi+\pi/3=4\pi/3$.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- One genuine forward connection recorded, not developed further: `math.func.periodic-function` (this concept's cross-link) is already authored (Batch 31), so the Transfer Connections section above substantively incorporates its abstract periodicity definition rather than treating the cross-link as unauthored.

## Version History
- **2026-09-12 (Batch 54)**: authored as part of the Mathematics Educational Brain completion campaign. Second of two `math.trig` concepts authored this batch (companion: `math.trig.reference-angles`), unblocked by the already-authored `math.trig.unit-circle` (Batch 53). `math.trig` moves from 4/25 to 6/25 this batch. Unlocks `math.trig.trig-identities` and `math.trig.inverse-trig` (neither yet authored).
