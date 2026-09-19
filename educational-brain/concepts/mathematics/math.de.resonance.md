# math.de.resonance

## Identity
- **KG id**: `math.de.resonance`
- **Domain**: math.de
- **Requires**: `math.de.harmonic-oscillator`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
Explain PURE resonance ($c=0,\omega=\omega_0$) as producing SECULAR growth ($t\sin$ or $t\cos$
terms, amplitude $\to\infty$ with time — never merely "large"); compute the damped amplitude
response $H(\omega)=1/\sqrt{(\omega_0^2-\omega^2)^2+4\gamma^2\omega^2}$ and identify the resonant
frequency $\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}<\omega_0$ (never equal to $\omega_0$ for
$\gamma>0$); and distinguish PURE resonance (unbounded), PRACTICAL resonance ($c>0$, finite but
large peak), and BEATING (two close frequencies, $c=0,\omega\ne\omega_0$, a BOUNDED oscillating
envelope — never itself a form of resonance).

## Core Understanding
PURE RESONANCE MEANS UNBOUNDED SECULAR GROWTH — NEVER MERELY "A LARGE RESPONSE": for
$y''+\omega_0^2y=F_0\cos(\omega t)$ off-resonance ($\omega\ne\omega_0$): $y_p=[F_0/(\omega_0^2-
\omega^2)]\cos(\omega t)$, a BOUNDED amplitude. AT resonance ($\omega=\omega_0$): the modification
rule gives $y_p=(F_0/2\omega_0)t\sin(\omega_0t)$ — amplitude growing LINEARLY WITHOUT BOUND as
$t\to\infty$. This unbounded growth, never a finite (however large) steady value, is what "pure
resonance" specifically means.

DAMPED RESONANCE PEAKS AT $\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}$ — STRICTLY BELOW $\omega_0$
FOR ANY $\gamma>0$, NEVER EQUAL: setting $dH/d\omega=0$ for
$H(\omega)=1/\sqrt{(\omega_0^2-\omega^2)^2+4\gamma^2\omega^2}$ gives
$\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}$ — genuinely LESS than $\omega_0$, never equal, for any
positive damping. For $y''+0.4y'+4y=2\cos\omega t$ ($\omega_0=2,\gamma=0.2$):
$\omega_{res}=\sqrt{4-0.08}\approx1.98$, distinctly below $\omega_0=2$; the practical approximation
$\omega_{res}\approx\omega_0$ holds only for lightly damped systems ($\gamma\ll\omega_0$), never
exactly.

BEATING IS A BOUNDED INTERFERENCE PATTERN — NEVER A FORM OF RESONANCE: for $\omega$ close to but
NOT equal to $\omega_0$ (undamped): $y=[2F_0/(\omega_0^2-\omega^2)]\sin((\omega_0-\omega)t/2)
\sin((\omega_0+\omega)t/2)$ — a "slow envelope" times a "fast carrier," with the envelope's maximum
amplitude FIXED at $2F_0/|\omega_0^2-\omega^2|$, never growing beyond it. This is a genuinely
different phenomenon (BOUNDED interference) from pure resonance's UNBOUNDED secular growth, though
both involve frequencies being close.

## Mental Models
- **"Pure resonance is amplitude growing without limit as time passes — not just a big number, a
  quantity with no ceiling."**
- **"Beating pulses within a fixed envelope; resonance breaks through any envelope entirely — two
  genuinely different fates for nearby frequencies."**

## Why Students Fail

### MC-1: RESONANCE-MEANS-INFINITE-AMPLITUDE
- **Surface form**: thinks resonance always produces infinite amplitude, not distinguishing pure
  resonance (genuinely $\to\infty$) from practical resonance ($c>0$, finite but large).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — pure resonance
  IS catastrophic, and "resonance is dangerous" is over-applied to the damped case without
  recognizing $c>0$ keeps the steady-state amplitude finite).
- **Repair**: re-verify $H(\omega_{res})=1/(2\gamma\sqrt{\omega_0^2-\gamma^2})$ is a FINITE (though
  potentially large) number for $\gamma>0$.

### MC-2: RESONANT-FREQUENCY-EQUALS-NATURAL-FREQUENCY
- **Surface form**: sets $\omega_{res}=\omega_0$ in all cases, missing
  $\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}<\omega_0$ for damped oscillators.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — $\omega_0$ is
  taught as "the" resonant frequency for the undamped case and applied to all cases without
  updating for damping).
- **Repair**: re-derive $\omega_{res}$ explicitly from $dH/d\omega=0$ for a specific damped
  example.

