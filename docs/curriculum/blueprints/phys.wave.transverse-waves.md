# Teaching Blueprint — phys.wave.transverse-waves

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.transverse-waves
name: Transverse Waves
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.wave.wave-properties
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.longitudinal-waves
  - phys.wave.wave-speed
  - phys.opt.nature-of-light
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-TRANSVERSE-PARTICLES-MOVE-FORWARD
- **Trigger signal:** Student draws transverse wave particles moving in the direction of wave propagation, or confuses the wave velocity with particle velocity.
- **Conflict evidence [P28]:** "In a transverse wave, the medium particles oscillate perpendicular to the wave's travel direction — at 90° to it. Flick one end of a rope sideways: a wave pattern runs along the rope (horizontally), but each section of rope only moves up and down (vertically). Film a single point on the rope — it bobs up and down between +A and −A; it does not move horizontally along the rope. Wave speed v = fλ gives how fast the pattern travels; particle speed is maximum at the equilibrium point and is v_particle_max = Aω = 2πfA (a completely different quantity, perpendicular to v)."
- **Bridge text [P30]:** "Wave velocity (v = fλ) is the speed of the disturbance pattern along the propagation direction. Particle velocity (v_p = dy/dt for each medium particle) is perpendicular to the propagation direction in a transverse wave. These are different vectors in different directions."
- **Replacement text [P31]:** "Transverse wave: particle oscillation direction ⊥ wave propagation direction. Particle displacement is perpendicular to the wave's travel. Draw them at right angles — wave arrow horizontal, particle arrow vertical."
- **Discrimination pairs [P33]:**
  - Wave propagation: horizontal (→) at speed v = fλ ✓
  - Particle motion at crest: momentarily at rest (instantaneous velocity = 0); about to move downward ✓
  - Particle motion at equilibrium crossing: maximum speed (upward or downward), perpendicular to wave direction ✓
- **s6_path:** "Shake a rope end up and down — your hand moves up and down, but the wave runs along the rope. Two perpendicular directions. Simple."

---

### MC-AMPLITUDE-IS-WAVELENGTH
- **Trigger signal:** Student draws the amplitude as the horizontal distance between two crests, or confuses A and λ.
- **Conflict evidence [P28]:** "Amplitude A is the maximum displacement from the equilibrium (rest) position — it is a vertical measurement on a displacement-distance graph. Wavelength λ is the horizontal distance between two adjacent points in phase (e.g., crest to crest). A graph of displacement y vs. position x: A is the height of the crest above the x-axis; λ is the horizontal distance from one crest to the next. They are measured in different directions on the same graph."
- **Bridge text [P30]:** "On a y–x wave graph: look vertically from equilibrium (y=0) to the crest → that's A. Look horizontally from one crest to the next crest → that's λ. Both have units of metres, which is why they're confused — but they measure perpendicular things."
- **Replacement text [P31]:** "A = max vertical displacement from equilibrium (height of wave). λ = horizontal distance for one complete cycle (crest to crest). On a y–x graph: A is vertical; λ is horizontal."
- **Discrimination pairs [P33]:**
  - Crest at y = 5 cm, trough at y = −5 cm: A = 5 cm (not 10 cm — from equilibrium to crest) ✓
  - Crest at x = 1 m, next crest at x = 3 m: λ = 2 m (horizontal) ✓
- **s6_path:** "Two different rulers: one pointing up (amplitude), one pointing sideways (wavelength). Same graph, different directions."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Wave vocabulary**
Prompt: "A wave on a rope has crests every 0.4 m and passes a fixed point 5 times per second. What is: (a) the wavelength, (b) the frequency, (c) the wave speed?"
- Pass: λ = 0.4 m; f = 5 Hz; v = fλ = 2 m/s.
- Fail → [P52]: "These are the core wave vocabulary from phys.wave.wave-properties: λ = crest spacing, f = crests per second, v = fλ. Let's confirm those before examining particle motion in transverse waves." Route to wave-properties.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the transverse rope wave**

