# Teaching Blueprint: Fourier Series (`math.de.fourier-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.fourier-series` |
| name | Fourier Series |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.de.bvp`, `math.calc.definite-integral`, `math.trig.trig-functions` |
| unlocks | `math.de.heat-equation`, `math.de.wave-equation`, `math.de.fourier-transform` |
| cross_links | `math.fnal.fourier-transform` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — combining simple waves to approximate a complex shape before the formula |
| description (KG) | Represents a periodic function as f(x)=a₀/2+∑(aₙcos(nπx/L)+bₙsin(nπx/L)), with coefficients computed by orthogonality integrals. Cornerstone of classical and modern analysis. |

## Component 1 — Learning Objectives

- LO1: State the **Fourier series** representation of a periodic function $f(x)=\frac{a_0}{2}+\sum_{n=1}^\infty\left(a_n\cos\frac{n\pi x}{L}+b_n\sin\frac{n\pi x}{L}\right)$, and explain informally why representing a periodic function as a (possibly infinite) sum of simple sines and cosines is a natural, powerful idea.
- LO2: Compute the Fourier coefficients $a_0,a_n,b_n$ using the **orthogonality integrals** ($\int_{-L}^L\cos\frac{m\pi x}{L}\cos\frac{n\pi x}{L}\,dx=0$ for $m\neq n$, and similarly for sine pairs and mixed sine-cosine pairs) — for a simple given periodic function.
- LO3: Correctly recognize which coefficients VANISH automatically based on the function's **symmetry** — an EVEN function has all $b_n=0$ (pure cosine series); an ODD function has all $a_n=0$ (pure sine series) — and use this to avoid unnecessary computation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.bvp` (boundary value problems, the context Fourier series classically arise from — solving BVPs for PDEs like the heat/wave equation), `math.calc.definite-integral` (computing the coefficient integrals), and `math.trig.trig-functions` (sine/cosine, their periodicity).

## Component 3 — Core Explanation

A **Fourier series** represents a periodic function $f(x)$ (period $2L$) as an infinite sum of sines and cosines:
$$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty\left(a_n\cos\frac{n\pi x}{L}+b_n\sin\frac{n\pi x}{L}\right)$$

**Orthogonality**: the key computational tool is that these sine/cosine functions are **orthogonal** over one period — $\int_{-L}^{L}\cos\frac{m\pi x}{L}\cos\frac{n\pi x}{L}\,dx=0$ for $m\neq n$ (and similarly for sine-sine, sine-cosine pairs are ALWAYS zero, regardless of $m,n$). This orthogonality is what makes the coefficients EXTRACTABLE: multiplying both sides of the Fourier series equation by $\cos\frac{n\pi x}{L}$ (for a specific $n$) and integrating over $[-L,L]$ makes every term in the infinite sum vanish EXCEPT the one matching $n$ — isolating $a_n$ directly:
$$a_n = \frac{1}{L}\int_{-L}^L f(x)\cos\frac{n\pi x}{L}\,dx, \qquad b_n = \frac{1}{L}\int_{-L}^L f(x)\sin\frac{n\pi x}{L}\,dx$$

**Symmetry shortcuts**: if $f$ is **even** ($f(-x)=f(x)$), all $b_n=0$ automatically (sine terms, being odd functions, integrate to zero against an even $f$) — the series reduces to a pure cosine series. If $f$ is **odd** ($f(-x)=-f(x)$), all $a_n=0$ automatically — a pure sine series.

## Component 4 — Worked Examples

**Example 1 (LO1 — the representation, motivated pictorially)**: A square wave (period $2\pi$, value $+1$ on $(0,\pi)$, $-1$ on $(-\pi,0)$) can be approximated by combining sine waves of increasing frequency: adding $\sin x$, then $\frac{\sin3x}{3}$, then $\frac{\sin5x}{5}$, etc. produces closer and closer approximations to the sharp-edged square wave, illustrating the Fourier series idea concretely — a complex periodic shape built from simple sinusoids.

