# Teaching Blueprint: De Moivre's Theorem (`math.trig.de-moivres-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.de-moivres-theorem` |
| name | De Moivre's Theorem |
| domain | Trigonometry |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.trig.polar-form-complex` |
| unlocks | `math.cx.complex-numbers-analysis` |
| cross_links | `math.cx.complex-numbers-analysis` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | P (Pictorial) — repeated rotation on the complex plane before the formula |
| description (KG) | (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ); enables computation of powers and n-th roots of complex numbers and derivation of multiple-angle formulas. |

## Component 1 — Learning Objectives

- LO1: State **De Moivre's Theorem** — $(\cos\theta+i\sin\theta)^n = \cos(n\theta)+i\sin(n\theta)$ — and use it to compute the $n$-th power of a complex number given in polar form, including correctly handling the modulus (which raises to the $n$-th power separately: $[r(\cos\theta+i\sin\theta)]^n = r^n(\cos(n\theta)+i\sin(n\theta))$).
- LO2: Use De Moivre's Theorem to find **all $n$ complex $n$-th roots** of a complex number, via the formula $z^{1/n} = r^{1/n}\left[\cos\left(\frac{\theta+2\pi k}{n}\right)+i\sin\left(\frac{\theta+2\pi k}{n}\right)\right]$ for $k=0,1,\ldots,n-1$, correctly recognizing that all $n$ values are genuinely distinct roots, not $n$ redundant descriptions of one root.
- LO3: Derive a multiple-angle trigonometric formula (e.g. $\cos(3\theta)$ or $\sin(3\theta)$ in terms of $\sin\theta,\cos\theta$) by expanding $(\cos\theta+i\sin\theta)^n$ via the binomial theorem and comparing real/imaginary parts to De Moivre's own closed form.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.polar-form-complex` (writing $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$, and that complex multiplication corresponds to multiplying moduli and adding arguments).

## Component 3 — Core Explanation

**De Moivre's Theorem**: for any real $\theta$ and integer $n$,
$$(\cos\theta+i\sin\theta)^n = \cos(n\theta)+i\sin(n\theta)$$
This follows directly from the polar-form multiplication rule already known: multiplying complex numbers in polar form multiplies moduli and adds arguments, so multiplying $(\cos\theta+i\sin\theta)$ by itself $n$ times adds the argument $\theta$ to itself $n$ times, giving $n\theta$ (while the modulus, being 1 each time, stays 1). For a general $z=r(\cos\theta+i\sin\theta)$: $z^n = r^n(\cos(n\theta)+i\sin(n\theta))$ — the modulus raises to the $n$-th power separately.

**Finding $n$-th roots**: to solve $w^n=z$ for $w$, write $z=r(\cos\theta+i\sin\theta)$, and seek $w=s(\cos\phi+i\sin\phi)$ with $w^n=z$. By De Moivre, $w^n = s^n(\cos(n\phi)+i\sin(n\phi))$, so we need $s^n=r$ (giving $s=r^{1/n}$, the real $n$-th root of $r$) and $n\phi = \theta+2\pi k$ for some integer $k$ (since angles are only determined up to full-circle multiples of $2\pi$), giving $\phi = \frac{\theta+2\pi k}{n}$. Taking $k=0,1,\ldots,n-1$ produces exactly $n$ **genuinely distinct** roots (values of $k$ outside this range just repeat one of these $n$ angles modulo $2\pi$, giving the same roots again) — every nonzero complex number has EXACTLY $n$ distinct $n$-th roots, evenly spaced around a circle of radius $r^{1/n}$.

**Deriving multiple-angle formulas**: expanding $(\cos\theta+i\sin\theta)^n$ via the binomial theorem produces a sum of terms involving powers of $\cos\theta$ and $i\sin\theta$; separating this expansion into its real part and imaginary part, and comparing against De Moivre's closed form $\cos(n\theta)+i\sin(n\theta)$ (whose real part is $\cos(n\theta)$ and imaginary part is $\sin(n\theta)$), gives explicit polynomial formulas for $\cos(n\theta)$ and $\sin(n\theta)$ in terms of $\cos\theta,\sin\theta$ alone.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing a power)**: Compute $\left[2\left(\cos\frac{\pi}{6}+i\sin\frac{\pi}{6}\right)\right]^4$. Modulus: $2^4=16$. Angle: $4\cdot\frac{\pi}{6}=\frac{2\pi}{3}$. Result: $16\left(\cos\frac{2\pi}{3}+i\sin\frac{2\pi}{3}\right) = 16\left(-\frac12+i\frac{\sqrt3}{2}\right) = -8+8i\sqrt3$.

