# math.top.homeomorphism

## Identity
- **KG id**: `math.top.homeomorphism`
- **Domain**: math.top
- **Requires**: `math.top.continuity-top`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define homeomorphism ($f:X\to Y$ bijective, $f$ continuous, $f^{-1}$ continuous) and identify why
continuity of $f^{-1}$ is NOT automatic from bijective continuity alone; prove two spaces are NOT
homeomorphic by exhibiting a topological invariant (compactness, connectedness) one has and the
other lacks, never relying on cardinality or visual similarity; and construct explicit
homeomorphisms (e.g. $(0,1)\cong\mathbb R$ via $\tan$).

## Core Understanding
BIJECTIVE + CONTINUOUS DOES NOT AUTOMATICALLY GIVE A HOMEOMORPHISM — $f^{-1}$'S CONTINUITY IS A
SEPARATE, NON-FREE CONDITION: $f:[0,1)\to S^1$, $f(t)=e^{2\pi it}$ is bijective AND continuous —
but $f^{-1}$ FAILS continuity at $f(0)=1$: a small arc near $1\in S^1$ that wraps around pulls
back to $[0,\varepsilon)\cup(1-\varepsilon,1)$, a set with a GAP at $0$, which is NOT open in
$[0,1)$. This is the canonical counterexample proving a homeomorphism genuinely needs THREE
conditions, never just two — bijective continuity alone can fail to be "reversible" in the
topological sense.

TOPOLOGICAL INVARIANTS PROVE NON-HOMEOMORPHISM — NEVER CARDINALITY OR VISUAL SIMILARITY: $\mathbb
R$ and $[0,1]$ have the SAME cardinality ($\mathfrak c$) — yet are NOT homeomorphic: $[0,1]$ is
compact, $\mathbb R$ is not, and compactness is a topological invariant (a continuous image of a
compact space is compact), so any homeomorphism would force $\mathbb R$ to be compact —
contradiction. Similarly, $S^1\not\cong\mathbb R$: removing any point $p\in S^1$ leaves a
CONNECTED space (homeomorphic to $(0,1)$), but removing any point from $\mathbb R$ leaves a
DISCONNECTED space (two rays) — connectedness is an invariant, so this asymmetry proves
non-homeomorphism. Cardinality is a purely SET-THEORETIC fact, never a topological one; "looking
similar" is not a proof technique at all.

EXPLICIT HOMEOMORPHISMS ARE CONSTRUCTED BY VERIFYING ALL THREE CONDITIONS DIRECTLY: for
$f:(0,1)\to\mathbb R$, $f(t)=\tan(\pi(t-\tfrac12))$: (i) bijective — $\tan$ maps
$(-\pi/2,\pi/2)$ bijectively to $\mathbb R$, and the linear shift sends $(0,1)$ bijectively to
$(-\pi/2,\pi/2)$; (ii) continuous — a composition of continuous functions; (iii) $f^{-1}(x)=
\tfrac12+\tfrac1\pi\arctan(x)$ IS continuous on $\mathbb R$. All three conditions verified
directly confirms $(0,1)\cong\mathbb R$ — a BOUNDED open interval and the ENTIRE real line are
topologically INDISTINGUISHABLE, proving boundedness is NOT itself a topological invariant.

## Mental Models
- **"A homeomorphism needs the map AND its inverse both continuous — bijective continuity alone
  can still hide a broken reverse direction, as $[0,1)\to S^1$ proves."**
- **"To prove two spaces are NOT the same topologically, find one invariant property (compact?
  connected?) that splits them — cardinality and appearance are never valid evidence."**
- **"Topology allows infinite stretching, bending, and squishing — but no tearing or gluing; a
  bounded interval can look 'shorter' than the whole real line yet be topologically identical to
  it."**

## Why Students Fail

### MC-1: HOMEOMORPHISM-MEANS-BIJECTIVE-CONTINUOUS
- **Surface form**: believes a bijective continuous map is automatically a homeomorphism, missing
  that $f^{-1}$ must also be separately verified continuous.
- **Birth type**: Critical severity (Blueprint's own declared severity — the canonical
  $[0,1)\to S^1$ counterexample is "the single most important fact in this blueprint").
- **Repair**: re-compute the preimage under $f^{-1}$ of a small wraparound arc near $1\in S^1$,
  showing the gap at $0$ breaks openness.

### MC-2: SAME-CARDINALITY-IMPLIES-HOMEOMORPHIC
- **Surface form**: believes spaces with the same cardinality of points must be homeomorphic,
  missing that $\mathbb R$ and $[0,1]$ share cardinality $\mathfrak c$ yet differ in compactness.
- **Birth type**: Moderate severity (Blueprint's own declared severity — cardinality feels like a
  natural "size" match that should carry over to topological sameness).
- **Repair**: re-derive the compactness-invariant contradiction directly.

### MC-3: VISUALLY-SIMILAR-MEANS-HOMEOMORPHIC
- **Surface form**: believes spaces that "look similar" geometrically must be homeomorphic,
  missing that an annulus and a disk look locally similar but differ in fundamental group.
