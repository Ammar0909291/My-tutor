# math.cx.residue

## Identity
- **KG id**: `math.cx.residue`
- **Domain**: math.cx
- **Requires**: `math.cx.laurent-series`
- **Unlocks**: `math.cx.residue-theorem`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Define the residue as EXACTLY the $a_{-1}$ Laurent coefficient — NEVER the whole principal part or
any other negative coefficient; compute a simple pole's residue via the LIMIT SHORTCUT — NEVER
requiring full series expansion; and compute a higher-order pole's residue via the FULL-FACTOR-
REMOVAL-THEN-DIFFERENTIATE formula — NEVER by misapplying the simple-pole shortcut directly.

## Core Understanding
THE RESIDUE IS EXACTLY $a_{-1}$ — NEVER THE WHOLE PRINCIPAL PART: for $f(z)=1/z^2$: the Laurent
series is the single term $z^{-2}$, so $a_{-2}=1$ but $a_{-1}=0$ — giving $\text{Res}(f,0)=0$ EVEN
THOUGH $f$ has a genuine, nontrivial pole (a nonzero principal part). Believing "the residue"
refers to the whole principal part or to any nonzero negative-power coefficient generally is
WRONG — it is the ONE specific coefficient $a_{-1}$, which here happens to vanish despite the pole
being real and nontrivial.

A SIMPLE POLE'S RESIDUE COMES FROM A LIMIT SHORTCUT — NEVER REQUIRING FULL EXPANSION: for
$f(z)=e^z/(z-2)$ at the simple pole $z_0=2$: $\text{Res}(f,2)=\lim_{z\to2}(z-2)\cdot
e^z/(z-2)=\lim_{z\to2}e^z=e^2$ — computed DIRECTLY from the limit, with NO Laurent series ever
written out. Believing the residue can only be found by expanding the entire Laurent series is
WRONG — for a simple pole, the shortcut extracts $a_{-1}$ instantly, bypassing full expansion
entirely.

A HIGHER-ORDER POLE NEEDS FULL-FACTOR REMOVAL THEN DIFFERENTIATION — NEVER THE SIMPLE-POLE
SHORTCUT DIRECTLY: for $f(z)=e^z/z^3$ at the order-3 pole $z_0=0$: the WRONG simple-pole shortcut
$\lim_{z\to0}z\cdot e^z/z^3=\lim_{z\to0}e^z/z^2\to\infty$ DIVERGES. The CORRECT order-3 formula
removes ALL three factors first, then differentiates twice:
$\text{Res}(f,0)=\frac1{2!}\lim_{z\to0}\frac{d^2}{dz^2}[z^3\cdot e^z/z^3]=\frac12\lim_{z\to0}
e^z=\frac12$. Believing the simple-pole shortcut $\lim_{z\to z_0}(z-z_0)f(z)$ can be applied
directly to a pole of order $>1$ is WRONG — it removes only ONE factor, leaving a still-singular
expression; the full formula removes ALL $n$ factors before differentiating $n-1$ times, correcting
for the factorials that differentiation introduces.

## Mental Models
- **"The residue is one specific number sitting in front of (z−z₀)⁻¹ — every other coefficient,
  however large the principal part, is simply irrelevant to it."**
- **"For a simple pole, multiply by (z−z₀) and take the limit — no series expansion ever needed."**
- **"For an order-n pole, remove ALL n factors first, then differentiate n−1 times and divide by
  (n−1)! — removing only one factor leaves a divergent mess."**

## Why Students Fail

### MC-1: RESIDUE-REQUIRES-FULL-LAURENT-EXPANSION
- **Surface form**: believes the residue can only be found by expanding the entire Laurent series,
  missing that shortcut formulas extract $a_{-1}$ directly.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  residue's DEFINITION as a Laurent coefficient makes full expansion feel like the only route to
  it).
- **Repair**: re-walk the $e^z/(z-2)$ instant simple-pole shortcut computation.

### MC-2: SIMPLE-POLE-FORMULA-MISAPPLIED-TO-HIGHER-ORDER-POLE
- **Surface form**: applies the simple-pole shortcut $\lim(z-z_0)f(z)$ directly to a pole of order
  $>1$, producing an incorrect (often divergent) result.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  simple-pole formula's simplicity invites assuming it generalizes unchanged to any pole order).
- **Repair**: re-walk the $e^z/z^3$ wrong-vs-correct side-by-side computation.

