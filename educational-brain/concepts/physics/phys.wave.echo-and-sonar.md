# Echo, SONAR and Uses of Ultrasound — `phys.wave.echo-and-sonar`

## Identity

- **Concept ID**: `phys.wave.echo-and-sonar`
- **Curriculum location**: physics / waves and oscillations (sound)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.wave.sound-waves` — the load-bearing part is that sound is a
    longitudinal wave travelling at a finite speed through a medium (about
    340 m/s in air, about 1500 m/s in water), and that its pitch is set by its
    frequency. An echo turns that speed into a distance measurement.
- **Unlocks** (from KG): none listed. The round-trip timing idea is the same in
  radar, lidar and seismic surveying; ultrasound imaging connects to medical
  physics.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 9 Ch. 12 (Sound)

## Learning Objective

After this concept, the learner can:

1. Explain an echo as reflected sound and compute distances with d = vt/2.
2. Explain the minimum distance (about 17 m in air) for a distinct echo.
3. Define ultrasound by frequency (above about 20 kHz) and explain SONAR, medical
     ultrasound and bat echolocation.
4. Distinguish frequency (pitch) from amplitude (loudness).

## Core Understanding

An echo is sound reflected from a surface back to where it started. Because sound travels at a definite speed, the delay of the echo measures distance — but the sound has to go to the surface AND back. Clap 85 m in front of a large wall and the echo returns after 0.5 s: in that time sound at 340 m/s covers 170 m, the whole round trip, so the wall is at half that. In general 2d = vt, so d = vt/2. An echo after 2 s from a cliff means the cliff is 340 m away — whereas thunder heard 2 s after lightning, a one-way trip, means the storm is 680 m away.

You don't hear an echo in an ordinary classroom because your ear blends two sounds that arrive less than about 0.1 s apart. For the echo to come back at least 0.1 s after the original, the round trip must be at least 344 m/s × 0.1 s ≈ 34 m, so the reflecting surface must be at least about 17 m away. In smaller rooms the many reflections merge with the original sound and prolong it instead — reverberation.

Ultrasound is sound with a frequency above about 20 kHz, the upper limit of human hearing. It is inaudible because its pitch is too high, not because it is loud or quiet; loudness depends on amplitude, a separate property. Its short wavelength makes it travel as a narrow beam and reflect well from small objects, which is why it is used for measurement. SONAR sends ultrasonic pulses down from a ship: in sea water sound travels at about 1500 m/s, so an echo from the sea bed after 0.8 s means a depth of 1500 × 0.8 / 2 = 600 m. Bats locate insects by the echoes of their ultrasonic calls, and doctors image unborn babies and organs with ultrasound because, unlike X-rays, it is not ionising.

## Mental Models

- **Beginner (arriving)**: an echo is sound "bouncing back"; ultrasound is a
  special, powerful kind of sound.
- **Intermediate**: echo time measures a round trip, d = vt/2; a distinct echo needs
  a far enough reflector; ultrasound is high-frequency sound used for ranging and
  imaging.
- **Advanced**: echo-ranging resolution depends on wavelength and pulse length;
  the speed of sound depends on the medium (and temperature), so SONAR must use
  the right v.
- **Expert**: the same pulse-echo principle underlies radar, lidar, seismic
  reflection surveys and Doppler ultrasound for blood flow.
- **Versioning note**: install the intermediate model; flag that the speed used
  must match the medium.

## Why Students Fail

The commonest error is d = vt, dropping the round trip — it doubles every answer.
Second, "ultra" is heard as "super-strong", so ultrasound is thought of as loud,
mixing up frequency and amplitude. Third, learners assume any wall gives an echo
and cannot explain why rooms usually don't.

## Misconceptions

**M1 — The echo distance is speed × echo time**
- *Why*: d = vt is the first formula learned for motion (type 4,
  overgeneralisation).
- *Symptom / phrases*: "0.8 s at 1500 m/s, so 1200 m deep".
- *Detection probe (verbatim)*: "A ship sends a sound pulse down and hears the echo
  from the sea bed 0.8 s later. Sound travels at 1500 m/s in sea water. How deep
  is the sea?"
- *Recovery*: the 85 m wall whose echo "says" 170 m — the sound went there and back.
- *Verification*: three echo problems and one one-way (thunder) problem mixed.

**M2 — Ultrasound is very loud (or very quiet) sound**
- *Why*: "ultra" sounds like "intense" (type 2, everyday language).
- *Symptom*: "we can't hear it because it's too loud".
- *Detection probe*: "Why can't we hear the ultrasound a bat makes?"
- *Recovery*: a dog whistle blown hard is still silent to us — frequency, not
  amplitude, decides audibility.
- *Verification*: classify four sounds by frequency and by loudness separately.

**M3 — Every reflecting wall gives a distinct echo**
- *Why*: echoes are pictured as automatic (type 1, perceptual).
- *Symptom*: "the classroom wall should give an echo".
- *Detection probe*: "A wall 10 m away in air — can you hear a distinct echo?"
- *Recovery*: 20 m round trip takes 0.06 s, under the ear's 0.1 s limit; the
  reflection blends with the original sound.
- *Verification*: two minimum-distance items.

## Analogies

- **Best analogy**: throwing a ball at a wall and catching it — the time you wait
  covers the ball's trip there and back.
  *Breaking point*: a ball slows and falls; sound keeps a constant speed.
- **Alternative**: shouting a question across a valley and waiting for the reply —
  the reply time includes both directions.
  *Breaking point*: a person adds thinking time; a wall doesn't.
- **Anti-analogy to avoid**: "ultrasound is sound turned up to the max." It
  installs M2.

## Demonstrations

- **Home**: clap in front of a tall building at least 50 m away and listen for the
  echo; estimate the distance by pacing.
- **Teacher demo**: an ultrasonic distance sensor (as in parking sensors) reading
  distance to a moving hand.
- **Tone sweep**: a frequency generator rising past 15–20 kHz — the sound fades
  from hearing although the speaker keeps vibrating.
- **Prediction before demo**: "how far is the building if the echo takes 0.3 s?"

## Discovery Questions

**Structure**:
1. *Need*: "How does a ship know how deep the sea is beneath it?"
2. *Discovery*: from the clap-and-wall data, compare vt with the measured
   distance; find the factor 2.
3. *Direct instruction*: the 0.1 s hearing limit; ultrasound and frequency.
4. *Apply*: SONAR, bats, medical scans.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the clap and the wall.
2. **Worked examples** (high fit): cliff 340 m; SONAR 600 m; minimum 17 m.
3. **Error exposure** (high fit for M1/M2): the 170 m vs 85 m contradiction; the
   dog whistle.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Cliff: d = 340 × 2 / 2 = 340 m.
   (b) SONAR: d = 1500 × 0.8 / 2 = 600 m.
   (c) Minimum distance: 2d = 344 × 0.1 → d ≈ 17 m.

2. **ERROR-ANALYSIS** — a student writes "the sea is 1200 m deep". Ask what the
   pulse did during the 0.8 s.

3. **PREDICTION-BEFORE-DEMO** — before the tone sweep, ask whether the sound will
   get quieter or just disappear at a certain pitch.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "cliff echo after 1.5 s" → "why divide by 2?" → "three uses of ultrasound".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "there and back" every time an
echo time is used; pairs "pitch" with "frequency" and "loudness" with "amplitude";
names the medium before choosing a speed.

*Load-bearing sentence to slow down on*: "The echo time covers the trip there and
back — so the distance is half of speed times time."

*What to listen for*: "speed times time" for an echo → M1; "too loud to hear" →
M2; "every wall echoes" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A ship hears the echo from the sea bed 0.8 s later;
sound travels at 1500 m/s in sea water. How deep is the sea?" Correct: 600 m.

**Distractor-mapped items**:
- "SONAR echo after 0.8 s at 1500 m/s?" Options: 600 m, 1200 m, 1875 m, 300 m.
  Answer: 600 m. "1200 m" targets M1.
- "Why can't we hear a bat's call?" Options: too loud; too quiet; frequency above
  20 kHz; bats call in a vacuum. Answer: frequency. "Too loud" targets M2.

**Guided practice → independent practice fading ladder**:
1. Echo distances in air (3 problems).
2. SONAR depths (3 problems).
3. Minimum-distance reasoning (2 items).
4. Frequency vs amplitude classification (4 items).
5. (Unscaffolded) design a speed-of-sound measurement.

**Mastery gate set** (per assessment/05):
- *Production*: one air echo and one SONAR problem.
- *New surface*: a bat and a moth.
- *Mixed*: echo (round trip) and thunder (one way) interleaved.
- *Delayed*: one-week check — why no echo in a small room.

**Calibration note**: the formula is short, so learners feel done; the check that
reveals miscalibration is an interleaved one-way item — those who learned "divide
by 2" by rote divide there too.

## Tutor Recovery Strategy

*Likeliest utterance*: "isn't distance just speed times time?" (M1).

*Concept-specific smaller question*: "Draw the sound's path from the ship to the
sea bed and back. How many depths long is that path?"

*M2 recovery*: "If you blow a dog whistle harder, will you hear it?"

## Memory Hooks

- **Concept type**: principle (round-trip timing) + application (SONAR, ultrasound).
- **Review form** (per Delivery 2 §8): mixed echo/one-way problems as distributed
  practice; the frequency/amplitude contrast as a spaced prompt.
- **Automaticity target**: "d = vt/2 for an echo" before radar and seismic topics.
- **Interleaving partners**: `phys.wave.sound-waves`, `phys.wave.wave-speed`,
  `phys.wave.doppler-effect`.

## Transfer Connections

- *Near*: `phys.wave.sound-waves` and `phys.wave.wave-speed` — the speed that makes
  echo ranging possible.
- *Near*: `phys.wave.doppler-effect` — Doppler ultrasound measures blood flow.
- *Far*: radar and lidar — the same round trip with electromagnetic waves.
- *Real-world*: parking sensors, fish finders, foetal scans, bat and dolphin
  echolocation, crack detection in metal.
- *Expert transfer*: seismic reflection surveys mapping rock layers.

## Cross-Subject Connections

- **Biology**: echolocation in bats and dolphins; the human hearing range.
- **Geography**: ocean-floor mapping by SONAR; seismic surveys.
- **Medicine**: ultrasound scanning as safe, non-ionising imaging.
- **Mathematics**: rearranging d = vt/2; proportional reasoning.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.wave.echo-and-sonar.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 15). The audit also proposed
`phys.opt.reflection` as a prerequisite; it was dropped (KGCS P1) — an echo is
the reflection of sound and needs only the wave picture of sound.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
