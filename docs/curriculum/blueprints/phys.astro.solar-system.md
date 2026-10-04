# Teaching Blueprint: phys.astro.solar-system

## 0. Concept Profile
concept_id: phys.astro.solar-system
name: The Earth-Moon-Sun System: Seasons, Phases, Eclipses and Tides
domain: Astrophysics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: [phys.mech.universal-gravitation, phys.opt.rectilinear-propagation]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a lamp for the Sun, a ball on a stick for the Moon, a tilted globe for the Earth, before any diagram; difficulty 1)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains the seasons by the 23.4° tilt of Earth's axis: the hemisphere tilted towards the Sun has the Sun higher at noon — at latitude 28.6°N the noon Sun stands 84.8° high in June but only 38.0° in December, so the same sunlight spreads over about 1.6 times less ground in summer — and has longer days. Earth is actually closest to the Sun in early January (147 million km against 152 million km in July), so distance cannot be the cause.
2. Explains the Moon's phases as the changing view of its sunlit half as it orbits Earth every 29.5 days — not Earth's shadow — and eclipses as alignments: a solar eclipse when the Moon's shadow falls on Earth at new moon, a lunar eclipse when the Moon enters Earth's shadow at full moon; they do not happen every month because the Moon's orbit is tilted about 5° to Earth's.
3. Explains the tides as the difference in the Moon's gravity across the Earth, which stretches the oceans into two bulges (one facing the Moon, one opposite), giving two high tides about every 12 h 25 min; the Sun's pull on Earth is about 180 times the Moon's, but because tidal effects fall off as 1/d³ the Moon's tidal effect is about 2.2 times the Sun's, and spring tides occur when they line up.

A student who thinks summer happens because Earth is nearer the Sun, or that the Moon's phases are Earth's shadow, has **NOT** achieved mastery — those ideas break every explanation of the sky.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No model of the sky | Cannot say why seasons or phases happen | Protocol A (Concrete) |
| S1 | Facts recited | Says "tilt" but cannot explain how tilt warms | Protocol B (Counterexample-first) |
| S2-SEASONS-DISTANCE | Nearer = hotter | "Summer is when Earth is closest to the Sun" | Misconception Engine → then Protocol C |
| S2-PHASES-EARTH-SHADOW | Shadow model | "The phases are Earth's shadow on the Moon" | Misconception Engine → then Protocol C |
| S3 | Partial — seasons and phases fine | Cannot explain two tides a day | Protocol C (Guided Questioning) |
| S6 | Anxiety on 3-D geometry | Avoids imagining the arrangement | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why is it warmer in summer than in winter?"
  No idea → S0. Enter Protocol A (Concrete).
  "Because of the tilt of Earth's axis" → DB-2.
  "Because Earth is closer to the Sun" → SIGNAL:MISCONCEPTION:MC-SEASONS-DISTANCE. Enter Misconception Engine.

DB-2 (representation / misconception test):
"What causes the Moon's phases?"
  "We see different amounts of its sunlit half as it orbits Earth" → S3. Enter Protocol C.
  "Its position around Earth" (vague) → S1. Enter Protocol B.
  "Earth's shadow covering part of it" → SIGNAL:MISCONCEPTION:MC-PHASES-EARTH-SHADOW. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (tides check — overlays):
