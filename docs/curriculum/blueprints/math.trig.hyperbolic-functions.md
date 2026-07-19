# Teaching Blueprint: Hyperbolic Functions (`math.trig.hyperbolic-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.hyperbolic-functions` |
| name | Hyperbolic Functions |
| domain | Trigonometry |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.exponential-function`, `math.trig.trig-functions` |
| unlocks | `math.calc.hyperbolic-derivatives` |
| cross_links | `math.calc.hyperbolic-derivatives` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in the exponential function and ordinary trig; hyperbolic functions introduced directly via their exponential definitions |
| description (KG) | sinh x = (eˣ − e⁻ˣ)/2; cosh x = (eˣ + e⁻ˣ)/2; tanh x = sinh x/cosh x; analogues of trig functions for the unit hyperbola x²−y²=1. |

## Component 1 — Learning Objectives

- LO1: Define $\sinh x=\dfrac{e^x-e^{-x}}2$, $\cosh x=\dfrac{e^x+e^{-x}}2$, $\tanh x=\dfrac{\sinh x}{\cosh x}$ directly in terms of `math.alg.exponential-function`'s $e^x$, and compute values / verify $\sinh$ is ODD and $\cosh$ is EVEN directly from these definitions.
- LO2: Derive and apply the hyperbolic identity $\cosh^2x-\sinh^2x=1$ — critically different in SIGN from `math.trig.trig-functions`'s $\cos^2\theta+\sin^2\theta=1$ — and connect it directly to the unit HYPERBOLA $x^2-y^2=1$ (as opposed to the unit CIRCLE $x^2+y^2=1$ ordinary trig parametrizes), explaining precisely where the name "hyperbolic" comes from.
- LO3 (orientation level — full derivation deferred to the unlocked child): recognize, without deriving, that hyperbolic functions have derivative rules directly analogous to but with characteristic sign differences from ordinary trig derivatives, deferred to `math.calc.hyperbolic-derivatives`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponential-function` ($e^x$ and its basic properties) and `math.trig.trig-functions` (the ordinary sine/cosine functions and the identity $\cos^2\theta+\sin^2\theta=1$).

## Component 3 — Core Explanation

**Defined algebraically from $e^x$, not by analogy to angles**: $\sinh x=\dfrac{e^x-e^{-x}}2$ and $\cosh x=\dfrac{e^x+e^{-x}}2$ are defined PURELY algebraically, directly from the exponential function — no angle, rotation, or circle is involved in the definition itself. $\sinh(-x)=\dfrac{e^{-x}-e^x}2=-\sinh(x)$ (odd) and $\cosh(-x)=\dfrac{e^{-x}+e^x}2=\cosh(x)$ (even) follow immediately from the definitions, with no separate geometric argument required. $\tanh x=\sinh x/\cosh x$, by direct analogy with $\tan\theta=\sin\theta/\cos\theta$.

**The hyperbolic identity, and where the hyperbola comes from**: computing $\cosh^2x-\sinh^2x$ directly from the exponential definitions: $\cosh^2x=\dfrac{e^{2x}+2+e^{-2x}}4$, $\sinh^2x=\dfrac{e^{2x}-2+e^{-2x}}4$; subtracting, the $e^{2x}$ and $e^{-2x}$ terms cancel, leaving $\cosh^2x-\sinh^2x=\dfrac{4}4=1$ — note the MINUS sign, in sharp contrast to `math.trig.trig-functions`'s $\cos^2\theta+\sin^2\theta=1$ (a PLUS). Setting $x=\cosh t$, $y=\sinh t$ traces the curve $x^2-y^2=\cosh^2t-\sinh^2t=1$ for every $t$ — the unit HYPERBOLA — exactly as $(\cos\theta,\sin\theta)$ traces the unit CIRCLE $x^2+y^2=1$. This is precisely the origin of the name "hyperbolic": the identity's minus sign is not incidental, it is what makes the parametrized curve a hyperbola instead of a circle.

**Derivative analogy, with a genuine sign difference (orientation level)**: hyperbolic function derivatives closely parallel ordinary trig derivatives, but not always with the same sign pattern — $\dfrac d{dx}[\sinh x]=\cosh x$ matches $\dfrac d{dx}[\sin x]=\cos x$ with no sign change, while $\dfrac d{dx}[\cosh x]=\sinh x$ does NOT introduce the minus sign that $\dfrac d{dx}[\cos x]=-\sin x$ has. Full derivation of these rules is the dedicated subject of `math.calc.hyperbolic-derivatives`.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation from the exponential definitions, breaking MC-1)**: at $x=0$: $\sinh(0)=\dfrac{e^0-e^0}2=\dfrac{1-1}2=0$; $\cosh(0)=\dfrac{e^0+e^0}2=\dfrac{1+1}2=1$. Note $\cosh(0)=1$ matches $\cos(0)=1$ — a genuine numerical coincidence at this one point, NOT evidence that $\cosh$ is secretly built from angles or rotation; $\sinh$ and $\cosh$ are defined from $e^x$ alone, with no angle anywhere in the definition. Verifying odd/even directly: $\sinh(-x)=-\sinh(x)$ and $\cosh(-x)=\cosh(x)$ follow immediately by substituting $-x$ into the exponential definitions, requiring no separate geometric argument.

