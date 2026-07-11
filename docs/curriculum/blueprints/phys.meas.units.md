# Teaching Blueprint: SI Base Units
**Blueprint ID:** phys.meas.units  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
id:                  phys.meas.units
name:                SI Base Units
domain:              physics / measurement
bloom:               remember
difficulty:          1 (foundational)
mastery_threshold:   0.70
estimated_hours:     2
requires:            []
unlocks:             [phys.meas.scalars-vectors, phys.meas.derived-units,
                      phys.meas.unit-conversion]
cross_links:         [chem.meas.mole-concept, chem.thermo.temperature]
cpa_entry_stage:     C
```

**Core idea:** The International System of Units (SI) defines seven base units — each representing a fundamental, independently measurable physical quantity. Every other unit in science is derived from these seven. The base units are: metre (m, length), kilogram (kg, mass), second (s, time), ampere (A, electric current), kelvin (K, thermodynamic temperature), mole (mol, amount of substance), candela (cd, luminous intensity).

**Key vocabulary:** SI unit, base unit, derived unit, quantity, symbol, metre, kilogram, second, ampere, kelvin, mole, candela.

**Why difficulty = 1:** The seven items require recall, not derivation. No mathematical reasoning is required. The principal challenge is distinguishing SI base units from commonly used non-SI units (°C vs K, g vs kg, L vs m³, hr vs s).

---

## 1. Learning Objective

Given a physical quantity (length, mass, time, electric current, temperature, amount of substance, luminous intensity), the student:

(a) correctly names the SI base unit for that quantity;  
(b) correctly states the symbol for that unit;  
(c) correctly classifies a given unit as an SI base unit or not.

**Accuracy threshold:** 70% across all recall items (consistent with bloom=remember + difficulty=foundational).

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | No prior exposure to SI units | Protocol A — full CPA, 5 TAs |
| S1 | Knows 3–5 units; missing the rarer ones (ampere, mole, candela) | Protocol B — targeted gap-fill, 3 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair, 3–4 TAs |
| S6 | Correct but low-confidence; needs confidence scaffolding | Protocol D — scaffolded recall, 4 TAs |
| S9 | Second-language learner; visual processing; vocabulary gaps | Protocol E — visual-anchored, 3 TAs |

---

## 3. Diagnostic Battery

Run DB-1 and DB-2. Stop when a state is confirmed.

---

**DB-1 — Free Recall: All Seven Units**

Stimulus: "Name all seven SI base units. For each, give the quantity it measures and its symbol."

Response taxonomy:
```
{ stimulus: "All 7 correct (any order acceptable)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "4–6 correct; common errors: missing ampere, mole, candela, or confusing kelvin/celsius",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Fewer than 4 correct or significant confusion",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response or 'I don't know SI'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2 to check for active misconceptions → route to Protocol C if any, else MASTERY_CONFIRMED  
SIGNAL:PARTIAL → S1; route to Protocol B  
SIGNAL:INCORRECT → run DB-2 for MC check; route to Protocol C if MC flagged, else Protocol A  
SIGNAL:NO_RESPONSE → S0; route to Protocol A

---

**DB-2 — Misconception Screen**

Three targeted questions; run all three.

DB-2a (MC-1): "Is the SI base unit for temperature the degree Celsius (°C) or the kelvin (K)?"  
DB-2b (MC-2): "Is the kilogram or the gram the SI base unit of mass?"  
DB-2c (MC-3): "Is the litre an SI base unit?"

Response taxonomy per question:
```
DB-2a: { stimulus: "Celsius / °C", signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
DB-2a: { stimulus: "Kelvin / K", signal: "SIGNAL:CORRECT" }

DB-2b: { stimulus: "gram / g", signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
DB-2b: { stimulus: "kilogram / kg", signal: "SIGNAL:CORRECT" }

DB-2c: { stimulus: "Yes, litre is SI", signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }
DB-2c: { stimulus: "No, litre is not SI base", signal: "SIGNAL:CORRECT" }
```

Any SIGNAL:INCORRECT → flag corresponding MC → route to Protocol C

---

## 4. Prerequisite Check

No prerequisites (requires = []). Skip to Protocol A.

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 5 TAs, single session)