"How many high tides does a beach get in a day, and why?"
  "Two — one bulge faces the Moon and one is opposite" → no flag.
  "One — the Moon pulls the water towards it" → note; repair at TA-5.
  Confident and wrong on DB-1 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.universal-gravitation` and `phys.opt.rectilinear-propagation`):
"How does gravity change with distance, and why does an object cast a shadow with a dark core and a lighter edge?"
  Cannot say "weaker as 1/r²" and "light travels in straight lines; umbra and penumbra" → flag PREREQ-GAP-GRAVITY-SHADOWS.
  In-session minimum repair: one P06 (a lamp, a ball and its umbra/penumbra) + one P34 ("twice as far: gravity?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no model of the sky.
Success exit: explains seasons, phases, eclipses and tides with the right mechanism (P91 all 5 probes CORRECT).
Failure exit: on SEASONS-DISTANCE → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Lamp, Globe and Ball]
P01
→ P04[content: "One lamp, one tilted globe, one small ball: that is enough to explain the seasons, the phases of the Moon, eclipses — and with gravity, the tides."]
→ P06[content: a tilted globe carried round a lamp; a torch shone on a ball at two angles]
→ P14[predict: "Torch straight down or slanted: which patch is brighter?"] → P55
→ success_path → P49 → P05[curiosity: "So what does the tilt do to sunlight?"]

[TA-2: Why the Tilt Makes Seasons]
P02
→ P13[think-aloud: "Earth's axis is tilted 23.4° and keeps pointing the same way in space. In June the northern half leans towards the Sun: the noon Sun is high and the days are long. At 28.6°N the noon Sun is 84.8° high in June and only 38.0° in December. A slanting beam spreads over more ground, so each square metre gets less energy — about 1.6 times less here in December."]
→ P08[notation: "noon Sun height = 90° − latitude ± 23.4°"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "At 28.6°N, noon Sun height in June and December?"] → P55
→ success_path[84.8°, 38.0°] → P49

[TA-3: Not the Distance]
P02
→ P41[diagnostic: "Is summer caused by Earth being closer to the Sun?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-SEASONS-DISTANCE → misconception_repair_chain[MC-SEASONS-DISTANCE]

[TA-4: Phases and Eclipses]
P02
→ P41[diagnostic: "What causes the phases of the Moon?"] → P55
→ [if sunlit half seen from different angles] → P49
→ [if Earth's shadow] → SIGNAL:MISCONCEPTION:MC-PHASES-EARTH-SHADOW → misconception_repair_chain[MC-PHASES-EARTH-SHADOW]
→ P34[question: "At which phase can a solar eclipse happen? A lunar eclipse? Why not every month?"] → P55
→ success_path[new moon; full moon; the Moon's orbit is tilted ~5°, so it usually passes above or below the line] → P49

[TA-5: Tides]
P02
→ P13[think-aloud: "The Moon pulls the near side of Earth a little more than the centre, and the centre more than the far side. That difference stretches the oceans into two bulges — towards the Moon and away from it. Earth turns under both, so most coasts get two high tides about every 12 h 25 min."]
→ P34[question: "The Sun pulls Earth about 180 times harder than the Moon. Why is the Moon's tidal effect bigger?"] → P55
→ success_path[tides depend on the DIFFERENCE in pull across Earth, which falls off as 1/d³; the Moon is so close that its tidal effect is ~2.2 times the Sun's] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "If Earth's axis had no tilt, would there be seasons?"] → P55
    → P49 → P51[check: essentially none — the small distance change would barely matter]
    → P35[open: "Explain why Australia has summer in December."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a demonstration with a lamp and a ball that shows why a half moon is half lit."] → P55 → CORRECT
    → P76[transfer: "Why are the highest (spring) tides at new and full moon?"] → P55 → CORRECT
    → P75[boundary: "Can a lunar eclipse happen at a half moon?"] → P55 → CORRECT
    → P74[classify: "Seasons, phases, eclipses, tides — which involve shadows?"] → P55 → CORRECT
    → P78[explain: "Why does the slanting winter Sun heat the ground less?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: facts without mechanism.
Success exit: explains how tilt changes heating.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Earth is closest to the Sun in January. Why is January winter in India?"] → P54 (novel) → P55; then TA-2 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: seasons and phases fine; tides not.
Success exit: two bulges and the 1/d³ argument.
Failure exit: escalate to Protocol A TA-4.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: seasons and phases explained with the lamp model.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); physical models only, no numbers; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "nearer = summer".
Success exit: revises after the opposite-hemispheres contrast.
Failure exit: Misconception Engine.
Key deltas: open with "it is summer in Australia while it is winter in India — at the same distance from the Sun"; let it sit (P55).

## 6. Misconception Engine

### MC-SEASONS-DISTANCE: "Summer happens because Earth is closer to the Sun"
trigger_signal: student attributes the seasons to the changing Earth–Sun distance.
conflict_evidence [P28]: "When it is summer in India, it is winter in Australia — yet both are the same distance from the Sun. And Earth is actually closest to the Sun in early January. How can distance explain that?"
bridge_text [P30]: "It can't. The distance changes only about 3% over the year, too little to matter much. What changes is the tilt: Earth's axis leans 23.4° and keeps pointing the same way, so for half the year the northern hemisphere leans towards the Sun — high noon Sun, concentrated sunlight, long days — and for the other half it leans away."
replacement_text [P31]: "Seasons are caused by the tilt of Earth's axis, which changes the Sun's height and the day length; opposite hemispheres have opposite seasons."
discrimination_pairs [P33]: ["June at 28.6°N: noon Sun 84.8°, long days — summer", "December at 28.6°N: noon Sun 38.0°, short days — winter, though Earth is nearer the Sun"]
s6_path: skip P28; shine a torch straight down and then slanted on paper — the slanted patch is bigger and dimmer.

### MC-PHASES-EARTH-SHADOW: "The Moon's phases are caused by Earth's shadow"
trigger_signal: student explains crescent, half and gibbous phases by Earth's shadow covering part of the Moon.
conflict_evidence [P28]: "Earth's shadow points directly away from the Sun. Where must the Moon be to fall into it? And what phase is the Moon in then?"
bridge_text [P30]: "It must be on the far side of Earth from the Sun — which is full moon. So Earth's shadow can only reach the Moon at full moon, and then it causes a lunar eclipse, not a phase. Phases happen because the Moon always has one half lit by the Sun, and as it orbits we see different amounts of that lit half: all of it at full moon, none at new moon, half of it at the quarters."
replacement_text [P31]: "Phases are our changing view of the Moon's permanently sunlit half; Earth's shadow on the Moon is a lunar eclipse, which happens only at full moon."
discrimination_pairs [P33]: ["half moon: we see half of the sunlit half — Moon at 90° to the Sun", "lunar eclipse: Earth's shadow on a full moon"]
s6_path: skip P28; walk a ball round your head in lamplight and watch its lit part change.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which involve shadows?" | CORRECT = eclipses only |
| P74 (classify) | "Opposite hemispheres — same or opposite seasons?" | CORRECT = opposite |
| P75 (boundary) | "Lunar eclipse at half moon?" | CORRECT = no — only at full moon |
| P76 (transfer) | "Spring tides" | CORRECT = Sun and Moon aligned at new and full moon; their tides add |
| P77 (generate) | "Half-moon demonstration" | CORRECT = lamp to one side, ball at 90°, view from the centre |
| P78 (explain) | "Slanting winter Sun" | CORRECT = same beam spread over more ground |
| P79 (predict) | "No tilt" | CORRECT = almost no seasons |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a demonstration with a lamp and a ball that shows why a half moon is half lit." → expected: CORRECT
P76: "Why are the highest (spring) tides at new and full moon?" → expected: CORRECT
P75: "Can a lunar eclipse happen at a half moon?" → expected: CORRECT
P74: "Seasons, phases, eclipses, tides — which involve shadows?" → expected: CORRECT
P78: "Why does the slanting winter Sun heat the ground less?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What causes the seasons?"
Interval 2 (3 days): "Noon Sun height at 40°N in June?"
Interval 3 (7 days): "Why are there phases?"
Interval 4 (21 days): "Why two tides a day?"
Interval 5 (60 days): "Why don't eclipses happen every month?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