**Example 2 (LO2 — computing coefficients directly)**: For $f(x)=x$ on $(-\pi,\pi)$ (period $2\pi$, so $L=\pi$): since $f$ is ODD, $a_n=0$ for all $n\geq1$ (and $a_0=0$ too, by the same odd-symmetry argument applied to the $n=0$ case). Compute $b_n=\frac1\pi\int_{-\pi}^\pi x\sin(nx)\,dx$. Using integration by parts: $\int x\sin(nx)\,dx = -\frac{x\cos(nx)}{n}+\frac{\sin(nx)}{n^2}$, evaluated from $-\pi$ to $\pi$: $b_n = \frac1\pi\left[-\frac{\pi\cos(n\pi)}{n}-\frac{\pi\cos(-n\pi)}{n}\right] = \frac{2(-1)^{n+1}}{n}$ (using $\cos(n\pi)=(-1)^n$). So $f(x)=x \sim \sum_{n=1}^\infty \frac{2(-1)^{n+1}}{n}\sin(nx)$ — a pure sine series, confirming the symmetry shortcut.

**Example 3 (LO3 — symmetry shortcut avoiding unnecessary work, breaking MC-1)**: For $f(x)=x^2$ on $(-\pi,\pi)$: since $f$ is EVEN ($(-x)^2=x^2$), immediately conclude $b_n=0$ for ALL $n$ WITHOUT computing a single integral — a student who instead sets up and computes $b_n=\frac1\pi\int_{-\pi}^\pi x^2\sin(nx)\,dx$ from scratch (an odd integrand over a symmetric interval, genuinely equal to zero, but requiring real computational work to discover) has wasted significant effort that the symmetry check would have avoided entirely.

## Component 5 — Teaching Actions

### Teaching Action A01 — Building Complex Waves from Simple Sinusoids, and Orthogonality-Based Coefficient Extraction (Primitive P11: Representation Shift)

Start pictorial: describe (or sketch) Example 1's square-wave approximation, building up from one sine term to several, visually converging toward the sharp square shape. State: "any reasonably well-behaved periodic function can be built this way — as a sum of simple sine and cosine waves at increasing frequencies, each with its own carefully chosen amplitude."

Shift representation to the extraction mechanism: state the orthogonality property directly, then work Example 2's full coefficient computation, explicitly showing HOW multiplying by $\sin(nx)$ and integrating isolates just the $b_n$ term (informally — full formal justification of why all other terms vanish is cited as the orthogonality property, not re-derived from scratch here).

- **MC-1 hook**: present $f(x)=x^2$ (Example 3, clearly even) and ask a student to compute $b_1$ directly via the integral formula, WITHOUT first checking symmetry — watch whether they set up unnecessary computation, revealing MC-1 (not checking function symmetry FIRST to shortcut obviously-zero coefficients, instead computing every coefficient from the full integral formula regardless).

### Teaching Action A02 — Symmetry Shortcuts, Even vs. Odd Functions (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 2's genuinely ODD function ($f(x)=x$, all $a_n=0$ automatically) directly beside Example 3's genuinely EVEN function ($f(x)=x^2$, all $b_n=0$ automatically) — state the rule precisely: "check symmetry FIRST, before setting up any integral — an odd function immediately kills all cosine coefficients; an even function immediately kills all sine coefficients; only compute the coefficients that COULD be nonzero."

