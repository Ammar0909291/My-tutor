# Teaching Blueprint: Trigonometric Substitution (`math.calc.trig-substitution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.trig-substitution` |
| name | Trigonometric Substitution |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.trig-integrals`, `math.trig.trig-identities` |
| unlocks | `math.calc.partial-fractions` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in Pythagorean-identity-driven integration strategy selection from `math.calc.trig-integrals`; the three radical-shape substitutions are introduced directly as a new but analogous case analysis |
| description (KG) | Substituting x = a sinθ, a tanθ, or a secθ to eliminate square roots of the forms a²−x², a²+x², x²−a² in integrands. |

## Component 1 — Learning Objectives

- LO1: For integrands containing $\sqrt{a^2-x^2}$, apply the substitution $x=a\sin\theta$ ($dx=a\cos\theta\,d\theta$), use $1-\sin^2\theta=\cos^2\theta$ so that $\sqrt{a^2-x^2}=a\cos\theta$, integrate in $\theta$, and correctly **back-substitute** into $x$ using a right-triangle reference diagram (opposite $=x$, hypotenuse $=a$, adjacent $=\sqrt{a^2-x^2}$).
- LO2: Distinguish and correctly select between $x=a\tan\theta$ for $\sqrt{a^2+x^2}$ (using $1+\tan^2\theta=\sec^2\theta$, so $\sqrt{a^2+x^2}=a\sec\theta$) and $x=a\sec\theta$ for $\sqrt{x^2-a^2}$ (using $\sec^2\theta-1=\tan^2\theta$, so $\sqrt{x^2-a^2}=a|\tan\theta|$) — recognizing which of the THREE radical shapes ($a^2-x^2$, $a^2+x^2$, $x^2-a^2$) is present BEFORE choosing among the three substitutions, since applying the wrong one to the wrong shape does not eliminate the square root.
- LO3 (orientation level, given this concept's own scope as strategy selection across three cases): recognize that for DEFINITE integrals, converting the integration BOUNDS directly into $\theta$-values (via $\theta=\arcsin(x/a)$, $\arctan(x/a)$, or a corresponding secant-branch value at each bound) avoids back-substituting the antiderivative into $x$ at all — a genuine shortcut whose full bound-conversion mechanics (including secant's branch subtleties) are deferred beyond this concept's core scope.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.trig-integrals` (the parity-driven strategy-selection PRINCIPLE — checking a structural feature of the integrand before choosing a technique, rather than always applying the same one) and `math.trig.trig-identities` (the three Pythagorean-family identities $\sin^2\theta+\cos^2\theta=1$, $1+\tan^2\theta=\sec^2\theta$, $\sec^2\theta-1=\tan^2\theta$, each of which eliminates one of the three radical shapes).

## Component 3 — Core Explanation

**Matching the radical's shape to the correct substitution is the whole strategy**: exactly one of the three Pythagorean-family identities eliminates each radical shape — $1-\sin^2\theta=\cos^2\theta$ turns $a^2-x^2$ (via $x=a\sin\theta$) into $a^2\cos^2\theta$, a perfect square; $1+\tan^2\theta=\sec^2\theta$ turns $a^2+x^2$ (via $x=a\tan\theta$) into $a^2\sec^2\theta$; and $\sec^2\theta-1=\tan^2\theta$ turns $x^2-a^2$ (via $x=a\sec\theta$) into $a^2\tan^2\theta$. This is the SAME parity/structure-driven strategy-selection principle already mastered in `math.calc.trig-integrals` (checking a structural feature before choosing a technique), now applied to selecting among three substitutions by the ALGEBRAIC SIGN pattern under the root rather than by an exponent's parity.

**The substitution is a package deal — $x$ and $dx$ both change**: just as ordinary $u$-substitution requires replacing BOTH the inner expression and the differential, trig substitution requires substituting $dx$ (e.g. $dx=a\cos\theta\,d\theta$ for $x=a\sin\theta$) at the same time as $x$ itself — leaving $dx$ unconverted breaks the integral's internal consistency just as surely as forgetting $du$ would in ordinary substitution.

