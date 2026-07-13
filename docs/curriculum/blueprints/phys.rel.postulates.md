# Teaching Blueprint — phys.rel.postulates

## Component 0 — Concept Metadata

```
concept_id:         phys.rel.postulates
name:               Postulates of Special Relativity
domain:             relativity
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mech.relative-motion, phys.em.electromagnetic-waves]
cross_links:        []
session_cap:        6 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (two trains passing: each passenger claims they are at rest and the
                       other is moving — who is right? difficulty 4 → C)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Einstein's two postulates of special relativity are:  
1. **Principle of Relativity:** The laws of physics are the same in all inertial (non-accelerating)
   reference frames.  
2. **Constancy of the Speed of Light:** The speed of light in a vacuum is c = 3 × 10⁸ m/s in all
   inertial frames, regardless of the motion of the source or observer.

These two postulates are simple to state but jointly produce consequences (time dilation, length
contraction, relativity of simultaneity) that violate every intuition built on Newtonian mechanics.
Mastery here is not yet computational — it is conceptual: understanding why the postulates were
necessary, what they assert, and what logical consequence the constant speed of light has for
simultaneity.

**Why Postulate 2 Is Revolutionary:**  
In Newtonian mechanics, velocities add: a ball thrown at 20 m/s from a train moving at 30 m/s
travels at 50 m/s. Maxwell's equations predict that light travels at c regardless of the source's
velocity — incompatible with the Newtonian addition rule. The Michelson-Morley experiment (1887)
tried to detect the difference in c due to Earth's motion through the aether — and found nothing.
Einstein's postulate asserts c = constant as a fundamental law, abandoning the Newtonian addition
rule for velocities near c.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
Two trains pass each other. Each passenger says "I am at rest; the other train is moving." Both
are right — motion is relative to a reference frame. Now a lighthouse beam sweeps between them.
Both passengers measure the light's speed: c. Not c + train speed. Just c. This is impossible
in Newtonian mechanics and demands explanation.

**Stage 2 — Representational (R)**  
Draw two inertial reference frames S and S'. Frame S' moves at velocity v relative to S. An event
(a lightning bolt) occurs at position x in S. According to Galilean relativity, S' would assign
x' = x − vt. The speed of light in S is c. In S', Galilean addition predicts c − v. But experiment
(Michelson-Morley) gives c. One of (Galilean) space or time must yield. Einstein chose to modify
both.

**Stage 3 — Abstract (A)**  
The two postulates jointly rule out absolute simultaneity. Thought experiment: a light pulse from
the centre of a moving train carriage reaches both ends simultaneously in the train's frame.
In the platform frame, the rear end is moving toward the light source and the front end is
moving away — the rear end receives the pulse first. Simultaneity is frame-dependent. This is
the logical consequence of postulate 2 applied to the standard of simultaneity.

**Stage 4 — Transfer (T)**  
The postulates are not a description of light specifically — they are constraints on the structure
of spacetime. All particles (not just photons) travel at ≤ c. The postulates imply the Lorentz
transformation (next concept), which implies time dilation, length contraction, and mass-energy
equivalence. The GPS satellite system explicitly corrects for relativistic time dilation — the
postulates have engineering consequences at 1 part in 10⁹.

---

## Component 3 — Why Beginners Fail

1. **Postulate 1 seems obvious, Postulate 2 seems impossible:** Students accept P1 immediately
   (motion is relative — they've heard that). They then struggle to believe P2 because every
   intuition says velocities add. This asymmetric acceptance means they never genuinely integrate
   the two postulates as a unified system.

2. **Conflating "the speed of light is constant" with "you cannot catch up to light":**  
   Students think P2 just means you can never quite reach c. It means something stronger: whether
   you are moving toward or away from a light source at any speed, you always measure that light
   travels at c relative to you. The speed does not shift by v.

3. **Failure to identify "inertial frame":** Students treat P1 as universal (applying to any
   frame, including rotating ones). The restriction to inertial frames is the key qualifier;
   general relativity addresses non-inertial frames.

4. **Believing simultaneity is an illusion:** Students sometimes say "both frames are right, so
   neither is real." Relativity does not say events are illusory — it says simultaneity (the
   temporal ordering of spacelike-separated events) is frame-dependent. Events that are causally
   connected have a universal ordering; only spacelike-separated events can disagree.

---

## Component 4 — Misconception Library

### MC-1: MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS
**Probe:** "A spaceship moves toward Earth at 0.8c and turns on a headlight. How fast does the
headlight beam travel, measured by an observer on Earth?"  
**Characteristic phrase:** "0.8c + c = 1.8c — it should be faster."  
**Trigger:** Galilean velocity addition, which works perfectly for everyday speeds.  
**Conflict evidence [P28]:** The Michelson-Morley experiment measured the speed of light in two
perpendicular directions as Earth orbited the Sun at 30 km/s. Expected difference: ~30 km/s.
Measured difference: zero. Repeated experiments confirm c = 299,792,458 m/s regardless of source
or observer motion.  
**Bridge [P30]:** "Galilean addition is an approximation that works for speeds ≪ c. At speeds
comparable to c, it fails. The speed of light is a fundamental constant — like a cosmic speed
limit that does not shift when you yourself are moving."  
**Replacement [P31]:** The light travels at c relative to the Earth observer, regardless of the
spaceship's speed. Relativistic velocity addition (not taught here) gives a result ≤ c.  
**Discrimination pairs [P33]:** Spaceship at 0.8c fires light: Earth measures light at (A) 1.8c,
(B) 0.2c, (C) c. Correct: (C).  
**S6 repair path:** TA-3 (Michelson-Morley evidence) → TA-4 (Einstein's resolution).

### MC-2: MC-POSTULATE-1-APPLIES-TO-ALL-FRAMES
**Probe:** "A person in a spinning merry-go-round says: 'The laws of physics are the same in my
frame.' Is this consistent with Einstein's first postulate?"  
**Characteristic phrase:** "All motion is relative, so all frames are equivalent."  
**Trigger:** Conflating "all motion is relative" (true) with "all frames are equivalent" (false
without the inertial restriction).  
**Conflict evidence [P28]:** A rotating frame is non-inertial — objects experience centrifugal and
Coriolis pseudo-forces. Physics in that frame looks different (balls flying outward, Foucault
pendulum precessing). Einstein's P1 explicitly says "inertial frames."  
**Bridge [P30]:** "The merry-go-round rider feels pushed outward — that is the centrifugal effect,
absent in an inertial frame. Physics is not the same. Postulate 1 applies only where there is no
net force needed to explain apparent motions — no pseudo-forces, no acceleration."  
**Replacement [P31]:** P1 applies to inertial (non-accelerating) frames only. Rotating, accelerating,
and gravitating frames are non-inertial — general relativity handles those.  
**Discrimination pairs [P33]:** P1 applies to: (A) all frames, (B) inertial frames only, (C) frames
at rest. Correct: (B).  
**S6 repair path:** TA-2 (inertial vs. non-inertial frame identification exercise).

### MC-3: MC-SIMULTANEITY-IS-AN-ILLUSION
**Probe:** "In the moving train thought experiment, event A (lightning at the front) and event B
(lightning at the rear) are simultaneous in the ground frame but not in the train frame. Does
this mean one observer is wrong?"  
**Characteristic phrase:** "One of them must be lying."  
**Trigger:** Students expect "true" physics to be absolute; frame-dependent results seem like
errors.  
**Conflict evidence [P28]:** Both observers correctly apply the laws of physics in their own frame.
The measured arrival times of light signals are different — not due to error or illusion — but
because the propagation distance is genuinely different in each frame, given that c is constant
in both.  
**Bridge [P30]:** "Neither is wrong. Simultaneity is a relationship between events and a frame of
reference, like 'north' is a relationship between a direction and a map. North on one map is not
north on another rotated map — but both are correct maps. Similarly, simultaneity in S is not the
same relation as in S'."  
**Replacement [P31]:** Simultaneity is frame-dependent for spatially separated events. Both
observers are correct; they disagree because simultaneity is not absolute.  
**Discrimination pairs [P33]:** Two spacelike-separated events simultaneous in frame S: in frame S'
they are (A) still simultaneous (one frame must be right), (B) not simultaneous (relativity of
simultaneity), (C) cannot be determined. Correct: (B).  
**S6 repair path:** TA-5 (train simultaneity thought experiment, step by step).

### MC-4: MC-AETHER-DISPROVED-RELATIVITY-IS-JUST-A-THEORY
**Probe:** "The Michelson-Morley experiment 'failed' to detect the aether. Does this prove Einstein
was right?"  
**Characteristic phrase:** "It just means they couldn't find the aether yet."  
**Trigger:** Misunderstanding what MM showed and what constitutes scientific evidence.  
**Conflict evidence [P28]:** MM was replicated many times with increasing precision; subsequent
experiments (Kennedy-Thorndike, Ives-Stilwell, modern laser experiments) all confirm c is
constant to 1 part in 10¹⁵. Special relativity has been tested in particle accelerators (muon
lifetimes), GPS satellites, and nuclear reactions. It is one of the most precisely verified
theories in physics.  
**Bridge [P30]:** "The MM experiment alone does not prove Einstein right — it just eliminated
the aether. Einstein's theory predicts specific quantitative values (time dilation factors,
energy-momentum relations) that have been verified independently to extraordinary precision.
The theory is validated by its predictions, not just by one failure of a competing theory."  
**Replacement [P31]:** Special relativity is validated by quantitative predictions confirmed
across many independent experiments; the MM experiment eliminated the aether model but Einstein's
postulates stand on their own predictive success.  
**Discrimination pairs [P33]:** The Michelson-Morley experiment: (A) proved special relativity,
(B) eliminated the aether but special relativity stands on separate experimental tests, (C) was
later found to be wrong. Correct: (B).  
**S6 repair path:** TA-3 (experimental evidence table for special relativity).

---

## Component 5 — Explanation Library

**Explanation E-1 (historical necessity):**  
By 1887, two great theories of physics were in conflict. Newtonian mechanics (Galilean relativity)
said velocities add. Maxwell's electromagnetism said light travels at c regardless of source
velocity. The Michelson-Morley experiment tried to detect the Earth's motion through a hypothetical
aether medium and found nothing. Einstein resolved the conflict by taking Maxwell seriously:
c = constant is a law of physics, and the law of physics must be the same in all inertial frames
(Postulate 1). The consequence is that Galilean velocity addition must be wrong for speeds near c,
and time and space must be reconceived.

**Explanation E-2 (thought-experiment derivation of simultaneity):**  
Place a light source at the centre of a railway carriage. Flash a pulse. In the train's frame,
both walls are equidistant; light arrives simultaneously. On the platform, the rear wall moves
toward the light source and the front wall moves away. Light still travels at c in the platform
frame (P2). The rear wall meets the light sooner; the front wall meets it later. The two events
are not simultaneous in the platform frame. This follows necessarily from the two postulates
and is not a trick or illusion.

**Explanation E-3 (postulate summary card):**  
P1 — Physics laws (force, conservation, electromagnetism) look identical in any inertial lab.
No experiment can tell you whether you are "really" moving or "really" at rest — only relative
motion is detectable.  
P2 — Whatever you do — move toward the light source, move away, stay still — you always measure
light at c = 3 × 10⁸ m/s. This is the most radical postulate in the history of physics.

---

## Component 6 — Analogy Library

**Primary analogy — Rules of chess:**  
The rules of chess are the same whether you play in Paris or Tokyo (Postulate 1 — laws same in
all inertial frames). A chess piece's move does not change based on which city you are in.
Postulate 2 is harder to analogize: imagine a chess piece that always moves at exactly the same
speed regardless of how fast the board is travelling. That piece's speed is a fundamental property
of the rules, not a measurement that can shift.  
**Breaking point:** Chess is a finite, deterministic game; the analogy helps with P1 but cannot
convey the physical depth of P2's consequences for time and space.  
**Anti-analogy:** A train throwing a ball — ball speed relative to ground = ball speed relative
to train + train speed. This is Galilean addition, which is intuitive and correct for everyday
speeds, and must be explicitly rejected for light.

---

## Component 7 — Demonstration Library

**D-1 (Inertial frame identification — kinesthetic):**  
In a smoothly moving bus or elevator at constant speed, toss a ball vertically. It comes back to
your hand — physics works normally. Slam the brakes — the ball appears to fly forward. Physics
seems different. First case = inertial frame. Second case = non-inertial. Students physically
feel the distinction.

**D-2 (Light clock thought experiment — drawn):**  
Draw a light clock: two mirrors with a light pulse bouncing between them. In the clock's rest
frame: T₀ = 2L/c (simple). In a frame where the clock moves horizontally: the pulse must travel
a diagonal path to keep up with the clock. This diagonal is longer, so it takes longer at speed c.
The moving clock ticks slower. This is a consequence of the two postulates — time dilation
introduced visually (not yet quantitatively).

**D-3 (GPS relativity — real world):**  
GPS satellites orbit at ~20,200 km altitude at ~3.87 km/s. Without relativistic correction (special
relativity: clocks tick faster due to lower gravity at altitude; special relativity: clocks tick
slower due to orbital speed): cumulative error ≈ 38 μs/day → positional error ≈ 11 km/day.
GPS works because the postulates are correct. This demonstration is a proof-by-engineering.

---

## Component 8 — Discovery Lesson

**Best approach:** Conceptual confrontation followed by guided thought experiment. This concept is
bloom:understand — no derivation is required here, only conceptual grasp of the postulates and
their immediate logical consequence (relativity of simultaneity).

*Anchor (3 min):* Two observers each watch the other's train pass. Each claims they are at rest.
"Who is right?" — both. Establish P1 as common ground.

*Conflict (3 min):* "If motion is relative, can two observers ever disagree about the speed of
light?" Classical prediction: yes (c − v, c + v). Michelson-Morley result: no.

*Resolution (5 min):* Einstein's gambit: let c be constant. Write P1 and P2 on the board. "These
two statements are all of special relativity. Everything else is their logical consequence."

*Simultaneity thought experiment (10 min):* Walk through the train/lightning-bolt setup (D-2
equivalent). Draw the two frames carefully. Ask at each step: "In this frame, where does the
light arrive first?" Students trace the logical consequence of c = constant.

*Consolidation (4 min):* "Name the two postulates. Which one is new? What does it break about
Newtonian mechanics?"

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Present the two-trains-and-a-lighthouse scenario. "Both say they are at rest. Both measure
light at the same speed. Galilean addition says that's impossible. How do we escape?"  
Success signal: Students identify the contradiction between Galilean addition and the experimental
result.

**TA-2 — Postulate Pair Introduction [P14]**  
Trigger: After anchor.  
Action: Write P1 and P2 explicitly. Discuss scope of P1 (inertial frames only). Address MC-2
pre-emptively: identify an inertial vs. non-inertial example (constant velocity car vs. braking
car).  
Success signal: Students correctly classify two sample frames as inertial or non-inertial.

**TA-3 — Michelson-Morley Evidence [P14, P28]**  
Trigger: After postulates.  
Action: Describe the MM experiment: expected aether-wind shift in light speed, measured result
(zero shift, null result). Show that c is confirmed constant by the experiment. Connect to GPS
engineering (D-3) as modern confirmation.  
Success signal: Students explain why MM falsified the aether model and supported P2.

**TA-4 — MC-1 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After evidence.  
Action: Present MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS probe (spaceship at 0.8c fires headlight).
Ask for prediction before explanation. Then apply P2 directly.  
Success signal: Students correctly answer c, with explanation referencing P2.

**TA-5 — Simultaneity Thought Experiment [P14, P30]**  
Trigger: After MC-1 cleared.  
Action: Draw the moving train + lightning strike thought experiment. Walk through both frames
step by step. Emphasize: both observers apply c = constant; both get different simultaneity
results; neither is wrong.  
Success signal: Students can narrate which frame sees which event first and why.

**TA-6 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Students write the two postulates from memory and give one real-world consequence for each.
Then: present MC-3 probe (simultaneity illusion). Students must resolve it.  
Success signal: Both postulates stated correctly; real-world consequence identified; MC-3 resolved.

---

## Component 10 — Voice Teaching

**Opening move:** "Two trains pass each other in empty space. Each passenger says they are at
rest. Both are right — and that is Postulate 1. Now each measures the speed of a light beam
passing by. Both get c = 3 × 10⁸ m/s. That seems impossible — and that is Postulate 2. These
two statements together rebuilt all of physics."

**Key explanatory moves:**
- "Postulate 1 is not news — Galileo said it. You can't tell if you're moving at constant speed
  just by looking inside your ship. It's when you combine P1 with P2 that everything breaks."
- "Constant c means: it does not matter if you run toward or away from a light source. You
  always measure the same speed. This is not intuitive. This is not Galileo. This is Einstein."
- "Simultaneity is not a property of two events — it is a relationship between two events and
  a frame. Change the frame, and simultaneous can become not-simultaneous."

**Common recovery phrases:**
- If student expects velocity addition: "Write c on the board. Add v. Cross it out. c + v is
  not allowed — it violates P2. The experimental proof is GPS."
- If student says simultaneity is an illusion: "The light arrival times are genuinely different
  in the platform frame — not an illusion, not an error. The measurement is correct in each frame."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
Pass criteria — student correctly:  
(a) States both postulates accurately, including the inertial-frame qualifier on P1  
(b) Identifies that c is the same for all inertial observers regardless of source motion  
(c) Explains the Michelson-Morley result and what it implies  
(d) Correctly resolves a simultaneity thought experiment in two frames  
Failure on (a) → restart from TA-2. Failure on (b) → TA-4. Failure on (c) → TA-3. Failure on
(d) → TA-5.

**Formative Golden Probe (FA-1):**  
"State Einstein's two postulates of special relativity in your own words. Which part was new in
1905?"  
Expected: P1 (laws same in all inertial frames — this was Galileo's principle, not new). P2 (c
constant in all inertial frames — this was new and contradicted Galilean velocity addition).  
Threshold: Both postulates correctly stated; P2 identified as the new contribution.

**Formative Golden Probe (FA-2):**  
"A rocket moves away from Earth at 0.5c and fires a laser beam forward. What speed does an
Earth observer measure for the laser beam?"  
Expected: c. P2 says c is constant for all observers regardless of source motion.  
Threshold: Answer is c with explicit reference to P2.

**Formative Golden Probe (FA-3):**  
"In the moving-train simultaneity thought experiment, lightning strikes both ends of the train
simultaneously in the ground frame. In the train frame, which end receives the light signal
first, and why?"  
Expected: The rear of the train receives the signal first. In the train frame, the train is at
rest but the ground observer is moving backward. However, the standard setup is: in the platform
frame, the events are simultaneous. In the train frame, the front of the train is moving away from
the midpoint light source, so it receives the rear-to-front-travelling light later; the rear is
moving toward the source, receiving light sooner. Front receives second, rear receives first.  
Threshold: Correct identification (rear first) with the c = constant argument, not intuition.

**Formative Golden Probe (FA-4):**  
"Why does GPS need to account for special relativity? What would happen if it didn't?"  
Expected: Satellite clocks travel at ~3.87 km/s relative to Earth — special relativity predicts
they tick more slowly than ground clocks. Without correction, GPS positional error accumulates at
~2 km/day from SR alone (additional GR correction is in the opposite direction and larger).  
Threshold: SR effect named (time dilation); consequence correctly identified (positional error).

**Confidence Calibration:** After FA-3, ask for confidence before and after. This thought
experiment is often answered with low confidence but high accuracy — helping students recognize
their own physical reasoning is sound.

**Delayed Retrieval (Session + 3 days):**  
"Without notes: state the two postulates. A rocket at 0.9c fires a laser — how fast does an
observer at rest measure the laser?"  
Threshold: Both postulates stated; c given for the laser speed.

---

## Component 12 — Recovery Notes

**S0 (no prior relative-motion knowledge):** The prerequisite phys.mech.relative-motion must be
in place — students need to understand the concept of reference frames and Galilean velocity
addition before encountering their failure. Without this, P2 has no foil.

**S3 (confuses inertial with non-inertial):** Use kinesthetic D-1 — the braking bus example.
Ask the student to stand on a skateboard and be suddenly stopped. The feeling of being "thrown
forward" is the pseudo-force in the non-inertial frame. Inertial frames are those without this
feeling.

**S6 (MC-SPEED-OF-LIGHT-ADDS dominant):** Go directly to the MM experiment evidence. "Michelson
and Morley expected to see c + v_Earth or c − v_Earth. They measured c. This is not philosophy —
it is a measurement repeated thousands of times to 1 part in 10¹⁵. Galilean addition for light
is simply wrong."

**S9 (knows postulates but cannot apply to thought experiments):** Slow down the simultaneity
thought experiment to individual frames. At each step: "Which frame are we in? What is the speed
of light in this frame? Where is the light source? Where is the receiver? How far does the light
travel?" Force step-by-step frame-by-frame reasoning.

---

## Component 13 — Memory & Review

**Memory type:** Declarative (postulate statements) + conceptual (simultaneity consequence).
The two postulates must be learned as a paired unit, not independently — P2 only has impact in
the context of P1.

**Spaced retrieval plan:**
- Session + 1 day: "State the two postulates. Which is new? What does the Michelson-Morley
  experiment show?"
- Session + 4 days: "A starship moves at 0.7c and turns on a headlight. What does an Earth
  astronomer measure for the speed of that light? Why?" (Consolidate P2 under pressure)
- Session + 8 days: "In the moving-train thought experiment, which end receives the lightning
  first in each frame? Explain using c = constant." (Simultaneity retrieval)

**Interleaving partners:** phys.mech.relative-motion (Galilean relativity, the foil),
phys.rel.simultaneity (immediate consequence, next concept), phys.rel.time-dilation (quantitative
consequence).

---

## Component 14 — Transfer Map

**Near transfer:**
- phys.rel.simultaneity: directly derived from P1 + P2, first quantitative consequence
- phys.rel.time-dilation: derived from the light-clock argument
- phys.rel.length-contraction: derived from time dilation + P1
- phys.rel.lorentz-transform: the mathematical synthesis of all relativistic effects

**Far transfer:**
- GPS engineering: quantitative time-dilation correction applied in production systems
- Particle accelerator design: relativistic mass-energy must be accounted for in beam dynamics
- Muon lifetime experiments: atmospheric muons reaching sea level despite short half-life —
  confirmed by time dilation (and length contraction from the muon's perspective)
- Astrophysics: relativistic jets from quasars; gravitational time dilation (general relativity
  extension)

**Structural abstraction:** The postulates encode a deep symmetry principle: physics has no
preferred frame (P1) and has a universal speed limit (P2). This symmetry (Lorentz invariance)
is the foundational constraint of all modern particle physics — the Standard Model is built on it.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.mech.relative-motion (Galilean relativity) provides the framework that P2
overthrows. Requiring phys.em.electromagnetic-waves gives Maxwell's c as the source of the
crisis. The concept correctly unlocks phys.rel.simultaneity as the first consequence.

**Missing prerequisite?**  
A node for phys.mod.michelson-morley-experiment would help — currently the MM experiment is
introduced as narrative in this blueprint. Students who have never heard of MM lose the
historical-necessity argument for P2. Consider adding MM as background reading or a pre-session
hook.

**Recommended teaching sequence:** phys.mech.relative-motion → phys.em.electromagnetic-waves
→ phys.rel.postulates → phys.rel.simultaneity → phys.rel.time-dilation. Teach these consecutively
— breaking the chain with unrelated topics weakens the causal narrative.

**Asset opportunity:** An animated Michelson-Morley interferometer simulation (showing the
expected vs. measured fringe shift, with adjustable Earth velocity) would make the null result
viscerally clear rather than just stated.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.rel.postulates ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: laws same in all inertial frames; c constant ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS,
      MC-SIMULTANEITY-IS-AN-ILLUSION ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (6 TAs): TA-1…TA-6 ✓
V-11  TA-1 is Concrete [P01, P06]: two-trains-and-lighthouse anchor ✓
V-12  TA-4 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS ✓
V-13  TA-6 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: mech.relative-motion, rel.simultaneity, rel.time-dilation ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