> Lay a long rope on the floor. Hold one end; ask a partner to hold the other end taut. Shake your end up and down at a steady rhythm. A transverse wave travels along the rope. Mark one spot on the rope with tape: watch the tape — it only moves up and down (transverse to the rope's length). The wave pattern travels horizontally; the marked spot moves vertically. Pull back: two perpendicular motions from one action.

Second anchor: a sine wave graphed on paper — x-axis is position along the rope, y-axis is displacement. The wave is frozen at one instant. Read off: A from the y-axis, λ from the x-axis. These are perpendicular lengths on the same diagram.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Definition and Geometry [C]**

A transverse wave: particle displacement is perpendicular to the direction of wave propagation.

Snapshot (displacement–position graph at one instant):
```
y(x) = A sin(2πx/λ)
```

Key features:
- Crest: y = +A (maximum positive displacement)
- Trough: y = −A (maximum negative displacement)
- Node/equilibrium crossings: y = 0
- Wavelength λ: horizontal distance, crest to crest (or trough to trough, or any two identical phase points)
- Amplitude A: vertical distance from equilibrium to crest

**TA-2 — Displacement–Time Graph [C→P]**

For a fixed position x₀, the displacement varies with time:
```
y(t) = A sin(2πft)
```

This gives the time-history of one particle — it oscillates with period T = 1/f.

Distinguish the two graphs:
- y–x graph (snapshot): shows wave shape at one instant → read λ from horizontal axis
- y–t graph (time history of one point): shows particle oscillation → read T from horizontal axis

Common error: reading T from the y–x graph or λ from the y–t graph. The x-axis labels tell you which graph you have.

**TA-3 — Particle Velocity in a Transverse Wave [C→P]**

The particle at position x oscillates transversely. At the crest or trough: displacement is maximum, particle velocity = 0 (momentarily at rest). At y = 0 (equilibrium crossing): displacement = 0, particle velocity is maximum.

Maximum particle speed: v_p,max = Aω = 2πfA (not the wave speed v!)

Wave speed v = fλ (speed of pattern propagation — horizontal).
Particle speed v_p: perpendicular to wave direction; varies sinusoidally in time.

**TA-4 — Polarisation of Transverse Waves [P]**

Because transverse wave particles can oscillate in any direction perpendicular to propagation, transverse waves can be polarised. Polarisation: restricting the oscillation direction to a single plane.

Example: rope wave — vertical shake → vertical plane polarisation; horizontal shake → horizontal plane.

Light is a transverse electromagnetic wave and can be polarised by a polaroid filter (explored in phys.opt.polarization). Longitudinal waves (sound) cannot be polarised — the only oscillation direction is along the propagation axis.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — reading wave graphs)**

> From the y–x graph: crest at y = 8 cm, trough at y = −8 cm; adjacent crests at x = 0.6 m and x = 1.4 m. Find A and λ.

```
A = 8 cm = 0.08 m  (from equilibrium to crest)
λ = 1.4 − 0.6 = 0.8 m  (crest-to-crest distance)
```

**WE-2 (Intermediate — particle velocity)**

> A transverse wave on a string has amplitude 3 cm and frequency 80 Hz. Find: (a) the maximum particle speed, (b) the wave speed if λ = 0.5 m.

```
(a) v_p,max = 2πfA = 2π × 80 × 0.03 = 15.1 m/s

(b) v_wave = fλ = 80 × 0.5 = 40 m/s
```

Note: particle max speed (15.1 m/s perpendicular) ≠ wave speed (40 m/s horizontal).

**WE-3 (Advanced — two-graph interpretation)**

> A y–t graph of one point on a string shows oscillations with period T = 0.04 s and amplitude 5 cm. The wave speed is 12 m/s. Find: (a) the frequency, (b) the wavelength, (c) the maximum particle speed, (d) draw what the y–x snapshot graph looks like at t = 0 if the particle at x = 0 is at maximum positive displacement.