**Back-substitution via a right triangle, and the definite-integral shortcut that skips it**: after integrating in $\theta$, an INDEFINITE integral's answer must be converted back into $x$ — done by building a right triangle encoding the substitution (e.g. for $x=a\sin\theta$: opposite $=x$, hypotenuse $=a$, adjacent $=\sqrt{a^2-x^2}$) and reading off whichever trig ratio of $\theta$ appears in the antiderivative. For a DEFINITE integral, however, converting the BOUNDS themselves into $\theta$-values at the outset (solving $\theta=\arcsin(x/a)$, etc., at each bound) lets the entire evaluation happen in $\theta$, skipping the triangle-based back-substitution altogether — a genuine shortcut, but one that only works because bounds exist to convert; it does not extend to indefinite integrals.

## Component 4 — Worked Examples

**Example 1 (LO1 — full sine substitution with triangle back-substitution, breaking MC-2)**: $\int\dfrac{dx}{x^2\sqrt{4-x^2}}$. The radical is $\sqrt{a^2-x^2}$ with $a=2$: let $x=2\sin\theta$, $dx=2\cos\theta\,d\theta$, so $\sqrt{4-x^2}=2\cos\theta$. Substituting BOTH $x$ and $dx$: $\displaystyle\int\frac{2\cos\theta\,d\theta}{4\sin^2\theta\cdot2\cos\theta}=\int\frac{d\theta}{4\sin^2\theta}=\frac14\int\csc^2\theta\,d\theta=-\frac14\cot\theta+C$. Back-substituting via the triangle (opposite $=x$, hypotenuse $=2$, adjacent $=\sqrt{4-x^2}$): $\cot\theta=\dfrac{\cos\theta}{\sin\theta}=\dfrac{\sqrt{4-x^2}/2}{x/2}=\dfrac{\sqrt{4-x^2}}{x}$, giving the final answer $-\dfrac{\sqrt{4-x^2}}{4x}+C$.

**Example 2 (LO2 — matching radical shape to substitution, a paired contrast, breaking MC-1)**: (a) $\int\dfrac{dx}{\sqrt{x^2+4}}$: shape $a^2+x^2$ with $a=2$, so $x=2\tan\theta$, $dx=2\sec^2\theta\,d\theta$, $\sqrt{x^2+4}=2\sec\theta$ (via $1+\tan^2\theta=\sec^2\theta$). The integral becomes $\int\dfrac{2\sec^2\theta\,d\theta}{2\sec\theta}=\int\sec\theta\,d\theta=\ln|\sec\theta+\tan\theta|+C$; the triangle (opposite $=x$, adjacent $=2$, hypotenuse $=\sqrt{x^2+4}$) gives $\sec\theta=\sqrt{x^2+4}/2$, $\tan\theta=x/2$, so the answer is $\ln\left|\dfrac{\sqrt{x^2+4}+x}{2}\right|+C$. (b) $\int\dfrac{dx}{\sqrt{x^2-4}}$: shape $x^2-a^2$ with $a=2$, so $x=2\sec\theta$, $dx=2\sec\theta\tan\theta\,d\theta$, $\sqrt{x^2-4}=2\tan\theta$ (via $\sec^2\theta-1=\tan^2\theta$). The integral becomes $\int\dfrac{2\sec\theta\tan\theta\,d\theta}{2\tan\theta}=\int\sec\theta\,d\theta=\ln|\sec\theta+\tan\theta|+C$; the triangle (hypotenuse $=x$, adjacent $=2$, opposite $=\sqrt{x^2-4}$) gives $\sec\theta=x/2$, $\tan\theta=\sqrt{x^2-4}/2$, so the answer is $\ln\left|\dfrac{x+\sqrt{x^2-4}}{2}\right|+C$. Both integrals LOOK superficially similar (a square root of $x^2\pm4$), yet require genuinely different substitutions and different triangles, chosen by the SIGN under the root. Attempting $x=2\sin\theta$ on part (b)'s $\sqrt{x^2-4}$ would give $\sqrt{4\sin^2\theta-4}=\sqrt{-4\cos^2\theta}$ — a negative quantity under a root, proving the wrong choice does not merely produce extra work, it literally breaks.