**Example 2 (LO2 — all n-th roots, breaking MC-1)**: Find all cube roots of $z=8$ (viewed as $8(\cos0+i\sin0)$). $s=8^{1/3}=2$. $\phi_k = \frac{0+2\pi k}{3}$ for $k=0,1,2$: $\phi_0=0$, $\phi_1=\frac{2\pi}{3}$, $\phi_2=\frac{4\pi}{3}$. The three roots: $w_0=2(\cos0+i\sin0)=2$, $w_1=2\left(\cos\frac{2\pi}{3}+i\sin\frac{2\pi}{3}\right)=2\left(-\frac12+i\frac{\sqrt3}{2}\right)=-1+i\sqrt3$, $w_2=2\left(\cos\frac{4\pi}{3}+i\sin\frac{4\pi}{3}\right)=-1-i\sqrt3$. All three are genuinely DIFFERENT complex numbers (only $w_0=2$ is real), yet all satisfy $w^3=8$ — confirming 3 distinct cube roots exist, not just the one obvious real root.

**Example 3 (LO3 — deriving a multiple-angle formula)**: Expand $(\cos\theta+i\sin\theta)^3$ via the binomial theorem: $\cos^3\theta + 3\cos^2\theta(i\sin\theta) + 3\cos\theta(i\sin\theta)^2 + (i\sin\theta)^3 = \cos^3\theta+3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta$. Separating real and imaginary parts: real part $=\cos^3\theta-3\cos\theta\sin^2\theta$, imaginary part $=3\cos^2\theta\sin\theta-\sin^3\theta$. By De Moivre, these must equal $\cos(3\theta)$ and $\sin(3\theta)$ respectively: $\cos(3\theta)=\cos^3\theta-3\cos\theta\sin^2\theta$ and $\sin(3\theta)=3\cos^2\theta\sin\theta-\sin^3\theta$ — genuine triple-angle formulas derived purely algebraically, without any separate geometric argument.

## Component 5 — Teaching Actions

### Teaching Action A01 — De Moivre's Theorem via Repeated Rotation (Primitive P11: Representation Shift)

Recall from `math.trig.polar-form-complex` that multiplying two complex numbers in polar form multiplies moduli and ADDS arguments — geometrically, multiplication by $(\cos\theta+i\sin\theta)$ is a pure rotation by $\theta$ (modulus 1). State: "raising to the $n$-th power is just multiplying by itself $n$ times — so the argument gets added to itself $n$ times, becoming $n\theta$." Work Example 1, explicitly separating the modulus computation ($r^n$) from the angle computation ($n\theta$).

- **MC-1 hook**: after finding the cube roots of 8 (Example 2's real root $w_0=2$), ask "is 2 the ONLY cube root of 8?" — an answer of "yes" reveals MC-1 (assuming a complex number's $n$-th roots are limited to whatever obvious real root exists, missing the additional non-real roots that always accompany it).

### Teaching Action A02 — All n Distinct Roots, and Deriving Multiple-Angle Formulas (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's full three-root computation, plotting all three on the complex plane — showing they are evenly spaced (120° apart) around a circle of radius 2. State the rule: "every nonzero complex number has EXACTLY $n$ distinct $n$-th roots, always evenly spaced around a circle — never just one, even when one of them happens to be a familiar real number."

**Contrast 2**: Work Example 3's triple-angle derivation via binomial expansion plus real/imaginary-part comparison, contrasting this ALGEBRAIC derivation method with the geometric/inductive approach one might otherwise use to derive multiple-angle formulas — showing De Moivre's Theorem provides a completely mechanical, general-purpose route to ANY multiple-angle formula (not just double or triple angle) via the same binomial-expansion-then-compare procedure.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\left[3\left(\cos\frac{\pi}{4}+i\sin\frac{\pi}{4}\right)\right]^3$, giving the answer in $a+bi$ form.
  2. Find all fourth roots of $z=16$ (viewed in polar form), giving each in $a+bi$ form.
  3. Find all cube roots of $z=-8i$ (first convert to polar form, then apply the root formula).
  4. Using the binomial expansion of $(\cos\theta+i\sin\theta)^2$ and comparing real/imaginary parts, derive the double-angle formulas for $\cos(2\theta)$ and $\sin(2\theta)$, and verify they match the standard double-angle formulas.
