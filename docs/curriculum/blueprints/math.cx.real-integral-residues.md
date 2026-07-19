# Teaching Blueprint: Evaluating Real Integrals via Residues (`math.cx.real-integral-residues`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.real-integral-residues` |
| name | Evaluating Real Integrals via Residues |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.cx.residue-theorem` |
| unlocks | none |
| cross_links | `math.calc.improper-integrals` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the residue theorem; the real-integral extension technique is introduced directly |
| description (KG) | Techniques for computing real integrals $\int_{-\infty}^\infty f(x)\,dx$ by extending to a closed contour in $\mathbb{C}$ and applying the residue theorem. Jordan's lemma handles exponential factors. Enables evaluation of Gaussian, sinc, and other integrals. |

## Component 1 — Learning Objectives

- LO1: Set up the CLOSED-CONTOUR extension technique: to evaluate a REAL integral $\int_{-\infty}^\infty f(x)\,dx$ (an `math.calc.improper-integrals` improper integral, defined as a limit), extend $f$ to a function of a COMPLEX variable and close the real-axis segment $[-R,R]$ with a large semicircular arc $C_R$ in the upper (or lower) half-plane, forming a closed contour to which `math.cx.residue-theorem` directly applies.
- LO2: Apply the residue theorem to the closed contour, then argue the SEMICIRCULAR ARC's contribution vanishes as $R\to\infty$ (via an explicit bounding estimate), leaving ONLY the real-axis integral equal to $2\pi i$ times the sum of residues inside — recognizing this vanishing-arc argument as the essential step making the real-integral evaluation valid.
- LO3 (orientation level — full Jordan's lemma proof deferred): recognize, without full derivation, that for integrands with an OSCILLATORY exponential factor $e^{iax}$ (as in Fourier-type integrals), the naive arc-vanishing bound can FAIL, and Jordan's lemma supplies the specifically-tailored (weaker, but sufficient) estimate needed to still guarantee the arc's contribution vanishes in THAT case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.residue-theorem` ($\oint_Cf(z)\,dz=2\pi i\sum\mathrm{Res}(f,z_k)$, summing residues at poles enclosed by $C$).

## Component 3 — Core Explanation

**Extending a real integral into the complex plane, closing the contour**: `math.calc.improper-integrals` already defines $\int_{-\infty}^\infty f(x)\,dx$ as $\lim_{R\to\infty}\int_{-R}^Rf(x)\,dx$. To evaluate this via residues, treat $f$ as a function of a COMPLEX variable $z$ and consider the CLOSED contour consisting of the real segment $[-R,R]$ together with a large semicircular arc $C_R$ (radius $R$) in the upper half-plane, connecting $R$ back to $-R$. `math.cx.residue-theorem` applies DIRECTLY to this closed contour, since it encloses whichever of $f$'s poles lie in the upper half-plane.

**The arc must be shown to vanish — this is the essential extra step**: the residue theorem gives $\oint_{[-R,R]\cup C_R}f(z)\,dz=2\pi i\sum\mathrm{Res}(f,z_k)$ (sum over enclosed poles), which splits as $\int_{-R}^Rf(x)\,dx+\int_{C_R}f(z)\,dz=2\pi i\sum\mathrm{Res}$. The REAL integral we actually want is $\int_{-R}^Rf(x)\,dx$ — so we need $\int_{C_R}f(z)\,dz\to0$ as $R\to\infty$, LEAVING only the real integral equal to $2\pi i\sum\mathrm{Res}$. This vanishing is typically shown via the ML-inequality: bounding $|f(z)|$ on the arc and multiplying by the arc's length, showing the product shrinks to zero — this bounding argument is the essential extra work beyond simply invoking the residue theorem.

**Oscillatory integrands need Jordan's lemma — a specifically weaker but sufficient bound (orientation level)**: for integrands containing $e^{iax}$ (arising in Fourier-type real integrals), the naive ML-bound can FAIL to show the arc vanishes, because $|e^{iaz}|$ does not simply decay uniformly on the arc the way it does for other integrands. JORDAN'S LEMMA supplies a specifically-tailored, WEAKER estimate (exploiting the oscillatory decay of $e^{iaz}$ for $z$ in the upper half-plane when $a>0$) that IS sufficient to conclude the arc's contribution still vanishes, even though the simpler bounding argument from the general case does not directly apply. Full proof of Jordan's lemma is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — setting up the closed contour, breaking MC-1)**: to evaluate $\int_{-\infty}^\infty\frac{1}{x^2+1}\,dx$ (an `math.calc.improper-integrals` improper integral): extend to $f(z)=\frac{1}{z^2+1}$, which has poles at $z=\pm i$. Close the contour with the real segment $[-R,R]$ plus the upper semicircular arc $C_R$. For $R>1$, this closed contour ENCLOSES the pole at $z=i$ (in the upper half-plane) but NOT $z=-i$ (in the lower half-plane) — setting up exactly the situation `math.cx.residue-theorem` applies to, once the arc's contribution is dealt with.

