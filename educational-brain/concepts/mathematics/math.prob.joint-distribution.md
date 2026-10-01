# math.prob.joint-distribution

## Identity
- **KG id**: `math.prob.joint-distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.distribution`
- **Unlocks**: `math.prob.covariance`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Define the joint distribution of $(X,Y)$ via the joint CDF $F(x,y)=P(X\le x,Y\le y)$; compute
with the joint PMF/PDF; and recover marginal distributions by GENUINELY summing/integrating out
the other variable (never read directly off a single joint-table entry, and never using constant
bounds when the support is non-rectangular).

## Core Understanding
A MARGINAL PROBABILITY REQUIRES GENUINELY SUMMING ACROSS THE WHOLE ROW — NEVER READ FROM A SINGLE
CELL: for two fair dice with joint PMF $p(x,y)=1/36$: $P(X=3)=\sum_{y=1}^6p(3,y)=\sum_{y=1}^6
\frac1{36}=\frac6{36}=\frac16$ — summing the joint PMF across ALL 6 possible values of $Y$ for the
fixed row $x=3$. This answer matches the known single-die fact $P(X=3)=1/6$, but it was NEVER read
directly off any single entry of the joint table — it REQUIRED summing across the entire row,
never a shortcut.

THE INTEGRATION REGION MUST MATCH THE ACTUAL SUPPORT — NEVER CONSTANT BOUNDS ON A NON-RECTANGULAR
SUPPORT: for the joint PDF $f(x,y)=2$ on the TRIANGULAR region $0\le x\le y\le1$: the marginal
PDF of $X$ is $f_X(x)=\int_x^1 2\,dy=2(1-x)$ for $0\le x\le1$ — integrating $y$ from $x$ TO $1$
(the ACTUAL, $x$-DEPENDENT range where the joint PDF is nonzero), NEVER from a fixed constant like
$0$ to $1$ regardless of $x$. Using constant bounds on a support that is genuinely triangular
would integrate over regions where $f(x,y)=0$, giving a WRONG marginal.

THE MARGINAL LOOKS DIFFERENT FROM THE JOINT — AND MARGINALS ALONE NEVER DETERMINE THE JOINT: the
marginal $f_X(x)=2(1-x)$ is a genuinely DIFFERENT-LOOKING function from the joint PDF's CONSTANT
value $f(x,y)=2$ — "derived from" the joint never means "identical in form to" the joint. Nor do
the two marginals TOGETHER determine the full joint distribution — the joint can carry ADDITIONAL
information about how $X$ and $Y$ RELATE (their covariance/dependence structure) that neither
marginal alone reveals; knowing both marginals is NEVER sufficient to reconstruct the joint.

## Mental Models
- **"A marginal is a row-sum or a column-integral — never a single cell peeked at directly."**
- **"The joint PDF's support shape dictates the integration bounds — a triangular support demands
  variable bounds, never fixed constants borrowed from habit."**
- **"Knowing both marginals tells you each variable's own story — it never tells you how the two
  stories are entangled."**

## Why Students Fail

### MC-1: MARGINAL-READ-DIRECTLY-FROM-JOINT-ENTRY
- **Surface form**: believes a marginal probability can be read directly from a single entry of
  the joint PMF/PDF, rather than requiring a genuine sum (discrete) or integral (continuous)
  across the other variable.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a single joint-table
  entry can coincidentally match a marginal value, inviting a false shortcut).
- **Repair**: re-walk the explicit row-sum computation for the two-dice example.

### MC-2: JOINT-PDF-INTEGRATION-REGION-MISIDENTIFIED
- **Surface form**: integrates a joint PDF over the wrong region, using constant bounds when the
  actual support is a non-rectangular region.
- **Birth type**: Foundational severity (Blueprint's own declared severity — rectangular-support
  habits transfer incorrectly to non-rectangular supports without careful checking).
- **Repair**: re-draw the triangular support region explicitly, re-deriving the correct
  $x$-dependent integration bounds.

### MC-3: JOINT-DISTRIBUTION-ASSUMED-DETERMINED-BY-MARGINALS-ALONE
- **Surface form**: assumes the two marginal distributions of $X$ and $Y$ together fully
  determine the joint distribution, missing that the joint can carry additional relationship
  information.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "derived from" is easy
  to over-read as "fully reconstructible from").
