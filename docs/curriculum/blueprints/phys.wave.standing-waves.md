# Teaching Blueprint — phys.wave.standing-waves

## Component 0 — Concept Identity

```yaml
concept_id: phys.wave.standing-waves
name: Standing Waves
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.interference
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.wave.beats
  - phys.opt.resonance-cavities
  - phys.mod.particle-in-a-box
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Pluck a guitar string and it doesn't vibrate randomly — it vibrates at specific frequencies determined by its length. Those frequencies are not arbitrary: they are exactly the frequencies for which the string can sustain a stable pattern of nodes and antinodes. This is standing waves: the result of two identical travelling waves going in opposite directions, interfering to produce a pattern that appears stationary.

**Conceptual arc:**
1. Origin of standing waves: a wave + its reflection. Two waves travelling in opposite directions: y₁ = A sin(kx − ωt), y₂ = A sin(kx + ωt). Sum: y = 2A sin(kx) cos(ωt) — separable in x and t.
2. Nodes: points where sin(kx) = 0 → kx = nπ → x = nλ/2. Displacement always zero.
3. Antinodes: points where |sin(kx)| = 1 → x = (2n+1)λ/4. Maximum displacement.
4. Boundary conditions:
   - Fixed end (string, closed pipe): node at the boundary.
   - Free end (open pipe, free string end): antinode at the boundary.
5. String fixed at both ends: L = nλ/2 → λ_n = 2L/n → f_n = nv/(2L) = nf₁ (harmonics: n = 1, 2, 3, …).
6. Pipe closed at both ends: same formula as string (both boundaries are nodes).
7. Pipe open at both ends: same harmonic series f_n = nv/(2L), antinodes at both ends.
8. Pipe closed at one end: L = (2n−1)λ/4 → f_n = (2n−1)v/(4L) — odd harmonics only (n = 1, 3, 5, …).
9. Resonance: standing waves at natural frequencies have large amplitude response — musical instruments exploit this.

**Closing synthesis:** Standing waves are not a special kind of wave — they are the interference pattern of two travelling waves. The mode structure (harmonic series) emerges entirely from boundary conditions: where the medium is held fixed or free determines which wavelengths fit. This is why a 30 cm guitar string vibrates at 440 Hz regardless of how hard you pluck it — the boundary conditions fix the allowed frequencies.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — string harmonics)

**Scenario:** A guitar string of length L = 0.65 m has wave speed v = 286 m/s (determined by tension and linear density). Find the fundamental frequency and first three overtones.

**Formula:** f_n = nv/(2L) for fixed-fixed string.

**Step 1 — Fundamental (n=1):**
f₁ = 1 × 286 / (2 × 0.65) = 286/1.30 = 220 Hz. (This is the A3 note.)

**Step 2 — Second harmonic (n=2):**
f₂ = 2 × 220 = 440 Hz. (A4 — one octave up.)

**Step 3 — Third harmonic (n=3):**
f₃ = 3 × 220 = 660 Hz. (E5.)

**Step 4 — Fourth harmonic (n=4):**
f₄ = 4 × 220 = 880 Hz. (A5 — two octaves up.)

**Pattern:** All harmonics present (n = 1, 2, 3, …). Timbre of a guitar string is the blend of these harmonics; the string's plucking point determines their relative amplitudes.

---

### WE-2 (Bridging — closed vs. open pipe)

**Scenario:** A pipe of length L = 0.85 m. Find the three lowest resonant frequencies for: (a) open at both ends, (b) closed at one end. Speed of sound = 340 m/s.

**(a) Open-open pipe:**
f_n = nv/(2L) (all harmonics, both ends antinodes).
f₁ = 340/(2 × 0.85) = 340/1.70 = 200 Hz.
f₂ = 400 Hz, f₃ = 600 Hz.

**(b) Closed-one-end pipe:**
f_n = (2n−1)v/(4L) (odd harmonics only, closed=node, open=antinode).
n=1: f₁ = v/(4L) = 340/(4 × 0.85) = 340/3.40 = 100 Hz.
n=2: f₃ = 3v/(4L) = 300 Hz.
n=3: f₅ = 5v/(4L) = 500 Hz.

**Comparison:** Closed pipe fundamental is half the open pipe fundamental (same L). Closed pipe has only odd harmonics — this gives it a different tonal quality (e.g., clarinet ≈ closed-ended at the reed; flute ≈ open at both ends).

---

### WE-3 (Abstract — node/antinode positions)

**Derive:** For a string of length L = 1.0 m vibrating at n = 3 (third harmonic), locate all nodes and antinodes.

**Third harmonic:** λ₃ = 2L/n = 2.0/3 = 0.667 m; k₃ = 2π/λ₃ = 3π rad/m.

**Nodes:** sin(k₃x) = 0 → k₃x = 0, π, 2π, 3π → x = 0, 1/3, 2/3, 1.0 m. (4 nodes including fixed ends.)

**Antinodes:** sin(k₃x) = ±1 → k₃x = π/2, 3π/2, 5π/2 → x = 1/6, 3/6 = 0.5, 5/6 m. (3 antinodes.)

**Pattern for n-th harmonic of fixed-fixed string:** n+1 nodes (at x = 0, L/n, 2L/n, …, L) and n antinodes.

**Standing wave equation at t = 0:** y(x, 0) = 2A sin(3πx). At x = 1/6: y = 2A sin(π/2) = 2A — maximum. At x = 1/3: y = 2A sin(π) = 0 — node. ✓

---

## Component 3 — Misconception Engine

### MC-STANDING-WAVE-IS-STATIONARY

**Trigger signal:** Student says "standing waves don't move — the medium is at rest."

**Conflict evidence [P28]:** "Look at the equation y = 2A sin(kx) cos(ωt). At an antinode (x = λ/4), what is the displacement at t = 0? At t = T/4? At t = T/2? Is the medium at rest at the antinode?"

*At t=0: y = 2A (max). At t=T/4: cos(ωt) = 0 → y = 0. At t=T/2: y = −2A. The antinode oscillates with maximum amplitude.*

**Bridge text [P30]:** "In a standing wave, the PATTERN is stationary — nodes and antinodes stay fixed in space. But the medium at each point is definitely moving (except at nodes, which never move). The wave is 'standing' because its nodal pattern doesn't travel, not because the medium is frozen."

**Replacement text [P31]:** "Standing wave = stationary interference pattern, not stationary medium. Every non-node point oscillates in SHM between +2A and −2A. What's fixed is the spatial envelope 2A|sin(kx)|; what oscillates is the time factor cos(ωt). Nodes stay at x = 0 forever; antinodes oscillate between ±2A at frequency f."

**Discrimination pairs [P33]:**
- "In a standing wave, which points have zero velocity at all times?" → Only the nodes (sin(kx) = 0 makes y = 0 regardless of t).
- "At t = T/8, is the antinode at maximum displacement?" → No — y = 2A cos(2π/8) = 2A cos(π/4) = 2A × 0.707 = √2 A. Maximum occurs only at t = 0, T, 2T, …

**s6_path:** "The word 'standing' describes the pattern in space, not the motion of the medium. Antinodes vibrate vigorously — they just vibrate up and down in place rather than travelling."

---

### MC-ALL-PIPES-SAME-HARMONICS

**Trigger signal:** Student applies f_n = nv/(2L) to a closed-end pipe, getting even harmonics that don't exist.

**Conflict evidence [P28]:** "Blow across a test tube (closed at bottom, open at top) and measure the resonant frequencies with a microphone. Compare to the formula f_n = nv/(2L). Do you get all harmonics, or only odd ones? Why would the boundary condition at the bottom matter?"

**Bridge text [P30]:** "Boundary conditions set which wavelengths fit. A closed end forces a node there — the medium can't move. An open end forces an antinode — the medium has maximum freedom to move. These constraints filter which harmonics are allowed."

**Replacement text [P31]:** "Open-open or fixed-fixed: all harmonics (n = 1, 2, 3, …), f_n = nv/(2L). Closed-one-end: only odd harmonics (n = 1, 3, 5, …), f_n = (2n−1)v/(4L). The closed end 'reflects' in a way that only fits λ = 4L, 4L/3, 4L/5, … — half-wavelengths can't fit because the pattern demands a node at the closed end AND an antinode at the open end."

**Discrimination pairs [P33]:**
- "A 50 cm pipe open at both ends resonates at 340 Hz. What are the next two resonant frequencies?" → f₁ = 340 Hz; f₂ = 680 Hz, f₃ = 1020 Hz (all harmonics).
- "Same pipe, closed at one end, same fundamental. What are the next two?" → f₁ = 170 Hz (recalculate: v/(4L) = 340/2 = 170 Hz); f₃ = 510 Hz, f₅ = 850 Hz (odd only).

**s6_path:** "Two rules to remember: open ↔ antinode; closed (or fixed) ↔ node. Draw the picture for each case and the allowed harmonics follow automatically."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq check):** Two identical waves travelling in opposite directions are superimposed. Is the result a standing or travelling wave?
*Standing wave — interference of ± directions creates the sin(kx)cos(ωt) form.*

**P4-b (node count):** A 1.2 m string vibrates at its 4th harmonic. How many nodes are there (including fixed ends)?
*n+1 = 5 nodes.*

**P4-c (frequency):** A flute (open at both ends) is 0.60 m long. Find its fundamental frequency. Speed of sound = 340 m/s.
*f₁ = v/(2L) = 340/1.2 ≈ 283 Hz.*

**P4-d (closed-end pipe):** A clarinet pipe (closed one end) is 0.60 m long. Find its fundamental and state the next resonant frequency.
*f₁ = v/(4L) = 340/2.4 ≈ 142 Hz. Next: f₃ = 3 × 142 = 426 Hz (odd harmonics only).*

**P4-e (node position):** For a 2nd harmonic standing wave on a 0.8 m string, where are all the nodes?
*λ₂ = 2L/2 = 0.8 m; nodes at x = 0, 0.4, 0.8 m — three nodes (n+1 = 3).*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "When you pluck a guitar string at the 12th fret (midpoint), it plays the octave above open string. When you pluck it open, it plays the fundamental. What does this tell you about the relationship between string length and pitch?"

*Halving the length doubles the frequency.*

**Turn 2 [P06 concrete anchor]:** "I produce a standing wave in a slinky by having two students shake both ends at the right frequency. What do you notice about points in the middle that never move, versus points that swing widely?"

*Nodes stay fixed; antinodes swing. Standing pattern.*

**Turn 3 [P28 conflict — MC-STANDING-WAVE-IS-STATIONARY]:** "If a standing wave means everything is stationary, what are the antinodes doing? Compute y at the antinode for t = 0, T/4, T/2."

*y oscillates between +2A and −2A. Medium moves; pattern is stationary.*

**Turn 4 [P30 bridge]:** "So 'standing' describes the nodal pattern, not the medium velocity. Now: for a fixed-fixed string of length L, what wavelengths can fit? Sketch n=1, n=2, n=3."

*λ_n = 2L/n; sketch shows 1, 2, 3 half-wavelengths fitting.*

**Turn 5 [P51 check-in]:** "From the sketch, what is the rule for where nodes fall in the n-th harmonic?"

*Nodes at x = 0, L/n, 2L/n, …, L.*

**Turn 6 [P52 narrow — closed vs. open pipe]:** "A pipe closed at one end: can a 2nd harmonic exist? Draw the pattern required — does it satisfy the boundary conditions?"

*Node at closed end, antinode at open end. Second harmonic needs 2 half-waves = full wave → would require node at the open end too. That violates the open-end condition. So: no even harmonics.*

**Turn 7 [P33 discrimination]:** "Flute (open-open): harmonics 1, 2, 3, 4. Clarinet (closed-open): harmonics 1, 3, 5, 7. If both have the same L, what is the frequency ratio of their fundamentals?"

*f_flute = v/2L; f_clarinet = v/4L. Ratio = 2:1. Clarinet fundamental is an octave lower.*

**Turn 8 [P62 retrieval seed]:** "Derive f₁ for a closed-open pipe of length 0.34 m. Show your boundary condition reasoning."

*Closed: node. Open: antinode. λ/4 = L → λ = 4L = 1.36 m. f = v/λ = 340/1.36 = 250 Hz.*

**Turn 9 [P36 mastery probe]:** "A string (v = 400 m/s, L = 0.5 m) vibrates at its 5th harmonic. Find: f₅, the number of nodes, and the positions of all antinodes."

*f₅ = 5 × 400/(2 × 0.5) = 2000 Hz. Nodes: n+1 = 6 at x = 0, 0.1, 0.2, 0.3, 0.4, 0.5 m. Antinodes at x = 0.05, 0.15, 0.25, 0.35, 0.45 m (5 antinodes, at midpoints).*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: guitar 12th-fret observation] → [P06 anchor: slinky demo nodes/antinodes]
→ [MC-STANDING-WAVE-IS-STATIONARY: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: guitar string harmonic series]
→ [P51 check-in]
→ [P52 narrow: fixed-fixed vs. closed-open boundary conditions]
→ [MC-ALL-PIPES-SAME-HARMONICS: P28 → P30 → P31 → P33]
→ [WE-2: open vs. closed pipe comparison]
→ [P62 retrieval seed: closed-open pipe derivation]
→ [WE-3: node/antinode positions for n=3]
→ [P36 mastery probe: 5th harmonic string — frequency + positions]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the slinky or guitar visual only. Introduce "node = never moves, antinode = swings widest" as concrete vocabulary. Draw only n=1 and n=2 on fixed-fixed string before any formula. Skip WE-3 derivation.

**S1 (knows formula, no physical picture):** Ask them to predict where the nodes of the 3rd harmonic are WITHOUT the formula — force physical reasoning from the "two travelling waves" origin. The formula should emerge from their sketch, not be recalled independently.

**S4 (prereq gap — interference weak):** Return to phys.wave.interference. The standing-wave equation y = 2A sin(kx)cos(ωt) derives directly from y₁ + y₂ with opposite-direction waves — that derivation is inaccessible without superposition. Secure P4-a before proceeding.

**S6 (math anxiety):** Emphasize counting: harmonics for fixed-fixed are the whole numbers; for closed-open, the odd numbers. One diagram per case. Calculator for all numerical probes.

**S7 (overconfident):** Lead with: "For a pipe closed at one end and open at the other, can the fundamental wavelength be equal to L? To 2L? To 4L? Justify from boundary conditions." Forces genuine reasoning. Then assign WE-3 as the first worked problem (most abstract).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-b (node count) + P4-c (flute frequency)
  - offset_days: 4
    format: P4-d (clarinet harmonics) — tests closed-end odd-harmonic rule
  - offset_days: 14
    format: P4-e (node positions for 2nd harmonic) + "find all harmonics below 1 kHz for a 0.34 m pipe closed at one end"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.wave.standing-waves ✓
V-2  prerequisites listed in KG: phys.wave.interference ✓
V-3  bloom verb matches level (apply): "find … locate … apply" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 4: "C (anchor; difficulty 4 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: beats, optical cavities, particle-in-a-box ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=4 ✓
V-18 domain "waves" matches concept_id prefix phys.wave ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
