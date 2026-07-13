# phys.wave.superposition — Superposition Principle

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.wave.superposition` |
| **Display name** | Superposition Principle |
| **KG requires** | `phys.wave.wave-speed` |
| **KG unlocks** | `phys.wave.interference` |
| **Difficulty** | proficient |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 4 |
| **KG description** | The superposition principle states that the resultant displacement is the algebraic sum of displacements of individual waves. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

Two ripples on a pond can cross right through each other. While they overlap, the water surface is the sum of both patterns — higher where both push up, lower where one pushes up and the other pushes down. After they pass, both ripples continue unchanged. They passed through each other as if the other wasn't there. That is superposition: waves *add* while they overlap, then *continue independently* afterward.

### Stage 2 — Quantitative entry

For linear media (most situations in introductory physics), the **principle of superposition** states:

If y₁(x,t) and y₂(x,t) are valid solutions to the wave equation, then y(x,t) = y₁(x,t) + y₂(x,t) is also a valid solution.

In practice: at any point in space and any instant in time, the resultant displacement is the **algebraic (signed) sum** of the individual displacements:

**y_total = y₁ + y₂ + y₃ + …**

This is *algebraic* addition — positive displacements up, negative displacements down — not magnitude addition. Two waves of equal amplitude A meeting in phase: y_total = 2A. Meeting in antiphase: y_total = 0.

### Stage 3 — Constructive and destructive interference

**Constructive interference**: crests align with crests (and troughs with troughs). Phase difference Δφ = 0, 2π, 4π, … (integer multiples of 2π) → resultant amplitude = A₁ + A₂.

**Destructive interference**: crests align with troughs. Δφ = π, 3π, 5π, … (odd multiples of π) → resultant amplitude = |A₁ − A₂|.

For two waves of equal amplitude A and frequency, at a point where path difference is Δ:
- Δ = mλ (m integer): constructive, amplitude = 2A, intensity = 4I₀
- Δ = (m + ½)λ: destructive, amplitude = 0, intensity = 0

**Important**: superposition is about *amplitude* (displacement). Intensity ∝ amplitude² — so constructive interference does not "create" energy; it redistributes it (bright fringes compensated by dark fringes in the overall pattern).

**Standing waves** arise from superposition of two identical waves travelling in opposite directions:

y₁ = A sin(kx − ωt), y₂ = A sin(kx + ωt)  
y = y₁ + y₂ = 2A sin(kx) cos(ωt)

Nodes (2A sin(kx) = 0) and antinodes (sin(kx) = ±1) are fixed in space — no net energy transport.

### Stage 4 — Linearity and its limits

Superposition holds when the wave equation is *linear* — when doubling the source amplitude doubles the displacement everywhere. This is satisfied when the medium responds proportionally: small-amplitude waves in strings, sound at conversational levels, light in transparent media, electromagnetic waves in vacuum.

Non-linear media break superposition: shock waves (very loud sound, Mach >1), large-amplitude water waves (breaking surf), laser-field effects in nonlinear crystals. Recognising the linearity condition is essential before applying superposition.

---

## 3. Why Beginners Fail

1. **Magnitude addition** — learners add absolute values instead of signed values. Two equal waves in antiphase give |A| + |A| = 2A (wrong) instead of A + (−A) = 0 (correct). This error blocks all destructive-interference problems.
2. **Permanent combination** — learners think that when two waves superpose, they "merge into one" permanently. After seeing ripples cross on a pond, they think both ripples should change direction or amplitude. The fact that waves emerge unchanged is not intuitive.
3. **Intensity = amplitude** — learners treat constructive interference as "doubling the light" (intensity × 2). The correct result is amplitude doubles → intensity quadruples (I ∝ A²). Dark fringes compensate: average intensity is conserved.
4. **Energy creation** — at a bright fringe (destructive: I = 4I₀), learners think energy has been created. The compensating dark fringe (I = 0) is overlooked. Conservation of energy in the total pattern is non-obvious without integrating across the full interference pattern.

---

## 4. Misconception Library

### M1 — "Adding waves means adding their magnitudes"

**Probe**: "A crest of amplitude +3 cm overlaps with a trough of amplitude −3 cm. What is the displacement at that point?"  
**Characteristic phrase**: "6 cm — the amplitudes add up."  
**What's wrong**: Displacement is a signed quantity. The algebraic sum is +3 + (−3) = 0 cm. The waves momentarily cancel.  
**Recovery**: Show a graph with explicit labels: y₁ = +3 cm (up), y₂ = −3 cm (down). y_total = y₁ + y₂ = 0. Demonstrate physically with two pulses on a slinky approaching from opposite ends of the slinky, one upward and one downward.

### M2 — "Waves that superpose merge permanently"

**Probe**: "Two water wave pulses travel toward each other, meet, and then... what happens to each pulse after they overlap?"  
**Characteristic phrase**: "They combine into one bigger wave" or "they cancel each other out and disappear."  
**What's wrong**: Waves pass through each other in linear media. After the overlap, each wave continues with its original amplitude, speed, and direction. The superposition is temporary — the medium's restoring forces re-separate the waves.  
**Recovery**: Slow-motion video of two pulses on a rope or slinky. Observe: overlap (sum visible), then both emerge on the other side. Stress: "each wave continues independently — they borrowed the medium temporarily."

### M3 — "Constructive interference doubles the intensity"

**Probe**: "Two identical light sources each have intensity I₀. At a constructive interference maximum, the intensity is ___."  
**Characteristic phrase**: "2I₀ — you're adding two lights together."  
**What's wrong**: At a maximum, amplitudes add: A_total = 2A → I_total = (2A)² / (A²) × I₀ = 4I₀. The intensity is four times, not twice.  
**Recovery**: I ∝ A². If A doubles, I = (2A)² = 4A². Compensating: at a dark fringe, I = 0. Average: (4I₀ + 0)/2 = 2I₀ — same as without interference (energy conserved).

### M4 — "Superposition applies to all waves in any medium"

**Probe**: "Does the superposition principle apply to a tsunami (large-amplitude ocean wave) and a normal wave?"  
**Characteristic phrase**: "Yes — all waves superpose."  
**What's wrong**: Superposition requires linearity. Large-amplitude waves in water are governed by non-linear equations — the medium's response (restoring force per displacement) is not proportional. A tsunami can break, steepen, and interact non-linearly with smaller waves.  
**Recovery**: State the linearity condition: the medium's response must be proportional to displacement. For small amplitudes, this holds; for large amplitudes, it breaks down. In nonlinear media, new frequencies are generated (harmonics), energy is redistributed in frequency-space, and the simple amplitude-addition rule fails.

---

## 5. Explanation Library

### Explanation A — Algebraic displacement addition

At any point x and time t, the medium can only be in one physical state (one displacement y). If wave 1 alone would produce y₁ and wave 2 alone would produce y₂, then with both present the medium is simultaneously influenced by both — and the restoring force acts on the total deviation from equilibrium. In a linear medium, restoring force ∝ displacement → both contributions add independently → y = y₁ + y₂. This is not a law imposed from outside; it is a consequence of linearity.

### Explanation B — Standing waves derived from superposition

Two sinusoidal waves, same A, k, ω, opposite directions:

y₁ = A sin(kx − ωt)  
y₂ = A sin(kx + ωt)  

Use sum-to-product: sin P + sin Q = 2 sin((P+Q)/2) cos((P−Q)/2):

y = 2A sin(kx) cos(ωt)

This factors into a *space part* [2A sin(kx)] and a *time part* [cos(ωt)]. The spatial amplitude pattern (2A sin(kx)) is *fixed* — nodes at kx = nπ → x = nλ/2, antinodes midway. All points oscillate in phase (or antiphase). No energy transport along x. Standing waves are superposition made visible.

### Explanation C — Phasor (vector) addition for sinusoidal waves

When two sinusoidal waves have the same frequency but different phases, represent each as a rotating phasor (vector of length A, angle = phase). The resultant amplitude and phase are found by vector addition of phasors. This method extends naturally to multiple sources and underpins the double-slit analysis.

---

## 6. Analogy Library

### Primary analogy — Two conversations in one room

Two people are talking simultaneously. At any microphone, the membrane's displacement is the algebraic sum of the pressure waves from both voices. If both happen to push the membrane in the same direction at the same instant, the displacement is large (constructive). If they oppose, they partly cancel (destructive). After both stop, the room is silent — neither conversation "consumed" the other. The analogy works because sound in air is a linear medium at conversational volumes.

**Breaking point**: Voices have very different frequencies, so constructive/destructive events are fleeting and not periodic. The analogy does not naturally lead to steady interference fringes (which require fixed frequency and fixed phase relationship — coherence). Two voices are not coherent sources. Use this analogy only for the transient-superposition concept, not for sustained interference patterns.

### Anti-analogy — "Waves mix like paint"

Mixing red and blue paint gives purple — irreversible, both original colours are gone. Waves superposing is the *opposite*: after superposition, each wave re-emerges with original colour (frequency), direction, and amplitude. "Mixing" implies permanence; superposition is temporary and reversible. Never use the paint analogy for wave superposition.

---

## 7. Demonstration Library

### Demo A — Slinky pulse superposition

**Setup**: Two students, one at each end of a stretched slinky. Each sends a single transverse pulse — one upward (positive), one downward (negative).  
**Observation**: The pulses travel toward each other. When they meet, the displacement appears to briefly cancel (if equal amplitudes) or show a smaller net displacement. Each pulse then continues to the other end unchanged.  
**Teaching target**: Demonstrates both superposition (cancellation at overlap) and the independence property (pulses re-emerge). Can also demonstrate constructive superposition with both pulses in the same direction (crest + crest = double height briefly).

### Demo B — Ripple tank interference pattern

**Setup**: Ripple tank with two point sources at the same frequency, separated by a fixed distance d.  
**Observation**: The surface shows a stable pattern of bright stripes (constructive, |Δ| = mλ) and flat regions (destructive, |Δ| = (m+½)λ), radiating outward between the sources.  
**Teaching target**: Constructive and destructive interference are geometrically determined by path difference. The pattern is stable because the sources are coherent (same frequency, fixed phase). Establish the path-difference criterion visually before introducing the formula.

### Demo C — Standing wave on a string (Melde's experiment)

**Setup**: String stretched between a vibrator (or driven at one end) and a fixed wall. Adjust frequency until a standing wave appears.  
**Observation**: Nodes (zero displacement) and antinodes (maximum displacement) are visible simultaneously. Higher frequencies produce more nodes (more half-wavelengths fit in the string's length).  
**Teaching target**: Standing waves are the superposition of incident and reflected waves. The boundary condition (node at fixed end) determines which frequencies are allowed (resonant frequencies). The spatial amplitude pattern [sin(kx)] is the superposition result made permanent by reflection.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *start with the phenomenon, derive the principle*

**Why inductive here**: The principle "y_total = y₁ + y₂" sounds trivially obvious once stated — the insight is that it is NOT obvious, and that it leads to phenomena (cancellation, standing waves) that violate naive intuition. Starting from the phenomenon (two pulses cancel mid-slinky, then re-emerge) makes the principle worth having. A direct-instruction start ("the resultant displacement is the algebraic sum...") gives learners the statement without the puzzle it resolves.

**Opening question**: "If I send two waves toward the same point, and each wave alone would displace the medium by 5 cm — what is the displacement when both are present simultaneously?"

**Sequence**:
1. Most students say "10 cm." Show a slinky demo where two equal pulses — one up, one down — meet in the middle. The displacement goes to zero. Pause: "Where did the energy go?"
2. Both pulses re-emerge the other side, unchanged. "The energy was still there — it was split between kinetic and potential energy at the zero-crossing instant. Superposition doesn't destroy energy."
3. Formalize: y_total = y₁ + y₂, algebraic. Practice on paper: two sinusoidal waves at the same point, in phase (add); in antiphase (cancel); 90° out of phase (partial cancellation).
4. Predict the standing wave pattern: add y₁ = A sin(kx − ωt) and y₂ = A sin(kx + ωt) algebraically. Students should arrive at 2A sin(kx)cos(ωt).
5. Set up Melde's experiment. Identify nodes (where sin(kx) = 0) and antinodes. Verify formula predictions against the visible pattern.
6. Closure: "Superposition is why a piano chord sounds rich, why noise-cancelling headphones work, why your microwave has hot spots — and why quantum mechanics works the way it does."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner adds magnitudes | Slinky pulse demo (opposite pulses cancel). Stress: "down is negative displacement." |
| Learner thinks waves merge permanently | Replay slinky demo, watching the pulses re-emerge. Ask: "Which pulse is which after the crossing?" |
| Learner says constructive doubles intensity | Write I = kA². If A → 2A, I → 4kA² = 4I. Show the compensating dark fringe. |
| Learner cannot derive standing-wave formula | Walk through sin P + sin Q identity step by step. Factor out the spatial and temporal parts explicitly. |
| Learner asks "why does superposition work?" | This follows from the linearity of the wave equation. If F ∝ y (linear restoring force), then both waves drive the medium independently and their effects add. Non-linear restoring force → superposition fails. |

---

## 10. Voice Teaching

### Opening
"Two ripples on a pond — watch what happens when they meet. The water rises extra high where both crests coincide, drops extra low where both troughs coincide, and for a moment goes flat where a crest meets a trough. Then both ripples keep going exactly as before. This is superposition."

### Core rule
"The rule is this: at every point and every instant, the total displacement is the algebraic sum of the individual displacements. Algebraic — signed. A crest of +5 cm and a trough of −5 cm give zero, not 10. Two crests of +5 cm each give +10 cm. This is the only rule you need."

### Standing wave teaching
"Take two identical waves travelling toward each other on a string. Use our rule — add them at every point. You get 2A times sine of kx, times cosine of ωt. The kx part tells you where the nodes are — they don't move. The ωt part tells you how the whole thing oscillates in time. That is a standing wave: both waves combined, producing a fixed spatial pattern. No energy moves along the string."

### Misconception interrupt
"Here is the trap with intensity: if amplitude doubles, intensity does NOT double. Intensity is proportional to amplitude squared. Double the amplitude → four times the intensity. But energy is still conserved — what you gain at the bright fringes, you give up at the dark fringes."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Apply the algebraic-sum rule to compute the resultant displacement at a point given the individual displacements (with correct signs).
2. Identify whether a given path difference (expressed in λ) produces constructive or destructive interference.
3. Derive the standing-wave formula from the superposition of two oppositely-travelling sine waves.
4. Identify nodes and antinodes on a standing-wave diagram and state the node spacing (λ/2).
5. State the linearity condition for superposition to hold.

### Formative golden probe

> "Two waves travel in opposite directions on a string: y₁ = (4 cm) sin(2πx/0.5 − 20πt) and y₂ = (4 cm) sin(2πx/0.5 + 20πt). (a) Write the expression for the superposed wave. (b) What is the node spacing? (c) At t = 0.025 s, what is the displacement at x = 0.125 m?"

*Answers*: (a) y = (8 cm) sin(4πx) cos(20πt). (b) Nodes where sin(4πx) = 0 → 4πx = nπ → x = n/4 m → spacing = 0.25 m = λ/2 (λ = 0.5 m). (c) sin(4π × 0.125) = sin(π/2) = 1; cos(20π × 0.025) = cos(π/2) = 0 → y = 0.  
*Likely errors*: Adding amplitudes (16 cm); forgetting to use the product-to-sum identity; computing at the wrong time (t = 0 instead of t = 0.025 s).

### Confidence calibration

After part (c), ask: "Is zero displacement at that point consistent with a standing wave having maximum amplitude 8 cm?" Students who answer confidently (yes — at t = π/(2ω), all antinodes are crossing zero simultaneously; the whole standing wave momentarily has zero displacement) understand the temporal factor. Students who say "it must be wrong — the amplitude is 8 cm, how can it be zero?" have not separated the spatial and temporal parts of 2A sin(kx) cos(ωt).

### Delayed retrieval check (next session opener)

"Two waves y₁ = A sin(kx − ωt) and y₂ = A sin(kx + ωt) are superposed. What kind of wave results? Where are the nodes located?"  
Expected: Standing wave; nodes at x = nλ/2 (where sin(kx) = 0). If the learner cannot recall: revisit the derivation in Demo C (Melde's experiment).

---

## 12. Recovery Notes

**Recovery for signed addition failure**:
1. Give a simple number example: y₁ = +3, y₂ = −3 → y_total = 0. "The medium cannot be in two positions at once."
2. Reinforce with displacement-time graph: draw y₁(t) and y₂(t) for a fixed x where they are in antiphase. Add graphically, point by point.
3. If the learner still adds magnitudes: ask "What direction does the string move when one wave pushes it up and the other pushes it down?" — physical reasoning should override the algebraic error.

**Recovery for standing-wave derivation**:
1. Provide the identity sin A + sin B = 2 sin((A+B)/2) cos((A−B)/2) on a card.
2. Have the learner apply it step by step with P = kx − ωt and Q = kx + ωt.
3. (P+Q)/2 = kx; (P−Q)/2 = −ωt → y = 2A sin(kx) cos(ωt). Check: does it reduce to 0 at x = nπ/k? Yes — those are nodes.

---

## 13. Memory & Review

**Memory type**: Principled derivation + graphical pattern recognition

**Encoding hooks**:
- "Algebraic sum" → signed, not magnitude — the negative sign is the whole point of destructive interference
- Node spacing = λ/2 (half wavelength) — always
- I ∝ A² → constructive gives 4× intensity, not 2× — the squaring is the catch
- Waves pass through each other → superposition is temporary, not a permanent merger

**Spaced retrieval schedule**:
- Session +1: "State the superposition principle. What is the resultant of two equal-amplitude, antiphase waves?"
- Week 1: "Two sine waves, same A, same f, same direction but Δφ = π/2. What is the resultant amplitude? (Use phasor addition: A√2.)"
- Week 3: "Derive the standing wave equation from first principles."
- Month 2: "At a constructive interference maximum in a double-slit experiment, the intensity is 4I₀. Where does the 'extra' energy come from?"

**Interleave with**: `phys.wave.wave-speed` (prerequisite wave mechanics), `phys.wave.interference` (the direct downstream application — double-slit quantitative analysis builds on superposition)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.wave.interference` | Double-slit and single-slit patterns are direct applications of superposition to coherent sources |
| `phys.opt.wave-optics` | Thin film interference, diffraction gratings, and coherence all use the superposition framework |
| Music / acoustics | Beats arise from superposition of two slightly different frequencies: f_beat = |f₁ − f₂| |
| Engineering — noise cancellation | Active noise cancellation: generate a wave with equal amplitude and opposite phase to cancel the noise wave |
| Quantum mechanics | The quantum wavefunction obeys a linear wave equation → superposition of states (|ψ⟩ = α|0⟩ + β|1⟩) is the direct analogue; quantum interference is the observable consequence |
| Signal processing | Fourier analysis: any periodic signal is a superposition of sinusoids at harmonically related frequencies |
| `phys.em.electric-field` | Electric field superposition: the total field at a point is the vector sum of fields from all sources — same linearity principle |

---

## 15. Curriculum Feedback

**KG note**: `phys.wave.wave-speed` is the correct minimum prerequisite — the learner needs wave parameters (A, k, ω, λ) fluently before algebraic superposition is tractable. `phys.wave.interference` is the correct immediate unlock: sustained interference patterns are the quantitative consequence of superposition applied to coherent sources.

**Authoring note**: The single most important concept to nail in this entry is the *signed* nature of displacement addition. Every subsequent interference calculation depends on it. The non-permanence of superposition (waves emerge unchanged) is the second key concept and should be demonstrated physically before being stated as a principle.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