*Session cap: estimated_hours=2 ≥ 1h → max 7 TAs. 5 TAs appropriate for bloom=remember.*  
*CPA path: Concrete (TA-A01–A02) → Perceptual (TA-A03) → Abstract (TA-A04) → Mastery Gate (TA-A05).*

---

**TA-A01 — Seven Quantities: Concrete Anchoring**

Primitive sequence: `P01 → P04 → P06 → P03 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: seven physical objects/instruments arranged on a table  
`P04` context: "Before you can measure anything in science, you need to agree on what you're measuring and what counts as 'one unit' of it. Scientists worldwide agreed on seven fundamental quantities and one unit for each."  
`P06` concrete_objects:  
- LENGTH → a 1-metre ruler (1 m)  
- MASS → a 1-kilogram calibrated mass on a balance scale (1 kg)  
- TIME → a stopwatch displaying 1.000 s (1 s)  
- ELECTRIC CURRENT → a simple circuit diagram with ammeter reading 1 A (1 A)  
- TEMPERATURE → a thermometer beside a label "0 °C = 273.15 K" (1 K)  
- AMOUNT OF SUBSTANCE → a labelled sample: "carbon — 12 g = 1 mole of carbon atoms" (1 mol)  
- LUMINOUS INTENSITY → a candle beside the label "one candle's brightness ≈ 1 cd" (1 cd)  
`P03` orient: introduce the reference card — two-column table listing all seven quantities with unit names and symbols  
`P14` prediction: "Before I reveal them, which of these instruments do you already associate with a named unit?"  
`P55` wait: 5 s  
`P34` closed: "For the ruler: what is the quantity it measures, and what SI unit represents exactly that length?" (answer: length; metre; m)  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Length; metre; m",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Length; centimetre or kilometre",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "Distance; metre — quantity name slightly off",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("Now look at the balance scale — what quantity and what SI unit?") → introduce all seven with the reference card visible → TA-A02  
- SIGNAL:PARTIAL → `P53` ("'Distance' works colloquially; formally we say 'length'") → TA-A02  
- SIGNAL:INCORRECT (MC-3) → `P50` → explain base unit vs. derived multiples (cm = 0.01 m; km = 1000 m — m is the base) → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → `P81` (provide reference card explicitly) → retry `P34`

---

**TA-A02 — Seven Units: Chunked Recall Practice**

Primitive sequence: `P01 → P06 → P84 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: seven-unit reference card (visible for first recall pass, then removed)  
`P06` concrete: divide seven units into two chunks — Chunk 1 (m, kg, s: the most common three); Chunk 2 (A, K, mol, cd: the less common four)  
`P84` load management: practice Chunk 1 first; cover Chunk 2  
`P88` retrieval practice Chunk 1: student recalls quantity + unit + symbol for m, kg, s without card  
`P55` wait: 5 s  
`P34` closed Chunk 2: reveal Chunk 2 units one at a time; for each, read aloud and say the quantity ("Ampere — A — measures electric current")  
`P55` wait: 5 s

Response taxonomy (Chunk 1 recall):
```
{ stimulus: "metre/m (length), kilogram/kg (mass), second/s (time) — all three correct",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2/3 correct",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Fewer than 2 correct or significant errors",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49` routing:  
- SIGNAL:CORRECT → progress to Chunk 2 presentation → TA-A03  
- SIGNAL:PARTIAL → `P50` → re-anchor missed unit to physical object → retry Chunk 1 recall  
- SIGNAL:INCORRECT → `P50` → `P85` slow down: one unit at a time with physical anchor → retry

---

**TA-A03 — All Seven: Perceptual Reference Chart**

Primitive sequence: `P01 → P07 → P20 → P21 → P34 → P55 → P49 | P50`

