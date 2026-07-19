# Teaching Blueprint: Prime Number Theorem (`math.nt.prime-number-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.prime-number-theorem` |
| name | Prime Number Theorem |
| domain | Number Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 20 |
| requires | `math.nt.prime-distribution`, `math.cx.complex-integration` |
| unlocks | (none — terminal node in the current KG) |
| cross_links | `math.cx.riemann-zeta` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct proof-strategy orientation, grounded immediately in already-known complex-integration machinery |
| description (KG) | The asymptotic law π(x) ~ x/log x describing how the count of primes up to x grows; proved via complex analysis of the Riemann zeta function. |

## Component 1 — Learning Objectives

- LO1: Restate the Prime Number Theorem's asymptotic law $\pi(x)\sim x/\log x$ (already established in `math.nt.prime-distribution`) and identify this concept's DISTINCT focus — not the statement itself, but the specific role **complex INTEGRATION** (contour integrals, as opposed to merely complex numbers or Dirichlet series in the abstract) plays in its proof.
- LO2: Explain, at an orientation level, why the proof strategy uses a **contour integral of $\zeta'(s)/\zeta(s)$** (the logarithmic derivative of the zeta function) — this specific function has poles exactly at $\zeta$'s zeros AND at $s=1$ (zeta's own pole), making it the natural object whose contour integral, via the residue-counting machinery `math.cx.complex-integration` establishes, can be shown to extract information about $\pi(x)$.
- LO3: Explain why the proof genuinely REQUIRES a **zero-free region** for $\zeta(s)$ (a region, including the line $\mathrm{Re}(s)=1$, where $\zeta(s)\neq0$) — correctly distinguishing this requirement from the Riemann Hypothesis itself (a MUCH stronger zero-location claim), and explain why the theorem's PROOF, unlike its bare STATEMENT, is inseparable from complex-analytic machinery.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.prime-distribution` (the PNT's statement, $\pi(x)\sim x/\log x$, and the precise ratio-vs-difference asymptotic meaning) and `math.cx.complex-integration` (the complex line integral $\int_C f(z)\,dz$, its computation via parametrization, and the Estimation Lemma bounding an integral's magnitude).

## Component 3 — Core Explanation

This concept's distinct role, relative to the two closely related concepts already covered (`math.nt.prime-distribution`'s statement of $\pi(x)\sim x/\log x$, and `math.nt.analytic-number-theory`'s orientation to Dirichlet series/the Euler product/the PNT-vs-RH distinction), is the specific mechanics of HOW complex **integration** — not just complex numbers, not just the zeta function's existence — actually proves the theorem.

**The logarithmic derivative's role**: the function $\frac{\zeta'(s)}{\zeta(s)}$ has a POLE (blows up) exactly where $\zeta(s)$ has a **zero**, and also at $s=1$ (where $\zeta$ itself has its own pole). This is a general complex-analysis fact: the logarithmic derivative of any function with isolated zeros/poles has poles precisely at those zero/pole locations, with residues directly counting them. This makes $\zeta'(s)/\zeta(s)$ the natural object to CONTOUR-INTEGRATE around a large region — the resulting integral, computed via the residue theorem (a direct extension of `math.cx.complex-integration`'s own machinery), can be shown (via a technical argument called Perron's formula, cited here only by name, not derived) to equal essentially $\pi(x)$ (or a smoothed version of it) plus correction terms coming from $\zeta$'s zeros.

**Why a zero-free region is essential to the PROOF (not just a technicality)**: the correction terms in the resulting formula are controlled by HOW CLOSE $\zeta$'s zeros come to the line $\mathrm{Re}(s)=1$ — genuinely proving $\zeta(s)\neq0$ ON that line (a fact strictly weaker than the Riemann Hypothesis, which claims ALL nontrivial zeros sit exactly on $\mathrm{Re}(s)=\frac12$) is precisely what makes the correction terms small enough, in the limit, to vanish relative to the main term $x/\log x$ — yielding the PNT's asymptotic ratio-converges-to-1 conclusion. This is why the theorem's PROOF is inseparably complex-analytic, even though its STATEMENT (from `math.nt.prime-distribution`) can be understood and even numerically verified using only real-variable ideas.

## Component 4 — Worked Examples

**Example 1 (LO1 — locating this concept's distinct content)**: A student has already learned (from `math.nt.prime-distribution`) that $\pi(x)\sim x/\log x$ means the RATIO $\pi(x)/(x/\log x)\to1$, and (from `math.nt.analytic-number-theory`) that this was first proven in 1896 using a zero-free region, distinct from the still-open Riemann Hypothesis. THIS concept adds: the specific mechanism is a CONTOUR INTEGRAL (using exactly the machinery of `math.cx.complex-integration` — parametrized curves, the residue-counting consequence of the theory that concept sets up) of $\zeta'(s)/\zeta(s)$ around a large rectangular or circular contour enclosing the relevant region of the complex plane.

**Example 2 (LO2 — why the logarithmic derivative, illustrated with a toy polynomial)**: Consider the simple polynomial $p(s)=(s-2)^3(s+1)$ (zeros at $s=2$ with multiplicity 3, and $s=-1$ with multiplicity 1) — compute $\frac{p'(s)}{p(s)}$. By logarithmic differentiation, $\frac{p'(s)}{p(s)} = \frac{3}{s-2}+\frac{1}{s+1}$ — a SUM of simple poles, one at each zero of $p$, with residue exactly matching each zero's MULTIPLICITY (3 at $s=2$, 1 at $s=-1$). This toy example illustrates, in a fully computable setting, exactly the general principle used with $\zeta'(s)/\zeta(s)$: the logarithmic derivative's poles directly encode the original function's zero locations and multiplicities — a genuinely computable fact here, standing in for the vastly more complex (and not fully derivable at this level) situation for $\zeta(s)$'s infinitely many zeros.

**Example 3 (LO3 — zero-free region vs. Riemann Hypothesis, breaking MC-1)**: The 1896 proof needed ONLY: $\zeta(1+it)\neq0$ for all real $t$ (i.e., no zeros exactly on the line $\mathrm{Re}(s)=1$) — a considerably WEAKER statement than the Riemann Hypothesis (all nontrivial zeros have $\mathrm{Re}(s)=\frac12$ exactly). A student who believes "the PNT's proof requires knowing exactly where all of $\zeta$'s zeros are" (i.e., requires RH) would be significantly OVERSTATING what the actual 1896 proof needed — the proof only needed to rule out zeros on ONE SPECIFIC line ($\mathrm{Re}(s)=1$), a genuinely much more modest (and already fully proven) requirement.

## Component 5 — Teaching Actions

### Teaching Action A01 — This Concept's Distinct Focus, and the Logarithmic Derivative (Primitive P11: Representation Shift)

Recall explicitly what the two related concepts already established (Example 1's summary). State: "THIS concept is specifically about the MECHANISM — how a contour integral, using exactly the tools from your complex-integration lesson, is actually used to extract $\pi(x)$'s asymptotic behavior from $\zeta(s)$'s analytic properties." Work Example 2's fully computable toy polynomial, showing concretely how a logarithmic derivative's poles encode zero locations and multiplicities — the exact principle (applied to $\zeta$ itself, far less computably) driving the real proof.

- **MC-1 hook**: ask "does the actual 1896 proof of the Prime Number Theorem require first proving the Riemann Hypothesis?" — a "yes" answer reveals MC-1 (believing the proof needs the FULL zero-location claim of RH, rather than the much weaker, already-proven zero-free-on-one-specific-line fact).

### Teaching Action A02 — Zero-Free Region vs. Riemann Hypothesis, Precisely Distinguished (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the ACTUAL 1896 requirement (Example 3: $\zeta(1+it)\neq0$, a single line) directly beside RH's much stronger claim (all nontrivial zeros on $\mathrm{Re}(s)=\frac12$ exactly, a single line INSIDE the critical strip, not the boundary line $\mathrm{Re}(s)=1$ used by the actual proof). State the rule with full precision: "the proof needs zeta to avoid ONE specific vertical line entirely — it does NOT need to know the exact real-part location of every zero. RH is a vastly stronger, still-unresolved claim about a DIFFERENT line."

**Contrast 2**: Connect this specifically back to `math.cx.complex-integration`'s own Estimation Lemma — note (as orientation, not full derivation) that controlling the SIZE of the contour-integral correction terms is exactly the kind of magnitude-bounding argument that lemma exemplifies; the zero-free region is what allows those correction terms to be bounded small enough (via reasoning structurally similar to, though more advanced than, the Estimation Lemma) relative to the main asymptotic term.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the polynomial $q(s)=(s-3)^2(s+2)$, compute $q'(s)/q(s)$ via logarithmic differentiation, and identify each pole's location and the corresponding zero's multiplicity.
  2. State precisely what the 1896 proof of the PNT required about $\zeta(s)$'s zeros, and contrast this with what the Riemann Hypothesis additionally claims.
  3. Explain, in your own words, why a contour integral (rather than a real-variable technique) is the natural tool for extracting information from $\zeta(s)$'s zero locations.
  4. A textbook states "proving the PNT and proving RH are essentially the same problem." Identify what is imprecise about this claim, using this lesson's zero-free-region-vs-RH distinction.
- **P76 (Transfer Probe, mode = independence)**: "A mathematics history article claims: 'Hadamard and de la Vallée Poussin's 1896 proof of the Prime Number Theorem was a masterpiece of complex analysis because they had to fully map out the exact location of every one of the Riemann zeta function's infinitely many zeros.' (a) Using this lesson's precise account of what the 1896 proof actually required (a zero-free region on one specific line, not exact knowledge of every zero's location), identify what is factually imprecise about this description. (b) Explain what the article COULD accurately say instead, connecting the logarithmic-derivative-contour-integral strategy to what genuinely needed to be established."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PNT-PROOF-ASSUMED-TO-REQUIRE-RIEMANN-HYPOTHESIS | Believing the actual historical proof of the Prime Number Theorem required (or is equivalent to) proving the Riemann Hypothesis, rather than the much weaker, already-established zero-free-on-one-line fact | Foundational |
| MC-2 | LOGARITHMIC-DERIVATIVE-POLE-LOCATION-MISUNDERSTOOD | Not recognizing that a logarithmic derivative $f'(s)/f(s)$ has poles precisely at $f$'s own zeros (and poles), with residues equal to multiplicities — treating the pole locations as unrelated to $f$'s own zero structure | Moderate |
| MC-3 | THIS-CONCEPT-TREATED-AS-DUPLICATING-PRIME-DISTRIBUTION-CONTENT | Not recognizing this concept's distinct focus (the complex-integration PROOF MECHANISM) as different from `math.nt.prime-distribution`'s focus (the asymptotic STATEMENT and its precise ratio-vs-difference meaning) | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "PNT-Requires-RH Overstatement") → P41 (detect: ask whether the 1896 proof needed to establish RH first) → P64 (conceptual shift: re-anchor on the precise, weaker requirement — $\zeta(1+it)\neq0$ for real $t$, a fact about ONE line, genuinely proven in 1896, decades before RH was even conjectured in its modern form... actually RH predates 1896, conjectured 1859 — but regardless, remains unproven to this day while the weaker zero-free fact was fully established).
- **B02 (targets MC-2)**: P27 (name it: "Logarithmic-Derivative Pole Location Confusion") → P41 (detect: present Example 2's toy polynomial and ask a student to predict where $q'(s)/q(s)$'s poles will occur, before computing) → P64 (conceptual shift: work through the explicit logarithmic differentiation, showing each pole lands exactly at a zero of the original polynomial, with residue equal to multiplicity).
- **B03 (targets MC-3)**: P27 (name it: "Content Duplication Confusion") → P41 (detect: ask a student to distinguish what THIS concept adds versus what `math.nt.prime-distribution` already covered) → P64 (conceptual shift: re-anchor on the explicit division of labor established in Component 3 — the earlier concept covers the STATEMENT and its precise meaning; this concept covers the specific complex-INTEGRATION mechanism of the proof).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.prime-distribution` (the PNT's statement and precise asymptotic meaning, which this concept does not re-derive but explicitly builds beyond), `math.cx.complex-integration` (the complex line integral and residue-adjacent machinery this concept's proof strategy directly employs).
- **Unlocks**: none — this is a terminal node in the current Mathematics Knowledge Graph.
- **Cross-link**: KG lists `math.cx.riemann-zeta` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.cx.riemann-zeta.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's logarithmic-derivative-contour-integral proof sketch directly to that concept's presumably fuller treatment of $\zeta(s)$'s analytic continuation, functional equation, and zero-counting theory.

## Component 8 — Teaching Notes

- estimated_hours = 20 with a research/analyze tag and MAMR 3/5 (from the KG's own 0.6 threshold) reflects genuinely deep, historically significant mathematics — consistent with the precedent set by `math.cat.limits` and `math.nt.analytic-number-theory`, this blueprint provides an ORIENTATION-level treatment of the proof's STRATEGY and its precise logical dependencies, not a full technical derivation (which would require Perron's formula, contour-shifting arguments, and careful error-term estimates well beyond a single concept entry's scope).
- This is the FIRST concept in this corpus explicitly authored to differentiate itself from two closely KG-adjacent concepts already covering nearly the same named topic (`math.nt.prime-distribution`, `math.nt.analytic-number-theory`) — Component 3 opens by explicitly stating the division of labor, and MC-3 was added specifically to track and correct the risk that a learner (or a future auditor of this corpus) might view this entry as redundant; the genuine differentiator is this concept's specific focus on complex INTEGRATION (contour integrals, residues) as the proof MECHANISM, which neither earlier concept develops.
- MC-1 (PNT proof assumed to require RH) directly extends `math.nt.analytic-number-theory`'s own MC-1 (Riemann-Hypothesis-conflated-with-PNT-prerequisite) to this concept's more technical framing — deliberately reusing and sharpening a correction already begun in the prerequisite concept, rather than treating it as an unrelated new point, since the same public misconception recurs at every level of depth this material is taught.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none — terminal node, correctly empty) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.riemann-zeta` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known complex-integration machinery) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
