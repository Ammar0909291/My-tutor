# math.de.harmonic-oscillator

## Identity
- **KG id**: `math.de.harmonic-oscillator`
- **Domain**: math.de
- **Requires**: `math.de.char-equation`, `math.de.undetermined-coefficients`
- **Unlocks**: none
- **Cross-links**: `math.trig.trig-functions`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Classify $my''+cy'+ky=F(t)$ by discriminant $\Delta=c^2-4mk$ into UNDERDAMPED ($\Delta<0$, MORE
damping never means "more oscillation"), CRITICALLY DAMPED ($\Delta=0$, the BOUNDARY, never the
maximum damping), and OVERDAMPED ($\Delta>0$, MORE damping, slower non-oscillatory return); apply
the amplitude-phase form for the underdamped free oscillator; correctly distinguish $\omega_0$
from the DAMPED frequency $\omega_d=\sqrt{\omega_0^2-\gamma^2}<\omega_0$ (never equal except when
undamped); and compute the steady-state amplitude, recognizing RESONANCE requires the driving
frequency to MATCH the natural frequency (never any periodic forcing).

## Core Understanding
CRITICAL DAMPING IS THE BOUNDARY, NEVER THE MAXIMUM DAMPING: increasing $c$ past
$2\sqrt{mk}$ moves from underdamped → critically damped → OVERDAMPED — MORE damping, SLOWER
return. "Critical" here means the boundary between oscillatory and non-oscillatory behavior, never
"extreme" as in everyday usage; overdamped systems have GREATER damping than critical and return
MORE slowly, never faster.

THE DAMPED OSCILLATION FREQUENCY $\omega_d=\sqrt{\omega_0^2-\gamma^2}$ IS ALWAYS LESS THAN
$\omega_0$ WHEN DAMPING IS PRESENT — NEVER EQUAL: for the underdamped solution
$y=e^{-\gamma t}(C_1\cos\omega_dt+C_2\sin\omega_dt)$: damping SLOWS the oscillation. Only when
$c=0$ (undamped) does $\gamma=0$ and $\omega_d=\omega_0$. Using $\omega_0$ as the oscillation
frequency for a genuinely damped system is always wrong by the amount $\gamma$ subtracts.

RESONANCE REQUIRES THE DRIVING FREQUENCY TO MATCH THE NATURAL FREQUENCY — NEVER JUST "PERIODIC
FORCING": the steady-state amplitude $F_0/\sqrt{(k-m\omega^2)^2+c^2\omega^2}$ is FINITE for every
$\omega$ when $c>0$ — a large response near resonance is NOT the same as "resonance" itself; true
resonance is the amplitude's actual maximum, at $\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}$
(slightly below $\omega_0$). For the undamped case ($c=0$) at exactly $\omega=\omega_0$: the
denominator vanishes, undetermined coefficients requires the modification rule, and
$y_p=(F_0/2m\omega_0)t\sin(\omega_0t)$ — amplitude growing WITHOUT BOUND, genuine resonance,
never occurring at any other frequency.

## Mental Models
- **"Critical damping is the boundary between oscillating and not — overdamped means MORE
  damping than critical, never 'beyond maximum.'"**
- **"Resonance is a frequency-matching phenomenon — a big response isn't resonance; only the
  actual amplitude peak (or unbounded growth, undamped) is."**

## Why Students Fail

### MC-1: CRITICAL-DAMPING-IS-MAXIMUM-DAMPING
- **Surface form**: thinks critical damping ($c^2=4mk$) means the MOST damping, missing that
  overdamped ($c^2>4mk$) has MORE damping and returns MORE slowly.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "critical"
  suggests extreme/maximum in everyday language, but here means the boundary between qualitative
  behaviors).
- **Repair**: re-walk the increasing-$c$ progression from underdamped through critical to
  overdamped, confirming overdamped is slower, not "beyond maximum."

### MC-2: NATURAL-FREQUENCY-EQUALS-DAMPED-FREQUENCY
- **Surface form**: uses $\omega_0=\sqrt{k/m}$ as the oscillation frequency even for the damped
  case, instead of $\omega_d=\sqrt{\omega_0^2-\gamma^2}<\omega_0$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the undamped
  case is taught first, and $\omega_0$ is applied to all cases without noticing damping slows the
  oscillation).
- **Repair**: re-derive $\omega_d$ explicitly for a specific damped example, confirming
  $\omega_d<\omega_0$.

### MC-3: FORCING-AT-ANY-FREQUENCY-CAUSES-RESONANCE
- **Surface form**: thinks resonance occurs whenever there is periodic forcing, rather than only
  when the driving frequency matches the natural frequency.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — resonance is
  presented dramatically, leading students to associate any forced oscillation with resonance).
- **Repair**: re-verify the amplitude formula is FINITE for every $\omega$ when $c>0$, contrasting
  with the genuine unbounded growth only at $\omega=\omega_0$ when $c=0$.