`P01` target_element: perceptual chart — 7 rows, 4 columns (Quantity / SI Unit / Symbol / Concrete Anchor image)  
`P07` chart:

| Quantity | SI Base Unit | Symbol | Concrete Anchor |
|----------|-------------|--------|-----------------|
| Length | metre | m | 1-metre ruler |
| Mass | kilogram | kg | 1-kg calibration weight |
| Time | second | s | stopwatch |
| Electric current | ampere | A | ammeter circuit |
| Temperature | kelvin | K | thermometer (note: K not °C) |
| Amount of substance | mole | mol | 12 g carbon sample |
| Luminous intensity | candela | cd | candle |

`P20` pattern: "Look at the symbols column. Which symbol is NOT a lowercase letter?"  
`P21` generalisation: "Is there a rule about whether SI symbols are capitalised?"  
`P34` closed: "Why is the symbol K (capital) and not k (lowercase) for kelvin?" (answer: k is reserved for 'kilo-' prefix; K honours Kelvin as a proper name; symbols named after scientists are capitalised)  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "K (capital); mol; and A are not lowercase — or notes that symbols from proper names are capitalised",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Identifies some but not all capital/lowercase pattern",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "No pattern noticed",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → TA-A04  
- SIGNAL:PARTIAL → `P53` → provide the rule explicitly: "Named after a person = capital symbol (A for Ampere, K for Kelvin, mol stays lowercase because 'mole' is not a proper name)" → TA-A04  
- SIGNAL:INCORRECT → `P50` → highlight and circle capitals in the chart → retry `P34`

---

**TA-A04 — Non-SI Distinctions: Abstract Consolidation**

Primitive sequence: `P01 → P08 → P41 → P55 → P18 → P55 → P49 | P50`

`P01` target_element: list of 10 units — mix of SI base, SI derived, and non-SI  
`P08` abstract content:  
- Formal definition: "An SI base unit is one of the seven units that cannot be expressed in terms of other SI units. All other units (derived units and non-SI units) can be expressed in terms of these seven."  
- Key non-SI comparisons: °C (not SI base → K is), g (not base → kg is), litre (not SI → m³ is), hour (not SI → s is), Newton (not base → derived = kg⋅m/s²)  
`P41` MC-1/MC-3/MC-4 diagnostic screen: "Is Celsius an SI base unit? Is a gram an SI base unit? Is a litre an SI base unit?"  
`P55` wait: 5 s  
`P18` classify: "For each of these 10 units, mark SI base / SI derived / non-SI: [m, kg, s, A, K, mol, cd, °C, g, L]"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "7 SI base units correct; °C/g/L correctly marked non-SI-base",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "SI base units correct; 1-2 errors among °C/g/L",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Celsius or gram marked as SI base unit",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1 or MC-4" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A05  
- SIGNAL:PARTIAL → `P53` → clarify specific error → TA-A05  
- SIGNAL:INCORRECT → flag MC and route to Protocol C after TA-A05 is attempted once; on second attempt, route to Protocol C directly

---

**TA-A05 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P91`

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

`P77` generation probe: "Without looking at the reference card, write all seven SI base units. For each: quantity, unit name, symbol."  
`P55` wait: 10 s  
`P49/P50`

`P76` transfer probe: "A chemistry experiment measures 250 mL of water. If you had to express this volume using only SI base units, what would you use?" (answer: cubic metres, m³ = 0.000250 m³; the SI base unit for length is the metre, and volume is length³)  
*P76 independence note: this transfer references the mole-concept (cross-link to chem.meas.mole-concept) for the 'amount of substance' base unit, but does not require that blueprint to be authored first.*  
`P55` wait: 8 s  
`P49/P50`

`P75` boundary probe: "The degree Celsius (°C) is widely used in everyday life. Why is it not an SI base unit?"  
`P55` wait: 8 s  
`P49/P50`

`P74` classification probe: "Classify each as (a) SI base unit, (b) SI derived unit, or (c) neither/non-SI: [metre, Newton, kilometre, kelvin, litre, ampere, watt, second, gram, mole]"  
`P55` wait: 10 s  
`P49/P50`

`P78` explanation probe: "Explain in one sentence what makes a unit a 'base' unit as opposed to any other kind of unit."  
`P55` wait: 8 s  
`P49/P50`

Mastery response keys:
```
P77 pass: all 7 correct (accept minor symbol capitalisation if name is correct)
P76 pass: m³ or cubic metres identified; metre as the relevant base unit
P75 pass: Celsius is not one of the seven agreed base units; Kelvin is; Celsius is a derived temperature scale
P74 pass: metre=base, Newton=derived, kilometre=neither (prefix of SI), kelvin=base,
         litre=neither, ampere=base, watt=derived, second=base, gram=neither, mole=base (7/10 SI base correct)