```
(a) f = 1/T = 1/0.04 = 25 Hz
(b) λ = v/f = 12/25 = 0.48 m
(c) v_p,max = 2πfA = 2π × 25 × 0.05 = 7.85 m/s
(d) y-x graph: crest (y = +5 cm) at x = 0, trough at x = λ/2 = 0.24 m,
    next crest at x = λ = 0.48 m; sinusoidal pattern.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Graph reading: y–x**
"From a displacement–position graph at one instant: the wave oscillates between y = +4 cm and y = −4 cm; crests are spaced 1.2 m apart. If the wave travels at 18 m/s, find: A, λ, f, T."

*Target:* A = 4 cm = 0.04 m; λ = 1.2 m; f = v/λ = 18/1.2 = 15 Hz; T = 1/15 = 0.067 s.

**MP-2 [P36] — Graph reading: y–t**
"A y–t graph of a particle shows amplitude 2 cm and period 0.025 s. The wave speed is 40 m/s. Find: f, λ, v_p,max."

*Target:* f = 1/0.025 = 40 Hz; λ = v/f = 40/40 = 1 m; v_p,max = 2π×40×0.02 = 5.03 m/s.

**MP-3 [P36] — Particle direction**
"A transverse wave travels in the +x direction. At one instant, a particle at x = 0.3 m is at y = 0 and moving in the +y direction. Sketch the wave shape at that instant and mark the position x = 0.3 m."

*Target:* The particle is at equilibrium crossing and moving upward → the wave has a rising zero crossing at x = 0.3 m. The crest is λ/4 behind (at smaller x) and the trough is λ/4 ahead (at larger x) in the direction of propagation. (For a rightward-travelling wave using y = A sin(kx − ωt), a particle at y=0 moving upward means the local slope dy/dx > 0.)

**MP-4 [P36] — Polarisation discrimination**
"Which of these can be polarised: (a) sound waves in air, (b) light from a lamp, (c) ripples on water, (d) radio waves from an aerial? Explain."

*Target:* (a) No — sound is longitudinal, cannot be polarised. (b) Yes — light is transverse EM wave; unpolarised lamp light can be polarised by a filter. (c) Yes — water surface ripples are transverse (up/down oscillation ⊥ propagation). (d) Yes — radio waves are transverse EM waves; aerials produce specific polarisation (typically vertical or horizontal linear polarisation).

**MP-5 [P36] — Synthesis: compare wave speed and particle speed**
"A wave with A = 10 cm, f = 5 Hz, λ = 2 m. (a) Compare the wave speed and maximum particle speed. (b) For what amplitude would the maximum particle speed equal the wave speed?"

*Target:* (a) v_wave = fλ = 5×2 = 10 m/s; v_p,max = 2πfA = 2π×5×0.10 = 3.14 m/s. Wave travels faster than particles. (b) v_p,max = v_wave → 2πfA = fλ → A = λ/(2π) = 2/(2π) = 0.318 m = 31.8 cm. (This is a very large amplitude — for most real waves A ≪ λ.)

---

## Component 7 — Session Architecture

```
[P01] Session open — rope wave demonstration
  ↓
[P41] PD-1 (v=fλ; λ; f from prior wave-properties)
  ↓ PASS
[P06] Anchor: transverse rope wave; tape-marked point moves only vertically
  ↓
TA-1: Definition; y–x snapshot graph; A and λ on graph [C]
  ↓
[P28] Conflict: "amplitude = horizontal wavelength" → MC-AMPLITUDE-IS-WAVELENGTH
  ↓
WE-1: Reading A and λ from y–x graph
  ↓
[P51] Check-in MP-1 (all four quantities from y–x graph)
  ↓ monitor
TA-2: y–t graph (one particle's time history); distinguish from y–x [C→P]
  ↓
[P28] Conflict: "particles move forward" → MC-TRANSVERSE-PARTICLES-MOVE-FORWARD
  ↓
TA-3: Particle velocity vs. wave speed [C→P]
  ↓
WE-2 → WE-3 (particle speed; two-graph synthesis)
  ↓
TA-4: Polarisation of transverse waves [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A transverse wave has A=5 cm, f=20 Hz, v=8 m/s. What is the max particle speed? What is λ?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — rope + tape marker before any graph; S1: can read v=fλ but confuses A and λ on graph → MC-AMPLITUDE-IS-WAVELENGTH; S4: PD-1 fail → wave-properties; S6: [F] — "Two perpendicular things: wave travels horizontally, particles move vertically. Two different speeds. Done."; S7: open with MP-5 (when does particle speed equal wave speed? — requires synthesis of both formulas).

---

## Component 8 — Adaptive Flags

- **y–x vs. y–t graph confusion**: the most common error. Always label the horizontal axis explicitly: "position x (m)" or "time t (s)". The graphs look identical in shape — only the axis label distinguishes them. Drill this with MP-2.
- **Crest particle velocity = 0**: counter-intuitive. At the crest, the particle is momentarily at rest (it's at maximum displacement, about to reverse direction). Students expect maximum speed at the crest. Use SHM analogy: a pendulum at its highest point is momentarily at rest.
- **Polarisation scope**: full polarisation treatment (Brewster's angle, Malus's law) belongs in phys.opt.polarization. Here: establish that transverse waves can be polarised; longitudinal waves cannot.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.transverse-waves |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.wave-properties ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-TRANSVERSE-PARTICLES-MOVE-FORWARD, MC-AMPLITUDE-IS-WAVELENGTH |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (v=fλ; λ; f) |
| V-10 | Concrete anchor present [P06] | PASS — transverse rope wave with tape marker |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — y–x vs y–t confusion, crest velocity = 0, polarisation scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
