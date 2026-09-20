# math.cx.cauchy-theorem

## Identity
- **KG id**: `math.cx.cauchy-theorem`
- **Domain**: math.cx
- **Requires**: `math.cx.complex-integration`
- **Unlocks**: `math.cx.cauchy-integral-formula`, `math.cx.cauchy-goursat`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Verify BOTH hypotheses (holomorphic throughout $D$ AND $D$ simply connected) before applying
$\oint_Cf\,dz=0$ — NEVER check only holomorphy while overlooking simple-connectedness; recognize a
function's singularity ANYWHERE in $\mathbb{C}$ never disqualifies it from Cauchy's Theorem on a
SPECIFIC domain avoiding that singularity; and never extend path-independence to domains that
aren't simply connected or paths straddling a singularity.

## Core Understanding
BOTH HYPOTHESES MUST BE VERIFIED TOGETHER — NEVER CHECK ONLY HOLOMORPHY WHILE OVERLOOKING SIMPLE-
CONNECTEDNESS: for $f(z)=1/z$ on $D=\mathbb{C}\setminus\{0\}$ (the punctured plane): $f$ IS
holomorphic everywhere $D$ is DEFINED — yet $D$ itself is NOT simply connected (a loop around the
puncture cannot shrink to a point without leaving $D$). Taking $C$ = the unit circle:
$\oint_C(1/z)\,dz=2\pi i\neq0$ — the theorem's conclusion GENUINELY FAILS. Believing that since
$f$ is holomorphic everywhere the domain is defined, Cauchy's Theorem must apply is WRONG — TWO
hypotheses are always checked together: holomorphic throughout $D$, AND $D$ itself simply
connected; neither implies the other.

A SINGULARITY ANYWHERE IN $\mathbb{C}$ NEVER DISQUALIFIES A FUNCTION FROM CAUCHY'S THEOREM ON A
SPECIFIC DOMAIN AVOIDING IT: the SAME function $f(z)=1/z$, restricted to $D'=\{z:\mathrm{Re}(z)>0\}$
(the right half-plane, genuinely simply connected, avoiding $z=0$ entirely): $f$ IS holomorphic
throughout $D'$, and Cauchy's Theorem correctly applies — any closed curve entirely within $D'$
gives $\oint_Cf\,dz=0$. Believing a function with ANY singularity anywhere in the complex plane
can NEVER satisfy Cauchy's Theorem's hypotheses is WRONG — check the SPECIFIC domain and curve of
interest; a function can be perfectly holomorphic on a smaller domain even with singularities
elsewhere, outside that domain.

PATH-INDEPENDENCE NEVER EXTENDS ACROSS A SINGULARITY OR A NON-SIMPLY-CONNECTED DOMAIN: for two
curves $C_1,C_2$ with a singularity of $f$ sitting BETWEEN them: the combined closed curve
$C_1*(-C_2)$ ENCIRCLES that singularity, so the domain relevant to that combined curve is NOT
simply connected, and Cauchy's Theorem's hypothesis fails for it. Applying path-independence
(assuming $\int_{C_1}f\,dz=\int_{C_2}f\,dz$) regardless of a singularity lying between the paths
is WRONG — the "combined closed curve" argument requires that combined curve to lie ENTIRELY
within a genuinely simply connected region; a singularity between the paths breaks this
requirement.

## Mental Models
- **"Two hypotheses, always both checked — holomorphic throughout D, AND D itself simply
  connected. Passing one never certifies the other."**
- **"Check the specific domain and curve you're actually using — a function's singularities
  elsewhere in the plane, outside that domain, are irrelevant to whether Cauchy's Theorem applies
  here."**
- **"Path-independence needs the combined closed curve to stay inside a hole-free region — a
  singularity sitting between two paths breaks the guarantee."**

## Why Students Fail

### MC-1: SIMPLY-CONNECTED-HYPOTHESIS-OVERLOOKED
- **Surface form**: checks only that $f$ is holomorphic on the domain as stated, without
  separately verifying the domain itself is simply connected (no holes).
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity —
  "holomorphic on D" is the more intuitive, frequently emphasized condition, while
  simple-connectedness is easy to treat as a technical footnote).
- **Repair**: re-anchor on "TWO hypotheses, always both checked."

### MC-2: SINGLE-SINGULARITY-ANYWHERE-DISQUALIFIES-ENTIRE-FUNCTION
- **Surface form**: believes a function with ANY singularity anywhere in the complex plane can
  never satisfy Cauchy's Theorem's hypotheses, rather than checking the specific domain/curve of
  interest.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "this function
  has a bad point somewhere" is overgeneralized to "this function is always bad").
- **Repair**: re-anchor on checking the specific domain and curve, using the right-half-plane
  example.