- **P76 (Transfer Probe, mode = cross-link probe against `math.cx.complex-numbers-analysis`)**: "Recall from your `math.cx.complex-numbers-analysis` lesson that for $z=x+iy$, the modulus is $|z|=\sqrt{x^2+y^2}$ and the argument $\theta=\arg(z)$, with polar form $z=re^{i\theta}$. Using THIS lesson's De Moivre machinery: (a) find all FIVE fifth roots of $z=32i$ — first write $32i$ in polar form using that lesson's modulus/argument conventions, then apply the root formula, giving each root in both polar form and (where the angle is a standard one) exact $a+bi$ form. (b) Confirm, for at least one of your five roots $w$, that $|w|$ matches the value you'd predict from that lesson's own modulus formula applied directly to your computed $a+bi$ form — connecting the root-finding procedure back to that lesson's foundational modulus/argument definitions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONLY-OBVIOUS-ROOT-FOUND | Believing a complex number's $n$-th roots are limited to whatever "obvious" real root exists, missing the additional $n-1$ non-real roots that always accompany it | Foundational |
| MC-2 | MODULUS-NOT-RAISED-TO-POWER-SEPARATELY | When applying De Moivre's Theorem to $z=r(\cos\theta+i\sin\theta)$ with $r\neq1$, forgetting to raise the modulus $r$ to the $n$-th power, applying the angle formula alone as if $r$ stayed fixed | Moderate |
| MC-3 | ROOT-ANGLE-INCREMENT-MISCOMPUTED | Using $\frac{\theta}{n}+2\pi k$ (adding the full $2\pi k$ AFTER dividing by $n$) instead of the correct $\frac{\theta+2\pi k}{n}$ (dividing the ENTIRE numerator, including $2\pi k$, by $n$) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Only-Obvious-Root Assumption") → P41 (detect: ask for ALL cube roots of 8, checking whether only $w=2$ is given) → P64 (conceptual shift: re-derive via the full root formula, explicitly generating $k=0,1,2$ and confirming all three distinct results satisfy $w^3=8$ by direct verification).
- **B02 (targets MC-2)**: P27 (name it: "Modulus Not Raised to Power") → P41 (detect: give $[3(\cos\theta+i\sin\theta)]^4$ and check whether the answer's modulus is $3$ or the correctly-computed $3^4=81$) → P64 (conceptual shift: re-anchor on "De Moivre's basic statement is for modulus EXACTLY 1 — for any other modulus $r$, it raises to the $n$-th power exactly like ordinary exponentiation, entirely separately from the angle computation").
- **B03 (targets MC-3)**: P27 (name it: "Root-Angle Increment Error") → P41 (detect: give a specific $\theta$ and $n$, and check whether the student computes $\phi_k=\frac{\theta}{n}+2\pi k$ instead of $\phi_k=\frac{\theta+2\pi k}{n}$) → P64 (conceptual shift: re-derive from the defining equation $n\phi=\theta+2\pi k$ — dividing BOTH sides by $n$ gives $\phi=\frac{\theta+2\pi k}{n}$, with the entire right side divided, not just the $\theta$ term).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.polar-form-complex` (the polar form $z=r(\cos\theta+i\sin\theta)$ and the modulus-multiplies/argument-adds multiplication rule this entire theorem is built from).
- **Unlocks**: `math.cx.complex-numbers-analysis` (the analytic treatment of complex numbers — modulus, argument, conjugation — that this concept's root-finding and power computations feed directly into).
- **Cross-link**: KG lists `math.cx.complex-numbers-analysis` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.cx.complex-numbers-analysis.md` **is already authored** (confirmed by reading its content: it covers $|z|=\sqrt{x^2+y^2}$, argument, polar form $z=re^{i\theta}$, and conjugation). The P76 transfer probe above directly reuses that blueprint's own modulus/argument notation and conventions to find all fifth roots of a specific complex number, and explicitly cross-checks the root-finding result against that concept's modulus formula — the fifth instance in this corpus (after `math.graph.graph`, `math.meas.sigma-algebra`, `math.meas.measure`, `math.real.differentiability-rigorous`) of a genuine, content-verified cross-link probe.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (De Moivre's Theorem via repeated rotation, applied to powers) and A02 (all-$n$-distinct-roots contrast plus the multiple-angle-derivation technique) jointly cover all three LOs, appropriate given the concept's core content is one theorem applied in two directions (powers forward, roots backward) plus one further algebraic technique (multiple-angle derivation) building on the same formula.
- MC-1 (only-obvious-root-found) was given the most teaching emphasis (both A01's hook and the entirety of A02 Contrast 1) because it is the single most consequential omission when applying De Moivre's root-finding formula — students who correctly execute the formula's mechanics for one value of $k$ often simply never generate the remaining $n-1$ roots without an explicit prompt reminding them the formula is defined over a RANGE of $k$ values.
- The KG explicitly names all three learning outcomes (powers, roots, multiple-angle derivation) in its own description text, and this blueprint's structure was designed to give each named outcome its own clearly-traceable teaching action and worked example, rather than folding the multiple-angle derivation in as an afterthought.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.trig.polar-form-complex`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.complex-numbers-analysis` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuinely references target's notation) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: repeated rotation on complex plane) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