**Example 2 (LO2 — the hyperbolic identity and the hyperbola connection, breaking MC-2)**: computing directly, $\cosh^2x-\sinh^2x=\dfrac{(e^x+e^{-x})^2-(e^x-e^{-x})^2}4=\dfrac{(e^{2x}+2+e^{-2x})-(e^{2x}-2+e^{-2x})}4=\dfrac44=1$ — the algebra FORCES a minus sign between $\cosh^2$ and $\sinh^2$, sharply contrasting with $\cos^2\theta+\sin^2\theta=1$'s plus sign. Setting $(x,y)=(\cosh t,\sinh t)$ for any $t$ gives $x^2-y^2=1$ — the unit hyperbola — confirming the name "hyperbolic" describes a genuine curve these functions parametrize, exactly as $(\cos\theta,\sin\theta)$ parametrizes the unit circle for ordinary trig.

**Example 3 (LO3, orientation level — derivative sign-difference preview, breaking MC-3)**: state (without deriving) that $\dfrac d{dx}[\sinh x]=\cosh x$ — matching the SAME-sign pattern of $\dfrac d{dx}[\sin x]=\cos x$ — but $\dfrac d{dx}[\cosh x]=\sinh x$, which does NOT pick up the minus sign that $\dfrac d{dx}[\cos x]=-\sin x$ has. This asymmetric sign behavior (one derivative matches the trig pattern, the other doesn't) is a genuine, checkable fact about hyperbolic derivatives, fully derived in `math.calc.hyperbolic-derivatives`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Defined From $e^x$ Alone, No Angle Involved (Primitive P11: Representation Shift)

State: "$\sinh$ and $\cosh$ come directly from the exponential function — there's no angle, no rotation, no circle anywhere in their DEFINITION. Any connection to geometry is something you'll have to derive, not something built in from the start." Work Example 1's direct computation at $x=0$, emphasizing the definitions used only $e^x$ and $e^{-x}$.

- **MC-1 hook**: ask "are $\sinh x$ and $\cosh x$ defined using some kind of 'hyperbolic angle,' measured geometrically the way radians are measured on a circle?" — a "yes" answer reveals MC-1 (assuming a geometric/angular origin for the definitions, rather than recognizing they are purely algebraic, defined directly from $e^x$).

### Teaching Action A02 — The Identity's Minus Sign Is Not Optional (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: expanding $\cosh^2x-\sinh^2x$ from the exponential definitions FORCES the minus sign to appear (the cross terms $\pm2$ do not cancel unless subtracted). State: "this isn't a stylistic choice — the algebra itself produces a minus sign here, which is exactly why these are called hyperbolic functions, tracing $x^2-y^2=1$, and not circular functions."

- **MC-2 hook**: ask "does the hyperbolic Pythagorean-style identity read $\cosh^2x+\sinh^2x=1$, matching the plus sign in $\cos^2\theta+\sin^2\theta=1$?" — a "yes" answer reveals MC-2 (assuming the same sign as ordinary trig, missing the minus sign that is the entire reason for the name "hyperbolic").

### Teaching Action A03 — Derivative Signs Don't Always Mirror Ordinary Trig (Primitive P06: Contrast Pair)

Contrast $\dfrac d{dx}[\sinh x]=\cosh x$ (matching $\sin\to\cos$'s sign pattern) against $\dfrac d{dx}[\cosh x]=\sinh x$ (NOT matching $\cos\to-\sin$'s sign flip). State: "one of these two derivative rules mirrors ordinary trig exactly; the other genuinely does not pick up a minus sign — assuming both always flip signs the same way as trig would be a mistake, as `math.calc.hyperbolic-derivatives` will show in full."

- **MC-3 hook**: ask "does $\dfrac d{dx}[\cosh x]=-\sinh x$, by direct analogy with $\dfrac d{dx}[\cos x]=-\sin x$?" — a "yes" answer reveals MC-3 (assuming hyperbolic derivatives always mirror trig sign flips, missing that $\cosh$'s derivative does not introduce a minus sign).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\sinh(1)$ and $\cosh(1)$ directly from the exponential definitions (leave in terms of $e$, or approximate numerically).
  2. Verify that $\tanh(0)=0$ directly from the definitions of $\sinh$ and $\cosh$ at $x=0$.
  3. Starting from the definitions, derive $\cosh^2x-\sinh^2x=1$ (reproduce Example 2's algebra) and state explicitly why this proves $(\cosh t,\sinh t)$ traces the hyperbola $x^2-y^2=1$.
  4. A student claims $\dfrac d{dx}[\cosh x]=-\sinh x$, reasoning by analogy with ordinary trig. Explain why this is incorrect, referencing this lesson's derivative-sign preview.
- **P76 (Transfer Probe, mode = independence)**: "An engineer studying the shape of a hanging cable (a catenary) encounters the function $y=\cosh(x/a)$ for a constant $a$. (a) Using the definition of $\cosh$, compute $y$ at $x=0$ and explain what this represents physically (the lowest point of the cable). (b) Verify that $y$ is an EVEN function ($y(x)=y(-x)$) directly from the definition, and explain what this predicts about the cable's shape. (c) A colleague suggests that since $\cos(x/a)$ also equals $1$ at $x=0$ and is also even, $\cosh(x/a)$ and $\cos(x/a)$ must behave similarly everywhere. Using this lesson's hyperbola-vs-circle distinction, explain why this assumption is wrong — specifically, what happens to each function as $x$ grows large in magnitude."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HYPERBOLIC-DEFINED-VIA-ANGLE | Believing $\sinh$/$\cosh$ are defined using some geometric "hyperbolic angle" measured like radians on a circle, missing that they are defined purely algebraically from $e^x$ | Foundational |
| MC-2 | HYPERBOLIC-IDENTITY-SIGN-COPIED-FROM-TRIG | Assuming the hyperbolic identity has the same plus sign as $\cos^2\theta+\sin^2\theta=1$, missing the characteristic minus sign in $\cosh^2x-\sinh^2x=1$ that gives these functions their name | High |
| MC-3 | HYPERBOLIC-DERIVATIVES-ASSUMED-TO-MIRROR-TRIG-SIGNS | Assuming hyperbolic derivative rules always introduce the same sign flips as ordinary trig derivatives, missing that $\dfrac d{dx}[\cosh x]=\sinh x$ does not pick up the minus sign that $\dfrac d{dx}[\cos x]=-\sin x$ has | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Hyperbolic Functions Assumed Angle-Based") → P41 (detect: ask whether $\sinh$/$\cosh$ are defined via a geometric angle measured on some curve) → P64 (conceptual shift: re-walk Example 1's direct exponential computation, re-anchoring on "no angle appears anywhere in the definitions — only $e^x$ and $e^{-x}$").
- **B02 (targets MC-2)**: P27 (name it: "Hyperbolic Identity Sign Copied from Trig") → P41 (detect: ask whether $\cosh^2x+\sinh^2x=1$) → P64 (conceptual shift: re-walk Example 2's algebra, re-anchoring on "the minus sign is forced by the algebra itself, and is exactly why these are called hyperbolic").
- **B03 (targets MC-3)**: P27 (name it: "Hyperbolic Derivative Signs Assumed to Mirror Trig") → P41 (detect: ask whether $\dfrac d{dx}[\cosh x]=-\sinh x$) → P64 (conceptual shift: re-walk Example 3's contrast, re-anchoring on "$\sinh$'s derivative mirrors trig's sign pattern, but $\cosh$'s derivative genuinely does not").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponential-function` ($e^x$, the sole building block of every definition in this concept) and `math.trig.trig-functions` (ordinary sine/cosine and the identity $\cos^2\theta+\sin^2\theta=1$, this concept's constant point of contrast).
- **Unlocks**: `math.calc.hyperbolic-derivatives` (will fully derive the derivative rules previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists `math.calc.hyperbolic-derivatives`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/understand tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the exponential definitions and the hyperbolic identity's derivation) and LO3 kept orientation-level, appropriately deferring full derivative derivation to this concept's own unlocked child.
- **Division of labor**: `math.alg.exponential-function` owns $e^x$ itself; `math.trig.trig-functions` owns ordinary sine/cosine and their Pythagorean identity. This concept owns the SPECIALIZATION of the exponential function into the hyperbolic family and the precise sign-based contrast with ordinary trig throughout — deliberately treating the trig analogy as a constant point of CONTRAST (what matches, what doesn't) rather than a loose intuition pump.
- Example 3's derivative preview was deliberately included, even though full derivation is deferred, because the asymmetric sign behavior ($\sinh$'s derivative matches trig's pattern, $\cosh$'s does not) is precisely the kind of detail a learner would otherwise over-generalize by analogy — naming it explicitly here, before the child concept derives it formally, pre-empts that exact error.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.hyperbolic-derivatives` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already fluent in exponentials/trig; hyperbolic functions introduced directly via exponential definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
