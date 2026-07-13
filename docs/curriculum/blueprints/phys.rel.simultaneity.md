# Teaching Blueprint — phys.rel.simultaneity

## Component 0 — Concept Identity

```yaml
concept_id: phys.rel.simultaneity
name: "Relativity of Simultaneity"
domain: relativity
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.rel.postulates
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Imagine you're standing in the middle of a long train. Lightning strikes both ends simultaneously — you see both flashes at the same moment. For you, the events were simultaneous. Now watch what happens to a person watching from the platform as the train roars past: the front of the train is rushing toward one lightning bolt and receding from the other. That observer sees the two flashes at different times. Did the strikes happen at the same time? The answer depends on the observer's reference frame. Einstein's insight: "simultaneous" is not an absolute fact — it's relative to the observer.

### Level 2 — Developing Understanding

**Einstein's train thought experiment:**
- Frame S (platform): observer at midpoint of two simultaneity points A and B. Lightning strikes A and B simultaneously in this frame.
- Frame S' (train): observer in middle of train, moving at velocity v relative to platform.
- Light from both flashes travels at c toward the train observer.
- But the train observer is moving toward the front flash and away from the rear flash.
- The front flash reaches the train observer first → for the train observer, the front flash happened FIRST.

**Relativity of simultaneity:**
Two events that are simultaneous in one reference frame are generally NOT simultaneous in another frame moving relative to the first — UNLESS the events are at the same spatial location.

**Mathematical statement:**
For two events at positions x₁, x₂ in frame S occurring simultaneously (same t), in frame S' moving at velocity v:
Δt' = γ(Δt − vΔx/c²)

For simultaneous events in S: Δt = 0, so Δt' = −γvΔx/c²

If Δx ≠ 0 → Δt' ≠ 0: the events are NOT simultaneous in S'.

**Leading-clock-lags rule:**
In a frame S' moving at velocity v relative to S, a set of clocks synchronized in S appear to be out of synchronization in S'. Clocks ahead (in the direction of motion) appear to lag behind. Leading clocks read earlier times.

Δt' = −vΔx/c² × γ (for events simultaneous in S, separated by Δx in the direction of motion)

**Important caveat:** Simultaneity is relative, but the time ordering of causally connected events is NOT relative — if A causes B, then A before B in every frame (since causality requires signal speed ≤ c).

### Level 3 — Proficient Synthesis

**Spacetime diagram representation:**
- In a spacetime diagram (ct vs. x), simultaneity lines are horizontal (t = constant) for frame S.
- For frame S' (moving at v), the line of simultaneity is tilted — points that appear simultaneous in S' lie along lines of slope v/c in the ct-x plane.
- Events above/below the simultaneity line have their temporal order depending on the frame.

**Derivation from Lorentz transformation:**
The Lorentz transformation gives: t' = γ(t − vx/c²)
For two events: Δt' = γ(Δt − vΔx/c²)
At Δt = 0 (simultaneous in S): Δt' = −γvΔx/c²
This is non-zero whenever Δx ≠ 0 and v ≠ 0.

**Relativity of simultaneity and causality:**
For space-like separated events (Δx² > c²Δt²): time ordering is frame-dependent (no causal connection possible).
For time-like separated events (c²Δt² > Δx²): time ordering is absolute (signal could travel from earlier to later event at speed ≤ c).
For light-like separated events (Δx² = c²Δt²): simultaneous in no frame other than the one where Δt = 0 at the boundary.

**The "leading clocks lag" mnemonic:**
In a train of clocks (all synchronized in the platform frame S) observed from a moving train S': the clock at the front of the platform is "leading" (in the direction of platform motion relative to S') and reads an earlier time. Lag by Δt = vΔx/c².

---

## Component 2 — Worked Examples

### WE-1: Train Thought Experiment — Quantitative

**Problem:** A train moves at v = 0.6c relative to a platform. Two lightning bolts strike the ends of the train (separated by L = 1200 m in the platform frame) simultaneously in the platform frame.
(a) What is the time difference between the two events as measured by an observer on the train?
(b) Which event does the train observer say happens first?

**Solution:**

γ = 1/√(1 − v²/c²) = 1/√(1 − 0.36) = 1/√0.64 = 1/0.8 = **1.25**

**(a) Time difference in train frame:**
Δt' = γ(Δt − vΔx/c²)

Events are simultaneous in platform frame: Δt = 0
Spatial separation in platform frame: Δx = 1200 m (rear bolt at x=0, front bolt at x=1200 m)
v = 0.6c = 0.6 × 3×10⁸ = 1.8×10⁸ m/s

Δt' = γ(0 − vΔx/c²) = 1.25 × (−(1.8×10⁸ × 1200)/(3×10⁸)²)
= 1.25 × (−2.16×10¹¹/9×10¹⁶)
= 1.25 × (−2.4×10⁻⁶)
**Δt' = −3.0×10⁻⁶ s = −3.0 μs**

**(b) Which event first?**
The negative sign means the front bolt (larger x) happens EARLIER in the train frame.
The rear bolt strikes 3.0 μs AFTER the front bolt in the train's frame.

Summary: Events simultaneous in platform frame; front bolt happens first (by 3 μs) in the train frame.

---

### WE-2: Synchronized Clocks on a Moving Platform

**Problem:** Three clocks A, B, C are placed at positions x = 0, 500 m, and 1000 m along a platform, synchronized in the platform frame (all read t = 0 at t = 0 in that frame). A train passes at v = 0.8c.
(a) What is γ?
(b) When the train observer passes clock A (which reads t_A = 0), what time does the train observer say clock B and clock C read?
(c) Which clock reads the latest time according to the train observer?

**Solution:**

**(a) γ:**
γ = 1/√(1 − 0.64) = 1/√0.36 = 1/0.6 = **5/3 ≈ 1.667**

**(b) Clock readings in train frame:**
Train observer's frame S' passes clock A (x=0) when t=0 in S.
In S', the time shown on a clock at position x in S (at the moment t=0 in S) is:
t'_shown = t' of event "clock at x reads 0" = γ(t − vx/c²) = γ(0 − vx/c²) = −γvx/c²

For clock B (x = 500 m):
t'_B = −(5/3)(0.8c)(500)/c² = −(5/3)(0.8)(500)/(3×10⁸) = −(5/3)(1.33×10⁻⁶) = **−2.22×10⁻⁶ s = −2.22 μs**

For clock C (x = 1000 m):
t'_C = −(5/3)(0.8)(1000)/(3×10⁸) = −(5/3)(2.67×10⁻⁶) = **−4.44×10⁻⁶ s = −4.44 μs**

**(c) Which reads latest?**
Clock A reads 0, B reads −2.22 μs, C reads −4.44 μs. Clock A reads the latest (0 > −2.22 > −4.44).

**Leading clocks lag:** C (at x=1000m) is the "leading" clock in the direction of train motion → reads the earliest time in the train frame. A (at x=0) reads the latest time. The leading clock lags.

---

### WE-3: Causal Order and Simultaneity

**Problem:** Two events occur in frame S:
- Event 1: (x₁, t₁) = (0, 0)
- Event 2: (x₂, t₂) = (6×10⁸ m, 3 s)

(a) Are the events time-like, space-like, or light-like separated?
(b) Is the time ordering (Event 1 before Event 2) the same in all frames?
(c) Can frame S' exist where the events are simultaneous?

**Solution:**

**(a) Interval classification:**
Δx = 6×10⁸ m, Δt = 3 s
c×Δt = 3×10⁸ × 3 = 9×10⁸ m

Compare: (cΔt)² vs. (Δx)²
(9×10⁸)² = 8.1×10¹⁷ m²
(6×10⁸)² = 3.6×10¹⁷ m²

Since (cΔt)² = 8.1×10¹⁷ > (Δx)² = 3.6×10¹⁷: **Time-like separation**

**(b) Time ordering:**
For time-like separated events: a signal could travel from Event 1 to Event 2 at speed v = Δx/Δt = (6×10⁸)/(3) = 2×10⁸ m/s = (2/3)c < c. Causal connection is possible. **Time ordering is absolute** — Event 1 before Event 2 in ALL frames.

**(c) Can they be simultaneous?**
For two events to be simultaneous in some frame, they must be space-like separated. Since they are time-like separated, **no frame exists where they are simultaneous**. Making them simultaneous would require Δt' = 0 and using the Lorentz transformation requires |v| > c, which is impossible.

---

## Component 3 — Misconception Engine

### MC-1: MC-SIMULTANEITY-IS-JUST-TRAVEL-TIME-OF-LIGHT

**trigger_signal:** Student states "the platform observer doesn't really see them simultaneously — the light just happens to arrive at the same time because of the geometry" or "Einstein's train experiment just shows a light travel delay, not anything fundamental."

**conflict_evidence [P28]:** The "light travel time" argument applies to all observers equally — it is already accounted for in the relativity of simultaneity analysis. The platform observer who is equidistant from A and B receives the two light pulses at the same time → therefore the events were simultaneous in the platform frame (after accounting for light travel time). The train observer also receives pulses at different times (front first) → after accounting for the fact that both pulses travel at c and equal distances, the train observer concludes the front event happened first. This isn't a perceptual illusion — it's a real physical difference in what "simultaneous" means per frame. The mathematical statement Δt' = −γvΔx/c² has no "travel delay" correction factor — it IS already the corrected, proper simultaneity definition.

**bridge_text [P30]:** Light travel delay analysis assumes we know when events happened and just need to correct for the delay. Einstein's framework goes deeper: after fully correcting for light travel times, two frames still disagree about simultaneity. The disagreement is not a measurement error or delay artifact — it is a fundamental feature of spacetime. Time-of-observation ≠ time-of-event; both frames are careful about this distinction.

**replacement_text [P31]:** Relativity of simultaneity is NOT a light travel time effect. The standard analysis (platform observer at midpoint, equidistant from A and B) already accounts for equal travel times — yet the platform observer says simultaneous, while the train observer (accounting equally carefully for travel times) says front-first. The disagreement persists after all travel time corrections → it is a genuine physical difference in simultaneity between inertial frames, described quantitatively by Δt' = −γvΔx/c².

**discrimination_pairs [P33]:**
- "If we correct for light travel time, both observers would agree on whether the bolts were simultaneous" → FALSE: even after correcting for travel time, the inertial frames disagree. The Lorentz transformation gives Δt' = −γvΔx/c² ≠ 0 regardless of where the observer is located in the frame.
- "The platform observer and train observer genuinely disagree on the order of spatially separated simultaneous events, even after accounting for light travel time" → TRUE: Δt' = −γvΔx/c² is a fundamental, fully corrected result. ✓

**s6_path:** If student fails "is this just travel delay" probe → calculate Δt' for specific numbers, emphasize that the travel-time-corrected result still gives Δt' ≠ 0 before mastery gate.

---

### MC-2: MC-SIMULTANEITY-AFFECTS-CAUSAL-ORDERING

**trigger_signal:** Student concludes "if simultaneity is relative, then causality is also relative — maybe cause and effect can be reversed in some frame" or "event A causing event B might look like B causing A to some observer."

**conflict_evidence [P28]:** For causally connected events, the signal must travel at speed v_signal ≤ c. If Event 1 causes Event 2, Δx/Δt ≤ c for the causal signal → (cΔt)² ≥ (Δx)² → time-like separated. The Lorentz transformation cannot reverse time ordering for time-like events without requiring |v_observer| > c, which is impossible. WE-3 demonstrates this: time-like separated events have absolute time ordering in all frames. Only space-like separated events (which cannot be causally connected at all) can have their ordering reversed — but those events cannot influence each other anyway, so no causal paradox arises.

**bridge_text [P30]:** "Relative" in special relativity doesn't mean "anything goes." The causal structure — which events can influence which — is absolute. Only the temporal ordering of causally disconnected events (space-like separated) is frame-dependent. This is built into the geometry of spacetime: the light cone divides spacetime into the absolute past (time-like past), absolute future (time-like future), and "elsewhere" (space-like) where ordering is frame-dependent but no causal link exists anyway.

**replacement_text [P31]:** Causality is preserved in special relativity. The time ordering of causally connected events (time-like separated: |Δx| < c|Δt|) is absolute — the same in every inertial frame. Frame-dependent simultaneity applies only to space-like separated events (|Δx| > c|Δt|), which cannot be causally connected (no signal can bridge that gap at speed ≤ c). Therefore, relativity of simultaneity never implies reversal of cause and effect.

**discrimination_pairs [P33]:**
- "If A causes B, then some fast-moving observer might see B before A — cause and effect reversed" → FALSE: causal events are time-like separated; no inertial observer can see them in reverse order without requiring a speed > c.
- "For two space-like separated events, different frames can disagree on their order" → TRUE — but space-like events cannot be causally connected, so this never creates a causal paradox. ✓

**s6_path:** If student conflates simultaneity-relative with causality-relative → interval classification (space-like vs. time-like) worksheet + WE-3 worked through before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Knows Einstein's name; no model of simultaneity; thinks "simultaneous means at the same time globally" | Cannot explain why two observers disagree; attributes difference to light travel delay |
| S3 | Understands the conceptual argument (train thought experiment); attributes the effect to light travel times; cannot calculate Δt' | Correctly describes which flash arrives first to each observer but says "it's just perspective" |
| S6 | Understands relativity of simultaneity is genuine (not travel delay); can apply Δt' = γ(Δt − vΔx/c²); confused about causality implications | Correctly does WE-1; cannot classify time-like vs. space-like or address WE-3 |
| S9 | Applies the simultaneity formula fluently; distinguishes space-like and time-like separation; explains why causality is preserved; draws spacetime diagrams with tilted simultaneity lines | Correctly handles all three WEs; derives leading-clock-lags rule from the transformation |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 5, accelerated P track; domain=physics, bloom=analyze → C).

**TA-1 [P01 — Session Open]**
"A train moves at 0.6c through a station. Lightning strikes both ends of the station simultaneously (in the station frame). The station master at the midpoint sees both flashes at the same instant. A passenger at the midpoint of the train — where do they see the flashes? Write your prediction, and state whether you think this is 'real' or just a perception effect."
[Diagnose S0/S3 — does student attribute to travel delay or recognize genuine simultaneity difference?]

**TA-2 [P06 — Concrete Anchor: train thought experiment]**
"[Display: train thought experiment diagram — two flash origins A and B, station observer equidistant, train observer mid-train, velocity arrow.] Station observer: equidistant, receives both at same time → simultaneous in station frame. Train observer: moving toward front flash, away from rear flash. Both pulses travel at c (Einstein's second postulate — same c in all frames). Front flash arrives first in train frame → NOT simultaneous. This is not perception, it's physics." [→ WE-1 quantitative setup]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Travel delay argument tested: does accounting for travel time fix it? Station observer already IS equidistant and concludes simultaneous — after accounting for travel time. Train observer is also equidistant from the flash origins (in their own frame) and accounts equally carefully for travel time. After correction: Δt' = γ(0 − vΔx/c²) = −3 μs ≠ 0. No travel-time correction changes this. It's a genuine result." [→ MC-1 discrimination pairs, then WE-1 calculation]

**TA-4 [P62 — Retrieval Seed]**
"From memory: state the two postulates of SR. From postulate 2: if c is the same in all frames, and the events at A and B emit pulses that both travel at c, why does the train observer receive them at different times even though (in their frame) they're equidistant? Think through the chain carefully."
[Consolidates postulates → simultaneity connection; identifies students still using Galilean intuition]

**TA-5 [P06 — Pictorial: leading clocks lag]**
"[Display: row of synchronized platform clocks, train moving past.] Clocks at x=0, 500m, 1000m all synchronized in platform frame. To the train observer, when they pass x=0 (t=0), the clock at x=500 reads an earlier time, x=1000 reads even earlier. Leading clocks (in direction of motion) lag. By Δt = −γvΔx/c²." [→ WE-2]

**TA-6 [P41 — Diagnostic: causal ordering]**
"Two events: (0, 0) and (6×10⁸ m, 3s). Can some frame reverse their time order? First: classify the separation — time-like, space-like, or light-like? [→ WE-3 setup] For space-like: ordering can vary. For time-like: ordering is absolute. What determines which category?" [→ WE-3]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Two flashes occur 1000 m apart simultaneously in frame S. A frame S' moves at 0.5c. Find Δt' and state which flash is first in S'. (2) Three clocks at x=0, 300m, 600m synchronized in S. What do they read in S' (v=0.7c) when S'-observer passes x=0 at t'=0? (3) Can any frame reverse the causal order of two events 100 m apart and 1 μs apart in time?

Closing thought: The relativity of simultaneity is not a curiosity — it is the reason for time dilation and length contraction. Both are consequences of the same Lorentz transformation that gives Δt' = γ(Δt − vΔx/c²). Understanding simultaneity is understanding all of special relativity.

Spaced retrieval: +1 day (train thought experiment and which flash comes first for each observer), +4 days (Δt' formula application), +2 weeks (time-like vs. space-like classification and causal ordering)."

[P91 gate: threshold 0.80. Failure → MC-1 travel-delay distinction and interval classification before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** In the Einstein train thought experiment, the train moves at v = 0.5c and lightning strikes at both ends simultaneously in the platform frame. Describe qualitatively what the train observer sees. Is this a real physical difference or just a difference in when the light arrives at their eyes? Explain.

**P-2 (Developing — identifies S6):** Two events are simultaneous in frame S, separated by Δx = 2000 m. Frame S' moves at v = 0.75c relative to S. (a) Find γ. (b) Find Δt'. (c) Which event occurs first in S'?

**P-3 (Proficient — identifies S9):** Two clocks at x = 0 and x = 3000 m are synchronized in frame S. Frame S' moves at v = 0.8c. (a) When the S' observer passes x=0 (t=0 in S), what does the clock at x=3000 m read in S? (b) What time does the S' observer assign to the event "clock at x=3000 m reads t=0 in S"? (c) Explain the "leading clocks lag" rule in terms of this result.

**P-4 (Mastery gate — confirms S9):** (a) Events A at (0, 0) and B at (8×10⁸ m, 4 s) in frame S. Classify the interval. Does any frame exist where A and B are simultaneous? Does any frame reverse their order? Justify with intervals. (b) For two simultaneous events in S at Δx = 1500 m, a frame S' at v = 0.4c measures a time difference of Δt'. Calculate Δt' and explain physically why the event at larger x appears to occur EARLIER in S'. Required: 2/2 at ≥0.80 accuracy for mastery gate.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Train thought experiment interactive. Slider: train speed (0 to 0.99c). Animation shows: two lightning flashes at platform ends, light pulses expanding at c from each end, platform observer at midpoint, train observer at midpoint. Clock readouts show when each observer receives each pulse. At v = 0: both observers agree. At v > 0: platform observer sees simultaneous, train observer sees front-first.

**VIS-2:** Synchronized clocks on moving platform. Row of clocks at x = 0, 500, 1000, 1500, 2000 m. Slider: train speed. Shows what each clock reads "at the same moment" according to the train observer. Graph: clock reading vs. position — straight line, negative slope (−γv/c²). Shows leading clocks lag. Numbers update with speed slider.

**VIS-3:** Spacetime diagram of simultaneity. X-axis: position, Y-axis: ct. Shows frame S simultaneity line (horizontal) and frame S' simultaneity line (tilted at angle arctan(v/c) from horizontal). Point events plotted. As v changes: the tilted line sweeps, changing which events appear simultaneous. Illustrates that space-like separated events can have frame-dependent ordering.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.rel.postulates | Second postulate (c constant in all frames) is the direct cause of simultaneity being relative | prerequisite |
| phys.rel.time-dilation | Time dilation is the consequence of simultaneity being relative applied to a single moving clock | unlocks |
| phys.rel.lorentz-transform | The Lorentz transformation is the mathematical form of all simultaneity relationships | downstream |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.rel.simultaneity ✓ |
| V-2 | name matches KG | PASS — "Relativity of Simultaneity" ✓ |
| V-3 | domain derived from prefix phys.rel → relativity | PASS ✓ |
| V-4 | difficulty label+number consistent (advanced=5) | PASS ✓ |
| V-5 | bloom matches KG (analyze) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — postulates ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (5) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 5, accelerated P track; domain=physics, bloom=Analyse) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (train quantitative Δt'), WE-2 (synchronized clocks), WE-3 (interval classification) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P62/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 3 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