**Example 3 (LO3, orientation level — definite integral bound-conversion shortcut)**: $\int_0^{\sqrt3}\dfrac{dx}{\sqrt{4-x^2}}$. Using $x=2\sin\theta$: at $x=0$, $\sin\theta=0\Rightarrow\theta=0$; at $x=\sqrt3$, $\sin\theta=\sqrt3/2\Rightarrow\theta=\pi/3$. The integral becomes $\int_0^{\pi/3}d\theta=\pi/3$ — evaluated ENTIRELY in $\theta$, with the antiderivative never converted back into $x$ at all. Contrast: converting the antiderivative to $\arcsin(x/2)$ first and evaluating $\arcsin(\sqrt3/2)-\arcsin(0)=\pi/3-0=\pi/3$ gives the identical answer, but only by performing the back-substitution the bound-conversion route skipped.

## Component 5 — Teaching Actions

### Teaching Action A01 — Match the Radical's Shape to Its One Correct Substitution (Primitive P11: Representation Shift)

State: "before touching any identity, look at what's UNDER the square root — $a^2-x^2$, $a^2+x^2$, or $x^2-a^2$ — because each shape has exactly one Pythagorean identity that turns it into a perfect square, and the other two substitutions will not work." Work Example 2's paired contrast, including the explicit failure of applying $x=2\sin\theta$ to $\sqrt{x^2-4}$.

- **MC-1 hook**: ask "can $\sqrt{x^2-9}$ and $\sqrt{9-x^2}$ both be handled with the substitution $x=3\sin\theta$?" — a "yes" answer reveals MC-1 (believing one substitution handles any square root of a quadratic, regardless of the sign pattern under the root).

### Teaching Action A02 — The Differential Must Be Substituted Too, Not Just the Variable (Primitive P28: Conflict Evidence)

Present Example 1's full computation, pointing out explicitly that $dx=2\cos\theta\,d\theta$ was substituted alongside $x=2\sin\theta$ — leaving $dx$ unconverted would strand a bare $dx$ in an integral now written entirely in $\theta$, an inconsistency exactly analogous to forgetting $du$ in ordinary $u$-substitution. State: "the variable and its differential change TOGETHER, as one package — never substitute one without the other."

- **MC-2 hook**: ask "when substituting $x=2\sin\theta$ into $\int dx/(x^2\sqrt{4-x^2})$, is it acceptable to replace $x$ but leave $dx$ as $dx$?" — a "yes" answer reveals MC-2 (forgetting that $dx$ itself must be converted to $2\cos\theta\,d\theta$).

### Teaching Action A03 — Back-Substitution Is Not Optional for Indefinite Integrals (Primitive P06: Contrast Pair)

Contrast Example 3's definite-integral bound-conversion shortcut (which legitimately skips back-substitution, because the BOUNDS were converted to $\theta$-values first) against Example 1/2's indefinite integrals, where there are no bounds to convert and the triangle-based back-substitution into $x$ is mandatory. State: "the bound-conversion shortcut only works because there ARE bounds to convert — for an indefinite integral, the final answer must be expressed in terms of $x$, and the triangle is how you get there."

- **MC-3 hook**: ask "since Example 3 evaluated its definite integral entirely in $\theta$ without ever converting back to $x$, can the same shortcut be used to skip back-substitution on an INDEFINITE integral like Example 1?" — a "yes" answer reveals MC-3 (overgeneralizing the bound-conversion shortcut to integrals with no bounds to convert).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $\int\dfrac{dx}{\sqrt{16-x^2}}$: identify the radical shape, apply the correct substitution fully, and back-substitute to express the answer in terms of $x$.
  2. $\int\dfrac{dx}{\sqrt{x^2+25}}$: identify the substitution, integrate to the $\ln|\sec\theta+\tan\theta|$ form, and back-substitute via a triangle to express the final answer in terms of $x$.
  3. Explain why applying $x=3\sin\theta$ to the integrand $1/\sqrt{x^2-9}$ would fail, referencing what happens under the square root.
  4. Set up (identify the shape, state the substitution, and write the fully-substituted integrand in $\theta$ — full evaluation not required) for $\int x^3\sqrt{x^2-4}\,dx$.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs $\int dx/\sqrt{x^2+9}$ for a cable-tension calculation. (a) Identify which of the three radical shapes applies here and state the correct substitution, including how $dx$ converts. (b) Carry out the substitution fully to obtain the integral written entirely in $\theta$. (c) Using a right-triangle diagram, explain how you would convert your $\theta$-answer back into $x$, without completing the final logarithm simplification. (d) If this had instead been a DEFINITE integral from $x=0$ to $x=3$, explain what shortcut would let you avoid the triangle step entirely."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-SUBSTITUTION-FOR-ANY-RADICAL | Believing any square root of a quadratic can be handled with the same substitution (typically always trying $x=a\sin\theta$), missing that the sign pattern under the root ($a^2-x^2$ vs. $a^2+x^2$ vs. $x^2-a^2$) determines which of the three substitutions is required | Foundational |