**Contrast 2**: Briefly note that a function with NEITHER symmetry (neither even nor odd) generally requires computing BOTH $a_n$ and $b_n$ in full — the symmetry shortcut is a genuine time-saver when applicable, but not a universal shortcut; always check the specific function's actual symmetry properties before assuming either set of coefficients vanishes.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=|x|$ on $(-\pi,\pi)$, determine (using symmetry, without computing any integral) whether $a_n$ or $b_n$ must all vanish.
  2. Compute $a_0$ for $f(x)=x^2$ on $(-\pi,\pi)$ using the coefficient formula (note: $a_0$ requires actual computation even for an even function, since it's not automatically zero the way $b_n$ is).
  3. For $f(x)=\sin(3x)$ (already itself a pure sine term, period $2\pi$), state its Fourier series directly by inspection, without computing any integrals (hint: what are the nonzero coefficients, and why is no further work needed?).
  4. Explain why checking a function's symmetry BEFORE computing Fourier coefficients can save significant computational effort, using the $x^2$ example from this lesson.
- **P76 (Transfer Probe, mode = independence)**: "An audio engineer analyzes a musical tone's waveform (period $T$) by decomposing it into its Fourier series — the resulting coefficients directly correspond to the tone's 'harmonic content' (how much of each frequency multiple is present). (a) If the engineer's waveform happens to be symmetric in a way that makes it an ODD function (e.g. it looks identical when flipped both left-right and upside-down through the origin), explain what this immediately tells them about half of the coefficients, without needing to run any further computation. (b) Explain why, for a GENERIC recorded musical tone with no particular symmetry, the engineer generally cannot skip computing either set of coefficients, and must compute the full orthogonality-integral formulas for both."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SYMMETRY-SHORTCUT-NOT-CHECKED-FIRST | Computing every Fourier coefficient via the full integral formula regardless of the function's symmetry, missing the opportunity to immediately conclude entire coefficient sets vanish | Foundational |
| MC-2 | A0-ASSUMED-TO-FOLLOW-SAME-VANISHING-RULE-AS-OTHER-EVEN-FUNCTION-COEFFICIENTS | Believing $a_0$ automatically vanishes for an even function the same way $b_n$ does for symmetry reasons, when $a_0$ (related to the function's average value) generally requires genuine computation regardless of even/odd symmetry | Moderate |
| MC-3 | ORTHOGONALITY-INTEGRAL-LIMITS-OR-PERIOD-MISMATCHED | Using incorrect integration limits or period-scaling factor (e.g. forgetting the $\frac{n\pi x}{L}$ argument's dependence on the specific half-period $L$) when setting up the coefficient integrals for a function with a period different from the standard $2\pi$ example | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Symmetry Shortcut Skipped") → P41 (detect: present an obviously even or odd function and check whether the student computes the full integral for a coefficient that symmetry would immediately show is zero) → P64 (conceptual shift: re-anchor on "ALWAYS check even/odd symmetry before setting up any coefficient integral — it can eliminate half your work instantly").
- **B02 (targets MC-2)**: P27 (name it: "A0 Vanishing Overgeneralization") → P41 (detect: ask whether $a_0$ must be zero for an even function like $x^2$, checking if the student assumes yes without computing) → P64 (conceptual shift: re-anchor on "even symmetry kills the SINE coefficients specifically, because sine is an odd function — $a_0$ relates to the AVERAGE value of $f$, which has no such automatic reason to vanish for an even (or any) function").
- **B03 (targets MC-3)**: P27 (name it: "Period-Scaling Mismatch") → P41 (detect: check a student's coefficient-integral setup for a non-$2\pi$-period function, verifying the correct $L$ and argument scaling are used) → P64 (conceptual shift: re-derive by explicitly identifying the function's actual half-period $L$ first, before writing down the coefficient formulas).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.bvp` (the boundary value problem context Fourier series classically arise from), `math.calc.definite-integral` (computing the coefficient integrals), `math.trig.trig-functions` (sine/cosine and their periodicity, the building blocks of the series).
- **Unlocks**: `math.de.heat-equation` and `math.de.wave-equation` (both solved via Fourier series expansion of boundary/initial data), `math.de.fourier-transform` (the continuous generalization of this discrete-frequency series).
- **Cross-link**: KG lists `math.fnal.fourier-transform` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.fnal.fourier-transform.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's discrete Fourier COEFFICIENTS (for periodic functions) directly to that concept's continuous Fourier TRANSFORM (for non-periodic functions), as the natural periodic-to-aperiodic generalization.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (building complex waves from simple sinusoids, and orthogonality-based extraction) and A02 (the symmetry-shortcut contrast) jointly cover all three LOs.
- MC-1 (symmetry shortcut not checked first) was made this blueprint's central focus and given a dedicated worked example (Example 3) specifically designed to make the wasted-effort consequence of skipping the symmetry check vivid and quantifiable — computing a genuinely zero integral from scratch is not just theoretically avoidable but a real, felt computational cost in practice.
- MC-2 (a0 assumed to vanish like other even-function coefficients) was included as a deliberate refinement/correction to MC-1's own shortcut — since a student who has JUST learned "even function means some coefficients vanish for free" is at genuine risk of overgeneralizing that lesson to $a_0$ specifically, this blueprint explicitly separates $a_0$'s different vanishing rule (tied to the function's average, not its symmetry-parity) as its own tracked misconception.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all three) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.fourier-transform` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: combining simple waves before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