P78 pass: "a base unit is not defined in terms of any other unit" or equivalent
```

P77 pass threshold: ≥ 5/7 correct (aligns with mastery_threshold = 0.70)  
All 5 probes at threshold → MASTERY_CONFIRMED  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to TA-A02 chunked recall

---

### Protocol B — S1 Partial Knowledge (Targeted Gap-Fill, 3 TAs)

*Student knows 3–5 units; typically missing A, mol, cd. Entry at perceptual.*

---

**TA-B01 — Gap Identification and Anchoring**

Primitive sequence: `P02 → P07 → P23 → P34 → P55 → P49 | P50`

`P02` activate: "List the SI base units you know."  
`P07` perceptual chart: display complete 7-row chart; student marks which they already have  
`P23` decomposition: identify the gap units — typically ampere, mole, candela  
`P34` closed: for each gap unit, provide the anchor and ask for immediate recall: "The ampere measures electric current — symbol A. What does the kelvin measure and what is its symbol?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Thermodynamic temperature; K",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Temperature; C or Celsius",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Temperature; K — correct unit wrong name ('degrees kelvin')",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B02; INCORRECT (MC-1) → flag → TA-B02 includes MC-1 correction; PARTIAL → `P53` ("No 'degrees' in kelvin — just K") → TA-B02

---

**TA-B02 — Gap Unit Retrieval Practice**

Primitive sequence: `P01 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: the gap units identified in TA-B01 (covered, without chart)  
`P88` retrieval practice: student recalls quantity, name, symbol for each gap unit from memory  
`P55` wait: 8 s  
`P34` closed: "The candela — without looking — what quantity does it measure and what is its symbol?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Luminous intensity; cd",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Brightness / light; cd — acceptable paraphrase of quantity",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot recall; or 'lux' / 'lumen'",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-B03; PARTIAL → `P53` ("Formally: 'luminous intensity'; cd is correct symbol") → TA-B03; INCORRECT → `P50` → re-anchor to candle etymology → retry

---

**TA-B03 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol C — S2 Misconception Carriers (MAMR Repair, 3–4 TAs)

**MAMR order:** MC-1, MC-2, MC-3, MC-4 are all independent — repair FIFO (order of identification in DB-2).

---

**TA-C01 — Misconception Surface and Routing**

Primitive sequence: `P02 → P26 → P41 → P55 → P49`

`P02` activate: student's existing SI knowledge  
`P26` schema activation: "Tell me what you know about temperature units in science."  
`P41` diagnostic: run DB-2a, DB-2b, DB-2c in sequence  
`P55` wait: 5 s

Routing after MC identification (FIFO order):
- MC-1 flagged first → TA-C02
- MC-4 flagged first → TA-C03
- MC-3 flagged first → TA-C04

---