- **Repair**: note that the marginals describe each variable in isolation, while the joint can
  encode a genuine relationship the marginals cannot recover.

## Misconceptions

### MC-1: MARGINAL-READ-DIRECTLY-FROM-JOINT-ENTRY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: JOINT-PDF-INTEGRATION-REGION-MISIDENTIFIED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: JOINT-DISTRIBUTION-ASSUMED-DETERMINED-BY-MARGINALS-ALONE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Reading a marginal off one joint-table cell is like guessing a team's total score from one
  player's single play — you need every play (every value of the other variable) summed
  together."**
- **Anti-analogy**: the two marginals are not two puzzle pieces that fully reassemble the joint —
  they're each variable's silhouette, blind to how the two shapes actually move together.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the two-dice joint PMF's row-sum marginal computation for
  $P(X=3)$.
- **Demonstration 2 (targets MC-2)**: the triangular-support joint PDF's $x$-dependent marginal
  integration.
- **Demonstration 3 (targets MC-3)**: the marginal-versus-joint shape contrast, foreshadowing
  covariance.

## Discovery Questions
1. "Can you find the marginal probability $P(X=3)$ just by looking at one entry of the joint PMF
   table?"
2. "When integrating a joint PDF with a triangular support, can you use the same constant bounds
   you'd use for a rectangular support?"
3. "Does knowing both marginal distributions of $X$ and $Y$ fully determine the joint
   distribution?"

## Teaching Sequence
1. **Representation shift**: the two-dice joint CDF/PMF grid, working toward Example 1.
2. **Conflict evidence**: the explicit row-sum marginal computation, working Demonstration 1,
   isolating MC-1, and the triangular-support integration, working Demonstration 2, isolating
   MC-2.
3. **Mastery gate**: require a correct joint CDF computation from a table, a correct marginal
   computed via genuine summation/integration with correctly identified bounds, and a correct
   explanation of why marginals alone don't determine the joint, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept a marginal probability read directly from a single joint-table entry.
- Never accept constant integration bounds applied to a non-rectangular joint PDF support.
- Never accept a claim that the two marginals together fully determine the joint distribution.

## Voice Teaching Notes
- Say "have you summed across every value of the other variable, or just looked at one cell?"
  whenever a marginal is computed from a joint table.
- Ask "what is the actual support region here — are your integration bounds matching it?"
  whenever a joint PDF's marginal is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a joint CDF value from a discrete joint
  PMF table.
- **Rung 2 (application)**: learner correctly computes a marginal PMF or PDF via genuine
  summation or integration, with correctly identified bounds for non-rectangular supports.
- **Rung 3 (transfer)**: learner correctly explains why the joint distribution carries
  information beyond what the two marginals alone reveal.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the explicit row-sum computation.
- If MC-2 recurs, re-draw the support region and re-derive the correct bounds.
- If MC-3 recurs, re-anchor on the marginals-describe-isolation-only principle.

## Memory Hooks
- "A marginal is a full row-sum or column-integral — never a single cell."
- "Match your integration bounds to the actual support shape — never assume constant bounds."
- "Marginals tell you about each variable alone — never how they relate."

## Transfer Connections
- `math.prob.distribution` (already authored, certified domain): supplies the single-variable
  CDF/PMF/PDF framework this concept extends to pairs of random variables.
- `math.prob.covariance` (not yet authored, KG's declared unlock): measures the relationship
  between $X$ and $Y$ using their joint distribution, directly building on the marginal-vs-joint
  distinction established here.

## Cross-Subject Connections
- Data science: analyzing paired variables (e.g. rainfall and temperature) via their joint
  distribution to answer questions neither variable's marginal alone can address.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.joint-distribution.md`, reused by
  reference for its two-dice joint PMF example, its triangular-support joint PDF example, its
  marginal-derivation contrasts, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a weather station's joint
  rainfall/temperature distribution, addressing what the joint reveals beyond the marginals.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.distribution`, unlocks `math.prob.covariance`, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 5) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 197): authored. Second entry this batch. Companion batch concept:
  `math.prob.characteristic-function`.