### MC-3: PATH-INDEPENDENCE-ASSUMED-FOR-NON-SIMPLY-CONNECTED-DOMAINS
- **Surface form**: applies the path-independence conclusion (any two paths give the same
  integral) even when the domain is not simply connected, or when a singularity lies between the
  two paths.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — the
  path-independence shortcut is easy to apply reflexively without re-checking the hypothesis).
- **Repair**: re-derive via the combined-closed-curve argument, showing the encircled singularity
  breaks the hypothesis.

## Misconceptions

### MC-1: SIMPLY-CONNECTED-HYPOTHESIS-OVERLOOKED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: SINGLE-SINGULARITY-ANYWHERE-DISQUALIFIES-ENTIRE-FUNCTION
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: PATH-INDEPENDENCE-ASSUMED-FOR-NON-SIMPLY-CONNECTED-DOMAINS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Simply connected is like a yard with no fenced-off pit — you can shrink any lasso thrown
  anywhere in the yard down to a point; a domain with a hole is a yard with a pit no lasso around
  it can ever shrink past."**
- **Anti-analogy**: a function isn't "cursed" everywhere just because it has one singularity
  somewhere — 1/z misbehaves only near z=0, and is perfectly well-behaved (and Cauchy's Theorem-
  eligible) on any domain that steers clear of that one point.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the punctured-plane $1/z$ unit-circle failure,
  $\oint_C(1/z)\,dz=2\pi i\neq0$.
- **Demonstration 2 (targets MC-2)**: the right-half-plane $1/z$ success, contrasted directly with
  Demonstration 1.
- **Demonstration 3 (targets MC-3)**: the combined-closed-curve argument for path-independence,
  showing an encircled singularity breaks it.

## Discovery Questions
1. "Since f is holomorphic everywhere on this domain, does Cauchy's Theorem guarantee the integral
   is zero, without checking anything else about the domain?"
2. "Does a function with a singularity somewhere in the complex plane mean Cauchy's Theorem can
   never apply to it, on any domain?"
3. "If a singularity lies between two paths, do the path integrals still have to agree?"

## Teaching Sequence
1. **Representation shift**: state the theorem with both hypotheses, derive path-independence,
   work the entire-function no-computation example.
2. **Contrast pair**: work the punctured-plane failure and right-half-plane success side by side,
   isolating MC-1 and MC-2.
3. **Mastery gate**: require a correct application citing both hypotheses, a correct
   path-independence computation via a convenient path, a correct diagnosis of a Cauchy's-Theorem
   failure scenario, and a correct construction of a non-simply-connected domain example, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept Cauchy's Theorem applied by checking holomorphy alone, without verifying simple
  connectedness.
- Never accept a function excluded from Cauchy's Theorem eligibility based on singularities
  outside the domain being used.
- Never accept path-independence applied across a domain where a singularity sits between the
  paths.

## Voice Teaching Notes
- Say "is the domain itself hole-free, not just the function well-behaved?" whenever Cauchy's
  Theorem is invoked.
- Ask "does that singularity actually lie inside the SPECIFIC domain you're using?" whenever a
  function's eligibility is questioned.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states both hypotheses and applies the theorem
  directly to an entire function.
- **Rung 2 (application)**: learner correctly diagnoses why the theorem fails for $1/z$ on the
  punctured plane but succeeds on the right half-plane.
- **Rung 3 (transfer)**: learner correctly explains what must be verified about the region enclosed
  by a specific contour before concluding an integral vanishes, and rebuts an overly broad
  objection about a function's singularities elsewhere.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the two-hypothesis checklist.
- If MC-2 recurs, re-walk the right-half-plane success example.
- If MC-3 recurs, re-derive the combined-closed-curve argument.

## Memory Hooks
- "Two hypotheses, always both checked — holomorphic AND simply connected."
- "Check the specific domain, not the function's worst behavior elsewhere."
- "A singularity between two paths breaks path-independence — check the combined closed curve."

## Transfer Connections
- `math.cx.complex-integration` (prerequisite, already authored, this campaign): supplies the
  complex line integral this theorem's conclusion is stated about, plus the reversal-of-path
  property used to derive path-independence.

## Cross-Subject Connections
- Electrical engineering and control theory: contour-integral evaluation in the frequency domain
  relies directly on verifying which poles (singularities) of a transfer function lie inside a
  specific contour before concluding an integral vanishes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.cauchy-theorem.md`, reused by reference
  for its three worked examples (the punctured-plane-versus-right-half-plane contrast) and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an electrical engineer's
  contour-integral evaluation, verifying which poles lie inside a specific contour and rebutting an
  overly broad objection about the transfer function's singularities elsewhere.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.complex-integration`, unlocks `math.cx.cauchy-integral-formula`/
  `math.cx.cauchy-goursat`, cross_links none, expert/understand, mastery_threshold 0.9,
  estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 240): authored. First entry this batch. Companion batch concept:
  `math.cx.identity-theorem`.