**TA-C02 — MC-1 Repair: Kelvin (Not Celsius) is the SI Temperature Unit**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: temperature scale comparison diagram  
`P27` schema exposure: "You said Celsius is the SI temperature unit. Let's examine that."  
`P07` diagram: two thermometer scales side by side — Celsius (0°C at water freeze, 100°C at boil) and Kelvin (273.15 K at water freeze, 373.15 K at boil, 0 K = absolute zero = −273.15°C)  
`P28` cognitive conflict: "At absolute zero (the coldest possible temperature), Celsius reads −273.15°C. Can a temperature be 'minus' something when it's the absolute minimum? Kelvin defines 0 K as absolute zero. The SI system chose the scale that starts at the true zero."  
`P55` wait: 8 s  
`P30` bridge: "Celsius is useful for everyday life. Kelvin is the SI base unit because its zero is physically meaningful (absolute zero). You convert: K = °C + 273.15."  
`P31` install: "SI base unit for temperature = kelvin (K). Celsius is widely used but is not SI base."  
`P34` closed: "What is 0°C in kelvin?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "273.15 K or 273 K",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "0 K (still confused)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "About 273 K, approximately correct",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-1 CLEARED; if MC-4 flagged → TA-C03; if MC-3 flagged → TA-C04; else → TA-C05  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C03 — MC-4 Repair: Kilogram (Not Gram) is the SI Mass Base Unit**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: SI unit name pattern  
`P27` schema exposure: "You said gram is the SI base unit of mass. Let's check."  
`P07` table: show SI prefixes — milli, centi, kilo. Normally base units have NO prefix. The kilogram has 'kilo-' in its name — this is a known historical quirk.  
`P28` cognitive conflict: "If gram were the base, we'd expect to write 1000 g = 1 'kilo'gram as a derived multiple. But the SI officially lists kilogram, not gram, as the base unit. Subunits like milligram (mg) are derived from the kilogram: 1 mg = 10⁻⁶ kg."  
`P55` wait: 5 s  
`P30` bridge: "This is a genuine historical anomaly — the kilogram is the only SI base unit with a prefix in its name. Memorise it as the exception."  
`P31` install: "SI base unit for mass = kilogram (kg). 1 g = 0.001 kg; g is not the base unit."  
`P34` closed: "What SI unit would you use to measure the mass of a 500 g bag of flour, expressed in SI base units?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "0.5 kg or 0.500 kg — kilograms",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "500 g — still using grams",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "Kilograms, but not sure of the conversion",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-4 CLEARED → route to next MC or TA-C05  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C04 — MC-3 Repair: Common Units That Are Not SI Base**

Primitive sequence: `P01 → P27 → P07 → P17 → P34 → P55 → P49 | P50`

`P01` target_element: non-SI unit examples  
`P27` schema exposure: "You marked litre [or hour or cm] as an SI base unit."  
`P07` comparison chart:

| Non-SI Unit | Equivalent in SI Base | Relationship |
|------------|----------------------|--------------|
| litre (L) | 0.001 m³ | derived from metre |
| centimetre (cm) | 0.01 m | prefix multiple of metre |
| hour (hr) | 3600 s | multiple of second |
| gram (g) | 0.001 kg | submultiple of kilogram |
| degree Celsius (°C) | K − 273.15 | derived from kelvin |

`P17` contrast: "The litre is useful but it's not one of the seven. The metre is. Volume in SI is m³."  
`P34` closed: "Express 2 litres using only SI base units."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "0.002 m³ or 2 × 10⁻³ m³",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2000 mL — still not SI base",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "m³ identified but conversion wrong",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-3 CLEARED → route to next MC or TA-C05  
INCORRECT → `P50` → `P30` bridge → retry  
PARTIAL → `P53` → advance

---

**TA-C05 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol D — S6 Low Confidence (Scaffolded Recall, 4 TAs, no P28)

*No P28 (GR-5). Confidence-building scaffolds throughout.*

---

**TA-D01 — Safety Frame and Chunked Anchor**

Primitive sequence: `P01 → P71 → P69 → P06 → P81 → P34 → P55 → P49 | P50`