- **Birth type**: Moderate severity (Blueprint's own declared severity — visual/geometric
  intuition is a poor substitute for an actual invariant argument).
- **Repair**: re-derive the $\pi_1(D^2)=\{e\}$ versus $\pi_1(\text{annulus})\cong\mathbb Z$
  contrast.

## Misconceptions

### MC-1: HOMEOMORPHISM-MEANS-BIJECTIVE-CONTINUOUS
- **Surface form**: as described above.
- **Root cause (Critical)**: as described above.
- **Repair**: as described above.

### MC-2: SAME-CARDINALITY-IMPLIES-HOMEOMORPHIC
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: VISUALLY-SIMILAR-MEANS-HOMEOMORPHIC
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A homeomorphism is a two-way translation dictionary — if the return trip (f⁻¹) loses
  information at even one point, as it does at $1\in S^1$, the dictionary is broken, no matter
  how smoothly the forward trip reads."**
- **Anti-analogy**: two spaces with equally many points are not thereby "the same shape" — a
  compact interval and the entire real line have the same cardinality but are topologically
  worlds apart.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f:[0,1)\to S^1$ counterexample, with the explicit
  gap-at-0 preimage computation.
- **Demonstration 2 (targets MC-2)**: the $[0,1]$-versus-$(0,1)$ compactness-invariant proof of
  non-homeomorphism.
- **Demonstration 3 (targets MC-1/MC-3, construction)**: the explicit $(0,1)\cong\mathbb R$
  homeomorphism via $\tan$, all three conditions verified.

## Discovery Questions
1. "Is every bijective continuous map automatically a homeomorphism?"
2. "If two spaces have the same cardinality, must they be homeomorphic?"
3. "If two spaces look geometrically similar, must they be homeomorphic?"

## Teaching Sequence
1. **Counterexample**: the $[0,1)\to S^1$ failed-inverse-continuity example, working
   Demonstration 1, isolating MC-1.
2. **Deductive**: the topological-invariant framework (compactness, connectedness) introduced via
   Demonstration 2, isolating MC-2, and the $S^1\not\cong\mathbb R$ point-removal argument.
3. **Representation shift**: the explicit $(0,1)\cong\mathbb R$ construction, working
   Demonstration 3.
4. **Mastery gate**: require a correct identification of why a specific bijective continuous map
   fails to be a homeomorphism, a correct non-homeomorphism proof via an invariant, and a correct
   explicit homeomorphism construction with all three conditions verified, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a bijective continuous map assumed to be a homeomorphism without checking
  $f^{-1}$'s continuity separately.
- Never accept cardinality offered as evidence of homeomorphism.
- Never accept "looks similar" offered as evidence of homeomorphism without an actual invariant
  argument.

## Voice Teaching Notes
- Say "have you checked that the INVERSE map is also continuous, separately?" whenever a
  bijective continuous map is proposed as a homeomorphism.
- Ask "what specific topological invariant distinguishes these two spaces?" whenever a
  non-homeomorphism claim is made.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies that $f:[0,1)\to S^1$ fails to be a
  homeomorphism due to $f^{-1}$'s discontinuity.
- **Rung 2 (application)**: learner correctly proves two spaces are not homeomorphic using a
  topological invariant (compactness or connectedness).
- **Rung 3 (transfer)**: learner correctly constructs an explicit homeomorphism, verifying
  bijectivity, continuity, and inverse continuity separately.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute the $[0,1)\to S^1$ gap-at-0 preimage.
- If MC-2 recurs, re-derive the compactness-invariant contradiction for $[0,1]$ versus $\mathbb R$.
- If MC-3 recurs, re-derive the fundamental-group contrast between the disk and the annulus.

## Memory Hooks
- "Bijective plus continuous isn't enough — the inverse must be continuous too, separately."
- "Cardinality is set-theoretic; compactness and connectedness are topological — only the latter
  prove non-homeomorphism."
- "Looking alike proves nothing — find the invariant that actually splits the two spaces."

## Transfer Connections
- `math.top.continuity-top` (already authored, this campaign, Batch 183): supplies the
  preimage-based continuity definition this concept's three-condition definition of homeomorphism
  is built directly on, applied to both $f$ and $f^{-1}$.

## Cross-Subject Connections
- Complex analysis: conformal maps and the Riemann mapping theorem, which construct
  homeomorphisms (in fact biholomorphisms) between domains in the complex plane.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.homeomorphism.md`, reused by reference
  for its $[0,1)\to S^1$ counterexample, its compactness- and connectedness-invariant
  non-homeomorphism proofs, its explicit $(0,1)\cong\mathbb R$ construction via $\tan$, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the compact-Hausdorff
  homeomorphism theorem (bijective continuous suffices when the domain is compact and codomain is
  Hausdorff), revisiting the $[0,1)\to S^1$ counterexample to identify which hypothesis it
  violates.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.continuity-top`, unlocks none, cross_links none, expert/understand,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 184): authored. Second entry this batch. Companion batch concept:
  `math.top.compactness`.