### MC-3: RESIDUE-CONFUSED-WITH-PRINCIPAL-PART
- **Surface form**: believes "the residue" refers to the whole principal part or to any negative-
  power coefficient generally, rather than specifically $a_{-1}$.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "the singular
  part" is a vague phrase easily conflated with "the residue" without a precise definition anchor).
- **Repair**: re-walk the $1/z^2$ case where the pole is genuine but the residue is exactly zero.

## Misconceptions

### MC-1: RESIDUE-REQUIRES-FULL-LAURENT-EXPANSION
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: SIMPLE-POLE-FORMULA-MISAPPLIED-TO-HIGHER-ORDER-POLE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: RESIDUE-CONFUSED-WITH-PRINCIPAL-PART
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The residue is like reading one specific digit off a long number — the whole number (the
  principal part) might be complicated, but the residue only cares about one particular place."**
- **Anti-analogy**: the higher-order-pole formula isn't a totally different rule from the
  simple-pole formula — setting $n=1$ in the general formula reproduces the simple-pole shortcut
  exactly, confirming they're one unified rule.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the $1/z^2$ zero-residue-despite-genuine-pole case.
- **Demonstration 2 (targets MC-1)**: the $e^z/(z-2)$ instant simple-pole shortcut.
- **Demonstration 3 (targets MC-2)**: the $e^z/z^3$ wrong-shortcut-versus-correct-formula contrast.

## Discovery Questions
1. "If a function has a large, multi-term principal part, does 'the residue' refer to that whole
   principal part, or to one specific coefficient?"
2. "Must you always expand a function's full Laurent series to find its residue?"
3. "Can the simple-pole shortcut be applied directly to a pole of order 3, the same way it's
   applied to a simple pole?"

## Teaching Sequence
1. **Representation shift**: work the $1/z^2$ zero-residue case, isolating MC-3.
2. **Conflict evidence**: work the $e^z/(z-2)$ instant shortcut, isolating MC-1.
3. **Contrast pair**: work the $e^z/z^3$ wrong-vs-correct computation, isolating MC-2.
4. **Mastery gate**: require a correct residue read-off from given Laurent coefficients, a correct
   simple-pole shortcut computation, a correct higher-order-pole formula computation with the
   incorrect shortcut result also shown, and a correct explanation of why $n=1$ reproduces the
   simple-pole formula, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "the residue" described as the whole principal part or any coefficient other than
  $a_{-1}$.
- Never accept a residue computed by full series expansion when the simple-pole shortcut applies.
- Never accept the simple-pole shortcut applied directly to a pole of order greater than 1.

## Voice Teaching Notes
- Say "which specific coefficient is that — is it really a_{-1}, or something else?" whenever "the
  residue" is invoked loosely.
- Ask "did you remove ALL n factors before differentiating, or just one?" whenever a higher-order-
  pole residue is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reads off $a_{-1}$ as the residue from a stated
  Laurent series.
- **Rung 2 (application)**: learner correctly computes a simple pole's residue via the limit
  shortcut.
- **Rung 3 (transfer)**: learner correctly computes residues at both a simple pole and a higher-
  order pole of the same function, and explains why the simple-pole shortcut fails at the
  higher-order one.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $e^z/(z-2)$ instant shortcut.
- If MC-2 recurs, re-walk the $e^z/z^3$ wrong-vs-correct contrast.
- If MC-3 recurs, re-walk the $1/z^2$ zero-residue case.

## Memory Hooks
- "The residue is a_{-1} — never the whole principal part."
- "Simple pole: multiply and take the limit — never expand the full series."
- "Order-n pole: remove all n factors, then differentiate n−1 times — never just one factor."

## Transfer Connections
- `math.cx.laurent-series` (prerequisite, already authored, this campaign): supplies the Laurent
  expansion whose $a_{-1}$ coefficient this concept names and extracts via closed-form shortcuts.

## Cross-Subject Connections
- Control theory: computing a transfer function's residues at simple and higher-order poles, via
  exactly this concept's two shortcut formulas, is the standard technique for partial-fraction
  decomposition in system analysis.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.residue.md`, reused by reference for its
  three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on an engineer's transfer function
  $H(s)=1/(s^2(s-4))$ requiring both the simple-pole and order-2-pole formulas.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.laurent-series`, unlocks `math.cx.residue-theorem`, cross_links none, expert/apply,
  mastery_threshold 0.9, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 245): authored. Second entry this batch. Companion batch concept:
  `math.cx.cauchy-goursat`.