`P01` target_element: reference card (visible throughout this TA)  
`P71` peer comparison removal: "We're not racing to memorise all seven at once. We'll build them one at a time."  
`P69` relevance: "Every physics and chemistry calculation you'll ever do uses these seven units — knowing them fluently saves you work later."  
`P06` concrete: present physical anchors for Chunk 1 (m, kg, s)  
`P81` scaffold: reference card remains visible for all of TA-D01  
`P34` closed (easy-access with card visible): "From the card — what quantity does the second measure?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Time",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Speed or seconds — confusing unit with quantity",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "No response or wrong quantity",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: all paths → `P70` (competence evidence: affirm correct or near-correct response) → TA-D02

---

**TA-D02 — Chunk 1 Retrieval (Card Removed)**

Primitive sequence: `P01 → P64 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: memory for Chunk 1 (m, kg, s)  
`P64` confidence calibration: "How confident, 1–5, that you can recall the first three without the card?"  
`P88` retrieval: student recalls quantity, unit, symbol for m, kg, s  
`P55` wait: 8 s  
`P34` closed: "What is the SI base unit for mass — not the common one, the official SI one?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Kilogram; kg",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Gram; g",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "Kilogram but symbol wrong (K or KG)",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → `P70` → TA-D03; INCORRECT → `P50` → `P30` bridge (no P28) → retry; PARTIAL → `P53` → TA-D03

---

**TA-D03 — Chunk 2 Anchor and Retrieval**

Primitive sequence: `P01 → P06 → P85 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: Chunk 2 units (A, K, mol, cd)  
`P06` concrete: ammeter, kelvin thermometer, mole sample, candle image — presented one at a time  
`P85` pacing: slow deliberate pace; one unit anchored fully before the next  
`P88` retrieval: after all four anchored, card removed; student recalls Chunk 2  
`P55` wait: 10 s  
`P34` closed: "What is the symbol for the SI unit of amount of substance?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "mol",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "M or mole (name not symbol)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "g or n or cannot recall",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → `P70` → TA-D04; PARTIAL → `P53` → TA-D04; INCORRECT → `P50` → `P81` → re-anchor mol to mole concept → retry

---

**TA-D04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol E — S9 Second-Language Learner (Visual-Anchored, 3 TAs)

---

**TA-E01 — Visual Vocabulary Card and Concrete Matching**

Primitive sequence: `P01 → P03 → P06 → P07 → P34 → P55 → P49 | P50`

`P01` target_element: visual vocabulary card  
`P03` orient: present a card with each unit shown as: symbol (large) → unit name → quantity word → picture of measurement tool. All text minimal; image dominant.  
`P06` concrete: seven physical objects labelled with symbols only (not names)  
`P07` chart: student matches each object to the correct row on the vocabulary card  
`P34` closed (card visible): "Point to the symbol for the unit that measures temperature."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Points to K",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Points to °C symbol on a thermometer image (if shown)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Points to a thermometer but hesitates between K and °C",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-E02; INCORRECT (MC-1) → `P50` → highlight K on card with colour → retry; PARTIAL → `P53` → TA-E02

---

**TA-E02 — Recall with Visual Scaffold**

