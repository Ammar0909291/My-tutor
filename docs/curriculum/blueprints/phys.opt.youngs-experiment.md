# Teaching Blueprint — phys.opt.youngs-experiment

## Component 0 — Concept Metadata

```
concept_id:         phys.opt.youngs-experiment
name:               Young's Double-Slit Experiment
domain:             optics
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    5
prerequisites:      [phys.opt.wave-optics, phys.wave.interference]
cross_links:        []
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (laser through two pinholes → stripes on the wall, not two bright
                       spots; why does a second source create darkness in some places?;
                       difficulty 4 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Young's double-slit experiment proves light has wave character by producing a
stable interference pattern of alternating bright and dark fringes. Every result follows from one
quantity — the path difference Δ = yd/D. Mastery means deriving fringe positions from first
principles, computing fringe width β, and predicting how the pattern shifts when any parameter
(d, D, λ, or an inserted slab) changes.

**Experimental Setup:**
- Two coherent slits S₁ and S₂, slit separation d
- Screen at perpendicular distance D (D >> d)
- Monochromatic light of wavelength λ
- Point P at height y above screen centre
- Path lengths r₁ (from S₁) and r₂ (from S₂)

**Path difference at P (small-angle approximation):**
Δ = r₂ − r₁ ≈ yd/D

**Conditions for fringes:**
- Bright (constructive): Δ = nλ, where n = 0, ±1, ±2, ...
- Dark (destructive): Δ = (n + ½)λ, where n = 0, ±1, ±2, ...

**Fringe positions:**
- Bright: y_n = nλD/d = nβ
- Dark:   y_n = (n + ½)λD/d = (n + ½)β

**Fringe width β (spacing between successive bright or dark fringes):**
β = λD/d
- Proportional to λ (longer λ → wider fringes)
- Proportional to D (farther screen → wider fringes)
- Inversely proportional to d (closer slits → wider fringes)
- All fringes equally spaced within the small-angle approximation

**Intensity distribution:**
I = 4I₀ cos²(πΔ/λ) = 4I₀ cos²(πdy/(λD))

where I₀ is the single-slit intensity and I_max = 4I₀ at Δ = 0.

Selected values:
- Δ = 0: I = 4I₀ (central maximum)
- Δ = λ/2: I = 0 (first dark)
- Δ = λ/3: I = 4I₀ cos²(π/3) = 4I₀ × (1/2)² = I₀  →  I/I_max = 1/4
- Δ = 2λ/3: I = 4I₀ cos²(2π/3) = 4I₀ × (1/4) = I₀  →  I/I_max = 1/4

**Effect of changing parameters (independent changes):**

| Parameter changed | Direction | Effect on β |
|-------------------|-----------|-------------|
| d doubled         | wider     | β halved    |
| d halved          | narrower  | β doubled   |
| D doubled         | farther   | β doubled   |
| λ red → violet    | shorter λ | β decreased |

**YDSE with a glass slab (refractive index n, thickness t) placed over one slit:**
- Additional optical path introduced = (n − 1)t
- Entire fringe pattern shifts toward the covered slit by:
  y_shift = (n − 1)t × D/d
- Number of fringes shifted = (n − 1)t / λ
- Fringe width β is unchanged; only the position of every fringe changes
- The geometric screen centre is no longer the zeroth-order fringe

**Source shifted by distance S (perpendicular to the axis, source-to-slit distance D_s):**
- Central bright fringe shifts opposite to the source shift:
  y₀ = −S × D/D_s (approximately, for small shifts)

**Fringe visibility:**
V = (I_max − I_min) / (I_max + I_min)
- Equal slit intensities (I₁ = I₂): I_min = 0, V = 1 (perfect contrast)
- Incoherent sources: V = 0 (no fringes visible)

---

**Worked Example 1 (Standard YDSE):**
d = 0.5 mm, D = 1.5 m, λ = 600 nm = 600 × 10⁻⁹ m.

β = λD/d = (600 × 10⁻⁹ × 1.5) / (0.5 × 10⁻³)
   = 9 × 10⁻⁷ / 5 × 10⁻⁴ = 1.8 × 10⁻³ m = 1.8 mm

3rd bright fringe: y₃ = 3β = 3 × 1.8 = 5.4 mm (from screen centre)

2nd dark fringe (n = 1): y = (1 + ½)β = 1.5 × 1.8 = 2.7 mm

Note: dark fringes fall exactly halfway between adjacent bright fringes. All fringes are
equally spaced at β = 1.8 mm.

---

**Worked Example 2 (Slab insertion):**
Same setup as WE-1. A glass slab of n = 1.5, t = 0.1 mm = 10⁻⁴ m is placed over slit S₁.

Additional optical path = (n − 1)t = 0.5 × 10⁻⁴ = 5 × 10⁻⁵ m

Fringe shift = (n − 1)t × D/d
             = 5 × 10⁻⁵ × 1.5 / (0.5 × 10⁻³)
             = 7.5 × 10⁻⁵ / 5 × 10⁻⁴
             = 0.15 m = 150 mm  (toward S₁ side)

Number of fringes shifted = (n − 1)t / λ
                           = 5 × 10⁻⁵ / (600 × 10⁻⁹)
                           = 83.3 fringes

The central bright fringe (Δ = 0) moves 150 mm toward the slab side. This large shift
illustrates that a 0.1 mm glass slab introduces a path difference of 83 wavelengths —
showing why optical path, not geometric path, determines fringe positions.

---

**Worked Example 3 (White light YDSE):**
Same d and D. White light: λ_red = 700 nm, λ_violet = 400 nm.

β_red    = 700 × 10⁻⁹ × 1.5 / (0.5 × 10⁻³) = 2.1 mm
β_violet = 400 × 10⁻⁹ × 1.5 / (0.5 × 10⁻³) = 1.2 mm

Coincidence condition: n_red × 700 = n_violet × 400
n_red / n_violet = 400/700 = 4/7  →  n_red = 4, n_violet = 7 (smallest integers)

Position: y = 4 × 2.1 = 8.4 mm  =  7 × 1.2 = 8.4 mm ✓

At y = 8.4 mm, the 4th red and 7th violet fringes overlap. Both wavelengths produce a
bright fringe at this position, so a magenta/pink fringe appears there. At the screen
centre (y = 0), all wavelengths reinforce → white central fringe. Immediately adjacent
fringes show a spectrum: violet on the inner edge, red on the outer edge.

---

## Component 2 — Prerequisite Dependency Map

```
phys.opt.wave-optics   ──►
                              phys.opt.youngs-experiment  ──►  phys.opt.diffraction