### MC-3: BEATING-IS-THE-SAME-AS-RESONANCE
- **Surface form**: calls the slow-envelope oscillation of beating a form of resonance.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "beating"
  and "resonance" both describe periodically-building oscillations, leading to conflation).
- **Repair**: re-verify beating's envelope amplitude is FIXED and bounded, contrasted with
  resonance's genuinely unbounded secular growth.

## Misconceptions

### MC-1: RESONANCE-MEANS-INFINITE-AMPLITUDE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: RESONANT-FREQUENCY-EQUALS-NATURAL-FREQUENCY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: BEATING-IS-THE-SAME-AS-RESONANCE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Pure resonance is a swing pushed exactly in time, forever gaining height — practical
  resonance is the same swing with friction, settling into a big but bounded arc — beating is two
  slightly-off-time pushers, creating a pulsing rhythm that never grows past its own ceiling."**
- **Anti-analogy**: a large but finite steady-state amplitude is NOT the same phenomenon as
  genuine unbounded growth — "big" and "infinite" are categorically different outcomes.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the finite $H(\omega_{res})$ computation for a specific
  damped system, contrasted with pure resonance's genuinely unbounded $t\sin(\omega_0t)$.
- **Demonstration 2 (targets MC-2)**: the explicit $\omega_{res}=\sqrt{\omega_0^2-2\gamma^2}$
  derivation, confirmed strictly less than $\omega_0$.
- **Demonstration 3 (targets MC-3)**: the beating envelope's fixed maximum amplitude, contrasted
  with pure resonance's unbounded growth.

## Discovery Questions
1. "Does resonance always produce infinite amplitude, or does damping keep the amplitude finite
   (though possibly large)?"
2. "Is the resonant frequency always exactly ω₀, or does it shift with damping?"
3. "Is beating a form of resonance, or a genuinely different, bounded phenomenon?"

## Teaching Sequence
1. **Representation shift**: pure resonance's secular growth versus beating's bounded envelope,
   working Demonstration 3, isolating MC-3.
2. **Pattern induction**: the damped amplitude response and resonant-frequency derivation, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: pure versus practical resonance's finite-versus-unbounded distinction,
   working Demonstration 1, isolating MC-1.
4. **Mastery gate**: require a correct pure-resonance secular-growth derivation, a correct damped
   resonant-frequency computation, and a correct distinction among pure resonance, practical
   resonance, and beating, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept resonance described as always producing infinite amplitude regardless of damping.
- Never accept the resonant frequency stated as exactly $\omega_0$ for a damped system.
- Never accept beating described as a form of resonance.

## Voice Teaching Notes
- Say "is that amplitude genuinely unbounded, or just large but finite?" whenever resonance is
  discussed.
- When ω_res is stated, ask "is that exactly ω₀, or has damping shifted it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the pure-resonance secular-growth solution
  for an undamped forced oscillator.
- **Rung 2 (application)**: learner correctly computes the damped resonant frequency and peak
  amplitude for a specific system.
- **Rung 3 (transfer)**: learner correctly analyzes an engineering scenario (e.g. bridge or radio
  circuit) distinguishing practical resonance's finite peak from pure resonance's catastrophic
  growth.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the finite peak amplitude for a damped system.
- If MC-2 recurs, re-derive $\omega_{res}$ from $dH/d\omega=0$.
- If MC-3 recurs, re-verify beating's fixed envelope amplitude.

## Memory Hooks
- "Pure resonance grows without bound — practical resonance is large but finite."
- "ω_res = √(ω₀²−2γ²) is always below ω₀ for damped systems — never equal."
- "Beating pulses within a fixed envelope — resonance breaks through it entirely."

## Transfer Connections
- `math.de.harmonic-oscillator` (already authored, this campaign, Batch 154): supplies the
  damping-regime classification and forced-response amplitude formula this concept's resonance
  analysis directly extends.

## Cross-Subject Connections
- Engineering: the Tacoma Narrows Bridge failure, MRI nuclear spin resonance, musical instrument
  resonance, radio circuit tuning.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.resonance.md`, reused by reference for
  its pure-resonance and beating derivations, its damped amplitude-response and resonant-frequency
  formulas, and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, analyzing stochastic resonance,
  optical cavity Q-factors, and KAM-theorem resonant tori.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.harmonic-oscillator`, unlocks none, cross_links none, advanced/analyze,
  mastery_threshold 0.8, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 155): authored. First entry this batch. Companion batch concept:
  `math.de.higher-order-ode`.
