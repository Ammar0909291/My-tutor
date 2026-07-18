# Teaching Blueprint: Trigonometric Identities (`math.trig.trig-identities`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.trig-identities` |
| name | Trigonometric Identities |
| domain | Trigonometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 15 |
| requires | `math.trig.trig-functions` |
| unlocks | `math.trig.trig-equations` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — the unit circle before the identity formulas |
| description (KG) | Equations involving trig functions that hold for all valid angles; used to simplify expressions and solve equations.| 

## Component 1 — Learning Objectives

- LO1: State and apply the **Pythagorean identity** $\sin^2\theta+\cos^2\theta=1$ (and its two derived forms, $1+\tan^2\theta=\sec^2\theta$ and $1+\cot^2\theta=\csc^2\theta$) to simplify expressions and to find one trig value given another.
- LO2: State and apply the **angle-sum and angle-difference formulas** ($\sin(A\pm B)$, $\cos(A\pm B)$) to compute exact trig values for angles not on the standard unit-circle list, by decomposing them into sums/differences of known angles.
- LO3: Apply the **double-angle formulas** (derived directly from the angle-sum formulas with $A=B$) and correctly select an identity strategically to simplify a given expression, recognizing that a single expression can often be simplified via more than one valid identity path.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.trig-functions` (sin, cos, tan defined via the unit circle, periodicity, standard angle values).

## Component 3 — Core Explanation

**The Pythagorean identity**: from the unit circle, any point is $(\cos\theta,\sin\theta)$ at distance 1 from the origin, so $\cos^2\theta+\sin^2\theta=1$ — a direct restatement of the Pythagorean theorem applied to the unit circle. Dividing through by $\cos^2\theta$ gives $1+\tan^2\theta=\sec^2\theta$; dividing by $\sin^2\theta$ gives $\cot^2\theta+1=\csc^2\theta$.

**Angle-sum and angle-difference formulas**:
$$\sin(A+B) = \sin A\cos B + \cos A\sin B, \qquad \sin(A-B) = \sin A\cos B - \cos A\sin B$$
$$\cos(A+B) = \cos A\cos B - \sin A\sin B, \qquad \cos(A-B) = \cos A\cos B + \sin A\sin B$$
These let you find exact values for angles like $75°=45°+30°$ by decomposing into known angles, without needing a calculator or a new memorized value.

**Double-angle formulas**, derived by setting $B=A$ in the sum formulas:
$$\sin(2A) = 2\sin A\cos A, \qquad \cos(2A) = \cos^2A-\sin^2A = 2\cos^2A-1 = 1-2\sin^2A$$
(the three equivalent forms of $\cos(2A)$ come from substituting the Pythagorean identity to eliminate either $\sin^2A$ or $\cos^2A$ — useful for different simplification goals).

**Strategic identity selection**: a given trig expression often admits multiple valid simplification paths using different identities — there is rarely only one "correct" first move. The goal is not to memorize a single fixed procedure per expression type, but to recognize which identity's structure matches what's actually present (e.g., seeing $\sin^2x$ and $\cos^2x$ both present suggests the Pythagorean identity; seeing $\sin(x+y)$ suggests the angle-sum formula).

## Component 4 — Worked Examples

**Example 1 (LO1 — Pythagorean identity, finding a missing value)**: Given $\sin\theta=\frac{3}{5}$ with $\theta$ in Quadrant II (so $\cos\theta<0$), find $\cos\theta$. From $\sin^2\theta+\cos^2\theta=1$: $\cos^2\theta = 1-\frac{9}{25}=\frac{16}{25}$, so $\cos\theta=\pm\frac{4}{5}$ — selecting the negative root since Quadrant II has negative cosine: $\cos\theta=-\frac{4}{5}$.

**Example 2 (LO2 — angle-sum formula, exact value)**: Find $\cos(75°)$ using $75°=45°+30°$. $\cos(45°+30°) = \cos45°\cos30°-\sin45°\sin30° = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} - \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6}{4}-\frac{\sqrt2}{4} = \frac{\sqrt6-\sqrt2}{4}$.

**Example 3 (LO3 — double-angle formula, and multiple valid simplification paths, breaking MC-1)**: Simplify $\frac{\sin(2x)}{1+\cos(2x)}$. Using $\sin(2x)=2\sin x\cos x$ and $\cos(2x)=2\cos^2x-1$ (one of the three double-angle-cosine forms — chosen deliberately here since it makes the "+1" cancel cleanly): $\frac{2\sin x\cos x}{1+(2\cos^2x-1)} = \frac{2\sin x\cos x}{2\cos^2x} = \frac{\sin x}{\cos x}=\tan x$. Note: choosing a DIFFERENT valid form of $\cos(2x)$ (e.g. $1-2\sin^2x$) would have led to a messier intermediate expression requiring extra steps to reach the same final answer $\tan x$ — both paths are mathematically valid, but this choice was strategically more efficient.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Pythagorean Identity and Angle-Sum Formulas, via the Unit Circle (Primitive P11: Representation Shift)

Start pictorial: draw the unit circle, marking a point $(\cos\theta,\sin\theta)$ and its distance-1 relationship to the origin. State: "the Pythagorean theorem, applied right here, IS the Pythagorean identity — nothing new to memorize, just the circle's own defining equation." Work Example 1.

Shift representation to the angle-sum formulas: state them directly (their full derivation via rotation matrices or geometric construction is deferred as beyond this concept's scope, consistent with an apply-level treatment), then work Example 2's decomposition of $75°$ into known angles.

- **MC-1 hook**: present Example 3's simplification target and ask "is there only ONE correct first identity to apply here?" — an answer of "yes" reveals MC-1 (believing each simplification problem has exactly one valid identity path, rather than recognizing multiple valid strategies commonly exist).

### Teaching Action A02 — Double-Angle Formulas and Strategic Path Selection (Primitive P06: Contrast Pair)

**Contrast 1**: Derive all three equivalent forms of $\cos(2A)$ from the angle-sum formula with $B=A$ plus Pythagorean substitution, showing explicitly how each form arises from a different choice of which term to eliminate.

**Contrast 2 (targets MC-1)**: Work Example 3's simplification using the "efficient" choice of $\cos(2x)=2\cos^2x-1$, THEN redo it using $\cos(2x)=1-2\sin^2x$ instead — showing both reach the same final answer $\tan x$, but via a messier intermediate path for the second choice. State the lesson: "there's no single 'right' first move for many of these problems — the skill is recognizing which equivalent FORM of an identity will simplify most cleanly given what's already in the expression, and being willing to try a different form if your first choice gets messy."

### Teaching Action A03 — Composite Multi-Identity Simplification (Primitive P28: Conflict Evidence)

Present: "Simplify $\frac{1-\cos(2x)}{\sin(2x)} \cdot \frac{\cos x}{\sin x}$." This requires combining the double-angle formulas ($1-\cos(2x)=2\sin^2x$, $\sin(2x)=2\sin x\cos x$) with basic algebraic simplification and the definition of $\tan$/$\cot$ in sequence: $\frac{2\sin^2x}{2\sin x\cos x}\cdot\frac{\cos x}{\sin x} = \frac{\sin x}{\cos x}\cdot\frac{\cos x}{\sin x} = 1$. This forces sequential correct application of TWO different double-angle substitutions plus algebraic cancellation, preventing single-identity pattern-matching from being sufficient.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given $\cos\theta=-\frac{5}{13}$ with $\theta$ in Quadrant III, find $\sin\theta$ and $\tan\theta$.
  2. Find the exact value of $\sin(15°)$ using $15°=45°-30°$.
  3. Simplify $\cos(2x)+2\sin^2x$ using a double-angle identity.
  4. Simplify $\frac{\sin x + \sin x\cos(2x)}{\cos x}$ (hint: multiple valid identity paths exist — try more than one if your first attempt gets messy).
- **P76 (Transfer Probe, mode = independence)**: "An AC electrical circuit's instantaneous power is modeled by $P(t) = V_0I_0\sin(\omega t)\sin(\omega t+\phi)$ for a phase difference $\phi$ between voltage and current. (a) Using the angle-sum formula, expand $\sin(\omega t+\phi)$ in terms of $\sin(\omega t)$ and $\cos(\omega t)$. (b) Substitute this back into $P(t)$ and use a Pythagorean or double-angle identity to simplify the resulting expression into a form separating a constant (time-averaged) term from an oscillating term — this is exactly how real AC power analysis separates 'real power' from 'oscillating power.' (c) Note that your simplification path is not unique — briefly describe an alternative identity substitution that could have been used at one step, connecting to this lesson's point about multiple valid simplification routes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-IDENTITY-PATH-ASSUMED | Believing each simplification problem has exactly one valid "correct" identity to apply first, rather than recognizing multiple equally-valid strategies commonly exist | Foundational |
| MC-2 | SIGN-DROPPED-WHEN-TAKING-SQUARE-ROOT | When solving $\cos^2\theta$ (or similar) via the Pythagorean identity, taking only the positive square root without checking the correct sign from the angle's quadrant | Foundational |
| MC-3 | ANGLE-SUM-FORMULA-DISTRIBUTED-LIKE-LINEAR-FUNCTION | Incorrectly believing $\sin(A+B)=\sin A+\sin B$ (treating sin as if it distributed over addition like a linear function), rather than using the correct angle-sum formula | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Single-Path Assumption") → P41 (detect: present a simplification problem and ask if there's only one correct first identity to try) → P64 (conceptual shift: work through Example 3's two-path comparison, showing both valid routes reach the same answer).
- **B02 (targets MC-2)**: P27 (name it: "Sign Dropped in Square Root") → P41 (detect: give a quadrant-specified problem like Example 1 and check whether both signs are considered before selecting the correct one via the quadrant) → P64 (conceptual shift: re-anchor on "square roots always give ± unless you have quadrant information to select — check the quadrant EVERY time before finalizing the sign").
- **B03 (targets MC-3)**: P27 (name it: "Sin-Distributes-Like-Linear-Function Error") → P41 (detect: ask a student to evaluate $\sin(30°+30°)$ two ways — via the sum formula, and via the (incorrect) $\sin30°+\sin30°$ — and compare to the true value $\sin(60°)$) → P64 (conceptual shift: show numerically that $\sin(60°)=\frac{\sqrt3}{2}\approx0.866$ while $\sin30°+\sin30°=1$ — these disagree, proving sin does not distribute over addition, and the angle-sum formula is genuinely necessary, not just a formality).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.trig-functions` (sin/cos/tan definitions and standard angle values, the base vocabulary every identity here operates on).
- **Unlocks**: `math.trig.trig-equations` (solving trigonometric equations routinely requires simplifying via these identities first).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 15 with a proficient/apply tag is among the corpus's largest hour-estimates, reflecting genuinely broad content (Pythagorean identity plus its two derived forms, four angle-sum/difference formulas, three equivalent double-angle-cosine forms, plus strategic multi-identity application) — the "3 main TAs + gate" structure (A01: Pythagorean + angle-sum; A02: double-angle + path-selection contrast; A03: a genuinely composite multi-identity item) was deliberately kept to three despite the hour count, since the underlying skill (recognize which identity's structure matches the expression, substitute, simplify) is conceptually unified even though it spans many named formulas.
- MC-3 (sin distributes like a linear function) was included at Foundational severity specifically because it represents an extremely common early error rooted in over-applying linearity intuitions from algebra to a genuinely nonlinear function — the numeric disproof in B03 (showing $\sin(60°)\neq\sin30°+\sin30°$) was chosen as the repair mechanism precisely because it makes the error's wrongness immediately checkable, not just asserted.
- The AC circuit transfer probe was chosen because the real-power/oscillating-power decomposition is a genuine, standard application of exactly the angle-sum-then-Pythagorean-or-double-angle simplification chain this concept teaches, and explicitly invites the learner to name an alternative valid path (reinforcing MC-1's correction) rather than presenting a single fixed procedure.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.trig.trig-functions`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: unit circle before identity formulas) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