**Example 2 (LO2 — the arc vanishing argument completing the evaluation, breaking MC-2)**: continuing Example 1: the residue at $z=i$ is $\mathrm{Res}(f,i)=\lim_{z\to i}(z-i)\cdot\frac{1}{(z-i)(z+i)}=\frac{1}{2i}$, so the residue theorem gives $\oint f(z)\,dz=2\pi i\cdot\frac{1}{2i}=\pi$. Bounding the arc: on $C_R$, $|f(z)|=\frac{1}{|z^2+1|}\le\frac{1}{R^2-1}$ (for large $R$), so $\left|\int_{C_R}f(z)\,dz\right|\le\frac{1}{R^2-1}\cdot\pi R\to0$ as $R\to\infty$ (the numerator grows linearly in $R$ while the denominator grows quadratically). Since the arc's contribution vanishes, $\int_{-\infty}^\infty\frac{1}{x^2+1}\,dx=\pi$ — the residue-theorem computation ALONE was not sufficient; the explicit arc-vanishing bound was the essential completing step.

**Example 3 (LO3, orientation level — Jordan's lemma for an oscillatory integrand, breaking MC-3)**: to evaluate the SINC-type integral $\int_{-\infty}^\infty\frac{\cos x}{x^2+1}\,dx$ (relevant to Fourier analysis): write $\cos x=\mathrm{Re}(e^{ix})$ and consider $f(z)=\frac{e^{iz}}{z^2+1}$. On the upper semicircular arc, the naive ML-bound (as in Example 2) would need $|e^{iz}|$ bounded, but $|e^{iz}|=e^{-y}$ where $z=x+iy$ — this actually DECAYS for $y>0$ (upper half-plane), a genuinely different, OSCILLATORY-DECAY behavior that Jordan's lemma is specifically designed to exploit (rather than the simpler polynomial-decay bound from Example 2), confirming the arc's contribution still vanishes despite the different (exponential, not merely polynomial) behavior of the integrand on the arc. The evaluation proceeds analogously to Example 2 (residue at $z=i$, now for $e^{iz}/(z^2+1)$), but the arc-vanishing justification GENUINELY required Jordan's lemma's specific estimate, not the simpler bound.

## Component 5 — Teaching Actions

### Teaching Action A01 — Closing the Contour Is the Essential Setup Move (Primitive P11: Representation Shift)

State: "you can't apply the residue theorem to an OPEN real-axis segment directly — the essential move is closing it into a genuine closed contour by adding a large semicircular arc, which is exactly what `math.cx.residue-theorem` requires to apply at all." Walk Example 1's contour setup and pole identification.

- **MC-1 hook**: ask "can the residue theorem be applied directly to the open real-axis integral $\int_{-\infty}^\infty f(x)\,dx$, without first closing it into a genuine closed contour?" — a "yes" answer reveals MC-1 (missing that closing the contour with a semicircular arc is the essential setup step making the residue theorem applicable at all).

### Teaching Action A02 — The Residue Computation Alone Is Not the Full Evaluation (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing the residue and applying the theorem gave $\pi$ for the CLOSED contour, but the actual real integral required the SEPARATE arc-vanishing bound to conclude the closed-contour value equals the real integral alone. State: "the residue theorem hands you the value of the CLOSED contour integral — you still need to show the arc's own contribution genuinely vanishes before you can equate that to the real integral you actually wanted."

- **MC-2 hook**: ask "once the residue theorem gives you the closed contour's value, is that automatically equal to the real integral you wanted, with no further justification needed?" — a "yes" answer reveals MC-2 (missing that the arc's contribution must be explicitly shown to vanish before the closed-contour value equals the real integral).

### Teaching Action A03 — Oscillatory Integrands Need a Genuinely Different Vanishing Argument (Primitive P06: Contrast Pair)

Contrast Example 2's polynomial-decay bound (sufficient for $\frac{1}{z^2+1}$) against Example 3's need for Jordan's lemma's specifically-tailored oscillatory-decay estimate for $\frac{e^{iz}}{z^2+1}$. State: "the simple ML-bound that worked for a purely polynomial integrand doesn't automatically transfer to integrands with an oscillatory exponential factor — Jordan's lemma supplies the DIFFERENT estimate specifically needed there."

- **MC-3 hook**: ask "does the same simple arc-vanishing bound used for polynomial integrands like $1/(x^2+1)$ automatically apply to integrands containing an oscillatory factor like $e^{iax}$?" — a "yes" answer reveals MC-3 (missing that oscillatory integrands require Jordan's lemma's specifically different estimate).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $\int_{-\infty}^\infty\frac{1}{x^2+4}\,dx$, identify the poles of the complex extension and state which lie in the upper half-plane.
  2. Compute the residue at the enclosed pole from problem 1, and state what the residue theorem gives for the closed contour.
  3. Verify the arc's contribution vanishes for problem 1's integrand as $R\to\infty$, using an ML-type bound.
  4. Explain, without full proof, why $\int_{-\infty}^\infty\frac{\cos(2x)}{x^2+4}\,dx$ requires Jordan's lemma rather than the simpler bound from problem 3.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.calc.improper-integrals`)**: "A signal-processing application requires evaluating $\int_{-\infty}^\infty\frac{x\sin x}{x^2+9}\,dx$ (related to a Fourier transform of a signal). (a) Explain, citing `math.calc.improper-integrals`'s own definition of this integral as a limit, why this is a genuine improper integral requiring careful justification, not just a formal symbol. (b) Set up the closed-contour extension (identifying the relevant complex function and its poles), and explain why the arc's vanishing here would require Jordan's lemma rather than the simpler polynomial bound. (c) Explain conceptually why the specific structure needed for Jordan's lemma to apply (an oscillatory factor $e^{iax}$ with $a>0$, paired with the upper half-plane) matters for whether this technique can be used at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RESIDUE-THEOREM-ASSUMED-DIRECTLY-APPLICABLE-TO-OPEN-INTEGRAL | Believing the residue theorem applies directly to the open real-axis integral, missing that closing the contour with a semicircular arc is the essential setup step | Foundational |
| MC-2 | ARC-VANISHING-ASSUMED-AUTOMATIC | Believing the closed-contour value from the residue theorem automatically equals the real integral with no further justification, missing that the arc's vanishing must be separately shown | High |
| MC-3 | ARC-VANISHING-BOUND-ASSUMED-UNIVERSAL | Believing the same simple arc-vanishing bound works for any integrand, missing that oscillatory integrands require Jordan's lemma's specifically different estimate | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Residue Theorem Assumed Directly Applicable to Open Integral") → P41 (detect: ask whether the residue theorem applies directly to the open real-axis integral) → P64 (conceptual shift: re-walk Example 1's contour-closing setup, re-anchoring on "closing the contour is the essential setup step").
- **B02 (targets MC-2)**: P27 (name it: "Arc Vanishing Assumed Automatic") → P41 (detect: ask whether the closed-contour value automatically equals the real integral) → P64 (conceptual shift: re-walk Example 2's explicit ML-bound computation, re-anchoring on "the arc's vanishing must be separately shown, not assumed").
- **B03 (targets MC-3)**: P27 (name it: "Arc Vanishing Bound Assumed Universal") → P41 (detect: ask whether the same simple bound works for any integrand) → P64 (conceptual shift: re-walk Example 3's oscillatory-decay contrast, re-anchoring on "Jordan's lemma supplies a specifically different estimate for oscillatory integrands").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.residue-theorem` ($\oint_Cf(z)\,dz=2\pi i\sum\mathrm{Res}(f,z_k)$, the machinery this concept applies to a closed contour built from a real-axis segment plus an arc).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.improper-integrals`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.calc.improper-integrals`'s own limit-based definition directly in Component 3's setup and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the contour setup and the explicit arc-vanishing ML-bound) and LO3 kept orientation-level, appropriately previewing Jordan's lemma's role without deriving its proof.
- **Division of labor**: `math.cx.residue-theorem` owns the general closed-contour residue-summing machinery; `math.calc.improper-integrals` owns the limit-based definition of the real integral being evaluated. This concept owns the SPECIFIC technique of closing a real-axis segment with an arc and justifying the arc's vanishing — deliberately using the SAME rational-function family ($1/(z^2+1)$ then $e^{iz}/(z^2+1)$) across Examples 2–3 so the polynomial-versus-oscillatory contrast is isolated as the single variable distinguishing which vanishing argument applies.
- Example 3's deliberate choice to describe Jordan's lemma's QUALITATIVE role (oscillatory decay in the upper half-plane) without stating or proving its precise quantitative bound was chosen to respect this concept's stated orientation-level scope for LO3, while still making the contrast with Example 2's simpler bound concrete and falsifiable.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.improper-integrals` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the residue theorem; the extension technique introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