phys.wave.interference ──►
```

**PD-1 (phys.opt.wave-optics — coherence):**
"What does it mean for two light sources to be coherent? Why is coherence essential for a
stable interference fringe pattern?"
Expected: Coherent sources share the same frequency and maintain a constant phase difference.
Without coherence the phase difference fluctuates randomly many times per second → the fringe
pattern shifts faster than the eye can track → time-averaged result is uniform illumination
with no visible fringes. In practice, both slits are illuminated from the same primary source.

**PD-2 (phys.wave.interference — conditions):**
"State the path-difference conditions for constructive and destructive interference."
Expected: Constructive (bright): Δ = nλ for integer n. Destructive (dark): Δ = (n + ½)λ.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION (Priority 1)
**Label:** "Wider slit separation → wider fringe spacing"

**Trigger signals:**
- States that moving the slits further apart makes the fringes wider or more spread out
- Writes β ∝ d (proportional) instead of β ∝ 1/d (inversely proportional)
- Draws a diagram with widely spaced slits paired with widely spaced fringes
- Chooses a larger d when asked how to "enlarge" the fringe pattern

**Conflict evidence [P28]:**
"Let's compute side by side.
Setup A: d = 0.5 mm, D = 1 m, λ = 500 nm  →  β = 500×10⁻⁹ × 1 / (0.5×10⁻³) = 1.0 mm.
Setup B: d = 2 mm (four times larger), same D and λ  →  β = 500×10⁻⁹ × 1 / (2×10⁻³) = 0.25 mm.
The wider slit separation gives fringes four times closer together — the opposite of the intuition.
Physical reason: at wider d, the path difference yd/D changes four times more rapidly with y.
The next bright fringe (Δ = λ) is reached at a y four times smaller."

**Bridge [P30]:**
"The formula β = λD/d places d in the denominator. Increasing d makes each bright fringe
closer to the previous one — the fringes pack in. Think of it this way: path difference
Δ = yd/D. To reach Δ = λ (the next bright fringe), we need y = λD/d. A larger d means
that target y is smaller, so the fringe appears sooner."

**Replacement [P31]:**
β = λD/d: d in denominator → β decreases as d increases.
Check: β × d = λD (a constant for fixed λ and D).
Doubling d → β halved. Halving d → β doubled.
To widen fringes: reduce d, increase D, or increase λ.

**Discrimination pairs [P33]:**
- d = 0.5 mm → β = 1.0 mm (relatively coarse fringe pattern)
- d = 2.0 mm → β = 0.25 mm (fine fringe pattern — wider slit separation, finer fringes)

**s6_path:** For anxious students, compute both setups numerically before introducing the
formula. Let the numbers establish the inverse relationship; only then attach it to β = λD/d.

---

### MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER (Priority 2)
**Label:** "The zeroth-order bright fringe is always at the geometric centre of the screen"

**Trigger signals:**
- Assumes y = 0 always corresponds to Δ = 0 regardless of what is placed in front of a slit
- After a slab is inserted, still places the n = 0 fringe at screen centre
- Confuses "centre of the screen" (a geometric point) with "zero path difference" (a physical condition)
- Calculates a fringe shift but then anchors the new pattern incorrectly at y = 0

**Conflict evidence [P28]:**
"Before the slab: at y = 0, the geometric paths S₁P and S₂P are equal → Δ = 0 → bright
central fringe sits at screen centre. ✓
After a slab (n = 1.5, t = 0.1 mm) covers S₁: the optical path through S₁ is longer by
(n − 1)t = 5×10⁻⁵ m. At y = 0, geometric paths are still equal but total optical paths
are not — the ray via S₁ is 5×10⁻⁵ m longer. Δ ≠ 0 at screen centre.
The zero-path-difference point has shifted to the S₁ side of the screen, where the extra
geometric path through S₂ exactly compensates the slab's optical extension."

**Bridge [P30]:**
"The central bright fringe marks the location where total optical path difference = 0, not
where the geometric centre of the screen is. These two coincide only when both slits are
identical. Placing anything different in front of one slit — a glass plate, a different
medium, even a different length of air — breaks the symmetry. The equal-optical-path
point moves, and the entire pattern moves with it."

**Replacement [P31]:**
Central bright fringe (n = 0) after slab over S₁:
y₀ = (n − 1)t × D/d  (toward S₁ side)
Every other fringe shifts by the same amount. Fringe width β is unchanged.
At any screen position y measured from screen centre:
effective Δ = yd/D − (n − 1)t  [slab in front of S₁ path]
Bright fringes: yd/D = (n − 1)t + nλ  →  same β spacing, entire pattern shifted.

**Discrimination pairs [P33]:**
- No slab: central fringe at y = 0 (screen centre). ✓
- Slab over S₁: central fringe at y = +(n−1)tD/d (toward S₁). Screen centre is no longer n = 0. ✓
- Slab over S₂: central fringe shifts toward S₂ (same formula, other side). ✓

**s6_path:** Introduce slab problems only after FA-2 confirms MC-FRINGE-WIDTH is resolved and
bright/dark fringe positions (no slab) are secure. Show VIS-3 before any calculation so the
student sees the shift visually before computing it numerically.

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0]
**Primitives:** P01, P06

P01: Welcome; orient to what YDSE is about and why it is historically important.

P06: "Imagine shining a laser through a card with two tiny slits. You might expect two bright
stripes on the wall — one from each slit. Instead, you see a long row of alternating bright
and completely dark bands. Stranger still: if you cover either slit alone, the dark bands
disappear and you get only a single bright patch. Adding a second source of light has created
regions of total darkness. How can light plus light produce darkness? That is what Young's
experiment forces us to explain — and the answer reveals that light is a wave."

---

### TA-2 — Pictorial Stage: Setup Diagram and Formula Derivation [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): VIS-1 — full YDSE setup diagram with labelled components: single source,
two slits S₁/S₂ separated by d, screen at distance D, point P at height y, path lengths
r₁ and r₂ shown, path difference Δ = r₂ − r₁ indicated by the shaded triangle.

P08 (derivation chain — step by step):

Step 1 — Path difference: For D >> d, the triangle S₁S₂P is nearly isoceles and the
two rays to P are nearly parallel. This gives:
Δ = r₂ − r₁ ≈ y × d / D

Step 2 — Bright fringe: Set Δ = nλ:
y_n = nλD/d = nβ,  where β = λD/d

Step 3 — Dark fringe: Set Δ = (n + ½)λ:
y_n = (n + ½)λD/d = (n + ½)β

Step 4 — Intensity: Phase difference δ = 2πΔ/λ:
I = 4I₀ cos²(δ/2) = 4I₀ cos²(πΔ/λ)

Show VIS-2 (intensity vs. y graph): cosine-squared envelope with uniform peak spacing β;
peaks at I_max = 4I₀, troughs at I_min = 0.

P05: "In laser spectroscopy, scientists use YDSE geometry to measure wavelengths to six
significant figures. In thin-film manufacturing, engineers use fringe patterns to verify
coating thickness to nanometer precision. The formula β = λD/d is why."

---

### TA-3 — Prerequisite Checks and Guided Practice [Protocol C]
**Primitives:** P41, P10, P13

P41: Administer PD-1 and PD-2 before giving any calculation.
- PD-1 gap (coherence) → repair: "Both slits are cut in the same card and lit from one
  source — they act like two in-phase secondary sources (Huygens' principle). The phase
  difference at any screen point is fixed in time → stable fringe pattern."
- PD-2 gap (interference conditions) → repair: "Constructive: Δ = nλ. Destructive:
  Δ = (n + ½)λ. These are the conditions we derived in the wave interference lesson."

P10 (guided WE-1): Work through Worked Example 1 step by step, asking the student to
supply each intermediate value before revealing it.
"d = 0.5 mm, D = 1.5 m, λ = 600 nm. First compute β. Then find the 3rd bright fringe and
the 2nd dark fringe position."

P13 (reveal with annotation):
β = λD/d = 1.8 mm.
3rd bright: y₃ = 3 × 1.8 = 5.4 mm.
2nd dark (n = 1): y = (1 + ½) × 1.8 = 2.7 mm.
"Notice: dark fringes sit exactly halfway between bright fringes. The pattern is perfectly
regular because β is the same for every fringe pair."

---

### TA-4 — MC-FRINGE-WIDTH Diagnostic Probe [Protocol B]
**Primitives:** P14, P28, P31, P33, P36

P14 (predict first): "In the WE-1 setup, I increase the slit separation d from 0.5 mm to
2 mm while keeping D and λ fixed. Does β increase, decrease, or stay the same?"

Listen: answer "increases" or "gets wider" → MC-FRINGE-WIDTH-INCREASES confirmed.

P28 → P31: Run the full Misconception Engine MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION
sequence. Use the Setup A vs. Setup B numerical contrast (0.5 mm → 1.0 mm fringe width;
2 mm → 0.25 mm fringe width) as the conflict, then the denominator argument as the bridge,
then "β × d = λD is constant" as the replacement.

P33: Discrimination pair — d = 0.5 mm gives β = 1.0 mm; d = 0.1 mm gives β = 5.0 mm.
State explicitly: "Closer slits → coarser (wider-spaced) fringes."

P36: "A scientist needs to resolve two wavelengths that differ by only 1 nm. She wants
very fine fringes (very small β) so their patterns just separate. Should she use a wider
or narrower slit separation?"
[Expected: wider d → smaller β → finer fringe spacing → better wavelength resolution.
Confirms MC-FRINGE-WIDTH resolution applied in reverse.]

---

### TA-5 — Slab Insertion and MC-CENTRAL-FRINGE Diagnostic [Protocol B + C]
**Primitives:** P14, P28, P31, P33

P14 (predict first): "A thin glass plate is placed over slit S₁. The experiment runs.
Where is the central bright fringe (n = 0, Δ = 0) now — at the geometric centre of the
screen, shifted toward S₁, or shifted away from S₁?"

Listen: "stays at the centre" → MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER confirmed.

P28 → P31: Run the full Misconception Engine MC-CENTRAL-FRINGE sequence. Use the
optical-path argument as conflict evidence: slab adds (n−1)t to the S₁ path; at y = 0
the optical paths are now unequal; the equal-path point has moved to the S₁ side.
Replacement: y₀ = (n−1)tD/d toward the slab side.

P33: Three discrimination cases — no slab (centre at y = 0), slab over S₁ (centre
toward S₁), slab over S₂ (centre toward S₂).

Show VIS-3 (side-by-side fringe patterns without and with slab): the entire pattern
is visibly displaced toward the slab side; the bright fringe spacing β is unchanged.

Walk through Worked Example 2 (slab shift calculation: 150 mm, 83.3 fringes).
Walk through Worked Example 3 (white light coincidence: 4th red and 7th violet at 8.4 mm).

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51

Problem set:

1. **Fringe width:** d = 1 mm, D = 2 m, λ = 500 nm. Find β.
   [β = 500×10⁻⁹ × 2 / 10⁻³ = 10⁻³ m = 1.0 mm]

2. **Dark fringe position:** Same setup. Find the position of the 3rd dark fringe (n = 2).
   [y = (2 + ½) × 1.0 mm = 2.5 mm from screen centre]

3. **Parameter change:** d is halved to 0.5 mm (D and λ unchanged). Find new β.
   What happened, and why?
   [β' = 2.0 mm. Halving d doubled β — fringes get wider. Confirms β ∝ 1/d.]

4. **Slab shift:** d = 0.5 mm, D = 1 m, λ = 600 nm. A glass slab of n = 1.5,
   t = 10 μm = 10×10⁻⁶ m covers S₁. Find β, the fringe shift in mm, and the number
   of fringes shifted.
   [β = 600×10⁻⁹ × 1 / (0.5×10⁻³) = 1.2 mm.
    shift = (0.5)(10×10⁻⁶) × 1 / (0.5×10⁻³) = 5×10⁻⁶ / 5×10⁻⁴ = 0.01 m = 10 mm.
    fringes = (n−1)t/λ = 5×10⁻⁶ / 600×10⁻⁹ = 8.3 fringes toward S₁ side.]

5. **Intensity:** At a point P, path difference Δ = λ/3. Find I as a fraction of I_max.
   [I = 4I₀ cos²(π/3) = 4I₀ × (1/2)² = I₀. I_max = 4I₀. I/I_max = 1/4.]

P51: Monitor students who stall on unit conversion (nm → m). Enforce consistent unit
discipline: convert all lengths to metres before substituting into β = λD/d.

---

### TA-7 — Closure and Retrieval Schedule [Protocol A]
**Primitives:** P68, P85, P91

P68: "Today: YDSE demonstrates the wave nature of light through interference. One formula —
β = λD/d — governs all fringe positions. Bright at y = nβ. Dark at y = (n + ½)β.
A glass slab shifts every fringe toward the slab side by (n−1)tD/d; the screen centre is
no longer the zeroth-order fringe after a slab is inserted. Key relationships: β ∝ λ,
β ∝ D, β ∝ 1/d. Intensity: I = 4I₀ cos²(πΔ/λ).

Retrieval question for next session: 'In a YDSE with d = 0.5 mm, D = 2 m, λ = 500 nm,
a glass slab of n = 1.6 and t = 5 μm covers S₁. Find β and the displacement of the
central bright fringe from screen centre.'"

P85: "You worked out the slab-shift formula from first principles and correctly identified
that fringe width decreases when slit separation increases — that is the hardest conceptual
step in this chapter, and you reasoned through it from the path-difference definition."

P91: Mastery probes MP-1 through MP-5 will be administered in the next revision session.
Passing criterion: 4 out of 5 correct (threshold 0.80). A pass unlocks phys.opt.diffraction.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4/5 correct = PASS at threshold 0.80)

**MP-1 (Apply — fringe width and bright fringe position):**
"YDSE: d = 0.3 mm, D = 1.5 m, λ = 600 nm. Find β and the position of the 2nd bright fringe."
Expected: β = 600×10⁻⁹ × 1.5 / (0.3×10⁻³) = 9×10⁻⁷ / 3×10⁻⁴ = 3.0×10⁻³ m = 3.0 mm.
y₂ = 2β = 6.0 mm from screen centre.
_Discriminates: β formula, nm-to-m unit conversion, y_n = nβ relationship._

**MP-2 (Apply — dark fringe positions):**
"In a YDSE, fringe width β = 2.5 mm. Find the positions of the 1st dark fringe and the
4th dark fringe (measured from screen centre, on the same side)."
Expected:
1st dark (n = 0): y = (0 + ½) × 2.5 = 1.25 mm.
4th dark (n = 3): y = (3 + ½) × 2.5 = 8.75 mm.
_Discriminates: dark fringe indexing (n = 0 gives 1st dark, not n = 1); formula y = (n+½)β._

**MP-3 (Apply — effect of parameter changes):**
"In a YDSE, initial β = 1.5 mm. Predict the new β after each of the following independent
changes: (a) d is tripled. (b) D is halved. (c) λ changes from 600 nm to 400 nm."
Expected: (a) β/3 = 0.5 mm. (b) β/2 = 0.75 mm. (c) β × (400/600) = 1.0 mm.
_Discriminates: proportionality β ∝ λD/d applied to each variable; MC-FRINGE-WIDTH resolution
for part (a)._

**MP-4 (Apply — glass slab fringe shift):**
"YDSE: d = 0.5 mm, D = 1 m, λ = 500 nm. A glass slab of n = 1.5, t = 10 μm is placed
over slit S₁. Find: (a) β, (b) the fringe shift in mm, (c) the direction of shift,
(d) the number of fringes shifted."
Expected:
(a) β = 500×10⁻⁹ × 1 / (0.5×10⁻³) = 1.0 mm.
(b) shift = (1.5−1)(10×10⁻⁶) × 1 / (0.5×10⁻³) = 5×10⁻⁶ / 5×10⁻⁴ = 0.01 m = 10 mm.
(c) Toward S₁ (the covered slit).
(d) (n−1)t/λ = 5×10⁻⁶ / 500×10⁻⁹ = 10 fringes.
_Discriminates: MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER resolution; slab formula; direction of
shift; fringe count._

**MP-5 (Analyze — intensity at a given path difference):**
"Two coherent slits of equal intensity I₀ each illuminate a screen. At point P, the path
difference Δ = 2λ/3. (a) Find I at P as a fraction of I_max. (b) Is P closer to a bright
fringe or a dark fringe? Show the distances."
Expected:
(a) I = 4I₀ cos²(π × 2/3) = 4I₀ cos²(2π/3) = 4I₀ × (−0.5)² = 4I₀ × 0.25 = I₀.
    I/I_max = I₀ / 4I₀ = 1/4.
(b) Nearest dark fringe: Δ = λ/2, distance from P = 2λ/3 − λ/2 = λ/6.
    Nearest bright fringe: Δ = λ, distance from P = λ − 2λ/3 = λ/3.
    Since λ/6 < λ/3, P is closer to the dark fringe.
_Discriminates: intensity formula; recognising that I = I₀ means 25% of I_max (dim but not zero);
comparative fringe proximity reasoning._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "State the formula for β and identify which variable appears in the
denominator."
Threshold: β = λD/d; d in the denominator.
If student writes β ∝ d → MC-FRINGE-WIDTH risk flagged → reinforce before proceeding to TA-3.

**FA-2 (TA-4 exit):** "d is doubled. What happens to β? Give a one-sentence physical reason."
Expected: β halves. Reason: at wider slit separation, path differences change more rapidly
with screen height, so the next fringe is reached at a smaller y.
If student says β doubles → MC-FRINGE-WIDTH not resolved → re-run P31 with Setup A/B numbers.

**FA-3 (TA-5 exit):** "A slab is placed over S₁. Does the central bright fringe move toward
S₁, toward S₂, or stay at screen centre? Give the one-sentence reason."
Expected: Toward S₁. Reason: the slab adds extra optical path via S₁; the equal-path point
shifts to the S₁ side to compensate geometrically.
If student says "stays at centre" → MC-CENTRAL-FRINGE not resolved → re-show VIS-3 and re-run P31.

**FA-4 (Session exit):** Administer MP-1, MP-2, and MP-4. 3/3 correct → proceed to TA-7 and
schedule the P91 mastery probe session.

---

## Component 7 — Anxiety and Confidence Protocols

**S0 (Default — fresh start):**
Full TA-1 through TA-7 sequence.
PD-1 and PD-2 administered at TA-3 entry; any gaps repaired before proceeding to WE-1.
All three worked examples completed within the session.

**S3 (Some prior exposure):**
Skip P01 preamble in TA-1; begin with P06 framing question.
At TA-2, ask the student to recall the path-difference expression before displaying it —
use as a retention diagnostic.
Fold TA-3 and TA-4 if WE-1 is answered correctly and fluently (skip slow build-up).
At TA-5, present the slab scenario as a predict-then-calculate challenge rather than a
guided walk-through.

**S6 (Anxiety):**
Introduce only β = λD/d at TA-2. Hold the intensity formula (Component 1, bottom) for
Session 2 after fringe-position skills are secure.
Session 1 covers WE-1 only; WE-2 (slab) deferred to Session 2 after FA-2 is passed.
TA-6 problem set: Problems 1–3 in Session 1 only; Problems 4–5 deferred to Session 2.
Framing script: "Everything comes from one fact: Δ = yd/D. Bright where Δ = nλ, dark
where Δ = (n+½)λ. Once you have β = λD/d, every fringe position is just a multiple or
half-multiple of β. Three facts, one formula."

**S9 (Advanced / pre-mastery):**
Skip TA-1. Open with TA-3 PD-checks, then immediately present MP-5 (intensity) as the
opening challenge.
At TA-5: after the slab calculation, introduce fringe visibility V = (I_max−I_min)/(I_max+I_min)
and ask the student to prove that equal-intensity slits give V = 1 and incoherent sources
give V = 0.
Challenge extension at TA-7: "In white light YDSE, show that the 3rd red (λ = 700 nm) and
5th violet (λ = 420 nm) fringes coincide exactly. What other pairs of (n_red, n_violet) give
coincidences below y = 15 mm for the WE-1 setup?"
[Check: 3×700 = 2100 = 5×420 ✓. Position: y = 3×β_red = 3×2.1 = 6.3 mm. Other pairs
require n_red×700 = n_violet×420 → n_red/n_violet = 3/5. Multiples: (3,5), (6,10)... next:
y = 6×2.1 = 12.6 mm < 15 mm ✓. So two coincidences below 15 mm: 6.3 mm and 12.6 mm.]
Administer all five P91 probes in one sitting without scaffolding.

---

## Component 8 — Spaced Retrieval and Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete anchor → path-difference derivation → fringe formulas
→ WE-1 guided → MC-FRINGE-WIDTH diagnosis and repair via Setup A/B comparison).

**Session 2 (≥24 h later):**
Retrieval opener: "State the formula for β. If d is halved, what happens to β? Why?"
Hesitation or error → brief P31 refresher before proceeding.
→ TA-5 (slab insertion, MC-CENTRAL-FRINGE diagnosis and repair, WE-2, WE-3)
→ TA-6 (independent problem set, all five problems).

**Session 3 (≥72 h later):**
Interleaved probe:
"Setup A: d = 0.5 mm, D = 1 m, λ = 500 nm. Find β and the position of the 5th dark fringe.
Setup B: Identical to A, but a slab of n = 1.5, t = 10 μm covers S₁. Find the fringe shift
in mm and the new position of the central bright fringe."
[Setup A: β = 1.0 mm; 5th dark (n = 4): y = 4.5 mm.
 Setup B: shift = 10 mm toward S₁; central fringe at y = +10 mm from screen centre.]
This probe forces simultaneous recall of β, dark-fringe indexing, and slab-shift formula.
It also probes MC-CENTRAL-FRINGE directly in a calculation context.

**Pre-diffraction session:**
All five P91 probes administered cold (no hints, no formula sheet).
Require 4/5 (MP-1 through MP-5) before advancing to phys.opt.diffraction.

**Interleaving partners:**
phys.opt.wave-optics (coherence is the logical precondition for YDSE — retrieve together),
phys.wave.interference (constructive/destructive conditions are the core logic — the YDSE
derivation is a direct application),
phys.opt.diffraction (the single-slit diffraction envelope modulates the YDSE multiple-slit
pattern in real experiments — forward link; YDSE mastery is its prerequisite).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.opt.youngs-experiment ✓
V-2   prerequisites listed and exist in KG: phys.opt.wave-optics,
      phys.wave.interference ✓
V-3   bloom level consistent with difficulty 4/proficient: apply ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.80 ✓
V-5   estimated_hours reasonable for difficulty: 5h for proficient (4) ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs (PA-3 hard limit) ✓
V-7   cpa_entry_stage rationale present: laser/torch through two slits →
      stripes not two bright spots; "why does adding light create darkness?" ✓
V-8   ≥2 misconceptions engineered:
      MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION,
      MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P01, P06]: laser-through-two-slits physical anchor ✓
V-12  TA-4 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION ✓
V-13  TA-7 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: wave-optics, wave.interference, diffraction ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
