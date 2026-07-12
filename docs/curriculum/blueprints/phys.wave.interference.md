# Teaching Blueprint — phys.wave.interference

## Component 0 — Concept Identity

```yaml
concept_id: phys.wave.interference
name: Wave Interference
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: analyze
prerequisites:
  - phys.wave.superposition
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.opt.thin-film-interference
  - phys.opt.diffraction
  - phys.wave.standing-waves
  - phys.wave.beats
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Two waves meet — does their combined effect always cancel, always add, or does it depend on something invisible to the eye? Interference answers that question: it is the spatial or temporal pattern that emerges from superposition, and whether a point in space is bright or dark, loud or silent, depends only on path-length geometry.

**Conceptual arc:**
1. Review superposition principle: y_total = y₁ + y₂ at every point, every instant.
2. Distinguish superposition (always true) from interference (the stable pattern that appears when sources are coherent).
3. Define path difference Δd = |d₁ − d₂| and phase difference φ = 2πΔd/λ.
4. Constructive interference: Δd = nλ (n = 0, 1, 2, …) → amplitude doubles → intensity quadruples.
5. Destructive interference: Δd = (n + ½)λ → amplitude zero → intensity zero.
6. Coherence requirement: only coherent sources (same frequency, stable phase relationship) produce a stable interference pattern.
7. Two-source pattern: alternating bright (maxima) and dark (minima) fringes; fringe spacing y = λL/d (small-angle: Young's experiment geometry).
8. Energy conservation: constructive regions gain at the expense of destructive regions; total energy is conserved.

**Closing synthesis:** Interference is not about waves "fighting" — it is about the wave field responding to geometry. The path difference at each point in space determines whether energy accumulates there or cancels, revealing wavelength and source geometry as the controlling variables.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — direct application)

**Scenario:** Two loudspeakers separated by d = 2.0 m emit coherent sound at f = 680 Hz. Speed of sound v = 340 m/s. A student stands 5.0 m directly in front of one speaker. Is the sound loud or quiet at this position?

**Step 1 — Find wavelength.**
λ = v/f = 340/680 = 0.50 m.

**Step 2 — Find path lengths.**
Let speaker A be at origin, speaker B at (2.0, 0). Student is at (0, 5.0).

d_A = 5.0 m.
d_B = √(2.0² + 5.0²) = √(4 + 25) = √29 ≈ 5.385 m.

**Step 3 — Path difference.**
Δd = 5.385 − 5.0 = 0.385 m.

**Step 4 — Compare to λ.**
Δd/λ = 0.385/0.50 = 0.77 — between ½ and 1, not a whole integer or half-integer exactly. Closest destructive minimum: Δd = 0.5λ = 0.25 m; closest constructive maximum: Δd = λ = 0.50 m.

At 0.385 m the student is 77% of the way toward λ, closer to the minimum (phase difference ≈ 277°). Intensity is reduced but not zero — partial interference.

**Answer:** The point is not at a clean maximum or minimum; intensity is reduced to about I ≈ I_max × cos²(φ/2) with φ = 2π × 0.77 = 4.84 rad → cos²(2.42) ≈ 0.07. The student hears approximately 7% of the maximum intensity — very quiet.

---

### WE-2 (Bridging — two-slit geometry)

**Scenario:** In Young's double-slit experiment: slit separation d = 0.5 mm, screen distance L = 2.0 m, fringe spacing measured as y = 2.6 mm. Find the wavelength of light.

**Formula derivation (small-angle):**
For the m-th bright fringe: d sin θ ≈ d(y_m/L) = mλ.
Fringe spacing Δy = λL/d.

**Solve:**
λ = Δy × d / L = (2.6 × 10⁻³)(0.5 × 10⁻³) / 2.0 = 1.3 × 10⁻⁶ / 2.0 = 6.5 × 10⁻⁷ m = 650 nm.

**Answer:** λ = 650 nm — red light. This is Young's 1801 method of measuring wavelength for the first time in history.

**Conceptual extension:** Closing one slit removes the interference pattern entirely and replaces it with a single broad diffraction envelope. The fringe pattern is the interference term; the envelope is the single-slit diffraction term.

---

### WE-3 (Abstract — intensity in double-slit)

**Derive:** For two coherent sources of equal amplitude A₀, show that fringe intensity follows I(θ) = I_max cos²(φ/2).

**Step 1 — Phase difference from geometry.**
φ = 2πΔd/λ = 2πd sinθ/λ.

**Step 2 — Add amplitudes.**
E_total = A₀ sin(ωt) + A₀ sin(ωt + φ).
Using sum-to-product: 2A₀ cos(φ/2) sin(ωt + φ/2).
Resultant amplitude: A_res = 2A₀ cos(φ/2).

**Step 3 — Intensity.**
I ∝ A_res² = 4A₀² cos²(φ/2) = I_max cos²(φ/2), where I_max = 4A₀² (four times single-source intensity at constructive maxima).

**Step 4 — Check energy conservation.**
Average of cos²(φ/2) over all angles = ½. Average I = ½ × 4A₀² = 2A₀². Two incoherent sources would give 2A₀². Confirmed: energy is conserved; interference redistributes, not creates or destroys.

---

## Component 3 — Misconception Engine

### MC-INTERFERENCE-DESTROYS-ENERGY

**Trigger signal:** Student says "destructive interference means the waves cancel and the energy disappears."

**Conflict evidence [P28]:** "Let me show you a concrete problem. Two 1W speakers pointing at each other in a destructive interference pattern: if the energy vanished, a calorimeter between them would heat nothing and an energy balance would fail. We know energy is conserved in all wave experiments — so what must be happening instead?"

**Bridge text [P30]:** "Energy can't be created or destroyed by superposition. Interference doesn't destroy energy — it redistributes it. The points of destructive cancellation are exactly paired with points of constructive doubling."

**Replacement text [P31]:** "Destructive interference moves energy from minima to maxima. In a two-slit pattern, the dark fringes contribute zero energy but the bright fringes (which are 4× as intense as a single source) collect it all. The area-averaged total is exactly what two incoherent sources would give."

**Discrimination pairs [P33]:**
- "Two waves from coherent sources cancel at a point 50 cm away. At 51 cm they reinforce. Which is louder — the 51 cm point compared to one source alone?" → 4× as intense (amplitude doubles, I ∝ A²).
- "Two incoherent sources: can they produce stable dark fringes?" → No — incoherent sources have random phase fluctuations, so any null at one instant is filled a microsecond later. Stable fringes require coherence.

**s6_path:** "Let's think about where the energy goes rather than whether it vanishes — that reframe makes interference conceptually clean and worry-free."

---

### MC-INTERFERENCE-NEEDS-SAME-AMPLITUDE

**Trigger signal:** Student claims interference only occurs when the two sources have identical amplitudes, or that unequal amplitudes produce "partial" interference that isn't real interference.

**Conflict evidence [P28]:** "Consider radio waves from two antennas of different power reaching your receiver. Engineers calculate their interference to avoid dead spots. If unequal amplitudes couldn't interfere, radio engineering would be impossible. What do you think actually happens when A₁ ≠ A₂?"

**Bridge text [P30]:** "Superposition principle applies to any two waves — A₁ and A₂ can be different. The resultant amplitude is A_res = √(A₁² + A₂² + 2A₁A₂cosφ). When A₁ = A₂ = A₀ this simplifies to 2A₀|cos(φ/2)|, giving complete cancellation at minima. When A₁ ≠ A₂ the minimum is |A₁ − A₂| > 0 — not zero — but it is still interference."

**Replacement text [P31]:** "Interference occurs whenever two (or more) coherent waves overlap in space. With equal amplitudes, destructive minima reach zero (maximum contrast); with unequal amplitudes, minima are nonzero (reduced contrast). Fringe visibility V = (I_max − I_min)/(I_max + I_min) measures contrast: V = 1 for equal amplitudes, 0 < V < 1 for unequal."

**Discrimination pairs [P33]:**
- "Speaker A outputs 4W, Speaker B outputs 1W. Is there an interference pattern?" → Yes — every point has a resultant determined by superposition; there are maxima and minima, just with reduced contrast (V < 1).
- "Can a single source interfere with itself?" → Yes — thin-film interference and Michelson interferometer both split a single source and recombine it; the source interferes with its own phase-shifted copy.

**s6_path:** "Interference is a general wave behavior — you don't need identical sources to see it, just coherence."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq check):** Two waves y₁ = 3sin(ωt) and y₂ = 3sin(ωt + π) are superimposed. What is y_total?
*Correct: y_total = 0 (destructive — phase difference π → path difference λ/2).*

**P4-b (path difference → type):** Two coherent sources emit λ = 600 nm light. At point P, d₁ = 1200 nm and d₂ = 900 nm. Is P a maximum, minimum, or neither?
*Δd = 300 nm = λ/2 → destructive minimum.*

**P4-c (fringe spacing):** Young's experiment: d = 0.25 mm, L = 1.5 m, λ = 500 nm. Find fringe spacing.
*y = λL/d = (500×10⁻⁹)(1.5)/(0.25×10⁻³) = 3.0 × 10⁻³ m = 3.0 mm.*

**P4-d (energy conservation check):** Two coherent 2W speakers create an interference pattern. What is the total power in the pattern?
*4W total (energy conserved — redistributed not destroyed).*

**P4-e (coherence):** A white light source illuminates two slits. Describe the interference pattern.
*Colored fringes near centre (each λ constructive at different angle), washed out for large orders because different λ overlap — short coherence length means pattern only visible for small path differences.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Before we start — what do you predict happens when two waves of equal amplitude and same frequency meet exactly out of phase at a point?"

*Expected: amplitude zero / they cancel. If correct, advance. If "they bounce off each other," redirect: superposition adds, doesn't deflect.*

**Turn 2 [P06 concrete anchor]:** "A noise-cancelling headphone measures incoming sound and plays an identical wave shifted by half a wavelength into your ear. Where does the acoustic energy go — does it vanish?"

*Guide to: redistributed/absorbed by the driver, not vanished.*

**Turn 3 [P28 conflict]:** "If energy were destroyed by destructive interference, what would a sensitive thermometer between two cancelling speakers measure? What does this tell you about the 'energy vanishes' idea?"

*Target: thermometer would detect no heating — contradicts conservation. Energy must go elsewhere.*

**Turn 4 [P30 bridge]:** "Draw two waves meeting: one peaking up, one peaking down, same amplitude. At this point the resultant is zero. Now look 10 cm to the left where they are both peaking up — what is the amplitude there?"

*Target: 2A. Energy saved from cancellation region appears in reinforcement region.*

**Turn 5 [P51 check-in]:** "So far: interference is superposition made spatial by geometry — path difference determines what happens at each point. Comfortable with that?"

**Turn 6 [P52 narrow to key relation]:** "Let's pin down the rule. If Δd = nλ, what type of interference? If Δd = (n + ½)λ?"

*Target: nλ → constructive; (n+½)λ → destructive.*

**Turn 7 [P33 discrimination]:** "Two scenarios: (A) path difference = 3λ. (B) path difference = 3.5λ. Which gives constructive, which destructive?"

*A → constructive (n=3); B → destructive (n=3 with half-integer offset).*

**Turn 8 [P62 retrieval seed]:** "Without looking at notes — derive the fringe spacing formula for Young's double-slit. What does it depend on?"

*Target: y = λL/d — larger λ or larger L → wider fringes; larger d → narrower fringes.*

**Turn 9 [P36 mastery probe]:** "Problem: two slits, d = 0.4 mm, L = 2 m, fringes 2.5 mm apart. Find λ. Then explain why increasing d halves the fringe spacing."

*λ = yD/L = (2.5×10⁻³)(0.4×10⁻³)/2 = 5.0×10⁻⁷ m = 500 nm. Larger d → smaller angular separation between adjacent maxima → narrower fringes.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: phase-difference recall] → [P06 anchor: noise-cancelling headphones]
→ [MC-INTERFERENCE-DESTROYS-ENERGY: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: path difference calculation for two speakers]
→ [P51 check-in]
→ [P52 narrow: Δd = nλ / (n+½)λ rule]
→ [MC-INTERFERENCE-NEEDS-SAME-AMPLITUDE: P28 → P30 → P31]
→ [WE-2: Young's experiment wavelength measurement]
→ [P62 retrieval seed: fringe spacing derivation]
→ [WE-3: intensity formula derivation]
→ [P36 mastery probe: two-slit problem + fringe spacing explanation]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice, no wave prior):** Start with ripple tank video — observe two point sources creating pattern of crossing arcs. Identify bright and dark bands visually before introducing math. Skip WE-3 (intensity derivation); emphasize only Δd = nλ / (n+½)λ.

**S1 (knows formula, no grounding):** Ask them to predict: "If you double the slit separation, what happens to fringe spacing?" before showing the formula. Force prediction → reveal → reconcile. Prevents formula-manipulation without understanding.

**S4 (prereq gap — superposition weak):** Return to phys.wave.superposition. Build graphical addition of two sinusoids at a single point before extending to spatial pattern. Don't advance until P4-a is secure.

**S6 (math anxiety):** Emphasize physical picture: geometry → path difference → in phase or out of phase. Use d/λ as the key ratio. Calculator allowed for WE-1 and WE-2.

**S7 (overconfident — "I know this"):** Give P4-e (white light) immediately. Most S7 students say "the same pattern as monochromatic light" — the reality (colored, finite-extent fringes) surprises them and establishes humility. Then WE-3.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-b (path difference → interference type)
  - offset_days: 4
    format: P4-c (fringe spacing calculation)
  - offset_days: 14
    format: P4-e (white light coherence) + "derive I(θ) = I_max cos²(φ/2) from first principles"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.wave.interference ✓
V-2  prerequisites listed in KG: phys.wave.superposition ✓
V-3  bloom verb matches level (analyze): "analyze … interpret … derive" ✓
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
V-16 cross_links pedagogically justified: thin-film, diffraction, standing-waves, beats ✓
V-17 difficulty number 4 consistent with bloom=analyze and estimated_hours=4 ✓
V-18 domain "waves" matches concept_id prefix phys.wave ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
