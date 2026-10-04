# Modulation and Signal Propagation — `phys.em.communication-systems`

## Identity

- **Concept ID**: `phys.em.communication-systems`
- **Curriculum location**: physics / electricity and magnetism (EM waves in use)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.electromagnetic-waves` — the load-bearing part is that EM waves travel at
    c = fλ in vacuum, need no medium, and span a spectrum from radio to gamma.
- **Unlocks** (from KG): none listed. Leads to antennas
  (`phys.em.radiation-and-antennas` — related), optical-fibre and satellite links.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 15 (Communication Systems)

## Learning Objective

After this concept, the learner can:

1. Explain why audio is carried on a high-frequency carrier (antenna size, channels).
2. Distinguish AM from FM and compute AM bandwidth.
3. Explain ground-wave, sky-wave and space-wave propagation.
4. Compute line-of-sight range d = √(2Rh).

## Core Understanding

A radio station does not send sound. A microphone turns sound into an electrical signal; the transmitter uses that signal to shape an electromagnetic wave; the receiver extracts the signal and a loudspeaker turns it back into sound. The wave that crosses the gap is electromagnetic, travelling at 3 × 10⁸ m/s, which is why radio works across the vacuum of space while sound cannot.

The audio itself cannot simply be radiated. An antenna radiates efficiently only if its length is a sizeable fraction of the wavelength, around λ/4 or λ/2. A 1 kHz audio signal has λ = c/f = 300 km — a quarter-wave antenna would be 75 km long. And if every station broadcast at audio frequencies, they would all overlap. Instead each station uses its own high-frequency carrier — 100 MHz has λ = 3 m, so a 0.75 m antenna works — and modulates it with the audio. In amplitude modulation (AM), the carrier's amplitude rises and falls with the audio; an AM channel occupies a bandwidth of twice the highest audio frequency, so 5 kHz audio needs 10 kHz. In frequency modulation (FM), the carrier's frequency rises and falls with the audio while its amplitude stays constant; because most electrical noise changes amplitude, FM sounds cleaner.

How far a signal travels depends on its frequency. Low and medium frequencies (long and medium wave) travel as ground waves, following Earth's curve for hundreds of kilometres. Frequencies of about 3–30 MHz (short wave) are bent back to Earth by the ionosphere — sky waves — and can hop around the world; at night, when the lower, absorbing layer of the ionosphere fades, medium-wave AM stations also travel much further, which is why distant AM stations come in at night. Above about 30 MHz (VHF, UHF, microwaves) the waves pass straight through the ionosphere, so FM, TV and mobile signals travel line of sight as space waves. A transmitter at height h sees the horizon at about d = √(2Rh), where R = 6.4 × 10⁶ m is Earth's radius: a 100 m mast reaches about 36 km, which is why such services need tall masts, many cells or satellites.

## Mental Models

- **Beginner (arriving)**: radio waves are sound waves; stations broadcast the sound
  directly.
- **Intermediate**: EM carrier modulated by audio; AM vs FM; bandwidth; ground, sky and
  space waves; horizon range.
- **Advanced**: sidebands; digital modulation (ASK, FSK, QAM); Shannon capacity and
  bandwidth.
- **Expert**: multiplexing; ionospheric physics; error-correcting codes.
- **Versioning note**: install the intermediate model; mention that phones and Wi-Fi use
  digital modulation of the same carrier idea.

## Why Students Fail

"Radio" is associated with sound, so the wave is assumed to be sound. The need for a
carrier is invisible from the listener's side. And the dependence of propagation on
frequency is rarely explained.

## Misconceptions

**M1 — Radio waves are sound waves that travel a long way**
- *Why*: the device makes sound (type 4).
- *Symptom / phrases*: "the sound travels from the station".
- *Detection probe (verbatim)*: "What kind of wave travels from a radio station to your
  radio?"
- *Recovery*: radio from the Moon across vacuum; the microphone-to-speaker chain.
- *Verification*: compare sound and radio waves on three properties.

**M2 — The audio signal could be broadcast directly without a carrier**
- *Why*: modulation seen as an unnecessary complication (type 5).
- *Symptom*: "why not just send the voice signal?"
- *Detection probe*: "Why don't stations transmit the audio signal (say 1 kHz) directly
  as an electromagnetic wave?"
- *Recovery*: a 75 km antenna; all stations overlapping.
- *Verification*: antenna-length calculations at two frequencies.

**M3 — Higher-frequency signals always travel further**
- *Why*: "higher energy goes further" (type 5).
- *Symptom*: "FM is better, so it reaches further".
- *Detection probe*: "Why can you hear distant AM stations at night but FM only from
  nearby?"
- *Recovery*: sky waves for 3–30 MHz; VHF passes through the ionosphere.
- *Verification*: assign propagation modes to four frequencies.

## Analogies

- **Best analogy**: a delivery truck (the carrier) carrying a parcel (the audio) — you
  can't throw the parcel 100 km, but the truck can drive it there.
  *Breaking point*: the "parcel" is impressed on the truck's shape, not loaded inside.
- **Alternative**: a stone skipping off a pond — short waves "skip" off the ionosphere.
  *Breaking point*: the ionosphere refracts gradually rather than bouncing.
- **Anti-analogy to avoid**: "radio is very loud sound." It installs M1.

## Demonstrations

- **Home**: tune an AM radio at night and during the day; compare distant stations.
- **Teacher demo**: a signal generator showing AM and FM waveforms on an oscilloscope; a
  small FM transmitter and receiver.
- **Prediction before demo**: "with FM, what happens to the waveform's height as the
  audio changes?"

## Discovery Questions

**Structure**:
1. *Need*: "How does a song get from the studio to your car?"
2. *Discovery*: antenna length for audio vs carrier; AM/FM waveforms.
3. *Direct instruction*: modulation, bandwidth, propagation, horizon.
4. *Apply*: masts, satellites, short-wave broadcasting.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): AM at night.
2. **Worked examples** (high fit): λ = 300 km vs 3 m; 10 kHz bandwidth; 36 km range.
3. **Error exposure** (high fit for M1/M2): radio across vacuum; the 75 km antenna.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) 1 kHz: λ = 3 × 10⁸ / 10³ = 300 km; 100 MHz: λ = 3 m, λ/4 = 0.75 m.
   (b) AM bandwidth: 2 × 5 kHz = 10 kHz.
   (c) d = √(2 × 6.4 × 10⁶ × 100) ≈ 3.6 × 10⁴ m = 36 km.

2. **ERROR-ANALYSIS** — a student says radio waves are sound. Ask about the Moon
   landings.

3. **PREDICTION-BEFORE-DEMO** — before the FM waveform, ask what changes.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "why a carrier?" → "AM vs FM" → "range of a 64 m mast".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor traces the chain sound → electrical signal
→ modulated carrier → signal → sound; names the propagation mode with the frequency.

*Load-bearing sentence to slow down on*: "The wave that crosses the distance is
electromagnetic — sound exists only at the microphone and the speaker."

*What to listen for*: "sound travels to the radio" → M1; "just send the voice" → M2;
"higher frequency goes further" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Why not transmit 1 kHz audio directly?" Correct: the
antenna would be tens of kilometres long and channels would overlap.

**Distractor-mapped items**:
- "Wave from station to radio?" Options: electromagnetic; sound; a pressure wave in the
  ionosphere. Answer: electromagnetic. "Sound" targets M1.
- "Range of a 100 m mast?" Options: ≈ 36 km; ≈ 1.3 km; ≈ 360 km; unlimited. Answer:
  ≈ 36 km.

**Guided practice → independent practice fading ladder**:
1. Wavelength and antenna length (3 items).
2. AM/FM and bandwidth (3 items).
3. Propagation modes (3 items).
4. Horizon range (2 items).
5. (Unscaffolded) choose a band for a given link.

**Mastery gate set** (per assessment/05):
- *Production*: one antenna and one range calculation.
- *New surface*: phone masts.
- *Mixed*: modulation items interleaved with propagation items.
- *Delayed*: one-week check — why a carrier.

**Calibration note**: learners can name AM and FM; the check that reveals
miscalibration is "why is a carrier needed at all?"

## Tutor Recovery Strategy

*Likeliest utterance*: "radio waves are sound you can't hear" (M1).

*Concept-specific smaller question*: "Can sound cross empty space?"

*M2 recovery*: "How long would an antenna for 1 kHz have to be?"

## Memory Hooks

- **Concept type**: application (communication engineering) + principle (antenna ~ λ).
- **Review form** (per Delivery 2 §8): carrier reasons and propagation modes as spaced
  retrieval; calculations as distributed practice.
- **Automaticity target**: "carrier because antenna ~ λ; AM amplitude, FM frequency;
  ground, sky (3–30 MHz), space (line of sight)".
- **Interleaving partners**: `phys.em.electromagnetic-waves`,
  `phys.em.radiation-and-antennas`, `phys.opt.total-internal-reflection`.

## Transfer Connections

- *Near*: `phys.em.radiation-and-antennas` — how antennas radiate.
- *Near*: `phys.opt.total-internal-reflection` — optical-fibre links.
- *Far*: deep-space communication; radar.
- *Real-world*: broadcasting, mobile networks, Wi-Fi, GPS, satellite TV.
- *Expert transfer*: information theory and channel capacity.

## Cross-Subject Connections

- **Computer science**: digital encoding, data rates.
- **Geography**: ionosphere, satellite coverage.
- **History**: Marconi's transatlantic signal.
- **Mathematics**: square roots in horizon distance; sine waves.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.communication-systems.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 35; proficient difficulty).
Modulation had zero hits in the corpus before this node. Optical-fibre links are
treated as a transfer connection to `phys.opt.total-internal-reflection`, not a
prerequisite, since the node's masterable content is modulation and radio propagation.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).