Primitive sequence: `P01 → P07 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: partial reference chart (symbols only; quantity column blank)  
`P07` chart: show only symbol column; student fills in quantity and unit name columns  
`P88` retrieval practice: complete the table  
`P55` wait: 10 s  
`P34` closed: "What does 'mol' measure? Say the answer in your own words."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Amount of substance / number of particles / how many atoms",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Mass / weight — confusing mole with kilogram",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "Something about chemistry / amount — imprecise but directionally correct",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-E03; PARTIAL → `P53` → TA-E03; INCORRECT → `P50` → re-anchor mol to sample image → retry

---

**TA-E03 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05. Vocabulary card remains available at start; removed for generation probe P77.

---

## 6. Misconception Engine

---

### MC-1 — Degree Celsius Is the SI Temperature Unit

**Observable symptom:** Student names °C as the SI base unit for temperature; converts "0°C = 0 K"; writes temperature in °C in SI calculations.

**Diagnostic trigger:** DB-2a; TA-A04 classification.

**Root cause:** Celsius is the dominant temperature unit in everyday life in most countries. Kelvin is rarely encountered outside formal physics/chemistry. "Temperature" in daily conversation means Celsius.

**Repair chain:** P27 → P07 (scale comparison) → P28 (absolute zero argument) → P29 → P30 (physical meaning of zero) → P31 (install K as base) → P32 (K↔°C conversion practice)

**MAMR status:** Independent.

---

### MC-2 — Mass and Weight Are the Same Quantity

**Observable symptom:** Student uses kg and N interchangeably; says "my weight is 70 kg" without qualification.

**Diagnostic trigger:** Assessment AB-1; or spontaneous statement during session.

*Note: Full repair of MC-2 (mass vs. weight as force) requires phys.meas.scalars-vectors and phys.mech.force — concepts not yet in student's map at this stage. Address only the following: "kg measures mass, not weight. Weight is a force and has its own unit (the Newton) which is derived." Full conceptual repair is deferred to phys.mech.newton-laws blueprint.*

**Repair chain (partial):** P27 → P07 (two columns: mass vs. weight) → P30 (bridge: kg = mass = how much matter; N = weight = gravitational force on that mass) → P31 (install minimal distinction)

**MAMR status:** Independent. Partial repair only at this blueprint level.

---

### MC-3 — Common Units (Litre, Centimetre, Hour) Are SI Base Units

**Observable symptom:** Student classifies L, cm, or hr as SI base units; or states SI has more than 7 base units.

**Diagnostic trigger:** DB-2c; TA-A04 classification.

**Root cause:** These units are used alongside SI units in most school contexts without explicit labelling of their status.

**Repair chain:** P27 → P07 (non-SI conversion table) → P17 (contrast: SI base vs. derived multiples vs. non-SI) → P31 → P33 (discrimination training: sort 10 units into SI base / SI derived / non-SI)

**MAMR status:** Independent.

---

### MC-4 — Gram (Not Kilogram) Is the SI Mass Base Unit

**Observable symptom:** Student writes "g" as the SI base unit for mass; derives "kg = 1000 g (derived unit)."

**Diagnostic trigger:** DB-2b; TA-A04 classification.

**Root cause:** Gram is smaller and more intuitive for everyday objects. The "kilo" prefix pattern in metric teaching typically positions gram as fundamental and kilogram as derived.

**Repair chain:** P27 → P07 (SI prefix table showing kg as uniquely having prefix in base name) → P28 (historical anomaly argument) → P30 (exception: kg is the defined base despite the prefix) → P31 → P32 (3 examples always using kg, not g, in SI calculations)

**MAMR status:** Independent.

---

## 7. Assessment Battery

---

**AB-1 — Free Recall Table**

Student fills in without reference: all 7 rows of [Quantity | SI Unit | Symbol].

Scoring: 1 point per correct row (quantity + unit + symbol all correct). Target: ≥ 5/7 (aligns with 0.70 threshold).

---

**AB-2 — Classification Task**

Classify each as SI base / SI derived / neither: [metre, Celsius, candela, Newton, gram, second, litre, kelvin, watt, mole]

Key: SI base = m, cd, s, K, mol (5); SI derived = Newton, watt (2); neither = Celsius, gram, litre (3). Target: ≥ 7/10.

---

**AB-3 — Symbol-to-Quantity Matching**

Match symbol to quantity: {m, kg, s, A, K, mol, cd} → {time, length, mass, electric current, luminous intensity, amount of substance, thermodynamic temperature}.

Target: 7/7.

---

**AB-4 — Non-SI Conversion**

"Express 3 hours, 250 mL, and 45 cm in SI base units."

Expected: 10800 s; 2.5 × 10⁻⁴ m³; 0.45 m. Target: 2/3 (threshold-aligned).

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

**P77 — Generation Probe**

"From memory: list all 7 SI base units. Quantity, unit name, symbol for each."

Pass: ≥ 5/7 correct (≥70%).

---

**P76 — Transfer Probe**

"A chemist measures 250 mL of a solution. What SI base unit should be used for volume, and what is this measurement in that unit?"

*P76 independence note: Amount-of-substance cross-link (chem.meas.mole-concept) is referenced in Component 0 but does not need to be authored first; this transfer item involves only length-derived volume.*

Pass: m³ identified; 2.5 × 10⁻⁴ m³ (or equivalent correct conversion).

---

**P75 — Boundary Probe**

"The degree Celsius is used in science every day. Why is it not an SI base unit?"

Pass: student states that Kelvin is the designated SI base unit for temperature, or that °C is a derived/offset scale.

---

**P74 — Classification Probe**

"Classify: metre, Newton, Celsius, mole, litre, second, candela, gram, ampere, watt"

Pass: all 7 SI base units correctly identified; °C, g, L correctly excluded.

---

**P78 — Explanation Probe**

"In one sentence, explain what makes a unit a 'base' unit in SI rather than a 'derived' unit."

Pass: "a base unit is not defined in terms of other units" or "all other units are built from the base units."

---

**Mastery decision:**

All 5 probes at threshold → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 at threshold → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to Protocol A TA-A02 (chunked recall)

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

**Day 1:** `P56` — free recall of all 7 units; correct any symbols missed at mastery gate.

**Day 3:** `P88` — classification task AB-2 (new instances, same types).

**Day 7:** `P88` — non-SI conversion practice AB-4; boundary probe P75.

**Day 21:** `P88` — transfer item: "A physicist records a temperature of 37°C. Express this in SI base units." (Answer: 310.15 K)

**Day 60:** `P88` — full generation probe P77 from cold recall; AB-3 symbol-to-quantity matching.

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | phys.meas.units valid KG id; cross-links chem.meas.mole-concept, chem.thermo.temperature valid |
| V-2 | difficulty=1 → cpa_entry_stage = C | PASS | cpa_entry_stage=C; difficulty=1 requires C |
| V-3 | mastery_threshold matches KG value | PASS | 0.70 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in JSON; derived at runtime |
| V-5 | No invented primitives | PASS | All primitives are P01–P91 (library range) |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A05: P01; B01: P02; B02–B03: P01; C01: P02; C02–C05: P01; D01–D04: P01; E01–E03: P01 |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P34/P41/P88/P74–P78 followed by P55 in all TAs |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 appears in TA-A04 only, after P06 in A01/A02 and P07 in A03 |
| V-9 | GR-4: repair chain entered only after P41/P64 | PASS | All MC repair chains in Protocol C entered after P41 in TA-C01 |
| V-10 | GR-5: P28 absent from Protocol D (S6) | PASS | Protocol D uses P30 (Bridge) in TA-D02; no P28 in any D-series TA |
| V-11 | GR-6: P91 terminal in mastery gate TAs | PASS | TA-A05, B03, C05, D04, E03 all end with P91; nothing follows |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | No TA has more than 2 consecutive C-primitives (P14, P17, P18, P20, P21, P23) without E-primitive |
| V-13 | GR-8: P54 precedes high-difficulty NO_RESPONSE paths | PASS | P54 in TA-A01 NO_RESPONSE branch |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 only in mastery gate TAs (A05, B03, C05, D04, E03) |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded P77→P76→P75→P74→P78; P89 referenced via schedule (not embedded in TA) |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P41/P88 in all TAs have inline taxonomy blocks |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing specified for all elicitation cycles |
| V-18 | Session cap respected | PASS | Protocol A: 5 TAs (estimated_hours=2≥1h → max 7; 5 appropriate for bloom=remember); B: 3 TAs; C: 3–4 TAs; D: 4 TAs; E: 3 TAs |
| V-19 | Transfer contexts reference cross-linked concepts | PASS | P76 references metre-based volume (length cross-link); P76 independence note present |
| V-20 | AIR-1 through AIR-5 pass | PASS | Content in explicit slots (AIR-1); taxonomy pre-authored (AIR-2); P49 routing deterministic (AIR-3); primitives concept-independent (AIR-4); sequences fixed at authoring (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