## Misconceptions

### MC-1: CRITICAL-DAMPING-IS-MAXIMUM-DAMPING
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: NATURAL-FREQUENCY-EQUALS-DAMPED-FREQUENCY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: FORCING-AT-ANY-FREQUENCY-CAUSES-RESONANCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Underdamped, critical, overdamped is like a dial from bouncy to sluggish — critical is the
  exact click-point where bouncing just stops, not the extreme end of the dial."**
- **Anti-analogy**: a large but finite steady-state response is NOT resonance — resonance is the
  amplitude's genuine peak (or, undamped, its unbounded growth), a specific frequency-matching
  event, not any strong response.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the increasing-$c$ progression through underdamped,
  critical, and overdamped regimes.
- **Demonstration 2 (targets MC-2)**: the explicit $\omega_d=\sqrt{\omega_0^2-\gamma^2}$
  derivation for a specific damped spring-mass example.
- **Demonstration 3 (targets MC-3)**: the finite-amplitude-for-all-$\omega$ (damped) versus
  unbounded-growth-only-at-$\omega_0$ (undamped) contrast.

## Discovery Questions
1. "Does critically damped mean the maximum possible damping, or the boundary between oscillatory
   and non-oscillatory behavior?"
2. "Is the damped oscillation frequency ω_d the same as the natural frequency ω₀, or always
   smaller when damping is present?"
3. "Does any periodic forcing cause resonance, or only forcing at a specific matching frequency?"

## Teaching Sequence
1. **Representation shift**: the three-regime classification via the discriminant, working
   Demonstration 1, isolating MC-1.
2. **Pattern induction**: the damped-versus-natural frequency distinction, working
   Demonstration 2, isolating MC-2; the amplitude-phase form.
3. **Contrast pair**: the finite-amplitude-versus-true-resonance distinction, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct three-regime classification with the correct solution
   form, a correct amplitude-phase derivation distinguishing $\omega_d$ from $\omega_0$, and a
   correct identification of the true resonance condition, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept critical damping described as the maximum possible damping.
- Never accept $\omega_0$ used as the oscillation frequency for a genuinely damped system.
- Never accept a claim that any periodic forcing causes resonance, rather than only
  frequency-matched forcing.

## Voice Teaching Notes
- Say "is critical the maximum damping, or the boundary between behaviors?" whenever damping
  regimes are classified.
- When an oscillation frequency is stated for a damped system, ask "is that ω₀, or the actual
  damped frequency ω_d?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a given oscillator into its damping
  regime from the discriminant.
- **Rung 2 (application)**: learner correctly computes $\omega_d$ and writes the amplitude-phase
  solution for an underdamped free oscillator.
- **Rung 3 (transfer)**: learner correctly computes the steady-state amplitude for a forced
  oscillator across several driving frequencies and identifies which is closest to resonance.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the increasing-$c$ progression through the three regimes.
- If MC-2 recurs, re-derive $\omega_d$ explicitly for a damped example.
- If MC-3 recurs, re-verify the finite-amplitude-for-all-$\omega$ argument for $c>0$.

## Memory Hooks
- "Critical damping is the boundary, not the maximum — overdamped has MORE damping."
- "ω_d is always less than ω₀ when damping is present — never equal, except undamped."
- "Resonance needs frequency matching — a big response alone isn't resonance."

## Transfer Connections
- `math.de.char-equation` (already authored, this campaign, Batch 152): supplies the
  characteristic-equation machinery this concept's three-regime classification directly reuses.
- `math.de.undetermined-coefficients` (already authored, this campaign, Batch 153): supplies the
  trial-function and modification-rule method this concept's forced-response and resonance
  analysis directly builds on.
- `math.trig.trig-functions` (already authored, certified domain, formal KG cross-link): supplies
  the trigonometric machinery underlying the amplitude-phase representation.
- `math.de.resonance` (not yet authored): the KG's declared related concept, a dedicated deeper
  treatment of the resonance phenomenon.

## Cross-Subject Connections
- Physics: spring-mass-damper systems, RLC circuits (electrical analog: charge↔position,
  inductance↔mass, resistance↔damping, 1/capacitance↔spring constant).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.harmonic-oscillator.md`, reused by
  reference for its three-regime classification table, its damped-spring-mass worked example, its
  resonance amplitude formula, and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own declared cross-link probe engaging
  `math.trig.trig-functions`, connecting the RLC circuit analogy, the amplitude-phase derivation
  from initial conditions, and the quantum harmonic oscillator's classical correspondence.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.char-equation`/`math.de.undetermined-coefficients`, unlocks none, cross_links
  `math.trig.trig-functions`, advanced/apply, mastery_threshold 0.85, estimated_hours 6) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 154): authored. First entry this batch. Companion batch concept:
  `math.de.stability-analysis`.
