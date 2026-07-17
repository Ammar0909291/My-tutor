# Teaching Blueprint — eng.phonetics.consonant-sounds

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.consonant-sounds
name: Consonant Phoneme Classification
domain: english / phonetics
difficulty:
  label: developing
  number: 2
bloom: understand
prerequisites:
  - eng.phonetics.articulation-organs
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/kinesthetic entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-CLASSIFICATION-IS-JUST-LABELING
- **Trigger signal:** Student memorizes place/manner/voicing labels for specific sounds without being able to derive the classification of an unfamiliar or novel sound by testing it directly — treats the three-dimension system as a list to recall rather than a diagnostic method to apply.
- **Conflict evidence [P28]:** "You correctly told me /p/ is a voiceless bilabial stop — but I didn't ask you about /p/, I asked about a sound you haven't classified before. Can you figure it out using the same throat-test, touch-test, and airflow-test methods, instead of trying to remember a label?"
- **Bridge text [P30]:** "Place, manner, and voicing are not a fixed list to memorize per sound — they are three physical TESTS (where's the closure? how is airflow shaped? does the throat buzz?) you can apply to ANY consonant, including ones you've never classified before."
- **Replacement text [P31]:** "For any new consonant, run all three tests yourself — locate the place, observe the manner, check voicing — rather than searching memory for a pre-learned label."
- **Discrimination pairs [P33]:**
  - A previously drilled sound (/t/, label recalled from memory) vs. a genuinely novel/rare sound presented for the first time (student must apply the three tests live).
  - Correctly testing an unfamiliar sound from an audio sample vs. guessing a label based on which letter is written.
- **s6_path:** "It's natural to want to just memorize the labels for the common sounds — but the real skill this concept builds is the ABILITY to classify any sound, which matters most for sounds you haven't drilled before."

### MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT
- **Trigger signal:** Student treats place, manner, and voicing as three separate facts to check off individually without recognizing that a full description requires ALL THREE together to uniquely identify a sound, or conflates categories (e.g., calls a sound "a fricative place" or "a bilabial manner").
- **Conflict evidence [P28]:** "I'll tell you /p/ is voiceless and bilabial — can you tell me for certain which sound that is? What if I add 'stop'? Now can you? What changed?"
- **Bridge text [P30]:** "Place, manner, and voicing are three SEPARATE dimensions that must be combined together — like height, width, and depth for a box — no single dimension (or even two) fully identifies a consonant; you need all three."
- **Replacement text [P31]:** "Always state all three dimensions together as a complete description — voicing + place + manner — never treat one alone as sufficient identification."
- **Discrimination pairs [P33]:**
  - "voiceless + bilabial" alone (still ambiguous between /p/ and other voiceless bilabial sounds if manner isn't specified) vs. "voiceless bilabial stop" (fully specifies /p/).
  - Confusing "fricative" (a manner) with a place term, vs. correctly keeping the three category-types distinct.
- **s6_path:** "It's easy to think of these as three separate little facts, but the real power is in combining all three at once — that's what actually pins down exactly which sound you mean."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Articulator/voicing-test readiness**
Prompt: "Show me where your tongue is for 't'. Now tell me: is 't' voiced or voiceless, and how do you check?"
- Pass: correctly locates the tongue-tip/ridge placement and applies the throat-buzz test (per `eng.phonetics.articulation-organs`).
- Fail → [P52]: brief articulation-organs refresher (place location + voicing test) before proceeding. Persistent failure → route to eng.phonetics.articulation-organs for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The three-test detective routine**

> Present an unfamiliar-feeling consonant (e.g., /ʃ/ as in "shoe," chosen because it hasn't been explicitly classified in the prerequisite concept). Walk through three physical tests in strict order: (1) Place test — "where does the airflow get narrowed or blocked? touch that spot"; (2) Manner test — "does the air stop completely, or squeeze through with friction, or go through your nose?"; (3) Voicing test — "hand on throat, does it buzz?" Student concludes: "post-alveolar/palatal, fricative, voiceless." This anchors classification as a repeatable three-step procedure, not a lookup.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Place of Articulation Full Inventory [C]**

Systematically test and classify English consonants by place: bilabial (p,b,m), labiodental (f,v), dental (θ,ð), alveolar (t,d,n,s,z,l), post-alveolar (ʃ,ʒ,tʃ,dʒ), palatal (j), velar (k,g,ŋ), glottal (h). Student applies the touch/locate test to each.

**TA-2 — Manner of Articulation Full Inventory [C]**

Systematically test and classify by manner: stop/plosive (p,b,t,d,k,g), fricative (f,v,θ,ð,s,z,ʃ,ʒ,h), affricate (tʃ,dʒ), nasal (m,n,ŋ), liquid (l,r), glide/approximant (w,j). Student applies the airflow-shape test to each.

**TA-3 — Voicing Across the Full Set [C→P]**

Systematically test voicing for all consonants using the throat-buzz test, organizing into voiced/voiceless cognate pairs (p/b, t/d, k/g, f/v, θ/ð, s/z, ʃ/ʒ, tʃ/dʒ) plus always-voiced sounds (m,n,ŋ,l,r,w,j,h — noting h's variable status).

**TA-4 — Three-Dimension Full Classification [P]**

Student produces a complete three-dimension classification (place + manner + voicing) for a set of sounds without scaffolding, directly targeting MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT by requiring all three together every time.

**TA-5 — Classifying a Genuinely Novel Sound [P]**

Present a sound not previously drilled in this session (or a non-English sound the student can approximate, e.g., a click or uvular sound if relevant to the student's L1) and have them apply the three-test procedure live, directly targeting MC-CLASSIFICATION-IS-JUST-LABELING.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — place classification)**

> "What is the place of articulation for /f/?"

Target response: labiodental (lower lip against upper teeth).

**WE-2 (Foundational — manner classification)**

> "What is the manner of articulation for /n/?"

Target response: nasal (air flows through the nose, oral closure at the alveolar ridge).

**WE-3 (Intermediate — full three-dimension description)**

> "Give the full classification (place, manner, voicing) for /z/."

Target response: voiced alveolar fricative.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Place, novel sound**
"What is the place of articulation for /ŋ/ (as in 'sing')?"
*Target:* velar.

**MP-2 [P36] — Manner, novel sound**
"What is the manner of articulation for /tʃ/ (as in 'church')?"
*Target:* affricate.

**MP-3 [P36] — Voicing cognate pair**
"What is the voiced counterpart of /θ/ (as in 'think')?"
*Target:* /ð/ (as in "this") — same place and manner, differing only in voicing.

**MP-4 [P36] — Full three-dimension classification, novel sound**
"Give the full classification for /ʒ/ (as in 'measure')."
*Target:* voiced post-alveolar fricative — all three dimensions stated together.

**MP-5 [P36] — Apply the method to an unfamiliar sound**
"Here is a sound you haven't classified today: [novel consonant]. Walk me through how you'd figure out its place, manner, and voicing."
*Target:* correctly narrates and applies the three-test procedure (locate place, observe manner, check voicing) rather than guessing or recalling a memorized label.

---

## Component 7 — Session Architecture

```
[P01] Session open — three-test detective routine demo on one familiar sound
  ↓
[P41] PD-1 (articulator/voicing-test readiness)
  ↓ PASS
[P06] Anchor: three-test detective routine on an unfamiliar sound (/ʃ/)
  ↓
TA-1: Place of articulation full inventory [C]
  ↓
TA-2: Manner of articulation full inventory [C]
  ↓
TA-3: Voicing across the full set [C→P]
  ↓
TA-4: Three-dimension full classification [P]
  ↓
[P28] Conflict: treating one/two dimensions as sufficient → MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT (if triggered)
  ↓
TA-5: Classifying a genuinely novel sound [P]
  ↓
[P28] Conflict: memorized-label reliance vs. live testing → MC-CLASSIFICATION-IS-JUST-LABELING (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, pick any consonant sound and classify it using all three tests."
[P68] Session close
[P85] Regulation tail — praise use of the three-test method over recalled labels
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on articulation-organs basics but new to systematic classification): move through TA-1/TA-2 methodically, one dimension fully before adding the next. S1 (already comfortable with place/manner separately, needs voicing integration): compress TA-1/TA-2, focus on TA-3/TA-4's combination work. S6 (overwhelmed by the size of the full consonant inventory — ~24 sounds): explicitly chunk by cognate pairs (voiced/voiceless partners sharing place+manner) as a memory aid, rather than presenting all 24 as an undifferentiated list. S9 (L1 consonant inventory differs substantially, e.g. has uvular/pharyngeal/click sounds not in English, or lacks certain English sounds like /θ/,/r/): use TA-5 explicitly to have the student classify a genuine L1 sound alongside English sounds, building the three-dimension framework as a general linguistic tool rather than an English-only system — this reframes L1 differences as an asset for deeper understanding, not an obstacle.

---

## Component 8 — Adaptive Flags

- **Method over memorization**: this concept's mastery bar (Component 6 MP-5) explicitly requires demonstrating the LIVE classification method on a novel sound, not recall of previously drilled labels — session design must include at least one genuinely novel/untaught sound before mastery is assessed.
- **Three dimensions must always co-occur in a full answer**: never accept a classification response citing fewer than all three dimensions as complete — this directly targets MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT.
- **Cognate-pair chunking as a scalability aid**: organizing consonants by voiced/voiceless pairs sharing place+manner (rather than 24 independent facts) substantially reduces cognitive load — use this chunking explicitly in TA-3 and beyond.
- **L1 sound systems as a teaching asset, not a distraction**: for S9 learners, deliberately incorporate a genuine L1 consonant into the classification practice (TA-5) — this both validates the learner's existing phonological knowledge and provides an excellent live test of the three-dimension method's generality.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.consonant-sounds |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.articulation-organs ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-CLASSIFICATION-IS-JUST-LABELING, MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (articulator/voicing-test readiness) |
| V-10 | Concrete anchor present [P06] | PASS — three-test detective routine |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/kinesthetic) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — method-over-memorization, three-dimension co-occurrence, cognate-pair chunking, L1-asset framing |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