| MC-2 | DIFFERENTIAL-LEFT-UNSUBSTITUTED | Substituting $x$ in terms of $\theta$ but leaving $dx$ unconverted, breaking the integral's internal consistency — the same "substitution is a package deal" error as forgetting $du$ in ordinary $u$-substitution | High |
| MC-3 | BOUND-SHORTCUT-OVERGENERALIZED-TO-INDEFINITE | Overgeneralizing the definite-integral bound-conversion shortcut (which skips back-substitution only because bounds were converted first) to indefinite integrals, where there are no bounds and back-substitution into $x$ is mandatory | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Single-Substitution Assumption") → P41 (detect: give a mixed pair like Example 2's $\sqrt{x^2+4}$ and $\sqrt{x^2-4}$ and check whether the student proposes the same substitution for both) → P64 (conceptual shift: re-walk Example 2's explicit failure of $x=2\sin\theta$ on $\sqrt{x^2-4}$, producing a negative quantity under the root).
- **B02 (targets MC-2)**: P27 (name it: "Differential Left Unconverted") → P41 (detect: ask a student to substitute $x=2\sin\theta$ into an integral and check whether $dx$ is rewritten as $2\cos\theta\,d\theta$ or left as bare $dx$) → P64 (conceptual shift: re-anchor on "$x$ and $dx$ change together, exactly like $u$ and $du$ in ordinary substitution — never one without the other").
- **B03 (targets MC-3)**: P27 (name it: "Bound-Shortcut Overgeneralized") → P41 (detect: give an indefinite integral after teaching Example 3's shortcut and ask whether back-substitution can be skipped) → P64 (conceptual shift: re-walk why Example 3's shortcut depended on having bounds to convert in the first place, and that Example 1/2's indefinite integrals have no such bounds).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.trig-integrals` (the parity/structure-driven strategy-selection PRINCIPLE this concept directly extends to a three-way radical-shape selection) and `math.trig.trig-identities` (the three Pythagorean-family identities, each eliminating one radical shape).
- **Unlocks**: `math.calc.partial-fractions` (a further integration-technique-selection concept; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (covering all three substitution cases across Examples 1–2) and LO3 kept orientation-level, since the full mechanics of definite-integral bound conversion (including secant's branch subtleties) are a refinement beyond this concept's core strategy-selection scope.
- **Division of labor**: `math.calc.trig-integrals` owns the parity-driven strategy-selection PRINCIPLE (checking a structural feature before choosing a technique) for products of trig functions; this concept, `math.calc.trig-substitution`, owns the analogous but distinct three-way selection driven by the ALGEBRAIC SHAPE of a radical, deliberately reusing the parent's "check structure before acting" framing rather than re-deriving it from scratch.
- Example 2's deliberate pairing of $\sqrt{x^2+4}$ and $\sqrt{x^2-4}$ — two integrals that look nearly identical and both integrate to the same $\ln|\sec\theta+\tan\theta|$ form — was chosen specifically to make MC-1 concrete: the surface similarity of the two problems is exactly what makes the wrong-substitution error tempting, and the explicit failure computation (a negative quantity under a root) is the sharpest available evidence against it.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already fluent in strategy-selection from trig-integrals; three-way substitution introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
